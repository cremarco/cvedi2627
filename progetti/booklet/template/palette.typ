// Resolve chapter accents from the shared palette data.
// Colors are selected by order, without artwork-specific substitutions.

#let palette = json(path("/risorse-condivise/immagini/aperture/manifest.json")).palette
#let front-matter-accent = rgb(palette.famiglie.at(palette.preliminari).colore)
// Keep the current accent available to editorial components without importing layout.
#let chapter-color = state("colore-capitolo", front-matter-accent)

#let chapter-accent(number) = {
  assert(type(number) == int and number >= 1 and number <= palette.ordine.len(),
    message: "The chapter number exceeds the available palette sequence.")
  rgb(palette.famiglie.at(palette.ordine.at(number - 1)).colore)
}
