/* Source/runtime contract for the standalone home. No browser or network. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { enhancePage } from './version-navigation.mjs';
import { ilmeteoRuntimeFiles, isIlmeteoRuntimePath } from '../../../utils/ilmeteo.mjs';

const page = new URL('../redesign/index.html', import.meta.url);
const html = await fs.readFile(page, 'utf8');
assert(!/<(?:style|map|area|iframe)\b/i.test(html), 'Unused captured markup or embedded CSS returned');
assert(!/\s(?:style|on\w+)=/i.test(html), 'Keep home presentation and behavior outside HTML attributes');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate home IDs');
assert.equal((html.match(/<main\b/g) || []).length, 1, 'One main landmark');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'One page heading');
for (const match of html.matchAll(/\baria-(?:controls|labelledby|describedby)="([^"]+)"/g)) {
  for (const id of match[1].split(/\s+/)) assert(ids.includes(id), `Missing ARIA target: ${id}`);
}
for (const tag of html.matchAll(/<(?:script|link|img)\b[^>]*>/g)) {
  const reference = tag[0].match(/\b(?:src|href)="([^"]+)"/)?.[1];
  if (!reference || /^(?:[a-z]+:|#|\/)/i.test(reference)) continue;
  const relative = reference.split(/[?#]/)[0];
  await fs.access(fileURLToPath(new URL(relative, page)));
  assert(!/originale\/(?:snapshot|.*\.css)/.test(relative), 'Home depends on captured-page initialization');
}
for (const runtime of ['redesign/home.css', 'redesign/home-ui.js', 'redesign/forecast-interactive.css', 'redesign/forecast-interactive.js', 'redesign/weather-map-base.js', 'redesign/primary-weather-map.js', 'redesign/primary-weather-map.css', 'redesign/world-weather-map.js']) {
  assert(ilmeteoRuntimeFiles.includes(runtime) && isIlmeteoRuntimePath(runtime), `Missing public runtime: ${runtime}`);
}
assert.equal(enhancePage(html, 'redesign', 'index'), html, 'Build creates duplicate version controls');
console.log('Home: semantic landmarks, unique IDs, ARIA targets, local resources, standalone runtime and repeat-build contract passed.');
