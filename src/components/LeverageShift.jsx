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
      className="leverage-stack-visual fade-up-element kb-card-shadow min-w-0 rounded-2xl border border-kb-line bg-kb-surface p-4 sm:p-6"
      role="img"
      aria-label="Six existing business tools that still rely on manual handoffs"
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

        <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-7 sm:gap-3">
          {STACK_TOOLS.map((tool) => (
            <div key={tool.label} className="min-w-0 rounded-xl border border-kb-line/80 bg-kb-canvas p-2.5 sm:p-3.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-kb-accent-soft font-space-grotesk text-[9px] font-semibold tracking-wide text-kb-accent-ink sm:h-8 sm:w-8 sm:text-[10px]">
                {tool.mark}
              </span>
              <p className="mt-2 font-inter text-[10px] font-medium leading-tight text-kb-ink sm:mt-3 sm:text-xs">{tool.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 hidden rounded-2xl border border-kb-line/80 bg-kb-canvas p-4 sm:block sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-inter text-xs font-medium text-kb-ink">How the work moves today</p>
            <span className="rounded-full bg-kb-accent-soft px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-[0.12em] text-kb-accent-ink">By hand</span>
          </div>
          <svg viewBox="0 0 360 118" className="mt-3 h-28 w-full" fill="none">
            <path d="M45 44 Q95 8 145 30 T245 52 T345 38" stroke="var(--kb-line-strong)" strokeWidth="2" strokeLinecap="round" />
            <path d="M45 44 Q95 8 145 30 T245 52 T345 38" stroke="var(--kb-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 14" />
            {MANUAL_HANDOFFS.map((handoff, index) => {
              const x = [45, 145, 245, 345][index];
              const y = [44, 30, 52, 38][index];
              return (
                <g key={handoff.action}>
                  <circle cx={x} cy={y} r="13" fill="var(--kb-surface)" stroke="var(--kb-accent)" strokeWidth="2" />
                  <circle cx={x} cy={y - 3.5} r="3.4" fill="var(--kb-accent)" />
                  <path d={`M${x - 5.5} ${y + 6.5} C${x - 5.5} ${y + 1.5}, ${x - 3} ${y - 0.5}, ${x} ${y - 0.5} S${x + 5.5} ${y + 1.5}, ${x + 5.5} ${y + 6.5}`} stroke="var(--kb-accent)" strokeWidth="2" strokeLinecap="round" />
                  <text x={x} y={y + 30} textAnchor="middle" fontSize="10" fontFamily="var(--font-inter, Inter, sans-serif)" fontWeight="600" fill="var(--kb-ink-muted)">{handoff.action}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

function HandoffsVisual() {
  return (
    <div
      className="leverage-handoffs-visual fade-up-element kb-card-shadow min-w-0 rounded-2xl border border-kb-line bg-kb-surface p-4 sm:p-6"
      role="img"
      aria-label="Examples of information being manually copied, re-entered, forwarded and chased between tools"
    >
      <div aria-hidden="true">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-inter text-sm font-semibold text-kb-ink">The work left to you</p>
            <p className="mt-1 font-inter text-xs text-kb-ink-muted">What still needs a person</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-kb-inverse text-kb-inverse-text">
            <ArrowIcon />
          </span>
        </div>

        <div className="mt-5 space-y-2 sm:mt-6 sm:space-y-3">
          {MANUAL_HANDOFFS.map((handoff, index) => (
            <div key={`${handoff.from}-${handoff.to}`} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-xl border border-kb-line/80 bg-kb-canvas p-3 sm:flex sm:justify-between sm:p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kb-surface font-space-grotesk text-xs font-semibold text-kb-ink shadow-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="font-inter text-sm font-medium leading-snug text-kb-ink sm:truncate">{handoff.from} <span className="text-kb-ink-muted">→</span> {handoff.to}</p>
                <p className="mt-0.5 font-inter text-[11px] text-kb-ink-muted">Waiting on a person</p>
              </div>
              <span className="col-start-2 w-fit shrink-0 rounded-full bg-kb-accent-soft px-3 py-1.5 font-inter text-[11px] font-semibold text-kb-accent-ink">{handoff.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LeverageShift() {
  return (
    <section className="relative z-10 overflow-hidden bg-kb-canvas pb-4 pt-14 sm:pb-8 sm:pt-20">
      <div className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="fade-up-element inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
          <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
          The operating gap
        </span>

        <h2 className="typography-reveal mt-5 max-w-5xl font-space-grotesk text-4xl font-normal leading-[1.02] tracking-tight text-kb-ink sm:text-5xl lg:text-6xl">
          <span className="block overflow-hidden pb-1">
            <span className="reveal-text inline-block">Your tools aren't the problem.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="reveal-text inline-block font-medium text-kb-accent-ink">The gaps between them are.</span>
          </span>
        </h2>

        <div className="mt-8 grid min-w-0 gap-5 sm:mt-10 sm:gap-6 sm:rounded-[2rem] sm:border sm:border-kb-line sm:bg-kb-surface-raised sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
          <div className="leverage-intro-copy fade-up-element flex min-w-0 flex-col justify-center px-1 py-2 sm:px-4 sm:py-6 lg:px-8">
            <p className="font-space-grotesk text-[1.75rem] font-medium leading-[1.05] tracking-tight text-kb-ink sm:text-4xl">You already have the software.</p>
            <p className="mt-4 max-w-xl font-inter text-base font-light leading-6 text-kb-ink-soft sm:mt-5 sm:text-lg sm:leading-7">
              Most businesses don't need another tool. <strong className="font-medium text-kb-ink">The problem is all the work your team still has to do between the ones you already use.</strong>
            </p>
            <div className="mt-6 hidden flex-wrap gap-2 sm:flex" aria-label="Existing business tools">
              {STACK_TOOLS.map((tool) => (
                <span key={tool.label} className="rounded-full border border-kb-line bg-kb-surface px-4 py-2 font-inter text-sm font-medium text-kb-ink-soft">
                  {tool.label}
                </span>
              ))}
            </div>
          </div>

          <StackVisual />

          <div className="leverage-manual-copy fade-up-element flex min-w-0 flex-col justify-center px-1 py-2 sm:px-4 sm:py-6 lg:px-8">
            <p className="font-space-grotesk text-[1.75rem] font-medium leading-[1.05] tracking-tight text-kb-ink sm:text-4xl">Your team fills the gaps.</p>
            <p className="mt-4 max-w-xl font-inter text-base font-light leading-6 text-kb-ink-soft sm:mt-5 sm:text-lg sm:leading-7">
              When your tools stop, someone has to take over. <strong className="font-medium text-kb-ink">Copy the details. Check the calendar. Send the follow-up. Update the spreadsheet. Chase the customer. Repeat.</strong>
            </p>
            <p className="mt-5 max-w-xl border-l-2 border-kb-accent pl-4 font-inter text-base font-medium leading-6 text-kb-accent-ink sm:mt-7 sm:pl-5 sm:text-lg sm:leading-7">
              The software does its job. Your team is still left doing the work between it.
            </p>
          </div>

          <HandoffsVisual />
        </div>
      </div>
    </section>
  );
}
