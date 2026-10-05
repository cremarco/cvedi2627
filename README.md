# CVeDI 2026/27 · Slidev

Presentazione di **154 slide**, ricostruita dalla [lezione introduttiva CVeDI](https://docs.google.com/presentation/d/1caK7BBFHEfVcSZTLqgjCA0fV9BYIa9H4aLXxnLJP_W4/edit) con lo stile del [Manuale booklet](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-1687) e ampliata con i capitoli teorici Introduzione e Storia del design (Lezione 3).

## Pubblicazione

Repository: [cremarco/cvedi2627](https://github.com/cremarco/cvedi2627).

- Presentazione: [slides/](https://cremarco.github.io/cvedi2627/slides/).
- Archivio di 76 siti: [project/](https://cremarco.github.io/cvedi2627/project/).

`pnpm build:pages` genera `_site/slides/` e `_site/project/`. La sorgente dell’archivio resta in `progetti/`; immagini e collegamenti funzionano anche quando il sito è ospitato in una sottocartella. La presentazione usa URL con hash per funzionare su GitHub Pages senza riscritture lato server.

Il PDF viene generato manualmente dall’autore alla fine del lavoro; non viene rigenerato durante le revisioni delle slide. La pubblicazione funziona anche senza PDF. Se `cvedi-2026-2027.pdf` è presente nella radice, la build lo copia in `_site/slides/`.

L’indice dei progetti include filtri annuali, ricerca per nome e anteprime responsive, con stili e font locali. Dopo aver modificato `progetti/gallery.source.css`, eseguire `pnpm css:projects` per aggiornare `progetti/gallery.css`. La build Pages lo esegue automaticamente. Per l’anteprima dell’archivio basta un server statico dalla radice del repository e la pagina `/progetti/`.

I sei prototipi totem del 2024/25 si aprono in `progetti/totem.html`, sia dalla galleria sia dai loro collegamenti iniziali diretti. La vista conserva il viewport del progetto e lo adatta alla finestra, con i comandi “Ingrandisci” e “Adatta allo schermo”. “Apri originale” mostra il prototipo alle dimensioni native. Le dimensioni sono nel campo `screen` di `progetti/gallery-data.json`; `screen.pages` permette un formato diverso per singole schermate, come il tabellone di Magrathea. La navigazione interna viene salvata nell’URL della vista, così un aggiornamento della pagina mantiene la schermata raggiunta.

`node scripts/check-projects.mjs` verifica i 14 progetti 2024/25 e 2025/26: adattamento dei totem su desktop, telefono e tablet, ingrandimento, percorsi di avvio, filtri e risorse locali delle 227 pagine HTML. Richiede un server statico su `http://127.0.0.1:4173/progetti/`; usare `PROJECTS_URL` per un altro indirizzo. Il rapporto JSON è in `reports/browser-2026-10-02/verification.json`, oppure nella cartella indicata da `PROJECTS_REPORT`.

Per verificare tutti i 76 progetti e le 890 pagine HTML, usare `PROJECTS_ALL=1 node scripts/check-projects.mjs`. Il controllo include risorse locali, errori JavaScript e le 122 pagine elencate in `scripts/archive-layout-pages.json`, sulle quali erano stati individuati contenuti fuori margine. I totem sono verificati alle dimensioni native e adattati a desktop, telefono e tablet. `PROJECTS_RECHECK=1` ripete i controlli delle pagine fuori margine e delle pagine fallite nell’ultimo rapporto, conservando le verifiche già riuscite delle altre pagine.

[Riepilogo della compressione e dei controlli](PUBBLICAZIONE.md).

Ogni push sul ramo `main` pubblica automaticamente la build tramite `.github/workflows/pages.yml`. La build si arresta se il pacchetto supera 990 MB. Per un’altra sottocartella, impostare `PAGES_BASE=/nome-repository/`.

## Sviluppo locale

Richiede Node.js ≥22.12 e pnpm.

```sh
pnpm install
pnpm dev --port 3035
```

Lo script avvia Slidev e aggiorna il CSS Tailwind/daisyUI quando cambiano slide o componenti. Chiudendo il comando si arrestano entrambi i processi.

Il capitolo Introduzione si apre alla [slide 54](http://localhost:3035/#/54); le note del relatore sono nella [vista presenter](http://localhost:3035/#/presenter/54).

La Lezione 3, Storia del design, si apre alla [slide 104](http://localhost:3035/#/104); le note del relatore sono nella [vista presenter](http://localhost:3035/#/presenter/104).

```sh
pnpm build
pnpm check
pnpm export --output cvedi-2026-2027.pdf --per-slide
```

La parete dei progetti usa tutti gli `screenshot.webp` in `progetti/`. Dodici anteprime riempiono la slide e si alternano una alla volta finché sono passati tutti i progetti; la rotazione si ferma fuori dalla slide e con la preferenza “movimento ridotto”. Dopo aver aggiunto o rimosso un progetto, eseguire `pnpm gallery`: il comando aggiorna le 76 anteprime leggere in `public/images/project-gallery/` e l'elenco in `data/projects.json` (richiede macOS per `sips`).

`check` richiede il server attivo su `http://localhost:3035`. Controlla tutte le slide, numerazione, immagini, contenuti fuori margine, superfici delle card, totali dei dati e una selezione di slide nel viewport stretto. Verifica anche l’allineamento dei titoli, gli ingrandimenti con mouse e tastiera, la chiusura con Esc e il ritorno del focus. Per un altro server: `SLIDEV_URL=http://localhost:3030 pnpm check`. Per salvare anche screenshot: `SLIDEV_SCREENSHOTS=/tmp/cvedi-check pnpm check`. Per una verifica indipendente dalle schede Slidev aperte, usare una build servita da un server statico.

I rapporti di verifica della Lezione 3 sono in `reports/storia-design/report.json` per il server di sviluppo e `reports/storia-design-static/report.json` per la build statica: ciascuno copre 154 slide e 229 rendering, comprese 65 viste strette e 10 viste di stampa, senza errori o contenuti fuori margine.

La revisione dei layout è documentata in [LAYOUTS.md](LAYOUTS.md). Le prove in `reports/layout-review/final/` comprendono 154 slide desktop, 69 viste strette, 10 viste di stampa, due viste relatore e nove ingrandimenti. Le lezioni mantengono i colori del booklet; diagrammi, schermate e poster hanno più spazio e possono essere ingranditi cliccando sull’immagine.

La build è in `dist/`. L’export PDF usa `--per-slide` per sincronizzare la barra globale con ciascuna pagina. `styles/daisy-built.css` è generato: non modificarlo direttamente.

Nella versione pubblicata online la barra dei comandi Slidev è nascosta. La navigazione con tastiera, gesti touch e collegamenti nelle slide resta disponibile. Il server Slidev e l’anteprima della build su localhost, indirizzi di loopback e rete locale mantengono la barra completa. `styles/index.ts` verifica sia la build di produzione sia il nome host; `styles/published.css` nasconde solo la barra del player, senza modificare i contenuti o la vista relatore.

## Dove modificare

| File o cartella | Responsabilità |
| --- | --- |
| `slides.md` | Testi, ordine, classe visiva e label del footer |
| `lezioni/01-introduzione.md` | 50 slide del capitolo teorico Introduzione, tempi e note del relatore; importato da `slides.md` dopo Contatti |
| `lezioni/01-introduzione-fonti.md` | Corrispondenze con booklet e PDF, provenienza delle immagini e verifiche editoriali |
| `public/images/introduzione/` | 12 immagini locali del capitolo, con origine nei metadati XMP e nei file JSON associati |
| `lezioni/03-storia-design.md` | 50 slide della Lezione 3, Storia del design, tempi e note del relatore; importato da `slides.md` dopo Introduzione e prima della chiusura |
| `lezioni/03-storia-design-fonti.md` | Corrispondenze delle 50 slide con il capitolo C02 del booklet e i PDF 2025/26, provenienza delle immagini e verifiche editoriali |
| `public/images/storia-design/` | 27 immagini WebP locali della Lezione 3, con origine nei metadati XMP e nei file JSON associati |
| `layouts/default.vue` | Canvas comune, stato attivo e numerazione automatica |
| `components/CvediCard.vue` | Card DaisyUI, titolo, contenuto e illustrazione opzionale |
| `components/LessonFigure.vue` | Figure complete, regioni affiancate e ingrandimento accessibile dei capitoli teorici |
| `styles/compositions.css` | Famiglie di impaginazione, titoli stabili, confronti aperti, proporzioni delle figure e ingrandimenti |
| `LAYOUTS.md` | Struttura scelta per tutte le 154 slide e regole per le modifiche successive |
| `components/UxProcessMap.vue` | Mappa delle 14 fasi UX, raccolte in cinque nuclei con card del sistema esistente |
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
| `styles/lessons.css` | Composizioni condivise dei capitoli teorici, figure e diagrammi; importato da `styles/index.ts` |
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
- [Mappa delle fonti di Introduzione](lezioni/01-introduzione-fonti.md): corrispondenze per tutte le 50 slide, riferimenti Figma e pagine dei PDF 2025/26 conservati in `slide-lezioni-2025-2026/`.
- [Mappa delle fonti di Storia del design](lezioni/03-storia-design-fonti.md): corrispondenze per tutte le 50 slide della Lezione 3 con il [capitolo C02 del booklet](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=204-8292), riferimenti alle pagine dei PDF 2025/26 e provenienza delle 27 immagini.
- [Calendario CVeDI 2026/27](https://docs.google.com/spreadsheets/d/1QVVpKXtLz6C3KHJSRF7iA4GvdZtmf0rauWHFnpqt8Vo/edit): fonte del calendario; include incontri annullati, 35 ore di lezione e 36 di esercitazione.
- `public/images/source/`: immagini della presentazione originale.

Le slide 24–30 contengono il brief **WHAT IF?** per il 2026/27: inventare un’organizzazione che offra servizi del 2050 basati sulle potenzialità future dell’AI e realizzarne il sito web responsive, solo in italiano. Le slide distinguono capacità emergenti e ipotesi future, guidano il concept e definiscono pagine, percorso dell’utente e requisiti. I comportamenti dell’AI possono essere simulati. Le tre illustrazioni sono generate con lo strumento integrato imagegen e rigenerate in uno stile geometrico coordinato con i tracciati metro del booklet. Originali, riferimento visivo e prompt sono in `assets/next-me/`; le slide caricano le versioni `*-v2.webp` ottimizzate in `public/images/generated/next-me/`. Il manifest della seconda versione è `assets/next-me/imagegen-manifest-v2.json`; la prima versione resta disponibile.

Le lezioni adottano i colori del rispettivo capitolo del booklet: Introduzione (C01) usa il verde petrolio `#00786f`, Storia del design (C02) il rosa `#c6005c`. Titoli, aperture, card, diagrammi, indice e avanzamento condividono la stessa palette di capitolo, con superfici neutre `#f9fafb`.

Il capitolo teorico Introduzione occupa le slide 54–103 e prevede 120 minuti, incluse le attività e la discussione. Segue Contatti e precede Storia del design; la chiusura del deck è alla slide 154. Le note contengono tempi, indicazioni didattiche e fonti; la mappa delle fonti documenta anche gli esempi originali e la provenienza delle immagini.

La Lezione 3, Storia del design, occupa le slide 104–153 e prevede 120 minuti, incluse le tre attività alle slide 22, 36 e 48 del capitolo (125, 139 e 151 del deck). Rielabora il capitolo C02 del booklet e i PDF 2025/26: “Lezione 3” è il nome didattico, mentre la voce nell’indice resta il secondo capitolo. Le 27 immagini WebP in `public/images/storia-design/` provengono da Figma (16) e dai PDF (11); origine e trasformazioni sono documentate nei metadati XMP, nei file JSON associati e nella mappa delle fonti.

Appelli e scadenze non confermati restano esplicitamente indicati. Dopo la copertina, la slide 2 presenta il rinnovamento dei materiali e invita a segnalare eventuali errori nel forum del corso. Nell’indice delle lezioni sono attivi “Introduzione”, collegato all’alias `introduzione-teorica` (slide 54), e “Storia del graphic design e delle interfacce”, collegato all’alias `storia-design` (slide 104); gli altri tre pulsanti restano disabilitati.
