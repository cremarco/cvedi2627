// Esporta la stessa visuale vettoriale nativa usata nel volume, senza caption.
#import "../diagrams/cultural-indices.typ": cultural-chart, dimension-data, chart-geometry
#import "../../template/geometry.typ": grid-width
#let code = sys.inputs.at("dimensione", default: "PDI")
#let dimension = dimension-data.find(d => d.code == code)
#assert(dimension != none, message: "Dimensione culturale non riconosciuta.")
#set page(width: grid-width, height: chart-geometry.altezza * (grid-width / chart-geometry.larghezza),
  margin: 0pt, fill: white)
#cultural-chart(dimension.data)
