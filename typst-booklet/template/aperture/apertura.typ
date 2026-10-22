// Apertura vettoriale del capitolo: una pagina, senza testi dentro l'SVG.
// La pagina eredita formato, margini speculari e folio da template/stile.typ.
// L'asset è un SVG al vivo, con tela 1200 × 1694, proporzionata a 170 × 240 mm.
// Può essere un path() SVG oppure bytes() nei test; non contiene testi incorporati.
// Numero e titolo sono testo Typst: si modificano senza rigenerare l'immagine.
#import "capitoli-01-06.typ": apertura-primi
#import "capitoli-07-10.typ": apertura-visive
#import "capitoli-11-12.typ": apertura-lettere-griglia
#import "../geometria.typ": inchiostro

// numero segue il piano attivo; tema conserva la composizione già approvata.
#let apertura(numero: 1, tema: 2, titolo: [], accento: rgb("FFA2A2"), visuale: none) = {
  assert(type(numero) == int and numero >= 1 and numero <= 6,
    message: "Indicare un numero di capitolo fra 1 e 6.")
  assert(type(tema) == int and tema >= 1 and tema <= 12,
    message: "Indicare il tema originale della grafica approvata, fra 1 e 12.")
  assert(visuale != none, message: "Indicare il path() della grafica SVG del capitolo.")

  // background usa l'intero foglio, compresi i margini. Solo il testo segue
  // la gabbia speculare ereditata; non viene aggiunto un pannello attorno all'arte.
  // La tela SVG ha lo stesso rapporto della pagina: stretch evita fasce bianche.
  // accento resta il token del capitolo nell'API; grafica e folio lo ricevono
  // rispettivamente nell'SVG e dal componente capitolo() del template comune.
  page(columns: 1,
    background: image(visuale, width: 100%, height: 100%, fit: "stretch"))[
    #set text(font: "Sora", weight: 700, fill: inchiostro,
      hyphenate: false, top-edge: 0.9em, bottom-edge: 0.1em)
    #set par(justify: false, leading: -5pt, spacing: 0pt)
    // L'indice conserva il codice a due cifre; sulla copertina il titolo
    // personalizzato mostra solo it.body e il numero ha il proprio disegno.
    #set heading(numbering: n => if n < 10 { "0" + str(n) } else { str(n) })

    // Ogni tema compone titolo e numero in modo diverso; il titolo resta
    // un heading nativo per l'indice e i segnalibri. Il codice riguarda solo
    // l'apertura: la prosa dei capitoli continua nel normale flusso Typst.
    #block(width: 100%, height: 100%)[
      #if tema <= 6 {
        apertura-primi(tema, numero, titolo)
      } else if tema <= 10 {
        apertura-visive(tema, numero, titolo)
      } else {
        apertura-lettere-griglia(tema, numero, titolo)
      }
    ]
  ]
}
