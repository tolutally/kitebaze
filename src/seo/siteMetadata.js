export const SITE = Object.freeze({
  name: 'Kitebaze',
  url: 'https://kitebaze.com',
  language: 'en-CA',
  locale: 'en_CA',
  description: 'Kitebaze designs and maintains practical AI and workflow automation around the tools a business already uses.',
  socialImage: '/image-man-with-laptop.jpg',
  socialImageAlt: 'A team reviewing work around a laptop',
  email: 'support@kitebaze.com',
});

const LAST_MODIFIED = '2026-09-24';

export const PUBLIC_ROUTES = Object.freeze([
  {
    path: '/',
    label: 'Home',
    section: 'Core pages',
    schemaType: 'WebPage',
    title: 'Workflow Automation for Growing Businesses | Kitebaze',
    description: 'Kitebaze designs and maintains practical AI and workflow automation around the tools your team already uses, so repetitive work keeps moving.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'Kitebaze finds the repetitive work slowing a business down, redesigns the workflow around the software already in use, and builds the automation that keeps the work moving.',
      'The work is practical and operator-led: connect existing tools, remove manual handoffs, preserve human review where judgment matters, and keep improving the system after launch.',
    ],
  },
  {
    path: '/about-us',
    label: 'About Kitebaze',
    section: 'Company',
    schemaType: 'AboutPage',
    title: 'About Kitebaze | Built by Operators',
    description: 'Meet the operators behind Kitebaze and learn how we design practical AI and workflow systems that hold up in real businesses.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'Kitebaze is operator-led. The company maps how work actually moves before choosing tools or automations, then builds systems designed to hold up outside a demo.',
      'Kitebaze was co-founded by Jason Katz and Leigh Buckley. Their work connects operations, technology, people, and implementation.',
    ],
  },
  {
    path: '/case-studies',
    label: 'Case Studies',
    section: 'Resources',
    schemaType: 'CollectionPage',
    title: 'Workflow Automation Case Studies | Kitebaze',
    description: 'See how Kitebaze improved billing, case management, field documentation and patient flow with practical workflow automation.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'The case studies cover IT-service billing and installation tracking, estate and probate case management, driver-document intake and dispatch, and patient waiting-room flow.',
      'Page-reported outcomes include faster month-end invoice preparation, less manual email entry, cleaner case visibility, centralized driver communications, and improved staff utilization.',
    ],
  },
  {
    path: '/workflow-build',
    label: 'Workflow Build',
    section: 'Services',
    schemaType: 'WebPage',
    serviceType: 'Connected workflow design and automation',
    title: 'Workflow Build & Process Automation | Kitebaze',
    description: 'Redesign connected workflows, handoffs, controls and visibility so work moves reliably across your business.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'Workflow Build is for work that crosses multiple people, teams, or systems and cannot be improved by fixing one isolated task.',
      'The engagement can include an operating blueprint, connected workflows, clear handoffs, built-in checks, live visibility, documentation, training, and staged rollout.',
    ],
  },
  {
    path: '/bottleneck',
    label: 'Fix One Bottleneck',
    section: 'Services',
    schemaType: 'WebPage',
    serviceType: 'Single-workflow bottleneck improvement',
    title: 'Fix One Workflow Bottleneck | Kitebaze',
    description: 'Map one recurring workflow end to end and remove the repetitive copying, checking, chasing and follow-up.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'Bottleneck is a focused starting point for one recurring job that is delayed, dropped, or dependent on someone copying, checking, chasing, or reminding.',
      'Kitebaze maps the workflow, finds the friction, defines the guardrails and success measure, then removes repetitive steps and proves the result before expanding.',
    ],
  },
  {
    path: '/book-workflow-review',
    label: 'Book a Workflow Review',
    section: 'Resources',
    schemaType: 'WebPage',
    serviceType: 'Workflow review',
    title: 'Book a Free Workflow Review | Kitebaze',
    description: 'Book a free 30-minute review to identify manual bottlenecks, automation opportunities and the best first build.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'The free 30-minute workflow review is a no-obligation Google Meet focused on one real workflow.',
      'The conversation covers how the work runs today, recurring bottlenecks, practical automation opportunities, and whether one bottleneck or a broader Workflow Build is the right place to begin.',
    ],
  },
  {
    path: '/diagnostics',
    label: 'Free Workflow Diagnostic',
    section: 'Resources',
    schemaType: 'WebPage',
    serviceType: 'Interactive workflow diagnostic',
    title: 'Free Workflow Diagnostic | Kitebaze',
    description: 'Describe a manual task and get a free diagnostic showing where automation could remove bottlenecks and repetitive work.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'The interactive workflow diagnostic asks a few follow-up questions about a repetitive task and helps identify what could run without constant manual intervention.',
    ],
  },
  {
    path: '/contact',
    label: 'Contact Kitebaze',
    section: 'Company',
    schemaType: 'ContactPage',
    title: 'Contact Kitebaze | Discuss Your Workflow',
    description: 'Tell Kitebaze where work is getting stuck, share your workflow challenge or book a free workflow review.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'Use the contact form to describe a workflow challenge, or book a free Workflow Review for a live conversation.',
      'Kitebaze lists a Calgary, Alberta, Canada contact address. General enquiries can be sent to support@kitebaze.com.',
    ],
  },
  {
    path: '/responsible-automation',
    label: 'Responsible Automation',
    section: 'Trust and policies',
    schemaType: 'WebPage',
    title: 'Responsible Automation Principles | Kitebaze',
    description: 'Explore the seven principles Kitebaze uses to design trustworthy workflows, automations and connected systems.',
    lastModified: LAST_MODIFIED,
    crawlText: [
      'Kitebaze uses seven principles when designing and deploying systems: Human Control, Security, Privacy, Reliability, Transparency, Accountability, and AI Use.',
      'The technology follows the problem. Automation should remove unnecessary work while keeping people involved where judgment, approval, or escalation matters.',
    ],
  },
  {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    section: 'Trust and policies',
    schemaType: 'WebPage',
    title: 'Privacy Policy | Kitebaze',
    description: 'Learn how Kitebaze collects, uses, shares, stores and protects personal information.',
    lastModified: LAST_MODIFIED,
    crawlText: ['The Privacy Policy explains how Kitebaze handles personal information across its website, client relationships, and configured workflows or services.'],
  },
  {
    path: '/terms-of-service',
    label: 'Terms of Use',
    section: 'Trust and policies',
    schemaType: 'WebPage',
    title: 'Terms of Use | Kitebaze',
    description: 'Read the terms governing access to and use of the Kitebaze website.',
    lastModified: LAST_MODIFIED,
    crawlText: ['The Terms of Use govern access to kitebaze.com and the pages, materials, forms, tools, and content available through the website.'],
  },
  {
    path: '/vulnerability-disclosure',
    label: 'Vulnerability Disclosure Policy',
    section: 'Trust and policies',
    schemaType: 'WebPage',
    title: 'Vulnerability Disclosure Policy | Kitebaze',
    description: 'Learn how to responsibly report a suspected security vulnerability affecting a Kitebaze-operated system.',
    lastModified: LAST_MODIFIED,
    crawlText: ['The Vulnerability Disclosure Policy explains scope, testing boundaries, reporting expectations, and safe-harbor conditions for good-faith security research.'],
  },
]);

