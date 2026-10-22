#import "../../template/editoriale.typ": nota-compatta, sottotitolo-lettura
#import "componenti.typ": mappa-a-pagina

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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


// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

// Fonte Figma 198:3924 · C03 · 084 · SX — Accessibilità Web
La mappa in @fig-a03-46 raccoglie i criteri di successo e i livelli delle WCAG 2.2 @a03-wcag; la traduzione italiana è documentata da @a03-intopia.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/TR/WCAG22/", etichetta: [w3.org\/TR\/WCAG22\/]) <nota-a03-8-1>#nota-compatta([Intopia e Sketch Group, mappe WCAG 2.2], "https://intopia.digital/articles/intopias-wcag-2-2-maps/", etichetta: [intopia.digital\/articles\/intopias-wcag-2-2-maps\/]) <nota-a03-mappa-fonte>

#mappa-a-pagina(
  path("/assets/images/figure/accessibilita/mappa-wcag-2.2.png"),
  [Mappa completa dei criteri di successo WCAG 2.2, nella traduzione italiana.],
  [Intopia e Sketch Group; traduzione Roberto Scano; rielaborazione. CC BY-SA 4.0.],
  "Mappa completa dei criteri di successo WCAG 2.2, nella traduzione italiana.",
) <fig-a03-46>


// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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


// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()
