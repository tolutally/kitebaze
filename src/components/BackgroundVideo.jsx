export default function BackgroundVideo() {
  return (
    <div
      className="video-background-container fixed top-0 -z-10 h-screen w-full"
      data-alpha-mask="80"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
      }}
    >
      <img src="/recovered-assets/11b56623-2d13-48c7-8d18-f1b905e6be2b_3840w.png" alt="" className="w-full h-full object-cover" />
    </div>
  );
}
