/* Six illustrative, geographic layers on the shared local Leaflet basemap. */
(() => {
  const surface = document.querySelector('.map-surface');
  const viewport = surface?.querySelector('#map');
  const data = window.ILMETEO_PRIMARY_WEATHER;
  const base = window.ILMETEO_WEATHER_BASE;
  const geography = window.ILMETEO_FORECAST_INTERACTIVE;
  if (!viewport || !data || !base) return;
  const panel = surface.querySelector('#bigmap-container');
  const fallback = surface.querySelector('.weather-map-fallback');
  viewport.classList.add('forecast-interactive','primary-weather-map');
  viewport.setAttribute('role','region');
  panel.setAttribute('role','tabpanel');
  const {map,regions,reduced} = base.create(viewport,showRegion);
  const regionLayers = regions.getLayers();
  const weatherIcons = window.ILMETEO_WEATHER_ICONS;
  const icons = window.ILMETEO_HEROICONS;
  let kind;
  let selectedRegion;
  const nowIndex = data.radarFrames.findIndex(frame => frame.phase === 'ora');
  const lastFrameIndex = data.radarFrames.length - 1;
  let frameIndex = nowIndex;
  let timer = null;
  let overview = true;
  let fitting = false;
  let size = '';
  let inView = false;
  map.createPane('weatherWaterPane').style.zIndex = 350;
  map.createPane('weatherDataPane').style.zIndex = 450;
  for(const name of ['weatherWaterPane','weatherDataPane']) map.getPane(name).style.pointerEvents = 'none';
  const intensityLayer = (features,className,pane='weatherDataPane') => L.geoJSON(features,{
    pane, interactive:false,
    style:feature=>({className:`${className} weather-level-${feature.properties.level}`,stroke:false,fillOpacity:1}),
  });
  function symbol(svg,coordinate,className='forecast-weather-marker',bearing=0) {
    const inner = document.createElement('span');
    inner.className='weather-symbol';
    inner.innerHTML=svg;
    if(bearing) inner.style.setProperty('--weather-bearing',`${bearing}deg`);
    return L.marker([coordinate[1],coordinate[0]],{
      interactive:false,keyboard:false,
      icon:L.divIcon({html:inner,className,iconSize:[40,40],iconAnchor:[20,20]}),
    });
  }
  const weather = L.layerGroup(geography.places.map(([,longitude,latitude],index)=>symbol(weatherIcons[data.conditions[index]],[longitude,latitude])));
  const snow = intensityLayer(data.snow,'weather-snow-patch');
  const wind = L.layerGroup([
    intensityLayer(data.marine,'weather-marine-patch','weatherWaterPane'),
    ...geography.places.map(([,longitude,latitude],index)=>symbol(icons['arrow-right'],[longitude,latitude],'weather-wind-marker',data.values[index].bearing-90)),
    ...data.seas.map(area=>{
      const node=document.createElement('span');node.className='weather-sea-symbol';
      node.innerHTML=weatherIcons.wind;
      const value=document.createElement('span');value.textContent=`${area.height.toLocaleString('it-IT')} m`;node.append(value);
      const marker=L.marker([area.center[1],area.center[0]],{keyboard:true,riseOnHover:true,
        icon:L.divIcon({html:node,className:'weather-sea-marker',iconSize:[52,40],iconAnchor:[26,20]})});
      marker.bindPopup(()=>popupContent(area.name,`Altezza illustrativa delle onde: ${value.textContent}.`),{closeButton:false});
      marker.on('add',()=>{
        const element=marker.getElement();element.setAttribute('aria-label',`${area.name}: onde ${value.textContent}, valore illustrativo`);
        element.addEventListener('keydown',event=>{if(event.key===' '){event.preventDefault();event.stopPropagation();marker.openPopup();}});
      });
      return marker;
    }),
  ]);
  const numbers = L.layerGroup(geography.places.map(([,longitude,latitude],index)=>{
    const node=document.createElement('span');node.className='weather-number';
    const marker=L.marker([latitude,longitude],{interactive:false,keyboard:false,
      icon:L.divIcon({html:node,className:'weather-value-marker',iconSize:[30,24],iconAnchor:[15,12]})});
    marker.valueElement=node;marker.valueIndex=index;return marker;
  }));
  const radarFrames=data.radarFrames.map(frame=>intensityLayer(frame.geography,'weather-radar-patch'));
  const layers={'0':weather,'1':numbers,'4':snow,'2':numbers,'3':wind};
  const playbackHost=document.createElement('div');playbackHost.className='map-playback';
  const timeline=document.createElement('div');timeline.className='radar-player__timeline';
  const nowRatio=nowIndex/(data.radarFrames.length-1);
  timeline.style.setProperty('--radar-now-position',`calc(${nowRatio*100}% + ${10-20*nowRatio}px)`);
  const phases=document.createElement('div');phases.className='radar-player__phases';
  for(const [phase,text] of [['passato','Ore passate'],['ora','Ora'],['previsione','Ore previste']]) {
    const label=document.createElement('span');label.dataset.phase=phase;label.textContent=text;phases.append(label);
  }
  const scale=document.createElement('div');scale.className='radar-player__scale';
  const scrubber=document.createElement('input');scrubber.type='range';scrubber.className='lab-range radar-player__scrubber';
  scrubber.min='0';scrubber.max=String(data.radarFrames.length-1);scrubber.step='1';
  scrubber.setAttribute('aria-label','Orario del fotogramma radar illustrativo');
  const times=document.createElement('div');times.className='radar-player__times';times.setAttribute('aria-hidden','true');
  const timeLabels=data.radarFrames.map(frame=>{
    const label=document.createElement('span');label.dataset.phase=frame.phase;label.textContent=frame.time;times.append(label);return label;
  });
  scale.append(scrubber);timeline.append(phases,scale,times);
  const toggle=document.createElement('button');toggle.type='button';toggle.className='lab-btn radar-player__toggle';
  playbackHost.append(timeline,toggle);surface.append(playbackHost);
  function setAction(name,label,accessible) {
    toggle.innerHTML=icons[name];
    const text=document.createElement('span');text.className='radar-player__action';text.textContent=label;toggle.append(text);
    toggle.setAttribute('aria-label',accessible);
  }
  function stopPlayback() {
    clearInterval(timer);timer=null;toggle.removeAttribute('data-playing');
    setAction(reduced.matches?'forward':'play',reduced.matches?'Avanza':'Riproduci',reduced.matches?'Avanza al fotogramma successivo':'Riproduci animazione radar illustrativa');
  }
  function syncMapName() {
    const date=kind==='9'?` Fotogramma dell’8 ottobre 2026, ore ${data.radarFrames[frameIndex].time}.`:'';
    viewport.setAttribute('aria-label',`Mappa illustrativa: ${data.definitions[kind].name}.${date} Non mostra dati meteorologici reali. Usa più e meno per lo zoom e le frecce per spostarti.`);
    fallback.alt=`${data.definitions[kind].name}: mappa illustrativa, senza dati meteorologici reali.`;
    fallback.src=`../assets/maps/leaflet-weather/${kind==='9'?`radar-${frameIndex}`:data.definitions[kind].file}.svg`;
  }
  function renderFrame(index) {
    if(map.hasLayer(radarFrames[frameIndex])) map.removeLayer(radarFrames[frameIndex]);
    frameIndex=index;
    if(kind==='9') radarFrames[index].addTo(map);
    scrubber.value=String(index);
    const phaseName={passato:'ora passata',ora:'ora di riferimento',previsione:'ora prevista'}[data.radarFrames[index].phase];
    scrubber.setAttribute('aria-valuetext',`${data.radarFrames[index].time}, ${phaseName}, 8 ottobre 2026, fotogramma illustrativo`);
    timeLabels.forEach((label,position)=>label.toggleAttribute('data-current',position===index));
    viewport.dataset.radarFrame=String(index);syncMapName();updateRegions();
  }
  scrubber.addEventListener('input',()=>{stopPlayback();map.closePopup();renderFrame(Number(scrubber.value));});
  toggle.addEventListener('click',()=>{
    if(reduced.matches) {renderFrame(frameIndex===lastFrameIndex?nowIndex:frameIndex+1);return;}
    if(timer!==null) {stopPlayback();return;}
    if(frameIndex===lastFrameIndex) renderFrame(nowIndex);
    toggle.dataset.playing='true';setAction('pause','Pausa','Metti in pausa l’animazione radar illustrativa');
    timer=setInterval(()=>{
      if(frameIndex===lastFrameIndex) stopPlayback();
      else renderFrame(frameIndex+1);
    },1100);
  });
  const legendControl=L.Control.extend({
    options:{position:'bottomleft'},
    onAdd(){const node=L.DomUtil.create('div','weather-map-legend');L.DomEvent.disableClickPropagation(node);return node;},
  });
  const legend=new legendControl();legend.addTo(map);
  function updateLegend() {
    const node=legend.getContainer(),definition=data.definitions[kind];node.replaceChildren();
    const heading=document.createElement('span');heading.className='weather-map-legend__title';
    heading.textContent=definition.unit?`${definition.name} · ${definition.unit}`:'Condizioni illustrative';
    node.append(heading);
    if(definition.legend.length) {
      const list=document.createElement('ol');list.className='weather-map-legend__scale';
      definition.legend.forEach((label,index)=>{
        const item=document.createElement('li');const swatch=document.createElement('span');
        swatch.className='weather-map-swatch';swatch.dataset.level=String(index);swatch.setAttribute('aria-hidden','true');
        const text=document.createElement('span');text.textContent=label;item.append(swatch,text);list.append(item);
      });node.append(list);
    }
    node.setAttribute('aria-label',`${definition.name}: legenda di valori illustrativi`);
  }
  function precipitationLevel(value) {return value===0?0:value<=5?1:value<=15?2:value<=30?3:4;}
  function temperatureLevel(value) {return value<10?0:value<15?1:value<20?2:value<25?3:4;}
  function description(index) {
    const value=data.values[index];
    if(kind==='0') return {sun:'Sereno',cloud:'Nuvoloso',rain:'Pioggia',partly:'Parzialmente nuvoloso'}[data.conditions[index]];
    if(kind==='1') return `Precipitazioni: ${value.precipitation} mm`;
    if(kind==='2') return `Temperatura: ${value.temperature} °C`;
    if(kind==='4') return `Neve alle quote alte: ${value.snow} cm`;
    if(kind==='3') return `Vento: ${value.wind} km/h, direzione verso ${value.bearing<67?'nord-est':'est'}`;
    return `Echi radar alle ${data.radarFrames[frameIndex].time}`;
  }
  function popupContent(name,description) {
    const node=document.createElement('div'),heading=document.createElement('strong'),text=document.createElement('p');
    heading.textContent=name;text.textContent=`${description} Valori illustrativi, senza dati meteorologici reali.`;
    node.append(heading,text);return node;
  }
  function clearSelection() {selectedRegion?.getElement()?.classList.remove('is-selected');selectedRegion=undefined;}
  map.on('popupclose',clearSelection);
  function showRegion(code,layer) {
    if(kind==='9') stopPlayback();
    const [name,longitude,latitude]=geography.places[code-1];
    const popup=L.popup({closeButton:false}).setLatLng([latitude,longitude]).setContent(popupContent(name,description(code-1)+'.'));
    popup.openOn(map);clearSelection();selectedRegion=layer;layer.getElement().classList.add('is-selected');
  }
  function updateRegions() {
    regionLayers.forEach(layer=>{
      const index=layer.feature.properties.code-1,value=data.values[index],element=layer.getElement();
      element.dataset.level=String(kind==='1'?precipitationLevel(value.precipitation):kind==='2'?temperatureLevel(value.temperature):0);
      element.setAttribute('aria-label',`${layer.feature.properties.name}: ${description(index)}. Valori illustrativi.`);
    });
    numbers.eachLayer(marker=>{
      const value=data.values[marker.valueIndex];
      marker.valueElement.textContent=kind==='2'?`${value.temperature}°`:String(value.precipitation);
      marker.valueElement.dataset.light=String(kind==='1'?value.precipitation>30:value.temperature<10);
    });
  }
  function selectKind(next) {
    if(kind===next||!data.definitions[next]) return;
    stopPlayback();map.closePopup();
    if(layers[kind]&&map.hasLayer(layers[kind])) map.removeLayer(layers[kind]);
    if(map.hasLayer(radarFrames[frameIndex])) map.removeLayer(radarFrames[frameIndex]);
    kind=next;viewport.dataset.weatherLayer=kind;playbackHost.hidden=kind!=='9';
    panel.setAttribute('aria-labelledby',`map-layer-tab-${kind}`);
    if(kind==='9') renderFrame(frameIndex);
    else {layers[kind].addTo(map);syncMapName();}
    updateRegions();updateLegend();syncLabels();syncMotion();requestAnimationFrame(updateSafeInset);
  }
  surface.addEventListener('map-layer-change',event=>selectKind(event.detail));
  const buttons=[];
  const controls=L.Control.extend({options:{position:'topleft'},onAdd(){
    const node=L.DomUtil.create('div','forecast-map-tools');L.DomEvent.disableClickPropagation(node);L.DomEvent.disableScrollPropagation(node);
    for(const [icon,label,action] of [
      ['plus','Ingrandisci mappa',()=>map.zoomIn(undefined,{animate:!reduced.matches})],
      ['minus','Riduci mappa',()=>map.zoomOut(undefined,{animate:!reduced.matches})],
      ['arrows-pointing-in','Mostra tutta Italia',fitItaly],
    ]) {
      const button=document.createElement('button');button.type='button';button.className='lab-btn forecast-map-tool';button.innerHTML=icons[icon];
      button.setAttribute('aria-label',label);button.title=label;button.addEventListener('click',action);node.append(button);
      if(icon!=='arrows-pointing-in') buttons.push(button);
    }return node;
  }});new controls().addTo(map);
  const fullscreen=L.Control.extend({options:{position:'topright'},onAdd(){
    const node=L.DomUtil.create('div','forecast-map-tools');L.DomEvent.disableClickPropagation(node);
    const button=document.createElement('button');button.type='button';button.className='lab-btn forecast-map-tool weather-map-fullscreen';
    button.innerHTML=icons['arrows-pointing-out'];button.setAttribute('aria-label','Apri mappa a schermo intero');
    button.addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else surface.requestFullscreen?.().catch(()=>{});});node.append(button);return node;
  }});new fullscreen().addTo(map);
  function syncZoomControls(){buttons.forEach((button,index)=>{
    button.disabled=index===0?map.getZoom()>=map.getMaxZoom():map.getZoom()<=map.getMinZoom();button.setAttribute('aria-disabled',String(button.disabled));
  });}
  function syncLabels(){viewport.dataset.showValues=String(map.getZoom()>=5.5&&viewport.clientWidth>=360||map.getZoom()>=7);}
  map.on('zoomend',()=>{syncZoomControls();syncLabels();});
  map.on('movestart',()=>{if(!fitting)overview=false;});
  function fitItaly(){
    fitting=true;
    map.fitBounds([[36.55,7],[47.2,18.7]],{paddingTopLeft:[viewport.clientWidth<300?24:48,viewport.clientWidth<300?56:24],paddingBottomRight:[24,50],animate:false});
    fitting=false;overview=true;syncZoomControls();syncLabels();
  }
  function resize(){
    const next=`${viewport.clientWidth}x${viewport.clientHeight}`;if(next===size)return;
    const center=size?map.getCenter():null,zoom=map.getZoom(),wasOverview=overview;size=next;fitting=true;
    map.invalidateSize({pan:false,debounceMoveend:true});
    if(wasOverview)fitItaly();else if(center)map.setView(center,zoom,{animate:false});fitting=false;
  }
  function syncMotion(){viewport.dataset.weatherMotion=inView&&!document.hidden&&!reduced.matches?'active':'static';}
  const reportAction=document.querySelector('#weather-report-fab');
  function updateSafeInset(){
    if(!reportAction)return;
    if(playbackHost.hidden){reportAction.removeAttribute('data-radar-clearance');return;}
    const player=playbackHost.getBoundingClientRect(),action=reportAction.getBoundingClientRect();
    const top=innerHeight-16-action.height,left=innerWidth-16-action.width;
    const overlap=player.bottom>top&&player.top<innerHeight-16&&player.right>left&&player.left<innerWidth-16;
    reportAction.toggleAttribute('data-radar-clearance',overlap);
    reportAction.style.setProperty('--weather-report-bottom',`${Math.max(16,innerHeight-player.top+12)}px`);
  }
  resize();
  regionLayers.forEach(layer=>{
    const element=layer.getElement();element.tabIndex=0;element.setAttribute('role','button');
    element.addEventListener('keydown',event=>{
      if(event.key==='Escape'){map.closePopup();return;}
      if(event.key!=='Enter'&&event.key!==' ')return;
      event.preventDefault();event.stopPropagation();showRegion(layer.feature.properties.code,layer);
    });
    element.addEventListener('focus',()=>{
      const [,longitude,latitude]=geography.places[layer.feature.properties.code-1];map.panInside([latitude,longitude],{padding:[24,48],animate:false});
    });
  });
  selectKind(surface.dataset.mapKind||'9');
  panel.classList.add('has-primary-weather-map');
  document.querySelectorAll('[data-local-radar]').forEach(link=>link.addEventListener('click',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const radar=surface.querySelector('#bigmap-type-9 .map-layer-control');
    if(!radar)return;
    event.preventDefault();
    radar.click();
    surface.scrollIntoView({block:'start',behavior:'instant'});
    radar.focus({preventScroll:true});
  }));
  new ResizeObserver(resize).observe(viewport);
  document.fonts.ready.then(resize);
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;syncMotion();},{threshold:.05}).observe(viewport);
  reduced.addEventListener('change',()=>{stopPlayback();syncMotion();map.options.zoomAnimation=!reduced.matches;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlayback();syncMotion();});
  document.addEventListener('fullscreenchange',()=>{
    const button=viewport.querySelector('.weather-map-fullscreen');const active=document.fullscreenElement===surface;
    button.innerHTML=icons[active?'arrows-pointing-in':'arrows-pointing-out'];button.setAttribute('aria-label',active?'Esci dallo schermo intero':'Apri mappa a schermo intero');
    requestAnimationFrame(resize);
  });
  const scheduleInset=window.ILMETEO_UI.scheduleFrame(updateSafeInset);
  addEventListener('scroll',scheduleInset,{passive:true});addEventListener('resize',scheduleInset,{passive:true});scheduleInset();
})();
