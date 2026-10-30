---
name: "CVeDI · sistema delle slide"
description: "Contratto visivo ricavato dalle lezioni Slidev 01–08 e applicato alle lezioni successive."
colors:
  reading-background: "#f8fafc"
  reading-ink: "#0f172a"
  reading-body: "#334155"
  reading-caption: "#64748b"
  card-background: "#ffffff"
  rule: "#e2e8f0"
typography:
  title:
    fontFamily: "Nunito Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "47px"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Nunito Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "27px"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Nunito Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "Nunito Sans, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.4
  chapter:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "92px"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.035em"
rounded:
  card: "16px"
  action: "12px"
spacing:
  copy: "12px"
  related: "16px"
  peers: "24px"
  introduction: "32px"
  columns: "48px"
---

# Design delle slide CVeDI

## Overview

Questo è il contratto visivo delle presentazioni Slidev. La fonte del sistema sono le lezioni **01–08 esistenti**, i loro componenti condivisi e il risultato renderizzato. La modalità è lettura e spiegazione didattica: il pubblico deve distinguere l’idea, osservare l’esempio e ritrovare la fonte.

La lezione 09 e le successive applicano questi stessi ruoli. Il documento non introduce una nuova identità né trasforma le tavole del booklet in un tema per le slide. Il `progetti/booklet/DESIGN.md` alla radice rimane esclusivo del booklet. `progetti/slide/docs/design-slidev.md` conserva la documentazione di funzionamento e le specifiche dei singoli set.

I valori qui registrati descrivono il sistema implementato; i token CSS rimangono la fonte utilizzata dall’applicazione. Un cambiamento intenzionale del sistema aggiorna insieme codice e contratto. Una variante specifica conserva le regole comuni e dichiara quale problema didattico risolve.

| Riferimento | Sorgente | Modelli osservati |
| --- | --- | --- |
| 01 · Il corso | `progetti/slide/slides.md` | Copertina metro, titolo fisso, calendario, card, indice e collegamenti |
| 02 · Introduzione a UX e UI | `progetti/slide/lezioni/01-introduzione.md` | Sintesi, obiettivi, concetti, confronti e attività |
| 03 · Storia del design | `progetti/slide/lezioni/03-storia-design.md` | Opere, immagini affiancate, didascalie e attribuzioni |
| 04 · Ricerca, contesto e inclusione | `progetti/slide/lezioni/04-ricerca-inclusiva.md` | Obiettivi, card, figure documentarie e casi |
| 05 · Accessibilità e design inclusivo | `progetti/slide/lezioni/05-percezione-gerarchia.md` | Scenari, confronti e dimostrazioni interattive |
| 06 · Gestalt | `progetti/slide/lezioni/06-gestalt.md` | Figure dominanti, documenti a tutta gabbia e attività |
| 07 · Colore e significato | `progetti/slide/lezioni/06-colore.md` | Spiegazione e figura dominante, diagrammi e attività |
| 08 · Tipografia | `progetti/slide/lezioni/07-tipografia-griglie.md` | Obiettivi, divisori, campioni, gallerie e fonti |

## Colors

Ogni lezione possiede una sola identità cromatica. Il registro `utils/slide-sets.ts` assegna la palette e `slideSetStyle` ne distribuisce i ruoli; `risorse-condivise/stili/tokens.css` conserva i valori ufficiali Tailwind e il catalogo degli accenti.

| Lezione | Alias della palette | Famiglia Tailwind | Accento del catalogo |
| --- | --- | --- | --- |
| 01 | `course` | red | Menta |
| 02 | `introduction` | orange | Ciano |
| 03 | `history` | lime | Magenta |
| 04 | `ux-research` | green | Corallo |
| 05 | `ux-perception` | emerald | Rosa fragola |
| 06 | `ux-gestalt` | teal | Mandarino |
| 07 | `ux-color` | cyan | Vermiglio |
| 08 | `ux-type` | sky | Ambra |
| 09 · continuazione | `ux-grid` | blue | Giallo limone |
| 10 · continuazione | `ux-composition` | indigo | Lime |
| 11 · continuazione | `ux-process` | violet | Cedro |

Il brief usa amber e gli approfondimenti yellow: sono materiali raggruppati con l’introduzione e spiegano i passaggi intermedi della sequenza del menu.

- Il primario è la tinta 800; canvas e stato profondo usano 900 e 950. Superfici chiare usano 50 e 100.
- L’accento ha tre ruoli distinti: inchiostro su chiaro, superficie tenue, tinta vivida su scuro. Non usare la tinta vivida come testo minuto su fondo chiaro.
- Copertina, pulsante dell’indice, nastro, azioni, dialoghi e avanzamento appartengono alla stessa lezione, anche quando la slide è inattiva o viene stampata.
- La superficie ordinaria e i colori del testo sono i neutri del frontmatter. Le copertine usano testo bianco sul primario.
- Opere, screenshot, campioni e diagrammi documentari conservano i colori originali. Il salvia di una figura del capitolo Griglie non diventa blue per imitare la cornice della presentazione.

