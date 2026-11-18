# Pipedrive deal pipeline: deep dive

How Pipedrive's deal pipeline (the kanban board of deals moving through stages) works, reconstructed from public artefacts with [REA](https://github.com/morluto/rea) v6.9.0.

Captured 2026-11-18. Every claim below is tagged with its source:

| Tag | Source | Where it is in this folder |
| --- | --- | --- |
| **[API]** | Pipedrive's published OpenAPI specs, v1 and v2 (`developers.pipedrive.com/docs/api/v1/openapi.json`, `openapi-v2.yaml`) | `evidence/api/`, `evidence/rea/inspect-api-contract-*.json` |
| **[KB]** | Pipedrive Knowledge Base articles | `evidence/help-centre/` |
| **[INF]** | My inference from the above. Not directly observed. | n/a |

**Not covered:** the board's frontend code. Pipedrive only loads it after login. REA captured the public login page (`evidence/rea/analyze-web-bundle-login.json`), but it ships only the auth bundle (`cdn.was-1.pipedriveassets.com/auth/assets/*`: login form, reCAPTCHA, CSRF), with no pipeline code. So the UI internals (state management, drag-and-drop library, realtime transport) are not reverse engineered here. Everything about behaviour comes from the API contract and Pipedrive's own documentation.

---

## 1. Data model

Three entities. A deal belongs to exactly one pipeline and one stage at a time. **[API][KB]**

```
Pipeline 1──* Stage 1──* Deal
   │                       │
   └── order_nr            ├── status: open | won | lost | deleted
       is_deal_probability │   (only open deals show on the board)
       _enabled            └── person_id / org_id / owner_id / label_ids
```

### Pipeline **[API]** (`GET /api/v2/pipelines`)

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | int | |
| `name` | string | |
| `order_nr` | int | Order in the pipeline dropdown. **The lowest `order_nr` is the default pipeline.** |
| `is_deal_probability_enabled` | bool | When true, each deal can have its own probability, which overrides the stage probability. |
| `is_deleted` | bool | Soft delete. |
| `add_time`, `update_time` | datetime | |

### Stage **[API]** (`GET /api/v2/stages?pipeline_id=…&sort_by=order_nr`)

| Field | Type | Meaning |
| --- | --- | --- |
| `id`, `name`, `pipeline_id` | | |
| `order_nr` | int | Column order on the board. |
| `deal_probability` | int (0–100) | Stage win probability, used for weighted value. |
| `is_deal_rot_enabled` | bool | Whether deals in this stage can go rotten. |
| `days_to_rotten` | int, nullable | Days without an update before a deal rots. Used only when rot is enabled. |
| `is_deleted` | bool | Soft delete. |
| `add_time`, `update_time` | datetime | |

### Deal: fields the board uses **[API]**

| Field | Meaning on the board |
| --- | --- |
| `title` (required) | Card heading. The only required field on create. |
| `pipeline_id`, `stage_id` | Board and column the deal sits in. |
| `stage_change_time` | Last time the stage changed. Drives "time in stage". |
| `status` | `open`, `won`, `lost` or `deleted`. Only `open` deals render on the board. |
| `value`, `currency` | Card value. Summed in column headers. |
| `probability` | Per-deal override. Nullable. |
| `weighted_value` *(v1)* | `probability × value`, where probability is the deal probability if set, otherwise the stage probability. |
| `rotten_time` *(v1)* | When the deal became rotten (nullable). |
| `update_time` | Starting point of the rotting clock. |
| `owner_id`, `person_id`, `org_id`, `label_ids` | Default card fields. |
| `next_activity_id/_date/_time/_subject/_type` *(v1)* | Activity indicator on the card and the default sort key. |
| `expected_close_date` | Sort option, and a common card field. |
| `won_time`, `lost_time`, `close_time`, `first_won_time`, `lost_reason` | Set when a deal is closed. `lost_reason` is only allowed when the status is `lost`. `won_time` only when it is `won`. |
| `is_archived`, `archive_time` | Archived deals are excluded from `GET /deals` and have their own `GET /deals/archived`. |
| `visible_to` | Visibility group. Combined with pipeline visibility. |
| `custom_fields` | Keyed by 40-character hashes. |
| `stage_order_nr` *(v1)* | The stage's `order_nr`, denormalised onto the deal. |

