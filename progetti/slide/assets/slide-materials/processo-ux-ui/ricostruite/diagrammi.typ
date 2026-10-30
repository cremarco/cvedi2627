// Slide-specific reconstructions. Chapter artwork and documentary originals stay intact.
#let ink = rgb("0f172a")
#let body-ink = rgb("334155")
#let primary = rgb("5b21b6")
#let pale = rgb("ede9fe")
#let cedro = rgb("d9ef75")
#let rule = rgb("e2e8f0")
#let body-size = 15.5pt
#let heading-size = 17pt

#let graphic(body) = block(width: 100%)[
  #set text(font: "CVeDI Diagram Sans", size: body-size, weight: 400, fill: body-ink)
  #set par(justify: false, leading: 11pt, spacing: 8pt)
  #body
]
#let heading(body) = text(size: heading-size, weight: 700, fill: primary, body)
#let panel(title, body, fill: none) = block(width: 100%, fill: fill, radius: if fill == none { 0pt } else { 8pt }, inset: 12pt,
  stroke: if fill == none { (top: .7pt + rule) } else { none })[
  #heading(title)
  #v(8pt)
  #body
]
#let note(body) = block(width: 100%)[#text(size: 14pt, fill: body-ink, body)]
#let record(rows) = {
  let cells = ()
  for (index, row) in rows.enumerate() {
    cells += (
      table.cell(fill: pale, text(weight: 700, fill: primary, row.at(0))),
      table.cell(fill: white, row.at(1)),
    )
  }
  table(columns: (152pt, 1fr), inset: (x: 14pt, y: 10pt), stroke: (x: none, y: .6pt + rule), ..cells)
}
#let matrix(headers, rows, first: 112pt, inset: (x: 12pt, y: 10pt)) = {
  let cells = headers.map(value => table.cell(fill: primary, text(size: heading-size, weight: 700, fill: white, value)))
  for row in rows {
    for (index, value) in row.enumerate() {
      cells.push(table.cell(fill: if index == 0 { pale } else { white },
        if index == 0 { text(weight: 700, fill: primary, value) } else { value }))
    }
  }
  table(columns: (first,) + (1fr,) * (headers.len() - 1), inset: inset, stroke: (x: none, y: .6pt + rule), ..cells)
}
#let edge(x1, y1, x2, y2) = place(top + left, line(start: (x1, y1), end: (x2, y2), stroke: 1pt + primary))
#let arrow(x, y, direction: "right") = place(top + left,
  polygon(..if direction == "up" { ((x, y), (x - 4pt, y + 6pt), (x + 4pt, y + 6pt)) }
    else if direction == "down" { ((x, y), (x - 4pt, y - 6pt), (x + 4pt, y - 6pt)) }
    else if direction == "left" { ((x, y), (x + 6pt, y - 4pt), (x + 6pt, y + 4pt)) }
    else { ((x, y), (x - 6pt, y - 4pt), (x - 6pt, y + 4pt)) }, fill: primary, stroke: none))
#let flow-box(width, height, title, body, fill: pale) = block(width: width, height: height, fill: fill, radius: 8pt, inset: 12pt)[
  #align(left + horizon)[#heading(title)#v(6pt)#body]
]
#let connector() = grid.cell(align: horizon)[
  #block(width: 28pt, height: 12pt)[#edge(0pt, 6pt, 25pt, 6pt)#arrow(25pt, 6pt)]
]
#let chain(first, middle, last) = grid(columns: (1fr, 28pt, 1fr, 28pt, 1fr),
  column-gutter: 0pt, align: horizon, first, connector(), middle, connector(), last)

