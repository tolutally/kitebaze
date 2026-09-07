# Kitebaze Website

A React + Vite website. The original static design/markup was ported into componentized JSX under `src/` — visual design is unchanged.

## Structure

- `src/main.jsx` – React entry point
- `src/App.jsx` – top-level page composition
- `src/components/` – one component per page section (Header, Hero, Approach, FAQ, Footer, etc.)
- `src/hooks/` – scroll-reveal and testimonial-scroll effects ported from the original vanilla JS
- `src/index.css` – global keyframes/animation utility classes used across sections

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
