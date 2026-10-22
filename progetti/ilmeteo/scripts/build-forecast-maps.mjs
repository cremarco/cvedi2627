import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const directory = fileURLToPath(new URL('../assets/maps/forecast-v3/', import.meta.url));
const iconsDirectory = fileURLToPath(new URL('../assets/controls/weather-outline/', import.meta.url));
const hash = value => createHash('sha256').update(value).digest('hex');
const project = ([longitude, latitude]) => [(longitude - 5) * 62, 80 + (48 - latitude) * 83];
const places = [
  ['Torino', 7.69, 45.07], ['Milano', 9.19, 45.46],
  ['Bolzano', 11.35, 46.5], ['Venezia', 12.32, 45.44], ['Trieste', 13.78, 45.65],
  ['Genova', 8.94, 44.4], ['Bologna', 11.34, 44.49], ['Firenze', 11.25, 43.77],
  ['Ancona', 13.51, 43.62], ['Roma', 12.5, 41.9], ['Pescara', 14.21, 42.46],
  ['Napoli', 14.27, 40.85], ['Bari', 16.87, 41.12], ['Lecce', 18.17, 40.35],
  ['Cosenza', 16.25, 39.3], ['Reggio Calabria', 15.65, 38.11],
  ['Sassari', 8.56, 40.73], ['Cagliari', 9.12, 39.22],
  ['Palermo', 13.36, 38.12], ['Catania', 15.09, 37.5],
];
// Illustrative conditions, deliberately independent of the frozen forecasts.
// Positions and basemap are shared by all four dates.
const days = [
  { file: 'venerdi-9', date: '2026-10-09', conditions: ['rain','rain','cloud','rain','rain','rain','rain','rain','cloud','rain','cloud','rain','partly','partly','cloud','partly','partly','sun','partly','cloud'] },
  { file: 'sabato-10', date: '2026-10-10', conditions: ['partly','partly','cloud','rain','rain','partly','cloud','cloud','rain','cloud','rain','cloud','rain','rain','rain','cloud','sun','sun','partly','rain'] },
  { file: 'domenica-11', date: '2026-10-11', conditions: ['sun','sun','partly','partly','cloud','sun','partly','sun','rain','sun','rain','partly','rain','rain','rain','partly','sun','sun','sun','partly'] },
  { file: 'lunedi-12', date: '2026-10-12', conditions: ['rain','rain','cloud','partly','partly','rain','cloud','partly','cloud','partly','cloud','sun','partly','sun','sun','sun','sun','sun','sun','sun'] },
];

export async function buildForecastMaps() {
  // Images cannot inherit page variables: bake the same source theme tokens.
  const theme = await fs.readFile(new URL('../redesign/style.source.css', import.meta.url), 'utf8');
  const token = name => {
    const value = theme.match(new RegExp(`--meteo-${name}:\\s*([^;]+);`))?.[1].trim();
    if (!value) throw new Error(`Missing forecast theme token: ${name}`);
    return value;
  };
  const palette = {sea: token('search-hover'), land: token('paper'), country: token('tabs'), border: token('navy'), countryBorder: token('search-rule'), sun: token('orange')};
  const source = await fs.readFile(`${directory}sources/ne_50m_admin_0_countries.geojson`, 'utf8');
  const countries = JSON.parse(source).features;
  const paths = [];
  for (const country of countries) {
    const polygons = country.geometry.type === 'Polygon' ? [country.geometry.coordinates] : country.geometry.coordinates;
    for (const polygon of polygons) {
      const points = polygon[0];
      if (!points.some(([x,y]) => x >= 4 && x <= 25 && y >= 34 && y <= 49)) continue;
      const d = polygon.map(ring => ring.map((point, index) => {
        const [x,y] = project(point);
        return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ') + 'Z').join(' ');
      const italy = country.properties.ADMIN === 'Italy';
      paths.push(`<path d="${d}" fill="${italy ? palette.land : palette.country}" stroke="${italy ? palette.border : palette.countryBorder}" stroke-width="${italy ? 1.8 : 1}" fill-rule="evenodd"/>`);
    }
  }
  const glyphs = {};
  for (const name of ['sun','cloud','rain','partly']) {
    const svg = await fs.readFile(`${iconsDirectory}${name}.svg`, 'utf8');
    glyphs[name] = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
    if (name === 'partly') glyphs[name] = glyphs[name].replace('<path ', `<path stroke="${palette.sun}" `);
  }
  const icon = (name, x, y, size, color) => `<svg data-weather-icon="${name}" x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="--weather-cloud-fill:#fff">${glyphs[name]}</svg>`;
  const base = `<rect width="1200" height="1180" fill="${palette.sea}"/>${paths.join('')}`;
  const assets = [];
  for (const day of days) {
    const markers = places.map(([name, longitude, latitude], index) => {
      const [x,y] = project([longitude, latitude]);
      const condition = day.conditions[index];
      const glyph = icon(condition, -28,-28,56,condition === 'sun' ? palette.sun : palette.border);
      return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><title>${name}: ${condition}</title>${glyph}</g>`;
    }).join('');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1180" viewBox="0 0 1200 1180" role="img" aria-label="Mappa meteo illustrativa ${day.date}"><!-- Natural Earth public domain; Original weather outline SVG. Shared deterministic geography. -->${base}${markers}</svg>\n`;
    await fs.writeFile(`${directory}${day.file}.svg`, svg);
    assets.push({ file: `${day.file}.svg`, date: day.date, sha256: hash(svg), conditions: day.conditions });
  }
  await fs.writeFile(`${directory}manifest.json`, JSON.stringify({
    kind: 'Deterministic vector weather illustrations; not real forecasts',
    dimensions: [1200,1180], projection: 'Equirectangular at reference latitude 42 degrees',
    source: { url: 'https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson', local: 'sources/ne_50m_admin_0_countries.geojson', sha256: hash(source), license: 'Public domain', terms: 'https://www.naturalearthdata.com/about/terms-of-use/' },
    icons: { family: 'iLMeteo Weather Outline', manifest: '../../controls/weather-outline/manifest.json' },
    generator: '../../../scripts/build-forecast-maps.mjs', theme: {source: '../../../redesign/style.source.css', palette}, places, assets,
  }, null, 2) + '\n');
}
