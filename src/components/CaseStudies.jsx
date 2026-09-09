import { Link } from 'react-router-dom';

export default function CaseStudies() {
  return (
      <div className="sm:px-6 lg:px-8 z-10 max-w-7xl mr-auto ml-auto pr-4 pl-4 relative">
        <div className="flex flex-col lg:flex-row gap-10 fade-up-element mb-0 gap-x-10 gap-y-10 items-start justify-between">
          <h2 className="max-w-3xl font-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-ink sm:text-6xl">
            <span className="text-kb-accent-ink">What we build.</span> In the real world.
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 fade-up-element mb-16 gap-x-10 gap-y-10 items-start justify-between">
          <h2 className="max-w-3xl font-grotesk text-base font-medium leading-tight tracking-tight text-kb-ink-soft sm:text-xl">
            Practical automation for the work between the work.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 fade-up-element gap-x-4 gap-y-4">
          <Link to="/case-studies#xerox" className="kb-card-shadow flex h-[280px] flex-col justify-between rounded-3xl border border-kb-line bg-kb-surface/90 pb-8 pl-8 pr-8 pt-0 backdrop-blur-md transition-colors hover:border-kb-line-strong sm:h-[420px]">
            <div className="flex pt-6 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src="/recovered-assets/f1effcd7-271a-45bb-bcb1-c46652da778c_320w.jpg" alt="User" className="h-10 w-10 rounded-full border border-kb-line-strong object-cover grayscale" />
                <div className="font-grotesk text-sm font-medium leading-none text-kb-ink">Xerox</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[24px] w-[24px] shrink-0 text-kb-ink" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="mb-20 pb-0 font-grotesk text-xl font-medium leading-tight tracking-tight text-kb-ink">Enquiry → Booking</h3>
              <p className="font-inter text-base font-light leading-relaxed text-kb-ink-muted">Capture the request, ask for what's missing, route it and create the job record before anyone opens their laptop.</p>
            </div>
          </Link>
          <Link to="/case-studies#crow" className="kb-card-shadow flex h-[280px] flex-col justify-between rounded-3xl border border-kb-line bg-kb-surface/90 pb-8 pl-8 pr-8 pt-0 no-underline backdrop-blur-md transition-colors hover:border-kb-line-strong sm:h-[420px]">
            <div className="flex pt-6 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src="/recovered-assets/7db84f60-1d18-48fb-9287-aa8597dbcb7b_320w.jpg" alt="User" className="h-10 w-10 rounded-full border border-kb-line-strong object-cover grayscale" />
                <div className="font-grotesk text-sm font-medium leading-snug text-kb-ink">Crow Estate<br />Planning &amp; Probate</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[24px] w-[24px] shrink-0 text-kb-ink" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="mb-8 font-grotesk text-xl font-medium leading-tight tracking-tight text-kb-ink">Job → Invoice</h3>
              <p className="font-inter text-base font-light leading-relaxed text-kb-ink-muted">Work gets completed, documented, priced and billed without someone re-entering it in a second system.</p>
            </div>
          </Link>
          <Link to="/case-studies#squlpt" className="kb-card-shadow flex h-[280px] flex-col justify-between rounded-3xl border border-kb-line bg-kb-surface/90 pb-8 pl-8 pr-8 pt-0 no-underline backdrop-blur-md transition-colors hover:border-kb-line-strong sm:h-[420px]">
            <div className="flex pt-6 items-center justify-between">
              <div className="flex gap-3 items-center">
                <img src="/recovered-assets/54571749-f1d2-4b32-9e2f-136640adae0d_320w.jpg" alt="User" className="h-10 w-10 rounded-full border border-kb-line-strong object-cover grayscale" />
                <div className="font-grotesk text-sm font-medium leading-none text-kb-ink">Squlpt Body</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[24px] w-[24px] shrink-0 text-kb-ink" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="mb-14 font-grotesk text-xl font-medium leading-tight tracking-tight text-kb-ink">Follow up → Paid</h3>
              <p className="font-inter text-base font-light leading-relaxed text-kb-ink-muted">Quotes with no reply, documents that never came back, invoices past due. Followed up on schedule, not when someone remembers.</p>
            </div>
          </Link>
          <Link to="/case-studies#documents" className="kb-card-shadow flex h-[280px] flex-col justify-between rounded-3xl border border-kb-line bg-kb-surface/90 pb-8 pl-8 pr-8 pt-0 no-underline backdrop-blur-md transition-colors hover:border-kb-line-strong sm:h-[420px]">
            <div className="flex pt-6 items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-kb-line-strong bg-kb-surface-raised">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-kb-accent">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                </div>
                <div className="font-grotesk text-sm font-medium leading-none text-kb-ink">Any Business</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[24px] w-[24px] shrink-0 text-kb-ink" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="mb-14 font-grotesk text-xl font-medium leading-tight tracking-tight text-kb-ink">Documents → Data</h3>
              <p className="font-inter text-base font-light leading-relaxed text-kb-ink-muted">Receipts, PDFs, forms and email threads read and routed into the systems that need them.</p>
            </div>
          </Link>
          <Link
            to="/case-studies"
            className="group relative flex h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-kb-inverse-muted/30 bg-kb-inverse bg-[url('/recovered-assets/photo-1764946023990-2780e4905bb5.jpg')] bg-cover bg-center pb-8 pl-8 pr-8 pt-8 text-kb-inverse-text sm:h-[420px]"
          >
            <div className="absolute inset-0 bg-kb-inverse/45 transition-colors duration-500 group-hover:bg-kb-inverse/35"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-kb-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-kb-accent/30 transition-colors duration-500"></div>
            <div className="relative flex items-start justify-between text-kb-inverse-text">
              <span className="text-lg font-medium tracking-tight font-grotesk">Your Workflow</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[24px] h-[24px]" aria-hidden="true" style={{ color: 'rgb(255, 255, 255)' }}>
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
            <div className="relative z-10 mt-auto mb-8">
              <p className="max-w-[260px] pb-12 font-inter text-base font-light leading-relaxed text-kb-inverse-text">Maybe your job software does 80% of what you need. That's exactly the kind of problem we want to see addressed.</p>
            </div>
            <div className="relative z-10 space-y-3 font-inter text-sm text-kb-inverse-muted">
              <Link to="/case-studies" className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent pb-3.5 pl-8 pr-8 pt-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover sm:w-auto">Show Us the Mess</Link>
            </div>
          </Link>
        </div>
      </div>
  );
}
