# CVeDI 2026/27 · Slidev

Presentazione di **153 slide**, ricostruita dalla [lezione introduttiva CVeDI](https://docs.google.com/presentation/d/1caK7BBFHEfVcSZTLqgjCA0fV9BYIa9H4aLXxnLJP_W4/edit) con lo stile del [Manuale booklet](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-1687) e ampliata con i capitoli teorici Introduzione e Storia del design (Lezione 3).

Il numero nel footer e la barra di avanzamento sono riferiti al singolo set di slide: 53 per Presentazione del corso (compresa la chiusura finale), 50 per Introduzione e 50 per Storia del design. Il campo `lesson` raggruppa le slide teoriche; quelle senza questo campo appartengono alla Presentazione del corso. I totali e la posizione vengono calcolati automaticamente; gli URL Slidev conservano la numerazione complessiva.

## Pubblicazione

Repository: [cremarco/cvedi2627](https://github.com/cremarco/cvedi2627).

- Presentazione: [slides/](https://cremarco.github.io/cvedi2627/slides/).
- Archivio di 76 siti: [project/](https://cremarco.github.io/cvedi2627/project/).

`pnpm build:pages` genera `_site/slides/` e `_site/project/`. La sorgente dell’archivio resta in `progetti/`; immagini e collegamenti funzionano anche quando il sito è ospitato in una sottocartella. La presentazione usa URL con hash per funzionare su GitHub Pages senza riscritture lato server.

Il PDF viene generato manualmente dall’autore alla fine del lavoro; non viene rigenerato durante le revisioni delle slide. La pubblicazione funziona anche senza PDF. Se `cvedi-2026-2027.pdf` è presente nella radice, la build lo copia in `_site/slides/`.

L’indice dei progetti include filtri annuali, ricerca per nome e anteprime responsive, con stili e font locali. Dopo aver modificato `progetti/gallery.source.css`, eseguire `pnpm css:projects` per aggiornare `progetti/gallery.css`. La build Pages lo esegue automaticamente. Per l’anteprima dell’archivio basta un server statico dalla radice del repository e la pagina `/progetti/`.

I sei prototipi totem del 2024/25 si aprono in `progetti/totem.html`, sia dalla galleria sia dai loro collegamenti iniziali diretti. La vista conserva il viewport del progetto e lo adatta alla finestra, con i comandi “Ingrandisci” e “Adatta allo schermo”. “Apri originale” mostra il prototipo alle dimensioni native. Le dimensioni sono nel campo `screen` di `progetti/gallery-data.json`; `screen.pages` permette un formato diverso per singole schermate, come il tabellone di Magrathea. La navigazione interna viene salvata nell’URL della vista, così un aggiornamento della pagina mantiene la schermata raggiunta.

`node scripts/check/projects.mjs` verifica i 14 progetti 2024/25 e 2025/26: adattamento dei totem su desktop, telefono e tablet, ingrandimento, percorsi di avvio, filtri e risorse locali delle 227 pagine HTML. Richiede un server statico su `http://127.0.0.1:4173/progetti/`; usare `PROJECTS_URL` per un altro indirizzo. Il rapporto JSON è in `reports/browser-2026-10-02/verification.json`, oppure nella cartella indicata da `PROJECTS_REPORT`.

Per verificare tutti i 76 progetti e le 890 pagine HTML, usare `PROJECTS_ALL=1 node scripts/check/projects.mjs`. Il controllo include risorse locali, errori JavaScript e le 122 pagine elencate in `scripts/check/fixtures/archive-layout-pages.json`, sulle quali erano stati individuati contenuti fuori margine. I totem sono verificati alle dimensioni native e adattati a desktop, telefono e tablet. `PROJECTS_RECHECK=1` ripete i controlli delle pagine fuori margine e delle pagine fallite nell’ultimo rapporto, conservando le verifiche già riuscite delle altre pagine.

[Riepilogo della compressione e dei controlli](docs/pubblicazione.md).

Ogni push sul ramo `main` pubblica automaticamente la build tramite `.github/workflows/pages.yml`. La build si arresta se il pacchetto supera 990 MB. Per un’altra sottocartella, impostare `PAGES_BASE=/nome-repository/`.

## Sviluppo locale

Richiede Node.js ≥22.12 e pnpm.

```sh
pnpm install
pnpm dev --port 3035
```

Lo script avvia Slidev e aggiorna il CSS Tailwind/daisyUI quando cambiano slide o componenti. Chiudendo il comando si arrestano entrambi i processi.

Il capitolo Introduzione si apre alla [slide 53](http://localhost:3035/#/53); le note del relatore sono nella [vista presenter](http://localhost:3035/#/presenter/53).

La Lezione 3, Storia del design, si apre alla [slide 103](http://localhost:3035/#/103); le note del relatore sono nella [vista presenter](http://localhost:3035/#/presenter/103).

```sh
pnpm build
pnpm check:source
pnpm check
pnpm export --output cvedi-2026-2027.pdf
```

La parete dei progetti usa tutti gli `screenshot.webp` in `progetti/`. Dodici anteprime riempiono la slide e si alternano una alla volta finché sono passati tutti i progetti; la rotazione si ferma fuori dalla slide e con la preferenza “movimento ridotto”. Dopo aver aggiunto o rimosso un progetto, eseguire `pnpm gallery`: il comando aggiorna le 76 anteprime leggere in `public/images/project-gallery/` e l'elenco in `data/projects.json` (richiede macOS per `sips`).

`check:source` verifica senza browser o server la struttura dei capitoli, le note, gli alias, i dati aggregati, i 13 esempi UX, le pagine del booklet e tutti i percorsi immagine locali. La stessa verifica precede la build su GitHub Actions.

`check` richiede il server attivo su `http://localhost:3035`. Controlla tutte le slide, numerazione, immagini, contenuti fuori margine, superfici delle card, totali dei dati e una selezione di slide nel viewport stretto. Verifica anche l’allineamento dei titoli, gli ingrandimenti con mouse e tastiera, la chiusura con Esc e il ritorno del focus. Per un altro server: `SLIDEV_URL=http://localhost:3030 pnpm check`. Per salvare anche screenshot: `SLIDEV_SCREENSHOTS=/tmp/cvedi-check pnpm check`. Per una verifica indipendente dalle schede Slidev aperte, usare una build servita da un server statico.

I rapporti di verifica della precedente revisione della Lezione 3 sono in `reports/storia-design/report.json` per il server di sviluppo e `reports/storia-design-static/report.json` per la build statica: ciascuno copre 154 slide e 229 rendering, comprese 65 viste strette e 10 viste di stampa, senza errori o contenuti fuori margine.

La revisione dei layout è documentata in [layouts.md](docs/layouts.md). Le prove della precedente revisione in `reports/layout-review/final/` comprendono 154 slide desktop, 69 viste strette, 10 viste di stampa, due viste relatore e nove ingrandimenti. Le lezioni mantengono i colori del booklet; diagrammi, schermate e poster hanno più spazio e possono essere ingranditi cliccando sull’immagine.

La build è in `dist/`. Il headmatter imposta `export.perSlide: true`, quindi l’export PDF sincronizza la barra globale con ciascuna pagina anche senza un flag aggiuntivo. Per esportare un PPTX modificabile, che non supporta questa opzione, usare `pnpm export --format pptx-editable --per-slide false`. `styles/daisy-built.css` è generato: non modificarlo direttamente.

Il deck dichiara la lingua italiana nell’HTML iniziale e nel contesto del client. `comark: true` usa il nome corrente dell’opzione Markdown esteso; `fonts.provider: none` evita i font remoti del tema, perché Inter e Merriweather sono caricati localmente da `styles/index.ts`.

Nella versione pubblicata online la barra dei comandi Slidev è nascosta. La navigazione con tastiera, gesti touch e collegamenti nelle slide resta disponibile. Il server Slidev e l’anteprima della build su localhost, indirizzi di loopback e rete locale mantengono la barra completa. `styles/index.ts` verifica sia la build di produzione sia il nome host; `styles/published.css` nasconde solo la barra del player, senza modificare i contenuti o la vista relatore.

## Dove modificare

La struttura distingue codice, documentazione e materiali originali:

```text
slides.md                      Presentazione principale
lezioni/                       Capitoli importati da Slidev
components/, layouts/         Componenti e canvas condivisi
composables/, utils/          Stato reattivo e funzioni comuni
styles/, data/                 Stili e dati della presentazione
public/                       Risorse distribuite con le slide
assets/                       Originali grafici, manifest e sorgenti
docs/                         Design, layout, dati e pubblicazione
  fonti/                      Corrispondenze tra lezioni e fonti
  archivio/                   Controlli e ottimizzazione dei siti
materiali/
  lezioni/2025-2026/           PDF delle lezioni precedenti
  approfondimenti/            Elaborati suddivisi per anno accademico
scripts/
  build/                      Pubblicazione e generazione delle anteprime
  check/                      Verifiche, con dati di prova in fixtures/
  optimize/                   Compressione e manutenzione dell’archivio
progetti/                     Archivio dei siti e galleria
```

File di documentazione, script e materiali usano nomi minuscoli con trattini; i materiali sono suddivisi in cartelle `AAAA-AAAA`. Gli URL dei siti in `progetti/` conservano i nomi pubblicati. Le versioni differenti degli elaborati restano separate. `assets/slide-source/` conserva le immagini originali della presentazione; `assets/metro-map/reference-cover.png` è il riferimento per la costruzione della mappa.

Gli script si eseguono dalla radice del repository. [Guida agli strumenti](scripts/README.md). `dist/`, `_site/` e `reports/` sono output locali ignorati da Git; le build si rigenerano con i comandi descritti sopra.

| File o cartella | Responsabilità |
| --- | --- |
| `slides.md` | Testi, ordine, classe visiva e label del footer |
| `lezioni/01-introduzione.md` | 50 slide del capitolo teorico Introduzione, tempi e note del relatore; importato da `slides.md` dopo Contatti |
| `docs/fonti/01-introduzione.md` | Corrispondenze con booklet e PDF, provenienza delle immagini e verifiche editoriali |
| `public/images/introduzione/` | Immagini locali del capitolo e degli esempi UX; provenienza nei manifest e nei metadati associati |
| `lezioni/03-storia-design.md` | 50 slide della Lezione 3, Storia del design, tempi e note del relatore; importato da `slides.md` dopo Introduzione e prima della chiusura |
| `docs/fonti/03-storia-design.md` | Corrispondenze delle 50 slide con il capitolo C02 del booklet e i PDF 2025/26, provenienza delle immagini e verifiche editoriali |
| `public/images/storia-design/` | 27 immagini WebP locali della Lezione 3, con origine nei metadati XMP e nei file JSON associati |
| `layouts/default.vue` | Canvas comune, stato attivo e numerazione automatica |
| `utils/lesson-pagination.ts` | Posizione e totale delle slide per lezione, condivisi da footer e avanzamento |
| `components/CvediCard.vue` | Card DaisyUI, titolo, contenuto e illustrazione opzionale |
| `components/LessonFigure.vue` | Figure complete, regioni affiancate e ingrandimento accessibile dei capitoli teorici |
| `components/LessonImageContent.vue` | Rendering condiviso di immagini singole e pannelli, usato da anteprima e ingrandimento |
| `composables/useSlidePlayback.ts` | Condizioni di animazione: slide attiva, visibilità, stampa e preferenza di movimento ridotto |
| `components/UxExamples.vue` | Galleria didattica con testi e fotografie definiti in `data/ux-examples.json` |
| `components/BookletPreview.vue` | Anteprima automatica della copertina e di dieci pagine del booklet, con pausa e consultazione tramite clic, pulsanti e frecce |
| `assets/index/` | Originale e prompt imagegen dello sfondo del pulsante “Presentazione del corso” |
| `assets/booklet-preview/` | Esportazioni PNG originali da Figma e manifest con nodi, titoli e pagine 21–30 |
| `public/images/booklet/preview/` | Dieci pagine WebP senza perdita per l’anteprima sfogliabile della slide 39 |
| `styles/booklet.css` | Libro a doppia pagina, rotazione sul dorso, comandi di consultazione e pausa, movimento ridotto e stampa |
| `styles/compositions.css` | Famiglie di impaginazione, titoli stabili, confronti aperti, proporzioni delle figure e ingrandimenti |
| `docs/layouts.md` | Struttura scelta per tutte le 153 slide e regole per le modifiche successive |
| `components/UxProcessMap.vue` | Mappa delle 14 fasi UX, raccolte in cinque nuclei con card del sistema esistente |
| `components/NextMeIllustration.vue` | Illustrazioni coordinate del brief WHAT IF?, con percorsi compatibili con la pubblicazione |
| `components/ProcessTimeline.vue` | Percorsi metro a quattro tappe per progetto e approfondimento, con etichetta accessibile specifica |
| `components/CourseCalendar.vue` | Tabella del calendario con badge di stato |
| `data/calendar.json` | Date, tipo e orario dei 38 incontri |
| `components/GradeDistribution.vue` | Distribuzione e riepilogo di una categoria di voti |
| `components/GradeYearTable.vue` | Confronto annuale dei voti finali |
| `components/ProjectGallery.vue` | Parete delle anteprime dei progetti |
| `scripts/check/slide-source.mjs` | Verifiche dei sorgenti condivise da `check:source` e dal controllo browser |
| `scripts/build/project-gallery.mjs` | Genera le anteprime dai progetti e il relativo elenco |
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

Le illustrazioni si passano esplicitamente: `illustration="/images/flat/lesson-theory.svg"`. La famiglia vettoriale è in `public/images/flat/`. Tutte le illustrazioni sono in basso a destra, dopo il testo e con almeno 16 px di separazione. La dimensione comune è 80 px; `illustration-variant="roomy"` la porta a 104 px, mentre `illustration-variant="compact"` la riduce a 64 px nelle griglie a due righe. I grafici si inseriscono con `<GradeDistribution category="project" />`; le altre categorie sono `oral`, `written` e `final`. Aggiornare i dati JSON aggiorna barre, percentuali, campione e mediana visualizzata.

## Manutenzione dei componenti

I Markdown definiscono contenuti e ordine delle slide; evitano logica di stato e copie del markup delle immagini. Usare `CvediCard` per le card e `LessonFigure` per fotografie, diagrammi e pannelli ingrandibili. `LessonImageContent` è il rendering interno condiviso: caption, pulsanti e dialog restano responsabilità di `LessonFigure`.

`useSlidePlayback` governa le condizioni delle animazioni di `BookletPreview` e `ProjectGallery`; ogni componente conserva il proprio intervallo e la propria sequenza. L’autoplay è attivo solo nel player e nella vista relatore; le copie in panoramica e nell’anteprima successiva restano ferme. Slidev mantiene montate anche le slide inattive: fermare sempre timer e listener quando la slide non è attiva o viene smontata. La preferenza di movimento ridotto e la stampa devono mostrare contenuti completi e stabili.

Le palette restano in `styles/tokens.css` e `styles/lessons.css`. La barra riprende le classi di sezione della slide: un nuovo capitolo può usare la propria palette senza aggiungere condizioni in `global-top.vue`. Footer e barra usano entrambi `lessonPagination`.

Le fotografie e i diagrammi usano un bordo sottile nel colore del capitolo (`--cvedi-image-border`). Il renderer mantiene le proporzioni e comunica la larghezza esterna a `LessonFigure`, così il bordo e la caption coincidono anche nei viewport stretti e al cambio di esempio.

Il deck non usa blocchi Twoslash. In `vite.config.ts` il relativo client è sostituito con FloatingVue standard: i tooltip restano disponibili senza la patch Popper incompatibile. Se si aggiungono esempi Twoslash, verificare prima la compatibilità delle versioni e rivedere questo alias.

Dopo una modifica, eseguire `pnpm check:source` e `pnpm build`; per layout o interazioni verificare anche il browser su desktop e viewport stretto. Aggiungere un nuovo componente quando elimina una duplicazione effettiva o ha uno stato autonomo; mantenere i testi editoriali nel Markdown o nei dati JSON.

## Contenuti e fonti

- [design.md](docs/design.md): palette e regole visive.
- [dati.md](docs/dati.md): fonti e metodo di aggregazione dei voti.
- [Mappa delle fonti di Introduzione](docs/fonti/01-introduzione.md): corrispondenze per tutte le 50 slide, riferimenti Figma e pagine dei PDF 2025/26 conservati in `materiali/lezioni/2025-2026/`.
- [Mappa delle fonti di Storia del design](docs/fonti/03-storia-design.md): corrispondenze per tutte le 50 slide della Lezione 3 con il [capitolo C02 del booklet](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=204-8292), riferimenti alle pagine dei PDF 2025/26 e provenienza delle 27 immagini.
- [Calendario CVeDI 2026/27](https://docs.google.com/spreadsheets/d/1QVVpKXtLz6C3KHJSRF7iA4GvdZtmf0rauWHFnpqt8Vo/edit): fonte del calendario; include incontri annullati, 35 ore di lezione e 36 di esercitazione.
- `assets/slide-source/`: immagini della presentazione originale.

Le slide 24–30 contengono il brief **WHAT IF?** per il 2026/27: inventare un’organizzazione che offra servizi del 2050 basati sulle potenzialità future dell’AI e realizzarne il sito web responsive, solo in italiano. Le slide distinguono capacità emergenti e ipotesi future, guidano il concept e definiscono pagine, percorso dell’utente e requisiti. I comportamenti dell’AI possono essere simulati. Le tre illustrazioni sono generate con lo strumento integrato imagegen e rigenerate in uno stile geometrico coordinato con i tracciati metro del booklet. Originali, riferimento visivo e prompt sono in `assets/next-me/`; le slide caricano le versioni `*-v2.webp` ottimizzate in `public/images/generated/next-me/`. Il manifest della seconda versione è `assets/next-me/imagegen-manifest-v2.json`; la prima versione resta disponibile.

Le lezioni adottano i colori del rispettivo capitolo del booklet: Introduzione (C01) usa il verde petrolio `#00786f`, Storia del design (C02) il rosa `#c6005c`. Titoli, aperture, card, diagrammi, indice e avanzamento condividono la stessa palette di capitolo, con superfici neutre `#f9fafb`.

Il capitolo teorico Introduzione occupa le slide 53–102 e prevede 120 minuti, incluse le attività e la discussione. Segue Contatti e precede Storia del design; la chiusura del deck è alla slide 153. Le note contengono tempi, indicazioni didattiche e fonti; la mappa delle fonti documenta anche gli esempi originali e la provenienza delle immagini.

La Lezione 3, Storia del design, occupa le slide 103–152 e prevede 120 minuti, incluse le tre attività alle slide 22, 36 e 48 del capitolo (124, 138 e 150 del deck). Rielabora il capitolo C02 del booklet e i PDF 2025/26: “Lezione 3” è il nome didattico, e corrisponde alla voce 03 dell’indice. Le 27 immagini WebP in `public/images/storia-design/` provengono da Figma (16) e dai PDF (11); origine e trasformazioni sono documentate nei metadati XMP, nei file JSON associati e nella mappa delle fonti.

Appelli e scadenze non confermati restano esplicitamente indicati. Dopo la copertina, la slide 2 presenta il rinnovamento dei materiali e invita a segnalare eventuali errori nel forum del corso. Nell’indice delle lezioni sono attivi “01 Presentazione del corso”, in indaco e collegato alla slide 7, “02 Introduzione a UX e UI”, collegato all’alias `introduzione-teorica` (slide 53), e “03 Storia del graphic design e delle interfacce”, collegato all’alias `storia-design` (slide 103); gli altri tre pulsanti restano disabilitati. Le sei voci sono disposte su tre righe a due colonne.
