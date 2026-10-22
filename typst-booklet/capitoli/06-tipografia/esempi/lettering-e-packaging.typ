// Originali e ingrandimenti documentari: le quote riguardano solo le immagini.
#import "../../../template/editoriale.typ": testo-diritti
#import "../../../template/stile.typ": immagine, sito
#import "../../../template/campioni.typ": confronto
#import "../../../template/documenti.typ": dettaglio

=== Calligrafia e lettering nei marchi

Il confronto fra marchi calligrafici e nomi dalle lettere più regolari rende visibile la varietà del lettering. Kellogg’s (@fig-tipo-334a) collega la propria scritta alla firma del fondatore nella documentazione aziendale. Il segno conserva un andamento continuo e riconoscibile, ma la sua riproduzione è un esecutivo definito, non una firma diversa ogni volta. La scrittura personale diventa *un’identità ripetibile* @t06-kelloggs.#sito([Kellogg’s, Our History: firma del fondatore e marchio.], "https://www.kelloggs.com/en-tr/who-we-are/our-history.html")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
#box(width: 100%, height: 68.28pt, align(center + horizon, image(path("/assets/images/figure/tipografia/esempi/lettering/kelloggs-marchio.jpg"), width: 126.071pt, alt: "Marchio Kellogg’s, lettering continuo.")))
], kind: image, caption: [Kellogg’s: lettering continuo basato sulla firma.
  #v(4pt)#testo-diritti[Kellogg’s.]
]) <fig-tipo-334a>
],
[#figure([
#box(width: 100%, height: 68.28pt, align(center + horizon, image(path("/assets/images/figure/tipografia/esempi/lettering/barbie-marchio.jpg"), width: 141.505pt, alt: "Marchio Barbie, lettere inclinate e collegate.")))
], kind: image, caption: [Barbie: scritta inclinata e lettere collegate.
  #v(4pt)#testo-diritti[Mattel / Barbie.]
]) <fig-tipo-334b>
],
  )
]

Barbie (@fig-tipo-334b) e Disney (@fig-tipo-334c) offrono altri nomi che utilizzano gesti grafici caratterizzati. Le curve, i raccordi e alcuni particolari delle iniziali permettono di riconoscere il marchio prima di analizzare ogni segno. La somiglianza con un font script disponibile in commercio non basta però a identificarne l’origine. Riprodurre un nome digitandolo in Brush Script o in un carattere ispirato al marchio non equivale a mostrare il documento autentico. Anche l’etichetta «per bambini» è troppo generica: il segno vive dentro una storia di prodotti e di narrazioni, non dentro una proprietà universale delle curve @t06-barbie.#sito([Mattel Creations, Barbie Signature.], "https://uk.creations.mattel.com/pages/barbie-signature") @t06-disney.#sito([Disney, sito ufficiale; marchio consultato il 20 ottobre 2026, disegno non datato.], "https://www.disney.com/")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#block(breakable: false)[
      #set par(justify: false, spacing: 4pt)
      #text(size: 10pt, weight: 500)[Brush Script MT Italic]
      #v(4pt)
      #box(width: 100%, height: 54pt, align(left + horizon,
        image(path("/assets/images/figure/tipografia/esempi/lettering/brush-script-mt-specimen.svg"),
          width: 53.9121pt, alt: "Tre glifi autentici Brush Script MT Italic.")))
      #v(4pt)
      #text(size: 9pt, weight: 300)[Tre glifi della versione digitale attuale; questo campione non è il lettering dei marchi.]
      #v(4pt)#testo-diritti[© Monotype.]
    ]],
    [#figure([
      #grid(columns: (1fr, 1fr), column-gutter: 12pt,
        box(height: 70pt, align(center + horizon,
          image(path("/assets/images/figure/tipografia/esempi/lettering/disney-wordmark-ufficiale-2026.png"), width: 86.46pt,
            alt: "Wordmark Disney ufficiale, disegno non datato."))),
        box(height: 70pt, align(center + horizon,
          image(path("/assets/images/figure/tipografia/esempi/lettering/lego-marchio-storico-1973-1998.jpg"), width: 54pt,
            alt: "LEGO: versione storica del marchio 1973–1998."))),
      )
    ], kind: image, caption: [Disney: marchio del sito ufficiale, consultato 20 ottobre 2026; disegno non datato. LEGO: versione 1973–1998.
      #v(4pt)#testo-diritti[© Disney. © The LEGO Group.]
    ]) <fig-tipo-334c>],
  )
]

LEGO costruisce una diversa presenza attraverso lettere arrotondate e contorni marcati. La storia ufficiale documenta nel 1973 una revisione con il doppio bordo intorno alle lettere bianche. @t06-lego.#sito([The LEGO Group, A modern, international company: marchio 1973–1998.], "https://www.lego.com/en-us/history/articles/f-a-modern-international-company") Il contorno rende il nome una figura definita e va distinto dal *peso del glifo*: ispessire una lettera e aggiungerle un bordo producono effetti differenti sulle controforme e sulla distanza fra i segni del nome. Anche Nike (@fig-tipo-334d) richiede di separare gli elementi: lo Swoosh è un simbolo, mentre la dicitura Nike è lettering e i testi pubblicitari appartengono a un sistema più ampio. Il caso impedisce di usare la figura di un emblema come prova del font della marca @t06-nike2025.#sito([Department of Nike Archives, The Nike Swoosh Logo, 2 ottobre 2025.], "https://about.nike.com/en/magazine/nike-swoosh-logo-history") In tutti questi nomi il punto utile è la *distinzione fra segno particolare e repertorio*: conoscere le forme di un logotipo aiuta a descriverne la riconoscibilità, ma non autorizza a ricostruire l’intero alfabeto né a prevedere la risposta di qualsiasi lettore.

