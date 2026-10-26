// La prosa che segue una coppia mobile deve riempire il foglio della caption.
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
#counter(page).update(7)

#let caso = sys.inputs.at("caso", default: "senza-note")
#assert(caso in ("senza-note", "nota-caption", "note-miste", "float-precedente", "figura-in-coda", "figura-colonna"),
  message: "Caso di flusso al vivo sconosciuto.")
#let marker(fase, indice) = [#metadata((fase: fase, indice: indice)) <booklet-prova-flusso-al-vivo>]

#marker("inizio", -1)Una breve introduzione avvia il confronto. La coppia mobile conserva la didascalia al piede, mentre la prosa successiva completa lo spazio disponibile sopra.
#if caso == "note-miste" {
  sito([Fonte dell'introduzione.], "https://example.org/introduzione")
}
#marker("fine", -1)

#if caso == "float-precedente" {
  figure(image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"), height: 65pt),
    caption: [Confronto mobile precedente.], placement: top, scope: "parent")
}
#if caso == "figura-in-coda" {
  // L'inserto viene chiamato dopo una porzione già consumata della pagina:
  // la riserva del suo foglio deve comunque restare pari alla gabbia intera.
  for i in range(2) { [#lorem(35)#parbreak()] }
}
#if caso == "figura-colonna" {
  // La coda nativa di figure/colonna è distinta dai place a gabbia intera.
  // Una figura ordinaria troppo alta per lo spazio residuo deve attendere
  // anche quando arriva prima della coppia al vivo nell'ordine del sorgente.
  for i in range(5) { [#lorem(35)#parbreak()] }
  figure(image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"),
      width: 100%, height: 449pt, fit: "contain"),
    caption: [Figura ordinaria mobile in una colonna: questa didascalia deve restare fuori dal foglio al vivo.],
    placement: auto, scope: "column")
}

#schermata(path("/risorse-condivise/immagini/figure/caffe-ttc/caffe-ttc-primo-web-home.png"),
  [Una schermata conserva la miniatura, il numero e il rinvio alla pagina al vivo.
    #if caso in ("nota-caption", "note-miste") {
      sito([Fonte della schermata.], "https://example.org/schermata")
    }],
  <booklet-prova-flusso-schermata>, "Caffè TTC: schermata della prova di flusso.")

#if caso == "figura-in-coda" {
  figure(image(path("/risorse-condivise/immagini/figure/colore/albers-superfici-sovrapposte.svg"), height: 125pt),
    caption: [Questa figura ordinaria in coda deve seguire il foglio al vivo.],
    placement: top, scope: "parent")
}

// Solo il controllo negativo introduce una barriera fra la coppia e il seguito.
#if sys.inputs.at("barriera", default: "no") == "si" { place.flush() }

#for i in range(16) {
  [#marker("inizio", i)Passaggio #i. Il seguito del testo occupa lo spazio ancora disponibile sul foglio della didascalia, senza fermarsi alla chiamata della figura. La schermata conserva il proprio formato; questi paragrafi restano nel flusso nativo delle due colonne, con lo stesso ordine di lettura.
    #if i == 0 { [La @booklet-prova-flusso-schermata resta collegata alla posizione visiva dell'immagine.] }
    #if i == 0 and caso == "note-miste" {
      sito([Fonte del testo successivo alla coppia.], "https://example.org/seguito")
    }
    #marker("fine", i)]
  parbreak()
}
