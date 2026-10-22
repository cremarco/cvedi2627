# Sette aperture: ricostruzione dei concept ImageGen

Famiglia delle sette aperture attive del booklet Typst, ricostruite dai concept ImageGen selezionati. Il campo radice `aperture` di `typst-booklet/piano.json` vale `assets/booklet/aperture-imagegen-svg-v1`; il resolver legge `manifest.json` e `composizioni.json` e seleziona il disegno per numero di capitolo. La biblioteca precedente di dodici aperture resta conservata in `assets/images/aperture/`; `apertura_originale` nel piano ne mantiene soltanto il riferimento storico.

`svg/` contiene **sette aperture complete**, ognuna con disegno vettoriale e due elementi di testo editabili: `titolo-capitolo` e `numero-capitolo`. Il font variabile Sora è incorporato come font, con licenza OFL: non sono immagini o lettere trasformate in tracciati. `disegni/` contiene i sette fondi senza testo usati nel booklet Typst: il componente nativo compone separatamente titolo e numero in Sora 700 con le quote approvate del campionario, conservando un solo heading per indice e segnalibri. Tutte le forme hanno gruppi semantici e ruoli `data-palette` per modifiche programmatiche.

| Capitolo | SVG completo | Riferimento |
| --- | --- | --- |
| 01 · Storia del design visivo | `svg/01-storia.svg` | `originali/v2-01-storia.png` |
| 02 · Ricerca, persone e culture | `svg/02-ricerca.svg` | `originali/v3-02-ricerca.png` |
| 03 · Accessibilità e inclusione | `svg/03-accessibilita.svg` | `originali/v2-03-accessibilita.png` |
| 04 · Percezione e Gestalt | `svg/04-gestalt.svg` | `originali/v2-04-gestalt.png` |
| 05 · Colore e significato | `svg/05-colore.svg` | `originali/v2-05-colore.png` |
| 06 · Tipografia e lettura | `svg/06-tipografia.svg` | `originali/v2-06-tipografia.png` |
| 07 · Griglie e layout | `svg/07-griglie.svg` | `originali/v2-07-griglie.png` |

## Modificare

Gli SVG completi si possono aprire in un editor vettoriale e modificare come documenti autonomi. Titolo e numero rimangono testo; campiture e geometrie hanno identificatori propri. Il font incorporato è verificato nel browser; il file originale e la licenza condivisi sono in `assets/fonts/editoriali/`.

Per conservare modifiche anche nelle rigenerazioni, lavorare sui fondi in `disegni/` e sulle quote in `composizioni.json`. Il titolo completo e il codice provengono dall'unica definizione in `typst-booklet/piano.json`; nei dati locali è indicata soltanto la posizione del salto di riga. `componi.py` rigenera gli SVG completi e il manifest con gli hash; sovrascrive quindi eventuali modifiche fatte soltanto agli esecutivi in `svg/`.

Per Colore, centri e raggi dei giri del nastro sono in `geometria-colore.json`. `geometria-colore.py` calcola le tangenti comuni alle ellissi e aggiorna il fondo: eseguirlo prima di `componi.py` quando si modificano questi parametri. Sovrascrive il profilo del nastro e i campi di contesto, conservando campiture e campioni.

Dalla radice del repository:

```sh
python3 assets/booklet/aperture-imagegen-svg-v1/geometria-colore.py
python3 assets/booklet/aperture-imagegen-svg-v1/componi.py
typst compile --root . --ignore-system-fonts --font-path assets/fonts/editoriali assets/booklet/aperture-imagegen-svg-v1/campionario.typ reports/booklet-aperture-svg-v1/campionario.pdf
node assets/booklet/aperture-imagegen-svg-v1/verifica-svg.mjs --dettagli --approfondito
typst-booklet/.venv/bin/python3 assets/booklet/aperture-imagegen-svg-v1/verifica.py
```

`campionario.typ` compone gli stessi fondi e le stesse quote con testo Typst nativo. Il campione è di sette pagine da 170 × 240 mm. Anteprime e verifiche rimangono in `reports/booklet-aperture-svg-v1/`.

## Fedeltà e provenienza

Sagome, proporzioni, tagli e incastri sono ricostruiti dai concept selezionati. Le sfumature e le irregolarità raster sono sostituite da campiture piatte nei colori esatti del capitolo. Il nastro di Colore conserva le diciassette famiglie cromatiche richieste e i due campioni corallo sono identici per dimensione e tinta.

I testi usano Sora 700 autentica e mantengono contenuto, gerarchia e collocazione dei concept: i disegni delle lettere generate non sono riprodotti come font. Il grande macrosegno del capitolo 06 è invece una **forma illustrativa ricostruita dal concept**, con controforma e asta; non è presentato come campione autentico del glifo Sora. Questa è anche la grafica attiva del capitolo 06; il campione autentico Sora resta conservato nella biblioteca precedente. Il codice 06 usa blue 600 `#155DFC` sul fondo green 300.

`originali/` conserva le sette immagini generate, `prompts/` i prompt esatti. `manifest.json` registra collegamenti e hash. Il generatore originario è `image_gen.imagegen`, modalità built-in; la ricostruzione impiega soltanto SVG nativi, senza raster incorporati, gradienti o filtri.

## Rifinitura delle forme

I raccordi usano vertici condivisi e tangenti coerenti. Le ellissi e gli archi regolari sono forme analitiche; i distacchi fra gli oggetti e gli intervalli della griglia sono espliciti. Il nastro di Colore ha un solo profilo continuo di ritaglio, con campiture contigue e un sormonto tecnico interno di 0,25 unità per lato contro le fessure da antialias. Il bordo esterno dipende soltanto dal profilo comune.

In Colore tutte le sagome sono composte soltanto da archi ellittici SVG `A` e rette `H`, `V`, `L`: i raccordi diagonali sono tangenti calcolate alle ellissi, senza cubiche libere. Anche i campi di sfondo e l'uscita bianca inferiore usano archi regolari. Le separazioni visibili dello spettro sono singoli segmenti retti; i vertici dei poligoni restano fuori dal profilo visibile. La verifica browser controlla questi vincoli e il rapporto `geometria-colore.json` in `reports/` registra le tangenti calcolate.

La verifica browser con `--dettagli` salva anche i punti di raccordo al 400% in `reports/booklet-aperture-svg-v1/dettagli-400/`. `--approfondito` verifica modifiche native a titolo, numero e colore, ripristina i valori e salva maschere isolate per misurare ingombri e contrasto.

Il controllo generale elimina due piccole controcurve in Ricerca, riallinea le tangenti dei profili di Gestalt e rende monotono il bordo della controforma di Tipografia. Il modulo bianco inferiore sinistro di Griglie termina sullo stesso asse del quarto superiore, a x407. Il numero blu di Tipografia passa da blue 400 a blue 600 (`#155DFC`), con contrasto 3,74 sul fondo verde. Contenuto, font, dimensioni e posizioni dei testi restano quelli del campionario precedente.

Dopo aver aggiornato anche il pacchetto `aperture-svg.zip`, `verifica-approfondita.py` controlla font incorporato, identità delle forme fra fondo ed esecutivo, riferimenti interni, palette, ingombri reali dei testi, contrasto, raccordi continui di Gestalt, corrispondenza delle campiture fra SVG e PDF e contenuto del pacchetto. Si esegue con il Python dell'ambiente booklet; il rapporto è `reports/booklet-aperture-svg-v1/audit-generale.json`. Il confronto numerico esclude due pixel attorno ai bordi per le differenze di antialias; i raccordi vengono anche ispezionati visivamente.
