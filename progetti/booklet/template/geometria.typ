// Quote del sistema editoriale, condivise da flusso, inserti e sagome.
#let pagina-larghezza = 170mm
#let pagina-altezza = 240mm
#let margine-interno = 18mm
#let margine-esterno = 15mm
#let margine-superiore = 15mm
#let margine-inferiore = 20mm
#let intercolonna = 5mm
#let gabbia = pagina-larghezza - margine-interno - margine-esterno
#let colonna = (gabbia - intercolonna) / 2
#let altezza-gabbia = pagina-altezza - margine-superiore - margine-inferiore
#let spazio-note = 35mm
#let distacco-note = 8pt
#let discesa-folio = 17pt
#let altezza-corpo = altezza-gabbia - spazio-note - distacco-note
#let fondo-gabbia = pagina-altezza - margine-inferiore
#let margine-inferiore-corpo = margine-inferiore + spazio-note + distacco-note
#let discesa-folio-corpo = spazio-note + distacco-note + discesa-folio
#let rispetto-sagoma = 8pt
#let minimo-testo = 108pt
#let inchiostro = rgb("2E3138")

#let margini(bottom: margine-inferiore) = (
  inside: margine-interno, outside: margine-esterno,
  top: margine-superiore, bottom: bottom,
)
#let margine-sinistro(pagina) = if calc.odd(pagina) {
  margine-interno
} else { margine-esterno }
