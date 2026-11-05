// Slide-specific teaching examples. All records and episodes are simulated.
#import "/progetti/booklet/assets/diagrams/ux-process-examples.typ": graphic, panel

#let responsibilities() = graphic[
  #grid(columns: (90pt, 1fr, 1fr), column-gutter: 12pt, row-gutter: 12pt,
    [*Decisione*], [*Chi deve chiarirla*], [*Conseguenza sul prodotto*],
    [Zona coperta], [Gestione del servizio e professionisti.], [Verificare il domicilio prima della scelta.],
    [Disponibilità], [Chi aggiorna e conferma gli orari.], [Distinguere un orario proposto da uno confermato.],
    [Annullamento], [Responsabile delle condizioni e assistenza.], [Mostrare regole e possibilità di recupero.],
  )
]

#let hypothesis-record() = graphic[
  #grid(columns: (1fr, 1fr), gutter: 12pt,
    panel([Problema ipotizzato], [Chi finisce tardi non capisce quali visite siano compatibili con il lavoro.]),
    panel([Proposta], [Mostrare orari serali e copertura vicino al giorno selezionato.]),
    panel([Cambiamento atteso], [La persona riconosce una disponibilità compatibile prima del riepilogo.], fill: white),
    panel([Possibile smentita], [Trova l’orario, ma non procede perché il domicilio non è coperto.], fill: white),
  )
]

#let journey-responsibilities() = graphic[
  #grid(columns: (78pt, 1fr, 1fr, 1fr), column-gutter: 10pt, row-gutter: 12pt,
    [*Momento*], [*Prima della scelta*], [*Durante la conferma*], [*Dopo la prenotazione*],
    [Per Viola], [Capire se il servizio arriva a casa.], [Sapere se la richiesta è accettata.], [Ritrovare luogo, orario e contatto.],
    [Interfaccia], [Informazioni sulla zona e ricerca.], [Riepilogo e stato della richiesta.], [Dettaglio in «Le mie visite».],
    [Servizio], [Definire e aggiornare la copertura.], [Confermare la disponibilità effettiva.], [Gestire variazioni e assistenza.],
  )
]

#let acceptance-example() = graphic[
  #panel([User story], [Come persona che lavora fino a tardi, voglio trovare una visita serale a domicilio per riceverla dopo il lavoro.])
  #v(10pt)
  #grid(columns: (1fr, 1fr, 1fr), gutter: 12pt,
    panel([Condizione iniziale], [Ho selezionato domicilio, giorno e fascia serale.], fill: white),
    panel([Azione], [Scelgo una disponibilità e apro il riepilogo.], fill: white),
    panel([Esito atteso], [Ritrovo domicilio, giorno, orario e costo coerenti con la scelta.], fill: white),
  )
]

#let observation-log() = graphic[
  #grid(columns: (92pt, 1fr), column-gutter: 12pt, row-gutter: 10pt,
    [*Contesto*], [Episodio simulato · versione B · compito: trovare una visita dopo le 20.],
    [*Comportamento*], [La persona apre due schede e torna alla ricerca senza scegliere un orario.],
    [*Parole*], [«Non so se questa visita è a domicilio».],
    [*Facilitazione*], [Nessun suggerimento sul percorso.],
    [*Interpretazione*], [La copertura potrebbe essere poco riconoscibile.],
    [*Prossima prova*], [Rendere esplicito il domicilio e ripetere il compito.],
  )
]

#let problem-priorities() = graphic[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 12pt,
    panel([Compito bloccato], [Nessuna visita disponibile; manca una via per cambiare ricerca.]),
    panel([Decisione poco chiara], [L’orario è disponibile, ma il costo totale resta ambiguo.]),
    panel([Attrito recuperabile], [La persona rilegge un’etichetta, poi prosegue autonomamente.]),
  )
  #v(10pt)
  [La priorità considera conseguenze, persone coinvolte, frequenza osservata e possibilità di recupero. Gli episodi non costituiscono una graduatoria universale.]
]

#let handoff-record() = graphic[
  #panel([Stato da realizzare · Orario non più disponibile], [La disponibilità cambia prima della conferma definitiva.])
  #v(10pt)
  #grid(columns: (1fr, 1fr), gutter: 12pt,
    panel([Risposta dell’interfaccia], [Spiega l’esito e propone «Scegli un altro orario».], fill: white),
    panel([Dati da conservare], [Domicilio, giorno e informazioni già valide.], fill: white),
    panel([Criterio di accettazione], [Il ritorno alla scelta non obbliga a reinserire i dati.], fill: white),
    panel([Questione da risolvere], [Quando e da chi viene aggiornata la disponibilità?], fill: white),
  )
]
