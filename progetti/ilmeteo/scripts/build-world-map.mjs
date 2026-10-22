import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const tolerance = 0.06;
const precision = 5;
const dimensions = [1200, 600];
const round = value => Number(value.toFixed(precision));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const polygons = geometry => geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
const samePoint = (a, b) => a[0] === b[0] && a[1] === b[1];
const signedArea = ring => ring.slice(1).reduce((sum, point, i) => sum + ring[i][0] * point[1] - point[0] * ring[i][1], 0) / 2;

function ringBounds(ring) {
  return ring.reduce(([west, south, east, north], [longitude, latitude]) => [
    Math.min(west, longitude), Math.min(south, latitude),
    Math.max(east, longitude), Math.max(north, latitude),
  ], [Infinity, Infinity, -Infinity, -Infinity]);
}

function roundedRing(ring) {
  const points = ring.map(point => point.map(round)).filter((point, i, all) => !i || !samePoint(point, all[i - 1]));
  if (!samePoint(points[0], points.at(-1))) points.push([...points[0]]);
  return points;
}

function simplifyArc(points) {
  const keep = new Set([0, points.length - 1]);
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop();
    const [x, y] = points[start];
    const dx = points[end][0] - x;
    const dy = points[end][1] - y;
    const lengthSquared = dx * dx + dy * dy;
    let furthest = -1;
    let maxDistance = tolerance * tolerance;
    for (let i = start + 1; i < end; i++) {
      const t = Math.max(0, Math.min(1, ((points[i][0] - x) * dx + (points[i][1] - y) * dy) / (lengthSquared || 1)));
      const distance = (points[i][0] - x - t * dx) ** 2 + (points[i][1] - y - t * dy) ** 2;
      if (distance > maxDistance) {
        furthest = i;
        maxDistance = distance;
      }
    }
    if (furthest >= 0) {
      keep.add(furthest);
      stack.push([start, furthest], [furthest, end]);
    }
  }
  return [...keep].sort((a, b) => a - b).map(i => points[i]);
}

function selfIntersects(ring) {
  const orientation = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const segments = ring.length - 1;
  for (let i = 0; i < segments; i++) {
    for (let j = i + 2; j < segments; j++) {
      if (i === 0 && j === segments - 1) continue;
      const [a, b, c, d] = [ring[i], ring[i + 1], ring[j], ring[j + 1]];
      if (Math.max(a[0], b[0]) < Math.min(c[0], d[0]) || Math.max(c[0], d[0]) < Math.min(a[0], b[0])
        || Math.max(a[1], b[1]) < Math.min(c[1], d[1]) || Math.max(c[1], d[1]) < Math.min(a[1], b[1])) continue;
      if (orientation(a, b, c) * orientation(a, b, d) < -1e-12 && orientation(c, d, a) * orientation(c, d, b) < -1e-12) return true;
    }
  }
  return false;
}

function simplifyRing(ring) {
  const original = roundedRing(ring);
  const [west, south, east, north] = ringBounds(original);
  // Keep small islands and holes intact; they must never collapse into points.
  if (original.length <= 5 || Math.hypot(east - west, north - south) <= tolerance * 4) return original;
  let split = 1;
  let maxDistance = 0;
  for (let i = 1; i < original.length - 1; i++) {
    const distance = (original[i][0] - original[0][0]) ** 2 + (original[i][1] - original[0][1]) ** 2;
    if (distance > maxDistance) {
      split = i;
      maxDistance = distance;
    }
  }
  // A closed ring needs two open arcs for Douglas–Peucker, rather than equal endpoints.
  const simplified = [...simplifyArc(original.slice(0, split + 1)).slice(0, -1), ...simplifyArc(original.slice(split))];
  const originalArea = signedArea(original);
  const simplifiedArea = signedArea(simplified);
  const distinct = new Set(simplified.slice(0, -1).map(point => point.join(','))).size;
  return distinct >= 3 && Math.sign(simplifiedArea) === Math.sign(originalArea) && Math.abs(simplifiedArea) >= Math.abs(originalArea) * 0.5 && !selfIntersects(simplified)
    ? simplified : original;
}

function featureId(properties, used) {
  const candidates = [properties.ADM0_A3, properties.ISO_A3_EH, properties.ISO_A3, properties.GU_A3];
  const primary = candidates.find(value => typeof value === 'string' && /^[A-Z0-9]{3}$/.test(value) && !used.has(value));
  const id = primary || `NE_${properties.NE_ID}`;
  if (used.has(id)) throw new Error(`Duplicate country identifier: ${id}`);
  used.add(id);
  return id;
}

