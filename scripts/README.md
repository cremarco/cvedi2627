# Strumenti

Eseguire dalla radice; i comandi abituali sono nel README principale.

- `dev.mjs`: compilazione CSS, watch Tailwind e avvio Slidev, con terminazione coordinata.
- `clean.mjs`: elimina soltanto output e rapporti locali.
- `build/`: Pages, budget dei media, galleria e anteprime.
- `check/`: controlli riproducibili; `slide-source.mjs` usa il parser installato, `browser.mjs` condivide l'attesa del rendering.
- `optimize/`: utilità generiche per immagini, video e archivio.

I controlli browser usano Chromium di `playwright-chromium`. `SLIDEV_URL` cambia l'anteprima; eseguire le suite una alla volta. `SLIDEV_SCREENSHOTS` salva render in `reports/` o in una cartella temporanea.

Per l'archivio: `PROJECTS_URL` cambia il server, `PROJECTS_ALL=1 pnpm check:projects` controlla tutti i siti. `check:links` richiede Python e Beautiful Soup; `check/project-assets.py` controlla risorse locali e `check/navigation.py` l'output Pages.

`gallery` usa `sips` su macOS. `build/project-screenshots.mjs` richiede Chromium, `cwebp` e un server dell'archivio. Pages richiede FFmpeg nel PATH o in `PAGES_FFMPEG`; l'ottimizzazione riguarda solo le copie esportate. Non modificare i materiali originali senza verificarne scopo e risultato.
