// Dati pubblici del layout, senza dipendere da folio o posizioni prefissate.
#let posizione(loc) = {
  let p = loc.position()
  (pagina: p.page, x: p.x / 1pt, y: p.y / 1pt)
}

#let inventario() = {
  let voci = query(<booklet-note-entry>)
  let ancore-figure = query(<booklet-figure-anchor>)
  (
    capitoli: query(heading.where(level: 1)).len(),
    // Il titolo editoriale è unico anche quando APA usa più intervalli nativi.
    bibliografie: query(<booklet-bibliografia>).len(),
    bibliografie_native: query(bibliography).len(),
    parti_bibliografiche_attese: query(<booklet-bibliografia>)
      .fold(0, (totale, m) => totale + m.value.parti),
    figure: query(figure.where(kind: image)).map(f => (
      pagina: f.location().page(),
      numero: counter(figure.where(kind: image)).at(f.location()).first(),
      progressivo: numbering(f.numbering, ..counter(figure.where(kind: image)).at(f.location())),
      mobile: f.placement != none,
      ancore: ancore-figure.filter(m => m.value == f.location()).len(),
    )),
    note: query(footnote).filter(n => type(n.body) != label).map(n => (
      pagina: n.location().page(),
      origine: posizione(n.location()), corpo: repr(n.body),
      voci: voci.filter(m => m.value == n.location()).map(m => posizione(m.location())),
    )),
    ripetute: query(footnote).filter(n => type(n.body) == label).len(),
    ripetizioni: query(footnote).filter(n => type(n.body) == label).map(n => {
      let originale = query(n.body).first()
      (origine: posizione(n.location()),
        voci: voci.filter(m => m.value == originale.location()).map(m => posizione(m.location())))
    }),
    voci: voci.len(),
    regioni: query(<booklet-note-region>).map(m => (
      pagina: m.location().page(), dichiarata: m.value.pagina,
      note: m.value.note, indice: m.value.indice,
      larghezza: m.value.larghezza / 1pt,
      altezza: m.value.altezza / 1pt, spazio: m.value.spazio / 1pt,
    )),
    sagome: query(<booklet-sagoma-doppia>).map(m => (
      id: m.value.id, lato: m.value.lato, pagine: m.value.pagine, pagina: m.location().page(),
      x: m.value.x / 1pt, y: m.value.y / 1pt,
      larghezza: m.value.larghezza / 1pt, altezza: m.value.altezza / 1pt,
      figura: query(label(m.value.id)).map(f => posizione(f.location())),
    )),
    paragrafi: query(<booklet-prova-paragrafo>).map(m => m.value),
  )
}
