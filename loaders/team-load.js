// Team Page — Dynamic Card Renderer with Row-by-Row Scroll Reveal

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
  container.innerHTML = phdStudents.map((s, i) => `
    <div class="card" data-reveal data-reveal-delay="${rowDelay(i, 3)}">
      <div class="profile-img-wrap">
        <img src="${s.image}" class="profile-img" alt="${s.name}" />
      </div>
      <div class="name">${s.name}</div>
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      ${s.hasCosupervisor ? ` <div class="joined"><b>Mentor & Collaborator: </b>${s.cosupervisor}</div>` : ""}
      <div class="role"><b>Research: </b>${s.research}</div>
      ${iconRow(s)}
    </div>
  `).join("");
}

function renderMtech() {
  const container = document.getElementById("mtechGrid");
  container.innerHTML = mtechStudents.map((s, i) => `
    <div class="card" data-reveal data-reveal-delay="${rowDelay(i, 4)}">
      <div class="profile-img-wrap">
        <img src="${s.image}" class="profile-img" alt="${s.name}" />
      </div>
      <div class="name">${s.name}</div>
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      <div class="role">${s.research}</div>
      ${iconRow(s)}
    </div>
  `).join("");
}

function renderProjectAssociate() {
  const container = document.getElementById("projectAssociateGrid");
  container.innerHTML = projectAssociate.map((s, i) => `
    <div class="card" data-reveal data-reveal-delay="${rowDelay(i, 3)}">
      <div class="profile-img-wrap">
        <img src="${s.image}" class="profile-img" alt="${s.name}" />
      </div>
      <div class="name">${s.name}</div>
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      <div class="role"><b>Research: </b>${s.research}</div>
      ${iconRow(s)}
    </div>
  `).join("");
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

function renderBtech() {
  const container = document.getElementById("btechGrid");
  if (!btechStudents.length) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <div class="btech-grid">
      ${btechStudents.map((s, i) => `
        <div class="btech-cell" data-reveal data-reveal-delay="${rowDelay(i, 2)}">
          <span class="btech-cell-name">${s.name}</span>
          <span class="btech-cell-joined">Joined: ${s.joined}</span>
        </div>
      `).join("")}
    </div>
  `;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTeamPage);
} else {
  initTeamPage();
}