## Typography

Le slide ordinarie usano **Nunito Sans locale**, con Inter locale come fallback. Le aperture metro usano **Inter**. Il font contenuto in uno specimen o in un’opera è contenuto didattico e conserva il disegno originale.

La scala condivisa è in `progetti/slide/styles/typography.css`; la cascata finale di `progetti/slide/styles/theme.css` determina i pesi e gli allineamenti effettivi.

| Ruolo | Regola |
| --- | --- |
| Titolo ordinario | Ruolo `title` del frontmatter; massimo due righe quando il testo lo richiede |
| Introduzione | Ruolo `lead`; una proposizione che orienta la lettura |
| Prosa e liste | Ruolo `body`; parole chiave in peso 600, senza interi paragrafi in grassetto |
| Card | Titolo 24/1,35, peso 600; corpo 20/1,5, peso 400 |
| Nota o fonte breve | 18/1,45; separata dalla spiegazione principale |
| Didascalia effettiva | Ruolo `caption`, normale e allineato a sinistra; vale per `.lesson-caption`, anche dentro `figcaption` |
| Sintesi | Enunciato 40/1,3, peso 600; supporto 27/1,48, peso 400 |
| Numero di lezione in copertina | Inter 20/1,2, peso 600, maiuscolo, tracking 0,08 em |
| Footer e contatore | Etichetta 14 px; numero pagina 16/1,2, peso 600 e cifre tabulari |
| Nastro | Etichetta 12/1,2, peso 700 e maiuscolo |

Non ridurre la scala del testo per far entrare una spiegazione. Separare i passaggi o scegliere un modello di slide più adatto. La dimensione del wrapper di una didascalia non dimostra la dimensione del suo testo: verificare lo stile calcolato del nodo visibile.

## Layout

Il canvas è **1280 × 720, 16:9**. Slidev scala l’intera composizione; il viewport stretto non trasforma il contenuto in una pagina a scorrimento.

- Titolo ordinario ancorato a **x 72, y 52**, margine inferiore 24. Il segno colorato sotto il titolo misura 48 × 2 e mantiene la posizione condivisa.
- Margini laterali 72, riserva inferiore 82. Corpo centrato verticalmente nell’area rimasta fra titolo e footer, come unico gruppo.
- Footer a 30 dal fondo, con le stesse estremità laterali; avanzamento a 14 dal fondo. La numerazione è autonoma per presentazione.
- La spaziatura segue i ruoli del frontmatter. Il gap ordinario fra colonne è 48.
- Due colonne spiegazione/figura usano proporzioni 0,9/1,1. La variante con figura dominante usa 0,55/1,45 solo se la spiegazione resta leggibile nella colonna ridotta.
- Una coppia di documenti confrontabili usa l’intera gabbia, in due colonne uguali. Se la spiegazione sottrae troppo spazio, occupa la slide precedente, con un raccordo esplicito.
- Una tavola orizzontale usa il modello con spiegazione sopra e figura larga sotto. Conservare nella spiegazione anche i collegamenti presenti nei dati.
- Un documento da osservare in dettaglio può occupare una slide autonoma, con caption e zoom. Non collocare due documenti complessi dentro la sola metà destra per rispettare una simmetria astratta.

Prima scegliere la composizione in funzione dell’esempio; poi verificare immagine, testo e didascalia insieme. Un’immagine dentro il canvas può comunque risultare troppo piccola: l’ispezione a dimensione di presentazione integra i controlli geometrici. Le etichette incorporate nelle fonti non vengono ridisegnate o sostituite con font diversi.

## Elevation & Depth

Il fondo ordinario è piano. Card e pulsanti dell’indice usano l’ombra tenue condivisa `--theme-shadow` (0 8px 24px, inchiostro al 5%); il nastro ha la propria ombra contenuta. Le immagini e gli ingrandimenti restano senza cornici, ombre, angoli o supporti decorativi aggiunti.

## Shapes

Card e pulsanti dell’indice hanno angoli da 16; azioni e avvisi usano i componenti esistenti con angoli da 12. Il nastro conserva il taglio inferiore del componente `SlideRibbon`. La metro usa tracciati e tacche, non icone ornamentali aggiunte.

## Components

### Apertura di lezione e divisori esistenti

