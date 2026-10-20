# CVeDI 2026/27

Presentazioni Slidev del corso Comunicazione visiva e design delle interfacce: 720 slide online e 1292 nell’anteprima locale. Ogni lezione si apre dall’indice e carica soltanto il proprio contenuto. Le nove esercitazioni importate da Drive sono disponibili soltanto in locale; il relativo indice resta visibile online con pulsanti disabilitati. Il menu iniziale contiene 7 slide; i comandi «Menu lezioni» e «Menu esercitazioni» permettono di tornare al rispettivo indice. Le lezioni 09–10 sono disponibili soltanto in locale, mentre la lezione 06 «Gestalt», con 111 slide dalle 89 tavole correnti del booklet, è pubblicata online insieme alle 59 slide di Colore. La lezione 07 «Colore e significato» conta 59 slide per 120 minuti, con proprietà e modelli del colore, cinque schemi cromatici con esempi dal booklet e tredici integrazioni sui contesti culturali da fonti verificate e materiali d’archivio, comprese convenzioni finanziarie, lingua, rituali e preferenze. Le lezioni 03, 04 e 05, rispettivamente di 67, 86 e 105 slide, sono attive in entrambe le modalità. La vista relatore è disponibile dal pulsante «Presenter Mode» nella barra strumenti di Slidev, con slide corrente, anteprima della successiva e timer; «Play Mode» torna alla presentazione. Per il pubblico aprire la stessa presentazione in una seconda finestra. Le 116 slide di Tipografia sono disponibili anche online e includono note semplici da leggere nel pannello del relatore; le altre lezioni restano senza note.

## Avvio

Node.js 22.12 o successivo, pnpm 10.13.1; la CI usa Node.js 24.

```sh
pnpm install --frozen-lockfile
pnpm dev --port 3035
```

Il comando compila Tailwind/daisyUI e mantiene il CSS aggiornato durante le modifiche.
L’apertura automatica nel browser di sistema è facoltativa: aggiungere `--open`. Le anteprime di verifica possono così restare isolate dalle schede personali.

## Comandi

| Comando | Risultato |
| --- | --- |
| `pnpm build` | Menu e presentazioni autonome, 720 slide complessive in `dist/` |
| `pnpm build:pages` | Home, slide, archivio ed esempi autonomi pubblicabili in `_site/` |
| `pnpm css:home` | Compila `home/home.source.css` in `home/home.css` |
| `pnpm export` | Export Slidev, soltanto quando richiesto |
| `pnpm clean` | Elimina build, export, cache e rapporti non referenziati, preservando sorgenti e provenienza |
| `pnpm clean --dry-run` | Mostra i file eliminabili senza modificarli |
| `pnpm check:clean` | Verifica la conservazione di sorgenti, rapporti referenziati e dipendenze |
| `pnpm gallery` | Rigenera galleria e anteprime su macOS |
| `pnpm check:source` | Parser, copertura delle note richieste, sequenze, dati, fonti e immagini |
| `pnpm check:exercises` | Esercitazioni: fonti complete, desktop, viewport stretto, stampa e indice online disabilitato |
| `pnpm check:frameworks` | Esempi Tailwind e daisyUI: vincoli nativi, tastiera, focus, temi e responsive |
| `pnpm check:publication dist` | Separazione locale/online e assenza degli asset locali nella build |
| `pnpm check` | Controlli completi nel browser |
| `pnpm check:layout` | Geometrie, didascalie e dialoghi |
| `pnpm check:gestalt` | 111 slide Gestalt: fonti, immagini, desktop, viewport stretto, stampa e ingrandimento |
| `pnpm check:accessibility-demos` | 17 confronti HTML: interazioni, viewport stretto e stampa |
| `pnpm check:motion` | Animazioni, movimento ridotto ed export |
| `pnpm check:color-wheels` | Ruote di Colore: vettori originali, ripetizione, zoom, viewport stretto e stampa |
| `pnpm check:progress` | Contatore e avanzamento per set |
| `pnpm check:typography` | Font locali, cifre tabulari e fallback |
| `pnpm check:home` | Home Pages: URL, layout, movimento, tastiera e stampa |
| `pnpm check:archive` | Collegamenti all’archivio, reindirizzamenti e anteprime locali |

I controlli slide usano `http://localhost:3035`; `check:accessibility-demos` usa `http://localhost:3045`. `SLIDEV_URL` permette un'altra origine. `pnpm dev` apre l’indice e avvia ogni lezione su richiesta. Per verificare tutte le 1292 slide con i controlli del percorso completo usare `pnpm dev:full --port 3035` su una porta isolata. `pnpm build` e `pnpm build:pages` pubblicano presentazioni separate con immagini e font condivisi; `pnpm build:full` mantiene la SPA completa per confronti. `pnpm check:decks` verifica separazione e integrità dei contenuti; `pnpm check:decks:browser` verifica menu, confini delle lezioni, ritorno e vecchi collegamenti sulla build in `dist/`. `SLIDEV_SCREENSHOTS` salva prove visive in una cartella scelta: usare `reports/` o una cartella temporanea. `A11Y_REPORT` seleziona la cartella delle prove dei confronti HTML, predefinita `reports/lesson-05/interactive/`.

`pnpm check:home` serve la build `_site/` con un server temporaneo e un browser isolato. Verifica la home alle basi `/` e `/cvedi2627/`, da 320 a 1440 px, termine automatico dell’animazione entro cinque secondi, movimento ridotto, skip link, forced colors, stampa e funzionamento senza JavaScript. `COURSE_HOME_SITE` sceglie una build diversa; `COURSE_HOME_REPORT` sceglie il percorso di rapporti, screenshot e PDF, predefinito `reports/course-home/`.

