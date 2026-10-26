#import "../../template/schemi-accessibilita.typ": disegno-interfaccia, disegno-bersagli, catalogo
#let nome = sys.inputs.at("schema", default: "bersagli")
#let variante = sys.inputs.at("variante", default: "barriera")
#let altezza = if nome == "bersagli" { 88 } else {
  catalogo.confronti.find(c => c.nome == nome).altezza
}
#set page(width: if nome == "bersagli" { 363pt } else { 180pt },
  height: altezza * 1pt, margin: 0pt, fill: white)
#if nome == "bersagli" { disegno-bersagli(larghezza: 363pt) } else {
  disegno-interfaccia(nome, variante)
}
