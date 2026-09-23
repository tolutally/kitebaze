import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CHATGPT_POINTS = [
  {
    title: 'You probably should.',
    copy: "Emails, summaries, ideas, answers. If that's all you need, ChatGPT is great.",
    icon: 'grid',
  },
  {
    title: 'It waits for you.',
    copy: 'You still have to prompt, check, follow up and take the next action.',
    icon: 'handoff',
  },
  {
    title: 'Your work lives everywhere.',
    copy: 'Inbox. Calendar. Forms. Spreadsheets. Accounting. Customers.',
    icon: 'repeat',
  },
  {
    title: 'Kitebaze does the work.',
    copy: "We build around your business so repetitive work keeps moving, and you step in when you're needed.",
    icon: 'person',
  },
];

function ChatGPTIcon({ type, className = 'h-5 w-5' }) {
  if (type === 'grid') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18M15 3v18" />
      </svg>
    );
  }

  if (type === 'handoff') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="6" height="6" rx="1.5" />
        <rect x="15" y="14" width="6" height="6" rx="1.5" />
        <path d="M9 7h4a3 3 0 0 1 3 3v4M13 12l3 3 3-3" />
      </svg>
    );
  }

  if (type === 'repeat') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0M19 3v4M17 5h4" />
    </svg>
  );
}

function PanelLabel({ item }) {
  return (
    <div className="absolute left-4 top-4 z-20 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-md bg-kb-inverse px-2.5 py-2 text-kb-inverse-text shadow-sm">
      <span className="shrink-0 text-kb-accent-light">
        <ChatGPTIcon type={item.icon} className="h-4 w-4" />
      </span>
      <span className="truncate font-inter text-[10px] font-semibold uppercase tracking-[0.1em]">{item.title}</span>
    </div>
  );
}

function OneOffWorkVisual() {
  return (
    <div className="absolute inset-x-5 bottom-6 z-10 space-y-2">
      <div className="ml-auto w-[84%] rounded-lg border border-kb-line bg-kb-surface px-3 py-2.5 shadow-sm">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-kb-ink-muted">You ask</p>
        <p className="mt-1 font-inter text-xs font-medium text-kb-ink">Write a follow-up email.</p>
      </div>
      <div className="relative w-[92%] overflow-hidden rounded-lg border border-kb-line-strong bg-kb-surface px-3 py-3 shadow-[0_8px_22px_rgba(23,25,31,0.06)]">
        <span className="absolute inset-y-0 left-0 w-1 bg-kb-accent" />
        <p className="ml-1 font-mono text-[9px] uppercase tracking-[0.14em] text-kb-accent-ink">ChatGPT answers</p>
        <div className="ml-1 mt-2 space-y-1.5">
          <span className="block h-1.5 w-full rounded-full bg-kb-surface-raised" />
          <span className="block h-1.5 w-[88%] rounded-full bg-kb-surface-raised" />
          <span className="block h-1.5 w-[64%] rounded-full bg-kb-surface-raised" />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 pl-2 pt-1">
        {['Summarize', 'Brainstorm', 'Get an answer'].map((word) => (
          <span key={word} className="rounded-full border border-kb-line bg-kb-surface/85 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-kb-ink-muted">{word}</span>
        ))}
      </div>
    </div>
  );
}