export const ROUTE_ALIASES = Object.freeze({
  '/home': '/',
  '/about': '/about-us',
  '/workflow': '/workflow-build',
  '/in-house-agent': '/bottleneck',
  '/workflow-discovery': '/book-workflow-review',
  '/contact-form': '/contact',
  '/terms-of-use': '/terms-of-service',
});

export const ROUTE_METADATA = Object.freeze(
  Object.fromEntries(PUBLIC_ROUTES.map((route) => [route.path, Object.freeze(route)])),
);

export function normalizePathname(pathname = '/') {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withoutDuplicateSlashes = withLeadingSlash.replace(/\/{2,}/g, '/');
  return withoutDuplicateSlashes.length > 1
    ? withoutDuplicateSlashes.replace(/\/+$/, '')
    : '/';
}

export function resolveCanonicalPath(pathname = '/') {
  const normalized = normalizePathname(pathname);
  return ROUTE_ALIASES[normalized] || normalized;
}

export function getRouteMetadata(pathname = '/') {
  return ROUTE_METADATA[resolveCanonicalPath(pathname)] || null;
}

export function getCanonicalUrl(pathname = '/') {
  const path = resolveCanonicalPath(pathname);
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
}

export function getRouteMarkdownPath(pathname = '/') {
  const path = resolveCanonicalPath(pathname);
  const slug = path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
  return `/llms-pages/${slug}.md`;
}

export function getRouteMarkdownUrl(pathname = '/') {
  return `${SITE.url}${getRouteMarkdownPath(pathname)}`;
}

export function getPageSchema(metadata) {
  if (!metadata) return null;

  const canonicalUrl = getCanonicalUrl(metadata.path);
  const page = {
    '@type': metadata.schemaType || 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: SITE.language,
    isPartOf: { '@id': `${SITE.url}/#website` },
    publisher: { '@id': `${SITE.url}/#organization` },
    dateModified: metadata.lastModified,
  };

  const graph = [page];

  if (metadata.serviceType) {
    const service = {
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: metadata.label,
      serviceType: metadata.serviceType,
      description: metadata.description,
      url: canonicalUrl,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: { '@type': 'Country', name: 'Canada' },
    };
    graph.push(service);
    page.mainEntity = { '@id': service['@id'] };
  }

  if (metadata.path !== '/') {
    const breadcrumbs = {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE.url}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: metadata.label,
          item: canonicalUrl,
        },
      ],
    };
    graph.push(breadcrumbs);
    page.breadcrumb = { '@id': breadcrumbs['@id'] };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
