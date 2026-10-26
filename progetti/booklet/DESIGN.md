# Design del booklet CVeDI

## Ambito e riferimenti

Questo documento definisce il sistema editoriale del **booklet**, per i prossimi capitoli e le revisioni richieste. Non disciplina le slide, il sito del corso o gli esempi web autonomi.

La fonte del sistema editoriale è [Figma](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC/Booklet?node-id=4286-534), aggiornata sulla base della Page [101 · Tipografia · Nuovo design](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC/Booklet?node-id=4226-16023). Le regole combinano i componenti e le misure osservati con i commenti di Marco Cremaschi e le sue risposte esplicite. Per l’edizione Typst valgono le varianti approvate e i componenti descritti qui: una loro modifica aggiorna questo documento, senza attestare modifiche al file Figma. Le istruzioni dell’utente prevalgono; le regole non ancora definite vanno chiarite prima di introdurle nel contratto.

Le descrizioni e i conteggi degli snapshot precedenti documentano le rispettive revisioni. Non sostituiscono queste regole né attestano che tutte le pagine esistenti siano già state adeguate. Folio, progressivi delle figure e colore del capitolo di Tipografia non diventano valori universali per gli altri capitoli.

## Guida operativa per le pagine Typst

Il progetto comprende i file `capitoli/00-frontespizio-indice.typ`–`08-composizione-gerarchia.typ`; `piano.json` governa numerazione, titoli, aperture e fonti. In `main.typ` i richiami `include-chapter(1)`–`include-chapter(8)` sono commentati per impostazione predefinita: l’utente attiva i capitoli desiderati togliendo `//` dalle rispettive righe, nel loro ordine di lettura. Frontespizio, crediti e indice restano attivi; l’indice elenca soltanto i contenuti inseriti. Ogni capitolo espone un unico `content`, condiviso dal volume e dalla compilazione autonoma. Si modificano nel capitolo la prosa e le proprietà editoriali di ogni figura; il posizionamento comune resta in `template/`. Gli identificatori Figma e i folio storici descritti più avanti servono a riconoscere le fonti.

### Proprietà editoriali e tipi delle figure

Ogni immagine dichiara nel sorgente del capitolo file, ID, didascalia, diritti, alternativa testuale e tipo. Il codice e i commenti dei componenti comuni sono in inglese; i valori di `format` riprendono il vocabolario editoriale italiano richiesto. Non sono ammessi template o scelte implicite basati sul numero del capitolo o sul codice storico della figura.

```typst
#image-figure(
  path("/progetti/booklet/assets/figure-singole/composizione/pranzo-grattacielo.jpeg"),
  [_Lunch Atop a Skyscraper_: scena di vita nella fotografia.],
  format: "una-colonna",
  id: "fig-comp-fotografia-illustrazione",
  rights: [Bettmann / Getty Images.],
  alt: "Lunch Atop a Skyscraper: scena di vita nella fotografia.",
  height: 110mm,
)
```

Cambiare `format` nella chiamata modifica la composizione nel volume, nel capitolo autonomo e nell’editor. **Scelta provvisoria dell’utente:** tutte le 49 figure prima dichiarate `format: "al-vivo"` usano ora `format: "una-colonna"`, con didascalia e diritti sulla stessa pagina. Sarà l’utente a scegliere quali riportare al vivo, modificando la singola dichiarazione nel capitolo. Non servono direttive nei commenti o una precompilazione. `caption` e `rights` restano contenuto Typst nativo, con corsivi, citazioni e note; la didascalia è il secondo argomento. `rights: none` omette la riga dei diritti. L’ID genera un’unica etichetta nativa: non aggiungerla nuovamente dopo la chiamata. I cataloghi e i manifest conservano provenienza, originali e licenze.

| `format` | Composizione | Opzioni caratteristiche |
| --- | --- | --- |
| `una-colonna` | Figura ordinaria nella colonna da 66 mm, didascalia e diritti sulla stessa pagina. | `width`, `height`, `placement` |
| `due-colonne` | Figura ordinaria sulla gabbia da 137 mm, con la propria didascalia. | `height`, `placement` |
| `tutta-pagina` | Foglio dedicato con margini, folio, immagine integra e didascalia. | `aspect-ratio`, facoltativo |
| `al-vivo` | Immagine sul foglio fino ai bordi, senza folio; didascalia con miniatura sulla pagina fisica precedente. | `anchor`, `crop` |
| `al-vivo-esterno` | Immagine al bordo destro sulle pagine destre, al bordo sinistro sulle sinistre; didascalia nella gabbia della stessa pagina. | `width`, `height`, `placement` |
| `sagoma` | Testo attorno al profilo trasparente nella colonna; il seguito torna al flusso ordinario. | `profile`, `width`, `side`, corpo `[...]` |
| `sagoma-pagina` | Un corpo continuo nelle regioni sagomate di un foglio. | `profile`, `width`, `image-start`, `image-bottom`, corpo `[...]` |
| `sagoma-doppia` | Un corpo continuo attorno alla stessa sagoma su due fogli pari/dispari. | `profile`, `width`, `image-start`, `image-bottom`, `outer-notes`, corpo `[...]` |
| `doppia-pagina` | Un documento rettangolare attraversa il dorso, con scala e quota comuni. | `dimensions`, `left-body`, `right-body`, `minimum-y` |
| `capolettera` | Iniziale illustrata scontornata senza figura numerata; il corpo prosegue dalla seconda lettera della parola. | Didascalia `none`, `profile`, `width`, `letter`, corpo `[...]` |

Le figure ordinarie ereditano il posizionamento nativo; `placement: none` le mantiene nel contenitore corrente. Con `height` si limita l’altezza dell’immagine e si misura anche la didascalia per tenere insieme il gruppo nella zona del testo. `constrain: false` conserva i float documentari già presenti in Ricerca, con il solo limite alla visuale. `aspect-ratio`, se omesso, deriva dall’asset. Le quote riguardano la visuale, senza fissare righe o folio della prosa. Il formato al vivo conserva il rifilo esplicito di ogni immagine (`crop: false` per l’opera integra).

Fra le figure convertite provvisoriamente da al vivo a una colonna, Wolgemut, Nature Valley, Albers 231 e Orazio dichiarano `height: 110mm`: la misura congiunta di immagine e didascalia evita tagli e sovrapposizioni con le tavole vicine, senza fissare pagine o righe del testo.

Le sagome richiedono un profilo alpha valido, caricato con `json(path(...))`. Devono restare almeno 108 pt di testo e 8 pt di rispetto; `side: center` richiede questo spazio su entrambi i lati. Le doppie partono da una pagina pari. L’eccezione del Duomo resta dichiarata nel capitolo: immagine al vivo inferiore e note nelle colonne esterne. Le altre sagome mantengono le proprie quote esplicite.

Per distribuire più immagini indipendenti in uno stesso flusso usare `image-spread(figures, pages: 2)[...]`, esportato da `figures.typ`. Ogni elemento di `figures` dichiara `format: "sagoma"`, `file`, `profile`, `id`, `caption`, `rights` e `alt`; `page` vale 0 o 1 rispetto all’inizio della sequenza. `x`, `y` e `width` posizionano soltanto la visuale nella gabbia; `caption-x` e `caption-width` regolano la propria didascalia. La prosa scorre prima nella colonna sinistra, poi nella destra e nella pagina successiva, senza spezzature manuali. Ogni immagine conserva il proprio numero e il proprio richiamo. Il seguito riprende il flusso ordinario. `start-page: auto` usa le prossime pagine consecutive; `"even"` e `"odd"` sono disponibili quando la composizione richiede una parità precisa. Le immagini distribuite separatamente non attraversano il dorso.

```typst
#image-figure(path("/progetti/booklet/assets/illustrazioni-palette-capitoli/originali/lettera-a-tridimensionale.png"),
  [La lettera come oggetto: forma, controforma, materia e ombra.],
  format: "sagoma", id: "fig-tipo-lettera-materia",
  profile: json(path("/progetti/booklet/assets/illustrazioni-palette-capitoli/derivati/lettera-a-tridimensionale.json")),
  width: 70pt, side: right,
  alt: "Lettera a tridimensionale su fondo trasparente.",
)[
  Il testo resta prosa nativa e scorre attorno al profilo.
]
```

Ogni opera, fotografia o schermata indipendente usa normalmente una figura autonoma, con file, tipo, ID, didascalia, diritti e alternativa testuale nel capitolo. Non accorpare esempi soltanto perché compaiono nello stesso paragrafo, illustrano lo stesso argomento o appartengono allo stesso autore. Anche i wrapper SVG devono rispettare la regola: un unico file non giustifica un collage di immagini indipendenti. Doisneau e Widener, siti differenti, locandine e copertine hanno figure separate e possono scorrere autonomamente.

Riprodurre ogni immagine una sola volta nel capitolo. Nei passaggi successivi richiamare la figura esistente con un rimando nativo, anche se il tema della discussione cambia. Risoluzioni, formati o ritagli differenti della stessa fotografia non costituiscono nuovi esempi; un dettaglio ripetuto è ammesso soltanto quando viene analizzato come tale e la didascalia chiarisce la relazione con l’originale. In Composizione, Doisneau compare soltanto in «Contesto e interpretazione»; il paesaggio xilografico resta una figura autonoma, richiamata anche nella spiegazione del colore, senza il precedente collage cromatico.

Nei crediti stampati delle immagini mantenere autori, enti, fonti e licenze specifiche. Su richiesta dell’utente, omettere le formule generiche sull’autore non identificato e sui diritti dei rispettivi titolari, comprese le varianti per fotografie, marchi e siti. Se non resta un’attribuzione specifica, omettere `rights` oppure usare `rights: none`, senza una riga sostitutiva. Provenienza e informazioni originali restano nei cataloghi e nei manifest locali.

Unire più immagini soltanto quando la lettura simultanea è necessaria: confronto controllato fra condizioni, sequenza temporale, classificazione morfologica, relazione fra un documento e i suoi dettagli. Takete–Maluma, barriere/scelte accessibili, prove di kerning, fotogrammi consecutivi e ingrandimenti dello stesso documento restano unitari. Le opere e gli screenshot che contengono già più elementi si conservano integri; non se ne smontano la grafica originale, i marchi o le interfacce. Anche le moodboard conservano la propria composizione come oggetto dell’analisi.

I confronti necessari usano normali `figure()` Typst con `kind: image`, `caption: caption-content(...)` e un’etichetta nativa. Il corpo e la scelta fra una o due colonne sono nel capitolo. `grid()` organizza soltanto i pannelli della visuale. Usare `keep-together()` esclusivamente per una relazione didattica che richiede vicinanza; le opere autonome non condividono float o griglie forzati. Su richiesta esplicita dell’utente, le locandine di _Barbie_ e _Dune_ sono impilate nella stessa colonna con `keep-together(columns: 1)`: ciascuna conserva una chiamata `image-figure()` con `format: "una-colonna"`, altezza della visuale di 60 mm, ID, numero, didascalia e diritti propri. Esercizi, aperture, bibliografie e Appunti restano componenti di pagina. Gli originali delle composizioni precedenti rimangono conservati; `assets/figure-singole/manifest.json` documenta copie identiche e pannelli SVG separati, senza rasterizzazione.

