import {nationalHeroMap} from './redesign-maps.mjs';
/* Home and national forecast bodies. Content comes from the frozen data adapter. */

const section = (id, title, body, h) => `<section class="section" id="${h.esc(id)}" aria-labelledby="${h.esc(id)}-title"><h2 id="${h.esc(id)}-title">${h.esc(title)}</h2>${body}</section>`;
const options = (items, selected, h) => items.map(([id, label]) => `<option value="${h.esc(id)}"${id === selected ? ' selected' : ''}>${h.esc(label)}</option>`).join('');
const paragraphs = (text, h, cls = '') => `<p${cls ? ` class="${cls}"` : ''}>${h.esc(text)}</p>`;

function nationalDays(days, attribution, h) {
  return `${paragraphs(attribution.text, h, 'note')}${days.map(day => h.details(day.title.text,
    `<div class="read-column">${paragraphs(day.narrative.text, h)}<ul class="link-list">${(day.narrative.links||[]).map(l=>`<li>${h.link(l)}</li>`).join('')}</ul>${day.date === '2026-10-09' ? '<p><a class="link" href="domani.html">Leggi la previsione nazionale del 9 ottobre 2026</a></p>' : ''}</div>`)).join('')}`;
}

function newsList(news, h) {
  return `<ul class="news-list">${news.map(item => {
    const timestamp = item.publishedDate && item.publishedTime
      ? `${item.publishedDate}T${item.publishedTime}` : item.publishedDate;
    const publication = item.publication?.text || (item.publishedDate
      ? h.date(item.publishedDate) : 'Notizia presente nell’edizione acquisita l’8 ottobre 2026');
    return `<li data-news="${h.esc(item.id)}"><img src="${h.esc(item.image.src)}" width="200" height="150" alt="" loading="lazy"><div>${h.link({ label: item.sourceCarouselTitle || item.title, href: item.url, availability: item.availability })}<time${timestamp ? ` datetime="${h.esc(timestamp)}"` : ''}>${h.esc(publication)}</time></div></li>`;
  }).join('')}</ul>`;
}

function homeMaps(d, h) {
  const families = d.home.mapFamilies;
  const periodLabels = new Map();
  families.forEach(family => family.maps.forEach(map => periodLabels.set(map.id, map.label)));
  const controls = `<div class="controls"><label for="map-family">Mappa <select class="select" id="map-family">${options([...families.map(f => [f.id, f.label]), ['all', 'Tutte le mappe']], 'weather', h)}</select></label><label for="map-period">Fascia <select class="select" id="map-period">${options([...periodLabels], 'day', h)}<option value="all">Tutte le fasce</option></select></label></div><p class="note" id="map-status" role="status" aria-live="polite">Tutte le mappe dell’edizione acquisita.</p>`;
  const maps = families.flatMap(family => family.maps.map(map => {
    const dated = map.date ? h.date(map.date) : `edizione acquisita ${h.date(map.editionDate || d.edition.date)}`;
    return `<div class="map-family" data-map-family="${h.esc(family.id)}" data-map-period="${h.esc(map.id)}">${h.figure(map.asset, `${family.label} · ${map.label} · ${dated}`)}</div>`;
  })).join('');
  return `${controls}<p class="note">Le risorse della Home sono conservate come acquisite. La fonte non pubblica una data specifica per ciascuna di queste mappe.</p><div class="map-gallery">${maps}</div>`;
}

function radar(d, h) {
  const captured=d.home.radar;
  const official=d.shared.serviceGroups.flatMap(group=>group.links).find(item=>item.label==='Radar'&&item.href);
  return `<div class="read-column radar-unavailable"><p><strong>Radar non disponibile in questa copia.</strong></p><p>Le immagini acquisite della mappa base contengono messaggi di accesso bloccato. Non è disponibile una rappresentazione geografica utilizzabile.</p><p class="note">Ora mostrata nella fonte: ${h.esc(captured.sourceTimestamp)} · ${h.esc(captured.sourceState)}. Le risorse originali e le attribuzioni restano conservate nell’acquisizione.</p><p>${h.link({...official,label:'Apri il radar sul sito ufficiale'})}</p><p><a class="link" href="../originale/index.html">Confronta la copia originale della Home</a></p></div>`;
}

