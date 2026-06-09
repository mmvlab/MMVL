// Scroll Reveal — staggered page-load cascade + IntersectionObserver for scroll

function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]:not(.sr-visible)');
  if (!reveals.length) return;

  function revealEl(el, extraDelay) {
    const delay = (extraDelay || 0) + parseInt(el.dataset.revealDelay || 0, 10);

    el.classList.add('sr-animate');

    // Double rAF: first frame registers the starting state + transition,
    // second frame applies the end state so the transition actually plays.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (delay > 0) el.style.transitionDelay = delay + 'ms';
        el.classList.add('sr-visible');
        if (delay > 0) {
          setTimeout(() => { el.style.transitionDelay = ''; }, delay + 1200);
        }
      });
    });
  }

  // Split: elements already in viewport vs those below the fold
  const inView = [];
  const offScreen = [];

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight + 40) {
      inView.push(el);
    } else {
      offScreen.push(el);
    }
  });

  // Stagger in-viewport elements top-to-bottom.
  // Elements that already have data-reveal-delay (card rows) use their own delay;
  // elements without one get a position-based cascade (80ms apart).
  inView
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
    .forEach((el, i) => {
      const hasOwnDelay = parseInt(el.dataset.revealDelay || 0, 10) > 0;
      revealEl(el, hasOwnDelay ? 0 : i * 120);
    });

  // IntersectionObserver for elements that need to scroll into view
  if (!offScreen.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealEl(entry.target, 0);
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  offScreen.forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
