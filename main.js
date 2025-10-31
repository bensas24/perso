// Effet de révélation au scroll
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

// Année dynamique dans le footer
function setYear() {
  const span = document.getElementById("year");
  if (span) span.textContent = new Date().getFullYear();
}

// Navigation fluide
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

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  revealOnScroll();
  smoothScroll();
});
