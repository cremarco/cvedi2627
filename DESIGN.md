# Sistema visivo CVeDI

La presentazione usa l'**indaco** come colore principale delle slide, con `#432DD7` per i titoli e le superfici piene. L'accento è un giallo della palette Tailwind: `yellow-700` (`#A65F00`) per i dettagli testuali su bianco e `yellow-400` (`#FDC700`) per badge, sottotitoli su indaco e barra di avanzamento. Le gradazioni di indaco differenziano titoli, superfici e grafici; il giallo segnala i dettagli importanti. L'indice anticipa invece i cinque colori dei futuri capitoli. Il testo corrente resta grigio; le slide con fondo indaco mantengono i titoli bianchi. Le immagini dei progetti e del libro conservano i colori originali come contenuto documentario.

La copertina riprende il motivo grafico originale del booklet a pieno canvas, con una fascia indaco opaca al centro. Titolo, metadati e docenti sono bianchi sulla fascia; il numero della slide resta nella stessa area per mantenere il contrasto.

La slide 2 annuncia il rinnovo del corso per l’A.A. 2026/27 e l’aggiornamento di slide e materiale bibliografico completamente nuovi. Conserva il fondo indaco, il titolo bianco e l’accento giallo; il testo a sinistra è affiancato dal tracciato geometrico statico di `RenewalMetro`, con l’anno e le fermate “Slide” e “Bibliografia”. Un riquadro daisyUI giallo sotto le due colonne segnala la possibilità di errori, refusi o passaggi poco chiari e invita gentilmente gli studenti a comunicarli nel forum del corso.

La slide Bibliografia mostra la nuova copertina del booklet, [COP · 006 · DX, nodo 198:6329](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-6329), in `public/images/booklet/cover-metro.svg`. La vista pubblica di Figma è stata catturata dentro il Trimbox, escludendo i margini e l’interfaccia dell’editor; l’asset conserva grafica e testi della copertina originale.

| Ruolo | Token CSS | Valore |
| --- | --- | --- |
| Titoli, filetti, badge, tabelle e componenti | `--cvedi-indigo-700` | `#432DD7` |
| Accento per i dettagli su bianco | `--cvedi-detail-accent` | `#A65F00` |
| Accento su fondo indaco | `--cvedi-detail-accent-on-indigo` | `#FDC700` |
| Tono chiaro per le superfici | `--cvedi-indigo-50` | `#F7F6FF` |
| Tono intermedio per le superfici | `--cvedi-indigo-100` | `#EEECFF` |
| Bordi e separatori tonali | `--cvedi-indigo-200` | `#DCD7FC` |
| Titoli più profondi | `--cvedi-indigo-800` | `#3222A3` |
| Testo corrente | `--cvedi-body` | `#4B5563` |
| Testo secondario | `--cvedi-muted` | `#64727A` |
| Sfondo | `--cvedi-paper` | `#FFFFFF` |
| Bordi | `--cvedi-rule` | `#D0DAD8` |

## Palette dei capitoli nel Manuale booklet

Valori letti dagli stili colore del [file Figma](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=198-1687&p=f). Sono disponibili come token CSS in [styles/tokens.css](styles/tokens.css) per i futuri capitoli e già usati nei rispettivi pulsanti dell'indice; le altre slide mantengono indaco e giallo come colori di interfaccia.

| Famiglia | 500 | 700 | 800 |
| --- | --- | --- | --- |
| Turchese | `#00BBA7` | `#00786F` | `#005F5A` |
| Rosa | `#F6339A` | `#C6005C` | `#A3004C` |
| Rosso | `#FB2C36` | `#C10007` | `#9F0712` |
| Arancione | `#FF6900` | `#CA3500` | `#9F2D00` |
| Giallo | `#F0B100` | `#A65F00` | `#894B00` |
| Indaco | `#615FFF` | `#432DD7` | — |

Gli stili neutri del file sono `GRAY_50` (`#F9FAFB`) e `GRAY_950` (`#030712`). In Figma la famiglia indaco è chiamata `INDINGO`; nei token CSS è scritto `indigo` per coerenza.

