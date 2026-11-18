// Pure board rules. Derived from reverse-engineering/pipedrive/deal-pipeline/README.md.
// Nothing here talks to storage, so the same rules apply to Appwrite and demo data.

const DAY_MS = 24 * 60 * 60 * 1000;

export const DEAL_STATUSES = Object.freeze(['open', 'won', 'lost']);

export const DEFAULT_STAGES = Object.freeze([
  { name: 'Qualified', probability: 10, rot_enabled: false, rot_days: null },
  { name: 'Contact made', probability: 20, rot_enabled: true, rot_days: 14 },
  { name: 'Needs defined', probability: 40, rot_enabled: true, rot_days: 14 },
  { name: 'Proposal sent', probability: 60, rot_enabled: true, rot_days: 10 },
  { name: 'Negotiation', probability: 80, rot_enabled: true, rot_days: 7 },
]);

export const SORT_OPTIONS = Object.freeze([
  { value: 'activity', label: 'Next activity' },
  { value: 'value', label: 'Deal value' },
  { value: 'title', label: 'Deal title' },
  { value: 'expected_close_date', label: 'Expected close date' },
  { value: 'created_at', label: 'Creation time' },
  { value: 'person_name', label: 'Contact person' },
  { value: 'org_name', label: 'Organization' },
  { value: 'owner_name', label: 'Owner' },
]);

function toTime(value) {
  if (!value) return null;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : time;
}

function startOfDay(time) {
  const date = new Date(time);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

// A deal's own probability wins only when the pipeline allows per-deal probability.
export function effectiveProbability(deal, stage, pipeline) {
  if (pipeline?.deal_probability_enabled && deal.probability !== null && deal.probability !== undefined && deal.probability !== '') {
    return Number(deal.probability);
  }
  return Number(stage?.probability ?? 100);
}

export function weightedValue(deal, stage, pipeline) {
  return (Number(deal.value) || 0) * (effectiveProbability(deal, stage, pipeline) / 100);
}

// The rotting clock runs from the last time the deal was touched, not from when it entered the stage.
// Future activities do not stop a deal from rotting.
export function rottingInfo(deal, stage, now = Date.now()) {
  if (deal.status !== 'open' || !stage?.rot_enabled || !(Number(stage.rot_days) > 0)) {
    return { rotten: false, rottenSince: null, daysRotten: 0 };
  }
  const touched = toTime(deal.last_touched_at) ?? toTime(deal.created_at);
  if (touched === null) return { rotten: false, rottenSince: null, daysRotten: 0 };
  const rottenSince = touched + Number(stage.rot_days) * DAY_MS;
  if (now <= rottenSince) return { rotten: false, rottenSince: null, daysRotten: 0 };
  return { rotten: true, rottenSince, daysRotten: Math.max(1, Math.floor((now - rottenSince) / DAY_MS)) };
}

// overdue | today | future | none
export function activityState(deal, now = Date.now()) {
  const due = toTime(deal.next_activity_at);
  if (due === null) return 'none';
  const today = startOfDay(now);
  if (due < now && startOfDay(due) < today) return 'overdue';
  if (startOfDay(due) === today) return due < now ? 'overdue' : 'today';
  return 'future';
}

const ACTIVITY_RANK = { overdue: 0, today: 1, future: 2, none: 3 };

function compareText(a, b) {
  return String(a || '').localeCompare(String(b || ''), undefined, { sensitivity: 'base' });
}

function newestFirst(a, b) {
  return (toTime(b.created_at) ?? 0) - (toTime(a.created_at) ?? 0);
}

// Card order is computed, never stored. Ties fall back to newest deal first.
export function sortDeals(deals, sortBy = 'activity', direction = 'asc', now = Date.now()) {
  const sign = direction === 'desc' ? -1 : 1;
  const comparator = (a, b) => {
    let result = 0;
    switch (sortBy) {
      case 'activity': {
        const rank = ACTIVITY_RANK[activityState(a, now)] - ACTIVITY_RANK[activityState(b, now)];
        result = rank || (toTime(a.next_activity_at) ?? 0) - (toTime(b.next_activity_at) ?? 0);
        break;
      }
      case 'value':
        result = (Number(a.value) || 0) - (Number(b.value) || 0);
        break;
      case 'expected_close_date': {
        const ta = toTime(a.expected_close_date);
        const tb = toTime(b.expected_close_date);
        if (ta === null && tb === null) result = 0;
        else if (ta === null) return 1;
        else if (tb === null) return -1;
        else result = ta - tb;
        break;
      }
      case 'created_at':
        result = (toTime(a.created_at) ?? 0) - (toTime(b.created_at) ?? 0);
        break;
      default:
        result = compareText(a[sortBy], b[sortBy]);
    }
    return result * sign || newestFirst(a, b);
  };
  return [...deals].sort(comparator);
}

// Totals are kept per currency; there is no exchange-rate source to convert them.
export function stageTotals(deals, stage, pipeline) {
  const byCurrency = {};
  let weighted = 0;
  for (const deal of deals) {
    const currency = deal.currency || 'USD';
    byCurrency[currency] = (byCurrency[currency] || 0) + (Number(deal.value) || 0);
    weighted += weightedValue(deal, stage, pipeline);
  }
  return { count: deals.length, byCurrency, weighted };
}

export function formatMoney(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount || 0);
  } catch {
    return `${currency} ${Math.round(amount || 0).toLocaleString()}`;
  }
}

export function formatTotals(byCurrency) {
  const entries = Object.entries(byCurrency);
  if (entries.length === 0) return formatMoney(0);
  return entries.map(([currency, amount]) => formatMoney(amount, currency)).join(' + ');
}

export function formatActivityDate(value, now = Date.now()) {
  const time = toTime(value);
  if (time === null) return '';
  const days = Math.round((startOfDay(time) - startOfDay(now)) / DAY_MS);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  return new Date(time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
