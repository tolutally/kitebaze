const software = [
  { category: 'Booking & scheduling', name: 'Calendly', icon: '/software-logos/calendly.svg', color: '#006BFF' },
  { category: 'Forms & applications', name: 'Typeform', icon: '/software-logos/typeform.svg', color: 'var(--kb-ink)' },
  { category: 'Email', name: 'Gmail', icon: '/software-logos/gmail.svg', color: '#EA4335' },
  { category: 'Calendars', name: 'Google Calendar', icon: '/software-logos/googlecalendar.svg', color: '#4285F4' },
  { category: 'Spreadsheets', name: 'Google Sheets', icon: '/software-logos/googlesheets.svg', color: '#34A853' },
  { category: 'CRM', name: 'HubSpot', icon: '/software-logos/hubspot.svg', color: '#FF7A59' },
  { category: 'Payments', name: 'Stripe', icon: '/software-logos/stripe.svg', color: '#635BFF' },
  { category: 'Accounting', name: 'QuickBooks', icon: '/software-logos/quickbooks.svg', color: '#2CA01C' },
  { category: 'Documents', name: 'Google Docs', icon: '/software-logos/googledocs.svg', color: '#4285F4' },
  { category: 'Messaging', name: 'Telegram', icon: '/software-logos/telegram.svg', color: '#26A5E4' },
];

function SoftwareSet({ prefix }) {
  return software.map((item) => (
    <div key={`${prefix}-${item.name}`} className="kb-card-shadow flex min-w-[190px] flex-shrink-0 items-center gap-4 rounded-2xl border border-kb-line bg-kb-surface/90 px-5 py-4 backdrop-blur-sm">
      <span
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
        style={{
          backgroundColor: item.color,
          WebkitMask: `url('${item.icon}') center / contain no-repeat`,
          mask: `url('${item.icon}') center / contain no-repeat`,
        }}
      ></span>
      <span className="min-w-0">
        <span className="block truncate font-inter text-base font-medium text-kb-ink">{item.name}</span>
        <span className="mt-0.5 block truncate font-inter text-xs font-light text-kb-ink-muted">{item.category}</span>
      </span>
    </div>
  ));
}

export default function LogoBanner() {
  return (
    <section className="relative z-20 overflow-hidden border-t border-kb-line bg-kb-surface-soft py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(159,107,78,0.1),transparent_60%)]"></div>
      <div className="relative mx-auto mb-10 max-w-7xl px-6 text-center">
        <p className="font-inter text-sm font-medium uppercase tracking-[0.18em] text-kb-accent-ink">Works across your stack</p>
      </div>

      <div className="relative w-full overflow-hidden py-3" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
        <div className="flex w-max animate-software-strip gap-4 px-2">
          <SoftwareSet prefix="a" />
          <SoftwareSet prefix="b" />
        </div>
      </div>
    </section>
  );
}
