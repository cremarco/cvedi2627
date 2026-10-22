// Contenitori delle pagine speciali. La prosa continua resta nelle pagine
// e nelle colonne native del capitolo; questi componenti non la suddividono.
#import "geometria.typ": pagina-larghezza, pagina-altezza, margini, discesa-folio
#import "editoriale.typ": titolo-apparato

// Documento autonomo senza note: recupera il margine inferiore ordinario,
// anche quando è richiamato dal corpo che riserva la fascia delle note.
#let pagina-documentaria(corpo) = page(columns: 1,
  margin: margini(), footer-descent: discesa-folio, corpo)

// L'immagine occupa il foglio; didascalia e fonti appartengono alla prosa
// precedente. Gli apparati sono spenti soltanto su questo inserto.
#let pagina-al-vivo(corpo) = page(
  width: pagina-larghezza, height: pagina-altezza, margin: 0pt, columns: 1,
  header: none, footer: none, background: none, foreground: none, corpo)

// La pagina puntinata segue l'apparato bibliografico di ogni capitolo.
// Le dimensioni del reticolo riguardano lo spazio per gli appunti, non la prosa.
#let appunti() = page(columns: 1)[
  #set par(justify: false)
  #titolo-apparato[Appunti]
  #v(18pt)
  #block(width: 100%, height: 175mm,
    fill: tiling(size: (5mm, 5mm), circle(radius: 0.3pt, fill: rgb("CDD0D4"))))
]
