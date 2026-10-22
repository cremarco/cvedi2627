// Apri typst-booklet in VS Code e avvia «Typst Preview» su questo file.
// I font condivisi sono nei percorsi indicati in ../.vscode/settings.json.

#let inchiostro = rgb("#2E3138")
#let accento = rgb("#AFC7E8")

#set document(title: "Una pagina con Typst", author: "CVeDI")
#set text(font: "DM Sans 9pt", size: 12pt, fill: inchiostro, lang: "it")
#set par(justify: false, leading: 2pt, spacing: 10pt)
#set page(
  width: 170mm,
  height: 240mm,
  margin: (inside: 18mm, outside: 15mm, top: 15mm, bottom: 20mm),
  footer: context align(right)[
    #rect(width: 32pt, height: 22pt, fill: accento, stroke: none)[
      #align(center + horizon, text(weight: "medium", counter(page).display("1")))
    ]
  ],
)
#show heading.where(level: 1): it => block(above: 0pt, below: 14pt)[
  #text(font: "Sora", size: 20pt, weight: "extrabold", it.body)
]
#show heading.where(level: 2): it => block(above: 12pt, below: 4pt)[
  #text(size: 14pt, weight: "black", it.body)
]

= Una pagina con Typst

#block(below: 18pt)[
  #set text(size: 15pt)
  #set par(leading: 6pt)
  Un piccolo esempio per provare testo, gerarchie e composizione a due colonne.
]

#columns(2, gutter: 5mm)[
  == Scrivere il contenuto

  In Typst il testo si scrive direttamente nel documento. Una riga vuota separa i paragrafi; gli asterischi introducono il *grassetto* e i trattini bassi il _corsivo_.

  Contenuto e presentazione possono restare separati: le regole all’inizio del file definiscono caratteri, margini e titoli. Cambiando una regola si aggiorna l’intero documento.

  == Una sequenza semplice

  Per sperimentare, prova questi tre passaggi:

  + Modifica il titolo della pagina.
  + Aggiungi un paragrafo con una parola in *grassetto*.
  + Osserva come cambia l’anteprima mentre scrivi.

  #colbreak()

  == Leggere la griglia

  La pagina misura 170 × 240 mm. Le due colonne sono separate da uno spazio di 5 mm: il testo scorre prima nella colonna sinistra e poi in quella destra.

  Il campione seguente mostra il colore di accento usato per questa prova, ripreso dal capitolo di Tipografia.

  #block(above: 12pt, below: 8pt)[
    #rect(width: 100%, height: 24mm, fill: accento, stroke: none)
  ]
  #block[
    #set text(size: 9pt, weight: "light")
    #set par(leading: 1.8pt)
    #text(weight: "medium")[Campione.] Il colore distingue un elemento editoriale; il testo conserva il colore dell’inchiostro.
  ]

  == Continuare la prova

  Puoi duplicare questo file e sostituire i testi con i tuoi contenuti. Le righe che iniziano con due barre oblique sono commenti e non compaiono nella pagina.
]
