// Native graphic source. Figure placement and editorial metadata belong to the chapter.

#import "../../template/editorial.typ": panel-letter
#import "../../template/geometry.typ": ink

#let demo-panel(body) = rect(fill: rgb("F0F4F3"), stroke: none, inset: 9pt,
  width: 100%, body)
#let demo-action(content, primary: true) = rect(
  fill: if primary { rgb("46ECD5") } else { white },
  stroke: if primary { none } else { 0.6pt + rgb("626872") },
  inset: (x: 6pt, y: 5pt), text(size: 9pt, weight: 700, content))

#let workshop-invitation(variant) = demo-panel[
  #if variant == 0 {
    text(size: 10pt)[Laboratorio di fotografia]
    parbreak()
    [Sabato 14 novembre]
    parbreak()
    [Dalle 10 alle 13]
    parbreak()
    [Spazio Officina]
    parbreak()
    [Via del Parco 8]
    parbreak()
    [Iscrizione gratuita]
  } else {
    text(size: 17pt, weight: 700)[Laboratorio#linebreak()di fotografia]
    v(8pt)
    text(weight: 700)[Sabato 14 novembre]
    linebreak()
    [Dalle 10 alle 13]
    v(8pt)
    [Spazio Officina]
    linebreak()
    text(size: 9pt)[Via del Parco 8]
    v(8pt)
    if variant == 1 { [Iscrizione gratuita] }
    else {
      text(size: 9pt)[Iscrizione gratuita]
      v(5pt)
      demo-action([Iscriviti])
    }
  }
]

#let invitation-comparison() = [
    #grid(columns: (1fr, 1fr, 1fr), gutter: 8pt,
      [*#panel-letter[a] · Elenco*#v(6pt)#workshop-invitation(0)],
      [*#panel-letter[b] · Relazioni*#v(6pt)#workshop-invitation(1)],
      [*#panel-letter[c] · Azione*#v(6pt)#workshop-invitation(2)])
  ]

#let battery(alt: none) = image(bytes("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><rect x='24' y='35' width='142' height='75' fill='none' stroke='#2E3138' stroke-width='7'/><rect x='166' y='55' width='14' height='35' fill='#2E3138'/><rect x='36' y='47' width='33' height='51' fill='#46ECD5'/><rect x='79' y='47' width='33' height='51' fill='#46ECD5'/><rect x='122' y='47' width='32' height='51' fill='#46ECD5'/></svg>"), width: 100%, alt: alt)
#let cup(alt: none) = image(bytes("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><path d='M150 49H164C194 49 194 94 164 94H150' fill='none' stroke='#2E3138' stroke-width='7'/><path d='M24 32H153V112H24Z' fill='none' stroke='#2E3138' stroke-width='7'/><rect x='36' y='47' width='31' height='51' fill='#46ECD5'/><rect x='77' y='47' width='31' height='51' fill='#46ECD5'/><rect x='118' y='47' width='23' height='51' fill='#46ECD5'/><path d='M15 126H170' stroke='#2E3138' stroke-width='7'/></svg>"), width: 100%, alt: alt)
#let metaphor-comparison(battery-alt: none, cup-alt: none) = [
    #grid(columns: (1fr, 1fr), gutter: 18pt,
      [*#panel-letter[a] · Sostituzione*#battery(alt: battery-alt)#align(center)[Una pausa caffè per ripartire]],
      [*#panel-letter[b] · Fusione*#cup(alt: cup-alt)#align(center)[Una pausa caffè per ripartire]])
  ]

#let visual-search() = [
    #grid(columns: 1, row-gutter: 14pt,
      [*#panel-letter[a] · Un segnale distinto*#v(10pt)#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 8pt,
        ..range(20).map(i => circle(radius: 6pt, fill: if i == 12 { rgb("46ECD5") } else { rgb("626872") }, stroke: none)))],
      [*#panel-letter[b] · Segnali concorrenti*#v(10pt)#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 8pt,
        ..range(20).map(i => circle(radius: if calc.rem(i, 3) == 0 { 8pt } else { 6pt },
          fill: (rgb("46ECD5"), rgb("FFB86A"), rgb("626872"), rgb("FFA2A2")).at(calc.rem(i, 4)), stroke: none)))])
  ]

// Compare mirrored placement with unequal sizes and distances. The axis is a
// reading aid, not a quantitative model of perceived visual weight.
#let balance-comparison() = {
  let panel(symmetric) = layout(space => {
    let scale = space.width / 172
    let disks = if symmetric { ((46, 16), (126, 16)) }
      else { ((64, 20), (142, 12)) }
    box(width: space.width, height: 88 * scale)[
      #place(top + left, line(start: (86 * scale, 8 * scale),
        end: (86 * scale, 80 * scale),
        stroke: (paint: rgb("9CA3AF"), thickness: 0.5pt, dash: "dashed")))
      #for (x, radius) in disks {
        place(top + left, dx: (x - radius) * scale,
          dy: (44 - radius) * scale,
          circle(radius: radius * scale, fill: ink, stroke: none))
      }
    ]
  })
  grid(columns: 1, row-gutter: 14pt,
    [*#panel-letter[a] · Simmetria*#v(6pt)#panel(true)],
    [*#panel-letter[b] · Pesi e distanze*#v(6pt)#panel(false)])
}

#let appointment(competing: false) = demo-panel[
  #text(size: 14pt, weight: 700)[Visita di controllo]
  #v(8pt)
  *Martedì 17 novembre · 09:30*
  #linebreak()Ambulatorio 2 · Via del Parco 8
  #v(14pt)
  #if competing {
    stack(dir: ttb, spacing: 7pt,
      demo-action([Modifica appuntamento]), demo-action([Indicazioni]), demo-action([Annulla]))
  } else {
    stack(dir: ttb, spacing: 7pt,
      demo-action([Modifica appuntamento]), demo-action([Indicazioni], primary: false),
      text(size: 9pt)[Annulla appuntamento])
  }
]
#let action-priorities() = [
    #grid(columns: 1, row-gutter: 14pt,
      [*#panel-letter[a] · Enfasi concorrenti*#v(6pt)#appointment(competing: true)],
      [*#panel-letter[b] · Una priorità esplicita*#v(6pt)#appointment()])
  ]
