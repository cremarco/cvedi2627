/* Small enhancements around the shared, frozen-source controls. No remote data. */
(() => {
  const daybar = document.querySelector('.home_daybar');
  const days = daybar?.querySelector('ul');
  if (days) {
    const updateFade = () => {
      daybar.toggleAttribute('data-more-days', days.scrollWidth - days.clientWidth - days.scrollLeft > 2);
      daybar.toggleAttribute('data-previous-days', days.scrollLeft > 2);
    };
    days.addEventListener('scroll', updateFade, { passive: true });
    new ResizeObserver(updateFade).observe(days);
    updateFade();
  }

  const ticker = document.querySelector('.home-weather-ticker');
  const track = ticker?.querySelector('.home-weather-ticker__track');
  const item = track?.firstElementChild;
  if (item) {
    const viewport = ticker.querySelector('.home-weather-ticker__viewport');
    const fill = () => {
      const distance = item.getBoundingClientRect().width;
      if (!distance) return;
      const count = Math.max(2, Math.ceil(viewport.clientWidth / distance) + 1);
      while (track.children.length > count) track.lastElementChild.remove();
      while (track.children.length < count) {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.append(clone);
      }
      track.style.setProperty('--ticker-distance', `${distance}px`);
      track.toggleAttribute('data-ready', true);
    };
    document.addEventListener('visibilitychange', () => track.toggleAttribute('data-paused', document.hidden));
    new ResizeObserver(fill).observe(viewport);
    document.fonts.ready.then(fill);
    fill();
  }

  const menuButton = document.querySelector('.main_menu__list__item--hamburger button');
  const sideMenu = document.querySelector('.side_menu');
  if (menuButton && sideMenu) {
    const updateMenu = () => menuButton.setAttribute('aria-expanded', String(sideMenu.classList.contains('side_menu--visible')));
    const closeMenu = restoreFocus => {
      const wasOpen = sideMenu.classList.contains('side_menu--visible');
      sideMenu.classList.remove('side_menu--visible');
      updateMenu();
      if (wasOpen && restoreFocus) menuButton.focus();
    };
    menuButton.addEventListener('click', () => {
      sideMenu.classList.remove('hidden');
      sideMenu.classList.toggle('side_menu--visible');
      updateMenu();
      if (sideMenu.classList.contains('side_menu--visible')) {
        [...sideMenu.querySelectorAll('a[href],button,summary')].find(control => control.getClientRects().length && !control.disabled)?.focus();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && sideMenu.classList.contains('side_menu--visible')) {
        event.preventDefault(); closeMenu(sideMenu.contains(document.activeElement));
      }
    });
    document.addEventListener('click', event => {
      if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(sideMenu.contains(document.activeElement));
    });
    document.addEventListener('focusin', event => {
      if (!sideMenu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(false);
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

  // Keep button-tab states in sync with the frozen map controls.
  const mapSurface = document.querySelector('.map-surface');
  const layerMenu = mapSurface?.querySelector('.map-layer-menu');
  if (layerMenu) {
    layerMenu.setAttribute('role', 'tablist');
    layerMenu.setAttribute('aria-orientation', 'vertical');
    const controls = [...layerMenu.querySelectorAll('.map-layer-control')];
    layerMenu.classList.add('lab-tabs');
    controls.forEach(control => control.parentElement.setAttribute('role', 'presentation'));
    window.ILMETEO_UI.tabs(layerMenu, controls, {
      orientation: 'vertical',
      initial: Math.max(0, controls.findIndex(control => control.parentElement.classList.contains('block_weather_prevision__forecast_maps__map__forecast_menu__item--active'))),
      select(index) {
        controls.forEach((control, position) => {
          const selected = position === index;
          const kind = control.parentElement.id.split('-').pop();
          control.id = `map-layer-tab-${kind}`;
          control.setAttribute('aria-pressed', String(selected));
          control.classList.toggle('lab-tab-active', selected);
          control.parentElement.classList.toggle('block_weather_prevision__forecast_maps__map__forecast_menu__item--active', selected);
          if (selected) mapSurface.dataset.mapKind = kind;
        });
        mapSurface.dispatchEvent(new CustomEvent('map-layer-change', { detail: mapSurface.dataset.mapKind }));
      },
    });
  }

  // The four captured dates share a single stage, with the original links intact.
  const forecastBrowser = document.querySelector('.forecast-map-browser');
  const primaryMapSurface = document.querySelector('.map-surface');
  const dateTabs = forecastBrowser?.querySelector('.forecast-date-tabs');
  const forecastPanels = [...(forecastBrowser?.querySelectorAll('.forecast-maps > li') || [])];
  if (dateTabs && forecastPanels.length) {
    const tabs = forecastPanels.map((panel, index) => {
      const sourceDate = panel.querySelector('time');
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.id = `forecast-date-${index}`;
      tab.className = 'lab-tab map-layer-control';
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-label', sourceDate.textContent.trim());
      panel.id = `forecast-panel-${index}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      panel.querySelector('img').loading = 'eager';
      tab.setAttribute('aria-controls', panel.id);
      const label = document.createElement('time');
      label.dateTime = sourceDate.dateTime;
      label.className = 'forecast-date-control__label';
      const [weekday, ...date] = sourceDate.textContent.trim().split(/\s+/);
      const day = document.createElement('span');
      day.textContent = weekday;
      const stamp = document.createElement('span');
      stamp.className = 'forecast-date-control__date';
      stamp.textContent = date.join(' ');
      label.append(day, stamp);
      tab.append(label);
      dateTabs.append(tab);
      return tab;
    });
    const selectDate = index => {
      forecastPanels.forEach((panel, position) => { panel.hidden = position !== index; });
      forecastBrowser.dispatchEvent(new CustomEvent('forecast-date-change', { detail: index }));
      requestAnimationFrame(placeDateTabs);
    };
    function placeDateTabs() {
      const primaryWidth = primaryMapSurface?.getBoundingClientRect().width;
      if (primaryWidth) forecastBrowser.style.setProperty('--forecast-map-width', `${primaryWidth}px`);
      const image = forecastPanels.find(panel => !panel.hidden)?.querySelector('img');
      if (!image) return;
      const bounds = image.getBoundingClientRect();
      const inset = bounds.top - forecastBrowser.getBoundingClientRect().top;
      forecastBrowser.style.setProperty('--forecast-tabs-top', `${inset}px`);
      forecastBrowser.style.setProperty('--forecast-tabs-height', `${bounds.height}px`);
    }
    forecastBrowser.querySelector('.forecast-maps').setAttribute('role', 'presentation');
    window.ILMETEO_UI.tabs(dateTabs, tabs, { orientation: 'vertical', select: selectDate });
    dateTabs.hidden = false;
    forecastBrowser.classList.add('has-date-tabs');
    new ResizeObserver(placeDateTabs).observe(forecastBrowser);
    if (primaryMapSurface) new ResizeObserver(placeDateTabs).observe(primaryMapSurface);
    document.fonts.ready.then(placeDateTabs);
    placeDateTabs();
  }
  const compactMaps = matchMedia('(max-width: 600px)');
  const syncMapOrientation = () => {
    [layerMenu,dateTabs].filter(Boolean).forEach(list => list.setAttribute('aria-orientation', compactMaps.matches ? 'horizontal' : 'vertical'));
  };
  compactMaps.addEventListener('change', syncMapOrientation);
  syncMapOrientation();
})();
