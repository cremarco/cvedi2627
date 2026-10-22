import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export async function buildDynamicForecast() {
  const base=new URL('../assets/maps/forecast-v3/',import.meta.url);
  const destination=new URL('../assets/maps/forecast-interactive/',import.meta.url);
  await fs.mkdir(destination,{recursive:true});
  const original=JSON.parse(await fs.readFile(new URL('sources/ne_50m_admin_0_countries.geojson',base),'utf8'));
  const manifest=JSON.parse(await fs.readFile(new URL('manifest.json',base),'utf8'));
  const names=['Italy','France','Switzerland','Austria','Germany','Slovenia','Croatia','Bosnia and Herzegovina','Montenegro','Albania','Greece','Serbia','Hungary','Tunisia','Algeria','Malta','Libya','North Macedonia'];
  const geography={type:'FeatureCollection',features:original.features.filter(f=>names.includes(f.properties.ADMIN) && f.properties.ADMIN !== 'Italy').map(f=>({type:'Feature',properties:{name:f.properties.ADMIN},geometry:f.geometry}))};
  // One stable geographic anchor and one condition per Italian region.
  const regionalAnchors = {
    1:['Piemonte',7.85,45.10,0], 2:["Valle d’Aosta",7.35,45.73,0],
    3:['Lombardia',9.95,45.6,1], 4:['Trentino-Alto Adige',11.15,46.3,2],
    5:['Veneto',11.9,45.6,3], 6:['Friuli-Venezia Giulia',13.1,46.1,4],
    7:['Liguria',8.6,44.42,5], 8:['Emilia-Romagna',10.95,44.55,6],
    9:['Toscana',11.1,43.35,7], 10:['Umbria',12.5,42.95,7],
    11:['Marche',13.2,43.25,8], 12:['Lazio',12.8,41.9,9],
    13:['Abruzzo',13.85,42.15,10], 14:['Molise',14.65,41.65,10],
    15:['Campania',14.85,40.95,11], 16:['Puglia',16.65,40.9,12],
    17:['Basilicata',16.0,40.45,11], 18:['Calabria',16.4,39.15,14],
    19:['Sicilia',14.0,37.55,18], 20:['Sardegna',9.05,40.1,16],
  };
  const regionSource = await fs.readFile(new URL('sources/regions.geojson',destination),'utf8');
  const regionFeatures = JSON.parse(regionSource).features;
  // Simplify the local rendering data, preserving the full licensed source.
  function simplify(ring) {
   const keep = new Set([0, ring.length-1]); const stack=[[0,ring.length-1]];
   while(stack.length) {
    const [a,b]=stack.pop(); const [x,y]=ring[a]; const dx=ring[b][0]-x,dy=ring[b][1]-y;
    let far=-1, distance=.004**2;
    for(let i=a+1;i<b;i++) {
     const t=Math.max(0,Math.min(1,((ring[i][0]-x)*dx+(ring[i][1]-y)*dy)/(dx*dx+dy*dy||1)));
     const d=(ring[i][0]-x-t*dx)**2+(ring[i][1]-y-t*dy)**2;
     if(d>distance) {far=i;distance=d;}
    }
    if(far>=0) {keep.add(far);stack.push([a,far],[far,b]);}
   }
   const result=[...keep].sort((a,b)=>a-b).map(i=>ring[i].map(v=>Math.round(v*10000)/10000));
   return result.length>=4?result:ring;
  }
  const regions={type:'FeatureCollection',features:regionFeatures.map(f=> {
   const code=f.properties.reg_istat_code_num;
   return {type:'Feature',properties:{code,name:regionalAnchors[code][0]},geometry:{type:f.geometry.type,coordinates:f.geometry.type==='Polygon'?f.geometry.coordinates.map(simplify):f.geometry.coordinates.map(polygon=>polygon.map(simplify))}};
  }).sort((a,b)=>a.properties.code-b.properties.code)};
  const places=Object.values(regionalAnchors).map(([name,longitude,latitude])=>[name,longitude,latitude]);
  const days=manifest.assets.map(({date,conditions})=>({date,conditions:Object.values(regionalAnchors).map(anchor=>conditions[anchor[3]])}));
  const icons={};
  for (const name of ['sun','cloud','rain','partly']) {
   const svg=(await fs.readFile(new URL(`../assets/controls/weather-outline/${name}.svg`,import.meta.url),'utf8')).trim();
   icons[name]=svg;
  }
  const data={geography,regions,places,days,icons};
  await fs.writeFile(new URL('catalog.js',destination),'/* Generated locally by build-dynamic-forecast.mjs. Natural Earth public domain; Original weather outline SVG. */\nwindow.ILMETEO_FORECAST_INTERACTIVE='+JSON.stringify(data)+';\n');
  const hashes={};for(const name of ['sun','cloud','rain','partly']) hashes[name]=createHash('sha256').update(icons[name]).digest('hex');
  await fs.writeFile(new URL('manifest.json',destination),JSON.stringify({library:{name:'Leaflet',version:'1.9.4',license:'BSD-2-Clause',url:'https://leafletjs.com/'},geography:manifest.source,regions:{source:'https://github.com/guglielmo/geojson-italy',original:'sources/regions.geojson',sha256:createHash('sha256').update(regionSource).digest('hex'),license:'CC-BY-4.0',attribution:'ISTAT / geojson-italy',simplificationDegrees:.004},icons:{family:'iLMeteo Weather Outline',components:['sun','cloud','rain','partly'],originals:'../../controls/weather-outline/',sha256:hashes},conditions:'Illustrative only, no live weather data',generator:'../../../scripts/build-dynamic-forecast.mjs'},null,2)+'\n');

  // Scope vendor rules so the archived radar controls are unaffected.
  const vendor = new URL('../assets/vendor/leaflet/', import.meta.url);
  const leafletCSS = (await fs.readFile(new URL('leaflet.css', vendor), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  const scoped = leafletCSS.replace(/([^{}]+)\{/g, (match, prelude) => {
    if (prelude.trim().startsWith('@')) return match;
    const selectors = prelude.trim().split(',').map(selector => {
      const root = selector.match(/^\s*\.leaflet-(container|touch|retina|safari|fade-anim|zoom-anim|dragging)(?=$|[ .:#>])/);
      return root ? selector.replace(root[0], '.forecast-interactive' + (root[1] === 'container' ? '' : `.leaflet-${root[1]}`)) : `.forecast-interactive ${selector.trim()}`;
    });
    return '\n' + selectors.join(',\n') + ' {';
  });
  await fs.writeFile(new URL('leaflet-scoped.css', vendor), '/* Generated scoped Leaflet 1.9.4 styles; BSD-2-Clause. Original preserved in leaflet.css. */\n' + scoped);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildDynamicForecast();
