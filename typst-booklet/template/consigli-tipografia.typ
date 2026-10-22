// Campioni delle tavole471–486. La prosa del capitolo è in consigli.typ.
// Testi, pesi e corpi sono modificabili; i pannelli crescono con il contenuto.
// Le misure fisse servono alle prove comparative, mai alle righe del capitolo.
#import "editoriale.typ": testo-diritti
#import "campioni.typ": confronto
#import "stile.typ": immagine
#import "documenti.typ": tavola-documentaria

#let inchiostro = rgb("2E3138")
#let etichetta(corpo) = text(font: "DM Sans 9pt", size: 9.5pt, weight: 500,
  variations: (opsz: 14), corpo)
#let foglio(corpo, colore: rgb("FAF8F1"), font: "DM Sans 9pt", inset: (x: 16pt, top: 28pt, bottom: 16pt)) = block(
  width: 100%, breakable: false, fill: colore,
  inset: inset,
)[
  #set align(left)
  #set text(font: font, size: 12pt, weight: 400, variations: (opsz: 14))
  #set par(justify: false, leading: 2pt, spacing: 10pt, first-line-indent: 0pt)
  #corpo
]

#let prenotazione() = confronto[
  #figure([
    #foglio[
      #etichetta[Prenotazione simulata]
      #v(10pt)
      #text(size: 18pt, weight: 700)[Prenotare la visita al laboratorio di tipografia]
      #v(10pt)
      #line(length: 100%, stroke: 0.5pt + inchiostro)
      #v(10pt)
      Lunedì 19 ottobre il laboratorio apre alle 14:30. La visita dura un’ora e comprende una breve dimostrazione di composizione. È necessario prenotare prima dell’arrivo e conservare il codice di conferma.

      Il biglietto costa 24,50 €. Chi arriva in ritardo può chiedere al personale se è ancora possibile entrare. Prima di confermare, controlla il nome, il giorno scelto e il numero di partecipanti.

      _Nicolò Ferri_ · 19 ottobre 2026 · 24,50 € · Il1-038
    ]
    #v(6pt)
    #etichetta[Leggilo alla misura finale.]
  ], kind: image, caption: [Titolo, due paragrafi e dati appartengono alla stessa simulazione. Osserva i ritorni a capo, gli accenti e la distinzione fra I, l e 1 alla misura finale.
    #v(4pt)#testo-diritti[DM Sans, The DM Sans Project Authors; SIL OFL 1.1.]
  ]) <fig-tipo-347>
]

#let ruoli() = [#figure([
  #foglio[
    #text(size: 18pt, weight: 900)[Una mostra da leggere]
    #v(8pt)
    #text(size: 14pt, weight: 700)[Tre percorsi, una sola voce]
    #v(14pt)
    Il titolo introduce il tema. Il sottotitolo orienta e il corpo accompagna la lettura. Pesi e spazi rendono riconoscibili questi compiti.
  ]
  #v(6pt)
  #etichetta[Titolo 18 · sottotitolo 14 · corpo 12]
  #linebreak()
  #etichetta[Una famiglia, tre compiti.]
], kind: image, caption: [La stessa famiglia distingue tre ruoli attraverso peso, corpo e spaziatura. L’aggiunta di un’altra famiglia richiede una funzione riconoscibile.]) <fig-tipo-348>]

