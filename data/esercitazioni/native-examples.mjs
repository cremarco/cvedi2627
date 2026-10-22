// Transcriptions and native reconstructions of the retained teaching figures.
// Text and code remain DOM nodes; no source slide is used as a bitmap.
import { highlightExerciseCode, exerciseCodeLanguage } from '../../utils/exercise-code.mjs'
export const escapeHTML = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const e = escapeHTML
const code = value => `<div class="mockup-code"><pre><code data-language="${exerciseCodeLanguage(value)}">${highlightExerciseCode(value)}</code></pre></div>`
const columns = (...items) => `<div class="native-columns" style="--columns:${items.length}">${items.map(item => `<section>${item}</section>`).join('')}</div>`
const label = text => `<p class="native-label">${e(text)}</p>`
const pair = (source, result) => columns(code(source), `<div class="native-result">${result}</div>`)
const items = (count = 3) => Array.from({ length: count }, (_, i) => `<span class="native-item">${i + 1}</span>`).join('')
const row = (property, value, count = 3, extra = '') => `<div><p class="native-label"><code>${e(property)}: ${e(value)}</code></p><div class="native-flex" style="${property}:${value};${extra}">${items(count)}</div></div>`
const flow = (...nodes) => `<ol class="native-flow">${nodes.map((node, i) => `<li><span class="badge badge-outline">${i + 1}</span>${node}</li>`).join('')}</ol>`
const table = (head, rows) => `<table class="table"><thead><tr>${head.map(h => `<th>${e(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${e(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`
const record = (html, caption) => ({ html, caption })
const tree = 'progetto/\n├── cartella/\n│   ├── file-corrente.html\n│   ├── picture.jpg\n│   └── images/picture.jpg\n├── images/picture.jpg\n└── picture.jpg'
const filePath = (path, destination) => record(columns(code(`<img src="${path}" alt="Descrizione dell’immagine">`), `<div>${label('Documento di partenza: cartella/file-corrente.html')}${code(tree)}${label(destination)}</div>`), 'Il percorso è risolto a partire dal documento corrente o dalla radice del sito.')
const grid = names => `<div class="native-grid-lines"><div class="native-grid">${items(12)}</div><div class="native-col-names">${(names ? ['col1', 'col2', 'col3', 'col4', 'col5'] : ['1', '2', '3', '4', '5']).map(value => `<span>${e(value)}</span>`).join('')}</div><p>${names ? 'row1 → row2 → row3 → row4' : 'Tre righe e quattro colonne; cinque linee verticali.'}</p></div>`
const git = (steps, command, note = '') => record(`${flow(...steps)}${command ? code(command) : ''}${note ? `<p>${e(note)}</p>` : ''}`, 'Operazioni e relazioni ricostruite con testo e codice selezionabili dalla schermata originale.')

const copy = (...paragraphs) => ({ kind: 'text', paragraphs: paragraphs.map(text => ({ text, runs: [{ text }], bullet: false, level: 0 })) })
export const nativeCorrections = {
  '02/11': { blocks: [copy('La specificità confronta tre conteggi, nell’ordine: ID; classi, attributi e pseudoclassi; tipi e pseudoelementi.', 'Si confrontano le colonne da sinistra, senza convertire la tupla in una somma. Il selettore universale non aggiunge specificità.', 'Gli stili inline prevalgono sulle normali dichiarazioni degli stylesheet nell’ambito della stessa origine e importanza.')], sources: [{ title: 'MDN · specificità', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity' }] },
  '02/38': { fixed: 'position: fixed — l’elemento è rimosso dal flusso ed è normalmente posizionato rispetto al viewport. Alcune proprietà degli antenati possono cambiare il containing block.', sources: [{ title: 'MDN · position', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position' }] },
  '08/57': { blocks: [copy('La storia del repository si può consultare nel Source Control Graph di VS Code, su GitHub o con git log.', 'Aprendo un commit si possono leggere le modifiche introdotte e seguire l’evoluzione del branch.')], sources: [{ title: 'VS Code · source control', url: 'https://code.visualstudio.com/docs/sourcecontrol/overview' }] },
}

// Labels and destinations transcribed from the corresponding retained source pages.
const htmlResources = [
  ['HTML elements reference', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element'],
  ['CSS selectors reference', 'https://www.w3schools.com/cssref/css_selectors.asp'],
  ['CSS selector tester', 'https://www.w3schools.com/cssref/trysel.asp'],
  ['FreeCodeCamp', 'https://www.freecodecamp.org/'],
  ['Google', 'https://www.google.it/'],
]
export const nativeResources = Object.fromEntries(Object.entries({
  '01/107': [
    ['Visual Studio Code', 'https://code.visualstudio.com/'],
    ['Editor online', 'https://stackblitz.com/edit/stackblitz-starters-dspzs4?description=HTML/CSS/JS%20Starter&file=index.html,styles.css&terminalHeight=10&title=Static%20Starter'],
    ...htmlResources.slice(0, 3),
    ['Tipi di File paths', 'https://www.w3schools.com/html/html_filepaths.asp'],
    ...htmlResources.slice(3),
  ],
  '02/76': [
    ['Test your skills: Flexbox', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox_skills'],
    ['Basic concepts of flexbox', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox'],
    ['What Happens When You Create A Flexbox Flex Container?', 'https://www.smashingmagazine.com/2018/08/flexbox-display-flex-container/'],
    ['A Complete Guide to Flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'],
  ],
  '02/78': htmlResources,
}).map(([key, resources]) => [key, resources.map(([title, url]) => ({ title, url }))]))

export function rebuildImportedSlide(slide, exerciseNumber) {
  const resources = nativeResources[`${String(exerciseNumber).padStart(2, '0')}/${slide.number}`]
  if (resources) return { ...slide, blocks: [{ kind: 'resources', resources }], revision: 'native-reconstruction' }
  const result = { ...slide, blocks: slide.blocks.map(block => {
    if (block.kind !== 'image') return block
    const key = block.src.split('/').pop(), entry = nativeExamples[key]
    if (!entry) throw new Error(`Missing native reconstruction: ${exerciseNumber}/${slide.number}: ${key}`)
    return { kind: 'native', example: key, caption: entry.caption }
  }) }
  const correction = nativeCorrections[`${String(exerciseNumber).padStart(2, '0')}/${slide.number}`]
  if (correction) {
    if (correction.blocks) result.blocks = correction.blocks
    if (correction.fixed) result.blocks[0] = copy(correction.fixed)
    result.sources = correction.sources
    result.revision = 'native-reconstruction'
  }
  return result
}

export const nativeExamples = {
  'bf9c59ac029ae9d4731f.png': record(columns('<div class="native-result"><strong>Client</strong><p>Browser</p></div>', '<div style="text-align:center;display:grid;gap:22px"><strong>HTTP</strong><span>Request →</span><span>← Response</span></div>', '<div class="native-result"><strong>Server</strong><p>Web server</p></div>'), 'Il browser invia una richiesta HTTP; il server restituisce una risposta.'),
  '728e55141fed182cd2c4.png': record(`${label('StatCounter · quota mondiale · settembre 2022–settembre 2023 (dato storico)')}<div class="native-bars">${[['Chrome',64.34],['Safari',19.54],['Edge',4.79],['Firefox',2.93],['Samsung Internet',2.57],['Opera',2.54],['UC Browser',.92],['Android',.69],['360 Safe Browser',.26],['Other',1.42]].map(([name,value]) => `<div><span>${name}</span><span class="native-bar-track"><span style="width:${value / .7}%"></span></span><strong>${value.toFixed(2).replace('.', ',')}%</strong></div>`).join('')}</div>`, 'Valori trascritti dalla figura StatCounter originale; non rappresentano quote attuali.'),
  '6e8c7b2ffa579b74ac2b.png': record(`<div class="native-links"><a href="#pagina-1" class="link">Pagina 1</a><span>↔</span><a href="#pagina-2" class="link">Pagina 2</a><span>↘</span><a href="#pagina-3" class="link">Pagina 3</a></div>${code('<a href="pagina-2.html">Vai alla pagina 2</a>')}`, 'I collegamenti permettono percorsi di lettura non sequenziali fra documenti.'),
  '01-017-diagram.webp': record(pair('<u>Esercitazioni CVeDI</u>', '<u>Esercitazioni CVeDI</u>'), 'Il codice a sinistra produce il testo sottolineato a destra.'),
  '01-023-diagram.webp': record(table(['Elemento', 'HTML', 'Risultato'], [['Sottolineato','<u>Lorem ipsum</u>','Lorem ipsum'],['Enfasi','<em>Lorem ipsum</em>','Lorem ipsum'],['Importanza','<strong>Lorem ipsum</strong>','Lorem ipsum']]).replace('<td>Lorem ipsum</td>', '<td><u>Lorem ipsum</u></td>').replace('<td>Lorem ipsum</td>', '<td><em>Lorem ipsum</em></td>').replace('<td>Lorem ipsum</td>', '<td><strong>Lorem ipsum</strong></td>'), 'Tre elementi inline: contenuto, semantica e presentazione restano distinti.'),
  '01-025-diagram.webp': record(pair('<ul>\n  <li>Primo elemento</li>\n  <li>Secondo elemento</li>\n</ul>', '<ul style="list-style:disc;padding-left:1.5em"><li>Primo elemento</li><li>Secondo elemento</li></ul>'), 'Ogni elemento della lista è racchiuso nel proprio li.'),
  '01-026-diagram.webp': record(pair('<ol>\n  <li>Primo elemento</li>\n  <li>Secondo elemento</li>\n</ol>', '<ol style="list-style:decimal;padding-left:1.5em"><li>Primo elemento</li><li>Secondo elemento</li></ol>'), 'Il browser assegna la numerazione attraverso una lista ordinata.'),
  '01-027-diagram.webp': record(table(['Colonna 1', 'Colonna 2'], [['Cella 1','Cella 2']]), 'Tabella HTML nativa, con intestazioni e celle ricostruite dalla fonte.'),
  '01-028-diagram.webp': record(`<form class="native-form"><label for="name">Name</label><input class="input" id="name" type="text"><button class="btn" type="submit">OK</button><output aria-live="polite"></output></form>`, 'Etichetta, campo e pulsante sono controlli HTML effettivi; l’invio dimostrativo resta locale.'),
  'b63650f3b5ea7c0f6903.png': record(table(['Protocollo','Sottodominio','Dominio','TLD','Percorso'], [['https://','www.','sitoweb.','it','/cartella/risorsa.ext']]), 'Le parti dell’URL assoluto sono ricostruite come testo.'),
  '4ef7366d1c1e6ad09fa8.png': record(`${code('/cartella/risorsa.ext')}${label('Il percorso parte dalla radice del sito corrente. Protocollo e host sono quelli del documento.')}`, 'Il percorso relativo alla radice non contiene un nuovo nome di host.'),
  '435ae87eed37e32c71f7.png': record(`${code(tree)}${code('picture.jpg　·　images/picture.jpg　·　/images/picture.jpg　·　../picture.jpg')}`, 'Struttura delle cartelle trascritta dall’editor originale.'),
  '01-036-diagram.webp': filePath('picture.jpg', 'Destinazione: cartella/picture.jpg'),
  '01-037-diagram.webp': filePath('images/picture.jpg', 'Destinazione: cartella/images/picture.jpg'),
  '01-038-diagram.webp': filePath('/images/picture.jpg', 'Destinazione: images/picture.jpg, dalla radice del sito'),
  '01-039-diagram.webp': filePath('../picture.jpg', 'Destinazione: picture.jpg, nella cartella superiore'),
  '965f16eb212382409d9d.jpg': record(`<div class="native-nesting"><code>&lt;body&gt;</code><div><code>&lt;header&gt;</code></div><div><code>&lt;main&gt;</code><div><code>&lt;article&gt;</code><p>Titolo e contenuti della pagina</p></div></div><div><code>&lt;footer&gt;</code></div></div>`, 'La struttura a matrioska del body è espressa con elementi annidati.'),
  '01-048-diagram.webp': record(pair('<p><font color="#FF0000" size="10">\n  <b>tutto questo testo avrà corpo 10,\n  colore rosso e grassetto</b>\n</font></p>', '<p style="color:#c00;font-size:34px;font-weight:bold">tutto questo testo avrà corpo 10,<br>colore rosso e grassetto</p>'), 'Esempio storico della fonte: il tag font è obsoleto; oggi la formattazione appartiene al CSS.'),
  '88ff7db0856fdc235a7d.png': record(`<section style="font-family:Arial,sans-serif;background:white;color:black"><h2 style="font-size:36px;color:red;margin-bottom:24px">Esempio applicazione stili css</h2><ul style="list-style:disc;padding-left:1.5em;color:green"><li>Item 1</li><li>Item 2</li><li>Item 2</li></ul></section>`, 'Gli stili body, li e h1 della fonte sono applicati a contenuti HTML nativi.'),
  '01-056-diagram.webp': record(columns(code('selettore {\n  proprietà1: valore1;\n  proprietà2: valore2;\n}'),table(['Parte','Funzione'], [['selettore','Individua gli elementi'],['proprietà: valore;','Dichiarazione'],['blocco completo','Regola CSS']])), 'Selettore, dichiarazioni e regola restano selezionabili.'),
  '01-057-diagram.webp': record(table(['Selettore','Elementi selezionati'], [['h1, p, a','Tutti gli h1, p e a'],['#identificatore1','L’elemento con questo id'],['.classe1','Gli elementi con questa classe'],['h1#identificatore2','L’h1 con questo id']]), 'Sintassi ed effetti dei selettori ricavati dalla tavola originale.'),
  '01-060-diagram.webp': record(table(['Selettore','Effetto'], [['p:first-child','Il p che è primo figlio'],['p:nth-child(2)','Il p che è secondo figlio'],[':not(p)','Gli elementi che non sono p']]), 'Le pseudoclassi selezionano elementi in base a una condizione.'),
  '01-061-diagram.webp': record(table(['Selettore','Effetto'], [['p::first-letter','Prima lettera del paragrafo'],['p::before','Contenuto generato prima del contenuto'],['p::after','Contenuto generato dopo il contenuto']]), 'Gli pseudoelementi rappresentano una parte dell’elemento o contenuto generato.'),
  '01-062-diagram.webp': record(table(['Selettore','Condizione'], [['a[rel]','Attributo rel presente'],['a[rel=nofollow]','Valore esattamente nofollow'],['a[title~=notizie]','Il valore contiene la parola notizie'],['a[rel*=no]','Il valore contiene la stringa no']]), 'Quattro operatori di selezione degli attributi ricostruiti come tabella.'),
  '01-063-diagram.webp': record(`${code('p, div, a.class1 {\n  background-color: yellow;\n}')}${flow('Tutti i p','Tutti i div','Gli a con classe class1')}`, 'La virgola raggruppa selettori; non indica una relazione di discendenza.'),
  'f7c30abe2a1b2b98dad2.jpg': record(columns(...['Home','Pagina 2','Pagina 3'].map(title => `<nav class="native-result"><a class="link" href="#home">Home</a>　<a class="link" href="#pagina2">Pagina 2</a>　<a class="link" href="#pagina3">Pagina 3</a><h2>${title}</h2><p>Contenuto della pagina</p></nav>`)), 'Il modello dell’esercizio mantiene tre pagine collegate con la stessa navigazione.'),
  '02-009-diagram.webp': record(`${table(['Selettore','ID','Classi, attributi, pseudoclassi','Tipi'], [['ul#primary-nav li.active','1','1','2'],['ul.active > p.fake-class','0','2','2']])}<p>Si confrontano le colonne da sinistra: (1, 1, 2) precede (0, 2, 2).</p>`, 'Gli esempi della fonte sono mantenuti; la specificità è un confronto fra tuple, non una somma decimale.'),
  'e6e12663edf18cd33e89.png': record(columns(`${label('content-box')}<div class="native-box-sizing" style="box-sizing:content-box">100 × 100</div><p>100px + 10px + 10px = 120px</p>`,`${label('border-box')}<div class="native-box-sizing" style="box-sizing:border-box">80 × 80</div><p>100px complessivi, padding incluso</p>`), 'Stessa width: 100px e padding: 10px; senza bordi. Ricostruzione dello schema accreditato a webriderz.com nella fonte.'),
  '02-023-diagram.webp': record(columns(...['static','relative','absolute','fixed'].map(position => `${label(`position: ${position}`)}<div class="native-position"><span>A</span><span style="position:${position === 'fixed' ? 'absolute' : position};${position === 'static' ? '' : 'top:24px;left:30px;'}">B</span><span>C</span></div>`)), 'Il riquadro fixed è schematizzato rispetto al viewport dell’esempio; relative conserva il proprio posto nel flusso.'),
  '02-026-diagram.webp': record(`<div class="native-float"><div class="native-placeholder" style="float:left;margin:0 20px 10px 0;width:180px;height:110px">Immagine</div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id euismod purus. Proin id egestas turpis, quis semper est. Suspendisse fringilla dui eu egestas dignissim. Suspendisse commodo magna in enim consequat elementum.</p></div>`, 'L’esercizio mostra il testo che scorre accanto a un elemento flottante.'),
  '02-030-diagram.webp': record(columns(row('flex-direction','row'),row('flex-direction','column',3,'height:240px')), 'Gli oggetti sono disposti lungo l’asse principale scelto da flex-direction.'),
  '02-031-diagram.webp': record(columns(row('flex-wrap','nowrap',6,'--item-basis:120px'),row('flex-wrap','wrap',6,'--item-basis:120px')), 'Gli stessi sei oggetti restano su una riga o vanno a capo.'),
  '02-033-diagram.webp': record(`<div class="native-rows">${['flex-start','flex-end','center'].map(v => row('justify-content',v)).join('')}</div>`, 'L’allineamento cambia lungo l’asse principale.'),
  '02-034-diagram.webp': record(`<div class="native-rows">${['space-between','space-around','space-evenly'].map(v => row('justify-content',v)).join('')}</div>`, 'Confronta lo spazio fra gli oggetti e quello sui margini esterni.'),
  '02-035-diagram.webp': record(columns(...['stretch','flex-start','flex-end','center'].map(v => row('align-items',v,3,'height:200px'))), 'L’allineamento cambia sull’asse trasversale del contenitore.'),
  '02-036-diagram.webp': record(columns(...['flex-start','flex-end','stretch','space-between'].map(v => row('align-content',v,6,'flex-wrap:wrap;height:200px'))), 'align-content distribuisce le righe quando il contenitore offre spazio trasversale.'),
  '02-040-diagram.webp': record(`<div>${label('flex-grow: 1 · 4 · 1')}<div class="native-flex">${[1,4,1].map(v => `<span class="native-item" style="flex:${v} 1 0">${v}</span>`).join('')}</div></div>`, 'Le proporzioni riguardano lo spazio libero distribuito agli elementi.'),
  '02-041-diagram.webp': record(`<div>${label('flex-shrink: 1 · 0 · 1')}<div class="native-flex">${[1,0,1].map(v => `<span class="native-item" style="flex:0 ${v} 45%;min-width:0">${v}</span>`).join('')}</div></div>`, 'L’elemento centrale conserva la propria base; gli altri assorbono la riduzione.'),
  '03-018-diagram.webp': record(grid(false), 'Grid nativa a quattro colonne e tre righe; proporzioni verticali 100:250:150.'),
  '03-019-diagram.webp': record(grid(true), 'Le linee della griglia sono nominate da col1 a col5 e da row1 a row4.'),
  '03-036-diagram.webp': record(columns(`<div class="native-placement">${[['A','1 / span 2','1'],['X','3 / span 2','1 / span 2'],['B','1','2'],['C','2','2'],['D','1','3'],['E','2','3'],['F','3','3'],['G','4','3']].map(([name,col,row])=>`<span class="${name==='X'?'native-placeholder':'native-item'}" style="grid-column:${col};grid-row:${row}">${name}</span>`).join('')}</div>`, `<div class="native-placement">${[['A','1 / span 4','1'],['B','1','2'],['C','2','2 / span 2'],['D','3','2'],['E','4','2'],['X','1','3'],['F','3','3'],['G','4','3']].map(([name,col,row])=>`<span class="${name==='X'?'native-placeholder':'native-item'}" style="grid-column:${col};grid-row:${row}">${name}</span>`).join('')}</div>`), 'Due griglie a quattro colonne: gli stessi blocchi occupano posizioni e intervalli differenti.'),
  '32afe9f60ef224a22c5c.png': record(columns(`<strong>Responsive</strong><div class="native-fluid">Contenuto fluido</div><p>La disposizione si adatta alla larghezza disponibile.</p>`, `<strong>Adaptive</strong><div class="native-adaptive">Template A</div><div class="native-adaptive">Template B</div><p>Il progetto sceglie fra layout predisposti.</p>`), 'Distinzione della fonte ricostruita con blocchi HTML; il contenuto non è una schermata.'),
  '04-010-diagram.webp': record(columns(`${label('Con controllo del viewport')}${code('width=device-width, initial-scale=1.0')}<div class="native-checker" style="background-size:50px 50px">1 quadratino = 50px</div>`, `${label('Senza controllo del viewport')}<div class="native-checker" style="background-size:20px 20px;font-size:14px">Pagina più ampia ridotta sullo schermo</div>`), 'Schema concettuale del confronto originale; la scala effettiva senza meta dipende dal browser e dal dispositivo.'),
  '04-032-diagram.webp': record(`<div class="native-source-page"><header><h2>Titolo h1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id euismod purus. Proin id egestas turpis, quis semper est.</p></header><div class="native-source-body"><aside><span>◯　◯</span><p>Lorem ipsum　Lorem ipsum</p></aside><div class="native-source-regions"><span>1</span><span>2</span><span>3</span></div><aside>(IMMAGINE)</aside></div></div>${label('Quote della fonte: larghezza 100 · altezza iniziale 60 · rientri 15 (alto, basso, sinistra), 25 (destra).')}`, 'La consegna desktop mantiene introduzione, due voci laterali, tre regioni centrali e area immagine.'),
  '04-033-diagram.webp': record(columns('<div class="native-source-mobile"><strong>Prima parte</strong><div><h2>Titolo h1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div><aside><span>◯ Lorem ipsum</span><span>◯ Lorem ipsum</span></aside></div>', '<div class="native-source-mobile"><strong>Segue</strong><div class="native-placeholder">(IMMAGINE)</div><div class="native-source-regions mobile"><span>1</span><span>2</span><span>3</span></div></div>')+label('Quote della fonte: larghezza 100 · altezza iniziale 100 · rientro superiore 10 · laterali 5.'), 'Sul mobile i blocchi proseguono in verticale: introduzione, due voci, immagine e regioni 1, 2, 3.'),
  '0f344dec0d2c041537da.png': git(['Working directory','Staging area','Local repository','Remote repository'], 'git add → git commit → git push\ngit fetch → git merge\ngit pull = fetch + integrazione', 'Il flusso separa modifiche, preparazione del commit, storia locale e repository remoto.'),
  'bcea17b47b9c20105db3.png': git(['Controllo del codice sorgente','Inizializza repository','File modificati'], 'git init', 'In VS Code: apri il controllo del codice sorgente e inizializza il repository.'),
  '08-021-diagram.webp': git(['Changes','Stage changes (+)','Staged changes','Messaggio → Commit'], 'git add nome-file\ngit commit -m "Descrivi la modifica"'),
  '08-022-diagram.webp': git(['Menu ⋯','Commit','Undo Last Commit'], '', 'L’operazione ricostruita dalla fonte annulla l’ultimo commit locale e mantiene disponibili le modifiche.'),
  'da81bf54e0a7da4bc8e5.png': record(columns(`${label('Prima')}${code('<h1>Titolo</h1>')}`,`${label('Dopo')}${code('<h1>Nuovo titolo</h1>')}`)+flow('Open file','Discard changes','Stage changes'), 'Il diff confronta due stati. Discard changes scarta modifiche: controllare il confronto prima di usarlo.'),
  '08-024-diagram.webp': git(['Branch attuale: main','Branch locali: main · dev','Operazioni sui branch'], '', 'Il selettore distingue il branch corrente dalle altre destinazioni disponibili.'),
  'b9d423dd0e9c83338bbb.png': git(['Create new Branch…','Nome del nuovo branch','Checkout automatico'], 'git switch -c nome-branch', 'Create new Branch from… permette di scegliere un punto di partenza diverso dal branch corrente.'),
  '08-026-diagram.webp': git(['Branch attuale: dev','Seleziona main','Branch attuale: main'], 'git switch main'),
  '08-027-diagram.webp': git(['Seleziona main','Branch → Merge Branch…','Scegli il branch da integrare'], 'git switch main\ngit merge dev', 'Il branch selezionato riceve l’integrazione.'),
  '08-031-diagram.webp': git(['GitHub → New repository','Nome → Create repository','Quick setup → SSH → URL'], 'git@github.com:utente/repository.git'),
  '08-032-diagram.webp': git(['Remote → Add Remote…','URL → nome origin','Publish Branch'], 'git remote add origin git@github.com:utente/repository.git\ngit push -u origin main'),
  '08-033-diagram.webp': record(`${table(['Indicatore','Significato'],[['↓ 0','Nessun commit da scaricare'],['↑ 1','Un commit da caricare']])}${flow('Controlla lo stato','Sincronizza','Risolvi eventuali conflitti')}`, 'L’indicatore della fonte distingue commit in entrata e in uscita.'),
  '08-035-diagram.webp': record(`${code('<<<<<<< HEAD\nModifiche locali\n=======\nModifiche remote\n>>>>>>> dev')}${flow('Confronta le due versioni','Scegli il contenuto corretto','Salva e completa il merge')}`, 'Le due versioni sono ricostruite come testo; i marcatori rendono esplicito il conflitto.'),
  '08-036-diagram.webp': record(columns(`${label('Modifiche locali')}${code('contenuto locale')}`,`${label('Modifiche remote')}${code('contenuto remoto')}`,`${label('Risultato del merge')}${code('contenuto riconciliato')}`), 'Tre aree separate riprendono il Merge Editor: due ingressi e un risultato da verificare.'),
  '08-038-diagram.webp': git(['Commit iniziale','Modifica ai contenuti','Correzione verificata'], 'git log --oneline', 'Aprendo un commit si possono leggere le modifiche introdotte in quel punto della storia.'),
}

export const nativeCSS = `
html{font-size:22px;color-scheme:light;background:transparent}body{margin:0;background:transparent;color:var(--color-base-content);font-family:ui-sans-serif,system-ui,sans-serif}
main{box-sizing:border-box;width:100%;padding:10px 16px;display:flex;flex-direction:column;justify-content:center;gap:18px}main>div,main>section,main>table,main>ol,main>form{width:100%}
@layer base{p,h2,ul,ol,pre{margin:0}p{line-height:1.35}h2{font-size:28px;font-weight:700}a{color:var(--color-primary)}}
.native-columns{display:grid;grid-template-columns:repeat(var(--columns),minmax(0,1fr));gap:28px;align-items:center}.native-columns>section{min-width:0;display:flex;flex-direction:column;gap:14px}
.native-label{font-size:19px;font-weight:600}.native-result{padding:24px;background:var(--color-base-200);line-height:1.5}
.mockup-code{padding:12px 18px;font-size:19px;min-width:0;print-color-adjust:exact}.mockup-code pre{padding:0;white-space:pre-wrap;overflow-wrap:anywhere;min-width:0;font:19px/1.4 ui-monospace,SFMono-Regular,Consolas,monospace}.mockup-code pre:before{display:none}.mockup-code code{font:inherit}
.table :is(th,td){padding:10px 14px;font-size:21px;white-space:normal;overflow-wrap:anywhere}.table th{font-weight:700}
.native-flex{display:flex;gap:12px;min-height:65px;background:var(--color-base-200);padding:12px}.native-item{display:flex;align-items:center;justify-content:center;min-width:40px;min-height:40px;flex-basis:var(--item-basis,65px);background:var(--color-primary);color:var(--color-primary-content);padding:6px}
.native-rows{display:grid;gap:18px}.native-rows .native-flex{min-height:54px;padding:8px}.native-flow{display:flex;align-items:stretch;justify-content:space-between;gap:24px;list-style:none;padding:0}.native-flow li{position:relative;display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;padding:18px 10px;background:var(--color-base-200);min-height:120px}.native-flow li+li:before{content:'→';position:absolute;left:-22px;top:45%;color:var(--color-primary)}
.native-form{display:flex;flex-wrap:wrap;gap:20px;align-items:center}.native-form output{flex-basis:100%;font-size:20px}.native-links{display:flex;align-items:center;justify-content:space-around;gap:24px}.native-links a{padding:30px;background:var(--color-base-200)}
.native-bars{display:grid;gap:7px}.native-bars>div{display:grid;grid-template-columns:190px 1fr 85px;gap:14px;align-items:center;font-size:18px;line-height:1.2}.native-bar-track{background:var(--color-base-200);height:19px}.native-bar-track>span{display:block;height:100%;background:var(--color-primary)}
.native-nesting{padding:15px;background:var(--color-base-200)}.native-nesting>div{margin:10px 0 0 24px;padding:10px 18px;border-left:3px solid var(--color-primary)}.native-nesting>div>div{margin:8px 0 0 24px}
.native-box-sizing{width:100px;height:100px;padding:10px;background:var(--color-primary);color:var(--color-primary-content);font-size:14px;outline:10px solid var(--color-base-200);margin:20px}
.native-position{position:relative;display:flex;gap:8px;height:170px;background:var(--color-base-200);padding:16px}.native-position span{width:44px;height:44px;background:var(--color-primary);color:var(--color-primary-content);display:grid;place-items:center}.native-position span:nth-child(2){background:var(--color-accent);color:var(--color-accent-content)}
.native-placeholder{display:grid;place-items:center;background:var(--color-base-300);color:var(--color-base-content)}.native-float{line-height:1.6;background:var(--color-base-200);padding:26px}
.native-grid-lines{position:relative;padding:10px 30px}.native-grid{height:270px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:2fr 5fr 3fr;gap:10px;background:var(--color-base-200);padding:10px}.native-grid .native-item{padding:0;min-height:0}.native-col-names{display:flex;justify-content:space-between;margin-top:14px;font:20px ui-monospace,monospace}.native-grid-lines p{margin-top:12px}
.native-fluid{width:90%;padding:25px;background:var(--color-base-200)}.native-adaptive{width:85%;padding:14px;margin-top:10px;background:var(--color-base-200)}.native-adaptive+.native-adaptive{width:65%}.native-checker{height:160px;display:grid;place-items:center;background-color:var(--color-base-100);background-image:linear-gradient(var(--color-base-300) 1px,transparent 1px),linear-gradient(90deg,var(--color-base-300) 1px,transparent 1px)}
.native-placement{height:290px;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 2fr 1fr;gap:12px;padding:14px;background:var(--color-base-200)}.native-placement>span{min-height:0;min-width:0}.native-source-page{display:grid;gap:14px}.native-source-page header{background:var(--color-base-200);padding:18px 25% 18px 15%}.native-source-page header p{font-size:18px;line-height:1.3}.native-source-body{display:grid;grid-template-columns:22% 1fr 20%;gap:14px}.native-source-body>aside{display:grid;place-items:center;background:var(--color-base-200);padding:10px;font-size:18px}.native-source-body>aside>span{font-size:36px}.native-source-regions{height:110px;display:grid;grid-template-columns:1.6fr 1fr;grid-template-rows:2fr 1fr;gap:10px}.native-source-regions span{display:grid;place-items:center;background:var(--color-base-200);border:1px solid var(--color-primary)}.native-source-regions span:nth-child(3){grid-column:2;grid-row:1 / span 2}.native-source-mobile{width:360px;margin:auto;display:grid;gap:12px}.native-source-mobile>div:not(.mobile){padding:14px;background:var(--color-base-200);font-size:20px}.native-source-mobile aside{display:grid;gap:12px;font-size:24px}.native-source-mobile .native-source-regions{display:flex;flex-direction:column;height:170px}.native-source-mobile .native-source-regions span{flex:1}.native-source-mobile>.native-placeholder{height:80px}
html[data-native-paused] *,html[data-native-paused] *:before,html[data-native-paused] *:after{animation-play-state:paused!important}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}}@media print{*,*:before,*:after{animation:none!important;transition:none!important}}
`

export function renderNativeDocument(entry, baseCSS, customCSS, themeCSS = '') {
  const css = (entry.custom ? customCSS : baseCSS) + nativeCSS + themeCSS
  const bridge = `<script>(()=>{document.addEventListener('keydown',event=>{if(event.key!=='Escape'||document.querySelector('dialog[open]'))return;event.preventDefault();parent.postMessage({type:'cvedi-native-escape'},'*')});window.addEventListener('message',event=>{if(event.source===parent&&event.data?.type==='cvedi-native-motion')document.documentElement.toggleAttribute('data-native-paused',event.data.paused===true);if(event.data?.type==='cvedi-native-escape'&&[...document.querySelectorAll('iframe')].some(frame=>frame.contentWindow===event.source))parent.postMessage({type:'cvedi-native-escape'},'*')})})()</script>`
  const shell = (body, script = '') => `<!doctype html><html lang="it" data-theme="light"><head><meta charset="utf-8"><base href="about:srcdoc"><style>${css}</style></head><body><main data-native-root>${body}</main>${bridge}${script}</body></html>`
  if (entry.comparison) {
    const doc = escapeHTML(shell(entry.html))
    return shell(`<div style="display:flex;gap:16px;align-items:start"><section><p>Viewport: 780px</p><iframe title="Viewport ampio" style="border:0;width:780px;height:300px" srcdoc="${doc}"></iframe></section><section><p>Viewport: 300px</p><iframe title="Viewport stretto" style="border:0;width:300px;height:300px" srcdoc="${doc}"></iframe></section></div>`)
  }
  const observer = `const main=document.querySelector('main');function measure(){parent.postMessage({type:'cvedi-native-height',height:Math.ceil(main.scrollHeight)},'*')}new ResizeObserver(measure).observe(main);requestAnimationFrame(measure);`
  const script = `<script>(()=>{document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',event=>{if(form.method==='dialog')return;event.preventDefault();const output=form.querySelector('output');if(output)output.textContent='Dati ricevuti nell’esempio locale.'}));${entry.modal ? `document.querySelector('main').style.height='396px';const dialog=document.getElementById('${entry.modal}'),print=matchMedia('print');let openedForPrint=false;function printDialog(){if(print.matches&&!dialog.open){openedForPrint=true;dialog.showModal()}else if(!print.matches&&openedForPrint){dialog.close();openedForPrint=false}}print.addEventListener('change',printDialog);printDialog();` : ''}${observer}})()</script>`
  return shell(entry.html, script)
}
