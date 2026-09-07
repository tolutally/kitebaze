export default function Results() {
  return (
    <section className="relative z-10 overflow-hidden border-t border-kb-inverse-muted/20 bg-kb-inverse text-kb-inverse-text">
      <div className="absolute inset-0 z-0">
        <img
        src="/recovered-assets/11b56623-2d13-48c7-8d18-f1b905e6be2b_3840w.png"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kb-inverse/75 via-kb-inverse/10 to-kb-inverse/35"></div>
      </div>
      <div className="sm:px-6 lg:px-8 sm:py-32 max-w-max z-10 mr-auto ml-auto pt-24 pr-4 pb-24 pl-4 relative">
        <div className="fade-up-element mb-12">
          <h2 className="mb-4 font-space-grotesk text-4xl font-medium tracking-tight text-kb-inverse-text sm:text-6xl">The manual work hiding inside your business.</h2>
          <p className="text-base font-light text-kb-inverse-muted sm:text-lg">The repeated tasks and handoffs quietly costing your team time.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-6xl gap-x-4 gap-y-4" data-element-id="aura-empfw44jo23478usw">
          <div className="rounded-2xl border border-kb-inverse-muted/35 bg-kb-inverse-soft/65 px-6 py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/30 sm:p-8">
            <div className="text-5xl sm:text-6xl font-bold text-[#FE4C00] tracking-tight font-grotesk mb-4">4-6</div>
            <p className="mb-1 text-base font-medium leading-tight text-kb-inverse-text">Steps in a job need no decision</p>
            <p className="text-base font-light leading-tight text-kb-inverse-muted">Someone reads it here and types it there. About three in five steps are just moving information.</p>
          </div>
          <div className="rounded-2xl border border-kb-inverse-muted/35 bg-kb-inverse-soft/65 px-6 py-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/30 sm:p-8">
            <div className="text-5xl sm:text-6xl font-bold text-[#FE4C00] tracking-tight font-grotesk mb-4">60-80%</div>
            <p className="text-base leading-tight text-kb-inverse-text">
              <span className="font-medium text-[#FE4C00]">Manual steps we target removing</span>
              <span className="font-light text-kb-inverse-muted"> That's the goal we set per workflow, not a promise. We tell you upfront which parts are worth automating and which aren't.</span>
            </p>
          </div>
          <div className="rounded-2xl bg-kb-accent p-6 text-kb-on-accent transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-black/25 sm:p-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-kb-on-accent">
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
              <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
              <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
              <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
              <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
              <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
            </svg>
            <span className="mb-4 font-grotesk text-5xl font-bold tracking-tight text-kb-on-accent sm:text-6xl">100%</span>
            <p className="mb-4 mt-4 text-lg font-semibold leading-tight text-kb-on-accent sm:text-xl">Of consequential actions need your yes</p>
            <p className="text-sm font-light leading-relaxed text-kb-on-accent/85">Anything touching a customer, a document or money waits for approval. Every run is logged.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
