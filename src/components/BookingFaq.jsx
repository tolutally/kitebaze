const BOOKING_FAQS = [
  {
    question: 'What’s the review format?',
    answer: 'A 30-minute Google Meet video call. Camera is optional. Bring whoever understands the workflow best—one to three people from your team is usually ideal.',
  },
  {
    question: 'Is it really free? What’s the catch?',
    answer: 'It is free, with no obligation and no pitch deck. We’ll give you an honest view of what is worth automating, what is not, and where we would start. If there is a fit, we can discuss a scoped next step.',
  },
  {
    question: 'What should I prepare?',
    answer: 'Come ready to describe one workflow that creates delays, repeated data entry, chasing, or avoidable errors. It helps to know which tools are involved and what “fixed” would look like.',
  },
  {
    question: 'Do you work outside Calgary?',
    answer: 'Yes. Reviews and implementation can happen remotely, and we work with service businesses across Canada.',
  },
  {
    question: 'What if I need to reschedule?',
    answer: 'Use the reschedule link in your Cal confirmation email. You can choose another available time without starting over.',
  },
];

export default function BookingFaq() {
  return (
    <section className="mt-24 border-t border-kb-line-strong py-20 sm:mt-28 sm:py-24" aria-labelledby="booking-faq-title">
      <div className="grid gap-14 lg:grid-cols-[0.82fr_1.55fr] lg:gap-20">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-kb-ink-muted">
            <span className="h-2 w-2 rounded-full bg-kb-accent" />
            Frequently asked
          </p>
          <h2 id="booking-faq-title" className="mt-6 max-w-sm font-space-grotesk text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-kb-ink sm:text-6xl">
            Before you book, <em className="font-normal text-kb-accent-ink">answered.</em>
          </h2>
          <p className="mt-8 font-inter text-base text-kb-ink-muted">
            Anything else, just ask on the call.
          </p>
        </div>

        <div className="border-t-2 border-kb-ink">
          {BOOKING_FAQS.map((item, index) => (
            <details key={item.question} className="group border-b border-kb-line-strong" open={index === 0 ? true : undefined}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-8 text-kb-ink transition-colors hover:text-kb-accent-ink focus:outline-none">
                <span className="font-space-grotesk text-xl font-medium tracking-tight sm:text-2xl">
                  {item.question}
                </span>
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center text-3xl font-light leading-none text-kb-accent-ink" aria-hidden="true">
                  <span className="transition-opacity group-open:opacity-0">+</span>
                  <span className="absolute opacity-0 transition-opacity group-open:opacity-100">−</span>
                </span>
              </summary>
              <div className="accordion-content max-w-2xl pb-8 pr-10 font-inter text-base leading-7 text-kb-ink-soft sm:text-lg sm:leading-8">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
