import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-[72vh] items-center bg-kb-canvas px-6 pb-24 pt-40 sm:pt-48">
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-kb-accent-ink">404 · Page not found</p>
        <h1 className="mt-6 font-space-grotesk text-5xl font-medium leading-tight tracking-tight text-kb-ink sm:text-7xl">This page has moved—or never existed.</h1>
        <p className="mx-auto mt-6 max-w-2xl font-inter text-lg font-light leading-relaxed text-kb-ink-soft">Head back to the homepage, or start with a free Workflow Review if you were looking for help with a process.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/" className="inline-flex min-h-12 items-center justify-center rounded-full bg-kb-ink px-8 py-3.5 font-inter text-sm font-medium text-white transition-opacity hover:opacity-85">Go to homepage</Link>
          <Link to="/book-workflow-review" className="inline-flex min-h-12 items-center justify-center rounded-full border border-kb-line-strong bg-kb-surface px-8 py-3.5 font-inter text-sm font-medium text-kb-ink transition-colors hover:border-kb-accent">Book a Workflow Review</Link>
        </div>
      </div>
    </section>
  );
}
