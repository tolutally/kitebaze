import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  ['Operating blueprint', 'A clear view of how work moves, where it breaks and what should change.', 'blueprint'],
  ['Connected workflows', 'The right steps, people and systems working together from start to finish.', 'connected'],
  ['Clear handoffs', 'Everyone knows what happens next, who owns it and what “done” means.', 'handoff'],
  ['Built-in checks', 'Standards and approvals are applied at the right points in the workflow.', 'checks'],
  ['Live visibility', 'See what is moving, what is delayed and what needs attention.', 'visibility'],
  ['Adoption that sticks', 'Documentation, training and rollout built around how your team actually works.', 'adoption'],
];

const BENEFIT_COUNT = benefits.length;

const ceilingPoints = [
  'Work crosses multiple people, teams or systems.',
  'Important handoffs regularly stall or disappear.',
  'Key people spend too much time checking, routing and following up.',
  'Fixing one task will not solve the wider coordination problem.',
];

const process = [
  ['Workflow Review', 'Understand the problem, the people involved and whether Workflow Build is the right approach.'],
  ['Operating Blueprint', 'Map the connected workflows, handoffs, controls and opportunities for improvement.'],
  ['Build in stages', 'Implement the highest-value parts first, test them with the team and measure the result.'],
  ['Roll out and improve', 'Document the new way of working, train the team and improve it using real usage.'],
];

function WorkflowBenefitIcon({ type }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'h-6 w-6',
    'aria-hidden': true,
  };

  if (type === 'connected') return <svg {...props}><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="m7.2 7.2 3.5 8M16.8 7.2l-3.5 8M7.5 6h9"/></svg>;
  if (type === 'handoff') return <svg {...props}><path d="M4 8h12M13 5l3 3-3 3M20 16H8M11 13l-3 3 3 3"/><circle cx="4" cy="16" r="2"/><circle cx="20" cy="8" r="2"/></svg>;
  if (type === 'checks') return <svg {...props}><path d="M12 2 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z"/><path d="m8.5 12 2.25 2.25L15.5 9.5"/></svg>;
  if (type === 'visibility') return <svg {...props}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
  if (type === 'adoption') return <svg {...props}><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22V4.5ZM20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5A2.5 2.5 0 0 1 20 22V4.5Z"/><path d="m15.5 9 1.5 1.5 2.5-3"/></svg>;
  return <svg {...props}><path d="M5 3h14v18H5zM8 7h8M8 11h3M8 15h8"/><path d="m13.5 11 1.25 1.25L17 10"/></svg>;
}

