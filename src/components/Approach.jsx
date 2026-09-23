import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    title: 'Map the work',
    copy: 'We follow one real job from start to finish and find every point where someone has to copy, check, chase, wait or remember what happens next.',
    video: '/map_the_work.mp4',
  },
  {
    title: 'Build around how you actually work',
    copy: 'We build around the tools and processes you already use, including the exceptions, awkward cases and that spreadsheet only one person understands.',
    video: '/build_in_reality.mp4',
  },
  {
    title: 'Take the routine work off your plate',
    copy: 'Confirmations go out. Records stay updated. Invoices get chased. Documents come back. Your team steps in when they’re actually needed.',
    video: '/put_work_on_autopilot.mp4',
  },
];

function StepButton({ step, index, isActive, isMobile, onSelect }) {
  const buttonId = `approach-step-${index}`;
  const panelId = isMobile ? `approach-mobile-panel-${index}` : 'approach-desktop-panel';

  return (
    <button
      id={buttonId}
      type="button"
      onMouseEnter={isMobile ? undefined : onSelect}
      onClick={onSelect}
      aria-controls={panelId}
      aria-expanded={isMobile ? isActive : undefined}
      aria-pressed={isMobile ? undefined : isActive}
      className={`group relative w-full rounded-[20px] p-8 text-left transition-all duration-300 md:p-10 ${
        isActive
          ? 'border border-kb-accent/30 bg-gradient-to-br from-kb-surface to-kb-surface-soft shadow-sm'
          : 'border border-kb-line bg-transparent hover:border-kb-line-strong hover:bg-kb-surface/60'
      }`}
    >
      <div className="flex w-full items-start justify-between">
        <h3 className={`text-4xl font-light tracking-tighter transition-colors duration-300 md:text-5xl ${isActive ? 'text-kb-ink' : 'text-kb-ink-muted group-hover:text-kb-ink-soft'}`}>
          {step.title}
        </h3>
        <span className={`ml-2 mt-1 shrink-0 font-mono text-sm font-medium transition-colors ${isActive ? 'text-kb-accent-ink' : 'text-kb-ink-muted/70 group-hover:text-kb-ink-muted'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </button>
  );
}

function StepDetail({ step, index, mobile = false }) {
  return (
    <div
      id={mobile ? `approach-mobile-panel-${index}` : 'approach-desktop-panel'}
      role="region"
      aria-labelledby={`approach-step-${index}`}
      className={mobile ? 'pb-6 pt-4' : 'flex flex-col gap-10'}
    >
      <div className={`relative aspect-[16/10] w-full overflow-hidden border border-kb-line bg-kb-inverse ${mobile ? 'rounded-[20px]' : 'rounded-[24px]'}`}>
        <video
          key={step.video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={step.video} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kb-inverse/50 via-transparent to-transparent" />
        <span className={`pointer-events-none absolute font-space-grotesk font-medium leading-none text-kb-inverse-text/10 ${mobile ? 'bottom-4 right-5 text-[5rem]' : 'bottom-6 right-8 text-[8rem]'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={mobile ? 'pt-5' : ''}>
        {!mobile && (
          <h3 className="mb-4 font-space-grotesk text-2xl font-normal tracking-tight text-kb-ink md:text-3xl">
            {step.title}
          </h3>
        )}
        <p className={`font-inter font-light text-kb-ink-soft ${mobile ? 'mb-6 text-base leading-7' : 'mb-8 text-lg leading-relaxed md:text-xl'}`}>
          {step.copy}
        </p>
        <Link
          to="/book-workflow-review"
          className="group inline-flex h-10 items-center justify-center rounded-full bg-kb-accent px-6 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover"
        >
          <span className="mr-2">Book a workflow review</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function Approach() {
  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  ));
  const current = STEPS[activeStep];

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const updateLayout = () => setIsDesktop(desktopQuery.matches);
    updateLayout();
    desktopQuery.addEventListener('change', updateLayout);

    return () => desktopQuery.removeEventListener('change', updateLayout);
  }, []);

  return (
    <section id="how-it-works" className="approach-section relative overflow-hidden bg-kb-surface-soft py-16 sm:py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="fade-up-element mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            OUR APPROACH
          </span>
          <h2 className="mt-5 font-space-grotesk text-5xl font-medium leading-[0.95] tracking-tight text-kb-ink md:text-7xl">
            Fix the <span className="italic text-kb-accent-ink">work</span>. Not just the software.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {isDesktop ? (
            <>
              <div className="flex flex-col space-y-3 lg:col-span-5">
                {STEPS.map((step, index) => (
                  <StepButton
                    key={step.title}
                    step={step}
                    index={index}
                    isActive={activeStep === index}
                    isMobile={false}
                    onSelect={() => setActiveStep(index)}
                  />
                ))}
              </div>

              <div className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
                <StepDetail step={current} index={activeStep} />
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              {STEPS.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <div key={step.title}>
                    <StepButton
                      step={step}
                      index={index}
                      isActive={isActive}
                      isMobile
                      onSelect={() => setActiveStep(index)}
                    />
                    {isActive && <StepDetail step={step} index={index} mobile />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
