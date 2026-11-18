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

## Data
Without Appwrite settings the board runs in **demo mode** on sample data saved in the browser.

To use Appwrite:
1. In the Appwrite console, create a project, a server API key with the `databases.read` and `databases.write` scopes, and (optionally) a team for the people who should see the pipeline.
2. Create the schema:
   ```bash
   APPWRITE_ENDPOINT=https://<region>.cloud.appwrite.io/v1 APPWRITE_PROJECT_ID=<id> APPWRITE_API_KEY=<key> APPWRITE_TEAM_ID=<optional team id> npm run setup:appwrite
   ```
3. Add the site's domains (e.g. `kitebaze.com`, `localhost`) as **Web platforms** in the Appwrite project.
4. Set `VITE_APPWRITE_ENDPOINT`, `VITE_APPWRITE_PROJECT_ID` and `VITE_APPWRITE_DATABASE_ID` in Vercel and in `.env.local` (see `.env.example`), then redeploy.
5. Create users in the Appwrite console (Auth). They log in on `/pipeline` with email and password.

## Code
- `logic.js`: pure board rules (probability, rotting, sorting, totals).
- `store/`: `appwriteStore.js` (TablesDB) and `localStore.js` (demo) share one interface; `store/index.js` picks one.
- `Board.jsx`, `components/`: UI. `PipelinePage.jsx`: login gate.
- `scripts/appwrite-setup-pipeline.mjs`: idempotent schema setup.