Fields marked *(v1)* appear in the v1 deal payload but not in v2. v2 drops the computed and display fields (`weighted_value`, `rotten_time`, `formatted_value`, `next_activity_*`, `stage_order_nr`). v2 can return counts via `include_fields` (`activities_count`, `undone_activities_count`, `products_count`, `next_activity_id`, …).

---

## 2. Board rules

### 2.1 Columns and pipelines
- A board shows one pipeline. Its stages are the columns, ordered by `stage.order_nr`. **[API][KB]**
- Pipedrive cannot show several pipelines combined on one board, even when their stage names match. "Each pipeline and its stages are stored and managed separately." **[KB]**
- New pipelines start from a five-stage template. Stages can be inserted between existing ones (`+` on hover), renamed and deleted. **[KB]**
- **Deleting a stage also deletes the deals in it.** The UI warns users to move them first. **[KB]** (Stage delete in the API is a soft delete: `is_deleted`.) **[API]**
- Only deal admins can create or edit pipelines and reorder them. **[KB]**
- Pipelines can be duplicated. **[KB]** (The API has no duplicate endpoint, so the UI copies the pipeline and its stages client-side or through an internal endpoint.) **[INF]**

### 2.2 Cards
- Default card fields: title, linked person and organisation, value, label, owner. Plus an activity icon that opens a quick activity popover where you can mark activities done or schedule new ones. **[KB]**
- Each user can add up to **7 extra fields** per pipeline (deal, person or organisation fields). Large-text, multi-option and date-range fields are not allowed. **[KB]**
- Clicking a card opens the deal detail view. **[KB]**

### 2.3 Sorting within a column
- **The default sort is activity-based.** Deals are ordered by their next scheduled activity, so the most urgent are at the top. **Ties are broken by creation time, newest first.** **[KB]**
- Other sort options: deal title, value, linked person name, linked org name, expected close date, creation time, done-activities count, activities to do, product count, owner name. Each can be reversed with "Change order". **[KB]**
- Order is computed, not manual. There is no persisted card position field on the deal in either API version. **[API]** So drag-and-drop changes the stage, not a rank. **[INF]**

### 2.4 Drag and drop
- Dragging a card to another column changes `stage_id`. **[KB][API]**
- The board has extra drop targets:
  - **"Delete"**: soft-deletes the deal. It can be restored for 30 days. **[KB][API]**
  - **"Move to"**: pick a different pipeline and stage. This changes `pipeline_id` and `stage_id` together. **[KB]**
  - **Won and Lost**: I think these targets exist (closing a deal is described as done from the board), but the articles captured here don't name them as drop targets. **[INF]**
- Moving a deal to another pipeline breaks its progress reporting. "Deal progress reports only reflect movements within the current pipeline." **[KB]**

### 2.5 Won, lost and deleted
- Won and lost deals leave the board. You see them again with a status filter. **[KB]**
- `lost_reason`, `lost_time`, `won_time` and `close_time` can only be set for the matching status. **[API]**
- Deleted deals are kept for 30 days (`status=deleted` returns them), then purged. **[API][KB]**

