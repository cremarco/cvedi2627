import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ilmeteoSource, isIlmeteoRuntimePath } from '../../../utils/ilmeteo.mjs';

const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.gif':'image/gif', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf' };
const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '');
    if (!pathname || pathname.endsWith('/')) pathname += 'index.html';
    const target = path.resolve(ilmeteoSource, pathname);
    if (!isIlmeteoRuntimePath(pathname) || !target.startsWith(ilmeteoSource)) throw new Error('Outside public files');
    const body = await fs.readFile(target);
    res.writeHead(200, { 'Content-Type':mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
    res.end(body);
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}).end('Pagina non disponibile'); }
});
server.listen(Number(process.env.ILMETEO_PORT || 4187), '127.0.0.1', () => console.log(`iLMeteo: http://127.0.0.1:${server.address().port}/`));
