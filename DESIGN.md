# Sistema visivo CVeDI

La presentazione usa l'**indaco** come colore principale delle slide, con `#432DD7` per i titoli e le superfici piene. L'accento è un giallo della palette Tailwind: `yellow-700` (`#A65F00`) per i dettagli testuali su bianco e `yellow-400` (`#FDC700`) per badge, sottotitoli su indaco e barra di avanzamento. Le gradazioni di indaco differenziano titoli, superfici e grafici; il giallo segnala i dettagli importanti. L'indice anticipa invece i cinque colori dei futuri capitoli. Il testo corrente resta grigio; le slide con fondo indaco mantengono i titoli bianchi. Le immagini dei progetti e del libro conservano i colori originali come contenuto documentario.

La copertina riprende il motivo grafico originale del booklet a pieno canvas, con una fascia indaco opaca al centro. Titolo, metadati e docenti sono bianchi sulla fascia; il numero della slide resta nella stessa area per mantenere il contrasto.

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

Le sezioni del corso usano il tono indaco 700; esami e dati storici hanno titoli 800; progetto e archivio evidenziano il filetto con l'indaco 500. Tutte le card informative condividono la stessa superficie indaco 50. L'accento giallo scuro è riservato ai titoli secondari, alle percentuali, ai punti elenco e alla progressione; il testo corrente resta grigio. Le righe del calendario usano superfici indaco molto chiare. I grafici dei voti usano quattro toni di indaco ordinati per fascia; le altre immagini della sorgente conservano i propri colori originali.

Inter è usato per titoli, etichette e dati; Merriweather per il testo narrativo. I docenti nelle slide di programma sono identificati da un avatar DaisyUI con iniziali, una qualifica leggera e il nome in grigio semibold. Il blocco resta vicino al titolo, con più spazio prima dell’elenco. Le immagini importate dalla presentazione originale conservano il loro contenuto.

## Tipografia

I ruoli tipografici sono definiti in [styles/tokens.css](styles/tokens.css): titolo 55 px, introduzione 27 px, testo 21 px, titolo delle card 24 px, testo delle card 19 px, dati 17 px ed etichette 15 px. Copertina, aperture di capitolo e domande hanno dimensioni espressive proprie. Le introduzioni lunghe hanno una misura massima di 900 px; il calendario usa cifre tabulari. Inter e Merriweather sono caricati nei soli pesi e sottoinsiemi latini usati dalle slide.

La slide 2 è l'indice delle lezioni con cinque pulsanti daisyUI, uno per capitolo del booklet. Seguono l'ordine e i colori dei futuri capitoli: turchese, rosa, rosso, arancione e giallo. I pulsanti sono disabilitati e non contengono collegamenti, in attesa delle slide delle lezioni.

## Impaginazione

Titolo e contenuti formano un unico blocco centrato verticalmente nello spazio utile della slide, con margini laterali di 68 px. Il layout riserva almeno 64 px sopra e 88 px sotto; una zona inferiore separata ospita il footer. Le slide più dense occupano naturalmente più spazio, senza comprimere il contenuto o ridurre i caratteri. Gli intervalli ricorrenti sono 16, 24, 32 e 48 px. Domande, affermazioni, aperture e chiusura mantengono una composizione centrata. I capitoli non mostrano numeri decorativi; la chiusura riprende la mappa della copertina con una fascia indaco opaca dietro al testo. Il canvas 1280 × 720 viene scalato proporzionalmente, senza reimpaginare le colonne nei viewport stretti.

Le card informative si distinguono dalla pagina per superfici indaco molto chiare e la spaziatura interna; non hanno un bordo superiore colorato. Nella slide degli obiettivi, quattro illustrazioni SVG flat riprendono i concetti con forme geometriche, due toni di indaco e uno spessore di linea comune. Restano nell'angolo in basso a destra e non usano gradienti o ombre.

La slide dell'archivio usa 76 schermate reali dei siti in `progetti/`, ottimizzate come anteprime per il browser. Dodici tessere grandi riempiono il canvas senza spazi né bordi. Una tessera cambia ogni 1,4 secondi, in posizioni distribuite sulla slide, con una dissolvenza morbida e un leggero zoom. Tutti i progetti passano nel ciclo; le immagini vengono precaricate prima del cambio. Titolo e link all'archivio sono sovrapposti alle immagini in un box indaco opaco; il link usa il giallo d'accento. La rotazione si ferma fuori dalla slide, con movimento ridotto e in stampa; in quei casi resta un fotogramma statico.

Gli elenchi mantengono la struttura semantica HTML. Ogni voce usa un punto giallo scuro e una colonna di testo con rientro sospeso: le righe lunghe restano allineate all'inizio del testo. Tra le voci ci sono 24 px nelle slide e 16 px nelle card; gli elenchi ampi sono disposti su due colonne.

