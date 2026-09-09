export default function WhyKitebaze() {
  return (
    <section className="border-t border-kb-line bg-kb-canvas pb-24 pt-24">
      <div className="sm:px-6 lg:px-8 max-w-7xl mr-auto ml-auto pr-4 pl-4">
        <div className="fade-up-element flex flex-col sm:flex-row sm:items-end gap-6 z-40 mb-16 relative gap-x-6 gap-y-6 items-start justify-between">
          <div>
            <h2 className="mb-4 font-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-6xl">Why Kitebaze?</h2>
            <p className="text-base font-light text-kb-ink-muted sm:text-xl">Businesses where the client list is the business. Outcomes over theory.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4">
            <div className="fade-up-element kb-card-shadow flex min-h-[140px] flex-1 items-center gap-x-6 gap-y-6 rounded-3xl border border-kb-line bg-kb-surface/85 pb-6 pl-6 pr-6 pt-6 sm:p-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 h-[70px] w-[70px] text-kb-accent">
                <path d="M5 7v11a1 1 0 0 0 1 1h11"></path>
                <path d="M5.293 18.707 11 13"></path>
                <circle cx="19" cy="19" r="2"></circle>
                <circle cx="5" cy="5" r="2"></circle>
              </svg>
              <p className="font-sans text-lg font-bold leading-tight text-kb-ink sm:text-xl">Builds on the software you already run. Nothing to migrate, nothing to retrain, no subscription to add.</p>
            </div>
            <div className="fade-up-element kb-card-shadow flex min-h-[140px] flex-1 items-center gap-6 gap-x-6 gap-y-6 rounded-3xl border border-kb-line bg-kb-surface/85 pb-6 pl-6 pr-6 pt-6 sm:p-8">
              <span className="text-6xl sm:text-8xl font-bold text-kb-accent-ink tracking-tight font-inter">37</span>
              <p className="font-inter text-base font-light leading-tight text-kb-ink-soft sm:text-xl">Years of combined team experience from startup to scale</p>
            </div>
            <div className="fade-up-element kb-card-shadow flex min-h-[140px] flex-1 items-center gap-6 gap-x-6 gap-y-6 rounded-3xl border border-kb-line bg-kb-surface/85 pb-6 pl-6 pr-6 pt-6 sm:p-8">
              <p className="leading-tight text-lg sm:text-2xl font-bold text-kb-accent-ink font-inter">We don't sell advice. We develop working systems.</p>
            </div>
          </div>
          <div className="fade-up-element group relative min-h-[400px] overflow-hidden rounded-3xl border border-kb-line lg:min-h-full">
            <img
              src="/recovered-assets/8d348428-4a26-439e-9abe-73272d1bc0a8_1600w.png"
              alt="Vintage and Modern Cars in Residential Garage"
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-kb-inverse/40 transition-opacity duration-1000 group-hover:bg-kb-inverse/20"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-40 h-40 bg-kb-accent animate-[spin_12s_linear_infinite]"
                style={{
                  WebkitMask: "url('/recovered-assets/21a3a351-757d-4dc4-ac9e-be28def84fcb_320w.png') center/contain no-repeat",
                  mask: "url('/recovered-assets/21a3a351-757d-4dc4-ac9e-be28def84fcb_320w.png') center/contain no-repeat",
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="fade-up-element kb-card-shadow flex min-h-[140px] flex-1 items-center gap-x-6 gap-y-6 rounded-3xl border border-kb-line bg-kb-surface/85 pb-6 pl-6 pr-6 pt-6 sm:p-8">
              <p className="font-inter text-base font-light leading-tight text-kb-ink-soft sm:text-xl">Service operations with people in the field</p>
              <span className="text-6xl sm:text-8xl font-bold text-kb-accent-ink tracking-tight font-inter">$12B</span>
            </div>
            <div className="fade-up-element kb-card-shadow flex min-h-[140px] flex-1 items-center gap-6 gap-x-6 gap-y-6 rounded-3xl border border-kb-line bg-kb-surface/85 pb-6 pl-6 pr-6 pt-6 sm:p-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 h-[70px] w-[70px] text-kb-accent">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
              <p className="font-inter text-lg font-bold leading-tight text-kb-ink sm:text-2xl">Owner-led businesses that outgrew the workaround</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
