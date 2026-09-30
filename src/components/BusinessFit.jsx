const FIT_SIGNALS = [
  {
    number: '01',
    title: 'Your operational overhead is getting expensive.',
    body: 'Too much paid time goes into coordination, follow-ups, admin, rework, and keeping things moving.',
    visual: 'load',
    className: 'lg:col-span-5',
  },
  {
    number: '02',
    title: 'Manual work is creating real risk.',
    body: 'Missed steps, inconsistent processes, delayed responses, or information living in the wrong place can cost you customers, money, or compliance.',
    visual: 'risk',
    className: 'lg:col-span-5',
  },
  {
    number: '03',
    title: 'Your operations feel bigger than your team.',
    body: "You don't necessarily need more people. You need the work to move better with the people you already have.",
    visual: 'capacity',
    className: 'lg:col-span-5',
  },
  {
    number: '04',
    title: 'The problem is worth fixing.',
    body: "These aren't minor annoyances. Fixing them would save meaningful time or money, reduce risk, or give your team room to grow.",
    visual: 'impact',
    className: 'lg:col-span-6',
  },
];

function PanelHeader({ label, status = 'Live view' }) {
  return (
    <div className="relative z-20 flex h-9 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-3.5">
      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-white/45 sm:text-[9px]">{label}</span>
      <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.14em] text-white/30 sm:text-[8px]">
        <span className="h-1.5 w-1.5 rounded-full bg-kb-accent shadow-[0_0_10px_rgba(159,107,78,0.75)]" />
        {status}
      </span>
    </div>
  );
}

function VisualShell({ label, status, children }) {
  return (
    <div className="relative h-[174px] overflow-hidden rounded-[18px] border border-white/10 bg-[#101116] shadow-[0_24px_55px_rgba(0,0,0,0.28)] sm:h-48">
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.11) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 76%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-kb-accent/10 to-transparent" />
      <PanelHeader label={label} status={status} />
      {children}
    </div>
  );
}

function LoadVisual() {
  const rows = [
    ['Coordination', 'Waiting'],
    ['Follow-up', 'Chasing'],
    ['Admin & rework', 'Repeating'],
  ];

  return (
    <VisualShell label="Operational load" status="This week">
      <div className="absolute inset-x-3 bottom-3 top-12 grid grid-cols-[minmax(0,1fr)_88px] gap-2.5 sm:inset-x-4 sm:grid-cols-[minmax(0,1fr)_112px] sm:gap-3">
        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035]">
          {rows.map(([label, state], index) => (
            <div
              key={label}
              className={`flex h-1/3 items-center gap-2 border-white/[0.07] px-3 transition-colors duration-300 group-hover:bg-white/[0.025] ${index < rows.length - 1 ? 'border-b' : ''}`}
            >
              <span className={`h-6 w-0.5 shrink-0 rounded-full ${index === 1 ? 'bg-kb-accent' : 'bg-white/10'}`} />
              <span className="min-w-0 flex-1 truncate text-[10px] font-medium text-white/70 sm:text-[11px]">{label}</span>
              <span className={`rounded-full px-2 py-1 font-mono text-[6px] uppercase tracking-[0.08em] sm:text-[7px] ${index === 1 ? 'bg-kb-accent/20 text-kb-accent' : 'bg-white/[0.05] text-white/35'}`}>
                {state}
              </span>
            </div>
          ))}
        </div>
        <div className="use-case-float flex flex-col justify-between rounded-xl border border-kb-accent/30 bg-kb-accent/[0.09] p-3 shadow-xl backdrop-blur-sm">
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-kb-accent sm:text-[8px]">Manual load</span>
          <div>
            <span className="block font-space-grotesk text-xl font-medium text-white sm:text-2xl">High</span>
            <span className="mt-1 block text-[7px] leading-3 text-white/40 sm:text-[8px]">Work is being carried by people.</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((bar) => (
              <span key={bar} className={`h-1 flex-1 rounded-full ${bar < 3 ? 'bg-kb-accent' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function RiskVisual() {
  return (
    <VisualShell label="Exception monitor" status="Needs review">
      <div className="absolute inset-x-4 bottom-3 top-12">
        <div className="absolute inset-x-4 bottom-0 h-[84px] translate-y-2 rounded-xl border border-white/[0.06] bg-white/[0.025] transition-transform duration-500 group-hover:translate-y-3" />
        <div className="absolute inset-x-2 bottom-1 h-[88px] translate-y-1 rounded-xl border border-white/[0.08] bg-[#17181d] transition-transform duration-500 group-hover:translate-y-1.5" />
        <div className="absolute inset-x-0 bottom-2 rounded-xl border border-white/10 bg-[#1b1c21] p-3.5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-kb-accent">Missing approval</span>
              <p className="mt-1.5 text-[11px] font-medium text-white/80">Customer follow-up</p>
            </div>
            <span className="use-case-pulse flex h-7 w-7 items-center justify-center rounded-full border border-kb-accent/30 bg-kb-accent/15 text-[11px] text-kb-accent">!</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-white/30">
            <span>Owner · Unassigned</span>
            <span className="text-right">Status · Waiting</span>
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function CapacityVisual() {
  const stages = [
    ['01', 'Request captured'],
    ['02', 'Routed automatically'],
    ['03', 'Owner notified'],
  ];

  return (
    <VisualShell label="Capacity router" status="Work moving">
      <div className="absolute inset-x-3 bottom-3 top-12 space-y-2 sm:inset-x-4">
        {stages.map(([number, label], index) => (
          <div
            key={label}
            className={`relative flex h-[35px] items-center gap-2.5 rounded-xl border px-2.5 transition-all duration-500 ${index === 1 ? 'border-kb-accent/35 bg-kb-accent/10 group-hover:translate-x-1' : 'border-white/[0.07] bg-white/[0.035]'}`}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md font-mono text-[7px] ${index === 1 ? 'bg-kb-accent text-kb-on-accent' : 'bg-white/[0.06] text-white/35'}`}>{number}</span>
            <span className="truncate text-[9px] font-medium text-white/65 sm:text-[10px]">{label}</span>
            <span className={`ml-auto h-1.5 w-1.5 rounded-full ${index === 1 ? 'use-case-pulse bg-kb-accent' : 'bg-white/20'}`} />
          </div>
        ))}
        <div className="absolute bottom-[43px] left-5 top-[35px] w-px overflow-hidden bg-white/10" aria-hidden="true">
          <span className="use-case-flow-signal absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-transparent via-kb-accent to-transparent" />
        </div>
      </div>
    </VisualShell>
  );
}

