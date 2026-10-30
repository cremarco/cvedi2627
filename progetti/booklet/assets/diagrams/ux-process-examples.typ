// Native visuals for the process chapter. Captions, rights and labels stay in the chapter.
#import "../../template/palette.typ": chapter-accent
#import "../../template/geometry.typ": ink
#import "../../template/editorial.typ": panel-letter

#let accent = chapter-accent(9)
#let pale = color.mix((accent, 16%), (white, 84%), space: rgb)
#let grey = rgb("626872")

#let graphic(body) = block(width: 100%)[
  #set text(font: "DM Sans 9pt", size: 9.5pt, fill: ink, weight: 400)
  #set par(justify: false, leading: 2pt, spacing: 6pt)
  #body
]

#let panel(title, body, fill: pale) = block(width: 100%, fill: fill,
  inset: 8pt, breakable: false)[
  #text(weight: 700, title)
  #v(5pt)
  #body
]

#let process-map() = graphic[
  #grid(columns: (1fr, 1fr), gutter: 8pt,
    panel([1–3 · Impostare], [Brief e stakeholder#linebreak()Obiettivi di business#linebreak()Confronto con i competitor]),
    panel([4–6 · Comprendere], [Problema progettuale#linebreak()Ricerca con le persone#linebreak()Personas]),
    panel([7–8 · Organizzare], [Journey e user flow#linebreak()Requisiti condivisi]),
    panel([9–10 · Strutturare], [Architettura dell’informazione#linebreak()Wireframe]),
  )
  #v(8pt)
  #panel([11–14 · Provare e affinare], [Prototipo → test → revisione → UI e mockup → nuova verifica])
  #v(5pt)
  #text(weight: 700)[↶ Ogni verifica può riportare a una decisione precedente.]
]

#let brief-record() = graphic[
  #panel([Richiesta iniziale], [«Vorremmo un’app per mettere in contatto fisioterapisti e clienti».])
  #v(7pt)
  #grid(columns: (1fr, 1fr), gutter: 7pt,
    panel([Da chiarire], [Centro esistente o piattaforma?#linebreak()Chi offre il servizio?#linebreak()Quale territorio copriamo?], fill: white),
    panel([Da verificare], [Il bisogno esiste?#linebreak()Ci sono professionisti disponibili?#linebreak()Quali vincoli cambiano il servizio?], fill: white))
  #v(5pt)
  #text(fill: grey)[Le risposte del committente orientano il lavoro; le ipotesi restano riconoscibili.]
]

#let objective-record() = graphic[
  #grid(columns: 1, row-gutter: 7pt,
    panel([Obiettivo generico], [«Rendere più semplice la prenotazione».], fill: white),
    panel([Obiettivo da mettere alla prova], [Nel prossimo ciclo, consentire alle persone coinvolte nella prova di trovare una visita a domicilio dopo le 20 e arrivare alla conferma senza aiuto.]),
    panel([Cosa annotare], [Completamento · ostacoli · richieste d’aiuto · comprensione del riepilogo], fill: white))
]

#let evidence-record() = graphic[
  #grid(columns: (1fr, 1fr), gutter: 7pt,
    panel([Osservazione simulata], [La persona apre la ricerca, ma non trova come limitare gli orari alla sera.]),
    panel([Interpretazione possibile], [La disponibilità serale potrebbe essere poco riconoscibile.], fill: white),
    panel([Decisione da provare], [Esporre gli orari disponibili vicino al giorno selezionato.], fill: white),
    panel([Nuova domanda], [La persona trova una visita compatibile e distingue disponibilità e conferma?]))
]

#let viola-profile() = graphic[
  #text(size: 16pt, weight: 700)[_Viola_]
  #text(fill: grey)[Profilo del caso narrativo · 35 anni · lavora fino a tardi]
  #v(7pt)
  #grid(columns: (1fr, 1fr), gutter: 8pt,
    panel([Obiettivo], [Ricevere una visita di fisioterapia a casa dopo le 20.]),
    panel([Vincoli del compito], [Poco tempo per confrontare.#linebreak()Orario e domicilio devono essere compatibili.]),
    panel([Informazioni necessarie], [Disponibilità, area servita, professionista, durata e costo.], fill: white),
    panel([Ipotesi da verificare], [Quali informazioni orientano la scelta? Che cosa impedisce di prenotare?], fill: white))
]

#let journey-example() = graphic[
  #text(weight: 700)[Scenario ipotetico · Cercare una visita a domicilio]
  #v(6pt)
  #grid(columns: (68pt, 1fr, 1fr, 1fr), column-gutter: 6pt, row-gutter: 8pt,
    [*Fase*], [*Cercare*], [*Confrontare*], [*Prenotare*],
    [*Azione*], [Esamina le alternative disponibili.], [Controlla orari, professionista e costo.], [Sceglie e rilegge il riepilogo.],
    [*Punto di contatto*], [Ricerca e consiglio di una persona.], [Scheda del servizio.], [Calendario e conferma.],
    [*Domanda*], [«Il servizio arriva a casa mia?»], [«È disponibile dopo le 20?»], [«La visita è confermata?»],
    [*Opportunità*], [Rendere reperibile la copertura.], [Mostrare i vincoli prima della scelta.], [Distinguere richiesta e conferma.],
  )
]

#let flow-example() = graphic[
  #panel([Imposta la ricerca], [Domicilio · giorno · orario])
  #align(center)[↓]
  #panel([Controlla le disponibilità], [Ci sono visite compatibili?])
  #v(7pt)
  #grid(columns: (1fr, 1fr), gutter: 12pt,
    [#align(center)[*↓ No*]#v(5pt)
      #panel([Modifica la ricerca], [Cambia un criterio o conserva la ricerca.], fill: white)
      #v(6pt)#text(weight: 700)[↶ Torna a controllare le disponibilità.]],
    [#align(center)[*↓ Sì*]#v(5pt)
      #panel([Scegli una visita], [Confronta e seleziona.])
      #align(center)[↓]
      #panel([Riepiloga e conferma], [Controlla dati e condizioni.])],
  )
  #v(5pt)
  #text(fill: grey)[Dati da correggere? Torna al campo interessato, poi rientra nel riepilogo.]
]

#let requirements-record() = graphic[
  #grid(columns: (65pt, 1fr), column-gutter: 9pt, row-gutter: 8pt,
    [*Bisogno*], [Trovare una visita a domicilio compatibile con l’orario di lavoro.],
    [*Requisito*], [La ricerca permette di indicare zona, giorno e fascia oraria.],
    [*Condizione*], [La disponibilità riguarda l’indirizzo selezionato e non un’area generica.],
    [*Criterio*], [Il riepilogo conserva giorno, orario e domicilio scelti.],
    [*Priorità*], [Necessario per il primo percorso da provare.],
    [*Da chiarire*], [Come vengono aggiornate le disponibilità dei professionisti?],
  )
]

#let sitemap-example() = graphic[
  #align(center, panel([Servizio di fisioterapia], [Informazioni e accesso alle funzioni]))
  #align(center)[↓]
  #grid(columns: (1fr, 1fr, 1fr), gutter: 7pt,
    panel([Servizi], [Visite a domicilio#linebreak()Copertura e costi]),
    panel([Prenota], [Disponibilità#linebreak()Professionista#linebreak()Riepilogo]),
    panel([Le mie visite], [Appuntamenti#linebreak()Dettaglio#linebreak()Modifica]))
  #v(7pt)
  #text(fill: grey)[Ipotesi di struttura: raggruppa contenuti e funzioni; non descrive da sola ogni azione.]
]

#let interface-panel(stage: 0, state: "ready") = block(width: 100%,
  inset: 8pt, fill: if stage == 2 { pale } else { rgb("F1F2F4") })[
  #text(size: 11pt, weight: 700)[Visita a domicilio]
  #v(7pt)
  #if stage == 0 {
    rect(width: 100%, height: 20pt, fill: rgb("D4D7DC"), stroke: none)
    v(7pt)
    rect(width: 70%, height: 10pt, fill: rgb("D4D7DC"), stroke: none)
    v(7pt)
    rect(width: 100%, height: 30pt, fill: rgb("D4D7DC"), stroke: none)
    v(7pt)
    rect(width: 75%, height: 18pt, fill: grey, stroke: none)
  } else {
    [Martedì 17 novembre#linebreak()*20:30 · 45 minuti*]
    v(6pt)
    [Domicilio indicato#linebreak()Costo totale: 60 €]
    v(7pt)
    if state == "empty" {
      text(weight: 700)[Orario non più disponibile]
      v(4pt)
      [Scegli un altro orario. I dati inseriti sono conservati.]
    } else if state == "confirmed" {
      text(weight: 700)[Visita confermata]
      v(4pt)
      [Trovi i dettagli in «Le mie visite».]
    } else {
      rect(fill: if stage == 2 { ink } else { grey }, stroke: none,
        inset: (x: 6pt, y: 6pt), text(fill: white, weight: 700)[Prenota la visita])
    }
  }
]

#let wireframe-progression() = graphic[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 9pt,
    [*#panel-letter[a] · Aree*#v(6pt)#interface-panel(stage: 0)],
    [*#panel-letter[b] · Contenuti*#v(6pt)#interface-panel(stage: 1)],
    [*#panel-letter[c] · UI*#v(6pt)#interface-panel(stage: 2)])
]

#let prototype-states() = graphic[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 9pt,
    [*#panel-letter[a] · Scelta*#v(6pt)#interface-panel(stage: 2)],
    [*#panel-letter[b] · Recupero*#v(6pt)#interface-panel(stage: 2, state: "empty")],
    [*#panel-letter[c] · Esito*#v(6pt)#interface-panel(stage: 2, state: "confirmed")])
]

#let test-plan() = graphic[
  #panel([Domanda della prova], [La persona trova una visita a domicilio dopo le 20 e comprende se è confermata?])
  #v(8pt)
  #grid(columns: (1fr, 1fr), gutter: 8pt,
    panel([Partecipante], [Una persona con un bisogno e condizioni d’uso pertinenti.], fill: white),
    panel([Compito], [Trovare una visita compatibile con il proprio orario.], fill: white),
    panel([Osservazioni], [Percorso, esitazioni, errori, richieste d’aiuto ed esito.], fill: white),
    panel([Facilitazione], [Consegna neutra; interventi registrati separatamente.], fill: white))
]

#let iteration-record() = graphic[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 8pt,
    panel([Fatto simulato], [La persona legge la scheda ma non avvia la prenotazione.]),
    panel([Ipotesi], [L’etichetta non rende chiaro il risultato dell’azione.], fill: white),
    panel([Decisione e prova], [Rivedere etichetta e posizione; ripetere il compito su una nuova versione.]))
  #v(7pt)
  #text(fill: grey)[La revisione conserva il collegamento con l’osservazione; il miglioramento va ancora verificato.]
]

#let learning-loop() = graphic[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 8pt,
    panel([Ipotesi], [Una scelta dovrebbe aiutare un compito.]),
    panel([Prova], [Si prepara quanto basta per osservarne l’uso.]),
    panel([Apprendimento], [Si decide che cosa mantenere, cambiare o abbandonare.]))
  #v(7pt)
  #align(center, text(weight: 700)[↶ La decisione successiva avvia un altro ciclo.])
]
