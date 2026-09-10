const FAQS = [
  {
    q: "What about our clients' personal information?",
    a: "It's one of the first things we design around: least-privilege connections, only the data the workflow needs, audit trails, human approval on anything consequential, and Canadian-hosted infrastructure where it matters. Kitebaze is led by a privacy professional who works on information access and privacy programs in the public sector.",
  },
  {
    q: 'What happens when something changes?',
    a: 'We build systems meant to be maintained and adjusted, with monitoring so you hear from us when something breaks — not from a client who never got their confirmation.',
  },
  {
    q: 'Is Kitebaze another software platform?',
    a: 'No. We build automation around your operation. Wherever possible we connect and extend your current tools rather than asking you to move everything.',
  },
  {
    q: 'Do we have to replace our practice software?',
    a: "Usually not. If it works for matters and files, it stays. The opportunity is normally in connecting everything that happens before and after it. If a tool genuinely is the bottleneck, we'll say so.",
  },
  {
    q: 'What happens first?',
    a: 'A workflow review. You walk us through the software, spreadsheets, emails, manual steps and workarounds. We identify where automation would actually be worth it.',
  },
  {
    q: 'Can we start with one small problem?',
    a: "Yes, and it's often the best way. We automate one repeated bottleneck, put it into real use, and expand only when it makes sense.",
  },
  {
    q: 'Do we need someone technical?',
    a: 'No. Integrations and implementation are our job. Showing us how the practice really works is yours.',
  },
  {
    q: 'Who is Kitebaze for?',
    a: "Small professional practices, typically 2 to 20 people — legal, accounting, insurance, clinics, consulting, advisory and similar. If your client work moves through several systems and someone moves it by hand, that's the problem we solve. We also work with other service businesses that have the same problem; ask us.",
  },
];

export default function FAQ() {
  return (
    <section className="relative z-40 bg-kb-canvas pb-16 pt-8 sm:pt-10">
      <div className="sm:px-6 lg:px-8 max-w-6xl mr-auto ml-auto pr-4 pl-4">
        <div className="fade-up-element text-center mb-16">
          <img
          src="/recovered-assets/0547f70f-43a3-4916-98fd-dab34ad57238_320w.png"
            alt="Orange Message Bubble Icon"
            className="w-[4.2rem] sm:w-[4.8rem] h-auto mx-auto mb-6 animate-bounce"
          />
          <h2 className="mb-4 font-inter text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-base font-light text-kb-ink-muted sm:text-xl">Answers about your systems, automation and privacy.</p>
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
