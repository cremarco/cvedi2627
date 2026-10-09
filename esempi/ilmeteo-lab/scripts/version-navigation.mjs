import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = [['index', 'Home'], ['milano', 'Milano'], ['domani', 'Domani']];
export function versionNavigation(version, page) {
  const other = version === 'originale' ? 'redesign' : 'originale';
  const icon = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4"/></svg>';
  return `<aside id="ilmeteo-version-nav" data-theme="ilmeteo" aria-label="Confronto delle versioni"><a class="lab-btn version-switch" href="../${other}/${page}.html" data-version-switch="${other}" aria-label="Passa alla versione ${other === 'redesign' ? 'nuova' : 'precedente'}: ${pages.find(([file]) => file === page)[1]}">${icon}<span>Passa ${other === 'redesign' ? 'al nuovo sito' : 'all’originale'}</span></a></aside>`;
}
export function enhancePage(html, version, page) {
  html = html.replace(/<aside id="ilmeteo-version-nav"[\s\S]*?<\/aside>/g, '')
    .replace(/<link rel="stylesheet" href="\.\.\/version-nav.css">/g, '')
    .replace(/<script src="\.\.\/version-nav.js"><\/script>/g, '');
  if (version === 'originale') {
    // Ignore archived comments/templates; repair actual anchors without rewriting source HTML.
    html = html.replace(/<!--[\s\S]*?-->|<(?:a|area)\b[^>]*>/gi, tag => {
      if (tag.startsWith('<!--')) return tag;
      const href = tag.match(/\shref="([^"]*)"/i)?.[1];
      const live = tag.match(/\bdata-live-href="([^"]*)"/i)?.[1];
      const candidate = live || (href === 'bologna.html' ? 'https://www.ilmeteo.it/meteo/bologna' : href);
      if (!candidate || candidate.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(candidate)) return tag;
      const url = new URL(candidate.replaceAll('&amp;', '&'), 'https://www.ilmeteo.it/');
      if (!['www.ilmeteo.it', 'ilmeteo.it'].includes(url.hostname)) return tag;
      const local = {'/': 'index', '/portale': 'index', '/meteo/milano': 'milano', '/portale/meteo-domani': 'domani'}[url.pathname.replace(/\/+$/, '') || '/'];
      if (href === 'bologna.html' && !local) {
        return tag.replace(/\shref="[^"]*"/i, ' href="#snapshot-unavailable" data-live-href="https://www.ilmeteo.it/meteo/bologna"');
      }
      if (!local) return tag;
      return tag.replace(/\shref="[^"]*"/i, ` href="${local}.html${url.hash}"`)
        .replace(/\sdata-live-href="[^"]*"/i, '').replace(/\starget="[^"]*"/i, '');
    });
  }
  return html.replace('</head>', '<link rel="stylesheet" href="../version-nav.css"><script src="../version-nav.js"></script></head>')
    .replace('</body>', versionNavigation(version, page) + '</body>');
}
export async function buildVersionNavigation() {
  for (const version of ['originale', 'redesign']) for (const [page] of pages) {
    const file = path.join(root, version, `${page}.html`);
    await fs.writeFile(file, enhancePage(await fs.readFile(file, 'utf8'), version, page));
  }
}
