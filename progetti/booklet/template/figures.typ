// Shared image composition and caption placement. Geometry belongs to the image,
// while Typst remains responsible for prose, numbering and cross-references.

#import "editorial.typ": caption as draw-caption, caption-content, arabic-folio, editorial-detail
#import "pages.typ": floating-plate, floating-full-bleed-page
#import "geometry.typ": (body-height, footnote-space, footnote-gap, grid-width,
  page-width, page-height, grid-bottom, ink, column-width, outer-margin)
#import "footnotes.typ": reference-only
#import "text-wrap.typ": wrap-image, drop-cap
#import "spreads.typ": regional-wrap, page-wrap, document-spread, image-spread

// Size an image and its caption together in one or two columns.
#let floating-document(file, caption, rights: none, alt: none,
  height: 250pt, aspect-ratio: 1, reserve: 9pt, columns: 2, constrain: false,
  tag: none) = {
  assert(columns in (1, 2), message: "Inline figures use one or two columns.")
  if constrain {
    context {
      let available-width = if columns == 1 { column-width } else { grid-width }
      let previous = counter(figure.where(kind: image)).get().first()
      let cap = caption-content(caption, rights: rights)
      let caption-probe = block(width: available-width)[
        #show footnote: reference-only
        #draw-caption(cap,
          prefix: [Figura #numbering(figure.numbering, previous + 1)])
      ]
      // Probe references only: measuring a caption must not create notes.
      let caption-height = measure(caption-probe, width: available-width).height
      let limit = calc.min(height, body-height - caption-height - reserve)
      assert(limit > 0pt, message: "The caption leaves no room for the image.")
      let width = calc.min(available-width, limit * aspect-ratio)
      let natural-height = width / aspect-ratio
      let total-height = natural-height + caption-height + 8pt
      let group = block(width: available-width, height: total-height,
        above: 0pt, below: 0pt, breakable: false)[
        #metadata(("figura": tag, "colonne": columns,
          "larghezza": width, "altezza-visuale": natural-height,
          "altezza-totale": total-height,
          fondo-corpo: grid-bottom - footnote-space - footnote-gap)) <booklet-figura-nel-testo>
        #set figure(gap: 8pt)
        #figure(
          block(width: available-width, height: natural-height,
            above: 0pt, below: 0pt, breakable: false)[
            #align(center, image(file, width: width,
              height: natural-height, alt: alt))
          ],
          kind: image, supplement: [Figura], placement: none, caption: cap,
        )
        #if tag != none { tag }
      ]
      if columns == 1 {
        block(width: 0pt, height: 1pt, above: 0pt, below: 0pt)[
          #rect(width: 0pt, height: 1pt, fill: none, stroke: none)
        ]
        group
      } else {
        place(top, scope: "parent", float: true, clearance: 8pt, group)
      }
    }
  } else {
    figure(
      layout(space => context {
        let width = calc.min(space.width, height * aspect-ratio)
        image(file, width: width, alt: alt)
      }),
      kind: image, supplement: [Figura], placement: top,
      scope: if columns == 1 { "column" } else { "parent" },
      caption: caption-content(caption, rights: rights),
    )
  }
}

