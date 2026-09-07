import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const beliefs = [
  {
    title: 'Systems over hustle',
    bullets: [
      'Operators deserve to run a business with clarity and control—not constant context switching and late-night follow-ups.',
      "Most companies don't hit a strategy ceiling. They hit an operating ceiling.",
      "Moving tools around doesn't fix it. Systems have to run without manual enforcement.",
      "AI is the lever, but only when it's installed inside how you actually operate.",
    ],
  },
  {
    title: 'Operations before automation',
    bullets: [
      'Map the work before choosing the tools.',
      'Automation should remove friction, not hide a broken process.',
      'Every system has to hold up when the exceptions arrive.',
    ],
  },
  {
    title: 'AI as leverage',
    bullets: [
      'AI should live inside the way your business actually operates.',
      'The best systems make good execution repeatable without constant oversight.',
      'Technology creates leverage when people can trust it to do the work.',
    ],
  },
];

const people = [
  {
    name: 'Jason Katz',
    role: 'Co-Founder',
    image: '/about-assets/jason-katz.jpg',
    bio: 'Jason has built, led, and exited companies ranging from $50M to $2B and is currently scaling another to $200M+. Over 17 years, Jason has worked at the intersection of technology, strategy, and operations—building the systems behind growth, not just advising on it. Jason builds AI systems and the underlying operating infrastructure, with the work grounded in how businesses actually run—so implementation holds up outside a demo.',
  },
  {
    name: 'Leigh Buckley',
    role: 'Co-Founder',
    image: '/about-assets/leigh-buckley.jpg',
    bio: 'Leigh brings an operator’s eye to every engagement—turning complex processes into clear systems that teams can actually run. Her work connects strategy, people, and implementation so the new operating model lasts beyond launch.',
  },
];

