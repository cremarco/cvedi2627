// La mappa WCAG conserva la propria scala e la riserva della tavola autonoma.
// Misurazione e figura mobile riusano il motore documentario del template.
#import "figure.typ": documento-mobile

#let mappa-a-pagina(file, didascalia, diritti, alt) = documento-mobile(
  file, didascalia, diritti: diritti, alt: alt,
  intera: true, rapporto: 1054 / 1492, allineamento: bottom + center, riserva: 12pt)
