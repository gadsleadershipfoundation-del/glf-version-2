// ---------------------------------------------------
// Preloader
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("preloader-hide");
    }
  }, 1000); // 1000ms = 1 second
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

// -------------------------------------------------
// Global Partner With Us handler (Opens on-page modal)
function openPartnerModal(e) {
  if (e && e.preventDefault) e.preventDefault();
  const modal = document.getElementById("partnerModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}
window.openPartnerModal = openPartnerModal;

// -------------------------------------------------
// Tawk.to Live Chat Script
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script");
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6abcc49e39a9aa34473b1d51/1k3om03d0';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  (document.head || document.documentElement).appendChild(s1);
})();

// Tawk.to to Mailmunch Auto-Sync Callbacks
Tawk_API.onPrechatSubmit = function (data) {
  syncTawkLeadToMailmunch(data);
};
Tawk_API.onOfflineSubmit = function (data) {
  syncTawkLeadToMailmunch(data);
};

function syncTawkLeadToMailmunch(tawkData) {
  if (!tawkData) return;
  var email = tawkData.email || '';
  var name = tawkData.name || '';
  var phone = tawkData.phone || '';
  var designation = '';
  
  if (tawkData.questions && Array.isArray(tawkData.questions)) {
    tawkData.questions.forEach(function (q) {
      var label = (q.name || q.label || '').toLowerCase();
      var val = q.answer || q.value || '';
      if (label.indexOf('designation') !== -1) designation = val;
      if (label.indexOf('phone') !== -1 && !phone) phone = val;
    });
  }

  // 1. Direct Background POST to Mailmunch Form (Widget ID: 1172402)
  if (email) {
    try {
      var formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('first_name', name);
      formData.append('phone', phone);
      formData.append('site_id', '1104096');
      formData.append('widget_id', '1172402');

      fetch('https://a.mailmunch.co/widgets/1172402/submit', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      }).then(function () {
        console.log('Lead synced to Mailmunch successfully');
      }).catch(function (e) {
        console.log('Mailmunch direct post:', e);
      });
    } catch (err) {
      console.log('Mailmunch sync error:', err);
    }
  }

  // 2. Server-side Webhook & CSV Backup
  var prefix = typeof getSiteRootPrefix === 'function' ? getSiteRootPrefix() : './';
  fetch(prefix + 'api/tawk-webhook.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'tawk_lead_submit',
      visitor: { name: name, email: email, phone: phone },
      questions: [
        { label: 'designation', value: designation },
        { label: 'phone', value: phone }
      ]
    })
  }).catch(function (err) {
    console.warn('Lead sync notice:', err);
  });
}

// -------------------------------------------------
// Mailmunch Site Tracking Script
(function () {
  if (!document.getElementById("mailmunch-script")) {
    var mm = document.createElement("script");
    mm.id = "mailmunch-script";
    mm.src = "//a.mailmunch.co/app/v1/site.js";
    mm.setAttribute("data-mailmunch-site-id", "1104096");
    mm.async = true;
    (document.head || document.documentElement).appendChild(mm);
  }
})();