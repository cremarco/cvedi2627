// Native graphic source. Figure placement and editorial metadata belong to the chapter.

#let ink = rgb("2E3138")
#let tag(body) = text(font: "DM Sans 9pt", size: 9.5pt, weight: 500,
  variations: (opsz: 14), body)
#let foglio(body, color: rgb("FAF8F1"), font: "DM Sans 9pt", inset: (x: 16pt, top: 28pt, bottom: 16pt)) = block(
  width: 100%, breakable: false, fill: color,
  inset: inset,
)[
  #set align(left)
  #set text(font: font, size: 12pt, weight: 400, variations: (opsz: 14))
  #set par(justify: false, leading: 2pt, spacing: 10pt, first-line-indent: 0pt)
  #body
]

#let punctuation-sample(name, body) = block(breakable: false)[
  #tag(name)
  #v(3pt)
  #body
]

#let interface-sample(font, name) = foglio(font: font)[
  #tag(name)
  #v(8pt)
  Prenota una visita al laboratorio
  #v(8pt)
  Scegli il giorno e controlla i posti disponibili prima di confermare.
  #v(8pt)
  19 ottobre 2026 · 14:30
  #v(8pt)
  #block(width: 100%, fill: ink, inset: (x: 9pt, y: 7pt))[
    #text(fill: white)[Conferma la visita]
  ]
]

#let sample-paragraph = [Quando il paragrafo prosegue per più righe, il lettore deve poter ritrovare l’inizio della successiva. Il rapporto fra corpo, giustezza e interlinea va osservato sul testo e nel formato previsti.]

#let booking-specimen() = [
    #foglio[
      #tag[Prenotazione simulata]
      #v(10pt)
      #text(size: 18pt, weight: 700)[Prenotare la visita al laboratorio di tipografia]
      #v(10pt)
      #line(length: 100%, stroke: 0.5pt + ink)
      #v(10pt)
      Lunedì 19 ottobre il laboratorio apre alle 14:30. La visita dura un’ora e comprende una breve dimostrazione di composizione. È necessario prenotare prima dell’arrivo e conservare il codice di conferma.

      Il biglietto costa 24,50 €. Chi arriva in ritardo può chiedere al personale se è ancora possibile entrare. Prima di confermare, controlla il nome, il giorno scelto e il numero di partecipanti.

      _Nicolò Ferri_ · 19 ottobre 2026 · 24,50 € · Il1-038
    ]
    #v(6pt)
    #tag[Leggilo alla misura finale.]
  ]

#let role-specimen() = [
  #foglio[
    #text(size: 18pt, weight: 900)[Una mostra da leggere]
    #v(8pt)
    #text(size: 14pt, weight: 700)[Tre percorsi, una sola voce]
    #v(14pt)
    Il titolo introduce il tema. Il sottotitolo orienta e il corpo accompagna la lettura. Pesi e spazi rendono riconoscibili questi compiti.
  ]
  #v(6pt)
  #tag[Titolo 18 · sottotitolo 14 · corpo 12]
  #linebreak()
  #tag[Una famiglia, tre compiti.]
]

#let compressed-specimen(file, width, alt) = [
      #foglio[
        #tag[Compressione geometrica]
        #v(8pt)
        #tag[Larghezza geometrica: 75%]
        #v(8pt)
        #box(width: 100%, height: 30.924pt,
          align(left + horizon, image(file, width: width, alt: alt)))
      ]
    ]

#let variable-width-specimen(file, width, alt) = [
      #foglio[
        #tag[Asse wdth 75]
        #v(8pt)
        #tag[Asse reale del font: wdth 75]
        #v(8pt)
        #box(width: 100%, height: 30.924pt,
          align(left + horizon, image(file, width: width, alt: alt)))
      ]
    ]

#let punctuation-specimen() = [
  #foglio[
    #stack(dir: ttb, spacing: 10pt,
      punctuation-sample([Accenti], [È · CAFFÈ · PERCHÉ]),
      punctuation-sample([Apostrofo e virgolette], [L’idea è «già pronta».]),
      punctuation-sample([Parola composta], [tecnico-scientifico]),
      punctuation-sample([Intervallo], [10–12]),
      punctuation-sample([Numero negativo], [−5]),
      punctuation-sample([Spazio normale], block(width: 51pt)[Peso: 10 kg]),
      punctuation-sample([Spazio non separabile], block(width: 51pt)[#text("Peso: 10\u{a0}kg")]),
    )
  ]
  #v(6pt)
  #tag[Segni simili, funzioni diverse.]
]

#let emphasis-specimen() = [
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#foglio[
        #tag[Tutto marcato]
        #v(8pt)
        #text(weight: 700)[La prenotazione resta valida fino alle 18. Porta il codice di conferma e presentati all’ingresso principale.]
      ]],
      [#foglio[
        #tag[Un’informazione da ritrovare]
        #v(8pt)
        La prenotazione resta valida #text(weight: 700)[fino alle 18]. Porta il codice di conferma e presentati all’ingresso principale.
      ]],
    )
    #v(6pt)
    #tag[Trova la scadenza.]
  ]

#let link-specimen() = [
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#foglio(color: white)[
        #tag[Solo colore]
        #v(8pt)
        Per preparare la visita, consulta gli #text(fill: rgb("286FBF"))[orari e i biglietti della mostra].
        #v(8pt)
        #tag[mostra.example/orari]
      ]],
      [#foglio(color: white)[
        #tag[Colore e sottolineatura]
        #v(8pt)
        Per preparare la visita, consulta gli #underline(text(fill: rgb("286FBF"))[orari e i biglietti della mostra]).
        #v(8pt)
        #tag[mostra.example/orari]
      ]],
    )
    #v(6pt)
    #tag[La destinazione si capisce dalle parole.]
  ]

#let fallback-specimen() = [
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#interface-sample("DM Sans 9pt", [Font previsto · DM Sans])],
      [#interface-sample("Sora", [Font di riserva · Sora])],
    )
    #v(6pt)
    #tag[Interfaccia simulata · corpo nominale 12 pt]
    #linebreak()
    #tag[Stessa larghezza, interlinea e contenuto.]
  ]

#let line-spacing-specimen() = [
    #grid(columns: (1fr,), row-gutter: 10pt,
      [#foglio(inset: (x: 16pt, y: 8pt))[
        #tag[Corpo 12 / interlinea 14]
        #v(8pt)
        #sample-paragraph
      ]],
      [#foglio(inset: (x: 16pt, y: 8pt))[
        #tag[Corpo 12 / interlinea 18]
        #v(8pt)
        #block[
          #set par(leading: 6pt)
          #sample-paragraph
        ]
      ]],
    )
    #v(6pt)
    #tag[Uguali: testo, DM Sans Regular, corpo 12 pt e giustezza 155,09 pt.]
    #linebreak()
    #tag[Cambia: interlinea 14 oppure 18 pt.]
  ]
