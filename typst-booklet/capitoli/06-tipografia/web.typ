// Tipografia per il web, tavole487–490: nessuna altezza imposta alla prosa.
// I campioni sono documenti vettoriali originali; il codice è nativo e modificabile.
#import "../../template/stile.typ": immagine, sito
#import "../../template/documenti.typ": dettaglio
#import "../../template/editoriale.typ": nota-compatta, testo-diritti

== Tipografia per il web

=== Dal file alla pagina

Sul web la scelta di un carattere dipende anche da un file disponibile e da come il browser compone il testo. Un download lento o un segno mancante possono attivare un font di riserva: la pagina deve funzionare anche in quella condizione.

OpenType descrive dati e funzioni del font @t06-opentype-file.#sito([Microsoft, The OpenType Font File.], "https://learn.microsoft.com/en-us/typography/opentype/spec/otff") WOFF2 (*Web Open Font Format 2.0*) è un formato compresso per distribuirli sul web, anche nel caso di font variabili. Non è un’altra categoria stilistica e non rende ogni file più leggero di qualunque alternativa @t06-woff2024.#sito([W3C (2024), WOFF 2.], "https://www.w3.org/TR/WOFF2/")

#block(sticky: true, above: 10pt, below: 4pt)[#text(size: 14pt, weight: 900)[Un esempio CSS]]

La regola \@font-face associa un nome a una risorsa; font-family lo richiama nel testo. Nel codice il percorso è dimostrativo. Il range 100–1000 richiede il file variabile corrispondente @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: regola font-face e descrittori.], "https://www.w3.org/TR/css-fonts-4/#font-face-rule")  Controlla il permesso web e conserva licenza e avvisi: DM Sans e Sora sono distribuiti con SIL OFL 1.1 @t06-ofl2007.#sito([SIL International, OFL FAQ: uso web e servizi webfont.], "https://openfontlicense.org/ofl-faq/#2-using-ofl-fonts-for-webpages-and-online-webfont-services")

// Il codice rimane testo selezionabile. Il percorso del font è dimostrativo.
#block(breakable: false, above: 8pt, below: 10pt)[
  #set text(font: "DM Sans 9pt", size: 10pt)
  #set par(justify: false, leading: 2pt)
  #show raw: set text(font: "DM Sans 9pt", size: 10pt)
#raw("@font-face {\n  font-family: \"DM Sans\";\n  src: url(\"dm-sans.woff2\")\n    format(\"woff2\");\n  font-weight: 100 1000;\n  font-style: normal;\n  font-display: swap;\n}\n.titolo {\n  font-family: \"DM Sans\",\n    sans-serif;\n}", lang: "css", block: true)
]

=== Scegliere il font disponibile

font-family è una lista di priorità, non la promessa che tutto il testo userà una sola famiglia. Se il font manca o non contiene un segno, il browser cerca un’alternativa. Chiudi la lista con una famiglia generica, come sans-serif: il suo risultato dipende dal dispositivo @t06-font-family.#sito([MDN, font-family.], "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-family")

font-display regola che cosa accade durante l’attesa. Con swap il font può sostituire quello di riserva quando diventa disponibile; fallback e optional limitano questa possibilità. Non rendono il file più veloce. Una sostituzione può cambiare i ritorni a capo: la @fig-tipo-354 mostra già questo effetto fra DM Sans e Sora @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: font-display.], "https://www.w3.org/TR/css-fonts-4/#font-display-desc")

La @fig-tipo-356 distingue due condizioni, non due istanti cronometrati. Sora è dichiarato già disponibile nella condizione di riserva: non rappresenta il risultato garantito di sans-serif. Nella pagina reale rallenta o blocca il font, ricarica senza cache e controlla quali lettere e contenuti rimangono accessibili.

Osserva anche nomi accentati, importi e simboli del progetto. Una sostituzione può riguardare soltanto alcuni segni, non l’intero paragrafo. Se un titolo cambia riga, verifica ciò che spinge più in basso, non soltanto il titolo.

#immagine(path("/assets/images/figure/tipografia/web/font-disponibile-e-fallback-sora.svg"),
  [Due condizioni della stessa richiesta. Sora è già disponibile come riserva; quando DM Sans è disponibile, torna la priorità del primo nome. Non sono misurati tempi di caricamento.], diritti: [©2019 The Sora Project Authors; ©2014 The DM Sans Project Authors. SIL OFL 1.1.], alt: "Due condizioni della stessa richiesta. Sora è già disponibile come riserva; quando DM Sans è disponibile, torna la priorità del primo nome. Non sono misurati tempi di caricamento.", width: 187.09pt,
) <fig-tipo-356>

=== Dichiarare le variazioni

Un font variabile espone intervalli progettati nel file. Per il peso, il descrittore font-weight di \@font-face dichiara l’intervallo disponibile; la proprietà font-weight sceglie poi un valore per il testo. Nel DM Sans usato qui l’asse wght va da 100 a 1000: 650 è una posizione reale, non un grassetto simulato @t06-css-fonts2026.#sito([W3C (2026), CSS Fonts 4, Working Draft: font-weight.], "https://www.w3.org/TR/css-fonts-4/#font-weight-desc") Il file della famiglia permette di verificare l’intervallo dichiarato.#sito([DM Sans: originali, metadati e licenza.], "https://github.com/google/fonts/tree/main/ofl/dmsans")

