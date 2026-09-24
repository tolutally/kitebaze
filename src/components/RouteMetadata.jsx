import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE,
  getCanonicalUrl,
  getPageSchema,
  getRouteMarkdownUrl,
  getRouteMetadata,
} from '../seo/siteMetadata.js';

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const ROBOTS_NOINDEX = 'noindex, nofollow';

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
}

function removeHeadElement(selector) {
  document.head.querySelector(selector)?.remove();
}

export default function RouteMetadata() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(pathname);

    if (!metadata) {
      document.title = 'Page Not Found | Kitebaze';
      upsertMeta('meta[name="description"]', {
        name: 'description',
        content: 'The page you requested could not be found.',
      });
      upsertMeta('meta[name="robots"]', { name: 'robots', content: ROBOTS_NOINDEX });
      upsertMeta('meta[name="googlebot"]', { name: 'googlebot', content: ROBOTS_NOINDEX });
      removeHeadElement('link[rel="canonical"]');
      removeHeadElement('link[rel="alternate"][hreflang="en-CA"]');
      removeHeadElement('link[rel="alternate"][hreflang="x-default"]');
      removeHeadElement('link[rel="alternate"][type="text/markdown"]');
      [
        'meta[property="og:type"]',
        'meta[property="og:site_name"]',
        'meta[property="og:locale"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[property="og:image:alt"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]',
        'meta[name="twitter:image:alt"]',
      ].forEach(removeHeadElement);
      document.getElementById('kitebaze-route-jsonld')?.remove();
      return;
    }

    const canonicalUrl = getCanonicalUrl(metadata.path);
    const socialImageUrl = `${SITE.url}${SITE.socialImage}`;
    const isPrivateDiagnosticVariant = metadata.path === '/diagnostics' && Boolean(search);
    const robots = isPrivateDiagnosticVariant ? 'noindex, follow' : ROBOTS_INDEX;

    document.title = metadata.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: metadata.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[name="googlebot"]', { name: 'googlebot', content: robots });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE.name });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: SITE.locale });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: metadata.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metadata.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: socialImageUrl });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: SITE.socialImageAlt });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: metadata.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: metadata.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImageUrl });
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: SITE.socialImageAlt });

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    upsertLink('link[rel="alternate"][hreflang="en-CA"]', {
      rel: 'alternate',
      hreflang: 'en-CA',
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hreflang: 'x-default',
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][type="text/markdown"]', {
      rel: 'alternate',
      type: 'text/markdown',
      href: getRouteMarkdownUrl(metadata.path),
    });

    let routeSchema = document.getElementById('kitebaze-route-jsonld');
    if (!routeSchema) {
      routeSchema = document.createElement('script');
      routeSchema.id = 'kitebaze-route-jsonld';
      routeSchema.type = 'application/ld+json';
      document.head.appendChild(routeSchema);
    }
    routeSchema.textContent = JSON.stringify(getPageSchema(metadata)).replace(/</g, '\\u003c');
  }, [pathname, search]);

  return null;
}
