document.addEventListener("DOMContentLoaded", function () {
    const oneOnly = new Swiper(".int-04", {
        slidesPerView: 1.05, // Default slides per view
        centeredSlides: true,

        // Space Between Slides
        spaceBetween: 10,

        parallax: true,
        // Breakpoints for responsive design
        breakpoints: {
            800: {
                slidesPerView: 2.2,
            },

            1250: {
                slidesPerView: 3.5, // Show 3 slides on screens 1024px or wider
                // Space Between Slides
                spaceBetween: 10,
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
        speed: 600,

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
            delay: 1000,

            // If I click on arrow or dots, autoplay continues
            disableOnInteraction: false, // Optional: keep autoplay running even after interaction

            // Mouse Hover Autoplay Continue
            pauseOnMouseEnter: false, // Stop autoplay on hover
        },
    });
});
