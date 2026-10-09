# iLMeteo · laboratorio UX/UI

Tre originali e tre riprogettazioni: Home, Milano e previsioni nazionali. Home e Italia conservano l’acquisizione dell’8 ottobre 2026; Milano è acquisita il 9 ottobre, con previsioni fino al 15 ottobre. Le copie non si aggiornano. Bologna è sostituita nel percorso attivo; le pagine precedenti sono conservate in `archive/bologna-2026-10-08/`, le fonti e i dati originali restano immutati.

## Consultazione

Aprire <http://127.0.0.1:4187/>: l’ingresso porta direttamente alla Home originale acquisita (`originale/index.html`). L’analisi resta consultabile in `analisi.html`; le sei pagine sono elencate qui sotto.

| Pagina | Originale | Redesign |
| --- | --- | --- |
| Home | `originale/index.html` | `redesign/index.html` |
| Milano | `originale/milano.html` | `redesign/milano.html` |
| Italia · domani | `originale/domani.html` | `redesign/domani.html` |

La direzione scelta, **Previsioni lungo la giornata**, mette luogo e data prima delle ore e dei dettagli. Il sistema conserva logo, mappe, testi e attribuzioni originali; usa blu, bianco, arancio e Nunito Sans locale. Il sistema grafico è documentato in `DESIGN.md` e `.impeccable/design.json`.

Milano mostra i primi quattro orari acquisiti nella prima tabella e tutti gli altri nelle tabelle successive: 14 previsioni a un’ora e cinque a tre ore, con 19 dettagli originali. I dettagli mantengono distinti attendibilità, probabilità di precipitazione e grandine. Le tabelle mobili più ricche scorrono dentro regioni nominate, senza spezzare ore o unità. Home organizza le notizie e le mappe; Domani distingue macroaree, tempo e precipitazioni per fascia.

La ricerca locale contiene soltanto Milano. Altri luoghi e servizi sono destinazioni ufficiali o stati di indisponibilità. Il radar acquisito contiene messaggi di accesso bloccato nella mappa base: il redesign dichiara l’indisponibilità e offre il collegamento originale, conservando tutti i tile nell’archivio.

## Avvio

Dalla cartella del laboratorio, con Node moderno:

```sh
node scripts/serve.mjs
```

In questa sessione è disponibile anche:

```sh
/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/serve.mjs
```

La porta è 4187, bind esclusivamente `127.0.0.1`. Il server espone pagine, risorse e metadati previsti; blocca HTML grezzo, script di sviluppo, brief, `.impeccable/` e percorsi di attraversamento. Arrestarlo con Ctrl+C. La consultazione verificata usa HTTP locale; l’apertura diretta `file://` non è stata provata dal browser di questa sessione.

## Rigenerazione

Dalla cartella del laboratorio:

```sh
# Milano: rigenera dalla fonte immutata, riusando le risorse locali
/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 scripts/capture-milano.py
node scripts/build-redesign-data.mjs
node scripts/build-redesign.mjs
node scripts/build-lab.mjs
# Dopo una nuova acquisizione, oppure per rigenerare solo la barra:
node scripts/build-version-navigation.mjs
```

Dalla radice CVeDI, compilare i soli fogli sorgenti interessati:

```sh
node node_modules/@tailwindcss/cli/dist/index.mjs -i esempi/ilmeteo-lab/redesign/style.source.css -o esempi/ilmeteo-lab/redesign/style.css --minify
node node_modules/@tailwindcss/cli/dist/index.mjs -i esempi/ilmeteo-lab/lab.source.css -o esempi/ilmeteo-lab/lab.css --minify
```

Compilare anche la barra condivisa dalla radice:

```sh
node node_modules/@tailwindcss/cli/dist/index.mjs -i esempi/ilmeteo-lab/version-nav.source.css -o esempi/ilmeteo-lab/version-nav.css --minify
```

Ogni pagina mantiene la propria navigazione. Una tab sul bordo destro, centrata in altezza e visibile durante lo scorrimento, apre la pagina equivalente nell’altra versione con una transizione a tendina; movimento ridotto mantiene il passaggio immediato. Il controllo è nascosto in stampa.

Non modificare manualmente i CSS compilati. Gli asset autentici di produzione e i loro metadati sono già conservati. Per l’acquisizione leggere `sources/README.md`: `--refresh` cambia intenzionalmente il corpus e non serve a rigenerare il redesign corrente.

## Dati e provenienza

