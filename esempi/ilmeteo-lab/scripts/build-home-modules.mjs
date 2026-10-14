/* Restore homepage modules from the frozen source, keeping data out of UI code. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const lab = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFile(path.join(lab, file), 'utf8');
export async function buildHomeModules() {
  const [raw, worldCatalog, data, promotions] = await Promise.all([
    read('redesign/index.html'), read('assets/maps/world/catalog.js'),
    read('data/supplementary.json').then(JSON.parse), read('data/home-promotions.json').then(JSON.parse),
  ]);
  const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const plain = html => html.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replace(/\s+/g, ' ').trim();
  const icon = async name => (await read(`assets/controls/heroicons/${name}.svg`)).replace('<svg ', `<svg focusable="false" data-heroicon="${name}" `);
  const [chevron, play, search, plus, minus, reset] = await Promise.all([
    icon('chevron-right'), icon('play'), icon('magnifying-glass'), icon('plus'), icon('minus'), icon('arrows-pointing-in'),
  ]);
  const ad = id => {
    const item = promotions.ads.find(item => item.id === id);
    return `<aside class="home-ad home-ad--${item.format.name}" aria-label="Pubblicità: ${escape(id === 'corso' ? 'TTC in Bicocca' : id === 'caffe' ? 'Caffè TTC' : id === 'booklet' ? 'Booklet CVeDI' : item.title)}" data-promotion="${id}" data-ad-format="${item.format.width}x${item.format.height}">
    <p class="home-ad__label">Pubblicità</p>
    <a class="home-ad__link" href="${escape(item.href)}" target="_blank" rel="noopener noreferrer">
      <picture>${item.mobileAsset ? `<source media="(max-width: 600px)" srcset="../assets/advertising/campaign-v4/${item.mobileAsset}.webp" width="${item.mobileFormat.width}" height="${item.mobileFormat.height}"/>` : ''}<img src="../assets/advertising/campaign-v4/${item.asset}.webp" width="${item.format.width}" height="${item.format.height}" alt="${escape(item.title + '. ' + item.description + ' ' + item.cta)}" decoding="async" ${id === 'booklet' ? 'fetchpriority="high"' : 'loading="lazy"'}/></picture>
    </a>
  </aside>`;
  };
  const headlines = [...raw.matchAll(/<li class="block_news__col__list__item[^>]+>([\s\S]*?)<\/li>/g)].slice(0, 3).map(match => {
    const html = match[1];
    return {href: html.match(/data-live-href="([^"]+)"/)[1], image: html.match(/\bsrc="([^"]+)"/)[1], title: plain(html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)[1]), date: plain(html.match(/<p[^>]*>([\s\S]*?)<\/p>/)[1])};
  });
  const opening = `${ad('booklet')}
  <div class="home-edition"><h1>Previsioni Meteo Italia</h1><p>Edizione acquisita · <time datetime="2026-10-08T19:56:00+02:00">Giovedì 8 ottobre 2026, ore 19:56</time></p></div>
  <section class="home-frontpage" aria-labelledby="frontpage-title">
    <div class="home-section-heading"><h2 id="frontpage-title">Prima pagina</h2><a class="lab-btn lab-btn-ghost" href="#home-news">Tutte le notizie${chevron}</a></div>
    <ul class="home-frontpage__stories">${headlines.map(story => `<li><a href="#snapshot-unavailable" data-live-href="${escape(story.href)}"><img src="${story.image}" width="240" height="150" alt="" decoding="async"/><div><h3>${escape(story.title)}</h3><time>${escape(story.date)}</time></div></a></li>`).join('\n')}</ul>
  </section>`;
  const sidebar = `<div class="home-daily-sidebar">${ad('corso')}${ad('caffe')}</div>`;
  const video = `<section class="home-video" aria-labelledby="video-title"><h2 id="video-title">Video previsioni meteo</h2>
    <img class="home-video__logo" src="../assets/9d4be5ee3da4-logo_ilmeteotv.svg" alt="iLMeteo TV" width="140" height="36" loading="lazy"/>
    <a class="home-video__preview" href="#snapshot-unavailable" data-live-href="https://www.ilmeteo.it/video"><img src="../assets/82fae54f1a58-fluid-video-home-placeholder-1.png" width="320" height="180" alt="" loading="lazy"/><span>${play}Video meteo · 8 ottobre 2026</span></a>
    <a class="lab-btn lab-btn-ghost" href="#snapshot-unavailable" data-live-href="https://www.ilmeteo.it/Italia">Video Previsioni Italia${chevron}</a>
  </section>`;

  const synthetic = data.pages.home.secondary.syntheticForecast;
  const days = synthetic.days.map((day, index) => {
    const record = data.records[day.narrativeRef];
    const links = Object.values(data.records).filter(item => item.tag === 'a' && item.source.document === 'home' && item.source.xpath.startsWith(record.source.xpath + '/'));
    return {label:data.records[day.tabRef].text, title:data.records[day.dateTitleRef].text, text:record.text.split(' Previsioni meteo complete')[0], links, sourceRef:day.narrativeRef, date:`2026-10-${String(index + 8).padStart(2, '0')}`};
  });
  const link = record => {
    const live = record.attributes.href;
    const local = /meteo-domani$/.test(live) ? 'domani.html' : '#snapshot-unavailable';
    return `<a class="lab-btn lab-btn-ghost" href="${local}"${local.startsWith('#') ? ` data-live-href="${escape(live)}"` : ''}>${escape(record.text)}${chevron}</a>`;
  };
  const summaries = `<section class="home-summaries" aria-labelledby="summaries-title">
    <div class="home-section-heading"><h2 id="summaries-title">Previsioni sintetiche</h2><p>${escape(data.records[synthetic.attributionRef].text)}</p></div>
    <nav class="home-summary-dates" aria-label="Date delle previsioni sintetiche"><div class="lab-tabs" data-summary-tabs>${days.map((day, i) => `<a class="lab-tab" id="summary-tab-${i}" href="#summary-panel-${i}">${escape(day.label)}</a>`).join('')}<a class="lab-tab" href="#snapshot-unavailable" data-live-href="https://www.ilmeteo.it/portale/meteo-lungo-termine">Meteo 15gg</a></div></nav>
    <div class="home-summary-panels">${days.map((day, i) => `<article id="summary-panel-${i}" data-summary-panel data-source-ref="${day.sourceRef}"><h3><time datetime="${day.date}">${escape(day.title)}</time></h3><p>${escape(day.text)}</p><div class="home-summary-links">${day.links.map(link).join('')}</div></article>`).join('\n')}</div>
  </section>`;
  const world = JSON.parse(worldCatalog.match(/window\.ILMETEO_WORLD_MAP\s*=\s*([\s\S]+);\s*$/)[1]);
  const countryOptions = world.countries.map(country => `<option value="${escape(country.name)}"></option>`).join('');
  const international = `<section class="home-international world-weather" id="international-world" aria-labelledby="international-title-world">
    <div class="world-heading"><h2 id="international-title-world">Meteo nel mondo</h2><p>Scegli un paese sulla mappa oppure cercalo per nome.</p></div>
    <div class="world-layout">
      <div class="world-cartography">
        <div id="world-weather-map" class="world-map forecast-interactive" tabindex="0" aria-label="Mappa del mondo per scegliere un paese" aria-describedby="world-map-credit" hidden></div>
        <img id="world-map-fallback" src="../assets/maps/world/world.svg" width="1200" height="600" alt="Mappa completa del mondo con i confini dei paesi e dei territori" loading="lazy"/>
        <div class="world-map-tools" aria-label="Comandi della mappa mondiale">
          <div class="world-map-zoom"><button id="world-map-zoom-in" class="lab-btn" type="button" aria-label="Ingrandisci la mappa mondiale" disabled>${plus}</button><button id="world-map-zoom-out" class="lab-btn" type="button" aria-label="Riduci la mappa mondiale" disabled>${minus}</button></div>
          <button id="world-map-reset" class="lab-btn lab-btn-ghost" type="button" disabled>${reset}Mostra tutto il mondo</button>
        </div>
        <p id="world-map-credit" class="world-map-credit">Cartografia <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a> · ${world.countries.length} paesi e territori</p>
        <noscript><p class="world-status">Attiva JavaScript per selezionare i paesi e navigare la mappa. Le previsioni di Milano sono disponibili dal collegamento accanto.</p></noscript>
      </div>
      <div class="world-discovery">
        <form id="world-country-form" class="world-search" action="#international-world" method="get">
          <label for="world-country-search">Cerca un paese</label>
          <div class="world-search-row"><input id="world-country-search" class="lab-input" type="search" name="paese" maxlength="64" autocomplete="off" placeholder="Es. Italia, Francia, Giappone" role="combobox" aria-autocomplete="list" aria-controls="world-country-results" aria-expanded="false" aria-describedby="world-search-status" list="world-country-options"/><button class="lab-btn" type="submit" aria-label="Cerca paese">${search}</button></div>
          <ul id="world-country-results" class="world-country-results" role="listbox" aria-label="Paesi e territori" hidden></ul>
          <datalist id="world-country-options">${countryOptions}</datalist>
          <p id="world-search-status" class="world-status" role="status" aria-live="polite">Puoi cercare per nome o selezionare un paese sulla mappa.</p>
        </form>
        <div class="world-selection"><h3 id="world-selected-country">Scegli un paese</h3><p id="world-country-status" class="world-status" role="status" aria-live="polite">Le previsioni internazionali non sono state acquisite nella copia locale.</p><a id="world-milano-link" class="lab-btn lab-btn-ghost" href="milano.html">Previsioni disponibili: Milano${chevron}</a></div>
        <form id="world-city-form" class="world-search world-city-search" action="#international-world" method="get">
          <label for="world-city-search">Cerca una città</label>
          <div class="world-search-row"><input id="world-city-search" class="lab-input" type="search" name="citta" maxlength="64" autocomplete="off" placeholder="Es. Milano" aria-describedby="world-city-status"/><button class="lab-btn" type="submit">Cerca città</button></div>
          <p id="world-city-status" class="world-status" role="status" aria-live="polite">Milano è consultabile nella copia. Le altre destinazioni non sono state acquisite.</p>
        </form>
      </div>
    </div>
  </section>`;
  const resources = `<div class="home-leaderboard-slot">${ad('atlante')}</div><div class="home-secondary-reading">${summaries}<div class="home-resources-sidebar">${video}${ad('laboratorio')}</div></div><div class="home-international-grid">${international}</div>`;
  let html = raw;
  for (const [name, content] of Object.entries({opening, sidebar, resources})) {
    const pattern = new RegExp(`<!-- home-module:${name}:start -->[\\s\\S]*?<!-- home-module:${name}:end -->`);
    if (!pattern.test(html)) throw Error(`Missing home module slot: ${name}`);
    html = html.replace(pattern, `<!-- home-module:${name}:start -->\n${content}\n<!-- home-module:${name}:end -->`);
  }
  await fs.writeFile(path.join(lab, 'redesign/index.html'), html);
  const assets = await Promise.all(promotions.ads.map(async item => ({id:item.id, file:`${item.asset}.webp`, format:item.format, mobile:item.mobileAsset ? `${item.mobileAsset}.webp` : null, sha256:createHash('sha256').update(await fs.readFile(path.join(lab, `assets/advertising/campaign-v4/${item.asset}.webp`))).digest('hex'), prompt:`${item.asset}.json`, original:`${item.asset}.png`})));
  await fs.writeFile(path.join(lab, 'assets/advertising/campaign-v4/manifest.json'), JSON.stringify({schemaVersion:1,date:'2026-10-13',generator:'built-in image_gen',catalog:'data/home-promotions.json',assets},null,2)+'\n');
  console.log('Home: editorial opening, video, seven acquired summaries, world discovery and five promotions built.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildHomeModules();
