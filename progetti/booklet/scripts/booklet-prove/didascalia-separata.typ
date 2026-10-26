// Il folio deve seguire l'immagine quando viene inserita una pagina a monte.
// Si parte da 7 per non confondere il contatore stampato con la pagina PDF.
#import "/progetti/booklet/template/stile.typ": booklet, sito
#import "/progetti/booklet/template/geometria.typ": margini, spazio-note, distacco-note
#import "/progetti/booklet/template/figure.typ": schermata
#import "/progetti/booklet/template/pagine.typ": tavola-mobile
#import "/progetti/booklet/template/note.typ": richiamo-nota
#show: booklet
#set text(size: 11pt)
#set par(leading: 2.5pt)
#set page(margin: margini(bottom: margini().bottom + spazio-note + distacco-note), footer: none)
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota
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
  tavola-mobile[
    #figure(
      image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"), height: 250pt),
      caption: [Una tavola intera attende prima della didascalia separata.], placement: none,
    ) <booklet-prova-tavola-precedente>
  ]
}

// Un originale più alto del foglio deve perdere soltanto la parte inferiore:
// l'ancoraggio dichiarato non deve essere annullato dal fit interno dell'image.
#let rifilo-in-basso = caso == "ancoraggio-alto"
#let originale = if rifilo-in-basso {
  path("/risorse-condivise/immagini/figure/ricerca/c03-020-01.jpeg")
} else { path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png") }
#schermata(originale,
  [La miniatura conserva l'immagine intera e il rinvio raggiunge la schermata. La fonte resta sulla pagina della didascalia.#sito([Fonte della schermata di prova.], "https://example.org/schermata")],
  <booklet-prova-schermata>, "Schermata a tutta pagina della prova.",
  rapporto: if rifilo-in-basso { 1140 / 1704 } else { 17 / 24 },
  ancoraggio: if rifilo-in-basso { (0.5, 0) } else { (0.5, 0.5) })

Il testo riprende dopo la schermata a tutta pagina.
