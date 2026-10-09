const textNumber = value => String(value).replace('.', ',');

function definitionList(h, fields) {
  return `<dl class="detail-grid">${fields.map(([label,value])=>`<div><dt>${h.esc(label)}</dt><dd>${h.esc(value)}</dd></div>`).join('')}</dl>`;
}

function sourceFields(h, row) {
  return `<dl class="detail-grid">${row.detail.fields.map(field=>`<div><dt>${h.esc(field.label)}</dt><dd>${h.esc(field.value)}</dd></div>`).join('')}<div><dt>Temperatura percepita · tabella</dt><dd>${h.temp(row.feelsLikeC)}</dd></div></dl>`;
}

function linksList(h, links) {
  return `<ul class="link-list">${links.map(item=>{
    const labeled={...item,label:item.label||item.sourceTitle||'Collegamento di fonte'};
    return `<li>${h.link(labeled)}${!item.label&&!item.sourceTitle&&item.sourceUrl?`<br><span class="note">${h.esc(item.sourceUrl)}</span>`:''}</li>`;
  }).join('')}</ul>`;
}

function remainingHours(h, rows, interval) {
  const dates=[...new Set(rows.map(row=>row.date))];
  return `<div data-interval="${interval}">${dates.map(day=>{
    const matching=rows.filter(row=>row.date===day);
    const caption=`Bologna · ${h.date(day)} · intervalli di ${interval} ${interval===1?'ora':'ore'}`;
    return `<h3>${h.esc(h.date(day))} · ${interval} h</h3><p class="table-scroll-note note">Su schermo stretto, scorri orizzontalmente per leggere tutte le colonne.</p><div class="overflow-x-auto" role="region" aria-label="${h.esc(caption)}" tabindex="0"><table class="table data-table"><caption>${h.esc(caption)}</caption><thead><tr><th scope="col">Ora</th><th scope="col">Temperatura</th><th scope="col">Tempo e precipitazioni</th><th scope="col">Vento</th></tr></thead><tbody>${matching.map(row=>`<tr data-row="${h.esc(row.id)}"><th scope="row"><button class="btn btn-ghost row-hour" data-hour="${h.esc(row.id)}" data-show-detail aria-controls="hour-detail">${h.esc(row.time)}<span class="sr-only"> · dettagli di ${h.esc(h.date(row.date))}, intervallo ${interval} h</span></button></th><td>${h.temp(row.temperatureC)}</td><td>${h.esc(row.condition)}<br><span class="note">${h.esc(row.sourcePrecipitation==='-'?'Non indicate':row.precipitationText)}</span></td><td>${h.esc(row.windDirectionText)}<br><span data-kmh="${row.windKmh}">${row.windKmh} km/h</span><br><span class="note">Raffiche <span data-kmh="${row.gustKmh}">${row.gustKmh} km/h</span></span></td></tr>`).join('')}</tbody></table></div>`;
  }).join('')}</div>`;
}

function dailyAvailability(h, d, day) {
  const rows=d.bologna.hourly.filter(row=>row.date===day.date&&row.intervalHours===1);
  if (!rows.length) return 'Riepilogo giornaliero; orari non acquisiti';
  const target=day.date===d.bologna.date?'contenuto':'orari-successivi';
  return `<a class="link" href="#${target}">${rows.map(row=>h.esc(row.time)).join(', ')} · 1 h</a>`;
}

function summaryDay(h, day) {
  return `<p>${h.esc(h.date(day.date))} · minima ${h.temp(day.minimumC)} · massima ${h.temp(day.maximumC)} · attendibilità ${day.forecastReliabilityPercent===null?'non fornita':`${day.forecastReliabilityPercent}%`}</p><p class="note">${day.hourly.length?'Sono disponibili soltanto le ore elencate nelle tabelle dell’edizione acquisita.':'Le previsioni orarie di questo giorno non sono acquisite. Il riepilogo giornaliero resta disponibile.'}</p>`;
}

