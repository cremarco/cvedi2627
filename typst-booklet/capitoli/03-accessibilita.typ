// Capitolo 03: unico testo per volume e compilazione autonoma.
#import "../template/stile.typ": booklet, capitolo
#import "../template/piano.typ": parametri-capitolo

#let testo = [
// Ordine editoriale del capitolo; le varianti restano nei rispettivi ambiti locali.
// Preordine APA delle fonti W3C: Typst assegna i suffissi dalla prima citazione.
// Nell'anno: prima la fonte con il solo anno, poi le date complete in ordine.
// Richiami nativi non stampati; tutte le citazioni visibili restano nella prosa pertinente.
#cite(<a03-wai-easy>, form: none)
#cite(<a03-wcag>, form: none)
#cite(<a03-wai-involving>, form: none)
#cite(<a03-wai-barriers>, form: none)
#cite(<a03-wai-principles>, form: none)
#cite(<a03-wai-stories>, form: none)
#cite(<a03-wai-images>, form: none)
#cite(<a03-wai-evaluation>, form: none)
#cite(<a03-names>, form: none)

#[
#import "../template/editoriale.typ": nota-compatta, sottotitolo-lettura
#import "../template/accessibilita.typ": mappa-a-pagina

// Fonte Figma 198:3435 · C03 · 076 · SX — Accessibilità e design inclusivo

== Dal contesto alle condizioni d’uso

I casi di localizzazione hanno mostrato come lingua, abitudini e riferimenti culturali entrino nelle decisioni sull’interfaccia. La stessa attenzione alle differenze deve riguardare anche le condizioni che rendono possibile usare il servizio: percepire un’informazione, raggiungere un controllo, comprendere un messaggio e completare un’azione.

L’accessibilità porta queste domande nella ricerca e nel progetto. Il percorso parte dal design universale e inclusivo, osserva barriere e modalità d’uso, poi collega le scelte operative alla loro verifica. Ciò che emerge tornerà nella definizione dei requisiti e accompagnerà prototipi, test e implementazione.

// Fonte Figma 198:3877 · C03 · 077 · DX — Accessibilità e design inclusivo
#sottotitolo-lettura[Accessibilità e design inclusivo]

#strong[La ricerca su persone e contesti porta a interrogarsi anche sulle condizioni di accesso. Nella progettazione di prodotti e servizi digitali resta infatti il rischio di assumere come riferimento una presunta “persona media”.  ] Questo approccio, apparentemente orientato a raggiungere il maggior numero possibile di utenti, può escludere persone con bisogni non considerati. La diversità umana non costituisce un’eccezione da gestire a posteriori, ma una condizione di partenza del progetto.

Per questa ragione, parlare di accessibilità e design inclusivo significa affrontare una questione non marginale, bensì strutturale: progettare esperienze che possano essere comprese, percepite e utilizzate da persone con caratteristiche, abilità, condizioni e contesti differenti.

In questo quadro è utile distinguere due concetti spesso avvicinati ma non coincidenti: #strong[universal design] e #strong[inclusive design].

// Fonte Figma 198:3446 · C03 · 078 · SX — Design universale e inclusivo

== Design universale e inclusivo

Il #strong[design universale] nasce con l’obiettivo di realizzare prodotti, ambienti e sistemi utilizzabili dal maggior numero possibile di persone, senza richiedere adattamenti o soluzioni speciali. Si tratta di un approccio che privilegia la massima estensione dell’accesso e che, in ambito progettuale, invita a concepire soluzioni semplici, comprensibili, flessibili e non stigmatizzanti. I suoi principi insistono su alcuni aspetti centrali: equità d’uso, flessibilità, semplicità, percettibilità delle informazioni, tolleranza all’errore, riduzione dello sforzo fisico e adeguatezza di spazio e dimensioni. @a03-ceud @a03-microsoft.

L’#strong[inclusive design], pur condividendo la medesima tensione etica verso l’accesso e la partecipazione, si muove da una prospettiva parzialmente diversa. Più che cercare una soluzione unica valida indistintamente per tutti, esso invita a progettare a partire dalle differenze individuali, riconoscendo che gli utenti non incontrano il mondo — e quindi nemmeno le interfacce — nello stesso modo. Progettare in maniera inclusiva non significa dunque inseguire un’impossibile neutralità, ma offrire modalità diverse e tra loro equivalenti di partecipazione all’esperienza. In questa prospettiva, le persone con disabilità non rappresentano un gruppo separato da “aggiungere” alla fine del processo, bensì un punto di osservazione privilegiato attraverso cui comprendere meglio la varietà dei bisogni umani. Una soluzione pensata per una necessità specifica può infatti rivelarsi utile a un pubblico molto più ampio: è il caso, ad esempio, dei sottotitoli, che non agevolano soltanto chi ha una disabilità uditiva, ma anche chi si trova in un ambiente rumoroso o non può attivare l’audio.

// Fonte Figma 198:3892 · C03 · 079 · DX — Design universale e inclusivo
#emph[Due prospettive complementari cercano di ampliare la partecipazione. La differenza è nel punto di partenza del progetto (@fig-a03-42).]#nota-compatta([University of Vermont, Clearing a Path], "https://digitalcollections.uvm.edu/view/33650/clearing-a-path", etichetta: [digitalcollections.uvm.edu\/…\/clearing-a-path]) <nota-a03-diritti-3>

#figure(
  [#image(path("/assets/images/figure/accessibilita/clearing-a-path-giangreco-ruelle.jpg"), width: 100%, alt: "Lo studente chiede di liberare la rampa. Il custode vuole finire prima le scale. Lo studente fa notare che la rampa libera permette l’ingresso a tutti.")],
  caption: [Lo studente chiede di liberare la rampa. Il custode vuole finire prima le scale. Lo studente fa notare che la rampa libera permette l’ingresso a tutti.
#v(4pt)
#text(size: 8pt, style: "italic", weight: 400)[©2002 M. F. Giangreco; illustrazione K. Ruelle; University of Vermont. Uso non commerciale permesso.]],
  ) <fig-a03-42>


#sottotitolo-lettura[Design universale]

Progetta prodotti, ambienti e sistemi utilizzabili dal maggior numero di persone, con modalità identiche quando possibile ed equivalenti quando necessario.#nota-compatta([CEUD · 7 Principles; Microsoft · Inclusive Design], "https://universaldesign.ie/about-universal-design/the-7-principles", etichetta: [universaldesign.ie\/about-universal-design\/the-7-principles]) <nota-a03-3-1>

Il bisogno segnalato avvia l’ascolto: un passo del processo inclusivo. La rampa comune rappresenta il beneficio universale.

#sottotitolo-lettura[Design inclusivo]

Parti dalle differenze e dai punti di esclusione. Coinvolgi le persone e offri percorsi equivalenti, adattando modalità e contesto dell’interazione.#footnote(<nota-a03-3-1>)

Esempio: un video con parlato chiaro, sottotitoli e descrizione delle informazioni visive amplia l’accesso. Le modalità vanno progettate e verificate insieme.


// Fonte Figma 198:3464 · C03 · 080 · SX — Persona Spectrum

== Persona Spectrum

Uno degli aspetti più rilevanti dell’inclusive design consiste proprio nel superare l’idea che l’esclusione riguardi soltanto condizioni permanenti.  A questo proposito risulta utile il modello del #strong[Persona Spectrum], che amplia la riflessione progettuale distinguendo tra vincoli permanenti, temporanei e situazionali. Un vincolo permanente può essere, per esempio, la cecità; un vincolo temporaneo può derivare da un infortunio; un vincolo situazionale può dipendere dal contesto, come accade quando una folla rumorosa ostacola l’ascolto oppure una forte luce rende difficile leggere uno schermo. Questo modello mostra con chiarezza che l’accessibilità non riguarda solo “alcuni utenti”, ma tutti, in momenti diversi e in condizioni differenti. Progettare per questi scenari significa dunque progettare meglio in generale.

Da questo punto di vista, l’accessibilità non può essere considerata un’aggiunta correttiva da introdurre a sviluppo concluso. Essa deve entrare nel progetto fin dalle prime fasi, orientando la ricerca sugli utenti, la definizione dei requisiti, la costruzione dei flussi e le scelte visive e tecniche. Una progettazione davvero inclusiva richiede inoltre di riconoscere i propri bias: ogni designer, proprio in quanto soggetto situato, rischia di proiettare sui prodotti le proprie abitudini, competenze e aspettative. Per ridurre questo rischio è necessario coinvolgere nel processo persone diverse per età, capacità, provenienza e modalità d’uso, così da verificare concretamente dove e come si generino punti di esclusione.

Quando questa riflessione si applica all’ambiente digitale, si parla più propriamente di #strong[accessibilità web]. Con questa espressione si intende la progettazione e lo sviluppo di siti, applicazioni, strumenti e contenuti che possano essere utilizzati da un’ampia gamma di persone, comprese quelle con disabilità visive, uditive, motorie o cognitive. In un contesto in cui l’accesso alle tecnologie dell’informazione e della comunicazione costituisce una condizione essenziale di partecipazione sociale, culturale ed economica, garantire pari opportunità di accesso non è solo una questione tecnica, ma anche civile (@fig-a03-43). @a03-microsoft.

// Fonte Figma 198:3903 · C03 · 081 · DX — Persona Spectrum
La @fig-a03-43 confronta i vincoli permanenti, temporanei e situazionali.#nota-compatta([Microsoft Design], "https://inclusive.microsoft.design/articles/inclusive-101-guidebook", etichetta: [inclusive.microsoft.design\/articles\/inclusive-101-guidebook]) <nota-a03-5-1>

#figure(
  [#set par(justify: false, leading: 1.5pt)
#grid(columns: (43pt, 1fr, 1fr, 1fr), column-gutter: 5pt, row-gutter: 10pt, [], [#text(size:9pt,weight:700)[Permanente]], [#text(size:9pt,weight:700)[Temporaneo]], [#text(size:9pt,weight:700)[Situazionale]], [#text(size: 9pt, weight: 700)[Tocco]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-1-1.png"), height: 65pt, alt: "Un solo braccio") #linebreak() #text(size: 9pt)[Un solo braccio]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-1-2.png"), height: 65pt, alt: "Braccio infortunato") #linebreak() #text(size: 9pt)[Braccio infortunato]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-1-3.png"), height: 65pt, alt: "Neo-genitore") #linebreak() #text(size: 9pt)[Neo-genitore]]], [#text(size: 9pt, weight: 700)[Vista]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-2-1.png"), height: 65pt, alt: "Cecità") #linebreak() #text(size: 9pt)[Cecità]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-2-2.png"), height: 65pt, alt: "Cataratta") #linebreak() #text(size: 9pt)[Cataratta]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-2-3.png"), height: 65pt, alt: "Guida: sguardo altrove") #linebreak() #text(size: 9pt)[Guida: sguardo altrove]]], [#text(size: 9pt, weight: 700)[Udito]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-3-1.png"), height: 65pt, alt: "Sordità") #linebreak() #text(size: 9pt)[Sordità]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-3-2.png"), height: 65pt, alt: "Infezione all’orecchio") #linebreak() #text(size: 9pt)[Infezione all’orecchio]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-3-3.png"), height: 65pt, alt: "Bar affollato") #linebreak() #text(size: 9pt)[Bar affollato]]], [#text(size: 9pt, weight: 700)[Parlato]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-4-1.png"), height: 65pt, alt: "Persona non verbale") #linebreak() #text(size: 9pt)[Persona non verbale]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-4-2.png"), height: 65pt, alt: "Laringite") #linebreak() #text(size: 9pt)[Laringite]]], [#align(center)[#image(path("/assets/images/figure/accessibilita/persona-spectrum-4-3.png"), height: 65pt, alt: "Accento non riconosciuto") #linebreak() #text(size: 9pt)[Accento non riconosciuto]]])],
  caption: [Persona Spectrum: tocco, vista, udito e parlato confrontati in condizioni permanenti, temporanee e situazionali.],
  placement: top, scope: "parent",
) <fig-a03-43>


#emph[Esempi del Persona Spectrum, rielaborati in italiano. Illustrazioni originali. Una barriera situazionale non equivale a una diagnosi; l’accento può creare un disallineamento con il riconoscimento vocale.]


// Fonte Figma 198:3498 · C03 · 082 · SX — Accessibilità Web

== Accessibilità Web

Per orientare la progettazione accessibile esistono le Web Content Accessibility Guidelines (WCAG), un insieme di linee guida che organizzano  i requisiti intorno a quattro principi fondamentali.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/TR/WCAG22/", etichetta: [w3.org\/TR\/WCAG22\/]) <nota-a03-6-1>  Il contenuto deve essere anzitutto percepibile, cioè accessibile ai diversi canali sensoriali dell’utente; deve poi essere utilizzabile, dunque navigabile e controllabile anche tramite tastiera o dispositivi assistivi; deve essere comprensibile, sia nel linguaggio sia nel comportamento dell’interfaccia; infine deve essere robusto, cioè compatibile con una pluralità di browser, software e tecnologie assistive.

Le WCAG definiscono inoltre diversi livelli di conformità — A, AA e AAA — che permettono di valutare il grado di accessibilità raggiunto:

- A: soddisfa i criteri di livello A;
- AA: soddisfa i criteri di livello A e AA;
- AAA: soddisfa i criteri di livello A, AA e AAA.

Ragionare in termini di accessibilità significa anche considerare i modi concreti in cui le persone interagiscono con il digitale. WebAIM (Web Accessibility In Mind) è un centro non profit dell’Utah State University che svolge formazione, ricerca e valutazione sull’accessibilità web. Le sue risorse aiutano a tradurre i bisogni delle persone in scelte di progetto. Nella sua introduzione distingue quattro grandi aree: disabilità uditiva, motoria, visiva e cognitiva.#nota-compatta([WebAIM],
  ("https://webaim.org/intro/", "https://webaim.org/about/"),
  etichetta: ([webaim.org\/intro\/], [webaim.org\/about\/])) <nota-a03-6-2>

