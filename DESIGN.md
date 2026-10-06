# DESIGN · CVeDI 2026/27

Questo è il riferimento normativo per aggiungere o modificare slide, componenti e immagini. Leggerlo prima di iniziare. Le regole descrivono il sistema implementato; modifiche intenzionali al sistema devono aggiornare codice e documento insieme. Le istruzioni esplicite dell’utente hanno precedenza.

Modalità Read, grafica del riferimento Gestione web e canvas 1280×720. Il player scala la composizione senza riordinarla. Titoli ordinari a top 52 / left 72 px, corpo centrato sopra il footer. Copertine metro originali, contenuti, asset, palette e terza lezione nascosta sono vincoli del progetto.

## Responsabilità

| Modulo | Responsabilità |
| --- | --- |
| `daisy.css` | Tailwind e tema semantico daisyUI |
| `tokens.css` | Valori Tailwind e ruoli cromatici |
| `slides.css`, `components.css`, `lessons.css` | Strutture del canvas e componenti |
| `compositions.css`, `ux-process.css`, `grades.css` | Figure, diagrammi e dati |
| `theme.css` | Superfici, copertine e tema finale |
| `typography.css` | Font locali e scala tipografica |
| `layout.css` | Relazioni spaziali e allineamenti |
| `motion.css` | Entrate finite e riscontri |
| `web-styles.css` | Linguaggi storici didattici |
| `slide-sets.ts`, `use-slide-set.ts` | Identità e palette del set proprietario |
| `lesson-pagination.ts` | Numerazione per set, compresa la chiusura non contigua |
| `useSlidePlayback.ts` | Attivazione, visibilità, stampa e movimento ridotto |

I componenti usano card, alert, btn, table, badge, progress e modal daisyUI. Il CSS specifico serve al canvas e alle composizioni didattiche. Palette e numerazione appartengono al set, non all'indice globale. I dialog teletrasportati ricevono il tema della slide proprietaria.

## Palette

| Identità `lesson` | Famiglia primaria / accento | Numero |
| --- | --- | --- |
| `apertura` | indigo / lime | Nessuno |
| `presentazione-corso` | red / amber | 01 |
| `brief-progetto` | amber / yellow | Nessuno |
| `approfondimenti` | indigo / lime | Nessuno |
| `introduzione` | lime / green | 02 |
| `storia-design` | emerald / teal | 03, nascosta |
| `design-thinking` | cyan / sky | 04, non pubblicata |
| `lean-ux` | blue / sky | 05, non pubblicata |
| `conclusioni` | violet / rose | 06, non pubblicata |

La fonte dei set è `utils/slide-sets.ts`; i valori Tailwind sono in `styles/tokens.css`. Usare i ruoli `--section-primary` (800), `--section-primary-deep` (900), `--section-track` (950), `--section-accent` (800) e `--section-accent-soft` (100). Non assegnare colori in base al numero globale della slide.

Indice, ribbon, avanzamento, controlli, alert e diagrammi devono appartenere alla stessa coppia. I tre collegamenti locali di Obiettivo e percorso restano neri; la copertina generale conserva la metro multicolore. Un nuovo set va registrato prima di usare colori propri. Le pagine esistenti del corso omettono `lesson` e vengono assegnate al set predefinito `presentazione-corso`: mantenere questa convenzione quando si estende il file del corso.

## Tipografia e spazi

Nunito Sans variabile locale, normale e corsivo; Inter nelle copertine e come fallback. Le famiglie degli esempi storici sono contenuto didattico. Nessun servizio font esterno durante la presentazione.

| Ruolo | Corpo / peso |
| --- | --- |
| Titolo | 47 px / 500 |
| Lead / prosa | 27 / 23 px |
| Titolo card / compatto | 24 / 22 px, 600 |
| Testo card / note e didascalie | 20 / 18 px |
| Metadati / footer / ribbon | 16 / 14 / 12 px |
| Valori statistici | 32 px / 700, cifre tabulari |
| Copertina generale / lezione | Inter 66 / 96 px, 700 |