Le variabili semantiche daisyUI in [styles/daisy.css](styles/daisy.css) usano l’indaco per `primary` e `secondary`, il giallo per `accent`; [styles/slides.css](styles/slides.css) varia il tono indaco per sezione. Card, stats, progress, timeline, badge e tabelle conservano le classi base daisyUI. La distinzione tra tipi di evento nel calendario è scritta nelle etichette, non affidata al colore. Anche la barra di avanzamento della presentazione usa `progress`. I grafici dei voti usano `progress` e `stats`; il confronto annuale usa `table` con `progress` nelle celle.

Le sezioni del corso usano il tono indaco 700; esami e dati storici hanno titoli 800; progetto e archivio evidenziano il filetto con l'indaco 500. Tutte le card informative condividono la stessa superficie indaco 50. L'accento giallo scuro è riservato ai titoli secondari, alle percentuali, ai punti elenco e alla progressione; il testo corrente resta grigio. Le righe del calendario usano superfici indaco molto chiare. I badge distinguono le lezioni in indaco dalle esercitazioni in turchese. Gli incontri annullati usano testo rosso 700 e badge rosso chiaro, mantenendo l'etichetta “Annullata” e la data barrata. I grafici dei voti usano quattro toni di indaco ordinati per fascia; le altre immagini della sorgente conservano i propri colori originali.

Inter è usato per titoli, etichette e dati; Merriweather per il testo narrativo. I docenti nelle slide di programma sono identificati da una qualifica leggera e dal nome in grigio semibold. Il blocco resta vicino al titolo, con più spazio prima dell’elenco. Le immagini importate dalla presentazione originale conservano il loro contenuto.

## Tipografia

Le illustrazioni decorative delle card riprendono il tratto indaco chiaro di “Slide e video”: piccoli pittogrammi vettoriali nell’angolo inferiore destro, a opacità ridotta. Sono estese alle slide 19–21, 23, 26–27, 29–31, 33, 36–38 e 53, dove aiutano a distinguere attività, capacità dell’AI, requisiti e consegne. Le griglie a due righe usano la variante compatta; le altre riservano una fascia libera sotto il testo. Calendari, regole, formule e grafici restano essenziali, mentre le slide con immagini grandi mantengono la propria composizione. Le decorazioni sono escluse dall’albero accessibile.

I ruoli tipografici sono definiti in [styles/tokens.css](styles/tokens.css): titolo 55 px, introduzione 27 px, testo 21 px, titolo delle card 24 px, testo delle card 19 px, dati 17 px ed etichette 15 px. Copertina, aperture di capitolo e domande hanno dimensioni espressive proprie. Le introduzioni lunghe hanno una misura massima di 900 px; il calendario usa cifre tabulari. Inter e Merriweather sono caricati nei soli pesi e sottoinsiemi latini usati dalle slide.

I testi usano il grassetto in modo selettivo per concetti chiave, requisiti, scadenze e numeri dell’esame. L’enfasi usa il peso 700 reale di Merriweather e il colore `--cvedi-ink`, distinguendosi dal testo corrente grigio senza aggiungere altri colori. Inter conserva il peso 700 per l’enfasi nelle note. Le note di supporto sono a 17 px; quelle dei grafici a 16 px, con interlinea più ariosa. Negli elenchi, un unico `span` contiene testo e grassetti per mantenere il rientro sospeso anche quando l’enfasi è interna alla frase.

I testi visibili sono rivolti agli studenti. Provenienza dei dati, gestione dei registri, dettagli di elaborazione e data di aggiornamento dei grafici restano nelle note del relatore; le slide mantengono le precisazioni utili a leggere i risultati. Le tabelle usano etichette esplicite come “Anno accademico” e “107 voti”.

