# Crenatura e spaziatura · commento 397

Tre confronti nuovi con glifi autentici, non copie delle immagini del 2025–2026. Le figure storiche restano riferimenti separati: non ne attribuiamo il font a DM Sans o Roboto Serif e non ne riprendiamo le definizioni errate.

`01-kerning-off.svg` e `02-kerning-on.svg` mantengono Roboto Serif 400, wdth100 e GRAD0: «AVATAR» a 32 pt/opsz32 e AV, VA, To a 20 pt/opsz20. Cambia soltanto la funzione OpenType `kern`, disattivata o attivata; `liga` resta attiva. Origini dei primi glifi, contorni, assi e scale sono uguali. Le differenze reali di avanzamento e posizione sono registrate nel manifest.

`03-tracking-wordspace.svg` mostra «tracking» in DM Sans a 26 pt, con incrementi −0,8/0/+1,6 pt tra glifi successivi, senza incremento finale. Sotto, «il nome» a 12 pt conserva il tracking e cambia soltanto lo spazio fra parole, di 0 oppure +3 pt. Zero indica l’avanzamento originale del font, non uno spazio nullo. I valori sono illustrativi, non raccomandazioni universali per il CSS.

Font, OFL e METADATA sono copiati byte-identici dagli originali già conservati per 394. Il motore di contorni viene riusato in sola lettura; la selezione delle funzioni OpenType è esplicita nel nuovo generatore. Nessun asset o manifest di 394 viene sovrascritto.

Didascalie e diritti rimangono testo nativo esterno. Con FontTools 4.67.0 e uharfbuzz 0.56.3:

```sh
python3 generate_figures.py
```
