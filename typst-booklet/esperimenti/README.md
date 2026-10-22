# Demo precedenti del booklet

Le prove precedenti al template a capitoli sono raccolte qui. Il documento corrente è [main.typ](../main.typ); non importa queste demo né i loro pacchetti locali. Aprire `typst-booklet/` in VS Code, così tutte le prove ereditano la stessa configurazione di radice e font.

## Sorgenti

| File relativo a questa cartella | Scopo della prova |
| --- | --- |
| `base.typ` | Testo, titoli, accento di Tipografia e due colonne su pagina 170 × 240 mm. |
| `pagine-figma/main.typ` | Tavole 360, 361 e 413 dello snapshot Figma, ricomposte con coordinate. |
| `pagine-figma/testo-stili.json` | Testi e stili estratti per le tre tavole. |
| `sagoma-doppia-pagina/main.typ` | Doppia pagina 344–345 con un’immagine del Duomo sul dorso e quattro colonne concatenate. |
| `sagoma-doppia-pagina/contenuto.typ` | Paragrafi modificabili della doppia pagina, separati dalla composizione. |
| `sagoma-doppia-pagina/contorno.py` | Generatore del profilo alpha sperimentale del Duomo. |

La prova della doppia pagina importa la copia locale di **Meander 0.4.4** in `vendor/meander/`, modificata per quell’esperimento, e la dipendenza in `vendor/hy-dro-gen/`. I due pacchetti mantengono la disposizione originale e le licenze. La gabbia della prova ha una capacità fissa: se il testo supera le quattro colonne, segnala un errore. Il booklet corrente usa pagine native e il pacchetto ufficiale, come descritto nel [README del progetto](../README.md).

## Compilazione

Dalla radice del repository, preparare la cartella di uscita:

```sh
mkdir -p typst-booklet/build/esperimenti
```

Compilare la prova desiderata con i font condivisi:

```sh
typst compile --root . --ignore-system-fonts --font-path assets/fonts/editoriali typst-booklet/esperimenti/base.typ typst-booklet/build/esperimenti/base.pdf
typst compile --root . --ignore-system-fonts --font-path assets/fonts/editoriali typst-booklet/esperimenti/pagine-figma/main.typ typst-booklet/build/esperimenti/pagine-figma.pdf
typst compile --root . --ignore-system-fonts --font-path assets/fonts/editoriali typst-booklet/esperimenti/sagoma-doppia-pagina/main.typ typst-booklet/build/esperimenti/sagoma-doppia-pagina.pdf
```

`--input scala-duomo=0.9` permette di provare una diversa scala nella doppia pagina. Tutti i PDF generati restano in `build/`; le precedenti proposte A/B e i PDF superati delle demo sono rimossi. I sorgenti e le attribuzioni restano conservati.

## Asset, fonti e attribuzioni

La fonte delle tavole è il file Figma **Booklet — Comunicazione visiva e design delle interfacce**, chiave `WLdDzbdqP3P5rpYbK1OxYC`, sezione [Tipografia](https://www.figma.com/design/WLdDzbdqP3P5rpYbK1OxYC/?node-id=4226-16023). I numeri di tavola identificano lo snapshot delle demo, non la paginazione del nuovo booklet.

Le demo usano i percorsi assoluti rispetto alla radice Typst del repository, senza mantenere una seconda cartella di immagini dentro `typst-booklet/`:

- `assets/images/figure/tipografia/duomo-firenze-illustrazione.png`: riempimento Figma dell’istanza `4501:9273`; illustrazione di studio, 2026. Autore nominativo, titolare dei diritti e licenza non sono attestati nella fonte.
- `assets/images/figure/tipografia/bodoni-manuale-1818-frontespizio.jpg`: riempimento dell’istanza `4368:44544`. Attribuzione conservata: *Manuale tipografico*, vol. I, 1818; Giambattista Bodoni, edizione postuma; Biblioteca Bodoni, Universidad de Salamanca. L’ente conservatore non viene assunto come titolare dei diritti della riproduzione; nessuna licenza documentata nella fonte della demo.
- `assets/archivio/typst/figure/anatomia-tipografica-quote.svg` e `anatomia-tipografica-dettagli.svg`: disegni locali delle tavole 360 e 361, conservati senza modifiche.
- `assets/archivio/typst/figure/langosteria-cba-editoriale.png`, `langosteria-cba-logotipo.png` e `langosteria-cba-monogramma.png`: riproduzioni della tavola 413. Il [progetto CBA Design per Langosteria](https://cba-design.com/italy/work/langosteria-rebranding/) attribuisce il progetto a CBA Design e le illustrazioni a Elisa Macellari; logotipo e monogramma sono attribuiti a CBA Design per Langosteria. Nessuna nuova licenza assegnata.
- `assets/archivio/typst/dati/duomo-profilo-sperimentale.json`: array storico di 44 fasce con il rispetto incorporato. È incompatibile con il profilo a dizionario del template corrente; non sostituire i due dati fra loro. Il riordino conserva i byte del profilo e non lo rigenera.

`pagine-figma/testo-stili.json` conserva testi e stili delle tavole 360 (`4345:53282`), 361 (`4345:53410`) e 413 (`4345:61842`). Originali, provenienza e hash delle immagini sono nel [manifest condiviso](../../assets/images/manifest.json) e nell’archivio.

I font DM Sans e Sora, con i testi **SIL Open Font License 1.1**, sono nella cartella condivisa `assets/fonts/editoriali/`. Fonti ufficiali e hash sono registrati nel [manifest dei font](../../assets/fonts/editoriali/manifest.json).
