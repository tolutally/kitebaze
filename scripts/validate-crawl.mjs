import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  PUBLIC_ROUTES,
  ROUTE_ALIASES,
  getCanonicalUrl,
  getRouteMarkdownPath,
  getRouteMarkdownUrl,
} from '../src/seo/siteMetadata.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDirectory, '..');
const distDirectory = join(projectRoot, 'dist');
const publicDirectory = join(projectRoot, 'public');
const failures = [];

function read(path) {
  return readFileSync(path, 'utf8');
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const sitemap = read(join(publicDirectory, 'sitemap.xml'));
const llms = read(join(publicDirectory, 'llms.txt'));
const robots = read(join(publicDirectory, 'robots.txt'));
const indexSource = read(join(projectRoot, 'index.html'));
const vercel = JSON.parse(read(join(projectRoot, 'vercel.json')));
const manifest = JSON.parse(read(join(publicDirectory, 'site.webmanifest')));

for (const route of PUBLIC_ROUTES) {
  const filename = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  const shellPath = join(distDirectory, filename);
  const canonicalUrl = getCanonicalUrl(route.path);
  const markdownPath = join(publicDirectory, getRouteMarkdownPath(route.path).slice(1));
  const markdownUrl = getRouteMarkdownUrl(route.path);

  if (!existsSync(shellPath)) {
    failures.push(`Missing route shell: ${filename}`);
    continue;
  }

  const html = read(shellPath);
  if (!html.includes(`<title>${escapeHtml(route.title)}</title>`)) failures.push(`Wrong title: ${route.path}`);
  if (!html.includes(`<meta name="description" content="${escapeHtml(route.description)}">`)) failures.push(`Wrong description: ${route.path}`);
  if (!html.includes(`rel="canonical" href="${canonicalUrl}"`)) failures.push(`Wrong canonical: ${route.path}`);
  if (!html.includes(`rel="alternate" type="text/markdown" href="${markdownUrl}"`)) failures.push(`Missing Markdown alternate: ${route.path}`);
  if (!html.includes('id="kitebaze-route-jsonld"')) failures.push(`Missing page schema: ${route.path}`);
  if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) failures.push(`Missing sitemap URL: ${route.path}`);
  if (!llms.includes(markdownUrl)) failures.push(`Missing llms.txt Markdown URL: ${route.path}`);
  if (!existsSync(markdownPath) || !read(markdownPath).includes(`Canonical webpage: [${canonicalUrl}](${canonicalUrl})`)) failures.push(`Missing or incorrect page Markdown: ${route.path}`);
}

const sitemapUrlCount = (sitemap.match(/<loc>/g) || []).length;
if (sitemapUrlCount !== PUBLIC_ROUTES.length) {
  failures.push(`Sitemap has ${sitemapUrlCount} URLs; expected ${PUBLIC_ROUTES.length}`);
}

const vercelRedirects = Object.fromEntries((vercel.redirects || []).map(({ source, destination }) => [source, destination]));
for (const [alias, canonicalPath] of Object.entries(ROUTE_ALIASES)) {
  if (sitemap.includes(`<loc>https://kitebaze.com${alias}</loc>`)) failures.push(`Alias is present in sitemap: ${alias}`);
  if (vercelRedirects[alias] !== canonicalPath) failures.push(`Missing or incorrect Vercel redirect: ${alias}`);
}

if (!robots.includes('Sitemap: https://kitebaze.com/sitemap.xml')) failures.push('robots.txt does not advertise the sitemap');
if (!robots.includes('User-agent: OAI-SearchBot')) failures.push('robots.txt does not address OAI-SearchBot');
if (!robots.includes('User-agent: Claude-SearchBot')) failures.push('robots.txt does not address Claude-SearchBot');
if (!indexSource.includes('rel="describedby" type="text/markdown" href="/llms.txt"')) failures.push('HTML does not advertise llms.txt');
if (!existsSync(join(distDirectory, '404.html')) || !read(join(distDirectory, '404.html')).includes('noindex, nofollow')) failures.push('Missing noindex 404 shell');
if (manifest.start_url !== '/' || manifest.scope !== '/') failures.push('Manifest start_url or scope is incorrect');

const markdownFiles = readdirSync(join(publicDirectory, 'llms-pages')).filter((filename) => filename.endsWith('.md'));
if (markdownFiles.length !== PUBLIC_ROUTES.length) failures.push(`Found ${markdownFiles.length} page Markdown files; expected ${PUBLIC_ROUTES.length}`);
if (existsSync(join(publicDirectory, 'kitebaze-work-diagnostic-knowledge-base.md'))) failures.push('Internal diagnostic knowledge base is still public');

const headerRules = Object.fromEntries((vercel.headers || []).map(({ source, headers }) => [source, headers]));
for (const source of ['/llms.txt', '/llms-full.txt', '/llms-pages/:path*']) {
  const xRobots = headerRules[source]?.find(({ key }) => key.toLowerCase() === 'x-robots-tag')?.value;
  if (xRobots !== 'noindex, follow') failures.push(`Missing noindex header for ${source}`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Validated ${PUBLIC_ROUTES.length} canonical routes, ${Object.keys(ROUTE_ALIASES).length} redirects, crawl files, metadata, and route shells.`);