Se la didascalia di una figura composta usa lettere per distinguere i pannelli, le stesse lettere devono essere visibili accanto ai pannelli, con identici ordine e maiuscole/minuscole. Le lettere editoriali dei pannelli usano il colore corrente del capitolo tramite `panel-letter()` di `template/editorial.typ`; solo la lettera cambia colore, mentre separatori e titoli conservano l’inchiostro del testo. La tinta deriva dallo stato condiviso in `palette.typ`, senza valori esadecimali locali. Invito, metafore, IBM, salienza, priorità e Takete–Maluma applicano questa regola. I caratteri incorporati nei documenti originali conservano la grafica dell’opera. Non affidare l’associazione alla sola posizione sinistra/destra o sopra/sotto. Inserire le lettere come testo nativo nel capitolo quando mancano nell’asset; se l’originale le contiene già, conservarle e scegliere una scala che le renda leggibili. Il confronto IBM usa «a» e «b» sotto le due schermate, senza modificare i raster. I due schemi conclusivi di Gestalt usano due colonne per rendere leggibili gli indicatori originali A/B/C, ripresi nella prosa e nelle didascalie.

I soli componenti riutilizzabili stanno in `template/`; i disegni specifici in `assets/diagrams/` producono esclusivamente la visuale, senza decidere ID, didascalie, diritti o impaginazione. `figures.typ` espone l’API comune; `text-wrap.typ` valida i profili alpha e compone le sagome locali; `spreads.typ` raccoglie sagome di pagina e documenti rettangolari sul dorso. Le prove controllano modifica degli apparati, tipi, parità del bordo esterno, sagome, doppie, note e destinazioni PDF. I dodici moduli comuni separano responsabilità effettive: aperture nel layout, campioni e dettagli nelle figure, profili alpha nel motore del testo sagomato, composizioni di pagina in un unico modulo. Geometria, palette, piano, apparati editoriali, note, bibliografia, esercizi e contenitori di pagina conservano ruoli distinti. Ogni capitolo importa una sola volta ciascun modulo comune, prima di `content`; le figure si importano direttamente da `figures.typ`.

### Quote condivise e modifiche manuali

Il solo titolo «Un linguaggio di pochi pixel» del capitolo 01, compresa la numerazione nativa, usa **Press Start 2P 9,5 pt**, con interlinea di **14 pt**, su richiesta dell’utente. La regola è locale al titolo; indice, segnalibri e testo restano nativi. Font originale e licenza sono conservati in `risorse-condivise/font/editoriali/` e registrati nel relativo manifest.

`geometry.typ` è l’unica sorgente per foglio, margini, colonne, fascia note e rispetto delle sagome. La gabbia è larga **137 mm**, le due colonne **66 mm**, l’intercolonna **5 mm**. L’altezza ordinaria è **205 mm**; `body-height` sottrae **35 mm + 8 pt** per le note, anche quando sono poche o assenti. `grid-bottom` è a **220 mm** dal bordo superiore. `body-bottom-margin` e `body-folio-drop` tengono insieme la riserva note e la posizione comune del folio. Nei nuovi componenti importare le quote e derivare le altre misure; non ricopiare valori equivalenti.

Lasciare a Typst paragrafi, colonne, contatori e collegamenti. Usare coordinate soltanto per la visuale: ritaglio, profilo alpha, diagramma o grafica al vivo. Il corpo è 11/13,5 pt; gli esempi didattici dentro le figure conservano la scala propria, anche i campioni da 12 pt. Un’altezza esplicita può descrivere una fascia di glifi o un foglio documentario; non deve tagliare o precomporre la prosa.

Le etichette delle figure sono univoche nel volume e i richiami restano `@fig-…` o `ref(label(...))`. I metadati `booklet-…` nei componenti alimentano controlli e destinazioni visive: si conservano durante le semplificazioni. Per spostare una figura si modifica il contenitore o il suo parametro; non si aggiungono `place.flush()`, pagine vuote o numeri scritti a mano.

### Ricette minime

Le ricette della sezione «Proprietà editoriali e tipi delle figure» usano l’API corrente `image-figure()`. Per un’immagine su foglio dedicato scegliere `format: "tutta-pagina"`; per il foglio fino ai bordi con caption precedente scegliere `format: "al-vivo"`. Sagome e doppie dichiarano il proprio tipo nella stessa chiamata. Ogni esempio indipendente ha una chiamata autonoma; si usa una figura composta soltanto nei confronti necessari descritti sopra.

### Casi presenti e confini delle eccezioni

| Capitolo | Scenari da confrontare dopo una modifica comune |
| --- | --- |
| 00 | Frontespizio e indice a una colonna; crediti al fondo della gabbia; numeri romani e raccordo al recto del capitolo 01. |
| 01 | Figure di colonna e larghe, gallerie, opere artistiche in colonna e quindici schermate TTC nel testo con caption sulla stessa pagina. |
| 02 | Documenti nel testo, sei metafore in colonna e sei grafici vettoriali nativi; dati e bandiere mantengono la leggibilità. |
| 03 | Figure native larghe, confronti con caption comune, matrice Persona Spectrum e mappa WCAG in due parti ordinarie. |
| 04 | Fotografie e marchi in colonna, screenshot densi su due colonne; locandine e pubblicità in colonna. |
| 05 | Cinque intervalli approvati a una colonna, ritorni a due colonne e tavole Albers: 229/231/232/233 in colonna, 230 con margini. I confini sono elencati nella sezione sulla variante Colore. |
| 06 | Tre sagome locali; doppie regionali di cassa, Linotype e Langosteria; Duomo; Olivetti; campioni, dettagli e opere artistiche nel testo e scheda di esercizio. |
| 07 | Apertura della prima sezione e figura nel medesimo float; figure strette e larghe nel testo, senza inserti su foglio autonomo; due doppie con prosa; passaggio a una colonna in «Una colonna, una sequenza»; esercizio e «Lettura delle fonti». |
| 08 | Documenti singoli, coppie con progressivi distinti, confronti simulati, sagome originali bouba/kiki con testo attorno al profilo, Cenacolo e moodboard nel flusso ordinario, cinque capoversi protetti della sola sezione 8.8 ed esercizio conclusivo. |

Il raccordo di **Gutenberg** compare soltanto quando il salto alla pagina pari richiede un foglio e ripete dettagli della figura completa. **Eurostile** e **Microgramma** sono gruppi ordinari nel testo, con i dettagli e la scala dei campioni conservati prima della doppia di Langosteria. La parità delle doppie è gestita dai rispettivi componenti.

Soltanto il **Duomo** arriva al vivo inferiore e usa note nelle colonne esterne; cassa e Linotype si fermano sopra la fascia note, mentre Langosteria conserva la quota del proprio asset. **Olivetti Lettera 32** parte su pagina pari e allinea il primo pixel dell’alpha al bordo sinistro; le note restano a tutta gabbia. La sagoma dell’iniziale **N** completa la prima parola del relativo paragrafo e conserva `alt: "N"`.

Nel capitolo 01 la **N istoriata** di «Nel Medioevo» è il capolettera illustrato approvato dall’utente: scuola medievale con il volto del docente adattato dalla sua fotografia. La larghezza è **64 pt**, con il rispetto comune di **8 pt**; testo, fonte e nota del paragrafo restano continui. L’iniziale ha alternativa «N» e non aggiunge un progressivo di figura. Originale, prompt e provenienza contemporanea sono conservati nel manifest locale dell’asset.

Le fasce dei campioni tipografici sono normalmente **54 pt**; le varianti **40, 63 e 106 pt** descrivono gli esempi esistenti. Non diventano altezze della prosa. La scheda «Il mio prossimo confronto» è una pagina fissa con sei campi; gli altri esercizi strutturati usano il box al piede. «Lettura delle fonti» di Griglie conserva testi in due colonne interne e note locali nella gabbia del corpo; la Bibliografia seguente mantiene il proprio ruolo APA.

Prima di accettare una semplificazione, confrontare il volume e i capitoli autonomi con la stessa variante di lettura: contenuti, immagini, attribuzioni, note e collegamenti devono restare integri. Le separazioni editoriali intenzionali possono modificare paginazione, progressivi e posizioni; ricontrollare le note sulla nuova pagina fisica. Compilazione e controlli sono quelli della [guida operativa](README.md); l’ispezione visiva usa solo `pnpm preview:booklet --pages …` sul PDF aggiornato, al massimo otto pagine fisiche per chiamata. Aprire soltanto i PNG prodotti per quelle pagine; i PDF del booklet non si aprono né si allegano nella preview di Codex.

## Formato e gabbia

Le quote native Figma riportate qui corrispondono ai punti del documento di stampa. Mantenere le misure senza scalarle arbitrariamente durante esportazione e impaginazione.

| Elemento | Misura |
| --- | --- |
| Pagina | 170 × 240 mm · 481,89 × 680,315 pt |
| Doppia pagina | 340 × 240 mm |
| Colonne | Due da 66 mm · 187,09 pt |
| Intercolonna | 5 mm · 14,17 pt |
| Larghezza della gabbia | 388,35 pt |
| Margine esterno e superiore | 15 mm · 42,52 pt |
| Margine interno | 18 mm · 51,02 pt |
| Area ordinaria di lettura | Da y 42,52 a y 623,62 · altezza 581,10 pt |
| Fascia del folio | Da y 639,465 a y 661,465 pt |

Le pagine SX e DX hanno margini speculari. Sulla pagina sinistra la gabbia comincia a x 42,52; sulla destra a x 51,02. Il margine inferiore della gabbia è circa 20 mm; resta separato dalla posizione del folio.

Usare le griglie condivise `Booklet / Teston / Gabbia / Sinistra` e `Destra`. Le dodici guide native per pagina comprendono bordi, margini, colonne, inizio e fine della gabbia e fascia del folio. Sono strumenti non stampabili: non simulare le guide con linee visibili nel PDF.

## Tipografia

Sora governa aperture e sezioni; DM Sans governa lettura, sottoparagrafi, didascalie e apparati. I font usati negli esempi sono contenuto didattico e conservano il proprio disegno.

| Ruolo | Famiglia e peso | Corpo / interlinea |
| --- | --- | --- |
| Apertura | Sora Bold · 700 | 47 / 42 pt |
| Numero monumentale | Sora Bold · 700 | 440 / 440 pt |
| Codice della sezione | Sora ExtraBold · 800 | 100 / 100 pt |
| Titolo della sezione | Sora ExtraBold · 800 | 20 / 20 pt |
| Lead | DM Sans Regular · 400 | 15 / 21 pt |
| Corpo | DM Sans Regular · 400 · opsz 18 | 11 / 13,5 pt |
| Enfasi del corpo | DM Sans Bold · 700 · opsz 14 | 11 / 13,5 pt |
| Citazione bibliografica nel testo | DM Sans · peso del testo circostante | 10/11 del corpo circostante · interlinea del paragrafo |
| Sottoparagrafo | DM Sans Black · 900 · opsz 14 | 14 / 14 pt |
| Didascalia | DM Sans Light · 300 · opsz 9 | 9 / 10,8 pt |
| Prefisso e numero della figura | DM Sans Medium · 500 · opsz 14 | 9 / 10,8 pt |
| Diritti dell’immagine | DM Sans Italic · 400 · opsz 9 | 8 / 10 pt |
| Folio | DM Sans Medium · 500 · opsz 14 | 12 / 14 pt |
| Bibliografia | DM Sans Regular · 400 · opsz 9 | 8 / 10 pt |
| Note Typst | DM Sans Regular · 400 | 7,5 / 9 pt |
| URL nelle note Typst | DM Sans Regular · 400 | 7 / 8,5 pt |

Per le otto aperture attive dell’edizione Typst, i corpi, le interlinee, le spaziature e le posizioni specifiche di `progetti/booklet/assets/aperture-imagegen-svg-v1/composizioni.json` sostituiscono i due preset di apertura e numero monumentale riportati nella tabella. Titolo e codice usano Sora 700; gli altri ruoli editoriali mantengono le misure indicate.

