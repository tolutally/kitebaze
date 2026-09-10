const CERTIFICATIONS = [
  { label: 'ISO 27001', icon: 'iso-lock' },
  { label: 'ISO 9001', icon: 'iso-check' },
  { label: 'ISO 42001', icon: 'iso-ai' },
  { label: 'ISO 22301', icon: 'iso-continuity' },
  { label: 'HIPAA compliant', icon: 'medical' },
  { label: 'HITRUST certified', icon: 'hitrust' },
  { label: 'SOC 1', icon: 'soc-one' },
  { label: 'SOC 2', icon: 'soc-two' },
];

const PRACTICES = [
  { label: 'Least-privilege access', icon: 'key' },
  { label: 'Audit trails on every run', icon: 'trail' },
  { label: 'Human approval required', icon: 'check' },
  { label: 'Canadian-hosted infrastructure', icon: 'building' },
  { label: 'NDA on request', icon: 'doc' },
  { label: 'Data processing agreement', icon: 'shield' },
  { label: 'Privacy-professional led', icon: 'user' },
  { label: 'You own the system', icon: 'lock' },
];

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-7 w-7',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

function CertificationIcon({ type }) {
  if (type.startsWith('iso-')) {
    return (
      <svg {...iconProps}>
        <path d="M12 2.5 14 4l2.5-.1.8 2.4 2.1 1.4-.7 2.4.7 2.4-2.1 1.4-.8 2.4-2.5-.1-2 1.5-2-1.5-2.5.1-.8-2.4-2.1-1.4.7-2.4-.7-2.4 2.1-1.4.8-2.4L10 4Z" />
        {type === 'iso-lock' && <><rect x="9" y="10.5" width="6" height="5" rx="1" /><path d="M10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5" /></>}
        {type === 'iso-check' && <path d="m8.8 12.2 2.1 2.1 4.4-5" />}
        {type === 'iso-ai' && <><circle cx="9" cy="10" r="1" /><circle cx="15" cy="10" r="1" /><circle cx="12" cy="15" r="1" /><path d="m10 10 2 5 2-5M9.8 10h4.4" /></>}
        {type === 'iso-continuity' && <><path d="M8 12h8M12 8v8" /><circle cx="12" cy="12" r="4" /></>}
      </svg>
    );
  }

  if (type === 'medical') {
    return (
      <svg {...iconProps}>
        <path d="M9 3c0 2 6 2 6 0M12 4v17M8 8c-3 0-3 4 1 4h6c4 0 4 4 1 4H8" />
        <path d="M6 6h12M9 21h6" />
      </svg>
    );
  }

  if (type === 'hitrust') {
    return (
      <svg {...iconProps}>
        <path d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V6Z" />
        <path d="M12 3v18M4.5 8.5H12M12 14.5h7.1" />
      </svg>
    );
  }

  if (type === 'soc-two') {
    return (
      <svg {...iconProps}>
        <rect x="2.5" y="5" width="19" height="14" rx="2" />
        <path d="m6.5 12 2 2 3.5-4M12.5 12l2 2 3.5-4" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function PracticeIcon({ type }) {
  const common = { ...iconProps, className: 'h-5 w-5' };

  if (type === 'key') return <svg {...common}><circle cx="8" cy="8" r="4" /><path d="m10.8 10.8 8.7 8.7M16 15l2-2M19 18l2-2" /></svg>;
  if (type === 'trail') return <svg {...common}><path d="M4 6h16M4 12h10M4 18h16" /><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" /></svg>;
  if (type === 'check') return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="m8 12 3 3 5-6" /></svg>;
  if (type === 'building') return <svg {...common}><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6M9 12h.01M15 12h.01M9 8h.01M15 8h.01" /></svg>;
  if (type === 'doc') return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>;
  if (type === 'shield') return <svg {...common}><path d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (type === 'user') return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg>;
  return <svg {...common}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
}

function PracticeSet({ duplicate = false }) {
  return (
    <div className={`flex shrink-0 gap-4 ${duplicate ? 'security-strip-duplicate' : ''}`} aria-hidden={duplicate || undefined}>
      {PRACTICES.map((practice) => (
        <div key={`${duplicate ? 'duplicate' : 'original'}-${practice.label}`} className="flex min-h-16 min-w-[250px] items-center justify-center gap-3 rounded-2xl border border-kb-line bg-kb-surface px-5 py-4 font-inter text-sm font-medium text-kb-ink shadow-sm">
          <span className="text-kb-accent-ink"><PracticeIcon type={practice.icon} /></span>
          <span>{practice.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function SecurityTrust() {
  return (
    <section className="relative overflow-hidden border-t border-kb-line bg-kb-surface-soft py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="fade-up-element font-space-grotesk text-4xl font-medium tracking-tight text-kb-ink sm:text-5xl">
          Security and privacy you can trust.
        </h2>
        <p className="fade-up-element mx-auto mt-6 max-w-3xl font-inter text-base font-light leading-relaxed text-kb-ink-soft sm:text-lg">
          Trust matters when automation touches client data and money. Our approach to access, oversight and hosting lets you move the work into the system with confidence — without giving up control.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CERTIFICATIONS.map((certification, index) => (
            <div key={certification.label} className="fade-up-element flex min-h-24 items-center justify-center gap-2.5 rounded-[1.35rem] border border-kb-line-strong bg-kb-canvas/30 px-3 py-4 font-inter text-sm font-medium text-kb-ink sm:gap-4 sm:px-5 sm:py-5 sm:text-lg" style={{ transitionDelay: `${index * 45}ms` }}>
              <span className="shrink-0 text-kb-ink"><CertificationIcon type={certification.icon} /></span>
              <span>{certification.label}</span>
            </div>
          ))}
        </div>

        <p className="fade-up-element mt-10 font-inter text-xs font-semibold uppercase tracking-[0.18em] text-kb-ink-muted">
          How we put it into practice
        </p>
      </div>

      <div className="security-strip-viewport mt-6">
        <div className="animate-security-strip flex w-max gap-4 px-2">
          <PracticeSet />
          <PracticeSet duplicate />
        </div>
      </div>
    </section>
  );
}
