export default function VideoIntro() {
  return (
    <section className="relative flex min-h-[400px] items-center overflow-hidden bg-kb-inverse lg:min-h-[800px]">
      <img
        src="/image-man-with-laptop.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        style={{ objectPosition: '30% 55%' }}
      />
      <div className="absolute inset-0 bg-transparent"></div>
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-kb-canvas via-kb-canvas/25 to-transparent sm:h-40"></div>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-kb-canvas via-kb-canvas/20 to-transparent sm:h-40"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center text-center gap-12"></div>
      </div>
    </section>
  );
}
