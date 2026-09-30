const allHoverDivs1 = document.querySelectorAll(".sf-a .sf-01-div");
const dynamicDiv1 = document.querySelector("#sf-02");
const dynamicText = document.querySelector("#dynamicText");
const dynamicLink = document.querySelector("#dynamicLink");

allHoverDivs1.forEach((item) => {
  item.addEventListener("mouseover", function () {
    const imageUrl = this.getAttribute("data-image");
    const description = this.getAttribute("data-description");
    const link1 = this.getAttribute("data-link-1");

    if (link1) {
      dynamicLink.href = link1;
      dynamicLink.style.display = "inline-block";
    } else {
      dynamicLink.style.display = "none";
    }

    // Set background image only, keeping CSS gradients intact
    dynamicDiv1.style.backgroundImage = `url('${imageUrl}')`;
    dynamicDiv1.style.backgroundRepeat = "no-repeat";
    dynamicDiv1.style.backgroundPosition = "center center";
    dynamicDiv1.style.backgroundSize = "cover";

    dynamicText.innerHTML = description;

    // Use classes for styling
    allHoverDivs1.forEach((div) => div.classList.remove("active"));
    this.classList.add("active");
  });
});

const allHoverDivs2 = document.querySelectorAll(".sf-b .sf-01-div");
const dynamicDiv2 = document.querySelector("#sf-02-2");
const dynamicText2 = document.querySelector("#dynamicText2");
const dynamicLink2 = document.querySelector("#dynamicLink2");

allHoverDivs2.forEach((item) => {
  item.addEventListener("mouseover", function () {
    const imageUrl = this.getAttribute("data-image");
    const description2 = this.getAttribute("data-description2");
    const link2 = this.getAttribute("data-link-2");

    if (link2) {
      dynamicLink2.href = link2;
      dynamicLink2.style.display = "inline-block";
    } else {
      dynamicLink2.style.display = "none";
    }

    dynamicDiv2.style.backgroundImage = `url('${imageUrl}')`;
    dynamicDiv2.style.backgroundRepeat = "no-repeat";
    dynamicDiv2.style.backgroundPosition = "center center";
    dynamicDiv2.style.backgroundSize = "cover";

    dynamicText2.innerHTML = description2;

    allHoverDivs2.forEach((div) => div.classList.remove("active"));
    this.classList.add("active");
  });
});

const allHoverDivs3 = document.querySelectorAll(".sf-c .sf-01-div");
const dynamicDiv3 = document.querySelector("#sf-02-3");
const dynamicText3 = document.querySelector("#dynamicText3");
const dynamicLink3 = document.querySelector("#dynamicLink3");

