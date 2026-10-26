#import "../diagrams/interface-barriers.typ": interface-barrier, target-sizes, catalog
#let name = sys.inputs.at("schema", default: "bersagli")
#let variant = sys.inputs.at("variante", default: "barriera")
#let height = if name == "bersagli" { 88 } else {
  catalog.confronti.find(c => c.nome == name).altezza
}
#set page(width: if name == "bersagli" { 363pt } else { 180pt },
  height: height * 1pt, margin: 0pt, fill: white)
#if name == "bersagli" { target-sizes(width: 363pt) } else {
  interface-barrier(name, variant)
}