Il corpo del booklet Typst è **giustificato**, con lingua italiana e sillabazione automatica, su richiesta esplicita dell’utente. Questo aggiornamento supera la precedente bandiera sinistra del modello Figma per la nuova impaginazione. Conservare la dimensione ottica e il peso effettivi: il nome «9pt Regular» di un font o subset storico non definisce da solo il corpo o l’asse ottico da applicare.

Il corpo dell’edizione Typst usa **11/13,5 pt** in tutti i capitoli, comprese le regioni sagomate, su richiesta dell’utente dopo il confronto stampabile. Questo è il preset predefinito (`lettura=11-13.5`); `lettura=12-14` resta disponibile per confrontare la misura precedente. Famiglia, peso, dimensione ottica e spazio fra paragrafi restano quelli del sistema editoriale. Figure e campioni didattici, didascalie, diritti, note, folio, titoli e apparati conservano i propri ruoli e le rispettive misure.

Il testo discorsivo usa uno spazio fra paragrafi di 10 pt. I sottoparagrafi occupano una colonna da 187,09 pt e distano 4 pt dal contenuto seguente. I titoli crescono in altezza con il testo; non comprimere i caratteri per farli entrare.

Gli elenchi puntati usano **quadratini pieni nel colore del capitolo**, di lato **0,4 em** rispetto al corpo locale, senza contorno e centrati sull’altezza delle minuscole della prima riga. La regola condivisa in `template/layout.typ` si applica anche agli elenchi annidati, nel volume e nei capitoli autonomi; voci, rientri e spaziature restano gestiti dagli elenchi nativi Typst.

Gli elenchi numerati usano **cifre in inchiostro su un riquadro pieno nel colore del capitolo**, senza contorno. Il riquadro misura **1,2 × 1,2 em** ed è centrato sulla prima riga; si allarga automaticamente per i numeri più lunghi. Le cifre sono DM Sans SemiBold 600, al **80% del corpo locale**. Numerazione, partenze e livelli restano nativi; `styled-lists()` condivide le due regole e il campione `anteprime/elenchi.typ` ne mostra il risultato.

Usare il grassetto per enfasi semantiche mirate. I nomi propri di persona vanno in corsivo nella prosa, nelle intestazioni, nelle didascalie e nelle note editoriali. Le citazioni e le bibliografie native conservano lo stile APA. I titoli delle opere usano corsivo o virgolette, con un criterio coerente. Conservare corsivi, simboli e notazioni pertinenti, come *em*, senza estendere accidentalmente l’enfasi ad articoli o parole adiacenti.

Nel booklet Typst, equazioni, disuguaglianze e variabili matematiche si compongono con il markup matematico nativo, anche nelle didascalie. Le formule isolate usano frazioni e radicali composti; le unità restano in tondo e i decimali mantengono la virgola italiana. Il font matematico è New Computer Modern Math, distribuito con Typst; il testo ordinario conserva DM Sans. Gli originali documentari e le trascrizioni delle fonti restano conservati.

## Colori

La carta è bianca `#FFFFFF`; l’inchiostro ordinario è `#2E3138`. L’accento appartiene al capitolo e va gestito attraverso le variabili condivise, mantenendo coerenti titoli, codici, folio e altri elementi editoriali che svolgono lo stesso ruolo.

Nella fonte Figma del capitolo di Tipografia l’accento è `#AFC7E8`, controllato da `capitolo/tipografia/colore` nelle collezioni `Booklet / Teston / Primitivi` ed `Editoriale`. L’alias semantico collega i componenti al primitivo. L’edizione Typst usa invece la sequenza richiesta dall’utente, documentata nella tabella dei capitoli: preliminari gray 300, poi le famiglie Tailwind da red in ordine, nella tonalità 300.

Conservare il blu funzionale dei collegamenti dove previsto. La prosa mantiene il colore dell’inchiostro; l’accento non colora automaticamente interi paragrafi. Fotografie, opere, marchi e screenshot documentari conservano i colori originali.

## Esercizi al piede · cornice a L tenue

Gli esercizi strutturati dei capitoli 06–08 adottano il concept **cornice a L tenue** approvato dall’utente. Il box occupa tutta la larghezza del foglio e prosegue fino al bordo inferiore; testo, titolo e richiami rispettano la gabbia e restano nativi. La cornice interessa il lato sinistro e il piede, è larga **10 mm** e contiene punti di raggio **0,45 mm**, con passo **5 mm**.

Fondo, cornice e punti sono miscele RGB dell’accento del capitolo con bianco: rispettivamente **8%, 22% e 45%** di accento. La prosa conserva l’inchiostro `#2E3138`. Sulle sole pagine degli esercizi, il folio mantiene posizione e misure comuni ma usa il fondo tenue, così il motivo non attraversa il numero. Il campione raster approvato e il prompt sono conservati in `assets/esercizi/`; l’esecutivo è vettoriale in `template/exercises.typ`.

Il box è un float a tutta gabbia al piede; l’altezza deriva dal contenuto e dalle colonne native. Un salto debole dopo la consegna conserva l’ordine di lettura rispetto alle sezioni successive. La fascia delle note da **35 mm** resta riservata nel corpo: soltanto il fondo prosegue dietro note e folio. La scheda «Il mio prossimo confronto» conserva il foglio autonomo, i sei campi e le righe per scrivere. Le brevi osservazioni incorporate nella prosa non diventano esercizi autonomi.

## Regole editoriali per i prossimi capitoli

### Struttura e ordine di lettura

I titoli dei capitoli sono brevi sintagmi nominali, con un argomento riconoscibile e coerente con i contenuti. Il titolo completo è definito una sola volta in `progetti/booklet/piano.json` e condiviso da apertura, indice e segnalibro PDF. Eventuali salti di riga appartengono soltanto alla presentazione dell’apertura: non producono una seconda versione del titolo nei dati. Nei titoli riformulati la congiunzione «e» resta unita alla parola seguente, anche nella variante maiuscola, per evitare una riga composta dalla sola congiunzione. «Colore e significato» conserva il titolo e la presentazione approvati.

Nel modello Figma ogni **sezione principale**, per esempio 9.1, comincia su una pagina nuova. Nella nuova edizione **Typst**, su richiesta dell’utente di evitare colonne vuote, sezioni e sottoparagrafi proseguono nel flusso delle due colonne, senza un salto obbligatorio prima del titolo. Il titolo resta associato al primo passaggio che introduce, senza lasciarlo isolato al fondo di una colonna.

Si legge tutta la colonna sinistra dall’alto al basso, poi la destra e infine la pagina successiva. Un sottotitolo non riavvia una coppia di colonne parallele. Le continuazioni devono essere riconoscibili, senza frammenti sospesi o salti ambigui fra pagine lontane.

Comporre insieme prosa, immagini e didascalie. Distribuire il contenuto fra pagine contigue, conservando margini e ritmo: evitare grandi vuoti accidentali e spazi dilatati per riempire il foglio. Il bianco intenzionale di un’opera o di un’apertura mantiene la propria funzione.

Nell’edizione Typst, la distribuzione di testo e figure è automatica anche fra passaggi successivi: non usare `place.flush()` come separatore editoriale. Le figure ordinarie sono mobili; le tavole documentarie conservano il formato a pagina intera ma possono spostarsi per consentire alla prosa successiva di completare il foglio precedente. Didascalie e diritti si spostano con le immagini e i richiami aprono la loro posizione visiva. Restano fisse le composizioni intenzionali: sagome e testo associato, figure sul dorso, raccordi delle doppie pagine, schermate Caffè TTC al vivo, esercizi e apparati. La fascia note di 35 mm e le varianti approvate a una colonna restano confermate.

I codici dei sottoparagrafi seguono la struttura del capitolo, come `9.1.1.`; il progressivo riparte nella sezione pertinente. Tenere codice e formulazione separati nei dati quando possibile. Aggiornare indice, folio, progressivi delle figure e collegamenti dopo inserimenti o riordini.

### Prosa ed esempi

Scrivere testi chiari, concreti e discorsivi, collegando ogni passaggio al suo contesto. Spiegare termini specialistici e acronimi necessari alla comprensione. Evitare frasi banali, riferimenti senza antecedente, formulazioni meccaniche e ripetizioni. Una spiegazione accessoria può stare in nota quando interromperebbe il ragionamento.

Accompagnare i concetti visivi con esempi osservabili e spiegare che cosa guardare. Quando si discute un’opera, mostrarne l’immagine nel punto pertinente. Nei casi reali descrivere scelte concrete, con riferimenti recuperabili; le applicazioni web e ai videogiochi devono avere uno sviluppo coerente con l’argomento del capitolo.

Verificare la correttezza di disegni, campioni, spiegazioni e studi citati. Distinguere ciò che un’immagine mostra dalle interpretazioni e dagli effetti che richiedono ulteriori verifiche. Il lettore deve poter recuperare gli studi e le fonti richiamati.

Le etichette degli esempi costruiti per il booklet sono in italiano. Gli artefatti documentari conservano il contenuto originale; eventuali traduzioni e spiegazioni restano testo editoriale distinto.

### Immagini e scala

Privilegiare la colonna da 66 mm quando il dettaglio utile resta leggibile. Usare le due colonne da 137 mm per testi incorporati, diagrammi densi o confronti che richiedono più spazio. Il foglio autonomo resta soltanto alle locandine, alle pubblicità e alle opere più artistiche concepite come composizione integrale; il formato di provenienza Figma non basta a giustificarlo. **L’obbligo di uniformare la grandezza degli esempi riguarda soltanto il capitolo di Tipografia.** Negli altri capitoli non imporre una larghezza o una scala unica a tutte le immagini.

La selezione corrente dei formati è in `reports/typst-booklet/figure-una-colonna/`. Immagine, didascalia e diritti condividono la colonna o la gabbia scelta. Le visuali già strette conservano la scala; Futura e Barilla perdono soltanto le celle vuote del precedente contenitore. EB Garamond mantiene il corpo 36 ritagliando il solo bianco esterno. In Composizione, i personaggi di *Up*, salienza e priorità usano pannelli in sequenza verticale. Takete e Maluma sono invece affiancati in orizzontale su richiesta dell’utente: i due tracciati riprendono i disegni di Köhler riprodotti nella figura 1a di Shinohara et al. (2016), con incroci e proporzioni conservati e tratto teal 300 `#46ECD5`. Le etichette, la didascalia e i diritti restano testo nativo nel capitolo; fonte, originale e SVG sono in `assets/takete-maluma/`. Schemi, fotografie e screenshot non ricevono più un foglio autonomo per la sola dimensione del loro originale.

Nel confronto di *Up*, Carl conserva i rettangoli già presenti nel fotogramma originale. Su Russell, tre cerchi bianchi vettoriali indicano il contorno del viso e i due occhi; quote e tratto sono modificabili nel capitolo. Le coordinate dei cerchi sono riferite ai 797 × 411 pixel della fonte e si adattano alla larghezza di stampa. I fotogrammi originali restano intatti; le sovrapposizioni servono a leggere la geometria dei personaggi.

Collocare le immagini accanto al passaggio che le spiega, prima che il discorso cambi soggetto. Se il dettaglio analizzato è troppo piccolo, conservare la vista complessiva e affiancare o aggiungere un ingrandimento pertinente. Usare originali nitidi, proporzioni corrette e ritagli intenzionali; non tagliare etichette o parti necessarie alla spiegazione.

