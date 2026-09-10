import { useState } from 'react';
import { Link } from 'react-router-dom';

const SECTORS = [
  {
    index: '01',
    title: 'Paper-Heavy Businesses',
    subtitle: 'Trades, contractors, cleaning, landscaping, installers, small service operators',
    body: 'The job creates paper. Quotes, job sheets, site photos, receipts, signed approvals — arriving by text, email and camera roll. Someone types it into the system afterwards, usually at night.',
    image: '/paper-heavy-biz.jpg',
  },
  {
    title: 'Clinics & Health Services',
    subtitle: 'Dental, veterinary, optometry, physiotherapy, chiropractic, massage, allied health',
    body: 'The calendar is the revenue. Recalls that never went out, intake and consent forms chased by hand, claims, reminders, no-shows. Your practice software runs the chair. Everything around it runs on a person.',
    image: '/healthcare-sector.jpg',
  },
  {
    index: '03',
    title: 'Advisory & Professional Firms',
    subtitle: 'Legal, accounting, bookkeeping, insurance, immigration, consulting',
    body: "Client work moves through intake, delivery, billing and follow-up — across a practice tool, an inbox and an accounting system that don't talk. The work is fine. Carrying it between them is the job nobody was hired to do.",
    image: '/pro-services.jpg',
  },
  {
    index: '04',
    title: 'Everyone Else With The Same Problem',
    subtitle: 'Studios, salons, schools, agencies, nonprofits, anything client-led',
    body: "Different tools, identical shape. A client comes in, the work moves through three or four systems, and someone carries it between them. If that's your week, we should talk.",
    image: '/other-businesses.jpg',
  },
];

export default function WhoWeWorkWith() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative border-t border-kb-line bg-kb-surface-soft py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-40 mx-auto max-w-3xl text-center">
          <span className="fade-up-element inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
            <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
            Who we work with
          </span>
          <h2 className="typography-reveal mt-5 font-space-grotesk text-4xl font-normal leading-[1.02] tracking-tight text-kb-ink sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text inline-block">Built for </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="reveal-text inline-block font-medium text-kb-accent-ink">small and medium scale enterprises.</span>
            </span>
          </h2>
          <p className="fade-up-element mx-auto mt-5 max-w-2xl font-inter text-base font-light leading-7 text-kb-ink-muted sm:text-lg">
            Typically 2 to 20 people. Your software handles the work well. It just doesn't reach everything around it.
          </p>
        </div>
      </div>

      <div className="fade-up-element mt-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:min-h-[70vh]">
          {SECTORS.map((sector, index) => {
            const isActive = activeIndex === index;
            return (
            <div
              key={sector.title}
              className="group relative h-96 cursor-pointer overflow-hidden bg-kb-inverse lg:h-full"
              onClick={() => setActiveIndex((current) => (current === index ? null : index))}
            >
              <img
                src={sector.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-kb-inverse via-kb-inverse/40 to-kb-inverse/10" />
              <div className="pointer-events-none absolute bottom-0 left-0 z-20 p-8">
                <h3 className="font-space-grotesk text-4xl font-medium uppercase tracking-tight text-kb-inverse-text lg:text-5xl">{sector.title}</h3>
              </div>
              <div className={`absolute inset-y-0 right-0 z-10 flex w-[70%] flex-col justify-start border-l border-kb-inverse-text/10 bg-kb-inverse-soft/90 p-8 pt-10 backdrop-blur-md transition-transform duration-500 ease-out group-hover:translate-x-0 md:w-[60%] ${isActive ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className={`mb-6 h-px bg-kb-accent transition-all duration-700 ease-out group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`} />
                <p className={`font-inter text-xs font-medium italic leading-relaxed text-kb-inverse-text/70 transition-opacity delay-150 duration-500 group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {sector.subtitle}
                </p>
                <p className={`mt-3 font-inter text-sm font-medium leading-relaxed text-kb-inverse-text transition-opacity delay-150 duration-500 group-hover:opacity-100 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {sector.body}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up-element mx-auto mt-14 flex flex-col items-center text-center">
          <Link
            to="/contact-form"
            className="inline-flex items-center justify-center rounded-full bg-kb-accent px-7 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover"
          >
            Get in Touch
          </Link>
          <p className="mt-6 font-inter text-sm font-light text-kb-ink-muted">
            Based in Calgary. We work with practices across Canada.
          </p>
        </div>
      </div>
    </section>
  );
}
