export default function CTA() {
  return (
    <div className="sm:px-6 lg:px-8 z-10 text-center max-w-7xl mr-auto ml-auto pr-4 pl-4 relative">
      <div className="fade-up-element flex flex-col sm:flex-row gap-x-4 gap-y-4 items-center justify-center">
        <a href="https://calendly.com/kindling-solutions/kindling-solutions" target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center justify-center rounded-full bg-kb-accent pb-3.5 pl-8 pr-8 pt-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover sm:w-auto">Show Us Your Workflow</a>
      </div>
      <p className="typography-reveal mb-12 ml-auto mr-auto max-w-5xl text-center text-base leading-relaxed text-kb-ink-soft sm:text-2xl">
        <span className="overflow-hidden inline-block align-bottom -mb-1 font-inter max-w-6xl pt-0 pb-0">
          <span className="reveal-text inline-block font-inter max-w-6xl mt-8">You don't need to know what integration, automation or AI you need. Show us how the work happens today. We'll tell you what should stay, what should connect, and what can run itself.</span>
        </span>
      </p>
    </div>
  );
}
