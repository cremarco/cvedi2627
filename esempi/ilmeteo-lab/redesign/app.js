/* Small enhancements around the shared, frozen-source controls. No remote data. */
(() => {
  const daybar = document.querySelector('.home_daybar');
  const days = daybar?.querySelector('ul');
  if (days) {
    const updateFade = () => daybar.toggleAttribute('data-more-days', days.scrollWidth - days.clientWidth - days.scrollLeft > 2);
    days.addEventListener('scroll', updateFade, { passive: true });
    new ResizeObserver(updateFade).observe(days);
    updateFade();
  }

  const ticker = document.querySelector('.home-weather-ticker');
  const track = ticker?.querySelector('.home-weather-ticker__track');
  const item = track?.firstElementChild;
  if (item) {
    const viewport = ticker.querySelector('.home-weather-ticker__viewport');
    const originalLink = item.querySelector('a');
    const fill = () => {
      const distance = item.getBoundingClientRect().width;
      if (!distance) return;
      const count = Math.max(2, Math.ceil(viewport.clientWidth / distance) + 1);
      while (track.children.length > count) track.lastElementChild.remove();
      while (track.children.length < count) {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a').forEach(link => link.tabIndex = -1);
        track.append(clone);
      }
      track.style.setProperty('--ticker-distance', `${distance}px`);
      track.toggleAttribute('data-ready', true);
    };
    // The shared source runtime owns the notice action; repetitions reuse it.
    ticker.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (link && link !== originalLink) { event.preventDefault(); originalLink.click(); }
    });
    document.addEventListener('visibilitychange', () => track.toggleAttribute('data-paused', document.hidden));
    new ResizeObserver(fill).observe(viewport);
    document.fonts.ready.then(fill);
    fill();
  }

  const menuButton = document.querySelector('.main_menu__list__item--hamburger button');
  const sideMenu = document.querySelector('.side_menu');
  if (menuButton && sideMenu) {
    const updateMenu = () => menuButton.setAttribute('aria-expanded', String(sideMenu.classList.contains('side_menu--visible')));
    menuButton.addEventListener('click', () => {
      sideMenu.classList.remove('hidden');
      sideMenu.classList.toggle('side_menu--visible');
      updateMenu();
    });
    new MutationObserver(updateMenu).observe(sideMenu, { attributes: true, attributeFilter: ['class'] });
  }

  // A fixed popup escapes the navbar's horizontal scrolling region.
  document.querySelectorAll('.navbar-search-item form').forEach(form => {
    const placePopup = () => {
      const rect = form.getBoundingClientRect();
      const width = Math.min(rect.width, innerWidth - 16);
      form.style.setProperty('--search-top', `${rect.bottom + 4}px`);
      form.style.setProperty('--search-left', `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`);
      form.style.setProperty('--search-width', `${width}px`);
    };
    form.addEventListener('focusin', placePopup);
    form.addEventListener('click', placePopup);
    addEventListener('resize', placePopup, { passive: true });
    document.querySelector('.main_menu__list')?.addEventListener('scroll', placePopup, { passive: true });
  });
})();
