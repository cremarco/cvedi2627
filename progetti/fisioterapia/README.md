# Passo · fisioterapia a domicilio

Dalla radice del repository:

```sh
pnpm build:fisioterapia
pnpm dev:fisioterapia
pnpm check:fisioterapia
```

Anteprima su `http://localhost:3045/`. `PASSO_PORT` seleziona un’altra porta. La cartella `dist/` contiene il sito statico autonomo pronto per un hosting statico; la navigazione usa hash e conserva il caricamento diretto senza regole di riscrittura.

Il sito usa Tailwind CSS 4, daisyUI 5 e JavaScript nativo. `data/content.mjs` possiede contenuti e scenario; `data/store.mjs` gestisce lo stato delle richieste; `app.js` compone le pagine. `styles/site.source.css` è la sorgente; `styles/site.css` viene compilato.

Per provare il flusso: cerca un domicilio a Milano, CAP 20121, 17 novembre 2026, dopo le 20; scegli Giulia Riva e invia una richiesta con contatti di esempio. Dal footer apri Area professionista e accettala. In Le mie visite trovi conferma, modifica e annullamento. Altri giorni o fasce mostrano il recupero dai risultati vuoti; altri CAP mostrano la copertura non disponibile. I dati restano nel dispositivo e possono essere cancellati dalla pagina delle visite.

È una dimostrazione: profili, disponibilità e immagini sono illustrativi, nessuna prenotazione reale viene inviata. Per un servizio operativo occorrono backend, autenticazione, verifica dei professionisti, condizioni definitive e disponibilità reali.

La dimostrazione è pubblicata insieme al corso: [Passo su GitHub Pages](https://cremarco.github.io/cvedi2627/fisioterapia/). `pnpm build:pages` include la build di Passo; `PASSO_URL=https://cremarco.github.io/cvedi2627/fisioterapia/ PASSO_CAPTURE=0 pnpm check:fisioterapia` verifica i percorsi online in un browser isolato.
