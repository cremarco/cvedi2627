# CVeDI 2026/27

Il repository raccoglie **cinque progetti**: home del corso, presentazioni Slidev, booklet Typst, Caffè TTC e iLMeteo. Ogni progetto ha una cartella in `progetti/`; originali e risorse comuni sono separati in `risorse-condivise/`. Un unico `package.json` mantiene i comandi dalla radice.

Presentazioni Slidev del corso Comunicazione visiva e design delle interfacce: 720 slide online e 1317 nell’anteprima locale. Ogni lezione si apre dall’indice e carica soltanto il proprio contenuto. Le nove esercitazioni importate da Drive sono disponibili soltanto in locale; il relativo indice resta visibile online con pulsanti disabilitati. Il menu iniziale contiene 7 slide; i comandi «Menu lezioni» e «Menu esercitazioni» permettono di tornare al rispettivo indice. La lezione 09 «Griglie e layout» è disponibile soltanto in locale, mentre la lezione 06 «Gestalt», con 111 slide dalle 89 tavole correnti del booklet, è pubblicata online insieme alle 59 slide di Colore. La lezione 07 «Colore e significato» conta 59 slide per 120 minuti, con proprietà e modelli del colore, cinque schemi cromatici con esempi dal booklet e tredici integrazioni sui contesti culturali da fonti verificate e materiali d’archivio, comprese convenzioni finanziarie, lingua, rituali e preferenze. Le lezioni 03, 04 e 05, rispettivamente di 67, 86 e 105 slide, sono attive in entrambe le modalità. La vista relatore è disponibile dal pulsante «Presenter Mode» nella barra strumenti di Slidev, con slide corrente, anteprima della successiva e timer; «Play Mode» torna alla presentazione. Per il pubblico aprire la stessa presentazione in una seconda finestra. Le 116 slide di Tipografia sono disponibili anche online e includono note semplici da leggere nel pannello del relatore; le 63 slide locali di Griglie hanno un copione italiano pronto per la sintesi vocale, mentre le altre lezioni restano senza note.

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
| `pnpm build` | Menu e presentazioni autonome, 720 slide complessive in `progetti/slide/dist/` |
| `pnpm build:pages` | Home, slide, esempi e collegamenti all’archivio pubblicabili in `_site/` |
| `pnpm css:home` | Compila `progetti/home/home.source.css` in `progetti/home/home.css` |
| `pnpm build:caffe-ttc` | Rigenera le quattro pagine, i dati e i 21 stili di Caffè TTC |
| `pnpm build:ilmeteo` | Rigenera stili, mappe e navigazione del confronto iLMeteo |
| `pnpm build:booklet` | Compila il volume Typst in `progetti/booklet/build/` |
| `pnpm check:booklet` | Controlla ambiente, font, asset e PDF tramite CLI |
| `pnpm preview:booklet --pages 8-9` | Produce i soli PNG delle pagine fisiche richieste dal PDF già compilato |
| `pnpm export` | Export Slidev, soltanto quando richiesto |
| `pnpm clean` | Elimina output e cache rigenerabili, conservando sorgenti, originali, archivi e tutti i rapporti |
| `pnpm clean --dry-run` | Mostra i file eliminabili senza modificarli |
| `pnpm check:clean` | Verifica la conservazione di sorgenti, tutti i rapporti, originali e dipendenze |
| `pnpm gallery` | Rigenera galleria e anteprime su macOS |
| `pnpm check:source` | Rigenera i mirror, poi verifica parser, note richieste, sequenze, dati, fonti e immagini |
| `pnpm check:exercises` | Esercitazioni: fonti complete, desktop, viewport stretto, stampa e indice online disabilitato |
| `pnpm check:exercise-native` | 83 esempi HTML/CSS e schemi nativi: geometrie, testo e assenza di bitmap |
| `pnpm check:frameworks` | Esempi Tailwind e daisyUI: vincoli nativi, tastiera, focus, temi e responsive |
| `pnpm check:publication progetti/slide/dist` | Separazione locale/online e assenza degli asset locali nella build |
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

I controlli slide usano `http://localhost:3035`; `check:accessibility-demos` usa `http://localhost:3045`. `SLIDEV_URL` permette un'altra origine. `pnpm dev` apre l’indice e avvia ogni lezione su richiesta. Per verificare tutte le 1317 slide con i controlli del percorso completo usare `pnpm dev:full --port 3035` su una porta isolata. `pnpm build` e `pnpm build:pages` pubblicano presentazioni separate con immagini e font condivisi; `pnpm build:full` mantiene la SPA completa per confronti. `pnpm check:decks` verifica separazione e integrità dei contenuti; `pnpm check:decks:browser` verifica menu, confini delle lezioni, ritorno e vecchi collegamenti sulla build in `progetti/slide/dist/`. `SLIDEV_SCREENSHOTS` salva prove visive in una cartella scelta: usare `reports/` o una cartella temporanea. `A11Y_REPORT` seleziona la cartella delle prove dei confronti HTML, predefinita `reports/lesson-05/interactive/`.

