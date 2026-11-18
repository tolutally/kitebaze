import { useState } from 'react';
import Dialog, { inputClass, labelClass, primaryButton, secondaryButton } from './Dialog.jsx';

let tempId = 0;
const newStage = () => ({ key: `new-${tempId++}`, name: 'New stage', probability: 50, rot_enabled: false, rot_days: '' });

export default function PipelineEditor({ pipeline, stages, openCounts, onSave, onDelete, onClose }) {
  const [name, setName] = useState(pipeline.name);
  const [dealProbability, setDealProbability] = useState(Boolean(pipeline.deal_probability_enabled));
  const [rows, setRows] = useState(() => stages.map((s) => ({ ...s, key: s.id, rot_days: s.rot_days ?? '' })));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (index, patch) => setRows((list) => list.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  const insertAfter = (index) => setRows((list) => [...list.slice(0, index + 1), newStage(), ...list.slice(index + 1)]);
  const remove = (index) => setRows((list) => list.filter((_, i) => i !== index));
  const move = (index, delta) =>
    setRows((list) => {
      const next = [...list];
      const target = index + delta;
      if (target < 0 || target >= next.length) return list;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const save = async (event) => {
    event.preventDefault();
    if (!name.trim()) return setError('Give the pipeline a name.');
    if (rows.length === 0) return setError('A pipeline needs at least one stage.');
    if (rows.some((r) => !r.name.trim())) return setError('Every stage needs a name.');
    if (rows.some((r) => r.rot_enabled && !(Number(r.rot_days) > 0))) return setError('Set the rotting days for each stage with rotting on.');
    setSaving(true);
    setError('');
    try {
      await onSave({ name: name.trim(), deal_probability_enabled: dealProbability }, rows.map((r) => ({ ...r, name: r.name.trim() })));
    } catch (err) {
      setError(err.message || 'Could not save the pipeline.');
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Edit pipeline"
      onClose={onClose}
      width="max-w-3xl"
      footer={
        <>
          <button type="button" className={`${secondaryButton} mr-auto text-red-700`} onClick={() => onDelete(pipeline).catch((err) => setError(err.message))}>Delete pipeline</button>
          <button type="button" className={secondaryButton} onClick={onClose}>Cancel</button>
          <button type="submit" form="pipeline-form" className={primaryButton} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
        </>
      }
    >
      <form id="pipeline-form" onSubmit={save} className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label className={labelClass} htmlFor="pipeline-name">Pipeline name</label>
            <input id="pipeline-name" data-autofocus className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <label className="flex items-center gap-2 pb-2 text-sm text-kb-ink">
            <input type="checkbox" checked={dealProbability} onChange={(e) => setDealProbability(e.target.checked)} className="h-4 w-4 accent-kb-accent" />
            Per-deal probability
          </label>
        </div>
        <p className="text-xs text-kb-ink-muted">
          Weighted value = deal value × probability. With per-deal probability on, a deal’s own probability overrides its stage’s. Rotting flags deals not touched for the set number of days.
        </p>
        <ol className="grid gap-2">
          {rows.map((row, index) => {
            const openDeals = row.id ? openCounts[row.id] || 0 : 0;
            return (
              <li key={row.key} className="rounded-lg border border-kb-line bg-kb-canvas p-3">
                <div className="grid gap-2 sm:grid-cols-[auto_1fr_7rem_auto] sm:items-center">
                  <div className="flex gap-1">
                    <button type="button" aria-label={`Move ${row.name} earlier`} className="rounded border border-kb-line px-2 py-1 text-xs disabled:opacity-40" disabled={index === 0} onClick={() => move(index, -1)}>↑</button>
                    <button type="button" aria-label={`Move ${row.name} later`} className="rounded border border-kb-line px-2 py-1 text-xs disabled:opacity-40" disabled={index === rows.length - 1} onClick={() => move(index, 1)}>↓</button>
                  </div>
                  <input aria-label="Stage name" className={inputClass} value={row.name} onChange={(e) => update(index, { name: e.target.value })} />
                  <label className="flex items-center gap-1 text-xs text-kb-ink-soft">
                    <input aria-label="Stage probability" type="number" min="0" max="100" className={inputClass} value={row.probability} onChange={(e) => update(index, { probability: e.target.value })} />%
                  </label>
                  <button
                    type="button"
                    className="rounded px-2 py-1 text-xs text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:text-kb-ink-muted disabled:hover:bg-transparent"
                    onClick={() => remove(index)}
                    disabled={openDeals > 0}
                    title={openDeals > 0 ? `Move its ${openDeals} open deal(s) first` : 'Delete stage'}
                  >
                    {openDeals > 0 ? `${openDeals} open` : 'Delete'}
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-kb-ink-soft">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={Boolean(row.rot_enabled)} onChange={(e) => update(index, { rot_enabled: e.target.checked })} className="h-4 w-4 accent-kb-accent" />
                    Rotting in
                  </label>
                  <input aria-label="Days to rotten" type="number" min="1" disabled={!row.rot_enabled} className={`${inputClass} w-20 py-1`} value={row.rot_days} onChange={(e) => update(index, { rot_days: e.target.value })} />
                  days
                  <button type="button" className="ml-auto rounded px-2 py-1 font-medium text-kb-accent-ink hover:bg-kb-accent-soft" onClick={() => insertAfter(index)}>+ Add stage after</button>
                </div>
              </li>
            );
          })}
        </ol>
        {rows.length === 0 && <button type="button" className={secondaryButton} onClick={() => insertAfter(-1)}>+ Add stage</button>}
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </form>
    </Dialog>
  );
}
