// Back to Top — injects a floating button that fades in once the reader has
// reached the bottom of the page, and scrolls back to the top when clicked.
// Include assets/css/back-to-top.css alongside this file.

(function () {
  // How close to the end of the page (in px) counts as "at the bottom".
  const BOTTOM_THRESHOLD = 120;

  function createButton() {
    const existing = document.getElementById("backToTop");
    if (existing) return existing;

    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.type = "button";
    btn.title = "Back to Top";
    btn.setAttribute("aria-label", "Back to Top");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>' +
      '<span>Back to Top</span>';

    document.body.appendChild(btn);
    return btn;
  }

  function initBackToTop() {
    const btn = createButton();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function update() {
      const doc = document.documentElement;
      // Nothing to scroll back from on a page that already fits the viewport.
      const scrollable = doc.scrollHeight > window.innerHeight + 40;
      const atBottom =
        window.scrollY + window.innerHeight >= doc.scrollHeight - BOTTOM_THRESHOLD;

      btn.classList.toggle("btt-visible", scrollable && atBottom);
    }

    // Coalesce scroll bursts into one check per frame.
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // The footer is fetched in, and the SPA router swaps page content — both
    // change the page height while the scroll position stays put.
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(onScroll).observe(document.body);
    }

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackToTop);
  } else {
    initBackToTop();
  }
})();
