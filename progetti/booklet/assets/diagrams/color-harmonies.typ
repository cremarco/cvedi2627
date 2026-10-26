// Native graphic source. Figure placement and editorial metadata belong to the chapter.

#import "/progetti/booklet/template/geometry.typ": column-width

#let harmony-chart(file, legend: [], alt: none, palette-alt: none) = {
  let source = read(file)
  let parti-ruota = source.split("<svg width=\"220\"")
  let parti-palette = source.split("<g transform=\"translate(0 247)\">")
  assert(parti-ruota.len() == 2 and parti-palette.len() == 2,
    message: "Lo schema cromatico richiede la ruota e la palette originali.")
  let ruota = "<svg width=\"220\"" + parti-ruota.last().split("</svg>").first() + "</svg>"
  let palette = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"363\" height=\"20\" viewBox=\"0 0 363 20\">" + parti-palette.last().split("</g>\n</g>\n</svg>").first() + "</svg>"
  [
    #block(width: column-width, above: 0pt, below: 0pt)[
      #align(center, image(bytes(ruota), format: "svg",
        width: column-width, height: column-width, alt: alt))
      #v(4pt)
      #block(above: 0pt, below: 0pt)[
        #set text(size: 9pt, weight: 400, variations: (opsz: 9))
        #set par(justify: false, leading: 1.8pt, spacing: 0pt)
        #align(center, legend)
      ]
      #v(4pt)
      #image(bytes(palette), format: "svg",
        width: column-width, height: column-width * 20 / 363,
        alt: palette-alt)
    ]
  ]
}
