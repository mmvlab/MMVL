// Gallery Page — masonry renderer, category filter, and photo viewer.
//
// Mirrors the pattern used by team-load.js: data lives in data/gallery-data.js,
// this file turns it into markup.
//
// NOTE ON THE SPA ROUTER (assets/js/spa.js)
// Scripts inside #app-content are re-executed on every in-app navigation, so
// everything at the top level here is `var` or `function` — a top-level `const`
// or `let` would throw "already declared" on the second visit. Document-level
// listeners are registered once behind the window.MMVLGalleryViewer guard.

/* ─────────────── ordering ─────────────── */

var GAL_MONTHS = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

// "Mar 2026" -> 24314, so photos can be sorted chronologically.
// Returns -Infinity for a missing/unparseable date, which sorts it last in the
// newest-first order rather than letting it jump to the top.
function galDateRank(value) {
  var match = String(value || '').trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  var month = match ? GAL_MONTHS[match[1].slice(0, 3).toLowerCase()] : undefined;
  if (month === undefined) return -Infinity;
  return Number(match[2]) * 12 + month;
}

// Newest first. Copies before sorting so galleryPhotos is never reordered, and
// ranks each photo once up front instead of re-parsing inside the comparator.
function galSorted(list) {
  return list
    .map(function (photo) { return { photo: photo, rank: galDateRank(photo.date) }; })
    .sort(function (a, b) { return b.rank - a.rank; })
    .map(function (entry) { return entry.photo; });
}

function galCategoryLabel(id) {
  for (var i = 0; i < galleryCategories.length; i++) {
    if (galleryCategories[i].id === id) return galleryCategories[i].label;
  }
  return '';
}