function WaitingVisual() {
  const tasks = [
    ['New enquiry', 'Waiting'],
    ['Check what happened', 'Waiting'],
    ['Follow up tomorrow', 'Waiting'],
    ['Update your records', 'Waiting'],
  ];

  return (
    <div className="absolute inset-x-5 bottom-5 z-10">
      <div className="mb-2.5 flex items-center justify-between rounded-lg border border-kb-line-strong bg-kb-surface px-3 py-2.5 shadow-sm">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-kb-ink-muted">ChatGPT</p>
          <p className="mt-0.5 font-inter text-xs font-semibold text-kb-ink">Waits for you to ask</p>
        </div>
        <span className="relative h-5 w-9 rounded-full border border-kb-line-strong bg-kb-surface-soft">
          <span className="absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-kb-ink-muted" />
        </span>
      </div>
      <div className="space-y-1.5">
        {tasks.map(([task, status], index) => (
          <div key={task} className="flex items-center justify-between rounded-md border border-kb-line bg-kb-surface/90 px-3 py-1.5">
            <span className="flex items-center gap-2 font-inter text-[9px] font-medium text-kb-ink">
              <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? 'bg-kb-accent' : 'bg-kb-line-strong'}`} />
              {task}
            </span>
            <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-kb-ink-muted">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsVisual() {
  const tools = ['Inbox', 'Calendar', 'Forms', 'Spreadsheets', 'Accounting', 'Customers'];

  return (
    <div className="absolute inset-x-5 bottom-6 top-[4.75rem] z-10 flex items-center justify-center">
      <div className="relative grid w-full grid-cols-2 gap-3">
        <span className="pointer-events-none absolute left-1/2 top-3 h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-kb-line-strong" />
        <span className="pointer-events-none absolute left-3 top-1/2 h-px w-[calc(100%-1.5rem)] -translate-y-1/2 bg-kb-line-strong" />
        {tools.map((tool, index) => (
          <div key={tool} className="relative z-10 flex h-12 items-center justify-center rounded-lg border border-kb-line bg-kb-surface px-2 font-inter text-[9px] font-semibold text-kb-ink shadow-sm">
            <span className={`mr-2 h-2 w-2 shrink-0 rounded-sm ${index === 2 || index === 3 ? 'bg-kb-accent' : 'bg-kb-surface-raised'}`} />
            {tool}
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-4 border-kb-surface bg-kb-inverse px-3 py-2 font-mono text-[8px] uppercase tracking-[0.1em] text-kb-inverse-text shadow-lg">
          Manual work
        </div>
      </div>
    </div>
  );
}

function KitebazeVisual() {
  const tiles = [
    ['Business', 'How it works'],
    ['Repetitive work', 'Handled'],
    ['Kitebaze', 'Background'],
    ['You', 'Step in'],
    ['Work', 'Keeps moving'],
    ['Machinery', 'Maintained'],
  ];

  return (
    <div className="absolute inset-x-5 bottom-6 top-[4.75rem] z-10 flex items-center justify-center">
      <div className="relative grid w-full grid-cols-2 gap-3">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kb-accent-soft blur-2xl" />
        {tiles.map(([title, subtitle], index) => (
          <div key={title} className={`relative z-10 rounded-lg border px-3 py-2.5 shadow-sm ${index === 2 ? 'border-kb-accent bg-kb-inverse text-kb-inverse-text' : 'border-kb-line bg-kb-surface text-kb-ink'}`}>
            <p className="font-inter text-[9px] font-semibold">{title}</p>
            <p className={`mt-0.5 font-mono text-[7px] uppercase tracking-[0.08em] ${index === 2 ? 'text-kb-accent-light' : 'text-kb-ink-muted'}`}>{subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PointVisual({ item }) {
  return (
    <div aria-hidden="true" className="chatgpt-visual-grid group relative mb-8 h-72 overflow-hidden rounded-xl border border-kb-line-strong bg-kb-surface">
      <PanelLabel item={item} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kb-accent-soft/70 blur-3xl transition-transform duration-500 group-hover:scale-125" />
      {item.icon === 'grid' && <OneOffWorkVisual />}
      {item.icon === 'handoff' && <WaitingVisual />}
      {item.icon === 'repeat' && <ToolsVisual />}
      {item.icon === 'person' && <KitebazeVisual />}
    </div>
  );
}

export default function WhyNotChatGPT() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [autoAdvancePaused, setAutoAdvancePaused] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState(null);

  const scrollToCard = useCallback((targetIndex, behavior = 'smooth') => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const index = (targetIndex + CHATGPT_POINTS.length) % CHATGPT_POINTS.length;
    const card = carousel.querySelector(`[data-chatgpt-index="${index}"]`);
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
      const cards = [...carousel.querySelectorAll('[data-chatgpt-index]')];
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

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !isMobile) {
      setCarouselHeight(null);
      return undefined;
    }

    const card = carousel.querySelector(`[data-chatgpt-index="${activeIndex}"]`);
    if (!card) return undefined;

    const updateHeight = () => {
      const nextHeight = Math.ceil(card.getBoundingClientRect().height);
      setCarouselHeight((currentHeight) => (
        currentHeight === nextHeight ? currentHeight : nextHeight
      ));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(updateHeight);
    resizeObserver?.observe(card);

    return () => {
      window.removeEventListener('resize', updateHeight);
      resizeObserver?.disconnect();
    };
  }, [activeIndex, isMobile]);

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
    <section ref={sectionRef} id="why-not-chatgpt" className="relative overflow-hidden border-t border-kb-line bg-kb-canvas px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="chatgpt-section-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-kb-canvas to-transparent" />

      <div className="relative mx-auto w-full max-w-[88rem]">
        <div className="mx-auto mb-20 max-w-4xl text-center lg:mb-24">
          <span className="fade-up-element inline-flex items-center gap-2 rounded-full border border-kb-line-strong bg-kb-surface/80 px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-kb-ink-muted shadow-sm backdrop-blur-sm sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent shadow-[0_0_12px_rgba(159,107,78,0.35)]" />
            A fair question
          </span>

          <h2 className="typography-reveal mt-6 font-space-grotesk text-[clamp(3rem,7vw,5.5rem)] font-medium uppercase leading-[0.88] tracking-[-0.045em] text-kb-ink">
            <span className="block overflow-hidden pb-2">
              <span className="reveal-text inline-block">Why not just use</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="reveal-text inline-block text-kb-accent-ink">ChatGPT?</span>
            </span>
          </h2>

          <p className="fade-up-element mx-auto mt-6 max-w-2xl font-inter text-base font-light leading-7 text-kb-ink-muted sm:text-lg">
            ChatGPT helps when you ask. Kitebaze keeps the work moving when you don't.
          </p>
        </div>

        <div
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Why Kitebaze goes beyond ChatGPT"
          tabIndex="0"
          onScroll={handleCarouselScroll}
          onPointerDown={pauseAutoAdvance}
          onWheel={pauseAutoAdvance}
          onKeyDown={handleCarouselKeyDown}
          style={isMobile && carouselHeight ? { height: `${carouselHeight}px` } : undefined}
          className="chatgpt-mobile-carousel -mx-4 flex items-start snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-4 md:mx-0 md:grid md:items-stretch md:snap-none md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:overflow-visible md:px-0 xl:grid-cols-4 xl:gap-x-0"
        >
          {CHATGPT_POINTS.map((item, index) => (
            <article
              key={item.title}
              data-chatgpt-index={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${CHATGPT_POINTS.length}`}
              className={`chatgpt-carousel-slide fade-up-element relative w-[88%] shrink-0 snap-center md:w-auto ${index === 0 ? 'xl:border-r xl:border-kb-line xl:pr-8' : index === CHATGPT_POINTS.length - 1 ? 'xl:pl-8' : 'xl:border-r xl:border-kb-line xl:px-8'}`}
            >
              <PointVisual item={item} />
              <h3 className="min-h-[3.5rem] font-space-grotesk text-[1.8rem] font-medium uppercase leading-[0.95] tracking-[-0.035em] text-kb-ink">
                {item.title}
              </h3>
              <p className="mt-4 font-inter text-base font-light leading-7 text-kb-ink-soft">
                {item.copy}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2" role="group" aria-label="Carousel controls">
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

          <div className="flex items-center gap-2.5">
            {CHATGPT_POINTS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  pauseAutoAdvance();
                  scrollToCard(index);
                }}
                aria-label={`Show card ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`h-2 rounded-full transition-all ${activeIndex === index ? 'w-7 bg-kb-accent' : 'w-2 bg-kb-line-strong'}`}
              />
            ))}
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-kb-ink-muted">
            {String(activeIndex + 1).padStart(2, '0')} / {String(CHATGPT_POINTS.length).padStart(2, '0')}
          </span>
        </div>

        <div className="fade-up-element mt-14 flex justify-center lg:mt-16">
          <Link
            to="/book-workflow-review"
            className="inline-flex items-center justify-center rounded-lg bg-kb-inverse px-7 py-4 font-inter text-sm font-semibold text-kb-inverse-text shadow-[0_16px_36px_rgba(33,28,24,0.13)] transition-colors hover:bg-kb-inverse-soft"
          >
            Show Us Your Workflow
          </Link>
        </div>
      </div>
    </section>
  );
}
