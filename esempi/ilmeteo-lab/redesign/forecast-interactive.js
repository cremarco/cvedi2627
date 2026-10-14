/* Leaflet enhancement of the four daily maps. Static images remain for print. */
(() => {
  const section = document.querySelector('.forecast-map-browser');
  const data = window.ILMETEO_FORECAST_INTERACTIVE;
  if (!section || !data || !window.ILMETEO_WEATHER_BASE) return;
  const viewport = document.createElement('div');
  viewport.id = 'forecast-interactive';
  viewport.className = 'forecast-interactive';
  viewport.setAttribute('role', 'region');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  section.append(viewport);
  const {map, regions} = window.ILMETEO_WEATHER_BASE.create(viewport, code => markers[code-1].openPopup());
  let selectedRegion;
  const conditionNames = {sun:'Sereno',partly:'Parzialmente nuvoloso',cloud:'Nuvoloso',rain:'Pioggia'};
  let dayIndex = -1;
  function clearRegionSelection() {
    selectedRegion?.getElement()?.classList.remove('is-selected');
    selectedRegion = undefined;
  }
  map.on('popupclose', clearRegionSelection);
  const markers = data.places.map(([name, longitude, latitude], index) => {
    const marker = L.marker([latitude,longitude], {keyboard: true, riseOnHover: true, autoPanOnFocus: true});
    // Leaflet calls this factory for mouse, region and keyboard activation.
    marker.bindPopup(() => {
      const day = data.days[dayIndex];
      const container = document.createElement('div');
      const heading = document.createElement('strong'); heading.textContent = name;
      const description = document.createElement('p');
      description.textContent = `${conditionNames[day.conditions[index]]} · ${section.querySelector('li:not([hidden]) time').textContent.trim()}. Condizione illustrativa.`;
      container.append(heading, description);
      return container;
    }, {closeButton: false});
    marker.on('popupopen', () => {
      clearRegionSelection();
      selectedRegion = regions.getLayers().find(region => region.feature.properties.code === index + 1);
      selectedRegion.getElement().classList.add('is-selected');
    });
    marker.on('add', () => marker.getElement().addEventListener('keydown', event => {
      if (event.key !== ' ') return;
      event.preventDefault(); event.stopPropagation(); marker.openPopup();
    }));
    return marker;
  });
  const zoomButtons = [];
  const Controls = L.Control.extend({
    options: {position: 'topleft'},
    onAdd() {
      const group = L.DomUtil.create('div', 'forecast-map-tools');
      L.DomEvent.disableClickPropagation(group);
      L.DomEvent.disableScrollPropagation(group);
      for (const [icon, label, action] of [
        ['plus','Ingrandisci mappa giornaliera',() => map.zoomIn(undefined, {animate: !reduced.matches})],
        ['minus','Riduci mappa giornaliera',() => map.zoomOut(undefined, {animate: !reduced.matches})],
        ['arrows-pointing-in','Mostra tutta Italia',() => fitItaly()],
      ]) {
        const button = document.createElement('button'); button.type = 'button';
        button.className = 'lab-btn forecast-map-tool'; button.setAttribute('aria-label', label);
        button.title = label; button.innerHTML = window.ILMETEO_HEROICONS[icon];
        button.addEventListener('click', action); group.append(button);
        if (icon !== 'arrows-pointing-in') zoomButtons.push(button);
      }
      return group;
    },
  });
  new Controls().addTo(map);
  const syncZoomControls = () => {
    const limits = [map.getZoom() >= map.getMaxZoom(), map.getZoom() <= map.getMinZoom()];
    zoomButtons.forEach((button, index) => {
      button.disabled = limits[index];
      button.setAttribute('aria-disabled', String(limits[index]));
    });
  };
  map.on('zoomend', syncZoomControls);
  let overview = true;
  let fitting = false;
  map.on('movestart', () => { if (!fitting) overview = false; });
  function fitItaly() {
    fitting = true;
    const mobile = viewport.clientWidth < 500;
    map.fitBounds([[36.55,7],[47.2,18.7]], {
      paddingTopLeft: [mobile ? 32 : 48, 24],
      paddingBottomRight: [24, 30], animate: false,
    });
    fitting = false;
    overview = true;
    syncZoomControls();
  }
  function updateDay() {
    const panels = [...section.querySelectorAll('.forecast-maps > li')];
    const next = panels.findIndex(panel => !panel.hidden);
    if (next < 0 || next === dayIndex) return;
    dayIndex = next; map.closePopup();
    const day = data.days[next];
    viewport.setAttribute('aria-label', `Mappa interattiva del ${panels[next].querySelector('time').textContent.trim()}. Condizioni illustrative. Usa più e meno per lo zoom, le frecce per spostarti.`);
    section.querySelectorAll('.forecast-date-tabs [role="tab"]').forEach(tab => {
      tab.setAttribute('aria-controls', `${tab.getAttribute('aria-controls').split(' ')[0]} ${viewport.id}`);
    });
    panels.forEach(panel => {panel.tabIndex = -1; panel.querySelector('a').tabIndex = -1;});
    markers.forEach((marker,index) => {
      const condition = day.conditions[index];
      marker.setIcon(L.divIcon({html:data.icons[condition],className:'forecast-weather-marker',iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-20]}));
      if (!map.hasLayer(marker)) marker.addTo(map);
      const element = marker.getElement();
      element.setAttribute('aria-label', `${data.places[index][0]}: ${conditionNames[condition]}`);
      element.title = `${data.places[index][0]}: ${conditionNames[condition]}`;
    });
  }
  let previousSize = '';
  function resize() {
    const image = section.querySelector('.forecast-maps li:not([hidden]) img');
    if (!image) return;
    const bounds = image.getBoundingClientRect(), parent = section.getBoundingClientRect();
    Object.assign(viewport.style, {left:`${bounds.left-parent.left}px`,top:`${bounds.top-parent.top}px`,width:`${bounds.width}px`,height:`${bounds.height}px`});
    const size = `${Math.round(bounds.width)}x${Math.round(bounds.height)}`;
    if (size === previousSize) return;
    const center = previousSize ? map.getCenter() : null;
    const zoom = map.getZoom();
    previousSize = size;
    const wasOverview = overview;
    fitting = true;
    // Recenter before maxBounds reacts to the temporary size-only view.
    map.invalidateSize({pan:false, debounceMoveend:true});
    // Adapt the overview, while preserving a view deliberately zoomed or panned.
    if (wasOverview) fitItaly();
    else if (center) map.setView(center, zoom, {animate:false});
    fitting = false;
  }
  section.classList.add('has-interactive-map');
  resize(); updateDay();
  let markerMotionVisible = false;
  const syncMarkerMotion = () => {
    viewport.dataset.weatherMotion = markerMotionVisible && !document.hidden && !reduced.matches ? 'active' : 'static';
  };
  syncMarkerMotion();
  new IntersectionObserver(([entry]) => {
    markerMotionVisible = entry.isIntersecting;
    syncMarkerMotion();
  }, {threshold: .05}).observe(viewport);
  document.addEventListener('visibilitychange', syncMarkerMotion);
  reduced.addEventListener('change', syncMarkerMotion);
  // Date selection is owned by app.js; do not infer it from unrelated DOM mutations.
  section.addEventListener('forecast-date-change', () => {updateDay(); resize();});
  new ResizeObserver(resize).observe(section);
  document.fonts.ready.then(resize);
})();