function sourceDetail(h, row) {
  const title=`${h.date(row.date)} · ore ${row.time} · intervallo ${row.intervalHours} h`;
  const mapping='';
  const body=`<p>${h.esc(row.condition)}</p><p class="note">Valori del dettaglio originale, con le unità pubblicate dalla fonte. Probabilità di precipitazione, grandine e attendibilità restano campi distinti.</p>${sourceFields(h,row)}${mapping}`;
  return h.details(title,body).replace('<details ',`<details id="source-${h.esc(row.id)}" `);
}

function proseValues(h, section) {
  const linkedLabels=new Set(section.links.map(item=>item.label));
  return `<ul class="plain-list">${section.values.filter(value=>!linkedLabels.has(value.text)).map(value=>`<li>${h.esc(value.text)}</li>`).join('')}</ul>${linksList(h,section.links)}`;
}

export function bolognaSecondary(d,h) {
  const b=d.bologna;
  const first=b.hourly.find(row=>row.intervalHours===1);
  const overnight=b.hourly.filter(row=>row.intervalHours===1&&row.date!==b.date);
  const threeHour=b.hourly.filter(row=>row.intervalHours===3);
  const selectedDay=b.daily.find(day=>day.date==='2026-10-09')||b.daily[0];
  const observation=b.realtime[0];
  const observationDirection=b.hourly.find(row=>row.windDirectionCode===observation.windDirectionCode)?.windDirectionText||observation.windDirectionCode;
  const observationFields=[['Probabilità di grandine',observation.hail],['Pressione',`${observation.pressure} mb`],['Umidità relativa',`${observation.humidity}%`],['Visibilità',observation.visibility.replace('kmbuona','km · buona')],['Indice UV',observation.uv],['Quota 0°C e neve',observation.freezingLevel.replace('mneve a','m · neve a ')]];
  const solar=b.sunMoon.times.slice(0,2),lunar=b.sunMoon.times.slice(2);
  const model=d.shared.directories.find(directory=>directory.id==='bologna-directory-4');
  const climateBody=proseValues(h,b.climate);
  const historyBody=proseValues(h,b.history);
  const rawSourceFunctions=['ECMWF','Pianifica viaggio','Altri dati NEW','Segnala il tempo nella tua città','Vota le previsioni'];

  return `
<section class="hour-detail" id="hour-detail" hidden aria-live="polite"><h2 tabindex="-1">Bologna · ${h.esc(first.time)} · ${h.esc(h.date(first.date))} · intervallo 1 h</h2><p class="note">Valori del dettaglio originale, con le unità pubblicate dalla fonte.</p>${sourceFields(h,first)}</section>

<section class="section" id="orari-successivi" aria-labelledby="hours-more-title"><h2 id="hours-more-title">Gli orari dopo mezzanotte e a 3 ore</h2><p>Le ore 00:00, 01:00 e 02:00 appartengono a venerdì 9 ottobre 2026. L’ora originale 24 è mostrata come 00:00 del giorno successivo. Ogni intervallo conserva le proprie condizioni e il proprio dettaglio.</p>
<div class="controls unit-tools"><label for="temp-unit">Temperatura <select class="select" id="temp-unit"><option value="C" selected>Celsius · °C</option><option value="F">Fahrenheit · °F</option></select></label><label for="wind-unit">Vento <select class="select" id="wind-unit"><option value="kmh" selected>Chilometri orari · km/h</option><option value="kn">Nodi</option></select></label><label for="hour-interval">Intervallo delle altre tabelle <select class="select" id="hour-interval"><option value="1" selected>1 ora</option><option value="3">3 ore</option></select></label></div>
<p class="note" id="interval-status" role="status">L’edizione contiene sette righe a 1 ora e tre righe a 3 ore. Le quattro ore della sera a 1 ora sono nella tabella iniziale.</p><noscript><p class="note">Tutti gli intervalli e i valori originali sono visibili. Per leggere un dettaglio apri la relativa voce nella sezione “Tutti i dettagli originali”.</p></noscript>
${remainingHours(h,overnight,1)}${remainingHours(h,threeHour,3)}
${h.details('Tutti i dettagli originali',`<p class="note">Dieci previsioni distinte per data, ora e intervallo. Le unità nei dodici campi originali restano quelle della fonte.</p><div data-interval="1">${b.hourly.filter(row=>row.intervalHours===1).map(row=>sourceDetail(h,row)).join('')}</div><div data-interval="3">${threeHour.map(row=>sourceDetail(h,row)).join('')}</div>`)}
</section>

<section class="section" id="giorni" aria-labelledby="days-title"><h2 id="days-title">Bologna nei prossimi giorni</h2><p>I sette riepiloghi appartengono alla stessa edizione. Le ore disponibili fra l’8 e il 9 ottobre coprono soltanto una parte delle rispettive giornate.</p><div class="controls"><label for="forecast-day">Leggi il riepilogo <select class="select" id="forecast-day" aria-controls="day-summary">${b.daily.map(day=>`<option value="${day.date}"${day.date===selectedDay.date?' selected':''}>${h.esc(h.date(day.date))}</option>`).join('')}</select></label></div><div id="day-summary" role="status">${summaryDay(h,selectedDay)}</div>
<p class="table-scroll-note note">Su schermo stretto, scorri orizzontalmente per leggere tutte le colonne.</p><div class="overflow-x-auto" role="region" aria-label="Sette riepiloghi giornalieri di Bologna" tabindex="0"><table class="table data-table"><caption>Bologna · 8–14 ottobre 2026 · riepiloghi dell’edizione acquisita</caption><thead><tr><th scope="col">Giorno</th><th scope="col">Minima</th><th scope="col">Massima</th><th scope="col">Attendibilità</th><th scope="col">Orari disponibili nella copia</th></tr></thead><tbody>${b.daily.map(day=>`<tr><th scope="row"><time datetime="${day.date}">${h.esc(h.date(day.date,true))}</time>${day.symbolFlags.includes('pioggia')?'<br><span class="note">Indicatore di pioggia nella fonte</span>':''}</th><td>${h.temp(day.minimumC)}</td><td>${h.temp(day.maximumC)}</td><td>${day.forecastReliabilityPercent===null?'Non fornita':`${day.forecastReliabilityPercent}%`}</td><td>${dailyAvailability(h,d,day)}</td></tr>`).join('')}</tbody></table></div><p class="note">L’attendibilità è l’indicatore della previsione pubblicato dalla fonte. Non è la probabilità di pioggia. Un valore non fornito non equivale a zero.</p></section>

<section class="section" id="bollettino" aria-labelledby="bulletin-title"><h2 id="bulletin-title">Il bollettino di Bologna</h2><p class="note">${h.esc(h.date(b.date))} · ${h.esc(b.update)} · edizione congelata</p><div class="author"><img src="${h.esc(b.meteorologist.photo.src)}" alt="${h.esc(b.meteorologist.photo.alt)}" width="64" height="64"><p>${h.esc(b.meteorologist.attribution.text)}<br>${h.link({label:'Profilo di Mattia Gussoni',href:b.meteorologist.profileUrl,availability:'external'})}</p></div><p>${h.esc(b.reliability.explanation.text)}</p><p>${h.esc(b.narrative.text)}</p><p>Qualità aria: ${h.esc(b.airQuality.current.quality)}</p></section>

<section class="section" aria-labelledby="observation-title"><h2 id="observation-title">Ultima rilevazione acquisita</h2><p>${h.esc(h.date(observation.date))} · ore ${h.esc(observation.observationTime)}. Il dato è conservato nell’edizione; questa copia non riceve nuove rilevazioni.</p><dl class="detail-grid"><div><dt>Temperatura</dt><dd>${h.temp(observation.temperatureC)}</dd></div><div><dt>Temperatura percepita</dt><dd>${h.temp(observation.feelsLikeC)}</dd></div><div><dt>Vento</dt><dd>${h.esc(observationDirection)} · <span data-kmh="${observation.windKmh}">${observation.windKmh} km/h</span></dd></div><div><dt>Raffiche</dt><dd><span data-kmh="${observation.gustKmh}">${observation.gustKmh} km/h</span></dd></div><div><dt>Precipitazioni rilevate</dt><dd>${observation.precipitationDetected?'Presenti':'Non indicate'}</dd></div></dl>${definitionList(h,observationFields)}<p class="note">Osservazione e previsione oraria sono dati separati.</p></section>

<section class="section" id="ambiente" aria-labelledby="environment-title"><h2 id="environment-title">Aria e pollini</h2><div class="section-grid"><div><h3>Qualità dell’aria</h3>${definitionList(h,[['Indice pubblicato',b.airQuality.current.index],['Giudizio',b.airQuality.current.quality],['NO₂',textNumber(b.airQuality.current.NO2)],['PM10',textNumber(b.airQuality.current.PM10)]])}<p class="note">La fonte non indica unità accanto a NO₂, PM10 e CO in questi widget.</p></div><div><h3>Pollini</h3><p>Indicatore acquisito: <strong>${h.esc(b.pollen.selectedLabel)}</strong>.</p><p class="note">Scala della fonte: ${b.pollen.legend.map(item=>h.esc(item.text)).join(' · ')}. Le quattro etichette sono una legenda; il livello indicato è Assente.</p></div></div>
${h.details('Altre etichette pubblicate per la qualità dell’aria',`<p class="note">Lunedì, Martedì e Mercoledì sono etichette della fonte. Il widget non riporta le rispettive date di calendario.</p><table class="table data-table"><caption>Qualità dell’aria · etichette originali</caption><thead><tr><th scope="col">Etichetta</th><th scope="col">Indice</th><th scope="col">Giudizio</th></tr></thead><tbody>${b.airQuality.otherPublishedDays.map(day=>`<tr><th scope="row">${h.esc(day.dayLabel)}</th><td>${day.index}</td><td>${h.esc(day.quality)}</td></tr>`).join('')}</tbody></table>`)}
</section>

<section class="section" id="sole-luna" aria-labelledby="sun-moon-title"><h2 id="sun-moon-title">Sole, luna e totali</h2><div class="section-grid"><div><h3>Sole</h3>${definitionList(h,solar.map(item=>[item.label,item.value]))}</div><div><h3>Luna</h3>${definitionList(h,lunar.map(item=>[item.label,item.value]))}<p>${h.esc(b.sunMoon.moonPhase)}</p></div></div><p class="note">Orari del widget acquisito nell’edizione dell’8 ottobre. La fonte non stampa una data separata per questo modulo.</p><div class="section-grid">${b.totals.map(total=>`<div><h3>${h.esc(total.title.text)}</h3><ul class="plain-list">${total.values.map(value=>`<li>${h.esc(value.text)}</li>`).join('')}</ul></div>`).join('')}</div><p class="note">Le unità dei totali sono quelle pubblicate nella fonte. Il trattino della neve è conservato come dato non fornito.</p></section>

<section class="section" id="luogo-storico" aria-labelledby="place-title"><h2 id="place-title">Il luogo, il clima e lo storico</h2><p>${h.esc(b.geography.province.label)} · ${h.esc(b.geography.region.label)} · ${h.esc(b.geography.population)}</p>${definitionList(h,b.geography.fields.map(item=>[item.label,item.value]))}<div class="section-grid"><div>${h.details(b.climate.title.text,climateBody)}</div><div>${h.details(b.history.title.text,historyBody)}</div></div></section>

<section class="section" id="servizi-bologna" aria-labelledby="local-services-title"><h2 id="local-services-title">Servizi e contenuti collegati a Bologna</h2><p>I collegamenti indicati come “sito ufficiale” aprono servizi esterni alla copia locale.</p>${linksList(h,b.services.cityServiceLinks)}
${h.details('Altri bollettini e confronto fra modelli',linksList(h,b.services.links))}
${h.details('Bollettini PDF e funzioni della fonte',`<p>I PDF e la personalizzazione sono collegamenti al sito ufficiale; non sono documenti generati dalla copia.</p>${linksList(h,b.tools.links)}<p class="note">Funzioni presenti nella pagina originale, non operative nella copia locale:</p><ul class="plain-list">${rawSourceFunctions.map(label=>`<li>${h.esc(label)} · non disponibile nella copia</li>`).join('')}</ul><p class="note">Modello indicato dalla fonte: ${h.esc(model.options.find(option=>option.label==='ECMWF')?.label||'ECMWF')}.</p>`)}
${h.details('Webcam di Bologna e dintorni',`<p>Nessuna immagine webcam è stata acquisita in questo modulo. La voce Webcam nei servizi apre la destinazione originale sul sito ufficiale.</p>`)}
${h.details('Voto degli utenti',`<p>Voto medio: <strong>${textNumber(b.userRating.score)}/${b.userRating.maximum}</strong> · voti totali: <strong>${b.userRating.totalVotes}</strong>.</p><p class="note">Voto acquisito dagli utenti, distinto dall’attendibilità meteorologica. L’invio di un voto non è disponibile nella copia.</p>`)}
</section>`;
}

