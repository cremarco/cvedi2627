#import "../../template/editoriale.typ": nota-compatta, sottotitolo-lettura


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

#emph[Questi tre scenari illustrativi, adattati dalle storie di utenti WAI, mostrano come un compito possa essere interrotto da una barriera. Servono a formulare domande di progetto; non sono risultati di test condotti per questo booklet.] @a03-wai-stories.

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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


// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()