A queste corrisponde una vasta gamma di strumenti e tecnologie assistive — screen reader, tastiere alternative, comandi vocali, ingranditori di schermo, puntatori speciali e altri dispositivi — che permettono agli utenti di accedere ai contenuti solo se il sito o l’applicazione sono stati costruiti riconoscendo e supportando correttamente tali modalità d’uso. La compatibilità con queste tecnologie va progettata e verificata durante lo sviluppo (@fig-a03-46). @a03-wcag @a03-webaim.

// Fonte Figma 3124:706 · C03 · 083 · DX — Tecnologie assistive in uso

=== Tecnologie assistive in uso

#emph[Due modalità documentate mostrano come il software e i dispositivi rendano possibile l’interazione con il web (@fig-a03-44 e @fig-a03-45).]#nota-compatta([WebAIM], "https://webaim.org/intro/", etichetta: [webaim.org\/intro\/]) <nota-a03-7-1>#nota-compatta([W3C, licenza delle fotografie], "https://creativecommons.org/licenses/by/3.0/us/", etichetta: [creativecommons.org\/…\/us]) <nota-a03-diritti-7>

#figure(
  [#image(path("/assets/images/figure/accessibilita/screen-reader-smartphone.jpg"), width: 285pt, alt: "Screen reader su smartphone. La persona esplora il contenuto attraverso gesti e sintesi vocale: la struttura semantica deve rendere disponibili nomi, ruoli e informazioni.")],
  caption: [Screen reader su smartphone. La persona esplora il contenuto attraverso gesti e sintesi vocale: la struttura semantica deve rendere disponibili nomi, ruoli e informazioni.
#v(4pt)
#text(size: 8pt, style: "italic", weight: 400)[Fotografia ©2016 W3C®. CC BY 3.0 US. Immagine integra.]],
  placement: top, scope: "parent",
) <fig-a03-44>


#figure(
  [#image(path("/assets/images/figure/accessibilita/puntatore-bocca.jpg"), width: 285pt, alt: "Puntatore a bocca per azionare i tasti. Il dispositivo rende possibile l’input: i comandi dell’interfaccia devono essere raggiungibili e utilizzabili anche senza mouse.")],
  caption: [Puntatore a bocca per azionare i tasti. Il dispositivo rende possibile l’input: i comandi dell’interfaccia devono essere raggiungibili e utilizzabili anche senza mouse.
#v(4pt)
#text(size: 8pt, style: "italic", weight: 400)[Fotografia ©2016 W3C®. CC BY 3.0 US. Immagine integra.]],
  placement: top, scope: "parent",
) <fig-a03-45>



// Fonte Figma 198:3924 · C03 · 084 · SX — Accessibilità Web
La mappa in @fig-a03-46 raccoglie i criteri di successo e i livelli delle WCAG 2.2 @a03-wcag; la traduzione italiana è documentata da @a03-intopia.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/TR/WCAG22/", etichetta: [w3.org\/TR\/WCAG22\/]) <nota-a03-8-1>#nota-compatta([Intopia e Sketch Group, mappe WCAG 2.2], "https://intopia.digital/articles/intopias-wcag-2-2-maps/", etichetta: [intopia.digital\/articles\/intopias-wcag-2-2-maps\/]) <nota-a03-mappa-fonte>

#mappa-a-pagina(
  path("/assets/images/figure/accessibilita/mappa-wcag-2.2.png"),
  [Mappa completa dei criteri di successo WCAG 2.2, nella traduzione italiana.],
  [Intopia e Sketch Group; traduzione Roberto Scano; rielaborazione. CC BY-SA 4.0.],
  "Mappa completa dei criteri di successo WCAG 2.2, nella traduzione italiana.",
) <fig-a03-46>



// Fonte Figma 198:3481 · C03 · 085 · DX — Colore e contrasto

== Colore e contrasto

#sottotitolo-lettura[Contrasto del testo · #link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")[1.4.3] AA]

Tra gli aspetti più immediati, ma anche più spesso sottovalutati, rientra il contrasto cromatico.   Un contrasto insufficiente tra testo e sfondo compromette seriamente la leggibilità, soprattutto per utenti con disabilità visive o in condizioni di visione non ottimali.  Per i contenuti testuali, le WCAG 2.2 richiedono al livello AA almeno 4,5:1 per il testo normale e 3:1 per il testo grande (almeno 18 pt, oppure 14 pt in grassetto), con eccezioni per elementi incidentali e logotipi.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html", "https://www.w3.org/TR/WCAG22/#contrast-minimum"),
  etichetta: ([w3.org\/…\/contrast-minimum], [w3.org\/…\/use-of-color], [w3.org\/…\/\#contrast-minimum])) <nota-a03-9-1> Questo dato, apparentemente tecnico, ha in realtà ricadute molto concrete: un’interfaccia elegante ma poco leggibile fallisce nel suo compito comunicativo prima ancora che estetico. @a03-wcag.

#sottotitolo-lettura[Il colore come informazione · #link("https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html")[1.4.1] A]

Il colore non deve essere l’unico segnale per comunicare stato, azione o errore: affiancagli testo, simboli o altre indicazioni visibili.#footnote(<nota-a03-9-1>)

// Fonte Figma 198:3913 · C03 · 086 · SX — Valutare una palette

=== Valutare una palette

Contrasto del testo · #link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")[1.4.3] AA \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html")[1.4.6] AAA#nota-compatta([W3C · WCAG 2.2 · 1.4.3 AA \/ 1.4.6 AAA],
  ("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", "https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html", "https://color.adobe.com/create/color-accessibility"),
  etichetta: ([w3.org\/…\/contrast-minimum], [w3.org\/…\/contrast-enhanced], [color.adobe.com\/create\/color-accessibility])) <nota-a03-10-2> @a03-adobe.

Il controllo del contrasto confronta testo e sfondo e restituisce un rapporto: valuta la soglia pertinente a dimensione, peso e livello richiesto#nota-compatta([Adobe],
  ("https://color.adobe.com/create/color-accessibility", "https://color.adobe.com/create/color-contrast-analyzer"),
  etichetta: ([color.adobe.com\/create\/color-accessibility], [color.adobe.com\/create\/color-contrast-analyzer])) <nota-a03-10-1>. AA e AAA descrivono qui il contrasto del testo, non la conformità dell’intera pagina.#footnote(<nota-a03-10-2>)

Il simulatore mostra differenze possibili fra forme di visione dei colori. Aiuta a controllare la distinguibilità della palette; le simulazioni sono indicative e non sostituiscono le prove con le persone (@fig-a03-47).#footnote(<nota-a03-10-1>)

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/adobe-contrasto.jpg"), width: 100%, alt: "Controllo del contrasto del testo e simulazione della visione dei colori negli strumenti Adobe.")], [#image(path("/assets/images/figure/accessibilita/adobe-simulazione-cromatica.png"), width: 100%, alt: "Controllo del contrasto del testo e simulazione della visione dei colori negli strumenti Adobe.")])],
  caption: [Controllo del contrasto del testo e simulazione della visione dei colori negli strumenti Adobe.
#v(4pt)
#text(size: 8pt, style: "italic", weight: 400)[Adobe. Schermate degli strumenti ufficiali.]],
  placement: top, scope: "parent",
) <fig-a03-47>



// Fonte Figma 3122:539 · C03 · 087 · DX — Leggere un appuntamento

=== Leggere un appuntamento

#emph[Due versioni dello stesso messaggio mostrano perché testo e colore vanno valutati insieme (@fig-a03-48).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/contrasto-testo-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/contrasto-testo-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: un messaggio con contrasto insufficiente e una versione con testo leggibile ed errore esplicito.],
  placement: top, scope: "parent",
) <fig-a03-48>


#sottotitolo-lettura[Barriera]

Un messaggio poco contrastato diventa difficile da leggere; il solo rosso non spiega quale dato richiede attenzione.

#sottotitolo-lettura[Scelta di progetto]

Il testo ha contrasto verificato e l’errore è indicato anche con parole: «Orario non disponibile».#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html"),
  etichetta: ([w3.org\/…\/contrast-minimum], [w3.org\/…\/use-of-color])) <nota-a03-11-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")[1.4.3 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html")[1.4.1 A]]

Misura il contrasto sul fondo effettivo e controlla che stato ed errore restino comprensibili senza colore.#footnote(<nota-a03-11-1>)

]
#[
#import "../template/editoriale.typ": nota-compatta, sottotitolo-lettura


// Fonte Figma 3124:753 · C03 · 088 · SX — Dalle regole alle scelte di progetto

== Dalle regole alle scelte di progetto

#emph[Le regole sul contrasto aprono una domanda più ampia: come rendere il compito possibile nelle diverse condizioni d’uso? Le pagine seguenti collegano ciò che si percepisce, ciò che si può fare e ciò che si comprende, attraverso esempi e verifiche.] @a03-wai-principles.

#sottotitolo-lettura[01 · Compito]

Parti da ciò che la persona deve ottenere: leggere una notizia, scegliere un prodotto, prenotare o recuperare un account.

#sottotitolo-lettura[02 · Barriera]

Individua quale informazione o azione manca e dove il percorso si interrompe. Collega l’ostacolo alla situazione d’uso.

#sottotitolo-lettura[03 · Scelta di progetto]

