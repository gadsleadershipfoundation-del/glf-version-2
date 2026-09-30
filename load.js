document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    // Page uses dynamic header
    const prefix = typeof pathPrefix !== "undefined" ? pathPrefix : "";
    fetch(prefix + "header.html")
      .then(res => res.text())
      .then(data => {
        headerContainer.innerHTML = data;

        // Adjust links and assets in header if prefix is specified
        if (prefix) {
          headerContainer.querySelectorAll("a").forEach(a => {
            const href = a.getAttribute("href");
            if (href && href.startsWith("./") && !href.startsWith("./articles/")) {
              a.setAttribute("href", prefix + href.substring(2));
            }
          });
          headerContainer.querySelectorAll("img").forEach(img => {
            const src = img.getAttribute("src");
            if (src && src.startsWith("./")) {
              img.setAttribute("src", prefix + src.substring(2));
            }
          });
        }

        initMenu(); // Run after header is inserted
      });
  } else {
    // Page has normal static header
    initMenu(); // Run immediately
  }
});