## Movimento

La timeline del progetto riprende le coppie di strisce della copertina: ogni linea colorata è larga 14 px, con un filetto bianco di 2 px e raccordi a 45°. La traccia attraversa tutto il canvas, da bordo a bordo, mentre le quattro fermate DaisyUI e le etichette mantengono i margini del contenuto. All’ingresso, un breve tratto giallo percorre la linea in 2,3 secondi e un anello discreto segnala l’arrivo alle fermate; la sequenza termina e riparte solo rientrando nella slide. In stampa e con movimento ridotto resta la mappa statica.

Le tre aperture dei capitoli riprendono il tracciato metro vicino al titolo, con geometrie disegnate sulla lunghezza effettiva del testo: “Il corso” ha una svolta compatta dopo il titolo, “Modalità d’esame” una tratta superiore più lunga e una discesa sul lato destro, “Archivio progetti” una linea che sale da sotto il sottotitolo e passa accanto al titolo. Le tracce attraversano il canvas da bordo a bordo e lasciano liberi i testi. Le linee sono indaco 500 sul fondo indaco e conservano lo spessore di 14 px; il separatore assume il colore del fondo. Il passaggio giallo parte dopo 520 ms, accompagnando l’ingresso del testo, e termina dopo un solo percorso. Il componente SVG `MetroTrack` condivide tratto, accento e movimento con la timeline; `ChapterMetro` contiene i tre percorsi. Anche queste linee restano statiche in stampa e con movimento ridotto.

La slide finale compone progressivamente la mappa della copertina, senza zoom o movimento della camera. Il raster `recolored_map` è stato convertito in tracciati SVG, con gruppi separati per colore e senza immagini incorporate, e caricato in Figma nel nodo [285:2031](https://www.figma.com/design/zcQ2n1HxQ3ll5LMzX6HMIs/Manuale_booklet?node-id=285-2031). Le slide importano lo stesso SVG caricato: l’esportazione dal connettore è bloccata dal limite del piano Figma e l’editor non ha restituito il download. `ClosingMetro` rivela i gruppi vettoriali lungo quindici percorsi, con partenze e durate diverse; i dettagli di fondo affiorano gradualmente e la mappa è completa dopo 10,5 secondi. Testo e fascia indaco rimangono fermi e leggibili. La sequenza riparte rientrando nella slide, non usa timer o librerie aggiuntive e mostra subito la mappa completa con movimento ridotto e in stampa. SVG e conversione riproducibile sono conservati in `assets/metro-map/`; il componente contiene solo percorsi e tempi dell’animazione.

Il passaggio fra slide usa la dissolvenza nativa di Slidev: 260 ms in entrata e 150 ms in uscita. Le aperture di capitolo hanno un'entrata focalizzata: il titolo passa da un indaco vicino allo sfondo al bianco con uno zoom e una breve messa a fuoco (760 ms); il sottotitolo viene rivelato dopo 230 ms. I tre calendari mostrano le righe in ordine cronologico con un ingresso di 6 px e una dissolvenza: 360 ms per riga, ritardo progressivo di 28 ms e durata complessiva inferiore a 800 ms. L’intestazione rimane stabile; la sequenza riparte entrando nella slide. Con movimento ridotto e in stampa, tutte le righe sono subito visibili. Nelle slide dei voti le barre dei componenti `progress` si riempiono in sequenza: quattro fasce nelle distribuzioni e sei registri nel confronto, mentre numeri e testi restano sempre leggibili. Con la preferenza di sistema per la riduzione del movimento, le barre sono immediatamente complete, il titolo dei capitoli cambia solo colore in 180 ms, il sottotitolo resta fermo e la dissolvenza fra slide dura 80 ms.

## Implementazione condivisa

`layouts/default.vue` legge il contesto nativo Slidev per il numero della pagina, il totale e lo stato attivo. La label inferiore è il campo `footer` del frontmatter. Le animazioni si attivano con `is-active`, senza selettori legati agli attributi HTML interni del player.

Le 43 card usano `CvediCard`, i tre calendari `CourseCalendar`, la timeline `ProcessTimeline` e le quattro distribuzioni `GradeDistribution`. I componenti mantengono il markup nativo DaisyUI e i contenuti restano in `slides.md` o nei file JSON. Le intestazioni delle tabelle hanno `scope`; illustrazioni decorative escluse dall’albero accessibile; pulsanti dell’indice realmente disabilitati.

Il CSS è diviso in token, layout, componenti, dati e movimento; il file generato Tailwind non contiene modifiche manuali. La specificità del tema Slidev viene neutralizzata solo dove interferisce con il sistema: opacità dei paragrafi introduttivi e rientri di elenchi/timeline.