#let larghezza() = confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#figure([
      #foglio[
        #etichetta[Compressione geometrica]
        #v(8pt)
        #etichetta[Larghezza geometrica: 75%]
        #v(8pt)
        // Le due visuali mantengono l'altezza originale di14,2972pt.
        // La prima è già deformata nella fonte: nessun'altra scala orizzontale.
        #box(width: 100%, height: 30.924pt,
          align(left + horizon, image(path("/assets/images/figure/tipografia/consigli/roboto-serif-compressione-geometrica-75.svg"),
            width: 90.3368pt, alt: "Roboto Serif: compressione geometrica al75%.")))
      ]
    ], kind: image, caption: [Roboto Serif compresso geometricamente. La deformazione è mostrata soltanto come condizione di confronto.
      #v(4pt)#testo-diritti[Campione originale su contorni autentici Roboto Serif, deformazione dichiarata. SIL OFL 1.1.]
    ]) <fig-tipo-349>],
    [#figure([
      #foglio[
        #etichetta[Asse wdth 75]
        #v(8pt)
        #etichetta[Asse reale del font: wdth 75]
        #v(8pt)
        #box(width: 100%, height: 30.924pt,
          align(left + horizon, image(path("/assets/images/figure/tipografia/consigli/roboto-serif-asse-wdth-75.svg"),
            width: 106.916pt, alt: "Roboto Serif: variazione progettata con asse wdth75.")))
      ]
    ], kind: image, caption: [Roboto Serif con asse wdth impostato a 75: una variazione progettata, distinta dalla compressione geometrica. Il valore dell’asse non indica una riduzione uniforme della parola al 75%.
      #v(4pt)#testo-diritti[Roboto Serif, Commercial Type e Google Fonts; asse reale del file. SIL OFL 1.1.]
    ]) <fig-tipo-350>],
  )
  #v(6pt)
  #etichetta[Roboto Serif · contorni autentici · stessa scala nei due campioni]
]

#let corsivo() = [#immagine(path("/assets/images/figure/tipografia/consigli/roboto-serif-corsivo-e-inclinazione.svg"),
  [Roboto Serif a 24 pt: corsivo autentico e tondo inclinato di 12°. Osserva la «a»: il corsivo ne cambia la costruzione, la simulazione inclina soltanto il disegno tondo.],
  diritti: [Roboto Serif, Commercial Type e Google Fonts; SIL OFL 1.1.],
  alt: "Corsivo autentico Roboto Serif e tondo inclinato geometricamente di12gradi.",
  width: 187.09pt,
) <fig-tipo-350a>]

#let segno(nome, corpo) = block(breakable: false)[
  #etichetta(nome)
  #v(3pt)
  #corpo
]

#let ortotipografia() = [#figure([
  #foglio[
    #stack(dir: ttb, spacing: 10pt,
      segno([Accenti], [È · CAFFÈ · PERCHÉ]),
      segno([Apostrofo e virgolette], [L’idea è «già pronta».]),
      segno([Parola composta], [tecnico-scientifico]),
      segno([Intervallo], [10–12]),
      segno([Numero negativo], [−5]),
      // La stessa giustezza di51pt lascia osservare il comportamento dei due spazi.
      segno([Spazio normale], block(width: 51pt)[Peso: 10 kg]),
      segno([Spazio non separabile], block(width: 51pt)[#text("Peso: 10\u{a0}kg")]),
    )
  ]
  #v(6pt)
  #etichetta[Segni simili, funzioni diverse.]
], kind: image, caption: [Nei campioni il trattino unisce una parola composta, la lineetta esprime un intervallo e il meno indica un valore negativo. Il confronto «10 kg» e «10 kg» mostra come lo spazio non separabile tiene insieme numero e unità a fine riga.]) <fig-tipo-351>]

#let enfasi() = confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#foglio[
        #etichetta[Tutto marcato]
        #v(8pt)
        #text(weight: 700)[La prenotazione resta valida fino alle 18. Porta il codice di conferma e presentati all’ingresso principale.]
      ]],
      [#foglio[
        #etichetta[Un’informazione da ritrovare]
        #v(8pt)
        La prenotazione resta valida #text(weight: 700)[fino alle 18]. Porta il codice di conferma e presentati all’ingresso principale.
      ]],
    )
    #v(6pt)
    #etichetta[Trova la scadenza.]
  ], kind: image, caption: [Stessi contenuti, corpo e larghezza: cambia l’estensione del grassetto. Nel secondo campione la scadenza è distinta dal resto del paragrafo; la scelta delle parole da marcare dipende dal compito.]) <fig-tipo-352>
]

#let collegamenti() = confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#foglio(colore: white)[
        #etichetta[Solo colore]
        #v(8pt)
        Per preparare la visita, consulta gli #text(fill: rgb("286FBF"))[orari e i biglietti della mostra].
        #v(8pt)
        #etichetta[mostra.example/orari]
      ]],
      [#foglio(colore: white)[
        #etichetta[Colore e sottolineatura]
        #v(8pt)
        Per preparare la visita, consulta gli #underline(text(fill: rgb("286FBF"))[orari e i biglietti della mostra]).
        #v(8pt)
        #etichetta[mostra.example/orari]
      ]],
    )
    #v(6pt)
    #etichetta[La destinazione si capisce dalle parole.]
  ], kind: image, caption: [Entrambi i campioni hanno contrasto sufficiente sul bianco (5,10:1). Nel primo il solo colore non distingue abbastanza il link dal corpo; nel secondo la sottolineatura aggiunge un segnale stabile. Le parole anticipano la destinazione.]) <fig-tipo-353>
]

