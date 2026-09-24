import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  PUBLIC_ROUTES,
  SITE,
  getCanonicalUrl,
  getRouteMarkdownPath,
  getRouteMarkdownUrl,
} from '../src/seo/siteMetadata.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDirectory, '..');
const publicDirectory = join(projectRoot, 'public');
const llmsPagesDirectory = join(publicDirectory, 'llms-pages');

const LEGAL_SOURCE_BY_ROUTE = Object.freeze({
  '/privacy-policy': 'privacy-policy.md',
  '/terms-of-service': 'terms-of-use.md',
  '/vulnerability-disclosure': 'vulnerability-disclosure.md',
});

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildSitemap() {
  const urls = PUBLIC_ROUTES.map((route) => [
    '  <url>',
    `    <loc>${escapeXml(getCanonicalUrl(route.path))}</loc>`,
    `    <lastmod>${route.lastModified}</lastmod>`,
    '  </url>',
  ].join('\n')).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

function routeLink(route) {
  return `- [${route.label}](${getRouteMarkdownUrl(route.path)}): ${route.description}`;
}

function buildLlmsIndex() {
  const sectionOrder = ['Core pages', 'Services', 'Resources', 'Company', 'Trust and policies'];
  const sections = sectionOrder.map((section) => {
    const links = PUBLIC_ROUTES.filter((route) => route.section === section).map(routeLink);
    return `## ${section}\n\n${links.join('\n')}`;
  });

  return [
    '# Kitebaze',
    '',
    '> Kitebaze designs and maintains practical AI and workflow automation around the tools a business already uses, so repetitive work keeps moving without constant manual intervention.',
    '',
    'Kitebaze is an operator-led workflow automation company with a Calgary, Alberta contact address. Start with Fix One Bottleneck for a focused recurring problem, or Workflow Build when connected work crosses multiple people, teams, or systems.',
    '',
    'Technical crawler preferences are published in [robots.txt](https://kitebaze.com/robots.txt). Access, automated collection, and reuse remain subject to the [Terms of Use](https://kitebaze.com/terms-of-service).',
    '',
    ...sections.flatMap((section) => [section, '']),
    '## Optional',
    '',
    '- [Expanded site reference](https://kitebaze.com/llms-full.txt): Longer page summaries plus the complete public legal documents.',
    '- [XML sitemap](https://kitebaze.com/sitemap.xml): Canonical, indexable website URLs.',
    '',
  ].join('\n');
}

function stripTopHeading(markdown) {
  return markdown
    .replace(/^# .+\n+/, '')
    .replace(/^### /gm, '##### ')
    .replace(/^## /gm, '#### ')
    .trim();
}

function readContent(filename) {
  return readFileSync(join(projectRoot, 'src', 'content', filename), 'utf8');
}

function removeTopHeading(markdown) {
  return markdown.replace(/^# .+\n+/, '').trim();
}

function prepareLegalPageMarkdown(markdown) {
  return removeTopHeading(markdown)
    .replace(/^### /gm, '#### ')
    .replace(/^## /gm, '### ');
}

function buildRouteMarkdown(route) {
  const related = PUBLIC_ROUTES
    .filter((item) => item.path !== route.path && item.section === route.section)
    .map((item) => `- [${item.label}](${getRouteMarkdownUrl(item.path)}): ${item.description}`);
  const legalSource = LEGAL_SOURCE_BY_ROUTE[route.path];

  const sections = [
    `# ${route.label}`,
    '',
    `> ${route.description}`,
    '',
    `Canonical webpage: [${getCanonicalUrl(route.path)}](${getCanonicalUrl(route.path)})`,
    '',
    `Last updated: ${route.lastModified}`,
    '',
    '## Page summary',
    '',
    ...route.crawlText.flatMap((paragraph) => [paragraph, '']),
  ];

  if (legalSource) {
    sections.push('## Full public text', '', prepareLegalPageMarkdown(readContent(legalSource)), '');
  }

  if (related.length) {
    sections.push('## Related pages', '', ...related, '');
  }

  return sections.join('\n');
}

function buildLlmsFull() {
  const pages = PUBLIC_ROUTES.map((route) => [
    `## ${route.label}`,
    '',
    `Canonical URL: ${getCanonicalUrl(route.path)}`,
    '',
    route.description,
    '',
    ...route.crawlText.flatMap((paragraph) => [paragraph, '']),
  ].join('\n')).join('\n');

  const legalDocuments = [
    ['Privacy Policy', 'privacy-policy.md'],
    ['Terms of Use', 'terms-of-use.md'],
    ['Vulnerability Disclosure Policy', 'vulnerability-disclosure.md'],
  ].map(([title, filename]) => [
    `### ${title}`,
    '',
    stripTopHeading(readContent(filename)),
    '',
  ].join('\n')).join('\n');

  return [
    '# Kitebaze site reference',
    '',
    '> Expanded, text-first reference for the canonical public pages on kitebaze.com.',
    '',
    `Publisher: ${SITE.name}`,
    `Website: ${SITE.url}/`,
    `Language: ${SITE.language}`,
    `Contact: ${SITE.email}`,
    '',
    'This file summarizes public website content for retrieval and citation. Where a case study reports a result, it is identified as a page-reported outcome. Technical crawler preferences are published in robots.txt; access, automated collection, and reuse remain subject to the Terms of Use.',
    '',
    pages,
    '## Full public legal text',
    '',
    legalDocuments,
  ].join('\n');
}

if (existsSync(llmsPagesDirectory)) {
  readdirSync(llmsPagesDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .forEach((filename) => unlinkSync(join(llmsPagesDirectory, filename)));
}
mkdirSync(llmsPagesDirectory, { recursive: true });
writeFileSync(join(publicDirectory, 'sitemap.xml'), buildSitemap());
writeFileSync(join(publicDirectory, 'llms.txt'), buildLlmsIndex());
writeFileSync(join(publicDirectory, 'llms-full.txt'), buildLlmsFull());
PUBLIC_ROUTES.forEach((route) => {
  const outputPath = join(publicDirectory, getRouteMarkdownPath(route.path).slice(1));
  writeFileSync(outputPath, buildRouteMarkdown(route));
});

console.log(`Generated sitemap.xml, llms.txt, llms-full.txt, and ${PUBLIC_ROUTES.length} page-level Markdown alternates.`);
