import { Link } from 'react-router-dom';

const roles = [
  ['Inbound Sales Assistant', 'Responds fast, qualifies, routes leads, keeps the pipeline warm.'],
  ['Sales Rep', "Keeps deals moving and makes sure opportunities don't go cold."],
  ['Quality Assurance Coordinator', 'Checks work against your standards before it goes out.'],
  ['Customer Success Assistant', 'Flags risk early and surfaces what needs attention.'],
  ['Finance Assistant', 'Keeps numbers clean and surfaces what changed (weekly rollups, anomalies, and questions to answer).'],
  ['Brand Designer', 'Refreshes creative, tightens layouts, and produces on-brand assets your team can use.'],
  ['Executive Assistant', 'Triages inbox and calendar, drafts replies, and keeps the day moving.'],
  ['Research Analyst', 'Runs competitor scans, builds briefs, and surfaces what matters.'],
];

const steps = [
  ['Define the role', 'One call to lock the job, inputs, outputs, and what “good” looks like.'],
  ['Build & install', 'We build the agent around your process and install it into your tools.'],
  ['Tune in production', 'We watch how it performs, tighten the edges, and make it reliable.'],
  ['Add a second role', "If there's more leverage, we add another agent—or route you to Workflow Build."],
];

const faqs = [
  ['Is this just a bunch of AI tools?', "No. Tools don't run a role. We install a worker with a job."],
  ['Do we need to be technical?', "No. This isn't a build-it-yourself kit. We implement and make sure it sticks."],
  ['How do we know if one role is enough?', "We'll tell you on the call. If it's one role, we'll tell you which one and what “done” looks like. If it's not, we'll help you build the team and operating layer you actually need."],
  ['How fast can we have the role running?', "Fast. We move from definition → build → real use quickly, then tighten it until it's reliable."],
  ['What tools does it work in?', 'Where your team already works—email, calendar, CRM, helpdesk, spreadsheets, and the rest. We build around your stack.'],
  ['Who “manages” it day-to-day?', "It runs on a rhythm, but a real owner still matters. We'll help you pick who owns inputs, approves edge cases, and keeps standards tight."],
  ['What if we pick the wrong role?', "We'll tell you before you build. If the real constraint isn't one job, we'll recommend a broader build."],
  ['Is our data safe?', "We build to your requirements and keep access tight. If sensitive data is involved, we'll scope the role around what should and shouldn't touch it."],
];

const rightMove = [
  '“This is the job we’d hire for—if it didn’t cost what it costs.”',
  '“We don’t need a rebuild. We need one role to run reliably.”',
  '“We want a real role: clear handoffs, clear ‘done’, and standards that hold.”',
  '“We want one choke point gone—fast. (No new headcount.)”',
];