export function sharedServices(d,h) {
  const grouped=d.shared.serviceGroups.map(group=>h.details(group.label,linksList(h,group.links))).join('');
  const directories=d.shared.directories.filter(directory=>directory.page==='home').map(directory=>{
    const isPrompt=option=>/^- selezion|^- seleziona/.test(option.label)||['Webcam e altro','Cambia modello'].includes(option.label);
    const choices=directory.options.filter(option=>option.label&&!isPrompt(option));
    const prompts=directory.options.filter(option=>option.label&&isPrompt(option));
    const options=choices.map(option=>`<li>${option.availability==='local'?h.link({label:option.label,href:'milano.html',availability:'local'}):h.esc(option.label)}${option.selected?' · selezione della fonte':''}</li>`).join('');
    return h.details(directory.label,`<p class="note">Elenco della fonte ${directory.page==='home'?'Home':'Bologna'}. Le pagine delle altre località e dei modelli non sono acquisite.</p>${prompts.map(option=>`<p class="note">Etichetta iniziale nella fonte: “${h.esc(option.label)}”.</p>`).join('')}<ul class="plain-list">${options}</ul>`);
  }).join('');
  const combinedSourceLinks=page=>[...new Map([...page.header,...page.content].map(item=>[JSON.stringify([item.label,item.href,item.availability]),item])).values()];
  const sourceGroups=[['Home',combinedSourceLinks(d.shared.sourceLinksByPage.home)],['Italia domani',combinedSourceLinks(d.shared.sourceLinksByPage.domani)]];
  const inventory=sourceGroups.map(([page,links])=>h.details(`Collegamenti di fonte · ${page}`,linksList(h,links))).join('');
  return `<section class="section" id="servizi" aria-labelledby="services-title"><h2 id="services-title">Altri servizi iLMeteo</h2><p>I servizi oltre Home, Milano e Italia domani sono collegamenti al sito ufficiale oppure voci non disponibili nella copia. La disponibilità è indicata accanto a ogni voce.</p><div class="section-grid">${grouped}</div>${h.details('Elenchi di località, aree e modelli della fonte',directories)}${h.details('Collegamenti e provenienza dell’edizione',`<p>Gli elenchi conservano le destinazioni e le etichette dei contenuti acquisiti. Le voci senza destinazione utilizzabile sono indicate come non disponibili.</p>${inventory}<ul class="link-list"><li><a class="link" href="../data/supplementary.json">Inventario dei contenuti acquisiti</a></li><li><a class="link" href="../sources/manifest.json">Provenienza delle tre pagine</a></li><li><a class="link" href="../assets/manifest.json">Fonti e hash degli asset</a></li><li><a class="link" href="../assets/attributions.json">Attribuzioni delle mappe</a></li></ul>`)}<p class="note">Fonte iLMeteo.it e rispettivi autori. Materiali conservati per l’esercitazione locale; nessuna licenza di ridistribuzione attribuita.</p></section>`;
}