function countryMetadata(feature, id) {
  const properties = feature.properties;
  const name = properties.NAME_IT || properties.NAME_EN || properties.NAME || properties.ADMIN;
  const aliases = [...new Set([
    properties.NAME_EN, properties.NAME, properties.NAME_LONG, properties.ADMIN,
    properties.ISO_A2, properties.ISO_A2_EH, properties.ISO_A3, properties.ISO_A3_EH,
    id,
  ].filter(value => typeof value === 'string' && value.trim() && value !== '-99' && value !== name))];
  const reference = Number(properties.LABEL_X);
  const mainRing = polygons(feature.geometry).map(polygon => polygon[0]).sort((a, b) => Math.abs(signedArea(b)) - Math.abs(signedArea(a)))[0];
  // Bounds affect navigation only. The complete geography keeps its original dateline splits.
  // Antarctica is a circumpolar landmass, so its true 360-degree extent is intentional.
  const normalized = id === 'ATA' ? mainRing : mainRing.map(([longitude, latitude]) => [longitude + 360 * Math.round((reference - longitude) / 360), latitude]);
  const [west, south, east, north] = ringBounds(normalized).map(round);
  const latitude = Number(properties.LABEL_Y);
  const center = Number.isFinite(latitude) && Number.isFinite(reference)
    ? [round(latitude), round(reference)] : [round((south + north) / 2), round((west + east) / 2)];
  return { id, name, aliases, focusBounds: [[south, west], [north, east]], center };
}

function validateGeography(geography, expectedFeatures) {
  if (geography.features.length !== expectedFeatures) throw new Error('World catalog lost geographic features');
  let rings = 0;
  let coordinates = 0;
  for (const feature of geography.features) {
    if (!['Polygon', 'MultiPolygon'].includes(feature.geometry.type)) throw new Error(`Unsupported geometry for ${feature.properties.id}`);
    for (const polygon of polygons(feature.geometry)) {
      for (const ring of polygon) {
        rings++;
        coordinates += ring.length;
        const distinct = new Set(ring.slice(0, -1).map(point => point.join(','))).size;
        if (distinct < 3 || !samePoint(ring[0], ring.at(-1)) || !signedArea(ring)) throw new Error(`Degenerate ring for ${feature.properties.id}`);
        if (ring.some(([longitude, latitude]) => !Number.isFinite(longitude) || !Number.isFinite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90)) {
          throw new Error(`Invalid coordinates for ${feature.properties.id}`);
        }
      }
    }
  }
  return { features: geography.features.length, rings, coordinates };
}

function token(css, name) {
  const value = css.match(new RegExp(`--meteo-${name}:\\s*([^;]+);`))?.[1]?.trim();
  if (!value) throw new Error(`Missing world map color token: ${name}`);
  return value;
}

function xml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]);
}

