// Alumni Page — Dynamic Renderer
// Reads the four lists in data/alumni-data.js (PhD / Project / Masters /
// Bachelors) and paints the sections in that order.

/* ── Shared helpers ── */

// Placeholder hrefs ("#", "") are treated as no link, so cards never show a
// social icon that goes nowhere.
function hasLink(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

const LINKEDIN_ICON =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 23.5h4.56V7.98H.22zM8.22 7.98h4.38v2.12h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99v8.79h-4.56v-7.8c0-1.86-.03-4.25-2.59-4.25-2.59 0-2.99 2.02-2.99 4.11v7.94H8.22z"/></svg>';

function emptyState(message) {
  return `
    <div class="empty-state" style="grid-column:1/-1;">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
      <p>${message}</p>
    </div>`;
}

// Writes the "N alumni" pill next to a section heading.
function setCount(id, n) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = n === 1 ? "1 alumnus" : `${n} alumni`;
  el.classList.toggle("is-empty", n === 0);
}

/* ── Detailed cards: PhD, Project and Masters alumni ──
   Students carry degree / thesis / year; project fellows carry role / project /
   completed plus a funding line, so each row falls back to the other list's
   field and the funding line is simply skipped for students. */

// "Completed Jan 2025" for fellows, "Graduated 2025" for students.
function periodLine(a) {
  if (a.completed) return `Completed ${a.completed}`;
  return a.year ? `Graduated ${a.year}` : "";
}

function renderAlumniGrid(containerId, list, emptyMessage) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!list.length) {
    el.innerHTML = emptyState(emptyMessage);
    return;
  }

  el.innerHTML = list.map((a, i) => {
    const label  = a.degree || a.role || "";
    const work   = a.thesis || a.project || "";
    const period = periodLine(a);
    return `
    <div class="alumni-card" data-reveal data-reveal-delay="${(i % 3) * 90}">
      <div class="alumni-name">${a.name}</div>
      ${label ? `<span class="alumni-degree">${label}</span>` : ""}
      ${work ? `<div class="alumni-thesis">${work}</div>` : ""}
      ${a.funding ? `<div class="alumni-funding">${a.funding}</div>` : ""}
      ${period ? `<div class="alumni-year">${period}</div>` : ""}
      ${a.currentPosition ? `<div class="alumni-position">${a.currentPosition}</div>` : ""}
      ${hasLink(a.linkedin) ? `
        <div class="alumni-icons">
          <a href="${a.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="${a.name} on LinkedIn">
            ${LINKEDIN_ICON}
          </a>
        </div>` : ""}
    </div>`;
  }).join("");
}

/* ── Compact cells: Bachelors alumni ── */
function renderBtechAlumni(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!list.length) {
    el.innerHTML = emptyState("No bachelors alumni listed yet.");
    return;
  }

  el.innerHTML = `
    <div class="btech-alumni-grid">
      ${list.map((s, i) => `
        <div class="btech-alumni-cell" data-reveal data-reveal-delay="${(i % 4) * 70}">
          <span class="btech-alumni-name">${s.name}</span>
          ${s.degree ? `<span class="btech-alumni-dept">${s.degree}</span>` : ""}
          ${s.thesis ? `<span class="btech-alumni-project">${s.thesis}</span>` : ""}
          ${s.year ? `<span class="btech-alumni-year">Graduated ${s.year}</span>` : ""}
        </div>
      `).join("")}
    </div>`;
}

function initAlumniPage() {
  // Order is fixed: PhD → Project → Masters → Bachelors.
  renderAlumniGrid("phdAlumniGrid", phdAlumni,
    "We are waiting for our first PhD scholar to graduate — who will it be?");
  renderAlumniGrid("projectAlumniGrid", projectAlumni,
    "No project alumni listed yet.");
  renderAlumniGrid("mastersAlumniGrid", mastersAlumni,
    "No masters alumni listed yet.");
  renderBtechAlumni("btechAlumniGrid", bachelorsAlumni);

  setCount("phdAlumniCount", phdAlumni.length);
  setCount("projectAlumniCount", projectAlumni.length);
  setCount("mastersAlumniCount", mastersAlumni.length);
  setCount("btechAlumniCount", bachelorsAlumni.length);

  if (typeof initScrollReveal === "function") initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAlumniPage);
} else {
  initAlumniPage();
}
