// Le armonie cromatiche mantengono la ruota e la palette SVG originali.
// La riga tecnica diventa testo nativo leggibile nella colonna da 66 mm.
#import "geometria.typ": colonna
#import "editoriale.typ": contenuto-didascalia

#let schema-armonia(file, didascalia, legenda: [], alt: none) = {
  let sorgente = read(file)
  let parti-ruota = sorgente.split("<svg width=\"220\"")
  let parti-palette = sorgente.split("<g transform=\"translate(0 247)\">")
  assert(parti-ruota.len() == 2 and parti-palette.len() == 2,
    message: "Lo schema cromatico richiede la ruota e la palette originali.")
  let ruota = "<svg width=\"220\"" + parti-ruota.last().split("</svg>").first() + "</svg>"
  let palette = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"363\" height=\"20\" viewBox=\"0 0 363 20\">" + parti-palette.last().split("</g>\n</g>\n</svg>").first() + "</svg>"
  figure([
    #block(width: colonna, above: 0pt, below: 0pt)[
      #align(center, image(bytes(ruota), format: "svg",
        width: colonna, height: colonna, alt: alt))
      #v(4pt)
      #block(above: 0pt, below: 0pt)[
        #set text(size: 9pt, weight: 400, variations: (opsz: 9))
        #set par(justify: false, leading: 1.8pt, spacing: 0pt)
        #align(center, legenda)
      ]
      #v(4pt)
      #image(bytes(palette), format: "svg",
        width: colonna, height: colonna * 20 / 363,
        alt: "Campioni della palette cromatica originale.")
    ]
  ], kind: image, supplement: [Figura], placement: top, scope: "column",
    caption: contenuto-didascalia(didascalia))
}
