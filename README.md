# CVeDI 2026/27

Presentazione Slidev del corso Comunicazione visiva e design delle interfacce: 173 slide online e 423 nell’anteprima locale. Le lezioni 04–09 sono disponibili soltanto in locale; le 68 slide della terza lezione restano disattivate. Note del relatore assenti; vista presenter disabilitata.

## Avvio

Node.js 22.12 o successivo, pnpm 10.13.1; la CI usa Node.js 24.

```sh
pnpm install --frozen-lockfile
pnpm dev --port 3035
```

Il comando compila Tailwind/daisyUI e mantiene il CSS aggiornato durante le modifiche.

## Comandi

| Comando | Risultato |
| --- | --- |
| `pnpm build` | SPA pubblicabile, 173 slide in `dist/` |
| `pnpm build:pages` | Slide pubblicabili e archivio in `_site/` |
| `pnpm export` | Export Slidev, soltanto quando richiesto |
| `pnpm clean` | Elimina output, cache Slidev e rapporti locali |
| `pnpm gallery` | Rigenera galleria e anteprime su macOS |
| `pnpm check:source` | Parser, assenza note, sequenze, dati, fonti e immagini |
| `pnpm check:publication dist` | Separazione locale/online e assenza degli asset locali nella build |
| `pnpm check` | Controlli completi nel browser |
| `pnpm check:layout` | Geometrie, didascalie e dialoghi |
| `pnpm check:motion` | Animazioni, movimento ridotto ed export |
| `pnpm check:progress` | Contatore e avanzamento per set |
| `pnpm check:typography` | Font locali, cifre tabulari e fallback |
| `pnpm check:projects` | Archivio dei siti |
| `pnpm check:links` | Collegamenti locali |

I controlli slide usano `http://localhost:3035`; `SLIDEV_URL` permette un'altra origine. Per verificare tutte le 423 slide usare un’istanza dev su una porta separata dalle schede dell’utente; per la versione online usare un server statico della build. `SLIDEV_SCREENSHOTS` salva prove visive in una cartella scelta: usare `reports/` o una cartella temporanea.

## Struttura

- `slides.md`, `lezioni/`: contenuti e frontmatter.
- `components/`, `layouts/`, `composables/`: presentazione e interazione Vue/Slidev.
- `utils/slide-sets.ts`: registro di palette, etichette e numeri delle lezioni.
- `data/`: calendari, voti aggregati, progetti ed esempi UX.
- `styles/`: tema daisyUI, token, strutture, tipografia e movimento.
- `public/`: immagini e font caricati dal sito.
- `assets/`: originali selezionati, provenienza e fonti.
- `progetti/`: archivio dei 76 siti; `materiali/`: materiali didattici originali.
- `scripts/`: build e controlli riproducibili.

Il CSS compilato deriva da `styles/daisy.css`: non modificarlo manualmente. L'archivio ha un tema indipendente in `progetti/gallery.source.css`. [Sistema visivo](DESIGN.md), [dati dei voti](docs/dati.md) e `docs/fonti/` documentano le sole regole e fonti correnti.

## Pubblicazione

GitHub Actions pubblica `main` con `pnpm build:pages` nel percorso `/cvedi2627/`. La build include l'archivio e verifica il budget di 990 MB. FFmpeg deve essere nel PATH o in `PAGES_FFMPEG`: ottimizza soltanto le copie dei video esportate, preservando i sorgenti. `build-info.json` identifica il commit distribuito e `media-optimization.json` il trattamento dei media.

Gli import delle lezioni 04–09 dichiarano `localOnly: true`. Il preparser Slidev li disabilita durante ogni build e rimuove il blocco `LocalOnly` dall’indice prima della compilazione. Slide, alias e panoramica online non contengono queste lezioni; le immagini esclusive in `images/processo-ux` sono escluse dall’output. `pnpm dev` conserva le sei lezioni e i collegamenti. I controlli delle sorgenti verificano entrambe le modalità.

Le immagini generate attive sono registrate in `assets/theme-imagegen/manifest-v1.json`; PNG originali e WebP selezionati conservano pixel e trasparenza. Licenze dei font e provenienza degli artefatti storici restano insieme agli asset.
