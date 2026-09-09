import { useState } from 'react';

const STEPS = [
  {
    title: 'Map the work',
    copy: 'We follow one real job end to end and mark every point where someone copies, checks, chases, waits or has to remember.',
    offset: 986,
    rotation: 0,
  },
  {
    title: 'Build around reality',
    copy: 'We connect what you already run, around your actual process including the exceptions, the awkward cases and the spreadsheet only one person understands.',
    offset: 498,
    rotation: 120,
  },
  {
    title: 'Put routine work on autopilot',
    copy: 'Confirmations go out. Records update. Deposits get chased. Forms come back. Nothing waits on someone’s memory.',
    offset: 0,
    rotation: 240,
  },
];

export default function Approach() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section className="approach-section relative overflow-hidden bg-kb-surface-soft" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center max-w-4xl mx-auto mb-4">
          <h2 className="font-space-grotesk text-5xl font-medium leading-[0.95] tracking-tight text-kb-ink md:text-7xl">Our Approach</h2>
          <p className="mt-6 font-inter text-xl font-light text-kb-ink-soft md:text-2xl">Fix the work. Not just the software.</p>
        </div>

        <div className="approach-orbit relative mx-auto max-w-5xl flex items-center justify-center" style={{ minHeight: '720px' }}>
          <div className="absolute z-20 w-[260px] sm:w-[340px] text-center">
            <h3 id="approach-title" className="font-space-grotesk text-4xl font-medium leading-none tracking-tight text-kb-ink sm:text-5xl">{current.title}</h3>
            <p id="approach-copy" className="mt-5 font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-lg">{current.copy}</p>
          </div>

          <svg className="absolute w-[380px] h-[380px] sm:w-[620px] sm:h-[620px] max-w-[92vw] max-h-[92vw]" viewBox="0 0 620 620" fill="none">
            <circle cx="310" cy="310" r="238" stroke="var(--kb-line-strong)" strokeWidth="1"></circle>
            <circle cx="310" cy="310" r="238" stroke="var(--kb-surface)" strokeWidth="1" strokeDasharray="6 10"></circle>
            <circle
              className="approach-progress"
              cx="310"
              cy="310"
              r="238"
              stroke="var(--kb-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              transform="rotate(-90 310 310)"
              style={{ strokeDashoffset: current.offset }}
            ></circle>
            <circle cx="310" cy="72" r="7" fill="var(--kb-line-strong)"></circle>
            <circle cx="516" cy="429" r="7" fill="var(--kb-line-strong)"></circle>
            <circle cx="104" cy="429" r="7" fill="var(--kb-line-strong)"></circle>
            <g transform="translate(310,310)">
              <g className="approach-dot" style={{ transform: `rotate(${current.rotation}deg)` }}>
                <circle cx="0" cy="-238" r="10" fill="var(--kb-accent)"></circle>
                <circle cx="0" cy="-238" r="20" fill="rgba(159,107,78,0.18)"></circle>
              </g>
            </g>
          </svg>

          {STEPS.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={`approach-step absolute ${
                index === 0
                  ? 'top-[3%] left-1/2 -translate-x-1/2'
                  : index === 1
                    ? 'bottom-[15%] right-[6%]'
                    : 'bottom-[15%] left-[6%]'
              } ${activeStep === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onClick={() => setActiveStep(index)}
              onTouchStart={() => setActiveStep(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span> {step.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
