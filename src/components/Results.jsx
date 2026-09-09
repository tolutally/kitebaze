const workflowImages = [
  {
    src: '/image-man-with-laptop.png',
    alt: 'An operator surrounded by a manual coordination process',
  },
  {
    src: '/case-study-assets/jobs-done.jpg',
    alt: 'Work moving between an inbox, spreadsheet, phone, and laptop',
  },
  {
    src: '/case-study-assets/xerox.webp',
    alt: 'An operator working across a laptop, phone, and office printer',
  },
];

const metrics = [
  {
    value: '4–6',
    title: 'Connect the scattered steps',
    copy: 'Many jobs contain four to six steps that need no decision—someone reads it here, types it there, and moves the same information between tools.',
    plaque: 'border-kb-line-strong bg-kb-surface-soft text-kb-ink',
  },
  {
    value: '60–80%',
    title: 'Target the repeatable work',
    copy: 'We target removing 60–80% of manual steps per workflow—not as a blanket promise. We tell you what is worth automating and what should stay human.',
    plaque: 'border-kb-accent/30 bg-kb-accent-soft text-kb-accent-ink',
  },
  {
    value: '100%',
    title: 'Keep consequential actions controlled',
    copy: 'Every action involving a customer, document, or money waits for your approval. Every run is logged, so speed never comes at the cost of control.',
    plaque: 'border-kb-accent bg-kb-accent text-kb-on-accent',
  },
];

function ImageSet({ duplicate = false }) {
  return workflowImages.map((image) => (
    <div
      key={`${duplicate ? 'duplicate' : 'original'}-${image.src}`}
      className={`relative h-44 w-[17rem] shrink-0 overflow-hidden rounded-2xl border border-kb-line bg-kb-surface shadow-sm sm:h-56 sm:w-[24rem] lg:h-64 lg:w-[30rem] ${duplicate ? 'results-strip-duplicate' : ''}`}
      aria-hidden={duplicate || undefined}
    >
      <img
        src={image.src}
        alt={duplicate ? '' : image.alt}
        loading="lazy"
        className="h-full w-full object-cover grayscale-[20%] saturate-[0.8]"
      />
      <div className="pointer-events-none absolute inset-0 bg-kb-accent/5"></div>
    </div>
  ));
}

export default function Results() {
  return (
    <section className="relative z-10 overflow-hidden border-t border-kb-line bg-kb-canvas px-4 py-24 text-kb-ink sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="fade-up-element">
          <span className="inline-flex rounded-full bg-kb-accent px-3 py-1 font-inter text-xs font-semibold text-kb-on-accent">
            How work moves faster
          </span>
          <p className="mt-4 font-inter text-sm font-medium text-kb-ink-muted">
            The manual work hiding inside your business
          </p>
          <h2 className="mx-auto mt-3 max-w-4xl font-space-grotesk text-4xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Stop hopping between scattered tools. That’s where the manual work hides.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-lg">
            KiteBaze connects the repeated steps and handoffs quietly costing your team time—then automates only the parts that should run without you.
          </p>
        </div>

        <div className="results-strip-viewport -mx-4 mt-14 sm:-mx-6 lg:-mx-8">
          <div className="animate-results-strip flex w-max gap-5 px-2">
            <ImageSet />
            <ImageSet duplicate />
          </div>
        </div>

        <div className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <div aria-hidden="true" className="absolute left-[16.666%] right-[16.666%] top-8 hidden border-t border-kb-line-strong md:block"></div>
          {metrics.map((metric, index) => (
            <article
              key={metric.value}
              className="fade-up-element relative z-10 flex flex-col items-center"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span className={`flex h-16 min-w-28 items-center justify-center rounded-xl border px-4 font-space-grotesk text-2xl font-semibold tracking-tight shadow-sm ${metric.plaque}`}>
                {metric.value}
              </span>
              <h3 className="mt-5 font-space-grotesk text-xl font-medium tracking-tight text-kb-ink">
                {metric.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm font-inter text-base font-light leading-6 text-kb-ink-soft">
                {metric.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