Prosa entro 65ch e lead entro 70ch, limitati dal contenitore. Interlinea 1,48 nella prosa e 1,5 nelle card. Spazi: 12 px fra raster e didascalia, 16 fra parti correlate, 24 fra elementi equivalenti, 48 fra testo e figura.

Le card equivalenti usano subgrid per allineare le spiegazioni sotto il titolo più lungo; il flusso normale resta il fallback. Gli approfondimenti seguono domanda, aspetti e figura, esito; il frame può ridursi per titoli lunghi senza imporre altezze al testo.

## Figure e interazione

LessonImageContent conserva proporzioni e dimensioni occupate. LessonFigure allinea didascalia e icona al raster. Immagini e ingrandimenti sono senza cornice, angoli aggiunti o ombra. Le figure a pannelli dichiarano panelAspectRatio.

Ingrandisci è un'icona sopra l'immagine, in basso a destra: opacità 45%, 100% su hover/focus, bersaglio 44×44 px. Il dialog nativo gestisce Esc e ritorno del focus; nei viewport bassi può scorrere. SlideIllustration serve agli asset decorativi, RenewalMaterials al grafico del rinnovo.

## Movimento e dati

La metro è il momento principale delle aperture: sequenze finite entro 900 ms, titoli fermi. Calendari e voti seguono l'ordine di lettura. motion-enabled deriva dallo stato Slidev; uscita, scheda nascosta, anteprima, export e movimento ridotto mostrano il risultato statico. Il listener del browser è condiviso.

L'avanzamento usa progress accessibile e trasformazione decorativa. Cambio set e stampa evitano transizioni improprie; l'export mostra la metro completa anche con media screen.

I contenuti sono in Markdown o data; i componenti gestiscono presentazione e interazione. La normalizzazione dei titoli delle immagini è condivisa fra runtime e controlli. Le note del relatore sono assenti e presenter è disabilitato.

## Verifica

check:source include sorgenti nascosti, durate di frontmatter, fonti e asset selezionati. check misura titoli, centraggio, footer, immagini e ingrandimenti su desktop, viewport stretto e stampa. I controlli dedicati coprono geometria, movimento, avanzamento e font. Il helper browser aspetta contenuti e risorse renderizzati, senza affidarsi all'inattività della rete.

Rapporti cronologici e screenshot non appartengono alla documentazione: rigenerarli in reports o in una cartella temporanea. Conservare attribuzioni, licenze e originali attivi.

## Regole vincolanti per nuove slide

1. Usare `layout: default` e un solo titolo H1. Le slide ordinarie mantengono l’ancoraggio comune e il corpo centrato; non correggere il centraggio con margini o trasformazioni applicati a una singola pagina.
2. Scegliere una composizione esistente in base alla relazione fra i contenuti: card equivalenti, testo e figura, confronto affiancato, affermazione oppure percorso. Non usare card per ogni paragrafo e non annidarle.
3. Mantenere leggibile tutto il testo. Con un titolo lungo verificare due righe, spazio residuo e footer; distribuire il contenuto su più slide se necessario, senza tagliarlo o ridurre arbitrariamente il corpo del testo.
4. Riutilizzare token e componenti. Niente CSS inline per font, palette, padding o altezze del testo; gli stili dinamici interni che misurano le immagini e applicano la palette sono responsabilità dei componenti condivisi.
5. Non aggiungere note del relatore: i commenti HTML nei Markdown sono interpretati da Slidev come note. `presenter: false` resta nell’headmatter.
6. Non riattivare la terza lezione o le voci future dell’indice senza richiesta esplicita. L’archivio dei progetti conserva il proprio tema indipendente.
7. Non reinserire cornici, ombre o arrotondamenti sulle immagini. Il comando di ingrandimento rimane una sola icona; non aggiungere il testo Ingrandisci sopra o sotto la figura.
8. Non usare esempi di interfacce simulati con form HTML. Per gli esempi didattici usare immagini che spiegano il concetto; i contenuti della lezione e i controlli reali restano semantici e accessibili.
9. Non aggiungere icone Heroicons come sfondo delle card: usare immagini generate coerenti con il significato e la palette. Le piccole icone SVG dei controlli e le geometrie della metro restano ammesse.
10. Conservare fotografie, opere e screenshot documentari autentici. Non ricolorarli per uniformarli al set e non modificare il testo incorporato negli artefatti.
11. Non introdurre loop, autoplay sonoro o effetti che rendano temporaneamente illeggibili i contenuti. Collegare il movimento a `useSlidePlayback` e rispettare stampa, export, visibilità e movimento ridotto.
12. Non modificare manualmente footer, numero totale, ribbon o progressione nel Markdown: li forniscono layout e componenti dal contesto nativo Slidev.

