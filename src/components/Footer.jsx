import { Link } from 'react-router-dom';
import LogoMark from './LogoMark.jsx';

export default function Footer() {
  return (
    <footer className="relative z-40 border-t border-kb-line bg-kb-surface-soft pb-10 pt-20">
      <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16 gap-x-12 gap-y-12">
          <div className="md:col-span-6 lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 w-fit" aria-label="Kitebaze home">
              <LogoMark width={40} height={47} />
              <span className="flex flex-col font-space-grotesk text-xl font-semibold uppercase leading-[0.82] tracking-tight text-kb-ink">
                <span>KITE</span>
                <span>BAZE</span>
              </span>
            </Link>
            <div className="flex flex-col gap-6 w-full font-sans mt-2">
              <p className="max-w-md font-inter text-base font-light leading-relaxed text-kb-ink-soft">Useful ways to automate the work behind your business.</p>
              <form action="https://formspree.io/f/xwvdplkk" method="POST" className="flex w-full max-w-[400px] mt-2">
                <input type="hidden" name="_subject" value="New Newsletter Signup" />
                <input type="email" name="email" placeholder="Email Address" required className="h-12 min-w-0 flex-1 rounded-none border border-kb-line bg-kb-surface px-4 font-mono text-sm text-kb-ink outline-none placeholder:font-mono placeholder:text-kb-ink-muted focus:border-kb-line-strong" />
                <button type="submit" className="h-12 cursor-pointer whitespace-nowrap rounded-none border-none bg-kb-accent pl-6 pr-6 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover focus:outline-none">SIGN-UP</button>
              </form>
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-8 font-inter">
            <h4 className="mb-8 font-sans text-lg font-normal text-kb-ink">Social</h4>
            <ul className="space-y-5">
              <li><a href="https://x.com/Kitebaze" className="group flex items-center gap-2 text-base font-light text-kb-ink-muted transition-colors hover:text-kb-ink">X</a></li>
              <li><a href="https://www.facebook.com/kitebaze/" className="group flex items-center gap-2 text-base font-light text-kb-ink-muted transition-colors hover:text-kb-ink">Facebook</a></li>
              <li><a href="https://www.youtube.com/@Kitebaze" className="group flex items-center gap-2 text-base font-light text-kb-ink-muted transition-colors hover:text-kb-ink">YouTube</a></li>
              <li><a href="https://www.linkedin.com/company/kitebaze/" className="group flex items-center gap-2 text-base font-light text-kb-ink-muted transition-colors hover:text-kb-ink">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/kitebaze/" className="group flex items-center gap-2 text-base font-light text-kb-ink-muted transition-colors hover:text-kb-ink">Instagram</a></li>
            </ul>
          </div>
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="mb-8 font-inter text-lg font-normal text-kb-ink">Get in touch</h4>
            <p className="mb-8 max-w-[280px] font-inter text-base font-light leading-relaxed text-kb-ink-muted">Your business doesn't need more software.<br />It needs less manual work.</p>
            <a href="mailto:hello@kitebaze.com" className="inline-flex items-center justify-center rounded-full bg-kb-accent pb-3 pl-6 pr-6 pt-3 text-sm font-medium text-kb-on-accent shadow-[0_8px_24px_rgba(254,76,0,0.2)] transition-all hover:bg-kb-accent-hover hover:shadow-[0_12px_32px_rgba(254,76,0,0.28)]">Email us Here</a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-kb-line pt-8 sm:flex-row">
          <p className="text-sm font-light text-kb-ink-muted">© 2026 Kitebaze. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-light text-kb-ink-muted transition-colors hover:text-kb-ink">Privacy Policy</a>
            <a href="#" className="text-sm font-light text-kb-ink-muted transition-colors hover:text-kb-ink">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
