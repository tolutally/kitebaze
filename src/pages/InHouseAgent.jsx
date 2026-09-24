import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const bottlenecks = [
  ['Lead Follow-up', 'Responds, qualifies and routes new enquiries.', 'message'],
  ['Quote to Booking', 'Moves estimates, approvals and reminders forward.', 'calendar'],
  ['Client Onboarding', 'Collects information and coordinates each next step.', 'user'],
  ['Invoice Follow-up', 'Tracks outstanding payments and sends reminders.', 'invoice'],
  ['Recurring Reporting', 'Collects, checks and summarizes routine information.', 'report'],
  ['Quality Checks', 'Reviews completed work against defined standards.', 'quality'],
];

const BOTTLENECK_COUNT = bottlenecks.length;

function BottleneckIcon({ type }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'h-6 w-6',
    'aria-hidden': true,
  };

  if (type === 'calendar') {
    return <svg {...commonProps}><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"/><path d="m8.5 15.5 2 2 4.5-4.5"/></svg>;
  }
  if (type === 'user') {
    return <svg {...commonProps}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a6 6 0 0 1 6-6h2M17 11v6M14 14h6"/></svg>;
  }
  if (type === 'invoice') {
    return <svg {...commonProps}><path d="M6 2h9l3 3v7M6 2v20l3-2 3 2 3-2 3 2v-3"/><path d="M9 8h5M9 12h3"/><circle cx="18" cy="16" r="4"/><path d="M18 14v2l1.5 1"/></svg>;
  }
  if (type === 'report') {
    return <svg {...commonProps}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="M18.5 4.5a4 4 0 0 1 2 5M20.5 4.5h-3v3"/></svg>;
  }
  if (type === 'quality') {
    return <svg {...commonProps}><path d="M12 2 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z"/><path d="m8.5 12 2.25 2.25L15.5 9.5"/></svg>;
  }
  return <svg {...commonProps}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M11 11h7M15 8l3 3-3 3"/></svg>;
}

