export default function StopStitching() {
  return (
    <section className="relative z-10 ml-auto mr-auto max-w-7xl overflow-visible border-b border-kb-line bg-kb-canvas pb-4 pl-6 pr-6 pt-0">
      <div className="flex mt-32 z-20 relative justify-center">
        <div className="flex relative items-center justify-center">
          <div className="absolute -top-32 h-32 w-[2px] bg-gradient-to-b from-transparent via-[#FE4C00]/50 to-[#FE4C00] shadow-[0_0_20px_#FE4C00] overflow-hidden">
            <div className="absolute inset-0 h-1/2 w-full animate-[scanner_2s_linear_infinite] bg-kb-inverse-text/60 blur-[2px]"></div>
          </div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#FE4C00]/30 bg-kb-inverse shadow-[0_0_50px_rgba(254,76,0,0.3)]">
            <div className="absolute inset-[-10px] rounded-full border border-[#FE4C00]/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-[-4px] rounded-full border border-[#FE4C00]/30 border-dotted animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 rounded-full bg-[#FE4C00]/20 blur-xl animate-pulse"></div>
            <div className="relative z-10 animate-[pulse_3s_ease-in-out_infinite]">
              <img
              src="/recovered-assets/f965d3f0-25ae-426e-8843-d393473e2223_320w.png"
                alt="Custom Icon"
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] w-[80px] h-[80px] object-contain"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center max-w-7xl mx-auto mb-20 px-4 sm:px-6 lg:px-8">
        <h2 className="md:text-6xl text-4xl font-medium text-[#FE4C00] font-space-grotesk mt-8" style={{ animation: 'slideInY 800ms ease-in-out 0ms forwards' }}>
          Stop stitching tools together.
        </h2>
        <h2 className="mb-10 font-space-grotesk text-4xl font-medium text-kb-ink md:text-6xl" style={{ animation: 'slideInY 800ms ease-in-out 0ms forwards' }}>
          Make them work together.
        </h2>
        <div className="grid grid-cols-1 gap-y-8 gap-x-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col gap-y-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'rgb(254, 76, 0)' }}>
              <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"></path>
              <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"></path>
              <path d="m2.3 2.3 7.286 7.286"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
            <p className="text-center font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-xl">Keep the tools that already work</p>
          </div>
          <div className="flex flex-col gap-y-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'rgb(254, 76, 0)' }}>
              <rect width="8" height="8" x="3" y="3" rx="2"></rect>
              <path d="M7 11v4a2 2 0 0 0 2 2h4"></path>
              <rect width="8" height="8" x="13" y="13" rx="2"></rect>
            </svg>
            <p className="text-center font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-xl">Automate the gaps between them</p>
          </div>
          <div className="flex flex-col gap-y-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'rgb(254, 76, 0)' }}>
              <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
              <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path>
              <path d="M7 21h10"></path>
              <path d="M12 3v18"></path>
              <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path>
            </svg>
            <p className="text-center font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-xl">Keep people where judgment matters</p>
          </div>
        </div>
      </div>
    </section>
  );
}
