# CVeDI 2026/27 · Slidev

Presentazione di **54 slide**, ricostruita dalla [lezione introduttiva CVeDI](https://docs.google.com/presentation/d/1caK7BBFHEfVcSZTLqgjCA0fV9BYIa9H4aLXxnLJP_W4/edit) con lo stile del [Manuale booklet](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-1687).

## Pubblicazione

Repository: [cremarco/cvedi2627](https://github.com/cremarco/cvedi2627).

- Presentazione: [slides/](https://cremarco.github.io/cvedi2627/slides/).
- Archivio di 76 siti: [project/](https://cremarco.github.io/cvedi2627/project/).

`pnpm build:pages` genera `_site/slides/` e `_site/project/`. La sorgente dell’archivio resta in `progetti/`; immagini e collegamenti funzionano anche quando il sito è ospitato in una sottocartella. La presentazione usa URL con hash per funzionare su GitHub Pages senza riscritture lato server.

Il PDF viene generato manualmente dall’autore alla fine del lavoro; non viene rigenerato durante le revisioni delle slide. La pubblicazione funziona anche senza PDF. Se `cvedi-2026-2027.pdf` è presente nella radice, la build lo copia in `_site/slides/`.

L’indice dei progetti include filtri annuali, ricerca per nome e anteprime responsive, con stili e font locali. Dopo aver modificato `progetti/gallery.source.css`, eseguire `pnpm css:projects` per aggiornare `progetti/gallery.css`. La build Pages lo esegue automaticamente. Per l’anteprima dell’archivio basta un server statico dalla radice del repository e la pagina `/progetti/`.

[Riepilogo della compressione e dei controlli](PUBBLICAZIONE.md).

Ogni push sul ramo `main` pubblica automaticamente la build tramite `.github/workflows/pages.yml`. La build si arresta se il pacchetto supera 990 MB. Per un’altra sottocartella, impostare `PAGES_BASE=/nome-repository/`.

## Sviluppo locale

Richiede Node.js ≥22.12 e pnpm.

```sh
pnpm install
pnpm dev --port 3035
```

Lo script avvia Slidev e aggiorna il CSS Tailwind/daisyUI quando cambiano slide o componenti. Chiudendo il comando si arrestano entrambi i processi.

```sh
pnpm build
pnpm check
pnpm export --output cvedi-2026-2027.pdf --per-slide
```

La parete dei progetti usa tutti gli `screenshot.webp` in `progetti/`. Dodici anteprime riempiono la slide e si alternano una alla volta finché sono passati tutti i progetti; la rotazione si ferma fuori dalla slide e con la preferenza “movimento ridotto”. Dopo aver aggiunto o rimosso un progetto, eseguire `pnpm gallery`: il comando aggiorna le 76 anteprime leggere in `public/images/project-gallery/` e l'elenco in `data/projects.json` (richiede macOS per `sips`).

`check` richiede il server attivo su `http://localhost:3035`. Controlla tutte le slide, numerazione, immagini, contenuti fuori margine, superfici delle card, totali dei dati e una selezione di slide nel viewport stretto. Per un altro server: `SLIDEV_URL=http://localhost:3030 pnpm check`. Per salvare anche screenshot: `SLIDEV_SCREENSHOTS=/tmp/cvedi-check pnpm check`.

La build è in `dist/`. L’export PDF usa `--per-slide` per sincronizzare la barra globale con ciascuna pagina. `styles/daisy-built.css` è generato: non modificarlo direttamente.

Nella versione pubblicata online la barra dei comandi Slidev è nascosta. La navigazione con tastiera, gesti touch e collegamenti nelle slide resta disponibile. Il server Slidev e l’anteprima della build su localhost, indirizzi di loopback e rete locale mantengono la barra completa. `styles/index.ts` verifica sia la build di produzione sia il nome host; `styles/published.css` nasconde solo la barra del player, senza modificare i contenuti o la vista relatore.

## Dove modificare

| File o cartella | Responsabilità |
| --- | --- |
| `slides.md` | Testi, ordine, classe visiva e label del footer |
| `layouts/default.vue` | Canvas comune, stato attivo e numerazione automatica |
| `components/CvediCard.vue` | Card DaisyUI, titolo, contenuto e illustrazione opzionale |
| `components/NextMeIllustration.vue` | Illustrazioni coordinate del brief WHAT IF?, con percorsi compatibili con la pubblicazione |
| `components/ProcessTimeline.vue` | Percorsi metro a quattro tappe per progetto e approfondimento, con etichetta accessibile specifica |
| `components/CourseCalendar.vue` | Tabella del calendario con badge di stato |
| `data/calendar.json` | Date, tipo e orario dei 38 incontri |
| `components/GradeDistribution.vue` | Distribuzione e riepilogo di una categoria di voti |
| `components/GradeYearTable.vue` | Confronto annuale dei voti finali |
| `components/ProjectGallery.vue` | Parete delle anteprime dei progetti |
| `scripts/build-project-gallery.mjs` | Genera le anteprime dai progetti e il relativo elenco |
| `data/projects.json` | Progetti, anni accademici e percorso delle anteprime |
| `data/grade-summary.json` | Soli dati aggregati dei registri |
| `data/grades.ts` | Etichette delle fasce, formattazione e tipi condivisi |
| `global-top.vue` | Progress DaisyUI sincronizzato con la navigazione |
| `styles/tokens.css` | Palette, tipografia, spaziature e tempi del movimento |
| `styles/slides.css` | Layout, gerarchie, footer e varianti delle slide |
| `styles/components.css` | Aspetto condiviso di card, tabelle, timeline e progress |
| `styles/grades.css` | Grafici e tabella dei voti |
| `styles/motion.css` | Animazioni, riduzione del movimento e stampa |
| `styles/daisy.css` | Tema DaisyUI e sorgenti Tailwind |

## Aggiungere una slide

```md
---
layout: default
class: content-slide course-section
footer: "Il percorso"
---

# Titolo della slide

<div class="cvedi-grid two">
  <CvediCard title="Primo argomento">
    <p>Testo della card.</p>
  </CvediCard>
  <CvediCard title="Secondo argomento">
    <p>Testo della card.</p>
  </CvediCard>
</div>
```

La numerazione usa il contesto nativo di Slidev: inserire o rimuovere una slide non richiede aggiornamenti manuali. Tutti i layout centrano verticalmente titolo e contenuti come un unico blocco, entro lo spazio riservato al contenuto. Il footer resta ancorato in basso. `two`, `three` e `four` indicano le colonne delle griglie. Il canvas 16:9 viene scalato anche nel browser stretto, conservando la composizione della slide.

Le illustrazioni si passano esplicitamente: `illustration="/images/flat/lesson-theory.svg"`. La famiglia vettoriale è in `public/images/flat/`. `illustration-variant="roomy"` riserva spazio sotto il testo; `illustration-variant="compact"` riduce il disegno nelle griglie a due righe. I grafici si inseriscono con `<GradeDistribution category="project" />`; le altre categorie sono `oral`, `written` e `final`. Aggiornare i dati JSON aggiorna barre, percentuali, campione e mediana visualizzata.

## Contenuti e fonti

- [DESIGN.md](DESIGN.md): palette e regole visive.
- [DATA.md](DATA.md): fonti e metodo di aggregazione dei voti.
- [Calendario CVeDI 2026/27](https://docs.google.com/spreadsheets/d/1QVVpKXtLz6C3KHJSRF7iA4GvdZtmf0rauWHFnpqt8Vo/edit): fonte del calendario; include incontri annullati, 35 ore di lezione e 36 di esercitazione.
- `public/images/source/`: immagini della presentazione originale.

Le slide 23–30 contengono il brief **WHAT IF?** per il 2026/27: inventare un’organizzazione che offra servizi del 2050 basati sulle potenzialità future dell’AI e realizzarne il sito web responsive, solo in italiano. Le slide distinguono capacità emergenti e ipotesi future, guidano il concept e definiscono pagine, percorso dell’utente e requisiti. I comportamenti dell’AI possono essere simulati. Le tre illustrazioni sono generate con lo strumento integrato imagegen e rigenerate in uno stile geometrico coordinato con i tracciati metro del booklet. Originali, riferimento visivo e prompt sono in `assets/next-me/`; le slide caricano le versioni `*-v2.webp` ottimizzate in `public/images/generated/next-me/`. Il manifest della seconda versione è `assets/next-me/imagegen-manifest-v2.json`; la prima versione resta disponibile.

Appelli e scadenze non confermati restano esplicitamente indicati. Nell’indice delle lezioni è attivo solo “Introduzione”, collegato alla slide 4; gli altri quattro pulsanti restano disabilitati.
