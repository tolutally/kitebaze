import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  ['AI team that runs the work', 'Your business doesn’t sleep anymore. Work moves forward while you’re offline.'],
  ['Custom system', 'A system designed for how your business actually operates.'],
  ['Human-led. AI-run.', 'AI does the heavy lifting and keeps work moving. Your team stays on strategy, judgment, and relationships.'],
  ['Real-time visibility', 'Live view of capacity, bottlenecks, and what’s at risk—no manual status chasing.'],
  ['QC on autopilot', 'Quality gets checked automatically, so your standards scale with volume.'],
  ['Built to stick', 'Migration, training, and rollout so it becomes the operating rhythm—not a side project.'],
];

const ceilingPoints = [
  'Your business has outgrown the way it currently runs.',
  'Execution is strong—but it doesn’t scale without you in the middle.',
  'You want capabilities your team can’t deliver at human speed (24/7 work, real-time checks, instant prep).',
  'You can feel the next level—but your current operating layer can’t support it.',
];

const process = [
  ['The Blueprint', 'Map the full operation + prototype what to install first.', '21 days • $5K • credited toward implementation.'],
  ['System plan', 'Define roles, handoffs, and standards—built for how you run.'],
  ['Build', 'Install AI-run systems that keep work moving—24/7—with standards built in.'],
  ['Roll Out', 'Train the team and lock it in as the operating rhythm.'],
];

function CallButton({ dark = false, children = 'Book a Call' }) {
  return <Link to="/contact-form" className={`inline-flex w-fit items-center justify-center rounded-full px-8 py-3.5 font-inter text-sm font-medium transition-colors ${dark ? 'bg-kb-inverse text-kb-inverse-text hover:bg-kb-inverse-soft' : 'bg-kb-accent text-kb-on-accent hover:bg-kb-accent-hover'}`}>{children}</Link>;
}

