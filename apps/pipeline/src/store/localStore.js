// Browser-only demo store. Used when Appwrite is not configured, so the board can be tried and tested.
// Same interface as appwriteStore.js.
import { DEFAULT_STAGES } from '../logic.js';

const KEY = 'kitebaze.pipeline.demo.v1';
const DAY_MS = 24 * 60 * 60 * 1000;

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function nowIso() {
  return new Date().toISOString();
}

function daysFromNow(days, hour = 10) {
  const date = new Date(Date.now() + days * DAY_MS);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

function seed() {
  const pipelineId = uid();
  const stages = DEFAULT_STAGES.map((stage, index) => ({ ...stage, id: uid(), pipeline_id: pipelineId, order_nr: index, deleted_at: null }));
  const [qualified, contact, needs, proposal, negotiation] = stages;
  const deal = (stage, fields) => ({
    id: uid(),
    pipeline_id: pipelineId,
    stage_id: stage.id,
    value: 0,
    currency: 'CAD',
    probability: null,
    status: 'open',
    lost_reason: null,
    owner_name: 'Tobi',
    person_name: null,
    org_name: null,
    label: null,
    expected_close_date: null,
    next_activity_at: null,
    next_activity_subject: null,
    created_at: daysFromNow(-20),
    last_touched_at: daysFromNow(-1),
    stage_changed_at: daysFromNow(-3),
    won_at: null,
    lost_at: null,
    deleted_at: null,
    ...fields,
  });
  return {
    pipelines: [{ id: pipelineId, name: 'Sales pipeline', order_nr: 0, deal_probability_enabled: false, deleted_at: null, created_at: nowIso() }],
    stages,
    deals: [
      deal(qualified, { title: 'Intake automation', org_name: 'Maple Physio', person_name: 'Dana Li', value: 4800, label: 'warm', next_activity_at: daysFromNow(2), next_activity_subject: 'Discovery call' }),
      deal(qualified, { title: 'Invoice workflow review', org_name: 'Northline Freight', person_name: 'Sam Ortiz', value: 2500, created_at: daysFromNow(-2) }),
      deal(contact, { title: 'Scheduling assistant', org_name: 'Harbour Dental', person_name: 'Priya Nair', value: 7200, label: 'hot', next_activity_at: daysFromNow(0, 23), next_activity_subject: 'Follow-up email' }),
      deal(contact, { title: 'Quote follow-ups', org_name: 'Cedar Roofing', person_name: 'Mike Chen', value: 3900, last_touched_at: daysFromNow(-19), next_activity_at: daysFromNow(-2), next_activity_subject: 'Call back' }),
      deal(needs, { title: 'Client onboarding flow', org_name: 'Brightside Accounting', person_name: 'Leah Grant', value: 12000, label: 'warm', expected_close_date: daysFromNow(30).slice(0, 10), next_activity_at: daysFromNow(5), next_activity_subject: 'Workflow mapping session' }),
      deal(proposal, { title: 'Document intake agent', org_name: 'Fraser Legal', person_name: 'Owen Price', value: 18500, label: 'hot', expected_close_date: daysFromNow(14).slice(0, 10), last_touched_at: daysFromNow(-12) }),
      deal(negotiation, { title: 'Ops reporting build', org_name: 'Summit Clinics', person_name: 'Ana Ruiz', value: 26000, expected_close_date: daysFromNow(7).slice(0, 10), next_activity_at: daysFromNow(1), next_activity_subject: 'Contract review' }),
    ],
    events: [],
  };
}

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Storage blocked or corrupt: fall through to a fresh seed kept in memory.
  }
  return null;
}

let memory = read();

function db() {
  if (!memory) {
    memory = seed();
    write();
  }
  return memory;
}

function write() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    // Storage unavailable: data lives for this tab only.
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const byOrder = (a, b) => a.order_nr - b.order_nr;