Gli stimoli **bouba e kiki** del capitolo 08 sono quelli della figura 1 di Ćwiek et al. (2022), estratti dal PDF pubblicato, con attribuzione alle forme adattate da Bremner et al. (2013). Conservano nero, pixel e proporzioni originali. Un filtro SVG converte il fondo bianco in alpha; due chiamate esplicite con `format: "sagoma"` fanno scorrere il testo attorno ai rispettivi profili, senza ridisegnare le forme. File, tipo, lato, larghezza, didascalia, diritti e testo alternativo restano nel capitolo. Originale, bitmap estratti, wrapper e profili sono in `assets/bouba-kiki/`; `scripts/prepara-bouba-kiki.py --check` verifica hash, corrispondenza dei pixel e aggiornamento dei profili durante i controlli ordinari.

Foglia, fiore e conchiglia di Composizione sono ricreati come soggetti completi su fondo trasparente e distribuiti in tre punti di due pagine consecutive: foglia in alto a destra, fiore più in basso a sinistra e conchiglia fra le colonne della seconda pagina. `image-spread()` mantiene un unico corpo continuo per forme, texture e colore; ogni immagine dichiara il proprio tipo e conserva una didascalia autonoma. I ritagli rettangolari precedenti e le loro attribuzioni restano conservati. Immagini, originali della generazione, riferimenti, prompt e profili alpha sono in `assets/forme-naturali-scontornate/`. I controlli dei profili comprendono le famiglie locali in `assets/*/profili/` e verificano hash e corrispondenza con i pixel visibili.

Le immagini non ricevono cornici, ombre o angoli decorativi aggiunti. I segni interni a un’opera, a un diagramma o a un controllo illustrato appartengono al contenuto e mantengono la propria funzione.

Gli schemi ricostruibili con testo, controlli e geometrie usano Typst o SVG nativi, con i font editoriali e dimensioni leggibili nella collocazione finale. Verificare che gli SVG contengano forme e contorni dei glifi effettivi: un raster incorporato conserva la propria risoluzione. I documenti, le fotografie e le illustrazioni conservano il formato pertinente alla fonte.

In Accessibilità, i **17 confronti simulati** usano **34 pannelli SVG** esportati da `assets/diagrams/interface-barriers.typ`, con DM Sans, geometrie native e nessun raster o filtro. Testi e riferimenti agli originali sono in `assets/schemi-accessibilita-vettoriali/contenuti.json`; i due stati conservano contenuti, ordine e didascalia comune. Il basso contrasto e il taglio nel caso negativo di reflow restano intenzionali. La figura dei **bersagli** usa direttamente `target-sizes()` nello stesso modulo: tre casi, quadrati da 24 o 20 unità, spazi da 4 o 0 nei due casi piccoli e cerchi di diametro 24, con esiti coerenti con la distanza dei centri. Testi, didascalia e richiami restano nativi; l’SVG autonomo è esportato dallo stesso disegno. `scripts/prepara-schemi-accessibilita.py` rigenera gli esecutivi e il manifest; `--check`, incluso nelle verifiche del booklet, controlla hash degli originali, riferimenti attivi, geometria e assenza di raster incorporati. Gli asset precedenti rimangono conservati negli spazi condivisi.

Gli esempi costruiti ad hoc possono usare immagini generate quando chiariscono il concetto. Le immagini documentarie conservano la propria fonte e identità; le ricostruzioni non devono apparire come documenti originali. Omettere dalle didascalie formule di produzione come «illustrazione didattica originale» e nomi dei generatori. Originali, prompt e provenienza tecnica restano nei manifest locali.

**Stile comune delle illustrazioni di utenti.** Quando si crea o si rifà una rappresentazione illustrata di utenti, in qualsiasi capitolo, usare lo stile Persona Spectrum approvato dall’utente: teste senza lineamenti, contorni neri uniformi e arrotondati, corpi geometrici essenziali, mani semplificate e campiture piatte. Il riferimento è [stile-omini-utente.png](assets/illustrazioni-palette-capitoli/riferimenti/stile-omini-utente.png). Bianco, nero e grigi neutri accompagnano il colore del capitolo. La regola vale per figure isolate, scene d’uso e persone inserite nei diagrammi; conservare azioni, posture, ausili e differenze utili alla spiegazione. Usare il riferimento nei prompt di generazione o modifica. Fotografie e rappresentazioni appartenenti a opere o documenti originali conservano la propria identità e provenienza, secondo la regola documentaria precedente.

Le illustrazioni editoriali di Accessibilità usano amber 300 `#FFD230`: Persona Spectrum, mappa WCAG e tre scene d’uso. Nelle scene, su richiesta dell’utente, le persone seguono lo stile del riferimento Persona Spectrum: teste senza lineamenti, contorni neri uniformi, forme essenziali e mani semplificate; le azioni e i meccanismi didattici restano riconoscibili. La mappa conserva testi e attribuzioni, con accenti scuri per i testi e inchiostro sui fondi ambra. La «a» tridimensionale di Tipografia conserva fronte scuro, materia e trasparenza, con fianco green 300 `#7BF1A8` e profilo alpha aggiornato. I nuovi asset, il riferimento dell’utente e i prompt sono in `assets/illustrazioni-palette-capitoli/`; le fonti condivise precedenti restano conservate. Il rosso funzionale degli esempi di errore, i colori esplicitamente descritti negli esercizi e i documenti originali mantengono il proprio ruolo.

### Sagome e doppie pagine

Il testo può seguire la sagoma delle immagini scontornate nelle composizioni che lo richiedono, mantenendo l’ordine sinistra–destra. Conservare il distacco nominale di 8 pt e, nelle composizioni sagomate del modello, una giustezza minima di 108 pt. Modificare testo o sagoma richiede una nuova ricomposizione delle righe. Il motore raggruppa i campioni alpha in fasce alte almeno una riga, conservando l’ingombro massimo dei pixel di ogni fascia: le suddivisioni del profilo non devono produrre righe isolate o salti nel testo. Le righe interrotte dal contorno conservano la spaziatura naturale finale; il giustificato resta attivo negli altri tratti del paragrafo. Una sagoma centrale distribuita con `image-spread()` deve lasciare almeno 108 pt continui su entrambi i lati; una geometria insufficiente causa un errore esplicito, da risolvere ridimensionando o riposizionando la visuale nel capitolo.

Una figura sul dorso è una composizione unica: le due metà hanno la stessa scala, la stessa quota e pagine realmente affiancate nella sequenza di stampa. Verificare parità SX/DX dopo ogni riordino. Quando necessario, inserire una pagina pertinente di esempi per ripristinare l’accoppiamento, conservando i contenuti e aggiornando i rimandi. Una sola figura distribuita su due pagine mantiene una didascalia comune riconoscibile.

Per il **Duomo di Firenze** l’utente ha richiesto la composizione sul dorso, allineata al bordo inferiore del foglio come in Figma. Ha confermato un’eccezione limitata alle due pagine della figura: le note occupano le sole **colonne esterne da 66 mm**, nella fascia inferiore di 35 mm, per lasciare libere le metà interne attraversate dall’immagine. La figura conserva una sola didascalia sulla pagina sinistra. Le altre pagine mantengono le note a tutta gabbia.

### Didascalie e diritti

Le sei metafore delle dimensioni culturali del capitolo 02 usano figure ordinarie con `format: "una-colonna"`. Nome della dimensione e sigla costituiscono la didascalia standard, con prefisso e numero nativi. La conversione elimina il contenitore dedicato al titolo, conservando immagini, alternative testuali, contatori e destinazioni dei richiami.

Le sei illustrazioni usano l’**arancione del capitolo, orange 300 `#FFB86A`**, con nero, grigi neutri e bianco. Le nuove versioni ImageGen conservano soggetti, metafore e composizione delle immagini precedenti, sostituendo gli accenti rossi con l’arancione. I PNG originali della nuova generazione, i prompt e il manifest sono in `assets/dimensioni-culturali-orange-300/`; la serie rossa e la sua provenienza restano conservate negli asset condivisi. Le didascalie rimangono testo Typst nativo.

I **sei schemi di Hofstede** (PDI, IDV, MAS, UAI, LTO e IVR) usano il disegno vettoriale nativo `cultural-chart()` di `assets/diagrams/cultural-indices.typ`, ricostruito dal riferimento PDI approvato e applicato a tutti i dati del catalogo condiviso. Nomi e scala usano DM Sans; i valori Sora 700 nello stesso orange 300 `#FFB86A` del capitolo, usato anche da curve puntinate e punti; i collegamenti terminano sulle posizioni calcolate esattamente dall’indice. Valori coincidenti condividono il punto sulla scala. Le bandiere sono gli **SVG originali flag-icons, MIT**, conservati in `risorse-condivise/immagini/figure/ricerca/bandiere/`, ritagliati in cerchi uniformi senza alterare i file. I 36 valori sono verificati sul Country Comparison Tool di The Culture Factor il 25 ottobre 2026. Testi, didascalie, attribuzioni, contatori e richiami restano nativi; i metadati `booklet-grafico-culturale` espongono paesi, punteggi e destinazioni per la verifica. `assets/schemi-hofstede-vettoriali/` conserva sei SVG autonomi esportati dallo stesso disegno, verifica dei dati e manifest di font e bandiere. I precedenti raster rimangono riferimenti; nessun raster è incorporato nei sei schemi attivi.

La didascalia identifica il soggetto e spiega il dettaglio osservabile utile al discorso. Resta vicina alla visuale, con distacco ordinario di 8 pt, e si distingue dalla prosa attraverso il ruolo tipografico 9/10,8. Nei confronti affiancati allineare immagini e inizio delle caption quando la composizione lo consente.

Omettere dalle didascalie, dai crediti e dalle note le formule con la data di accesso, come «Consultato il …», «consultati il …» e «consultazione del sito documentata il …». Conservare autori, fonti, licenze e collegamenti; mantenere le date delle opere, delle pubblicazioni, delle catture e delle verifiche dei dati. Le date di consultazione restano nei registri locali di provenienza.

I richiami alle fonti di una figura si collocano direttamente nella didascalia, con il numero nativo della footnote in apice. Non aggiungere righe separate «Fonti per Figura…» nel corpo o sotto le tavole. Nei confronti sulla stessa pagina, le didascalie che condividono una fonte riutilizzano la medesima nota tramite `footnote(<tag>)`; le eventuali citazioni bibliografiche autore–anno restano conservate nella didascalia.

Per le figure a pagina intera, il parametro opzionale `aspect-ratio` di `page-figure()` indica larghezza/altezza dell’asset. Quando è definito, il componente dimensiona l’immagine alla massima estensione consentita dalla gabbia e dall’ingombro misurato della didascalia, conserva l’immagine intera e la allinea in basso, accanto alla caption. Il bianco residuo resta sopra la visuale; proporzioni, distacco ordinario e ruoli di didascalia e diritti rimangono quelli del sistema.