export function home(d, h) {
  const hero = `<div class="hero-reading"><div><h1>${h.esc(d.home.headline.text)}</h1>${paragraphs(d.home.summary.text, h, 'lead')}<p><a class="link" href="milano.html">Consulta Milano</a> · <a class="link" href="domani.html">Italia · 9 ottobre 2026</a></p></div><div>${h.figure(nationalHeroMap(d.national.fullDayMap), `Italia · ${h.date(d.national.date)} · fonte iLMeteo · grafica ridisegnata`, 'hero-map')}</div></div>`;
  const daily = section('previsioni-italia', 'Le previsioni in Italia · 8–14 ottobre 2026',
    nationalDays(d.home.nationalDays, d.home.nationalAttribution, h), h);
  const news = ['News Meteo', 'News Extra'].map(category => section(
    category === 'News Meteo' ? 'news-meteo' : 'news-extra', category,
    newsList(d.home.news.filter(item => item.category === category), h), h)).join('');
  const maps = section('mappe', 'Le mappe acquisite', homeMaps(d, h), h);
  const smallMaps = section('mappe-giorni', 'Le mappe dei giorni seguenti',
    `<div class="map-gallery">${d.home.smallMaps.map(asset => h.figure(asset,
      `${asset.alt} · edizione acquisita ${h.date(d.edition.date)}`)).join('')}</div>`, h);
  const frozenRadar = section('radar', 'Radar · 8 ottobre 2026', radar(d, h), h);
  const video = section('video-meteo', 'Video meteo',
    `<div class="read-column">${paragraphs(d.home.video.text, h)}${paragraphs(d.home.video.reason, h, 'note')}</div>`, h);
  return hero + daily + news + maps + smallMaps + frozenRadar + video;
}

export function domani(d, h) {
  const n = d.national;
  const hero = `<div class="hero-reading"><div><h1>Italia · ${h.esc(h.date(n.date))}</h1>${paragraphs(n.summary.text, h, 'lead')}<p class="note">Aggiornamento acquisito: <time datetime="${h.esc(n.update.date)}T${h.esc(n.update.time)}">${h.esc(h.date(n.update.date))}, ore ${h.esc(n.update.time)}</time>. La fonte indicava il prossimo aggiornamento per l’${h.esc(h.date(n.update.sourceNextUpdate.date, true))} alle ${h.esc(n.update.sourceNextUpdate.time)}: quel programma è storico; la copia rimane congelata.</p></div><div>${h.figure(nationalHeroMap(n.fullDayMap), `Italia · ${h.date(n.date)} · previsione della giornata · iLMeteo · grafica ridisegnata`, 'hero-map')}</div></div>`;
  const regions = section('aree-italia', 'Le previsioni per area',
    `<div class="read-column">${n.regions.map(region => `<article class="map-family"><h3>${h.esc(region.title)}</h3>${paragraphs(region.text, h)}${paragraphs(region.temperatures, h)}</article>`).join('')}</div>`, h);
  const control = `<div class="controls"><label for="national-period">Fascia <select class="select" id="national-period">${options([['all', 'Tutte le fasce'], ...n.periods.map(period => [period.id, `${period.label} · ${h.date(period.date, true)} · ore ${period.hours}`])], 'all', h)}</select></label></div><p class="note" id="period-status" role="status" aria-live="polite">Tutte le quattro fasce acquisite: tempo e precipitazioni.</p>`;
  const periods = section('fasce', 'Tempo e precipitazioni per fascia',
    control + n.periods.map(period => `<article class="map-family" data-national-period="${h.esc(period.id)}"><h3>${h.esc(period.label)} · ${h.esc(h.date(period.date))} · ore ${h.esc(period.hours)}</h3><div class="periods">${h.figure(period.weatherMap, `Tempo · ${period.label} · ${h.date(period.date)} · ore ${period.hours}`)}${h.figure(period.precipitationMap, `Precipitazioni · ${period.label} · ${h.date(period.date)} · ore ${period.hours}`)}</div></article>`).join(''), h);
  const regionLinks = section('regioni', 'Le regioni sul sito ufficiale',
    `<p class="note">Le previsioni regionali si aprono su iLMeteo. I nomi delle regioni rendono disponibili i collegamenti anche senza usare la mappa.</p><ul class="link-list">${n.regionLinks.map(region => `<li>${h.link(region)}</li>`).join('')}</ul>`, h);
  const days = section('altri-giorni', 'Gli altri giorni dell’edizione acquisita',
    nationalDays(n.days, d.home.nationalAttribution, h), h);
  return hero + regions + periods + regionLinks + days;
}