function WorkflowBenefitCards() {
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
    const index = (targetIndex + BENEFIT_COUNT) % BENEFIT_COUNT;
    const card = carousel.querySelector(`[data-workflow-benefit-index="${index}"]`);
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
      const cards = [...carousel.querySelectorAll('[data-workflow-benefit-index]')];
      const center = carousel.scrollLeft + (carousel.clientWidth / 2);
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const distance = Math.abs((card.offsetLeft + (card.clientWidth / 2)) - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    });
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      if (carouselRef.current) carouselRef.current.scrollLeft = 0;
      setActiveIndex(0);
      return undefined;
    }
    if (!isInView || autoAdvancePaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setTimeout(() => scrollToCard(activeIndex + 1), 4200);
    return () => window.clearTimeout(timer);
  }, [activeIndex, autoAdvancePaused, isInView, isMobile, scrollToCard]);

  useEffect(() => () => {
    window.clearTimeout(resumeTimerRef.current);
    window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
  };

  return (
    <>
      <div
        ref={carouselRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="What you get with Workflow Build"
        tabIndex="0"
        onScroll={handleCarouselScroll}
        onPointerDown={pauseAutoAdvance}
        onWheel={pauseAutoAdvance}
        onKeyDown={handleKeyDown}
        className="bottleneck-mobile-carousel -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-6"
      >
        {benefits.map(([title, copy, icon], index) => (
          <article
            key={title}
            data-workflow-benefit-index={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${BENEFIT_COUNT}: ${title}`}
            className="bottleneck-service-card bottleneck-carousel-slide is-visible min-h-[260px] w-[86%] shrink-0 snap-center p-8 sm:w-[72%] sm:p-10 md:w-auto"
          >
            <span className="absolute right-6 top-5 font-playfair text-5xl font-semibold leading-none text-kb-accent/[0.08]">{String(index + 1).padStart(2, '0')}</span>
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[14px] border border-kb-accent/20 bg-gradient-to-br from-kb-accent/15 to-kb-accent/[0.04] text-kb-accent-light"><WorkflowBenefitIcon type={icon} /></span>
            <h3 className="relative z-10 mt-7 font-playfair text-2xl font-medium leading-tight text-kb-inverse-text">{title}</h3>
            <p className="relative z-10 mt-3 max-w-sm font-inter text-base font-light leading-relaxed text-kb-inverse-muted">{copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2" role="group" aria-label="Slideshow controls">
          <button type="button" onClick={() => moveCarousel(-1)} aria-label="Show previous card" className="flex h-11 w-11 items-center justify-center rounded-xl border border-kb-line-strong bg-kb-surface text-lg text-kb-ink shadow-sm transition-colors hover:bg-kb-surface-soft">←</button>
          <button type="button" onClick={() => moveCarousel(1)} aria-label="Show next card" className="flex h-11 w-11 items-center justify-center rounded-xl bg-kb-inverse text-lg text-kb-inverse-text shadow-sm transition-colors hover:bg-kb-inverse-soft">→</button>
        </div>
        <div className="flex items-center gap-2" aria-label="Choose a slideshow card">
          {benefits.map(([title], index) => <button key={title} type="button" onClick={() => { pauseAutoAdvance(); scrollToCard(index); }} aria-label={`Show ${title}`} aria-current={activeIndex === index ? 'true' : undefined} className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-6 bg-kb-accent' : 'w-2 bg-kb-line-strong'}`} />)}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-kb-ink-muted">{String(activeIndex + 1).padStart(2, '0')} / {String(BENEFIT_COUNT).padStart(2, '0')}</span>
      </div>
    </>
  );
}

function CallButton({ dark = false, children = 'Book a Workflow Review' }) {
  return <Link to="/book-workflow-review" className={`inline-flex w-fit items-center justify-center rounded-full px-8 py-3.5 font-inter text-sm font-medium transition-colors ${dark ? 'bg-kb-inverse text-kb-inverse-text hover:bg-kb-inverse-soft' : 'bg-kb-accent text-kb-on-accent hover:bg-kb-accent-hover'}`}>{children}</Link>;
}

export default function WorkflowBuild() {
  return (
    <>
      <section className="relative overflow-hidden bg-kb-accent pb-20 pt-44 text-center text-kb-on-accent sm:pb-32 sm:pt-56">
        <div className="relative z-10 mx-auto max-w-5xl px-8">
          <p className="mb-6 font-space-grotesk text-xs font-medium uppercase tracking-[0.22em] text-kb-on-accent/75">Workflow Build</p>
          <h1 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-on-accent sm:text-7xl lg:text-8xl">When one workflow isn’t enough.</h1>
          <p className="mx-auto mb-10 mt-6 max-w-3xl font-inter text-lg font-light leading-relaxed text-kb-on-accent/80 sm:text-xl">We redesign how connected work moves across your business, so handoffs, follow-up, visibility and quality no longer depend on you holding everything together.</p>
          <CallButton dark />
        </div>
      </section>

      <CeilingSequence />

      <section className="relative overflow-hidden border-t border-kb-line bg-kb-canvas py-24 text-kb-ink sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute -right-48 -top-48 h-[32rem] w-[32rem] rounded-full bg-kb-accent/10 blur-[120px]"></div>
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-kb-accent-ink before:h-px before:w-8 before:bg-gradient-to-r before:from-kb-accent before:to-transparent">What You Get</p>
              <h2 className="max-w-3xl font-playfair text-4xl font-normal leading-[1.08] tracking-[-0.025em] text-kb-ink sm:text-5xl lg:text-6xl">A better way for the work to <em className="font-normal text-kb-accent-ink">run.</em></h2>
            </div>
            <p className="max-w-sm font-inter text-base font-light leading-relaxed text-kb-ink-soft lg:pb-1">Connected workflows, clear handoffs, built-in checks and live visibility—designed around how your team actually works.</p>
          </div>
          <WorkflowBenefitCards />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-kb-line bg-kb-canvas py-24">
        <img src="/workflow-assets/operations-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.25] [mask-image:linear-gradient(to_right,transparent_15%,black_55%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-kb-canvas via-kb-canvas/95 to-transparent md:w-[65%]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><Eyebrow>Why Kitebaze</Eyebrow><h2 className="mb-6 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-ink sm:text-6xl">Built around the work. Not the software.</h2><p className="mb-10 font-inter text-lg font-light leading-relaxed text-kb-ink-soft">We do not begin with a tool or a list of automations. We begin with how the work actually moves through your business, then build the simplest system that makes it run better.</p><ul className="mb-10 space-y-4">{['Operator-led', 'Custom fit', 'Results measured'].map(item => <li key={item} className="flex items-center gap-4 font-inter text-lg font-extralight text-kb-ink"><img src="/workflow-assets/check.png" alt="" className="h-6 w-6" />{item}</li>)}</ul><CallButton /></div></div>
      </section>

      <section className="border-t border-kb-line bg-kb-surface-soft py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-10 text-center sm:grid-cols-3">{[['70+', 'Projects Completed'], ['99%', 'Satisfaction Rate'], ['≤ 7 Months', 'Pays For Itself']].map(([value, label]) => <div key={label}><p className="font-space-grotesk text-5xl font-medium text-kb-accent-ink sm:text-6xl">{value}</p><p className="mt-2 font-inter text-kb-ink-muted">{label}</p></div>)}</div>
          <div className="mb-12"><Eyebrow>Community</Eyebrow><h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">Loved by leaders.<br />Trusted by teams.</h2><p className="mt-5 font-inter font-light text-kb-ink-muted">Real use. Real outcomes. No theater.</p></div>
          <div className="kb-card-shadow relative flex flex-col items-center overflow-hidden rounded-3xl border border-kb-line bg-kb-surface p-6 md:p-12 lg:flex-row lg:gap-16">
            <div className="w-full lg:w-[45%]"><div className="mx-auto aspect-square max-w-[320px] overflow-hidden rounded-[2rem] bg-kb-surface-raised p-2"><img src="/workflow-assets/ryan-estes.jpg" alt="Ryan Estes" className="h-full w-full rounded-[1.8rem] object-cover" /></div></div>
            <div className="w-full px-2 py-8 lg:w-[55%]"><div className="mb-6 flex items-center justify-between"><span className="text-5xl text-kb-accent-ink">“</span><a href="https://www.youtube.com/watch?v=JEUYBVIHG1s" target="_blank" rel="noreferrer" className="hidden rounded-full bg-kb-accent px-6 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">View Testimonial</a></div><blockquote className="pb-8 font-space-grotesk text-3xl font-normal leading-tight tracking-tight text-kb-ink sm:text-4xl">If you’re looking to build a machine around your offer, these are the guys for you.</blockquote><div className="border-t border-kb-line pt-8"><h3 className="font-space-grotesk text-xl font-medium text-kb-ink">Ryan Estes</h3><p className="mt-2 font-inter font-light text-kb-ink-muted">Owner, Inbox Alchemy</p></div></div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-kb-inverse py-24 text-kb-inverse-text">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl border-b border-white/10 pb-8 text-center">
            <div className="mb-4 inline-flex items-center rounded-md border border-white/15 bg-kb-inverse-soft px-3 py-1 font-space-grotesk text-[10px] font-medium uppercase tracking-[0.2em] text-kb-accent-light">Our Process</div>
            <h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-inverse-text sm:text-6xl">How we work</h2>
            <p className="mx-auto mt-4 max-w-xl font-inter text-sm font-light leading-relaxed text-kb-inverse-muted sm:text-base">From the first review to rollout, each stage stays grounded in how the work actually runs.</p>
          </div>

          <div className="relative mx-auto max-w-5xl py-12 sm:py-16">
            <div className="absolute bottom-0 left-8 top-0 z-0 flex w-3 -translate-x-1/2 justify-center overflow-hidden rounded-full border-x border-white/10 bg-kb-inverse-soft py-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.65)] md:left-1/2">
              <div className="relative h-full w-px overflow-hidden bg-white/10">
                <span className="workflow-rail-pulse absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-transparent via-kb-accent to-transparent shadow-[0_0_14px_rgba(159,107,78,0.9)]"></span>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              {process.map(([title, copy], index) => {
                const textOnLeft = index % 2 === 0;
                return (
                  <article key={title} className="relative z-10 grid gap-5 pl-20 md:grid-cols-2 md:items-center md:gap-0 md:pl-0">
                    <div className={`${textOnLeft ? 'md:pr-14 md:text-right' : 'md:order-2 md:pl-14'} min-w-0`}>
                      <p className="mb-2 font-space-grotesk text-[10px] font-medium uppercase tracking-[0.2em] text-kb-accent-light">Step {String(index + 1).padStart(2, '0')}</p>
                      <h3 className="font-space-grotesk text-2xl font-medium tracking-tight text-kb-inverse-text">{title}</h3>
                      <p className="mt-3 font-inter text-sm font-light leading-relaxed text-kb-inverse-muted sm:text-base">{copy}</p>
                    </div>

                    <div className={`${textOnLeft ? 'md:pl-14' : 'md:order-1 md:pr-14'} min-w-0`}>
                      <div className="rounded-2xl border border-white/10 bg-kb-inverse-soft p-1 shadow-[0_18px_42px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)]">
                        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-kb-inverse px-4 py-5 shadow-[inset_0_2px_5px_rgba(0,0,0,0.55)]">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-kb-inverse-soft font-space-grotesk text-sm font-medium text-kb-accent-light">{String(index + 1).padStart(2, '0')}</div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-3 flex items-center justify-between gap-4 font-space-grotesk text-[10px] uppercase tracking-[0.16em] text-kb-inverse-muted">
                              <span>Workflow stage</span>
                              <span className="truncate text-kb-accent-light">{title}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1.5">
                              {process.map((_, stageIndex) => <span key={stageIndex} className={`h-1.5 rounded-full ${stageIndex <= index ? 'bg-kb-accent shadow-[0_0_8px_rgba(159,107,78,0.65)]' : 'bg-white/10'}`}></span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <span className="absolute left-8 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-kb-inverse-soft to-kb-inverse shadow-[0_5px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] md:left-1/2">
                      <span className="h-3 w-3 rounded-full border border-black/40 bg-kb-accent shadow-[0_0_12px_rgba(159,107,78,0.9)]"></span>
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-kb-line bg-kb-inverse"><div className="absolute right-0 top-0 hidden h-full w-1/2 bg-kb-accent md:block"></div><div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid md:grid-cols-2"><div className="bg-kb-inverse py-20 md:py-32 md:pr-12"><h2 className="font-space-grotesk text-5xl font-medium leading-[1.1] tracking-tight text-kb-inverse-text sm:text-6xl lg:text-7xl">What changes on the other side.</h2></div><div className="-mx-4 bg-kb-accent px-6 py-16 text-kb-on-accent sm:-mx-6 md:mx-0 md:bg-transparent md:py-32 md:pl-16"><h2 className="mb-8 font-space-grotesk text-4xl font-medium leading-[1.1] tracking-tight text-kb-on-accent sm:text-5xl">Work moves without constant intervention.</h2><ul className="space-y-4">{['Handoffs are clear and consistent.', 'Follow-up no longer depends on memory.', 'Bottlenecks become visible before they cause delays.', 'Quality holds as volume increases.', 'Key people spend less time coordinating routine work.'].map(item => <li key={item} className="flex items-start gap-4 font-inter text-lg font-light text-kb-on-accent"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-kb-on-accent/30 bg-kb-on-accent/15">✓</span>{item}</li>)}</ul></div></div></div></section>

      <section className="border-t border-kb-line bg-kb-canvas py-32 text-center text-kb-ink"><div className="mx-auto max-w-4xl px-4"><h2 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-ink sm:text-7xl">Build the way your business should run.</h2><p className="mx-auto mb-10 mt-6 max-w-2xl text-lg font-light text-kb-ink/75 sm:text-xl">Start with a Workflow Review. We’ll determine whether you need one bottleneck fixed or a broader Workflow Build.</p><CallButton dark>Book a Workflow Review</CallButton></div></section>
    </>
  );
}

function Eyebrow({ children }) { return <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-kb-line-strong bg-kb-surface px-3 py-1.5 font-space-grotesk text-xs font-medium uppercase tracking-widest text-kb-ink-soft"><span className="h-2 w-2 rounded-full bg-kb-accent"></span>{children}</div>; }

function CeilingSequence() {
  const sectionRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let frameId;
    const update = () => {
      frameId = undefined;
      const section = sectionRef.current;
      if (!section || window.innerWidth < 640) return;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setVisibleCount(Math.min(4, Math.floor(progress * 4.25 + 0.12)));
    };
    const onScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-auto border-t border-kb-line bg-kb-canvas sm:h-[320vh]">
      <div className="relative overflow-hidden px-5 py-20 sm:sticky sm:top-0 sm:h-screen sm:px-8 sm:py-0">
        <img src="/workflow-assets/operations-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover grayscale opacity-55" />
        <div className="absolute inset-0 bg-kb-canvas/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-kb-canvas/35 via-transparent to-kb-canvas/85"></div>
        <div className="relative z-10 mx-auto h-full max-w-[1800px]">
          <div className="text-center sm:absolute sm:inset-x-0 sm:top-[7%]">
            <h2 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-ink drop-shadow-[0_2px_12px_rgba(255,252,247,0.8)] sm:text-6xl lg:text-7xl">Your business has outgrown the way it runs.</h2>
            <p className="mx-auto mt-5 max-w-2xl font-inter text-lg font-light text-kb-ink drop-shadow-[0_2px_10px_rgba(255,252,247,0.9)] sm:text-xl">Workflow Build is the right move when:</p>
          </div>
          <div className="mt-14 flex flex-col gap-5 sm:mt-0 sm:block">
            {ceilingPoints.map((point, index) => (
              <p
                key={point}
                className={`rounded-[1.7rem] border border-kb-line-strong/80 bg-kb-surface/80 p-7 font-inter text-lg font-light leading-[1.45] text-kb-ink shadow-[0_20px_60px_rgba(58,40,24,0.14)] backdrop-blur-xl transition-all duration-500 ease-out sm:absolute sm:w-[43%] sm:p-8 lg:text-[1.85rem] ${[
                  'sm:left-[4%] sm:top-[40%]',
                  'sm:right-[4%] sm:top-[49%]',
                  'sm:left-[4%] sm:top-[63%]',
                  'sm:right-[4%] sm:top-[73%]',
                ][index]} ${visibleCount > index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} max-sm:translate-y-0 max-sm:opacity-100`}
              >
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
