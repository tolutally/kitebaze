import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const PATTERNS = [
  {
    href: '/case-studies#xerox',
    title: 'Enquiry → Client',
    copy: "Capture the request, ask for what's missing, route it and create the job record before anyone opens their laptop.",
    visual: 'enquiry',
  },
  {
    href: '/case-studies#crow',
    title: 'Job → Invoice',
    copy: 'Work gets completed, documented, priced and billed without someone re-entering it in a second system.',
    visual: 'invoice',
  },
  {
    href: '/case-studies#squlpt',
    title: 'Follow-up → Paid',
    copy: 'Quotes with no reply, documents that never came back, invoices past due. Followed up on schedule, not when someone remembers.',
    visual: 'follow-up',
  },
  {
    href: '/case-studies#jobs-done',
    title: 'Documents → Data',
    copy: 'Receipts, PDFs, forms and email threads read and routed into the systems that need them.',
    visual: 'documents',
  },
];

const CARD_COUNT = PATTERNS.length + 1;

function CardArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

function PreviewFrame({ label, children, className = '' }) {
  return (
    <div
      className={`relative h-[172px] shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-[#0b0c10] sm:h-48 ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(ellipse at center, black 32%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 32%, transparent 82%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-kb-accent/10 to-transparent" />
      <span className="absolute left-3 top-3 z-20 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55 backdrop-blur-sm">
        {label}
      </span>
      {children}
    </div>
  );
}

function FlowLine({ className = '' }) {
  return (
    <div className={`relative h-px overflow-hidden bg-white/15 ${className}`}>
      <span className="use-case-flow-signal absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-transparent via-kb-accent to-transparent" />
    </div>
  );
}

function EnquiryPreview() {
  return (
    <PreviewFrame label="Live intake">
      <div className="absolute inset-x-4 bottom-5 top-10 flex items-center justify-between sm:inset-x-6">
        <div className="use-case-float z-10 w-[76px] rounded-xl border border-white/10 bg-white/[0.06] p-2.5 shadow-xl backdrop-blur-sm">
          <span className="mb-2 block h-1.5 w-7 rounded-full bg-white/20" />
          <span className="mb-1 block h-1 w-full rounded-full bg-white/10" />
          <span className="block h-1 w-10 rounded-full bg-white/10" />
          <span className="mt-2 block font-mono text-[7px] uppercase tracking-wider text-white/45">New request</span>
        </div>
        <FlowLine className="absolute left-[72px] right-[72px] top-1/2 -translate-y-1/2" />
        <div className="use-case-pulse relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-kb-accent text-sm font-semibold text-kb-on-accent shadow-[0_0_38px_rgba(159,107,78,0.45)]">
          KB
        </div>
        <div className="use-case-float z-10 w-[76px] rounded-xl border border-kb-accent/35 bg-white/[0.07] p-2.5 shadow-xl backdrop-blur-sm [animation-delay:1.1s]">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-kb-accent text-[9px] text-kb-on-accent">✓</span>
            <span className="h-1.5 w-7 rounded-full bg-white/20" />
          </div>
          <span className="mb-1 block h-1 w-full rounded-full bg-white/10" />
          <span className="block font-mono text-[7px] uppercase tracking-wider text-white/45">Client created</span>
        </div>
      </div>
    </PreviewFrame>
  );
}

function InvoicePreview() {
  const stages = [
    ['01', 'Job done'],
    ['02', 'Proof checked'],
    ['03', 'Invoice sent'],
  ];

  return (
    <PreviewFrame label="Automatic handoff">
      <div className="absolute inset-x-4 bottom-4 top-11 flex flex-col justify-center gap-2.5 sm:inset-x-6">
        {stages.map(([number, label], index) => (
          <div
            key={label}
            className="use-case-float flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2 shadow-lg backdrop-blur-sm"
            style={{ animationDelay: `${index * 0.55}s` }}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[9px] ${index === stages.length - 1 ? 'bg-kb-accent text-kb-on-accent' : 'bg-white/10 text-white/65'}`}>
              {number}
            </span>
            <span className="text-[11px] font-medium text-white/80">{label}</span>
            <span className={`ml-auto h-1.5 w-1.5 rounded-full ${index === stages.length - 1 ? 'use-case-pulse bg-kb-accent' : 'bg-white/25'}`} />
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

function FollowUpPreview() {
  return (
    <PreviewFrame label="Follow-up sequence">
      <div className="absolute inset-x-5 bottom-5 top-12 flex items-center sm:inset-x-7">
        <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/15" />
        <div className="use-case-flow-signal absolute left-4 top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-r from-transparent via-kb-accent to-transparent" />
        <div className="relative z-10 flex w-full items-center justify-between">
          {[
            ['Sent', 'Day 0'],
            ['Nudge', 'Day 3'],
            ['Paid', 'Done'],
          ].map(([label, detail], index) => (
            <div key={label} className="flex flex-col items-center gap-2.5">
              <div className={`use-case-float flex h-12 w-12 items-center justify-center rounded-2xl border shadow-xl backdrop-blur-sm ${index === 2 ? 'border-kb-accent/50 bg-kb-accent text-kb-on-accent' : 'border-white/10 bg-[#181a20] text-white/70'}`} style={{ animationDelay: `${index * 0.7}s` }}>
                {index === 0 && '↗'}
                {index === 1 && '↻'}
                {index === 2 && '✓'}
              </div>
              <div className="text-center">
                <span className="block text-[10px] font-medium text-white/75">{label}</span>
                <span className="mt-0.5 block font-mono text-[7px] uppercase tracking-wider text-white/35">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function DocumentsPreview() {
  return (
    <PreviewFrame label="Structured extraction">
      <div className="absolute inset-x-4 bottom-4 top-11 grid grid-cols-[0.8fr_auto_1.2fr] items-center gap-3 sm:inset-x-7 sm:gap-5">
        <div className="use-case-float relative mx-auto h-[104px] w-[78px] rotate-[-3deg] rounded-xl border border-white/15 bg-white/[0.07] p-3 shadow-2xl">
          <span className="mb-3 block h-2 w-9 rounded-full bg-white/25" />
          <span className="mb-1.5 block h-1 w-full rounded-full bg-white/10" />
          <span className="mb-1.5 block h-1 w-4/5 rounded-full bg-white/10" />
          <span className="mb-4 block h-1 w-full rounded-full bg-white/10" />
          <span className="block h-5 rounded-md bg-kb-accent/35" />
          <span className="absolute -right-2 -top-2 rounded-md border border-white/10 bg-[#22242b] px-1.5 py-1 font-mono text-[7px] text-white/60">PDF</span>
        </div>
        <div className="flex items-center">
          <FlowLine className="w-8 sm:w-14" />
          <span className="-ml-1 text-xs text-kb-accent">›</span>
        </div>
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.055] p-3 shadow-xl backdrop-blur-sm">
          {[
            ['Vendor', 'Captured'],
            ['Total', '$1,248.00'],
            ['Route', 'Accounting'],
          ].map(([label, value], index) => (
            <div key={label} className="flex items-center justify-between gap-3 border-b border-white/[0.07] pb-1.5 last:border-0 last:pb-0">
              <span className="font-mono text-[7px] uppercase tracking-wider text-white/35">{label}</span>
              <span className={`text-[9px] font-medium ${index === 2 ? 'text-kb-accent-light' : 'text-white/70'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

function WorkflowPreview({ type }) {
  if (type === 'invoice') return <InvoicePreview />;
  if (type === 'follow-up') return <FollowUpPreview />;
  if (type === 'documents') return <DocumentsPreview />;
  return <EnquiryPreview />;
}

export default function CaseStudies() {
  const sectionRef = useRef(null);
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

    const index = (targetIndex + CARD_COUNT) % CARD_COUNT;
    const card = carousel.querySelector(`[data-case-index="${index}"]`);
    if (!card) return;

    const left = card.offsetLeft - ((carousel.clientWidth - card.clientWidth) / 2);
    carousel.scrollTo({ left, behavior });
    setActiveIndex(index);
  }, []);

  const pauseAutoAdvance = useCallback(() => {
    setAutoAdvancePaused(true);
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setAutoAdvancePaused(false);
    }, 8000);
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
      const cards = [...carousel.querySelectorAll('[data-case-index]')];
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
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(section);

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

    const timer = window.setTimeout(() => {
      scrollToCard(activeIndex + 1);
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, autoAdvancePaused, isInView, isMobile, scrollToCard]);

  useEffect(() => () => {
    window.clearTimeout(resumeTimerRef.current);
    window.cancelAnimationFrame(scrollFrameRef.current);
  }, []);

  return (
    <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] border border-kb-line-strong/50 bg-kb-inverse p-4 shadow-[0_30px_90px_rgba(23,25,31,0.20)] sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-kb-accent/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-kb-accent/10 blur-[120px]" />

        <div className="relative mb-8 max-w-3xl fade-up-element sm:mb-10">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-kb-accent-light">
            Our use cases
          </p>
          <h2 className="mt-3 font-grotesk text-3xl font-medium leading-tight tracking-tight text-kb-inverse-text sm:text-5xl">
            What we build. <span className="text-kb-inverse-muted">In the real world.</span>
          </h2>
          <p className="mt-4 max-w-xl font-inter text-sm font-light leading-relaxed text-kb-inverse-muted sm:text-base">
            Practical automation for the work between the work.
          </p>
        </div>

        <div
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Kitebaze use cases"
          tabIndex="0"
          onScroll={handleCarouselScroll}
          onPointerDown={pauseAutoAdvance}
          onWheel={pauseAutoAdvance}
          onKeyDown={handleCarouselKeyDown}
          className="case-studies-mobile-carousel relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:snap-none md:grid-cols-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {PATTERNS.map((pattern, index) => (
            <Link
              key={pattern.href}
              to={pattern.href}
              data-case-index={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${CARD_COUNT}: ${pattern.title}`}
              className={`case-study-carousel-slide fade-up-element group flex h-[360px] w-[86%] shrink-0 snap-center flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-kb-inverse-soft p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-kb-accent/45 sm:w-[72%] sm:p-4 md:w-auto ${index < 3 ? 'md:col-span-2' : 'md:col-span-3'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <WorkflowPreview type={pattern.visual} />
              <div className="mt-auto px-1 pb-1">
                <div className="mb-2 flex items-center justify-between gap-4 text-kb-inverse-text">
                  <h3 className="font-grotesk text-xl font-medium leading-tight tracking-tight">{pattern.title}</h3>
                  <CardArrow />
                </div>
                <p className="font-inter text-sm font-light leading-relaxed text-kb-inverse-muted">{pattern.copy}</p>
              </div>
            </Link>
          ))}

          <Link
            to="/book-workflow-review"
            data-case-index={CARD_COUNT - 1}
            role="group"
            aria-roledescription="slide"
            aria-label={`${CARD_COUNT} of ${CARD_COUNT}: Your Workflow`}
            className="case-study-carousel-slide fade-up-element group flex h-[360px] w-[86%] shrink-0 snap-center flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-kb-inverse-soft p-3 text-kb-inverse-text shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-kb-accent/45 sm:w-[72%] sm:p-4 md:col-span-3 md:w-auto"
            style={{ transitionDelay: '320ms' }}
          >
            <div className="relative h-[172px] shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-[url('/recovered-assets/photo-1764946023990-2780e4905bb5.jpg')] bg-cover bg-center sm:h-48">
              <div className="absolute inset-0 bg-gradient-to-t from-kb-inverse/80 via-kb-inverse/15 to-transparent transition-colors duration-500 group-hover:from-kb-inverse/65" />
              <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
                Built around you
              </div>
              <span className="absolute bottom-4 left-4 font-grotesk text-lg font-medium tracking-tight text-white">Your Workflow</span>
            </div>
            <div className="mt-auto px-1 pb-1">
              <div className="mb-3 flex items-start justify-between gap-4">
                <p className="max-w-md font-inter text-sm font-light leading-relaxed text-kb-inverse-muted">
                  Maybe your software does 80% of what you need. That last 20% is exactly what we fix.
                </p>
                <CardArrow />
              </div>
              <span className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent px-5 py-2 font-inter text-xs font-medium text-kb-on-accent transition-colors group-hover:bg-kb-accent-hover">
                Show Us the Mess
              </span>
            </div>
          </Link>
        </div>

        <div className="relative mt-5 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2" role="group" aria-label="Carousel controls">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              aria-label="Show previous card"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-lg text-kb-inverse-text shadow-sm transition-colors hover:bg-white/10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveCarousel(1)}
              aria-label="Show next card"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-kb-accent text-lg text-kb-on-accent shadow-sm transition-colors hover:bg-kb-accent-hover"
            >
              →
            </button>
          </div>

          <div className="flex items-center gap-2" aria-label="Choose a carousel card">
            {Array.from({ length: CARD_COUNT }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  pauseAutoAdvance();
                  scrollToCard(index);
                }}
                aria-label={`Show card ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-6 bg-kb-accent' : 'w-2 bg-white/25'}`}
              />
            ))}
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-kb-inverse-muted">
            {String(activeIndex + 1).padStart(2, '0')} / {String(CARD_COUNT).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
