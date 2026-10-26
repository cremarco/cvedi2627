// Dati pubblici del layout, senza dipendere da folio o posizioni prefissate.
#let position-options(loc) = {
  let p = loc.position()
  ("pagina": p.page, x: p.x / 1pt, y: p.y / 1pt)
}

#let inventory() = {
  let entries = query(<booklet-note-entry>)
  let ancore-figure = query(<booklet-figure-anchor>) + query(<booklet-figure-block-anchor>)
  let bottom-captions = query(<booklet-didascalia-al-piede>)
  let caption-pages = bottom-captions.map(m => m.location().page())
  let original-notes = query(footnote).filter(n => type(n.body) != label)
  let note-regions = query(<booklet-note-region>)
  let visuale-figura(f) = {
    let anchors = ancore-figure.filter(m => m.value == f.location())
    if anchors.len() > 0 { position-options(anchors.first().location()) }
      else { position-options(f.location()) }
  }
  (
    "capitoli": query(heading.where(level: 1)).len(),
    aperture: query(<booklet-apertura>).map(m => (
      "numero": m.value.numero, "titolo": m.value.titolo, serie: m.value.serie,
      "pagina": m.location().page(),
    )),
    // Il titolo editoriale è unico anche quando APA usa più intervalli nativi.
    "bibliografie": query(<booklet-bibliografia>).len(),
    bibliografie_native: query(bibliography).len(),
    parti_bibliografiche_attese: query(<booklet-bibliografia>)
      .fold(0, (total-height, m) => total-height + m.value.parti),
    citazioni: query(cite).map(c => (
      "chiave": str(c.key), forma: c.form, "pagina": c.location().page(),
      "capitolo": counter(heading).at(c.location()).first(),
    )),
    "figure": query(figure.where(kind: image)).map(f => (
      "pagina": f.location().page(),
      "numero": counter(figure.where(kind: image)).at(f.location()).first(),
      progressivo: numbering(f.numbering, ..counter(figure.where(kind: image)).at(f.location())),
      mobile: f.placement != none,
      "ancore": ancore-figure.filter(m => m.value == f.location()).len(),
      "visuale": visuale-figura(f),
    )),
    figure_nel_testo: query(<booklet-figura-nel-testo>).map(m => (
      "figura": repr(m.value.figura), "origine": position-options(m.location()),
      "colonne": m.value.colonne, "larghezza": m.value.larghezza / 1pt,
      altezza_visuale: m.value.altezza-visuale / 1pt,
      altezza_totale: m.value.altezza-totale / 1pt,
      fondo_corpo: m.value.fondo-corpo / 1pt,
    )),
    didascalie_separate: query(<booklet-didascalia-separata>).map(m => (
      "figura": repr(m.value.figura), "origine": position-options(m.location()),
      "immagine": position-options(m.value.destinazione), folio: m.value.folio,
      folio_atteso: counter(page).at(m.value.destinazione).first(),
      miniatura: query(<booklet-miniatura-didascalia>)
        .filter(e => e.value.figura == m.value.figura).map(e => (
          "origine": position-options(e.location()), "larghezza": e.value.larghezza / 1pt,
          "altezza": e.value.altezza / 1pt,
        )).first(),
      "testo": query(<booklet-testo-didascalia>)
        .filter(e => e.value.figura == m.value.figura).map(e => (
          "origine": position-options(e.location()), "larghezza": e.value.larghezza / 1pt,
          "altezza": e.value.altezza / 1pt,
        )).first(),
      divisorio: query(<booklet-divisorio-didascalia>)
        .filter(e => e.value.figura == m.value.figura).map(e => (
          "origine": position-options(e.location()), "larghezza": e.value.larghezza / 1pt,
          "spessore": e.value.spessore / 1pt, "distacco": e.value.distacco / 1pt,
        )).first(),
    )),
    didascalie_al_piede: bottom-captions.map(m => (
      "figura": repr(m.value.figura), "origine": position-options(m.location()),
      "altezza": m.value.altezza / 1pt, "fondo": m.value.fondo / 1pt,
      "riserva": m.value.riserva / 1pt, fondo_corpo: m.value.fondo_corpo / 1pt,
    )),
    figure_al_vivo: query(<booklet-figura-al-vivo>).map(m => (
      "figura": repr(m.value.figura), "origine": position-options(m.location()),
      "rapporto": m.value.rapporto, "ancoraggio": m.value.ancoraggio,
      native: query(m.value.figura).map(visuale-figura),
      logiche: query(m.value.figura).map(f => position-options(f.location())),
    )),
    "esercizi": query(<booklet-esercizio>).map(m => (
      id: m.value.id, "origine": position-options(m.location()),
      y_fondo: (m.location().position().y - m.value.rispetto) / 1pt,
      "accento": m.value.accento.to-hex(),
    )),
    sfondi_esercizi: query(<booklet-esercizio-sfondo>).map(m => (
      id: m.value.id, "pagina": m.location().page(),
      dichiarata: m.value.pagina, ancora: m.value.ancora,
    )),
    fine_esercizi: query(<booklet-esercizio-fine>).map(m => (
      id: m.value.id, "origine": position-options(m.location()),
    )),
    note: original-notes.map(n => {
      let page-number = n.location().page()
      let index = original-notes.filter(o => o.location().page() == page-number)
        .position(o => o.location() == n.location())
      let regions = note-regions.filter(m => m.location().page() == page-number and m.value.indice == index)
      (
      "pagina": n.location().page(),
      "capitolo": counter(heading).at(n.location()).first(),
      "richiamo": repr(numbering(n.numbering, ..counter(footnote).at(n.location()))),
      "origine": position-options(n.location()), "corpo": repr(n.body),
      "voci": entries.filter(m => m.value == n.location()).map(m => position-options(m.location())),
      // La quota proviene dalla voce realmente composta, senza una nuova misura
      // fuori dal contesto di layout della pagina.
      "altezza": if page-number in caption-pages and regions.len() == 1 {
        regions.first().value.altezza_voce / 1pt
      } else { none },
      )
    }),
    ripetute: query(footnote).filter(n => type(n.body) == label).len(),
    ripetizioni: query(footnote).filter(n => type(n.body) == label).map(n => {
      let original = query(n.body).first()
      ("origine": position-options(n.location()),
        "etichetta": repr(n.body),
        "capitolo": counter(heading).at(n.location()).first(),
        "voci": entries.filter(m => m.value == original.location()).map(m => position-options(m.location())))
    }),
    "voci": entries.len(),
    "regioni": query(<booklet-note-region>).map(m => (
      "pagina": m.location().page(), dichiarata: m.value.pagina,
      note: m.value.note, "indice": m.value.indice,
      "larghezza": m.value.larghezza / 1pt,
      "altezza": m.value.altezza / 1pt, "spazio": m.value.spazio / 1pt,
    )),
    sagome: query(<booklet-sagoma-doppia>).map(m => (
      id: m.value.id, "lato": m.value.lato, "pagine": m.value.pagine, "pagina": m.location().page(),
      x: m.value.x / 1pt, y: m.value.y / 1pt,
      "larghezza": m.value.larghezza / 1pt, "altezza": m.value.altezza / 1pt,
      "figura": query(label(m.value.id)).map(f => position-options(f.location())),
    )),
    documenti_doppi: query(<booklet-documento-doppio>).map(m => (
      id: m.value.id, "lato": m.value.lato, "pagine": m.value.pagine,
      "pagina": m.location().page(), dichiarata: m.value.pagina,
      x: m.value.x / 1pt, y: m.value.y / 1pt,
      "larghezza": m.value.larghezza / 1pt, "altezza": m.value.altezza / 1pt,
      "scala": m.value.scala, dimensioni_fonte: m.value.dimensioni-fonte,
      "figura": query(label(m.value.id)).map(f => position-options(f.location())),
    )),
    paragrafi: query(<booklet-prova-paragrafo>).map(m => m.value),
    flusso_al_vivo: query(<booklet-prova-flusso-al-vivo>).map(m => (
      "fase": m.value.fase, "indice": m.value.indice, ..position-options(m.location()),
    )),
  )
}
