// assets/js/team.js

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
        <svg class="icon"><use href="#mail" /></svg>
      </a>
    </div>
  `;
}

function renderSupervisor() {
  const container = document.getElementById("supervisorBox");
  container.innerHTML = `
    <div class="supervisor">
      <img src="${supervisorData.image}" class="profile-img" alt="${supervisorData.name}" />
      <div>
        <h2>${supervisorData.name}</h2>
        <div class="role">${supervisorData.role}</div>
        <p>${supervisorData.bio}</p>
        ${iconRow(supervisorData)}
      </div>
    </div>
  `;
}

function renderPhd() {
  const container = document.getElementById("phdGrid");
  container.innerHTML = phdStudents.map(s => `
    <div class="card">
      <img src="${s.image}" class="profile-img" alt="${s.name}" />
      <div class="name">${s.name}</div>
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      <div class="role"><b>Research: </b>${s.research}</div>
      ${iconRow(s)}
    </div>
  `).join("");
}

function renderMtech() {
  const container = document.getElementById("mtechGrid");
  container.innerHTML = mtechStudents.map(s => `
    <div class="card">
      <img src="${s.image}" class="profile-img" alt="${s.name}" />
      <div class="name">${s.name}</div>
      <div class="joined"><b>Joined: ${s.joined}</b></div>
      <div class="role">${s.research}</div>
      ${iconRow(s)}
    </div>
  `).join("");
}
function renderProjectAssociate(){
    const container=document.getElementById("projectAssociateGrid");
    container.innerHTML=projectAssociate.map(s=>`
       <div class="card">
      <img src="${s.image}" class="profile-img" alt="${s.name}" />
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
}

document.addEventListener("DOMContentLoaded", initTeamPage);
