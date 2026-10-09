import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.gif':'image/gif', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    if (!pathname || pathname.endsWith('/')) pathname += 'index.html';
    const allowed = /^(originale|redesign|assets)\//.test(pathname) || ['index.html','analisi.html','lab.css','lab.js','version-nav.css','version-nav.js','data/capture.json','data/supplementary.json','sources/manifest.json','sources/milano-manifest.json'].includes(pathname);
    if (pathname.split('/').some(segment => segment.startsWith('.') || segment.includes('\u0000'))) { res.writeHead(404); res.end('Pagina non disponibile'); return; }
    const target = path.resolve(root, pathname);
    if (!allowed || !target.startsWith(root + path.sep)) { res.writeHead(404); res.end('Pagina non disponibile'); return; }
    const body = await fs.readFile(target);
    res.writeHead(200, { 'Content-Type':mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
    res.end(body);
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Pagina non disponibile'); }
});
server.listen(Number(process.env.ILMETEO_PORT || 4187), '127.0.0.1', () => console.log(`iLMeteo laboratory: http://127.0.0.1:${server.address().port}/`));