Leggi la tavola del tema e la pagina di esempi associata. Il confronto rende visibile una possibile decisione, senza sostituire l’implementazione.

#sottotitolo-lettura[04 · Verifica]

Riprova il compito con i criteri tecnici pertinenti e con le persone. Documenta condizioni, eccezioni e limiti della verifica.

Il percorso affronta percezione, controllo, comprensione e compatibilità, poi la valutazione. WCAG definisce criteri verificabili; le indicazioni COGA sono supplementari. Gli esempi sono simulati e servono a ragionare sul progetto.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/fundamentals/accessibility-principles/", etichetta: [w3.org\/…\/accessibility-principles]) <nota-a03-12-1>

// Fonte Figma 2825:233 · C03 · 089 · DX — Contrasto dei controlli

== Contrasto dei controlli

#emph[Il contrasto del testo prepara la verifica dei controlli e dei loro stati: caselle, indicatori e segni necessari devono poter essere distinti nel contesto dell’interazione.] @a03-wcag.

=== Segnali necessari · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")[1.4.11 AA]

Le informazioni visive necessarie a identificare controlli e stati richiedono almeno 3:1 rispetto ai colori adiacenti. Il requisito riguarda anche le parti dei grafici necessarie a comprenderne il contenuto. Valuta, per esempio, il segno di spunta, un indicatore di selezione o una linea che distingue una serie di dati.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html", "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"),
  etichetta: ([w3.org\/…\/non-text-contrast], [w3.org\/…\/contrast-minimum])) <nota-a03-13-1>

=== Scegliere che cosa misurare · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")[1.4.11 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html")[1.4.3 AA]

Non ogni bordo o decorazione deve superare la soglia. Se testo o icona rendono già identificabile un pulsante, il suo perimetro può non essere necessario. Quando invece il bordo è l’unico segnale visivo del campo, verifica quel bordo. Il testo del controllo mantiene i propri requisiti di contrasto.#footnote(<nota-a03-13-1>)

=== Leggere le eccezioni · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")[1.4.11 AA]

Sono esclusi i controlli inattivi e quelli il cui aspetto è determinato dal programma utente e non modificato dall’autore. Per gli oggetti grafici è prevista l’eccezione delle presentazioni essenziali. Il rapporto si confronta con i colori adiacenti: non è una misura generica della differenza fra due schermate.#footnote(<nota-a03-13-1>)

// Fonte Figma 3122:598 · C03 · 090 · SX — Riconoscere una casella

=== Riconoscere una casella

#emph[Un’etichetta leggibile non rende automaticamente riconoscibile il controllo associato (@fig-a03-49).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/contrasto-controlli-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/contrasto-controlli-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: una casella con bordo troppo tenue e una versione con contorno riconoscibile.],
  placement: top, scope: "parent",
) <fig-a03-49>


#sottotitolo-lettura[Barriera]

Il bordo troppo tenue è l’unico segnale della casella: l’utente può non individuare dove agire.

#sottotitolo-lettura[Scelta di progetto]

Un bordo distinguibile identifica la casella; la spunta comunica la selezione insieme allo stato esposto al software.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html", "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html"),
  etichetta: ([w3.org\/…\/non-text-contrast], [w3.org\/…\/name-role-value])) <nota-a03-14-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html")[1.4.11 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html")[4.1.2 A]]

Verifica i segnali necessari rispetto ai colori adiacenti; per questi segnali, la soglia AA è 3:1.#footnote(<nota-a03-14-1>)


// Fonte Figma 2825:288 · C03 · 091 · DX — Ingrandimento e adattamento

== Ingrandimento e adattamento

#emph[Testi e controlli distinguibili devono restare disponibili quando cambia la presentazione. Ingrandimento, reflow e spaziatura richiedono verifiche distinte su informazioni e azioni.] @a03-wcag.

=== Testo al 200% · #link("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html")[1.4.4 AA]

Ridimensiona il testo fino al 200%, senza tecnologie assistive e senza perdere contenuti o funzioni. Sono esclusi sottotitoli e immagini di testo. Verifica etichette, pulsanti e livelli intermedi dell’ingrandimento.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", etichetta: [w3.org\/…\/resize-text]) <nota-a03-15-1>

=== Reflow · #link("https://www.w3.org/WAI/WCAG22/Understanding/reflow.html")[1.4.10 AA]

Per contenuti a scorrimento verticale, verifica una larghezza equivalente a 320 CSS px; per quelli orizzontali, un’altezza di 256 CSS px. Contenuti e funzioni devono restare disponibili senza scorrere in due direzioni. L’eccezione riguarda solo parti che richiedono un layout bidimensionale per uso o significato, come una mappa.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html", etichetta: [w3.org\/…\/reflow]) <nota-a03-15-2>

=== Spaziatura · #link("https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")[1.4.12 AA]

Nei contenuti con markup che supporta questi stili, verifica insieme questi multipli del corpo: interlinea $>= "1,5"$; spazio dopo i paragrafi $>= 2$; fra lettere $>= "0,12"$; fra parole $>= "0,16"$. Senza cambiare altri stili, contenuti e funzioni devono restare disponibili. Sono soglie di verifica, non valori predefiniti obbligatori; per ogni lingua o scrittura usa le proprietà pertinenti.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html", etichetta: [w3.org\/…\/text-spacing]) <nota-a03-15-3>

// Fonte Figma 3122:679 · C03 · 092 · SX — Ingrandire una prenotazione

=== Ingrandire una prenotazione

#emph[Il contenuto della prenotazione resta lo stesso mentre cambia lo spazio disponibile (@fig-a03-50).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/adattamento-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/adattamento-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: una prenotazione in riga rigida e una versione che si adatta allo spazio disponibile.],
  placement: top, scope: "parent",
) <fig-a03-50>


#sottotitolo-lettura[Barriera]

Una riga rigida nasconde l’ora e il comando quando la vista si restringe o il testo cresce.

#sottotitolo-lettura[Scelta di progetto]

Il riepilogo si ridistribuisce e il comando resta raggiungibile. Le informazioni conservano ordine e significato.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html", "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html"),
  etichetta: ([w3.org\/…\/resize-text], [w3.org\/…\/reflow], [w3.org\/…\/text-spacing])) <nota-a03-16-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html")[1.4.4 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/reflow.html")[1.4.10 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")[1.4.12 AA]]

Prova il testo al 200%, il reflow a 320 CSS px e gli override di spaziatura come verifiche distinte.#footnote(<nota-a03-16-1>)

]
#[
#import "../template/editoriale.typ": nota-compatta, sottotitolo-lettura


// Fonte Figma 2811:133 · C03 · 093 · DX — Dalle abilità alle barriere

== Dalle abilità alle barriere

#emph[Una barriera nasce dall’incontro fra una persona, un compito e un’interfaccia. Descriverla in modo concreto aiuta a scegliere una soluzione verificabile.] @a03-wai-barriers.

=== Osservare l’attività

Una categoria come “disabilità visiva” non descrive da sola come una persona usa il web. Alcune persone leggono con uno screen reader o un display braille; altre ingrandiscono testo e immagini o modificano i colori. Anche le combinazioni di strumenti e le preferenze possono essere differenti.

=== Identificare il punto di esclusione

Chiediti quale informazione manca, quale azione è impossibile e quale requisito implicito impone il progetto. Un prezzo segnalato soltanto dal colore, un comando disponibile soltanto al passaggio del mouse o una scadenza senza preavviso producono barriere diverse.

=== Collegare bisogno e decisione

Annota il compito, l’ostacolo, la conseguenza e la modifica proposta. Poi verifica la soluzione con le persone coinvolte e con i criteri tecnici pertinenti. Una tecnologia assistiva aiuta soltanto se l’interfaccia ne supporta correttamente l’uso.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/people-use-web/abilities-barriers/", etichetta: [w3.org\/…\/abilities-barriers]) <nota-a03-17-1>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-17-2>

// Fonte Figma 2811:177 · C03 · 094 · SX — Tre scenari di uso

=== Tre scenari di uso

#emph[Questi tre scenari illustrativi, adattati dalle storie di utenti WAI, mostrano come un compito possa essere interrotto da una barriera. Servono a formulare domande di progetto; non sono risultati di test.] @a03-wai-stories.

=== 01 · Scegliere un prodotto

Una persona che fatica a distinguere rosso e verde deve scegliere il colore di un capo. Campioni cromatici senza etichette rendono la scelta incerta. Affianca il nome del colore al campione e rendi riconoscibile la selezione anche senza affidarti soltanto alla tinta.

=== 02 · Completare un modulo

Una persona che usa la tastiera incontra un menu che si apre soltanto con il mouse. Il compito si interrompe. Rendi raggiungibili e utilizzabili i controlli, mostra il focus e consenti di uscire dai componenti senza restare intrappolati.

=== 03 · Seguire una lezione

Una persona che non può ascoltare il parlato incontra un video privo di sottotitoli. Prevedi una versione accessibile del contenuto audiovisivo, con sottotitoli corretti che includano anche i suoni significativi per comprenderlo.

#emph[La stessa modifica può aiutare anche in contesti temporanei o situazionali. L’efficacia va verificata sul compito, senza dedurla dalla sola appartenenza a una categoria.]#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/people-use-web/user-stories/", etichetta: [w3.org\/…\/user-stories]) <nota-a03-18-1>#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html", "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html"),
  etichetta: ([w3.org\/…\/keyboard], [w3.org\/…\/no-keyboard-trap])) <nota-a03-18-2>#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html", etichetta: [w3.org\/…\/captions-prerecorded]) <nota-a03-18-3>

// Fonte Figma 3124:835 · C03 · 095 · DX — Tre scenari, tre scelte

=== Tre scenari, tre scelte

#emph[Le illustrazioni riprendono i compiti appena descritti: scegliere un prodotto, completare un modulo e seguire una lezione (@fig-a03-51, @fig-a03-52 e @fig-a03-53).]#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/people-use-web/user-stories/", etichetta: [w3.org\/…\/user-stories]) <nota-a03-19-1>

#figure(
  [#image(path("/assets/images/figure/accessibilita/scenario-scegliere-colore.png"), width: 100%, alt: "Nome del colore vicino al campione e un segno di selezione rendono la scelta comprensibile anche quando le tinte sono difficili da distinguere.")],
  caption: [Nome del colore vicino al campione e un segno di selezione rendono la scelta comprensibile anche quando le tinte sono difficili da distinguere.],
  ) <fig-a03-51>


#figure(
  [#image(path("/assets/images/figure/accessibilita/scenario-usare-tastiera.png"), width: 100%, alt: "I controlli sono raggiungibili da tastiera. Il focus visibile e le azioni previste dal componente mantengono continuo il percorso.")],
  caption: [I controlli sono raggiungibili da tastiera. Il focus visibile e le azioni previste dal componente mantengono continuo il percorso.],
  ) <fig-a03-52>


#figure(
  [#image(path("/assets/images/figure/accessibilita/scenario-seguire-lezione.png"), width: 100%, alt: "Sottotitoli corretti includono parlato e suoni significativi. Le informazioni visive essenziali richiedono a loro volta un’alternativa pertinente.")],
  caption: [Sottotitoli corretti includono parlato e suoni significativi. Le informazioni visive essenziali richiedono a loro volta un’alternativa pertinente.],
  ) <fig-a03-53>


#sottotitolo-lettura[01 · Scegliere un prodotto]

#sottotitolo-lettura[02 · Completare un modulo]

#sottotitolo-lettura[03 · Seguire una lezione]

#emph[Scenari illustrativi e immagini originali. Non sono fotografie, risultati di test o interfacce reali.]


// Fonte Figma 2811:218 · C03 · 096 · SX — Tastiera, ordine e focus