La slide 3 è l'indice delle lezioni con cinque pulsanti daisyUI, uno per capitolo del booklet. Seguono l'ordine dei futuri capitoli: indaco, rosa, rosso, arancione e giallo. Solo “Introduzione” è attivo e porta alla slide 5 con la navigazione nativa Slidev. Gli altri quattro pulsanti sono realmente disabilitati: conservano una tinta molto chiara del proprio colore, testo grigio e cursore di indisponibilità. Il pulsante attivo usa lo stesso indaco delle slide, testo bianco, un indaco più scuro al passaggio del puntatore e un focus indaco visibile.

La slide 4 presenta le scorciatoie disponibili con elementi `kbd` daisyUI: distingue i passi delle animazioni dal cambio diretto di slide e raccoglie panoramica, salto e schermo intero. I tasti sono verificati sul codice della versione installata di Slidev; le due tabelle mantengono la composizione anche nel canvas scalato.

## Impaginazione

Titolo e contenuti formano un unico blocco centrato verticalmente nello spazio utile della slide, con margini laterali di 68 px. Il layout riserva almeno 64 px sopra e 88 px sotto; una zona inferiore separata ospita il footer. Le slide più dense occupano naturalmente più spazio, senza comprimere il contenuto o ridurre i caratteri. Gli intervalli ricorrenti sono 16, 24, 32 e 48 px. Domande, affermazioni, aperture e chiusura mantengono una composizione centrata. I capitoli non mostrano numeri decorativi; la chiusura riprende la mappa della copertina con una fascia indaco opaca dietro al testo. Il canvas 1280 × 720 viene scalato proporzionalmente, senza reimpaginare le colonne nei viewport stretti.

Le card informative si distinguono dalla pagina per superfici indaco molto chiare e la spaziatura interna; non hanno un bordo superiore colorato. Nella slide degli obiettivi, quattro illustrazioni SVG flat riprendono i concetti con forme geometriche, due toni di indaco e uno spessore di linea comune. Restano nell'angolo in basso a destra e non usano gradienti o ombre.

La slide dell'archivio usa 76 schermate reali dei siti in `progetti/`, ottimizzate come anteprime per il browser. Dodici tessere grandi riempiono il canvas senza spazi né bordi. Una tessera cambia ogni 1,4 secondi, in posizioni distribuite sulla slide, con una dissolvenza morbida e un leggero zoom. Tutti i progetti passano nel ciclo; le immagini vengono precaricate prima del cambio. Titolo e link all'archivio sono sovrapposti alle immagini in un box indaco opaco; il link usa il giallo d'accento. La rotazione si ferma fuori dalla slide, con movimento ridotto e in stampa; in quei casi resta un fotogramma statico.

Gli elenchi mantengono la struttura semantica HTML. Ogni voce usa un punto giallo scuro e una colonna di testo con rientro sospeso: le righe lunghe restano allineate all'inizio del testo. Tra le voci ci sono 24 px nelle slide e 16 px nelle card; gli elenchi ampi sono disposti su due colonne.

## Brief WHAT IF?

Le slide 24–30 presentano il progetto di un sito web solo in italiano per un’organizzazione che offre servizi del 2050 basati sull’evoluzione dell’AI. Conservano palette, scala tipografica e margini del booklet. Tre illustrazioni raster editoriali generate con imagegen accompagnano il brief, la definizione del concept e il passaggio al sito. La seconda versione riprende il linguaggio geometrico del booklet: figure astratte, forme nette, binari doppi e nodi circolari collegano persone, servizi e scelte. Indaco, lavanda e giallo su bianco, senza testo incorporato.

Le composizioni illustrate usano due colonne, con testo a sinistra e immagine contenuta a destra. Il concept e le pagine del sito sono descritti con liste di definizione, evitando testo sovrapposto alle immagini. Le sei direzioni dell’AI usano una griglia di tre colonne e due righe con le superfici delle card condivise. `NextMeIllustration` risolve i percorsi pubblici anche in sottocartelle ed esclude le immagini decorative dall’albero accessibile. Gli originali, il riferimento di copertina e i manifest dei prompt sono in `assets/next-me/`; il sito carica i file `*-v2.webp` in `public/images/generated/next-me/`. La prima versione è conservata per confronto.

