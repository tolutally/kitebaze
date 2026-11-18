// Creates the Appwrite database, tables, columns and indexes the /pipeline board uses.
// Safe to re-run: anything that already exists is left as it is.
//
// Usage (API key needs the databases.read and databases.write scopes):
//   APPWRITE_ENDPOINT=https://<region>.cloud.appwrite.io/v1 \
//   APPWRITE_PROJECT_ID=<project id> \
//   APPWRITE_API_KEY=<server API key> \
//   [APPWRITE_DATABASE_ID=crm] [APPWRITE_TEAM_ID=<team id>] \
//   node scripts/appwrite-setup-pipeline.mjs
//
// Access: with APPWRITE_TEAM_ID set, only members of that team can read and write pipeline data.
// Without it, any logged-in user of the project can. Create users in the Appwrite console.
import { AppwriteException, Client, Permission, Role, TablesDB, TablesDBIndexType } from 'node-appwrite';

const { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID = 'crm', APPWRITE_TEAM_ID } = process.env;

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY) {
  console.error('Set APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID and APPWRITE_API_KEY.');
  process.exit(1);
}

const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY);
const db = new TablesDB(client);
const databaseId = APPWRITE_DATABASE_ID;
const role = APPWRITE_TEAM_ID ? Role.team(APPWRITE_TEAM_ID) : Role.users();
const permissions = [Permission.read(role), Permission.create(role), Permission.update(role), Permission.delete(role)];

const id = (key) => ({ type: 'varchar', key, size: 36 });
const text = (key, size, required = false) => ({ type: 'varchar', key, size, required });
const int = (key, extra = {}) => ({ type: 'integer', key, ...extra });
const datetime = (key) => ({ type: 'datetime', key });

const SCHEMA = [
  {
    tableId: 'pipelines',
    name: 'Pipelines',
    columns: [text('name', 128, true), int('order_nr', { xdefault: 0 }), { type: 'boolean', key: 'deal_probability_enabled', xdefault: false }, datetime('deleted_at')],
    indexes: [['order_idx', ['order_nr']]],
  },
  {
    tableId: 'stages',
    name: 'Stages',
    columns: [
      { ...id('pipeline_id'), required: true }, text('name', 128, true), int('order_nr', { xdefault: 0 }),
      int('probability', { min: 0, max: 100, xdefault: 100 }), { type: 'boolean', key: 'rot_enabled', xdefault: false },
      int('rot_days', { min: 1, max: 3650 }), datetime('deleted_at'),
    ],
    indexes: [['pipeline_order_idx', ['pipeline_id', 'order_nr']]],
  },
  {
    tableId: 'deals',
    name: 'Deals',
    columns: [
      { ...id('pipeline_id'), required: true }, { ...id('stage_id'), required: true }, text('title', 255, true),
      { type: 'float', key: 'value', min: 0, xdefault: 0 }, text('currency', 3), int('probability', { min: 0, max: 100 }),
      { type: 'enum', key: 'status', elements: ['open', 'won', 'lost'], xdefault: 'open' }, text('lost_reason', 255),
      text('owner_name', 128), text('person_name', 128), text('org_name', 128), text('label', 32),
      datetime('expected_close_date'), datetime('next_activity_at'), text('next_activity_subject', 255),
      datetime('last_touched_at'), datetime('stage_changed_at'), datetime('won_at'), datetime('lost_at'), datetime('deleted_at'),
    ],
    indexes: [['board_idx', ['pipeline_id', 'status']], ['stage_idx', ['stage_id']]],
  },
  {
    tableId: 'deal_stage_events',
    name: 'Deal stage events',
    columns: [{ ...id('deal_id'), required: true }, { ...id('pipeline_id'), required: true }, id('from_stage_id'), { ...id('to_stage_id'), required: true }, { ...datetime('at'), required: true }],
    indexes: [['deal_idx', ['deal_id']], ['pipeline_at_idx', ['pipeline_id', 'at']]],
  },
];

async function ignoreExisting(label, fn) {
  try {
    await fn();
    console.log(`created  ${label}`);
  } catch (err) {
    if (err instanceof AppwriteException && err.code === 409) console.log(`exists   ${label}`);
    else throw err;
  }
}

function createColumn(tableId, column) {
  const { type, ...rest } = column;
  const params = { databaseId, tableId, required: false, ...rest };
  if (params.required) delete params.xdefault; // Appwrite rejects defaults on required columns.
  switch (type) {
    case 'varchar': return db.createVarcharColumn(params);
    case 'integer': return db.createIntegerColumn(params);
    case 'float': return db.createFloatColumn(params);
    case 'boolean': return db.createBooleanColumn(params);
    case 'datetime': return db.createDatetimeColumn(params);
    case 'enum': return db.createEnumColumn(params);
    default: throw new Error(`Unknown column type ${type}`);
  }
}

async function waitForColumns(tableId) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const { columns } = await db.listColumns({ databaseId, tableId });
    const failed = columns.filter((c) => c.status === 'failed');
    if (failed.length) throw new Error(`Columns failed in ${tableId}: ${failed.map((c) => `${c.key} (${c.error})`).join(', ')}`);
    if (columns.every((c) => c.status === 'available')) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for ${tableId} columns to become available.`);
}

// Look before creating: on a plan's database limit Appwrite reports the limit, not "already exists".
const databaseExists = await db.get({ databaseId }).then(() => true, (err) => {
  if (err instanceof AppwriteException && err.code === 404) return false;
  throw err;
});
if (databaseExists) console.log(`exists   database ${databaseId}`);
else await ignoreExisting(`database ${databaseId}`, () => db.create({ databaseId, name: 'Kitebaze CRM' }));

for (const table of SCHEMA) {
  await ignoreExisting(`table ${table.tableId}`, () => db.createTable({ databaseId, tableId: table.tableId, name: table.name, permissions, rowSecurity: false }));
  // Re-apply access on every run so changing APPWRITE_TEAM_ID takes effect on existing tables.
  await db.updateTable({ databaseId, tableId: table.tableId, name: table.name, permissions, rowSecurity: false });
  for (const column of table.columns) {
    await ignoreExisting(`  column ${table.tableId}.${column.key}`, () => createColumn(table.tableId, column));
  }
  await waitForColumns(table.tableId);
  for (const [key, columns] of table.indexes) {
    await ignoreExisting(`  index ${table.tableId}.${key}`, () => db.createIndex({ databaseId, tableId: table.tableId, key, type: TablesDBIndexType.Key, columns }));
  }
}

console.log(`\nDone. Set these for the site (Vercel project settings and .env.local):
  VITE_APPWRITE_ENDPOINT=${APPWRITE_ENDPOINT}
  VITE_APPWRITE_PROJECT_ID=${APPWRITE_PROJECT_ID}
  VITE_APPWRITE_DATABASE_ID=${databaseId}
Then add your site's domain as a Web platform in the Appwrite console so the browser can call it.`);