Usare `default`, `chapter-slide` e `ChapterMetro`. La copertina ha margini laterali 68, titolo `chapter` del frontmatter e numero a y 64. L’area del testo resta libera da linee e stazioni, con almeno 16 di distanza dal tratto. Ogni lezione ha una geometria riconoscibile nel catalogo `progetti/slide/data/cover-routes.ts`. La lezione 09 usa soltanto la copertina metro, senza diapositive divisorie intermedie.

Le aperture omettono footer, nastro e avanzamento. Gli otto divisori esistenti della lezione 08 restano invariati: riusano la sua geometria, aggiungono il numero della sezione e hanno `sectionDivider: true` e budget zero; entrano nella numerazione. Questa composizione non è una regola per le nuove lezioni. La cover generale del corso, con mappa multicolore e banda, conserva la sua variante originale.

### Sequenza iniziale

La copertina è seguita dalla sintesi nel layout `summary`: un’idea centrale e una spiegazione, distanti 32, entro una larghezza di 1000. Le lezioni teoriche usano poi obiettivi brevi, normalmente tre card `CvediCard`, come nelle lezioni 02, 04, 07 e 08. La lezione 01 conserva l’organizzazione specifica delle informazioni sul corso.

### Spiegazioni e attività

Riutilizzare `lead`, `cvedi-list`, `CvediCard` e `CvediNotice`, scegliendo il modello in funzione del contenuto. Le card hanno padding 24 e gap 24; le illustrazioni già catalogate mantengono il proprio spazio, senza invadere il testo. Non aggiungere card per incorniciare prosa ordinaria.

Gli obiettivi illustrati a tre colonne, come nelle lezioni 08 e 09, usano immagini decorative da 96 × 96 nell’angolo inferiore destro (offset −16), opacità 0,6 e padding inferiore 112. I soggetti seguono il significato della card e la palette della lezione; catalogo, prompt e originali restano separati dal contenuto Markdown.

Le attività dichiarano `lesson-activity`: consegna nel lead, operazioni nella lista, tempo in un’`aside` distinta («Attività · 8 minuti»). I minuti visibili devono concordare con il budget nei dati; spostare il tempo fuori dal lead non riscrive la consegna.

### Copione nelle note della lezione 09

Le note autorizzate della lezione 09 sono prosa italiana per sintesi vocale, separata dai contenuti visibili e indicizzata per alias in `speaker-notes.json`. Usare paragrafi brevi senza enfasi Markdown, URL o notazione matematica grezza. Su richiesta dell’utente, tutte le 63 note usano direttamente `[calm, matter-of-fact delivery]` e stabilità e somiglianza comuni 0,90 in `audio-settings.json`, senza eccezioni per singola slide. Le pause sono più frequenti nei cambi di idea e nei confronti: `[pause]` è il riferimento ordinario, `[short pause]` resta soltanto dentro passaggi continui. Il copione contiene 380 pause, di cui 330 ordinarie e 50 brevi. I tag accompagnano il testo completo nelle note Slidev e nella vista relatore; rimuovendoli si deve recuperare ogni carattere del copione conservato in `speaker-notes-original.json`. Il parlato spiega i passaggi e gli esempi, mantiene i raccordi della sequenza attiva e non reintroduce i materiali archiviati. Numeri, unità e formule si esprimono come devono essere pronunciati. Le attività richiedono una pausa autonoma; apertura e fonti sono brevi, con congedo solo nell’ultima slide. La lezione 08 conserva il proprio formato di note, con parole chiave in grassetto; le altre lezioni non ricevono note senza richiesta.

### Audio approvati della lezione 09

Tutte le 63 slide dichiarano `narrationAudio` nel frontmatter generato dalla selezione `progetti/slide/assets/booklet/lezione-griglie/audio-approved.json`. Il componente condiviso `LessonAudio` usa i pulsanti daisyUI `btn` e `join join-vertical`, le icone HeroIcon e la palette proprietaria. Tre pulsanti da 32 × 32 px con icone da 18 px sono disposti in colonna, centrati verticalmente a 24 px dal bordo destro. Le azioni Riproduci, Pausa e Ricomincia sono indicate dalle sole icone, con nomi accessibili e tooltip; restano fuori dalla gabbia dei contenuti e la sintesi conserva il proprio centramento. Le note riportano il testo completo usato nella sintesi, comprese le indicazioni vocali. La selezione copre tutte le 63 nuove registrazioni con tono neutro, stabilità e somiglianza 0,90; non contiene alias in attesa. Le verifiche confrontano parole, ricevute, hash e fingerprint con le note e i parametri correnti. I 21 MP3 precedenti sono eliminati dopo la verifica delle sostituzioni; i relativi metadati e ricevute restano in `archivedClips` del manifest audio.