// Measure a proportional thumbnail beside a caption on a separate page.
#let separate-caption(file, caption, tag, alt: none, rights: none,
  aspect-ratio: 17 / 24) = block(
  breakable: false, above: 0pt, below: 0pt,
)[
  #set text(size: 9pt, weight: 300, variations: (opsz: 9))
  #set par(justify: false, leading: 1.8pt, spacing: 0pt)
  #layout(space => context {
    let content = [
      #text(weight: 500, variations: (opsz: 14))[
        #ref(tag)
      ]
      #linebreak()
      #caption-content(caption, rights: rights)
      #v(3pt)
      #text(weight: 500, variations: (opsz: 14))[
        #context {
          let figure-item = query(tag).first()
          let anchors = query(selector(<booklet-figure-anchor>)
            .and(metadata.where(value: figure-item.location())))
          let destination = if anchors.len() > 0 { anchors.first().location() }
            else { figure-item.location() }
          let number = counter(page).at(destination).first()
          let folio = arabic-folio(number)
          link(destination, box[#metadata(("figura": tag,
            "destinazione": destination, folio: number))<booklet-didascalia-separata>Nella pagina successiva · p. #folio →])
        }
      ]
    ]
    let height = 0pt
    let text-width = space.width - 3mm
    let converged = false
    let measurement = { show footnote: reference-only; content }
    // Thumbnail width and caption height depend on each other; iterate to convergence.
    for _ in range(12) {
      text-width = space.width - 3mm - height * aspect-ratio
      assert(text-width > space.width / 2,
        message: "The full-bleed caption is too long for a proportional thumbnail.")
      let updated = measure(measurement, width: text-width).height
      if calc.abs(updated - height) < 0.01pt { converged = true; break }
      height = updated
    }
    let width = height * aspect-ratio
    assert(converged and calc.abs(measure(measurement, width: text-width).height - height) < 0.01pt,
      message: "The full-bleed caption measurement does not converge.")
    [#metadata(("figura": tag, "larghezza": space.width,
      "spessore": 0.4pt, "distacco": 8pt))<booklet-divisorio-didascalia>]
    rect(width: space.width, height: 0.4pt,
      fill: ink, stroke: none)
    v(8pt, weak: false)
    grid(columns: (width, text-width), column-gutter: 3mm, align: top,
      block(width: width, height: height, above: 0pt, below: 0pt)[
        #metadata(("figura": tag, "larghezza": width, "altezza": height))
          <booklet-miniatura-didascalia>
        #link(tag, image(file, width: width, height: height, alt: alt))
      ],
      block(width: text-width, height: height, above: 0pt, below: 0pt)[
        #metadata(("figura": tag, "larghezza": text-width, "altezza": height))
          <booklet-testo-didascalia>
        #content
      ],
    )
  })
]

// Anchor the complete caption group near the bottom of the preceding page.
#let bottom-caption(file, caption, tag, alt: none, rights: none,
  aspect-ratio: 17 / 24) = {
  [#metadata(tag) <booklet-al-vivo-flusso>]
  place(bottom, scope: "parent", float: true, clearance: 0pt)[
    #layout(space => context {
      let caption-box = block(width: grid-width, above: 0pt, below: 0pt)[
        #separate-caption(file, caption, tag, alt: alt, rights: rights,
          aspect-ratio: aspect-ratio)
      ]
      let measurement = { show footnote: reference-only; caption-box }
      let height = measure(measurement, width: grid-width).height
      let reserve = height + footnote-gap
      block(width: grid-width, height: reserve, above: 0pt, below: 0pt)[
        #let bottom-value = grid-bottom
        #let region-bottom = page-height - page.margin.bottom
        #place(top + left, dy: bottom-value - height - region-bottom + reserve)[
            #block(width: grid-width, height: height, above: 0pt, below: 0pt)[
              #metadata(("figura": tag, "altezza": height, "fondo": bottom-value,
                "riserva": reserve,
                fondo_corpo: bottom-value - footnote-space - footnote-gap - reserve))
                <booklet-didascalia-al-piede>
              #caption-box
            ]
        ]
      ]
    })
  ]
}

// Float a caption followed by its full-bleed image as one editorial sequence.
#let full-bleed-image(file, caption, tag, alt, rights: none,
  aspect-ratio: 17 / 24, anchor: (0.5, 0.5), crop: true) = {
  if caption != none {
    bottom-caption(file, caption, tag, alt: alt, rights: rights,
      aspect-ratio: aspect-ratio)
  }
  floating-full-bleed-page[
    #metadata(("figura": tag, "rapporto": aspect-ratio, "ancoraggio": anchor,
      "rifilo": crop))
      <booklet-figura-al-vivo>
    #context [#metadata(query(tag).first().location()) <booklet-figure-anchor>]
    #figure(
      block(width: page-width, height: page-height, clip: true)[
        #let width = if crop {
          calc.max(page-width, page-height * aspect-ratio)
        } else {
          calc.min(page-width, page-height * aspect-ratio)
        }
        #let height = width / aspect-ratio
        #place(top + left,
          dx: (page-width - width) * anchor.at(0),
          dy: (page-height - height) * anchor.at(1),
          image(file, width: width, height: height, alt: alt))
      ],
      caption: none, placement: none,
    )
    #tag
  ]
}

