# Portfolio v2: concept e decisioni

Documento di lavoro per la nuova versione del portfolio. Raccoglie decisioni, idee, criticità e domande aperte, così si può riprendere da qui anche in una sessione nuova.

**Fase attuale:** brainstorming. Del nuovo sito non è stato scritto ancora codice.
**Ultimo aggiornamento:** 3 novembre 2026

---

## Come lavoriamo

- Ogni scelta di design importante (stile, composizione, interazioni, struttura) va **proposta e approvata da Gabriele prima di scrivere codice**. Niente concept inventati in autonomia.
- Si lavora sul branch `v2`. `main` e il sito online non si toccano finché non decidiamo di pubblicare. Il deploy su GitHub Pages parte solo con un push su `main` (`.github/workflows/deploy.yml`).
- I testi del sito sono in **inglese**. La conversazione di lavoro è in italiano.

---

## Stato del branch `v2`

- Il vecchio sito (stanza 3D vaporwave / retro-OS) è stato rimosso dal branch: componenti, audio, modelli 3D, icone. Su `main` è ancora tutto lì.
- **Contenuti tenuti e riutilizzabili:**
  - `src/data/projects.ts`: i 19 progetti, con titolo, anno, ruolo, strumenti, sintesi, contesto, 3 punti chiave ed eventuale demo. Il campo `hotspotId` è la vecchia categoria: `uiux`, `graphicdesign`, `xr`, `social`.
  - `src/data/caseStudies.ts`: i case study completi di tutti i 19 progetti (sezioni, numeri, citazioni, gallerie, video Vimeo).
  - `src/data/resume.ts`: dati del CV (profilo, esperienze, formazione, certificazioni, volontariato, competenze, lingue).
  - `src/lib/asset.ts`: helper per i percorsi sotto il base path di GitHub Pages.
  - `media/projects/`: le immagini originali dei progetti (PNG, circa 39 MB), tenute come sorgenti fuori da `public/`.
  - `public/assets/ebook/`: l'EPUB di *Cronache del Segno* e le pagine della guida de *La Casina*.
  - `public/assets/img/profile/gabriele-ruffini.jpg`: foto profilo.
  - `public/404.html` e lo script in `index.html`: redirect per le rotte della SPA su GitHub Pages.
- **Dipendenze installate:** React 18, Vite 5, TypeScript, three.js, React Three Fiber, drei, postprocessing, framer-motion, react-router-dom, lenis.
- **Attenzione:** al momento `npm run build` fallisce perché manca `src/main.tsx`. È normale finché non si inizia a scrivere il nuovo sito.

---

## Il concept

### Home: la TV

- Una **TV in 3D** appoggiata su una **collinetta**, con dietro un **cielo azzurro**. Tutto ha un **effetto grana bello forte**.
- Sullo **schermo**: effetto statico / "segnale assente", con il monoscopio (cerchi e linee, come nei film).
- Dalla TV escono **due raggi** arcobaleno/vaporwave, **diversi tra loro**:
  - **a sinistra: XR design**. Passandoci sopra compare la scritta, cliccando si va alla sezione XR;
  - **a destra: Graphic design**. Passandoci sopra compare la scritta, cliccando si va alla sezione Graphic design.
