// Team Page — Dynamic Card Renderer with Row-by-Row Scroll Reveal

// ===== ORDERING BY JOIN DATE =====
// Lists in data/team-data.js can be written in any order — new members may just
// be appended to the end. The renderers sort them here instead, so the page
// always shows the earliest joiner first.

var MONTH_INDEX = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

// "Jul 2024" -> 24294, a single number that sorts chronologically.
// Full month names ("July 2024") and a trailing dot ("Sept. 2025") are accepted.
// Anything unparseable returns Infinity so the entry sinks to the bottom of the
// list — visible enough to get noticed and fixed, rather than silently sorting
// to the top as a 0 would.
function joinedRank(joined) {
  const match = String(joined || '').trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  const month = match ? MONTH_INDEX[match[1].slice(0, 3).toLowerCase()] : undefined;
  if (month === undefined) {
    console.warn('team-data.js: unrecognised "joined" value ' + JSON.stringify(joined) +
                 ' — expected a format like "Jul 2024". Sorting it last.');
    return Infinity;
  }
  return Number(match[2]) * 12 + month;
}

// Earliest joiner first. Copies the list rather than reordering it in place, so
// the data file is never mutated. Sort is stable, so members sharing a join
// month stay in the order they appear in team-data.js — write them in the order
// you want them to tie-break.
function byJoined(list) {
  return list
    .map(function (member) {
      // Rank each member once up front rather than inside the comparator, which
      // sort() calls repeatedly — that would re-parse the date and repeat the
      // warning above several times for a single bad entry.
      return { member: member, rank: joinedRank(member.joined) };
    })
    .sort(function (a, b) { return a.rank - b.rank; })
    .map(function (entry) { return entry.member; });
}

function iconRow(member) {
  return `
    <div class="icon-row">
      <a href="${member.linkedin}" target="_blank" aria-label="LinkedIn">
        <svg class="icon"><use href="#linkedin" /></svg>
      </a>
      <a href="${member.scholar}" target="_blank" aria-label="Google Scholar">
        <svg class="icon"><use href="#scholar" /></svg>
      </a>
      <a href="${member.email}" aria-label="Email">
        <svg class="icon" style="stroke:black;"><use href="#mail" /></svg>
      </a>
      <a href="${member.website || '#'}" target="_blank" aria-label="Website">
        <svg class="icon website-icon"><use href="#website" /></svg>
      </a>
    </div>
  `;
}

function renderSupervisor() {
  const container = document.getElementById("supervisorBox");
  container.innerHTML = `
    <div class="supervisor" data-reveal>
      <div class="profile-img-wrap">
        <img src="${supervisorData.image}" class="profile-img" alt="${supervisorData.name}" />
      </div>
      <div>
        <h2>${supervisorData.name}</h2>
        <div class="role">Chief of MMVL</div>
        <div class="role">${supervisorData.role}</div>
        <p>${supervisorData.bio}</p>
        ${iconRow(supervisorData)}
      </div>
    </div>
  `;
}

// Row stagger: cards in the same row share a delay, next row gets +200ms
function rowDelay(index, cols) {
  const row = Math.floor(index / cols);
  return row * 200;
}

function renderPhd() {
  const container = document.getElementById("phdGrid");
  container.innerHTML = phdStudents.map((s, i) => {
    const commaIdx = s.name.indexOf(', ');
    const displayName = commaIdx !== -1 ? s.name.slice(0, commaIdx) : s.name;
    const degree      = commaIdx !== -1 ? s.name.slice(commaIdx + 2) : '';
    return `
    <div class="card" data-reveal data-reveal-delay="${rowDelay(i, 3)}">
      <div class="profile-img-wrap">
        <img src="${s.image}" class="profile-img" alt="${displayName}" />
      </div>
      <div class="name">${displayName}</div>
      ${degree ? `<span class="degree-badge">${degree}</span>` : ''}
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      ${s.hasCosupervisor ? `<div class="joined"><b>Mentor & Collaborator: </b>${s.cosupervisor}</div>` : ""}
      <div class="role"><b>Research: </b>${s.research}</div>
      ${iconRow(s)}
    </div>
  `;
  }).join("");
}