export const localStore = {
  mode: 'demo',

  async getUser() {
    return { name: 'Demo user', email: null, hasAccess: true };
  },
  async login() {
    return this.getUser();
  },
  async logout() {},

  async resetDemo() {
    memory = seed();
    write();
  },

  async listPipelines() {
    return clone(db().pipelines.filter((p) => !p.deleted_at).sort(byOrder));
  },

  async createPipeline({ name, deal_probability_enabled = false }, stages = DEFAULT_STAGES) {
    const data = db();
    const pipeline = { id: uid(), name, deal_probability_enabled, order_nr: data.pipelines.length, deleted_at: null, created_at: nowIso() };
    data.pipelines.push(pipeline);
    stages.forEach((stage, index) => data.stages.push({ ...stage, id: uid(), pipeline_id: pipeline.id, order_nr: index, deleted_at: null }));
    write();
    return clone(pipeline);
  },

  async updatePipeline(id, patch) {
    const pipeline = db().pipelines.find((p) => p.id === id);
    Object.assign(pipeline, patch);
    write();
    return clone(pipeline);
  },

  async deletePipeline(id) {
    const data = db();
    if (data.deals.some((d) => d.pipeline_id === id && !d.deleted_at)) throw new Error('Move or delete this pipeline’s deals first.');
    data.pipelines.find((p) => p.id === id).deleted_at = nowIso();
    write();
  },

  async listStages(pipelineId) {
    return clone(db().stages.filter((s) => s.pipeline_id === pipelineId && !s.deleted_at).sort(byOrder));
  },

  // Replace a pipeline's stages with the edited list (new ones have no id; missing ones are soft-deleted).
  async saveStages(pipelineId, edited) {
    const data = db();
    const keep = new Set(edited.filter((s) => s.id).map((s) => s.id));
    for (const stage of data.stages.filter((s) => s.pipeline_id === pipelineId && !s.deleted_at && !keep.has(s.id))) {
      if (data.deals.some((d) => d.stage_id === stage.id && !d.deleted_at && d.status === 'open')) {
        throw new Error(`“${stage.name}” still has open deals. Move them before deleting the stage.`);
      }
      stage.deleted_at = nowIso();
    }
    edited.forEach((stage, index) => {
      const fields = { name: stage.name, probability: Number(stage.probability), rot_enabled: Boolean(stage.rot_enabled), rot_days: stage.rot_enabled ? Number(stage.rot_days) || null : null, order_nr: index };
      if (stage.id) Object.assign(data.stages.find((s) => s.id === stage.id), fields);
      else data.stages.push({ ...fields, id: uid(), pipeline_id: pipelineId, deleted_at: null });
    });
    write();
    return this.listStages(pipelineId);
  },

  async countOpenDealsByStage(pipelineId) {
    const counts = {};
    for (const d of db().deals) if (d.pipeline_id === pipelineId && d.status === 'open' && !d.deleted_at) counts[d.stage_id] = (counts[d.stage_id] || 0) + 1;
    return counts;
  },

  async listDeals(pipelineId) {
    return clone(db().deals.filter((d) => d.pipeline_id === pipelineId && d.status === 'open' && !d.deleted_at));
  },

  async createDeal(fields) {
    const data = db();
    const at = nowIso();
    const deal = { probability: null, lost_reason: null, won_at: null, lost_at: null, deleted_at: null, ...fields, id: uid(), status: 'open', created_at: at, last_touched_at: at, stage_changed_at: at };
    data.deals.push(deal);
    data.events.push({ id: uid(), deal_id: deal.id, pipeline_id: deal.pipeline_id, from_stage_id: null, to_stage_id: deal.stage_id, at });
    write();
    return clone(deal);
  },

  async getDealDetails(deal) {
    const activities = (db().activities || []).filter((a) => a.deal_id === deal.id).sort((a, b) => b.occurred_at.localeCompare(a.occurred_at));
    return { company: null, contact: null, activities: clone(activities) };
  },

  async addActivity(deal, { type, summary, occurred_at }) {
    const data = db();
    data.activities = data.activities || [];
    const activity = { id: uid(), deal_id: deal.id, type, summary, occurred_at: occurred_at || nowIso() };
    data.activities.push(activity);
    data.deals.find((d) => d.id === deal.id).last_touched_at = nowIso();
    write();
    return clone(activity);
  },

  async updateDeal(id, patch) {
    const data = db();
    const deal = data.deals.find((d) => d.id === id);
    const at = nowIso();
    if (patch.stage_id && patch.stage_id !== deal.stage_id) {
      data.events.push({ id: uid(), deal_id: id, pipeline_id: patch.pipeline_id || deal.pipeline_id, from_stage_id: deal.stage_id, to_stage_id: patch.stage_id, at });
      patch = { ...patch, stage_changed_at: at };
    }
    Object.assign(deal, patch, { last_touched_at: at });
    write();
    return clone(deal);
  },
};
