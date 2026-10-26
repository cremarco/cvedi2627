// Due code native: figure di colonna successive alla prima coppia al vivo.
#import "/progetti/booklet/template/stile.typ": booklet, sito
#import "/progetti/booklet/template/geometria.typ": margini, spazio-note, distacco-note
#import "/progetti/booklet/template/figure.typ": schermata
#import "/progetti/booklet/template/note.typ": richiamo-nota
#show: booklet
#set text(size: 11pt)
#set par(leading: 2.5pt)
#set page(margin: margini(bottom: margini().bottom + spazio-note + distacco-note))
#show footnote.entry: none
#set footnote.entry(separator: none, clearance: 0pt, gap: 0pt)
#show footnote: richiamo-nota

#let caso = sys.inputs.at("caso", default: "piccola")
#assert(caso in ("piccola", "alta"), message: "Caso di esclusività al vivo sconosciuto.")
#let prosa = lorem(100)
#let ordinaria(id) = figure(
  block(width: 137mm, height: if caso == "piccola" { 15mm } else { 420pt })[
    #image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"),
      width: 100%, height: 100%, fit: "contain", alt: "Confronto ordinario in colonna.")
  ], kind: image, placement: auto, scope: "column",
  caption: [Figura ordinaria #id: didascalia nativa.#sito([Fonte #id.], "https://example.org/" + id)])

#prosa
#ordinaria("a")
#schermata(path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png"),
  [Prima schermata a tutta pagina.], <booklet-prova-esclusiva-a>, "Prima schermata della prova.")

#prosa
// Questa figura nasce DOPO la prima coppia: non può entrare nel suo foglio.
#ordinaria("b")
#schermata(path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png"),
  [Seconda schermata a tutta pagina.], <booklet-prova-esclusiva-b>, "Seconda schermata della prova.")

#for i in range(8) { [#prosa#parbreak()] }
