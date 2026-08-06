/* ============================================================
   Poster modal — shared by research.html and publications.html

   USAGE — put these two lines on the page:
     <link rel="stylesheet" href="./assets/css/poster-modal.css">   (in <head>)
     <script src="./assets/js/poster-modal.js"></script>            (inside #app-content)

   Then mark anything that should open a poster:
     <button data-poster-src="./assets/images/posters/x.jpg"
             data-poster-title="My poster">View poster</button>

   Clicks are delegated from <document>, so triggers rendered later by a
   loader (publications-load.js) work without re-initialising anything.
   Also callable directly: PosterModal.open({ src: '...', title: '...' })
   ============================================================ */

(function () {
    'use strict';

    // The SPA router re-runs in-page scripts on every navigation; only wire up once.
    if (window.PosterModal) return;

    var modal = null, dialog, img, titleEl, bodyEl, fallback;
    var zoomLevelEl, btnIn, btnOut, btnReset;
    var lastFocused = null;
    var docEl = document.documentElement;
    var removeTimer = null;

    /* ---------------- Zoom ----------------
       Fixed stops rather than a flat step: the range runs to 1600%, and a
       constant 25% step would need dozens of clicks to cross it. Steps widen
       as you go up, so each click feels like the same jump. */
    var ZOOM_STOPS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16];
    var LAST_STOP = ZOOM_STOPS.length - 1;
    var zoomIndex = 0;
    var zoom = 1;
    var baseWidth = 0; // rendered width of the fitted image

    var TEMPLATE =
        '<div class="poster-backdrop" data-poster-close></div>' +
        '<div class="poster-dialog">' +
        '  <div class="poster-head">' +
        '    <div>' +
        '      <p class="poster-eyebrow">Poster</p>' +
        '      <h3 class="poster-title"></h3>' +
        '    </div>' +
        '    <button type="button" class="poster-close" data-poster-close aria-label="Close poster">' +
        '      <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>' +
        '    </button>' +
        '  </div>' +
        '  <div class="poster-body">' +
        '    <img alt="">' +
        '    <div class="poster-fallback">This poster will be uploaded soon.</div>' +
        '  </div>' +
        '  <div class="poster-foot">' +
        '    <span class="poster-foot-hint">Drag or scroll to move &nbsp;&middot;&nbsp; <b>Esc</b> to close</span>' +
        '    <div class="poster-zoom">' +
        '      <button type="button" class="zoom-out" aria-label="Zoom out" title="Zoom out (-)">&minus;</button>' +
        '      <span class="poster-zoom-level" aria-live="polite">100%</span>' +
        '      <button type="button" class="zoom-in" aria-label="Zoom in" title="Zoom in (+)">&plus;</button>' +
        '      <button type="button" class="zoom-reset" title="Reset zoom (0)">Fit</button>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    /* The modal only exists in the DOM while it is open. The SPA router strips
       page-specific stylesheets on navigation, and a modal left behind in <body>
       would then render as unstyled markup at the end of the page. */
    function build() {
        modal = document.createElement('div');
        modal.className = 'poster-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Poster viewer');
        modal.innerHTML = TEMPLATE;

        dialog = modal.querySelector('.poster-dialog');
        img = modal.querySelector('.poster-body img');
        titleEl = modal.querySelector('.poster-title');
        bodyEl = modal.querySelector('.poster-body');
        fallback = modal.querySelector('.poster-fallback');
        zoomLevelEl = modal.querySelector('.poster-zoom-level');
        btnIn = modal.querySelector('.zoom-in');
        btnOut = modal.querySelector('.zoom-out');
        btnReset = modal.querySelector('.zoom-reset');

        modal.querySelectorAll('[data-poster-close]').forEach(function (el) {
            el.addEventListener('click', close);
        });

        btnIn.addEventListener('click', function () { stepZoom(1); });
        btnOut.addEventListener('click', function () { stepZoom(-1); });
        btnReset.addEventListener('click', resetZoom);

        // Ctrl/Cmd + wheel zooms; a plain wheel just scrolls the poster
        bodyEl.addEventListener('wheel', function (e) {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            stepZoom(e.deltaY < 0 ? 1 : -1);
        }, { passive: false });

        bindPan();

        // Missing / not-yet-uploaded poster -> friendly message
        img.addEventListener('error', function () {
            if (!img.getAttribute('src')) return;
            img.classList.add('is-hidden');
            fallback.classList.add('is-shown');
        });

        // Capture the fitted width once the image has rendered.
        // offsetWidth, not getBoundingClientRect: the dialog may still be mid
        // scale() animation, which would scale the measured width down with it.
        img.addEventListener('load', function () {
            img.style.width = '';
            bodyEl.classList.remove('is-zoomed');
            baseWidth = img.offsetWidth;
            zoom = 1;
            zoomIndex = 0;
            applyZoom(false);
        });

        img.addEventListener('dragstart', function (e) { e.preventDefault(); });
    }

    function applyZoom(focal) {
        if (!baseWidth) return;

        // keep the point under the viewport centre steady while zooming
        var prevW = bodyEl.scrollWidth, prevH = bodyEl.scrollHeight;
        var cx = (bodyEl.scrollLeft + bodyEl.clientWidth / 2) / (prevW || 1);
        var cy = (bodyEl.scrollTop + bodyEl.clientHeight / 2) / (prevH || 1);

        if (zoom <= 1) {
            bodyEl.classList.remove('is-zoomed');
            img.style.width = '';
        } else {
            bodyEl.classList.add('is-zoomed');
            img.style.width = Math.round(baseWidth * zoom) + 'px';
        }

        zoomLevelEl.textContent = Math.round(zoom * 100) + '%';
        btnOut.disabled = zoomIndex <= 0;
        btnIn.disabled = zoomIndex >= LAST_STOP;
        btnReset.disabled = zoomIndex === 0;

        if (focal !== false) {
            bodyEl.scrollLeft = cx * bodyEl.scrollWidth - bodyEl.clientWidth / 2;
            bodyEl.scrollTop = cy * bodyEl.scrollHeight - bodyEl.clientHeight / 2;
        }
    }

    function stepZoom(dir) {
        var next = Math.min(LAST_STOP, Math.max(0, zoomIndex + dir));
        if (next === zoomIndex) return;
        zoomIndex = next;
        zoom = ZOOM_STOPS[zoomIndex];
        applyZoom();
    }

    function resetZoom() {
        if (zoomIndex === 0) return;
        zoomIndex = 0;
        zoom = 1;
        applyZoom();
    }

    /* ---------------- Drag to pan ----------------
       Always on — hovering the poster shows the pan cursor. */
    function bindPan() {
        var panning = false, startX = 0, startY = 0, startL = 0, startT = 0;

        bodyEl.addEventListener('pointerdown', function (e) {
            if (e.button !== 0 || e.target !== img) return;
            e.preventDefault();
            panning = true;
            startX = e.clientX; startY = e.clientY;
            startL = bodyEl.scrollLeft; startT = bodyEl.scrollTop;
            bodyEl.classList.add('is-panning');
            bodyEl.setPointerCapture(e.pointerId);
        });

        bodyEl.addEventListener('pointermove', function (e) {
            if (!panning) return;
            e.preventDefault();
            bodyEl.scrollLeft = startL - (e.clientX - startX);
            bodyEl.scrollTop = startT - (e.clientY - startY);
        });

        // Pointer capture keeps the drag alive outside the box, so pointerup /
        // pointercancel are enough to end it — no pointerleave needed.
        ['pointerup', 'pointercancel'].forEach(function (evt) {
            bodyEl.addEventListener(evt, function () {
                panning = false;
                bodyEl.classList.remove('is-panning');
            });
        });
    }

    /* ------------- Page scroll lock -------------
       These pages scroll on <html>, so both elements get locked. The scrollbar
       width is added back as padding to avoid a layout jump. */
    function lockScroll() {
        var sbw = window.innerWidth - docEl.clientWidth;
        docEl.style.setProperty('--poster-sbw', sbw + 'px');
        docEl.classList.add('poster-open');
        document.body.classList.add('poster-open');
    }

    function unlockScroll() {
        docEl.classList.remove('poster-open');
        document.body.classList.remove('poster-open');
        docEl.style.removeProperty('--poster-sbw');
    }

    function onKeydown(e) {
        if (e.key === 'Escape') { close(); return; }
        if (e.key === '+' || e.key === '=') { e.preventDefault(); stepZoom(1); }
        else if (e.key === '-' || e.key === '_') { e.preventDefault(); stepZoom(-1); }
        else if (e.key === '0') { e.preventDefault(); resetZoom(); }
    }

    function open(opts) {
        if (!opts || !opts.src) return;

        if (removeTimer) { clearTimeout(removeTimer); removeTimer = null; }
        if (!modal) build();
        if (!modal.parentNode) document.body.appendChild(modal);

        lastFocused = opts.trigger || document.activeElement;
        titleEl.textContent = opts.title || 'Poster';
        modal.querySelector('.poster-eyebrow').textContent = opts.eyebrow || 'Poster';

        fallback.classList.remove('is-shown');
        img.classList.remove('is-hidden');
        img.alt = (opts.title || 'Research') + ' poster';

        // reset zoom before the new poster loads
        zoom = 1;
        zoomIndex = 0;
        baseWidth = 0;
        img.style.width = '';
        bodyEl.classList.remove('is-zoomed', 'is-panning');
        bodyEl.scrollTop = 0;
        bodyEl.scrollLeft = 0;
        zoomLevelEl.textContent = '100%';
        btnOut.disabled = true;
        btnIn.disabled = false;
        btnReset.disabled = true;

        img.src = opts.src;

        lockScroll();
        document.addEventListener('keydown', onKeydown);

        // reflow so the opening transition actually plays on a fresh node
        void dialog.offsetWidth;
        modal.classList.add('is-open');

        modal.querySelector('.poster-close').focus();
    }

    function close() {
        if (!modal || !modal.classList.contains('is-open')) return;

        modal.classList.remove('is-open');
        unlockScroll();
        document.removeEventListener('keydown', onKeydown);

        // detach once the closing animation has finished
        removeTimer = setTimeout(function () {
            img.removeAttribute('src');
            if (modal.parentNode) modal.parentNode.removeChild(modal);
            removeTimer = null;
        }, 400);

        if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
        lastFocused = null;
    }

    /* ---------------- Trigger delegation ----------------
       Delegated from <document> so triggers rendered later (publication cards)
       need no extra wiring. */
    document.addEventListener('click', function (e) {
        var trigger = e.target.closest && e.target.closest('[data-poster-src]');
        if (!trigger) return;
        e.preventDefault();
        open({
            src: trigger.getAttribute('data-poster-src'),
            title: trigger.getAttribute('data-poster-title'),
            eyebrow: trigger.getAttribute('data-poster-eyebrow'),
            trigger: trigger
        });
    });

    // Enter/Space on non-button triggers (e.g. the research topic cards)
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var trigger = e.target.closest && e.target.closest('[data-poster-src]');
        if (!trigger || trigger.tagName === 'BUTTON' || trigger.tagName === 'A') return;
        e.preventDefault();
        trigger.click();
    });

    // Re-measure the fitted size when the viewport changes
    window.addEventListener('resize', function () {
        if (!modal || !modal.classList.contains('is-open') || !img.offsetWidth) return;
        if (zoom === 1) baseWidth = img.offsetWidth;
    });

    // Browser back/forward while the poster is open
    window.addEventListener('popstate', close);

    window.PosterModal = { open: open, close: close };
})();
