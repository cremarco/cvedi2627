// Export to watermark-draft.svg with the shared editorial font paths.
// SVG export outlines the lettering so the PDF decoration contains no text.
#set page(width: 500pt, height: 140pt, margin: 0pt, fill: none)
#place(top + center, dy: 110pt,
  text(font: "Sora", size: 125pt, weight: 700,
    fill: rgb("2E3138").transparentize(88%),
    top-edge: 0pt, bottom-edge: 0pt)[DRAFT])
