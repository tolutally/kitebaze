# Kitebaze Website

A React + Vite website. The original static design/markup was ported into componentized JSX under `src/` — visual design is unchanged.

## Structure

- `src/main.jsx` – React entry point
- `src/App.jsx` – top-level page composition
- `src/seo/siteMetadata.js` – canonical public routes, titles, descriptions, schema types, and crawl summaries
- `src/components/` – one component per page section (Header, Hero, Approach, FAQ, Footer, etc.)
- `src/hooks/` – scroll-reveal and testimonial-scroll effects ported from the original vanilla JS
- `src/index.css` – global keyframes/animation utility classes used across sections
- `scripts/` – sitemap/LLM discovery generation, route-shell generation, and SEO validation
- `internal/` – source documents retained for the project but intentionally excluded from the public site

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The optimized output is generated in `dist/`.

The build automatically regenerates `sitemap.xml`, `llms.txt`, `llms-full.txt`, and one Markdown alternate per public page, then emits a route-specific HTML shell for each canonical URL. When adding or renaming a public page, update `src/seo/siteMetadata.js`, the React route in `src/main.jsx`, and any matching redirect in `vercel.json`.

Validate the complete route and crawl surface after a build:

```bash
npm run check:seo
```

## Workflow review calendar

The `/book-workflow-review` page embeds the `kitebaze/30min` Cal event using `@calcom/embed-react`.
