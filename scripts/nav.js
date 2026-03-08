/* roothouse.ai — shared mobile navigation toggle

Works with two markup variants:
A) styles-v2 pages: <header class="site-header ..."> with a button.nav-toggle and a div.nav-menu
   -> toggles header.classList.toggle('open')

B) full-bleed GPT54 page: .nav-toggle + #mobile-menu overlay
   -> toggles #mobile-menu.classList.toggle('open') and button.open
*/
(function () {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;

  const overlayMenu = document.getElementById('mobile-menu');
  const header = toggle.closest('header.site-header') || document.querySelector('header.site-header');

  function isOpen() {
    if (overlayMenu) return overlayMenu.classList.contains('open');
    if (header) return header.classList.contains('open');
    return false;
  }

  function setOpen(open) {
    if (overlayMenu) {
      overlayMenu.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }

    if (header) {
      header.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  }

  // init aria
  if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    setOpen(!isOpen());
  });

  // close on link click (best effort)
  const linkContainers = [];
  if (overlayMenu) linkContainers.push(overlayMenu);
  if (header) linkContainers.push(header);

  linkContainers.forEach((root) => {
    root.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });
  });

  // ESC closes
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
