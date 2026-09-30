/**
 * Google Tag Manager & Google Analytics 4 Initialization
 * This script is part of the SEO update to ensure proper tracking.
 * It should be included in the <head> of every page.
 */
(function () {
    // Google Tag Manager - GTM-NHBPTSJF
    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NHBPTSJF');

    // Google tag (gtag.js) - G-BE8MNDF7ZM
    var script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-BE8MNDF7ZM';
    document.head.appendChild(script1);

    // Google tag (gtag.js) - G-HFMFHXGLRQ
    var script2 = document.createElement('script');
    script2.async = true;
    script2.src = 'https://www.googletagmanager.com/gtag/js?id=G-HFMFHXGLRQ';
    document.head.appendChild(script2);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-BE8MNDF7ZM');
    gtag('config', 'G-HFMFHXGLRQ');
})();
