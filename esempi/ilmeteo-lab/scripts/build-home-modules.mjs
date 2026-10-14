/* Restore homepage modules from the frozen source, keeping data out of UI code. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const lab = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFile(path.join(lab, file), 'utf8');
export async function buildHomeModules() {
  const [acquiredRaw, worldCatalog, data, promotions, site, newsArt] = await Promise.all([
    read('redesign/index.html'), read('assets/maps/world/catalog.js'),
    read('data/supplementary.json').then(JSON.parse), read('data/home-promotions.json').then(JSON.parse), read('data/site.json').then(JSON.parse), read('data/home-news-art.json').then(JSON.parse),
  ]);
  const icon = async name => (await read(`assets/controls/heroicons/${name}.svg`)).replace('<svg ', `<svg focusable="false" data-heroicon="${name}" `);
  const [chevron, play, search, plus, minus, reset] = await Promise.all([
    icon('chevron-right'), icon('play'), icon('magnifying-glass'), icon('plus'), icon('minus'), icon('arrows-pointing-in'),
  ]);
  const videoNews = new Set(Object.values(data.records)
    .filter(record => record.source.document === 'home' && record.tag === 'a' && /\[video\]/i.test(record.textContent))
    .map(record => record.url?.absoluteUrl || record.attributes.href));
  const withNewsArt = newsArt.assets.reduce((html, item) => [item.source, item.previousRuntime].filter(Boolean)
    .reduce((content, source) => content.replaceAll(`src="${source}"`, `src="${item.runtime}"`), html), acquiredRaw)
    .replace(/(<h3\b[^>]*class="[^"]*block_news__col__list__item__title[^"]*"[^>]*>)([\s\S]*?)(<\/h3>)/g,
      (_, opening, title, closing) => opening + title.replace(/\s*\[[^\]]*\]/g, '') + closing);
  let newsIndex = 0;
  const newsWithCards = withNewsArt.replace(/<li class="block_news__col__list__item[^>]*>([\s\S]*?)<\/li>/g, (_, item) => {
    const href = item.match(/data-live-href="([^"]+)"/)[1];
    const image = item.match(/<img\b[^>]*>/)[0].replace(/alt="[^"]*"/, 'alt=""');
    const title = item.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)[1].replace(/<\/?a\b[^>]*>/g, '').trim();
    const date = item.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)[1].trim();
    const id = `home-news-title-${++newsIndex}`;
    const hasVideo = videoNews.has(href);
    const media = `<span class="home-news__media">${image}${hasVideo ? `<span class="home-news__play" aria-hidden="true">${play}</span>` : ''}</span>`;
    return `<li class="block_news__col__list__item lab-card lab-card-side lab-card-sm"><a class="home-news__link" href="#snapshot-unavailable" data-live-href="${href}" aria-labelledby="${id}"${hasVideo ? ` aria-describedby="${id}-format"` : ''}>${media}<div class="lab-card-body"><h3 class="block_news__col__list__item__title lab-card-title" id="${id}">${title}</h3><p class="block_news__col__list__item__data">${date}</p>${hasVideo ? `<span class="meteo-sr-only" id="${id}-format">Notizia con video</span>` : ''}</div></a></li>`;
  });
  const newsArchive = Object.values(data.records).find(record => record.source.document === 'home' && record.tag === 'a' && record.text?.trim() === 'Notizie').url.absoluteUrl;
  let newsColumn = 0;
  const raw = newsWithCards.replace(/(<ul\b[^>]*class="[^"]*block_news__col__list[^"]*"[^>]*>[\s\S]*?<\/ul>)(?:\s*<a\b(?=[^>]*data-news-more=)[\s\S]*?<\/a>)?/g, (_, list) => {
    const category = ['meteo','extra'][newsColumn++];
    return `${list}\n<a class="lab-btn lab-btn-outline home-news__more" data-news-more="${category}" href="#snapshot-unavailable" data-live-href="${newsArchive}" aria-label="Altre notizie ${category}" data-unavailable-message="L’archivio delle notizie ${category} non è stato acquisito. Puoi leggere le notizie presenti nella home.">Altre notizie${chevron}</a>`;
  });
  const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const plain = html => html.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replace(/\s+/g, ' ').trim();
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
  const opening = `<div class="home-edition"><h1>Previsioni Meteo Italia</h1></div>
  ${ad('booklet')}
  <section class="home-frontpage" aria-labelledby="frontpage-title">
    <div class="home-section-heading"><h2 id="frontpage-title">Prima pagina</h2><a class="lab-btn lab-btn-outline" href="#home-news">Tutte le notizie${chevron}</a></div>
    <ul class="home-frontpage__stories">${headlines.map(story => `<li><a href="#snapshot-unavailable" data-live-href="${escape(story.href)}"><img src="${story.image}" width="240" height="150" alt="" decoding="async"/><div><h3>${escape(story.title)}</h3><time>${escape(story.date)}</time></div></a></li>`).join('\n')}</ul>
  </section>`;
  const sidebar = `<div class="home-daily-sidebar">${ad('corso')}${ad('caffe')}</div>`;
  const video = `<section class="home-video" aria-labelledby="video-title"><h2 id="video-title">Video previsioni meteo</h2>
    <p class="home-video__brand">${escape(site.name)} · video</p>
<a class="home-video__preview" href="#snapshot-unavailable" data-live-href="https://www.ilmeteo.it/video"><span class="home-video__poster"><img src="../assets/video/presenter-studio-v2/presenter-studio.webp" width="1663" height="945" alt="Presentatore in completo nero nello studio delle previsioni meteo" loading="lazy" decoding="async"/><span class="home-video__play" aria-hidden="true">${play}</span></span><span class="home-video__caption">Video meteo · 8 ottobre 2026</span></a>
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
    const videoLink = /\/meteo-video\//.test(live);
    return `<a class="lab-btn lab-btn-primary${videoLink ? ' lab-btn-outline' : ''}" href="${local}"${local.startsWith('#') ? ` data-live-href="${escape(live)}"` : ''}>${videoLink ? play : ''}<span>${escape(record.text)}</span>${videoLink ? '' : chevron}</a>`;
  };
  const summaries = `<section class="home-summaries" aria-labelledby="summaries-title">
    <div class="home-section-heading"><h2 id="summaries-title">Previsioni sintetiche</h2><div class="home-curator"><div class="lab-avatar"><div class="home-curator__portrait"><img src="${escape(site.curatorPortrait.src)}" width="${site.curatorPortrait.width}" height="${site.curatorPortrait.height}" alt="${escape(site.curatorPortrait.alt)}" loading="lazy" decoding="async"/></div></div><p>A cura di <strong>${escape(site.curator)}</strong></p></div></div>
    <nav class="home-summary-dates" aria-label="Date delle previsioni sintetiche"><div class="lab-tabs" data-summary-tabs>${days.map((day, i) => `<a class="lab-tab" id="summary-tab-${i}" href="#summary-panel-${i}" aria-label="${escape(day.label)}"><span aria-hidden="true">${escape(day.label.split(' ')[0].slice(0,3))}</span><strong aria-hidden="true">${escape(day.label.split(' ').at(-1))}</strong></a>`).join('')}</div><a class="lab-btn lab-btn-outline home-summary-outlook" href="#snapshot-unavailable" data-live-href="https://www.ilmeteo.it/portale/meteo-lungo-termine">Meteo 15gg${chevron}</a></nav>
    <div class="home-summary-panels">${days.map((day, i) => `<article id="summary-panel-${i}" data-summary-panel data-source-ref="${day.sourceRef}"><h3><time datetime="${day.date}">${escape(day.title)}</time></h3><p>${escape(day.text)}</p><div class="home-summary-links">${day.links.map(link).join('')}</div></article>`).join('\n')}</div>
  </section>`;
  const world = JSON.parse(worldCatalog.match(/window\.ILMETEO_WORLD_MAP\s*=\s*([\s\S]+);\s*$/)[1]);
  const countryOptions = world.countries.map(country => `<option value="${escape(country.name)}"></option>`).join('');
  const international = `<section class="home-international world-weather" id="international-world" aria-labelledby="international-title-world">
    <div class="world-heading"><h2 id="international-title-world">Meteo nel mondo</h2><p>Scegli un paese sulla mappa oppure cercalo per nome.</p></div>
    <div class="world-layout">
        <form id="world-country-form" class="world-search" action="#international-world" method="get">
          <label for="world-country-search">Cerca un paese</label>
          <div class="world-search-row"><input id="world-country-search" class="lab-input" type="search" name="paese" maxlength="64" autocomplete="off" placeholder="Es. Italia, Francia, Giappone" role="combobox" aria-autocomplete="list" aria-controls="world-country-results" aria-expanded="false" aria-describedby="world-search-status" list="world-country-options"/><button class="lab-btn lab-btn-primary" type="submit" aria-label="Cerca paese">${search}</button></div>
          <ul id="world-country-results" class="world-country-results" role="listbox" aria-label="Paesi e territori" hidden></ul>
          <datalist id="world-country-options">${countryOptions}</datalist>
          <p id="world-search-status" class="world-status" role="status" aria-live="polite">Puoi cercare per nome o selezionare un paese sulla mappa.</p>
        </form>
      <div class="world-cartography">
        <div id="world-weather-map" class="world-map forecast-interactive" tabindex="0" aria-label="Mappa del mondo per scegliere un paese" hidden></div>
        <img id="world-map-fallback" src="../assets/maps/world/world.svg" width="1200" height="600" alt="Mappa completa del mondo con i confini dei paesi e dei territori" loading="lazy"/>
        <div class="world-map-tools" aria-label="Comandi della mappa mondiale">
          <div class="world-map-zoom"><button id="world-map-zoom-in" class="lab-btn" type="button" aria-label="Ingrandisci la mappa mondiale" disabled>${plus}</button><button id="world-map-zoom-out" class="lab-btn" type="button" aria-label="Riduci la mappa mondiale" disabled>${minus}</button></div>
          <button id="world-map-reset" class="lab-btn lab-btn-outline" type="button" disabled>${reset}Mostra tutto il mondo</button>
        </div>
        <noscript><p class="world-status">Attiva JavaScript per selezionare i paesi e navigare la mappa. Le previsioni di Milano sono disponibili dal collegamento accanto.</p></noscript>
      </div>
      <div class="world-discovery">

        <div class="world-selection"><h3 id="world-selected-country">Scegli un paese</h3><p id="world-country-status" class="world-status" role="status" aria-live="polite">Le previsioni internazionali non sono state acquisite nella copia locale.</p><a id="world-milano-link" class="lab-btn lab-btn-ghost" href="milano.html">Previsioni disponibili: Milano${chevron}</a></div>
        <form id="world-city-form" class="world-search world-city-search" action="#international-world" method="get">
          <label for="world-city-search">Cerca una città</label>
          <div class="world-search-row"><input id="world-city-search" class="lab-input" type="search" name="citta" maxlength="64" autocomplete="off" placeholder="Es. Milano" aria-describedby="world-city-status"/><button class="lab-btn lab-btn-primary" type="submit">Cerca città</button></div>
          <p id="world-city-status" class="world-status" role="status" aria-live="polite">Milano è consultabile nella copia. Le altre destinazioni non sono state acquisite.</p>
        </form>
      </div>
    </div>
  </section>`;
  const resources = `<div class="home-leaderboard-slot">${ad('atlante')}</div><div class="home-secondary-reading">${summaries}<div class="home-resources-sidebar">${video}${ad('laboratorio')}</div></div><div class="home-international-grid">${international}</div>`;
  const community = `<aside class="whatsapp-banner" aria-labelledby="whatsapp-banner-title">
    <img class="whatsapp-banner__logo" src="../assets/74340fa0a487-social_mobile_whatsapp.svg" width="64" height="64" alt="" loading="lazy" decoding="async"/>
    <div class="whatsapp-banner__copy"><h2 id="whatsapp-banner-title">${escape(site.name)}</h2><p>${escape(site.whatsapp.tagline)}</p></div>
    <span class="whatsapp-banner__label">${escape(site.whatsapp.label)}</span>
  </aside>`;
  let html = raw;
  for (const [name, content] of Object.entries({opening, sidebar, resources, community})) {
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