Riproduzione e caricamento partono su richiesta. Al cambio slide, con scheda nascosta e in stampa l’audio si ferma; non riparte al ritorno. Il player è assente nelle anteprime delle altre slide, nella panoramica e in stampa. Gli errori permettono di riprovare con Riproduci. Il mirror web comprende soltanto i 63 originali selezionati, pubblicati su GitHub Pages insieme alla lezione 09. I percorsi audio rispettano la base del sito. Nel pulsante Griglie dell’indice un piccolo altoparlante, accompagnato dall’indicazione accessibile «Audio disponibile», segnala la presenza delle registrazioni senza alterare la griglia dei collegamenti. Ricevute archiviate e chiave ElevenLabs non fanno parte dell’output web.

### Formule matematiche

Usare il supporto nativo Slidev/KaTeX, senza un’altra dipendenza. La prosa conserva Nunito Sans; i simboli matematici usano i glifi di KaTeX e mantengono insieme HTML visivo e MathML accessibile. Le formule di Griglie sono blocchi Markdown `$$`, separati dall’HTML con righe vuote: i delimitatori inseriti direttamente in un paragrafo HTML non vengono interpretati.

La regola generale usa `lesson-equation` a 30 px; l’esempio numerico usa `lesson-equation-example` a 26 px. Entrambi hanno margini verticali di 20 px; il contesto dell’esempio è separato dal contenuto precedente di 20 px. Il paragrafo e il contenitore KaTeX ereditano il corpo del blocco. Le unità sono in tondo con `\mathrm{mm}` o `\mathrm{px}`, precedute dallo spazio sottile `\,`; testo esplicativo, figure documentarie e relative attribuzioni conservano i propri ruoli.

### Figure, didascalie e fonti

Le tabelle didattiche sono HTML nativo, con `table`, intestazioni `th` e `scope` di riga o colonna. Non esportarle come immagini. Testo selezionabile, corpo almeno 20 px e token del set valgono anche in stampa. `LessonTable` riusa daisyUI; gli eventuali originali grafici restano nei registri di provenienza. Diagrammi, mappe e documenti illustrativi conservano il formato pertinente.

`LessonFigure` conserva proporzioni, testo alternativo, didascalia, attribuzioni e zoom comune. Il controllo di ingrandimento rimane raggiungibile da tastiera, il dialogo si chiude con Escape e restituisce il focus. Un cambio slide chiude il dialogo.

La didascalia segue i pixel con distanza 12. Nei confronti affiancati dispone dell’intera larghezza della propria colonna. Le gallerie che descrivono un unico gruppo possono avere una caption comune esterna alle celle, come nella lezione 08; documenti con descrizioni e diritti distinti mantengono le proprie caption in colonne sufficientemente larghe.

Le fonti brevi restano accanto alla spiegazione pertinente; le liste finali raccolgono i collegamenti completi. Un ramo del generatore per figure larghe non deve eliminare link, diritti o passaggi della prosa. Originali, licenze e mappe restano nei manifest, separati dal Markdown generato e dalla presentazione.

Il modello `teaching-figure` della lezione 09 dispone una breve introduzione sopra un diagramma dominante, con `LessonFigure`, caption, attribuzione e collegamenti della fonte sotto. È adatto ai confronti che richiedono l’intera larghezza per leggere etichette e relazioni. Quando l’introduzione comprende una formula, come nel box model e nel rapporto aureo, lead e KaTeX occupano due colonne affiancate con gap 48 e allineamento centrale: i margini della formula sono azzerati in questa riga, conservando il corpo previsto. Le spiegazioni necessarie restano nel lead o nella caption del catalogo; il modello non le elimina per ingrandire la figura.

### Movimento, navigazione e stampa

Il ritorno al menu usa `LessonDeckNavigation` e `btn btn-xs`: altezza 24 px, testo 12 px e freccia 14 px. È a filo del bordo sinistro del viewport, rispettando l’eventuale area sicura del dispositivo, con angoli arrotondati soltanto a destra. Conserva etichetta visibile, nome accessibile e focus interno; è nascosto in stampa.

Le animazioni condivise entrano soltanto nella slide attiva e visibile; movimento ridotto, scheda nascosta e stampa mostrano uno stato completo e statico. Le copertine e gli otto divisori esistenti della lezione 08 riusano i tempi del sistema. L’avanzamento usa il contatore reale e un accento della palette proprietaria.

Conservare alias e ritorno al menu; non attivare set archiviati o futuri. Le note esistenti della lezione 08 sono un’eccezione già autorizzata: il sistema visivo non autorizza nuove note o modifiche al presenter.

## Do's and Don'ts

