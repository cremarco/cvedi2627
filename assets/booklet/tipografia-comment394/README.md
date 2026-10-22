# Esempi tipografici · commento 394

Figure vettoriali originali, senza ricostruzioni di caratteri o immagini documentarie. Gli originali DM Sans 4.004, Roboto Serif 1.008 ed EB Garamond 1.003, le licenze OFL e i METADATA ufficiali sono conservati in `originals/`. Il tondo di Roboto Serif ed EB Garamond provengono, invariati, dai cataloghi locali precedenti; DM Sans e il vero corsivo di Roboto Serif provengono dal repository ufficiale Google Fonts. Hash e URL sono nel manifest.

I glifi sono sagomati con HarfBuzz usando i file originali e gli assi dichiarati, poi esportati come percorsi FontTools. Non ci sono elementi SVG `text`, font di riserva, immagini raster o ritagli. I testi restano registrati nel manifest per la revisione; dopo l’importazione i glifi sono percorsi, non testo Figma editabile. Le didascalie editoriali e i diritti sono separati e vanno creati nativamente in Figma.

| File | Dimensioni native, pt | Parametro osservato |
| --- | --- | --- |
| `01-segni-da-distinguere.svg` | 388,35 × 156 | Stessi segni e corpo, due famiglie; nessuna classifica di leggibilità |
| `02-corpo-e-altezza-apparente.svg` | 388,35 × 146 | Corpo 12 e baseline comuni, altezze effettive della x |
| `03-interlinea.svg` | 388,35 × 136 | Stesso testo 12/12 oppure 12/16 |
| `04-spaziatura.svg` | 388,35 × 172 | Riferimento, tracking +0,6 pt, oppure spazi tra parole +3 pt |
| `05-reflow-impilato.svg` | 187,09 × 270 | Stesso paragrafo 12/16, giustezze 187,09 e 108 pt, campioni impilati |
| `06-corsivo-originale-e-simulato.svg` | 187,09 × 210 | Vero corsivo e tondo inclinato geometricamente di 12°, stessa parola a 24 pt |
| `01-segni-compatto.svg` | 187,09 × 48 | Una stringa autentica a 26 pt, senza deformazioni |
| `07-densita-compatto.svg` | 388,35 × 44 | Due blocchi uguali 12/14, peso 400 oppure 700 |
| `08-interlinea-compatto.svg` | 187,09 × 44 | Stesse due righe a 12 pt, interlinea 14 oppure 18 pt |
| `09-corpo-apparente-compatto.svg` | 187,09 × 36 | xH autentiche a 24 pt sulla baseline comune, proporzioni non compensate |
| `09b-corpo-apparente-eb-garamond.svg` | 187,09 × 36 | DM Sans ed EB Garamond a 24 pt: differenza autentica più evidente nell’altezza della x |
| `10-allineamenti-compatto.svg` | 388,35 × 44 | Stesse due righe: sinistra, centrato e giustificato con ultima riga a sinistra |
| `11-giustezza-compatto.svg` | 187,09 × 58 | Stesso testo 12/14 ricomposto in due o tre righe, senza sillabazione |
| `12-spaziatura-compatto.svg` | 187,09 × 44 | Tracking +0,6 pt in «Leggi» oppure solo spazio tra parole +3 pt in «il nome» |

L’unica deformazione è il campione esplicitamente etichettato «simulazione» nella figura 06. Non è presentato come corsivo autentico. Nessuna compensazione di scala o deformazione orizzontale è applicata agli altri campioni. Le figure non attestano un rendimento di lettura migliore in assoluto.

## Riproduzione

Con Python e le versioni indicate in `requirements.txt`:

```sh
python3 generate_figures.py
```

È possibile rigenerare un sottoinsieme con `--figures 5,6` oppure le varianti compatte con `--figures 1c,7,8,9,9b,10,11,12`. Il generatore verifica ogni glifo, gli ingombri nel viewport e la conservazione integrale del paragrafo ricomposto; il manifest registra assi, corpo, baseline, tracking, spazi, testi e hash degli output. Nella figura 10 la giustificazione amplia soltanto gli spazi tra parole della riga non finale: non cambia il disegno dei glifi, il tracking o l’ultima riga. Nella figura 12 i valori sono incrementi rispetto agli avanzamenti originali del font, non spazi assoluti: ogni colonna cambia un solo parametro.

Le anteprime locali sono state rese con Sharp a 2× o 3× e verificate visivamente. Questa verifica non sostituisce il controllo dell’importazione, della resa sulla pagina e delle didascalie native in Figma. Nessuna modifica al design è eseguita dal generatore.
