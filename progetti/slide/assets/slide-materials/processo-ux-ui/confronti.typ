// Slide-only geometric examples. All service content is simulated.
#let ink = rgb("0f172a")
#let body-ink = rgb("334155")
#let violet = rgb("5b21b6")
#let pale = rgb("ede9fe")
#let cedro = rgb("d9ef75")
#let rule = rgb("cbd5e1")

#let graphic(body) = block(width: 100%)[
  #set text(font: "DM Sans 9pt", size: 10pt, fill: ink)
  #set par(justify: false, leading: 2pt, spacing: 5pt)
  #body
]

#let node(x, y, width, label, height: 25pt, fill: pale) = place(top + left, dx: x, dy: y,
  rect(width: width, height: height, fill: fill, stroke: none, radius: 2pt, inset: 3pt)[
    #align(center + horizon)[#text(size: 9.5pt, weight: 600, label)]
  ])
#let edge(x1, y1, x2, y2) = place(top + left,
  line(start: (x1, y1), end: (x2, y2), stroke: .8pt + violet))
#let small(x, y, label) = place(top + left, dx: x, dy: y, text(size: 8.5pt, fill: body-ink, label))

#let maps-comparison() = graphic[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 18pt,
    [
      #text(size: 13pt, weight: 700, fill: violet)[Journey]
      #v(8pt)
      #block(width: 100%, height: 112pt)[
        #small(0pt, 7pt, [Prima])
        #small(0pt, 47pt, [Durante])
        #small(0pt, 87pt, [Dopo])
        #edge(94pt, 25pt, 94pt, 40pt)
        #edge(94pt, 65pt, 94pt, 80pt)
        #node(39pt, 0pt, 110pt, [Cercare le alternative])
        #node(39pt, 40pt, 110pt, [Scegliere e prenotare])
        #node(39pt, 80pt, 110pt, [Ritrovare i dettagli])
      ]
      #text(fill: body-ink)[Che cosa accade fra canali e momenti del servizio?]
    ],
    [
      #text(size: 13pt, weight: 700, fill: violet)[User flow]
      #v(8pt)
      #block(width: 100%, height: 112pt)[
        #edge(75pt, 25pt, 75pt, 34pt)
        #edge(75pt, 59pt, 75pt, 68pt)
        #edge(34pt, 68pt, 116pt, 68pt)
        #edge(34pt, 68pt, 34pt, 77pt)
        #edge(116pt, 68pt, 116pt, 77pt)
        #node(20pt, 0pt, 110pt, [Ricerca])
        #node(20pt, 34pt, 110pt, [Visita disponibile?], fill: cedro)
        #node(0pt, 77pt, 68pt, [No: cambia i criteri], height: 35pt)
        #node(82pt, 77pt, 68pt, [Sì: apri il riepilogo], height: 35pt)
      ]
      #text(fill: body-ink)[Quali azioni e condizioni portano all’esito del compito?]
    ],
    [
      #text(size: 13pt, weight: 700, fill: violet)[Sitemap]
      #v(8pt)
      #block(width: 100%, height: 112pt)[
        #edge(75pt, 25pt, 75pt, 46pt)
        #edge(23pt, 46pt, 127pt, 46pt)
        #edge(23pt, 46pt, 23pt, 61pt)
        #edge(75pt, 46pt, 75pt, 61pt)
        #edge(127pt, 46pt, 127pt, 61pt)
        #node(25pt, 0pt, 100pt, [Servizio])
        #node(0pt, 61pt, 46pt, [Servizi], height: 35pt)
        #node(52pt, 61pt, 46pt, [Prenota], height: 35pt)
        #node(104pt, 61pt, 46pt, [Le mie visite], height: 35pt)
      ]
      #text(fill: body-ink)[Come sono raggruppati e collegati contenuti e sezioni?]
    ],
  )
]

#let ui-annotated() = graphic[
  #grid(columns: (245pt, 1fr), gutter: 28pt,
    [
      #block(width: 245pt, height: 178pt, fill: white, stroke: .6pt + rule, inset: 12pt)[
        #text(size: 14pt, weight: 700)[Visite a domicilio]
        #v(3pt)
        #text(size: 10pt, fill: body-ink)[Scegli una disponibilità compatibile.]
        #v(10pt)
        #block(width: 100%, fill: pale, inset: 8pt)[
          #text(size: 11pt, weight: 700)[Fisioterapia · 45 minuti]
          #v(4pt)
          #text(size: 10pt)[Domicilio e costo nel riepilogo.]
        ]
        #v(7pt)
        #block(width: 100%, fill: cedro, inset: 6pt)[
          #text(size: 11pt, weight: 600)[20:30 · A domicilio]
        ]
        #v(7pt)
        #block(width: 100%, fill: violet, inset: 6pt)[
          #align(center)[#text(fill: white, weight: 700)[Invia richiesta]]
        ]
        #v(4pt)
        #text(size: 9pt, fill: body-ink)[L’invio non conferma ancora la visita.]
      ]
    ],
    [
      #text(size: 12pt, weight: 700, fill: violet)[Griglia e composizione]
      #v(3pt)
      Rendono riconoscibili gruppi, informazioni e priorità dell’azione.
      #v(12pt)
      #text(size: 12pt, weight: 700, fill: violet)[Tipografia, colore e immagini]
      #v(3pt)
      Distinguono ruoli e sostengono l’identità del servizio.
      #v(12pt)
      #text(size: 12pt, weight: 700, fill: violet)[Contenuti e stati]
      #v(3pt)
      Progettare attesa, errore, indisponibilità e conferma insieme ai componenti.
    ],
  )
]
