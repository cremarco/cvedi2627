# Strumenti

Eseguire dalla radice; i comandi abituali sono nel README principale.

- `dev.mjs`: compilazione CSS, watch Tailwind e avvio Slidev, con terminazione coordinata.
- `clean.mjs`: elimina build, export, cache di revisione, metadati macOS e cartelle vuote; conserva sorgenti, dipendenze e rapporti citati da manifest o documentazione. `pnpm clean --dry-run` mostra il piano senza cancellare file; `pnpm check:clean` verifica la pulizia.
- `build/`: Pages, budget dei media, galleria e anteprime.
- `check/`: controlli riproducibili; `slide-source.mjs` usa il parser installato, `browser.mjs` condivide l'attesa del rendering.
- `optimize/`: conversione delle immagini in WebP.

`build/web-design-examples.mjs` esporta le quattro pagine di Caffè TTC, i 21 CSS e le risorse usate, con licenze e metadati degli asset. Il plugin in `utils/web-design-examples.mjs` espone `/web-design-examples/` durante lo sviluppo; Pages copia il sito nella radice del progetto. `pnpm check:web-examples` verifica varianti, risorse, query e navigazione in dev, nella build e sotto `/cvedi2627/`; `SLIDEV_URL` sceglie l'anteprima isolata, `WEB_EXAMPLES_REPORT` la cartella del rapporto.

Per le illustrazioni: `build/illustration-restyle.mjs` prepara una sola volta il censimento; `build/illustration-prompts.mjs` prepara i job ancora pendenti. Lo strumento integrato ImageGen produce i raster. `build/illustration-ingest.py ID PNG` conserva l’originale e verifica la conversione lossless; `--repair` crea una variante senza sovrascrivere la precedente. `build/illustration-publish.mjs` aggiorna solo gli asset accettati visivamente. `check/illustration-files.py --complete` verifica i 44 asset e le revisioni; `check/illustrations.mjs` verifica tutti i loro usi nelle tre modalità, con eventuali numeri di slide per un controllo mirato. I rapporti restano in `reports/outline-v3/`.

I controlli browser usano Chromium di `playwright-chromium`. `SLIDEV_URL` cambia l'anteprima; eseguire le suite una alla volta. `SLIDEV_SCREENSHOTS` salva render in `reports/` o in una cartella temporanea.

`check:covers` verifica tutte le aperture e la chiusura su desktop, viewport stretto e stampa: geometrie distinte, testo nel canvas, percorsi completi e almeno 16 px di distanza oltre lo spessore della linea.

`check:ux-course` verifica l’ordine cromatico dei dodici gruppi locali, le proporzioni e l’assenza di cornici delle figure registrate, il corpo delle tabelle e l’ingrandimento da tastiera delle lezioni 04–10 su desktop e viewport stretto.

`check:gestalt` verifica tutte le 111 slide su desktop, viewport stretto e stampa, con copertura delle 89 tavole e di tutte le immagini dello snapshot corrente, caricamento dei pixel, margini, posizione dei titoli, ingrandimento da tastiera e ritorno del focus. Rapporti e anteprime sono in `reports/gestalt-lesson/`. `python3 scripts/build/lesson-06-gestalt.py` rigenera la lezione, le figure e la mappa delle fonti dagli originali conservati.

`check:publication` verifica 793 slide locali e 717 online, le 114 slide pubblicate di Tipografia, l’esclusione delle lezioni 09–10 dai file pubblicati, alias e indice. Passando `dist` o `_site/slides` verifica anche l’esclusione delle figure locali dalla build e la conservazione degli asset tipografici e delle anteprime citate. Il preparser in `setup/preparser.ts` e il plugin Vite applicano questa regola a ogni build; Pages verifica l’output prima di proseguire.

`check:publication:browser` confronta un dev locale (`SLIDEV_URL`) e un server statico della build (`PUBLISHED_SLIDEV_URL`). Verifica indice su desktop, viewport stretto e stampa, conteggi reali, alias e navigazione alle sette lezioni pubblicate e alle tre locali.

L’archivio dei siti è nel repository autonomo `cremarco/cvedi-progetti`. `pnpm check:archive` verifica reindirizzamenti, collegamenti e anteprime locali nella build del corso.

`gallery` usa `sips` su macOS e le immagini pubblicate dall’archivio autonomo. Pages richiede FFmpeg nel PATH o in `PAGES_FFMPEG`; l'ottimizzazione riguarda solo le copie esportate. Non modificare i materiali originali senza verificarne scopo e risultato.

Le presentazioni autonome sono costruite da `build/lesson-decks.mjs`; il catalogo e la selezione dei sorgenti sono in `utils/lesson-decks.mjs`. `pnpm check:decks` verifica che gli altri file non vengano importati, che ogni slide compaia una sola volta e che i contenuti siano integri. `pnpm check:decks:browser` usa la build separata in `dist/`, oppure `DECK_SITE` e `DECK_BASE` per il percorso Pages. I controlli del deck completo (`check`, `check:layout`, `check:motion`, `check:progress`, `check:typography`) usano `pnpm dev:full --port 3035`. La versione completa resta disponibile per regressioni ed esportazione; il sito e l’anteprima ordinaria aprono le lezioni separatamente.
