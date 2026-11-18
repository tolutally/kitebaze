import { useEffect, useState } from 'react';
import Dialog, { inputClass, labelClass, primaryButton, secondaryButton } from './Dialog.jsx';

export function LostDialog({ deal, onConfirm, onClose }) {
  const [reason, setReason] = useState('');
  return (
    <Dialog
      title={`Mark “${deal.title}” as lost`}
      onClose={onClose}
      width="max-w-md"
      footer={
        <>
          <button type="button" className={secondaryButton} onClick={onClose}>Cancel</button>
          <button type="submit" form="lost-form" className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">Mark as lost</button>
        </>
      }
    >
      <form id="lost-form" onSubmit={(e) => (e.preventDefault(), onConfirm(reason.trim() || null))}>
        <label className={labelClass} htmlFor="lost-reason">Lost reason (optional)</label>
        <input id="lost-reason" data-autofocus className={inputClass} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Went with a competitor" />
      </form>
    </Dialog>
  );
}

export function MoveDialog({ deal, pipelines, currentPipelineId, loadStages, onConfirm, onClose }) {
  const others = pipelines.filter((p) => p.id !== currentPipelineId);
  const [pipelineId, setPipelineId] = useState(others[0]?.id || '');
  const [stages, setStages] = useState([]);
  const [stageId, setStageId] = useState('');

  useEffect(() => {
    if (!pipelineId) return;
    let cancelled = false;
    loadStages(pipelineId).then((list) => {
      if (cancelled) return;
      setStages(list);
      setStageId(list[0]?.id || '');
    });
    return () => {
      cancelled = true;
    };
  }, [pipelineId, loadStages]);

  return (
    <Dialog
      title={`Move “${deal.title}”`}
      onClose={onClose}
      width="max-w-md"
      footer={
        <>
          <button type="button" className={secondaryButton} onClick={onClose}>Cancel</button>
          <button type="submit" form="move-form" className={primaryButton} disabled={!stageId}>Move deal</button>
        </>
      }
    >
      {others.length === 0 ? (
        <p className="text-sm text-kb-ink-soft">There is no other pipeline yet. Create one from the pipeline menu first.</p>
      ) : (
        <form id="move-form" className="grid gap-3" onSubmit={(e) => (e.preventDefault(), onConfirm({ pipeline_id: pipelineId, stage_id: stageId }))}>
          <div>
            <label className={labelClass} htmlFor="move-pipeline">Pipeline</label>
            <select id="move-pipeline" data-autofocus className={inputClass} value={pipelineId} onChange={(e) => setPipelineId(e.target.value)}>
              {others.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="move-stage">Stage</label>
            <select id="move-stage" className={inputClass} value={stageId} onChange={(e) => setStageId(e.target.value)}>
              {stages.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <p className="text-xs text-kb-ink-muted">Progress reports only count stage moves within one pipeline.</p>
        </form>
      )}
    </Dialog>
  );
}