function renderMtech() {
  const container = document.getElementById("mtechGrid");
  container.innerHTML = byJoined(mtechStudents).map((s, i) => {
    const commaIdx = s.name.indexOf(', ');
    const displayName = commaIdx !== -1 ? s.name.slice(0, commaIdx) : s.name;
    const degree     = commaIdx !== -1 ? s.name.slice(commaIdx + 2) : '';
    return `
    <div class="card" data-reveal data-reveal-delay="${rowDelay(i, 4)}">
      <div class="profile-img-wrap">
        <img src="${s.image}" class="profile-img" alt="${displayName}" />
      </div>
      <div class="name">${displayName}</div>
      ${degree ? `<span class="degree-badge">${degree}</span>` : ''}
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      <div class="role">${s.research}</div>
      ${iconRow(s)}
    </div>
  `;
  }).join("");
}

// Shown while there is no project associate on the team, so the section
// advertises the opening instead of sitting empty.
function hiringCard() {
  return `
    <div class="card card-hiring" data-reveal>
      <div class="hiring-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M19 8v6M22 11h-6"/>
        </svg>
      </div>
      <div class="name">We Are Hiring</div>
      <span class="degree-badge">JRF / SRF</span>
      <div class="role">
        This seat is open. We are looking for a Junior Research Fellow to join MMVL
        on our sponsored research projects.
      </div>
      <a class="hiring-link" href="joinus.html#projects">
        View the opening
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  `;
}

function renderProjectAssociate() {
  const container = document.getElementById("projectAssociateGrid");
  if (!container) return;

  if (!projectAssociate.length) {
    container.innerHTML = hiringCard();
    return;
  }

  container.innerHTML = projectAssociate.map((s, i) => {
    const commaIdx = s.name.indexOf(', ');
    const displayName = commaIdx !== -1 ? s.name.slice(0, commaIdx) : s.name;
    const degree      = commaIdx !== -1 ? s.name.slice(commaIdx + 2) : '';
    return `
    <div class="card" data-reveal data-reveal-delay="${rowDelay(i, 3)}">
      <div class="profile-img-wrap">
        <img src="${s.image}" class="profile-img" alt="${displayName}" />
      </div>
      <div class="name">${displayName}</div>
      ${degree ? `<span class="degree-badge">${degree}</span>` : ''}
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      <div class="role"><b>Research: </b>${s.research}</div>
      ${iconRow(s)}
    </div>
  `;
  }).join("");
}

function initTeamPage() {
  renderSupervisor();
  renderPhd();
  renderProjectAssociate();
  renderMtech();
  renderBtech();

  // Re-init scroll reveal for the newly rendered cards
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

// Full department names for the short codes used in btechStudents.
// A code that isn't listed here simply renders without an expansion line.
var DEPT_NAMES = {
  "CSE": "Computer Science & Engineering",
  "AI & DS": "Artificial Intelligence & Data Science",
  "EE": "Electrical Engineering",
  "BSBE": "Bioscience & Bioengineering"
};

// "B.Tech (CSE)" -> "Computer Science & Engineering"
function deptFullName(dept) {
  const code = (dept || "").match(/\(([^)]+)\)/);
  return code ? (DEPT_NAMES[code[1].trim()] || "") : "";
}

function renderBtech() {
  const container = document.getElementById("btechGrid");
  if (!btechStudents.length) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <div class="btech-grid">
      ${btechStudents.map((s, i) => {
        const fullDept = deptFullName(s.dept);
        return `
        <div class="btech-cell" data-reveal data-reveal-delay="${rowDelay(i, 2)}">
          <span class="btech-cell-name">${s.name}</span>
          ${s.dept ? `<span class="btech-cell-dept">${s.dept}</span>` : ''}
          ${fullDept ? `<span class="btech-cell-deptname">${fullDept}</span>` : ''}
        </div>
      `;
      }).join("")}
    </div>
  `;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTeamPage);
} else {
  initTeamPage();
}
