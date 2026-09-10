import useTestimonialScroll from '../hooks/useTestimonialScroll.js';

export default function Testimonials() {
  useTestimonialScroll();

  return (
    <section className="relative border-t border-kb-line bg-kb-surface-soft pb-4 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mt-6 flex flex-col gap-x-12 gap-y-12 pb-[5vh] sm:gap-24">
          <div className="testimonial-sticky sticky top-24 z-10 w-full">
            <div className="testimonial-inner w-full relative z-10" style={{ filter: 'brightness(1)' }}>
              <div className="pointer-events-none absolute -left-10 -top-16 z-0 h-[300px] w-[300px] rounded-full bg-kb-accent opacity-15 blur-[100px] sm:-left-20 sm:-top-24 sm:h-[500px] sm:w-[500px] sm:blur-[120px]"></div>
              <div className="absolute -bottom-12 right-6 sm:-bottom-20 sm:right-16 w-48 sm:w-[280px] z-0 pointer-events-none drop-shadow-[0_10px_30px_rgba(159,107,78,0.24)] translate-y-[20%]">
                <span
                  className="block aspect-[2/1] w-full bg-kb-accent"
                  aria-hidden="true"
                  style={{
                    WebkitMask: "url('/recovered-assets/5782a90f-3351-458e-b20b-e4b0a099d529_800w.png') center / contain no-repeat",
                    mask: "url('/recovered-assets/5782a90f-3351-458e-b20b-e4b0a099d529_800w.png') center / contain no-repeat",
                  }}
                />
              </div>
              <div className="absolute inset-0 z-10 rounded-3xl border border-kb-line bg-kb-surface/90 shadow-[0_24px_70px_rgba(63,48,36,0.12)] backdrop-blur-[60px] sm:rounded-[2rem]"></div>
              <div className="sm:p-12 flex flex-col sm:gap-14 z-20 pt-8 pr-8 pb-8 pl-8 relative gap-x-10 gap-y-10">
                <div className="flex items-center justify-between w-full">
                  <span className="font-grotesk text-sm font-semibold uppercase tracking-widest text-kb-accent-ink">Client's Testimonial</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-16 gap-x-10 gap-y-10">
                  <div className="lg:col-span-4 flex flex-col h-full">
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-6 sm:gap-8">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border border-kb-line-strong sm:h-28 sm:w-28">
                        <img src="/recovered-assets/e0c9e981-4181-4858-920f-e00abb098e87_320w.jpg" alt="Chris Stevenson" className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="sm:text-4xl leading-none text-2xl font-medium text-kb-accent-ink tracking-tight font-grotesk">Chris Stevenson</h3>
                        <span className="mt-1 font-sans text-sm font-light text-kb-ink-soft sm:mt-2 sm:text-lg">Founder &amp; Creative Director, Black Sheep Creative</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-8 flex flex-col sm:gap-12 sm:pb-0 pb-8 gap-x-8 gap-y-8">
                    <div className="flex flex-col gap-6 max-w-2xl font-light">
                      <p className="font-sans text-xl font-light leading-relaxed text-kb-ink-soft sm:text-2xl">
                        "We already pay for the software. But the spreadsheet is still running half the operation."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-sticky sticky top-32 z-20 w-full">
            <div className="testimonial-inner grid grid-cols-1 md:grid-cols-2 lg:gap-12 w-full backdrop-blur gap-x-8 gap-y-8" style={{ filter: 'brightness(1)' }}>
              <div className="group h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-kb-line bg-kb-surface/90 px-8 py-8 shadow-[0_18px_55px_rgba(63,48,36,0.1)] backdrop-blur-lg transition-colors group-hover:border-kb-line-strong sm:p-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 h-10 w-10 text-kb-line-strong">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                  <p className="flex-grow font-sans text-xl font-light leading-relaxed text-kb-ink-soft sm:text-2xl">
                    "It works, just not the way we work. So the team invented five extra steps around it."
                  </p>
                  <div className="mt-10 flex items-center gap-x-4 gap-y-4 border-t border-kb-line pt-6">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-kb-line-strong bg-kb-surface-raised">
                      <img src="/recovered-assets/0dcdd895-28af-4d5d-87be-b6281ddcffd2_320w.png" alt="Steve Urbanski" className="opacity-80 w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-grotesk text-base font-normal tracking-tight text-kb-ink transition-colors group-hover:text-kb-accent-ink">Steve Urbanski</h3>
                      <p className="font-pixel text-xs font-normal uppercase tracking-widest text-kb-ink-muted sm:text-sm">Owner, Through the Leash</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="group h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-kb-line bg-kb-surface/90 pb-8 pl-8 pr-8 pt-8 shadow-[0_18px_55px_rgba(63,48,36,0.1)] backdrop-blur-md transition-colors group-hover:border-kb-line-strong sm:p-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-6 h-10 w-10 text-kb-line-strong">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                  <p className="flex-grow font-sans text-xl font-light leading-relaxed text-kb-ink-soft sm:text-2xl">
                    "Only one person knows how it all works. When they are busy or away, everything slows down."
                  </p>
                  <div className="mt-10 flex items-center gap-4 border-t border-kb-line pt-6">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-kb-line-strong bg-kb-surface-raised">
                      <img src="/recovered-assets/b1005be2-22ee-4d22-a288-9eafac19a3a7_320w.png" alt="Peter Straub" className="opacity-80 w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-grotesk text-base font-normal tracking-tight text-kb-ink transition-colors group-hover:text-kb-accent-ink">Peter Straub</h3>
                      <p className="font-pixel text-xs font-normal uppercase tracking-widest text-kb-ink-muted sm:text-sm">Franchise Partner, SprayNet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-sticky sticky top-40 z-30 w-full"></div>
        </div>
      </div>
    </section>
  );
}