#let processo() = graphic[
  #grid(columns: 5, gutter: 14pt,
    panel([1–3 · Impostare], [Brief e stakeholder#parbreak()Obiettivi di business#parbreak()Competitor]),
    panel([4–6 · Comprendere], [Problema#parbreak()Ricerca#parbreak()Personas]),
    panel([7–8 · Organizzare], [Journey e flow#parbreak()Requisiti]),
    panel([9–10 · Strutturare], [Architettura#parbreak()Wireframe]),
    panel([11–14 · Provare], [Prototipo e test#parbreak()Iterazioni#parbreak()UI e mockup#parbreak()Nuova verifica]),
  )
  #v(14pt)
  #note[Ogni verifica può riaprire una decisione precedente: il processo si adatta al progetto.]
]
#let brief() = graphic[
  #panel([Richiesta iniziale], [«Vorremmo un’app per mettere in contatto fisioterapisti e clienti».], fill: pale)
  #v(12pt)
  #grid(columns: 2, gutter: 24pt,
    panel([Da chiarire], [Centro esistente o piattaforma?#linebreak()Chi offre il servizio?#linebreak()Quale territorio copriamo?], fill: none),
    panel([Da verificare], [Il bisogno esiste?#linebreak()Ci sono professionisti disponibili?#linebreak()Quali vincoli cambiano il servizio?], fill: none))
  #v(10pt)
  #panel([Scelta dopo il chiarimento], [Rete locale coordinata di fisioterapisti a domicilio; il professionista aggiorna gli orari e accetta le richieste.], fill: cedro)
  #v(8pt)#note[Il gestore coordina condizioni e assistenza. Bisogno e disponibilità serale restano ipotesi da verificare.]
]
#let obiettivi() = graphic[
  #record((
    ([Generico], [«Rendere più semplice la prenotazione».]),
    ([Da provare], [Nel prossimo ciclo, trovare una visita a domicilio dopo le 20 e inviare una richiesta senza aiuto, distinguendo attesa e conferma.]),
    ([Cosa annotare], [Completamento · ostacoli · richieste d’aiuto · comprensione del riepilogo e dello stato]),
  ))
]
#let evidenze() = graphic[
  #grid(columns: 2, gutter: 18pt,
    panel([Osservazione], [La persona apre la ricerca, ma non trova come limitare gli orari alla sera.], fill: pale),
    panel([Interpretazione possibile], [La disponibilità serale potrebbe essere poco riconoscibile.], fill: none),
    panel([Decisione da provare], [Esporre gli orari disponibili vicino al giorno selezionato.], fill: none),
    panel([Nuova domanda], [La persona trova una visita compatibile e distingue disponibilità e conferma?], fill: cedro))
]
#let viola() = graphic[
  #grid(columns: (190pt, 1fr), gutter: 24pt,
    [#text(size: 28pt, weight: 700, fill: primary)[Viola]#v(12pt)
      Profilo#parbreak()35 anni#parbreak()Lavora fino a tardi],
    grid(columns: 2, gutter: 18pt,
      panel([Obiettivo], [Ricevere una visita di fisioterapia a casa dopo le 20.], fill: cedro),
      panel([Vincoli del compito], [Poco tempo per confrontare; orario e domicilio devono essere compatibili.]),
      panel([Informazioni necessarie], [Disponibilità, area servita, professionista, durata e costo.], fill: none),
      panel([Ipotesi da verificare], [Quali informazioni orientano la scelta? Che cosa impedisce di prenotare?], fill: none)))
]
#let journey() = graphic[
  #matrix(([Fase], [Cercare], [Confrontare], [Richiedere]), (
    ([Azione], [Esamina le alternative disponibili.], [Controlla orari, professionista e costo.], [Rilegge il riepilogo e invia la richiesta.]),
    ([Punto di contatto], [Ricerca e consiglio di una persona.], [Scheda del servizio.], [Riepilogo e stato della richiesta.]),
    ([Domanda], [«Il servizio arriva a casa mia?»], [«È disponibile dopo le 20?»], [«La visita è confermata?»]),
    ([Opportunità], [Rendere reperibile la copertura.], [Mostrare i vincoli prima della scelta.], [Distinguere richiesta e conferma.]),
  ), first: 120pt)
]
#let flow() = graphic[
  #block(width: 800pt, height: 250pt)[
    #edge(170pt, 45pt, 210pt, 45pt)#arrow(210pt, 45pt)
    #edge(390pt, 45pt, 420pt, 45pt)#arrow(420pt, 45pt)
    #edge(595pt, 45pt, 625pt, 45pt)#arrow(625pt, 45pt)
    #edge(300pt, 90pt, 300pt, 125pt)#arrow(300pt, 125pt, direction: "down")
    #edge(712.5pt, 90pt, 712.5pt, 125pt)#arrow(712.5pt, 125pt, direction: "down")
    #edge(300pt, 230pt, 300pt, 246pt)#edge(300pt, 246pt, 85pt, 246pt)
    #edge(85pt, 246pt, 85pt, 90pt)#arrow(85pt, 90pt, direction: "up")
    #place(top + left, dx: 0pt, dy: 0pt, flow-box(170pt, 90pt, [Ricerca], [Domicilio · CAP · dopo le 20]))
    #place(top + left, dx: 210pt, dy: 0pt, flow-box(180pt, 90pt, [Visite compatibili?], [Risultati e dettaglio.], fill: cedro))
    #place(top + left, dx: 420pt, dy: 0pt, flow-box(175pt, 90pt, [Riepilogo], [Contatti, totale e consenso.]))
    #place(top + left, dx: 625pt, dy: 0pt, flow-box(175pt, 90pt, [Invia richiesta], [In attesa di accettazione.]))
    #place(top + left, dx: 210pt, dy: 125pt, flow-box(180pt, 105pt, [No · Cambia ricerca], [Cambia un criterio; i dati validi restano conservati.]))
    #place(top + left, dx: 625pt, dy: 125pt, flow-box(175pt, 105pt, [Visita confermata], [Solo se il professionista accetta la richiesta.], fill: cedro))
  ]
  #v(8pt)
  #note[Dati da correggere? Torna al campo e poi al riepilogo. Un orario proposto non è una visita confermata.]
]
#let requisiti() = graphic[
  #record((
    ([R1 · Copertura], [Verificare il CAP prima di proporre visite a domicilio.]),
    ([R2 · Filtro sera], [Cercare per giorno e fascia dopo le 20; slot aggiornati dal professionista.]),
    ([R3 · Riepilogo], [Prima dell’invio: contatti, Giulia Riva, domicilio e CAP, 17 novembre alle 20:30, 45 minuti e 60 € con spostamento.]),
    ([R4 · Stato], [«Invia richiesta» produce «In attesa»; «Visita confermata» solo dopo l’accettazione del professionista.]),
    ([R5 · Recupero], [Se l’orario non è più disponibile, conservare i dati e proporre un’alternativa.]),
  ))
  #v(10pt)#note[Priorità: primo percorso da provare. Da chiarire: come e quando il professionista aggiorna gli slot.]
]
#let sitemap() = graphic[
  #align(center, block(width: 350pt)[#panel([Passo · Fisioterapia a domicilio], [Informazioni e accesso al percorso], fill: pale)])
  #block(width: 800pt, height: 28pt)[
    #edge(400pt, 0pt, 400pt, 14pt)#edge(126pt, 14pt, 674pt, 14pt)
    #edge(126pt, 14pt, 126pt, 28pt)#edge(400pt, 14pt, 400pt, 28pt)#edge(674pt, 14pt, 674pt, 28pt)
  ]
  #grid(columns: 3, gutter: 24pt,
    panel([Il servizio], [Come funziona#linebreak()Zone, orari e costi]),
    panel([Trova una visita], [Domicilio e CAP#linebreak()Risultati e profili#linebreak()Riepilogo e contatti]),
    panel([Le mie visite], [Richieste e appuntamenti#linebreak()Stato e dettaglio#linebreak()Modifica e annullamento]))
  #v(12pt)
  #note[La struttura raggruppa contenuti e funzioni; il flow descrive azioni e condizioni.]
]
#let screen(title, body, fill: white, height: auto) = block(width: 100%)[
  #heading(title)#v(10pt)
  #block(width: 100%, height: height, fill: fill, stroke: .8pt + rule, radius: 8pt, inset: 14pt)[#body]
]
#let button(label, fill: primary) = block(width: 100%, inset: (x: 8pt, y: 10pt), fill: fill, radius: 6pt)[#align(center)[#text(weight: 700, fill: white, label)]]
#let example-context() = [17 novembre 2026 · *20:30 · 45 minuti* · A domicilio · *Totale: 60 €*, spostamento incluso]
#let wireframe-ui() = graphic[
  #grid(columns: 3, gutter: 24pt,
    screen([a · Aree], [#rect(width: 100%, height: 28pt, fill: rule, stroke: none)#v(12pt)
      #rect(width: 70%, height: 12pt, fill: rule, stroke: none)#v(12pt)
      #rect(width: 100%, height: 50pt, fill: rule, stroke: none)#v(1fr)
      #rect(width: 80%, height: 31pt, fill: body-ink, stroke: none)], height: 220pt),
    screen([b · Contenuti], [*Visita a domicilio*#parbreak()17 novembre 2026#linebreak()*20:30 · 45 minuti*#parbreak()Domicilio indicato#linebreak()Costo totale: 60 €#v(1fr)#button([Invia richiesta], fill: body-ink)], height: 220pt),
    screen([c · UI], [#text(size: heading-size, weight: 700, fill: ink)[Visita a domicilio]#parbreak()17 novembre 2026#linebreak()#block(fill: cedro, inset: 7pt, radius: 4pt)[*20:30 · 45 minuti*]#v(6pt)Domicilio indicato#linebreak()Costo totale: 60 €#v(1fr)#button([Invia richiesta])], height: 220pt))
  #v(8pt)#note[L’invio apre una richiesta in attesa; il professionista deve ancora accettarla.]
]
#let stati() = graphic[
  #example-context()#v(16pt)
  #grid(columns: 3, gutter: 24pt,
    screen([a · Scelta], [*Visita a domicilio*#parbreak()Disponibilità da scegliere.#v(14pt)#button([Invia richiesta])], height: 158pt),
    screen([b · Attesa], [#block(fill: pale, inset: 8pt, radius: 4pt)[*In attesa*]#v(10pt)Richiesta inviata. Il professionista deve ancora accettarla.], height: 158pt),
    screen([c · Esito], [#block(fill: cedro, inset: 8pt, radius: 4pt)[*Visita confermata*]#v(10pt)Il professionista ha accettato. Dettagli in «Le mie visite».], height: 158pt))
  #v(8pt)#note[Orario non più disponibile? Scegli un’alternativa; domicilio, giorno e dati validi restano conservati.]
]
#let test() = graphic[
  #panel([Domanda della prova], [La persona trova una visita a domicilio dopo le 20 e distingue richiesta, attesa e conferma?], fill: pale)
  #v(18pt)
  #grid(columns: 2, gutter: 18pt,
    panel([Partecipante], [Una persona con un bisogno e condizioni d’uso pertinenti.], fill: none),
    panel([Compito], [Trovare una visita compatibile con il proprio orario.], fill: none),
    panel([Osservazioni], [Percorso, esitazioni, errori, richieste d’aiuto ed esito.], fill: none),
    panel([Facilitazione], [Consegna neutra; interventi registrati separatamente.], fill: none))
]
#let iterazione() = graphic[
  #chain(
    panel([Comportamento], [La persona legge la scheda ma non invia la richiesta.], fill: pale),
    panel([Ipotesi], [L’etichetta non rende chiaro il risultato dell’azione.]),
    panel([Decisione e prova], [Rivedere etichetta e posizione; ripetere il compito su una nuova versione.], fill: cedro))
  #v(16pt)#note[La revisione conserva il collegamento con l’osservazione; il miglioramento va ancora verificato.]
]
#let ciclo() = graphic[
  #chain(
    panel([Ipotesi], [Una scelta dovrebbe aiutare un compito.], fill: pale),
    panel([Prova], [Si prepara quanto basta per osservarne l’uso.]),
    panel([Apprendimento], [Si decide che cosa mantenere, cambiare o abbandonare.], fill: cedro))
  #v(20pt)#note[La decisione successiva avvia un altro ciclo.]
]
#let confronto-alternative() = graphic[
  #matrix(([Stesso compito], [Telefono], [Sito dello studio], [Piattaforma]), (
    ([Orario serale?], [Da chiedere.], [Da cercare.], [Da filtrare.]),
    ([Visita a domicilio?], [Da concordare.], [Da verificare.], [Zona da controllare.]),
    ([Costo totale?], [Preventivo.], [Tariffario.], [Riepilogo.]),
  ), first: 170pt)
]
#let fedelta() = graphic[
  #grid(columns: 2, gutter: 24pt,
    panel([Fedeltà visiva], [Quanto sono definiti testi, immagini, tipografia e componenti?]),
    panel([Fedeltà del comportamento], [Quali azioni, risposte e rami della prova funzionano?]),
    panel([Mockup statico], [Può essere molto rifinito senza permettere una sequenza.], fill: none),
    panel([Prototipo su carta], [Può simulare un compito completo con segni essenziali.], fill: none))
]
#let responsabilita() = graphic[
  #matrix(([Decisione], [Chi deve chiarirla], [Conseguenza sul prodotto]), (
    ([Zona coperta], [Gestore della rete e professionisti.], [Verificare il domicilio prima della scelta.]),
    ([Disponibilità], [Il professionista aggiorna gli slot.], [Mostrare proposte di orario, senza promettere conferma.]),
    ([Accettazione], [Il professionista accetta la richiesta.], [Passare da «In attesa» a «Visita confermata».]),
    ([Annullamento], [Il gestore definisce condizioni e assistenza.], [Mostrare regole e possibilità di recupero.]),
  ), first: 150pt)
]
#let ipotesi() = graphic[
  #grid(columns: 2, gutter: 18pt,
    panel([Problema ipotizzato], [Chi finisce tardi non capisce quali visite siano compatibili con il lavoro.], fill: pale),
    panel([Proposta], [Mostrare orari serali e copertura vicino al giorno selezionato.]),
    panel([Cambiamento atteso], [La persona riconosce domicilio coperto e orario compatibile prima del riepilogo.], fill: none),
    panel([Possibile smentita], [Copertura e orario sono compatibili, ma la persona non li riconosce e torna alla ricerca.], fill: none))
]
#let journey-responsabilita() = graphic[
  #matrix(([Momento], [Prima della scelta], [Durante la richiesta], [Dopo l’accettazione]), (
    ([Per Viola], [Capire se il servizio arriva a casa.], [Sapere se la richiesta è accettata.], [Ritrovare luogo, orario e contatto.]),
    ([Interfaccia], [Informazioni sulla zona e ricerca.], [Riepilogo e stato della richiesta.], [Dettaglio in «Le mie visite».]),
    ([Servizio], [Gestore e professionisti definiscono la copertura.], [Il professionista valuta e accetta.], [Il gestore coordina variazioni e assistenza.]),
  ), first: 120pt)
]
#let accettazione() = graphic[
  #panel([User story], [Come persona che lavora fino a tardi, voglio trovare una visita serale a domicilio per riceverla dopo il lavoro.], fill: pale)
  #v(18pt)
  #chain(
    panel([Condizione iniziale], [Ho selezionato domicilio, giorno e fascia serale.], fill: none),
    panel([Azione], [Scelgo una disponibilità e apro il riepilogo.], fill: none),
    panel([Esito atteso], [Ritrovo domicilio, giorno, orario e costo coerenti con la scelta.], fill: cedro))
]
#let registro-prova() = graphic[
  #record((
    ([Contesto], [Versione v0 · trovare una visita dopo le 20.]),
    ([Comportamento], [La persona apre due schede e torna alla ricerca senza scegliere un orario.]),
    ([Parole], [«Non so se questa visita è a domicilio».]),
    ([Facilitazione], [Nessun suggerimento sul percorso.]),
    ([Interpretazione], [La copertura potrebbe essere poco riconoscibile.]),
    ([Prossima prova], [Rendere esplicito il domicilio e ripetere il compito.]),
  ))
]
#let priorita-problemi() = graphic[
  #grid(columns: 3, gutter: 24pt,
    panel([Compito bloccato], [Nessuna visita disponibile; manca una via per cambiare ricerca.], fill: pale),
    panel([Decisione poco chiara], [L’orario è disponibile, ma il costo totale resta ambiguo.]),
    panel([Attrito recuperabile], [La persona rilegge un’etichetta, poi prosegue autonomamente.], fill: cedro))
  #v(16pt)#note[Considerare conseguenze, persone coinvolte, frequenza osservata e possibilità di recupero. Gli episodi non costituiscono una graduatoria universale.]
]
#let consegna-stato() = graphic[
  #panel([Orario non più disponibile], [La disponibilità cambia prima della conferma definitiva.], fill: pale)
  #v(18pt)
  #grid(columns: 2, gutter: 18pt,
    panel([Risposta dell’interfaccia], [Spiega l’esito e propone «Scegli un altro orario».], fill: none),
    panel([Dati da conservare], [Domicilio, giorno e informazioni già valide.], fill: none),
    panel([Criterio di accettazione], [Il ritorno alla scelta non obbliga a reinserire i dati.], fill: none),
    panel([Questione da risolvere], [Quando e come il professionista aggiorna gli slot?], fill: none))
]