### Copertine

La copertina generale usa `ClosingMetro original` e la composizione multicolore ripristinata. Le copertine di lezione usano `chapter-slide`, `ChapterMetro`, fondo primario del set, Inter, titolo bianco allineato a sinistra e numero della lezione. Mantengono margine sinistro 68 px e il numero in alto a 64 px. Brief e Approfondimenti non ricevono numeri di lezione inventati. Non sostituire le copertine con titoli centrati, badge circolari o nuovi effetti di luce.

### Superfici, gerarchia e accessibilità

- Fondo ordinario slate-50, testo principale slate-900, prosa slate-700; usare i token del tema, non nuovi valori isolati.
- Card bianche, raggio 16 px, ombra condivisa `--theme-shadow` (0 8px 24px al 5%). Nessun bordo aggiuntivo per dare una seconda elevazione. Gli sfondi semantici delle card restano contenuti in basso a destra: opacità 8,5%, larghezza 64% con massimo 240 px, altezza 78% e rientri di 8 px.
- Alert quieti nel primario del set: tinta di fondo 4%, bordo completo 1 px al 18%, raggio 12 px. Non usare barre laterali colorate o trattamenti da errore per una nota informativa.
- Didascalie e testo secondario devono conservare contrasto; gli sfondi delle card sono decorativi, a bassa opacità e fuori dall’albero accessibile.
- Testo corrente almeno 4,5:1 e testo grande almeno 3:1. Etichette, focus e ordine del DOM devono spiegare l’interazione anche da tastiera.
- Font reali locali, senza grassetto o corsivo artificiali. Il titolo lungo si bilancia senza tracking più stretto di −0,04 em.
- Il ribbon è il segnalibro condiviso in alto a destra; non ripristinare il ribbon diagonale o collocarlo nel footer.

## Componenti da scegliere

| Esigenza | Componente / struttura |
| --- | --- |
| Card equivalenti | `CvediCard` dentro `cvedi-grid`, eventualmente `three` o `four` |
| Fotografia, diagramma o confronto ingrandibile | `LessonFigure`, anche dentro `lesson-columns` |
| Immagine decorativa | `SlideIllustration`, senza testo alternativo ridondante |
| Collegamento a una slide | `SlideAction` con alias `to` |
| Calendario / distribuzione / confronto dei voti | `CourseCalendar`, `GradeDistribution`, `GradeYearTable` |
| Sequenza di quattro fasi | `ProcessTimeline` |
| Alberatura / nuclei UX | `SitemapDiagram`, `UxProcessMap` |
| Esempio UX da catalogo | `UxExampleSlide`, con dati in `data/ux-examples.json` |
| Materiali, copertine e chiusura | `RenewalMaterials`, `ChapterMetro`, `ClosingMetro` |

L’API delle card contiene il titolo e lo slot dei contenuti; la vecchia proprietà illustration è assente. Le figure non accettano più la proprietà bordered. Una nuova card richiede una corrispondenza semantica in `data/card-artwork.json`: registrare il titolo normalizzato e l’asset corretto, senza assegnare un’immagine estranea solo per superare il controllo.

