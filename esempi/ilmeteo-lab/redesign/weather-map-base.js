/* One local Leaflet basemap for the primary views and daily forecasts. */
(() => {
  const data = window.ILMETEO_FORECAST_INTERACTIVE;
  if (!window.L || !data) return;
  window.ILMETEO_WEATHER_BASE = {
    create(viewport, onRegionClick, options = {}) {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)');
      const map = L.map(viewport, {
        zoomControl: false, attributionControl: true, scrollWheelZoom: false,
        zoomSnap: .25, zoomDelta: .5, minZoom: 3, maxZoom: 10,
        zoomAnimation: !reduced.matches, fadeAnimation: !reduced.matches,
        markerZoomAnimation: !reduced.matches,
        maxBounds: [[30,-3],[52,29]], maxBoundsViscosity: .8, ...options,
      });
      viewport.addEventListener('keydown', event => {
        if (!reduced.matches || event.target !== viewport) return;
        const direction = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[event.key];
        if (!direction) return;
        event.preventDefault();event.stopPropagation();
        map.panBy(direction.map(value => value*map.options.keyboardPanDelta*(event.shiftKey?3:1)),{animate:false});
      });
      map.attributionControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
      const countries = L.geoJSON(data.geography, {
        interactive: false,
        style: {className:'forecast-map-country', weight:.8, fillOpacity:1},
        attribution:'<a href="https://www.naturalearthdata.com/">Natural Earth</a>',
      }).addTo(map);
      const regions = L.geoJSON(data.regions, {
        style: {className:'forecast-map-region', weight:1.2, fillOpacity:1},
        attribution:'<a href="https://github.com/guglielmo/geojson-italy">ISTAT / geojson-italy</a>',
        onEachFeature(feature, layer) {
          layer.bindTooltip(feature.properties.name, {sticky:true});
          layer.on('click', () => onRegionClick(feature.properties.code, layer));
        },
      }).addTo(map);
      return {map, regions, countries, reduced};
    },
  };
})();
