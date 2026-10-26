// Catalogo del capitolo: testi, originali ed esportazioni restano separati.
// Il codice conserva il numero della fonte Figma; il progressivo stampato
// appartiene invece al contatore nativo del nuovo capitolo.
#import "geometria.typ": gabbia, colonna
#import "editoriale.typ": contenuto-didascalia, didascalia as componi-didascalia
#import "documenti.typ": dettaglio
#import "documenti-doppi.typ": documentario-doppia
#import "figure.typ": figura-pagina, figura-al-vivo, figura-nel-testo

#let asset = json(path("/risorse-condivise/immagini/figure/griglia/manifest.json")).immagini
#let catalogo = json(path("/risorse-condivise/dati/figure/griglia/figure.json"))

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
// pagina comprende gli inserti documentari e i diagrammi ampi selezionati.
// placement: none si usa nei contenitori che forniscono già la gabbia intera.
#let figura-griglia(codice, pagina: false, al-vivo: false, rifilo: true,
  didascalia: none, placement: top, colonne: auto, altezza: none) = {
  let codice = str(codice)
  assert(colonne == auto or colonne in (1, 2), message: "Usare una o due colonne per la figura Griglia.")
  assert(not (pagina and al-vivo), message: "Scegliere un solo formato per la figura Griglia.")
  let dati = dati-figura(codice)
  let rapporto = dati.asset.dimensioni_px.at(0) / dati.asset.dimensioni_px.at(1)
  // Le formule delle didascalie restano contenuti Typst nel capitolo;
  // il catalogo conserva la trascrizione originale e l'alternativa testuale.
  let didascalia = if didascalia == none { dati.didascalia } else { didascalia }
  assert(dati.asset.tipo != "doppia",
    message: "La figura " + str(codice) + " richiede doppia-griglia.")
  if al-vivo {
    return figura-al-vivo(id: dati.id, file: dati.file, didascalia: didascalia,
      diritti: dati.diritti, alt: dati.alt,
      rapporto: rapporto, rifilo: rifilo)
  }
  if pagina {
    return figura-pagina(id: dati.id, file: dati.file, didascalia: didascalia,
      diritti: dati.diritti, alt: dati.alt,
      rapporto: rapporto)
  }
  let stretto = if colonne == auto {
    dati.asset.at("dimensioni_figma_pt", default: (388.35, 0)).at(0) < 200
  } else { colonne == 1 }
  let larghezza = if stretto { colonna } else { gabbia }
  if codice == "2024-105-responsive-adaptive" and altezza != none {
    // Il taglio è nel vuoto fra testo e pittogrammi: tutti i segni dell'originale
    // restano visibili in due fasce leggibili, senza riservare un foglio intero.
    let scala = gabbia / 790
    let superiore = 590 * scala
    let inferiore = 523 * scala
    [#figure(dettaglio(dati.file, width: gabbia, height: superiore,
      originale-width: gabbia, originale-height: 1113 * scala, alt: dati.alt),
      kind: image, placement: top, scope: "parent",
      caption: contenuto-didascalia(didascalia, diritti: dati.diritti))#label(dati.id)]
    place(top, scope: "parent", float: true, clearance: 8pt)[
      #block(width: gabbia, breakable: false)[
        #dettaglio(dati.file, width: gabbia, height: inferiore,
          originale-width: gabbia, originale-height: 1113 * scala,
          dy: -superiore,
          alt: "Parte inferiore della stessa infografica: griglie fluide, layout predefiniti, client side e server side.")
        #v(8pt)
        #componi-didascalia([Continuazione dell’infografica: parte inferiore.],
          prefisso: ref(label(dati.id)))
      ]
    ]
    return
  }
  if altezza != none {
    return figura-nel-testo(id: dati.id, file: dati.file,
      didascalia: didascalia, diritti: dati.diritti, alt: dati.alt,
      rapporto: rapporto, colonne: if stretto { 1 } else { 2 }, altezza: altezza)
  }
  let visuale = if codice == "371" { [
    // Conserva il diagramma originale; la sua equazione è ricomposta nativamente.
    #dettaglio(dati.file, width: larghezza, height: larghezza * 170 / 389,
      originale-width: larghezza, originale-height: larghezza * 220 / 389,
      alt: dati.alt)
    $ c = (W - L - R - (n - 1) g) / n $
  ] } else if codice == "391" { [
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
