/* Local world geography and country/city discovery; no remote forecast service. */
(() => {
  const section = document.querySelector('#international-world');
  const data = window.ILMETEO_WORLD_MAP;
  if (!section || !data?.geography || !data.countries?.length || !window.L) return;
  const viewport = section.querySelector('#world-weather-map');
  const countryForm = section.querySelector('#world-country-form');
  const countryInput = section.querySelector('#world-country-search');
  const results = section.querySelector('#world-country-results');
  const searchStatus = section.querySelector('#world-search-status');
  const countryHeading = section.querySelector('#world-selected-country');
  const countryStatus = section.querySelector('#world-country-status');
  const cityForm = section.querySelector('#world-city-form');
  const cityInput = section.querySelector('#world-city-search');
  const cityStatus = section.querySelector('#world-city-status');
  const zoomIn = section.querySelector('#world-map-zoom-in');
  const zoomOut = section.querySelector('#world-map-zoom-out');
  const reset = section.querySelector('#world-map-reset');
  if (![viewport,countryForm,countryInput,results,searchStatus,countryHeading,countryStatus,
    cityForm,cityInput,cityStatus,zoomIn,zoomOut,reset].every(Boolean)) return;

  const normalize = value => value.trim().toLocaleLowerCase('it-IT').normalize('NFD').replace(/\p{M}/gu, '');
  const countries = [...data.countries].sort((a,b) => a.name.localeCompare(b.name, 'it'));
  const byId = new Map(countries.map(country => [country.id,country]));
  const searchable = countries.map(country => ({country,terms:[country.name,...(country.aliases || [])].map(normalize)}));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const defaultSearchStatus = searchStatus.textContent;
  const defaultCountryStatus = countryStatus.textContent;
  const defaultCityStatus = cityStatus.textContent;
  let selectedId = null;
  let rovingId = byId.has('ITA') ? 'ITA' : countries[0].id;
  let matches = [];
  let activeResult = -1;
  let overview = true;
  let fitting = false;
  let visible = false;
  let previousSize = '';
  const layers = new Map();
  const canAnimate = () => visible && !document.hidden && !reduced.matches;

  viewport.hidden = false;
  const map = L.map(viewport, {
    crs: L.CRS.EPSG4326, zoomControl: false, attributionControl: true,
    center: [0,0], zoom: -2,
    scrollWheelZoom: false, minZoom: -2, maxZoom: 7, zoomSnap: .25, zoomDelta: .5,
    zoomAnimation: !reduced.matches, fadeAnimation: !reduced.matches,
    markerZoomAnimation: !reduced.matches,
    maxBounds: [[-100,-220],[100,220]], maxBoundsViscosity: .8,
  });
  viewport.setAttribute('role', 'region');
  map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
  L.geoJSON(data.geography, {
    style: {className:'world-map-country',weight:.8,fillOpacity:1},
    attribution: '<a href="https://www.naturalearthdata.com/">Natural Earth</a>',
    onEachFeature(feature, layer) {
      const country = byId.get(feature.properties.id);
      if (!country) return;
      layers.set(country.id, layer);
      const label = document.createElement('span');
      label.textContent = country.name;
      layer.bindTooltip(label, {sticky:true});
      layer.on('click', () => {
        selectCountry(country.id);
        layer.getElement()?.focus({preventScroll:true});
      });
    },
  }).addTo(map);

  function syncZoom() {
    viewport.dataset.worldZoom = String(map.getZoom());
    section.dataset.worldOverview = String(overview);
    [zoomIn,zoomOut].forEach((button,index) => {
      button.disabled = index === 0 ? map.getZoom() >= map.getMaxZoom() : map.getZoom() <= map.getMinZoom();
      button.setAttribute('aria-disabled', String(button.disabled));
    });
  }
  function fitWorld() {
    map.stop();
    fitting = true;
    map.fitBounds([[-90,-180],[90,180]], {padding:[12,12],animate:false});
    fitting = false;
    overview = true;
    syncZoom();
  }
  function syncCountryPaths() {
    layers.forEach((layer,id) => {
      const element = layer.getElement();
      if (!element) return;
      element.classList.toggle('is-selected', id === selectedId);
      element.setAttribute('aria-pressed', String(id === selectedId));
      element.tabIndex = id === rovingId ? 0 : -1;
    });
  }
  function syncMapName() {
    const place = selectedId ? ` Paese selezionato: ${byId.get(selectedId).name}.` : '';
    viewport.setAttribute('aria-label', `Mappa del mondo per scegliere un paese.${place} Non mostra dati meteorologici. Usa le frecce per spostare la mappa. Sul paese a fuoco, frecce, Home ed End cambiano destinazione; Invio o Spazio la selezionano.`);
  }
  function closeResults() {
    results.hidden = true;
    countryInput.setAttribute('aria-expanded', 'false');
    countryInput.removeAttribute('aria-activedescendant');
    activeResult = -1;
  }
  function activateResult(index) {
    activeResult = index;
    [...results.children].forEach((option,position) => option.setAttribute('aria-selected', String(position === index)));
    const option = results.children[index];
    if (option) {
      countryInput.setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
    } else countryInput.removeAttribute('aria-activedescendant');
  }
  function showResults() {
    const query = normalize(countryInput.value);
    matches = searchable.filter(entry => entry.terms.some(term => term.includes(query))).sort((a,b) => {
      const rank = entry => entry.terms.some(term => term === query) ? 0 : entry.terms.some(term => term.startsWith(query)) ? 1 : 2;
      return rank(a) - rank(b) || a.country.name.localeCompare(b.country.name,'it');
    }).map(entry => entry.country);
    results.replaceChildren();
    matches.forEach(country => {
      const option = document.createElement('li');
      option.className = 'world-country-option';
      option.id = `world-country-option-${country.id}`;
      option.setAttribute('role','option');
      option.setAttribute('aria-selected','false');
      option.textContent = country.name;
      option.addEventListener('mousedown',event => event.preventDefault());
      option.addEventListener('click',() => {selectCountry(country.id);countryInput.focus({preventScroll:true});});
      results.append(option);
    });
    results.hidden = !matches.length;
    countryInput.setAttribute('aria-expanded', String(Boolean(matches.length)));
    activateResult(-1);
    countryInput.setAttribute('aria-invalid', String(Boolean(query && !matches.length)));
    searchStatus.textContent = !query
      ? 'Scrivi un paese oppure scegli dall’elenco. Usa le frecce e Invio per selezionare.'
      : matches.length
        ? `${matches.length} paesi o territori trovati. Scegli un risultato con le frecce e Invio.`
        : `Nessun paese trovato per «${countryInput.value.trim()}». Correggi il nome o cancella la ricerca per vedere tutti i paesi.`;
  }
  function selectCountry(id) {
    const country = byId.get(id);
    if (!country) return;
    selectedId = id;
    rovingId = id;
    countryInput.value = country.name;
    countryInput.removeAttribute('aria-invalid');
    closeResults();
    searchStatus.textContent = `${country.name} selezionato sulla mappa.`;
    countryHeading.textContent = country.name;
    countryStatus.textContent = id === 'ITA'
      ? 'Nella copia locale sono disponibili le previsioni di Milano, acquisite il 9 ottobre 2026.'
      : `Le previsioni per ${country.name} non sono state acquisite. Nella copia locale puoi consultare Milano.`;
    cityStatus.textContent = id === 'ITA'
      ? 'Cerca Milano per aprire le previsioni disponibili nella copia locale.'
      : `Puoi cercare una città in ${country.name}; le previsioni internazionali non sono state acquisite.`;
    viewport.dataset.selectedCountry = id;
    syncCountryPaths();
    syncMapName();
    layers.forEach((layer,key) => {if (key !== id) layer.closeTooltip();});
    overview = false;
    fitting = true;
    map.stop();
    map.fitBounds(country.focusBounds, {padding:[24,24],maxZoom:5.5,animate:canAnimate()});
    fitting = false;
    layers.get(id)?.openTooltip();
  }
  function resetWorld() {
    selectedId = null;
    rovingId = byId.has('ITA') ? 'ITA' : countries[0].id;
    delete viewport.dataset.selectedCountry;
    countryInput.value = '';
    cityInput.value = '';
    countryInput.removeAttribute('aria-invalid');
    cityInput.removeAttribute('aria-invalid');
    closeResults();
    results.replaceChildren();
    searchStatus.textContent = defaultSearchStatus;
    countryHeading.textContent = 'Scegli un paese';
    countryStatus.textContent = defaultCountryStatus;
    cityStatus.textContent = defaultCityStatus;
    layers.forEach(layer => layer.closeTooltip());
    syncCountryPaths();
    syncMapName();
    fitWorld();
  }
  countryInput.addEventListener('input', showResults);
  countryInput.addEventListener('keydown', event => {
    if (event.key === 'Escape') {event.preventDefault();closeResults();return;}
    if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
    if (results.hidden && ['Home','End'].includes(event.key)) return;
    event.preventDefault();
    if (results.hidden) showResults();
    if (!matches.length) return;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? matches.length - 1
      : event.key === 'ArrowDown' ? (activeResult + 1) % matches.length
        : activeResult < 0 ? matches.length - 1 : (activeResult - 1 + matches.length) % matches.length;
    activateResult(next);
  });
  countryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!results.hidden && activeResult >= 0) {selectCountry(matches[activeResult].id);return;}
    const query = normalize(countryInput.value);
    const exact = searchable.find(entry => entry.terms.includes(query));
    if (query && exact) {selectCountry(exact.country.id);return;}
    showResults();
    if (query && matches.length === 1) selectCountry(matches[0].id);
    else countryInput.focus({preventScroll:true});
  });
  document.addEventListener('click', event => {if (!countryForm.contains(event.target)) closeResults();});
  countryForm.addEventListener('focusout', event => {if (!countryForm.contains(event.relatedTarget)) closeResults();});
  cityInput.addEventListener('input', () => cityInput.removeAttribute('aria-invalid'));
  cityForm.addEventListener('submit', event => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      cityInput.setAttribute('aria-invalid','true');
      cityStatus.textContent = 'Scrivi una città. Per le previsioni disponibili nella copia puoi consultare Milano.';
      cityInput.focus();
      return;
    }
    cityInput.removeAttribute('aria-invalid');
    if (normalize(city) === 'milano' && (!selectedId || selectedId === 'ITA')) {
      location.href = section.querySelector('#world-milano-link')?.getAttribute('href') || 'milano.html';
      return;
    }
    const country = selectedId ? ` in ${byId.get(selectedId).name}` : '';
    cityStatus.textContent = `Le previsioni per ${city}${country} non sono state acquisite. La copia locale comprende Milano, Home e Meteo domani.`;
  });

  const countryOrder = countries.filter(country => layers.has(country.id));
  layers.forEach((layer,id) => {
    const element = layer.getElement();
    if (!element) return;
    element.dataset.countryId = id;
    element.setAttribute('role','button');
    element.setAttribute('aria-label', `Seleziona ${byId.get(id).name}`);
    element.addEventListener('focus', () => {
      rovingId = id;
      syncCountryPaths();
      element.classList.add('is-keyboard-focus');
      map.panInside(byId.get(id).center, {padding:[24,24],animate:false});
      layer.openTooltip();
    });
    element.addEventListener('blur', () => {element.classList.remove('is-keyboard-focus');layer.closeTooltip();});
    element.addEventListener('keydown', event => {
      if (event.key === 'Escape') {event.stopPropagation();layer.closeTooltip();viewport.focus({preventScroll:true});return;}
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();event.stopPropagation();selectCountry(id);return;
      }
      if (!['ArrowRight','ArrowDown','ArrowLeft','ArrowUp','Home','End'].includes(event.key)) return;
      event.preventDefault();event.stopPropagation();
      const current = countryOrder.findIndex(country => country.id === id);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? countryOrder.length - 1
        : ['ArrowRight','ArrowDown'].includes(event.key) ? (current + 1) % countryOrder.length
          : (current - 1 + countryOrder.length) % countryOrder.length;
      layers.get(countryOrder[next].id)?.getElement()?.focus({preventScroll:true});
    });
  });
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();event.stopPropagation();
    const direction = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
    map.panBy(direction.map(value => value * map.options.keyboardPanDelta * (event.shiftKey ? 3 : 1)), {animate:canAnimate()});
  });
  zoomIn.addEventListener('click', () => map.zoomIn(undefined, {animate:canAnimate()}));
  zoomOut.addEventListener('click', () => map.zoomOut(undefined, {animate:canAnimate()}));
  reset.addEventListener('click', resetWorld);
  reset.disabled = false;
  reset.removeAttribute('aria-disabled');
  map.on('zoomend', syncZoom);
  map.on('movestart', () => {if (!fitting) {overview = false;section.dataset.worldOverview = 'false';}});
  function resize() {
    const size = `${viewport.clientWidth}x${viewport.clientHeight}`;
    if (!viewport.clientWidth || !viewport.clientHeight || size === previousSize) return;
    const center = previousSize ? map.getCenter() : null;
    const zoom = previousSize ? map.getZoom() : null;
    previousSize = size;
    const wasOverview = overview;
    fitting = true;
    map.stop();
    map.invalidateSize({pan:false,debounceMoveend:true});
    if (wasOverview) fitWorld();
    else if (center) map.setView(center,zoom,{animate:false});
    fitting = false;
    syncZoom();
  }
  function syncMotion() {
    map.options.zoomAnimation = canAnimate();
    map.options.fadeAnimation = canAnimate();
    if (!canAnimate()) map.stop();
  }
  section.dataset.worldReady = 'true';
  countryInput.removeAttribute('list');
  syncCountryPaths();
  syncMapName();
  resize();
  new ResizeObserver(resize).observe(viewport);
  document.fonts.ready.then(resize);
  new IntersectionObserver(([entry]) => {visible = entry.isIntersecting;syncMotion();},{threshold:.01}).observe(viewport);
  reduced.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',syncMotion);
})();
