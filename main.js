// Reveal au scroll
function revealOnScroll() {
  const elements = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(el => observer.observe(el));
}

// Année dynamique
function setYear() {
  const span = document.getElementById("year");
  if (span) span.textContent = new Date().getFullYear();
}

// Smooth scroll
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Compteurs (ex: 235+)
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const duration = 900;
  counters.forEach(el => {
    const target = parseInt(el.dataset.target, 10) || 0;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step);
    };
    const onView = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) { requestAnimationFrame(step); obs.disconnect(); }
    }, { threshold: 0.6 });
    onView.observe(el);
  });
}

// Charger projets depuis /data/projects.json
async function loadProjects() {
  const container = document.getElementById("projects-grid");
  if (!container) return;
  try {
    const res = await fetch("data/projects.json");
    const items = await res.json();
    container.innerHTML = items.map(p => `
      <article class="card project-card">
        <img src="${p.image}" alt="${p.title}" />
        <h3>${p.title}</h3>
        <p>${p.subtitle}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <p style="margin-top:.6rem">
          ${p.links.map(l => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join(" ")}
        </p>
      </article>
    `).join("");
  } catch (e) {
    console.error(e);
    container.innerHTML = `<p class="muted">Impossible de charger les projets pour le moment.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  revealOnScroll();
  smoothScroll();
  animateCounters();
  loadProjects();
});
