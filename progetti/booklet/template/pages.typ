// Generic page and float containers. Full-bleed plates omit ordinary page furniture;
// documentary content and prose keep their own native reading order.

#import "geometry.typ": (page-width, page-height, page-margins, folio-drop,
  grid-width, grid-height, body-height)
#import "editorial.typ": apparatus-title

#let document-page(body) = {
  pagebreak(weak: true)
  page(columns: 1, margin: page-margins(), footer-descent: folio-drop)[
    #set figure(placement: none)
    #body
  ]
}

#let floating-plate(body) = place(top, scope: "parent", float: true, clearance: 0pt)[
  #set figure(placement: none, scope: "column")
  #layout(space => block(width: grid-width, height: space.height,
    above: 0pt, below: 0pt)[
    #block(width: grid-width, height: grid-height, above: 0pt, below: 0pt)[
      #metadata(true) <booklet-tavola-mobile>
      #body
    ]
  ])
]

#let full-bleed-pages() = {
  query(<booklet-pagina-al-vivo-mobile>).map(m => m.location().page())
}

#let floating-full-bleed-page(body) = {
  place(top, scope: "parent", float: true, clearance: 0pt)[
    #set figure(placement: none, scope: "column")
    #block(width: grid-width, height: body-height,
      above: 0pt, below: 0pt)[
      #context {
        let position-options = here().position()
        place(top + left, dx: -position-options.x, dy: -position-options.y)[
          #block(width: page-width, height: page-height,
            above: 0pt, below: 0pt)[
            #metadata(true) <booklet-pagina-al-vivo-mobile>
            #body
          ]
        ]
      }
    ]
  ]
  context {
    if page.columns > 1 {
      figure(block(width: 1pt, height: 1pt, above: 0pt, below: 0pt)[
        #metadata(true) <booklet-al-vivo-barriera>
        #rect(width: 0pt, height: 0pt, fill: none, stroke: none)
      ], kind: "booklet-riserva-colonna", placement: top, scope: "column",
        caption: none, numbering: none, supplement: none, outlined: false)
    }
  }
}

#let notes-pages() = page(columns: 1)[
  #set par(justify: false)
  #apparatus-title[Appunti]
  #v(18pt)
  #block(width: 100%, height: 175mm,
    fill: tiling(size: (5mm, 5mm), circle(radius: 0.3pt, fill: rgb("CDD0D4"))))
]

#let document-plate(body, fixed: false) = if fixed {
  document-page(body)
} else { floating-plate(body) }