== Tastiera, ordine e focus

#emph[L’informazione leggibile deve anche essere raggiungibile. Senza mouse, il compito richiede controlli utilizzabili, orientamento e possibilità di entrare e uscire dai componenti: i tre passaggi vanno verificati insieme.] @a03-wcag.

=== 01 · Raggiungere e usare · #link("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html")[2.1.1 A]

Le funzionalità devono poter essere utilizzate tramite tastiera, salvo quando la funzione stessa dipende dal percorso del movimento, come il disegno a mano libera. L’eccezione riguarda la funzione, non la tecnica di input scelta. Nei controlli web ordinari, Tab e Shift+Tab spostano il focus; i componenti complessi possono prevedere ulteriori tasti secondo il loro modello di interazione.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html", "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html"),
  etichetta: ([w3.org\/…\/keyboard], [w3.org\/…\/no-keyboard-trap])) <nota-a03-20-1>

=== 02 · Orientarsi durante il percorso · #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html")[2.4.3 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html")[2.4.7 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html")[2.4.1 A]

L’ordine del focus deve preservare significato e operabilità. Un indicatore visibile mostra dove agirà il prossimo comando. Titoli, regioni e collegamenti per saltare blocchi ripetuti consentono percorsi diversi: chi usa uno screen reader non deve necessariamente ascoltare tutta la pagina in sequenza.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html", "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html", "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html"),
  etichetta: ([w3.org\/…\/focus-order], [w3.org\/…\/focus-visible], [w3.org\/…\/bypass-blocks])) <nota-a03-20-2>

=== 03 · Entrare, uscire e riprendere · #link("https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html")[2.1.2 A]

Un dialogo o un menu non deve intrappolare la tastiera. Un dialogo modale contiene il focus mentre è aperto e lo restituisce in modo appropriato alla chiusura. Se servono tasti non standard per uscire, occorre comunicarli all’utente.#footnote(<nota-a03-20-1>)#super[, ]#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/", etichetta: [w3.org\/…\/dialog-modal]) <nota-a03-20-3>

// Fonte Figma 3122:764 · C03 · 097 · DX — Inviare un modulo senza mouse

=== Inviare un modulo senza mouse

#emph[Il compito è scegliere un corso e inviare il modulo: il percorso deve rimanere continuo (@fig-a03-54).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/tastiera-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/tastiera-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: un modulo con percorso interrotto e una versione utilizzabile da tastiera.],
  placement: top, scope: "parent",
) <fig-a03-54>


#sottotitolo-lettura[Barriera]

Il menu del corso risponde soltanto al mouse; l’utente raggiunge il campo ma non può completare la scelta.

#sottotitolo-lettura[Scelta di progetto]

Tasti previsti dal componente, focus visibile e ordine coerente consentono scelta, invio e ritorno alla pagina.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html", "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html", "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html", "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html"),
  etichetta: ([w3.org\/…\/keyboard], [w3.org\/…\/no-keyboard-trap], [w3.org\/…\/focus-order], [w3.org\/…\/focus-visible])) <nota-a03-21-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html")[2.1.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html")[2.1.2 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html")[2.4.3 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html")[2.4.7 AA]]

Percorri il modulo con la tastiera. Apri e chiudi il menu, controllando sempre dove si trova il focus.#footnote(<nota-a03-21-1>)


// Fonte Figma 2811:262 · C03 · 098 · SX — Puntamento e trascinamento

== Puntamento e trascinamento

#emph[Precisione, ampiezza dei bersagli e modalità alternative di azione influenzano la possibilità di completare un’interazione.] @a03-wcag.

=== Dimensione minima dei bersagli · #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html")[2.5.8 AA]

WCAG 2.2, criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html")[2.5.8 AA]: il bersaglio di un input a puntatore deve misurare almeno 24 × 24 CSS px, oppure rispettare una delle eccezioni previste. Per bersagli più piccoli, i cerchi di diametro 24 CSS px centrati sui rispettivi riquadri non devono intersecare altri bersagli né i cerchi di altri bersagli piccoli (@fig-a03-55).#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html", etichetta: [w3.org\/…\/target-size-minimum]) <nota-a03-22-1>

=== Le eccezioni contano · #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html")[2.5.8 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html")[2.5.5 AAA]

Il criterio prevede anche eccezioni per un controllo equivalente sulla stessa pagina, collegamenti nel testo, controlli la cui dimensione è determinata dal programma utente e non modificata dall’autore, e presentazioni essenziali. Non applicare la misura meccanicamente a ogni parola cliccabile. Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html")[2.5.5 AAA] usa 44 × 44 CSS px con proprie eccezioni.#footnote(<nota-a03-22-1>)#super[, ]#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html", etichetta: [w3.org\/…\/target-size-enhanced]) <nota-a03-22-2>

=== Un gesto, più percorsi · #link("https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html")[2.5.7 AA]

Se una funzione richiede trascinamento, il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html")[2.5.7 AA] richiede anche un’alternativa con un puntatore singolo senza trascinare, salvo le eccezioni del criterio. Per riordinare una lista si possono offrire comandi “Sposta su” e “Sposta giù”. La sola alternativa da tastiera non soddisfa questo requisito.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html", etichetta: [w3.org\/…\/dragging-movements]) <nota-a03-22-3>

Il confronto in @fig-a03-55 distingue dimensione e spaziatura dei bersagli.

#figure(
  [#image(path("/assets/images/figure/accessibilita/dimensioni-e-spaziatura-bersagli.svg"), width: 100%, alt: "Esempio simulato: quote in CSS px, non in scala fisica di stampa. I cerchi indicano l’eccezione di spaziatura del criterio 2.5.8 AA.")],
  caption: [Esempio simulato: quote in CSS px, non in scala fisica di stampa. I cerchi indicano l’eccezione di spaziatura del criterio 2.5.8 AA.],
  placement: top, scope: "parent",
) <fig-a03-55>



// Fonte Figma 3122:829 · C03 · 099 · DX — Riordinare senza trascinare

=== Riordinare senza trascinare

#emph[Spostare una voce può avere percorsi equivalenti anche quando il gesto cambia (@fig-a03-56).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/puntamento-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/puntamento-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: riordinare una lista mediante trascinamento o con comandi di spostamento.],
  placement: top, scope: "parent",
) <fig-a03-56>


#sottotitolo-lettura[Barriera]

La lista offre soltanto un’impugnatura da trascinare; precisione e movimento continuo diventano requisiti impliciti.

#sottotitolo-lettura[Scelta di progetto]

«Sposta su» e «Sposta giù» permettono lo stesso riordino con un puntatore singolo senza trascinamento.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html", "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html", "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html"),
  etichetta: ([w3.org\/…\/dragging-movements], [w3.org\/…\/target-size-minimum], [w3.org\/…\/keyboard])) <nota-a03-23-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html")[2.5.7 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html")[2.5.8 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html")[2.1.1 A]]

Verifica l’alternativa a puntatore e, separatamente, l’uso da tastiera e i bersagli. Le eccezioni dipendono dal criterio.#footnote(<nota-a03-23-1>)

]
#[
#import "../template/editoriale.typ": nota-compatta, sottotitolo-lettura


// Fonte Figma 2811:301 · C03 · 100 · SX — Immagini, struttura e significato

== Immagini, struttura e significato

#emph[Raggiungere i controlli è utile se il loro contenuto è comprensibile. Per le immagini, l’alternativa testuale restituisce ciò che viene comunicato o ciò che si può fare nel contesto d’uso.] @a03-wai-images.

=== Informativa, funzionale, decorativa · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html")[1.1.1 A]

Per un’immagine informativa, scrivi un testo che restituisca l’informazione pertinente. Se un’immagine svolge una funzione, come un’icona che avvia una ricerca, comunica lo scopo dell’azione. Per un’immagine puramente decorativa, un’alternativa vuota evita letture inutili.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html", "https://www.w3.org/WAI/tutorials/images/"),
  etichetta: ([w3.org\/…\/non-text-content], [w3.org\/…\/images])) <nota-a03-24-1>#super[, ]#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html", "https://www.w3.org/WAI/tutorials/images/complex/"),
  etichetta: ([w3.org\/…\/non-text-content], [w3.org\/…\/complex])) <nota-a03-24-2>

=== Le figure complesse · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html")[1.1.1 A]

Un grafico può richiedere una descrizione breve e una spiegazione più estesa, con dati o relazioni disponibili nel contenuto. Il testo alternativo non deve diventare un elenco indiscriminato di dettagli: scegli l’informazione necessaria a comprendere il messaggio o completare il compito.#footnote(<nota-a03-24-2>)

=== La struttura è informazione · #link("https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html")[1.3.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html")[2.4.4 A]

Titoli, elenchi, tabelle e regioni devono rappresentare relazioni reali e conservarle anche per le tecnologie assistive. Un testo grande e in grassetto non diventa automaticamente un titolo semantico. Nei link, indica una destinazione o uno scopo comprensibile nel contesto.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html", "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html", "https://www.w3.org/WAI/tutorials/page-structure/"),
  etichetta: ([w3.org\/…\/info-and-relationships], [w3.org\/…\/link-purpose-in-context], [w3.org\/…\/page-structure])) <nota-a03-24-3>

// Fonte Figma 3123:6602 · C03 · 101 · DX — Descrivere ciò che serve

=== Descrivere ciò che serve

#emph[La stessa fotografia può avere alternative differenti secondo il compito e il contesto (@fig-a03-57).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/immagini-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/immagini-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: un’alternativa testuale con il solo nome del file e una descrizione pertinente al prodotto.],
  placement: top, scope: "parent",
) <fig-a03-57>


#sottotitolo-lettura[Barriera]

Il nome del file non descrive il prodotto; chi non vede l’immagine perde l’informazione necessaria a confrontarlo.

#sottotitolo-lettura[Scelta di progetto]

L’alternativa restituisce il dettaglio pertinente. Un’icona funzionale comunica l’azione; una decorazione può avere alternativa vuota.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html", "https://www.w3.org/WAI/tutorials/images/"),
  etichetta: ([w3.org\/…\/non-text-content], [w3.org\/…\/images])) <nota-a03-25-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html")[1.1.1 A]]

Leggi la pagina senza immagini e verifica se resta possibile comprendere il contenuto o completare il compito.#footnote(<nota-a03-25-1>)


// Fonte Figma 2811:345 · C03 · 102 · SX — Contenuti audiovisivi accessibili

== Contenuti audiovisivi accessibili

#emph[Audio e immagini in movimento trasmettono informazioni diverse. Una sola alternativa non copre automaticamente tutte le esigenze.] @a03-wcag.

=== Sottotitoli · #link("https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html")[1.2.2 A]

Per l’audio preregistrato in contenuti sincronizzati, il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html")[1.2.2 A] richiede sottotitoli, salvo l’eccezione dei media che costituiscono un’alternativa al testo e sono indicati come tali. Includi parlato, identificazione di chi parla e suoni significativi. I sottotitoli automatici devono essere verificati e corretti.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html", etichetta: [w3.org\/…\/captions-prerecorded]) <nota-a03-26-1>

=== Informazioni visive · #link("https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html")[1.2.5 AA]

I sottotitoli non descrivono ciò che si vede. Per i video preregistrati nei media sincronizzati, il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html")[1.2.5 AA] richiede l’audiodescrizione delle informazioni visive rilevanti non già comunicate dalla traccia audio. Se tutte le informazioni importanti sono già nell’audio, non occorre una descrizione aggiuntiva. Una trascrizione descrittiva offre un’altra modalità di fruizione, ma non sostituisce da sola quel requisito.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html", etichetta: [w3.org\/…\/audio-description-prerecorded]) <nota-a03-26-2>

