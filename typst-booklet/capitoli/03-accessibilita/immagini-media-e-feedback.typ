#import "../../template/editoriale.typ": nota-compatta, sottotitolo-lettura


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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()

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

// Completa le figure di questo passaggio prima del tema successivo.
#place.flush()
