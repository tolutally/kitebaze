import { activityState, formatActivityDate, formatMoney, rottingInfo } from '../logic.js';

const LABEL_STYLES = {
  hot: 'bg-red-100 text-red-800',
  warm: 'bg-amber-100 text-amber-800',
  cold: 'bg-sky-100 text-sky-800',
};

const ACTIVITY = {
  overdue: { className: 'text-red-600', title: 'Activity overdue' },
  today: { className: 'text-emerald-600', title: 'Activity due today' },
  future: { className: 'text-kb-ink-muted', title: 'Activity planned' },
  none: { className: 'text-amber-500', title: 'No activity scheduled' },
};

function ActivityIcon({ state }) {
  if (state === 'none') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 1 21h22L12 2Zm1 15h-2v-2h2v2Zm0-4h-2V9h2v4Z" /></svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  );
}

function initials(name) {
  return (name || '?').split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

export default function DealCard({ deal, stage, now, onOpen, onDragStart, onDragEnd, dragging }) {
  const rot = rottingInfo(deal, stage, now);
  const state = activityState(deal, now);
  const activity = ACTIVITY[state];
  const contact = [deal.org_name, deal.person_name].filter(Boolean).join(' · ');

  return (
    <article
      draggable
      onDragStart={(event) => onDragStart(event, deal)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(deal)}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && (event.preventDefault(), onOpen(deal))}
      tabIndex={0}
      role="button"
      aria-label={`${deal.title}${rot.rotten ? ', rotting' : ''}`}
      data-deal-id={deal.id}
      className={`group cursor-grab rounded-lg border bg-kb-surface p-3 text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-kb-accent active:cursor-grabbing ${
        rot.rotten ? 'border-red-300 bg-red-50 border-l-4 border-l-red-500' : 'border-kb-line'
      } ${dragging ? 'opacity-40' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-kb-ink">{deal.title}</h3>
        <span className={`mt-0.5 shrink-0 ${activity.className}`} title={deal.next_activity_subject ? `${activity.title}: ${deal.next_activity_subject}` : activity.title}>
          <ActivityIcon state={state} />
          <span className="sr-only">{activity.title}</span>
        </span>
      </div>
      {contact && <p className="mt-1 truncate text-xs text-kb-ink-soft">{contact}</p>}
      <div className="mt-2 flex items-center gap-2 text-xs">
        <span className="font-medium text-kb-ink">
          {deal.value > 0 ? formatMoney(deal.value, deal.currency) : !deal.monthly_value && (
            <span className="font-normal italic text-kb-ink-muted" title={deal.value_note || 'No value set'}>Value TBD</span>
          )}
          {deal.monthly_value > 0 && <span className="font-normal text-kb-ink-soft">{deal.value > 0 ? ' + ' : ''}{formatMoney(deal.monthly_value, deal.currency)}/mo</span>}
        </span>
        {deal.label && <span className={`rounded px-1.5 py-0.5 text-[11px] font-medium capitalize ${LABEL_STYLES[deal.label] || 'bg-kb-surface-soft text-kb-ink-soft'}`}>{deal.label}</span>}
        {deal.owner_name && (
          <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-kb-surface-raised text-[10px] font-semibold text-kb-ink-soft" title={`Owner: ${deal.owner_name}`}>
            {initials(deal.owner_name)}
          </span>
        )}
      </div>
      {(rot.rotten || (state !== 'none' && deal.next_activity_subject)) && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
          {state !== 'none' && deal.next_activity_subject && (
            <span className={activity.className}>{formatActivityDate(deal.next_activity_at, now)} · {deal.next_activity_subject}</span>
          )}
          {rot.rotten && <span className="font-medium text-red-700">Rotting {rot.daysRotten}d</span>}
        </div>
      )}
    </article>
  );
}
