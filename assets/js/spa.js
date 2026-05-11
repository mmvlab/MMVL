// MMVL SPA Router (PJAX)
// Intercepts nav-link clicks to swap only <main id="app-content">
// while keeping the navbar frozen in place.

document.addEventListener("DOMContentLoaded", () => {
  initRouter();

  // Handle back/forward browser buttons
  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname, false);
  });
});

function initRouter() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Update active states
  document.querySelectorAll("#navbar .nav-link").forEach(link => {
    link.style.opacity = (link.getAttribute("href") === currentPath) ? "1" : "0.7";

    // Remove old listeners to prevent duplicates
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);

    newLink.addEventListener("click", e => {
      e.preventDefault();
      const targetUrl = newLink.getAttribute("href");
      if (targetUrl !== currentPath) {
        loadPage(targetUrl, true);
      }
    });
  });
}

async function loadPage(url, pushHistory) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Page not found");
    const htmlText = await res.text();

    // Parse new HTML
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    const newContent = doc.getElementById("app-content");
    const oldContent = document.getElementById("app-content");

    if (newContent && oldContent) {
      // 1. Swap content
      oldContent.innerHTML = newContent.innerHTML;

      // 2. Sync Head — remove old dynamic styles, inject new page-specific ones
      document.querySelectorAll('.pjax-dynamic-style').forEach(el => el.remove());

      const currentSheets = new Set(
        Array.from(document.querySelectorAll('head > link[rel="stylesheet"]:not(.pjax-dynamic-style)'))
          .map(el => el.getAttribute('href'))
      );

      doc.querySelectorAll('head > link[rel="stylesheet"], head > style').forEach(el => {
        if (el.tagName.toLowerCase() === 'link') {
          if (!currentSheets.has(el.getAttribute('href'))) {
            const newEl = el.cloneNode(true);
            newEl.classList.add('pjax-dynamic-style');
            document.head.appendChild(newEl);
          }
        } else {
          // Inline <style> — always inject as dynamic (page-specific CSS)
          const newEl = el.cloneNode(true);
          newEl.classList.add('pjax-dynamic-style');
          document.head.appendChild(newEl);
        }
      });

      // 3. Update Title and URL
      document.title = doc.title;
      if (pushHistory) {
        window.history.pushState(null, doc.title, url);
      }

      // 4. Re-execute scripts inside the new content
      await executeScripts(oldContent);

      // 5. Trigger fade-up animation
      oldContent.style.animation = 'none';
      oldContent.offsetHeight; // force reflow
      oldContent.style.animation = null;

      // 6. Re-initialize Bootstrap Carousel if present
      if (typeof bootstrap !== 'undefined') {
        const carouselEl = oldContent.querySelector('.carousel');
        if (carouselEl) {
          new bootstrap.Carousel(carouselEl, {
            interval: 3000,
            ride: 'carousel'
          });
        }
      }

      // 7. Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 8. Re-initialize router for the new active links
      initRouter();

      // 9. Re-initialize scroll reveal for new content
      if (typeof initScrollReveal === 'function') {
        initScrollReveal();
      }
    } else {
      window.location.href = url; // Fallback
    }
  } catch (err) {
    console.error("SPA navigation error:", err);
    window.location.href = url; // Fallback hard reload
  }
}

// Load scripts sequentially (critical for data -> loader ordering)
async function executeScripts(container) {
  const scripts = Array.from(container.querySelectorAll("script"));
  for (const oldScript of scripts) {
    await new Promise((resolve) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));

      if (newScript.src) {
        newScript.onload = resolve;
        newScript.onerror = resolve;
      }

      oldScript.parentNode.replaceChild(newScript, oldScript);

      if (!newScript.src) {
        resolve();
      }
    });
  }
}
