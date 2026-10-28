// Uncropped fictional portrait with two independent framing measurements.
#set page(width: 720pt, height: 480pt, margin: 0pt)
#set text(font: "DM Sans 9pt", size: 24pt, weight: 500, fill: black, variations: (opsz: 18))
#let measure(start, end) = line(start: start, end: end, stroke: 1.4pt + black)
#box(width: 720pt, height: 480pt)[
  #place(top + left, image("ritratto-originale.png", width: 720pt, height: 480pt))
  // Horizontal distance from the left frame edge to the tip of the nose.
  #place(top + left, measure((1pt, 209pt), (403pt, 209pt)))
  #place(top + left, measure((1pt, 202pt), (1pt, 216pt)))
  #place(top + left, measure((403pt, 202pt), (403pt, 216pt)))
  #place(top + left, dx: 12pt, dy: 175pt)[Looking room]
  // Vertical distance from the crown to the upper edge, entirely above the head.
  #place(top + left, measure((501.1pt, 1pt), (501.1pt, 42.2pt)))
  #place(top + left, measure((493.1pt, 1pt), (509.1pt, 1pt)))
  #place(top + left, measure((493.1pt, 42.2pt), (509.1pt, 42.2pt)))
  #place(top + left, dx: 525pt, dy: 8pt)[Headroom]
]
