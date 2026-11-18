import { useEffect, useState } from 'react';
import Dialog, { inputClass, labelClass, primaryButton, secondaryButton } from './Dialog.jsx';
import DealDetails from './DealDetails.jsx';

export const CURRENCIES = ['CAD', 'USD', 'EUR', 'GBP'];
const LABELS = ['', 'hot', 'warm', 'cold'];

function toLocalInput(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function blankDeal(pipeline, stageId) {
  return {
    title: '', value: '', monthly_value: '', notes: '', currency: 'CAD', probability: '', org_name: '', person_name: '', owner_name: '', label: '',
    expected_close_date: '', next_activity_subject: '', next_activity_at: '', pipeline_id: pipeline.id, stage_id: stageId,
  };
}

export default function DealDialog({ deal, pipeline, pipelines, stages, defaultStageId, loadStages, onSave, onClose, onWon, onLost, onDelete, onActivityLogged }) {
  const isNew = !deal;
  const [form, setForm] = useState(() =>
    isNew
      ? blankDeal(pipeline, defaultStageId || stages[0]?.id)
      : { ...deal, value: deal.value ?? '', monthly_value: deal.monthly_value ?? '', notes: deal.notes || '', probability: deal.probability ?? '', next_activity_at: toLocalInput(deal.next_activity_at), expected_close_date: deal.expected_close_date || '' },
  );
  const [stageOptions, setStageOptions] = useState(stages);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(null); // next step marked done in this edit
  const targetPipeline = pipelines.find((p) => p.id === form.pipeline_id) || pipeline;

  useEffect(() => {
    if (form.pipeline_id === pipeline.id) {
      setStageOptions(stages);
      return;
    }
    let cancelled = false;
    loadStages(form.pipeline_id).then((list) => {
      if (cancelled) return;
      setStageOptions(list);
      setForm((f) => (list.some((s) => s.id === f.stage_id) ? f : { ...f, stage_id: list[0]?.id }));
    });
    return () => {
      cancelled = true;
    };
  }, [form.pipeline_id, pipeline.id, stages, loadStages]);

  const set = (field) => (event) => setForm((f) => ({ ...f, [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return setError('Add a deal title.');
    if (!form.org_name.trim() && !form.person_name.trim()) return setError('Add a contact person or an organization.');
    if (!form.stage_id) return setError('Pick a stage.');
    setError('');
    setSaving(true);
    try {
      await onSave({
        title: form.title.trim(),
        value: form.value === '' ? 0 : Number(form.value),
        monthly_value: form.monthly_value === '' ? null : Number(form.monthly_value),
        notes: form.notes.trim() || null,
        currency: form.currency,
        probability: targetPipeline.deal_probability_enabled && form.probability !== '' ? Math.min(100, Math.max(0, Number(form.probability))) : null,
        org_name: form.org_name.trim() || null,
        person_name: form.person_name.trim() || null,
        owner_name: form.owner_name.trim() || null,
        label: form.label || null,
        expected_close_date: form.expected_close_date || null,
        next_activity_subject: form.next_activity_subject.trim() || null,
        next_activity_at: form.next_activity_at ? new Date(form.next_activity_at).toISOString() : null,
        pipeline_id: form.pipeline_id,
        stage_id: form.stage_id,
      }, completed);
    } catch (err) {
      setError(err.message || 'Could not save the deal.');
      setSaving(false);
    }
  };

  const markActivityDone = () => {
    if (form.next_activity_subject) setCompleted({ type: 'task', summary: `Done: ${form.next_activity_subject}` });
    setForm((f) => ({ ...f, next_activity_subject: '', next_activity_at: '' }));
  };

  return (
    <Dialog
      title={isNew ? 'New deal' : 'Edit deal'}
      onClose={onClose}
      width={isNew ? 'max-w-lg' : 'max-w-2xl'}
      footer={
        <>
          {!isNew && (
            <div className="mr-auto flex flex-wrap gap-2">
              <button type="button" className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700" onClick={() => onWon(deal)}>Won</button>
              <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700" onClick={() => onLost(deal)}>Lost</button>
              <button type="button" className={secondaryButton} onClick={() => onDelete(deal)}>Delete</button>
            </div>
          )}
          <button type="button" className={secondaryButton} onClick={onClose}>Cancel</button>
          <button type="submit" form="deal-form" className={primaryButton} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </>
      }
    >
      <form id="deal-form" onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="deal-title">Title</label>
          <input id="deal-title" data-autofocus className={inputClass} value={form.title} onChange={set('title')} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="deal-org">Organization</label>
          <input id="deal-org" className={inputClass} value={form.org_name || ''} onChange={set('org_name')} />
        </div>
        <div>
          <label className={labelClass} htmlFor="deal-person">Contact person</label>
          <input id="deal-person" className={inputClass} value={form.person_name || ''} onChange={set('person_name')} />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className={labelClass} htmlFor="deal-value">Value</label>
            <input id="deal-value" type="number" min="0" step="any" className={inputClass} value={form.value} onChange={set('value')} />
          </div>
          <div className="w-24">
            <label className={labelClass} htmlFor="deal-currency">Currency</label>
            <select id="deal-currency" className={inputClass} value={form.currency} onChange={set('currency')}>
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="deal-monthly">Monthly fee</label>
          <input id="deal-monthly" type="number" min="0" step="any" className={inputClass} value={form.monthly_value} onChange={set('monthly_value')} />
        </div>
        {!isNew && deal.value_note && <p className="-mt-1 text-xs text-kb-ink-muted sm:col-span-2">Value note: {deal.value_note}</p>}
        {targetPipeline.deal_probability_enabled ? (
          <div>
            <label className={labelClass} htmlFor="deal-probability">Probability % (blank = stage’s)</label>
            <input id="deal-probability" type="number" min="0" max="100" className={inputClass} value={form.probability} onChange={set('probability')} />
          </div>
        ) : (
          <div>
            <label className={labelClass} htmlFor="deal-close">Expected close date</label>
            <input id="deal-close" type="date" className={inputClass} value={form.expected_close_date} onChange={set('expected_close_date')} />
          </div>
        )}
        <div>
          <label className={labelClass} htmlFor="deal-pipeline">Pipeline</label>
          <select id="deal-pipeline" className={inputClass} value={form.pipeline_id} onChange={set('pipeline_id')}>
            {pipelines.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="deal-stage">Stage</label>
          <select id="deal-stage" className={inputClass} value={form.stage_id || ''} onChange={set('stage_id')}>
            {stageOptions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        {targetPipeline.deal_probability_enabled && (
          <div>
            <label className={labelClass} htmlFor="deal-close">Expected close date</label>
            <input id="deal-close" type="date" className={inputClass} value={form.expected_close_date} onChange={set('expected_close_date')} />
          </div>
        )}
        <div>
          <label className={labelClass} htmlFor="deal-owner">Owner</label>
          <input id="deal-owner" className={inputClass} value={form.owner_name || ''} onChange={set('owner_name')} />
        </div>
        <div>
          <label className={labelClass} htmlFor="deal-label">Label</label>
          <select id="deal-label" className={inputClass} value={form.label || ''} onChange={set('label')}>
            {LABELS.map((l) => <option key={l} value={l}>{l ? l[0].toUpperCase() + l.slice(1) : 'None'}</option>)}
          </select>
        </div>
        <fieldset className="rounded-md border border-kb-line p-3 sm:col-span-2">
          <legend className="px-1 text-xs font-medium text-kb-ink-soft">Next activity</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto]">
            <input aria-label="Activity subject" placeholder="e.g. Follow-up call" className={inputClass} value={form.next_activity_subject || ''} onChange={set('next_activity_subject')} />
            <input aria-label="Activity due" type="datetime-local" className={inputClass} value={form.next_activity_at} onChange={set('next_activity_at')} />
            {!isNew && deal.next_activity_at && (
              <button type="button" className={secondaryButton} onClick={markActivityDone}>Mark done</button>
            )}
          </div>
        </fieldset>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="deal-notes">Notes</label>
          <textarea id="deal-notes" rows={3} className={inputClass} value={form.notes} onChange={set('notes')} />
        </div>
        {error && <p role="alert" className="text-sm text-red-700 sm:col-span-2">{error}</p>}
      </form>
      {!isNew && (
        <div className="mt-5 border-t border-kb-line pt-4">
          <DealDetails deal={deal} onActivityLogged={onActivityLogged} />
        </div>
      )}
    </Dialog>
  );
}
