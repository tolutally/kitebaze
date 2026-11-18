import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { store } from './store/index.js';
import { SORT_OPTIONS, formatMoney, formatTotals, sortDeals, stageTotals, weightedValue } from './logic.js';
import DealCard from './components/DealCard.jsx';
import DealDialog from './components/DealDialog.jsx';
import PipelineEditor from './components/PipelineEditor.jsx';
import { LostDialog, MoveDialog } from './components/SmallDialogs.jsx';
import { inputClass, primaryButton, secondaryButton } from './components/Dialog.jsx';

// Header controls size to their content instead of filling the row.
const toolbarInput = inputClass.replace('w-full ', '');

const DROP_ZONES = [
  { id: 'delete', label: 'Delete', className: 'border-kb-line-strong text-kb-ink-soft', active: 'bg-kb-surface-raised' },
  { id: 'lost', label: 'Lost', className: 'border-red-400 text-red-700', active: 'bg-red-100' },
  { id: 'won', label: 'Won', className: 'border-emerald-500 text-emerald-700', active: 'bg-emerald-100' },
  { id: 'move', label: 'Move to…', className: 'border-kb-accent text-kb-accent-ink', active: 'bg-kb-accent-soft' },
];

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

export default function Board({ user, onLogout }) {
  const now = useNow();
  const [pipelines, setPipelines] = useState([]);
  const [pipelineId, setPipelineId] = useState(null);
  const [stages, setStages] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('activity');
  const [direction, setDirection] = useState('asc');
  const [search, setSearch] = useState('');
  const [owner, setOwner] = useState('');
  const [dragId, setDragId] = useState(null);
  const [overTarget, setOverTarget] = useState(null);
  const [dialog, setDialog] = useState(null); // {type, deal?, stageId?, openCounts?}
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const pipeline = pipelines.find((p) => p.id === pipelineId) || null;
  const loadStages = useCallback((id) => store.listStages(id), []);

  const showToast = useCallback((message, undo) => {
    clearTimeout(toastTimer.current);
    setToast({ message, undo });
    toastTimer.current = setTimeout(() => setToast(null), 6000);
  }, []);

  const fail = useCallback((err) => showToast(err?.message || 'Something went wrong. Please try again.'), [showToast]);

  // First load: pipelines, creating a starter pipeline if there are none.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let list = await store.listPipelines();
        if (list.length === 0) list = [await store.createPipeline({ name: 'Sales pipeline' })];
        if (cancelled) return;
        setPipelines(list);
        let saved = null;
        try {
          saved = window.localStorage.getItem('kitebaze.pipeline.selected');
        } catch {
          // ignore
        }
        setPipelineId(list.some((p) => p.id === saved) ? saved : list[0].id);
      } catch (err) {
        if (!cancelled) {
          fail(err);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fail]);

  const reload = useCallback(async (id) => {
    setLoading(true);
    try {
      const [stageList, dealList] = await Promise.all([store.listStages(id), store.listDeals(id)]);
      setStages(stageList);
      setDeals(dealList);
    } catch (err) {
      fail(err);
    } finally {
      setLoading(false);
    }
  }, [fail]);

  useEffect(() => {
    if (!pipelineId) return;
    try {
      window.localStorage.setItem('kitebaze.pipeline.selected', pipelineId);
    } catch {
      // ignore
    }
    reload(pipelineId);
  }, [pipelineId, reload]);

  const owners = useMemo(() => [...new Set(deals.map((d) => d.owner_name).filter(Boolean))].sort(), [deals]);

  const visibleDeals = useMemo(() => {
    const q = search.trim().toLowerCase();
    return deals.filter(
      (d) => (!owner || d.owner_name === owner) && (!q || [d.title, d.org_name, d.person_name].some((v) => v && v.toLowerCase().includes(q))),
    );
  }, [deals, search, owner]);

  const columns = useMemo(
    () =>
      stages.map((stage) => {
        const stageDeals = visibleDeals.filter((d) => d.stage_id === stage.id);
        return { stage, deals: sortDeals(stageDeals, sortBy, direction, now), totals: stageTotals(stageDeals, stage, pipeline) };
      }),
    [stages, visibleDeals, sortBy, direction, now, pipeline],
  );

  const boardTotals = useMemo(() => {
    const byCurrency = {};
    let weighted = 0;
    for (const { stage, deals: list } of columns) {
      for (const d of list) {
        byCurrency[d.currency || 'USD'] = (byCurrency[d.currency || 'USD'] || 0) + (Number(d.value) || 0);
        weighted += weightedValue(d, stage, pipeline);
      }
    }
    return { count: visibleDeals.length, byCurrency, weighted };
  }, [columns, visibleDeals.length, pipeline]);

  // ---- deal mutations (optimistic, reverted on failure) ----

  const patchDeal = useCallback(
    async (deal, patch, { removeFromBoard = false, message, undoPatch } = {}) => {
      const before = deals;
      setDeals((list) => (removeFromBoard ? list.filter((d) => d.id !== deal.id) : list.map((d) => (d.id === deal.id ? { ...d, ...patch, last_touched_at: new Date().toISOString() } : d))));
      try {
        const saved = await store.updateDeal(deal.id, patch, deal);
        if (!removeFromBoard) setDeals((list) => list.map((d) => (d.id === deal.id ? saved : d)));
        if (message) {
          showToast(message, undoPatch && (async () => {
            setToast(null);
            try {
              const restored = await store.updateDeal(deal.id, undoPatch, saved);
              if (restored.pipeline_id === pipelineId && restored.status === 'open' && !restored.deleted_at) {
                setDeals((list) => [...list.filter((d) => d.id !== deal.id), restored]);
              }
            } catch (err) {
              fail(err);
            }
          }));
        }
        return saved;
      } catch (err) {
        setDeals(before);
        fail(err);
        throw err;
      }
    },
    [deals, pipelineId, showToast, fail],
  );

  const moveToStage = (deal, stageId) => {
    if (deal.stage_id === stageId) return;
    patchDeal(deal, { stage_id: stageId }).catch(() => {});
  };

  const markWon = (deal) => {
    setDialog(null);
    patchDeal(deal, { status: 'won', won_at: new Date().toISOString() }, { removeFromBoard: true, message: `“${deal.title}” marked as won`, undoPatch: { status: 'open', won_at: null } }).catch(() => {});
  };

  const markLost = (deal, reason) => {
    setDialog(null);
    patchDeal(deal, { status: 'lost', lost_at: new Date().toISOString(), lost_reason: reason }, { removeFromBoard: true, message: `“${deal.title}” marked as lost`, undoPatch: { status: 'open', lost_at: null, lost_reason: null } }).catch(() => {});
  };

  const softDelete = (deal) => {
    setDialog(null);
    patchDeal(deal, { deleted_at: new Date().toISOString() }, { removeFromBoard: true, message: `“${deal.title}” deleted`, undoPatch: { deleted_at: null } }).catch(() => {});
  };

  const moveToPipeline = (deal, target) => {
    setDialog(null);
    const name = pipelines.find((p) => p.id === target.pipeline_id)?.name || 'another pipeline';
    patchDeal(deal, target, { removeFromBoard: true, message: `“${deal.title}” moved to ${name}`, undoPatch: { pipeline_id: deal.pipeline_id, stage_id: deal.stage_id } }).catch(() => {});
  };

  const saveDeal = async (fields) => {
    const existing = dialog.deal;
    if (!existing) {
      const created = await store.createDeal(fields);
      if (created.pipeline_id === pipelineId) setDeals((list) => [...list, created]);
      setDialog(null);
      showToast(`“${created.title}” added`);
      return;
    }
    const leaves = fields.pipeline_id !== pipelineId;
    await patchDeal(existing, fields, { removeFromBoard: leaves, message: leaves ? `“${fields.title}” moved to another pipeline` : undefined });
    setDialog(null);
  };

  // ---- pipelines ----

  const openEditor = async () => {
    try {
      const openCounts = await store.countOpenDealsByStage(pipelineId);
      setDialog({ type: 'editor', openCounts });
    } catch (err) {
      fail(err);
    }
  };

  const savePipeline = async (fields, editedStages) => {
    const saved = await store.updatePipeline(pipelineId, fields);
    await store.saveStages(pipelineId, editedStages);
    setPipelines((list) => list.map((p) => (p.id === saved.id ? saved : p)));
    setDialog(null);
    reload(pipelineId);
    showToast('Pipeline saved');
  };

  const deletePipeline = async (target) => {
    if (pipelines.length === 1) throw new Error('This is your only pipeline. Create another one before deleting it.');
    await store.deletePipeline(target.id);
    const rest = pipelines.filter((p) => p.id !== target.id);
    setPipelines(rest);
    setDialog(null);
    setPipelineId(rest[0].id);
    showToast(`Pipeline “${target.name}” deleted`);
  };

  const createPipeline = async () => {
    try {
      const created = await store.createPipeline({ name: `Pipeline ${pipelines.length + 1}` });
      setPipelines((list) => [...list, created]);
      setPipelineId(created.id);
      const openCounts = {};
      setDialog({ type: 'editor', openCounts, pending: true });
    } catch (err) {
      fail(err);
    }
  };

  // ---- drag and drop ----

  const draggedDeal = deals.find((d) => d.id === dragId) || null;

  const onDragStart = (event, deal) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', deal.id);
    setDragId(deal.id);
  };
  const onDragEnd = () => {
    setDragId(null);
    setOverTarget(null);
  };
  const dropProps = (targetId, onDrop) => ({
    onDragOver: (event) => {
      if (!dragId) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (overTarget !== targetId) setOverTarget(targetId);
    },
    onDragLeave: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOverTarget((t) => (t === targetId ? null : t));
    },
    onDrop: (event) => {
      event.preventDefault();
      const deal = deals.find((d) => d.id === (event.dataTransfer.getData('text/plain') || dragId));
      setDragId(null);
      setOverTarget(null);
      if (deal) onDrop(deal);
    },
  });

  const onZoneDrop = (zone) => (deal) => {
    if (zone === 'won') markWon(deal);
    else if (zone === 'lost') setDialog({ type: 'lost', deal });
    else if (zone === 'delete') softDelete(deal);
    else setDialog({ type: 'move', deal });
  };

  // Stages may not be loaded yet when the editor opens for a new pipeline.
  const editorReady =
    dialog?.type === 'editor' && pipeline && !loading && stages.every((s) => s.pipeline_id === pipeline.id) && !(dialog.pending && stages.length === 0);

  return (
    <div className="flex h-dvh flex-col bg-kb-canvas text-kb-ink">
      <header className="flex flex-wrap items-center gap-2 border-b border-kb-line bg-kb-surface px-4 py-3">
        <a href="/" className="mr-1 flex items-center" aria-label="Kitebaze home">
          <img src="/kitebaze-icon-black.png" alt="" className="h-7 w-7" />
        </a>
        <label className="sr-only" htmlFor="pipeline-select">Pipeline</label>
        <select
          id="pipeline-select"
          className={`${toolbarInput} max-w-[14rem] font-semibold`}
          value={pipelineId || ''}
          onChange={(e) => (e.target.value === '__new' ? createPipeline() : setPipelineId(e.target.value))}
        >
          {pipelines.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          <option value="__new">+ New pipeline</option>
        </select>
        <button type="button" className={`${secondaryButton} px-3`} onClick={openEditor} disabled={!pipeline} aria-label="Edit pipeline" title="Edit pipeline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></svg>
        </button>
        <button type="button" className={primaryButton} onClick={() => setDialog({ type: 'deal', stageId: stages[0]?.id })} disabled={!stages.length}>+ Deal</button>
        <p className="text-sm text-kb-ink-soft" aria-live="polite">
          <span className="font-medium text-kb-ink">{formatTotals(boardTotals.byCurrency)}</span> · {boardTotals.count} deal{boardTotals.count === 1 ? '' : 's'}
          <span className="hidden md:inline"> · weighted {formatMoney(boardTotals.weighted, Object.keys(boardTotals.byCurrency)[0] || 'CAD')}</span>
        </p>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <input type="search" placeholder="Search deals" aria-label="Search deals" className={`${toolbarInput} w-40`} value={search} onChange={(e) => setSearch(e.target.value)} />
          {owners.length > 1 && (
            <select aria-label="Filter by owner" className={toolbarInput} value={owner} onChange={(e) => setOwner(e.target.value)}>
              <option value="">All owners</option>
              {owners.map((o) => <option key={o}>{o}</option>)}
            </select>
          )}
          <select aria-label="Sort deals by" className={toolbarInput} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
          </select>
          <button type="button" className={`${secondaryButton} px-3`} onClick={() => setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))} aria-label={`Change order (now ${direction === 'asc' ? 'ascending' : 'descending'})`} title="Change order">
            {direction === 'asc' ? '↑' : '↓'}
          </button>
          <span className="hidden text-xs text-kb-ink-muted sm:inline">{user?.name}</span>
          {store.mode === 'appwrite' ? (
            <button type="button" className="text-xs text-kb-ink-soft underline" onClick={onLogout}>Log out</button>
          ) : (
            <button type="button" className="text-xs text-kb-ink-soft underline" onClick={async () => { await store.resetDemo(); window.location.reload(); }}>Reset demo</button>
          )}
        </div>
      </header>

      {store.mode === 'demo' && (
        <p className="border-b border-amber-200 bg-amber-50 px-4 py-1.5 text-xs text-amber-900">
          Demo mode: sample data saved in this browser only. Unset VITE_PIPELINE_DEMO to use the shared Appwrite database.
        </p>
      )}

      <main className="relative flex-1 overflow-hidden">
        {loading && stages.length === 0 ? (
          <p className="p-6 text-sm text-kb-ink-soft">Loading pipeline…</p>
        ) : (
          <div className="flex h-full gap-3 overflow-x-auto p-4 pb-24">
            {columns.map(({ stage, deals: list, totals }) => (
              <section
                key={stage.id}
                aria-label={stage.name}
                data-stage-id={stage.id}
                className={`flex w-[17rem] shrink-0 flex-col rounded-xl border transition ${overTarget === stage.id ? 'border-kb-accent bg-kb-accent-soft' : 'border-kb-line bg-kb-surface-soft/60'}`}
                {...dropProps(stage.id, (deal) => moveToStage(deal, stage.id))}
              >
                <div className="border-b border-kb-line px-3 py-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="truncate text-sm font-semibold">{stage.name}</h2>
                    <span className="text-[11px] text-kb-ink-muted" title="Stage probability">{stage.probability}%</span>
                  </div>
                  <p className="mt-0.5 text-xs text-kb-ink-soft">
                    {formatTotals(totals.byCurrency)} · {totals.count} deal{totals.count === 1 ? '' : 's'}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
                  {list.map((deal) => (
                    <DealCard key={deal.id} deal={deal} stage={stage} now={now} dragging={dragId === deal.id} onOpen={(d) => setDialog({ type: 'deal', deal: d })} onDragStart={onDragStart} onDragEnd={onDragEnd} />
                  ))}
                  <button type="button" className="rounded-lg border border-dashed border-kb-line-strong py-2 text-xs text-kb-ink-muted hover:border-kb-accent hover:text-kb-accent-ink" onClick={() => setDialog({ type: 'deal', stageId: stage.id })}>
                    + Add deal
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}

        {draggedDeal && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3">
            <div className="pointer-events-auto grid w-full max-w-3xl grid-cols-4 gap-2">
              {DROP_ZONES.map((zone) => (
                <div
                  key={zone.id}
                  data-drop-zone={zone.id}
                  className={`rounded-lg border-2 border-dashed bg-kb-surface py-4 text-center text-sm font-semibold shadow-lg transition ${zone.className} ${overTarget === zone.id ? zone.active : ''}`}
                  {...dropProps(zone.id, onZoneDrop(zone.id))}
                >
                  {zone.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div role="status" className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-lg bg-kb-inverse px-4 py-3 text-sm text-kb-inverse-text shadow-xl">
          <span>{toast.message}</span>
          {toast.undo && <button type="button" className="font-semibold text-kb-accent-light underline" onClick={toast.undo}>Undo</button>}
        </div>
      )}

      {dialog?.type === 'deal' && pipeline && (
        <DealDialog
          deal={dialog.deal}
          defaultStageId={dialog.stageId}
          pipeline={pipeline}
          pipelines={pipelines}
          stages={stages}
          loadStages={loadStages}
          onSave={saveDeal}
          onClose={() => setDialog(null)}
          onWon={markWon}
          onLost={(deal) => setDialog({ type: 'lost', deal })}
          onDelete={softDelete}
        />
      )}
      {dialog?.type === 'lost' && <LostDialog deal={dialog.deal} onConfirm={(reason) => markLost(dialog.deal, reason)} onClose={() => setDialog(null)} />}
      {dialog?.type === 'move' && (
        <MoveDialog deal={dialog.deal} pipelines={pipelines} currentPipelineId={pipelineId} loadStages={loadStages} onConfirm={(target) => moveToPipeline(dialog.deal, target)} onClose={() => setDialog(null)} />
      )}
      {editorReady && (
        <PipelineEditor key={`${pipeline.id}-${stages.map((s) => s.id).join()}`} pipeline={pipeline} stages={stages} openCounts={dialog.openCounts} onSave={savePipeline} onDelete={deletePipeline} onClose={() => setDialog(null)} />
      )}
    </div>
  );
}
