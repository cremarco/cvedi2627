#import "../../template/editoriale.typ": nota-compatta, sottotitolo-lettura


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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

