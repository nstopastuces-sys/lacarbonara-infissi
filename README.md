# TeKnoProfil — LaCarbonaraGiovanni Srl

Sito vetrina di **TeKnoProfil**, marchio di LaCarbonaraGiovanni Srl (titolare Giovanni Lacarbonara):
infissi, porte, persiane, grate e verande su misura.

- Showroom: Via Extramurale 559, 74020 Leporano (TA)
- Sede e laboratorio: Via la Fosa 11, 74026 Pulsano (TA)
- Tel. / WhatsApp: 327 847 3088

## Pagine

| File | Contenuto |
| --- | --- |
| `index.html` | Home: slider a tutto schermo, soluzioni, azienda, metodo, detrazioni, realizzazioni |
| `soluzioni.html` | Le nostre soluzioni, una sezione per prodotto |
| `realizzazioni.html` | Galleria con filtri e lightbox (foto Instagram / Facebook / Google) |
| `contatti.html` | Showroom e laboratorio con mappe, orari, modulo preventivo verso WhatsApp |

## Struttura

```
assets/css/style.css   stile (colori e font nelle variabili :root)
assets/js/main.js      animazioni, slider, orari "aperto/chiuso", galleria, modulo
assets/img/            immagini ottimizzate
```

Sito statico, nessuna dipendenza: si apre direttamente `index.html` oppure si pubblica su
qualsiasi hosting (GitHub Pages, Netlify, Aruba…).

## Da modificare

- **Orari**: oggetto `INFO.hours` in `assets/js/main.js` e testi nelle pagine.
- **Numero WhatsApp**: `INFO.whatsapp` in `assets/js/main.js` e i link `wa.me` nelle pagine.
- **Foto**: le immagini `hero-*` e `amb-*` sono foto d'ambiente (Unsplash) da sostituire
  con foto dei lavori; le altre provengono dai profili social dell'azienda.

## Animazioni

- Transizione di pagina: una finestra a due ante si chiude e si riapre.
- Pulsanti: le due ante del pulsante si aprono al passaggio del mouse.
- Foto: si scoprono allo scroll come un'anta che si apre.
- Rispetta `prefers-reduced-motion`.