- Derivare le nuove slide dai modelli 01–08 e dai token condivisi, verificando la cascata finale nel browser.
- Correggere il piano e il generatore della 09, poi rigenerare Markdown e mapping; una rigenerazione deve conservare il risultato.
- Controllare l’intera lezione su desktop, viewport stretto e stampa, includendo i dettagli delle figure, le caption, gli stati di zoom e i collegamenti.
- Eseguire `pnpm check:source` e `pnpm build` per nuovi inserimenti; scegliere anche i controlli pertinenti di layout, tipografia, movimento e avanzamento. Rapporti e screenshot restano in `reports/`.
- Non sovrascrivere il contratto del booklet, non modificare i CSS compilati a mano e non aggiungere regole tipografiche locali per aggirare un impaginato inadatto.
- Non trattare la sola assenza di overflow o il solo superamento di una dimensione minima dell’immagine come prova di qualità visiva.
- Non ricolorare opere o diagrammi originali, eliminare fonti o sostituire gli asset per uniformarli al tema.

## Schemi delle esercitazioni

Le immagini didattiche create o rifatte per `progetti/slide/esercitazioni/` seguono il riferimento approvato in `progetti/slide/assets/esercitazioni/schemi/riferimento-stile.png`. Usare fondo antracite, finestre grigio scuro con angoli morbidi e piccoli controlli circolari, testi chiari ad alto contrasto, forme essenziali e frecce rosa e ambra. Il colore distingue collegamenti o flussi; direzione e significato restano leggibili anche dalla geometria e dalle etichette. Il codice usa il carattere monospaziato e accenti leggibili sul fondo scuro.

Prima ricavare dall’originale tutti gli oggetti, le etichette e le relazioni orientate; poi ricostruirli nel nuovo stile. Per gli schemi usare SVG modificabili, conservare originali, riferimento e attribuzioni nel manifest e presentare la figura con `LessonFigure`, testo alternativo e ingrandimento condiviso. Testo sopra e immagine sotto seguono la disposizione in colonna approvata. Verificare etichette e collegamenti alla dimensione effettiva della slide. La regola riguarda le nuove immagini delle esercitazioni; opere e screenshot documentari conservano il proprio aspetto.

## Applicazione alla lezione 10

Composizione e gerarchia visiva prosegue il sistema in indigo/Lime. La sola copertina usa la geometria originale `ux-composition`; seguono sintesi e tre obiettivi illustrati, senza divisori intermedi. Le coppie di opere mantengono caption a tutta colonna tramite `figure-comparison`, mentre i diagrammi dominanti riusano `teaching-figure`. Il confronto sfocato mostra una proposta dell’invito e la copia alla stessa scala, senza presentarlo come misura della comprensione. La nuova slide 59 riusa `screenshot-slide` per l’invito finale generato con ImageGen integrato: immagine dominante, titolo ordinario e ingrandimento condiviso. La didascalia visibile è rimossa su richiesta con `showCaption: false`; descrizione e attribuzione restano nei metadati. La composizione conserva i dati del laboratorio e combina luce come idea guida, gerarchia, allineamento, gruppi e contrasto sull’azione. PNG, prompt e provenienza sono separati in `assets/slide-materials/composizione/invito-finale/` e `lesson-figures.json`; il copione è nel relatore e la slide 59 dispone del proprio audio verificato con gli stessi parametri della lezione.

Su richiesta esplicita, anche tutte le 62 slide della lezione 10 hanno un copione italiano con originale separato, tono neutro e pause come nella 09. Su richiesta dell’utente, la sintesi delle 59 note abilitate usa gli stessi parametri di Griglie e layout, letti dal suo `audio-settings.json`: Cremarco, `eleven_v4`, italiano, stabilità e somiglianza 0,90, MP3 44,1 kHz a 128 kbps. `audio-approved.json` seleziona 59 file verificati, senza alias in attesa, per una durata complessiva di 60 minuti e 32 secondi. Le tre fonti finali hanno l’audio disattivato su richiesta con `narrationEnabled: false` nel piano; note e ricevute restano conservate; i MP3 disattivati sono eliminati su richiesta. Il generatore inserisce `narrationAudio` per ciascuna registrazione selezionata; il player condiviso conserva posizione, palette e comportamento della lezione 09. L’indice segnala la disponibilità audio con lo stesso altoparlante accessibile. Originali e ricevute restano in `assets/audio/lezione-composizione/`; il mirror contiene soltanto i file selezionati e la build non genera audio. La pulizia richiesta elimina i 21 MP3 non selezionati, conservando ricevute e hash in `archivedClips`; elimina inoltre 9 copie web inutilizzate e 5 file dei download rimossi. Le figure attive, gli intermedi necessari e gli originali canonici restano conservati. Questa autorizzazione riguarda soltanto il nuovo set. Prompt, originali e WebP lossless delle tre card sono in `assets/theme-imagegen/lesson-10-cards/`.