I tre campioni della @fig-tipo-357 mantengono famiglia, corpo, dimensione ottica e contenuto: cambia il peso. Non sono tre font scaricati separatamente. Per gli assi comuni usa prima le proprietà CSS corrispondenti; font-variation-settings serve al controllo di basso livello e può prevalere su quelle proprietà. Non assegnare un asse che il file non contiene @t06-css-fonts2026.#nota-compatta([W3C (2026), CSS Fonts 4; MDN, font-variation-settings.], ("https://www.w3.org/TR/css-fonts-4/#font-variation-settings-def", "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings"))

// Il codice rimane testo selezionabile. Il percorso del font è dimostrativo.
#block(breakable: false, above: 8pt, below: 10pt)[
  #set text(font: "DM Sans 9pt", size: 10pt)
  #set par(justify: false, leading: 2pt)
  #show raw: set text(font: "DM Sans 9pt", size: 10pt)
#raw(".titolo { font-weight: 650; }", lang: "css", block: true)
]

Dopo la dichiarazione, controlla nel browser che sia usato il file previsto e che il peso cambi davvero. Riduci i dati solo dopo aver elencato lingue, segni e stili necessari: un file piccolo che perde accenti o simboli non soddisfa il progetto.

Confronta i valori 400, 650 e 800 sullo stesso titolo. Se appaiono uguali, controlla il file effettivamente usato e l’intervallo dichiarato, prima di correggere il disegno a mano o aggiungere una simulazione.

#immagine(path("/assets/images/figure/tipografia/web/dm-sans-pesi-400-650-800.svg"),
  [DM Sans a 24 pt, dimensione ottica 24: cambiano soltanto i pesi 400, 650 e 800 dell’asse wght. I valori CSS non sono deformazioni geometriche né misure di prestazione.], diritti: [©2014 The DM Sans Project Authors; SIL OFL 1.1.], alt: "DM Sans a 24 pt, dimensione ottica 24: cambiano soltanto i pesi 400, 650 e 800 dell’asse wght. I valori CSS non sono deformazioni geometriche né misure di prestazione.", width: 187.09pt,
) <fig-tipo-357>

=== Verificare la pagina che cambia

Una misura CSS non basta a garantire la lettura. Il contenitore deve accogliere parole più grandi, righe aggiuntive e un font di riserva diverso. La @fig-tipo-358 mostra la stessa azione a 12 e 24 pt: il testo va a capo e il controllo cresce, invece di nascondere le ultime parole. È uno schema di adattamento, non la certificazione di un sito.

// Due dettagli dello stesso SVG: la scala resta1:1 e le condizioni sono affiancate.
// I ritagli eliminano soltanto il bianco fra i due campioni, senza tagliare i segni.
#figure([
  #grid(columns: (1fr, 1fr), gutter: 5mm,
    [#box(width: 100%, height: 118pt)[
      #dettaglio(path("/assets/images/figure/tipografia/web/comando-testo-12-24pt-ricomposto.svg"),
        width: 187.09pt, height: 60pt, originale-width: 187.09pt, originale-height: 200pt,
        dx: 0pt, dy: 0pt, alt: "Stesso comando: testo12pt nella larghezza originale.")
    ]],
    [#dettaglio(path("/assets/images/figure/tipografia/web/comando-testo-12-24pt-ricomposto.svg"),
      width: 187.09pt, height: 118pt, originale-width: 187.09pt, originale-height: 200pt,
      dx: 0pt, dy: -70pt, alt: "Stesso comando: testo24pt, contenitore cresciuto e parole intere.")],
  )
], kind: image, placement: bottom, scope: "parent", caption: [Lo stesso comando a 12 e 24 pt, nella stessa larghezza e con dimensione ottica fissata a 12. Il controllo cresce e conserva le parole. Due condizioni affiancate dello stesso schema; la figura non è un test di conformità WCAG.
  #v(4pt)#testo-diritti[©2014 The DM Sans Project Authors; SIL OFL 1.1.]
]) <fig-tipo-358>



Nella pagina reale prova prima il font caricato e poi quello non disponibile. Ingrandisci il testo fino al 200% senza perdere contenuti o funzioni, nelle condizioni di WCAG 1.4.4. Per il normale contenuto a scorrimento verticale verifica anche 320 CSS pixel di larghezza secondo 1.4.10: non deve essere necessario scorrere sui due assi, salvo le parti ammesse in eccezione @t06-wcag2024.#sito([W3C (2024), WCAG 2.2, 1.4.4 e 1.4.10 (AA).], "https://www.w3.org/TR/WCAG22/#reflow")

Applica poi insieme le spaziature di 1.4.12, già descritte nella @sec-tipo-reflow, senza cambiare altre proprietà. Cerca parole tagliate, sovrapposizioni e comandi che non si possono più raggiungere. Registra browser, dimensioni, file e problema osservato: una figura chiarisce il controllo, ma il risultato si verifica sulla pagina funzionante.#sito([W3C, Understanding Text Spacing, 1.4.12 (AA).], "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html")

Ripeti la prova sul passaggio più lungo e sul comando più impegnativo. Conservare il testo non significa solo vederlo: l’azione deve restare raggiungibile senza dover indovinare parole scomparse.
