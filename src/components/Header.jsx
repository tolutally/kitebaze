import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-kb-line/80 bg-kb-canvas/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="flex flex-shrink-0 items-center" aria-label="Kitebaze home">
            <img src="/kitebaze-logo-black.png" alt="Kitebaze" className="h-[84px] w-auto" />
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex font-inter gap-x-8 items-center">
              <Link to="/workflow-build" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">Workflow Build</Link>
              <Link to="/bottleneck" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">Fix One Bottleneck</Link>
              <Link to="/#how-it-works" className="text-base font-normal text-kb-ink-muted transition-colors hover:text-kb-ink">How It Works</Link>
            </nav>
            <Link to="/book-workflow-review" className="hidden items-center justify-center rounded-full bg-kb-accent pb-3.5 pl-8 pr-8 pt-3.5 font-inter text-sm font-medium text-kb-on-accent transition-colors hover:bg-kb-accent-hover md:inline-flex sm:w-auto">
              Talk to Us
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
          <Link to="/bottleneck" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">Fix One Bottleneck</Link>
          <Link to="/#how-it-works" className="text-base text-kb-ink-soft transition-colors hover:text-kb-ink">How It Works</Link>
          <Link to="/book-workflow-review" className="mt-2 inline-flex items-center justify-center rounded-full bg-kb-accent px-8 py-3.5 text-sm font-medium text-kb-on-accent">
            Talk to Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