=== Progettare anche il lettore · #link("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html")[2.1.1 A]

Il player deve consentire l’uso da tastiera, mostrare controlli comprensibili e rendere disponibili le alternative. Sottotitoli, trascrizioni e descrizioni vanno pianificati durante la produzione, così da evitare che informazioni essenziali siano affidate a un solo canale.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html", "https://www.w3.org/WAI/media/av/planning/"),
  etichetta: ([w3.org\/…\/keyboard], [w3.org\/…\/planning])) <nota-a03-26-3>

// Fonte Figma 3123:6669 · C03 · 103 · DX — Seguire un video su più canali

=== Seguire un video su più canali

#emph[Parlato, suoni significativi e informazioni visive richiedono alternative pertinenti (@fig-a03-58).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/media-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/media-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: informazioni affidate al solo audio e una versione con sottotitoli e alternative pertinenti.],
  placement: top, scope: "parent",
) <fig-a03-58>


#sottotitolo-lettura[Barriera]

Il parlato è disponibile soltanto nell’audio; una freccia mostrata dal docente non viene spiegata a voce.

#sottotitolo-lettura[Scelta di progetto]

Sottotitoli corretti rendono disponibile l’audio. Le informazioni visive essenziali sono descritte anche nella traccia audio o con audiodescrizione.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html", "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html", "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html"),
  etichetta: ([w3.org\/…\/captions-prerecorded], [w3.org\/…\/audio-description-prerecorded], [w3.org\/…\/keyboard])) <nota-a03-27-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html")[1.2.2 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html")[1.2.5 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html")[2.1.1 A]]

Controlla le alternative e il player da tastiera. Una trascrizione da sola non sostituisce automaticamente l’audiodescrizione AA.#footnote(<nota-a03-27-1>)


// Fonte Figma 2825:328 · C03 · 104 · SX — Nome, ruolo e stato dei controlli

== Nome, ruolo e stato dei controlli

#emph[Il nome identifica il comando, il ruolo la funzione, lo stato la condizione corrente. Anche i controlli, come testi e media, devono trasmettere queste informazioni.] @a03-wcag.

=== Rendere riconoscibile il comando · #link("https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html")[4.1.2 A]

Nome e ruolo devono essere identificabili dal software. Stati, proprietà e valori impostabili dall’utente devono poter essere impostati anche programmaticamente; le notifiche dei cambiamenti devono essere disponibili ai programmi utente, incluse le tecnologie assistive. Preferisci controlli nativi usati secondo le specifiche e verifica quelli personalizzati.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html", etichetta: [w3.org\/…\/name-role-value]) <nota-a03-28-1>

=== Collegare ciò che si vede e si pronuncia · #link("https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html")[2.5.3 A]

Quando l’etichetta di un controllo contiene testo visibile, il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html")[2.5.3 A] richiede che il nome accessibile contenga quel testo. Un pulsante “Cerca” con nome accessibile “Trova prodotti” può ostacolare chi tenta di attivarlo pronunciando la parola visibile. “Cerca nel catalogo” conserva invece l’etichetta.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html", etichetta: [w3.org\/…\/label-in-name]) <nota-a03-28-2>

=== Lo stato fa parte dell’informazione · #link("https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html")[4.1.2 A]

Comunica se un pannello è aperto o chiuso e se una casella è selezionata. Colore o forma non bastano per le tecnologie assistive: documenta gli stati insieme alle modalità di azione e verifica il componente realizzato.#footnote(<nota-a03-28-1>)

// Fonte Figma 3123:6734 · C03 · 105 · DX — Aprire i dettagli di consegna

=== Aprire i dettagli di consegna

#emph[Aspetto visivo e informazione esposta alle tecnologie assistive descrivono lo stesso comando (@fig-a03-59).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/semantica-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/semantica-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: testo che sembra cliccabile e un comando con nome, ruolo e stato disponibili alle tecnologie assistive.],
  placement: top, scope: "parent",
) <fig-a03-59>


#sottotitolo-lettura[Barriera]

Il testo sembra cliccabile, ma il software non riconosce il pulsante o non riceve il suo stato.

#sottotitolo-lettura[Scelta di progetto]

Nome «Dettagli consegna», ruolo pulsante e stato espanso\/compresso consentono di capire l’azione e il cambiamento.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html", "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html"),
  etichetta: ([w3.org\/…\/name-role-value], [w3.org\/…\/keyboard])) <nota-a03-29-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html")[4.1.2 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html")[2.1.1 A]]

Attiva il controllo con la tastiera e verifica nome, ruolo e stato con la tecnologia assistiva pertinente.#footnote(<nota-a03-29-1>)


// Fonte Figma 2825:372 · C03 · 106 · SX — Feedback e messaggi di stato

== Feedback e messaggi di stato

#emph[Un aggiornamento può essere visibile sullo schermo senza essere percepito da chi utilizza una tecnologia assistiva.] @a03-wcag.

=== Comunicare senza spostare il focus · #link("https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html")[4.1.3 AA]

Nei contenuti con linguaggi di markup, i messaggi di stato devono essere identificabili programmaticamente mediante ruolo o proprietà, così che le tecnologie assistive possano presentarli senza ricevere focus. Il criterio riguarda messaggi su esito di azioni, attesa, avanzamento o errori che non comportano un cambiamento di contesto.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html", etichetta: [w3.org\/…\/status-messages]) <nota-a03-30-1>

=== Un riscontro comprensibile · #link("https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html")[4.1.3 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html")[3.3.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html")[3.3.3 AA]

“Salvataggio completato”, “Nessun risultato” o “Tre errori nel modulo” spiegano che cosa è successo. Nel progetto, indica quale evento produce il messaggio e quale informazione occorre comunicare. Per gli errori, conserva anche le spiegazioni associate ai campi: l’annuncio non sostituisce le istruzioni per correggerli.#footnote(<nota-a03-30-1>)#super[, ]#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html", "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html"),
  etichetta: ([w3.org\/…\/error-identification], [w3.org\/…\/error-suggestion])) <nota-a03-30-2>

=== Evitare interruzioni superflue · #link("https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html")[4.1.3 AA]

Non spostare il focus per ogni aggiornamento e non trasformare ogni modifica in un annuncio. Il criterio non impone di creare messaggi per tutti i cambiamenti della pagina. Concorda con chi implementa priorità e frequenza dei riscontri e verifica che l’utente comprenda l’esito senza perdere il punto del compito.#footnote(<nota-a03-30-1>)

// Fonte Figma 3123:6795 · C03 · 107 · DX — Capire che il salvataggio è riuscito

=== Capire che il salvataggio è riuscito

#emph[L’esito deve essere disponibile anche quando il focus rimane sul comando (@fig-a03-60).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/feedback-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/feedback-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: un messaggio di salvataggio lontano dal comando e una conferma disponibile anche allo screen reader.],
  placement: top, scope: "parent",
) <fig-a03-60>


#sottotitolo-lettura[Barriera]

Un messaggio appare lontano dal pulsante; chi usa uno screen reader può continuare senza sapere che cosa è successo.

#sottotitolo-lettura[Scelta di progetto]

Il messaggio di stato è identificabile programmaticamente. L’esito viene presentato senza spostare il focus dal compito.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html", etichetta: [w3.org\/…\/status-messages]) <nota-a03-31-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html")[4.1.3 AA]]

Dopo «Salva», verifica che il messaggio sia percepito e che l’utente possa continuare dal punto in cui si trova.#footnote(<nota-a03-31-1>)

]
#[
#import "../template/editoriale.typ": nota-compatta, sottotitolo-lettura


// Fonte Figma 2811:384 · C03 · 108 · SX — Accessibilità cognitiva

== Accessibilità cognitiva

#emph[Informazioni e controlli riconoscibili devono anche poter essere compresi e usati. Orientarsi, ricordare e gestire l’attenzione fanno parte del compito; i bisogni variano fra persone e situazioni.] @a03-coga.

=== Indagare i bisogni

Le difficoltà possono riguardare linguaggio, attenzione, memoria o elaborazione delle informazioni. Una difficoltà in una di queste funzioni non implica una difficoltà in tutte le altre. Non ricavare un profilo completo da una diagnosi: osserva obiettivi, compiti, preferenze e modalità d’uso.

=== Oltre la verifica dei criteri

La conformità alle WCAG è una base importante, ma non copre ogni bisogno. La guida W3C Making Content Usable for People with Cognitive and Learning Disabilities, spesso indicata come COGA, propone indicazioni supplementari per rendere i contenuti più comprensibili e utilizzabili.

=== Coinvolgere e osservare

Una schermata visivamente semplice può comunque richiedere passaggi difficili da capire o ricordare. Coinvolgi persone con esperienze diverse e osserva dove esitano, perdono il filo o devono chiedere aiuto. Usa i risultati per rivedere il compito e l’interfaccia, senza attribuire automaticamente la difficoltà alla persona.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/people-use-web/abilities-barriers/cognitive/", etichetta: [w3.org\/…\/cognitive]) <nota-a03-32-1>#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/about/", etichetta: [w3.org\/…\/about]) <nota-a03-32-2>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-32-3>

// Fonte Figma 2811:429 · C03 · 109 · DX — Riconoscere, capire, ricordare

=== Riconoscere, capire, ricordare

#emph[Rendi disponibili le informazioni nel momento in cui servono. Riduci la necessità di ricostruirle mentalmente fra schermate.] @a03-coga.

=== Parole e istruzioni

Usa parole comuni e spiega i termini specialistici necessari. Dividi istruzioni articolate in passaggi brevi e ordinati. Colloca la spiegazione vicino al campo o prima dell’azione; un esempio può chiarire il formato richiesto. Non aspettare l’errore per dire che cosa occorre fare.

=== Il contesto resta visibile

Mostra dove si trova l’utente nel percorso e quali passi restano. Rendi consultabili i dati rilevanti già inseriti: per esempio, un riepilogo di prenotazione prima della conferma. Consenti di tornare a correggere un dato senza ricominciare l’intero processo.

=== Preparare il compito

Prima di un’attività articolata, indica documenti o risorse richiesti, una stima del tempo e la sequenza delle fasi. Distingui chiaramente un passaggio in corso da uno completato. Queste indicazioni COGA sostengono il progetto; non sono tutte, di per sé, requisiti di conformità WCAG.#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p01-clear-words/", etichetta: [w3.org\/…\/o3p01-clear-words]) <nota-a03-33-1>#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/", etichetta: [w3.org\/…\/o4p07-step-instructions]) <nota-a03-33-2>#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o6p05-low-cognition/", etichetta: [w3.org\/…\/o6p05-low-cognition]) <nota-a03-33-3>#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p04-task-expectations/", etichetta: [w3.org\/…\/o5p04-task-expectations]) <nota-a03-33-4>

// Fonte Figma 3123:6857 · C03 · 110 · SX — Prenotare con il contesto visibile

=== Prenotare con il contesto visibile

#emph[Un riepilogo al momento della scelta riduce la necessità di ricordare dati fra schermate (@fig-a03-61).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/cognitiva-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/cognitiva-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: una prenotazione che richiede di ricordare i dati e una conferma con il riepilogo visibile.],
  placement: top, scope: "parent",
) <fig-a03-61>


#sottotitolo-lettura[Barriera]

La conferma richiede di ricordare data e ora inserite nella schermata precedente; correggerle significa ricominciare.

#sottotitolo-lettura[Scelta di progetto]

Il riepilogo conserva i dati e distingue «Modifica» da «Conferma». Parole comuni e passi visibili sostengono il compito.#nota-compatta([W3C, COGA],
  ("https://www.w3.org/WAI/WCAG2/supplemental/patterns/o6p05-low-cognition/", "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p01-clear-words/", "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/"),
  etichetta: ([w3.org\/…\/o6p05-low-cognition], [w3.org\/…\/o3p01-clear-words], [w3.org\/…\/o4p07-step-instructions])) <nota-a03-34-1>

