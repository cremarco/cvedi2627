# Tipografia per il web · commento 402

Tre schemi vettoriali controllati per la proposta di sezione 9.9. Non sono screenshot di un browser né risultati di prove di caricamento o conformità WCAG.

- `01-disponibilita-font.svg`: due condizioni con Sora già disponibile come riserva e DM Sans disponibile come prima scelta.
- `02-pesi-css.svg`: DM Sans autentico a 24 pt, opsz 24, pesi 400, 650 e 800.
- `03-controllo-adattabile.svg`: stesso comando e larghezza, corpo 12/24 pt, opsz 12 fisso, contenitore che cresce senza tagliare il testo.

DM Sans e la sua OFL sono referenziati dagli originali conservati in `../tipografia-comment394/originals/`, senza copiarli o modificarli. Sora, OFL e METADATA sono download originali dal repository primario Google Fonts, conservati in `originals/`. `manifest.json` registra URL, versioni, hash, assi, posizioni e parametri.

Il generatore importa soltanto in lettura il motore di contorni del commento 394. Didascalie e diritti restano componenti nativi esterni. I numeri delle figure non sono assegnati da questi asset.

```sh
PYTHONPATH=/private/tmp/comment357-fonttools:/private/tmp/comment394-font-runtime \
  /Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
  assets/booklet/tipografia-comment402/generate_figures.py
```
