# Fonti delle esercitazioni

La prima importazione proviene dalla [cartella Drive fornita](https://drive.google.com/drive/folders/1-bbzTObnn8aIhg-SV1qbURfHqVE_OV3y). Le 349 pagine originali di Elia Guarnieri restano nei PPTX e PDF con hash nel [manifest](../../assets/esercitazioni/manifest.json).

Su richiesta, le esercitazioni 05–07 sono rielaborazioni didattiche su Tailwind CSS 4 e daisyUI 5. I testi nuovi sono distinti dagli originali; non sono attribuiti a Elia. I crediti del materiale precedente sono conservati nell’archivio. La slide 11 della 03 aggiorna il solo rimando alle proprietà logiche.

| Set | Presentazione originale conservata | Percorso attivo | Originali | Slide |
| --- | --- | --- | ---: | ---: |
| 01 | [Esercitazione 1 - Ripasso HTML e CSS di base](https://docs.google.com/presentation/d/1RsRsGrqxqbBjVxgf4NmFC-HbVZuK7TrSNNT8xPKg4do) | [Esercitazione 1 - Ripasso HTML e CSS di base](../../esercitazioni/01-html-css-base.md) | 68 | 108 |
| 02 | [Esercitazione 2 - Ripasso HTML e CSS avanzato](https://docs.google.com/presentation/d/1sDW-PCc3Ch_o8zUwfzpwRewvz8J2kmki8nYFq_Dtgfw) | [Esercitazione 2 - Ripasso HTML e CSS avanzato](../../esercitazioni/02-html-css-avanzato.md) | 47 | 79 |
| 03 | [Esercitazione 3 - Nuove proprietà CSS, Grid e Srcset](https://docs.google.com/presentation/d/1EG9Xyk-TjrYkB7KKBrnhFqBpXqE9kyod55vXmliXcTg) | [Esercitazione 3 - Nuove proprietà CSS, Grid e Srcset](../../esercitazioni/03-css-grid-srcset.md) | 37 | 50 |
| 04 | [Esercitazione 4 - Interfacce responsive e approccio mobile-first](https://docs.google.com/presentation/d/1XFFJo5Lz8MX0zkuDjiOuoFCTmc7np0waQdoJdmdpH30) | [Esercitazione 4 - Interfacce responsive e approccio mobile-first](../../esercitazioni/04-responsive-mobile-first.md) | 34 | 42 |
| 05 | [Esercitazione 5 - Introduzione ai framework e a Bootstrap](https://docs.google.com/presentation/d/1XhSbOUME_lItjVebSQzFKv8sRblKsWm-yhSi20i0jUw) | [Esercitazione 5 - Tailwind CSS: basi e layout](../../esercitazioni/05-tailwind-css.md) | 32 | 48 |
| 06 | [Esercitazione 6 -  Altri elementi di Bootstrap: content, component, utilities](https://docs.google.com/presentation/d/1v2owZopSuCOyxdVd_j8R1RXMXeL0d8-B_aHSUpMmhoc) | [Esercitazione 6 - daisyUI: componenti per le interfacce](../../esercitazioni/06-daisyui-componenti.md) | 36 | 70 |
| 07 | [Esercitazione 7 - Personalizzare Bootstrap con le custom properties](https://docs.google.com/presentation/d/1YJV5T5COoNIng8mRunSjsr37Rj_MqYGPP9RMisrwAqI) | [Esercitazione 7 - Temi con Tailwind CSS e daisyUI](../../esercitazioni/07-temi-tailwind-daisyui.md) | 17 | 33 |
| 08 | [Esercitazione 8 - Git](https://docs.google.com/presentation/d/1HrRgUF3BVGQsmQxyZcU8AuMkECNTOZ9MC0eyXGuGjWc) | [Esercitazione 8 - Git](../../esercitazioni/08-git.md) | 40 | 60 |
| 09 | [Esercitazione 9 - JavaScript e jQuery](https://docs.google.com/presentation/d/1l5WT9UOqZYQZyI9xpRNybM-ayCItm8x0AOZgEaTRmu8) | [Esercitazione 9 - JavaScript e jQuery](../../esercitazioni/09-javascript-jquery.md) | 38 | 44 |

Le mappature originali delle parti sostituite descrivono l’importazione in `assets/esercitazioni/bootstrap-archive/`, insieme ai dati e ai Markdown precedenti. Per le nuove slide, `sourceSlide` è nullo e `sourceKind` è `official-docs`: la fonte è il collegamento alla documentazione e il codice degli esempi è originale. Gli altri contenuti, collegamenti, conteggi e crediti restano conservati.

La specifica editoriale è [framework-curriculum.mjs](../../data/esercitazioni/framework-curriculum.mjs). HTML, PNG originali, hash e 44 riferimenti verificati il 21 ottobre 2026 sono nel [catalogo](../../assets/esercitazioni/tailwind-daisyui/sources.json). Le 85 slide che contenevano immagini sono ricostruite con testo, tabelle, codice e HTML/CSS nativi. Non rimangono bitmap attive nelle esercitazioni; il codice usa `mockup-code` di daisyUI. Le trascrizioni e i diagrammi sono in [native-examples.mjs](../../data/esercitazioni/native-examples.mjs), il renderer in [ExerciseNative.vue](../../components/ExerciseNative.vue). Gli 83 raster sostituiti, i JSON e i Markdown precedenti sono conservati con hash in `assets/esercitazioni/native-rebuild/`. Contenuti e attribuzioni sono verificati sugli originali; tre correzioni puntuali sono registrate in `nativeCorrections`, con fonti MDN e VS Code collegate nelle slide. Il grafico StatCounter conserva i valori storici di settembre 2022–settembre 2023, esplicitamente distinti dai dati attuali.

I 19 casi guidati in [worked-examples.mjs](../../data/esercitazioni/worked-examples.mjs) aggiungono 38 slide di codice e risultato, con osservazione e modifica da provare. Il catalogo comprende 41 esempi HTML correnti con hash dei sorgenti, separati dai 22 PNG precedenti conservati. I moduli 05, 06 e 07 comprendono rispettivamente 48, 70 e 33 slide, includendo esercizi pratici di 15, 20 e 15 minuti. Indici e URL dei set restano compatibili. Tutte le esercitazioni rimangono locali; online l’indice conserva titoli e palette con i pulsanti disabilitati. Non sono aggiunte note del relatore.

Le pagine 01/107, 02/76 e 02/78 ricostruiscono i riferimenti come liste di collegamenti, mantenendo etichette, ordine e destinazioni delle pagine originali 67, 45 e 46. In particolare, 02/76 conserva i quattro approfondimenti Flexbox. I dialoghi si aprono su richiesta e mostrano i contenuti in stampa; Escape permette il ritorno alla navigazione della presentazione. Il form del modulo 06 annuncia una conferma locale dopo la validazione. Gli esempi e la configurazione CSS mostrata condividono gli override dei temi per secondary-content, accent-content, error, error-content e primary-content scuro. Il contrasto delle coppie interessate viene misurato in `pnpm check:frameworks`; non costituisce una certificazione dell’intero corso.

## Documentazione primaria consultata

- [Tailwind · utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind · installazione CLI](https://tailwindcss.com/docs/installation/tailwind-cli)
- [Tailwind · Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Tailwind · responsive design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind · stati e varianti](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Tailwind · rilevamento delle classi](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [Tailwind · theme variables](https://tailwindcss.com/docs/theme)
- [Tailwind · Preflight](https://tailwindcss.com/docs/preflight)
- [Tailwind · Grid](https://tailwindcss.com/docs/grid-template-columns)
- [Tailwind · Flexbox](https://tailwindcss.com/docs/flex)
- [Tailwind · padding](https://tailwindcss.com/docs/padding)
- [Tailwind · CSS personalizzato](https://tailwindcss.com/docs/adding-custom-styles)
- [daisyUI · installazione](https://daisyui.com/docs/install/)
- [daisyUI · utilizzo](https://daisyui.com/docs/use/)
- [daisyUI · colori semantici](https://daisyui.com/docs/colors/)
- [daisyUI · temi](https://daisyui.com/docs/themes/)
- [daisyUI · personalizzazione](https://daisyui.com/docs/customize/)
- [daisyUI · configurazione](https://daisyui.com/docs/config/)
- [daisyUI · Button](https://daisyui.com/components/button/)
- [daisyUI · Card](https://daisyui.com/components/card/)
- [daisyUI · Alert](https://daisyui.com/components/alert/)
- [daisyUI · Input](https://daisyui.com/components/input/)
- [daisyUI · Validator](https://daisyui.com/components/validator/)
- [daisyUI · Select](https://daisyui.com/components/select/)
- [daisyUI · Checkbox](https://daisyui.com/components/checkbox/)
- [daisyUI · Navbar](https://daisyui.com/components/navbar/)
- [daisyUI · Breadcrumbs](https://daisyui.com/components/breadcrumbs/)
- [daisyUI · Dropdown](https://daisyui.com/components/dropdown/)
- [daisyUI · Collapse](https://daisyui.com/components/collapse/)
- [daisyUI · Modal](https://daisyui.com/components/modal/)
- [daisyUI · Table](https://daisyui.com/components/table/)
- [daisyUI · Loading](https://daisyui.com/components/loading/)
- [daisyUI · Theme Controller](https://daisyui.com/components/theme-controller/)
- [MDN · custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [MDN · validazione dei form](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation)
- [W3C · contrasto del testo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

Le fonti aggiunte per i casi guidati sono [gap](https://tailwindcss.com/docs/gap), [justify-content](https://tailwindcss.com/docs/justify-content), [grid-column](https://tailwindcss.com/docs/grid-column), [display](https://tailwindcss.com/docs/display), [flex-wrap](https://tailwindcss.com/docs/flex-wrap), [Fieldset](https://daisyui.com/components/fieldset/), [Radio](https://daisyui.com/components/radio/) e [Badge](https://daisyui.com/components/badge/), consultate il 21 ottobre 2026.