Quando una figura a foglio intero ha la didascalia su un’altra pagina, affiancare alla spiegazione una **miniatura dello stesso asset alta quanto l’intero testo della caption**, con larghezza proporzionale, senza ritaglio né cornice, separata dal testo da **3 mm**. Un divisorio sottile in colore inchiostro `#2E3138`, a tutta gabbia, separa le footnote dal gruppo con miniatura e didascalia, con 8 pt di distacco sotto la riga; le eventuali note precedono il divisorio, che sostituisce il loro separatore corto. Miniatura, numero, didascalia e diritti, seguiti dal rimando «Nella pagina successiva · p. NNN →», formano un blocco indivisibile; la miniatura non aggiunge un progressivo di figura. Didascalia e diritti conservano i ruoli **9/10,8 pt** e **8/10 pt**. Il numero della figura e il rimando «p.» sono collegati alla destinazione dell’immagine; il numero di pagina deriva dal folio della destinazione e si aggiorna dopo ogni ricomposizione, anche quando il volume riparte da 1 dopo i preliminari. La sitografia resta nelle note della pagina della didascalia. L’immagine a pieno formato conserva proporzioni e composizione, senza sovrapposizioni. Il componente comune `separate-caption()` di `template/figures.typ` applica questa regola. Negli inserti al vivo, `bottom-caption()` la colloca **vicino al margine inferiore ordinario di 20 mm della pagina fisica immediatamente precedente**. Caption e immagine sono due float consecutivi: la prosa successiva completa lo spazio sopra la didascalia, senza un salto forzato che generi pagine quasi vuote. Le eventuali note della pagina si dispongono sopra la caption, separate da 8 pt, mantenendo larghezza, misure e capienza massima della fascia approvata di 35 mm; la fascia ordinaria di 35 mm resta riservata integralmente e si aggiungono soltanto l’altezza della caption e 8 pt di distacco. La quota del float deriva dai margini della regione corrente, senza un ciclo di interrogazioni sulla posizione delle note. Questa è un’eccezione intenzionale alla posizione ordinaria delle note, limitata alle pagine con didascalie al vivo. L’inventario verifica una sola caption per immagine, pagina successiva, fondo della caption a 220 mm entro 0,1 pt, spazio fra note e caption e immagine all’origine del foglio; le note rimangono sulla pagina dei propri richiami.

Il prefisso «Figura» e il relativo numero usano il ruolo Medium; la spiegazione usa Light. Conservare nomi, numeri e punteggiatura coerenti. Ogni richiamo numerato nella prosa ha un collegamento nativo alla figura corretta, da verificare dopo ogni riordino.

I **diritti sono un blocco separato dalla spiegazione**, in DM Sans Italic **8/10 pt**. Indicare il titolare e le condizioni disponibili nella fonte verificata. Autore dell’opera, ente che conserva l’immagine, sito di provenienza e titolare dei diritti possono essere diversi: non inventare attribuzioni né considerarli automaticamente equivalenti.

Il testo destinato al lettore omette riferimenti al corso, agli elaborati degli studenti, al vecchio manuale e alle operazioni di recupero o revisione degli asset. Conservare nei registri locali provenienza, edizioni, date e informazioni tecniche; mantenere le attribuzioni delle opere e le informazioni necessarie a interpretare un esempio simulato o una versione storica.

La richiesta comprende tutti i rimandi ai materiali di preparazione editoriale: vecchi booklet, presentazioni, approfondimenti e slide. Ometterli da prosa, caption e diritti, footnote, citazioni visibili e invisibili, apparati delle fonti e bibliografie. La provenienza degli asset rimane nei manifest locali; opere, immagini, contenuti didattici e attribuzioni originali si conservano. Conservare studi, standard e documentazione primaria esterna che sostengono i contenuti; le presentazioni usate come fonte rientrano nei rimandi da omettere.

### Bibliografia, note e collegamenti

Ogni capitolo termina con una sezione intitolata **Bibliografia**, in **APA 7**, con citazioni autore–anno nel testo e riferimenti in ordine alfabetico. I riferimenti completi e recuperabili sono impaginati **a larghezza della gabbia**, in DM Sans Regular 400, opsz 9, corpo 8/10 pt a bandiera sinistra. DOI e URL bibliografici previsti da APA restano nel riferimento; i link di consultazione sono distinti e vanno nelle note. La bibliografia non segue le due colonne del corpo e non diventa un elenco di siti.

Distinguere il ruolo del rimando dalla presenza di un URL. **Le note esplicative e le note sitografiche hanno soltanto un richiamo numerico in apice**; non generano una citazione autore–anno. **Le fonti bibliografiche**, fra cui articoli, libri, capitoli, atti di convegno e rapporti, mantengono il richiamo autore–anno nel testo e la voce APA in Bibliografia, anche quando sono consultabili online. Una fonte può avere entrambi i ruoli: **quando sono presenti una citazione bibliografica e un sito di consultazione in nota, conservare entrambi i richiami**. Per esempio, l’articolo di Preston conserva `(Preston, 2026)` e il numero della nota con il collegamento. Non eliminare automaticamente il richiamo APA perché esiste una nota URL e non creare automaticamente una voce bibliografica per un sito citato soltanto in nota.

Le citazioni bibliografiche nel testo, parentetiche e narrative, mantengono famiglia e peso del testo circostante e usano **il rapporto 10/11 della sua misura**, cioè **10 pt nel corpo da 11 pt**, e il colore **`#626872`**, leggermente più chiaro dell’inchiostro ordinario `#2E3138`. La misura relativa segue anche il testo delle didascalie; l’interlinea resta quella del paragrafo. La presentazione si applica agli elementi `cite` nativi: contenuti, punteggiatura APA, disambiguazione, ordinamento e collegamenti alla bibliografia restano automatici. Le citazioni testuali fra virgolette conservano il proprio ruolo editoriale; bibliografia finale, sitografia e misure delle note mantengono i rispettivi apparati.

La **sitografia resta nei footnote**, cioè nelle **note al piede della pagina pertinente**, con link attivi e richiami numerici in apice. La separazione fra sitografia nelle note e bibliografia alla fine di ogni capitolo è una regola permanente confermata dall’utente, da rispettare anche durante ricerche, verifiche delle fonti e uso di skill bibliografiche. Nella nuova edizione Typst usare note 7,5/9 pt e URL 7/8,5 pt, misure confermate dall’utente; le misure Figma precedenti erano rispettivamente 8/10 e 7/9 pt. Ogni nota deve avere il proprio richiamo e ogni richiamo la propria nota; dopo spostamenti o eliminazioni verificare numerazione e corrispondenza.

La nota può adottare una variante breve: autore e anno, oppure autore e istituzione, nelle misure delle note approvate, affiancati all’URL sulla stessa riga. La citazione integrale resta in bibliografia. Allineare coerentemente le righe e adattare le giustezze ai contenuti, senza imporre una ripartizione fissa della larghezza.

La descrizione della fonte dentro la nota è distinta dal suo richiamo nel corpo, che resta numerico. Prima della consegna verificare insieme note esplicative, siti senza riferimento bibliografico, pubblicazioni con URL e fonti presenti in entrambi gli apparati; la sola vicinanza di autore–anno e numero in apice non costituisce una duplicazione da eliminare.

**Un URL, una sola voce di nota per pagina.** Se più passaggi della stessa pagina rimandano al medesimo URL, la prima nota conserva il corpo e gli altri passaggi usano `footnote(<tag>)` con lo stesso numero in apice. Quando note con più collegamenti si sovrappongono, raccogliere in una sola voce tutte le spiegazioni pertinenti e ogni URL una sola volta. Conservare attribuzioni, qualificazioni e informazioni di edizione; eliminare soltanto le ripetizioni identiche. La numerazione e i collegamenti restano nativi. Verificare il PDF ricomposto, compresi i richiami nelle figure e nelle sagome: `pnpm check:booklet` rifiuta lo stesso URL in voci diverse della medesima pagina, anche nei capitoli autonomi. Il controllo confronta gli URL completi, preservando query e frammenti diversi; una nuova citazione dello stesso URL su un’altra pagina **deve avere una nuova nota locale e un nuovo numero**. Ogni richiamo, compresi quelli ripetuti e quelli negli apparati, deve raggiungere una voce sulla stessa pagina fisica. Non usare `footnote(<tag>)` per rimandare alla nota di un’altra pagina. Il controllo strutturale e quello dei collegamenti PDF rifiutano i richiami senza voce locale; dopo ogni ricomposizione verificare insieme presenza locale e unicità dell’URL.

Il registro `bibliografia/ruoli-fonti.json` distingue, per tutti i capitoli attivi, le pubblicazioni dai semplici siti. Homepage, FAQ, schede di font e di catalogo, pagine di documentazione e guide web di consultazione restano soltanto nelle note; articoli autonomi, libri, atti, rapporti, standard, documenti e opere originali identificati mantengono APA. Il registro motiva le pubblicazioni catalogate genericamente come `Web` o `online`: il formato dei metadati e la presenza di un URL non decidono il ruolo editoriale. I file delle fonti conservano anche i metadati dei siti come provenienza locale, ma quei record non sono citati e non compaiono nella bibliografia stampata. Escludere i siti anche dai preordini invisibili e dai gruppi APA: `cite(form: none)` stampa comunque la voce nell’apparato. Il controllo nativo del volume rifiuta citazioni, visibili o invisibili, di siti, nuove chiavi non classificate, richiami di nota non numerici e URL sitografici assenti dalle note del rispettivo capitolo. Le descrizioni dei siti in «Lettura delle fonti» mantengono titoli e spiegazioni, con rimandi numerici alle note esistenti.

Riservare alle note lo spazio necessario e ricomporre il corpo sopra di esse, senza sovrapposizioni al folio. Fra le voci consecutive usare un distacco di 3,5 pt, conservando l’interlinea effettiva di 9 pt e la fascia approvata di 35 mm. Affiancare ai titoli dei criteri normativi codice e collegamento alla fonte ufficiale, con il riferimento pertinente anche in nota.

## Componenti e modalità di lavoro

Nel file Figma usare frame di pagina ordinari e **componenti granulari collegati**: corpo, titoli, sezioni, immagini, didascalie, diritti, note, folio e indice. Non creare componenti Figma di pagina intera. I contenitori correlati usano auto-layout; testi e righe seguono il contenuto senza altezza fissa che li tagli. In Typst gli stessi ruoli sono separati nei moduli di `template/`; i contenitori di tavole e pagine della guida operativa organizzano questi elementi senza appiattire il contenuto.

Per cambiare la grafica usare `Go to main component`; per cambiare il contenuto usare le proprietà delle istanze e i segmenti di testo. Conservare enfasi, corsivi, link e ordine di lettura. Non sostituire un testo ricco con un’unica proprietà piatta che cancelli la formattazione.

| Famiglia riutilizzabile | Funzione |
| --- | --- |
| `Booklet / Teston / Componenti / Testo discorsivo` | Modello Figma 12/14 a bandiera sinistra; Typst 11/13,5 giustificato |
| `Sezione` e `Sottotitolo di lettura / Colonna` | Apertura della sezione e sottoparagrafi nel flusso |
| `Didascalia / Colonna` e `Didascalia / Gabbia` | Caption alla larghezza pertinente |
| `Diritti` | Credito dei diritti separato, corsivo 8/10 |
| `Riferimento bibliografico / Gabbia` | Bibliografia a larghezza 388,35 pt |
| `Note` | Apparato al piede con testi e collegamenti nativi |
| `Folio tre cifre / SX` e `DX` | Numero centrato in rettangolo 32 × 22 pt |

I nomi abbreviati nella tabella appartengono alla stessa famiglia `Booklet / Teston / Componenti`. Il componente Diritti può adattarsi alla larghezza della figura; lo spazio aggiuntivo entra nel calcolo dell’altezza complessiva della composizione.

Il folio ha padding di 4 pt, numero centrato e tracking 0, senza contorno o filetto. Il rettangolo usa l’accento del capitolo. L’indice usa titolo Sora Bold 35 pt, codice principale Sora ExtraBold 30 pt, voce principale DM Sans SemiBold 16/20 e sottovoci 14/16,8 con rientro di 12 pt; i numeri di pagina sono allineati a destra e collegati alle aperture.

