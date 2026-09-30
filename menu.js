function initMenu() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");

  if (!toggle || !nav) return; // Header not loaded yet — STOP

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu-toggle");
    const pathPrefix = window.location.pathname.includes('/articles/') ? '../' : './';
    new Audio(pathPrefix + "mp3/audio.wav").play();
    toggle.classList.toggle("show-icon-toggle");
  });

  const dropdownItems = document.querySelectorAll(".nav-menu-ul-01-mega");

  dropdownItems.forEach((dropdownItem) => {
    const dropdownBtn = dropdownItem.querySelector(".nav-link.mega-btn");

    dropdownBtn.addEventListener("click", function () {
      closeOtherDropdowns(dropdownItem);
      const pathPrefix = window.location.pathname.includes('/articles/') ? '../' : './';
      new Audio(pathPrefix + "mp3/audio.wav").play();
      toggleDropdownHeight(dropdownItem);
      dropdownBtn.classList.toggle("mega-btn-bg-toggle");
    });
  });

  function toggleDropdownHeight(dropdownItem) {
    const dropContainer = dropdownItem.querySelector(".mega-btn-container");
    const isOpen = dropContainer.style.height !== "0px";
    dropContainer.style.height = isOpen ? "0px" : dropContainer.scrollHeight + "px";
  }

  function closeOtherDropdowns(current) {
    dropdownItems.forEach((item) => {
      if (item !== current) {
        item.querySelector(".mega-btn-container").style.height = "0px";
        item.querySelector(".nav-link.mega-btn").classList.remove("mega-btn-bg-toggle");
      }
    });
  }
}
