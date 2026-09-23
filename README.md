# The Pottery Hut 🏺

En keramikbutik byggd med Angular och Node.js/Express - ett skolprojekt för kursen JavaScript 3 vid EC Utbildning.

## Om projektet
The Pottery hut är en fiktiv webbshop för handgjord keramik, byggd som examinerande projektarbete. Sidan är uppdelad i temakollektioner (Mud, Sand, Grass, Ocean, Cloud, Tropical) och innehåller ett komplett shoppingflöde från produktkatalog till kassa, samt en adminpanel för att hantera produkter.

Projektet är byggt mobile-first med vanlig CSS och backend helt fristående från frontend - två separata processer som kommunicerar via ett REST-API.

## Funktioner

- **Produktkatalog** med sök, filtrerad på publiceringsdatum
- **Nyhet-badge** på produkter publicerade under de senaste 7 dagarna
- **Roterande Hero-karusell** med kollektionsbilder
- **Produktdetaljsida** med liknande produkter (filtrerat på kollektion, bläddringsbart)
- **Varukorg** med redigerbart antal och borttagning, byggd med Angular signals
- **Kassa** med kunduppgiftsformulär och orderöversikt
- **Admin-panel** för att lista, skapa och radera produkter

## Teknikstack

- **Frontend:** Angular 22, CSS (mobile-first, design tokens via CSS-variabler) 
- **Backend:** Node.js, Express 
- **Databas:** SQLite 

## Kom igång lokalt

### Förutsättningar
- Node.js 18+

### Installation

```bash
# Klona repot
git clone https://github.com/mristimaki/pottery-hut.git

# Starta backend
cd server
npm install
npm run dev
# (eller: node index.js)

# Starta frontend (i en ny terminal)
cd client
npm install
ng serve
```

Appen körs på `http://localhost:4200`, API:et på `http://localhost:3000`. 

## Projektstruktur

```
pottery-hut/
├── CLAUDE.md                        # AI-riktlinjer
│(Angular/TypeScript)
├── client/                          # Angular frontend
│   ├── public/
│   │   ├── products/                # Produktbilder
│   │   └── hero/                    # Kollektionsbilder till Hero
│   └── src/
│       ├── app/
│       │   ├── components/          # Återanvändbara byggstenar
│       │   │   ├── header/
│       │   │   ├── footer/
│       │   │   └── product-card/
│       │   │   └── administration/  # Admin-layout (topbar + sidebar)
│       │   ├── pages/                # Route-kopplade sidor
│       │   │   ├── home/
│       │   │   ├── search-results/
│       │   │   ├── product-detail/
│       │   │   ├── basket/
│       │   │   ├── checkout/
│       │   │   ├── admin-product-list/
│       │   │   └── admin-product-new/
│       │   ├── services/             # Delad logik & datahantering
│       │   │   ├── product.ts        # HTTP-anrop till backend
│       │   │   └── cart.ts           # Kundvagn (signals)
│       │   ├── app.routes.ts         # All routing
│       │   └── app.config.ts         # Globala providers
│       ├── index.html
│       └── styles.css                # Design tokens, global reset
│
└── server/                          # Express backend
    ├── db/
    │   ├── database.js               # SQLite-anslutning + tabell
    │   └── seed.js                   # Testdata
    ├── routes/
    │   ├── products.js               # GET /products, /search, /:slug
    │   └── admin.js                  # CRUD för admin
    ├── index.js                      # Startpunkt, Express-setup
    └── pottery-hut.db                # Databasfil (gitignored)
```

## AI-användning

Jag har använt Claude (Anthropic) som stöd genom hela projektet - bland 
annat för att förklara Angular- och TypeScript-koncept, felsöka CSS och 
kod, få vägledning kring struktur och git-arbetsflöde, samt som bollplank 
vid designbeslut. Jag har även använt AI för att generera produktbilder. 
All kod är skriven, testad och förstådd av mig själv.
