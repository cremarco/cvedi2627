// Shared page and spread composition for silhouettes and rectangular documents.
// Callers provide content and geometry; both paths retain native figure references.

#import "@preview/meander:0.4.4" as meander
#import "geometry.typ": (page-width, page-height, inner-margin, outer-margin,
  top-margin, grid-bottom, left-margin, footnote-space, footnote-gap,
  wrap-clearance, minimum-text-width, column-width, column-gutter, grid-width)
#import "editorial.typ": caption as print-caption, caption-content
#import "pages.typ": document-page
#import "footnotes.typ": (note-entry, compose-notes, note-separator,
  reference-only, note-reference as regular-reference)
#import "text-wrap.typ": profile-bands, left-alpha-edge, alpha-contour, reflow-around

// Place the page-local apparatus for any shaped text region.
#let wrap-note-entries(outer-notes: false) = meander.placed(top + left, boundary: meander.contour.phantom(), box(width: 0pt, height: 0pt)[
  #context {
    let page-number = here().page()
    let entry-width = if outer-notes { column-width } else { grid-width }
    let composition = compose-notes(page-number, width: entry-width)
    let note = composition.note
    if note.len() > 0 {
      let total-height = composition.totale
      place(top + left, dx: if outer-notes and calc.odd(page-number) { column-width + column-gutter } else { 0pt },
        dy: grid-bottom - top-margin - total-height,
        block(width: entry-width, height: total-height, above: 0pt, below: 0pt)[
          #note-separator(entry-width)
          #for (index, note-item) in note.enumerate() {
            [#metadata(("pagina": page-number, note: note.len(), "indice": index,
              "larghezza": entry-width, "altezza": total-height, "spazio": footnote-space)) <booklet-note-region>]
            note-entry(note-item, width: entry-width)
            if index + 1 < note.len() { v(composition.gap, weak: false) }
          }
        ])
    }
  }
])

// Let the two text blocks determine the minimum image position.
#let document-spread(id: none, file: none, dimensions: none,
  caption: [], rights: none, alt: none,
  left-body: [], right-body: [], minimum-y: 240pt) = {
  assert(type(id) == str and id != "", message: "A spread requires a unique ID.")
  assert(file != none and type(dimensions) == array and dimensions.len() == 2,
    message: "A spread requires an asset and its original width and height.")
  assert(dimensions.all(n => n > 0), message: "Spread dimensions must be positive.")
  pagebreak(to: "even", weak: true)
  context {
    let width = 2 * page-width
    let height = width * dimensions.at(1) / dimensions.at(0)
    let texts = (left-body, right-body)
    let text-heights = texts.map(content => measure(block(width: grid-width, content)).height)
    let y-position = calc.max(minimum-y, top-margin + calc.max(..text-heights) + 16pt)
    let caption-body = caption-content(caption, rights: rights)
    let number = counter(figure.where(kind: image)).get().first() + 1
    let caption-probe = print-caption(caption-body,
      prefix: [Figura #numbering(figure.numbering, number)])
    let caption-height = measure(caption-probe, width: grid-width).height
    let caption-y = y-position + height + 12pt
    assert(caption-y + caption-height <= grid-bottom,
      message: "Text and caption leave no room for the image on the spread.")
    for side in range(2) {
      document-page[
        #block(width: 100%, height: 100%, above: 0pt, below: 0pt)[
          #texts.at(side)
          #context {
            let page-number = here().page()
            assert(calc.even(page-number) == (side == 0),
              message: "A spread must have an even page on the left and an odd page on the right.")
            let page-left = left-margin(page-number)
            place(top + left, dx: -page-left - side * page-width,
              dy: y-position - top-margin,
              box(width: width, height: height)[
                #set align(left)
                #set block(spacing: 0pt)
                #if side == 0 {
                  [#figure(image(file, width: width, alt: alt),
                    kind: image, caption: none, placement: none)#label(id)]
                } else {
                  image(file, width: width,
                    alt: "Continuazione della stessa figura sulla pagina destra.")
                }
              ])
            place(top + left, dy: caption-y - top-margin,
              block(width: grid-width, above: 0pt, below: 0pt)[
                #if side == 0 {
                  print-caption(caption-body, prefix: ref(label(id)))
                } else {
                  print-caption([#ref(label(id)) · continua dalla pagina a fronte])
                }
              ])
            [#metadata((id: id, "lato": side, "pagine": 2, "pagina": page-number,
              x: -side * page-width, y: y-position,
              "larghezza": width, "altezza": height,
              "scala": width / (dimensions.at(0) * 1pt),
              dimensioni-fonte: dimensions)) <booklet-documento-doppio>]
          }
        ]
      ]
    }
  }
}

