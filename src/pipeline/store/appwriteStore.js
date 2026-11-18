// Appwrite (TablesDB) store. Table and column names must match scripts/appwrite-setup-pipeline.mjs.
import { Account, Client, ID, Query, TablesDB } from 'appwrite';
import { DEFAULT_STAGES } from '../logic.js';

export const TABLES = Object.freeze({
  pipelines: 'pipelines',
  stages: 'stages',
  deals: 'deals',
  events: 'deal_stage_events',
});

const PIPELINE_FIELDS = ['name', 'order_nr', 'deal_probability_enabled', 'deleted_at'];
const STAGE_FIELDS = ['pipeline_id', 'name', 'order_nr', 'probability', 'rot_enabled', 'rot_days', 'deleted_at'];
const DEAL_FIELDS = [
  'pipeline_id', 'stage_id', 'title', 'value', 'currency', 'probability', 'status', 'lost_reason',
  'owner_name', 'person_name', 'org_name', 'label', 'expected_close_date', 'next_activity_at',
  'next_activity_subject', 'last_touched_at', 'stage_changed_at', 'won_at', 'lost_at', 'deleted_at',
];

function pick(source, fields) {
  const out = {};
  for (const field of fields) if (source[field] !== undefined) out[field] = source[field] === '' ? null : source[field];
  // Date-only values go into a datetime column as UTC midnight so the date survives the round trip.
  if (typeof out.expected_close_date === 'string' && out.expected_close_date.length === 10) out.expected_close_date += 'T00:00:00.000Z';
  return out;
}

function fromRow(row) {
  const { $id, $createdAt, $updatedAt, ...rest } = row;
  for (const key of Object.keys(rest)) if (key.startsWith('$')) delete rest[key];
  if (rest.expected_close_date) rest.expected_close_date = rest.expected_close_date.slice(0, 10);
  return { ...rest, id: $id, created_at: $createdAt, updated_at: $updatedAt };
}

export function createAppwriteStore({ endpoint, projectId, databaseId }) {
  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  const account = new Account(client);
  const tables = new TablesDB(client);

  async function listAll(tableId, queries) {
    const rows = [];
    let cursor = null;
    for (;;) {
      const page = await tables.listRows({
        databaseId,
        tableId,
        queries: [...queries, Query.limit(500), ...(cursor ? [Query.cursorAfter(cursor)] : [])],
        total: false,
      });
      rows.push(...page.rows.map(fromRow));
      if (page.rows.length < 500) return rows;
      cursor = page.rows[page.rows.length - 1].$id;
    }
  }

  const create = (tableId, data) => tables.createRow({ databaseId, tableId, rowId: ID.unique(), data }).then(fromRow);
  const update = (tableId, rowId, data) => tables.updateRow({ databaseId, tableId, rowId, data }).then(fromRow);
  const now = () => new Date().toISOString();

  const store = {
    mode: 'appwrite',

    async getUser() {
      try {
        const user = await account.get();
        return { name: user.name || user.email, email: user.email };
      } catch {
        return null;
      }
    },
    async login(email, password) {
      await account.createEmailPasswordSession({ email, password });
      return store.getUser();
    },
    async logout() {
      await account.deleteSession({ sessionId: 'current' });
    },

    async listPipelines() {
      return listAll(TABLES.pipelines, [Query.isNull('deleted_at'), Query.orderAsc('order_nr')]);
    },

    async createPipeline({ name, deal_probability_enabled = false }, stages = DEFAULT_STAGES) {
      const existing = await store.listPipelines();
      const pipeline = await create(TABLES.pipelines, { name, deal_probability_enabled, order_nr: existing.length });
      for (const [index, stage] of stages.entries()) {
        await create(TABLES.stages, { ...pick(stage, STAGE_FIELDS), pipeline_id: pipeline.id, order_nr: index });
      }
      return pipeline;
    },

    async updatePipeline(id, patch) {
      return update(TABLES.pipelines, id, pick(patch, PIPELINE_FIELDS));
    },

    async deletePipeline(id) {
      const deals = await listAll(TABLES.deals, [Query.equal('pipeline_id', id), Query.isNull('deleted_at'), Query.limit(1)]);
      if (deals.length) throw new Error('Move or delete this pipeline’s deals first.');
      await update(TABLES.pipelines, id, { deleted_at: now() });
    },

    async listStages(pipelineId) {
      return listAll(TABLES.stages, [Query.equal('pipeline_id', pipelineId), Query.isNull('deleted_at'), Query.orderAsc('order_nr')]);
    },

    async countOpenDealsByStage(pipelineId) {
      const counts = {};
      for (const deal of await store.listDeals(pipelineId)) counts[deal.stage_id] = (counts[deal.stage_id] || 0) + 1;
      return counts;
    },

    async saveStages(pipelineId, edited) {
      const current = await store.listStages(pipelineId);
      const keep = new Set(edited.filter((s) => s.id).map((s) => s.id));
      const removed = current.filter((s) => !keep.has(s.id));
      if (removed.length) {
        const counts = await store.countOpenDealsByStage(pipelineId);
        const blocked = removed.find((s) => counts[s.id]);
        if (blocked) throw new Error(`“${blocked.name}” still has open deals. Move them before deleting the stage.`);
      }
      for (const stage of removed) await update(TABLES.stages, stage.id, { deleted_at: now() });
      for (const [index, stage] of edited.entries()) {
        const fields = {
          name: stage.name,
          probability: Number(stage.probability),
          rot_enabled: Boolean(stage.rot_enabled),
          rot_days: stage.rot_enabled ? Number(stage.rot_days) || null : null,
          order_nr: index,
        };
        if (stage.id) await update(TABLES.stages, stage.id, fields);
        else await create(TABLES.stages, { ...fields, pipeline_id: pipelineId });
      }
      return store.listStages(pipelineId);
    },

    async listDeals(pipelineId) {
      return listAll(TABLES.deals, [Query.equal('pipeline_id', pipelineId), Query.equal('status', 'open'), Query.isNull('deleted_at')]);
    },

    async createDeal(fields) {
      const at = now();
      const deal = await create(TABLES.deals, { ...pick(fields, DEAL_FIELDS), status: 'open', last_touched_at: at, stage_changed_at: at });
      await create(TABLES.events, { deal_id: deal.id, pipeline_id: deal.pipeline_id, from_stage_id: null, to_stage_id: deal.stage_id, at });
      return deal;
    },

    // `previous` is the deal as the board last saw it, used to log stage moves without an extra read.
    async updateDeal(id, patch, previous) {
      const at = now();
      const data = { ...pick(patch, DEAL_FIELDS), last_touched_at: at };
      const moved = patch.stage_id && previous && patch.stage_id !== previous.stage_id;
      if (moved) data.stage_changed_at = at;
      const deal = await update(TABLES.deals, id, data);
      if (moved) {
        await create(TABLES.events, { deal_id: id, pipeline_id: deal.pipeline_id, from_stage_id: previous.stage_id, to_stage_id: patch.stage_id, at });
      }
      return deal;
    },
  };
  return store;
}
