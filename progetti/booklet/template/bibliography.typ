// Native APA bibliographies, optionally split into disjoint source groups.
// Groups are supplied as data; no chapter identifiers or source titles are embedded here.

#import "editorial.typ": apparatus-title

// Require nonempty, disjoint citation groups before producing APA parts.
#let validate-groups(groups) = {
  assert(type(groups) == array and groups.len() > 0,
    message: "Grouped bibliographies require at least one group of keys.")
  let keys = ()
  for group in groups {
    assert(type(group) == array and group.len() > 0,
      message: "Each bibliography group requires at least one key.")
    for key in group {
      assert(type(key) == label,
        message: "Bibliography groups only accept citation labels.")
      assert(not (key in keys),
        message: "Duplicate bibliography key across groups: " + repr(key))
      keys.push(key)
    }
  }
}

// Use native APA and correct only the known year-only punctuation defect.
#let apa-bibliography(sources, groups: none) = {
  if groups != none { validate-groups(groups) }
  show regex("\\([0-9]{4}[a-z]*,\\)"): it => it.text.replace(",)", ")")
  [#metadata(("parti": if groups == none { 1 } else { groups.len() })) <booklet-bibliografia>]
  if groups == none {
    bibliography(sources, title: none, style: "apa")
  } else {
    for group in groups {
      let target = group.map(k => selector(cite.where(key: k)))
        .fold(none, (a, b) => if a == none { b } else { a.or(b) })
      bibliography(sources, title: none, style: "apa", group: none,
        target: target)
    }
  }
}

#let bibliography-page(sources, groups: none) = page(columns: 1)[
  #set text(size: 8pt, weight: 400, variations: (opsz: 9))
  #set par(justify: false, leading: 2pt, spacing: 8pt)
  #apparatus-title[Bibliografia]
  #v(18pt)
  #apa-bibliography(sources, groups: groups)
]
