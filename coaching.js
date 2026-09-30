document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll behavior
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Scroll-triggered Entry Animations (Intersection Observer)
  const animationItems = document.querySelectorAll(
    '.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in'
  );

  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
          // Once animated, stop observing
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust trigger slightly above the viewport bottom
    });

    animationItems.forEach(item => {
      animationObserver.observe(item);
    });
  } else {
    // Fallback if IntersectionObserver is not supported: show all elements instantly
    animationItems.forEach(item => {
      item.classList.add('animate-active');
    });
  }

  // 4. Portfolio Tabs Switching
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const tabContents = document.querySelectorAll('.portfolio-tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Hide all contents
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });

      // Add active class to clicked button
      button.classList.add('active');
      
      // Show and animate target content grid
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'grid';
      }
    });
  });
});
