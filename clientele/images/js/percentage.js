document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".achievement-percent");
  const speed = 200; // lower = faster

  const animateCount = (counter) => {
    const target = +counter.getAttribute("data-target");
    const updateCount = () => {
      const value = +counter.innerText.replace("%","");
      const increment = Math.ceil(target / speed);
      if (value < target) {
        counter.innerText = `${Math.min(value + increment, target)}%`;
        requestAnimationFrame(updateCount);
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});