import { useEffect } from 'react';

/**
 * Replicates the original global IntersectionObserver that toggles
 * `.is-visible` on `.fade-up-element` / `.typography-reveal` nodes as they
 * scroll into view, plus the one-time `history.scrollRestoration` / scroll-to-top setup.
 */
export default function useScrollReveal() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    document.querySelectorAll('.fade-up-element, .typography-reveal').forEach((el) => {
      el.classList.remove('is-visible');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 },
    );

    document.querySelectorAll('.typography-reveal, .fade-up-element').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
