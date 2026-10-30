# Passo

Sito finale del servizio di fisioterapia a domicilio del caso di Viola, Carlo e Giovanni della lezione 11. Progetto dimostrativo, con aspetto e percorsi di un servizio reale; non invia richieste sanitarie o pagamenti.

La sitemap riprende `progetti/slide/data/ux-booking-sitemap.json`: home, servizio e copertura, ricerca, risultati, dettaglio, riepilogo, richieste, gestione, profili, assistenza e note del servizio. Palette violetto/Cedro e Nunito Sans vengono dalla lezione.

Scenario canonico: Via Esempio 12 a Milano, 17 novembre 2026 dopo le 20, Giulia Riva alle 20:30 o 21:15, Luca Sala alle 21:45, 45 minuti e 60 € con spostamento incluso. I CAP sono parametri illustrativi del sito. I profili professionali e le scene d’uso sono illustrativi: non sono attribuite qualifiche, testimonianze o risultati clinici reali. Il ritratto del paziente nella sezione sulla quotidianità della home deriva dalla fotografia fornita dall’utente, invecchiata molto con ImageGen su sua richiesta. L’originale personale rimane fuori dal repository; il manifest ne conserva soltanto nome e hash.

Il percorso distingue pending, confirmed, declined e cancelled. L’area professionista dimostrativa permette accettazione o rifiuto. La modifica conserva la visita confermata finché viene accettata. Contatti e richieste restano nel browser; il modulo di assistenza prepara un messaggio senza inviarlo. Nessuna autenticazione o sicurezza server viene simulata come reale. Pagamento, notifiche, verifica professionisti, copertura geografica reale e backend sono integrazioni necessarie prima dell’uso come servizio operativo. La dimostrazione statica è pubblicata su GitHub Pages in `/cvedi2627/fisioterapia/`.

Originali e prompt ImageGen in `assets/originals/` e `assets/prompts/`, derivati WebP in `assets/images/`, provenienza in `assets/manifest.json`. Font e licenza locali. La build espone soltanto file applicativi e asset web, escludendo originali, prompt e documenti di sviluppo.
