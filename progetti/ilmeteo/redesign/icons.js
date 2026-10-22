/* One official icon family across the authored redesign; archived pages keep their source assets. */
(() => {
  const icons = window.ILMETEO_HEROICONS;
  if (!icons || document.body.dataset.version !== 'redesign') return;
  const createIcon = name => {
    const template = document.createElement('template');
    template.innerHTML = icons[name];
    const svg = template.content.firstElementChild;
    svg.classList.add('site-heroicon');
    return svg;
  };
  const decorate = (element, name, mode = 'only') => {
    if (element.dataset.siteIcon) return;
    element.dataset.siteIcon = name;
    // Image-submit inputs are void elements: keep their native submit behavior
    // and render the same official SVG as a local background instead of a child.
    if (element.tagName === 'INPUT') {
      const navy = getComputedStyle(document.body).getPropertyValue('--meteo-navy').trim();
      const svg = icons[name].replaceAll('currentColor', navy);
      element.dataset.heroicon = name;
      element.style.setProperty('background-image', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, 'important');
      element.style.setProperty('background-position', 'center');
      element.style.setProperty('background-size', '20px 20px');
      element.style.setProperty('background-repeat', 'no-repeat');
      return;
    }
    element.classList.add('hero-icon-host', mode === 'only' ? 'hero-icon-only' : 'hero-icon-trailing');
    const style = getComputedStyle(element);
    if (style.position === 'static') element.style.position = 'relative';
    if (mode === 'only' && element.tagName === 'SPAN' && style.display === 'inline') {
      const rect = element.getBoundingClientRect();
      element.style.display = 'inline-block';
      element.style.width = `${Math.max(16, rect.width)}px`;
      element.style.height = `${Math.max(16, rect.height)}px`;
    }
    if (!element.hasAttribute('aria-label') && mode === 'only') {
      const label = element.title || element.textContent.trim();
      if (label && !/^[+−–\->\s]+$/.test(label)) element.setAttribute('aria-label', label);
    }
    element.append(createIcon(name));
  };
  const elements = (scope, selector) => [
    ...(scope.matches?.(selector) ? [scope] : []), ...scope.querySelectorAll(selector),
  ];
  const rules = [
    ['.search_bar__button_elenco', 'list-bullet'],
    ['.search_bar__button_cerca,.nav-glass', 'magnifying-glass'],
    ['.main_menu__list__item__button--profile', 'user-circle'],
    ['.forecast_gadgets2__bulletin__menu', 'document-arrow-down'],
    ['.leaflet-control-zoom-in', 'plus'],
    ['.leaflet-control-zoom-out', 'minus'],
    ['.leaflet-control-fullscreen-button', 'arrows-pointing-out'],
    ['.eff-sole', 'sun'],
    ['.eff-luna', 'moon'],
    ['.radar_arrow_btn', 'chevron-right'],
    ['.smartbanner__exit', 'x-mark'],
  ];
  const backgroundRules = [
    [/arrow_submenu|arrow_right|freccia-link/, 'chevron-right'],
    [/arrow_left/, 'chevron-left'],
    [/arrow_down/, 'chevron-down'],
    [/arrow_up/, 'chevron-up'],
    [/reporter_icon|ico_weather_reporter/, 'pencil-square'],
    [/search-button|search\.svg/, 'magnifying-glass'],
    [/pdf_icon/, 'document-arrow-down'],
    [/ico_user/, 'user-circle'],
  ];
  function weatherIcon(element) {
    const code = Number(element.dataset.simbolo || element.className.match(/ss-(?:small|big)(\d+)/)?.[1]);
    if (!code || element.dataset.heroWeather === String(code)) return;
    element.dataset.heroWeather = String(code);
    element.classList.add('hero-weather-icon');
    if (getComputedStyle(element).position === 'static') element.style.position = 'relative';
    const condition = code % 100, night = code >= 100;
    const weather = window.ILMETEO_WEATHER_ICONS;
    if (weather) {
      const name = condition === 1 ? (night ? 'moon' : 'sun')
        : condition <= 3 ? (night ? 'partly-night' : 'partly')
        : condition === 4 ? 'cloud'
        : condition === 5 ? 'drizzle'
        : condition <= 7 ? 'rain'
        : condition <= 10 ? 'heavy-rain'
        : condition === 11 ? 'storm'
        : condition <= 15 ? 'snow'
        : condition <= 18 ? 'sleet' : 'fog';
      const template = document.createElement('template');
      template.innerHTML = weather[name];
      const glyph = template.content.firstElementChild;
      glyph.classList.add('site-heroicon', 'hero-weather-main');
      if (name === 'sun') glyph.classList.add('hero-weather-sun');
      element.replaceChildren(glyph);
      return;
    }
    const name = condition === 1 ? (night ? 'moon' : 'sun')
      : condition === 11 ? 'bolt'
      : condition >= 12 && condition <= 18 ? 'sparkles'
      : condition >= 5 && condition <= 10 ? 'cloud-arrow-down' : 'cloud';
    const glyph = createIcon(name);
    glyph.classList.add('hero-weather-main');
    if (name === 'sun') glyph.classList.add('hero-weather-sun');
    element.replaceChildren(glyph);
    if (condition === 2 || condition === 3 || night && condition === 4) {
      const celestial = createIcon(night ? 'moon' : 'sun');
      celestial.classList.add('hero-weather-celestial');
      if (!night) celestial.classList.add('hero-weather-sun');
      element.prepend(celestial);
    }
  }

  function windIcon(element) {
    if (element.dataset.siteIcon) return;
    const background = getComputedStyle(element).backgroundImage;
    if (background === 'none') return;
    try {
      const color = decodeURIComponent(background).match(/fill=\\*"(#[\da-f]{3,8})/i)?.[1];
      if (color) element.style.color = color;
    } catch { /* A source icon without a decodable color uses the inherited foreground. */ }
    // The captured wind glyph points down; keep the source rotation and dimensions.
    decorate(element, 'arrow-down');
  }
  function ratingIcons(element) {
    const count = Number(element.className.match(/(?:^|\s)rating-(\d)/)?.[1] || 0);
    if (element.dataset.heroRating === String(count)) return;
    element.dataset.heroRating = String(count);
    element.classList.add('hero-rating');
    element.replaceChildren(...Array.from({ length: 5 }, (_, index) => {
      const glyph = createIcon(index < count ? 'star-solid' : 'star');
      glyph.classList.add('hero-rating-star');
      return glyph;
    }));
  }
  function selectIcon(element) {
    if (element.multiple || element.size > 1 || element.dataset.siteIcon) return;
    const style = getComputedStyle(element);
    const svg = icons['chevron-down'].replaceAll('currentColor', style.color);
    element.dataset.siteIcon = 'chevron-down';
    element.dataset.heroicon = 'chevron-down';
    element.style.setProperty('appearance', 'none');
    element.style.setProperty('background-image', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, 'important');
    element.style.setProperty('background-position', 'right 6px center');
    element.style.setProperty('background-size', '16px 16px');
    element.style.setProperty('background-repeat', 'no-repeat');
    element.style.paddingInlineEnd = `${Math.max(26, parseFloat(style.paddingInlineEnd) || 0)}px`;
  }
  function triangleIcon(element) {
    if (element.dataset.siteIcon) return;
    const width = element.offsetWidth || 16, height = element.offsetHeight || 26;
    const name = element.classList.contains('left') ? 'chevron-left' : 'chevron-right';
    element.style.setProperty('--hero-arrow-width', `${width}px`);
    element.style.setProperty('--hero-arrow-height', `${height}px`);
    element.classList.add('hero-css-arrow');
    decorate(element, name);
  }
  function hydrate(scope) {
    for (const [selector, name] of rules) elements(scope, selector).forEach(el => decorate(el, name));
    elements(scope, '.s-small,.s-big').forEach(weatherIcon);
    elements(scope, '.w').forEach(windIcon);
    elements(scope, '.rating').forEach(ratingIcons);
    elements(scope, 'select').forEach(selectIcon);
    elements(scope, '.fill-arrow').forEach(triangleIcon);
    for (const element of elements(scope, 'a,button,div,span')) {
      if (element.dataset.siteIcon || element.classList.contains('hero-weather-icon') || element.classList.contains('hero-rating')) continue;
      const background = getComputedStyle(element).backgroundImage;
      const match = backgroundRules.find(([pattern]) => pattern.test(background));
      if (match) decorate(element, match[1], element.textContent.trim() ? 'trailing' : 'only');
    }
  }
  document.addEventListener('fullscreenchange', () => {
    for (const button of document.querySelectorAll('.leaflet-control-fullscreen-button')) {
      button.querySelector(':scope > .site-heroicon')?.remove();
      button.append(createIcon(document.fullscreenElement ? 'arrows-pointing-in' : 'arrows-pointing-out'));
      button.setAttribute('aria-label', document.fullscreenElement ? 'Esci dallo schermo intero' : 'Apri mappa a schermo intero');
    }
  });
  for (const button of document.querySelectorAll('.search_bar__button_cerca')) {
    if (button.tagName !== 'BUTTON') {
      button.setAttribute('role', 'button');
      button.setAttribute('aria-label', 'Cerca');
      button.tabIndex = 0;
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });
    }
  }
  hydrate(document.body);
  new MutationObserver(records => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node instanceof Element && !node.matches('svg,path,time')) hydrate(node);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();

/* Weather-specific symbols share Heroicons' visual metrics, with original geometry. */
(() => {
  const icons = window.ILMETEO_WEATHER_ICONS;
  if (!icons) return;
  const replace = (element, name) => {
    if (!element) return;
    const template = document.createElement('template');
    template.innerHTML = icons[name];
    const svg = template.content.firstElementChild;
    const previous = element.querySelector('svg');
    if (!previous) return;
    svg.setAttribute('class', previous.getAttribute('class') || '');
    previous.replaceWith(svg);
  };
  const names = {Tempo:'partly', Precipitazioni:'rain', Neve:'snow', Temperature:'temperature', 'Venti-Mari':'wind'};
  document.querySelectorAll('.map-layer-control').forEach(button => {
    const name = names[button.getAttribute('aria-label')];
    if (name) replace(button, name);
  });
  replace(document.querySelector('.home-weather-ticker'), 'rain');
})();
