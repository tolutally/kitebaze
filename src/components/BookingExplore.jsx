import { Link } from 'react-router-dom';

const EXPLORE_LINKS = [
  {
    label: 'Free tool',
    title: 'Analyze where to start',
    copy: 'Compare the two ways to begin and find the one that fits the work slowing you down.',
    action: 'Find your starting point',
    to: '/#start-here',
  },
  {
    label: 'Proof',
    title: 'Case studies',
    copy: 'See the systems we have built, the operational problems behind them, and what changed afterward.',
    action: 'See the work',
    to: '/case-studies',
  },
];

export default function BookingExplore() {
  return (
    <section className="relative border-y border-kb-line bg-kb-surface-soft py-20 sm:py-24" aria-labelledby="booking-explore-title">
      <div className="mx-auto max-w-5xl px-5 sm:px-7">
        <header className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-kb-ink-muted">
            <span className="h-2 w-2 rounded-full bg-kb-accent" />
            Not ready to book?
          </p>
          <h2 id="booking-explore-title" className="mt-7 font-space-grotesk text-5xl font-medium leading-none tracking-[-0.045em] text-kb-ink sm:text-6xl">
            Explore on your <em className="font-normal text-kb-accent-ink">own time.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-2xl font-inter text-base leading-7 text-kb-ink-soft sm:text-lg sm:leading-8">
            Sometimes the right next step is to size things up first. Start with a free analysis or see what we have already built. No email gate, no signup.
          </p>
        </header>

        <div className="mt-14 grid border-y-2 border-kb-ink md:grid-cols-2">
          {EXPLORE_LINKS.map((item, index) => (
            <Link
              key={item.title}
              to={item.to}
              className={`group flex min-h-[250px] flex-col p-7 transition-colors hover:bg-kb-surface/70 sm:p-10 ${index === 1 ? 'border-t-2 border-kb-ink md:border-l-2 md:border-t-0' : ''}`}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.17em] text-kb-accent-ink">
                {item.label}
              </p>
              <h3 className="mt-5 font-space-grotesk text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 max-w-md font-inter text-base leading-7 text-kb-ink-soft">
                {item.copy}
              </p>
              <span className="mt-auto inline-flex items-center gap-3 pt-8 font-inter text-sm font-semibold text-kb-accent-ink">
                {item.action}
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
