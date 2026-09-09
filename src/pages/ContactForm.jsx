export default function ContactForm() {
  return (
    <section className="relative overflow-hidden border-t border-kb-line bg-kb-canvas">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(159,107,78,0.11),transparent_60%)]"></div>
      </div>

      <div className="relative mx-auto mt-24 max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-8 inline-flex items-center rounded-full border border-kb-line-strong bg-kb-surface/70 px-4 py-2 font-inter text-xs uppercase tracking-[0.2em] text-kb-ink-soft">
              Start Here
            </div>
            <h1 className="font-space-grotesk text-5xl font-medium leading-[0.95] tracking-tight text-kb-ink lg:text-7xl">
              Stop being <span className="text-kb-accent-ink">the system.</span>
            </h1>
            <p className="mt-8 max-w-lg font-inter text-lg font-light leading-relaxed text-kb-ink-soft">
              We’ll diagnose the constraint, identify the highest-leverage opportunity, and map the fastest path to implementation.
            </p>

            <div className="mt-12">
              <p className="max-w-lg font-inter text-xl leading-relaxed text-kb-ink-soft">Want to chat right away?</p>
              <div className="mt-4 space-y-3 font-inter text-sm text-kb-ink-muted">
                <p>• 30-minute strategy call</p>
                <p>• No obligation</p>
                <p className="pb-6">• Clear next steps</p>
              </div>
              <a
                href="https://calendly.com/kindling-solutions/kindling-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-kb-accent px-8 py-4 font-inter font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover"
              >
                Book A Call
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form action="https://formspree.io/f/xqevpgzo" method="POST" className="space-y-10 rounded-3xl border border-kb-line bg-kb-surface p-8 shadow-[0_24px_70px_rgba(58,40,24,0.1)] backdrop-blur-md sm:p-12">
              <div className="grid gap-10 md:grid-cols-2">
                <Field label="Name">
                  <input type="text" name="name" placeholder="Your Name" required className="contact-input" />
                </Field>
                <Field label="Email">
                  <input type="email" name="email" placeholder="you@company.com" required className="contact-input" />
                </Field>
              </div>

              <Field label="Company">
                <input type="text" name="company" placeholder="Company Name" className="contact-input" />
              </Field>

              <Field label="What are you trying to solve?">
                <textarea rows="4" name="message" placeholder="Tell us where the bottleneck is..." required className="contact-input resize-none" />
              </Field>

              <input type="hidden" name="_subject" value="New KiteBaze project inquiry" />
              <div className="pt-2">
                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-kb-accent px-10 py-4 font-inter font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-3 block font-inter text-xs uppercase tracking-widest text-kb-ink-soft">{label}</span>
      {children}
    </label>
  );
}
