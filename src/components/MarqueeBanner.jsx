function MarqueeItem() {
  return (
    <>
      <img src="/recovered-assets/21a3a351-757d-4dc4-ac9e-be28def84fcb_320w.png" alt="Pinwheel Logo" className="w-[34px] h-[34px] object-contain" />
      <span className="font-space-grotesk text-2xl font-semibold uppercase tracking-normal text-kb-on-accent md:text-3xl">KEEP WHAT WORKS. CONNECT THE REST. AUTOMATE THE MANUAL.</span>
    </>
  );
}

export default function MarqueeBanner() {
  return (
    <section className="flex overflow-hidden whitespace-nowrap border-y border-kb-accent bg-kb-accent pb-5 pt-5">
      <div className="flex w-max items-center" style={{ animation: 'scrollMarquee 40s linear infinite' }}>
        <div className="flex shrink-0 font-medium font-space-grotesk pr-12 gap-x-12 gap-y-12 items-center">
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
          <img src="/recovered-assets/21a3a351-757d-4dc4-ac9e-be28def84fcb_320w.png" alt="Pinwheel Logo" className="w-[34px] h-[34px] object-contain" />
        </div>
        <div className="flex shrink-0 items-center gap-12 pr-12">
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>
    </section>
  );
}
