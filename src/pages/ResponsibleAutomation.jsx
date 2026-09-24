import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const principles = [
  {
    id: 'human-control',
    title: 'Human Control',
    tagline: 'People stay in charge where it matters.',
    paragraphs: [
      'Automation should remove unnecessary work, not necessary judgment.',
      'We design clear points for review, approval, intervention, and escalation. When something falls outside the normal process, the system should know when to continue, when to stop, and when to hand the work to a person.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    tagline: 'Access should have a purpose.',
    paragraphs: [
      'Automations often connect systems that previously operated separately.',
      'We design around appropriate permissions, authentication, credential handling, and access controls wherever practical. Systems and integrations should have the access they need to do their job — not more.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    tagline: 'Use the data the work actually needs.',
    paragraphs: [
      'A workflow should not require unnecessary access to customer, employee, or business information.',
      'We aim to limit the information systems access, move, and retain to what is reasonably required for the work they are designed to perform.',
      'Where third-party services are involved, we also consider what information needs to leave the client’s existing systems and why.',
    ],
  },
  {
    id: 'reliability',
    title: 'Reliability',
    tagline: 'The happy path isn’t enough.',
    paragraphs: [
      'Real work has exceptions.',
      'Information goes missing. Customers reply unexpectedly. Payments fail. Integrations go down. Someone changes the spreadsheet.',
      'We build with those realities in mind, including the exceptions, handoffs, failures, and edge cases that determine whether a workflow actually works after launch.',
    ],
  },
  {
    id: 'transparency',
    title: 'Transparency',
    tagline: 'You should understand what is running your work.',
    paragraphs: [
      'We don’t want to leave clients with a black box.',
      'We aim to make it clear what has been automated, which systems are connected, what information moves between them, where AI is being used when relevant, and where people remain responsible for decisions or approvals.',
      'A useful system should be understandable enough to operate, oversee, and improve.',
    ],
  },
  {
    id: 'accountability',
    title: 'Accountability',
    tagline: 'Responsibility should stay visible.',
    paragraphs: [
      'Automation should not make ownership disappear.',
      'We design workflows so it is clear what the system is responsible for, where human responsibility begins, who owns exceptions, and what happens when something goes wrong.',
      'The goal is not simply to make work happen automatically. It is to make the work easier to follow and manage.',
    ],
  },
  {
    id: 'ai-use',
    title: 'AI Use',
    tagline: 'The technology should follow the problem.',
    paragraphs: [
      'We use AI when it improves the work — not simply because a process can technically use it.',
      'Some jobs are better handled with rules, integrations, and conventional automation. Others benefit from AI because the work involves language, documents, classification, extraction, or information that is not perfectly structured.',
      'When AI is appropriate, we consider its limitations, the information it receives, the consequences of incorrect outputs, and where human review should remain part of the process.',
    ],
  },
];

function PrincipleIcon({ type, className = 'h-8 w-8' }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };

  if (type === 'human-control') return <svg {...props}><circle cx="9" cy="7" r="3"/><path d="M3.5 20v-2.5A5.5 5.5 0 0 1 9 12h1"/><path d="m14 15 2 2 4-5"/></svg>;
  if (type === 'security') return <svg {...props}><path d="M12 2 20 6v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z"/><path d="m8.5 12 2.25 2.25L15.5 9.5"/></svg>;
  if (type === 'privacy') return <svg {...props}><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2"/></svg>;
  if (type === 'reliability') return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>;
  if (type === 'transparency') return <svg {...props}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>;
  if (type === 'accountability') return <svg {...props}><circle cx="10" cy="7" r="3"/><path d="M4 20v-2a6 6 0 0 1 6-6h1"/><path d="M16 13v6M13 16h6"/></svg>;
  return <svg {...props}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/><circle cx="12" cy="12" r="4"/><path d="m10.5 12 1 1 2-2"/></svg>;
}

function PrinciplesGraphic() {
  return (
    <figure className="my-14 border-y border-kb-line py-10 sm:my-16 sm:py-12" aria-labelledby="principles-graphic-title">
      <figcaption id="principles-graphic-title" className="text-center font-space-grotesk text-xl font-medium tracking-tight text-kb-ink sm:text-2xl">Our Responsible Automation Principles</figcaption>
      <div className="relative mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
        <div className="absolute left-[7%] right-[7%] top-9 hidden h-px bg-kb-accent/30 lg:block"></div>
        {principles.map((principle) => (
          <a key={principle.id} href={`#${principle.id}`} className="group relative z-10 flex min-w-0 flex-col items-center text-center">
            <span className="flex h-[72px] w-full max-w-[112px] items-center justify-center rounded-xl border border-kb-accent-hover/30 bg-gradient-to-br from-kb-accent-light to-kb-accent text-kb-on-accent shadow-[0_9px_20px_rgba(159,107,78,0.24)] transition-transform duration-300 group-hover:-translate-y-1">
              <PrincipleIcon type={principle.id} />
            </span>
            <span className="mt-3 font-space-grotesk text-xs font-medium leading-tight text-kb-ink-soft">{principle.title}</span>
          </a>
        ))}
      </div>
    </figure>
  );
}

export default function ResponsibleAutomation() {
  const [activePrinciple, setActivePrinciple] = useState(principles[0].id);

  useEffect(() => {
    const sections = principles
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActivePrinciple(visible[0].target.id);
    }, { rootMargin: '-24% 0px -62% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-kb-canvas pb-24 pt-36 text-kb-ink sm:pb-32 sm:pt-44">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 lg:px-8">
        <aside className="rounded-2xl border border-kb-line bg-kb-surface p-5 shadow-sm lg:sticky lg:top-32 lg:p-6">
          <p className="mb-5 font-space-grotesk text-xs font-medium text-kb-ink">Navigate to content</p>
          <nav aria-label="Responsible Automation principles" className="grid gap-1.5 sm:grid-cols-2 lg:block lg:space-y-1.5">
            {principles.map((principle) => (
              <a key={principle.id} href={`#${principle.id}`} aria-current={activePrinciple === principle.id ? 'location' : undefined} className={`block border-l-2 px-3 py-2 font-inter text-xs font-light transition-colors ${activePrinciple === principle.id ? 'border-kb-accent text-kb-accent-ink' : 'border-kb-line text-kb-ink-muted hover:border-kb-accent/50 hover:text-kb-ink'}`}>{principle.title}</a>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-kb-line pb-12">
            <h1 className="font-space-grotesk text-xs font-medium uppercase tracking-[0.2em] text-kb-accent-ink">Responsible Automation</h1>
            <h2 className="mt-5 max-w-3xl font-space-grotesk text-5xl font-medium leading-[1.04] tracking-tight text-kb-ink sm:text-6xl lg:text-7xl">Better systems should be easier to trust.</h2>
            <div className="mt-8 max-w-3xl space-y-5 font-inter text-base font-light leading-8 text-kb-ink-soft">
              <p>Kitebaze builds workflows, automations, and connected systems that take repetitive work off people’s hands and help businesses run more reliably.</p>
              <p>Some solutions use straightforward rules and integrations. Others use AI where it genuinely improves the work. Whatever sits underneath, our approach stays the same: automate what should be automated, keep people involved where judgment matters, and build around how the business actually operates.</p>
              <p>We use seven principles to guide how we design, build, and deploy systems for our clients.</p>
            </div>
          </header>

          <PrinciplesGraphic />

          <div className="divide-y divide-kb-line">
            {principles.map((principle) => (
              <section id={principle.id} key={principle.id} className="scroll-mt-32 py-12 sm:py-14">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-kb-accent/20 bg-kb-accent-soft text-kb-accent-ink"><PrincipleIcon type={principle.id} className="h-6 w-6" /></span>
                  <h2 className="font-space-grotesk text-3xl font-medium tracking-tight text-kb-ink sm:text-4xl">{principle.title}</h2>
                </div>
                <h3 className="mt-7 font-playfair text-2xl font-normal italic leading-tight text-kb-accent-ink sm:text-3xl">{principle.tagline}</h3>
                <div className="mt-6 max-w-3xl space-y-4 font-inter text-[15px] font-light leading-7 text-kb-ink-soft sm:text-base sm:leading-8">
                  {principle.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-[2rem] border border-kb-line bg-kb-surface-soft px-6 py-14 text-center sm:px-10 sm:py-16">
            <h2 className="font-space-grotesk text-4xl font-medium leading-tight tracking-tight text-kb-ink sm:text-5xl">Built for the work behind the workflow.</h2>
            <div className="mx-auto mt-6 max-w-2xl space-y-4 font-inter text-base font-light leading-8 text-kb-ink-soft">
              <p>Good automation isn’t about removing people from everything.</p>
              <p>It’s about taking repetitive work off their hands, making the process more reliable, and keeping the right controls where they matter.</p>
            </div>
            <p className="mt-7 font-space-grotesk text-xl font-medium text-kb-ink">Fix the work. Not just the software.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">See how we work</Link>
              <Link to="/privacy-policy" className="font-inter text-sm font-medium text-kb-accent-ink underline decoration-kb-accent/30 underline-offset-4 transition-colors hover:text-kb-accent-hover">Read our Privacy Policy</Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
