// Esporta la stessa visuale vettoriale nativa usata nel volume, senza caption.
#import "../../template/ricerca.typ": disegno-grafico, dati-dimensioni, geometria-grafico
#import "../../template/geometria.typ": gabbia
#let codice = sys.inputs.at("dimensione", default: "PDI")
#let dimensione = dati-dimensioni.find(d => d.code == codice)
#assert(dimensione != none, message: "Dimensione culturale non riconosciuta.")
#set page(width: gabbia, height: geometria-grafico.altezza * (gabbia / geometria-grafico.larghezza),
  margin: 0pt, fill: white)
#disegno-grafico(dimensione.data)