export default function WorkflowBuild() {
  return (
    <>
      <section className="relative overflow-hidden bg-kb-accent pb-20 pt-44 text-center text-kb-on-accent sm:pb-32 sm:pt-56">
        <div className="relative z-10 mx-auto max-w-5xl px-8">
          <h1 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-on-accent sm:text-7xl lg:text-8xl">The Team.<br />Behind the Team.</h1>
          <p className="mx-auto mb-10 mt-6 max-w-2xl font-inter text-lg font-light text-kb-on-accent/80 sm:text-xl">Your custom AI team that makes scale feel unfairly easy.</p>
          <CallButton dark />
        </div>
      </section>

      <CeilingSequence />

      <section className="relative border-t border-kb-line bg-kb-canvas py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center"><Eyebrow>What You Get</Eyebrow><h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">We build everything you need to scale</h2></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{benefits.map(([title, copy]) => <article key={title} className="kb-card-shadow rounded-3xl border border-kb-line bg-kb-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-kb-surface-soft"><span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-kb-accent-soft text-2xl text-kb-accent-ink">✦</span><h3 className="mb-3 font-space-grotesk text-2xl font-normal tracking-tight text-kb-ink">{title}</h3><p className="font-inter text-base font-extralight leading-relaxed text-kb-ink-soft">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-kb-line bg-kb-canvas py-24">
        <img src="/workflow-assets/operations-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.25] [mask-image:linear-gradient(to_right,transparent_15%,black_55%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-kb-canvas via-kb-canvas/95 to-transparent md:w-[65%]"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-xl"><Eyebrow>Why Choose Us</Eyebrow><h2 className="mb-6 font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-ink sm:text-6xl">AI that holds up in the real world.</h2><p className="mb-10 font-inter text-lg font-light leading-relaxed text-kb-ink-soft">We’re a team of operators and AI builders installing custom systems that run your operations. Not experiments. Not prompt packs. Not another tool your team has to babysit. This is AI wired into how your business actually works—so output climbs, standards hold, and key people stop being the bottleneck.</p><ul className="mb-10 space-y-4">{['Operator built', 'Custom fit', 'Results led'].map(item => <li key={item} className="flex items-center gap-4 font-inter text-lg font-extralight text-kb-ink"><img src="/workflow-assets/check.png" alt="" className="h-6 w-6" />{item}</li>)}</ul><CallButton /></div></div>
      </section>

      <section className="border-t border-kb-line bg-kb-surface-soft py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 grid gap-10 text-center sm:grid-cols-3">{[['70+', 'Projects Completed'], ['99%', 'Satisfaction Rate'], ['≤ 7 Months', 'Pays For Itself']].map(([value, label]) => <div key={label}><p className="font-space-grotesk text-5xl font-medium text-kb-accent-ink sm:text-6xl">{value}</p><p className="mt-2 font-inter text-kb-ink-muted">{label}</p></div>)}</div>
          <div className="mb-12"><Eyebrow>Community</Eyebrow><h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">Loved by leaders.<br />Trusted by teams.</h2><p className="mt-5 font-inter font-light text-kb-ink-muted">Real use. Real outcomes. No theater.</p></div>
          <div className="kb-card-shadow relative flex flex-col items-center overflow-hidden rounded-3xl border border-kb-line bg-kb-surface p-6 md:p-12 lg:flex-row lg:gap-16">
            <div className="w-full lg:w-[45%]"><div className="mx-auto aspect-square max-w-[320px] overflow-hidden rounded-[2rem] bg-kb-surface-raised p-2"><img src="/workflow-assets/ryan-estes.jpg" alt="Ryan Estes" className="h-full w-full rounded-[1.8rem] object-cover" /></div></div>
            <div className="w-full px-2 py-8 lg:w-[55%]"><div className="mb-6 flex items-center justify-between"><span className="text-5xl text-kb-accent-ink">“</span><a href="https://www.youtube.com/watch?v=JEUYBVIHG1s" target="_blank" rel="noreferrer" className="rounded-full bg-kb-accent px-6 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">View Testimonial</a></div><blockquote className="pb-8 font-space-grotesk text-3xl font-normal leading-tight tracking-tight text-kb-ink sm:text-4xl">If you’re looking to build a machine around your offer, these are the guys for you.</blockquote><div className="border-t border-kb-line pt-8"><h3 className="font-space-grotesk text-xl font-medium text-kb-ink">Ryan Estes</h3><p className="mt-2 font-inter font-light text-kb-ink-muted">Owner, Inbox Alchemy</p></div></div>
          </div>
        </div>
      </section>

      <section className="border-t border-kb-line bg-kb-canvas py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-20 max-w-3xl text-center"><Eyebrow>Our Process</Eyebrow><h2 className="font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">How we work</h2></div><div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4"><div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-kb-accent/45 to-transparent lg:block"></div>{process.map(([title, copy, note], index) => <article key={title} className="relative text-center"><div className={`relative z-10 mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border font-space-grotesk text-4xl shadow-lg ${index === 3 ? 'border-kb-accent/30 bg-kb-accent-soft text-kb-accent-ink' : 'border-kb-line-strong bg-kb-surface text-kb-ink'}`}>{index + 1}</div><h3 className="mb-3 font-space-grotesk text-2xl font-medium text-kb-ink">{title}</h3><p className="font-inter text-base font-light leading-relaxed text-kb-ink-soft">{copy}{note && <span className="mt-4 block text-sm text-kb-ink-muted">{note}</span>}</p></article>)}</div></div>
      </section>

      <section className="border-t border-kb-line bg-kb-canvas px-6 py-28 text-center"><h2 className="workflow-shimmer font-space-grotesk text-5xl font-medium leading-[1.05] tracking-tight lg:text-[76px]">Read the case studies.</h2><Link to="/case-studies" className="mt-8 inline-flex rounded-full bg-kb-accent px-8 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">Read Now</Link></section>

      <section className="relative border-t border-kb-line bg-kb-canvas"><div className="absolute right-0 top-0 hidden h-[85%] w-1/2 bg-kb-accent md:block"></div><div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid md:grid-cols-2"><div className="bg-kb-canvas py-20 md:py-32 md:pr-12"><h2 className="font-space-grotesk text-5xl font-medium leading-[1.1] tracking-tight text-kb-ink sm:text-6xl lg:text-7xl">What your business looks like on the other side.</h2></div><div className="-mx-4 bg-kb-accent px-6 py-16 text-kb-on-accent sm:-mx-6 md:mx-0 md:bg-transparent md:py-32 md:pl-16"><h2 className="mb-8 font-space-grotesk text-5xl font-medium leading-[1.1] tracking-tight text-kb-on-accent">This isn’t about efficiency. It’s about what your business becomes capable of.</h2><ul className="space-y-2">{["Output goes up, headcount doesn’t", 'Key people stop being bottlenecks.', 'You scale for a fraction of the cost.', 'You see what’s coming before anyone else.'].map(item => <li key={item} className="flex items-center gap-4 font-inter text-lg font-light text-kb-on-accent"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-kb-on-accent/30 bg-kb-on-accent/15">✓</span>{item}</li>)}</ul></div></div><div className="relative z-20 pb-24"><div className="relative aspect-[2.5/1] overflow-hidden rounded-3xl shadow-[0_24px_70px_rgba(63,48,36,0.16)]"><img src="/workflow-assets/operations-bg.png" alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-kb-inverse/25"></div></div></div></div></section>

      <section className="bg-kb-accent py-32 text-center text-kb-on-accent"><div className="mx-auto max-w-4xl px-4"><h2 className="font-space-grotesk text-5xl font-medium tracking-tight text-kb-on-accent sm:text-7xl">Ready to transform your business?</h2><p className="mx-auto mb-10 mt-6 max-w-2xl text-lg font-light text-kb-on-accent/80 sm:text-xl">Book a free strategy call today and discover how AI can help you scale.</p><CallButton dark>Book a Strategy Call</CallButton></div></section>
    </>
  );
}

