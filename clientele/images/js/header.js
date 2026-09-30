document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // Example: sticky header
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
  });
});
// footer.js

function initFooterAnimations() {
  const fadeUpEls = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeUpEls.forEach(el => observer.observe(el));
}
