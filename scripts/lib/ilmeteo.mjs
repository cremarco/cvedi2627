import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { collectLocalResources } from './ilmeteo-assets.mjs';
import { definitions, frameTimes } from '../../progetti/ilmeteo/data/leaflet-weather.mjs';

export const ilmeteoDirectory = 'ilmeteo';
export const ilmeteoSource = fileURLToPath(new URL('../../progetti/ilmeteo/', import.meta.url));
export const ilmeteoRuntimeFiles = [
  'index.html', 'version-nav.css', 'version-nav.js',
  ...['originale', 'redesign'].flatMap(version => ['index', 'milano', 'domani', 'bologna'].map(page => `${version}/${page}.html`)),
  'originale/snapshot.js', 'originale/snapshot-data.js', 'redesign/app.js', 'redesign/style.css', 'redesign/home.css', 'redesign/home-ui.js',
  'redesign/ui.js', 'redesign/icons.js',
  'redesign/forecast-interactive.js', 'redesign/forecast-interactive.css',
  'redesign/weather-map-base.js', 'redesign/primary-weather-map.js', 'redesign/primary-weather-map.css',
  'redesign/world-weather-map.js',
  'sources/manifest.json', 'sources/milano-manifest.json',
];
// These filenames are generated dynamically by Leaflet or by the radar player.
const dynamicAssets = [
  ...[...Object.values(definitions).map(definition => definition.file), ...frameTimes.map((_, index) => `radar-${index}`)]
    .map(name => `assets/maps/leaflet-weather/${name}.svg`),
  ...['layers.png', 'layers-2x.png', 'marker-icon.png', 'marker-icon-2x.png', 'marker-shadow.png']
    .map(name => `assets/vendor/leaflet/images/${name}`),
  'assets/vendor/leaflet/LICENSE.txt', 'assets/controls/heroicons/LICENSE.txt', 'assets/fonts/OFL-NunitoSans.txt',
];
export function getIlmeteoPublicFiles() {
  return collectLocalResources(ilmeteoSource, [...ilmeteoRuntimeFiles, ...dynamicAssets]);
}
let publicFiles;
export function isIlmeteoRuntimePath(pathname) {
  return !pathname.split('/').some(part => part.startsWith('.') || part.includes('\0'))
    && (publicFiles ??= new Set(getIlmeteoPublicFiles())).has(pathname);
}

/** Expose the same public files in Slidev development and in the Pages export. */
export function ilmeteoPlugin() {
  const require = createRequire(realpathSync(new URL('../../node_modules/@slidev/cli/package.json', import.meta.url)));
  const serve = require('sirv')(ilmeteoSource, { dev: true });
  return {
    name: 'cvedi-ilmeteo',
    configureServer(server) {
      const prefix = '/' + ilmeteoDirectory;
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url, 'http://localhost');
        if (url.pathname !== prefix) return next();
        response.writeHead(308, { Location: prefix + '/' + url.search }).end();
      });
      server.middlewares.use(prefix, (request, response) => {
        let pathname;
        try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/+/, ''); }
        catch { response.writeHead(404).end(); return; }
        if (!pathname || pathname.endsWith('/')) pathname += 'index.html';
        if (!isIlmeteoRuntimePath(pathname)) { response.writeHead(404).end(); return; }
        serve(request, response, () => response.writeHead(404).end());
      });
    },
  };
}
