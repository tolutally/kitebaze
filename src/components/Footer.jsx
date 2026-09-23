import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-40 border-t border-white/10 bg-black pb-10 pt-20">
      <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16 gap-x-12 gap-y-12">
          <div className="md:col-span-7 lg:col-span-6">
            <Link to="/" className="flex items-center w-fit" aria-label="Kitebaze home">
              <img src="/kitebaze-logo-stone.png" alt="Kitebaze" className="h-[216px] w-auto" />
            </Link>
            <div className="flex flex-col gap-6 w-full font-sans">
              <p className="max-w-md font-inter text-base font-light leading-relaxed text-white/65">Useful ways to automate the work behind your business.</p>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <p className="font-inter text-base font-light leading-relaxed text-white/65">330 5th Avenue SW, Calgary, T2P 0L4</p>
            <a href="mailto:support@kitebaze.com" className="mt-2 inline-block font-inter text-base font-light leading-relaxed text-white/65 transition-colors hover:text-white">support@kitebaze.com</a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row">
          <p className="text-sm font-light text-white/50">© 2026 Kitebaze. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-light text-white/50 transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm font-light text-white/50 transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