if (allHoverDivs3.length > 0) {
  allHoverDivs3.forEach((item) => {
    item.addEventListener("mouseover", function () {
      const imageUrl = this.getAttribute("data-image");
      const description3 = this.getAttribute("data-description3");
      const link3 = this.getAttribute("data-link-3");

      if (link3 && dynamicLink3) {
        dynamicLink3.href = link3;
        dynamicLink3.style.display = "inline-block";
      } else if (dynamicLink3) {
        dynamicLink3.style.display = "none";
      }

      dynamicDiv3.style.backgroundImage = `url('${imageUrl}')`;
      dynamicDiv3.style.backgroundRepeat = "no-repeat";
      dynamicDiv3.style.backgroundPosition = "50% center";
      dynamicDiv3.style.backgroundSize = "cover";

      dynamicText3.innerHTML = description3;

      allHoverDivs3.forEach((div) => div.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// Services
const SwiperService = new Swiper(".service", {
  slidesPerView: 1.1, // Default slides per view
  spaceBetween: 5,
  centeredSlides: true,

  parallax: true,
  // Breakpoints for responsive design
  breakpoints: {
    1000: {
      slidesPerView: 3.15, // Show 3 slides on screens 1024px or wider
    },
    1600: {
      slidesPerView: 4.15, // Show 3 slides on screens 1024px or wider
    },
  },

  // Space Between Slides
  // Hand Cursor False or True
  grabCursor: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // How many Slides to move per click
  // Pagination Dots Changes According to Slides per Group
  slidesPerGroup: 1, // Number of slides to move per click

  // Speed of the card Speed
  speed: 1000,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination", // This should be targeting the correct element
    clickable: true,
  },

  // effect: 'fade',
  // fadeEffect: {
  //   crossFade: true, // Smooth fade between slides
  // },

  // Continuing Loop
  loop: true, // When Loop is off, the arrow in the extremes gets disabled

  autoplay: {
    // Delay Time
    delay: 2000,

    // If I click on arrow or dots, autoplay continues
    disableOnInteraction: false, // Optional: keep autoplay running even after interaction

    // Mouse Hover Autoplay Continue
    pauseOnMouseEnter: false, // Stop autoplay on hover
  },
});

// --------------------------------------------
const Swiper01 = new Swiper(".section-15", {
  slidesPerView: 1.1, // Default slides per view
  centeredSlides: true,
  spaceBetween: 5,

  parallax: true,
  // Breakpoints for responsive design
  breakpoints: {
    1000: {
      slidesPerView: 1.35, // Show 3 slides on screens 1024px or wider
      // Space Between Slides
    },

    1700: {
      slidesPerView: 1.3,
    },
  },

  // Hand Cursor False or True
  grabCursor: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // How many Slides to move per click
  // Pagination Dots Changes According to Slides per Group
  slidesPerGroup: 1, // Number of slides to move per click

  // Speed of the card Speed
  speed: 1000,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination", // This should be targeting the correct element
    clickable: true,
  },

  // effect: 'fade',
  // fadeEffect: {
  //   crossFade: true, // Smooth fade between slides
  // },

  // Continuing Loop
  loop: true, // When Loop is off, the arrow in the extremes gets disabled

  autoplay: {
    // Delay Time
    delay: 3000,

    // If I click on arrow or dots, autoplay continues
    disableOnInteraction: false, // Optional: keep autoplay running even after interaction

    // Mouse Hover Autoplay Continue
    pauseOnMouseEnter: false, // Stop autoplay on hover
  },
});

// ---------------------------------------------------
// Testimonial

// Shared renderBullet function to reduce duplication
function renderBullet(index, className, images, names, designations) {
  const imageUrl = images[index] || "./testimonial/default-image.png";
  const name = names[index] || "Unknown";
  const designationN = designations[index] || "Role Not Defined";

  return `
    <span class="${className}">
      <img src="${imageUrl}" alt="${name}" />
      <div class="bullet-text">
        <strong>${name}</strong>
      </div>
      <div class="bullet-designation">
        <strong>${designationN}</strong>
      </div>
    </span>
  `;
}

// Testimonial 1 (Swiper01t)
const Swiper01t = new Swiper(".testimonail-section-tr-01", {
  centeredSlides: true,
  parallax: true,
  spaceBetween: 30,
  speed: 1400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Testimonial 2 (Swiper02t)
const Swiper02t = new Swiper(".testimonail-section-tr-02", {
  centeredSlides: true,
  parallax: true,
  spaceBetween: 30,
  speed: 1400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  pagination: {
    el: ".swiper-pagination-02",
    clickable: true,
  },
});

// Testimonial 3 (Swiper03t)
const Swiper03t = new Swiper(".testimonail-section-tr-03", {
  centeredSlides: true,
  parallax: true,
  spaceBetween: 30,
  speed: 1400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  pagination: {
    el: ".swiper-pagination-03",
    clickable: true,
  },
});

// 10,000
const section = document.querySelector(".old-ten-thousand");
const counters = section.querySelectorAll(".old-ten-thousand h3");

function animateCounter(counter) {
  const target = +counter.getAttribute("data-count");
  let count = 0;
  const speed = 150; // smaller is faster

  const increment = Math.ceil(target / speed);

  const updateCount = () => {
    count += increment;
    if (count < target) {
      counter.textContent = count.toLocaleString() + "+";
      requestAnimationFrame(updateCount);
    } else {
      counter.textContent = target.toLocaleString() + "+";
    }
  };

  counter.textContent = "0"; // Reset to zero each time
  updateCount();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => animateCounter(counter));
      }
    });
  },
  {
    threshold: 0.5, // Adjust depending on when you want the animation to start
  }
);

observer.observe(section);
