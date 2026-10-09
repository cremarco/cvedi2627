import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(root, '../..');
const { default: MarkdownIt } = await import(pathToFileURL(path.join(repo, 'node_modules/.pnpm/markdown-it@14.3.2/node_modules/markdown-it/index.mjs')).href);
const md = new MarkdownIt({ html:false, linkify:false, typographer:false });
const a = await fs.readFile(path.join(repo, 'reports/ilmeteo-lab/assessment-a.md'), 'utf8');
const evidence = JSON.parse(await fs.readFile(path.join(repo, 'reports/ilmeteo-lab/capture-integrity.json'), 'utf8'));
const substantive = a.slice(a.indexOf('## Verdetto di specificità'));
const analysis = `# iLMeteo · analisi UX/UI delle tre pagine

Method: dual-agent (A: /root/ux_assessment_a · B: /root/ux_assessment_b).

La revisione di design è stata formulata senza risultati del detector. La scansione tecnica è stata completata prima dell'analisi di A; durante il coordinamento della viewport B ha ricevuto un solo rilievo responsive di A. L'isolamento è quindi completo per giudizi di design e scansione deterministica, parziale per la successiva verifica browser. I rapporti conservano questa limitazione.

## Corpus e obiettivo

Tre pagine: [Home](https://www.ilmeteo.it/), [previsioni di Bologna](https://www.ilmeteo.it/meteo/bologna), [meteo nazionale di domani](https://www.ilmeteo.it/portale/meteo-domani). Copia locale dell'8 ottobre 2026: HTML grezzo, DOM dei widget dinamici, 226 asset, hash e attribuzioni sono conservati. I dati acquisiti delle tre pagine restano l'unica fonte del confronto. Il radar non viene presentato come aggiornato in tempo reale.

L'obiettivo è completare tre compiti con meno ambiguità: trovare Bologna, leggere condizioni e orari, comprendere il bollettino nazionale del 9 ottobre. La nuova interfaccia deve conservare contenuti e dati; la ricchezza viene organizzata e resa accessibile.

## Copertura dei dettagli e distinzione degli intervalli

L'inventario supplementare conserva 2.390 record con selector, testo esatto, stato nascosto/chiuso, hash della fonte e riferimenti agli asset. Include l'avviso del meteorologo, profilo e fotografia di Mattia Gussoni, dati geografici, sole/luna, aria/pollini, totali ambientali, clima/storico, le otto mappe nazionali di fascia e tutti i collegamenti del corpus. Le unità dei valori giornalieri dell'aria e le date di calendario delle etichette Lunedì/Martedì/Mercoledì non sono fornite e non vengono dedotte.

I pannelli orari contengono una vera voce **Probabilità di precipitazione**: 50% alle 20:00 a 1h, 11% alle 21:00 a 1h, 0% nei cinque pannelli successivi; a 3h i valori sono 11%, 11%, 0%. Queste probabilità orarie non sono attendibilità della previsione né probabilità di grandine. I pannelli a 1h e 3h non sono duplicati equivalenti: l'intervallo rimane parte dell'identità del dato.

Un ulteriore intervento verificabile riguarda l'associazione riga/dettaglio: la riga delle 2:00 a 3h richiede l'id dialog-dettaglio-2h3, ma il documento contiene dialog-dettaglio-26h3. La corrispondenza probabile è registrata come derivata. **Criterio di accettazione:** ogni riga della versione riprogettata apre il dettaglio del proprio giorno, ora e intervallo, con valori confrontati con la fonte; nessun pannello viene scelto soltanto perché l'ora stampata coincide.

Nella copia originale sono stati materializzati gli inizializzatori di fonte che mostrano temperatura/percepita e anno dell'edizione e sono stati ricollegati i pannelli nativi già acquisiti. La grafica e i valori originali restano conservati; l'anomalia 2h3 non viene mascherata con un altro pannello. Le verifiche a 390×844 e 1280×720 hanno misurato la viewport effettiva, confermando l'overflow originale Home409/Domani644. Le verifiche delle conversioni distinguono la prima implementazione dalla correzione di parità successiva, senza usare immagini precedenti come prova della versione corretta.

## Sintesi incrociata delle evidenze

Design e tecnica concordano su gerarchie deboli, testo denso, selettori piccoli e significato insufficiente delle icone. La scansione conferma il salto di titoli Home; il browser misura interlinea del carosello 16/17 px. Bologna ha una vera tabella con 14 intestazioni, ma manca caption/scope, la colonna di direzione è senza nome e gli switch delle unità non sono raggiungibili come controlli nativi. Queste proprietà motivano semantica, disclosure e tipografia migliori; il numero di colonne da solo non è un difetto.

La ricerca senza risultati e la confusione tra attendibilità, probabilità di grandine e probabilità di pioggia sono emerse nella revisione di design. Il detector non poteva verificarne il significato. I valori 50% e 49% del corpus indicano attendibilità: non vanno sostituiti da percentuali lette in un'edizione live successiva. Analogamente, la notte nella pagina Domani appartiene al 10 ottobre, non al 9.

L'overflow di Domani è stato osservato sulla fonte live a 390 px. Una prima copia locale sembrava rientrare perché mancava l'inizializzazione delle mappe: quel risultato è stato scartato. La copia finale conserva sia le mappe sia la classe runtime sito-standard osservata dal coordinatore; i controlli finali devono riferirsi a questa versione. Errori del sito, limiti della fotografia offline ed errori di acquisizione sono registrati separatamente.

Il detector ha emesso 451 righe, 217 tuple distinte. **Non sono 451 problemi indipendenti:** 144 confronti con il DESIGN.md delle slide sono inapplicabili al sito terzo, molte segnalazioni sono ripetizioni e alcune immagini senza src sono segnaposto nascosti. Il report tecnico conserva risultati grezzi e falsi positivi. Non è stata eseguita una certificazione WCAG né un test statistico con utenti.

La verifica di integrità controlla file/hash/riferimenti e CSP; non è una traccia di rete né una prova di ogni comportamento. Le tre riprogettazioni sono consultabili e hanno una revisione indipendente con esito ship per il rendering web locale. Sono stati osservati desktop 1280/1440 px e mobile 390 px, controlli a 320 px e reflow CSS a 640 px, ricerca e recupero, conversioni ripetute, dettagli orari, filtri e zoom delle mappe. Stampa controllata sul CSS; anteprima nativa, apertura file:// e zoom browser nativo al 200% non sono attestati, perché non disponibili nell’ambiente di verifica. I test con persone restano ipotesi da verificare. Account, geolocalizzazione, pubblicità remota, video e altri servizi non acquisiti richiedono stati espliciti nella copia.

${substantive}

## Esito della riprogettazione

Il laboratorio affianca tre originali e tre pagine riprogettate. La direzione scelta è Previsioni lungo la giornata: luogo e data precedono una linea delle ore, una tabella essenziale e dettagli accessibili; notizie, mappe e dati secondari seguono una gerarchia comune. La ricerca locale contiene soltanto Bologna; altre destinazioni sono esplicitamente esterne o non disponibili. Il radar viene dichiarato non consultabile nella copia, poiché i tile acquisiti della mappa base contengono messaggi di accesso bloccato. Questo limite dell’acquisizione non viene attribuito come difetto universale del sito live.

La revisione indipendente ha approvato il rendering locale documentato dopo le correzioni di leggibilità delle tabelle mobili e dello stato radar. L’audit finale ha verificato sorgenti, risorse, associazioni e sei pagine HTTP 200. Il gate automatico responsive resta fallito al 69,19%, senza forzature; la matrice manuale distingue gli adattamenti e gli asset autentici dai campioni disallineati. Il CSS di stampa, le limitazioni native e le prove con persone ancora aperte sono dichiarati nel README. Questi risultati sostengono un confronto didattico verificabile, senza una promessa di perfezione universale.

## Provenienza e riproducibilità

- HTML immutato e metadati: sources/manifest.json.
- Asset, origini e attribuzioni: assets/manifest.json e assets/attributions.json.
- Contenuti: data/capture.json e data/weather.json.
- Evidenze di design: reports/ilmeteo-lab/assessment-a.md e source/.
- Evidenze tecniche: reports/ilmeteo-lab/assessment-b.md e detector-original.json.
- Integrità: reports/ilmeteo-lab/capture-integrity.json.
- Inventario completo e dettagli chiusi: data/supplementary.json; reports/ilmeteo-lab/content-coverage.json e content-coverage.md.
- Verifica reale del runtime originale: reports/ilmeteo-lab/original-runtime-qa.json e original-runtime-qa.md; eventuale conferma dopo correzione in original-postfix-check.
- Acquisizione riproducibile: scripts/capture.py; comandi in sources/README.md.

I punteggi e i criteri descrivono questo corpus. La qualità finale sarà sostenuta da test e revisione della versione effettiva; una dichiarazione di perfezione universale non sarebbe verificabile.
`;
await fs.writeFile(path.join(root, 'ANALISI.md'), analysis);
const esc = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shell = (title, content) => `<!doctype html><html lang="it" data-theme="ilmeteo-lab"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(title)}</title><link rel="stylesheet" href="lab.css"></head><body><a class="skip-link" href="#contenuto">Vai al contenuto</a><header class="lab-nav"><a href="index.html" class="link">Laboratorio iLMeteo</a><nav aria-label="Laboratorio"><a class="link" href="redesign/milano.html">Redesign</a></nav></header><main id="contenuto">${content}</main><footer class="lab-footer">Esercitazione CVeDI · dati acquisiti l’8 ottobre 2026 · fonte iLMeteo.it</footer></body></html>`;
let rendered = md.render(analysis);
rendered = rendered.replaceAll('<table>', '<div class="report-table" role="region" aria-label="Tabella di analisi" tabindex="0"><table class="table">').replaceAll('</table>', '</table></div>');
await fs.writeFile(path.join(root, 'analisi.html'), shell('iLMeteo · analisi UX/UI', `<article class="report">${rendered}</article>`));
const entry = `<!doctype html><html lang="it" data-theme="ilmeteo-lab"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=redesign/index.html"><title>iLMeteo · originale</title><script>location.replace('redesign/index.html');</script><link rel="stylesheet" href="lab.css"></head><body><p><a class="link" href="redesign/index.html">Apri il redesign iLMeteo</a></p></body></html>`;
await fs.writeFile(path.join(root, 'index.html'), entry);
console.log(JSON.stringify({analysis:'ANALISI.md',pages:['index.html','analisi.html'],captureReport:'reports/ilmeteo-lab/capture-integrity.json'}));
