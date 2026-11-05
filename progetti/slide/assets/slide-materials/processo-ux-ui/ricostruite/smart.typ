// Shared projection typography and colors; SMART content stays in the data file.
#import "diagrammi.typ": graphic, record, panel, note, pale, cedro
#let data = json("/progetti/slide/data/ux-smart.json")

#let smart-example(letter) = graphic[
  #let item = data.criteria.find(item => item.letter == letter)
  #if "panels" in item [
    #grid(columns: item.panels.len(), gutter: 24pt,
      ..item.panels.enumerate().map(((index, entry)) => panel(entry.at(0), entry.at(1),
        fill: if letter == "R" and index == 1 { cedro } else { pale })))
    #v(16pt)
  ]
  #if "rows" in item { record(item.rows.map(row => (row.at(0), row.at(1)))) }
  #v(12pt)
  #note(item.note)
]

#let smart-summary() = graphic[
  #panel([Obiettivo del primo ciclo], data.summary.goal, fill: cedro)
  #v(16pt)
  #grid(columns: 5, gutter: 16pt,
    ..data.summary.parts.map(part => panel(part.at(0), part.at(1))))
]
