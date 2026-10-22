// Tavole documentarie: i testi restano nativi e le fotografie restano originali.
// I ritagli servono soltanto a ingrandire dettagli già indicati nella fonte Figma.
// Larghezza e altezza esplicite conservano la scala originale anche nella finestra
// bassa: image() non deve adattare automaticamente la fotografia a quell'altezza.
#import "pagine.typ": pagina-documentaria
#import "editoriale.typ": dettaglio-editoriale
#let dettaglio(file, width: 100pt, height: 54pt,
  originale-width: 100pt, originale-height: 100pt,
  dx: 0pt, dy: 0pt, alt: none) = box(width: width, height: height, clip: true,
  align(top + left,
    move(dx: dx, dy: dy, image(file, width: originale-width,
      height: originale-height, fit: "contain", alt: alt))))

// Una pagina ordinaria senza fascia delle note, riservata ai documenti autonomi.
// Il contenuto è composto nel flusso: nessuna coordinata per righe o didascalie.
#let tavola-documentaria = pagina-documentaria

// I dettagli di uno stesso documento non aumentano il progressivo delle figure.
// La didascalia rimanda alla figura completa mediante il suo riferimento nativo.
#let campione-storico(titolo: [], didascalia: [], corpo) = dettaglio-editoriale(
  titolo: titolo, didascalia: [*Campione storico* — #didascalia], corpo)
