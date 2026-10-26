// Il folio deve seguire l'immagine quando viene inserita una pagina a monte.
// Si parte da 7 per non confondere il contatore stampato con la pagina PDF.
#import "/progetti/booklet/template/layout.typ": booklet, website-note
#import "/progetti/booklet/template/geometry.typ": page-margins, footnote-space, footnote-gap
#import "/progetti/booklet/template/figures.typ": full-bleed-image
#import "/progetti/booklet/template/figures.typ": floating-plate
#import "/progetti/booklet/template/footnotes.typ": note-reference
#show: booklet
#set text(size: 11pt)
#set par(leading: 2.5pt)
#set page(margin: page-margins(bottom: page-margins().bottom + footnote-space + footnote-gap), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: note-reference
#counter(page).update(7)

#let caso = sys.inputs.at("caso", default: "base")
#assert(caso in ("base", "spostata", "densa", "float-precedente", "ancoraggio-alto"),
  message: "Caso didascalia separata sconosciuto.")
#if caso == "spostata" {
  [Una pagina inserita prima del confronto sposta insieme la caption e la schermata.]
  pagebreak()
}

L'introduzione rimane nel flusso ordinario. Il numero della miniatura identifica la stessa figura della schermata a tutta pagina.

// Una figura nativa precedente rende rilevabile un progressivo duplicato.
#figure(
  image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"), height: 35pt),
  caption: [Confronto precedente.], placement: none,
) <booklet-prova-figura-precedente>

#if caso == "densa" {
  for i in range(16) { [#lorem(35)#parbreak()] }
}
#if caso == "float-precedente" {
  floating-plate[
    #figure(
      image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"), height: 250pt),
      caption: [Una tavola intera attende prima della didascalia separata.], placement: none,
    ) <booklet-prova-tavola-precedente>
  ]
}

// Un originale più alto del foglio deve perdere soltanto la parte inferiore:
// l'ancoraggio dichiarato non deve essere annullato dal fit interno dell'image.
#let rifilo-in-basso = caso == "ancoraggio-alto"
#let original = if rifilo-in-basso {
  path("/risorse-condivise/immagini/figure/ricerca/c03-020-01.jpeg")
} else { path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png") }
#full-bleed-image(original,
  [La miniatura conserva l'immagine intera e il rinvio raggiunge la schermata. La fonte resta sulla pagina della didascalia.#website-note([Fonte della schermata di prova.], "https://example.org/schermata")],
  <booklet-prova-schermata>, "Schermata a tutta pagina della prova.",
  aspect-ratio: if rifilo-in-basso { 1140 / 1704 } else { 17 / 24 },
  anchor: if rifilo-in-basso { (0.5, 0) } else { (0.5, 0.5) })

Il testo riprende dopo la schermata a tutta pagina.
