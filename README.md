# CVeDI 2026/27

Presentazione Slidev del corso Comunicazione visiva e design delle interfacce: 174 slide visibili, 68 della terza lezione conservate ma disattivate. Note del relatore assenti; vista presenter disabilitata.

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
| `pnpm build` | SPA delle slide in `dist/` |
| `pnpm build:pages` | Slide e archivio in `_site/` |
| `pnpm export` | Export Slidev, soltanto quando richiesto |
| `pnpm clean` | Elimina output, cache Slidev e rapporti locali |
| `pnpm gallery` | Rigenera galleria e anteprime su macOS |
| `pnpm check:source` | Parser, assenza note, sequenze, dati, fonti e immagini |
| `pnpm check` | Controlli completi nel browser |
| `pnpm check:layout` | Geometrie, didascalie e dialoghi |
| `pnpm check:motion` | Animazioni, movimento ridotto ed export |
| `pnpm check:progress` | Contatore e avanzamento per set |
| `pnpm check:typography` | Font locali, cifre tabulari e fallback |
| `pnpm check:projects` | Archivio dei siti |
| `pnpm check:links` | Collegamenti locali |

I controlli slide usano `http://localhost:3035`; `SLIDEV_URL` permette un'altra origine. Preferire una build su un server statico separato per evitare la sincronizzazione con le schede aperte. `SLIDEV_SCREENSHOTS` salva prove visive in una cartella scelta: usare `reports/` o una cartella temporanea.

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

Le immagini generate attive sono registrate in `assets/theme-imagegen/manifest-v1.json`; PNG originali e WebP selezionati conservano pixel e trasparenza. Licenze dei font e provenienza degli artefatti storici restano insieme agli asset.