function ImpactVisual() {
  const measures = [
    ['Manual steps', 'w-[88%]', 'w-[36%]'],
    ['Waiting', 'w-[76%]', 'w-[28%]'],
    ['Exceptions', 'w-[64%]', 'w-[22%]'],
  ];

  return (
    <VisualShell label="Value case" status="Opportunity found">
      <div className="absolute inset-x-3 bottom-3 top-12 grid grid-cols-[minmax(0,1fr)_86px] gap-2.5 sm:inset-x-4 sm:grid-cols-[minmax(0,1fr)_132px] sm:gap-3">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 sm:p-4">
          <div className="mb-3 grid grid-cols-[70px_1fr_1fr] gap-2 font-mono text-[6px] uppercase tracking-[0.12em] text-white/30 sm:grid-cols-[92px_1fr_1fr] sm:text-[7px]">
            <span>Workflow</span>
            <span>Current</span>
            <span className="text-kb-accent">Improved</span>
          </div>
          <div className="space-y-3">
            {measures.map(([label, currentWidth, improvedWidth]) => (
              <div key={label} className="grid grid-cols-[70px_1fr_1fr] items-center gap-2 sm:grid-cols-[92px_1fr_1fr]">
                <span className="truncate text-[8px] text-white/55 sm:text-[9px]">{label}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><span className={`block h-full rounded-full bg-white/20 ${currentWidth}`} /></span>
                <span className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><span className={`block h-full rounded-full bg-kb-accent transition-all duration-700 group-hover:w-[18%] ${improvedWidth}`} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="use-case-float flex flex-col rounded-xl border border-kb-accent/30 bg-kb-accent/[0.1] p-2.5 shadow-xl backdrop-blur-sm sm:p-3">
          <span className="font-mono text-[6px] uppercase tracking-[0.13em] text-kb-accent sm:text-[8px]">Worth fixing</span>
          <span className="mt-2 text-[9px] font-medium leading-3 text-white/70 sm:text-[11px] sm:leading-4">Meaningful operational impact</span>
          <div className="mt-auto flex flex-wrap gap-1">
            {['Time', 'Risk', 'Capacity'].map((label) => (
              <span key={label} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-1.5 py-1 font-mono text-[5px] uppercase tracking-[0.08em] text-white/35 sm:text-[6px]">{label}</span>
            ))}
          </div>
        </div>
      </div>
    </VisualShell>
  );
}

function FitSignalVisual({ type }) {
  if (type === 'load') return <LoadVisual />;
  if (type === 'risk') return <RiskVisual />;
  if (type === 'capacity') return <CapacityVisual />;
  return <ImpactVisual />;
}

export default function BusinessFit() {
  return (
    <section className="relative z-10 overflow-hidden border-t border-kb-inverse-text/10 bg-kb-inverse py-16 text-kb-inverse-text sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-kb-accent/10 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-56 -left-40 h-[32rem] w-[32rem] rounded-full bg-kb-accent/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl">
          <span className="fade-up-element inline-flex items-center gap-2 rounded-full border border-kb-inverse-text/15 bg-kb-inverse-soft px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            Who this is built for
          </span>

          <h2 className="fade-up-element mt-5 max-w-6xl font-space-grotesk text-[2.35rem] font-normal leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="lg:block">Built for businesses where the work</span>{' '}
            <span className="lg:block">
              has outgrown <span className="font-medium text-kb-accent">the way it gets done.</span>
            </span>
          </h2>

          <p className="fade-up-element mt-6 max-w-6xl font-inter text-base font-light leading-7 text-kb-inverse-muted sm:text-lg sm:leading-8">
            <span className="lg:block">Kitebaze works with growing, owner-led businesses with real operational complexity —</span>{' '}
            <span className="lg:block">where too much time, money, and attention is being lost to the way work moves through the business.</span>
          </p>
        </div>

        <div className="fade-up-element mt-10 flex items-center gap-4 sm:mt-14">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.19em] text-kb-accent sm:text-xs">You’re likely a good fit if</span>
          <span className="h-px flex-1 bg-kb-inverse-text/15" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(15,minmax(0,1fr))]">
          {FIT_SIGNALS.map((signal, index) => (
            <article
              key={signal.number}
              className={`fade-up-element group relative flex min-h-[430px] flex-col overflow-hidden rounded-3xl border border-kb-inverse-text/10 bg-kb-inverse-soft p-5 transition duration-500 hover:-translate-y-1 hover:border-kb-accent/40 sm:min-h-[450px] sm:p-7 ${signal.className}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="relative z-20 flex items-center justify-between gap-6">
                <span className="font-mono text-xs font-medium tracking-[0.18em] text-kb-accent">{signal.number}</span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">Fit signal</span>
              </div>

              <div className="relative z-20 mt-8 sm:mt-10">
                <h3 className="max-w-2xl font-space-grotesk text-2xl font-medium leading-tight tracking-[-0.025em] sm:text-[1.7rem]">{signal.title}</h3>
                <p className="mt-3 max-w-2xl font-inter text-sm font-light leading-6 text-kb-inverse-muted sm:text-[15px] sm:leading-6">{signal.body}</p>
              </div>

              <div className="relative z-10 mt-auto pt-7" aria-hidden="true">
                <FitSignalVisual type={signal.visual} />
              </div>

              <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-kb-accent/0 blur-[60px] transition-colors duration-500 group-hover:bg-kb-accent/15" aria-hidden="true" />
            </article>
          ))}

          <div className="fade-up-element grid min-h-[300px] overflow-hidden rounded-3xl border border-kb-accent/30 bg-kb-accent text-kb-on-accent md:col-span-2 sm:min-h-[330px] lg:col-span-9 lg:min-h-[450px] lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col justify-center border-b border-kb-on-accent/15 p-7 lg:border-b-0 lg:border-r lg:p-10">
              <p className="max-w-xs font-space-grotesk text-3xl font-medium uppercase leading-[0.95] tracking-[-0.035em] sm:text-4xl lg:text-[2.65rem]">
                That’s where we come in
              </p>
              <p className="mt-6 max-w-xs font-inter text-base font-medium leading-6 text-kb-on-accent/85 sm:text-lg sm:leading-7">
                We find what’s creating the drag, fix how the work moves, and build what should run without you.
              </p>
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-kb-on-accent/65 sm:text-xs">
                Built for businesses like
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {[
                  'Staffing agencies',
                  'Equipment rental',
                  'Clinics & healthcare',
                  'Testing & inspection',
                  'Professional services',
                ].map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-kb-on-accent/25 bg-kb-on-accent/[0.08] px-3.5 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] sm:text-[10px]"
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <p className="mt-6 font-space-grotesk text-base font-semibold uppercase leading-tight tracking-[-0.015em] sm:text-lg">
                + Other operations-heavy businesses
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