// Compose the shared silhouette, flowing text and footnotes across facing pages.
#let regional-wrap(
  id: none,
  file: none,
  profile: none,
  width: none,
  image-start: none,
  image-bottom: page-height,
  outer-notes: false,
  pages: 2,
  caption: none,
  alt: none,
  body,
) = {
  assert(type(id) == str and id != "",
    message: "Assign a unique, readable ID to the spread image.")
  assert(file != none, message: "Provide the transparent image with path().")
  let bands = profile-bands(profile)
  assert(type(width) == length and width > 0pt,
    message: "Provide a positive width for the shaped region.")
  assert(type(image-start) == length,
    message: "Provide the horizontal origin of the shaped image.")
  assert(pages in (1, 2), message: "A shaped region can occupy one or two pages.")
  let clearance = wrap-clearance
  let minimum = minimum-text-width
  let page-width-value = page-width
  let upper = top-margin
  let lower = grid-bottom - footnote-space - footnote-gap
  let body-height = lower - upper
  let image-height = width * profile.altezza_px / profile.larghezza_px
  let image-origin = image-start
  let remainder = state("booklet-doppia-resto-" + id, none)

  if pages == 2 { pagebreak(to: "even", weak: true) }
  else { pagebreak(weak: true) }

  let regions = {
    // Import only the layout primitives; wildcard imports can shadow local geometry.
    import meander: placed, container, content, opt, pagebreak
    for side in range(pages) {
      if side == 1 { pagebreak() }
      let margin = if side == 0 { outer-margin } else { inner-margin }
      let page-origin = side * page-width-value
      let grid-origin = if pages == 1 { 0pt } else { page-origin + margin }
      let image-x = image-origin - grid-origin
      let image-y = image-bottom - upper - image-height
      let columns = (
        (grid-origin, grid-origin + column-width),
        (grid-origin + column-width + column-gutter, grid-origin + grid-width),
      )

      let wrap-boundary = alpha-contour(bands, image-height, band => {
        if band == none {
          let outside = (2 * page-width-value + width - image-origin) / width
          return (outside, outside)
        }
        let sx = image-origin + band.first() * width - clearance
        let dx = image-origin + band.last() * width + clearance
        for (start, end) in columns {
          if dx > start and sx < end {
            if sx > start and sx - start < minimum { sx = start }
            if dx < end and end - dx < minimum { dx = end }
          }
        }
        ((sx - image-origin) / width,
          (dx - image-origin) / width)
      }) + meander.contour.margin(y: clearance)

      let visual = box(width: width, height: image-height)[
        #set align(left)
        #if side == 0 { [
          #figure(image(file, width: width, alt: alt), caption: none, kind: image, placement: none)
          #label(id)
        ] } else {
          image(file, width: width,
            alt: "Continuazione della stessa figura sulla pagina destra.")
        }
      ]
      placed(top + left, dx: image-x, dy: image-y,
        boundary: ((bbox => {
          bbox.width = width
          bbox.height = image-height
          (bbox,)
        }),) + wrap-boundary, visual)
      placed(top + left, boundary: meander.contour.phantom(), [
        #if outer-notes { [#metadata(true) <booklet-note-esterne>] }
        #context {
          let sx = if pages == 1 { left-margin(here().page()) } else { margin }
          [#metadata((id: id, "lato": side, "pagine": pages, x: image-x + sx, y: image-y + upper,
            "larghezza": width, "altezza": image-height)) <booklet-sagoma-doppia>]
        }
      ])

      if side == 0 and caption != none {
        placed(bottom + left, boundary: meander.contour.margin(clearance),
          block(width: column-width, above: 0pt, below: 0pt,
            print-caption(caption, prefix: ref(label(id)))))
      }
      container(width: column-width, height: body-height, margin: 0pt)
      container(align: right, width: column-width, height: body-height, margin: 0pt)
      wrap-note-entries(outer-notes: outer-notes)
    }
    content(body, hyphenate: false,
      transform: content => text(hyphenate: true, content))
    opt.overflow.state(remainder)
  }
  page(columns: 1, {
    show footnote: reference-only
    reflow-around(regions)
  })

  context {
    let continuation = remainder.get()
    if continuation != none {
      show footnote: regular-reference
      continuation.styled
    }
  }
}