## Movimento

Nella slide 10, una linea rosso 700 barra la precedente voce sul framework Bootstrap e la sola parola Bootstrap nella voce su JavaScript. Subito dopo viene applicato lo sticker giallo e indaco “Nuovo argomento 26/27 · Sarà comunicato”, generato con ImageGen su fondo trasparente e conservato in `public/images/generated/syllabus/`; il prompt è in `assets/syllabus/imagegen-manifest.json`. Il badge daisyUI contiene l’immagine con testo alternativo ed è posizionato in alto a destra, accanto all’intestazione, fuori dal flusso dell’elenco: le tre righe mantengono allineamento e spaziatura regolare. La sequenza dura 1,32 secondi e riparte rientrando nella slide; in stampa e con movimento ridotto, cancellazioni e sticker sono subito visibili.

Le timeline del progetto e dell’approfondimento riprendono le coppie di strisce della copertina: ogni linea colorata è larga 14 px, con un filetto bianco di 2 px e raccordi a 45°. La traccia attraversa tutto il canvas, da bordo a bordo, mentre le quattro fermate DaisyUI e le etichette mantengono i margini del contenuto. All’ingresso, un breve tratto giallo percorre la linea in 2,3 secondi e un anello discreto segnala l’arrivo alle fermate; la sequenza termina e riparte solo rientrando nella slide. In stampa e con movimento ridotto resta la mappa statica. Il percorso individuale riassume scelta dell’argomento, ricerca e analisi delle fonti, stesura del documento e consegna finale; la sua etichetta accessibile distingue le fasi dell’approfondimento da quelle del progetto.

Le tre aperture dei capitoli riprendono il tracciato metro vicino al titolo, con geometrie disegnate sulla lunghezza effettiva del testo: “Il corso” ha una svolta compatta dopo il titolo, “Modalità d’esame” una tratta superiore più lunga e una discesa sul lato destro, “Archivio progetti” una linea che sale da sotto il sottotitolo e passa accanto al titolo. Le tracce attraversano il canvas da bordo a bordo e lasciano liberi i testi. Le linee sono indaco 500 sul fondo indaco e conservano lo spessore di 14 px; il separatore assume il colore del fondo. Il passaggio giallo parte dopo 520 ms, accompagnando l’ingresso del testo, e termina dopo un solo percorso. Il componente SVG `MetroTrack` condivide tratto, accento e movimento con la timeline; `ChapterMetro` contiene i tre percorsi. Anche queste linee restano statiche in stampa e con movimento ridotto.

La copertina e la slide finale compongono progressivamente la mappa geometrica ricostruita nel nodo Figma [285:2031](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=285-2031). Le fasce sono forme piene senza bordi, larghe 18 px e distanti 4 px; le curve parallele sono concentriche. Il generatore in `assets/metro-map/build-geometric.py` produce lo SVG statico e gli stessi dati usati da `ClosingMetro`: ogni fascia ha una maschera animata sul proprio percorso esatto, mentre i 147 punti gialli restano cerchi separati e appaiono in sequenza. Entrambe le slide riutilizzano lo stesso componente e gli stessi tempi: la mappa si completa in 10,5 secondi; testo e fascia indaco rimangono fermi e leggibili. La sequenza riparte rientrando nella slide e mostra subito la mappa completa con movimento ridotto e in stampa. La precedente versione tracciata è conservata come riferimento storico.

Il passaggio fra slide usa la dissolvenza nativa di Slidev: 260 ms in entrata e 150 ms in uscita. Le aperture di capitolo hanno un'entrata focalizzata: il titolo passa da un indaco vicino allo sfondo al bianco con uno zoom e una breve messa a fuoco (760 ms); il sottotitolo viene rivelato dopo 230 ms. I tre calendari mostrano le righe in ordine cronologico con un ingresso di 6 px e una dissolvenza: 360 ms per riga, ritardo progressivo di 28 ms e durata complessiva inferiore a 800 ms. L’intestazione rimane stabile; la sequenza riparte entrando nella slide. Con movimento ridotto e in stampa, tutte le righe sono subito visibili. Nelle slide dei voti le barre dei componenti `progress` si riempiono in sequenza: quattro fasce nelle distribuzioni e sei registri nel confronto, mentre numeri e testi restano sempre leggibili. Con la preferenza di sistema per la riduzione del movimento, le barre sono immediatamente complete, il titolo dei capitoli cambia solo colore in 180 ms, il sottotitolo resta fermo e la dissolvenza fra slide dura 80 ms.