#let mini-node(x, y, width, height, label, fill: pale) = place(top + left, dx: x, dy: y,
  block(width: width, height: height, fill: fill, radius: 4pt, inset: 4pt)[#align(center + horizon)[#text(weight: 600, label)]])
#let confronto-mappe() = graphic[
  #grid(columns: 3, gutter: 24pt,
    [#heading[Journey]#v(12pt)
      #block(width: 250pt, height: 150pt)[
        #edge(125pt, 30pt, 125pt, 50pt)#edge(125pt, 80pt, 125pt, 100pt)
        #mini-node(0pt, 0pt, 250pt, 30pt, [Prima · Cercare])
        #mini-node(0pt, 50pt, 250pt, 30pt, [Durante · Scegliere])
        #mini-node(0pt, 100pt, 250pt, 30pt, [Dopo · Ritrovare i dettagli])]
      Che cosa accade fra canali e momenti del servizio?],
    [#heading[User flow]#v(12pt)
      #block(width: 250pt, height: 150pt)[
        #edge(125pt, 30pt, 125pt, 48pt)#edge(125pt, 80pt, 125pt, 90pt)
        #edge(58pt, 90pt, 192pt, 90pt)#edge(58pt, 90pt, 58pt, 100pt)#edge(192pt, 90pt, 192pt, 100pt)
        #mini-node(0pt, 0pt, 250pt, 30pt, [Ricerca])
        #mini-node(0pt, 48pt, 250pt, 32pt, [Visita disponibile?], fill: cedro)
        #mini-node(0pt, 100pt, 116pt, 48pt, [No: cambia i criteri])
        #mini-node(134pt, 100pt, 116pt, 48pt, [Sì: apri il dettaglio])]
      Quali azioni e condizioni portano all’esito del compito?],
    [#heading[Sitemap]#v(12pt)
      #block(width: 250pt, height: 150pt)[
        #edge(125pt, 30pt, 125pt, 44pt)#edge(38pt, 44pt, 212pt, 44pt)
        #edge(38pt, 44pt, 38pt, 58pt)#edge(125pt, 44pt, 125pt, 58pt)#edge(212pt, 44pt, 212pt, 58pt)
        #mini-node(0pt, 0pt, 250pt, 30pt, [Servizio])
        #mini-node(0pt, 58pt, 76pt, 80pt, [Il servizio])
        #mini-node(87pt, 58pt, 76pt, 80pt, [Trova una visita])
        #mini-node(174pt, 58pt, 76pt, 80pt, [Le mie visite])]
      Come sono raggruppati e collegati contenuti e sezioni?])
]
#let ui-annotata() = graphic[
  #grid(columns: (390pt, 1fr), gutter: 32pt,
    screen([passo. · Visita a domicilio], [#heading[Giulia Riva · 45 minuti]#v(6pt)
      17 novembre 2026 · CAP 20121#v(8pt)
      #block(width: 100%, fill: pale, inset: 7pt, radius: 4pt)[*20:30 · A domicilio*]#v(8pt)
      *Totale: 60 €* · spostamento incluso#v(8pt)
      #button([Invia richiesta])#v(6pt)
      In attesa: il professionista deve accettare.]),
    [#heading[Griglia e composizione]#v(6pt)
      Rendono riconoscibili gruppi, informazioni e priorità dell’azione.#v(12pt)
      #heading[Tipografia, colore e immagini]#v(6pt)
      Distinguono ruoli e sostengono l’identità del servizio.#v(12pt)
      #heading[Contenuti e stati]#v(6pt)
      Progettare attesa, errore, indisponibilità e conferma insieme ai componenti.])
]

