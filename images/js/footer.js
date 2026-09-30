document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  // Example: show current year automatically
  const yearSpan = footer.querySelector(".year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init();
    setTimeout(() => AOS.refresh(), 300); // wait for content
  }
});
