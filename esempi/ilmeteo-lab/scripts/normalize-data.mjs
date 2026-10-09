import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(await fs.readFile(path.join(root, 'data/weather.json'), 'utf8'));
const number = value => {
  const match = String(value ?? '').match(/-?\d+(?:[.,]\d+)?/);
  return match ? Number(match[0].replace(',','.')) : null;
};
const dayParts = timestamp => Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(Number(timestamp)*1000)).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
const dateInfo = timestamp => {
  const p = dayParts(timestamp);
  return {date:`${p.year}-${p.month}-${p.day}`,time:`${p.hour}:${p.minute}`};
};
const directions = {N:'Nord',NNE:'Nord-nord-est',NE:'Nord-est',ENE:'Est-nord-est',E:'Est',ESE:'Est-sud-est',SE:'Sud-est',SSE:'Sud-sud-est',S:'Sud',SSW:'Sud-sud-ovest',SW:'Sud-ovest',WSW:'Ovest-sud-ovest',W:'Ovest',WNW:'Ovest-nord-ovest',NW:'Nord-ovest',NNW:'Nord-nord-ovest'};
const sequences = new Map();
const displayedTime = row => {
  const hour = Number(row.hour) % 24;
  const state = sequences.get(row.intervalHours) || {lastHour:-1,dayOffset:0};
  if (state.lastHour > hour) state.dayOffset++;
  state.lastHour = hour;
  sequences.set(row.intervalHours,state);
  const date = new Date(source.editionDate+'T12:00:00Z');
  date.setUTCDate(date.getUTCDate()+state.dayOffset);
  return {date:date.toISOString().slice(0,10),time:String(hour).padStart(2,'0')+':00'};
};
const hourly = source.hourly.map((row,index) => ({
  id:`hour-${index}`,
  ...displayedTime(row),
  sourceHour:row.hour,
  intervalHours:row.intervalHours,
  temperatureC:number(row.temperature),
  precipitationText:row.precipitation === '- assenti -' ? 'Assenti' : row.precipitation,
  sourcePrecipitation:row.precipitation,
  symbol:row.symbol,
  windDirectionCode:row.windDirection,
  windDirectionText:directions[row.windDirection] || row.windDirection,
  windKmh:number(row.windSpeed),
  gustKmh:number(row.gustSpeed),
  hailProbabilityPercent:number(row.hail),
  feelsLikeC:number(row.feelsLike),
  pressureHpa:number(row.pressure),
  humidityPercent:number(row.humidity),
  visibilityText:row.visibility,
  airQualityText:row.airQuality,
  uv:number(row.uv),
  freezingLevelText:row.freezingLevel,
  source:row
}));
const daily = source.daily.map((day,index)=>({
  id:`day-${index}`,
  ...dateInfo(day.timestamp),
  label:day.label,
  minimumC:number(day.minimum),
  maximumC:number(day.maximum),
  forecastReliabilityPercent:number(day.reliability),
  symbol:day.symbol,
  sourceUrl:day.sourceUrl,
  availableHourly:hourly.filter(r=>r.date===dateInfo(day.timestamp).date&&r.intervalHours===1).map(r=>r.time),
  source:day
}));
assert.equal(hourly.length,source.hourly.length);
assert.equal(daily.length,7);
assert.equal(daily[0].date,'2026-10-08');
assert.equal(daily[1].date,'2026-10-09');
assert.equal(daily[0].forecastReliabilityPercent,50);
assert.equal(daily[1].forecastReliabilityPercent,49);
assert.equal(hourly[0].temperatureC,21);
assert.equal(hourly[0].hailProbabilityPercent,3);
assert.equal(hourly[0].windKmh,8);
assert.equal(hourly[0].gustKmh,25);
assert.equal(hourly[0].date,'2026-10-08');
assert.equal(hourly.find(r=>r.sourceHour==='24'&&r.intervalHours===1)?.time,'00:00');
assert.equal(hourly.find(r=>r.sourceHour==='24'&&r.intervalHours===1)?.date,'2026-10-09');
const normalized = {schemaVersion:1,editionDate:source.editionDate,timeZone:'Europe/Rome',city:source.city,update:source.update,author:source.author,daily,hourly,realtime:source.realtime,homeSummary:source.homeSummary,tomorrowSummary:source.tomorrowSummary,regions:source.regions,news:source.news,details:source.details,sourcePages:source.sourcePages,limits:source.limits,semantics:{forecastReliability:'Indicatore di attendibilità pubblicato dalla fonte; non è probabilità di pioggia.',hailProbability:'Probabilità di grandine, distinta dalla probabilità di pioggia.',precipitation:'Descrizione testuale di fonte; non sono state inventate quantità o probabilità.',midnight:'L’ora originale24 viene mostrata come00:00 del giorno successivo.',sourceImportTimestamp:'Gli attributi data-import_ts della tabella sono preservati come metadati opachi: non coincidono con le ore visibili se interpretati come epoch UTC. Data e ora di presentazione derivano dalla sequenza di etichette visibili della fonte, separatamente per1h/3h.'}};
await fs.writeFile(path.join(root,'data/normalized.json'),JSON.stringify(normalized,null,2)+'\n');
console.log(JSON.stringify({days:daily.length,hourlyRows:hourly.length,first:hourly[0].time,midnight:hourly.find(r=>r.sourceHour==='24'),semanticsVerified:true}));
