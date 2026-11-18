// Loads CRM seed data (stages, companies, contacts, deals, activities) into the Appwrite pipeline tables.
// Re-runnable: rows use the seed's own IDs, so running it again updates them instead of duplicating.
//
// The seed file holds client contact details, so keep it out of the repo. Usage:
//   APPWRITE_ENDPOINT=https://tor.cloud.appwrite.io/v1 APPWRITE_PROJECT_ID=<id> APPWRITE_API_KEY=<key> \
//   node scripts/seed-appwrite.mjs /path/to/seed.json
//
// Seed format: see the `pipeline_stages`, `companies`, `contacts`, `deals` and `activities` arrays below.
// Stages named Won/Lost (ids stage_won / stage_lost) become deal statuses, not board columns.
import { readFileSync } from 'node:fs';
import { AppwriteException, Client, ID, Query, TablesDB } from 'node-appwrite';

const { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID = 'crm', PIPELINE_NAME = 'Sales pipeline' } = process.env;
const file = process.argv[2];
if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY || !file) {
  console.error('Set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID and APPWRITE_API_KEY, and pass the seed JSON path.');
  process.exit(1);
}

const seed = JSON.parse(readFileSync(file, 'utf8'));
const db = new TablesDB(new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY));
const databaseId = APPWRITE_DATABASE_ID;

const STATUS_STAGES = { stage_won: 'won', stage_lost: 'lost' };

// Stage defaults the seed doesn't specify. Edit them later in the board's pipeline editor.
const STAGE_DEFAULTS = {
  stage_lead: { probability: 10, rot_enabled: false, rot_days: null },
  stage_review_booked: { probability: 20, rot_enabled: true, rot_days: 14 },
  stage_review_done: { probability: 40, rot_enabled: true, rot_days: 14 },
  stage_demo_sent: { probability: 60, rot_enabled: true, rot_days: 14 },
  stage_proposal: { probability: 75, rot_enabled: true, rot_days: 14 },
  stage_on_hold: { probability: 30, rot_enabled: false, rot_days: null },
};

// Date-only seed values: activities at noon UTC, next steps at 9:00 Toronto time (14:00 UTC in winter).
const atNoon = (date) => (date ? `${date}T12:00:00.000Z` : null);
const atNine = (date) => (date ? `${date}T14:00:00.000Z` : null);
const nullIfEmpty = (value) => (value === undefined || value === '' ? null : value);

const upsert = (tableId, rowId, data) => db.upsertRow({ databaseId, tableId, rowId, data });
const list = async (tableId, queries) => (await db.listRows({ databaseId, tableId, queries: [...queries, Query.limit(500)] })).rows;

// 1. Pipeline: reuse the existing one by name, or create it.
let [pipeline] = await list('pipelines', [Query.equal('name', PIPELINE_NAME), Query.isNull('deleted_at')]);
if (!pipeline) pipeline = await db.createRow({ databaseId, tableId: 'pipelines', rowId: ID.unique(), data: { name: PIPELINE_NAME, order_nr: 0, deal_probability_enabled: false } });
console.log(`pipeline  ${pipeline.name} (${pipeline.$id})`);

// 2. Stages: seed stages become the columns; other empty stages in this pipeline are removed.
const columnStages = seed.pipeline_stages.filter((s) => !STATUS_STAGES[s.id]).sort((a, b) => a.order - b.order);
const seedStageIds = new Set(columnStages.map((s) => s.id));
for (const stage of await list('stages', [Query.equal('pipeline_id', pipeline.$id)])) {
  if (seedStageIds.has(stage.$id)) continue;
  const deals = await list('deals', [Query.equal('stage_id', stage.$id), Query.limit(1)]);
  if (deals.length) {
    console.log(`kept      stage "${stage.name}" (has deals)`);
    continue;
  }
  await db.deleteRow({ databaseId, tableId: 'stages', rowId: stage.$id });
  console.log(`removed   empty stage "${stage.name}"`);
}
for (const [index, stage] of columnStages.entries()) {
  const defaults = STAGE_DEFAULTS[stage.id] || { probability: 50, rot_enabled: false, rot_days: null };
  await upsert('stages', stage.id, { pipeline_id: pipeline.$id, name: stage.name, order_nr: index, deleted_at: null, ...defaults });
  console.log(`stage     ${index + 1}. ${stage.name}`);
}

