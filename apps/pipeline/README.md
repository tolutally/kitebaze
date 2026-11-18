# Deal pipeline board (`pipeline.kitebaze.com`)

An internal kanban board for deals, modelled on Pipedrive's pipeline view (see `reverse-engineering/pipedrive/deal-pipeline/` at the repo root).

This is a standalone Vite app, separate from the Kitebaze website at the repo root. It has its own dependencies, build and Vercel project, and shares no code or config with the website.

## Deploy (Vercel)
- **Project:** a separate Vercel project, imported from this repo with **Root Directory** set to `apps/pipeline`. Vercel picks up `vercel.json` here (Vite preset, SPA rewrite, `noindex` on every response).
- **Domain:** `pipeline.kitebaze.com`, added to that project. The website's Vercel project is not involved.
- **Skipped builds:** `ignoreCommand` skips a deployment when nothing under `apps/pipeline/` changed, so website-only commits don't redeploy the board.
- **Env vars:** none needed. The Appwrite project IDs are built in (see `src/store/index.js`).

## Develop
```bash
cd apps/pipeline
npm install
npm run dev
```

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
- **Add a person:** Appwrite console → Auth → Teams → Pipeline → add member (or `npx appwrite-cli@28.10.2 teams create-membership --team-id pipeline --email <email> --roles member`).
- **Allowed domains:** `localhost`, `pipeline.kitebaze.com` and `kitebaze-pipeline.vercel.app` are registered as web platforms (the plan allows 3). Per-branch Vercel preview URLs are not, so the board can't load data there.
- **Schema changes:** edit `scripts/setup-appwrite.mjs` and re-run it. It is idempotent and re-applies table permissions:
  ```bash
  APPWRITE_ENDPOINT=https://tor.cloud.appwrite.io/v1 APPWRITE_PROJECT_ID=6afdd34c0009ec87e52f APPWRITE_API_KEY=<key> APPWRITE_TEAM_ID=pipeline npm run setup:appwrite   # from apps/pipeline
  ```

## Seed data
`scripts/seed-appwrite.mjs` loads stages, companies, contacts, deals and activity history from a JSON file. It is re-runnable (rows keep the seed's IDs) and treats stages with IDs `stage_won` / `stage_lost` as deal statuses, not columns. Stage probabilities and rotting days the seed doesn't give are set in the script's `STAGE_DEFAULTS`. Keep seed files out of the repo: they hold client contact details.

```bash
APPWRITE_ENDPOINT=https://tor.cloud.appwrite.io/v1 APPWRITE_PROJECT_ID=6afdd34c0009ec87e52f APPWRITE_API_KEY=<key> node scripts/seed-appwrite.mjs /path/to/seed.json
```

## Code
- `src/logic.js`: pure board rules (probability, rotting, sorting, totals).
- `src/store/`: `appwriteStore.js` (TablesDB) and `localStore.js` (demo) share one interface; `store/index.js` picks one.
- `src/Board.jsx`, `src/components/`: UI. `src/PipelinePage.jsx`: login gate. `src/main.jsx`: entry.
- `scripts/setup-appwrite.mjs`: idempotent schema setup.