Per un’immagine nuova: produrre il raster con ImageGen quando richiesto dal contenuto, nella famiglia editoriale 2D del set; niente cornici o testo decorativo inutile. Conservare PNG originale, licenza/provenienza e manifest; il WebP selezionato deve mantenere pixel e trasparenza. Per i percorsi pubblici riutilizzare `publicAsset`, così la risorsa funziona anche in `/cvedi2627/slides/`.

## Esempi di partenza

Esempio illustrativo di una nuova pagina nel brief. Numero, alias, titolo e contenuti devono essere adattati alla posizione effettiva; i titoli delle card qui riusano chiavi già presenti nel catalogo.

```md
---
layout: default
lesson: brief-progetto
lessonSlide: 26
class: content-slide project-section reading-slide lesson-slide brief-section
routeAlias: brief-nuovo-argomento
footer: "WHAT IF? · Nuovo argomento"
---

# Titolo della slide

<p class="lead">Una frase che introduce l’idea centrale.</p>
<div class="cvedi-grid">
  <CvediCard title="Persone e valore">
    <p>Un contenuto sintetico, con una sola priorità.</p>
  </CvediCard>
  <CvediCard title="AI e controllo">
    <p>Un secondo aspetto equivalente, con il suo contenuto.</p>
  </CvediCard>
</div>
```

Per una figura usare il pattern già presente, con percorso dell’asset reale:

```html
<div class="lesson-columns">
  <div>
    <p class="lead">Il concetto da osservare nell’immagine.</p>
    <p>Una spiegazione collegata all’esempio.</p>
  </div>
  <LessonFigure
    src="/images/percorso-reale.webp"
    alt="Descrizione dell’informazione visiva rilevante."
    caption="Didascalia o fonte necessaria."
  />
</div>
```

Aggiungere al frontmatter le classi `figure-slide` e, quando la figura è primaria, `figure-dominant`. Per una coppia confrontabile usare `figure-pair`, con ordine A/B uguale nel DOM e nella lettura visiva. Gli approfondimenti riusano `topic-layout`: domanda, colonne di sviluppo e figura, esito.

## Procedura di aggiunta e verifica

1. Identificare il set, il file Markdown proprietario e il pattern più vicino; leggere questo documento e `PRODUCT.md`.
2. Inserire la pagina nell’ordine corretto, con alias unico e `lessonSlide` progressivo dove il set lo usa. Nelle lezioni teoriche registrare `lessonMinutes` e mantenere il totale previsto.
3. Aggiornare fonti, dati e cataloghi interessati. Footer e progressione si ricalcolano automaticamente; non creare conteggi paralleli.
4. Adeguare i controlli strutturali soltanto per le variazioni intenzionali di numero o sequenza: non rimuovere le verifiche di asset, fonti, accessibilità o layout per far passare la nuova pagina.
5. Eseguire `pnpm check:source` e `pnpm build`. Per una nuova composizione verificare desktop, viewport stretto e stampa con `pnpm check` e i controlli dedicati pertinenti. Per palette, immagini o stato attivo verificare anche ingrandimento, focus, movimento ridotto ed export.
6. Usare un’anteprima isolata per i test; salvare prove e rapporti in `reports/` o fuori dal repository. Non aggiungere nuovi documenti cronologici duplicati.
7. La pagina è pronta quando titolo e corpo rispettano gli ancoraggi, non c’è contenuto fuori margine, gli asset reali sono caricati, i colori appartengono al set e la tastiera mantiene un percorso completo.

L’architettura deve mantenere separate informazione e presentazione: Markdown e `data/` descrivono contenuti; Vue gestisce visualizzazione e interazione; CSS condiviso possiede i ruoli. Estendere il modulo proprietario quando manca una regola riusabile, senza introdurre copie locali nei singoli Markdown.