La slide 22 distingue looking room orizzontale e headroom verticale con un ritratto didattico generato con IA, testa intera e annotazioni vettoriali DM Sans. `figure-overrides.json` conserva la correzione esclusiva delle slide e la provenienza della figura sostituita; il capitolo e il raster acquisito restano invariati. Didascalia, alternativa testuale e copione corrispondono alla figura corretta; il relativo audio segue il copione corretto, con la ricevuta precedente conservata e il MP3 non più attivo eliminato nella pulizia richiesta. La nota della slide 48 descrive le scene Diesel con la cassetta postale e il cono stradale sulla testa e raccorda al Cenacolo. Gli esempi Fortnite, Dead Space, le due tavole moodboard e il blocco conclusivo di materiali, attività, restituzione e chiusura, con copioni e metadati audio, restano in `excluded-slides.json`; il budget attivo è 69 minuti e la numerazione è 1–62.


## Applicazione alla lezione 11

Il prototipo navigabile riprende i wireframe approvati: intestazione bianca, risultati in schede con iniziali, dettaglio distinto dal riepilogo e azioni principali in evidenza. V0 usa i grigi della media fedeltà; V1–V3 applicano violetto e Cedro. Titoli e comandi comuni provengono da `data/ux-wireframe-sequence.json`; dati dinamici e revisioni restano in `data/ux-service-prototype.json`. I controlli didattici restano nel pannello esterno. V0 conserva il costo tardivo e il comando ambiguo «Prenota»; le versioni successive continuano a distinguere invio, risposta e recuperi.

La slide «Lo stesso riepilogo, tre livelli di fedeltà» confronta il riepilogo già definito nei bozzetti a mano, nella media e nell’alta fedeltà. La tavola ImageGen conserva Giulia Riva, domicilio, data, orario, durata, totale, richiesta e modifica dei dati. Il precedente SVG generico resta in `archivedImages`; alias, durata e numero di slide sono conservati. Originale, derivato lossless, tre riferimenti e prompt sono nella serie `lesson-11-wireframes`.

Le nove tavole dei wireframe sono immagini ImageGen nel layout `screenshot-slide`: prima tre bozzetti a mano, poi le stesse sei schermate a media fedeltà e infine ad alta fedeltà. I contenuti del caso sono identici nei tre livelli. Il tratto a mano e i grigi precedono violetto e Cedro della proposta UI. Nessuna cornice aggiunta alle immagini; `LessonFigure` mantiene proporzioni, alternativa, caption da 18 px e zoom condiviso. Dati, PNG, prompt, riferimenti e WebP lossless sono separati nei registri della serie `lesson-11-wireframes`.

`UxServiceArchitecture` ricostruisce la figura `sitemap` con testo HTML selezionabile e connessioni SVG senza frecce. La costruzione dall’alto al basso termina in 2,25 secondi e si ripete con «Rianima», conservando il focus. Dati e provenienza sono in `data/ux-service-architecture.json`; titoli 24 px, corpo 20 px, tre colonne e intervalli 48 px mantengono la gabbia comune. `useSlidePlayback` restituisce l’albero completo con movimento ridotto, scheda nascosta, slide inattiva, stampa ed export. La didascalia originale compare una sola volta. `node progetti/slide/scripts/check/ux-service-architecture.mjs` verifica costruzione, ripetizione, stati statici e geometria sui tre profili.

Processo UX e UI prosegue in violet/Cedro con una sola copertina metro originale `ux-process`, seguita da sintesi e tre obiettivi `CvediCard`. I motivi vettoriali originali mantengono l’angolo illustrato da 96 px e la riserva inferiore condivisa da 112 px. Il corpo segue i modelli ordinari; le figure larghe usano `teaching-figure` e i documenti autonomi `screenshot-slide`, conservando caption, attribuzioni e zoom. Gli originali del capitolo conservano il cyan; le 23 ricostruzioni attive richieste per le slide usano Nunito Sans e violet/Cedro. La testata WCC Properties è esclusa dal percorso su richiesta; il ritaglio dichiarato e l’originale integrale restano conservati.

Le 119 slide sviluppano il processo attraverso il caso di Viola; due attività da 8 e 10 minuti usano `lesson-activity`. Non si aggiungono divisori intermedi, note del relatore o audio. Il set è pubblicato anche su GitHub Pages, insieme alle figure attive. Le verifiche specifiche misurano tutte le slide su desktop, viewport stretto e stampa e controllano indice, numerazione, tastiera e ingrandimenti.

