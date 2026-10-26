// Shared print geometry. Derive dimensions here instead of copying page measurements.
// The body keeps the approved footnote band even on pages without notes.

#let page-width = 170mm
#let page-height = 240mm
#let inner-margin = 18mm
#let outer-margin = 15mm
#let top-margin = 15mm
#let bottom-margin = 20mm
#let column-gutter = 5mm
#let grid-width = page-width - inner-margin - outer-margin
#let column-width = (grid-width - column-gutter) / 2
#let grid-height = page-height - top-margin - bottom-margin
#let footnote-space = 35mm
#let footnote-gap = 8pt
#let folio-drop = 17pt
#let body-height = grid-height - footnote-space - footnote-gap
#let grid-bottom = page-height - bottom-margin
#let body-bottom-margin = bottom-margin + footnote-space + footnote-gap
#let body-folio-drop = footnote-space + footnote-gap + folio-drop
#let wrap-clearance = 8pt
#let minimum-text-width = 108pt
#let ink = rgb("2E3138")

#let page-margins(bottom: bottom-margin) = (
  inside: inner-margin, outside: outer-margin,
  top: top-margin, bottom: bottom,
)
#let left-margin(page-number) = if calc.odd(page-number) {
  inner-margin
} else { outer-margin }
