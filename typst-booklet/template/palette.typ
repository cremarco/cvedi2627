// La sequenza cromatica segue il capitolo corrente, non il vecchio tema grafico.
#let palette = json(path("/assets/images/aperture/manifest.json")).palette
#let accento-preliminari = rgb(palette.famiglie.at(palette.preliminari).colore)

#let accento-capitolo(numero) = {
  assert(type(numero) == int and numero >= 1 and numero <= palette.ordine.len(),
    message: "Il numero di capitolo supera la sequenza cromatica disponibile.")
  rgb(palette.famiglie.at(palette.ordine.at(numero - 1)).colore)
}

#let visuale-capitolo(grafica, accento) = {
  // La tinta principale originale è riservata a quel ruolo: --check verifica
  // che secondari e spettro non la condividano. La sostituzione conserva
  // geometria e asset originali, senza produrre copie SVG da sincronizzare.
  let svg = read(path("/" + grafica.percorso))
  bytes(svg.replace(regex("(?i)" + grafica.colore), accento.to-hex()))
}