`pnpm check:home` serve la build `_site/` con un server temporaneo e un browser isolato. Verifica la home alle basi `/` e `/cvedi2627/`, da 320 a 1440 px, termine automatico dell’animazione entro cinque secondi, movimento ridotto, skip link, forced colors, stampa e funzionamento senza JavaScript. `COURSE_HOME_SITE` sceglie una build diversa; `COURSE_HOME_REPORT` sceglie il percorso di rapporti, screenshot e PDF, predefinito `reports/course-home/`.

## Struttura

| Progetto | Cartella | Contenuti |
| --- | --- | --- |
| Home del corso | `progetti/home/` | Ingresso, animazione metro e navigazione verso i materiali |
| Slide ed esercitazioni | `progetti/slide/` | Markdown, componenti Vue, layout, dati, tema e risorse esclusive |
| Booklet | `progetti/booklet/` | Sorgenti Typst, capitoli, template, bibliografie, anteprime ed esperimenti |
| Caffè TTC | `progetti/caffe-ttc/` | Sito dimostrativo, quattro pagine, 21 stili e risorse proprie |
| iLMeteo | `progetti/ilmeteo/` | Versione originale, redesign, acquisizioni e confronto |

`risorse-condivise/` contiene immagini canoniche, font con licenze, dati, metro, fonti e `stili/tokens.css`, comune a home e slide. Le risorse esclusive e i rispettivi originali restano in `assets/` dentro il progetto. `materiali/` conserva i materiali didattici storici; `scripts/` coordina operazioni comuni, mentre gli strumenti specifici sono in `progetti/NOME/scripts/`. Le esercitazioni fanno parte di Slidev. L’[archivio dei 76 siti](https://cremarco.github.io/cvedi-progetti/) rimane nel repository autonomo [cremarco/cvedi-progetti](https://github.com/cremarco/cvedi-progetti).

La [guida alla struttura](docs/struttura-progetto.md) indica dove modificare sorgenti e asset, quali output si rigenerano e come distinguere originali, materiali e rapporti. Il [rapporto sui file non utilizzati](reports/riorganizzazione/verifica-file-inutilizzati.md) registra duplicati, cache e casi da conservare; l’intera cartella `reports/riorganizzazione/` mantiene le prove di questa verifica.

Il CSS compilato deriva da `progetti/slide/styles/daisy.css`: non modificarlo manualmente. L'archivio conserva il tema indipendente nel proprio repository; la home usa `progetti/home/home.source.css`, compilato con `pnpm css:home`. Il [contratto visivo delle slide](progetti/slide/docs/slidev/design.md), la [guida operativa dei set](progetti/slide/docs/design-slidev.md), il [sistema del booklet](progetti/booklet/DESIGN.md), i [dati dei voti](progetti/slide/docs/dati.md) e `progetti/slide/docs/fonti/` documentano regole e fonti correnti. Durante un’anteprima attiva usare `pnpm clean --keep-dev` per conservare il catalogo del server locale.

I PDF del booklet si compilano e verificano soltanto tramite CLI; consultarli in un lettore esterno. Per l’ispezione in Codex usare esclusivamente i PNG prodotti da `pnpm preview:booklet --pages 8-9`, secondo le regole di `AGENTS.md`.

## Pubblicazione

GitHub Actions pubblica `main` con `pnpm build:pages` nel percorso `/cvedi2627/`. La build pubblica home, slide, esempi e reindirizzamenti verso l’archivio autonomo, verificando il budget di 990 MB. FFmpeg deve essere nel PATH o in `PAGES_FFMPEG`: ottimizza soltanto le copie dei video esportate, preservando i sorgenti. `build-info.json` identifica il commit distribuito e `media-optimization.json` il trattamento dei media.

Tutte le pagine HTML pubblicate dichiarano `noindex`, comprese home, slide ed esempi; l’archivio applica la stessa regola nel proprio repository. `scripts/lib/indexing.mjs` normalizza le direttive presenti senza riscrivere il resto del markup; `scripts/build/noindex.mjs` applica la politica alle sole copie di pubblicazione e ne verifica la copertura completa. Vite applica la stessa regola al deck. `pnpm check:indexing` controlla casi limite e tutte le pagine di `_site`. Gli originali dei progetti rimangono intatti. La scansione resta consentita affinché i motori possano leggere `noindex`: un `robots.txt` sotto `/cvedi2627/` non governa il dominio. La scelta riguarda le pagine dei siti, mantenendo GitHub Pages; PDF e immagini aperti direttamente restano fuori da questa politica. Le eventuali voci già indicizzate vengono rimosse dai motori dopo una nuova scansione, come descritto nella [documentazione Google](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

La radice `/cvedi2627/` apre la home del corso. Le quattro destinazioni attive sono `/cvedi2627/slides/`, `https://cremarco.github.io/cvedi-progetti/`, `/cvedi2627/web-design-examples/index.html?stile=liquid` e `/cvedi2627/ilmeteo/redesign/index.html`. iLMeteo conserva il confronto con la versione originale e il relativo cambio di pagina. `progetti/home/scripts/build/course-home.mjs` inserisce l’SVG dai tracciati originali di `risorse-condivise/metro/geometric-animation.json` e copia CSS, JavaScript, Inter locale nei pesi 400/700 e licenza OFL in `_site/home-assets/`. `scripts/build/pages.mjs` compone il sito completo; `pnpm build:pages` compila anche il CSS della home.

Caffè TTC è consultabile separatamente dalle slide in `/web-design-examples/`: durante `pnpm dev` apre le quattro pagine e il selettore dei 21 stili. `pnpm build` prepara lo stesso percorso in `progetti/slide/dist/`; Pages lo pubblica in `/cvedi2627/web-design-examples/`. Gli URL delle varianti usano `?stile=`, per esempio `web-design-examples/menu.html?stile=y2k`. Le build rigenerano gli esempi e copiano le risorse usate dal sito, con licenze e provenienza; originali e varianti archiviate restano in `progetti/caffe-ttc/`.

Le lezioni 04 «Ricerca, contesto e inclusione», 05 «Accessibilità e design inclusivo», 06 «Gestalt», 07 «Colore e significato» e 08 «Tipografia» sono pubblicate integralmente e collegate nell’indice. L’import della lezione 09 «Griglie e layout» dichiara `localOnly: true`. Il preparser Slidev lo disabilita durante ogni build e rimuove il blocco `LocalOnly` dall’indice prima della compilazione. Slide, alias e panoramica online non contengono questa lezione; il build conserva in `images/processo-ux` soltanto le figure referenziate dalle lezioni pubblicate. `pnpm dev` conserva le sei lezioni attive del processo UX e i collegamenti, con Gestalt dopo Accessibilità e 09 «Griglie e layout» dopo 08 «Tipografia», a chiusura del percorso. Sono 540 slide: 477 nel curriculum 04–08 e 63 in Griglie. La lezione 09 applica il contratto visivo delle 01–08: tre card di obiettivi, una sola copertina metro propria `ux-grid` blue/Giallo limone senza diapositive divisorie intermedie, figure orizzontali larghe e ingrandimento condiviso. Le 63 slide pianificano 78 minuti, compresi i 15 delle attività con durata in `aside`; fonti e link, incluso MoMA per April Greiman, restano visibili. Il percorso va da relazioni, storia e costruzione ad adattamento allo schermo, accessibilità e caso di Sara, poi kit, matrice e due esercitazioni. Definizione, formula e confronto dei box model condividono una slide. Nove slide ridondanti o laterali sono conservate con piano, mapping e Markdown in `progetti/slide/assets/booklet/lezione-griglie/simplification-archive.json`. Alle 45 figure del booklet attive si affiancano sette SVG didattici originali, registrati in `progetti/slide/assets/slide-materials/griglie/manifest.json`; tutte le 53 figure precedentemente presenti nella lezione restano conservate. Il kit scaricabile «Luce e spazio» comprende testo di 80 parole, tre appuntamenti, nota e immagine simulata per le prove a 960 e 360 px CSS. «Prototipi e videogiochi» e «Test e implementazione», per 76 slide, sono archiviati fuori dal percorso in `archivedLessons` con `active: false`; i Markdown originali, le mappe, le fonti e gli asset restano conservati. I controlli delle sorgenti verificano entrambe le modalità.

Le immagini generate attive sono registrate in `progetti/slide/assets/theme-imagegen/manifest-v1.json`; PNG originali e WebP selezionati conservano pixel e trasparenza. Licenze dei font e provenienza degli artefatti storici restano insieme agli asset.

L’archivio è separato dalla build del corso. `scripts/lib/project-archive.mjs` registra la destinazione delle slide; `progetti/home/index.html` usa lo stesso URL, verificato da `pnpm check:home`. `pnpm gallery` aggiorna le anteprime da `gallery-data.json` e dagli screenshot pubblicati nel nuovo archivio. I vecchi URL `/cvedi2627/project/` e i collegamenti profondi sono reindirizzati tramite la pagina di compatibilità e `404.html`, conservando query e frammenti con JavaScript.