// 3. Companies and contacts.
const companies = new Map(seed.companies.map((c) => [c.id, c]));
for (const c of seed.companies) {
  await upsert('companies', c.id, { name: c.name, industry: nullIfEmpty(c.industry), location: nullIfEmpty(c.location), website: nullIfEmpty(c.website), size: nullIfEmpty(c.size), source: nullIfEmpty(c.source) });
  console.log(`company   ${c.name}`);
}
const contacts = new Map(seed.contacts.map((c) => [c.id, c]));
for (const c of seed.contacts) {
  await upsert('contacts', c.id, {
    company_id: nullIfEmpty(c.company_id), first_name: c.first_name, last_name: nullIfEmpty(c.last_name), role: nullIfEmpty(c.role),
    email: nullIfEmpty(c.email), alt_email: nullIfEmpty(c.alt_email), phone: nullIfEmpty(c.phone), notes: nullIfEmpty(c.notes),
  });
  console.log(`contact   ${c.first_name} ${c.last_name || ''}`.trimEnd());
}

// 4. Deals. The rotting clock and stage age start from the deal's latest logged activity.
const activitiesByDeal = Map.groupBy(seed.activities, (a) => a.deal_id);
const lastColumn = columnStages[columnStages.length - 1].id;
for (const d of seed.deals) {
  const company = companies.get(d.company_id);
  const contact = contacts.get(d.primary_contact_id);
  const dates = (activitiesByDeal.get(d.id) || []).map((a) => a.occurred_at).sort();
  const status = STATUS_STAGES[d.stage_id] || 'open';
  const touched = atNoon(dates.at(-1)) || new Date().toISOString();
  await upsert('deals', d.id, {
    pipeline_id: pipeline.$id,
    stage_id: status === 'open' ? d.stage_id : lastColumn,
    title: d.title,
    value: d.setup_fee_cad ?? 0,
    value_note: nullIfEmpty(d.setup_fee_range_cad),
    monthly_value: d.monthly_cad ?? null,
    currency: 'CAD',
    status,
    won_at: status === 'won' ? touched : null,
    lost_at: status === 'lost' ? touched : null,
    company_id: nullIfEmpty(d.company_id),
    contact_id: nullIfEmpty(d.primary_contact_id),
    org_name: company?.name ?? null,
    person_name: contact ? [contact.first_name, contact.last_name].filter(Boolean).join(' ') : null,
    notes: nullIfEmpty(d.status_note),
    next_activity_subject: nullIfEmpty(d.next_step),
    next_activity_at: atNine(d.next_step_due),
    last_touched_at: touched,
    stage_changed_at: touched,
    deleted_at: null,
  });
  // One event for the deal entering its current stage, so reports have a starting point.
  await upsert('deal_stage_events', `seed_${d.id}`.slice(0, 36), { deal_id: d.id, pipeline_id: pipeline.$id, from_stage_id: null, to_stage_id: status === 'open' ? d.stage_id : lastColumn, at: atNoon(dates[0]) || touched });
  console.log(`deal      ${d.title} [${status === 'open' ? d.stage_id : status}]`);
}

// 5. Activity history.
for (const a of seed.activities) {
  await upsert('activities', a.id, { deal_id: a.deal_id, type: a.type, occurred_at: atNoon(a.occurred_at), summary: a.summary });
}
console.log(`activities ${seed.activities.length}`);

process.on('unhandledRejection', (err) => {
  console.error(err instanceof AppwriteException ? `${err.code} ${err.message}` : err);
  process.exit(1);
});
