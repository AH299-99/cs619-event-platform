# Phase 1 — Backend Setup (Strapi v5 CMS)

## Kya banaya gaya
Strapi v5 headless CMS backend — ye hamare project ka "database + admin panel + API" hai.
Frontend (Next.js) isi se data lega.

## 5 Content Types (database tables)

| Table | Kaam |
|---|---|
| **Category** | Event ki qisam: Music, Sports, Technology... (name, color, icon) |
| **Venue** | Jaga jahan event hoga: name, address, city, latitude/longitude (map ke liye) |
| **Event** | Asal event: title, description, date, price, photos, featured (homepage), organizer info |
| **RSVP** | Kaun user kis event me "going" hai |
| **Review** | Users ki rating (1-5) + comment |

## Relations (tables ka aapas me rishta)
- 1 Category → bohat se Events (one-to-many)
- 1 Venue → bohat se Events
- 1 Event → bohat se RSVPs aur Reviews
- RSVP/Review → 1 User + 1 Event

## Chalane ka tariqa
```bash
cd backend
npm run develop
```
Phir kholo: http://localhost:1337/admin — pehli dafa admin account banao.

## API example (admin me Public role ko allow karne ke baad)
- `GET http://localhost:1337/api/events?populate=*` — sare events
- `GET http://localhost:1337/api/categories` — sare categories
- `GET http://localhost:1337/api/events?filters[featured][$eq]=true` — sirf featured

## Agla Phase
Phase 2: Next.js frontend — homepage, Leaflet map + list view.

## Phase 1 — Mukammal! ✅ (2026-10-08)

**Status:** Backend LIVE aur verified — http://localhost:1337

### Kya kya hua
1. Strapi v5.57 project scaffold hua (`backend/`)
2. 5 content types banaye: Category, Venue, Event, RSVP, Review (+ relations)
3. Seed data dala: **6 categories, 3 venues, 4 events** (2 featured)
4. Guest (Public) role ko read permission di: categories, venues, events
5. API test ho gaya — sab kaam kar raha hai

### Admin login (local)
- URL: http://localhost:1337/admin
- Email: `admin@eventplatform.local`
- Password: `Admin123!@#`

### Server chalane ka tariqa (is VM par)
```bash
mkdir -p /root/.swc-cache && chmod 700 /root/.swc-cache
cd ~/workspace/cs619-event-platform/backend
SWC_NATIVE_BINDING_CACHE=/root/.swc-cache npm run develop
```

### Agla step — Phase 2
Next.js frontend: homepage + Leaflet map + list view.
