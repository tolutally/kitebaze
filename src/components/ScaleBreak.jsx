import { useEffect, useRef, useState } from 'react';

export default function ScaleBreak() {
  const sectionRef = useRef(null);
  const [animateNow, setAnimateNow] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setAnimateNow(true), 800);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`scale-break-section relative border-b border-kb-line bg-kb-canvas pb-0 pt-24 sm:pb-0 sm:pt-24 ${animateNow ? 'animate-now' : ''}`}
    >
      <div className="text-center max-w-7xl mr-auto mb-4 ml-auto">
        <h2 className="mb-6 mt-6 font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink md:text-6xl">
          Everything works. Until it
          <span className="inline-flex align-bottom text-kb-accent-ink mx-1 relative">
            <span className="invisible" aria-hidden="true">doesn't</span>
            <span className="split-word-top [clip-path:polygon(0_0,100%_0,100%_50%,0_50%)] font-medium font-space-grotesk w-full h-full absolute top-0 left-0 text-kb-accent-ink">breaks</span>
            <span className="split-word-line absolute left-0 top-1/2 h-[2px] w-full rounded-full bg-kb-ink text-kb-accent-ink shadow-[0_0_8px_rgba(159,107,78,0.45)]"></span>
            <span className="split-word-bottom [clip-path:polygon(0_50%,100%_50%,100%_100%,0_100%)] font-medium text-kb-accent-ink w-full h-full absolute top-0 left-0">breaks</span>
          </span>
        </h2>
        <p className="font-inter text-lg font-light text-kb-ink-soft sm:text-2xl">
          Every tool does its job. Then the work stops at the edge of it, waiting for a person to carry it to the next one. No system owns that part. So it lives in someone's memory.
        </p>
      </div>
    </section>
  );
}
