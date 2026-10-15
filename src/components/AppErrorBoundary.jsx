import { Component } from 'react';

export function PageLoadingFallback() {
  return (
    <main
      className="grid min-h-screen place-items-center bg-kb-canvas px-6 text-kb-ink"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-5">
        <span
          aria-hidden="true"
          className="size-10 animate-spin rounded-full border-2 border-kb-line-strong border-t-kb-accent"
        />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-kb-ink-soft">
          Loading Kitebaze
        </p>
      </div>
    </main>
  );
}

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Keep the failure visible in the browser console for diagnosis while
    // ensuring visitors still have a usable way out of a broken render.
    console.error('Kitebaze page render failed', error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="min-h-screen bg-kb-canvas px-6 py-10 text-kb-ink sm:px-10">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col">
          <a
            href="/"
            className="inline-flex w-fit items-center gap-3 text-xl font-semibold tracking-[-0.04em]"
            aria-label="Kitebaze home"
          >
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full bg-kb-accent text-base font-bold text-kb-on-accent"
            >
              K
            </span>
            KITEBAZE
          </a>

          <section className="my-auto rounded-[2rem] border border-kb-line bg-kb-surface p-7 shadow-[var(--kb-card-shadow)] sm:p-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-kb-accent-ink">
              Something went wrong
            </p>
            <h1 className="max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.05em] sm:text-6xl">
              This page hit a snag.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-kb-ink-soft sm:text-lg">
              Your information is safe. Reload the page to try again, or return to the homepage.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-kb-accent px-6 py-3.5 font-semibold text-kb-on-accent transition-colors hover:bg-kb-accent-hover"
              >
                Try again
              </button>
              <a
                href="/"
                className="rounded-full border border-kb-line-strong px-6 py-3.5 text-center font-semibold transition-colors hover:bg-kb-surface-soft"
              >
                Go to homepage
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
