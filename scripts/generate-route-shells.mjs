import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  PUBLIC_ROUTES,
  SITE,
  getCanonicalUrl,
  getPageSchema,
  getRouteMarkdownUrl,
} from '../src/seo/siteMetadata.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDirectory, '..');
const distDirectory = join(projectRoot, 'dist');
const templatePath = join(distDirectory, 'index.html');
const template = readFileSync(templatePath, 'utf8');

const metadataPattern = /<!-- route-metadata:start -->[\s\S]*?<!-- route-metadata:end -->/;
const fallbackPattern = /<noscript id="route-fallback">[\s\S]*?<\/noscript>/;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildMetadataBlock(route) {
  const canonicalUrl = getCanonicalUrl(route.path);
  const socialImageUrl = `${SITE.url}${SITE.socialImage}`;
  const schema = JSON.stringify(getPageSchema(route)).replace(/</g, '\\u003c');
  const robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return [
    '<!-- route-metadata:start -->',
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}">`,
    `<meta name="robots" content="${robots}">`,
    `<meta name="googlebot" content="${robots}">`,
    `<link rel="canonical" href="${canonicalUrl}">`,
    `<link rel="alternate" hreflang="en-CA" href="${canonicalUrl}">`,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`,
    `<link rel="alternate" type="text/markdown" href="${getRouteMarkdownUrl(route.path)}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:locale" content="${SITE.locale}">`,
    `<meta property="og:title" content="${escapeHtml(route.title)}">`,
    `<meta property="og:description" content="${escapeHtml(route.description)}">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:image" content="${socialImageUrl}">`,
    '<meta property="og:image:width" content="960">',
    '<meta property="og:image:height" content="571">',
    `<meta property="og:image:alt" content="${escapeHtml(SITE.socialImageAlt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}">`,
    `<meta name="twitter:image" content="${socialImageUrl}">`,
    `<meta name="twitter:image:alt" content="${escapeHtml(SITE.socialImageAlt)}">`,
    `<script id="kitebaze-route-jsonld" type="application/ld+json">${schema}</script>`,
    '<!-- route-metadata:end -->',
  ].join('\n');
}

function buildFallback(route) {
  const currentPath = route.path;
  const links = PUBLIC_ROUTES
    .filter((item) => item.path !== currentPath)
    .map((item) => `<li><a href="${item.path}">${escapeHtml(item.label)}</a></li>`)
    .join('');
  const paragraphs = route.crawlText.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');

  return [
    '<noscript id="route-fallback">',
    '<main>',
    `<h1>${escapeHtml(route.label)}</h1>`,
    `<p>${escapeHtml(route.description)}</p>`,
    paragraphs,
    '<nav aria-label="Public pages"><ul>',
    links,
    '</ul></nav>',
    '</main>',
    '</noscript>',
  ].join('');
}

function routeFilename(pathname) {
  return pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
}

if (!metadataPattern.test(template) || !fallbackPattern.test(template)) {
  throw new Error('The built HTML is missing the route metadata or fallback markers.');
}

PUBLIC_ROUTES.forEach((route) => {
  const html = template
    .replace(metadataPattern, buildMetadataBlock(route))
    .replace(fallbackPattern, buildFallback(route));
  writeFileSync(join(distDirectory, routeFilename(route.path)), html);
});

const notFoundMetadata = [
  '<!-- route-metadata:start -->',
  '<title>Page Not Found | Kitebaze</title>',
  '<meta name="description" content="The page you requested could not be found.">',
  '<meta name="robots" content="noindex, nofollow">',
  '<meta name="googlebot" content="noindex, nofollow">',
  '<!-- route-metadata:end -->',
].join('\n');

const notFoundFallback = '<noscript id="route-fallback"><main><h1>Page not found</h1><p>The page you requested could not be found.</p><p><a href="/">Return to the Kitebaze homepage</a></p></main></noscript>';
const notFoundHtml = template
  .replace(metadataPattern, notFoundMetadata)
  .replace(fallbackPattern, notFoundFallback);

writeFileSync(join(distDirectory, '404.html'), notFoundHtml);
console.log(`Generated route-specific HTML shells for ${PUBLIC_ROUTES.length} canonical routes plus 404.html.`);
