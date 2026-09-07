import { Link } from 'react-router-dom';

const caseStudies = [
  {
    id: 'xerox', company: 'Xerox', title: 'Billing that matches reality.',
    image: '/case-study-assets/xerox.webp', logo: '/case-study-assets/xerox-logo.jpg',
    situation: 'An IT services firm billed per equipment installed—not per ticket, not per hour. Traditional systems forced bad choices: break one order into multiple tickets (and lose continuity), or track installs in spreadsheets (and lose accuracy).',
    build: 'A platform where tickets represent supplier orders—and installs become billable operations automatically. One ticket can contain many operations. Invoicing rolls up operations—not tickets. AI parses customer email replies and logs them automatically.',
    shift: 'Billing got accurate. Operations stopped leaking time.',
    results: ['95% reduction in month-end invoice prep.', 'Zero manual data entry from supplier emails.', 'Every installation tracked, billed, and auditable.'],
  },
  {
    id: 'crow', company: 'Crow Estate Planning & Probate', title: 'AI-run case management without the scavenger hunt.',
    image: '/case-study-assets/crow.jpg', logo: '/case-study-assets/crow-logo.jpg',
    situation: 'Estate + probate breaks when case information lives in too many places. Intake over here. Tasks over there. Messages scattered. Documents buried. When something slips, attorneys are the ones exposed.',
    build: 'A case management system designed for estate + probate. One timeline per case. One communication record. One place for documents. No syncing. No guessing where something lives.',
    shift: 'Less chasing. More control.',
    results: ['Attorneys can see where every active case stands.', "Client messages don't get missed or lost.", 'Tasks stay tied to case stages with clear ownership and next steps.', 'Intake turns into real work automatically.', 'Draft documents are generated directly from case data.', 'Now running day-to-day operations—and serving as the foundation for a broader legal SaaS platform.'],
  },
  {
    id: 'jobs-done', company: 'Jobs Done', title: 'Driver texts, turned into clean documentation.',
    image: '/case-study-assets/jobs-done.jpg', logo: '/case-study-assets/jobs-done-logo.jpg',
    situation: 'Trucking companies were getting delivery confirmations and paperwork images by text from drivers in the field. Managing those across scattered inboxes and manual checks created delays—and lost documentation.',
    build: 'A shared texting inbox that captures every driver submission, verifies senders, updates dispatch in real time, and ties the whole flow to billing.',
    shift: 'Paperwork lands clean. Dispatch stays in sync.',
    results: ['Driver communications centralized in one dashboard.', 'Automated sender verification reduced manual review.', 'Real-time updates kept dispatchers aligned.', 'Usage-based billing scaled with customer volume.'],
  },
  {
    id: 'squlpt', company: 'Squlpt Body', title: 'A waiting room that runs itself.',
    image: '/case-study-assets/squlpt.jpg', logo: '/case-study-assets/squlpt-logo.jpg',
    situation: 'Patient flow was managed manually. That meant missed appointments, idle staff time, inconsistent follow-ups, and no visibility into workload.',
    build: 'A real-time waiting room with role-based dashboards. Patients check in, staff see live queues, and sessions move with instant updates—not phone tag.',
    shift: 'Throughput went up. Idle time went down.',
    results: ['40% improvement in staff utilization.', 'Fewer no-shows with automated reminders.', 'Real-time visibility into queues and workload.'],
  },
];

function CaseCopy({ study }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 pb-4">
        <img src={study.logo} alt={study.company} className="h-10 w-10 rounded-full border border-kb-line-strong object-cover grayscale" />
        <div className="font-space-grotesk text-base font-medium leading-none text-kb-ink">{study.company}</div>
      </div>
      <h2 className="mb-5 max-w-[30rem] font-inter text-2xl font-normal leading-tight tracking-[-0.02em] text-kb-ink lg:text-[1.75rem]">{study.title}</h2>
      <p className="mb-2 font-inter text-xs font-medium text-kb-accent-ink">The situation</p>
      <p className="mb-7 max-w-[32.5rem] font-inter text-[0.9375rem] font-light leading-[1.65] text-kb-ink-soft">{study.situation}</p>
      <p className="mb-2 font-inter text-xs font-medium text-kb-accent-ink">What we built</p>
      <p className="mb-7 max-w-[32.5rem] font-inter text-[0.9375rem] font-light leading-[1.65] text-kb-ink-soft">{study.build}</p>
      <p className="mb-2 font-inter text-xs font-medium text-kb-accent-ink">The shift</p>
      <p className="mb-7 max-w-[32.5rem] font-inter text-[0.9375rem] font-light leading-[1.65] text-kb-ink">{study.shift}</p>
      <ul className="max-w-[32.5rem] space-y-1 font-inter text-[0.9375rem] font-light leading-[1.65] text-kb-ink">
        {study.results.map((result) => <li key={result} className="flex items-start gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-kb-accent"></span><span>{result}</span></li>)}
      </ul>
    </div>
  );
}

function CaseImage({ study }) {
  return (
    <div className="kb-card-shadow group relative aspect-[4/3] overflow-hidden rounded-2xl border border-kb-line">
      <img src={study.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(254,76,0,0.12)_0%,transparent_70%)] opacity-30 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-kb-canvas/20 via-transparent to-transparent"></div>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative z-10 flex min-h-[60dvh] items-center justify-center overflow-hidden bg-kb-canvas px-6 pb-8 pt-24">
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(circle at 70% 35%, rgba(254,76,0,0.1), transparent 38%), linear-gradient(180deg, var(--kb-canvas) 0%, var(--kb-surface) 100%)' }}></div>
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 about-grid"></div>
        <div className="mx-auto mb-16 mt-28 flex w-full max-w-7xl flex-col items-center px-6 text-center">
          <h1 className="mb-6 font-space-grotesk text-5xl font-medium tracking-tight text-kb-ink sm:text-7xl lg:text-8xl">We make scale unfair.</h1>
          <p className="max-w-2xl font-inter text-lg font-light text-kb-ink-soft md:text-xl">Real businesses. Real constraints. Real leverage.</p>
        </div>
      </section>

      <section className="relative z-10 border-b border-kb-line bg-kb-surface pb-40 pt-12">
        <div className="mx-auto w-full max-w-[80rem] px-6">
          <div className="flex flex-col gap-20">
            {caseStudies.map((study, index) => (
              <article key={study.id} id={study.id} className={`grid grid-cols-1 items-center gap-10 lg:gap-16 ${index % 2 === 0 ? 'lg:grid-cols-[5fr_7fr]' : 'lg:grid-cols-[7fr_5fr]'}`}>
                {index % 2 === 0 ? <><CaseImage study={study} /><CaseCopy study={study} /></> : <><div className="order-2 lg:order-1"><CaseCopy study={study} /></div><div className="order-1 lg:order-2"><CaseImage study={study} /></div></>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-kb-line bg-kb-canvas px-6 py-28 text-center sm:py-36">
        <div className="pointer-events-none absolute inset-0 opacity-30 about-grid"></div>
        <div className="relative mx-auto max-w-4xl">
          <h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">Ready to transform your business?</h2>
          <p className="mx-auto mt-6 max-w-2xl font-inter text-lg font-light text-kb-ink-soft sm:text-xl">Book a free strategy call today and discover how AI can help you scale.</p>
          <Link to="/contact-form" className="mt-10 inline-flex items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  );
}