#sottotitolo-lettura[Come verificare · COGA]

Osserva una prenotazione completa. Queste indicazioni COGA integrano le WCAG e non sono da sole una prova di conformità.#footnote(<nota-a03-34-1>)


// Fonte Figma 2811:470 · C03 · 111 · DX — Movimento, tempo e distrazioni

== Movimento, tempo e distrazioni

#emph[La continuità del compito dipende anche da tempo e attenzione. Movimento, suoni e interruzioni possono far perdere il punto: il controllo dell’esperienza deve restare comprensibile.] @a03-wcag @a03-coga.

=== Pausa, arresto, nascondi · #link("https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html")[2.2.2 A]

Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html")[2.2.2 A] riguarda, fra l’altro, contenuti in movimento, lampeggianti o scorrevoli che partono automaticamente, durano più di cinque secondi e sono presentati insieme ad altri contenuti. Serve un modo per metterli in pausa, fermarli o nasconderli, salvo che il movimento sia essenziale. Per gli aggiornamenti automatici presentati in parallelo, il criterio prevede anche il controllo della frequenza e non usa la soglia di cinque secondi.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html", etichetta: [w3.org\/…\/pause-stop-hide]) <nota-a03-35-1>

=== Animazioni e preferenze · #link("https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html")[2.3.3 AAA]

Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html")[2.3.3 AAA] prevede che le animazioni di movimento attivate dall’interazione possano essere disabilitate, salvo quelle essenziali. Come scelta progettuale, rispetta la preferenza di movimento ridotto e conserva un riscontro comprensibile delle azioni anche nella versione statica.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html", etichetta: [w3.org\/…\/animation-from-interactions]) <nota-a03-35-2>

=== Interruzioni e flash · COGA \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html")[2.3.1 A]

COGA raccomanda di limitare notifiche e distrazioni non necessarie e di offrire controlli semplici sul loro comportamento. L’utente dovrebbe poter scegliere quando interrompere il compito o riprenderlo. Non presumere che una stessa quantità di stimoli sia confortevole per tutte le persone. I flash richiedono una verifica distinta sul criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html")[2.3.1 A]: pausa e movimento ridotto non la sostituiscono.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html", etichetta: [w3.org\/…\/three-flashes-or-below-threshold]) <nota-a03-35-3>#super[, ]#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o5p01-minimal-interruptions/", etichetta: [w3.org\/…\/o5p01-minimal-interruptions]) <nota-a03-35-4>

// Fonte Figma 2811:516 · C03 · 112 · SX — Fermarsi e riprendere

=== Fermarsi e riprendere

#emph[Un’interruzione non dovrebbe costringere a perdere il lavoro o a ricostruire da zero ciò che è già stato fatto.] @a03-wcag @a03-coga.

=== Prevenire la perdita dei dati · COGA

Quando possibile e sicuro, conserva progressivamente il lavoro e rendi evidente che cosa è stato salvato. Se il sistema richiede una scadenza, comunica prima quanto tempo è disponibile e che cosa succederà ai dati. COGA propone queste indicazioni come supporto supplementare.#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p09-data-loss/", etichetta: [w3.org\/…\/o4p09-data-loss]) <nota-a03-36-1>

=== Gestire i limiti di tempo · #link("https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html")[2.2.1 A]

Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html")[2.2.1 A] richiede, per i limiti di tempo impostati dal contenuto, almeno una delle possibilità previste per disattivarli, regolarli o estenderli, salvo le eccezioni per eventi in tempo reale, limiti essenziali e limiti superiori a venti ore. Le modalità precise vanno verificate sul criterio.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html", etichetta: [w3.org\/…\/timing-adjustable]) <nota-a03-36-2>

=== Ritrovare il contesto · COGA

Alla ripresa, mostra l’ultimo passo completato, i dati disponibili e l’azione successiva. Un riepilogo consente di verificare lo stato senza affidarsi soltanto alla memoria. Il salvataggio tra sessioni è una scelta progettuale distinta dal criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html")[3.3.7 A] sull’inserimento ridondante nello stesso processo.#footnote(<nota-a03-36-1>)#super[, ]#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html", etichetta: [w3.org\/…\/redundant-entry]) <nota-a03-36-3>

// Fonte Figma 3123:6936 · C03 · 113 · DX — Fermare e riprendere la lettura

=== Fermare e riprendere la lettura

#emph[L’utente deve poter controllare un cambiamento che interferisce con il compito (@fig-a03-62).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/movimento-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/movimento-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: notizie in movimento senza controllo e una versione che permette di fermare e riprendere la lettura.],
  placement: top, scope: "parent",
) <fig-a03-62>


#sottotitolo-lettura[Barriera]

Le notizie scorrono e si aggiornano mentre l’utente legge; una distrazione può fargli perdere il punto.

#sottotitolo-lettura[Scelta di progetto]

Il controllo previsto ferma gli aggiornamenti e rende possibile riprendere. Le impostazioni di movimento ridotto agiscono sugli effetti pertinenti.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html", "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html", "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html", "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html"),
  etichetta: ([w3.org\/…\/pause-stop-hide], [w3.org\/…\/animation-from-interactions], [w3.org\/…\/timing-adjustable], [w3.org\/…\/three-flashes-or-below-threshold])) <nota-a03-37-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html")[2.2.2 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html")[2.3.3 AAA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html")[2.2.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html")[2.3.1 A]]

Distingui movimento, aggiornamenti, limiti di tempo e flash: sono verifiche con condizioni ed eccezioni diverse.#footnote(<nota-a03-37-1>)


// Fonte Figma 2811:556 · C03 · 114 · SX — Moduli: istruzioni ed errori

== Moduli: istruzioni ed errori

#emph[Queste scelte si incontrano nei moduli: occorre capire che cosa inserire, perché è richiesto e come correggere un errore, senza perdere il percorso o i dati validi.] @a03-wcag.

=== Etichette persistenti · #link("https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html")[1.3.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html")[3.3.2 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html")[1.4.1 A]

Associa un’etichetta a ogni campo e fornisci le istruzioni necessarie. Il placeholder può mostrare un esempio, ma non sostituisce un’etichetta: scompare durante la compilazione e non garantisce una relazione programmatica con il controllo. I campi obbligatori devono essere riconoscibili anche senza il solo colore.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html", "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html", "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html", "https://www.w3.org/WAI/tutorials/forms/labels/"),
  etichetta: ([w3.org\/…\/info-and-relationships], [w3.org\/…\/labels-or-instructions], [w3.org\/…\/use-of-color], [w3.org\/…\/labels])) <nota-a03-38-1>

=== Errori comprensibili · #link("https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html")[3.3.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html")[3.3.3 AA]

Quando un errore viene rilevato automaticamente, identifica il campo interessato e descrivi il problema in testo. Quando è nota una correzione, suggeriscila, salvo che comprometta sicurezza o scopo del contenuto. Conserva i dati validi e rendi raggiungibili le spiegazioni.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html", "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html"),
  etichetta: ([w3.org\/…\/error-identification], [w3.org\/…\/error-suggestion])) <nota-a03-38-2>#super[, ]#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/tutorials/forms/notifications/", etichetta: [w3.org\/…\/notifications]) <nota-a03-38-3>

=== Controllare prima di confermare · #link("https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html")[3.3.4 AA]

Per le operazioni previste dal criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html")[3.3.4 AA], fra cui impegni giuridici o transazioni finanziarie e modifiche o cancellazioni di dati controllabili dall’utente e l’invio di risposte a test, serve almeno una delle possibilità indicate: rendere reversibile l’invio; controllare i dati e consentire la correzione degli errori; oppure permettere di riesaminare, confermare e correggere le informazioni prima di completare l’invio.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html", etichetta: [w3.org\/…\/error-prevention-legal-financial-data]) <nota-a03-38-4>

// Fonte Figma 3123:7005 · C03 · 115 · DX — Correggere una data

=== Correggere una data

#emph[Il messaggio identifica il problema e indica come intervenire, conservando gli altri dati validi (@fig-a03-63).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/moduli-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/moduli-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: un messaggio di errore generico e una spiegazione che aiuta a correggere la data.],
  placement: top, scope: "parent",
) <fig-a03-63>


#sottotitolo-lettura[Barriera]

#sottotitolo-lettura[Scelta di progetto]

Un campo diventa rosso con un generico «Errore»; l’utente deve indovinare che cosa modificare.

L’etichetta resta visibile e il messaggio associato al campo spiega il formato GG\/MM\/AAAA e la correzione necessaria.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html", "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html", "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html", "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html", "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html", "https://www.w3.org/WAI/tutorials/forms/labels/"),
  etichetta: ([w3.org\/…\/info-and-relationships], [w3.org\/…\/labels-or-instructions], [w3.org\/…\/error-identification], [w3.org\/…\/error-suggestion], [w3.org\/…\/use-of-color], [w3.org\/…\/labels])) <nota-a03-39-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html")[1.3.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html")[3.3.2 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html")[3.3.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html")[3.3.3 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html")[1.4.1 A]]

Invia un dato errato e verifica messaggio, collegamento al campo, focus e conservazione delle altre informazioni.#footnote(<nota-a03-39-1>)


// Fonte Figma 2811:600 · C03 · 116 · SX — Autenticazione e dati ripetuti

== Autenticazione e dati ripetuti

#emph[Il percorso del modulo continua nell’accesso al servizio. Memoria e trascrizione possono creare barriere anche qui; le WCAG 2.2 ne affrontano alcune attraverso requisiti sull’autenticazione.] @a03-wcag.

=== Non far reinserire senza motivo · #link("https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html")[3.3.7 A]

Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html")[3.3.7 A] riguarda le informazioni già inserite o fornite all’utente nello stesso processo: devono essere precompilate oppure disponibili da selezionare. Sono previste eccezioni quando la ripetizione è essenziale, serve alla sicurezza o l’informazione non è più valida. Non richiede la conservazione tra sessioni.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html", etichetta: [w3.org\/…\/redundant-entry]) <nota-a03-40-1>

=== Consentire assistenza · #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html")[3.3.8 AA]

Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html")[3.3.8 AA] non vieta le password. Per un passaggio di autenticazione che richiede un test cognitivo, prevede un’alternativa o un meccanismo di assistenza, con specifiche eccezioni. Compatibilità con i gestori di password e possibilità di incollare credenziali o codici possono ridurre memoria e trascrizione.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html", etichetta: [w3.org\/…\/accessible-authentication-minimum]) <nota-a03-40-2>

=== Verificare il percorso completo · #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html")[3.3.8 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html")[3.3.9 AAA]

Controlla accesso, recupero account e autenticazione a più fattori. Evita di interrompere l’assistenza fra un passaggio e l’altro. Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html")[3.3.9 AAA] è più restrittivo: non ammette le eccezioni del livello AA per riconoscimento di oggetti o contenuti personali.#footnote(<nota-a03-40-2>)#super[, ]#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html", etichetta: [w3.org\/…\/accessible-authentication-enhanced]) <nota-a03-40-3>

// Fonte Figma 3123:7068 · C03 · 117 · DX — Accedere con gli strumenti abituali

=== Accedere con gli strumenti abituali

#emph[La password non è di per sé il problema: conta l’assistenza disponibile lungo il percorso (@fig-a03-64).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/autenticazione-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/autenticazione-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: un accesso che blocca l’incolla e una versione che permette l’uso degli strumenti abituali.],
  placement: top, scope: "parent",
) <fig-a03-64>


