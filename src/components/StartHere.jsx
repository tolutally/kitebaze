import { Link } from 'react-router-dom';

export default function StartHere() {
  return (
    <section className="relative z-10 bg-kb-canvas pb-16 pt-12 sm:py-32">
      <div className="sm:px-6 lg:px-8 max-w-6xl mx-auto pr-8 pl-8">
        <div className="flex flex-row items-center justify-between mb-8 sm:mb-16 gap-4">
          <h2 className="m-0 font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink md:text-7xl" style={{ animation: 'slideInY 800ms ease-in-out 0ms forwards' }}>Start Here</h2>
          <button
            type="button"
            className="w-fit cursor-pointer whitespace-nowrap rounded-full bg-kb-accent px-5 py-3.5 text-sm font-medium text-kb-on-accent transition-all duration-300 hover:bg-kb-accent-hover sm:px-8 sm:text-base"
            onClick={() => { window.location.href = 'https://calendly.com/kindling-solutions/kindling-solutions'; }}
          >
            Show Us Your Workflow
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-x-8 gap-y-8 items-stretch">
          <div className="flex h-full">
            <Link
              to="/workflow-build"
              onClick={() => { history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }}
              style={{ boxShadow: '0 0 60px 10px rgba(254,76,0,0.24), 0 0 120px 20px rgba(63,48,36,0.08)', textDecoration: 'none' }}
              className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-3xl bg-kb-inverse pb-8 pl-8 pr-8 pt-8 transition-all duration-300 hover:scale-[1.02] sm:p-12"
            >
              <div className="bg-center bg-[url('/recovered-assets/photo-1595418917831-ef942bd9f9ec.jpg')] bg-cover absolute top-0 right-0 bottom-0 left-0"></div>
              <div className="relative z-10">
                <div className="flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-16">
                    <p className="leading-tight sm:text-4xl text-2xl font-medium text-[#FE4C00] tracking-tight font-inter">
                      Workflow Build
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px] shrink-0" aria-hidden="true" style={{ color: 'rgb(255, 255, 255)' }}>
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                    <p className="mb-8 font-inter text-xl font-normal leading-tight tracking-tight text-kb-inverse-text sm:text-3xl">Want the whole process fixed, not patched?</p>
                  <p className="mb-8 font-inter text-base font-normal leading-tight tracking-tight text-kb-inverse-text sm:text-xl">We map one process end to end and rebuild how information moves through it. Intake. Quote. Scheduling. Documentation. Invoicing. Follow-up.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col h-full">
            <Link
              to="/bottleneck"
              onClick={() => { history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }}
              style={{ boxShadow: '0 0 60px 10px rgba(254,76,0,0.24), 0 0 120px 20px rgba(63,48,36,0.08)', textDecoration: 'none' }}
              className="relative flex h-full flex-col rounded-3xl bg-kb-inverse-soft bg-[url('/recovered-assets/photo-1595418917831-ef942bd9f9ec.jpg')] bg-cover bg-center pb-8 pl-8 pr-8 pt-8 transition-all duration-300 hover:scale-[1.02] sm:p-10"
            >
              <div className="flex items-center gap-3 mb-16">
                <p className="leading-tight sm:text-4xl text-2xl font-medium text-[#FE4C00] tracking-tight font-inter">
                  One Bottleneck
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px] shrink-0" aria-hidden="true" style={{ color: 'rgb(255, 255, 255)' }}>
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
              <div>
                <p className="mb-8 font-inter text-xl font-normal leading-snug text-kb-inverse-text sm:text-3xl">Fix one thing first. Judge us on that.</p>
                <p className="font-inter text-base font-normal leading-tight tracking-tight text-kb-inverse-text sm:text-xl">We automate one defined problem, connect it to the tools involved, and prove it works before touching anything else.</p>
                <div className="mt-10 px-2 flex flex-col items-start"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
