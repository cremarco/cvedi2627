#import "/progetti/booklet/assets/diagrams/composition-examples.typ": demo-panel, demo-action
#set page(width: 542pt, height: auto, margin: 1pt)
#set text(font: "DM Sans 9pt", size: 10pt, variations: (opsz: 18))
#set par(justify: false, leading: 2pt)
#let invitation(place-y) = demo-panel[
  #box(width: 100%, height: 202pt)[
    #place(top + left)[#text(size: 17pt, weight: 700)[Laboratorio#linebreak()di fotografia]]
    #place(top + left, dy: 50pt)[*Sabato 14 novembre*#linebreak()Dalle 10 alle 13]
    #place(top + left, dy: place-y)[Spazio Officina#linebreak()#text(size: 9pt)[Via del Parco 8]]
    #place(top + left, dy: 146pt)[#text(size: 9pt)[Iscrizione gratuita]]
    #place(top + left, dy: 172pt)[#demo-action([Iscriviti])]
  ]
]
#grid(columns: (1fr, 1fr), gutter: 20pt,
  [*a · Versione iniziale*#v(6pt)#invitation(83pt)],
  [*b · Gruppo del luogo spostato*#v(6pt)#invitation(106pt)])
