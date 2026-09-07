import { useEffect } from 'react';

/**
 * Ports the original sticky-testimonial scroll effect: as the next card
 * approaches, the current one scales down and dims slightly.
 */
export default function useTestimonialScroll() {
  useEffect(() => {
    const testimonials = document.querySelectorAll('.testimonial-sticky');
    if (!testimonials.length) return;

    function onScroll() {
      testimonials.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const inner = el.querySelector('.testimonial-inner');
        if (!inner) return;
        const offsetTop = parseInt(window.getComputedStyle(el).top, 10);
        if (rect.top <= offsetTop && index < testimonials.length - 1) {
          const nextEl = testimonials[index + 1];
          const nextRect = nextEl.getBoundingClientRect();
          const distance = nextRect.top - rect.top;
          const threshold = 180;
          if (distance < threshold) {
            const progress = 1 - distance / threshold;
            inner.style.transform = `scale(${1 - progress * 0.05})`;
            inner.style.filter = `brightness(${1 - progress * 0.5})`;
          } else {
            inner.style.transform = 'scale(1)';
            inner.style.filter = 'brightness(1)';
          }
        } else {
          inner.style.transform = 'scale(1)';
          inner.style.filter = 'brightness(1)';
        }
      });
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
