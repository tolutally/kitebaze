import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-40 border-t border-white/10 bg-black pb-8 pt-12 sm:pb-10 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-y-10 md:mb-16 md:grid-cols-12 md:gap-x-12 lg:gap-x-8">
          <div className="md:col-span-7 lg:col-span-6">
            <Link to="/" className="flex w-fit items-center" aria-label="Kitebaze home">
              <img src="/kitebaze-logo-stone.png" alt="Kitebaze" className="h-auto w-[190px] max-w-full sm:w-[240px] lg:w-[290px]" />
            </Link>
            <div className="mt-5 flex w-full flex-col gap-6 font-sans sm:mt-6">
              <p className="max-w-md font-inter text-base font-light leading-relaxed text-white/65">Useful ways to automate the work behind your business.</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 md:col-span-5 md:col-start-8 md:border-0 md:pt-0 lg:col-span-4 lg:col-start-9">
            <p className="font-inter text-base font-light leading-relaxed text-white/65">330 5th Avenue SW, Calgary, T2P 0L4</p>
            <a href="mailto:support@kitebaze.com" className="mt-2 inline-block font-inter text-base font-light leading-relaxed text-white/65 transition-colors hover:text-white">support@kitebaze.com</a>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:pt-8">
          <p className="text-sm font-light text-white/50">© 2026 Kitebaze. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="text-sm font-light text-white/50 transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm font-light text-white/50 transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