// Progressive application of the same simulated service, from v0 to delivery.
#let caso-wireframe-v0() = graphic[
  #grid(columns: 3, gutter: 24pt,
    screen([Ricerca · V0], [*passo.*#parbreak()Domicilio e CAP 20121#linebreak()17 novembre 2026#linebreak()Fascia oraria: tutte#v(1fr)#button([Cerca], fill: body-ink)], height: 214pt),
    screen([Risultati · V0], [*Giulia Riva*#parbreak()17 novembre 2026#linebreak()20:30 · 45 minuti#v(1fr)#button([Vedi visita], fill: body-ink)], height: 214pt),
    screen([Riepilogo · V0], [*17 novembre 2026*#parbreak()20:30 · 45 minuti#linebreak()60 €#linebreak()Luogo: da verificare#v(1fr)#button([Prenota], fill: body-ink)], height: 214pt))
  #v(10pt)#note[Problemi da mettere alla prova: filtro serale assente; domicilio e costo totale poco espliciti.]
]

#let caso-iterazione-v1() = graphic[
  #grid(columns: 2, gutter: 28pt,
    screen([Prima · V0], [*Giulia Riva*#parbreak()17 novembre 2026#linebreak()20:30 · 45 minuti#linebreak()Luogo: da verificare#v(1fr)#button([Prenota], fill: body-ink)], height: 214pt),
    screen([Dopo · V1], [*A domicilio · indirizzo indicato*#parbreak()17 novembre 2026#v(6pt)#block(fill: cedro, inset: 7pt, radius: 4pt)[*Dopo le 20 · 20:30*]#v(6pt)45 minuti · *Totale: 60 €*#linebreak()Spostamento incluso#v(1fr)#button([Prenota])], height: 214pt))
  #v(10pt)#note[V1 chiarisce R1, R2 e R3; «Prenota» resta da verificare. La revisione è un’ipotesi da riprovare.]
]

#let caso-iterazione-v2() = graphic[
  #chain(
    screen([Viola · Invia], [*Richiesta inviata.*#v(8pt)#block(fill: pale, inset: 7pt, radius: 4pt)[*In attesa*]#v(8pt)17 novembre 2026#linebreak()20:30 · 45 minuti · 60 €#parbreak()La visita non è ancora confermata.], height: 198pt),
    screen([Professionista · Valuta], [*In attesa*#parbreak()Il professionista controlla domicilio e orario.#parbreak()Viola ritrova la richiesta in «Le mie visite».], height: 198pt),
    screen([Professionista · Accetta], [#block(fill: cedro, inset: 7pt, radius: 4pt)[*Visita confermata*]#v(10pt)Giulia Riva ha accettato la visita.#parbreak()Luogo, orario e contatto in «Le mie visite».], height: 198pt))
  #v(10pt)#note[R4: l’invio di Viola e l’accettazione del professionista sono due eventi distinti.]
]

#let caso-iterazione-v3() = graphic[
  #chain(
    screen([Orario perso], [#block(fill: pale, inset: 7pt, radius: 4pt)[*20:30 non più disponibile*]#v(10pt)La disponibilità cambia prima dell’invio.#parbreak()La visita non è confermata.], height: 202pt),
    screen([Dati conservati], [*Domicilio e CAP 20121*#parbreak()17 novembre 2026#linebreak()45 minuti · Totale: 60 €#v(1fr)#button([Scegli un altro orario])], height: 202pt),
    screen([Nuova proposta], [#block(fill: pale, inset: 7pt, radius: 4pt)[*21:15 · 45 minuti*]#v(10pt)17 novembre 2026#linebreak()Totale: 60 €#v(1fr)#button([Invia richiesta])], height: 202pt))
  #v(10pt)#note[R5: si cambia solo l’orario. La nuova richiesta torna «In attesa» fino all’accettazione del professionista.]
]

#let caso-servizio-finale() = graphic[
  #matrix(([Attore], [Cercare], [Scegliere], [Richiedere], [Attendere], [Gestire]), (
    ([Viola], [Imposta CAP e sera.], [Confronta orario e costo.], [Invia la richiesta.], [Legge «In attesa».], [Ritrova o cambia visita.]),
    ([Interfaccia], [Verifica il CAP.], [Mostra 45 min e totale.], [Valida contatti e riepilogo.], [Attesa; conferma o rifiuto.], [Conserva dati e dettagli.]),
    ([Professionista], [Aggiorna gli slot.], [Propone disponibilità.], [Riceve la richiesta.], [Accetta o rifiuta.], [Gestisce variazioni.]),
    ([Gestore], [Coordina la rete.], [Definisce condizioni.], [Traccia l’invio.], [Supporta le eccezioni.], [Offre assistenza.]),
  ), first: 116pt, inset: (x: 8pt, y: 7pt))
  #v(10pt)#note[La conferma appare dopo l’accettazione del professionista; il gestore coordina rete e assistenza.]
]

#let caso-sistema-ui() = graphic[
  #grid(columns: (380pt, 1fr), gutter: 32pt,
    screen([passo. · Riepilogo], [#text(size: 25pt, weight: 700, fill: ink)[Un ultimo sguardo]#v(8pt)
      *Giulia Riva*#linebreak()Via Esempio 12 · CAP 20121#linebreak()17 novembre 2026 · 20:30#linebreak()45 minuti · *Totale: 60 €*#v(1fr)#button([Invia richiesta])#v(8pt)
      #note[La visita richiede l’accettazione del professionista.]], height: 218pt),
    [#heading[Tipografia]#v(6pt)
      Nunito Sans e marchio passo.; titolo, dati e aiuto hanno ruoli riconoscibili.#v(12pt)
      #heading[Griglia e spazi]#v(6pt)
      Contatti a sinistra; visita e invio a destra. Colonne e allineamenti comuni.#v(12pt)
      #heading[Colori e stati]#v(6pt)
      Violetto per azioni e selezioni; Cedro per conferma. Fotografie domestiche e stati scritti.])
  #v(10pt)#note[Griglia, tipografia e colore lavorano insieme; lo stato non dipende soltanto dal colore.]
]
