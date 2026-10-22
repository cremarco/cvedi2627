# iLMeteo · versione precedente e redesign

L’ingresso `index.html` apre `redesign/index.html`. Home, Milano e Meteo domani sono disponibili in `redesign/` e `originale/`, con confronto animato fra le pagine corrispondenti. I vecchi indirizzi `bologna.html` conservano il reindirizzamento a Milano. La build Pages pubblica il sito in `/ilmeteo/`.

Home e Italia sono acquisite l’8 ottobre 2026, Milano il 9 ottobre. Le mappe Leaflet e il radar sono illustrativi; la timeline distingue ore passate, ora di riferimento e ore previste. Testi, notizie, attribuzioni, annunci e comportamento del confronto restano quelli correnti. Fonti, originali e licenze delle risorse attive sono conservati nel progetto.

## Sorgenti e responsabilità

| File | Responsabilità |
| --- | --- |
| `redesign/*.html` | Contenuti, struttura semantica e fallback senza JavaScript |
| `redesign/home.source.css`, `style.source.css` | Tema, composizione e componenti daisyUI; i CSS risultanti sono compilati |
| `redesign/ui.js` | Tastiera e selezione delle tab; aggiornamenti raggruppati per fotogramma |
| `redesign/app.js` | Navbar, ticker, adattamento e selettori delle mappe |
| `redesign/icons.js` | Applicazione dei cataloghi Heroicons e meteo agli elementi dell’interfaccia |
| `redesign/home-ui.js` | Ricerca locale, avvisi, previsioni sintetiche e FAB |
| `redesign/world-weather-map.js` | Mappa mondiale Leaflet, selezione paese e ricerca paese/città |
| `scripts/build-world-map.mjs` | Catalogo di 242 paesi e territori, SVG mondiale e manifest da Natural Earth locale |
| `redesign/weather-map-base.js` | Cartografia Leaflet condivisa |
| `redesign/primary-weather-map.js` | Sei viste meteorologiche e player radar |
| `redesign/forecast-interactive.js` | Selezione e dettagli delle quattro mappe giornaliere |
| `redesign/*weather-map.css`, `forecast-interactive.css` | Stili cartografici scritti a mano |
| `data/leaflet-weather.mjs`, `supplementary.json`, `home-promotions.json` | Dati illustrativi, testi acquisiti e campagne |
| `scripts/build-*.mjs` | Cataloghi, mappe statiche, moduli editoriali, CSS e confronto |
| `utils/ilmeteo.mjs`, `utils/ilmeteo-assets.mjs` nella radice del repository | File pubblici e risoluzione delle dipendenze locali |

I moduli editoriali nei commenti `home-module:*` dell’HTML sono rigenerati da `build-home-modules.mjs`: modificare i dati o il generatore, conservando gli slot. Le altre parti dell’HTML sono sorgenti modificabili. Non modificare manualmente i CSS compilati, i cataloghi generati o le acquisizioni grezze per cambiare il redesign.

## Build e anteprima

```sh
pnpm build:ilmeteo
node progetti/ilmeteo/scripts/serve.mjs
```

Il server usa `127.0.0.1:4187`; `ILMETEO_PORT` cambia la porta. Anteprima Vite, server autonomo e copia Pages condividono l’elenco delle risorse pubbliche. Il risolutore segue riferimenti HTML, CSS, script e immagini responsive; i nomi dinamici del radar vengono dai dati e le risorse della libreria Leaflet sono dichiarate esplicitamente. Una risorsa mancante fa fallire l’esportazione.

Il sito esporta esclusivamente le risorse necessarie, i fallback e le licenze. PNG originali delle campagne, prompt, reference, cartografia completa, manifest delle fonti e script di sviluppo restano nei sorgenti. Aggiungendo un file, collegarlo al relativo HTML/CSS/script; per una risorsa costruita dinamicamente aggiornare il catalogo pubblico. Dopo una modifica dell’inventario, ricostruire e riavviare l’anteprima.

## Verifica

```sh
pnpm check:ilmeteo:source
pnpm check:ilmeteo
```

Il primo comando verifica esportazione, riferimenti, semantica della home e idempotenza del confronto. Il secondo ricostruisce e verifica in browser isolati navigazione bidirezionale, ricerca, annunci, tab, mappe, radar, tastiera, viewport stretti, stampa, movimento ridotto e lettura senza JavaScript.

I controlli delle singole aree restano eseguibili attraverso `scripts/check-navigation.mjs`, `check-home-modules.mjs`, `check-primary-weather-map.mjs` e `check-forecast-interactive.mjs`. Rapporti e screenshot sono in `reports/ilmeteo-*` nella radice del repository. La pulizia corrente e l’inventario pubblico sono documentati in `reports/ilmeteo-maintenance/`.

`ANALISI.md` conserva l’analisi storica. `sources/`, i dati di acquisizione e i manifest degli asset conservano la provenienza della versione precedente. Il vecchio generatore dell’analisi HTML e le varianti grafiche dismesse sono rimossi dal sito.
