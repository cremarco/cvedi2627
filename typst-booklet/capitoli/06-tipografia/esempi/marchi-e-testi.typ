// Siti e marchi: le schermate conservate non descrivono versioni future del sito.
#import "../../../template/editoriale.typ": testo-diritti
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/campioni.typ": confronto
#import "../../../template/documenti.typ": dettaglio, tavola-documentaria

=== Marchi e testi: Mancini, Rustichella e Aesop

Due produttori dello stesso settore possono presentare voci tipografiche differenti. Nelle schermate conservate di Pasta Mancini e Rustichella d’Abruzzo (@fig-tipo-332a, @fig-tipo-332b e @fig-tipo-332c) il confronto pertinente riguarda il lettering dei marchi (@fig-tipo-332d e @fig-tipo-332e) e il trattamento tipografico degli altri testi. Le grazie, l’inclinazione e le proporzioni permettono di descrivere differenze reali senza ricavare dal marchio una misura della qualità del prodotto @t06-mancini.#sito([Pasta Mancini, sito ufficiale. Le figure riproducono schermate conservate della fonte.], "https://www.pastamancini.com/") @t06-rustichella.#sito([Rustichella d’Abruzzo, sito ufficiale. Le figure riproducono schermate conservate della fonte.], "https://rustichella.it/")

Nel caso Mancini una frase in corsivo con grazie si distingue dal disegno senza grazie di altri testi. Il *cambiamento di registro* non implica un’incoerenza: il corsivo può essere riservato a un’affermazione specifica, mentre le informazioni variabili vengono affidate a forme più regolari. Nella frase di Rustichella osserviamo invece una diversa presenza di grazie e dettagli. L’analisi deve rimanere legata alla versione riprodotta; lo screenshot conservato non dimostra che il sito attuale conservi lo stesso font.

Aesop aggiunge, nella @fig-tipo-333, un esempio del rapporto fra il nome e i testi della pagina. Il logotipo presenta tratti modulati, mentre il titolo e la descrizione adottano forme più uniformi. Il contrasto fra una scritta distintiva e *caratteri di accompagnamento* più regolari può diventare parte dell’identità visiva di un prodotto. Prima di chiamare «serif» l’intero sistema bisogna guardare i singoli testi: il nome e le descrizioni possono usare disegni diversi @t06-aesop.#sito([Aesop, sito ufficiale. La figura riproduce la schermata conservata della fonte.], "https://www.aesop.com/")

I tre casi consentono di discutere il tono partendo da indizi circoscritti. Una forma può richiamare tradizione o precisione attraverso convenzioni incontrate in altri documenti, ma quelle associazioni *non sono risultati obbligatori*. Il valore del confronto consiste nel riconoscere quali parti del nome siano personalizzate e quali testi vengano composti con un repertorio riutilizzabile. Qui non analizziamo la distribuzione delle immagini o la struttura della pagina web: isoliamo la voce delle lettere e il suo rapporto con le parole che accompagnano il prodotto.

// Schermata e dettaglio derivano dai due originali conservati in Figma.
// Il ritaglio riguarda solo l'immagine, senza posizionare righe del capitolo.
#confronto[
  #grid(columns: (270pt, 104.18pt), gutter: 14.17pt,
    [
      #figure([
        #image(path("/assets/images/figure/tipografia/esempi/marchi/pasta-mancini-schermata-corsivo.png"), width: 270pt,
          alt: "Pasta Mancini: schermata conservata con frase in corsivo e altri testi senza grazie.")
        #v(8pt)
        #text(size: 9pt)[Dettaglio ingrandito del corsivo]
        #v(4pt)
        #dettaglio(path("/assets/images/figure/tipografia/esempi/marchi/pasta-mancini-home-storica.jpg"),
          width: 270pt, height: 20.625pt, originale-width: 515.625pt, originale-height: 292.969pt,
          dx: -123.75pt, dy: -249.84pt,
          alt: "Frase in corsivo della stessa homepage Mancini, ingrandita dal documento originale.")
      ], kind: image, caption: [Pasta Mancini: corsivo con grazie e testi senza grazie nello screenshot conservato.
        #v(4pt)#testo-diritti[Pasta Mancini.]
      ]) <fig-tipo-332a>
      #v(10pt)
      #immagine(path("/assets/images/figure/tipografia/esempi/marchi/pasta-mancini-monogramma-e-nome.png"),
        [Mancini Pastificio Agricolo: monogramma M e nome senza grazie su tre righe.],
        diritti: [Pasta Mancini.], width: 40.437pt,
        alt: "Mancini Pastificio Agricolo: monogramma M sopra il nome su tre righe.",
      ) <fig-tipo-332d>
    ],
    [
      #figure(image(path("/assets/images/figure/tipografia/esempi/marchi/pasta-mancini-schermata-estesa.png"),
        width: 104.18pt, alt: "Pasta Mancini: screenshot esteso conservato del sito."),
        kind: image, caption: none) <fig-tipo-332b>
    ],
  )
  // La didascalia della schermata lunga usa l'intera larghezza del confronto.
  // Il numero e il collegamento restano quelli della figura nativa.
  #v(8pt)
  #block(width: 137mm, above: 0pt, below: 0pt)[
    #set text(size: 9pt, weight: 300, variations: (opsz: 9))
    #set par(justify: false, leading: 1.8pt, spacing: 0pt)
    #text(weight: 500)[#ref(<fig-tipo-332b>) —] Pasta Mancini: screenshot esteso del sito. «Il pastificio agricolo», «La pasta» e «Agenda» mostrano ruoli tipografici differenti.
    #v(4pt)#testo-diritti[Pasta Mancini.]
  ]
]

// La tavola450 della fonte contiene soltanto questi tre documenti:
// restano sullo stesso foglio ordinario, senza una fascia delle note vuota.
#tavola-documentaria[
  // I soli intervalli espliciti separano i tre documenti: niente spazi duplicati.
  #set par(spacing: 0pt)
  #set block(above: 0pt, below: 0pt)
  #immagine(path("/assets/images/figure/tipografia/esempi/marchi/rustichella-abruzzo-schermata.png"),
    [Rustichella d’Abruzzo: titolo con grazie nello screenshot conservato del sito.],
    diritti: [Rustichella d’Abruzzo.], alt: "Rustichella d’Abruzzo: schermata conservata con titolo con grazie.",
  ) <fig-tipo-332c>
  #v(6pt)
  #figure(image(path("/assets/images/figure/tipografia/esempi/marchi/aesop-schermata-nome-e-testi.jpg"),
    width: 137mm, height: 140.837pt, fit: "contain",
    alt: "Aesop: schermata conservata con nome e testi di accompagnamento."),
    kind: image, caption: [Aesop: tratti modulati nel nome e testi più uniformi nello screenshot conservato.
      #v(4pt)#testo-diritti[Aesop.]
    ]) <fig-tipo-333>
  #v(6pt)
  #immagine(path("/assets/images/figure/tipografia/esempi/marchi/rustichella-abruzzo-marchio-centenario.png"),
    [Rustichella d’Abruzzo, marchio del centenario: «1924–2024, 100 anni di pasta», con cifre e scritta con grazie.],
    diritti: [Rustichella d’Abruzzo.], width: 120pt,
    alt: "Rustichella d’Abruzzo: marchio del centenario1924–2024.",
  ) <fig-tipo-332e>
]
