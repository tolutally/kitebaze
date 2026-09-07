import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMark from './LogoMark.jsx';

export default function Header() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const solutionsRef = useRef(null);

  useEffect(() => {
    function onDocClick(event) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-kb-line/80 bg-kb-canvas/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-32 items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center gap-3" aria-label="KiteBaze home">
            <LogoMark />
            <span className="flex flex-col font-space-grotesk text-xl font-semibold uppercase leading-[0.82] tracking-tight text-kb-ink" aria-hidden="true">
              <span>KITE</span>
              <span>BAZE</span>
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex font-inter gap-x-8 items-center">
              <div className="relative" ref={solutionsRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSolutionsOpen((open) => !open);
                  }}
                >
                  Solutions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                <div
                  className={`${solutionsOpen ? '' : 'hidden'} kb-card-shadow absolute left-0 top-full z-50 mt-4 w-60 overflow-hidden rounded-2xl border border-kb-line bg-kb-surface/95 backdrop-blur-xl`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Link to="/workflow-build" className="block px-5 py-4 text-sm text-kb-ink-soft transition-colors hover:bg-kb-surface-soft hover:text-kb-ink">Workflow Build</Link>
                  <Link to="/bottleneck" className="block border-t border-kb-line px-5 py-4 text-sm text-kb-ink-soft transition-colors hover:bg-kb-surface-soft hover:text-kb-ink">Bottleneck</Link>
                </div>
              </div>
              <Link to="/about-us" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">About Us</Link>
              <Link to="/case-studies" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">Case Studies</Link>
            </nav>
            <Link to="/contact-form" className="hidden items-center justify-center rounded-full bg-kb-accent pb-3.5 pl-8 pr-8 pt-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover md:inline-flex sm:w-auto">
              Get in Touch
            </Link>
            <button
              type="button"
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span
                className="block h-0.5 w-6 bg-kb-ink transition-all duration-300"
                style={mobileMenuOpen ? { transform: 'translateY(8px) rotate(45deg)' } : undefined}
              ></span>
              <span
                className="block h-0.5 w-6 bg-kb-ink transition-all duration-300"
                style={mobileMenuOpen ? { opacity: 0 } : undefined}
              ></span>
              <span
                className="block h-0.5 w-6 bg-kb-ink transition-all duration-300"
                style={mobileMenuOpen ? { transform: 'translateY(-8px) rotate(-45deg)' } : undefined}
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div className={`${mobileMenuOpen ? '' : 'hidden'} border-t border-kb-line bg-kb-surface/95 backdrop-blur-xl md:hidden`}>
        <nav className="flex flex-col px-6 py-6 gap-5 font-inter">
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between text-base text-kb-ink-soft transition-colors hover:text-kb-ink"
              onClick={() => setMobileSolutionsOpen((open) => !open)}
            >
              Solutions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${mobileSolutionsOpen ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
            <div className={`${mobileSolutionsOpen ? 'flex' : 'hidden'} mt-3 flex-col gap-2 border-l border-kb-line pl-4`}>
              <Link to="/workflow-build" className="py-1 text-sm text-kb-ink-muted transition-colors hover:text-kb-ink">Workflow Build</Link>
              <Link to="/bottleneck" className="py-1 text-sm text-kb-ink-muted transition-colors hover:text-kb-ink">Bottleneck</Link>
            </div>
          </div>
          <Link to="/about-us" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">About Us</Link>
          <Link to="/case-studies" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">Case Studies</Link>
          <Link to="/contact-form" className="mt-2 inline-flex items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 text-sm font-medium text-kb-on-accent">
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
