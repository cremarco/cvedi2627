# Acquisizione iLMeteo · 8 ottobre 2026

`home.html`, `bologna.html` e `domani.html` sono risposte HTML originali, conservate senza modifiche. `manifest.json` registra URL, data, header, dimensioni e SHA-256. I frammenti `rendered-widgets.json` e lo stato `tomorrow-runtime-state.json` provengono dal browser CUA e restano immutati.

Le pagine in `../originale/` mantengono DOM, CSS, testi, immagini e attribuzioni originali. Le risorse diventano locali; pubblicità remota, analytics, accesso e geolocalizzazione sono disattivati. Il Radar conserva i tile e il timestamp acquisiti, con controlli live disattivati. La classe `sito-standard` di Meteo domani riproduce lo stato osservato sul sito live, incluso il comportamento sul viewport stretto.

Rigenerare la stessa edizione dalla radice del progetto:

```sh
/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 esempi/ilmeteo-lab/scripts/capture.py
/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check esempi/ilmeteo-lab/originale/snapshot.js
```

Il Python bundled fornisce `lxml`. La rigenerazione usa i file acquisiti e non cambia l'edizione. Soltanto `capture.py --refresh` scarica nuovi HTML e asset; richiede accesso alla rete e non ricattura automaticamente i frammenti CUA.

Per consultare gli originali con un server locale separato:

```sh
/Users/marco/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 4187 --bind 127.0.0.1 --directory esempi/ilmeteo-lab
```

Aprire `http://127.0.0.1:4187/originale/`. `assets/manifest.json` conserva provenienza e hash degli asset; `assets/attributions.json` registra l'attribuzione del Radar e di OpenStreetMap. I dati completi sono in `data/capture.json`, i campi meteorologici strutturati in `data/weather.json`.

Il controllo riproducibile è `reports/ilmeteo-lab/capture-integrity.json`: verifica hash, risorse locali, assenza di dipendenze di rete, tile e stato DOM materializzato. Le verifiche visive precedenti sono nei rapporti del laboratorio. La classe runtime finale di Meteo domani è stata verificata staticamente; la verifica CUA dopo questa modifica non è stata ripetuta perché il Mac è bloccato. Non è stato utilizzato un browser tramite terminale come alternativa.
