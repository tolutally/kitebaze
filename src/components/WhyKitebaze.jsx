export default function WhyKitebaze() {
  return (
    <section className="border-t border-kb-line bg-kb-canvas pb-16 pt-16">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <div className="fade-up-element flex flex-col sm:flex-row sm:items-end gap-6 z-40 mb-16 relative gap-x-6 gap-y-6 items-start justify-between">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-kb-inverse px-3.5 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-kb-inverse-text">
              <span className="h-1.5 w-1.5 rounded-full bg-kb-accent" />
              Why Kitebaze
            </span>
            <h2 className="mb-4 mt-4 font-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">Not a platform. Not a consultancy.</h2>
            <p className="text-base font-light text-kb-ink-muted sm:text-xl">We build inside the software you already run, and stay to keep it working.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <div className="fade-up-element kb-card-shadow flex flex-none flex-col items-start gap-5 rounded-3xl border border-kb-line bg-kb-surface/85 p-6 sm:min-h-[140px] sm:flex-1 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 shrink-0 text-kb-accent sm:h-[70px] sm:w-[70px]">
                <path d="M5 7v11a1 1 0 0 0 1 1h11"></path>
                <path d="M5.293 18.707 11 13"></path>
                <circle cx="19" cy="19" r="2"></circle>
                <circle cx="5" cy="5" r="2"></circle>
              </svg>
              <p className="font-sans text-base font-bold leading-snug text-kb-ink sm:text-xl sm:leading-tight">Builds on the software you already run. Nothing to migrate, nothing to retrain, no subscription to add.</p>
            </div>
            <div className="fade-up-element kb-card-shadow flex flex-none flex-col items-start gap-4 rounded-3xl border border-kb-line bg-kb-surface/85 p-6 sm:min-h-[140px] sm:flex-1 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
              <span className="font-inter text-5xl font-bold tracking-tight text-kb-accent-ink sm:text-8xl">37</span>
              <p className="font-inter text-base font-light leading-tight text-kb-ink-soft sm:text-xl">Years of combined team experience from startup to scale</p>
            </div>
            <div className="fade-up-element kb-card-shadow flex flex-none items-center rounded-3xl border border-kb-line bg-kb-surface/85 p-6 sm:min-h-[140px] sm:flex-1 sm:p-8">
              <p className="leading-tight text-lg sm:text-2xl font-bold text-kb-accent-ink font-inter">We don't sell advice. We develop working systems.</p>
            </div>
          </div>
          <div className="fade-up-element group relative min-h-[400px] overflow-hidden rounded-3xl border border-kb-line lg:min-h-full">
            <img
              src="/why-kitebaze2.jpg"
              alt="Vintage and Modern Cars in Residential Garage"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-kb-inverse/40 transition-opacity duration-1000 group-hover:bg-kb-inverse/20"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-40 h-40 bg-kb-accent animate-[spin_12s_linear_infinite]"
                style={{
                  WebkitMask: "url('/kitebase-icon-brown.png') center/contain no-repeat",
                  mask: "url('/kitebase-icon-brown.png') center/contain no-repeat",
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="fade-up-element kb-card-shadow flex flex-none flex-col items-start gap-4 rounded-3xl border border-kb-line bg-kb-surface/85 p-6 sm:min-h-[140px] sm:flex-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8">
              <p className="font-inter text-base font-light leading-tight text-kb-ink-soft sm:text-xl">Service operations with people in the field</p>
              <span className="font-inter text-5xl font-bold tracking-tight text-kb-accent-ink sm:text-8xl">$12B</span>
            </div>
            <div className="fade-up-element kb-card-shadow flex flex-none flex-col items-start gap-5 rounded-3xl border border-kb-line bg-kb-surface/85 p-6 sm:min-h-[140px] sm:flex-1 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14 shrink-0 text-kb-accent sm:h-[70px] sm:w-[70px]">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
              <p className="font-inter text-base font-bold leading-snug text-kb-ink sm:text-2xl sm:leading-tight">Owner-led businesses that outgrew the workaround</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
