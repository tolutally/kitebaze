import { useState } from 'react';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    title: 'Map the work',
    copy: 'We follow one real job end to end and mark every point where someone copies, checks, chases, waits or has to remember.',
    video: '/map_the_work.mp4',
  },
  {
    title: 'Build around reality',
    copy: 'We connect what you already run, around your actual process including the exceptions, the awkward cases and the spreadsheet only one person understands.',
    video: '/build_in_reality.mp4',
  },
  {
    title: 'Put routine work on autopilot',
    copy: 'Confirmations go out. Records update. Invoices get chased. Documents come back. Nothing waits on someone’s memory.',
    video: '/put_work_on_autopilot.mp4',
  },
];

export default function Approach() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

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
          <div className="flex flex-col space-y-3 lg:col-span-5">
            {STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.title}
                  type="button"
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`group relative rounded-[20px] p-8 text-left transition-all duration-300 md:p-10 ${
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
            })}
          </div>

          <div className="flex flex-col gap-10 lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-kb-line bg-kb-inverse">
              <video
                key={current.video}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={current.video} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kb-inverse/50 via-transparent to-transparent" />
              <span className="pointer-events-none absolute bottom-6 right-8 font-space-grotesk text-[8rem] font-medium leading-none text-kb-inverse-text/10">
                {String(activeStep + 1).padStart(2, '0')}
              </span>
            </div>

            <div>
              <h3 className="mb-4 font-space-grotesk text-2xl font-normal tracking-tight text-kb-ink md:text-3xl">
                {current.title}
              </h3>
              <p className="mb-8 font-inter text-lg font-light leading-relaxed text-kb-ink-soft md:text-xl">
                {current.copy}
              </p>
              <Link
                to="/workflow-build"
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
        </div>
      </div>
    </section>
  );
}

