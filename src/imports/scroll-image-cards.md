Obiettivo

Le cards immagine salgono una dopo l’altra durante lo scroll down.

Ogni card, quando raggiunge la zona del testo “About”, si ferma in una posizione finale sopra al testo (overlay), senza spostare il testo (no reflow).

Continuando a scrollare, arrivano progressivamente altre cards che si fermano anch’esse, finché in totale sono 9 e coprono tutto il testo (testo totalmente nascosto perché le cards sono sopra).

Scorrendo verso l’alto, l’animazione si inverte perfettamente: l’ultima card entrata è la prima a scendere e “liberare” il testo, poi le altre in ordine inverso.

Regole di movimento (scroll-linked, reversibile)

Ogni card è un layer indipendente con posizione finale “pinned” (ferma) quando raggiunge la sua destinazione sopra al testo.

L’avanzamento è agganciato alla progressione dello scroll (non “once”), quindi deve essere bidirezionale e deterministico: stesso scroll = stessa posizione; scroll up = animazione in reverse.

Le cards devono arrivare in sequenza (stagger): la card 1 inizia e si “pinna”, poi card 2, ecc. fino alla 9.

Le cards hanno formati diversi (dimensioni/ratio differenti) e posizioni finali diverse (alcune più grandi, altre strette; alcune leggermente ruotate 0–3° opzionale). Mantieni la varietà già presente nel design.

Durante la salita, la card deve avere un leggero easing “ease-out” quando si ferma, ma sempre coerente con lo scroll (niente inerzia che continua dopo che lo scroll si ferma).

Layering

Quando una card entra nella zona del testo, deve passare davanti al testo (z-index più alto) e restarci.

Le cards si stratificano: ogni nuova card che arriva può stare sopra (o alternare sopra/sotto) per creare profondità, ma alla fine devono coprire completamente il blocco testo.

Implementazione in Figma (come deve costruirlo Make)

Tratta ciascuna card come componente ImageCard con 3 stati principali (varianti), controllati da scroll:

Offscreen/Start: sotto (o più in basso) rispetto alla sua posizione finale, non copre il testo.

Moving: sale verso la sua posizione finale.

Pinned/Final: è ferma nella posizione finale sopra al testo (overlay).

La progressione complessiva è un “timeline” di scroll divisa in 9 segmenti (uno per card):

Segmento 1 anima Card1 da Start → Final (poi resta pinned).

Segmento 2 anima Card2 da Start → Final (Card1 resta pinned).

…

Segmento 9 anima Card9 da Start → Final (tutte pinned, testo coperto).

In reverse (scroll up) la timeline torna indietro: Card9 Final→Start, poi Card8, ecc.

Soglie pratiche (se servono numeri)

Definisci un range di scroll dedicato all’animazione (es. dall’ingresso della sezione testo fino a ~1–1.5 viewport oltre).

Ogni card usa circa 1/9 del range come intervallo principale di movimento.

Quando una card raggiunge la posizione Final, la sua Y deve restare bloccata (pinned) finché la timeline non torna indietro.

Risultato atteso

Scroll down: le cards “risalgono” e si fermano una alla volta sopra il testo, fino a 9, testo completamente coperto.

Scroll up: tutto torna indietro in ordine inverso, rivelando progressivamente il testo.

Nessun click, nessun autoplay: tutto è guidato dallo scroll e reversibile.