#sottotitolo-lettura[Barriera]

Il servizio blocca l’incolla e obbliga a ricordare o trascrivere la password, anche quando un gestore può fornirla.

#sottotitolo-lettura[Scelta di progetto]

L’incolla e la compatibilità con il gestore riducono memoria e trascrizione. L’assistenza continua anche nel recupero e nei passaggi successivi.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html", etichetta: [w3.org\/…\/accessible-authentication-minimum]) <nota-a03-41-1>

#sottotitolo-lettura[Come verificare · #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html")[3.3.8 AA]]

Valuta il percorso completo rispetto al criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html")[3.3.8 AA], comprese le sue condizioni ed eccezioni.#footnote(<nota-a03-41-1>)

]
#[
#import "../template/editoriale.typ": nota-compatta, sottotitolo-lettura


// Fonte Figma 2811:639 · C03 · 118 · SX — Personalizzare senza escludere

== Personalizzare senza escludere

#emph[Moduli e accesso mostrano che un’unica modalità può non rispondere a bisogni diversi. Le alternative devono essere facili da trovare e usare, conservando informazioni e funzioni necessarie.] @a03-coga.

=== Una base già utilizzabile · COGA

Una preferenza non corregge da sola una versione predefinita illeggibile. Verifica gli adattamenti descritti nelle tavole sul testo e sul layout, anche con le impostazioni del browser e del sistema. Le indicazioni COGA sostengono una personalizzazione più ampia.#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o8p04-interface/", etichetta: [w3.org\/…\/o8p04-interface]) <nota-a03-42-1>

=== Scelte pertinenti · COGA

COGA suggerisce interfacce personalizzabili e familiari. Offri controlli per gli aspetti che influenzano il compito: testo, contrasto, animazioni, suoni o densità delle informazioni. Spiega l’effetto delle opzioni e consenti di modificare o ripristinare le preferenze.#footnote(<nota-a03-42-1>)

=== Esperienze equivalenti · COGA

Modalità differenti devono conservare l’informazione e l’azione necessarie. Una scelta più semplice non dovrebbe privare l’utente di una funzione essenziale. Coinvolgi le persone nella verifica: una modalità unica per una categoria di utenti non rappresenta automaticamente le loro preferenze.#footnote(<nota-a03-42-1>)

=== Aiuto facile da trovare · COGA \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html")[3.2.6 A]

COGA raccomanda accesso semplice al supporto durante il compito. Se i meccanismi di aiuto previsti dal criterio ricorrono su più pagine dello stesso insieme, il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html")[3.2.6 A] richiede lo stesso ordine relativo rispetto agli altri contenuti, salvo una modifica avviata dall’utente. Non impone di introdurre un servizio di assistenza.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html", etichetta: [w3.org\/…\/consistent-help]) <nota-a03-42-2>#super[, ]#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o7p01-human-help/", etichetta: [w3.org\/…\/o7p01-human-help]) <nota-a03-42-3>

// Fonte Figma 3123:7129 · C03 · 119 · DX — Adattare la lettura

=== Adattare la lettura

#emph[Le preferenze sostengono un’esperienza già utilizzabile e conservano le funzioni essenziali (@fig-a03-65).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/personalizzazione-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/personalizzazione-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: una sola configurazione di lettura e una versione che permette di adattare testo, movimento e densità.],
  placement: top, scope: "parent",
) <fig-a03-65>


#sottotitolo-lettura[Barriera]

Testo, movimento e densità hanno una sola configurazione; adattare il compito richiede aggirare l’interfaccia.

#sottotitolo-lettura[Scelta di progetto]

Opzioni reperibili spiegano l’effetto e consentono di ripristinare la scelta. I contenuti essenziali restano disponibili.#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o8p04-interface/", etichetta: [w3.org\/…\/o8p04-interface]) <nota-a03-43-1>

#sottotitolo-lettura[Come verificare · COGA]

Verifica le opzioni con le impostazioni del browser e con le persone. La personalizzazione COGA non sostituisce i requisiti WCAG.#footnote(<nota-a03-43-1>)


// Fonte Figma 2811:685 · C03 · 120 · SX — Lingua e rappresentazione

== Lingua e rappresentazione

#emph[L’inclusione riguarda anche il modo in cui un servizio descrive le persone e riconosce le loro differenze.] @a03-names.

=== Nomi e moduli · I18n

Le convenzioni sui nomi personali variano fra lingue e culture. Evita assunzioni rigide su numero delle parti, ordine, lunghezza e caratteri. Definisci i campi in base all’uso effettivo dell’informazione e spiega i requisiti necessari, invece di trattare una sola convenzione come universale.#nota-compatta([W3C, WAI], "https://www.w3.org/International/questions/qa-personal-names", etichetta: [w3.org\/…\/qa-personal-names]) <nota-a03-44-1>

=== Lingua e comprensione · #link("https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html")[3.1.1 A] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html")[3.1.2 AA]

Dichiara correttamente la lingua della pagina e dei passaggi in altre lingue quando richiesto: le tecnologie assistive possono così interpretare meglio il testo. Nei servizi multilingue, rendi chiara la scelta della lingua e verifica termini, istruzioni e messaggi nel contesto d’uso.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html", "https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html"),
  etichetta: ([w3.org\/…\/language-of-page], [w3.org\/…\/language-of-parts])) <nota-a03-44-2>

=== Rappresentare la diversità · WAI

Nei materiali di ricerca e nelle immagini, considera esperienze e contesti differenti. Le rappresentazioni possono aprire domande di progetto, ma non sostituiscono la partecipazione delle persone. Non dedurre capacità, bisogni o comportamento dall’aspetto di un personaggio o da una categoria demografica.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-44-3>

// Fonte Figma 3123:7188 · C03 · 121 · DX — Riconoscere nomi e lingue

=== Riconoscere nomi e lingue

#emph[Le convenzioni del modulo devono corrispondere all’uso reale dell’informazione (@fig-a03-66).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/lingua-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/lingua-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: convenzioni rigide per nomi e lingue e una versione adattata ai dati necessari.],
  placement: top, scope: "parent",
) <fig-a03-66>


#sottotitolo-lettura[Barriera]

Un campo impone una sola convenzione su parti del nome e caratteri, escludendo combinazioni valide in altri contesti.

#sottotitolo-lettura[Scelta di progetto]

I requisiti sono spiegati e motivati dal servizio; il modulo gestisce i nomi effettivi. La lingua dei contenuti è dichiarata correttamente.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html", "https://www.w3.org/International/questions/qa-personal-names"),
  etichetta: ([w3.org\/…\/language-of-page], [w3.org\/…\/qa-personal-names])) <nota-a03-45-1>

#sottotitolo-lettura[Come verificare · I18n \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html")[3.1.1 A]]

Prova nomi e lingue pertinenti al servizio, senza dedurre capacità o bisogni dall’origine o dall’aspetto delle persone.#footnote(<nota-a03-45-1>)


// Fonte Figma 2811:725 · C03 · 122 · SX — WCAG 2.2: decisioni da verificare

== WCAG 2.2: decisioni da verificare

#emph[I criteri sono requisiti verificabili, con un ambito e un livello precisi. Queste aggiunte delle WCAG 2.2 hanno ricadute dirette sul progetto.] @a03-wcag.

=== Focus non oscurato · #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html")[2.4.11 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html")[2.4.12 AAA]

Quando un componente riceve il focus da tastiera, non deve essere interamente nascosto da contenuti creati dall’autore. Verifica banner, barre fisse e finestre sovrapposte. Il criterio #link("https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html")[2.4.12 AAA] richiede invece che nessuna parte del componente sia nascosta.#nota-compatta([W3C, WCAG 2.2],
  ("https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html", "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html"),
  etichetta: ([w3.org\/…\/focus-not-obscured-minimum], [w3.org\/…\/focus-not-obscured-enhanced])) <nota-a03-46-1>

=== Azioni e bersagli · #link("https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html")[2.5.7 AA] \/ #link("https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html")[2.5.8 AA]

Prevedi un’alternativa al trascinamento con puntatore singolo e verifica dimensioni o spaziatura dei bersagli. I criteri contengono eccezioni: associa la decisione al comportamento concreto del componente, evitando una misura unica applicata senza contesto.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html", etichetta: [w3.org\/…\/dragging-movements]) <nota-a03-46-2>#super[, ]#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html", etichetta: [w3.org\/…\/target-size-minimum]) <nota-a03-46-3>

=== Dati ripetuti · #link("https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html")[3.3.7 A]

Nel medesimo processo, rendi disponibili le informazioni già inserite o fornite, salvo le eccezioni previste. Un percorso di acquisto o prenotazione è un buon punto in cui verificare se l’utente deve riscrivere gli stessi dati.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html", etichetta: [w3.org\/…\/redundant-entry]) <nota-a03-46-4>

=== Autenticazione accessibile · #link("https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html")[3.3.8 AA]

Controlla le richieste cognitive nei passaggi di accesso e l’assistenza disponibile. L’uso di password non determina da solo una violazione: occorre valutare il percorso e le condizioni previste dal criterio.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html", etichetta: [w3.org\/…\/accessible-authentication-minimum]) <nota-a03-46-5>

// Fonte Figma 2811:773 · C03 · 123 · DX — Conformità e qualità dell’esperienza

=== Conformità e qualità dell’esperienza

#emph[Un buon progetto collega i requisiti tecnici alle attività delle persone. La valutazione deve esplicitare che cosa è stato verificato.] @a03-wcag.

=== Pagine e processi completi

La conformità riguarda le pagine complete e, quando un’attività è composta da una sequenza, il processo completo. Un singolo controllo corretto o una sola schermata verificata non dimostrano la conformità di un intero sito.

=== Livello e ambito

Dichiara versione delle WCAG, livello, pagine e funzioni valutate, metodi, data e limiti della verifica. Una mappa dei criteri aiuta a individuare responsabilità e prove richieste. Il numero di errori segnalati da uno strumento non è una percentuale universale di accessibilità.

=== La conformità non copre ogni bisogno

Le WCAG riconoscono di non affrontare ogni esigenza degli utenti. Affianca quindi le verifiche tecniche a osservazioni sui compiti, indicazioni supplementari pertinenti e prove con persone diverse. Un test di usabilità non sostituisce l’audit dei criteri; l’audit non sostituisce la ricerca sull’esperienza.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/conformance", etichetta: [w3.org\/…\/conformance]) <nota-a03-47-1>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/", etichetta: [w3.org\/WAI\/test-evaluate\/]) <nota-a03-47-2>#nota-compatta([W3C, COGA], "https://www.w3.org/WAI/WCAG2/supplemental/about/", etichetta: [w3.org\/…\/about]) <nota-a03-47-3>

// Fonte Figma 3123:7249 · C03 · 124 · SX — Verificare un percorso completo

=== Verificare un percorso completo

#emph[Una schermata corretta non basta quando il compito attraversa più passaggi (@fig-a03-67).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/verifica-wcag-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/verifica-wcag-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: una verifica limitata all’accesso e una prova dell’intero percorso, inclusi errori e conferma.],
  placement: top, scope: "parent",
) <fig-a03-67>


#sottotitolo-lettura[Barriera]

L’audit si ferma alla pagina di accesso; gli errori e la conferma della prenotazione rimangono fuori dall’ambito.

#sottotitolo-lettura[Scelta di progetto]

La verifica considera tutte le pagine e i passaggi del processo. Versione, livello, metodi, data e limiti sono dichiarati.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/conformance", etichetta: [w3.org\/…\/conformance]) <nota-a03-48-1>

#sottotitolo-lettura[Come verificare · Conformità WCAG]

