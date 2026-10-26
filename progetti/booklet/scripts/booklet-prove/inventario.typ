// Dati pubblici del layout, senza dipendere da folio o posizioni prefissate.
#let posizione(loc) = {
  let p = loc.position()
  (pagina: p.page, x: p.x / 1pt, y: p.y / 1pt)
}

#let inventario() = {
  let voci = query(<booklet-note-entry>)
  let ancore-figure = query(<booklet-figure-anchor>) + query(<booklet-figure-block-anchor>)
  let piedi = query(<booklet-didascalia-al-piede>)
  let pagine-caption = piedi.map(m => m.location().page())
  let note-originali = query(footnote).filter(n => type(n.body) != label)
  let regioni-note = query(<booklet-note-region>)
  let visuale-figura(f) = {
    let ancore = ancore-figure.filter(m => m.value == f.location())
    if ancore.len() > 0 { posizione(ancore.first().location()) }
      else { posizione(f.location()) }
  }
  (
    capitoli: query(heading.where(level: 1)).len(),
    aperture: query(<booklet-apertura>).map(m => (
      numero: m.value.numero, titolo: m.value.titolo, serie: m.value.serie,
      pagina: m.location().page(),
    )),
    // Il titolo editoriale è unico anche quando APA usa più intervalli nativi.
    bibliografie: query(<booklet-bibliografia>).len(),
    bibliografie_native: query(bibliography).len(),
    parti_bibliografiche_attese: query(<booklet-bibliografia>)
      .fold(0, (totale, m) => totale + m.value.parti),
    citazioni: query(cite).map(c => (
      chiave: str(c.key), forma: c.form, pagina: c.location().page(),
      capitolo: counter(heading).at(c.location()).first(),
    )),
    figure: query(figure.where(kind: image)).map(f => (
      pagina: f.location().page(),
      numero: counter(figure.where(kind: image)).at(f.location()).first(),
      progressivo: numbering(f.numbering, ..counter(figure.where(kind: image)).at(f.location())),
      mobile: f.placement != none,
      ancore: ancore-figure.filter(m => m.value == f.location()).len(),
      visuale: visuale-figura(f),
    )),
    figure_nel_testo: query(<booklet-figura-nel-testo>).map(m => (
      figura: repr(m.value.figura), origine: posizione(m.location()),
      colonne: m.value.colonne, larghezza: m.value.larghezza / 1pt,
      altezza_visuale: m.value.altezza-visuale / 1pt,
      altezza_totale: m.value.altezza-totale / 1pt,
      fondo_corpo: m.value.fondo-corpo / 1pt,
    )),
    didascalie_separate: query(<booklet-didascalia-separata>).map(m => (
      figura: repr(m.value.figura), origine: posizione(m.location()),
      immagine: posizione(m.value.destinazione), folio: m.value.folio,
      folio_atteso: counter(page).at(m.value.destinazione).first(),
      miniatura: query(<booklet-miniatura-didascalia>)
        .filter(e => e.value.figura == m.value.figura).map(e => (
          origine: posizione(e.location()), larghezza: e.value.larghezza / 1pt,
          altezza: e.value.altezza / 1pt,
        )).first(),
      testo: query(<booklet-testo-didascalia>)
        .filter(e => e.value.figura == m.value.figura).map(e => (
          origine: posizione(e.location()), larghezza: e.value.larghezza / 1pt,
          altezza: e.value.altezza / 1pt,
        )).first(),
      divisorio: query(<booklet-divisorio-didascalia>)
        .filter(e => e.value.figura == m.value.figura).map(e => (
          origine: posizione(e.location()), larghezza: e.value.larghezza / 1pt,
          spessore: e.value.spessore / 1pt, distacco: e.value.distacco / 1pt,
        )).first(),
    )),
    didascalie_al_piede: piedi.map(m => (
      figura: repr(m.value.figura), origine: posizione(m.location()),
      altezza: m.value.altezza / 1pt, fondo: m.value.fondo / 1pt,
      riserva: m.value.riserva / 1pt, fondo_corpo: m.value.fondo_corpo / 1pt,
    )),
    figure_al_vivo: query(<booklet-figura-al-vivo>).map(m => (
      figura: repr(m.value.figura), origine: posizione(m.location()),
      rapporto: m.value.rapporto, ancoraggio: m.value.ancoraggio,
      native: query(m.value.figura).map(visuale-figura),
      logiche: query(m.value.figura).map(f => posizione(f.location())),
    )),
    esercizi: query(<booklet-esercizio>).map(m => (
      id: m.value.id, origine: posizione(m.location()),
      y_fondo: (m.location().position().y - m.value.rispetto) / 1pt,
      accento: m.value.accento.to-hex(),
    )),
    sfondi_esercizi: query(<booklet-esercizio-sfondo>).map(m => (
      id: m.value.id, pagina: m.location().page(),
      dichiarata: m.value.pagina, ancora: m.value.ancora,
    )),
    fine_esercizi: query(<booklet-esercizio-fine>).map(m => (
      id: m.value.id, origine: posizione(m.location()),
    )),
    note: note-originali.map(n => {
      let pagina = n.location().page()
      let indice = note-originali.filter(o => o.location().page() == pagina)
        .position(o => o.location() == n.location())
      let regioni = regioni-note.filter(m => m.location().page() == pagina and m.value.indice == indice)
      (
      pagina: n.location().page(),
      capitolo: counter(heading).at(n.location()).first(),
      richiamo: repr(numbering(n.numbering, ..counter(footnote).at(n.location()))),
      origine: posizione(n.location()), corpo: repr(n.body),
      voci: voci.filter(m => m.value == n.location()).map(m => posizione(m.location())),
      // La quota proviene dalla voce realmente composta, senza una nuova misura
      // fuori dal contesto di layout della pagina.
      altezza: if pagina in pagine-caption and regioni.len() == 1 {
        regioni.first().value.altezza_voce / 1pt
      } else { none },
      )
    }),
    ripetute: query(footnote).filter(n => type(n.body) == label).len(),
    ripetizioni: query(footnote).filter(n => type(n.body) == label).map(n => {
      let originale = query(n.body).first()
      (origine: posizione(n.location()),
        etichetta: repr(n.body),
        capitolo: counter(heading).at(n.location()).first(),
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
    documenti_doppi: query(<booklet-documento-doppio>).map(m => (
      id: m.value.id, lato: m.value.lato, pagine: m.value.pagine,
      pagina: m.location().page(), dichiarata: m.value.pagina,
      x: m.value.x / 1pt, y: m.value.y / 1pt,
      larghezza: m.value.larghezza / 1pt, altezza: m.value.altezza / 1pt,
      scala: m.value.scala, dimensioni_fonte: m.value.dimensioni-fonte,
      figura: query(label(m.value.id)).map(f => posizione(f.location())),
    )),
    paragrafi: query(<booklet-prova-paragrafo>).map(m => m.value),
    flusso_al_vivo: query(<booklet-prova-flusso-al-vivo>).map(m => (
      fase: m.value.fase, indice: m.value.indice, ..posizione(m.location()),
    )),
  )
}