Conservare originali, file font, fonti, licenze, trasparenze e ritagli documentati. I campioni di font identificati usano glifi autentici; deformazioni geometriche e vere varianti del font devono restare distinguibili. La provenienza degli asset e gli archivi non devono interrompere il percorso visibile del lettore.

## Verifica prima della consegna

Controllare l’intero capitolo in ordine di lettura, comprese le doppie pagine, alla dimensione di lettura e nel PDF di stampa. La verifica comprende:

- Chiarezza, continuità e completezza di prosa ed esempi; assenza di duplicati.
- Coerenza di font, pesi, corpi, allineamenti, colori e gabbia.
- Dimensioni e nitidezza delle immagini, ritagli, sagome e continuità delle figure sul dorso.
- Vicinanza di figure, caption e diritti; assenza di sovrapposizioni o tagli.
- Folio, indice, progressivi delle figure, richiami, note e destinazioni dei link.
- Conservazione di contenuti, originali, attribuzioni e licenze.
- Assenza di guide e copie di archivio nell’esportazione.

Una segnalazione ricorrente richiede un controllo di tutte le occorrenze nel capitolo e dei relativi componenti condivisi. Le richieste puntuali di eliminazione o sostituzione restano legate al proprio bersaglio: non autorizzano a rimuovere contenuti analoghi altrove.

Conservare rapporti e screenshot in `reports/`. La ricognizione dei 115 commenti dell’utente, le decisioni confermate e il controllo del sistema aggiornato sono registrati in `reports/booklet-design-system/regole.json` e `verifica.json`. I manifest di `risorse-condivise/fonti/booklet/tipografia-nuovo-design/` conservano fonti e geometrie delle revisioni precedenti.

## Fonte Figma · La griglia e capitolo Typst 07

La Page Figma `102 · Griglia · Nuovo design` (`4954:42`) usa l’accento Salvia `#A5BDB0`, attraverso i token `chapter/griglia/colore` nelle collezioni Primitivi ed Editoriale. Il token semantico mantiene l’alias al primitivo. La nuova Tipografia termina al folio 502; seguono le 48 pagine 503–550 di Griglia e Wireframe comincia a 551.

Le variazioni della gabbia fanno parte della spiegazione: due colonne da 187,09 pt, una colonna da 288 pt, brevi passaggi a gabbia intera, testo e figura affiancati, composizioni modulari e asimmetriche, documenti dominanti e doppie pagine. Formato, margini speculari, font di lettura, apparati e folio seguono il sistema Teston. La copertina usa un reticolo nativo, titolo Sora Bold 47/42 e numero di capitolo Sora Bold 200/210, dimensionato per questa composizione. I codici di sezione mantengono Sora ExtraBold 100/100.

Le figure 3.370 e 3.377 occupano rispettivamente le coppie 516–517 e 524–525. Ogni coppia usa due istanze dello stesso componente a scala identica e alla stessa quota, con una didascalia comune. I reticoli stampati appartengono alle figure didattiche; le dodici guide native di ogni pagina restano non stampabili. Il taglio del testo nella figura 3.388 è un esempio negativo esplicitamente identificato nella figura e nella didascalia.

Le 42 figure sono numerate 3.359–3.400 e conservano richiami nativi nella prosa. I 43 componenti delle figure comprendono anche il dettaglio dell’opera di April Greiman. Corpo, sezioni, didascalie, diritti, note, indice, bibliografia e folio riutilizzano i componenti granulari Teston. Le fonti, gli originali e il registro corrente sono in `risorse-condivise/fonti/booklet/griglia-nuovo-design/`; PDF e verifiche dell’intero capitolo sono in `reports/griglia-nuovo-design/`.

Nella trasposizione Typst Griglia è il capitolo **07**: i codici della fonte restano identificatori dei dati e i numeri stampati seguono il contatore del nuovo capitolo. I 39 diagrammi conservano forme, colori e testi degli SVG esportati dai componenti correnti; didascalie, diritti e richiami appartengono ai componenti editoriali Typst. Musica Viva, Unigrid e l’opera di April Greiman usano gli originali documentari, verificati attraverso gli hash delle immagini correnti in Figma. Il dettaglio Greiman conserva il ritaglio dell’istanza e lo stesso numero della vista completa.

Il capitolo Typst include inoltre otto figure della sezione Griglia dell’edizione PDF di dicembre 2024, pp. 100–107, su richiesta dell’utente. I sette originali raster e il diagramma vettoriale sono associati alle spiegazioni pertinenti, con didascalie, diritti, citazioni e rimandi nativi; le 42 figure correnti restano presenti. Anatomia e infografica verticale usano inserti documentari per conservarne la leggibilità. Gli originali non vengono riscritti: il testo distingue la terminologia client/server dal comportamento del layout, qualifica le percentuali non documentate e corregge l’etichetta «Area aurea» applicata a una divisione in terzi. Le immagini e la loro provenienza sono nel manifest `risorse-condivise/immagini/figure/griglia/manifest.json`; il catalogo editoriale e la bibliografia restano separati.

Le integrazioni Typst dai materiali locali sviluppano quattro lacune operative: distanze e box model, larghezza massima del contenitore fluido, convenzione delle dodici colonne e adattamento delle immagini. Quattro diagrammi di sintesi e un confronto storico di Vogue si aggiungono alle cinquanta figure precedenti, senza sostituirle. Le spiegazioni tecniche rimandano alle specifiche e alle documentazioni primarie; provenienza degli elaborati e originali delle schermate restano nei manifest locali. Le schermate attestano la versione documentata, senza dedurne codice, breakpoint o funzionamento del sito attuale. La figura 7.1 segue immediatamente il titolo nel medesimo blocco iniziale a gabbia intera; da lì la prosa continua nelle due colonne native. Queste integrazioni non attestano modifiche alla fonte Figma.

Le due figure sul dorso usano `progetti/booklet/template/spreads.typ`, con due pagine native a gabbia intera e margini ordinari. La coppia comincia su un foglio pari; un solo asset integro attraversa i due fogli alla stessa scala e quota. Una sola figura nativa sulla pagina sinistra alimenta il contatore e la didascalia comune; a destra compare il richiamo di continuazione. La prosa dei due passaggi resta modificabile e determina la quota minima necessaria alla figura, senza assegnare coordinate alle righe. Un ingombro incompatibile con il foglio genera un errore esplicito. I metadati `booklet-documento-doppio` permettono di controllare parità, quota e scala; non si applicano profili alpha o composizioni Meander ai diagrammi rettangolari.

## Trasposizione in Typst · campione in valutazione

Il sorgente `progetti/booklet/main.typ` legge `progetti/booklet/piano.json`, che definisce gli otto capitoli richiesti, numerati **01–08**, con titoli, file, fonti e stato dell’importazione. Alle sei lezioni iniziali si aggiunge **La griglia**, dalla Page Figma corrente `4954:42`, su richiesta dell’utente. I testi restano in file distinti per capitolo; le fonti native Hayagriva `.yml` o BibLaTeX `.bib` sono separate. I numeri 03–08 delle lezioni Slidev, i codici dei capitoli Figma e i loro folio identificano le fonti; non stabiliscono la numerazione del nuovo volume.

I contenuti delle sei lezioni iniziali e il capitolo **07 · La griglia** sono disponibili per l’inclusione manuale nel volume. La griglia importa la fonte corrente e le relative attribuzioni; testo e didascalie restano modificabili in Typst e la bibliografia APA è separata in `bibliografia/07-griglia.yml`. Lo stato `in-revisione` distingue la presenza del capitolo dalla conclusione della verifica editoriale. Tipografia comprende le sezioni 6.1–6.9 fino alla tavola corrente 490 e resta nello stato `in-revisione`, con scelte editoriali e verifiche globali ancora aperte. Colore conserva la variante di gabbia approvata. Gli inserti dei capitoli 02–04 sono verificati dopo la richiesta di conservarne il formato a pagina intera. Il documento include soltanto i capitoli attivati in `main.typ`, senza pagine vuote per quelli esclusi o in preparazione. Introduzione, Processo UX e Define restano esclusi dal piano. Linguaggio visivo e Gerarchia visiva sono integrati nel capitolo 08, dopo Griglie e layout. Le prove precedenti di Introduzione e Griglia, con le rispettive fonti, sono conservate in `progetti/booklet/esperimenti/capitoli-esclusi/`; la vecchia Griglia esclusa non è la fonte dell’attuale capitolo 07.

L’impaginazione usa pagine e colonne native, testo continuo, numerazione automatica e bibliografia nativa per capitolo. Le sagome usano Meander ufficiale 0.4.4 soltanto nella regione della figura e un profilo ricavato dall’alpha dell’asset; il testo successivo non ha limiti di pagina. Non importare il concept metro o coordinate delle righe Figma. Ogni capitolo è seguito da una pagina Appunti. API e commenti dei componenti condivisi sono in inglese.

Frontespizio, crediti e indice usano numeri romani minuscoli (`i`, `ii`, `iii`…), anche nel folio e nelle etichette PDF. I preliminari contengono un solo indice nativo intitolato «Indice», con folio e collegamenti ai contenuti; l’elenco separato dei capitoli 01–08 è rimosso. L’anteprima autonoma dei preliminari contiene soltanto frontespizio e crediti, perché non importa i capitoli del volume. Il primo capitolo comincia sul recto e riparte da pagina 1 con la numerazione araba ordinaria. Il salto nativo dopo l’indice conserva la parità delle pagine dei capitoli già presenti: un nuovo capitolo non deve invertire i margini speculari o rimuovere le tavole di raccordo delle doppie pagine.

Diritti e contatto appartengono una sola volta agli apparati del volume. Il blocco dell’avviso, con il riferimento normativo, è allineato al fondo della gabbia della pagina dei crediti, nel rispetto del margine inferiore. Le figure con etichette minute usano il posizionamento mobile nativo a gabbia intera, senza imporre pagine alla prosa.

Storia del design conserva il percorso della fonte corrente, dalle origini agli scenari delle interfacce, con bibliografia APA di capitolo. L’atlante distingue gli esempi documentari dalle varianti del bar immaginario Caffè TTC. La miniatura del Khamsa conserva l’identificazione curatoriale del Dallas Museum e omette l’attribuzione a Shiraz, su conferma dell’utente.

Gli asset attivi condivisi con le slide sono in `risorse-condivise/immagini/figure/<tema>/`, con nomi descrittivi e manifest di provenienza; font e OFL in `risorse-condivise/font/editoriali/`. Il mirror web `progetti/slide/public/images/shared/` è generato e ignorato da Git. Conservare gli originali delle importazioni precedenti durante la migrazione.

Noto Sans JP completa gli script assenti nei font editoriali, a partire dai caratteri giapponesi del glossario ukiyo-e. Noto Sans SC completa i caratteri cinesi assenti anche nel font JP, come 劳 nel nome 麦当劳. Sono fallback locali con licenza OFL: prosa latina e titoli mantengono rispettivamente DM Sans e Sora.

Gli esempi del bar si chiamano **Caffè TTC**. Le quindici schermate reali del sito locale sono figure ordinarie nel testo, generalmente a due colonne per rendere leggibili interfacce e confronti. Conservano contenuto integrale e proporzioni, senza tab Design o selettore dello stile; didascalia, attribuzione e nota URL sono sulla stessa pagina della visuale. Le precedenti visuali Caffè Luce restano in archivio. Per la sezione sulle risorse l’utente ha scelto TTC «Primissimo web», senza immagini, accanto al caso di Low-tech Magazine.

