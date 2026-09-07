import { useEffect, useState } from 'react';

export default function Hero() {
  const phrase = "what's missing";
  const [typedPhrase, setTypedPhrase] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedPhrase(phrase);
      return undefined;
    }

    let cancelled = false;
    let timer;
    const wait = (delay) => new Promise((resolve) => { timer = window.setTimeout(resolve, delay); });

    const animate = async () => {
      while (!cancelled) {
        for (let index = 1; index <= phrase.length && !cancelled; index += 1) {
          setTypedPhrase(phrase.slice(0, index));
          await wait(95);
        }
        await wait(1800);
        for (let index = phrase.length - 1; index >= 0 && !cancelled; index -= 1) {
          setTypedPhrase(phrase.slice(0, index));
          await wait(55);
        }
        await wait(500);
      }
    };

    animate();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative flex overflow-hidden border-b border-kb-line bg-kb-canvas pb-16 pt-32 sm:pt-40 md:pb-20 md:pt-48">
      <div className="sm:px-10 lg:px-16 z-10 w-full max-w-7xl mr-auto ml-auto px-6 relative">
        <div className="max-w-8xl text-center">
          <h1 className="mt-8 text-center font-space-grotesk text-4xl font-medium leading-[1.05] tracking-tight text-kb-ink sm:text-5xl md:text-6xl lg:text-8xl">
            Keep what works. We
            <br />
            <span className="inline-block align-middle">connect&nbsp;</span>
            <span className="mt-3 inline-flex min-w-[14.5ch] items-center justify-start whitespace-nowrap bg-kb-accent px-5 py-1 text-kb-on-accent sm:px-6 sm:py-0" aria-label={phrase}>
              <span aria-hidden="true">{typedPhrase}</span><span className="hero-typewriter-cursor" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="mb-10 mt-8 max-w-7xl text-center font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-xl">
            Kitebaze connects the software you already pay for — scheduling, accounting, documents, email, spreadsheets —<br className="hidden sm:block" /> so nobody has to move do things manually anymore.
          </p>
          <a href="https://calendly.com/kindling-solutions/kindling-solutions" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent pb-3.5 pl-8 pr-8 pt-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover sm:w-auto">Show Us Your Workflow</a>
        </div>
      </div>
    </section>
  );
}
