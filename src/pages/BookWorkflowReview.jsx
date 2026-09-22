import CalInlineEmbed from '../components/CalInlineEmbed.jsx';
import BookingFaq from '../components/BookingFaq.jsx';
import BookingExplore from '../components/BookingExplore.jsx';

const REVIEW_TOPICS = [
  {
    title: 'Workflow analysis',
    copy: 'Walk through the software, spreadsheets, emails, handoffs and workarounds slowing your team down.',
  },
  {
    title: 'Bottleneck discovery',
    copy: 'Find the repeated tasks, duplicate entry, delays and work that depends too heavily on one person.',
  },
  {
    title: 'Automation opportunities',
    copy: 'Identify what should connect, what can run automatically and where people should remain in control.',
  },
  {
    title: 'First-build roadmap',
    copy: 'Leave with a clear recommendation: what to build first, what to defer and the sensible next step.',
  },
];

const TOPIC_BORDERS = [
  '',
  'border-t border-kb-line md:border-l md:border-t-0',
  'border-t border-kb-line lg:border-l lg:border-t-0',
  'border-t border-kb-line md:border-l lg:border-t-0',
];

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 7h16M7 3v4m10-4v4M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M15 9.5 20 7v10l-5-2.5" />
      <rect x="3" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

const META = [
  { label: '30 minutes', Icon: ClockIcon },
  { label: 'Mon–Sat · your time zone', Icon: CalendarIcon },
  { label: 'Google Meet · link by email', Icon: VideoIcon },
];

export default function BookWorkflowReview() {
  return (
    <div className="relative overflow-hidden bg-kb-canvas pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_0%,var(--kb-accent-soft),transparent_68%)] opacity-65" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-7">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-kb-line-strong bg-kb-surface/80 px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-kb-ink-muted shadow-sm backdrop-blur-sm sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            Free 30-minute workflow review · no obligation
          </div>

          <h1 className="mt-7 font-space-grotesk text-[clamp(2.85rem,6vw,4rem)] font-medium leading-[0.96] tracking-[-0.05em] text-kb-ink">
            <span className="block">Book your business</span>
            <span className="block">
              <em className="font-normal text-kb-accent-ink">workflow</em> review.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl font-inter text-base leading-7 text-kb-ink-soft sm:text-lg sm:leading-8">
            Show us how the work happens today. In half an hour, we’ll find the manual bottlenecks worth fixing and outline what a sensible first build could look like.
          </p>
        </header>

        <section className="mt-20 sm:mt-24" aria-labelledby="review-title">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.19em] text-kb-ink-muted">
            KiteBaze
          </p>

          <div className="mt-3 flex flex-col gap-6 border-b-2 border-kb-ink pb-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="review-title" className="font-space-grotesk text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl lg:shrink-0 lg:whitespace-nowrap">
              30-min Workflow Review
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-4 lg:flex-1 lg:justify-end">
              {META.map(({ label, Icon }) => (
                <span key={label} className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.07em] text-kb-ink-muted">
                  <span className="text-kb-accent-ink"><Icon /></span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="border-b-2 border-kb-ink py-6">
            <p className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.19em] text-kb-ink-muted">
              <span className="h-2 w-2 rounded-full bg-kb-accent" />
              What we’ll cover
            </p>
          </div>

          <div className="grid border-b border-kb-line-strong md:grid-cols-2 lg:grid-cols-4">
            {REVIEW_TOPICS.map((topic, index) => (
              <article
                key={topic.title}
                className={`py-7 md:px-7 lg:min-h-[190px] lg:px-6 ${TOPIC_BORDERS[index]}`}
              >
                <p className="font-mono text-[10px] font-semibold tracking-[0.14em] text-kb-accent-ink">
                  0{index + 1}
                </p>
                <h3 className="mt-4 font-space-grotesk text-lg font-medium tracking-tight text-kb-ink">
                  {topic.title}
                </h3>
                <p className="mt-3 font-inter text-sm leading-6 text-kb-ink-soft">
                  {topic.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[26px] border border-kb-line bg-kb-surface-soft p-2 sm:p-4 lg:p-7">
            <CalInlineEmbed />
          </div>

          <aside className="mt-6 flex gap-4 border-l-2 border-kb-accent py-2 pl-4 sm:items-center" aria-label="What happens after choosing a time">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-kb-accent-ink sm:mt-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M9 18h6M10 22h4" />
              <path d="M8.5 15.5c-1.5-1.1-2.5-2.8-2.5-4.7a6 6 0 1 1 12 0c0 1.9-1 3.6-2.5 4.7-.8.6-1.2 1.2-1.3 1.5h-4.4c-.1-.3-.5-.9-1.3-1.5Z" />
            </svg>
            <p className="font-inter text-sm leading-6 text-kb-ink-muted">
              <strong className="font-semibold text-kb-ink">After selecting a time,</strong> you’ll answer a few quick questions about your business and workflow. That helps us arrive prepared.
            </p>
          </aside>
        </section>

        <BookingFaq />
      </div>

      <BookingExplore />
    </div>
  );
}
