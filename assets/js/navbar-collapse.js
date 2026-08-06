/* ============================================================
   Mobile navbar dismissal

   Bootstrap's collapse only toggles from the hamburger button, so on a phone
   the open menu could only be closed by tapping that button again. This closes
   it on:
     - a tap anywhere outside the menu
     - the Escape key
     - following a nav link (the SPA router swaps content without a reload, so
       the menu would otherwise stay open on top of the new page)

   The navbar lives outside #app-content and survives SPA navigation, so this
   script is loaded once per page load like back-to-top.js.
   ============================================================ */

(function () {
    'use strict';

    // Guard against double-binding if the file is ever included twice
    if (window.__navbarCollapseInit) return;
    window.__navbarCollapseInit = true;

    function openMenu() {
        var menu = document.getElementById('navMenu');
        return menu && menu.classList.contains('show') ? menu : null;
    }

    function hide(menu) {
        if (window.bootstrap && window.bootstrap.Collapse) {
            window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
            return;
        }
        // Fallback if the Bootstrap bundle failed to load
        menu.classList.remove('show');
        var toggler = document.querySelector('.navbar-toggler');
        if (toggler) {
            toggler.classList.add('collapsed');
            toggler.setAttribute('aria-expanded', 'false');
        }
    }

    // pointerdown rather than click: the menu drops away the moment the user
    // touches elsewhere, instead of waiting for the tap to complete.
    document.addEventListener('pointerdown', function (e) {
        var menu = openMenu();
        if (!menu) return;
        if (menu.contains(e.target)) return;
        // let the hamburger run its own toggle
        if (e.target.closest && e.target.closest('.navbar-toggler')) return;
        hide(menu);
    });

    document.addEventListener('keydown', function (e) {
        var menu = openMenu();
        if (menu && e.key === 'Escape') hide(menu);
    });

    // Tapping a link navigates — close the menu along with it
    document.addEventListener('click', function (e) {
        var menu = openMenu();
        if (!menu) return;
        if (e.target.closest && e.target.closest('#navMenu .nav-link')) hide(menu);
    });
})();
