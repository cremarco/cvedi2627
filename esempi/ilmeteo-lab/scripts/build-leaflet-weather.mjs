import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {definitions,values,snow,marine,seas,snowCenters,radarFrames} from '../data/leaflet-weather.mjs';

const directory = new URL('../assets/maps/leaflet-weather/',import.meta.url);
const hash = value => createHash('sha256').update(value).digest('hex');
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const level = (kind,value) => kind==='1' ? value===0?0:value<=5?1:value<=15?2:value<=30?3:4 : value<10?0:value<15?1:value<20?2:value<25?3:4;

export async function buildLeafletWeather() {
  await fs.mkdir(directory,{recursive:true});
  const geographySource = await fs.readFile(new URL('../assets/maps/forecast-interactive/catalog.js',import.meta.url),'utf8');
  const base = JSON.parse(geographySource.slice(geographySource.indexOf('=')+1).trim().replace(/;$/,''));
  const theme = await fs.readFile(new URL('../redesign/style.source.css',import.meta.url),'utf8');
  const token = name => theme.match(new RegExp(`--meteo-${name}:\\s*([^;]+);`))[1].trim();
  const palette = {navy:token('navy'),orange:token('orange'),notice:token('notice'),paper:token('paper'),sea:token('search-hover'),country:token('tabs'),rule:token('search-rule')};
  const data = {kind:'Illustrative only; no observations or real forecasts',definitions,values,conditions:base.days[0].conditions,snow,marine,seas,snowCenters,radarFrames};
  const catalog = '/* Generated from local synthetic data by build-leaflet-weather.mjs. */\nwindow.ILMETEO_PRIMARY_WEATHER='+JSON.stringify(data)+';\n';
  await fs.writeFile(new URL('catalog.js',directory),catalog);
  const styles = `
    svg{--weather-cloud-fill:${palette.paper};color:${palette.navy}}
    .country{fill:${palette.country};stroke:${palette.rule};stroke-width:1}
    .region{fill:${palette.paper};stroke:${palette.navy};stroke-opacity:.65;stroke-width:1.4}
    .rain-0{fill:${palette.paper}}.rain-1{fill:color-mix(in srgb,${palette.navy} 12%,${palette.paper})}.rain-2{fill:color-mix(in srgb,${palette.navy} 28%,${palette.paper})}.rain-3{fill:color-mix(in srgb,${palette.navy} 52%,${palette.paper})}.rain-4{fill:color-mix(in srgb,${palette.navy} 80%,${palette.paper})}
    .temp-0{fill:color-mix(in srgb,${palette.navy} 62%,${palette.paper})}.temp-1{fill:color-mix(in srgb,${palette.navy} 28%,${palette.paper})}.temp-2{fill:color-mix(in srgb,${palette.orange} 12%,${palette.paper})}.temp-3{fill:color-mix(in srgb,${palette.orange} 48%,${palette.paper})}.temp-4{fill:${palette.orange}}
    .snow-1{fill:color-mix(in srgb,${palette.navy} 18%,${palette.paper})}.snow-2{fill:color-mix(in srgb,${palette.navy} 38%,${palette.paper})}.snow-3{fill:color-mix(in srgb,${palette.navy} 62%,${palette.paper})}
    .radar-1{fill:color-mix(in srgb,${palette.navy} 30%,${palette.paper});fill-opacity:.65}.radar-2{fill:${palette.orange};fill-opacity:.72}.radar-3{fill:${palette.notice};fill-opacity:.84}
    .marine{fill:${palette.navy};fill-opacity:.1;stroke:${palette.navy};stroke-opacity:.32;stroke-width:1}
    [data-weather-icon="sun"],[data-weather-icon="partly"]>path:not([data-cloud]){stroke:${palette.orange}}
    text{font-family:Arial,sans-serif;fill:${palette.navy};text-anchor:middle}
  `;
  const mercator = latitude => Math.log(Math.tan(Math.PI/4+latitude*Math.PI/360));
  const bounds = [6.4,35.8,19,47.7];
  const top = mercator(bounds[3]),bottom=mercator(bounds[1]);
  const scale = Math.min(1080/((bounds[2]-bounds[0])*Math.PI/180),690/(top-bottom));
  const project = ([longitude,latitude]) => [600+(longitude-(bounds[0]+bounds[2])/2)*Math.PI/180*scale,370+((top+bottom)/2-mercator(latitude))*scale];
  const geometryPath = geometry => {
    const polygons = geometry.type==='Polygon'?[geometry.coordinates]:geometry.coordinates;
    return polygons.map(polygon => polygon.map(ring => ring.map((coordinate,index) => {
      const [x,y]=project(coordinate);return `${index?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ')+'Z').join(' ')).join(' ');
  };
  const paths = (collection,classFor) => collection.features.map(feature => `<path class="${classFor(feature)}" d="${geometryPath(feature.geometry)}" fill-rule="evenodd"/>`).join('');
  const countries = paths(base.geography,()=>'country');
  const weatherIcons = {};
  for(const name of ['sun','cloud','rain','partly','snow','wind']) weatherIcons[name]=(await fs.readFile(new URL(`../assets/controls/weather-outline/${name}.svg`,import.meta.url),'utf8')).trim();
  const arrow = (await fs.readFile(new URL('../assets/controls/heroicons/arrow-right.svg',import.meta.url),'utf8')).trim();
  const glyph = (svg,coordinate,size=40,rotation=0) => {
    const [x,y]=project(coordinate);
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotation})">${svg.replace('<svg ',`<svg x="${-size/2}" y="${-size/2}" width="${size}" height="${size}" `)}</g>`;
  };
  const assets=[];
  for(const [kind,definition] of Object.entries(definitions)) {
    let body=countries+paths(base.regions,feature=>{
      const value=values[feature.properties.code-1];
      return 'region'+(kind==='1'?` rain-${level(kind,value.precipitation)}`:kind==='2'?` temp-${level(kind,value.temperature)}`:'');
    });
    if(kind==='0') body+=base.places.map(([,longitude,latitude],index)=>glyph(weatherIcons[data.conditions[index]],[longitude,latitude],44)).join('');
    if(kind==='1'||kind==='2') body+=base.places.map(([,longitude,latitude],index)=>{
      const value=kind==='1'?values[index].precipitation:values[index].temperature;
      const [x,y]=project([longitude,latitude]);const white=kind==='1'&&value>15||kind==='2'&&value<10;
      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" dy=".35em" font-size="23" font-weight="700"${white?` style="fill:${palette.paper}"`:''}>${value}${kind==='2'?'°':''}</text>`;
    }).join('');
    if(kind==='4') body+=paths(snow,feature=>`snow-${feature.properties.level}`);
    if(kind==='3') body+=paths(marine,()=>'marine')+base.places.map(([,longitude,latitude],index)=>glyph(arrow,[longitude,latitude],30,values[index].bearing-90)).join('')+seas.map(area=>glyph(weatherIcons.wind,area.center,36)).join('');
    const variants = kind==='9'?radarFrames.map((frame,index)=>({body:body+paths(frame.geography,feature=>`radar-${feature.properties.level}`),file:`radar-${index}`})):[{body,file:definition.file}];
    for(const variant of variants) {
      const legend=definition.legend.map((item,index)=>`<text x="${180+index*180}" y="742" font-size="17">${escape(item)}</text>`).join('');
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${escape(definition.name)}: esempio illustrativo"><style>${styles}</style><rect width="1200" height="800" fill="${palette.sea}"/>${variant.body}<text x="600" y="770" font-size="15">${escape(definition.name)} · ${escape(definition.unit)} · valori illustrativi</text>${legend}<text x="600" y="791" font-size="11">Cartografia: Natural Earth · ISTAT / geojson-italy (CC BY 4.0)</text></svg>\n`;
      await fs.writeFile(new URL(`${variant.file}.svg`,directory),svg);
      if(kind==='9'&&variant.file==='radar-2') await fs.writeFile(new URL('radar.svg',directory),svg);
      assets.push({file:`${variant.file}.svg`,sha256:hash(svg)});
    }
  }
  await fs.writeFile(new URL('manifest.json',directory),JSON.stringify({kind:data.kind,generator:'../../../scripts/build-leaflet-weather.mjs',data:'../../../data/leaflet-weather.mjs',basemap:'../forecast-interactive/manifest.json',theme:{source:'../../../redesign/style.source.css',palette},icons:{weather:'../../controls/weather-outline/manifest.json',controls:'../../controls/heroicons/manifest.json'},catalogSha256:hash(catalog),assets},null,2)+'\n');
}
