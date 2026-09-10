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
    value: '0',
    title: 'Nothing sits in the middle',
    copy: "It runs in your accounts. Your scheduling tool, your accounting, your email, under your credentials. There's no Kitebaze platform holding your data.",
    plaque: 'border-kb-line-strong bg-kb-surface-soft text-kb-ink',
  },
  {
    value: '100%',
    title: 'Yours, in writing',
    copy: "The automations, the documentation, the logic. All of it transfers to you when it's built, not when you ask for it.",
    plaque: 'border-kb-accent/30 bg-kb-accent-soft text-kb-accent-ink',
  },
  {
    value: '3',
    title: 'What we sign',
    copy: 'An NDA, a data processing agreement, and ownership terms confirming all of the above.',
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
    <section className="relative z-10 overflow-hidden border-t border-kb-line bg-kb-canvas px-4 py-16 text-kb-ink sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div className="fade-up-element">
          <span className="fade-up-element inline-flex items-center gap-2 rounded-full bg-kb-accent px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-on-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            NO LOCK IN
          </span>
          <h2 className="mx-auto mt-4 max-w-4xl font-space-grotesk text-4xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            It's yours. Even if you leave. It runs in your accounts.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-lg">
            Your scheduling tool, your accounting, your email. We build inside them, under your credentials. There's no Kitebaze platform in the middle holding your data.
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