La cartella `progetti/booklet/` separa `capitoli/`, `bibliografia/`, `template/`, `anteprime/`, `scripts/`, `esperimenti/` e `build/`. Frontespizio, crediti e indice sono raccolti in `capitoli/00-frontespizio-indice.typ`. La funzione `chapter-opening()` in `template/layout.typ` compone le aperture; i dati alpha derivati stanno in `risorse-condivise/dati/sagome/`. L’archivio delle prove grafiche è in `progetti/booklet/assets/archivio/typst/`, distinto dagli asset attivi. Le copie esattamente identiche di immagini, font e licenze sono consolidate nell’originale condiviso, conservando vecchi percorsi e hash nel manifest d’archivio.

Su richiesta dell’utente, `capitoli/` contiene un solo `.typ` completo per capitolo, senza sottocartelle o frammenti di prosa. Ogni file è compilabile autonomamente ed esporta `content`, che `main.typ` importa per assemblare lo stesso contenuto nel volume. I blocchi di contenuto conservano gli ambiti locali delle regole di pagina e delle figure. I disegni specifici appartengono ad `assets/diagrams/`; i template contengono soltanto componenti riutilizzabili, mentre testi e apparati editoriali sono nei capitoli. Fonti e dati restano separati. `template/pages.typ` raccoglie i contenitori documentari, al vivo e Appunti; `figures.typ` compone le figure e misura gli inserti; `editorial.typ` conserva i ruoli granulari; `text-wrap.typ` valida e legge le sagome per entrambi i motori di flusso. La guida operativa è in `progetti/booklet/README.md`; compilazione e verifiche sono nei moduli di `progetti/booklet/scripts/booklet/`.

Le aperture attive sono **grafiche flat SVG a tutta pagina**, ricostruite dai sette concept selezionati in `progetti/booklet/assets/aperture-imagegen-svg-v1/`. Il campo radice `aperture` di `progetti/booklet/piano.json` indica questa famiglia. `number` e `code` identificano il capitolo corrente; il resolver legge manifest e `composizioni.json` della famiglia e seleziona il fondo di `disegni/` per numero. `apertura_originale` conserva soltanto il riferimento al motivo storico della biblioteca precedente: non seleziona più la grafica attiva.

Su richiesta dell’utente, l’edizione Typst mantiene gray 300 ai preliminari e la sequenza Tailwind red, orange, amber, yellow, lime, green, emerald e teal 300 negli otto capitoli. I metadati e le tinte delle fonti Figma restano distinti. La colonna «Tema storico» registra la provenienza della selezione precedente.

| Codice e capitolo | Lezione Slidev | Tema storico | Colore assegnato | Stato |
| --- | --- | --- | --- | --- |
| 00 · Frontespizio, crediti e indice | — | — | gray 300 · `#D1D5DC` | Incluso |
| 01 · Storia del design visivo | 03 | 2 | red 300 · `#FFA2A2` | Completo |
| 02 · Ricerca, persone e culture | 04 | 4 | orange 300 · `#FFB86A` | Completo |
| 03 · Accessibilità e inclusione | 05 | 5 | amber 300 · `#FFD230` | Completo |
| 04 · Percezione e Gestalt | 06 | 7 | yellow 300 · `#FFDF20` | Completo |
| 05 · Colore e significato | 07 | 10 | lime 300 · `#BBF451` | Completo |
| 06 · Tipografia e lettura | 08 | 11 | green 300 · `#7BF1A8` | In revisione |
| 07 · Griglie e layout | 08 (percorso storico) | 12 | emerald 300 · `#5EE9B5` | In revisione |
| 08 · Composizione e gerarchia visiva | — (due Pages Figma) | 9 | teal 300 · `#46ECD5` | Completo |

Il manifest `risorse-condivise/immagini/aperture/manifest.json` conserva le dodici grafiche precedenti e, nella sezione `palette`, l’ordine completo di 26 famiglie, i valori OKLCH ufficiali e gli equivalenti esadecimali convertiti con Typst. `template/palette.typ` continua a risolvere la tinta del capitolo corrente e quella dei preliminari. I fondi attivi hanno le campiture esatte del capitolo; numeri di sezione e folio conservano la stessa tinta. Le forme, i colori secondari e lo spettro restano modificabili nei gruppi SVG nominati e nei relativi ruoli `data-palette`.

`chapter-opening()` in `template/layout.typ` usa i fondi senza testo e compone **titolo e numero come testo Typst nativo in Sora 700**. Corpi, interlinee, spaziature, posizioni e salti di riga seguono le quote del campionario approvato in `composizioni.json`. Il titolo completo rimane definito una sola volta nel piano: un solo heading nativo alimenta indice e segnalibri PDF. Gli esecutivi autonomi in `svg/` includono invece titolo e numero come elementi di testo modificabili, con font Sora incorporato. I ruoli tipografici e il flusso del corpo mantengono il sistema esistente.

Sono ammessi **colori secondari**, conservando la tinta assegnata come dominante. Colore mantiene il nastro a tutte le diciassette famiglie cromatiche Tailwind, con lime 300 come campo principale e due campioni corallo identici. I fondi SVG contengono forme native e campiture piatte, senza raster, gradienti o testi incorporati. Non appiattire tutta la grafica in un unico colore.

L’apertura attiva di Tipografia usa il **macrosegno illustrativo ricostruito dal concept**, con controforma e asta: non è un campione autentico del glifo Sora. Titolo e numero usano invece Sora autentica; il codice 06 ha l’accento blue 600 `#155DFC` sul fondo green 300. Fonte e licenza OFL sono in `risorse-condivise/font/editoriali/`. Griglie usa la nuova composizione modulare con emerald 300; l’accento Salvia della fonte Figma resta documentato come dato della fonte.

La biblioteca in `risorse-condivise/immagini/aperture/` conserva le **dodici aperture precedenti confermate dall’utente**, compreso il contorno autentico della «a» Sora Bold e il motivo storico 12. Le rispettive composizioni, inclusa la variante del titolo di Griglie a 200 pt di giustezza e 47 pt di corpo, restano documenti della biblioteca precedente. Le versioni SVG ancora anteriori sono in `progetti/booklet/assets/archivio/typst/copertine/svg-v1/`; originali, prompt e provenienza della famiglia attiva sono nel suo manifest.

Lo sfondo occupa l’intero foglio e le forme possono uscire intenzionalmente dal bordo. `progetti/booklet/anteprime/aperture.typ` usa lo stesso resolver e gli stessi dati di `main.typ`, mostrando le otto aperture attive.

Restano confermate le note **7,5/9 pt, con URL 7/8,5 pt**. La misura ridotta risponde al commento Figma #427. Il commento #403 riguarda invece la bibliografia della tavola 491 e richiede una valutazione locale, senza estendere la riduzione a tutti gli apparati. I commenti #425–426 riguardano soltanto il titolo «Consigli utili» della tavola corrente 470: ingrandimento e possibile vicinanza al bordo sono una variante locale ancora da comporre.

Le note del corpo occupano **tutta la gabbia di 137 mm sotto entrambe le colonne**. L’utente ha confermato una fascia inferiore fissa di **35 mm**, separata dal testo da 8 pt e riservata anche nelle pagine con poche note. Il testo continua a scorrere nelle colonne native. Il componente `template/footnotes.typ` conserva contatori e richiami `footnote`, misura soltanto le voci e le dispone nella fascia della pagina effettiva del richiamo. I corpi restano nel documento insieme al proprio richiamo e non nel footer decorativo; URL e collegamenti di andata e ritorno rimangono attivi. Se le note superano la fascia, la compilazione segnala la pagina interessata senza tagliare le fonti. Aperture, bibliografie, Appunti e schermate a pieno formato mantengono le rispettive gabbie.

La doppia pagina del Duomo usa `template/spreads.typ`: stessa immagine originale sui due fogli, al vivo inferiore, con profilo alpha e una sola didascalia comune. Meander distribuisce un unico corpo di testo nelle quattro colonne; il seguito riprende il flusso nativo senza un limite di pagine. Per l’eccezione confermata dall’utente, le voci delle note sono nelle colonne esterne da 66 mm delle sole due pagine. I richiami sono misurati separatamente dalle voci, che conservano contatori, link e ruolo nativo `Note`; oltre la coppia torna la larghezza ordinaria di 137 mm.

Prima della prima coppia di Tipografia, l’eventuale foglio di raccordo generato dal salto nativo alla pagina pari ripete due ingrandimenti della Bibbia di Gutenberg già descritta. La variante locale usa lo sfondo del solo salto, senza aggiungere note, numeri di figura o nuove informazioni; il testo del capitolo resta nel corpo del documento. Non cambia il numero o la parità delle pagine della coppia.

Le voci sono disposte in regioni indipendenti dalla misurazione Meander, con altezza ricavata dal contenuto. Il testo sagomato non dipende dalle interrogazioni delle note: una modifica a monte può ricomporre il volume conservando la doppia pagina e la separazione fra le voci.

`sagoma-pagina` riusa il componente per una fotografia trasparente su un solo foglio: due colonne, immagine e didascalia originali, note nella fascia ordinaria a tutta gabbia. Le quote riguardano la figura e il suo profilo alpha, mai le righe della prosa. I paragrafi sul soggetto raffigurato scorrono attorno alla sagoma; gli argomenti successivi riprendono il flusso ordinario. La misura delle voci usa font, interlinea e larghezza della stampa, ma non crea copie di `footnote.entry` durante le prove di ingombro. Il ruolo nativo `Note` e i collegamenti appartengono alle sole voci effettive.

Per l’annuncio **Olivetti Lettera 32**, il commento Figma #379 richiede il bordo sinistro del foglio. Nella ricomposizione a 11/13,5 pt, questa composizione fissa inizia su pagina pari (`start-page: "even"`), a sinistra nella coppia aperta, così il lato al vivo coincide con il bordo esterno del volume. L’opzione `bleed-left: true` di `format: "sagoma-pagina"` allinea il primo pixel visibile dell’alpha; soltanto il margine trasparente dell’asset oltrepassa il foglio. L’immagine conserva larghezza di 240 pt, proporzioni, originale e didascalia; la prosa segue il profilo con 8 pt di rispetto e le note restano nella fascia ordinaria. Dopo modifiche a monte, il componente raggiunge automaticamente la prossima pagina pari: l’eventuale pagina necessaria alla parità appartiene a questa composizione specifica.

I commenti si verificano insieme al bersaglio e al testo corrente prima dell’importazione del relativo capitolo. Il registro `reports/typst-booklet/commenti-importazione.json` comprende 111 commenti: 95 riletti dal vivo e 16 storici non riverificati. L’audit resta parziale e non implica una verifica di tutti i commenti. Nessuna modifica a Figma è inclusa in questa trasposizione. Il contratto delle misure Figma resta documentato sopra; le modifiche intenzionali alla nuova edizione Typst sono dichiarate qui e non attestano aggiornamenti grafici già applicati ai frame originali.


### Inserti documentari e variante Colore approvati

La pagina autonoma di provenienza non determina il formato del nuovo volume. Su richiesta dell’utente, fotografie, screenshot, schemi e raccolte didattiche rientrano nel testo, privilegiando una colonna e passando a due soltanto per la leggibilità. I gruppi possono disporsi in verticale o sciogliersi in figure ordinarie, conservando ordine, ID, numero, didascalie, diritti e collegamenti. Campioni tipografici e dettagli mantengono la scala comparativa. Le opere dichiarate `tutta-pagina` conservano il foglio con margini. Le 49 opere prima al vivo rientrano provvisoriamente in una colonna; locandine e manifesti mantengono la composizione integrale.

