// assets/js/publications.js

function renderPubLinks(links) {
  let html = "";

  if (links.pdf) {
    html += `<a class="btn-link" href="${links.pdf}" target="_blank" rel="noopener noreferrer">
      <svg class="icon"><use href="#icon-pdf"/></svg> PDF
    </a>`;
  }

  if (links.project) {
    html += `<a class="btn-link" href="${links.project}" target="_blank" rel="noopener noreferrer">
      <svg class="icon"><use href="#icon-link"/></svg> Project
    </a>`;
  }

  if (links.code) {
    html += `<a class="btn-link" href="${links.code}" target="_blank" rel="noopener noreferrer">
      <svg class="icon"><use href="#icon-code"/></svg> Code
    </a>`;
  }

  if (links.demo) {
    html += `<a class="btn-link" href="${links.demo}" target="_blank" rel="noopener noreferrer">
      <svg class="icon"><use href="#icon-link"/></svg> Demo
    </a>`;
  }

  if (links.arxiv) {
    html += `<a class="btn-link" href="${links.arxiv}" target="_blank" rel="noopener noreferrer">
      <svg class="icon"><use href="#icon-link"/></svg> arXiv
    </a>`;
  }

  if (links.bibtex) {
    html += `<a class="btn-link" href="${links.bibtex}" target="_blank" rel="noopener noreferrer">
      <svg class="icon"><use href="#icon-cite"/></svg> BibTeX
    </a>`;
  }

  return html;
}

function groupByYear(pubs) {
  const grouped = {};
  pubs.forEach(p => {
    if (!grouped[p.year]) grouped[p.year] = [];
    grouped[p.year].push(p);
  });
  return grouped;
}

function renderPublications() {
  const container = document.getElementById("publicationsContainer");
  if (!container) return;

  const grouped = groupByYear(publications);

  const years = Object.keys(grouped).sort((a, b) => b - a);

  container.innerHTML = years.map(year => {
    const list = grouped[year];

    return `
      <div class="year-block" data-year="${year}">
        <div class="year-title">${year} <span>${list.length} Publications</span></div>

        ${list.map(pub => `
          <div class="pub"
              data-year="${pub.year}"
              data-type="${pub.type}"
              data-topics="${pub.topics.join(",")}">
              
            <div class="pub-title">${pub.title}</div>
            <div class="pub-authors">${pub.authors}</div>
            <div class="pub-venue">${pub.venue}</div>

            <div class="pub-links">
              ${renderPubLinks(pub.links)}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");
}

function initFilters() {
  const searchInput = document.getElementById("searchInput");
  const yearFilter = document.getElementById("yearFilter");
  const typeFilter = document.getElementById("typeFilter");
  const chips = document.querySelectorAll(".chip");
  const pubs = document.querySelectorAll(".pub");
  const yearBlocks = document.querySelectorAll(".year-block");

  let activeTopics = new Set();

  function normalize(str) {
    return (str || "").toLowerCase().trim();
  }

  function applyFilters() {
    const query = normalize(searchInput.value);
    const selectedYear = yearFilter.value;
    const selectedType = typeFilter.value;

    pubs.forEach(pub => {
      const year = pub.dataset.year;
      const type = pub.dataset.type;
      const topics = (pub.dataset.topics || "").split(",").map(t => t.trim());

      const text = normalize(pub.innerText);

      const matchesSearch = query === "" || text.includes(query);
      const matchesYear = selectedYear === "" || year === selectedYear;
      const matchesType = selectedType === "" || type === selectedType;

      const matchesTopics =
        activeTopics.size === 0 ||
        topics.some(t => activeTopics.has(t));

      const show = matchesSearch && matchesYear && matchesType && matchesTopics;
      pub.classList.toggle("hidden", !show);
    });

    yearBlocks.forEach(block => {
      const visiblePubs = block.querySelectorAll(".pub:not(.hidden)");
      block.classList.toggle("hidden", visiblePubs.length === 0);
    });
  }

  searchInput.addEventListener("input", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
  typeFilter.addEventListener("change", applyFilters);

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const topic = chip.dataset.topic;

      if (activeTopics.has(topic)) {
        activeTopics.delete(topic);
        chip.classList.remove("active");
      } else {
        activeTopics.add(topic);
        chip.classList.add("active");
      }

      applyFilters();
    });
  });

  applyFilters();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPublications();
  initFilters();
});