// Flow one continuous body around independently numbered images on several pages.
// Coordinates describe the visuals relative to the grid, never individual text lines.
#let image-spread(figures, body, pages: 2, start-page: auto) = {
  assert(pages in (1, 2), message: "A shaped image sequence uses one or two pages.")
  assert(start-page in (auto, "even", "odd"), message: "Invalid image sequence start page.")
  assert(figures.len() > 0, message: "Provide at least one image for the shaped region.")
  let ids = figures.map(item => item.id)
  assert(ids.dedup().len() == ids.len(), message: "Each image needs its own unique ID.")
  let region-height = grid-bottom - top-margin - footnote-space - footnote-gap
  let columns = ((0pt, column-width), (column-width + column-gutter, grid-width))
  let entries = figures.map(item => {
    assert(item.format == "sagoma", message: "Declare format: sagoma for each image.")
    assert(type(item.id) == str and item.id != "", message: "Assign a readable image ID.")
    assert(type(item.page) == int and item.page >= 0 and item.page < pages,
      message: "Image page outside the region.")
    assert(item.width > 0pt and item.x >= 0pt and item.y >= 0pt
      and item.x + item.width <= grid-width, message: "Image geometry exceeds the text grid.")
    let bands = profile-bands(item.profile)
    let visible = bands.filter(band => band != none)
    let left-edge = item.x + calc.min(..visible.map(band => band.first())) * item.width - wrap-clearance
    let right-edge = item.x + calc.max(..visible.map(band => band.last())) * item.width + wrap-clearance
    // A central image needs a continuous reading channel in both columns.
    // Closing and reopening a narrow channel creates isolated lines beside it.
    if left-edge < column-width and right-edge > column-width + column-gutter {
      assert(left-edge >= minimum-text-width and grid-width - right-edge >= minimum-text-width,
        message: "Leave at least " + repr(minimum-text-width) + " of text on both sides of a central silhouette; resize or reposition " + item.id + ".")
    }
    (..item, bands: bands,
      height: item.width * item.profile.altezza_px / item.profile.larghezza_px)
  })
  let remainder = state("booklet-image-sequence-" + ids.join("-"), none)
  if start-page == auto { pagebreak(weak: true) }
  else { pagebreak(to: start-page, weak: true) }
  let regions = {
    import meander: placed, container, content, opt, pagebreak
    for page-index in range(pages) {
      if page-index > 0 { pagebreak() }
      for item in entries.filter(item => item.page == page-index) {
        let boundary = alpha-contour(item.bands, item.height, band => {
          if band == none {
            let outside = (2 * grid-width + item.width - item.x) / item.width
            return (outside, outside)
          }
          let start = item.x + band.first() * item.width - wrap-clearance
          let end = item.x + band.last() * item.width + wrap-clearance
          for (left-edge, right-edge) in columns {
            if end > left-edge and start < right-edge {
              if start > left-edge and start - left-edge < minimum-text-width { start = left-edge }
              if end < right-edge and right-edge - end < minimum-text-width { end = right-edge }
            }
          }
          ((start - item.x) / item.width, (end - item.x) / item.width)
        }) + meander.contour.margin(y: wrap-clearance)
        placed(top + left, dx: item.x, dy: item.y,
          boundary: ((bbox => {
            bbox.width = item.width
            bbox.height = item.height
            (bbox,)
          }),) + boundary,
          box(width: item.width, height: item.height)[
            #metadata((id: item.id, "formato": item.format)) <booklet-formato-figura>
            #figure(image(item.file, width: item.width, alt: item.alt),
              kind: image, caption: none, placement: none)#label(item.id)
          ])
        let caption-x = item.at("caption-x", default: item.x)
        let caption-width = item.at("caption-width", default: column-width)
        let caption-y = item.y + item.height + 8pt
        let caption-body = print-caption(caption-content(item.caption,
          rights: item.at("rights", default: none)), prefix: ref(label(item.id)))
        assert(caption-x >= 0pt and caption-x + caption-width <= grid-width,
          message: "A caption exceeds the text grid: " + item.id)
        placed(top + left, dx: caption-x, dy: caption-y,
          boundary: meander.contour.margin(wrap-clearance),
          block(width: caption-width, above: 0pt, below: 0pt, context {
            let height = measure({ show footnote: reference-only; caption-body },
              width: caption-width).height
            assert(caption-y + height <= region-height,
              message: "An image and its caption exceed the shaped region: " + item.id)
            [#metadata((id: item.id, "pagina": here().page(), x: item.x, y: item.y,
              "larghezza": item.width, "altezza": item.height,
              caption-x: caption-x, caption-y: caption-y,
              caption-width: caption-width, caption-height: height)) <booklet-image-sequence>]
            caption-body
          }))
      }
      container(width: column-width, height: region-height, margin: 0pt)
      container(align: right, width: column-width, height: region-height, margin: 0pt)
      wrap-note-entries()
    }
    content(body, hyphenate: false,
      transform: content => text(hyphenate: true, content))
    opt.overflow.state(remainder)
  }
  page(columns: 1, {
    show footnote: reference-only
    reflow-around(regions)
  })
  context {
    let continuation = remainder.get()
    if continuation != none {
      show footnote: regular-reference
      continuation.styled
    }
  }
}

// Use the same wrap engine on one page, optionally aligned to its outer edge.
#let page-wrap(bleed-left: false, start-page: auto, ..arguments) = {
  assert(start-page in (auto, "even", "odd"),
    message: "A single-page silhouette can start automatically or on an even or odd page.")
  if start-page != auto { pagebreak(to: start-page, weak: true) }
  if bleed-left {
    let data = arguments.named()
    let alpha-edge = left-alpha-edge(profile-bands(data.profile))
    let compose(margin) = regional-wrap(pages: 1, outer-notes: false,
      ..(data + ("image-start": -margin - alpha-edge * data.width)), ..arguments.pos())
    if start-page == auto {
      pagebreak(weak: true)
      context compose(left-margin(here().page()))
    } else {
      compose(if start-page == "even" { outer-margin } else { inner-margin })
    }
  } else {
    regional-wrap(pages: 1, outer-notes: false, ..arguments)
  }
}