- `sources/`: HTML grezzo immutato, widget renderizzati e metadati.
- `assets/`: 226 risorse originali, hash e attribuzioni; due plate autentiche in `assets/plates/`.
- `data/`: dati numerici, normalizzazione e inventario lossless di 2.390 record.
- `redesign/data.js`: adapter completo con provenienza; `runtime.js`: soli dati necessari alle interazioni, 9.882 byte. Il documento completo non viene caricato dal client.
- `scripts/redesign-*.mjs`: contenuti, componenti e presentazione separati.
- `ANALISI.md` / `analisi.html`: due letture indipendenti e 44 criteri di miglioramento.
- `.impeccable/mocks/`: immagini di progetto e prompt; le immagini generate di logo e cartografia non sono dati di produzione.

Il corpus originale di Bologna conserva sette riepiloghi locali, dieci righe orarie e 120 campi di dettaglio. La pagina attiva di Milano conserva sette riepiloghi, 19 righe e 228 campi di dettaglio (`data/milano.json`, `sources/milano-manifest.json`, `assets/milano-manifest.json`). Il corpus condiviso conserva 16 notizie, 23 mappe tematiche Home, quattro mappe aggiuntive e otto mappe nazionali. I 28 tile radar rimangono nell’archivio. Il mapping derivato `2h3 → 26h3` è documentato e verificato sui dati; l’anomalia resta visibile nella documentazione della fonte. I metadati epoch originali sono conservati; le date mostrate seguono le ore leggibili della fonte e il passaggio `24 → 00:00` del giorno successivo.

## Verifica e limiti

Per verificare il pulsante con un’anteprima attiva: `node scripts/check-navigation.mjs` (porta configurabile con `ILMETEO_PORT`). I controlli coprono sei pagine a 1440, 390 e 320 px, cambio versione nei due sensi, tastiera, movimento ridotto, stampa e navigazione senza JavaScript. Screenshot e risultati sono in `reports/ilmeteo-lab/navigation/`.

Evidenze in `reports/ilmeteo-lab/` della radice:

- `original-postfix-check`: 19 controlli di parità delle copie originali.
- `redesign-live-checks`, `redesign-final-captures`, `redesign-correction-captures`: interazioni e dimensioni reali, incluse conversioni ripetute, ricerca, dettagli, filtri e zoom delle mappe.
- `finish-review.md`: revisione indipendente, disposition **ship** per il rendering web locale documentato; radar e leggibilità delle tabelle corretti.
- `final-scope-audit`: tre sorgenti e 226 asset integri, 323 riferimenti locali e due URL CSS esistenti, ID/associazioni validi, sei pagine HTTP 200 e route private 404.
- `redesign-contrast`: rapporti dei colori del sistema; `detector-redesign`: unico scan statico grezzo e relativi falsi positivi discussi nella revisione.

Desktop a 1280/1440 px e mobile a 390 px sono stati ispezionati. Il controllo a 320 px ha individuato e confermato la correzione dell’overflow delle mappe; il reflow CSS a 640 px è stato provato. Stampa verificata sul CSS, senza anteprima nativa osservata. Zoom browser nativo al 200%, `file://`, percorso completo con tecnologie assistive e prove con persone non sono attestati; 640 px non viene presentato come prova di zoom al 200%.

Il confronto automatico responsive Impeccable rimane **FAIL 69,19%**, aperto e non forzato. La revisione manuale esamina tutte le regioni e distingue adattamenti responsivi e asset autentici dai campioni disallineati. Il passaggio hero al formato del comp è circa 91%; nessuno dei due numeri equivale a una certificazione di usabilità.

Il laboratorio non è pubblicato online. Nessuna fonte, licenza o previsione è inventata; account, geolocalizzazione, invii, pubblicità e servizi remoti non vengono simulati.

Le icone del redesign sono generate con il tool integrato ImageGen: due atlanti trasparenti per sei condizioni meteo e due azioni di servizio, con PNG, prompt e manifest in `redesign/assets/icons/`. Le celle sono scelte in CSS; `scripts/redesign-icons.mjs` mantiene la corrispondenza con i codici originali. Fonti e artwork nelle copie originali e nelle mappe restano conservati.

La mappa nazionale principale del redesign è ridisegnata con ImageGen su richiesta dell’utente, con lo stile delle nuove icone. `redesign/assets/maps/` conserva PNG, prompt e manifest; `scripts/redesign-maps.mjs` possiede la sostituzione nelle tre pagine. La didascalia dichiara la grafica ridisegnata e collega la mappa acquisita per confronto.