#let interfaccia(font, nome) = foglio(font: font)[
  #etichetta(nome)
  #v(8pt)
  Prenota una visita al laboratorio
  #v(8pt)
  Scegli il giorno e controlla i posti disponibili prima di confermare.
  #v(8pt)
  19 ottobre 2026 · 14:30
  #v(8pt)
  #block(width: 100%, fill: inchiostro, inset: (x: 9pt, y: 7pt))[
    #text(fill: white)[Conferma la visita]
  ]
]

#let fallback() = confronto[
  #figure([
    #grid(columns: (1fr, 1fr), gutter: 5mm,
      [#interfaccia("DM Sans 9pt", [Font previsto · DM Sans])],
      [#interfaccia("Sora", [Font di riserva · Sora])],
    )
    #v(6pt)
    #etichetta[Interfaccia simulata · corpo nominale 12 pt]
    #linebreak()
    #etichetta[Stessa larghezza, interlinea e contenuto.]
  ], kind: image, caption: [Interfaccia simulata: DM Sans e Sora allo stesso corpo nominale, con uguali contenuto, larghezza e interlinea. Le proporzioni cambiano i ritorni a capo e l’ingombro. Questa prova non misura i tempi di caricamento.]) <fig-tipo-354>
]

#let paragrafo-prova = [Quando il paragrafo prosegue per più righe, il lettore deve poter ritrovare l’inizio della successiva. Il rapporto fra corpo, giustezza e interlinea va osservato sul testo e nel formato previsti.]
// I due pannelli restano uniti nella colonna, in ordine verticale.
// Il testo scorre prima del confronto; larghezza e valori della prova non cambiano.
#let interlinea() = [
  #figure([
    #grid(columns: (1fr,), row-gutter: 10pt,
      [#foglio(inset: (x: 16pt, y: 8pt))[
        #etichetta[Corpo 12 / interlinea 14]
        #v(8pt)
        #paragrafo-prova
      ]],
      [#foglio(inset: (x: 16pt, y: 8pt))[
        #etichetta[Corpo 12 / interlinea 18]
        #v(8pt)
        // Solo il paragrafo di confronto cambia distanza fra le linee di base.
        #block[
          #set par(leading: 6pt)
          #paragrafo-prova
        ]
      ]],
    )
    #v(6pt)
    #etichetta[Uguali: testo, DM Sans Regular, corpo 12 pt e giustezza 155,09 pt.]
    #linebreak()
    #etichetta[Cambia: interlinea 14 oppure 18 pt.]
  ], kind: image, caption: [Stesse parole, DM Sans Regular 12 pt e larghezza 155,09 pt; cambia l’interlinea, da 14 a 18 pt. I valori descrivono questa prova. Osserva il passaggio alla riga successiva e l’ingombro del paragrafo.]) <fig-tipo-355>
]

// Esercizio della fonte486: il titolo è locale e non incrementa le sezioni.
// I sei campi sono conservati; le righe sono spazi di scrittura, non righe di prosa.
// La tavola chiude i Consigli prima della sezione web: non è una figura mobile.
#let esercizio() = tavola-documentaria(fissa: true)[
  #foglio[
    #text(size: 14pt, weight: 900)[Il mio prossimo confronto]
    #v(14pt)
    #for campo in (
      [Testo, formato e condizioni che mantengo uguali],
      [Compito e risultato che voglio verificare],
      [Parametro che cambia fra A e B],
      [Ordine dei campioni e persone coinvolte],
      [Errori, esitazioni e comprensione osservati],
      [Decisione e compromesso accettato],
    ) [
      #block(breakable: false)[
        #campo
        #v(10pt)
        #line(length: 100%, stroke: 0.4pt + inchiostro)
      ]
      #v(14pt)
    ]
  ]
]
