// Catalogo del capitolo: testi, originali ed esportazioni restano separati.
// Il codice conserva il numero della fonte Figma; il progressivo stampato
// appartiene invece al contatore nativo del nuovo capitolo.
#import "geometria.typ": gabbia, colonna
#import "editoriale.typ": contenuto-didascalia
#import "documenti.typ": dettaglio
#import "documenti-doppi.typ": documentario-doppia
#import "figure.typ": figura-pagina

#let asset = json(path("/assets/images/figure/griglia/manifest.json")).immagini
#let catalogo = json(path("/assets/dati/figure/griglia/figure.json"))

#let dati-figura(codice) = {
  let codice = str(codice)
  let immagine = asset.find(voce => voce.codice == codice)
  assert(immagine != none, message: "Asset della figura Griglia " + codice + " mancante.")
  assert(codice in catalogo, message: "Testi della figura Griglia " + codice + " mancanti.")
  let testi = catalogo.at(codice)
  // Gli stili sono dati dichiarati: si compongono segmenti di testo nativi,
  // senza interpretare stringhe del catalogo come codice Typst.
  let didascalia = if "didascalia_rich" in testi {
    testi.didascalia_rich.map(segmento =>
      if segmento.corsivo { emph(segmento.testo) } else { segmento.testo }).join()
  } else { testi.didascalia }
  // Le integrazioni storiche dichiarano una fonte separata dalla caption:
  // la citazione resta nativa, senza inserire codice nelle stringhe JSON.
  if "fonte_bibliografica" in testi {
    didascalia = [#didascalia #cite(label(testi.fonte_bibliografica))]
  }
  (id: "fig-griglia-" + codice, file: path("/" + immagine.percorso),
    asset: immagine, didascalia: didascalia,
    diritti: testi.at("diritti", default: none), alt: testi.alt)
}

// Le figure strette conservano la colonna originale; i diagrammi larghi
// usano la gabbia comune senza ridurre le etichette a una miniatura.
// pagina è riservato agli inserti autonomi attestati nella fonte.
// placement: none si usa nei contenitori che forniscono già la gabbia intera.
#let figura-griglia(codice, pagina: false, didascalia: none, placement: top) = {
  let dati = dati-figura(codice)
  // Le formule delle didascalie restano contenuti Typst nel capitolo;
  // il catalogo conserva la trascrizione originale e l'alternativa testuale.
  let didascalia = if didascalia == none { dati.didascalia } else { didascalia }
  assert(dati.asset.tipo != "doppia",
    message: "La figura " + str(codice) + " richiede doppia-griglia.")
  if pagina {
    return figura-pagina(id: dati.id, file: dati.file, didascalia: didascalia,
      diritti: dati.diritti, alt: dati.alt)
  }
  let stretto = dati.asset.at("dimensioni_figma_pt", default: (388.35, 0)).at(0) < 200
  let larghezza = if stretto { colonna } else { gabbia }
  let visuale = if str(codice) == "371" { [
    // Conserva il diagramma originale; la sua equazione è ricomposta nativamente.
    #dettaglio(dati.file, width: larghezza, height: larghezza * 170 / 389,
      originale-width: larghezza, originale-height: larghezza * 220 / 389,
      alt: dati.alt)
    $ c = (W - L - R - (n - 1) g) / n $
  ] } else if str(codice) == "391" { [
    #image(dati.file, width: larghezza, alt: dati.alt)
    #v(8pt)
    // È lo stesso crop normalizzato dell'istanza Figma, sullo stesso originale.
    // Il dettaglio non crea un altro numero di figura o un secondo file raster.
    #dettaglio(dati.file, width: larghezza, height: larghezza * 133 / 388.35,
      originale-width: larghezza / 0.48,
      originale-height: larghezza / 0.48 * 684 / 2000,
      dx: -0.02 * larghezza / 0.48,
      dy: -0.12 * larghezza / 0.48 * 684 / 2000,
      alt: "Dettaglio della stessa opera di April Greiman: pixel, immagine e segni.")
  ] } else if dati.asset.tipo == "documento" {
    let rapporto = dati.asset.dimensioni_px.at(0) / dati.asset.dimensioni_px.at(1)
    align(center, image(dati.file, width: calc.min(larghezza, 320pt * rapporto), alt: dati.alt))
  } else {
    image(dati.file, width: larghezza, alt: dati.alt)
  }
  [#figure(visuale, kind: image, placement: placement,
    scope: if stretto or placement == none { "column" } else { "parent" },
    caption: contenuto-didascalia(didascalia, diritti: dati.diritti))#label(dati.id)]
}

// Due pagine della stessa figura, con didascalia comune e parità verificata.
#let doppia-griglia(codice, sinistra: [], destra: []) = {
  let dati = dati-figura(codice)
  assert(dati.asset.tipo == "doppia",
    message: "La figura " + str(codice) + " non è una doppia pagina.")
  documentario-doppia(id: dati.id, file: dati.file,
    dimensioni: dati.asset.dimensioni_px,
    didascalia: dati.didascalia, diritti: dati.diritti, alt: dati.alt,
    sinistra: sinistra, destra: destra)
}
