# Strumenti

Eseguire dalla radice; i comandi abituali sono nel README principale.

- `dev.mjs`: compilazione CSS, watch Tailwind e avvio Slidev, con terminazione coordinata.
- `clean.mjs`: elimina soltanto output e rapporti locali.
- `build/`: Pages, budget dei media, galleria e anteprime.
- `check/`: controlli riproducibili; `slide-source.mjs` usa il parser installato, `browser.mjs` condivide l'attesa del rendering.
- `optimize/`: utilità generiche per immagini, video e archivio.

Per le illustrazioni: `build/illustration-restyle.mjs` prepara una sola volta il censimento; `build/illustration-prompts.mjs` prepara i job ancora pendenti. Lo strumento integrato ImageGen produce i raster. `build/illustration-ingest.py ID PNG` conserva l’originale e verifica la conversione lossless; `--repair` crea una variante senza sovrascrivere la precedente. `build/illustration-publish.mjs` aggiorna solo gli asset accettati visivamente. `check/illustration-files.py --complete` verifica i 44 asset e le revisioni; `check/illustrations.mjs` verifica tutti i loro usi nelle tre modalità, con eventuali numeri di slide per un controllo mirato. I rapporti restano in `reports/outline-v3/`.

I controlli browser usano Chromium di `playwright-chromium`. `SLIDEV_URL` cambia l'anteprima; eseguire le suite una alla volta. `SLIDEV_SCREENSHOTS` salva render in `reports/` o in una cartella temporanea.

`check:covers` verifica tutte le aperture e la chiusura su desktop, viewport stretto e stampa: geometrie distinte, testo nel canvas, percorsi completi e almeno 16 px di distanza oltre lo spessore della linea.

`check:ux-course` verifica l’ordine cromatico degli undici gruppi locali, le proporzioni e l’assenza di cornici delle 138 figure originali, il corpo delle tabelle e l’ingrandimento da tastiera delle lezioni 04–09 su desktop e viewport stretto.

`check:publication` verifica 491 slide locali e 241 online, assenza delle lezioni 04–09 dai file importati, alias e indice. Passando `dist` o `_site/slides` verifica anche l’esclusione delle figure locali dalla build. Il preparser in `setup/preparser.ts` e il plugin Vite applicano questa regola a ogni build; Pages verifica l’output prima di proseguire.

`check:publication:browser` confronta un dev locale (`SLIDEV_URL`) e un server statico della build (`PUBLISHED_SLIDEV_URL`). Verifica indice su desktop, viewport stretto e stampa, conteggi reali, alias e navigazione alle sei lezioni locali.

Per l'archivio: `PROJECTS_URL` cambia il server, `PROJECTS_ALL=1 pnpm check:projects` controlla tutti i siti. `check:links` richiede Python e Beautiful Soup; `check/project-assets.py` controlla risorse locali e `check/navigation.py` l'output Pages.

`gallery` usa `sips` su macOS. `build/project-screenshots.mjs` richiede Chromium, `cwebp` e un server dell'archivio. Pages richiede FFmpeg nel PATH o in `PAGES_FFMPEG`; l'ottimizzazione riguarda solo le copie esportate. Non modificare i materiali originali senza verificarne scopo e risultato.
