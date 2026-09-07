const FAQS = [
  {
    q: 'Is Kitebaze another software platform?',
    a: 'No. Kitebaze builds automation around your operation. Wherever possible we connect and extend your current tools rather than asking you to move everything.',
  },
  {
    q: 'Do we have to replace our booking system?',
    a: 'Usually not. If it works for bookings, it stays. The opportunity is normally in connecting everything that happens before and after.',
  },
  {
    q: 'What happens first?',
    a: 'A Workflow Review. You walk us through the software, spreadsheets, emails, manual steps and workarounds. We identify where automation would be worth it.',
  },
  {
    q: 'Can we start with one small problem?',
    a: 'Yes, and it is often the best way. We automate one repeated bottleneck, put it into real use, and expand only when it makes sense.',
  },
  {
    q: 'Do we need someone technical?',
    a: 'No. Integrations and implementation are our job. Showing us how the business really works is yours.',
  },
  {
    q: "What about our clients' personal information?",
    a: 'It is one of the first things we design around: least-privilege connections, only the data the workflow needs, audit trails, human approval and Canadian-hosted infrastructure where it matters.',
  },
  {
    q: 'What happens when something changes?',
    a: 'We build systems meant to be maintained and adjusted, with monitoring so you hear from us when something breaks — not from a client who missed a confirmation.',
  },
  {
    q: 'Who is Kitebaze for?',
    a: 'Owner-led and growing service businesses where too much still moves by hand — booked services, clinics, studios, programs, cohorts and field operations.',
  },
];

export default function FAQ() {
  return (
    <section className="relative z-40 bg-kb-canvas pb-24 pt-8 sm:pt-12">
      <div className="sm:px-6 lg:px-8 max-w-6xl mr-auto ml-auto pr-4 pl-4">
        <div className="fade-up-element text-center mb-16">
          <img
          src="/recovered-assets/0547f70f-43a3-4916-98fd-dab34ad57238_320w.png"
            alt="Orange Message Bubble Icon"
            className="w-[4.2rem] sm:w-[4.8rem] h-auto mx-auto mb-6 animate-bounce"
          />
          <h2 className="mb-4 font-inter text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-base font-light text-kb-ink-muted sm:text-xl">Answers about bookings, automation and privacy.</p>
        </div>
        <div className="divide-y divide-kb-line border-y border-kb-line">
          {FAQS.map((item) => (
            <details key={item.q} className="fade-up-element group first:pt-6 last:pb-6 pt-6 pb-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-kb-ink transition-colors hover:text-kb-accent-ink focus:outline-none">
                <span className="text-base sm:text-lg font-normal tracking-tight font-grotesk">{item.q}</span>
                <span className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center text-kb-ink-muted transition-colors group-hover:text-kb-ink">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-open:rotate-180 transition-transform duration-300">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="accordion-content pb-2 pr-8 pt-4 text-base font-light leading-relaxed text-kb-ink-soft">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
