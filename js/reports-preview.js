// ==============================
// thenobody portfolio - projects.js
// Fetch + render project cards (last 4, newest first)
// ==============================

const grid = document.getElementById("projects-grid");
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

// Load projects.json - LAST 4, REVERSED
async function loadProjects() {
  try {
    const res = await fetch("data/reports.json");
    const projects = await res.json();

    // Get last 4 projects, then reverse for newest first
    const lastFourReversed = projects.slice(-4).reverse();

    lastFourReversed.forEach((p) => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <div class="card-header">
          <h3>${p.title}</h3>
          <span class="severity ${p.severity.toLowerCase()}">${p.severity}</span>
        </div>
        <p class="description">${p.short}</p>
        <div class="card-meta">
          <span class="date">${p.date || ""}</span>
        </div>
        <div class="tags">
          ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <div class="card-actions">
          <button class="btn outline">Preview</button>
          ${
            p.link
              ? `<a href="${p.link}" target="_blank" class="btn filled">Open</a>`
              : ""
          }
        </div>
      `;

      // Preview button opens modal
      card.querySelector(".btn.outline").addEventListener("click", () => openModal(p));

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading projects:", err);
    grid.innerHTML = `<p>⚠️ Could not load projects.</p>`;
  }
}

// Modal handling (unchanged)
function openModal(project) {
  modalBody.innerHTML = `
    <h2>${project.title}</h2>
    <p><strong>Program:</strong> ${project.program}</p>
    <p><strong>Severity:</strong> ${project.severity}</p>
    ${project.date ? `<p><strong>Date:</strong> ${project.date}</p>` : ""}
    <p><strong>Summary:</strong> ${project.description}</p>
    <p><strong>Tools used:</strong> ${project.tools.join(", ")}</p>
    ${
      project.link
        ? `<p><a href="${project.link}" target="_blank" class="btn secondary">Read more</a></p>`
        : ""
    }
  `;
  modal.classList.remove("hidden");
}

// Close modal (unchanged)
if (modalClose) {
  modalClose.addEventListener("click", () => modal.classList.add("hidden"));
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Init
if (grid) {
  loadProjects();
}