Usa i criteri pertinenti su ogni passaggio. Il conteggio degli errori automatici non è una percentuale universale di accessibilità.#footnote(<nota-a03-48-1>)


// Fonte Figma 2811:812 · C03 · 125 · DX — Valutare con strumenti e persone

== Valutare con strumenti e persone

#emph[Le alternative di progetto devono essere verificate nei compiti. Strumenti automatici, controlli manuali e prove con persone rilevano barriere differenti: combinarli permette di rivedere le scelte con evidenze.] @a03-wai-evaluation.

=== Controlli automatici

Gli strumenti aiutano a trovare alcuni problemi, ma non possono determinare da soli se un sito è accessibile. Per esempio, la presenza di un testo alternativo è verificabile automaticamente; la sua pertinenza rispetto al contesto richiede giudizio umano.

=== Verifiche manuali

Esamina struttura, contenuti e comportamento dei componenti. Prova la tastiera, il focus, gli ingrandimenti, gli errori nei moduli e le alternative ai media. Quando pertinente, verifica le combinazioni di browser e tecnologie assistive considerate nel progetto.

=== Prove d’uso

Coinvolgi persone che utilizzano modalità e tecnologie differenti. Usa compiti realistici e registra ostacoli, aiuti richiesti e conseguenze sul completamento. L’esperienza di una persona non rappresenta tutte le persone con la stessa disabilità; le prove con utenti vanno affiancate alla valutazione dei criteri.

WAI significa Web Accessibility Initiative: l’iniziativa del W3C che sviluppa risorse, indicazioni e materiali per progettare e valutare l’accessibilità. Le tre risorse in nota hanno funzioni diverse e si usano insieme alle verifiche sul compito.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/tools/", etichetta: [w3.org\/…\/tools]) <nota-a03-49-1>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-49-2>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/preliminary/", etichetta: [w3.org\/…\/preliminary]) <nota-a03-49-3>

// Fonte Figma 2811:857 · C03 · 126 · SX — Dalla ricerca alla correzione

=== Dalla ricerca alla correzione

#emph[La partecipazione delle persone è utile durante tutto il progetto, dalle prime ipotesi alle verifiche della soluzione realizzata.] @a03-wai-involving @a03-coga.

=== Definire i compiti

Scegli attività coerenti con gli obiettivi del servizio: trovare un’informazione, confrontare un’offerta, prenotare, pagare o recuperare un account. Chiarisci quali capacità, conoscenze e dispositivi il percorso richiede implicitamente.

=== Preparare prove accessibili

Prevedi materiali, tempi e modalità adeguati, consentendo quando possibile le tecnologie assistive abituali. Prima della prova, spiega in forma comprensibile scopo, attività, dati raccolti e uso; verifica la comprensione e ottieni il consenso. La partecipazione è volontaria e si può interrompere. Concorda pause e supporti con la persona, senza dedurli dalla sola disabilità.

=== Registrare e verificare di nuovo

Per ogni ostacolo conserva compito, contesto, comportamento osservato, conseguenza e modifica proposta. Distingui ciò che è stato osservato da ciò che è soltanto ipotizzato. Dopo la correzione, riprova il percorso e aggiorna l’esito: l’accessibilità richiede attenzione anche quando contenuti e componenti cambiano.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-50-1>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/planning/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-50-2>#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/", etichetta: [w3.org\/WAI\/test-evaluate\/]) <nota-a03-50-3>#nota-compatta([W3C, COGA], "https://www.w3.org/TR/coga-usable/#informed-consent", etichetta: [w3.org\/…\/\#informed-consent]) <nota-a03-50-4>

// Fonte Figma 3123:7334 · C03 · 127 · DX — Dall’ostacolo alla nuova prova

=== Dall’ostacolo alla nuova prova

#emph[Una scheda di osservazione collega compito, barriera, modifica e verifica (@fig-a03-68).]

#figure(
  [#grid(columns: (1fr, 1fr), gutter: 12pt, [#image(path("/assets/images/figure/accessibilita/valutazione-barriera.png"), width: 100%, alt: "Barriera")], [#image(path("/assets/images/figure/accessibilita/valutazione-scelte.png"), width: 100%, alt: "Scelta di progetto")])],
  caption: [Confronto simulato: una nota generica e una scheda che collega compito, ostacolo, modifica e nuova verifica.],
  placement: top, scope: "parent",
) <fig-a03-68>


#sottotitolo-lettura[Barriera]

Una nota generica non permette di ricostruire dove il compito si interrompe o quale modifica serva.

#sottotitolo-lettura[Scelta di progetto]

Il registro distingue osservazioni e ipotesi e indica la conseguenza. Dopo la correzione, lo stesso percorso viene verificato di nuovo.#nota-compatta([W3C, WAI],
  ("https://www.w3.org/WAI/test-evaluate/involving-users/", "https://www.w3.org/TR/coga-usable/#informed-consent"),
  etichetta: ([w3.org\/…\/involving-users], [w3.org\/…\/\#informed-consent])) <nota-a03-51-1>

#sottotitolo-lettura[Come verificare · WAI \/ COGA]

Concorda compiti, supporti e consenso comprensibile. Il registro qui mostrato è illustrativo e non documenta un test svolto.#footnote(<nota-a03-51-1>)


// Fonte Figma 2811:897 · C03 · 128 · SX — Un caso: The Last of Us Part II

== Un caso: The Last of Us Part II

#emph[Il gioco documenta più di sessanta impostazioni di accessibilità. Il caso mostra come la configurazione possa offrire percorsi diversi verso la stessa esperienza (@fig-a03-69).] @a03-tlou.

#figure(
  [#image(path("/assets/images/figure/accessibilita/tlou-controlli.png"), width: 100%, alt: "Rimappatura dei controlli. Screenshot ufficiale PlayStation / Naughty Dog; immagine acquisita l’11 ottobre 2026.")],
  caption: [Rimappatura dei controlli. Screenshot ufficiale PlayStation \/ Naughty Dog; immagine acquisita l’11 ottobre 2026.
#v(4pt)
#text(size: 8pt, style: "italic", weight: 400)[PlayStation \/ Naughty Dog. Screenshot ufficiale.]],
  placement: top, scope: "parent",
) <fig-a03-69>


=== Controlli adattabili

La documentazione ufficiale descrive la rimappatura dei comandi, schemi per una sola mano e alternative alle pressioni ripetute o prolungate. Queste opzioni modificano il modo di eseguire un’azione senza richiedere un unico gesto a tutti i giocatori.

Il progetto rende disponibili anche tre configurazioni iniziali per esigenze visive, uditive e motorie. Le singole opzioni restano modificabili: un preset è un punto di partenza, non il profilo completo di una persona.#nota-compatta([PlayStation \/ Naughty Dog], "https://www.playstation.com/en-us/games/the-last-of-us-part-ii/accessibility/", etichetta: [playstation.com\/…\/accessibility]) <nota-a03-52-1>


// Fonte Figma 2811:937 · C03 · 129 · DX — Alternative visive e informative

=== Alternative visive e informative

#emph[Le scelte di accessibilità possono agire insieme su percezione, controllo e orientamento (@fig-a03-70).] @a03-tlou.

#figure(
  [#image(path("/assets/images/figure/accessibilita/tlou-alto-contrasto.png"), width: 100%, alt: "Presentazione ad alto contrasto. Screenshot ufficiale PlayStation / Naughty Dog; immagine acquisita l’11 ottobre 2026.")],
  caption: [Presentazione ad alto contrasto. Screenshot ufficiale PlayStation \/ Naughty Dog; immagine acquisita l’11 ottobre 2026.
#v(4pt)
#text(size: 8pt, style: "italic", weight: 400)[PlayStation \/ Naughty Dog. Screenshot ufficiale.]],
  placement: top, scope: "parent",
) <fig-a03-70>


=== Informazioni su più canali

Il gioco documenta dimensioni e colori della HUD regolabili, presentazione ad alto contrasto, ingrandimento, text-to-speech, sottotitoli personalizzabili e segnali audio di orientamento. Ogni opzione risponde a una funzione specifica.

=== Leggere il caso con precisione

La presenza di queste funzioni non dimostra che ogni persona possa usare ogni parte del gioco. Il caso insegna a rendere le alternative configurabili e a verificarne l’efficacia nei compiti. Non costituisce una valutazione di conformità WCAG, che riguarda i contenuti web.#nota-compatta([PlayStation \/ Naughty Dog], "https://www.playstation.com/en-us/games/the-last-of-us-part-ii/accessibility/", etichetta: [playstation.com\/…\/accessibility]) <nota-a03-53-1>


// Fonte Figma 198:3515 · C03 · 130 · SX — Consigli pratici

== Consigli pratici

#emph[Sul piano operativo, progettare interfacce più accessibili non richiede sempre soluzioni complesse; spesso significa prestare attenzione ad alcune pratiche essenziali.] @a03-wai-easy.

Risolvere i problemi di usabilità che confondono tutti gli utenti, perché tali criticità tendono a penalizzare ancora di più chi incontra barriere di accesso.

Fornire alternative testuali pertinenti per le immagini informative; quelle decorative vanno ignorate dalle tecnologie assistive.

Usare correttamente la gerarchia dei titoli.

Associare in modo chiaro etichette e campi nei form.

Rendere tutti i contenuti navigabili da tastiera.

Predisporre collegamenti come “vai al contenuto principale” per facilitare l’orientamento.

Scegliere componenti e temi che siano stati progettati con criteri di accessibilità.

Le barriere di accessibilità e i problemi generali di usabilità vanno affrontati insieme. Chi usa uno screen reader può esplorare titoli, link e regioni della pagina senza ascoltarla tutta in sequenza. Una struttura semantica chiara rende più rapido l’orientamento e aiuta a trovare le informazioni rilevanti.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/preliminary/", etichetta: [w3.org\/…\/preliminary]) <nota-a03-54-1>

// Fonte Figma 198:3934 · C03 · 131 · DX — Verificare l’inclusione

== Verificare l’inclusione

Accessibilità e design inclusivo attraversano tutto il progetto. Per ridurre le barriere servono ricerca, prove d’uso e verifiche tecniche. @a03-wai-involving @a03-coga.

#sottotitolo-lettura[01 · Ricercare]

Coinvolgi persone con capacità, familiarità digitale e modalità d’uso diverse. L’esperienza di una persona non rappresenta tutte le persone con la stessa disabilità.

#sottotitolo-lettura[02 · Osservare]

Usa compiti realistici sui prototipi, anche con persone che utilizzano tecnologie assistive. Registra gli ostacoli incontrati e come influiscono sul completamento del compito.#nota-compatta([W3C, WAI], "https://www.w3.org/WAI/test-evaluate/involving-users/", etichetta: [w3.org\/…\/involving-users]) <nota-a03-55-1>

#sottotitolo-lettura[03 · Verificare]

Affianca i test con utenti alle verifiche WCAG: i due approcci rilevano barriere differenti. I controlli automatici coprono soltanto una parte dei requisiti.

Gli ostacoli osservati diventano requisiti e domande di progetto: nella fase Define occorre chiarire quale problema affrontare e per chi.

#sottotitolo-lettura[Capire, ricordare, riprendere]

Le istruzioni sono chiare? Le informazioni necessarie restano visibili? Si può riprendere un’attività interrotta? La guida W3C per l’accessibilità cognitiva integra le WCAG con indicazioni supplementari.#nota-compatta([W3C, COGA], "https://www.w3.org/TR/coga-usable/", etichetta: [w3.org\/TR\/coga-usable\/]) <nota-a03-55-2>
]
]

// La compilazione diretta applica lo stesso sistema editoriale del volume.
#show: booklet
#capitolo(..parametri-capitolo(3), testo)