export default function InHouseAgent() {
  return (
    <>
      <section className="relative min-h-[800px] overflow-hidden bg-kb-inverse pt-32 text-kb-inverse-text">
        <img src="/in-house-assets/hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-right sm:object-center" />
        <div className="absolute inset-0 bg-kb-inverse/55"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-kb-canvas via-kb-canvas/55 to-transparent"></div>
        <div className="relative mx-auto mt-20 flex w-full max-w-7xl flex-col items-center px-6 text-center sm:mt-28">
          <h1 className="mb-6 font-space-grotesk text-5xl font-medium tracking-tight text-kb-inverse-text sm:text-7xl lg:text-8xl">Your first AI hire.</h1>
          <p className="mb-10 max-w-2xl font-inter text-lg font-light text-kb-inverse-text/80 md:text-xl">A single AI worker built for one defined job—so the work runs faster, cleaner, and more consistently.</p>
          <CallButton />
        </div>
      </section>

      <section className="bg-kb-canvas px-6 pb-16 text-center sm:pb-40">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <h2 className="font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-ink sm:text-5xl md:text-6xl">What you’re hiring<br />(without hiring)</h2>
          <p className="mt-10 max-w-2xl font-space-grotesk text-lg font-light leading-tight text-kb-ink-soft sm:text-xl">Bottleneck is a <span className="text-[#FE4C00]">specific role with a job.</span> Not a chatbot. Not a generic assistant. A worker installed into your day-to-day—so one job runs reliably, without you in the middle.</p>
        </div>
      </section>

      <section className="relative z-20 mx-auto mb-16 w-full max-w-7xl bg-kb-canvas px-6 lg:mb-32">
        <div className="kb-card-shadow relative flex w-full flex-col overflow-hidden rounded-[2rem] border border-kb-line bg-kb-surface font-inter xl:flex-row">
          <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-[#FE4C00]/15 blur-[120px]"></div>
          <div className="relative z-10 w-full px-8 py-12 lg:px-14 lg:py-14 xl:w-[64%]">
            <h2 className="mb-4 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-[#FE4C00] lg:text-5xl">When it’s the right move</h2>
            <p className="mb-10 text-xl font-light tracking-tight text-kb-ink-soft lg:text-2xl">Choose Bottleneck if you can say:</p>
            <div className="space-y-8">{rightMove.map((item) => <CheckRow key={item}>{item}</CheckRow>)}</div>
          </div>
          <div className="relative z-10 w-full border-t border-kb-line bg-kb-surface-soft px-8 py-12 lg:px-12 lg:py-14 xl:w-[40%] xl:border-l xl:border-t-0">
            <h3 className="mb-6 text-2xl font-medium tracking-tight text-kb-ink lg:text-3xl">When it’s not</h3>
            <p className="mb-8 text-sm font-light leading-relaxed text-kb-ink-soft lg:text-base">Bottleneck is <span className="font-bold text-kb-accent-ink">not</span> the right move if:</p>
            <div className="space-y-6">
              <CrossRow>The real problem is across multiple teams.</CrossRow>
              <CrossRow>The pain isn’t one job—it’s the system: handoffs, visibility, follow-up, and accountability.</CrossRow>
              <CrossRow>You can’t describe the job yet—every week it’s a different ask, owner, or definition of “done.”</CrossRow>
              <CrossRow>You need multiple roles to coordinate. At that point, you’re building the operating layer <Link to="/workflow-build" className="text-kb-accent-ink">(Workflow Build)</Link>.</CrossRow>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden bg-kb-accent py-16 text-kb-on-accent lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col justify-center lg:col-span-7">
            <h2 className="mb-8 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-on-accent sm:text-6xl">Ready on day one</h2>
            <h3 className="mb-3 font-inter text-2xl font-medium tracking-tight text-kb-on-accent">Every Bottleneck is built around four things:</h3>
            <ul className="space-y-3 font-inter text-lg text-kb-on-accent">
              {['Skills:|What it’s good at (writing content, drafting financials, reconciling data)', 'Job:|What it owns day-to-day (what it does)', 'Tools:|Where it works (the tools you already use)', 'Rhythm:|When it runs (daily/weekly, always-on)'].map((item) => { const [label, copy] = item.split('|'); return <li key={label} className="grid grid-cols-[24px_1fr] items-start gap-4"><span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-kb-on-accent/30 bg-kb-on-accent/15"><img src="/in-house-assets/check-icon.png" alt="" className="h-3.5 w-3.5" /></span><span><strong>{label}</strong> <span className="font-light text-kb-on-accent/80">{copy}</span></span></li>; })}
            </ul>
          </div>
          <div className="group relative h-[260px] lg:col-span-5 lg:h-auto lg:min-h-[400px]">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-kb-inverse-muted/25 bg-kb-inverse-soft shadow-2xl">
              <img src="/in-house-assets/agent-landscape.png" alt="Sci-fi landscape" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-kb-inverse/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 p-8"><span className="inline-flex items-center gap-2 rounded-full border border-kb-inverse-muted/25 bg-kb-inverse/55 px-3 py-1.5 font-inter text-[10px] font-semibold uppercase tracking-wide text-kb-inverse-text backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-[#FE4C00] shadow-[0_0_10px_#FE4C00]"></span>Live Agent</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto w-full max-w-7xl bg-kb-canvas px-6 pb-32 pt-16">
        <div className="mb-14 text-center"><h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">Picture this</h2><p className="mx-auto mt-4 max-w-3xl font-inter text-lg font-light text-kb-ink-soft md:text-xl">Here are a few roles we can install. We’ll custom scope the exact right agent for your business.</p></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">{roles.map(([title, copy], index) => <article key={title} className="kb-card-shadow relative overflow-hidden rounded-[28px] border border-kb-line bg-kb-surface p-8 text-center transition-all hover:border-kb-line-strong"><div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at ${index % 2 ? '100% 0%' : '0% 0%'}, rgba(254,76,0,0.09), transparent 55%)` }}></div><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-kb-line bg-kb-surface-soft text-xl text-[#FE4C00] shadow-[0_0_15px_rgba(254,76,0,0.12)]">✦</span><h3 className="mt-6 font-inter text-xl font-medium tracking-tight text-kb-ink">{title}</h3><p className="mt-3 font-inter text-sm font-light text-kb-ink-soft">{copy}</p></article>)}</div>
      </section>

      <section className="mx-auto w-full max-w-7xl bg-kb-canvas px-6 pb-24">
        <h2 className="text-center font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-5xl lg:text-6xl">How it works</h2>
        <div className="relative mx-auto mt-24 max-w-5xl"><div className="absolute left-0 right-0 top-10 hidden border-t border-dashed border-kb-line-strong sm:block"></div><div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, copy], index) => <div key={title} className="flex flex-col items-center text-center"><div className="flex h-20 w-full items-center justify-center"><span className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-kb-accent font-medium text-kb-on-accent ring-4 ring-[#FE4C00]/20 shadow-[0_0_20px_rgba(254,76,0,0.28)]">{index + 1}</span></div><p className="mt-3 max-w-[200px] font-inter text-xl font-medium leading-relaxed text-kb-ink">{title}</p>{index === 3 && <p className="font-inter text-sm font-medium text-kb-ink-muted">(optional)</p>}<p className="mt-3 max-w-[210px] font-inter text-base font-light leading-relaxed text-kb-ink-soft">{copy}</p></div>)}</div><div className="mt-16 flex justify-center"><CallButton /></div></div>
      </section>

      <section className="relative overflow-hidden bg-[url('/about-assets/station-hero.jpg')] bg-cover bg-center py-24 text-kb-inverse-text"><div className="absolute inset-0 bg-kb-inverse/88"></div><div className="relative mx-auto max-w-7xl px-8"><div className="grid items-stretch gap-6 rounded-3xl border border-kb-inverse-muted/25 bg-gradient-to-br from-[#FE4C00]/10 via-kb-inverse/80 to-kb-inverse/90 p-8 shadow-2xl backdrop-blur-md sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12"><div><p className="font-space-grotesk text-2xl font-medium text-kb-inverse-text">Starts at</p><p className="font-inter text-5xl font-medium tracking-tight text-kb-inverse-text md:text-8xl">$3,000</p><p className="mt-2 font-inter"><span className="text-lg text-kb-inverse-muted">and </span><span className="text-4xl font-medium text-kb-inverse-text">$500</span><span className="text-lg text-kb-inverse-muted"> /month</span></p><p className="mt-4 font-inter text-sm text-kb-inverse-muted sm:text-base">Pre-built roles are fastest. Custom roles priced by scope.</p></div><div><h2 className="font-space-grotesk text-3xl font-medium tracking-tight text-kb-inverse-text sm:text-4xl">The expansion plan</h2><p className="mt-4 max-w-md font-inter text-sm font-light text-kb-inverse-muted">Start with one agent. If the leverage is real, you add a second role.</p><p className="mt-4 font-inter text-sm font-light text-kb-inverse-muted">When agents need to coordinate across the business, you’re no longer buying one role. You’re building the team—see <Link to="/workflow-build" className="text-[#FE4C00] underline">Workflow Build</Link>.</p><div className="mt-6"><CallButton /></div></div></div></div></section>

      <section className="bg-kb-canvas px-4 pb-24 pt-12"><div className="mx-auto max-w-6xl"><div className="mb-16 text-center"><img src="/in-house-assets/faq-icon.png" alt="" className="mx-auto mb-6 w-[4.8rem] animate-bounce" /><h2 className="font-inter text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">Frequently Asked Questions</h2></div><div className="divide-y divide-kb-line border-y border-kb-line">{faqs.map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between text-kb-ink transition-colors hover:text-kb-accent-ink"><span className="font-space-grotesk text-lg font-normal tracking-tight">{question}</span><span className="ml-4 text-2xl text-kb-ink-muted transition-transform group-open:rotate-180">⌄</span></summary><p className="pr-8 pt-4 text-lg font-light leading-relaxed text-kb-ink-soft">{answer}</p></details>)}</div></div></section>

      <section className="relative bg-kb-accent py-32 text-center text-kb-on-accent"><div className="mx-auto max-w-4xl px-4"><h2 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-on-accent sm:text-7xl">Start with the right role.</h2><p className="mx-auto mb-10 mt-6 max-w-2xl text-lg font-light text-kb-on-accent/80 sm:text-xl">15 minutes. Clear verdict. Next steps if there’s leverage.</p><Link to="/contact-form" className="inline-flex rounded-full bg-kb-inverse px-8 py-3.5 font-inter text-sm text-kb-inverse-text transition-colors hover:bg-kb-inverse-soft">Book a Call</Link></div></section>
    </>
  );
}

function CallButton() { return <Link to="/contact-form" className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">Book a Call</Link>; }
function CheckRow({ children }) { return <div className="flex items-start"><span className="mr-4 mt-1 shrink-0 text-xl text-[#FE4C00]">✓</span><span className="text-base font-light leading-relaxed text-kb-ink-soft lg:text-xl">{children}</span></div>; }
function CrossRow({ children }) { return <div className="flex items-start"><span className="mr-4 mt-0.5 shrink-0 text-xl text-kb-ink-muted">×</span><span className="text-sm font-light leading-relaxed text-kb-ink-soft lg:text-base">{children}</span></div>; }