function Eyebrow({ children }) { return <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-kb-line-strong bg-kb-surface px-3 py-1.5 font-space-grotesk text-xs font-medium uppercase tracking-widest text-kb-ink-soft"><span className="h-2 w-2 rounded-full bg-kb-accent"></span>{children}</div>; }

function CeilingSequence() {
  const sectionRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let frameId;
    const update = () => {
      frameId = undefined;
      const section = sectionRef.current;
      if (!section || window.innerWidth < 640) return;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setVisibleCount(Math.min(4, Math.floor(progress * 4.25 + 0.12)));
    };
    const onScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-auto border-t border-kb-line bg-kb-canvas sm:h-[320vh]">
      <div className="relative overflow-hidden px-5 py-20 sm:sticky sm:top-0 sm:h-screen sm:px-8 sm:py-0">
        <img src="/workflow-assets/operations-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover grayscale opacity-55" />
        <div className="absolute inset-0 bg-kb-canvas/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-kb-canvas/35 via-transparent to-kb-canvas/85"></div>
        <div className="relative z-10 mx-auto h-full max-w-[1800px]">
          <h2 className="text-center font-space-grotesk text-5xl font-medium tracking-tight text-kb-ink drop-shadow-[0_2px_12px_rgba(255,252,247,0.8)] sm:absolute sm:inset-x-0 sm:top-[18%] sm:text-7xl lg:text-[6rem]">You’re at the ceiling</h2>
          <div className="mt-14 flex flex-col gap-5 sm:mt-0 sm:block">
            {ceilingPoints.map((point, index) => (
              <p
                key={point}
                className={`rounded-[1.7rem] border border-kb-line-strong/80 bg-kb-surface/80 p-7 font-inter text-lg font-light leading-[1.45] text-kb-ink shadow-[0_20px_60px_rgba(58,40,24,0.14)] backdrop-blur-xl transition-all duration-500 ease-out sm:absolute sm:w-[43%] sm:p-8 lg:text-[1.85rem] ${[
                  'sm:left-[4%] sm:top-[34%]',
                  'sm:right-[4%] sm:top-[45%]',
                  'sm:left-[4%] sm:top-[61%]',
                  'sm:right-[4%] sm:top-[72%]',
                ][index]} ${visibleCount > index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} max-sm:translate-y-0 max-sm:opacity-100`}
              >
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
