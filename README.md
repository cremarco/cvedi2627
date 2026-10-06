# CVeDI 2026/27 · Slidev

Presentazione con **153 slide visibili** e **221 slide nei sorgenti**, ricostruita dalla [lezione introduttiva CVeDI](https://docs.google.com/presentation/d/1caK7BBFHEfVcSZTLqgjCA0fV9BYIa9H4aLXxnLJP_W4/edit) con lo stile del [Manuale booklet](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-1687) e ampliata con il brief operativo WHAT IF? e i capitoli teorici Introduzione e Storia del design (Lezione 3).

Il numero nel footer e la barra di avanzamento sono riferiti al singolo set di slide: 6 per l’apertura generale, 40 per Presentazione del corso (compresa la chiusura finale), 25 per Brief di progetto, 21 per Approfondimenti individuali, 82 per Introduzione e 68 per Storia del design, temporaneamente sospesa. La prima lezione comincia da “Il corso”, alla slide complessiva 7 e all’alias `presentazione-corso`, con numerazione `01 / 40`; le prime sei slide appartengono al set `apertura`. La barra usa sempre `indigo-700`, anche sulla parete dei progetti, indipendentemente dalla palette della lezione. Il campo `lesson` raggruppa le sezioni autonome; quelle senza questo campo appartengono alla Presentazione del corso. I totali e la posizione vengono calcolati automaticamente; gli URL Slidev conservano la numerazione complessiva.

La terza lezione è temporaneamente esclusa dall’intera presentazione: il blocco `src: ./lezioni/03-storia-design.md` ha `disabled: true`, quindi non compare in navigazione, panoramica, route o build. I materiali restano conservati e verificati da `check:source` attraverso un caricamento completo solo in memoria. Per riattivarla basta togliere `disabled: true` dall’import e ripristinare la relativa voce dell’indice. L’indice mostra solo le lezioni 01 e 02; le voci 03–06 hanno `v-if="false"`.

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

Il capitolo Introduzione si apre alla [slide 92](http://localhost:3035/#/introduzione-teorica); le note del relatore sono nella [vista presenter](http://localhost:3035/#/presenter/92).

La Lezione 3, Storia del design, resta sospesa. Nel deck completo dei sorgenti inizia alla pagina 174.

```sh
pnpm build
pnpm check:source
pnpm check
pnpm export --output cvedi-2026-2027.pdf
```

La parete dei progetti usa tutti gli `screenshot.webp` in `progetti/`. Dodici anteprime riempiono la slide e si alternano una alla volta finché sono passati tutti i progetti; la rotazione si ferma fuori dalla slide e con la preferenza “movimento ridotto”. Dopo aver aggiunto o rimosso un progetto, eseguire `pnpm gallery`: il comando aggiorna le 76 anteprime leggere in `public/images/project-gallery/` e l'elenco in `data/projects.json` (richiede macOS per `sips`).

`check:source` verifica senza browser o server la struttura dei capitoli, le note, gli alias, la corrispondenza di titoli, numeri e tempi nelle mappe delle fonti, le 20 integrazioni dell’audit 2025/26, i dati aggregati e i 16 esempi UX, le pagine del booklet e tutti i percorsi immagine locali. La stessa verifica precede la build su GitHub Actions.

`check` richiede il server attivo su `http://localhost:3035`. Controlla tutte le slide, numerazione, immagini, contenuti fuori margine, superfici delle card, totali dei dati e una selezione di slide nel viewport stretto. Verifica anche l’allineamento dei titoli, gli ingrandimenti con mouse e tastiera, la chiusura con Esc e il ritorno del focus. Per un altro server: `SLIDEV_URL=http://localhost:3030 pnpm check`. Per salvare anche screenshot: `SLIDEV_SCREENSHOTS=/tmp/cvedi-check pnpm check`. Per una verifica indipendente dalle schede Slidev aperte, usare una build servita da un server statico.

La precedente build di 202 slide è stata verificata con il prefisso `/cvedi2627/slides/` usato su GitHub Pages, su desktop e viewport 636 × 778: nessuna immagine mancante, testo fuori margine o numerazione incoerente. Il rapporto completo è `reports/layout-review/completion/runtime-2026-10-05.json`.

La revisione dei layout è documentata in [layouts.md](docs/layouts.md). La verifica della baseline di 202 slide comprende 59 figure con caption larghe quanto le immagini, 59 ingrandimenti per ciascun viewport e 89 illustrazioni nelle card ancorate a 12 px dai bordi inferiore e destro. Quella baseline usava i colori del booklet; la palette attuale delle slide è documentata sotto. Diagrammi, schermate e poster possono essere ingranditi cliccando sull’immagine o sul pulsante «Ingrandisci». Il rapporto `reports/layout-review/final/runtime-2026-10-05.json` conserva separatamente la baseline di 187 slide, comprese le prove dello sfogliamento automatico del booklet.

L’integrazione del brief è verificata in `reports/layout-review/brief/runtime-2026-10-05.json`: le 15 nuove slide su desktop e viewport 636 × 778, le 43 illustrazioni ancorate a 12 px dai bordi inferiore e destro, i collegamenti dell’indice ai capitoli spostati e tutte le nuove pagine nella build con prefisso `/cvedi2627/slides/`. Nessun testo fuori margine, immagine mancante o errore di console nella build verificata. `check:source` conferma le 221 slide, le mappe delle fonti aggiornate e i 120 minuti di ciascun capitolo teorico.

La build è in `dist/`. Il headmatter imposta `export.perSlide: true`, quindi l’export PDF sincronizza la barra di avanzamento del singolo set con ciascuna pagina anche senza un flag aggiuntivo. Per esportare un PPTX modificabile, che non supporta questa opzione, usare `pnpm export --format pptx-editable --per-slide false`. `styles/daisy-built.css` è generato: non modificarlo direttamente.

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
| `lezioni/00-brief-progetto.md` | Set autonomo WHAT IF? di 25 slide (46–70), con copertina, indice e avanzamento propri |
| `docs/fonti/00-brief-progetto.md` | Fonti, ipotesi didattiche e corrispondenze delle 25 slide del brief autonomo |
| `lezioni/01-introduzione.md` | 82 slide del capitolo teorico Introduzione, tempi e note del relatore; importato da `slides.md` dopo Contatti |
| `docs/fonti/01-introduzione.md` | Corrispondenze con booklet e PDF, provenienza delle immagini e verifiche editoriali |
| `public/images/introduzione/` | Immagini locali del capitolo e degli esempi UX; provenienza nei manifest e nei metadati associati |
| `lezioni/03-storia-design.md` | 68 slide della Lezione 3, Storia del design, tempi e note del relatore; importato da `slides.md` dopo Introduzione e prima della chiusura |
| `docs/fonti/03-storia-design.md` | Corrispondenze delle 68 slide con il capitolo C02 del booklet e i PDF 2025/26, provenienza delle immagini e verifiche editoriali |
| `public/images/storia-design/` | Immagini WebP locali della Lezione 3, con origine nei metadati XMP e nei file JSON associati |
| `layouts/default.vue` | Canvas comune, stato attivo e numerazione automatica |
| `utils/lesson-pagination.ts` | Posizione e totale delle slide per lezione, condivisi da footer e avanzamento |
| `public/images/introduzione/esempi/` | Immagini statiche generate con ImageGen per il confronto della gerarchia visiva, ingrandibili con `LessonFigure` |
| `components/CvediCard.vue` | Card DaisyUI, titolo, contenuto e illustrazione opzionale |
| `components/LessonFigure.vue` | Figure complete, regioni affiancate e ingrandimento accessibile dei capitoli teorici |
| `components/LessonImageContent.vue` | Rendering condiviso di immagini singole e pannelli, usato da anteprima e ingrandimento |
| `composables/useSlidePlayback.ts` | Condizioni di animazione: slide attiva, visibilità, stampa e preferenza di movimento ridotto |
| `components/UxExampleSlide.vue` | Un esempio UX per slide, scelto con `example-id` fra testi e fotografie di `data/ux-examples.json` |
| `components/BookletPreview.vue` | Anteprima automatica della copertina e di dieci pagine del booklet, con pausa e consultazione tramite clic, pulsanti e frecce |
| `assets/index/` | Originale e prompt imagegen dello sfondo del pulsante “Presentazione del corso” |
| `assets/booklet-preview/` | Esportazioni PNG originali da Figma e manifest con nodi, titoli e pagine 21–30 |
| `public/images/booklet/preview/` | Dieci pagine WebP senza perdita per l’anteprima sfogliabile della slide 32 |
| `styles/booklet.css` | Libro a doppia pagina, rotazione sul dorso, comandi di consultazione e pausa, movimento ridotto e stampa |
| `styles/compositions.css` | Famiglie di impaginazione, titoli stabili, confronti aperti, proporzioni delle figure e ingrandimenti |
| `docs/layouts.md` | Struttura scelta per tutte le 221 slide e regole per le modifiche successive |
| `components/UxProcessMap.vue` | Mappa delle 14 fasi UX, raccolte in cinque stazioni illustrate con testo nativo |
| `components/NextMeIllustration.vue` | Illustrazioni coordinate del brief WHAT IF?, con percorsi compatibili con la pubblicazione |
| `components/SitemapDiagram.vue` | Alberatura riutilizzabile con card native, connettori e liste nidificate |
| `components/SlideAction.vue` | Pulsante daisyUI per i collegamenti della presentazione, con focus visibile e dimensioni condivise |
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
| `global-top.vue` | Avanzamento del singolo set, sempre indaco e visibile anche sulla galleria |
| `styles/tokens.css` | Valori Tailwind e coppie BASE + ACCENTO centralizzate, tipografia, spaziature e tempi del movimento |
| `styles/slides.css` | Layout, gerarchie, footer e varianti delle slide |
| `styles/components.css` | Aspetto condiviso di card, tabelle, timeline e progress |
| `styles/lessons.css` | Composizioni condivise dei capitoli teorici, figure e diagrammi; importato da `styles/index.ts` |
| `styles/web-styles.css` | Undici linguaggi delle interfacce applicati all’intera slide: sfondo, titoli, corpo, didascalie e footer |
| `public/fonts/web-styles/` | Dieci font WOFF2 locali, licenze e manifest delle fonti ufficiali |
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

La numerazione usa il contesto nativo di Slidev: inserire o rimuovere una slide non richiede aggiornamenti manuali. Nei layout del corso titolo e contenuti sono centrati come un unico blocco; le slide teoriche `reading-slide` mantengono il titolo a 52 px dall’alto. Il footer resta ancorato in basso. `two`, `three` e `four` indicano le colonne delle griglie. Il canvas 16:9 viene scalato anche nel browser stretto, conservando la composizione della slide.

Il parametro `illustration` delle card seleziona un’icona outline decorativa, molto tenue nell’angolo superiore destro; i precedenti file flat restano disponibili per compatibilità. Le card usano la grafica di Gestione web definita in `styles/reference.css`. I grafici si inseriscono con `<GradeDistribution category="project" />`; le altre categorie sono `oral`, `written` e `final`. Aggiornare i dati JSON aggiorna barre, percentuali, campione e mediana visualizzata.

## Manutenzione dei componenti

I Markdown definiscono contenuti e ordine delle slide; evitano logica di stato e copie del markup delle immagini. Usare `CvediCard` per le card e `LessonFigure` per fotografie, diagrammi e pannelli ingrandibili. `LessonImageContent` è il rendering interno condiviso: caption, pulsanti e dialog restano responsabilità di `LessonFigure`.

`useSlidePlayback` governa le condizioni delle animazioni di `BookletPreview` e `ProjectGallery`; ogni componente conserva il proprio intervallo e la propria sequenza. L’autoplay è attivo solo nel player e nella vista relatore; le copie in panoramica e nell’anteprima successiva restano ferme. Slidev mantiene montate anche le slide inattive: fermare sempre timer e listener quando la slide non è attiva o viene smontata. La preferenza di movimento ridotto e la stampa devono mostrare contenuti completi e stabili.

Le palette sono centralizzate in `styles/tokens.css`: ogni set ha i token `--cvedi-{set}-{base,deep,light,surface,accent,accent-light}`. `styles/lessons.css` applica queste coppie alle lezioni tramite variabili semantiche. La barra usa esclusivamente `--cvedi-progress-color` (`indigo-700`) e `--cvedi-progress-track` (`gray-200`), senza classi di colore per capitolo in `global-top.vue`. Footer e barra usano entrambi `lessonPagination`; il conteggio resta riferito alla lezione.

Le fotografie e i diagrammi usano un bordo sottile nella BASE del capitolo; `--cvedi-image-border` ne regola lo spessore. Il renderer mantiene le proporzioni e comunica la larghezza esterna a `LessonFigure`, così il bordo e la caption coincidono anche nei viewport stretti e al cambio di esempio. I colori interni degli artefatti e degli esempi restano quelli originali.

Il deck non usa blocchi Twoslash. In `vite.config.ts` il relativo client è sostituito con FloatingVue standard: i tooltip restano disponibili senza la patch Popper incompatibile. Se si aggiungono esempi Twoslash, verificare prima la compatibilità delle versioni e rivedere questo alias.

Dopo una modifica, eseguire `pnpm check:source` e `pnpm build`; per layout o interazioni verificare anche il browser su desktop e viewport stretto. Aggiungere un nuovo componente quando elimina una duplicazione effettiva o ha uno stato autonomo; mantenere i testi editoriali nel Markdown o nei dati JSON.

## Contenuti e fonti

- [design.md](docs/design.md): palette e regole visive.
- [dati.md](docs/dati.md): fonti e metodo di aggregazione dei voti.
- [Mappa delle fonti del brief WHAT IF?](docs/fonti/00-brief-progetto.md): obiettivi e fonti delle 25 slide del brief autonomo.
- [Mappa delle fonti di Introduzione](docs/fonti/01-introduzione.md): corrispondenze per tutte le 82 slide, riferimenti Figma e pagine dei PDF 2025/26 conservati in `materiali/lezioni/2025-2026/`.
- [Mappa delle fonti di Storia del design](docs/fonti/03-storia-design.md): corrispondenze per tutte le 68 slide della Lezione 3 con il [capitolo C02 del booklet](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC?node-id=204-8292), riferimenti alle pagine dei PDF 2025/26 e provenienza delle immagini e dei 19 nuovi asset del booklet.
- [Confronto dei nove PDF 2025/26](assets/slide-audit/2025-2026.json): 982 pagine esaminate, 20 integrazioni nelle lezioni correnti e capitoli specialistici ancora da sviluppare.
- [Calendario CVeDI 2026/27](https://docs.google.com/spreadsheets/d/1QVVpKXtLz6C3KHJSRF7iA4GvdZtmf0rauWHFnpqt8Vo/edit): fonte del calendario; include incontri annullati, 35 ore di lezione e 36 di esercitazione.
- `assets/slide-source/`: immagini della presentazione originale.

Il **Brief di progetto** è una sezione autonoma di 25 slide (46–70), dopo Contatti e prima di Introduzione. La copertina `brief-progetto` si raggiunge dal pulsante dedicato nell’indice e dalla panoramica Progetto del corso. Un indice interno collega tema, metodo e consegna. Il set segue le 30 slide 2025/26 del brief dedicato, adattandole a **WHAT IF? 2050**: organizzazione e servizi basati sull’AI, sito responsive solo in italiano, capacità simulate e controllo dell’utente. Comprende ricerca, proto-personas, moodboard, sitemap gerarchica, wireframe, flusso, design system, mockup, revisioni, materiali e verifica finale. Ogni fase usa un PDF fino a 10 MB; le date aggiornate sono comunicate su eLearning. Numerazione e avanzamento ripartono da 1 e contano solo le 25 pagine del set. Le tre illustrazioni originarie sono archiviate; il restyling corrente le sostituisce con simboli outline indaco e lime, coerenti con Gestione web. Le immagini precedenti erano generate con lo strumento integrato imagegen. Originali, riferimento visivo e prompt sono in `assets/next-me/`; le slide caricano le versioni `*-v2.webp` ottimizzate in `public/images/generated/next-me/`. Il manifest della seconda versione è `assets/next-me/imagegen-manifest-v2.json`; la prima versione resta disponibile.

La grafica delle slide riprende il progetto locale **Gestione web**: sans `Avenir Next`/`Nunito Sans`, fondi gray-100, testo slate, card bianche con ombre leggere, accenti indaco/lime e aperture centrate con badge della lezione. Del precedente sistema resta il formalismo dei tracciati metro, ricolorato nella nuova palette. Il foglio `styles/reference.css`, caricato per ultimo, è l’autorità grafica; [docs/design.md](docs/design.md) descrive riferimento, ruoli e componenti. Le precedenti coppie BASE + ACCENTO restano nei token come valori storici e strutturali, ma non guidano più il rendering delle slide ordinarie.

Il capitolo teorico Introduzione occupa le slide 92–173 e prevede 120 minuti, incluse le attività e la discussione. Gli esempi di UX oltre lo schermo occupano 16 slide consecutive (31–46 del capitolo, 122–137 del deck): una fotografia, una descrizione e una domanda per pagina, con la navigazione nativa della presentazione. Segue la sezione degli approfondimenti individuali; la chiusura è alla slide 174 nel deck visibile e alla 242 nel deck completo dei sorgenti. Le note contengono tempi, indicazioni didattiche e fonti; la mappa delle fonti documenta anche gli esempi originali e la provenienza delle immagini.

La Lezione 3, Storia del design, occupa le slide 174–241 e prevede 120 minuti, incluse le tre attività alle slide 24, 45 e 58 del capitolo (197, 218 e 231 del deck). Rielabora il capitolo C02 del booklet e i PDF 2025/26: “Lezione 3” è il nome didattico, e corrisponde alla voce 03 dell’indice. Le figure usano immagini WebP locali, comprese 19 nuove riproduzioni dei casi e delle fonti del booklet aggiornato. Origine, trasformazioni e didascalie sono documentate nei metadati XMP, nei file JSON associati e nella mappa delle fonti. Il registro è `assets/booklet/capitolo-2/slide-assets.json`.

Il confronto con il 2025/26 aggiunge 18 slide a Introduzione e due a Storia, mantenendo 120 minuti per capitolo e i contenuti delle 52 slide originarie del corso. Recupera metodi e artefatti che la panoramica nominava senza sviluppare, con note e fonti per ogni passaggio. Il brief WHAT IF? è ora raccolto nel set autonomo di 25 pagine, incluse le 15 operative recuperate e le sette pagine del tema. Gestalt, colore, tipografia applicata, accessibilità, cultura e videogiochi restano capitoli specialistici da sviluppare; l’audit ne indica le pagine.

Appelli e scadenze non confermati restano esplicitamente indicati. Dopo la copertina, la slide 2 presenta il rinnovamento dei materiali e invita a segnalare eventuali errori nel forum del corso. Nell’indice delle lezioni sono attivi “01 Il corso”, con pannello bianco e testo slate e collegato all’alias `presentazione-corso` (slide 7), “02 Introduzione a UX e UI”, collegato all’alias `introduzione-teorica` (slide 92); “03 Storia del design” è temporaneamente nascosto nell’indice, e il capitolo è escluso dal deck visibile con `disabled: true` sull’import. Anche le voci 04–06 sono nascoste. Le due lezioni visibili sono disposte a due colonne; un pulsante separato, con i controlli indaco del riferimento, apre il Brief di progetto senza cambiare la numerazione delle lezioni.

La revisione del capitolo C02 del 6 ottobre 2026 aggiunge 16 slide a Storia del design, mantenendo la durata di 120 minuti. Integra i casi Behrens/AEG, Isotype, Beck, Susan Kare e CERN e gli scenari su tipografia variabile, materiali spaziali, interfacce generative e risorse. Il booklet comprende 66 pagine: l’atlante degli stili presenta undici doppie pagine, con una variante del sito fittizio Caffè Luce generata tramite Imagegen a sinistra e quattro schermate autentiche in masonry a destra, con didascalie e riferimenti. Le undici slide dedicate agli stili adottano ciascuna il proprio linguaggio grafico nell’intero canvas e confrontano la stessa demo con un esempio reale. Font e immagini sono locali; fonte e licenze dei font sono in `public/fonts/web-styles/manifest.json`.

Le quattro direzioni future includono anche esempi originali di Caffè Luce: tipografia adattabile, organizzazione spaziale, proposta generativa modificabile e menu con immagini facoltative. I concept sono generati con Imagegen e affiancati alle fonti documentarie nel booklet e nelle slide. Asset, prompt e corrispondenze Figma sono in `assets/booklet/capitolo-2/direzioni-future/manifest-v1.json`.

La baseline di 218 slide del 6 ottobre 2026, prima della separazione del brief, è verificata su desktop, viewport 636 × 778 e media di stampa: 388 controlli di rendering, nessuna risorsa mancante, nessun errore di runtime e nessun contenuto fuori dalla zona utile. Le undici varianti degli stili usano i caratteri locali attesi. Evidenze aggiornate all’atlante in `reports/slides-c2-2026-10-06/atlante/runtime-final.json`; registro versionato in `assets/booklet/capitolo-2/revisione-slide.json`. Il PDF resta da generare dall’autore.

La separazione del brief è verificata nella versione di 221 slide: set 46/25/82/68, alias e mappe delle fonti aggiornati, 25 pagine del brief su desktop e viewport stretto. Il rapporto è `reports/layout-review/brief-section/runtime-2026-10-06.json`.


## Approfondimenti individuali · Tracce eLearning

Dopo il brief di progetto è inserito `lezioni/00-approfondimenti.md`: copertina alla pagina 71 e una slide per ciascuna delle 20 tracce A01–A20, alle pagine 72–91. L’alias `approfondimenti` apre la sezione; `approfondimento-a01`–`approfondimento-a20` aprono le singole tracce. Il set usa numerazione autonoma 1–21 ed è raggiungibile dall’indice generale e dalla panoramica degli approfondimenti.

La fonte è [Scelta tema · Approfondimento individuale](https://elearning.unimib.it/mod/choicegroup/view.php?id=1680625), letta il 6 ottobre 2026. Ogni slide mantiene titolo e domanda ufficiali e sintetizza gli aspetti da sviluppare e l’esito. I testi originali sono in `assets/approfondimenti/source-elearning.json`; la mappa è in `docs/fonti/00-approfondimenti.md`.

Le venti immagini originali sono generate con ImageGen nella palette indaco/lime, salvate in `public/images/generated/approfondimenti/` e visualizzate con `LessonFigure`. Prompt e provenienza sono in `assets/approfondimenti/imagegen-manifest.json`. Le illustrazioni spiegano i concetti e rappresentano situazioni esemplificative. La scelta della traccia e la consegna del PDF individuale avvengono su eLearning; date e scadenze restano da confermare.