#figure([
#dettaglio(path("/assets/images/figure/tipografia/esempi/lettering/nike-timeline-marchi-archivio-2025.jpg"), width: 130pt, height: 68pt,
  originale-width: 652.8pt, originale-height: 435.2pt, dx: -433.695pt, dy: -70.9766pt,
  alt: "NIKE: lettering e Swoosh completi nel dettaglio etichettato 1976 della tavola ufficiale.")
], kind: image, caption: [NIKE: lettering e Swoosh, versione indicata 1976 nella tavola del Department of Nike Archives (2025). Dettaglio.
  #v(4pt)#testo-diritti[© NIKE, Inc.]
]) <fig-tipo-334d>


=== Tropicana: i limiti del confronto

Il ridisegno Tropicana del 2009 non cambia solo le lettere (@fig-tipo-335b). La foto accosta versioni Orange Tangerine: il nome orizzontale sopra l’arancia con cannuccia diventa verticale sul margine. Nel nuovo fronte dominano un bicchiere e «100% orange and tangerine». Cambiano insieme trattamento del nome, immagine e gerarchia: non è un confronto del solo font. Queste osservazioni non misurano la risposta dei lettori. Chiedere «riesci a leggere Tropicana?» è diverso da chiedere «ritrovi il prodotto abituale?». Un nome decifrabile può avere un profilo meno familiare; la fotografia non dimostra quale elemento abbia determinato un esito commerciale @t06-airey2015.#sito([David Airey, Logo Design Love, 2ª ed., p. 61; foto Brian Alexander Gray.], "https://www.pearson.de/media/muster/ext/9780133812770.pdf") La @fig-tipo-335a conserva un’altra fotografia, di _j_lai_: le due confezioni appartengono a varianti differenti del prodotto, perciò non isolano una sola variabile @t06-jlai2008.#sito([j_lai, tropicana - old and new, 20 dicembre 2008; #link("https://creativecommons.org/licenses/by/2.0/")[CC BY 2.0].], "https://www.flickr.com/photos/jlai321/3123175118")

#confronto[
  #grid(columns: (1fr, 1fr), gutter: 5mm,
[#figure([
#box(width: 100%, height: 145.514pt, align(center + horizon, [#dettaglio(path("/assets/images/figure/tipografia/esempi/confronti/tropicana-j-lai-2008-varianti-diverse.jpg"), width: 157pt, height: 73.59375pt,
  originale-width: 209.333pt, originale-height: 167.4667pt, dx: -26.9844pt, dy: -24.53125pt,
  alt: "Tropicana: due confezioni di varianti diverse nella fotografia j_lai.")]))
], kind: image, caption: [Tropicana: dettagli. Varianti diverse; fotografia ritagliata.
  #v(4pt)#testo-diritti[j_lai, 20 dicembre 2008; CC BY 2.0.]
]) <fig-tipo-335a>
],
[#immagine(path("/assets/images/figure/tipografia/esempi/confronti/tropicana-orange-tangerine-2009-confronto.jpg"),
  [Tropicana Orange Tangerine: prima a sinistra, redesign del 2009 a destra. Data dello scatto non indicata.], diritti: [Foto Brian Alexander Gray, in D. Airey, Logo Design Love, 2ª ed., p. 61; estratto Pearson.],
  alt: "Tropicana Orange Tangerine: prima a sinistra, redesign del 2009 a destra. Data dello scatto non indicata.", width: 187.09pt,
) <fig-tipo-335b>
],
  )
]

Frutteto (@fig-tipo-335) è un marchio fittizio, non una confezione Tropicana né un test sulle vendite. Serve a isolare il cambiamento delle lettere: nome, figura del frutto, colori, posizione e corpo nominale restano uguali. A sinistra il nome è in EB Garamond Regular, con grazie e contrasto fra tratti sottili e spessi; a destra è in Helvetica Regular, senza grazie e con tratti più uniformi. Osserviamo soprattutto i terminali della F e della t. Le due parole hanno larghezze diverse perché cambiano le proporzioni dei glifi, anche a parità di corpo nominale. Per una verifica con lettori, separiamo tre compiti: leggere il nome, riconoscere il prodotto e descriverne il tono. Dichiariamo le variabili mantenute costanti, pubblico e condizioni della prova. Il solo carattere non basta a spiegare una variazione delle vendite. Il confronto non autorizza regole come «i sans serif fanno perdere fiducia»: vale per casi specifici.

#confronto[
#figure([
#dettaglio(path("/assets/images/figure/tipografia/esempi/confronti/frutteto-serif-sans-confronto.svg"), width: 388.35pt, height: 167.94pt,
  originale-width: 388.35pt, originale-height: 194.175pt, dx: 0pt, dy: -11.36pt,
  alt: "Frutteto, marchio fittizio: nome e figura uguali, lettere in EB Garamond e Helvetica.")
], kind: image, caption: [Frutteto, confronto fittizio: a sinistra EB Garamond Regular (serif), a destra Helvetica Regular (sans serif). Restano uguali nome, figura del frutto, colori, posizione e corpo nominale; cambiano le forme delle lettere e la larghezza della parola.
  #v(4pt)#testo-diritti[Contorni autentici dei due caratteri.]
]) <fig-tipo-335>
]
