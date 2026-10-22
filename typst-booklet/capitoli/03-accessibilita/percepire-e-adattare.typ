#import "../../template/editoriale.typ": nota-compatta, sottotitolo-lettura


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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

// Fonte Figma 2825:288 · C03 · 091 · DX — Ingrandimento e adattamento

== Ingrandimento e adattamento

#emph[Testi e controlli distinguibili devono restare disponibili quando cambia la presentazione. Ingrandimento, reflow e spaziatura richiedono verifiche distinte su informazioni e azioni.] @a03-wcag.

=== Testo al 200% · #link("https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html")[1.4.4 AA]

Ridimensiona il testo fino al 200%, senza tecnologie assistive e senza perdere contenuti o funzioni. Sono esclusi sottotitoli e immagini di testo. Verifica etichette, pulsanti e livelli intermedi dell’ingrandimento.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", etichetta: [w3.org\/…\/resize-text]) <nota-a03-15-1>

=== Reflow · #link("https://www.w3.org/WAI/WCAG22/Understanding/reflow.html")[1.4.10 AA]

Per contenuti a scorrimento verticale, verifica una larghezza equivalente a 320 CSS px; per quelli orizzontali, un’altezza di 256 CSS px. Contenuti e funzioni devono restare disponibili senza scorrere in due direzioni. L’eccezione riguarda solo parti che richiedono un layout bidimensionale per uso o significato, come una mappa.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html", etichetta: [w3.org\/…\/reflow]) <nota-a03-15-2>

=== Spaziatura · #link("https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")[1.4.12 AA]

Nei contenuti con markup che supporta questi stili, verifica insieme questi multipli del corpo: interlinea ≥1,5; spazio dopo i paragrafi ≥2; fra lettere ≥0,12; fra parole ≥0,16. Senza cambiare altri stili, contenuti e funzioni devono restare disponibili. Sono soglie di verifica, non valori predefiniti obbligatori; per ogni lingua o scrittura usa le proprietà pertinenti.#nota-compatta([W3C, WCAG 2.2], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html", etichetta: [w3.org\/…\/text-spacing]) <nota-a03-15-3>

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()
