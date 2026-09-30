// Menu Toggle
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav-menu");

// Toggle menu visibility
toggle.addEventListener("click", () => {
  nav.classList.toggle("show-menu-toggle");
  const audioPlay = new Audio("./mp3/audio.wav");
  audioPlay.play();

  // Toggle icon state
  toggle.classList.toggle("show-icon-toggle");
});

// Menu Dropdown On Hover with transition for each
const dropdownItems = document.querySelectorAll(".nav-menu-ul-01-mega"); // Corrected variable name

dropdownItems.forEach((dropdownItem) => {
  const dropdownBtn = dropdownItem.querySelector(".nav-link.mega-btn"); // Ensure both classes are applied

  dropdownBtn.addEventListener("click", function () {
    // Close all other dropdowns
    closeOtherDropdowns(dropdownItem);

    const audioPlay = new Audio("./mp3/audio.wav");
    audioPlay.play();

    // Toggle the clicked dropdown
    toggleDropdownHeight(dropdownItem);

    // Toggle background color or style if needed
    dropdownBtn.classList.toggle("mega-btn-bg-toggle");
  });
});

// Adjust dropdown height when clicked
const toggleDropdownHeight = (dropdownItem) => {
  const dropContainer = dropdownItem.querySelector(".mega-btn-container");
  const isOpen =
    dropContainer.style.height && dropContainer.style.height !== "0px";

  // Toggle height smoothly
  if (isOpen) {
    dropContainer.style.height = "0px";
  } else {
    dropContainer.style.height = dropContainer.scrollHeight + "px";
  }
};

// Close all other dropdowns except the clicked one
const closeOtherDropdowns = (currentDropdown) => {
  dropdownItems.forEach((dropdownItem) => {
    if (dropdownItem !== currentDropdown) {
      const dropContainer = dropdownItem.querySelector(".mega-btn-container");
      dropContainer.style.height = "0px"; // Close the other dropdowns
      const dropdownBtn = dropdownItem.querySelector(".nav-link.mega-btn");
      dropdownBtn.classList.remove("mega-btn-bg-toggle"); // Optionally remove any styling applied
    }
  });
};