function worldSVG(geography, palette) {
  const [width, height] = dimensions;
  const point = ([longitude, latitude]) => [round((longitude + 180) * width / 360), round((90 - latitude) * height / 180)];
  const paths = geography.features.map(feature => {
    const d = polygons(feature.geometry).flatMap(polygon => polygon.map(ring => ring.map((coordinate, i) => `${i ? 'L' : 'M'}${point(coordinate).join(' ')}`).join('') + 'Z')).join('');
    return `    <path data-country="${xml(feature.properties.id)}" d="${d}"><title>${xml(feature.properties.name)}</title></path>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="world-title world-desc">
  <title id="world-title">Carta geografica del mondo</title>
  <desc id="world-desc">Paesi, isole e Antartide dalla cartografia Natural Earth 1:50m di pubblico dominio. Proiezione equirettangolare. Fonte: Natural Earth.</desc>
  <metadata>Natural Earth · Public domain · https://www.naturalearthdata.com/about/terms-of-use/</metadata>
  <rect width="${width}" height="${height}" fill="${xml(palette.sea)}"/>
  <g fill="${xml(palette.land)}" stroke="${xml(palette.border)}" stroke-width="0.45" stroke-linejoin="round" fill-rule="evenodd">
${paths}
  </g>
  <text x="${width - 12}" y="18" text-anchor="end" font-family="Arial,sans-serif" font-size="12" fill="${xml(palette.border)}">Natural Earth</text>
</svg>
`;
}

export async function buildWorldMap() {
  const sourceBase = new URL('../assets/maps/forecast-v3/', import.meta.url);
  const destination = new URL('../assets/maps/world/', import.meta.url);
  const [sourceText, sourceManifestText, css] = await Promise.all([
    fs.readFile(new URL('sources/ne_50m_admin_0_countries.geojson', sourceBase), 'utf8'),
    fs.readFile(new URL('manifest.json', sourceBase), 'utf8'),
    fs.readFile(new URL('../redesign/style.source.css', import.meta.url), 'utf8'),
  ]);
  const original = JSON.parse(sourceText);
  const sourceManifest = JSON.parse(sourceManifestText);
  const sourceHash = sha256(sourceText);
  if (sourceHash !== sourceManifest.source.sha256) throw new Error('Natural Earth source does not match the preserved manifest');
  const used = new Set();
  const countries = [];
  const geography = { type: 'FeatureCollection', features: original.features.map(feature => {
    const id = featureId(feature.properties, used);
    const country = countryMetadata(feature, id);
    countries.push(country);
    const coordinates = feature.geometry.type === 'Polygon'
      ? feature.geometry.coordinates.map(simplifyRing)
      : feature.geometry.coordinates.map(polygon => polygon.map(simplifyRing));
    return { type: 'Feature', properties: { id, name: country.name, aliases: country.aliases }, geometry: { type: feature.geometry.type, coordinates } };
  }) };
  const collator = new Intl.Collator('it');
  countries.sort((a, b) => collator.compare(a.name, b.name) || a.id.localeCompare(b.id));
  const sourceStats = validateGeography(original, original.features.length);
  const stats = validateGeography(geography, original.features.length);
  if (stats.rings !== sourceStats.rings) throw new Error('World catalog lost polygon rings');
  const data = { geography, countries, attribution: 'Natural Earth' };
  const catalog = '/* Generated locally by build-world-map.mjs. Natural Earth 1:50m; public domain. */\nwindow.ILMETEO_WORLD_MAP=' + JSON.stringify(data) + ';\n';
  const palette = { sea: token(css, 'search-hover'), land: token(css, 'paper'), border: token(css, 'navy') };
  const svg = worldSVG(geography, palette);
  const manifest = {
    kind: 'Local world geography and country navigation; no weather data',
    attribution: 'Natural Earth',
    source: { ...sourceManifest.source, local: '../forecast-v3/sources/ne_50m_admin_0_countries.geojson', licenseFile: '../forecast-v3/sources/LICENSE.txt', sha256: sourceHash },
    generator: '../../../scripts/build-world-map.mjs',
    simplification: { method: 'Douglas–Peucker on two open arcs per closed ring', toleranceDegrees: tolerance, coordinateDecimals: precision, smallRingPreservationDegrees: tolerance * 4, minimumAreaFraction: 0.5, selfIntersectionProtection: 'Retain rounded original ring if simplification introduces a proper self-intersection', preservesAllFeaturesAndRings: true },
    focusBounds: 'Largest polygon exterior from the original source, normalized around LABEL_X; Antarctica retains its circumpolar extent. Navigation bounds do not remove other territories from the geography.',
    names: 'NAME_IT preferred; Natural Earth ADM0_A3 identifiers; Italian locale order',
    stats: { source: sourceStats, generated: stats },
    fallback: { file: 'world.svg', dimensions, projection: 'Equirectangular longitude/latitude, complete world including Antarctica' },
    theme: { source: '../../../redesign/style.source.css', palette },
    assets: [
      { file: 'catalog.js', bytes: Buffer.byteLength(catalog), sha256: sha256(catalog) },
      { file: 'world.svg', bytes: Buffer.byteLength(svg), sha256: sha256(svg) },
    ],
  };
  await fs.mkdir(destination, { recursive: true });
  await fs.writeFile(new URL('catalog.js', destination), catalog);
  await fs.writeFile(new URL('world.svg', destination), svg);
  await fs.writeFile(new URL('manifest.json', destination), JSON.stringify(manifest, null, 2) + '\n');
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = await buildWorldMap();
  console.log(`World map: ${manifest.stats.generated.features} features, ${manifest.stats.generated.rings} rings, ${manifest.stats.generated.coordinates} coordinates.`);
}
