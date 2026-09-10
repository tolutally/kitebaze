const CHATGPT_POINTS = [
  {
    title: 'You probably should.',
    copy: "Drafting a message, cleaning up an email, summarising a thread. A $20 subscription does that well and you don't need us for it. What it can't do is work when you're not typing.",
    icon: 'grid',
  },
  {
    title: "It won't notice on its own.",
    copy: "ChatGPT won't notice a booking came in, pull the details, create the record, send the confirmation, chase the form that never came back and flag the invoice that's three weeks late — while you're with a client. That gap isn't intelligence. It's plumbing.",
    icon: 'handoff',
  },
  {
    title: 'The hard part was never the AI.',
    copy: "It's the connection between your scheduling tool and your accounting. It's the exception nobody documents — the client who always pays late, the job that needs two visits, the form your regulator requires.",
    icon: 'repeat',
  },
  {
    title: 'You can build it yourself.',
    copy: "Some people should. If you have someone in-house who enjoys this and has the time, do that — it's cheaper. Hire us when you'd rather own the outcome than the maintenance.",
    icon: 'person',
  },
];

function ChatGPTIcon({ type }) {
  if (type === 'grid') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18M15 3v18" />
      </svg>
    );
  }

  if (type === 'handoff') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="6" height="6" rx="1.5" />
        <rect x="15" y="14" width="6" height="6" rx="1.5" />
        <path d="M9 7h4a3 3 0 0 1 3 3v4M13 12l3 3 3-3" />
      </svg>
    );
  }

  if (type === 'repeat') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0M19 3v4M17 5h4" />
    </svg>
  );
}

export default function WhyNotChatGPT() {
  return (
    <section className="relative border-t border-kb-line bg-kb-surface-soft pb-12 pt-16 sm:pb-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-40 mx-auto max-w-4xl text-center">
          <span className="fade-up-element inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            A fair question
          </span>
          <h2 className="typography-reveal mt-5 font-space-grotesk text-4xl font-normal leading-[1.02] tracking-tight text-kb-ink sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text inline-block">Why not just use</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text inline-block font-medium text-kb-accent-ink">ChatGPT?</span>
            </span>
          </h2>
          <p className="fade-up-element mx-auto mt-5 max-w-2xl font-inter text-base font-light leading-7 text-kb-ink-muted sm:text-lg">
            A subscription answers questions. A system does the job.
          </p>
          <div className="fade-up-element mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://calendly.com/kindling-solutions/kindling-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl bg-kb-inverse px-7 py-4 font-inter text-sm font-semibold text-kb-inverse-text shadow-[0_16px_36px_rgba(33,28,24,0.13)] transition-colors hover:bg-kb-inverse-soft sm:w-auto"
            >
              Show Us Your Workflow
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHATGPT_POINTS.map((item) => (
            <article key={item.title} className="fade-up-element kb-card-shadow flex min-h-[310px] flex-col rounded-2xl border border-kb-line bg-kb-surface/90 p-6 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-kb-line-strong bg-kb-accent-soft text-kb-accent-ink shadow-sm">
                <ChatGPTIcon type={item.icon} />
              </span>
              <div className="mt-auto pt-16">
                <h3 className="font-space-grotesk text-2xl font-medium leading-none tracking-tight text-kb-ink sm:text-3xl">{item.title}</h3>
                <p className="mt-4 font-inter text-base font-light leading-6 text-kb-ink-soft">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
