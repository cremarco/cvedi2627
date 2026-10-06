# Immagini del tema 2026/27

`manifest-cards-v2.json` registra le sette illustrazioni attive delle card, rifatte con lo strumento integrato ImageGen: motivi piatti e semplici nei colori del set. Contiene prompt, provenienza, PNG originali e WebP pubblici. `data/card-artwork.json` registra una scelta esplicita per ogni titolo: asset solo se utile al concetto, altrimenti `null`. Dodici delle 223 card nei Markdown hanno un motivo selezionato; quelle compatte lo omettono. La card riserva una colonna al testo e ritaglia l’immagine nell’angolo in basso a destra, senza sovrapposizioni.

`manifest-v1.json` conserva il registro delle 99 immagini della famiglia precedente, insieme ai suoi originali e file pubblici. Le vecchie illustrazioni decorative delle card sono archiviate; le figure didattiche e le cinque figure della mappa UX restano utilizzate. `masters.json` e `card-catalog-v1.json` conservano il contesto originale di generazione.

Le figure didattiche sono 32: venti approfondimenti, tre scene del brief, materiali del corso, bollino di aggiornamento, customer journey, due esempi di gerarchia visiva, il diagramma della UI contenuta nella UX e tre esempi di significante, mapping e feedback. Le otto card della mappa del sito restano prive di illustrazioni; le cinque stazioni del processo UX conservano le proprie figure in `thematicAssets`. I motivi delle card sono decorativi e fuori dall’albero accessibile; i testi restano nativi.

`originals/` conserva i PNG generati. Le versioni precedenti delle immagini corrette sono mantenute come varianti archiviate, ma soltanto i file selezionati nel manifest sono attivi. Tutti i WebP selezionati sono codificati lossless: dimensioni, byte RGBA e canale alfa sono stati confrontati con il PNG originale. Gli hash del manifest identificano gli asset effettivamente utilizzati.

Fotografie documentarie, opere, screenshot reali, artefatti dei progetti e geometrie native mantengono la propria identità. La lezione 3 resta sospesa. Le copertine metro ripristinate sono conservate.

I controlli verificano provenienza, hash, inventario, selettività e separazione fra testo e immagine, oltre a viewport stretti e stampa. L’esportazione Pages pubblica solo gli asset referenziati dal deck visibile; gli originali e gli asset delle sezioni sospese restano nei sorgenti.