function BottleneckCards() {
  const carouselRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [autoAdvancePaused, setAutoAdvancePaused] = useState(false);

  const scrollToCard = useCallback((targetIndex, behavior = 'smooth') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const index = (targetIndex + BOTTLENECK_COUNT) % BOTTLENECK_COUNT;
    const card = carousel.querySelector(`[data-bottleneck-index="${index}"]`);
    if (!card) return;

    const left = card.offsetLeft - ((carousel.clientWidth - card.clientWidth) / 2);
    carousel.scrollTo({ left, behavior });
    setActiveIndex(index);
  }, []);

  const pauseAutoAdvance = useCallback(() => {
    setAutoAdvancePaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => setAutoAdvancePaused(false), 8000);
  }, []);

  const moveCarousel = useCallback((direction) => {
    pauseAutoAdvance();
    scrollToCard(activeIndex + direction);
  }, [activeIndex, pauseAutoAdvance, scrollToCard]);

  const handleCarouselScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    window.cancelAnimationFrame(scrollFrameRef.current);
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const cards = [...carousel.querySelectorAll('[data-bottleneck-index]')];
      const carouselCenter = carousel.scrollLeft + (carousel.clientWidth / 2);
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + (card.clientWidth / 2);
        const distance = Math.abs(cardCenter - carouselCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  }, []);

  const handleCarouselKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
  };

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const updateMobileState = () => setIsMobile(mobileQuery.matches);
    updateMobileState();
    mobileQuery.addEventListener('change', updateMobileState);

    return () => mobileQuery.removeEventListener('change', updateMobileState);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(carousel);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      if (carouselRef.current) carouselRef.current.scrollLeft = 0;
      setActiveIndex(0);
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isInView || autoAdvancePaused || reducedMotion) return undefined;

    const timer = window.setTimeout(() => scrollToCard(activeIndex + 1), 4200);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoAdvancePaused, isInView, isMobile, scrollToCard]);

  useEffect(() => () => {
    window.clearTimeout(resumeTimerRef.current);
    window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  return (
    <>
      <div
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Recurring bottlenecks"
        tabIndex="0"
        onScroll={handleCarouselScroll}
        onPointerDown={pauseAutoAdvance}
        onWheel={pauseAutoAdvance}
        onKeyDown={handleCarouselKeyDown}
        className="bottleneck-mobile-carousel -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-6"
      >
        {bottlenecks.map(([title, copy, icon], index) => (
          <article
            key={title}
            data-bottleneck-index={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${BOTTLENECK_COUNT}: ${title}`}
            className="bottleneck-service-card bottleneck-carousel-slide fade-up-element min-h-[260px] w-[86%] shrink-0 snap-center p-8 sm:w-[72%] sm:p-10 md:w-auto"
            style={{ '--bottleneck-delay': `${index * 70}ms` }}
          >
            <span className="absolute right-6 top-5 font-playfair text-5xl font-semibold leading-none text-kb-accent/[0.08]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[14px] border border-kb-accent/20 bg-gradient-to-br from-kb-accent/15 to-kb-accent/[0.04] text-kb-accent-light">
              <BottleneckIcon type={icon} />
            </span>
            <h3 className="relative z-10 mt-7 font-playfair text-2xl font-medium leading-tight text-kb-inverse-text">
              {title}
            </h3>
            <p className="relative z-10 mt-3 max-w-sm font-inter text-base font-light leading-relaxed text-kb-inverse-muted">
              {copy}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2" role="group" aria-label="Slideshow controls">
          <button
            type="button"
            onClick={() => moveCarousel(-1)}
            aria-label="Show previous card"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-kb-line-strong bg-kb-surface text-lg text-kb-ink shadow-sm transition-colors hover:bg-kb-surface-soft"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Show next card"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-kb-inverse text-lg text-kb-inverse-text shadow-sm transition-colors hover:bg-kb-inverse-soft"
          >
            →
          </button>
        </div>

        <div className="flex items-center gap-2" aria-label="Choose a slideshow card">
          {bottlenecks.map(([title], index) => (
            <button
              key={title}
              type="button"
              onClick={() => {
                pauseAutoAdvance();
                scrollToCard(index);
              }}
              aria-label={`Show ${title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-6 bg-kb-accent' : 'w-2 bg-kb-line-strong'}`}
            />
          ))}
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-kb-ink-muted">
          {String(activeIndex + 1).padStart(2, '0')} / {String(BOTTLENECK_COUNT).padStart(2, '0')}
        </span>
      </div>
    </>
  );
}

const steps = [
  ['Find the bottleneck', 'Choose one recurring job that keeps slowing down or demanding attention.'],
  ['Map the workflow', 'Follow the work end to end, including handoffs, exceptions and workarounds.'],
  ['Build and prove it', 'Remove the repetitive steps, test the workflow and measure the improvement.'],
  ['Expand from there', 'Once it works reliably, improve the next connected bottleneck.'],
];

const faqs = [
  ['What exactly are you building?', 'We start with one recurring workflow, map where it gets stuck and build around the outcome it needs to produce.'],
  ['Do we need to be technical?', "No. This isn't a build-it-yourself kit. We implement and make sure it sticks."],
  ['How do we know if one bottleneck is enough?', 'We’ll tell you on the call. If one bottleneck is the right starting point, we’ll define the outcome and what “done” looks like. If the real constraint spans several workflows, we’ll say so.'],
  ['How quickly can the workflow be running?', 'Quickly. We move from mapping to build to real use, then tighten it until it runs reliably.'],
  ['Where does it run?', 'Where your team already works—email, calendar, CRM, helpdesk, spreadsheets and the rest. We build around your stack.'],
  ['Who manages it day to day?', 'A real owner still matters. We’ll help you decide who owns the inputs, approves edge cases and keeps standards tight.'],
  ['What if we choose the wrong bottleneck?', 'We’ll tell you before we build. If the real constraint is broader than one recurring workflow, we’ll recommend a better starting point.'],
  ['Is our data safe?', 'We build to your requirements and keep access tight. If sensitive data is involved, we’ll scope the workflow around what should and should not touch it.'],
];

const rightMove = [
  'The same work gets delayed or dropped repeatedly.',
  'Someone is always copying, checking, chasing or reminding.',
  'The process relies too heavily on one person keeping it moving.',
  'You want to fix one recurring problem before changing everything.',
];

const notRightMove = [
  'The problem changes completely from week to week.',
  'The work depends mostly on strategy, negotiation or human judgement.',
  'There is no clear outcome to improve.',
  'You want a company-wide transformation rather than one practical place to start.',
];

export default function InHouseAgent() {
  return (
    <>
      <section className="relative min-h-[800px] overflow-hidden bg-kb-inverse pt-32 text-kb-inverse-text">
        <img src="/in-house-assets/hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-right sm:object-center" />
        <div className="absolute inset-0 bg-kb-inverse/55"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-kb-canvas via-kb-canvas/55 to-transparent"></div>
        <div className="relative mx-auto mt-56 flex w-full max-w-7xl flex-col items-center px-6 text-center sm:mt-72">
          <h1 className="mb-6 font-space-grotesk text-5xl font-medium tracking-tight text-kb-inverse-text sm:text-7xl lg:text-8xl">Start with the work that keeps getting stuck.</h1>
          <p className="mb-10 max-w-2xl font-inter text-lg font-light text-kb-inverse-text/80 md:text-xl">We follow one recurring job from start to finish, find where the work slows down, and take the repetitive parts off your team’s plate.</p>
          <CallButton label="Find Your Bottleneck" />
          <p className="mt-4 font-inter text-sm font-light text-kb-inverse-text/60">30 minutes. One real workflow. A clear place to start.</p>
        </div>
      </section>

      <section className="relative z-20 mx-auto mb-16 w-full max-w-7xl bg-kb-canvas px-6 lg:mb-32">
        <div className="mx-auto mb-12 flex max-w-5xl flex-col items-center text-center lg:mb-16">
          <h2 className="font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-ink sm:text-5xl md:text-6xl">One bottleneck. Fully understood.</h2>
          <p className="mt-10 max-w-2xl font-space-grotesk text-lg font-light leading-tight text-kb-ink-soft sm:text-xl">We follow one recurring job end to end, find where it gets stuck, and identify what can be taken off your team’s plate.</p>
        </div>
        <div className="kb-card-shadow relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-kb-line bg-kb-surface font-inter xl:flex-row">
          <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-kb-accent/15 blur-[120px]"></div>
          <div className="relative z-10 w-full px-8 py-12 lg:px-14 lg:py-14 xl:w-[64%]">
            <h2 className="mb-4 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-accent-ink lg:text-5xl">When it’s the right move</h2>
            <p className="mb-10 text-xl font-light tracking-tight text-kb-ink-soft lg:text-2xl">Choose Bottleneck when:</p>
            <div className="space-y-8">{rightMove.map((item) => <CheckRow key={item}>{item}</CheckRow>)}</div>
          </div>
          <div className="relative z-10 w-full border-t border-kb-line bg-kb-surface-soft px-8 py-12 lg:px-12 lg:py-14 xl:w-[40%] xl:border-l xl:border-t-0">
            <h3 className="mb-6 text-2xl font-medium tracking-tight text-kb-ink lg:text-3xl">When it’s not</h3>
            <p className="mb-8 text-sm font-light leading-relaxed text-kb-ink-soft lg:text-base">This may not be the right starting point when:</p>
            <div className="space-y-6">
              {notRightMove.map((item) => <CrossRow key={item}>{item}</CrossRow>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden bg-kb-accent py-16 text-kb-on-accent lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className="mb-8 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-on-accent sm:text-6xl">Built around the real work</h2>
            <h3 className="mb-3 font-inter text-2xl font-medium tracking-tight text-kb-on-accent">Every bottleneck fix is designed around four things:</h3>
            <ul className="space-y-3 font-inter text-lg text-kb-on-accent">
              {['Workflow:|How the job moves from start to finish', 'Friction:|Where people copy, check, chase or wait', 'Guardrails:|What runs automatically and what needs review', 'Outcome:|What should become faster, cleaner or more reliable'].map((item) => { const [label, copy] = item.split('|'); return <li key={label} className="grid grid-cols-[24px_1fr] items-start gap-4"><span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-kb-on-accent/30 bg-kb-on-accent/15"><img src="/in-house-assets/check-icon.png" alt="" className="h-3.5 w-3.5" /></span><span><strong>{label}</strong> <span className="font-light text-kb-on-accent/80">{copy}</span></span></li>; })}
            </ul>
          </div>
          <div className="group relative h-[260px] lg:col-span-5 lg:h-auto lg:min-h-[400px]">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-kb-inverse-muted/25 bg-kb-inverse-soft shadow-2xl">
              <img src="/in-house-assets/agent-landscape.jpg" alt="Sci-fi landscape" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-kb-inverse/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 p-8"><span className="inline-flex items-center gap-2 rounded-full border border-kb-inverse-muted/25 bg-kb-inverse/55 px-3 py-1.5 font-inter text-[10px] font-semibold uppercase tracking-wide text-kb-inverse-text backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-kb-accent shadow-[0_0_10px_rgba(159,107,78,0.65)]"></span>One Workflow</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden bg-kb-canvas py-24 text-kb-ink sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute -right-48 -top-48 h-[32rem] w-[32rem] rounded-full bg-kb-accent/10 blur-[120px]" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="fade-up-element">
              <p className="mb-5 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-kb-accent-ink before:h-px before:w-8 before:bg-gradient-to-r before:from-kb-accent before:to-transparent">
                Recurring bottlenecks
              </p>
              <h2 className="max-w-2xl font-playfair text-4xl font-normal leading-[1.08] tracking-[-0.025em] text-kb-ink sm:text-5xl lg:text-6xl">
                Where work <em className="font-normal text-kb-accent-ink">gets stuck</em>
              </h2>
            </div>
            <p className="fade-up-element max-w-sm font-inter text-base font-light leading-relaxed text-kb-ink-soft lg:pb-1">
              These are some of the recurring bottlenecks we can help remove.
            </p>
          </div>

          <BottleneckCards />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl bg-kb-canvas px-6 pb-24">
        <h2 className="text-center font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-5xl lg:text-6xl">How it works</h2>
        <div className="relative mx-auto mt-24 max-w-5xl"><div className="absolute left-0 right-0 top-10 hidden border-t border-dashed border-kb-line-strong sm:block"></div><div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, copy], index) => <div key={title} className="flex flex-col items-center text-center"><div className="flex h-20 w-full items-center justify-center"><span className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-kb-accent font-medium text-kb-on-accent ring-4 ring-kb-accent/20 shadow-[0_0_20px_rgba(159,107,78,0.3)]">{index + 1}</span></div><p className="mt-3 max-w-[200px] font-inter text-xl font-medium leading-relaxed text-kb-ink">{title}</p><p className="mt-3 max-w-[210px] font-inter text-base font-light leading-relaxed text-kb-ink-soft">{copy}</p></div>)}</div><div className="mt-16 flex justify-center"><CallButton /></div></div>
      </section>

      <section className="relative overflow-hidden bg-[url('/about-assets/station-hero.jpg')] bg-cover bg-center py-24 text-kb-inverse-text"><div className="absolute inset-0 bg-kb-inverse/88"></div><div className="relative mx-auto max-w-7xl px-8"><div className="grid items-stretch gap-10 rounded-3xl border border-kb-inverse-muted/25 bg-gradient-to-br from-kb-accent/10 via-kb-inverse/80 to-kb-inverse/90 p-8 shadow-2xl backdrop-blur-md sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-12"><div><p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-kb-accent-light">One clear starting point</p><h2 className="mt-5 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-inverse-text sm:text-5xl">One bottleneck. One outcome.</h2><p className="mt-5 max-w-lg font-inter text-base font-light leading-relaxed text-kb-inverse-muted sm:text-lg">We map the workflow, remove the repetitive work and define how success will be measured.</p></div><div className="flex flex-col justify-center"><h2 className="font-space-grotesk text-3xl font-medium leading-tight tracking-tight text-kb-inverse-text sm:text-4xl">Prove it before you expand.</h2><p className="mt-5 max-w-lg font-inter text-base font-light leading-relaxed text-kb-inverse-muted sm:text-lg">Start with one recurring bottleneck. Once it runs reliably and the value is clear, move to the next connected workflow.</p><div className="mt-8"><CallButton /></div></div></div></div></section>

      <section className="bg-kb-canvas px-4 pb-24 pt-12"><div className="mx-auto max-w-6xl"><div className="mb-16 text-center"><img src="/in-house-assets/faq-icon.png" alt="" className="mx-auto mb-6 w-[4.8rem] animate-bounce" /><h2 className="font-inter text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">Frequently Asked Questions</h2></div><div className="divide-y divide-kb-line border-y border-kb-line">{faqs.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between text-kb-ink transition-colors hover:text-kb-accent-ink"><span className="font-space-grotesk text-lg font-normal tracking-tight">{question}</span><span className="ml-4 text-2xl text-kb-ink-muted transition-transform group-open:rotate-180">⌄</span></summary><p className="pr-8 pt-4 text-lg font-light leading-relaxed text-kb-ink-soft">{answer}</p></details>)}</div></div></section>

      <section className="relative bg-kb-accent py-32 text-center text-kb-on-accent"><div className="mx-auto max-w-4xl px-4"><h2 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-on-accent sm:text-7xl">Start with one bottleneck.</h2><p className="mx-auto mb-10 mt-6 max-w-2xl text-lg font-light text-kb-on-accent/80 sm:text-xl">30 minutes. One real workflow. A clear place to begin.</p><Link to="/book-workflow-review" className="inline-flex rounded-full bg-kb-inverse px-8 py-3.5 font-inter text-sm text-kb-inverse-text transition-colors hover:bg-kb-inverse-soft">Book a Workflow Review</Link></div></section>
    </>
  );
}

function CallButton({ label = 'Book a Workflow Review' }) { return <Link to="/book-workflow-review" className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">{label}</Link>; }
function CheckRow({ children }) { return <div className="flex items-start"><span className="mr-4 mt-1 shrink-0 text-xl text-kb-accent-ink">✓</span><span className="text-base font-light leading-relaxed text-kb-ink-soft lg:text-xl">{children}</span></div>; }
function CrossRow({ children }) { return <div className="flex items-start"><span className="mr-4 mt-0.5 shrink-0 text-xl text-kb-ink-muted">×</span><span className="text-sm font-light leading-relaxed text-kb-ink-soft lg:text-base">{children}</span></div>; }