L’estensione della lezione 11 aggiunge venti slide operative e sette diagrammi nativi, mantenendo i layout comuni e la scala tipografica. I riferimenti all’autore e al manuale sono omessi dalla presentazione; provenienza e piano precedente restano nei registri locali. Le caption degli schemi Processo e Viola usano override dichiarati esclusivi delle slide.

La mappa interattiva della lezione 11 riusa i cinque nuclei e i quattordici passi della panoramica. I nodi hanno bersaglio 44 px, testo da 20 px del ruolo card-body e numeri da 18 px; la sola selezione usa primario e testo bianco. Connessioni sottili indicano la sequenza. La mappa occupa 744 px a sinistra e presenta i cinque nuclei in righe, con titoli da 24 px e l’ultimo nucleo in 2×2; un intervallo da 32 px la separa dall’ispettore laterale da 360 px. Il pannello contiene obiettivo, attività e risultato in verticale e il collegamento alla spiegazione ancorato in fondo. I collegamenti scorrono negli intervalli fra righe e pulsanti; la fase attiva usa il primario anche nel titolo. Ritorno e istruzioni sono nel footer della sola mappa; l’ordine DOM mappa, dettaglio, footer conserva Tab verso la spiegazione e poi il ritorno. Le transizioni dei nodi sono disattivate per rendere immediata la selezione. Tastiera e tocco conservano il comportamento della presentazione; Escape esce dalla mappa. La stampa e l’export mostrano la figura nativa completa dei quattordici passi.

Le cinque illustrazioni editoriali aggiunte alla lezione 11 affiancano brief, ricerca, requisiti, wireframe e verifica nel modello comune `lesson-columns` (0,9/1,1). Riprendono contorni violetto scuro, superfici bianche e violetto tenue e accenti Cedro della famiglia delle card. Il fondo trasparente resta senza cornici; le figure conservano dimensioni e proporzioni, didascalia a 18 px, testo alternativo e zoom condiviso. Alias e contenuti preesistenti restano conservati nel percorso esteso. Originali PNG, prompt e WebP lossless sono separati in `assets/theme-imagegen/lesson-11-process/`; la provenienza della generazione resta nei manifest. Su richiesta dell’utente, le 47 figure CVeDI della lezione 11 omettono i crediti interni e le formule generiche «Esempio didattico simulato» e «Diagramma didattico» nelle didascalie. Descrizioni e crediti delle tre opere esterne rimangono visibili; `rights` conserva le attribuzioni originali e `displayRights` ne governa la visualizzazione, anche nello zoom e in stampa.

La revisione della lezione 11 usa i confronti a due o tre colonne della lezione 04 e i diagrammi dominanti delle lezioni 09–10. Le sequenze mantengono numeri e titoli vicini nello stesso gruppo; i confronti non acquisiscono numeri quando i concetti sono paralleli. La tabella delle decisioni usa corpo 23 px e intestazioni 20 px; la chiusura riprende `lesson-statement` da 42 px dell’Introduzione sopra tre concetti. Le enfasi native in `strong` individuano poche parole operative. I nuovi diagrammi geometrici adottano violet/Cedro e fondo trasparente; gli originali del capitolo conservano il cyan. Nessuna modifica alla scala comune o alle figure documentarie precedenti.

### Schemi ricostruiti della lezione 11

Su richiesta dell’utente, i 25 schemi integrati sono ridisegnati con gli stessi contorni Nunito Sans della prosa, palette violet/Cedro e fondo trasparente. Corpo nominale 15,5 pt e note 14 pt sulla gabbia da 800 pt nel canvas vettoriale da 842 pt producono almeno 20 e 18 px rispettivamente nel canvas Slidev. Le intestazioni usano 17 pt; l’interlinea e gli intervalli distinguono celle, gruppi e passaggi. Schemi alti come il flow diventano orizzontali; le tabelle conservano tutte le voci con testate violetto a testo bianco, ruoli laterali tenui e righe sottili. Questa revisione autorizzata riguarda i diagrammi didattici; documenti attribuiti e originali del booklet conservano il proprio aspetto e restano archiviati separatamente.


I confronti della lezione 11 separano gli avvisi dalla griglia con 16 px del ruolo related. Nei tre documenti `documentary-slide`, il controllo di zoom usa opacità 0,8 a riposo e conserva hover/focus a 1 tramite la variabile condivisa. I collegamenti della mappa usano opacità 0,85 per un contrasto almeno 3:1; la selezione porta il focus al passo attivo.

