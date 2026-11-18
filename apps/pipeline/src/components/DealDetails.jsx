import { useCallback, useEffect, useState } from 'react';
import { store } from '../store/index.js';
import { inputClass, secondaryButton } from './Dialog.jsx';

export const ACTIVITY_TYPES = ['call', 'email', 'meeting', 'whatsapp', 'task', 'note'];

function formatDay(iso) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function Row({ label, children }) {
  if (!children) return null;
  return (
    <div className="flex gap-2 text-xs">
      <dt className="w-16 shrink-0 text-kb-ink-muted">{label}</dt>
      <dd className="min-w-0 break-words text-kb-ink">{children}</dd>
    </div>
  );
}

// Read-only company and contact info, plus the deal's activity history with a quick "log activity" form.
export default function DealDetails({ deal, onActivityLogged }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');
  const [type, setType] = useState('call');
  const [summary, setSummary] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => store.getDealDetails(deal).then(setDetails, (err) => setError(err.message)), [deal]);
  useEffect(() => {
    load();
  }, [load]);

  const log = async () => {
    if (!summary.trim()) return;
    setSaving(true);
    try {
      await store.addActivity(deal, { type, summary: summary.trim() });
      setSummary('');
      await load();
      onActivityLogged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (error) return <p className="text-xs text-red-700">{error}</p>;
  if (!details) return <p className="text-xs text-kb-ink-muted">Loading details…</p>;
  const { company, contact, activities } = details;
  const contactName = contact && [contact.first_name, contact.last_name].filter(Boolean).join(' ');

  return (
    <div className="grid gap-4">
      {(company || contact) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {company && (
            <section className="rounded-md border border-kb-line p-3">
              <h3 className="mb-2 text-xs font-semibold text-kb-ink">{company.name}</h3>
              <dl className="grid gap-1">
                <Row label="Industry">{company.industry}</Row>
                <Row label="Location">{company.location}</Row>
                <Row label="Size">{company.size}</Row>
                <Row label="Website">{company.website && <a className="text-kb-accent-ink underline" href={company.website} target="_blank" rel="noreferrer">{company.website.replace(/^https?:\/\//, '')}</a>}</Row>
                <Row label="Source">{company.source}</Row>
              </dl>
            </section>
          )}
          {contact && (
            <section className="rounded-md border border-kb-line p-3">
              <h3 className="mb-2 text-xs font-semibold text-kb-ink">{contactName}</h3>
              <dl className="grid gap-1">
                <Row label="Role">{contact.role}</Row>
                <Row label="Email">{contact.email && <a className="text-kb-accent-ink underline" href={`mailto:${contact.email}`}>{contact.email}</a>}</Row>
                <Row label="Alt email">{contact.alt_email && <a className="text-kb-accent-ink underline" href={`mailto:${contact.alt_email}`}>{contact.alt_email}</a>}</Row>
                <Row label="Phone">{contact.phone && <a className="text-kb-accent-ink underline" href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>}</Row>
                <Row label="Notes">{contact.notes}</Row>
              </dl>
            </section>
          )}
        </div>
      )}

      <section>
        <h3 className="mb-2 text-xs font-semibold text-kb-ink">Activity history</h3>
        <div className="mb-3 flex gap-2">
          <select aria-label="Activity type" className={`${inputClass.replace('w-full ', '')} capitalize`} value={type} onChange={(e) => setType(e.target.value)}>
            {ACTIVITY_TYPES.map((t) => <option key={t} value={t}>{t === 'whatsapp' ? 'WhatsApp' : t}</option>)}
          </select>
          <input aria-label="What happened" placeholder="What happened?" className={inputClass} value={summary} onChange={(e) => setSummary(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), log())} />
          <button type="button" className={`${secondaryButton} shrink-0`} onClick={log} disabled={saving || !summary.trim()}>Log</button>
        </div>
        {activities.length === 0 ? (
          <p className="text-xs text-kb-ink-muted">No activity logged yet.</p>
        ) : (
          <ol className="grid gap-2 border-l border-kb-line pl-3">
            {activities.map((a) => (
              <li key={a.id} className="text-xs">
                <span className="text-kb-ink-muted">{formatDay(a.occurred_at)} · <span className="capitalize">{a.type === 'whatsapp' ? 'WhatsApp' : a.type}</span></span>
                <p className="text-kb-ink">{a.summary}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