Quando l’utente seleziona un inserto artistico o pubblicitario al vivo, il formato usa **170 × 240 mm**, senza margini, folio o didascalie sovrapposte. Il rifilo riguarda soltanto carta e fondo esterno, mai testo, firme o parti dell’opera; `crop: false` conserva Haribo integralmente. `full-bleed-image()` mantiene la didascalia con miniatura al piede della pagina fisica precedente: numero, caption, diritti e rimando nativo conservano corpi e collegamenti; il divisorio da 0,4 pt separa le note dal gruppo. La conversione provvisoria dei 49 inserti è verificata in `reports/typst-booklet/al-vivo-colonna/`; le selezioni in `reports/typst-booklet/figure-una-colonna/` e `reports/typst-booklet/immagini-tutta-pagina/` sono storiche. In Composizione, il catalogo `risorse-condivise/dati/figure/composizione-tutta-pagina.json` continua a identificare i raster originali: le chiamate esplicite nel capitolo decidono quali conservano il foglio. I byte degli originali rimangono intatti.

Per Colore l’utente ha approvato una colonna nelle seguenti sequenze con diagrammi larghi; altrove restano due colonne native:

- Da «Teoria e uso del colore» a «Dalla palette ai ruoli»; ritorno a due in «Colori caldi e colori freddi».
- Da «Leggere una mappa culturale» a «Rosso e bianco»; ritorno a due in «Il rosso nella campagna IKEA».
- Da «Il colore di un dato è una convenzione» a «Le parole organizzano anche il colore»; ritorno a due in «Un fiore, un rito, un riferimento culturale».
- «Consigli pratici» e il 60–30–10; ritorno a due in «Lasciati ispirare dalla natura».
- Da «La stessa interfaccia in chiaro e scuro» a «Dal riferimento alla schermata»; ritorno a due in «Grigio tonalizzato».

Le opere astratte Albers 229 e 231 usano provvisoriamente una colonna; la 230 conserva il foglio con margini e le diagonali delle X integre. La copertina del libro e i diagrammi 232 e 233 rientrano in una colonna. Le note rimangono nella prosa pertinente. I titoli e i confini esatti della variante restano in `reports/typst-booklet/05-colore/gabbia-approvata.json`. Le citazioni senza testo (`cite` con `form: none`) all’inizio del capitolo 05 assegnano i suffissi delle opere dello stesso autore/anno nell’ordine alfabetico richiesto da APA; autori, date, URL e citazioni visibili non sono sostituiti manualmente. Tipografia conserva quattro intervalli alfabetici nativi, limitati alle pubblicazioni; dopo la separazione della sitografia le coorti autore–anno ambigue sono tre: Typst 0.15.1/Hayagriva 0.10.1 elabora correttamente al massimo tre coorti per bibliografia (difetto #507). Il parametro `target` assegna ogni citazione a un solo intervallo; i quattro elenchi consecutivi formano un’unica bibliografia visibile. I suffissi seguono l’ordine dell’elenco, con date complete prima dei titoli a parità di anno. I dati delle fonti restano separati e invariati. Una regola di presentazione limitata alla bibliografia elimina la virgola che Typst0.15.1 aggiunge impropriamente ad alcune date con il solo anno; le date attestate non vengono completate artificialmente. Volume e anteprima isolata usano la stessa variante, risolta da `template/plan.typ`. Lo stato `in-revisione` distingue la presenza dei contenuti dalla conclusione della verifica editoriale; non dichiara il volume pronto alla pubblicazione. L’estratto precedente è conservato, invariato, in `progetti/booklet/assets/archivio/typst/estratti/06-tipografia.typ`.

## Aperture SVG dai concept ImageGen · famiglia attiva

La famiglia `progetti/booklet/assets/aperture-imagegen-svg-v1/`, selezionata dal campo radice `aperture` del piano, fornisce le otto aperture del volume Typst: sette ricostruzioni dai concept e l’apertura 08 nativa SVG. Il resolver legge il manifest e `composizioni.json`, seleziona i fondi senza testo di `disegni/` per numero e passa le quote al componente nativo. Gli otto esecutivi autonomi in `svg/` contengono forme vettoriali e titolo/numero come testo Sora modificabile. Le quote seguono il campionario approvato; il titolo completo proviene dal piano unico e il relativo heading resta unico. Macrosegno illustrativo di Tipografia, codice 06 blue 600, palette esatte, campiture piatte, spettro a diciassette famiglie e due campioni corallo identici sono conservati. Originali, prompt, font e licenze restano documentati nel manifest. Le dodici aperture precedenti restano nella biblioteca storica; l’integrazione riguarda le aperture del booklet Typst e non attesta modifiche ai frame Figma o ai contenuti dei capitoli.

La rifinitura del campionario usa bordi condivisi, tangenti raccordate, archi ellittici esatti e un profilo unico per il nastro cromatico; le giunzioni sono verificate anche al 400%. Titoli, numeri e quote tipografiche restano quelli della ricostruzione.

Nell’apertura Colore tutte le sagome usano esclusivamente archi ellittici nativi e rette; le diagonali del nastro sono tangenti comuni calcolate alle ellissi. Centri e raggi sono separati in `geometria-colore.json`, con rigenerazione attraverso `geometria-colore.py`. Le separazioni dello spettro sono rette e le irregolarità del concept raster vengono regolarizzate geometricamente.

Il controllo generale regolarizza le controcurve di Ricerca e Tipografia e le tangenti dei profili di Gestalt, mantenendo i nodi della composizione. In Griglie il modulo bianco inferiore sinistro termina sullo stesso asse del quarto superiore. Il codice di Tipografia usa blue 600 `#155DFC` sul fondo green 300, per un contrasto di 3,74; contenuto, font, dimensioni e posizioni dei testi sono conservati. La verifica include gli ingombri reali dell'inchiostro, modifiche programmatiche reversibili e il confronto delle campiture fra SVG e PDF; rapporto e dettagli restano in `reports/booklet-aperture-svg-v1/`.


## Capitolo 08 · Composizione e gerarchia visiva

Il capitolo segue Griglie e layout e integra le Pages Figma `3699:2475` e `2613:1113`, conservandone i 29 esempi e le attribuzioni disponibili. La prosa sviluppa messaggio, forma e materia, funzioni delle immagini, metafore, icone, spazio, strumenti della gerarchia, attenzione, casi ed esercizio conclusivo. Il filo conduttore parte dal compito del lettore, guida la scelta di immagini e segni, ne organizza le relazioni e le priorità, distingue queste intenzioni dall’attenzione effettiva e arriva all’analisi dei casi e alla prova progettuale. Ogni sezione e sottosezione chiarisce il proprio contributo a questo percorso; i richiami a ricerca, accessibilità, Gestalt, colore, tipografia e griglia motivano l’uso congiunto degli strumenti già studiati. Il caso simulato di Sara e l’invito al laboratorio collegano le spiegazioni alla verifica finale. Le integrazioni dai materiali sono sostenute dalle pubblicazioni originali e dai siti pertinenti; i riferimenti agli elaborati preparatori restano soltanto nei manifest. I confronti simulati sono identificati nelle didascalie.

La parte progettuale collega concept visivo, moodboard, variazione e verifica. Due moodboard illustrano il passaggio da riferimenti fotografici e cromatici a ipotesi su texture, tipografia e iconografia; i JPEG originali sono conservati senza ricompressione. Un registro di riferimento, scelta e verifica rende esplicito il passaggio alla pagina. Il controllo con sfocatura è un’ispezione preliminare dei pesi e dei raggruppamenti, distinta dalla verifica con un compito. Il confronto con l’edizione precedente, i limiti del recupero e la provenienza delle immagini restano nei manifest e nel rapporto locale.

La verifica di `materiali/` integra equilibrio simmetrico e asimmetrico, distinzione fra riconoscimento, scelta e raggiungimento di un comando, informazione durante il gioco e traduzione dei riferimenti in decisioni. Hick–Hyman e Fitts mantengono i rispettivi ambiti sperimentali, senza limiti universali al numero di comandi. Uno schema nativo confronta due distribuzioni di pesi senza misurare l’equilibrio percettivo. Le schermate di _Fortnite_ e _Dead Space_ sono figure autonome: la prima usa due colonne per la densità degli indicatori, la seconda una colonna. Originali, conversioni e provenienza sono in `assets/composition-materials/manifest.json`; le affermazioni rimandano alle pubblicazioni originali. Il rapporto in `reports/typst-booklet/08-composizione-gerarchia/verifica-materiali/audit.json` distingue ricognizione, pagine approfondite, integrazioni ed esclusioni.

L’accento è teal 300 `#46ECD5`, successivo a emerald nella palette del progetto. L’apertura 08 è un disegno SVG nativo della famiglia attiva, con titolo e codice Sora modificabili e metadati distinti dai sette concept precedenti. I componenti comuni governano gabbia, corpi, citazioni, note, folio e apparati. Le due tavole con margini conservano una pagina dedicata; gli esempi indipendenti mantengono figure separate. Il diagramma Takete–Maluma è una figura ordinaria nel flusso; le schermate Allbirds e Headspace hanno ciascuna la propria figura. Gli altri confronti sono figure mobili a gabbia intera, senza interrompere il flusso delle due colonne. `capitoli/08-composizione-gerarchia.typ` alimenta sia il volume sia il target autonomo `composizione-gerarchia`. Il capitolo comprende 56 figure e 21 pubblicazioni APA; pagine e voci di nota si aggiornano dopo la ricomposizione, mantenendo i siti pertinenti e le note locali.

Nei passaggi con tavole a pagina intera, la prosa resta nei paragrafi nativi. Le frasi sospese attraverso gli inserti si risolvono con suddivisioni e raccordi editoriali; contenitori non spezzabili attorno alla prosa possono causare sovrapposizioni con questi float. **Soltanto nella sezione 8.8** sono ammessi i cinque brevi capoversi protetti da normali `block(breakable: false)` nel capitolo, per evitare frammenti fra le moodboard e il passaggio alla variazione. Ogni blocco contiene solo prosa, senza figure, titoli o note interne; l’eccezione resta locale e non si estende agli altri paragrafi del capitolo.

Le due moodboard, la tavola di riferimenti fotografici e cromatici e _Ecommerce Moodboard_ di CandleScience, sono figure ordinarie in **una colonna da 66 mm**, con il posizionamento ordinario. Ciascuna dichiara `format: "una-colonna"` nel capitolo e conserva la composizione originale. Didascalie e diritti restano uniti alle immagini. Anche il Cenacolo conserva il flusso ordinario. Nell’esercizio conclusivo, i tre paragrafi scorrono nelle colonne native del box al piede con cornice a L tenue. Le dieci opere prima al vivo usano provvisoriamente una colonna; le due tavole con margini conservano il foglio, con locandine e annunci separati. Le locandine di _Barbie_ e _Dune_ usano invece due figure autonome impilate in una colonna. La campagna Häagen-Dazs usa una figura ordinaria a una colonna con didascalia e diritti sulla stessa pagina: il file attivo è il raster originale orizzontale, identico a quello incorporato nel precedente wrapper SVG verticale, che resta conservato. Fotografie di esempio, loghi, confronti e screenshot usano `image-figure()`, privilegiando una colonna e passando a due per le visuali dense. Il precedente collage `colore-atmosfere.svg` resta conservato con le proporzioni naturali del raster incorporato, dimensioni verificate, hash e provenienza; non è riprodotto nel capitolo.
