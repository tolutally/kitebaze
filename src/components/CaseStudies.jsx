import { Link } from 'react-router-dom';

const PATTERNS = [
  {
    href: '/case-studies#xerox',
    title: 'Enquiry → Client',
    copy: "Capture the request, ask for what's missing, route it and create the job record before anyone opens their laptop.",
  },
  {
    href: '/case-studies#crow',
    title: 'Job → Invoice',
    copy: 'Work gets completed, documented, priced and billed without someone re-entering it in a second system.',
  },
  {
    href: '/case-studies#squlpt',
    title: 'Follow-up → Paid',
    copy: 'Quotes with no reply, documents that never came back, invoices past due. Followed up on schedule, not when someone remembers.',
  },
  {
    href: '/case-studies#documents',
    title: 'Documents → Data',
    copy: 'Receipts, PDFs, forms and email threads read and routed into the systems that need them.',
  },
];

function CardArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 gap-x-4 gap-y-4">
          {PATTERNS.map((pattern, index) => (
            <Link
              key={pattern.href}
              to={pattern.href}
              className="fade-up-element kb-card-shadow group flex h-[240px] flex-col justify-between rounded-3xl border border-kb-line/60 bg-kb-surface/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-kb-line-strong hover:bg-kb-surface/80 sm:h-[300px]"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex justify-end">
                <CardArrow />
              </div>
              <div>
                <h3 className="mb-2 font-grotesk text-xl font-medium leading-tight tracking-tight text-kb-ink">{pattern.title}</h3>
                <p className="font-inter text-sm font-light leading-relaxed text-kb-ink-muted">{pattern.copy}</p>
              </div>
            </Link>
          ))}
          <Link
            to="/case-studies"
            className="fade-up-element group relative flex h-[240px] flex-col justify-between overflow-hidden rounded-3xl border border-kb-inverse-muted/30 bg-kb-inverse/70 bg-[url('/recovered-assets/photo-1764946023990-2780e4905bb5.jpg')] bg-cover bg-center p-6 text-kb-inverse-text backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 sm:h-[300px]"
            style={{ transitionDelay: '320ms' }}
          >
            <div className="absolute inset-0 bg-kb-inverse/45 transition-colors duration-500 group-hover:bg-kb-inverse/35"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-kb-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-kb-accent/30 transition-colors duration-500"></div>
            <div className="relative flex items-start justify-between text-kb-inverse-text">
              <span className="text-lg font-medium tracking-tight font-grotesk">Your Workflow</span>
              <CardArrow />
            </div>
            <div className="relative z-10 mt-auto">
              <p className="mb-4 max-w-[260px] font-inter text-sm font-light leading-relaxed text-kb-inverse-text">Maybe your software does 80% of what you need. That last 20% is exactly what we fix.</p>
              <span className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent px-6 py-2.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">Show Us the Mess</span>
            </div>
          </Link>
        </div>
      </div>
  );
}