// Reserve one documentary plate and measure its caption at the actual type size.
#let compose-page-figure(id: none, file: none, caption: [], rights: none, alt: none,
  aspect-ratio: none) = {
  assert(type(id) == str and id != "", message: "Assign a unique figure ID.")
  floating-plate[
    #layout(space => context {
      let content-value = caption-content(caption, rights: rights)
      let number = counter(figure.where(kind: image)).get().first() + 1
      let caption-measurement = block(width: space.width,
        draw-caption(content-value, prefix: [Figura #numbering(figure.numbering, number)]))
      let height = space.height - measure(caption-measurement).height - figure.gap
      assert(height > 100pt, message: "The caption is too long for the dedicated page.")
      [#metadata(id) <booklet-figura-pagina>]
      let visual = if aspect-ratio == none {
        image(file, width: space.width, height: height, fit: "contain", alt: alt)
      } else {
        block(width: space.width, height: height)[
          #align(bottom + center,
            image(file, width: calc.min(space.width, height * aspect-ratio), alt: alt))
        ]
      }
      [#figure(visual, caption: content-value, kind: image)#label(id)]
    })
  ]
}

// Extend an ordinary figure to the outer trim edge on its actual physical page.
// The caption stays inside the text grid and the image keeps its proportions.
#let outer-bleed-figure(file, caption, rights: none, alt: none, width: none,
  height: none, ..placement-options) = figure(
  layout(space => context {
    let width = if width == none { grid-width + outer-margin } else { width }
    let natural = measure(image(file))
    let caption-probe = block(width: grid-width)[
      #show footnote: reference-only
      #draw-caption(caption-content(caption, rights: rights),
        prefix: [Figura #counter(figure.where(kind: image)).display(figure.numbering)])
    ]
    let caption-height = measure(caption-probe, width: grid-width).height
    let available-height = body-height - caption-height - figure.gap - 9pt
    let height-limit = if height == none { available-height }
      else { calc.min(height, available-height) }
    assert(height-limit > 0pt, message: "The caption leaves no room for the outer-bleed image.")
    let fitted-width = calc.min(width, height-limit * (natural.width / natural.height))
    let visual = image(file, width: fitted-width, alt: alt)
    let dimensions = measure(visual)
    let offset = if calc.odd(here().page()) {
      grid-width + outer-margin - dimensions.width
    } else { -outer-margin }
    block(width: grid-width, height: dimensions.height, above: 0pt, below: 0pt)[
      #metadata(("pagina": here().page(), x: offset,
        "larghezza": dimensions.width, "altezza": dimensions.height)) <booklet-al-vivo-esterno>
      #place(top + left, dx: offset, visual)
    ]
  }),
  kind: image, ..placement-options,
  caption: caption-content(caption, rights: rights))

