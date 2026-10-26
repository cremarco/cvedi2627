// Wrap one continuous body around a local alpha silhouette.
// Only the image-height region stays together; remaining prose returns to native flow.

#import "@preview/meander:0.4.4" as meander
#import "geometry.typ": wrap-clearance, minimum-text-width
#import "editorial.typ": caption as print-caption, caption-content
#import "footnotes.typ": wrapped-reference, wrap-entries, note-reference as regular-reference

// Validate normalized alpha profiles before creating text-wrap obstacles.
// Source JSON field names are retained because the profile schema is shared with Python.

// Check dimensions, visible pixels and normalized interval bounds.
#let profile-bands(profile) = {
  assert(type(profile) == dictionary
    and profile.at("schema", default: none) == "cvedi-alpha-profile/v1",
    message: "Generate the profile with scripts/contorni.py and load it with json(path(...)).")
  for key in ("larghezza_px", "altezza_px") {
    let value = profile.at(key, default: none)
    assert(type(value) == int and value > 0,
      message: "Alpha profiles require positive integer dimensions: " + key + ".")
  }
  let bands = profile.at("fasce", default: none)
  assert(type(bands) == array and bands.len() >= 8
    and bands.len() <= calc.min(512, profile.altezza_px),
    message: "Alpha profiles require 8 to 512 bands and no more bands than image rows.")
  for band-height in bands {
    assert(band-height == none or (type(band-height) == array and band-height.len() == 2
      and band-height.all(v => type(v) in (int, float))
      and 0 <= band-height.first() and band-height.first() < band-height.last() and band-height.last() <= 1),
      message: "Each alpha band must be none or an ascending interval between 0 and 1.")
  }
  assert(bands.any(f => f != none), message: "The alpha profile contains no visible pixels.")
  bands
}

// Clamp the lower endpoint so y = 1 belongs to the final profile band.
#let band-at-height(bands, y) = bands.at(
  calc.min(bands.len() - 1, int(calc.floor(y * bands.len()))))

#let left-alpha-edge(bands) = calc.min(
  ..bands.filter(f => f != none).map(f => f.first()))

// Meander cannot fill pixel-height strips reliably with complete text lines.
// Merge adjacent alpha samples into line-sized obstacles, retaining the outermost
// edges so coarser layout never lets letters overlap visible image pixels.
#let line-bands(bands, height) = {
  let line-height = text.size + par.leading.abs + par.leading.em * text.size
  let count = calc.max(1, int(calc.floor(height / line-height)))
  range(count).map(index => {
    let first = int(calc.floor(index * bands.len() / count))
    let last = int(calc.ceil((index + 1) * bands.len() / count))
    let samples = bands.slice(first, last).filter(band => band != none)
    if samples.len() == 0 { none } else {
      (calc.min(..samples.map(band => band.first())),
        calc.max(..samples.map(band => band.last())))
    }
  })
}

// Resolve type size in Meander's layout context, then map the conservative
// samples to the caller's column edges. Source alpha profiles remain unchanged.
#let alpha-contour(bands, height, edges) = ((bbox => {
  let samples = line-bands(bands, height)
  (meander.contour.horiz(div: samples.len(), y =>
    edges(band-at-height(samples, y))).first())(bbox)
}),)

// A contour cut is an implementation boundary, not a justified paragraph end.
// Keep normal justification within each fragment; leave its final line natural.
#let reflow-around(regions) = {
  show linebreak.where(justify: true): it => linebreak(justify: false)
  meander.reflow(regions)
}

// Keep the silhouette region together and release all subsequent prose.
#let wrap-image(
  id: none,
  file: none,
  profile: none,
  width: 90pt,
  side: right,
  caption: none,
  rights: none,
  alt: none,
  numbered: true,
  body,
) = context {
  assert(id != none and type(id) == str and id != "",
    message: "Assign a unique, readable silhouette ID.")
  assert(file != none, message: "Provide the transparent image with path().")
  assert(side in (left, center, right), message: "The silhouette side must be left, center or right.")
  assert(width > 0pt, message: "The silhouette width must be positive.")
  assert(numbered or (caption == none and rights == none),
    message: "Illustrated initials do not use captions or figure numbers.")
  let bands = profile-bands(profile)

  let clearance = wrap-clearance
  let remainder = state("booklet-sagoma-" + id, none)

  block(breakable: false, spacing: 0pt)[
  #show footnote: note-item => wrapped-reference(note-item, id)
  #layout(space => {
    let text-space = if side == center { 2 * (minimum-text-width + clearance) } else { minimum-text-width + clearance }
    let width = calc.min(width, space.width - text-space)
    assert(width > 0pt,
      message: "The text grid is too narrow for the silhouette and prose; use a wider grid.")
    let visual = image(file, width: width, alt: alt)
    let image-height = measure(visual).height
    let offset = if side == right { space.width - width }
      else if side == center { (space.width - width) / 2 }
      else { 0pt }

    let content-value = box(width: space.width, height: image-height)[
      #place(top + side, visual)
    ]
    let figure-item = box(width: space.width, height: image-height,
      if numbered {
        [#figure(content-value, kind: image, caption: none, placement: none)#label(id)]
      } else {
        [#metadata((id: id, "lettera": alt)) <booklet-capolettera>#content-value]
      })
    let figure-height = measure(figure-item).height

    let wrap-boundary = alpha-contour(bands, image-height, band => {
      if band == none {
        (2, 2)
      } else {
        if side == right {
          ((offset + band.first() * width) / space.width, 1)
        } else if side == left {
          (0, (offset + band.last() * width) / space.width)
        } else {
          ((offset + band.first() * width) / space.width,
            (offset + band.last() * width) / space.width)
        }
      }
    }) + meander.contour.margin(clearance)

      reflow-around({
        // Import only the layout primitives; wildcard imports can shadow local geometry.
        import meander: placed, container, content, opt
        placed(top + left, boundary: ((bbox => {
          bbox.width = space.width
          bbox.height = image-height
          (bbox,)
        }),) + wrap-boundary, figure-item)
        if side == center {
          container(width: 50%, height: figure-height + clearance, margin: 0pt)
          container(align: right, width: 50%, height: figure-height + clearance, margin: 0pt)
        } else {
          container(height: figure-height + clearance, margin: 0pt)
        }
        content(body, hyphenate: not numbered,
          transform: content => text(hyphenate: true, content))
        opt.overflow.state(remainder)
      })
  })
  #place(top + left, box(width: 0pt, height: 0pt, wrap-entries(id)))
  ]

  context {
    let continuation = remainder.get()
    if continuation != none {
      show footnote: regular-reference
      continuation.styled
    }
  }
  if caption != none or rights != none {
    block(above: 8pt, below: 10pt, breakable: false,
      print-caption(caption-content(caption, rights: rights),
        prefix: ref(label(id))))
  }
}

// Reuse image wrapping for an illustrated initial without adding a figure number.
#let drop-cap(id: none, file: none, profile: none, width: 64pt,
  letter: "N", body) = wrap-image(id: id, file: file, profile: profile,
  width: width, side: left, alt: letter, numbered: false, body)
