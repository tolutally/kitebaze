import { Link } from 'react-router-dom';

export default function StartHere() {
  return (
    <section className="relative z-10 bg-kb-canvas pb-12 pt-10 sm:py-20">
     <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto pr-8 pl-8">
 <span className="fade-up-element inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            START HERE
          </span>
        <div className="mb-8 sm:mb-16">
          <h2 className="m-0 font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink md:text-7xl" style={{ animation: 'slideInY 800ms ease-in-out 0ms forwards' }}>We build it. Then we keep it running.</h2>
          <p className="mt-4 max-w-2xl font-inter text-base font-light text-kb-ink-soft sm:text-xl">Two ways to start. Both scoped on a call before anything begins.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-x-8 gap-y-8 items-stretch">
          <div className="flex flex-col h-full">
            <Link
              to="/bottleneck"
              onClick={() => { history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }}
              style={{ boxShadow: '0 0 60px 10px rgba(159,107,78,0.22), 0 0 120px 20px rgba(23,25,31,0.08)', textDecoration: 'none' }}
              className="relative flex h-full flex-col rounded-3xl bg-kb-inverse-soft bg-[url('/recovered-assets/photo-1595418917831-ef942bd9f9ec.jpg')] bg-cover bg-center p-7 transition-all duration-300 hover:scale-[1.02] sm:p-8"
            >
              <div className="flex items-center gap-3 mb-2">
                <p className="leading-tight text-xl font-medium text-kb-accent-light tracking-tight font-inter sm:text-2xl">
                  One Bottleneck
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true" style={{ color: 'rgb(255, 255, 255)' }}>
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              <p className="mb-6 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-kb-inverse-text/70">Two weeks, typically</p>
              <div>
                <p className="mb-5 font-inter text-lg font-normal leading-snug text-kb-inverse-text sm:text-xl">Fix one thing first. Judge us on that.</p>
                <p className="mb-5 font-inter text-sm font-normal leading-relaxed tracking-tight text-kb-inverse-text sm:text-base">We automate one defined problem, connect it to the tools involved, and prove it works before touching anything else.</p>
                <p className="font-inter text-sm font-normal leading-relaxed tracking-tight text-kb-inverse-text/85">You get the working automation, a written map of how it runs, and monitoring on it from day one.</p>
                <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-kb-accent px-5 py-2.5 font-inter text-sm font-medium text-kb-on-accent transition-colors">
                  Fix one bottleneck
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </div>
            </Link>
          </div>
          <div className="flex h-full">
            <Link
              to="/workflow-build"
              onClick={() => { history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }}
              style={{ boxShadow: '0 0 60px 10px rgba(159,107,78,0.22), 0 0 120px 20px rgba(23,25,31,0.08)', textDecoration: 'none' }}
              className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-3xl bg-kb-inverse p-7 transition-all duration-300 hover:scale-[1.02] sm:p-8"
            >
              <div className="bg-center bg-[url('/recovered-assets/photo-1595418917831-ef942bd9f9ec.jpg')] bg-cover absolute top-0 right-0 bottom-0 left-0"></div>
              <div className="relative z-10">
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="leading-tight text-xl font-medium text-kb-accent-light tracking-tight font-inter sm:text-2xl">
                      Workflow Build
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0" aria-hidden="true" style={{ color: 'rgb(255, 255, 255)' }}>
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                  <p className="mb-6 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-kb-inverse-text/70">Scoped after the review</p>
                    <p className="mb-5 font-inter text-lg font-normal leading-snug tracking-tight text-kb-inverse-text sm:text-xl">Want the whole process fixed, not patched?</p>
                  <p className="mb-5 font-inter text-sm font-normal leading-relaxed tracking-tight text-kb-inverse-text sm:text-base">We map one process end to end and rebuild how information moves through it. Intake. Quote. Scheduling. Documentation. Invoicing. Follow-up.</p>
                  <p className="font-inter text-sm font-normal leading-relaxed tracking-tight text-kb-inverse-text/85">You get the rebuilt process running in your own tools, documented, with monitoring on every step.</p>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-kb-accent px-5 py-2.5 font-inter text-sm font-medium text-kb-on-accent transition-colors">
                    Book a workflow review
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex h-full">
            <div className="flex h-full w-full flex-col rounded-3xl border border-kb-line bg-kb-surface-raised p-7 sm:p-8">
              <p className="text-xl font-medium tracking-tight text-kb-ink font-inter sm:text-2xl">Keep It Running</p>
              <p className="mb-6 mt-2 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-kb-ink-muted">Monthly</p>
              <p className="mb-5 font-inter text-lg font-normal leading-snug text-kb-ink sm:text-xl">Automations don't fail loudly.</p>
              <p className="mb-5 font-inter text-sm font-normal leading-relaxed text-kb-ink-soft sm:text-base">A field name changes, an integration updates, and the automation quietly stops. You find out when a client doesn't show up. Monitoring, alerts, and hours each month for changes as the business shifts.</p>
              <p className="font-inter text-sm font-normal leading-relaxed text-kb-ink-soft/85">New workflows join the same plan rather than starting a new negotiation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
