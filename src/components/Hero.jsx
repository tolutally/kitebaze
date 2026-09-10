import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroFlowOverlay from './HeroFlowOverlay.jsx';

const startingPoints = [
  { label: 'Build my workflow', to: '/workflow-build' },
  { label: 'Fix one bottleneck', to: '/bottleneck' },
  { label: 'See case studies', to: '/case-studies' },
  { label: 'Talk to Kitebaze', to: '/contact-form' },
];

export default function Hero() {
  const phrase = "what's missing";
  const [prompt, setPrompt] = useState('');
  const [videoLoopKey, setVideoLoopKey] = useState(0);
  const videoRef = useRef(null);

  const handlePromptSubmit = (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    // TODO: wire up to Botpress (e.g. open webchat and send this message)
    setPrompt('');
  };

  // restart the overlay animation only when the video actually loops, not on its own timer
  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
    }
    setVideoLoopKey((key) => key + 1);
  };

  return (
    <section className="relative isolate min-h-[calc(100svh+30rem)] overflow-hidden border-b border-kb-line bg-kb-canvas md:min-h-[calc(100svh+17.5rem)]">
      <div className="absolute inset-x-0 bottom-16 top-0 overflow-hidden bg-kb-inverse sm:bottom-20">
        <video
          ref={videoRef}
          className="pointer-events-none h-full w-full object-cover object-center"
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onEnded={handleVideoEnded}
        >
          <source src="/hero-video-done.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-kb-inverse/40"></div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-kb-inverse/45 via-kb-inverse/10 to-kb-inverse/80"></div>
        <HeroFlowOverlay
          key={videoLoopKey}
          askIndex={videoLoopKey}
          className="hidden md:block"
          style={{
            '--kb-hero-flow-ink': 'var(--kb-ink)',
            '--kb-hero-flow-mid': 'var(--kb-ink-soft)',
            '--kb-hero-flow-rule': 'var(--kb-line-strong)',
            '--kb-hero-flow-card': 'var(--kb-surface)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-transparent via-kb-inverse/70 to-kb-inverse"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh+30rem)] w-full max-w-7xl items-end justify-center px-4 pb-0 pt-40 md:min-h-[calc(100svh+17.5rem)] sm:px-8 lg:px-10">
        <div className="w-full text-center">
          <p className="mx-auto mb-4 font-inter text-sm font-semibold uppercase tracking-[0.16em] text-kb-accent-light">
            We build it. Then we keep it running.
          </p>

          <h1 className="mx-auto whitespace-nowrap font-space-grotesk text-[clamp(0.95rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.035em] text-kb-inverse-text">
            <span>Keep what works. We connect </span>
            <span className="relative inline-flex items-center bg-kb-accent px-[0.2em] py-[0.08em] text-kb-on-accent">
              {phrase}
            </span>
            <span>.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-6xl text-center font-inter text-sm font-light leading-relaxed text-kb-inverse-text/85 sm:text-base md:text-lg">
            Your scheduling, accounting, documents and email already work — they just don’t talk to each other. We connect what you already pay for and take the manual work out from between them.
          </p>

          <div className="mx-auto mt-14 w-full max-w-5xl sm:mt-8">
            <p className="px-1 pb-2 text-center font-inter text-sm font-medium uppercase tracking-[0.16em] text-kb-accent-light sm:px-0">Try it — no signup</p>
            <div className="rounded-[1.75rem] border border-white/25 bg-kb-surface-raised/75 p-4 text-left shadow-[0_24px_70px_rgba(20,15,12,0.3)] backdrop-blur-2xl sm:p-5 lg:p-6">
            <form onSubmit={handlePromptSubmit} className="flex min-h-14 w-full items-center gap-4 rounded-[1.15rem] bg-kb-surface px-4 py-3 shadow-sm sm:min-h-16 sm:px-5">
              <input
                type="text"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Describe your most manual task"
                aria-label="Describe your most manual task"
                className="min-w-0 flex-1 bg-transparent font-inter text-sm font-normal text-kb-ink placeholder:text-kb-ink outline-none sm:hidden"
              />
              <input
                type="text"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Describe your most manual task"
                aria-label="Describe your most manual task"
                className="hidden min-w-0 flex-1 bg-transparent font-inter text-sm font-normal text-kb-ink placeholder:text-kb-ink outline-none sm:block sm:text-lg"
              />
              <button
                type="submit"
                aria-label="Submit"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-kb-surface-raised text-xl text-kb-ink transition-all hover:bg-kb-accent hover:text-kb-on-accent"
              >
                ↗
              </button>
            </form>

            <div className="px-1 pb-1 pt-5 sm:px-0 sm:pt-6">
              <p className="font-inter text-sm font-normal text-kb-ink-soft sm:text-base">You’ll get a real answer, not a sales sequence.</p>
              <nav aria-label="Ways to get started" className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
                {startingPoints.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group inline-flex min-h-11 flex-1 items-center justify-between gap-3 whitespace-nowrap rounded-full bg-kb-surface/80 px-4 py-2 font-inter text-sm font-normal text-kb-ink transition-colors hover:bg-kb-surface sm:flex-none sm:px-5"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true" className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </Link>
                ))}
              </nav>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