- **Passando sullo schermo** compare Gabriele (foto, video o modello interattivo: *da decidere*). **Cliccando** si va al CV.
- **"Lelevisione"** (gioco di parole con "televisione", ed è anche l'handle Instagram) compare **sulla TV**. Proposta: come scritta sul monoscopio, come il logo di un'emittente, e come targhetta sulla cornice, dove di solito c'è la marca.
- **Intestazione del sito:** "Gabriele Ruffini".

### Navigazione

- **UI/UX** e **Social** hanno **sezioni tutte loro**, raggiungibili dal menu:
  - **mobile:** menu hamburger;
  - **desktop:** barra menu sulla sinistra dello schermo.
- La gerarchia è voluta: XR e Graphic sono le discipline di punta, perché stanno sulla TV; UI/UX e Social sono raggiungibili dal menu.
- Voci del menu proposte (da confermare): XR, Graphic design, UI/UX, Social, CV, Contatti.

### Corpo del sito: struttura alla SKYLRK

Riferimento: [skylrk.com](https://skylrk.com), sia desktop sia mobile. Osservato a novembre 2026; il sito potrebbe cambiare.

- **Lista (desktop):** oggetti scontornati (PNG senza sfondo) sparsi in modo asimmetrico su uno sfondo sfumato a tutto schermo con grana forte (WebGL). Passando su un oggetto, l'intero sfondo prende i suoi colori. Quasi nessun testo, scroll fluido (Lenis) e transizioni tra pagine.
- **Lista (mobile):** un oggetto per schermata, grande e centrato. Scorrendo si passa al successivo e lo sfondo cambia colore.
- **Pagina prodotto (desktop):** oggetto al centro su sfondo sfumato del suo colore, miniature della galleria in basso a sinistra, pannello "vetro" in basso a destra con nome, una riga di descrizione e `[+]` per espandere.
- **Pagina prodotto (mobile):** oggetto al centro, pallini della galleria, pannello che sale dal basso.
- **Da prendere:** struttura e interazioni (disposizione sparsa, colore dello sfondo che cambia, un oggetto per schermata su mobile, pannello con `[+]`).
- **Da NON prendere:** la loro identità visiva (logo a pillola di vetro, palette, font).

### Pagina progetto (proposta, da confermare)

I case study sono lunghi (sezioni, numeri, citazioni, gallerie, video), mentre la pagina SKYLRK è pensata per una riga di testo. Proposta:

- in alto l'oggetto del progetto, con la galleria, come su SKYLRK;
- nel pannello vetro: titolo, anno, ruolo e una riga di sintesi;
- il `[+]` apre il case study completo, preso da `caseStudies.ts`.

### CV

- **Pagina** dedicata, con **bottone per scaricare il PDF**.
- Proposta: il PDF viene generato dagli stessi dati della pagina (`resume.ts`), così le due versioni restano sempre allineate. In alternativa si usa un PDF fornito da Gabriele.

---

## Categorie e progetti

| Sezione | Come ci si arriva | Progetti (`id` in `projects.ts`) |
|---|---|---|
| **XR design** (3) | raggio sinistro + menu | `the-monsters-archive`, `on-display`, `meta-ar-filters` |
| **Graphic design** (7) | raggio destro + menu | `corti-brillanti`, `graphic-design-ebook`, `psicologa`, `la-casina-bb`, `per-il-tuo-bene`, `alveare`, `cli-centro-linguistico` |
| **UI/UX** (6) | menu | `oracle-webapp`, `cooking-python`, `shopping-app`, `di-cosa-parla`, `cosmic-insights`, `valentine-app` |
| **Social** (3) | menu | `sei-versilia`, `antica-salumeria-vargiu`, `mudac` |

---

## Asset da preparare

### Scontorni dei progetti

L'effetto SKYLRK funziona solo con **oggetti senza sfondo** che fluttuano sul colore. Le immagini attuali sono rettangoli (screenshot, tavole, mockup con sfondo) e da sole non danno lo stesso effetto.

- **Cosa serve:** un PNG trasparente per progetto, circa 1500-2000 px sul lato lungo, possibilmente con luce e angolazione simili tra loro, così sembrano della stessa collezione.
- **Idea:** non per forza un mockup, ma l'**elemento più iconico del progetto**. Il portfolio diventa una collezione di oggetti, un po' da museo, e si lega bene al lavoro al museo e agli studi di Beni Culturali.
- **Alternativa:** usare le immagini attuali come "cartoline". Si perde gran parte dell'effetto; si può fare una prova per valutarlo.

Suggerimenti di partenza, tutti da valutare:

| Progetto | Possibile oggetto |
|---|---|
| The Monsters Archive | il Labubu |
| On Display | un'opera o una scultura del museo virtuale |
| Meta AR Filters | la corona o le ali del filtro, oppure un telefono con il filtro attivo |
| Corti Brillanti | lo spruzzino dell'illustrazione, oppure il poster stampato in leggera prospettiva |
| Cronache del Segno | il libro, oppure un tablet con lo spread Bauhaus |
| Psicologa | il biglietto da visita |
| La Casina B&B | la guida per gli ospiti o il poster di benvenuto |
| Per il tuo Bene | la valigia |
| L'Alveare | la brochure |
| CLI: Language Center | la tote bag |
| The Oracle | la sfera di cristallo |
| Cooking Python | un'icona ingrediente illustrata, oppure un laptop con l'app |
| Shopping App | un telefono con l'app |
| Di cosa parla? | un telefono o un laptop con l'app |
| Tarot: Cosmic Insights | una carta dei tarocchi |
| Valentine App | un telefono con l'app, oppure l'avatar animale |
| SEI Versilia | un telefono con un reel |
| Antica Salumeria Vargiu | un loro prodotto |
| Dialogues in Stone: mudaC | una scultura in marmo dal video |

### Altri asset

- **Modello della TV e collinetta:** da decidere (modello in Blender di Gabriele, oppure segnaposto in codice nel frattempo).
- **Contenuto dello schermo al passaggio del mouse:** da decidere. Per scegliere, conta cosa deve comunicare quel momento:
  - **foto:** "questa è la mia faccia". È la più semplice;
  - **video:** un loop breve senza audio, da 2-4 MB. Ti fa sembrare vivo e simpatico, e funziona molto bene se guardi in camera o fai un gesto, come se stessi andando in onda;
  - **modello interattivo:** per esempio un Gaussian splat, la tecnica di The Monsters Archive. Dice "so fare XR", ma è pesante e complesso da mettere dentro uno schermo. Va bene come upgrade successivo.
- **Colore dominante per progetto:** serve per lo sfondo. Si può estrarre in automatico dagli scontorni e poi ritoccare a mano.

---

## Criticità e accortezze

1. **Su mobile l'hover non esiste.** Etichette dei raggi sempre visibili; lo schermo alterna da solo monoscopio e Gabriele, come uno zapping; un tap porta direttamente alla destinazione.
2. **Composizione verticale.** Su un telefono in verticale due raggi orizzontali vengono tagliati: meglio farli salire a V, o cambiare composizione in base all'orientamento.
3. **Barra menu a sinistra e raggio XR a sinistra.** Su desktop vanno composti in modo che il raggio non finisca sotto la barra: barra stretta e trasparente, oppure TV leggermente spostata a destra.
4. **XR ha solo 3 progetti** ed è la sezione più vuota. Si può compensare con oggetti più grandi, o aggiungere progetti nel tempo.
5. **Chi ha fretta deve capire subito dove cliccare** (es. un recruiter). Servono un indizio minimo (raggi che pulsano, cursore che cambia) e il menu classico sempre disponibile.
6. **Accessibilità.** Il 3D non è leggibile da screen reader e tastiera: dietro raggi e schermo servono link HTML veri.
7. **Riferimenti da non copiare:**
   - **il monoscopio:** va disegnato da zero, non copiato da quello RAI né da quello Philips PM5544;
   - **collinetta verde e cielo azzurro** richiamano "Bliss", lo sfondo di Windows XP. Va bene come strizzata d'occhio, ma va stilizzata, non ricostruita;
   - **da SKYLRK** solo struttura e interazioni, non l'identità.
8. **Grana e statico forti.** Stancano la vista, e uno sfarfallio intenso può dare problemi a chi è fotosensibile:
   - grana solo sugli sfondi, mai sul testo;
   - una versione ferma per chi ha attivato "riduci movimento".
9. **Prestazioni su mobile:**
   - modello della TV compresso, sotto 1-2 MB;
   - video caricato dopo il resto;
   - immagini ottimizzate (WebP) a partire dalle sorgenti in `media/projects/`;
   - immagine statica se WebGL non è disponibile.
10. **I case study lunghi** devono trovare posto nella pagina progetto (vedi proposta sopra).

---

## Piano tecnico (proposta, non ancora approvata)

- **Stack:** quello già installato nel branch. React + Vite + TypeScript; three.js con React Three Fiber e drei; postprocessing per grana ed effetti; Lenis per lo scroll fluido; framer-motion per le transizioni.
- **Pagine:** `/` (TV), `/xr`, `/graphic`, `/uiux`, `/social`, `/work/:id`, `/cv`, più i contatti.
- **Home:**
  - collinetta e cielo generati in codice, con nuvole stilizzate;
  - TV come modello `.glb`, con un segnaposto semplice finché non c'è quello vero;
  - schermo come shader: monoscopio + statico + effetto tubo catodico (scanline, curvatura). Al passaggio del mouse "cambia canale" e mostra foto o video di Gabriele filtrati dallo stesso effetto, così sembrano trasmessi;
  - raggi con un'area cliccabile invisibile più larga del fascio visibile, ed etichette in HTML;
  - grana come passaggio di postprocessing.
- **Idea creativa per i raggi (da approvare):** ognuno parla la lingua della sua disciplina. Quello XR olografico e iridescente, quello Graphic a bande di stampa, retino e CMYK. Restano entrambi "arcobaleno", ma sono diversi tra loro.
- **Idea per la transizione (da approvare):** cliccando un raggio la camera lo segue verso il cielo e l'azzurro si scioglie nel colore della sezione.
- **Sezioni:** un unico sfondo WebGL a sfumatura con grana, che va verso il colore del progetto sotto il mouse. Gli oggetti sono link HTML veri, disposti a mano per ogni formato di schermo, così non si sovrappongono. Su mobile, un progetto per schermata.

---

## Ordine di lavoro proposto

1. **Decisioni e asset** (vedi sotto): scontorni, contenuto dello schermo, TV.
2. **Home in versione grezza:** forme semplici al posto di TV e collinetta, raggi, grana e monoscopio. Serve a verificare composizione e interazioni su desktop e mobile. È la parte più rischiosa.
3. **Sezioni** con gli scontorni pronti.
4. **Pagine progetto e CV.**
5. **Transizioni, rifinitura e prestazioni.**

A ogni tappa si pubblica su `v2`, ed eventualmente si prepara un'anteprima privata da aprire sul telefono.

---

## Decisioni aperte

1. Cosa compare sullo schermo al passaggio del mouse: foto, video o modello?
2. TV e collinetta: modello in Blender di Gabriele, o segnaposto in codice?
3. Scontorni: si fanno? Chi li prepara?
4. PDF del CV: generato dai dati, o fornito da Gabriele?
5. Pagina progetto: va bene la proposta (oggetto + pannello + `[+]` per il case study completo)?
6. Voci e ordine del menu.
7. Prossimo passo: home grezza, oppure prova di una sezione con le immagini attuali?

---

## Cronologia

- **3 novembre 2026:**
  - creato il branch `v2` e rimossa la vecchia app, tenendo i contenuti;
  - definito il concept: home con la TV, corpo alla SKYLRK, UI/UX e Social nel menu, CV come pagina con download;
  - scritto questo documento.