### 2.6 Rotting
- Per stage: `is_deal_rot_enabled` + `days_to_rotten`, set with the "Rotting in (days)" toggle in the pipeline editor. **[API][KB]**
- **The clock runs from the deal's last update time**, not from the stage-entry time. **[KB]**
- Actions that reset the clock: marking an activity done, adding a note or file, email actions (send, receive, unlink, delete), and editing any deal field (value, close date, custom fields). Scheduling a new activity also restores a rotten deal. **[KB]**
- **Future activities do not prevent rotting.** The next activity date is ignored. **[KB]**
- Rotten deals show **red** on the board. **[KB]** The time the deal rotted is exposed as `rotten_time`. **[API]**
- Likely calculation: `rotten = status == open && stage.is_deal_rot_enabled && now > update_time + stage.days_to_rotten days`. **[INF]**
- Some resets are invisible to certain users (for example, emails they can't see). So a deal can look untouched yet not be rotten. **[KB]**

### 2.7 Probability and weighted value
- Stage probability (`stage.deal_probability`) is the baseline. **[API][KB]**
- If `pipeline.is_deal_probability_enabled`, each deal can carry `probability`, and **the deal probability overrides the stage probability**. **[API][KB]**
- `weighted_value = probability × value`. It uses the deal probability if set, otherwise the stage probability. **[API]**

### 2.8 Column header totals
- Column headers show each stage's deal count and total value. **[INF]** (The board needs them, and the API serves exactly this data:)
  - `GET /api/v1/deals/summary?pipeline_id=&stage_id=&status=open` returns `total_count`, `values_total` per currency (`value`, `count`, `value_converted`), `weighted_values_total`, and converted totals in the company currency. **[API]**
  - The deprecated `GET /api/v1/pipelines/{id}/deals?get_summary=1` returns `additional_data.deals_summary.per_stages`, with `per_stages_converted` when `totals_convert_currency` is set. **[API]** This is the old one-call board load. Its shape is not fully declared in the spec.
- Mixed currencies are summed per currency and then converted to the company default currency. **[API]**

### 2.9 Visibility
- Admins can limit which pipelines a visibility group sees. Hidden pipelines vanish from the dropdown, lists, search and filters. Each user must keep at least one visible pipeline. Deal and account-settings admins see everything. **[KB]**
- Without a filter, the legacy board endpoints return **open deals owned by the current user**. `everyone=1` returns all users' deals. `user_id` and `filter_id` scope the results. **[API]**

### 2.10 Filtering
- The board accepts a saved filter (`filter_id`) or an owner (`owner_id`/`user_id`). `filter_id` takes priority over the other params. **[API][KB]**
- Quick filters (up to 10 conditions) exist only on the list view, not the board. **[KB]**

---

## 3. Request flows

Reconstructed from the API contract. The real web app may call internal endpoints instead. **[INF]**

### Load the board
```http
GET /api/v2/pipelines?sort_by=id                         # dropdown; default = lowest order_nr
GET /api/v2/stages?pipeline_id=7&sort_by=order_nr&limit=500
GET /api/v2/deals?pipeline_id=7&status=open&limit=500&cursor=…
    &include_fields=next_activity_id,undone_activities_count
    &include_labels=true
GET /api/v1/deals/summary?pipeline_id=7&stage_id=42&status=open   # per column header
```
v2 uses cursor pagination with a maximum `limit` of 500. v1 uses `start` and `limit`.

### Drag a card to another stage
```http
PATCH /api/v2/deals/123
{ "stage_id": 44 }
```
Server effects: `stage_change_time` and `update_time` are refreshed (which resets rotting), a `dealChange` entry is written to `GET /api/v1/deals/123/flow`, the move counts in `movements_between_stages`, and a `change.deal` webhook fires. **[API]**

### Move to another pipeline
```http
PATCH /api/v2/deals/123
{ "pipeline_id": 9, "stage_id": 61 }
```

### Mark won or lost
```http
PATCH /api/v2/deals/123
{ "status": "lost", "lost_reason": "Went with competitor" }
```

### Delete (drag to "Delete")
```http
DELETE /api/v2/deals/123        # soft delete, 30-day restore
PATCH  /api/v2/deals/123 { "is_deleted": false }   # restore
```

### Edit the pipeline (stage editor)
```http
POST   /api/v2/pipelines { "name": "...", "is_deal_probability_enabled": true }
POST   /api/v2/stages    { "pipeline_id": 9, "name": "Demo", "deal_probability": 40,
                           "is_deal_rot_enabled": true, "days_to_rotten": 14 }
PATCH  /api/v2/stages/61 { ... }
DELETE /api/v2/stages/61
```
The v2 stage create and update bodies have **no `order_nr` field**. So inserting a stage between two others isn't possible through the public v2 API, though the UI does it. **[API]** The UI must use an internal or v1 endpoint for ordering. **[INF]**

### Keep the board in sync
- External: webhooks with `event_action ∈ {create, change, delete, *}` × `event_object ∈ {deal, stage, pipeline, …}`. Webhooks v2 is the default from 2025-03-17. **[API]**
- Inside the web app the realtime transport is unknown (it is behind login). **[INF]**

---

## 4. Pipeline analytics

| Endpoint | Returns |
| --- | --- |
| `GET /v1/pipelines/{id}/conversion_statistics?start_date&end_date&user_id` | `stage_conversions[] {from_stage_id, to_stage_id, conversion_rate}`, `won_conversion`, `lost_conversion` **[API]** |
| `GET /v1/pipelines/{id}/movement_statistics?…` | `movements_between_stages.count`, `new_deals`, `deals_left_open`, `won_deals`, `lost_deals` (each with count, IDs and per-currency values), `average_age_in_days.{across_all_stages, by_stages[]}` **[API]** |
| `GET /v1/deals/timeline?start_date&interval=day\|week\|month\|quarter&amount&field_key` | Open and won deals bucketed by any date field. This is the forecast view. **[API]** |
| `GET /v1/deals/{id}/flow` | Per-deal changelog: `dealChange`, `note`, `activity`, `mailMessage`, `file` and more. **[API]** |

Reporting rule: in the deal progress report, **a deal that skips stages counts as having entered every stage it skipped**. For example, a move from stage 2 straight to stage 5 counts as entering stages 3, 4 and 5. **[KB]** So per-stage stats need the stage order and the move history, not only the stage the deal landed in. **[INF]**

---

## 5. Building this in Kitebaze

The minimum needed to match Pipedrive's board behaviour **[INF]**:

1. **Tables:** `pipelines(id, name, order_nr, deal_probability_enabled, deleted_at)`, `stages(id, pipeline_id, name, order_nr, probability, rot_enabled, rot_days, deleted_at)`, `deals(id, pipeline_id, stage_id, title, value, currency, probability, status, owner_id, person_id, org_id, expected_close_date, stage_changed_at, updated_at, won_at, lost_at, lost_reason, deleted_at)`.
2. **Append-only `deal_stage_events(deal_id, from_stage_id, to_stage_id, at)`**: needed for conversion rates, average time in stage, and the "skipped stages count as entered" rule.
3. **Bump `deals.updated_at` on activity done, note, file and email events**, not only on edits to the deal row. Rotting depends on it.
4. **Compute rotting, weighted value and sort order on read.** Store only the inputs.
5. **Sort the board by next undone activity, then by creation time, newest first.** Don't store a card rank.
6. **Delete is a soft delete with a 30-day purge job.** Block stage deletion while it still has deals (safer than Pipedrive, which deletes them).
7. **Totals per column, per currency.** Convert to the company currency for the header.

---

## 6. Reproducing this

```bash
npm i rea-agents@6.9.0
```

```bash
curl -sO https://developers.pipedrive.com/docs/api/v1/openapi.json
```

```bash
npx rea inspect-api-contract "$PWD/openapi.json" --detail summary --evidence_output "$PWD/api-v1.json"
```

```bash
python3 tools/extract_endpoints.py openapi.json /pipelines/{id}/deals,/deals/summary
```

For the browser capture: start Chromium with `--remote-debugging-port=9333` on `https://app.pipedrive.com/auth/login`, then run:

```bash
npx rea analyze-web-bundle http://127.0.0.1:9333 <targetId> --observation-ms 8000 --fetch-source-maps --allowed-origins https://app.pipedrive.com
```

The full `analyze-javascript-application` evidence for the `pipedrive@36.3.1` npm client is 237 MB and is not committed. Only its summary is in `evidence/rea/`.

Spec digests (sha256): v1 JSON `2d5f90c6…c9f00f`, v2 YAML `9b885686…ee68`, v2 as JSON `c4d7b5e1…1bad`.
