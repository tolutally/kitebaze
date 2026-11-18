import { useEffect, useId, useRef } from 'react';

export const inputClass =
  'w-full rounded-md border border-kb-line-strong bg-kb-surface px-3 py-2 text-sm text-kb-ink outline-none focus:border-kb-accent focus:ring-2 focus:ring-kb-accent-soft';
export const labelClass = 'mb-1 block text-xs font-medium text-kb-ink-soft';
export const primaryButton =
  'inline-flex items-center justify-center rounded-md bg-kb-accent px-4 py-2 text-sm font-medium text-kb-on-accent hover:bg-kb-accent-hover disabled:opacity-60';
export const secondaryButton =
  'inline-flex items-center justify-center rounded-md border border-kb-line-strong bg-kb-surface px-4 py-2 text-sm font-medium text-kb-ink hover:bg-kb-surface-soft disabled:opacity-60';

export default function Dialog({ title, onClose, children, footer, width = 'max-w-lg' }) {
  const titleId = useId();
  const panel = useRef(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const autofocus = panel.current?.querySelector('[data-autofocus]') || panel.current?.querySelector('input, select, textarea, button');
    autofocus?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`flex max-h-[92dvh] w-full ${width} flex-col rounded-t-xl bg-kb-surface shadow-2xl sm:rounded-xl`}
      >
        <div className="flex items-center justify-between border-b border-kb-line px-5 py-4">
          <h2 id={titleId} className="text-base font-semibold text-kb-ink">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded p-1 text-kb-ink-muted hover:bg-kb-surface-soft hover:text-kb-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex flex-wrap items-center justify-end gap-2 border-t border-kb-line px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}