function galEscape(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ─────────────── grid ─────────────── */

// Photos currently on screen, in display order — the viewer steps through this
// so prev/next follow whatever filter is active.
var galVisible = [];
var galActiveCategory = 'all';

function galRenderChips() {
  var box = document.getElementById('galleryFilters');
  if (!box) return;

  box.innerHTML = galleryCategories.map(function (cat) {
    // Hide a category that has no photos yet, so the bar never offers a filter
    // that leads to an empty grid. "All" always stays.
    var count = cat.id === 'all'
      ? galleryPhotos.length
      : galleryPhotos.filter(function (p) { return p.category === cat.id; }).length;
    if (!count) return '';

    return '<button type="button" class="gal-chip' +
      (cat.id === galActiveCategory ? ' active' : '') +
      '" data-gal-filter="' + galEscape(cat.id) + '">' +
      galEscape(cat.label) + '</button>';
  }).join('') +
    '<span class="gal-count" id="galleryCount"></span>';
}

function galEmptyState() {
  return '' +
    '<div class="gal-empty">' +
    '  <svg viewBox="0 0 24 24" aria-hidden="true">' +
    '    <rect x="3" y="3" width="18" height="18" rx="2.5"></rect>' +
    '    <circle cx="8.5" cy="8.5" r="1.8"></circle>' +
    '    <path d="M21 15l-5-5L5 21"></path>' +
    '  </svg>' +
    '  <div class="gal-empty-title">No photos here yet</div>' +
    '  <div>Pictures from this part of lab life will show up here soon.</div>' +
    '</div>';
}

function galRenderGrid() {
  var grid = document.getElementById('galleryGrid');
  if (!grid) return;

  var photos = galSorted(galleryPhotos).filter(function (p) {
    return galActiveCategory === 'all' || p.category === galActiveCategory;
  });
  galVisible = photos;

  var countEl = document.getElementById('galleryCount');
  if (countEl) {
    countEl.textContent = photos.length + (photos.length === 1 ? ' photo' : ' photos');
  }

  if (!photos.length) {
    grid.innerHTML = galEmptyState();
    return;
  }

  grid.innerHTML = photos.map(function (photo, i) {
    var label = galCategoryLabel(photo.category);
    var title = photo.title || '';
    // alt falls back to the title: a decorative-looking empty alt would hide
    // these from screen readers entirely.
    var alt = photo.alt || title || 'MMVL lab photo';

    return '' +
      '<button type="button" class="gal-item" data-gal-index="' + i + '"' +
      ' aria-label="' + galEscape(title ? 'Open photo: ' + title : 'Open photo') + '">' +
      '  <img src="' + galEscape(photo.src) + '" alt="' + galEscape(alt) + '"' +
      '       loading="lazy" decoding="async">' +
      (label ? '  <span class="gal-tag">' + galEscape(label) + '</span>' : '') +
      (title
        ? '  <span class="gal-cap">' +
          '    <span class="gal-cap-title">' + galEscape(title) + '</span>' +
          (photo.date ? '<span class="gal-cap-meta">' + galEscape(photo.date) + '</span>' : '') +
          '  </span>'
        : '') +
      '</button>';
  }).join('');
}

function galSetCategory(id) {
  galActiveCategory = id;
  var chips = document.querySelectorAll('[data-gal-filter]');
  for (var i = 0; i < chips.length; i++) {
    chips[i].classList.toggle('active', chips[i].getAttribute('data-gal-filter') === id);
  }
  galRenderGrid();
}

/* ─────────────── viewer ─────────────── */

// Built once per page load and torn down on close. Leaving it in <body> would
// outlive gallery.css — the SPA router strips page stylesheets on navigation,
// and the leftover markup would render unstyled at the foot of the next page.
(function () {
  'use strict';
  if (window.MMVLGalleryViewer) return;

  var node = null;
  var imgEl, titleEl, capEl, metaEl, counterEl;
  var index = 0;
  var lastFocused = null;

  var TEMPLATE =
    '<div class="gal-viewer-backdrop" data-gal-close></div>' +
    '<div class="gal-viewer-dialog" role="dialog" aria-modal="true" aria-label="Photo viewer">' +
    '  <button type="button" class="gal-viewer-close" data-gal-close aria-label="Close viewer">' +
    '    <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    '  </button>' +
    '  <div class="gal-viewer-stage">' +
    '    <button type="button" class="gal-nav gal-prev" data-gal-prev aria-label="Previous photo">' +
    '      <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>' +
    '    </button>' +
    '    <img alt="">' +
    '    <button type="button" class="gal-nav gal-next" data-gal-next aria-label="Next photo">' +
    '      <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>' +
    '    </button>' +
    '  </div>' +
    '  <div class="gal-viewer-info">' +
    '    <div>' +
    '      <p class="gal-viewer-title"></p>' +
    '      <p class="gal-viewer-caption"></p>' +
    '    </div>' +
    '    <div class="gal-viewer-meta">' +
    '      <span class="gal-viewer-counter"></span>' +
    '      <span class="gal-viewer-date"></span>' +
    '      <span class="gal-viewer-hint">← → to browse · Esc to close</span>' +
    '    </div>' +
    '  </div>' +
    '</div>';

  function build() {
    node = document.createElement('div');
    node.className = 'gal-viewer';
    node.innerHTML = TEMPLATE;
    document.body.appendChild(node);

    imgEl = node.querySelector('.gal-viewer-stage img');
    titleEl = node.querySelector('.gal-viewer-title');
    capEl = node.querySelector('.gal-viewer-caption');
    metaEl = node.querySelector('.gal-viewer-date');
    counterEl = node.querySelector('.gal-viewer-counter');

    node.addEventListener('click', function (e) {
      if (e.target.closest('[data-gal-close]')) { close(); return; }
      if (e.target.closest('[data-gal-prev]')) { step(-1); return; }
      if (e.target.closest('[data-gal-next]')) { step(1); }
    });
  }

  function show(i) {
    var list = galVisible;
    if (!list.length) return;
    // Wrap around, so browsing never dead-ends at either edge.
    index = (i + list.length) % list.length;
    var photo = list[index];

    imgEl.src = photo.src;
    imgEl.alt = photo.alt || photo.title || 'MMVL lab photo';
    titleEl.textContent = photo.title || '';
    capEl.textContent = photo.caption || '';
    capEl.style.display = photo.caption ? '' : 'none';
    metaEl.textContent = photo.date || '';
    counterEl.textContent = (index + 1) + ' / ' + list.length;

    // A single photo has nowhere to go — hide the arrows rather than
    // offering controls that just reload the same image.
    var single = list.length < 2;
    node.querySelector('.gal-prev').style.display = single ? 'none' : '';
    node.querySelector('.gal-next').style.display = single ? 'none' : '';
  }

  function step(delta) { show(index + delta); }

  function open(i) {
    if (!galVisible.length) return;
    lastFocused = document.activeElement;
    if (!node) build();
    show(i);
    document.body.classList.add('gal-locked');
    // next frame, so the opening transition actually runs
    requestAnimationFrame(function () { node.classList.add('is-open'); });
    var closeBtn = node.querySelector('.gal-viewer-close');
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    if (!node) return;
    node.classList.remove('is-open');
    document.body.classList.remove('gal-locked');
    var dying = node;
    node = null;
    setTimeout(function () {
      if (dying && dying.parentNode) dying.parentNode.removeChild(dying);
    }, 220);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }

  // Delegated from document so tiles re-rendered by the filter keep working
  // without rebinding anything.
  document.addEventListener('click', function (e) {
    var tile = e.target.closest ? e.target.closest('[data-gal-index]') : null;
    if (tile) {
      open(Number(tile.getAttribute('data-gal-index')));
      return;
    }
    var chip = e.target.closest ? e.target.closest('[data-gal-filter]') : null;
    if (chip) galSetCategory(chip.getAttribute('data-gal-filter'));
  });

  document.addEventListener('keydown', function (e) {
    if (!node) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });

  window.MMVLGalleryViewer = { open: open, close: close };
})();

/* ─────────────── init ─────────────── */

function initGalleryPage() {
  if (!document.getElementById('galleryGrid')) return;
  galActiveCategory = 'all';
  galRenderChips();
  galRenderGrid();

  if (typeof initScrollReveal === 'function') initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryPage);
} else {
  initGalleryPage();
}
