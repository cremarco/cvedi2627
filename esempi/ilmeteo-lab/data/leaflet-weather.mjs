/* Explicitly synthetic teaching data. No observations or real forecasts. */
export const definitions = {
  '0': {name:'Tempo', file:'tempo', unit:'', legend:[]},
  '1': {name:'Precipitazioni', file:'precipitazioni', unit:'mm', legend:['0','1–5','6–15','16–30','>30']},
  '4': {name:'Neve', file:'neve', unit:'cm alle quote alte', legend:['0','1–5','6–10','11–20']},
  '2': {name:'Temperature', file:'temperature', unit:'°C', legend:['<10','10–14','15–19','20–24','≥25']},
  '3': {name:'Venti-Mari', file:'venti-mari', unit:'km/h · m', legend:[]},
  '9': {name:'Radar', file:'radar', unit:'intensità', legend:['Debole','Moderata','Intensa']},
};
// ISTAT region order, matching the twenty anchors in the daily map.
export const values = [
  [24,8,13,26,45], [18,18,8,18,60], [32,12,14,22,45], [12,20,7,16,90],
  [28,0,15,24,65], [36,14,12,28,90], [22,0,18,34,45], [26,0,16,30,45],
  [16,0,19,32,50], [20,0,15,24,40], [9,0,18,28,55], [14,0,21,30,45],
  [8,6,13,20,75], [10,0,16,22,70], [12,0,22,26,45], [2,0,24,30,55],
  [11,0,19,24,60], [4,0,23,28,45], [0,0,26,22,55], [1,0,25,36,60],
].map(([precipitation,snow,temperature,wind,bearing],index) => ({code:index+1,precipitation,snow,temperature,wind,bearing}));

export const snowCenters = [
  {name:'Alpi occidentali', center:[7.1,45.7], radii:[.72,.22], code:2, amount:18},
  {name:'Alpi piemontesi', center:[7.05,44.8], radii:[.34,.38], code:1, amount:8},
  {name:'Alpi lombarde', center:[9.9,46.35], radii:[.7,.18], code:3, amount:12},
  {name:'Dolomiti', center:[11.7,46.45], radii:[.74,.24], code:4, amount:20},
  {name:'Alpi orientali', center:[13.0,46.45], radii:[.5,.17], code:6, amount:14},
  {name:'Appennino abruzzese', center:[13.6,42.45], radii:[.22,.3], code:13, amount:6},
];
export const seas = [
  {name:'Mar Ligure',center:[8.75,43.15],radii:[1.0,.43],height:1.8},
  {name:'Mar Tirreno',center:[11.55,40.35],radii:[1.1,1.2],height:1.4},
  {name:'Mar Adriatico',center:[15.6,42.65],radii:[.55,1.0],height:1.2},
  {name:'Mar Ionio',center:[17.65,38.4],radii:[.8,.85],height:1.0},
  {name:'Canale di Sicilia',center:[12.8,36.35],radii:[1.1,.32],height:.8},
];
export const frameTimes = ['17:20','18:20','19:20','20:20','21:20','22:20','23:20'];

function patch(center, radii, seed, properties) {
  const ring = Array.from({length:40},(_,index) => {
    const angle = index * 2 * Math.PI / 40;
    const wobble = 1 + .13*Math.sin(angle*3+seed) + .08*Math.cos(angle*5-seed);
    return [center[0]+Math.cos(angle)*radii[0]*wobble,center[1]+Math.sin(angle)*radii[1]*wobble].map(value => +value.toFixed(4));
  });
  ring.push(ring[0]);
  return {type:'Feature',properties,geometry:{type:'Polygon',coordinates:[ring]}};
}
export const snow = {type:'FeatureCollection',features:snowCenters.map((area,index) => patch(area.center,area.radii,index,{...area,level:area.amount>10?3:area.amount>5?2:1}))};
export const marine = {type:'FeatureCollection',features:seas.map((area,index) => patch(area.center,area.radii,index,{...area,level:area.height>1.5?2:1}))};
export const radarFrames = frameTimes.map((time,frame) => {
  const features = [];
  // A reproducible rain band moves east/south-east, with nested intensity contours.
  for (let cell=0;cell<22;cell++) {
    const t=cell/21;
    const center=[7.7+8.4*t+.34*frame+.3*Math.sin(cell*1.7),46.1-6.3*t-.27*frame+.22*Math.cos(cell*1.2)];
    const intensity=1+((cell*7+3)%3);
    for(let level=1;level<=intensity;level++) {
      const scale=1-(level-1)*.29;
      features.push(patch(center,[(.45+.12*Math.sin(cell))*scale,(.36+.09*Math.cos(cell))*scale],cell+frame*.35,{level}));
    }
  }
  features.sort((a,b)=>a.properties.level-b.properties.level);
  return {time,date:'2026-10-08',phase:frame<2?'passato':frame===2?'ora':'previsione',geography:{type:'FeatureCollection',features}};
});
