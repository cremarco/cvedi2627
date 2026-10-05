# Strumenti del progetto

Eseguire i comandi dalla radice del repository. I nomi degli script sono minuscoli con trattini; le cartelle indicano la loro funzione.

| Cartella | Contenuto |
| --- | --- |
| `build/` | Build Pages, anteprime della parete dei progetti e screenshot dei siti 2025/26 |
| `check/` | Verifiche delle slide, dei siti, dei collegamenti e delle risorse locali |
| `check/fixtures/` | Elenco delle pagine dell’archivio da controllare per i contenuti fuori margine |
| `optimize/` | Compressione di immagini e video, minificazione e applicazione di candidati verificati |
| `dev.mjs` | Avvio di Slidev e del compilatore CSS in modalità watch |

## Comandi abituali

```sh
pnpm dev --port 3035
pnpm build:pages
pnpm gallery
pnpm check:source
pnpm check
pnpm check:projects
pnpm check:links
```

`check:source` controlla i sorgenti, i dati e le immagini locali senza browser né server; viene eseguito anche nella build GitHub Actions. `slide-source.mjs` è condiviso dal controllo browser per evitare verifiche duplicate.

`check` richiede Slidev su `http://localhost:3035`, oppure `SLIDEV_URL` per un server diverso. `check:projects` richiede un server statico dalla radice su `http://127.0.0.1:4173/progetti/`, oppure `PROJECTS_URL`. `PROJECTS_ALL=1 pnpm check:projects` verifica tutti i 76 siti. Entrambi i controlli browser usano Chromium tramite `playwright-chromium`.

`check:links` usa Python e Beautiful Soup (`beautifulsoup4`) e verifica anche maiuscole/minuscole e ancore dei siti. `python3 scripts/check/project-assets.py progetti` verifica le risorse HTML/CSS. Dopo la build, `python3 scripts/check/navigation.py` controlla i collegamenti nella struttura pubblicata in `_site/`.

`gallery` richiede `sips` su macOS. `build/project-screenshots.mjs` rigenera le anteprime dei sette siti 2025/26 e richiede Chromium, `cwebp` e un server dell’archivio su `http://127.0.0.1:8877`.

## Ottimizzazione e controlli storici

Gli strumenti in `optimize/` conservano le procedure delle passate di compressione documentate in [Ottimizzazione dell’archivio](../docs/archivio/ottimizzazione.md) e [Pubblicazione](../docs/pubblicazione.md). Modificano i file dell’archivio e non vengono eseguiti dalla build ordinaria. I programmi con interfaccia a riga di comando espongono le opzioni con `--help`.

Gli script `apply-pages-*`, `compress-pages-*` e `plan-pages-*`, insieme a `check/pages-assets.py`, usano i rapporti della passata del 30 settembre 2026 e cartelle di lavoro in `/tmp/cvedi-pages-*`. Per ripetere quella procedura servono i candidati, i backup e le dipendenze esterne indicati nei singoli script (tra cui Sharp, SVGO, Pillow e gli strumenti di codifica). Le cartelle temporanee e i rapporti non fanno parte del repository.
