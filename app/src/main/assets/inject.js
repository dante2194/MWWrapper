(function() {
    'use strict';

    const selectors = [
        '#anchor-seporator',
        '.card',
        '#subscribe-unabridged',
        '.story-card-list',
        '.d-md-none',
        '.global-footer',
        '.additional-content-area',
        '.home-redesign-ad',
        '.mw-shop',
        '.podcast-subscribe',
        '.home-general-promo-container',
        '.tbgads-mid-tall-slot-wrap',
        '.tbgads-anchor-slot-wrap',
        '.cafemedia-ad-slot-top',
        '.p-0',
        '#definition-right-rail',
        '#main-banner-ad-container',
        '.tbgads-mid-short-slot-wrap'
    ];

    const css = selectors.join(',\n')
        + ' { display: none !important; visibility: hidden !important; }';

    function injectStyle() {
        try {
            const style = document.createElement('style');
            style.textContent = css;
            (document.head || document.documentElement).appendChild(style);
        } catch (e) { }
    }

    function removeElements() {
        selectors.forEach(function(sel) {
            try {
                document.querySelectorAll(sel).forEach(function(el) { el.remove(); });
            } catch (e) { }
        });
    }

    injectStyle();

    const observer = new MutationObserver(removeElements);

    function startObserving() {
        if (!document.documentElement) {
            setTimeout(startObserving, 5);
            return;
        }
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        removeElements();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserving);
    } else {
        startObserving();
    }

    window.addEventListener('load', removeElements);
})();
