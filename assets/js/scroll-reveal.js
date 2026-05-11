// Scroll Reveal — Ultra-smooth IntersectionObserver with row-based stagger
// Add [data-reveal] to any element. Optional: data-reveal-delay="100" (ms).

function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]:not(.sr-visible)');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.revealDelay || 0, 10);

        // Step 1: Enable transitions (prevents initial render flash)
        requestAnimationFrame(() => {
          el.classList.add('sr-animate');

          // Step 2: After one frame, trigger the reveal
          requestAnimationFrame(() => {
            if (delay > 0) {
              el.style.transitionDelay = delay + 'ms';
            }
            el.classList.add('sr-visible');

            // Step 3: Clean up transition-delay after animation completes
            if (delay > 0) {
              setTimeout(() => {
                el.style.transitionDelay = '';
              }, delay + 1000);
            }
          });
        });

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.06,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