export default function AboutPage() {
  const [belief, setBelief] = useState(0);
  const [person, setPerson] = useState(0);
  const active = people[person];

  const shiftBelief = (direction) => {
    setBelief((current) => (current + direction + beliefs.length) % beliefs.length);
  };

  return (
    <div className="min-h-screen bg-kb-canvas text-kb-ink">
      <Header />
      <main>
        <section className="about-hero relative flex min-h-[585px] items-center justify-center overflow-hidden border-b border-kb-line text-kb-inverse-text">
          <img src="/about-assets/station-hero.jpg" alt="Grand Central station" className="absolute inset-0 h-full w-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-kb-inverse/90 via-kb-inverse/30 to-kb-inverse/55"></div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 text-center">
            <h1 className="font-space-grotesk text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tight">The Spark.</h1>
            <p className="mx-auto mt-6 max-w-4xl text-lg font-light leading-relaxed text-kb-inverse-text/80 sm:text-2xl">Before the build, there’s a spark: the moment you admit the current way won’t scale. Here’s what we’re doing about it—and who we are.</p>
            <a href="https://calendly.com/kindling-solutions/kindling-solutions" className="mt-9 inline-flex items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover">Book a Call</a>
          </div>
        </section>

        <section className="flex min-h-[640px] items-start justify-center border-b border-kb-line bg-kb-canvas px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-[1420px] text-center">
            <h2 className="mx-auto font-space-grotesk text-[2.7rem] font-normal leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[5.35rem]">
              AI that holds up in the real<span className="hidden lg:inline"><br /></span><span className="lg:hidden"> </span>world. <span className="text-[#FE4C00]">Built by operators who<span className="hidden lg:inline"><br /></span><span className="lg:hidden"> </span>have been in your seat.</span>
            </h2>
            <p className="mx-auto mt-12 max-w-4xl font-light leading-[1.25] text-kb-ink-soft sm:text-2xl lg:text-[2rem]">We build AI-run operations for operators who want<br className="hidden sm:block" /> the next level without the chaos tax.</p>
          </div>
        </section>

        <section className="border-b border-kb-line bg-kb-canvas px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-[1720px]">
            <h2 className="font-space-grotesk text-[3.25rem] font-normal leading-[1.03] tracking-[-0.045em] sm:text-7xl lg:text-[5.4rem]">
              Stop being the glue.<br /><span className="text-[#FE4C00]">Build the machine.</span>
            </h2>
            <p className="mt-10 max-w-[1160px] text-lg font-light leading-[1.65] text-kb-ink-soft sm:text-2xl lg:text-[1.75rem]">Kitebaze builds AI-powered operations that run underneath the business—so execution<br className="hidden xl:block" /> compounds, quality holds, and the business keeps moving when you’re not there to push it.</p>

            <div className="kb-card-shadow mt-24 overflow-hidden rounded-[2rem] border border-kb-line bg-kb-surface sm:mt-36">
              <div className="relative min-h-[485px] px-7 py-12 sm:px-14 sm:py-16">
                <div className="absolute right-7 top-12 flex items-center gap-2 sm:right-14 sm:top-16">
                  {beliefs.map((item, index) => (
                    <span key={item.title} className={`block h-2 rounded-full transition-all ${belief === index ? 'w-14 bg-kb-accent' : 'w-3 bg-kb-line'}`}></span>
                  ))}
                </div>
                <p className="text-lg font-medium text-kb-accent-ink sm:text-xl">What we believe</p>
                <h3 className="mt-9 max-w-4xl font-space-grotesk text-4xl font-medium tracking-[-0.035em] sm:text-5xl">{beliefs[belief].title}</h3>
                <ul className="mt-9 max-w-[1450px] space-y-5 text-lg font-light leading-relaxed text-kb-ink-soft sm:text-2xl">
                  {beliefs[belief].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-5"><span className="mt-[0.65em] h-2.5 w-2.5 shrink-0 rounded-full bg-kb-accent"></span><span>{bullet}</span></li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between border-t border-kb-line px-7 py-8 sm:px-14 sm:py-9">
                <div className="flex gap-3">
                  <button onClick={() => shiftBelief(-1)} aria-label="Previous belief" className="flex h-16 w-16 items-center justify-center rounded-2xl border border-kb-line-strong bg-kb-surface-soft text-2xl text-kb-ink transition-colors hover:border-kb-accent sm:h-20 sm:w-20">←</button>
                  <button onClick={() => shiftBelief(1)} aria-label="Next belief" className="flex h-16 w-16 items-center justify-center rounded-2xl bg-kb-accent text-2xl text-kb-on-accent transition-colors hover:bg-kb-accent-hover sm:h-20 sm:w-20">→</button>
                </div>
                <span className="text-lg text-kb-ink-muted sm:text-xl">{belief + 1}/{beliefs.length}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-kb-line bg-kb-surface-soft px-6 py-28 sm:py-36">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-space-grotesk text-5xl sm:text-7xl font-medium tracking-tight">Built by Operators.</h2>
            <p className="mt-5 max-w-3xl text-lg font-light text-kb-ink-soft sm:text-2xl">Led by the people who’ve scaled businesses—and can actually install what they recommend.</p>
            <div className="mt-16 grid sm:grid-cols-2 gap-6">
              {people.map((item, index) => (
                <button key={item.name} onClick={() => setPerson(index)} className={`group relative min-h-[540px] overflow-hidden rounded-3xl border text-left ${person === index ? 'border-kb-accent' : 'border-kb-line-strong'} transition-colors`}>
                  <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-kb-inverse via-kb-inverse/10 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 p-8 text-kb-inverse-text sm:p-10"><h3 className="font-space-grotesk text-3xl font-medium">{item.name}</h3><p className="mt-1 text-kb-inverse-muted">{item.role}</p></div>
                </button>
              ))}
            </div>
            <div className="kb-card-shadow mt-10 grid gap-8 rounded-3xl border border-kb-line bg-kb-surface p-8 sm:p-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
              <div><h3 className="font-space-grotesk text-4xl font-medium text-[#FE4C00]">{active.name}</h3><p className="mt-2 text-kb-ink-muted">{active.role}</p></div>
              <p className="text-lg font-light leading-relaxed text-kb-ink-soft sm:text-xl">{active.bio}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
