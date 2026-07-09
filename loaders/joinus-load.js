// Join Us Page — Dynamic Renderer
// Reads data/joinus-data.js and paints the PhD, Project, M.Tech/B.Tech and
// Internship sections. Mirrors the pattern used by team-load.js.

/* ── Inline icons for the PhD fellowship cards ── */
function joinIcon(name) {
  const icons = {
    cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/><path d="M22 10v6"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11"/>',
    spark: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',
    star: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
  };
  return `<svg class="join-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.cap}</svg>`;
}

/* ── 1. PhD fellowships — all tracks inside one frame ── */
function renderPhdFellowships() {
  const el = document.getElementById("phdFellowshipGrid");
  if (!el) return;
  el.innerHTML = `
    <div class="fellow-frame" data-reveal>
      ${phdFellowships.map(f => `
        <div class="fellow-item">
          <div class="fellow-item-head">
            <div class="fellow-icon-wrap">${joinIcon(f.icon)}</div>
            <div>
              <h3 class="fellow-name">${f.name}</h3>
              <span class="agency-chip">${f.agency}</span>
              ${f.highlight ? `<p class="fellow-tagline">${f.highlight}</p>` : ""}
            </div>
          </div>
          <div class="fellow-item-terms">
            <div class="term-row"><span class="term-label">Eligibility</span><span class="term-value">${f.eligibility}</span></div>
            <div class="term-row"><span class="term-label">Fellowship</span><span class="term-value">${f.stipend}</span></div>
            <div class="term-row"><span class="term-label">Duration</span><span class="term-value">${f.duration}</span></div>
            <div class="term-row"><span class="term-label">Benefits</span><span class="term-value">${f.benefits}</span></div>
          </div>
        </div>
      `).join("")}

    </div>
  `;
}

/* ── 2. Project (JRF/SRF) position cards ── */
function statusBadge(status) {
  if (status === "available")
    return `<span class="status-badge status-available"><span class="pulse-dot"></span>Available</span>`;
  if (status === "upcoming")
    return `<span class="status-badge status-upcoming">Opening Soon</span>`;
  return `<span class="status-badge status-closed">Applications Closed</span>`;
}

function renderProjectPositions() {
  const el = document.getElementById("projectPositionsGrid");
  if (!el) return;
  el.innerHTML = projectPositions.map((p, i) => {
    const isOpen = p.status === "available";
    const agencies = Array.isArray(p.agencies) ? p.agencies : [p.agency];
    return `
    <div class="pos-card ${isOpen ? "pos-open" : ""}" data-reveal data-reveal-delay="${(i % 2) * 120}">
      <div class="pos-top">
        <div>
          <h3 class="pos-role">${p.role}</h3>
          <div class="agency-chips">
            ${agencies.map(a => `<span class="agency-chip">${a}</span>`).join("")}
          </div>
        </div>
        ${statusBadge(p.status)}
      </div>

      <p class="pos-project">${p.project}</p>

      <div class="term-list">
        <div class="term-row"><span class="term-label">Positions</span><span class="term-value">${p.positions > 0 ? p.positions : "—"}</span></div>
        <div class="term-row"><span class="term-label">Eligibility</span><span class="term-value">${p.eligibility}</span></div>
        <div class="term-row"><span class="term-label">Fellowship</span><span class="term-value">${p.stipend}</span></div>
        <div class="term-row"><span class="term-label">Duration</span><span class="term-value">${p.duration}</span></div>
        <div class="term-row"><span class="term-label">Last Date</span><span class="term-value">${p.lastDate}</span></div>
      </div>

      ${isOpen
        ? `<a class="join-btn" href="${p.formLink}" target="_blank" rel="noopener noreferrer">
             Join Us
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
           </a>`
        : `<div class="join-note">Not accepting applications right now — check back soon or write to
             <a href="mailto:${joinConfig.labEmail}">${joinConfig.labEmail}</a>.</div>`}
    </div>
  `;
  }).join("");
}

/* ── 3. + 4. Inject config into M.Tech/B.Tech and Internship blocks ── */
function fillJoinConfig() {
  const mailA = document.querySelectorAll("[data-lab-email]");
  mailA.forEach(a => { a.href = "mailto:" + joinConfig.labEmail; a.textContent = joinConfig.labEmail; });

  const supMail = document.querySelectorAll("[data-sup-email]");
  supMail.forEach(a => { a.href = "mailto:" + joinConfig.supervisorEmail; a.textContent = joinConfig.supervisorEmail; });

  const supName = document.querySelectorAll("[data-sup-name]");
  supName.forEach(s => { s.textContent = joinConfig.supervisorName; });

  const addr = document.querySelectorAll("[data-lab-address]");
  addr.forEach(s => { s.textContent = joinConfig.labAddress; });

  const internBtn = document.getElementById("internFormBtn");
  if (internBtn) internBtn.href = joinConfig.internshipFormLink;
}

function initJoinPage() {
  renderPhdFellowships();
  renderProjectPositions();
  fillJoinConfig();
  if (typeof initScrollReveal === "function") initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initJoinPage);
} else {
  initJoinPage();
}
