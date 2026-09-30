// ---------------------------------------------------
// Preloader
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("preloader-hide");
    }
  }, 1000); // 2000ms = 2 seconds
});

// ---------------------------------------------------
// Inner Width Resize Reload with Debounce
let initialWidth = window.innerWidth;
let resizeTimeout;

window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (Math.abs(window.innerWidth - initialWidth) > 50) {
      location.reload();
    }
  }, 250); // Delay reload to prevent excessive calls
});

// -------------------------------------------------
// Scroll Top Button
function scrollToTop() {
  console.log("clicked");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", scrollToTop);
}

// -------------------------------------------------
// Download Article as Word Document (.doc)
function downloadWordDoc() {
  var title = document.querySelector('.layer-2') ? document.querySelector('.layer-2').innerText.trim() : 'Article';
  var container = document.querySelector('.art-main-04-right');
  if (!container) return;

  var clone = container.cloneNode(true);
  
  var htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; padding: 20px; }
        h1 { color: #333333; font-size: 22pt; margin-bottom: 20pt; }
        h2 { color: #333333; font-size: 18pt; margin-top: 20pt; }
        h3 { color: #53369c; font-size: 14pt; margin-top: 15pt; }
        h5 { color: #666666; font-size: 12pt; margin-top: 10pt; font-weight: normal; margin-left: 15pt; }
        p { font-size: 11pt; margin-bottom: 12pt; }
        span { font-weight: bold; }
        strong { font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      ${clone.innerHTML}
    </body>
    </html>
  `;

  var blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword'
  });

  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = title.replace(/[^a-zA-Z0-9]/g, '_') + '.doc';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Helper to get site root relative path prefix
function getSiteRootPrefix() {
  if (typeof window.pathPrefix !== "undefined" && window.pathPrefix) {
    return window.pathPrefix;
  }
  if (typeof pathPrefix !== "undefined" && pathPrefix) {
    return pathPrefix;
  }
  const scriptEl = document.querySelector('script[src*="common.js"]');
  if (scriptEl) {
    const src = scriptEl.getAttribute('src') || '';
    if (src.startsWith('../../')) return '../../';
    if (src.startsWith('../')) return '../';
    if (src.startsWith('./') || src.startsWith('common.js')) return './';
  }
  const path = window.location.pathname.replace(/\\/g, '/');
  if (path.includes('/articles/') && (path.endsWith('/') || path.endsWith('/index.html') || (path.split('/articles/')[1] && path.split('/articles/')[1].includes('/')))) {
    return '../../';
  }
  if (path.includes('/articles/')) {
    return '../';
  }
  return './';
}

// Secure print gating function
function securePrint(pageName) {
  const prefix = getSiteRootPrefix();
  fetch(prefix + 'check-auth.php')
    .then(response => {
      if (!response.ok) throw new Error('Auth check failed');
      return response.json();
    })
    .then(data => {
      if (data && data.authorized) {
        window.location.href = prefix + 'download-file.php?ref=' + encodeURIComponent(pageName);
      } else {
        window.location.href = prefix + 'download-gate.php?ref=' + encodeURIComponent(pageName);
      }
    })
    .catch(error => {
      console.warn('Redirecting to download gate:', error);
      window.location.href = prefix + 'download-gate.php?ref=' + encodeURIComponent(pageName);
    });
}

// Auto-print check on page load if redirecting back from form submission
document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('download') === 'true') {
    const prefix = getSiteRootPrefix();
    fetch(prefix + 'check-auth.php')
      .then(response => {
        if (!response.ok) throw new Error('Auth check failed');
        return response.json();
      })
      .then(data => {
        if (data && data.authorized) {
          window.print();
          
          // Clean up the URL parameter without reloading the page
          var cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        }
      })
      .catch(error => console.error('Error in auto-print:', error));
  }
});

// Global Partner With Us handler
function openPartnerModal(e) {
  if (e) e.preventDefault();
  const prefix = getSiteRootPrefix();
  window.location.href = prefix + 'download-gate.php?ref=partner';
}
window.openPartnerModal = openPartnerModal;



