// Book-wide typography, counters, page furniture and native reference handling.
// Chapter content and artwork are supplied by callers, without chapter-specific branches.

#import "footnotes.typ": note-reference
#import "geometry.typ": (ink, page-width, page-height, page-margins,
  column-gutter, folio-drop, body-bottom-margin, body-folio-drop)
#import "editorial.typ": caption as draw-caption, caption-gap, arabic-folio
#import "pages.typ": notes-pages, full-bleed-pages
#import "bibliography.typ": bibliography-page
#import "palette.typ": front-matter-accent, chapter-accent, chapter-color
#import "exercises.typ": exercise-background, page-exercises, exercise-tints

// Change list markers while retaining native nesting and numbering.
#let styled-lists(accent: front-matter-accent, body) = {
  set list(marker: box(baseline: (at: bottom, shift: -0.05em),
    square(size: 0.4em, fill: accent, stroke: none)))
  set enum(numbering: (..numbers) => context {
    let em = (1em).to-absolute()
    let digit = text(size: 0.8em, weight: 600, fill: ink,
      numbers.pos().map(str).join("."))
    box(width: calc.max(1.2 * em, measure(digit).width + 0.3 * em), height: 1.2em,
      baseline: (at: bottom, shift: 0.35em), fill: accent, stroke: none,
      inset: 0pt, align(center + horizon, digit))
  })
  body
}

#let reading-presets = (
  "12-14": ("corpo": 12pt, "interlinea": 14pt),
  "11-13.5": ("corpo": 11pt, "interlinea": 13.5pt),
)
#let reading-preset = sys.inputs.at("lettura", default: "11-13.5")
#assert(reading-preset in reading-presets,
  message: "The reading preset must be 11-13.5 or 12-14.")
#let reading-metrics = reading-presets.at(reading-preset)

#let citation-scale = 10 / 11
#let citation-color = rgb("626872")

#let folio(roman: false) = context {
  if here().page() in full-bleed-pages() { return }
  let side = if calc.odd(counter(page).get().first()) { right } else { left }
  let number = counter(page).get().first()
  let digits = if roman { numbering("i", number) }
    else { arabic-folio(number) }
  let exercises = page-exercises(here().page())
  let bottom-value = if exercises.len() == 0 { chapter-color.get() }
    else { exercise-tints(exercises.first().value.accento).fondo }
  align(side, rect(width: 32pt, height: 22pt, fill: bottom-value,
    stroke: none, inset: 4pt)[
    #set text(size: 12pt, weight: 500, variations: (opsz: 14))
    #set par(leading: 2pt)
    #align(center + horizon, digits)
  ])
}