## Struttura

- `slides.md`, `lezioni/`: contenuti e frontmatter.
- `components/`, `layouts/`, `composables/`: presentazione e interazione Vue/Slidev.
- `utils/slide-sets.ts`: registro di palette, etichette e numeri delle lezioni.
- `data/`: calendari, voti aggregati, progetti ed esempi UX.
- `styles/`: tema daisyUI, token, strutture, tipografia e movimento.
- `home/`: contenuti, CSS sorgente e controllo del movimento della home Pages.
- `public/`: immagini e font caricati dal sito.
- `assets/`: originali selezionati, provenienza e fonti.
- [Archivio dei 76 siti](https://cremarco.github.io/cvedi-progetti/): repository autonomo [cremarco/cvedi-progetti](https://github.com/cremarco/cvedi-progetti).
- `materiali/`: materiali didattici originali.
- `scripts/`: build e controlli riproducibili.

Il CSS compilato deriva da `styles/daisy.css`: non modificarlo manualmente. L'archivio conserva il tema indipendente nel proprio repository; la home usa `home/home.source.css`, compilato con `pnpm css:home`. [Sistema delle slide](docs/design-slidev.md), [sistema del booklet](DESIGN.md), [dati dei voti](docs/dati.md) e `docs/fonti/` documentano regole e fonti correnti. Durante un’anteprima attiva usare `pnpm clean --keep-dev` per conservare il catalogo del server locale.

## Pubblicazione

GitHub Actions pubblica `main` con `pnpm build:pages` nel percorso `/cvedi2627/`. La build pubblica home, slide, esempi e reindirizzamenti verso l’archivio autonomo, verificando il budget di 990 MB. FFmpeg deve essere nel PATH o in `PAGES_FFMPEG`: ottimizza soltanto le copie dei video esportate, preservando i sorgenti. `build-info.json` identifica il commit distribuito e `media-optimization.json` il trattamento dei media.

Tutte le pagine HTML pubblicate dichiarano `noindex`, comprese home, slide ed esempi; l’archivio applica la stessa regola nel proprio repository. `utils/indexing.mjs` normalizza le direttive presenti senza riscrivere il resto del markup; `scripts/build/noindex.mjs` applica la politica alle sole copie di pubblicazione e ne verifica la copertura completa. Vite applica la stessa regola al deck. `pnpm check:indexing` controlla casi limite e tutte le pagine di `_site`. Gli originali dei progetti rimangono intatti. La scansione resta consentita affinché i motori possano leggere `noindex`: un `robots.txt` sotto `/cvedi2627/` non governa il dominio. La scelta riguarda le pagine dei siti, mantenendo GitHub Pages; PDF e immagini aperti direttamente restano fuori da questa politica. Le eventuali voci già indicizzate vengono rimosse dai motori dopo una nuova scansione, come descritto nella [documentazione Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

La radice `/cvedi2627/` apre la home del corso. Le destinazioni attive sono `/cvedi2627/slides/`, `https://cremarco.github.io/cvedi-progetti/` e `/cvedi2627/web-design-examples/index.html?stile=liquid`; iLMeteo rimane «In arrivo» senza link finché il sito riprogettato sarà pronto. `scripts/build/course-home.mjs` inserisce l’SVG dai tracciati originali di `assets/metro-map/geometric-animation.json` e copia CSS, JavaScript, Inter locale nei pesi 400/700 e licenza OFL in `_site/home-assets/`. `scripts/build/pages.mjs` compone il sito completo; `pnpm build:pages` compila anche il CSS della home.

Caffè TTC è consultabile separatamente dalle slide in `/web-design-examples/`: durante `pnpm dev` apre le quattro pagine e il selettore dei 21 stili. `pnpm build` prepara lo stesso percorso in `dist/`; Pages lo pubblica in `/cvedi2627/web-design-examples/`. Gli URL delle varianti usano `?stile=`, per esempio `web-design-examples/menu.html?stile=y2k`. Le build rigenerano gli esempi e copiano le risorse usate dal sito, con licenze e provenienza; originali e varianti archiviate restano in `esempi/caffe-luce/`.

Le lezioni 04 «Ricerca, contesto e inclusione», 05 «Accessibilità e design inclusivo», 06 «Gestalt», 07 «Colore e significato» e 08 «Tipografia» sono pubblicate integralmente e collegate nell’indice. Gli import delle lezioni 09–10 dichiarano `localOnly: true`. Il preparser Slidev li disabilita durante ogni build e rimuove il blocco `LocalOnly` dall’indice prima della compilazione. Slide, alias e panoramica online non contengono queste lezioni; il build conserva in `images/processo-ux` soltanto le figure referenziate dalle lezioni pubblicate. `pnpm dev` conserva le sette lezioni del processo UX e i collegamenti, con Gestalt dopo Accessibilità. I controlli delle sorgenti verificano entrambe le modalità.

Le immagini generate attive sono registrate in `assets/theme-imagegen/manifest-v1.json`; PNG originali e WebP selezionati conservano pixel e trasparenza. Licenze dei font e provenienza degli artefatti storici restano insieme agli asset.

L’archivio è separato dalla build del corso. `utils/project-archive.mjs` registra la destinazione delle slide; `home/index.html` usa lo stesso URL, verificato da `pnpm check:home`. `pnpm gallery` aggiorna le anteprime da `gallery-data.json` e dagli screenshot pubblicati nel nuovo archivio. I vecchi URL `/cvedi2627/project/` e i collegamenti profondi sono reindirizzati tramite la pagina di compatibilità e `404.html`, conservando query e frammenti con JavaScript.
