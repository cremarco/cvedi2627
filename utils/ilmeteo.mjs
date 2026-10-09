import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const ilmeteoDirectory = 'ilmeteo';
export const ilmeteoSource = fileURLToPath(new URL('../esempi/ilmeteo-lab/', import.meta.url));
export const ilmeteoRuntimeFiles = [
  'index.html', 'version-nav.css', 'version-nav.js',
  ...['originale', 'redesign'].flatMap(version => ['index', 'milano', 'domani', 'bologna'].map(page => `${version}/${page}.html`)),
  'originale/snapshot.js', 'originale/snapshot-data.js', 'redesign/app.js', 'redesign/style.css',
  'sources/manifest.json', 'sources/milano-manifest.json',
];
const files = new Set(ilmeteoRuntimeFiles);
export function isIlmeteoRuntimePath(pathname) {
  return !pathname.split('/').some(part => part.startsWith('.') || part.includes('\0'))
    && (files.has(pathname) || pathname.startsWith('assets/'));
}

/** Expose the same public files in Slidev development and in the Pages export. */
export function ilmeteoPlugin() {
  const require = createRequire(realpathSync(new URL('../node_modules/@slidev/cli/package.json', import.meta.url)));
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