// Apply shared layout rules to the supplied document content.
#let booklet(body) = {
  set document(
    title: "Comunicazione visiva e design delle interfacce · Campione Typst",
    author: ("Marco Cremaschi", "Elia Guarnieri", "Andrea Primo Pierotti"),
  )
  set text(font: ("DM Sans 9pt", "Noto Sans JP", "Noto Sans SC"), size: 12pt, fill: ink,
    lang: "it", region: "IT", hyphenate: true, weight: 400,
    variations: (opsz: 18), top-edge: 0.9em, bottom-edge: -0.1em)
  set par(justify: true, leading: 2pt, spacing: 10pt, first-line-indent: 0pt)
  show math.equation: set text(font: "New Computer Modern Math", weight: 400)
  show strong: it => text(weight: 700, variations: (opsz: 14), it.body)
  set page(width: page-width, height: page-height, binding: left,
    margin: page-margins(), columns: 2, footer-descent: folio-drop,
    footer: folio(), background: context {
      if here().page() not in full-bleed-pages() { exercise-background() }
    })
  set columns(gutter: column-gutter)
  set heading(numbering: "1.1.1.")

  show heading.where(level: 2): it => {
    block(above: 18pt, below: 14pt, sticky: true)[
      #set text(font: "Sora", size: 20pt, weight: 800, hyphenate: false)
      #set par(justify: false, leading: 0pt)
      #context text(fill: chapter-color.get(), counter(heading).display("1.1."))
      #v(6pt)
      #it.body
    ]
  }
  show heading.where(level: 3): it => block(above: 14pt, below: 4pt, sticky: true)[
    #set text(size: 14pt, weight: 900, variations: (opsz: 14), hyphenate: false)
    #set par(justify: false, leading: 0pt)
    #context counter(heading).display("1.1.1.")
    #h(3pt)#it.body
  ]

  show footnote.entry: set text(size: 7.5pt, variations: (opsz: 9))
  show footnote.entry: set par(justify: false, leading: 1.5pt, spacing: 3pt)
  show footnote.entry: it => block(breakable: false, it)
  set footnote.entry(separator: line(length: 30%, stroke: 0.4pt + ink),
    clearance: 8pt, gap: 4pt)
  set cite(style: "apa")
  show cite: set text(size: citation-scale * 1em, fill: citation-color)
  set figure(gap: caption-gap, supplement: [Figura], placement: auto)
  show figure.caption: it => draw-caption(it.body,
    prefix: [#it.supplement #context it.counter.display(it.numbering)])

  // Typst #4359: float references need an anchor at the visual location.
  // Text-only figures use the block anchor as a fallback.
  show figure: fig => {
    show image: visual => [#metadata(fig.location()) <booklet-figure-anchor>#visual]
    show block: content-block => [#metadata(fig.location()) <booklet-figure-block-anchor>#content-block]
    if reading-preset == "11-13.5" {
      set text(size: 12pt)
      set par(leading: 2pt)
      fig
    } else { fig }
  }
  show ref.where(form: "normal"): it => {
    let fig = it.element
    if fig == none or fig.func() != figure { return it }
    context {
      let anchors = query(selector(<booklet-figure-anchor>)
        .and(metadata.where(value: fig.location())))
      if anchors.len() == 0 {
        anchors = query(selector(<booklet-figure-block-anchor>)
          .and(metadata.where(value: fig.location())))
      }
      if anchors.len() == 0 or fig.numbering == none { return it }
      let supplement = if it.supplement == auto { fig.supplement }
        else if type(it.supplement) == function { (it.supplement)(fig) }
        else { it.supplement }
      let number = fig.counter.display(fig.numbering, at: fig.location())
      link(anchors.first().location(),
        if supplement == none or supplement == [] { number }
        else { [#supplement~#number] })
    }
  }
  body
}

#let website-note(title, url) = footnote[
  #set text(size: 7.5pt, variations: (opsz: 9))
  #title #linebreak()
  #text(size: 7pt)[#link(url)]
]

// Place supplied title lines and artwork on a marginless opening page.
#let chapter-opening(number: 1, title: "", composition: none, visual: none) = {
  assert(type(number) == int and number >= 1,
    message: "Provide a positive integer chapter number.")
  assert(type(title) == str and title.len() > 0,
    message: "The complete title must come from the editorial plan.")
  assert(composition != none and composition.numero == number,
    message: "Provide the approved chapter opening composition.")
  assert(visual != none, message: "Provide the SVG background without editorial text.")
  let sx = page-width / composition.tela.at(0)
  let sy = page-height / composition.tela.at(1)
  let t = composition.titolo
  let n = composition.codice
  let words = title.split(" ")
  let line-break-index = composition.a_capo_dopo
  let lines = (words.slice(0, line-break-index).join(" "), words.slice(line-break-index).join(" "))

  page(columns: 1, margin: 0pt, header: none, footer: none,
    background: image(visual, width: 100%, height: 100%, fit: "stretch"))[
    #set text(font: "Sora", weight: 700, fill: ink,
      hyphenate: false, top-edge: 0pt, bottom-edge: 0pt)
    #set par(justify: false, leading: 0pt, spacing: 0pt)
    #set heading(numbering: n => if n < 10 { "0" + str(n) } else { str(n) })
    #show heading.where(level: 1): it => {
      for (i, line-value) in lines.enumerate() {
        place(top + left, dx: t.x * sx, dy: (t.y + i * t.interlinea) * sy,
          text(size: t.at("corpi_righe", default: (t.corpo, t.corpo)).at(i) * sx,
            tracking: t.spaziatura * sx, line-value))
      }
    }
    #metadata(("numero": number, "titolo": title, serie: composition.nome)) <booklet-apertura>
    #heading(level: 1, title)
    #place(top + left, dx: n.x * sx, dy: n.y * sy,
      text(size: n.corpo * sx, tracking: n.spaziatura * sx,
        fill: rgb(n.at("colore", default: "#2E3138")),
        if number < 10 { "0" + str(number) } else { str(number) }))
  ]
}

// Reset native counters and apply the common body geometry for a chapter.
#let chapter(number: 1, title: [], composition: none, accent: chapter-accent(1),
  visual: none, sources: none, source-groups: none, body) = {
  show: styled-lists.with(accent: accent)
  set figure(numbering: n => str(number) + "." + str(n))
  chapter-color.update(accent)
  counter(heading).update((number - 1, 0, 0))
  chapter-opening(number: number, title: title, composition: composition,
    visual: visual)
  [#metadata(number) <booklet-capitolo-con-figure>]
  counter(heading).update((number, 0, 0))
  counter(figure.where(kind: image)).update(0)
  counter(footnote).update(0)
  {
    set text(size: reading-metrics.corpo)
    set par(leading: reading-metrics.interlinea - reading-metrics.corpo)
    set page(margin: page-margins(bottom: body-bottom-margin),
      footer-descent: body-folio-drop)
    show footnote.entry: none
    set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
    show footnote: note-reference
    body
  }
  if sources != none {
    bibliography-page(sources, groups: source-groups)
  }
  notes-pages()
}
