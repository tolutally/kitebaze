const STACK_TOOLS = [
  { label: 'Scheduling', mark: 'SC' },
  { label: 'Inbox', mark: 'IN' },
  { label: 'Forms', mark: 'FO' },
  { label: 'Calendar', mark: 'CA' },
  { label: 'Spreadsheets', mark: 'SP' },
  { label: 'Accounting', mark: 'AC' },
];

const MANUAL_HANDOFFS = [
  { from: 'Booking', to: 'Calendar', action: 'Copy' },
  { from: 'Form', to: 'Spreadsheet', action: 'Re-enter' },
  { from: 'Inbox', to: 'Accounting', action: 'Forward' },
  { from: 'Invoice', to: 'Follow-up', action: 'Chase' },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StackVisual() {
  return (
    <div
      className="leverage-stack-visual fade-up-element kb-card-shadow rounded-2xl border border-kb-line bg-kb-surface p-5 sm:p-6"
      role="img"
      aria-label="Six existing business tools separated by manual handoffs"
    >
      <div aria-hidden="true">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-inter text-sm font-semibold text-kb-ink">Your existing stack</p>
            <p className="mt-1 font-inter text-xs text-kb-ink-muted">Already paid for. Already in place.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-kb-line bg-kb-canvas px-3 py-1.5 font-inter text-[11px] font-medium text-kb-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            6 tools
          </span>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {STACK_TOOLS.map((tool) => (
            <div key={tool.label} className="rounded-xl border border-kb-line/80 bg-kb-canvas p-3.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-kb-accent-soft font-space-grotesk text-[10px] font-semibold tracking-wide text-kb-accent-ink">
                {tool.mark}
              </span>
              <p className="mt-3 font-inter text-xs font-medium text-kb-ink">{tool.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-kb-line/80 bg-kb-canvas p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-inter text-xs font-medium text-kb-ink">How the work moves today</p>
            <span className="rounded-full bg-kb-accent-soft px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-kb-accent-ink">By hand</span>
          </div>
          <svg viewBox="0 0 360 96" className="mt-3 h-24 w-full" fill="none">
            <path d="M20 58 C68 18, 105 78, 150 43 S237 23, 340 55" stroke="var(--kb-line-strong)" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 58 C68 18, 105 78, 150 43 S237 23, 340 55" stroke="var(--kb-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="48 20" />
            {[20, 102, 180, 260, 340].map((x, index) => (
              <g key={x}>
                <circle cx={x} cy={[58, 48, 35, 35, 55][index]} r="8" fill="var(--kb-surface)" stroke="var(--kb-accent)" strokeWidth="2" />
                {index < 4 && <circle cx={x + 40} cy={[36, 60, 27, 42][index]} r="3" fill="var(--kb-accent)" />}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}

function HandoffsVisual() {
  return (
    <div
      className="leverage-handoffs-visual fade-up-element kb-card-shadow rounded-2xl border border-kb-line bg-kb-surface p-5 sm:p-6"
      role="img"
      aria-label="Examples of information being manually copied, re-entered, forwarded and chased between tools"
    >
      <div aria-hidden="true">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-inter text-sm font-semibold text-kb-ink">Manual handoffs</p>
            <p className="mt-1 font-inter text-xs text-kb-ink-muted">The work between the software</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kb-inverse text-kb-inverse-text">
            <ArrowIcon />
          </span>
        </div>

        <div className="mt-6 space-y-3">
          {MANUAL_HANDOFFS.map((handoff, index) => (
            <div key={`${handoff.from}-${handoff.to}`} className="flex items-center justify-between gap-3 rounded-xl border border-kb-line/80 bg-kb-canvas p-3.5 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kb-surface font-space-grotesk text-xs font-semibold text-kb-ink shadow-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-inter text-sm font-medium text-kb-ink">{handoff.from} <span className="text-kb-ink-muted">→</span> {handoff.to}</p>
                  <p className="mt-0.5 font-inter text-[11px] text-kb-ink-muted">Waiting on a person</p>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-kb-accent-soft px-3 py-1.5 font-inter text-[11px] font-semibold text-kb-accent-ink">{handoff.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeverageShift() {
  return (
    <section className="relative z-10 bg-kb-canvas py-24 sm:py-32">
      <div className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="fade-up-element inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
          <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
          The operating gap
        </span>

        <h2 className="typography-reveal mt-5 max-w-5xl font-space-grotesk text-4xl font-normal leading-[1.02] tracking-tight text-kb-ink sm:text-5xl lg:text-6xl">
          <span className="block overflow-hidden pb-1">
            <span className="reveal-text inline-block">Your tools aren't always the problem.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="reveal-text inline-block font-medium text-kb-accent-ink">The gaps between them are.</span>
          </span>
        </h2>

        <div className="mt-10 grid gap-6 rounded-[2rem] border border-kb-line bg-kb-surface-raised p-4 sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
          <div className="leverage-intro-copy fade-up-element flex flex-col justify-center px-2 py-6 sm:px-4 lg:px-8">
            <p className="font-space-grotesk text-3xl font-medium leading-[1.05] tracking-tight text-kb-ink sm:text-4xl">You already have the software.</p>
            <p className="mt-5 max-w-xl font-inter text-base font-light leading-7 text-kb-ink-soft sm:text-lg">
              Most growing service businesses don't need another subscription. You already have a scheduling system, an inbox, forms, a calendar, spreadsheets and accounting.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Existing business tools">
              {STACK_TOOLS.map((tool) => (
                <span key={tool.label} className="rounded-full border border-kb-line bg-kb-surface px-4 py-2 font-inter text-sm font-medium text-kb-ink-soft">
                  {tool.label}
                </span>
              ))}
            </div>
          </div>

          <StackVisual />

          <div className="leverage-manual-copy fade-up-element flex flex-col justify-center px-2 py-6 sm:px-4 lg:px-8">
            <p className="font-space-grotesk text-3xl font-medium leading-[1.05] tracking-tight text-kb-ink sm:text-4xl">People become the integration.</p>
            <p className="mt-5 max-w-xl font-inter text-base font-light leading-7 text-kb-ink-soft sm:text-lg">
              The problem is that they don't talk to each other. So people become the integration: they copy, paste, chase, check, re-enter, forward and update.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Repeated manual actions">
              {['Copy', 'Paste', 'Chase', 'Check', 'Re-enter', 'Forward', 'Update'].map((action) => (
                <span key={action} className="rounded-full border border-kb-line bg-kb-surface px-3.5 py-2 font-inter text-sm font-medium text-kb-ink-soft">
                  {action}
                </span>
              ))}
            </div>
            <p className="mt-7 max-w-xl border-l-2 border-kb-accent pl-5 font-inter text-base font-medium leading-7 text-kb-accent-ink sm:text-lg">
              Every tool you add makes this worse, not better. The tenth system doesn't reduce the coordination work, it creates more of it.
            </p>
          </div>

          <HandoffsVisual />
        </div>
      </div>
    </section>
  );
}