## Implementazione condivisa

`layouts/default.vue` legge il contesto nativo Slidev per il numero della pagina, il totale e lo stato attivo. La label inferiore è il campo `footer` del frontmatter. Le animazioni si attivano con `is-active`, senza selettori legati agli attributi HTML interni del player.

La build pubblicata online nasconde la barra dei comandi del player Slidev con `styles/published.css`, attivo tramite la classe `cvedi-published` impostata in produzione solo su host online. Localhost, loopback, indirizzi privati della rete locale e host `.local` conservano la barra anche servendo la build statica. La navigazione nativa con tastiera e gesti resta attiva; anteprima locale e vista relatore conservano i propri comandi. La regola seleziona la barra di Slidev attraverso il suo pulsante di avanzamento, lasciando liberi eventuali elementi di navigazione nei contenuti.

Le 53 card usano `CvediCard`, i tre calendari `CourseCalendar`, le due timeline `ProcessTimeline` e le quattro distribuzioni `GradeDistribution`. I componenti mantengono il markup nativo DaisyUI e i contenuti restano in `slides.md` o nei file JSON. Le intestazioni delle tabelle hanno `scope`; illustrazioni decorative escluse dall’albero accessibile; quattro pulsanti dell’indice realmente disabilitati.

Il CSS è diviso in token, layout, componenti, dati e movimento; il file generato Tailwind non contiene modifiche manuali. La specificità del tema Slidev viene neutralizzata solo dove interferisce con il sistema: opacità dei paragrafi introduttivi e rientri di elenchi/timeline.

## Indice dei progetti

La pagina autonoma `progetti/index.html` conserva il fondo scuro caldo dell’archivio (`#1C1917`), il testo chiaro (`#FAFAF9`) e l’accento lime (`#A3E635`) per il filtro generale e il focus. Inter riprende la famiglia del sistema condiviso. I testi secondari usano `#A8A29E`; il bordo del campo di ricerca `#78716C` mantiene almeno 3:1 rispetto alle superfici adiacenti. Le anteprime conservano i colori originali dei siti.

L’indice privilegia l’esplorazione: anni dal più recente al più remoto, anteprime in tre colonne su desktop, due su tablet e una su telefono. Le immagini hanno rapporto 16:10, bordo discreto, angoli di 12 px e didascalie libere dalla superficie della card. Il titolo usa una scala fluida di 32–60 px; i titoli annuali 22–26 px. I filtri mantengono i sei colori annuali dell’archivio originale, con conteggi ricavati dal JSON, selezione esplicita e navigazione da tastiera. Su schermi stretti scorrono orizzontalmente; la ricerca occupa la riga seguente. La barra dei controlli resta disponibile durante lo scorrimento.

La ricerca per nome si combina con l’anno e ignora maiuscole, accenti e punteggiatura. Il numero di risultati è annunciato separatamente dalla galleria. Ogni anteprima è un collegamento nativo che apre il progetto in una nuova scheda. Caricamento, errore con riprova, ricerca senza risultati, archivio vuoto e anteprima mancante hanno testi e azioni in italiano. Il solo movimento è il piccolo spostamento della freccia al passaggio sul link; con movimento ridotto resta ferma.

Il tema daisyUI dell’archivio, i font locali e gli stili compilati restano dentro `progetti/`, con URL relativi compatibili con la pubblicazione in `project/`. `gallery.source.css` è la sorgente; `gallery.css` viene generato da `pnpm css:projects`, incluso anche nella build Pages. Le regole delle slide restano nei rispettivi fogli di stile.
