#import "../../template/editoriale.typ": nota-compatta, sottotitolo-lettura


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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()
