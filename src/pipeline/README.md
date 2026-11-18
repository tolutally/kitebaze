# Deal pipeline board (`/pipeline`)

An internal kanban board for deals, modelled on Pipedrive's pipeline view (see `reverse-engineering/pipedrive/deal-pipeline/`). It is not linked from the site, not in the sitemap, and served with `noindex`.

## What it does
- One board per pipeline. Stages are columns; switch pipelines from the dropdown or create a new one.
- Drag cards between stages. While dragging, drop zones appear for **Delete**, **Lost** (asks for a reason), **Won** and **Move to…** another pipeline. Won, lost, delete and move all have an Undo.
- Column headers show the deal count and total value per currency; the top bar shows the board total and weighted value.
- **Weighted value** = value × probability. The stage probability applies unless the pipeline has per-deal probability turned on and the deal has its own.
- **Rotting**: per stage, a deal not touched for N days turns red. Any edit, a stage move or marking the next activity done resets the clock. Future activities do not.
- Cards are sorted by next activity by default (overdue, due today, planned, none), ties newest first. Other sorts and a reverse toggle are in the toolbar.
- The pipeline editor (pencil button) renames the pipeline, adds, reorders and deletes stages, and sets probability and rotting. A stage with open deals can't be deleted.
- Clicking a card opens the full deal form, which also works on touch screens where drag-and-drop doesn't.
- Every stage change is logged to `deal_stage_events` for future conversion and time-in-stage reports.
- The deal dialog shows the linked company and contact, notes, the monthly fee and the activity history, and logs new calls, emails, meetings and WhatsApp messages. Logging an activity (or marking the next step done) resets rotting.

## Data
The board uses Kitebaze's Appwrite project (Toronto region, project `6afdd34c0009ec87e52f`, database `crm`). These IDs are built in as defaults in `store/index.js`, so no Vercel variables are needed. Set `VITE_PIPELINE_DEMO=true` to run on browser-only sample data instead.

- **Login:** email one-time code. Anyone can request a code, but the tables only allow the Appwrite team **`pipeline`**, and users outside it see a "No access yet" screen.
- **Add a person:** Appwrite console → Auth → Teams → Pipeline → add member (or `npx appwrite teams create-membership --team-id pipeline --email <email> --roles member`).
- **Allowed domains:** `localhost`, `kitebaze.com`, `www.kitebaze.com` are registered as web platforms. Vercel preview URLs are not, so the board only works on those domains.
- **Schema changes:** edit `scripts/appwrite-setup-pipeline.mjs` and re-run it. It is idempotent and re-applies table permissions:
  ```bash
  APPWRITE_ENDPOINT=https://tor.cloud.appwrite.io/v1 APPWRITE_PROJECT_ID=6afdd34c0009ec87e52f APPWRITE_API_KEY=<key> APPWRITE_TEAM_ID=pipeline npm run setup:appwrite
  ```

## Seed data
`scripts/appwrite-seed-pipeline.mjs` loads stages, companies, contacts, deals and activity history from a JSON file. It is re-runnable (rows keep the seed's IDs) and treats stages with IDs `stage_won` / `stage_lost` as deal statuses, not columns. Stage probabilities and rotting days the seed doesn't give are set in the script's `STAGE_DEFAULTS`. Keep seed files out of the repo: they hold client contact details.

```bash
APPWRITE_ENDPOINT=https://tor.cloud.appwrite.io/v1 APPWRITE_PROJECT_ID=6afdd34c0009ec87e52f APPWRITE_API_KEY=<key> node scripts/appwrite-seed-pipeline.mjs /path/to/seed.json
```

## Code
- `logic.js`: pure board rules (probability, rotting, sorting, totals).
- `store/`: `appwriteStore.js` (TablesDB) and `localStore.js` (demo) share one interface; `store/index.js` picks one.
- `Board.jsx`, `components/`: UI. `PipelinePage.jsx`: login gate.
- `scripts/appwrite-setup-pipeline.mjs`: idempotent schema setup.
