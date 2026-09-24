import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-40 border-t border-white/10 bg-black pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-x-8 gap-y-10 md:mb-16 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-2 md:col-span-5">
            <Link to="/" className="flex w-fit items-center" aria-label="Kitebaze home">
              <img src="/kitebaze-logo-stone.png" alt="Kitebaze" className="h-auto w-[190px] max-w-full sm:w-[240px] lg:w-[290px]" />
            </Link>
            <div className="mt-5 flex w-full flex-col gap-6 font-sans sm:mt-6">
              <p className="max-w-md font-inter text-base font-light leading-relaxed text-white/65">Useful ways to automate the work behind your business.</p>
            </div>
          </div>

          <nav aria-label="Services" className="border-t border-white/10 pt-8 md:col-span-2 md:border-0 md:pt-1">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">Services</p>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/workflow-build" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">Workflow Build</Link>
              <Link to="/bottleneck" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">Fix One Bottleneck</Link>
              <Link to="/diagnostics" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">Free Diagnostic</Link>
            </div>
          </nav>

          <nav aria-label="Company" className="border-t border-white/10 pt-8 md:col-span-2 md:border-0 md:pt-1">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">Company</p>
            <div className="mt-4 flex flex-col gap-3">
              <Link to="/about-us" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">About</Link>
              <Link to="/case-studies" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">Case Studies</Link>
              <Link to="/contact" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">Contact</Link>
              <Link to="/book-workflow-review" className="font-inter text-sm font-light text-white/65 transition-colors hover:text-white">Book a Review</Link>
            </div>
          </nav>

          <div className="col-span-2 border-t border-white/10 pt-8 md:col-span-3 md:border-0 md:pt-1">
            <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">Calgary, Canada</p>
            <p className="font-inter text-base font-light leading-relaxed text-white/65">330 5th Avenue SW, Calgary, T2P 0L4</p>
            <a href="mailto:support@kitebaze.com" className="mt-2 inline-block font-inter text-base font-light leading-relaxed text-white/65 transition-colors hover:text-white">support@kitebaze.com</a>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:pt-8">
          <p className="text-sm font-light text-white/50">© 2026 Kitebaze. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="text-sm font-light text-white/50 transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm font-light text-white/50 transition-colors hover:text-white">Terms of Service</Link>
            <Link to="/vulnerability-disclosure" className="text-sm font-light text-white/50 transition-colors hover:text-white">Vulnerability Disclosure</Link>
            <Link to="/responsible-automation" className="text-sm font-light text-white/50 transition-colors hover:text-white">Responsible Automation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