// All image types share one public API. The chapter owns the format, asset,
// caption, rights and alt text; specialised engines only compose those inputs.
// Type names follow the editorial vocabulary used by the chapter authors.
#let image-figure(file, caption, format: "una-colonna", rights: none, alt: none,
  width: none, id: none, height: none, aspect-ratio: none, constrain: true,
  anchor: (0.5, 0.5), crop: true, ..format-options) = context {
  assert(format in ("una-colonna", "due-colonne", "tutta-pagina", "al-vivo",
    "al-vivo-esterno", "sagoma", "sagoma-pagina", "sagoma-doppia",
    "doppia-pagina", "capolettera"),
    message: "Unknown figure format: " + str(format) + ".")
  if id != none {
    [#metadata((id: id, "formato": format)) <booklet-formato-figura>]
  }
  let size-options = if width == none { (:) } else { (width: width) }
  if format == "sagoma" {
    return wrap-image(id: id, file: file, caption: caption, rights: rights,
      alt: alt, ..size-options, ..format-options)
  }
  if format in ("sagoma-pagina", "sagoma-doppia") {
    let content-value = if rights == none { caption }
      else { caption-content(caption, rights: rights) }
    if format == "sagoma-pagina" {
      return page-wrap(id: id, file: file, caption: content-value,
        alt: alt, ..size-options, ..format-options)
    }
    return regional-wrap(id: id, file: file, caption: content-value,
      alt: alt, ..size-options, ..format-options)
  }
  if format == "doppia-pagina" {
    return document-spread(id: id, file: file, caption: caption,
      rights: rights, alt: alt, ..format-options)
  }
  if format == "capolettera" {
    assert(caption == none and rights == none,
      message: "Illustrated initials do not have a numbered caption or rights line.")
    return drop-cap(id: id, file: file, ..size-options, ..format-options)
  }
  let placement-options = format-options.named()
  if "scope" not in placement-options {
    placement-options.insert("scope", if format == "una-colonna" or placement-options.at("placement", default: figure.placement) == none { "column" } else { "parent" })
  }
  if format == "al-vivo-esterno" {
    let visual = outer-bleed-figure(file, caption, rights: rights,
      alt: alt, width: width, height: height, ..placement-options)
    return if id == none { visual } else { [#visual#label(id)] }
  }
  if format in ("una-colonna", "due-colonne") and height == none {
    let visual = figure(image(file, width: if width == none { 100% } else { width },
      alt: alt), ..placement-options, caption: caption-content(caption, rights: rights))
    return if id == none { visual } else { [#visual#label(id)] }
  }
  assert(format-options.pos().len() == 0, message: "This image format does not accept a text body.")
  let ratio = if aspect-ratio != none { aspect-ratio } else {
    let natural = measure(image(file))
    natural.width / natural.height
  }
  assert(ratio > 0, message: "The image aspect ratio must be positive.")
  if format in ("una-colonna", "due-colonne") and not constrain {
    let visual = floating-document(file, caption, rights: rights, alt: alt,
      height: height, aspect-ratio: ratio,
      columns: if format == "una-colonna" { 1 } else { 2 })
    return if id == none { visual } else { [#visual#label(id)] }
  }
  assert(type(id) == str and id != "", message: "Assign a unique figure ID.")
  if format in ("una-colonna", "due-colonne") {
    floating-document(file, caption, rights: rights, alt: alt,
      aspect-ratio: ratio, height: height, constrain: true, tag: label(id),
      columns: if format == "una-colonna" { 1 } else { 2 })
  } else if format == "tutta-pagina" {
    compose-page-figure(id: id, file: file, caption: caption,
      rights: rights, alt: alt, aspect-ratio: ratio)
  } else {
    full-bleed-image(file, caption, label(id), alt,
      rights: rights, aspect-ratio: ratio, anchor: anchor, crop: crop)
  }
}

// Crop the original image at an explicit scale without creating another raster asset.
#let image-crop(file, width: 100pt, height: 54pt,
  source-width: 100pt, source-height: 100pt,
  dx: 0pt, dy: 0pt, alt: none) = box(width: width, height: height, clip: true,
  align(top + left,
    move(dx: dx, dy: dy, image(file, width: source-width,
      height: source-height, fit: "contain", alt: alt))))

// Native specimen bands and linked details share the figure API.
// Callers retain the examples, captions, rights and figure labels.
#let specimen(title: [], caption: [], rights: none, band-height: 54pt, body) = figure([
  #set par(justify: false, leading: 2pt, spacing: 0pt)
  #align(left, text(size: 10pt, weight: 500, title))
  #v(4pt)
  #box(width: 100%, height: band-height, align(center + horizon, body))
], kind: image, placement: none, caption: caption-content(caption, rights: rights))

#let font-specimen(file, title: [], width: 70pt, top-offset: 0pt,
  caption: [], rights: none, alt: none) = specimen(
  title: title, caption: caption, rights: rights,
)[
  #box(width: 100%, height: 54pt)[
    #place(top + center, dy: top-offset, image(file, width: width, alt: alt))
  ]
]

// Keep related examples together without adding a second figure counter.
#let keep-together(body, columns: 2) = {
  assert(columns in (1, 2), message: "A comparison uses one or two columns.")
  let group = block(width: if columns == 1 { column-width } else { grid-width }, breakable: false)[
    #set figure(placement: none, scope: "column")
    #body
  ]
  if columns == 1 {
    context {
      let height = measure({ show footnote: reference-only; group }, width: column-width).height
      block(width: 0pt, height: 1pt, above: 0pt, below: 0pt)[
        #rect(width: 0pt, height: 1pt, fill: none, stroke: none)
      ]
      block(width: column-width, height: height, above: 0pt, below: 0pt,
        breakable: false, group)
    }
  } else {
    place(top, scope: "parent", float: true, group)
  }
}

#let specimen-row(cells, gap: 14.17pt) = {
  assert(cells.len() > 0, message: "A specimen row requires at least one example.")
  grid(
    columns: (1fr,) * cells.len(), column-gutter: gap, row-gutter: 4pt,
    ..cells.map(cell => block[
      #set text(size: 10pt, weight: 500)
      #set par(justify: false, leading: 2pt, spacing: 0pt)
      #cell.titolo
    ]),
    ..cells.map(cell => box(height: 54pt,
      align(left + horizon, cell.visuale))),
  )
}

#let figure-detail(title: [], reference: none, caption: [], body) = {
  assert(type(reference) == label,
    message: "A detail requires the label of the complete figure.")
  editorial-detail(title: title,
    caption: [Dettaglio della #ref(reference) — #caption], body)
}
