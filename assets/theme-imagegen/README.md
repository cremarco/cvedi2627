# Immagini del tema 2026/27

`manifest-v1.json` è il registro della famiglia attiva: 99 immagini selezionate, prodotte con lo strumento integrato ImageGen. Contiene il prompt completo di ogni asset, la palette, i riferimenti stilistici, il PNG originale conservato nel progetto e il WebP pubblico. `masters.json` registra le tre scene guida; `card-catalog-v1.json` collega i contenuti delle card ai 67 sfondi semantici; `data/card-artwork.json` è il dizionario usato durante la presentazione.

Le figure didattiche sono 32: venti approfondimenti, tre scene del brief, materiali del corso, bollino di aggiornamento, customer journey, due esempi di gerarchia visiva, il diagramma della UI contenuta nella UX e tre esempi di significante, mapping e feedback. Le 224 card presenti nei Markdown, le 8 della mappa del sito e le 5 stazioni del processo UX condividono la stessa famiglia. Le immagini di sfondo sono decorative; i testi restano nativi e accessibili.

`originals/` conserva i PNG generati. Le versioni precedenti delle immagini corrette sono mantenute come varianti archiviate, ma soltanto i file selezionati nel manifest sono attivi. Tutti i WebP selezionati sono codificati lossless: dimensioni, byte RGBA e canale alfa sono stati confrontati con il PNG originale. Gli hash del manifest identificano gli asset effettivamente utilizzati.

Fotografie documentarie, opere, screenshot reali, artefatti dei progetti e geometrie native mantengono la propria identità. La lezione 3 resta sospesa. Le copertine metro ripristinate sono conservate.

Verifica: compilazione Slidev riuscita e 375 render controllati, inclusi viewport stretti e stampa, con zero violazioni di impaginazione e zero immagini mancanti. L'esportazione Pages pubblica solo gli asset referenziati dal deck visibile; gli originali e gli asset delle sezioni sospese restano nei sorgenti.