Le quattordici aperture di step condividono domanda, tre attività, risultato atteso e richiamo applicato a una lezione precedente, nelle stesse posizioni. La domanda occupa la riga superiore; attività e risultato formano due colonne in rapporto 2:1, separate da 48 px e da un filetto sottile sul risultato. Le intestazioni distano 12 px dai rispettivi contenuti. Il corpo resta a 23 px, la domanda a 27 px e il box «Argomenti già affrontati» a 20 px, con almeno 16 px sopra e la riserva inferiore comune di 82 px. I richiami trasformano ricerca, accessibilità, Gestalt, colore, tipografia, griglie e composizione in decisioni sul servizio di fisioterapia; il piano conserva file e alias delle slide richiamate. I diagrammi rimangono negli approfondimenti a tutta gabbia; le cinque illustrazioni affiancano introduzione, domande di ricerca, contenuti realistici, consegna e servizio reale. La UI annotata accompagna parole e comportamento. Tabelle, sequenze e schermate condividono gerarchie, distanze e allineamenti; i processi mantengono collegamenti espliciti. Il percorso esteso conserva 78 degli 80 alias originari e aggiunge 24 slide applicative, sette slide SMART, la sitemap del sito da realizzare e nove tavole di wireframe: 119 slide e 56 figure, con tre revisioni e quattro versioni navigabili dello stesso servizio. Le slide «Quanto dettaglio serve alla domanda?» e «Una struttura, una proposta visiva» sono escluse su richiesta; il piano e il catalogo conservano i contenuti e le figure negli archivi.

La sequenza SMART comprende cinque slide, una per Specific, Measurable, Actionable, Realistic e Time-based, e una sintesi applicata allo stesso servizio. I sei diagrammi nativi condividono stile, scala e ingrandimento. Le definizioni seguono le pagine fisiche 57–59 del manuale allegato; il registro locale conserva copia, hash e provenienza. `data/ux-smart.json` separa i contenuti dal renderer. Cinque partecipanti e due settimane sono proposte di pianificazione da concordare, mentre gli esiti devono ancora essere raccolti. La slide «Rendere osservabile un obiettivo» presenta l’infografica ImageGen con lettere, pittogrammi e significati; l’esempio sul compito di Viola è conservato nella slide successiva, prima dei cinque criteri e della sintesi. Originale trasparente, derivato lossless e prompt sono in `assets/theme-imagegen/lesson-11-smart/`. La sequenza conserva tutti gli alias precedenti.

La slide «Coinvolgere persone pertinenti» affianca il testo a Viola: il ritratto stilizzato approvato diventa un ritratto realistico con riflessi viola nei capelli. `ViolaPortraitReveal` riusa ingrandimento e ripetizione di `LessonFigure`; il passaggio parte una volta all’ingresso, dopo 900 ms, dura 1800 ms e si ferma. Movimento ridotto e stampa mostrano il ritratto realistico. Originale, prompt, riferimento e WebP lossless sono in `assets/theme-imagegen/lesson-11-viola-transition/`.

La slide «Formulare un’ipotesi da provare» è HTML nativo tramite `UxHypothesis`: quattro campi selezionabili, in due colonne, con titoli 24 px e corpo 23 px. `data/ux-hypothesis.json` conserva le stesse parole del diagramma; l’originale SVG rimane nel registro di provenienza. La slide non mostra immagini o comandi di ingrandimento.

Il caso progressivo della lezione 11 alterna apertura, applicazione allo scenario ed esempio. `case-application` usa decisione a sinistra e documento a destra, con tabella daisyUI a 20 px, etichette 18 px e passaggio dell’elaborato al passo successivo. Su richiesta dell’utente, le applicazioni omettono la didascalia ripetuta «Caso simulato»; la natura didattica del caso rimane nei dati e nelle spiegazioni pertinenti. `UxServicePrototype` mantiene il pannello didattico fuori dall’interfaccia del servizio, con controlli da almeno 44 px e testo di interfaccia 20–26 px. V0–V3 rendono visibili tre revisioni motivate; cinque schemi nativeDiagram e il confronto ImageGen V0 → V1 mostrano wireframe, confronti, stati, recupero, sistema visivo e blueprint finale. Gli schemi nativi mantengono la gabbia dei diagrammi condivisi; tutte le figure usano lo zoom comune.

La slide «V0 → V1 · Prima la compatibilità» confronta la stessa proposta nei risultati, riprendendo le schermate dei wireframe approvati. V0 mostra Giulia Riva e l’orario; V1 anticipa Via Esempio 12 a Milano, la fascia dopo le 20 e il totale di 60 € con spostamento incluso, prima di «Vedi visita». Il confronto resta sul passo dei risultati; invio e conferma sono trattati dalla revisione V2. La tavola ImageGen, il prompt e i due riferimenti sono nella serie `lesson-11-wireframes`; il precedente SVG resta in `archivedImages`.
