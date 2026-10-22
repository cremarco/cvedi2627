import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const base = 'https://ilmeteo.local/';
const textFiles = /\.(?:html|css|js)$/;
const external = /^(?:#|[a-z][\w+.-]*:|\/\/)/i;

/** Follow local HTML, CSS and script references, including responsive images.
 * Dynamic filenames and license files are declared explicitly by the caller.
 * Manifests describe provenance; they are not browser dependency graphs.
 */
export function collectLocalResources(directory, entries) {
  const visited = new Set();
  function visit(file, parent = 'runtime inventory') {
    if (visited.has(file)) return;
    if (file.startsWith('../') || path.isAbsolute(file)) throw Error(`Resource outside iLMeteo: ${parent} → ${file}`);
    const absolute = path.join(directory, file);
    try { if (!statSync(absolute).isFile()) throw Error('Not a file'); }
    catch { throw Error(`Missing iLMeteo resource: ${parent} → ${file}`); }
    visited.add(file);
    if (!textFiles.test(file)) return;
    const content = readFileSync(absolute, 'utf8');
    // Legacy comment wrappers inside raw-text elements are active CSS/JS, not HTML comments.
    const source = file.endsWith('.html')
      ? content.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->/gi, (match, rawText) => rawText ? match : '')
      : content;
    const references = [...source.matchAll(/["'](\.\.\/assets\/[^"'\s<>]+)["']/g)].map(match => match[1]);
    if (file.endsWith('.html')) references.push(...[...source.matchAll(/\b(?:src|href|poster|data-src)\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]));
    if (!file.endsWith('.js')) references.push(...[...source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)].map(match => match[1]));
    for (const match of file.endsWith('.html') ? source.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi) : []) {
      if (!match[1].startsWith('data:')) references.push(...match[1].split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
    }
    for (const reference of references) {
      if (!reference || external.test(reference) || reference.includes('${')) continue;
      const url = new URL(reference.replaceAll('&amp;', '&'), new URL(file, base));
      if (url.origin !== new URL(base).origin) continue;
      visit(decodeURIComponent(url.pathname.slice(1)), file);
    }
  }
  entries.forEach(file => visit(file));
  return [...visited].sort();
}
