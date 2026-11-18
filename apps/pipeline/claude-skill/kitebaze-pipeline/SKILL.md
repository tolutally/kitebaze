---
name: kitebaze-pipeline
description: Read and update the Kitebaze deal pipeline (pipeline.kitebaze.com) through the Appwrite connector. Use whenever the user asks about their deals, pipeline, prospects or clients (Radex, Dragon Fire, Ann & Eli and others), or wants to add a deal, move a deal to another stage, mark it won or lost, log a call/email/meeting/WhatsApp, set a next step or follow-up date, or get a pipeline summary.
---

# Kitebaze deal pipeline

The board at pipeline.kitebaze.com reads an Appwrite database. Updating that database through the Appwrite connector updates the board. Follow the rules below exactly: the board relies on them for stage history, rotting and totals.

## Connection
- Tools: `appwrite_call_tool` for reads, `appwrite_call_write_tool` for writes (set `confirm_write: true` and a short `reason`, which lands in Appwrite's audit log).
- Always pass `project_id: "6afdd34c0009ec87e52f"`. Every table is in `database_id: "crm"`.
- Reads: `tables_db_list_rows` / `tables_db_get_row`. Writes: `tables_db_create_row` (use `row_id: "unique()"`), `tables_db_update_row` (send only changed columns in `data`).
- Queries are JSON strings in `queries`, e.g. `{"method":"equal","attribute":"status","values":["open"]}`, `{"method":"isNull","attribute":"deleted_at"}`, `{"method":"orderDesc","attribute":"occurred_at"}`, `{"method":"limit","values":[100]}`.
- Row fields come back under `data`; the row ID is `$id`.

## Tables
- **pipelines**: `name`, `order_nr`, `deal_probability_enabled`, `deleted_at`. The main one is "Sales pipeline".
- **stages**: `pipeline_id`, `name`, `order_nr`, `probability` (0–100), `rot_enabled`, `rot_days`, `deleted_at`. Current stage IDs, in order: `stage_lead` (Lead), `stage_review_booked` (Workflow review booked), `stage_review_done` (Workflow review done), `stage_demo_sent` (Plan / demo shared), `stage_proposal` (Price proposed), `stage_on_hold` (On hold). List stages to confirm before using one.
- **deals**: `pipeline_id`, `stage_id`, `title` (required), `value` (one-time setup fee), `monthly_value`, `value_note`, `currency` (always "CAD"), `probability` (leave null), `status` (`open` | `won` | `lost`), `lost_reason`, `org_name`, `person_name`, `company_id`, `contact_id`, `owner_name`, `label` (`hot` | `warm` | `cold` | null), `expected_close_date`, `next_activity_subject`, `next_activity_at`, `notes`, `last_touched_at`, `stage_changed_at`, `won_at`, `lost_at`, `deleted_at`.
- **companies**: `name`, `industry`, `location`, `website`, `size`, `source`, `deleted_at`.
- **contacts**: `company_id`, `first_name`, `last_name`, `role`, `email`, `alt_email`, `phone`, `notes`, `deleted_at`.
- **activities**: `deal_id`, `type` (`call` | `email` | `meeting` | `whatsapp` | `task` | `note`), `occurred_at`, `summary` (≤ 500 chars).
- **deal_stage_events**: `deal_id`, `pipeline_id`, `from_stage_id` (null for a new deal), `to_stage_id`, `at`. Append only.

## Rules
- **Dates and times** are ISO 8601 in UTC. The user is in Toronto (America/Toronto): convert their local times, and treat a bare date for a next step as 9:00 Toronto time. "Now" means the current UTC time.
- **Won and Lost are statuses, not stages.** Won: set `status: "won"`, `won_at`. Lost: set `status: "lost"`, `lost_at`, and `lost_reason` if given. Leave `stage_id` as is. Undo: `status: "open"` and clear those fields.
- **Moving a stage:** update the deal's `stage_id`, `stage_changed_at` and `last_touched_at` to now, then create a `deal_stage_events` row (`from_stage_id` = old stage, `to_stage_id` = new stage, `at` = now). Moving to another pipeline also sets `pipeline_id`.
- **Logging an activity** (call, email, meeting, WhatsApp, note): create an `activities` row, then set the deal's `last_touched_at` to now. This is what resets rotting.
- **Next step:** set `next_activity_subject` and `next_activity_at`. When the user says a next step is done, log it as a `task` activity ("Done: …"), then clear both fields or set the new next step.
- **Any other deal edit** also sets `last_touched_at` to now.
- **New deal:** needs a title, and a company or a contact. Find the company and contact first (match on name) and create them if missing. Create the deal with `pipeline_id`, `stage_id`, `status: "open"`, `currency: "CAD"`, `org_name` / `person_name` copied from the linked records, `company_id` / `contact_id`, and `last_touched_at` / `stage_changed_at` set to now. Then add a `deal_stage_events` row with `from_stage_id: null`.
- **Never hard-delete.** To delete, set `deleted_at` to now. Don't change pipelines, stages, columns or table settings unless the user explicitly asks.
- **Finding deals:** list open, non-deleted deals and match the user's words against `title`, `org_name` and `person_name`. If several match, ask which one.

## How to work
- Confirm before won/lost, delete, or anything touching several deals. Simple edits the user stated plainly (log this call, move X to Price proposed) can go ahead.
- After writing, tell the user in one or two lines what changed, e.g. "Moved Radex to Price proposed and logged the call. Next step: send proposal, Fri Nov 21."
- **Pipeline summaries:** group open deals by stage in stage order, with setup fees, monthly fees and next steps. Flag overdue next steps (`next_activity_at` in the past). Flag rotting deals: the stage has `rot_enabled` and `last_touched_at` is more than `rot_days` days ago.
- **Weighted value** = value × probability, using the stage's probability unless the pipeline has `deal_probability_enabled` and the deal has its own.
- Contact details and notes are private client data: use them to answer the user, and don't send them anywhere else.
