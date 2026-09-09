import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoMark from './LogoMark.jsx';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-kb-line/80 bg-kb-canvas/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center gap-3" aria-label="KiteBaze home">
            <LogoMark />
            <span className="font-space-grotesk text-xl font-semibold uppercase leading-none tracking-tight text-kb-ink" aria-hidden="true">
              KITEBAZE
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex font-inter gap-x-8 items-center">
              <Link to="/workflow-build" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">Workflow Build</Link>
              <Link to="/bottleneck" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">Bottleneck</Link>
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
          <Link to="/workflow-build" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">Workflow Build</Link>
          <Link to="/bottleneck" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">Bottleneck</Link>
          <Link to="/case-studies" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">Case Studies</Link>
          <Link to="/contact-form" className="mt-2 inline-flex items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 text-sm font-medium text-kb-on-accent">
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
