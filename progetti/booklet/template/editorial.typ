// Granular editorial roles shared by prose, figures and source apparatus.
// Callers supply rich content; these functions only apply presentation.

#import "palette.typ": chapter-color

// Color only the panel identifier; its title retains the surrounding text style.
#let panel-letter(body) = context text(fill: chapter-color.get(), body)

#let caption-gap = 8pt

// Pad short page numbers without truncating longer folios.
#let arabic-folio(number) = {
  if number < 10 { "00" + str(number) }
  else if number < 100 { "0" + str(number) } else { str(number) }
}

#let apparatus-title(body) = text(font: "Sora", size: 20pt, weight: 800, body)

// Keep copyright text in the shared italic role, including nested emphasis.
#let rights-text(body) = block(above: 0pt, below: 0pt)[
  #set text(size: 8pt, style: "italic", weight: 400, variations: (opsz: 9))
  #set par(justify: false, leading: 2pt, spacing: 0pt)
  #show emph: it => text(style: "italic", it.body)
  #body
]

// Combine editable caption content and optional copyright attribution.
#let caption-content(content, rights: none) = [
  #content
  #if rights != none {
    v(4pt)
    rights-text(rights)
  }
]

// Print the native figure prefix separately from the caption body.
#let caption(body, prefix: none) = block(width: 100%)[
  #set align(left)
  #set text(size: 9pt, weight: 300, variations: (opsz: 9))
  #set par(justify: false, leading: 1.8pt, spacing: 0pt)
  #if prefix != none { [
    #text(weight: 500, variations: (opsz: 14))[#prefix —] #body
  ] } else { body }
]

#let reading-subtitle(body) = block(above: 10pt, below: 4pt, sticky: true)[
  #set par(leading: 2pt)
  #text(weight: 900, size: 14pt, variations: (opsz: 14), body)
]

#let editorial-detail(title: [], caption: [], body) = block(breakable: false)[
  #set par(justify: false, leading: 2pt, spacing: 4pt)
  #text(size: 10pt, weight: 500)[#title]
  #v(4pt)
  #align(center, body)
  #v(4pt)
  #text(size: 9pt, weight: 300)[#caption]
]

// Keep a source description and its links together in one native footnote.
#let compact-note(content, url, tag: none) = {
  let urls = if type(url) == array { url } else { (url,) }
  let labels = if tag == none { urls }
    else if type(tag) == array { tag } else { (tag,) }
  assert(urls.len() > 0 and urls.len() == labels.len(),
    message: "Each compact-note URL requires its own label.")
  footnote[
    #set text(font: "DM Sans 9pt", size: 7.5pt, weight: 400,
      style: "normal", variations: (opsz: 9))
    #content — #for (index, destination) in urls.enumerate() {
      if index > 0 { [; ] }
      text(size: 7pt, link(destination, labels.at(index)))
    }
  ]
}
