# Phase 1 — Viva Notes (simple words me)

## Strapi kya hai?
**English:** Strapi is a headless CMS — it gives us a database, an admin panel, and REST APIs without writing backend code manually.
**Simple:** Strapi hamara "peeche ka hissa" hai — database + admin panel + API, teeno ek sath. Humein alag se backend code nahi likhna para.

## Headless CMS kya hota hai?
**English:** A CMS that only manages content and exposes it via API. The frontend (Next.js) is separate and fetches data through the API.
**Simple:** Sirf data sambhalta hai, design nahi banata. Design hum Next.js me alag banayenge jo API se data lega.

## 5 tables kyun banayein?
- **Category** — event ki qisam (Music, Sports...) taake filter lag sake (FR-03)
- **Venue** — jaga ka naam + latitude/longitude taake map par marker lag sake (FR-01)
- **Event** — asal event: title, date, price, photos, featured
- **RSVP** — kaun user kis event me jayega (FR me "RSVP/register")
- **Review** — rating 1-5 + comment

## Relation kya hai? (1 sawal pakka ayega)
**English:** A relation links two tables. Example: one Category has many Events (one-to-many). In Strapi we define it in schema.json, and Strapi creates the foreign key automatically.
**Simple:** Do tables ka rishta. Jaise 1 Category ke neeche bohat se Events. Schema me likh diya, Strapi khud database me jor laga deta hai.

## API kaise kaam karti hai?
**English:** Strapi auto-generates REST endpoints: GET /api/events lists events, POST /api/events creates one. `?populate=*` includes relations, `?filters[featured][$eq]=true` filters.
**Simple:** Strapi khud API bana deta hai. `/api/events` kholo to sare events mil jayenge. Filter bhi URL me lag sakta hai.

## Roles (Guest / User / Admin) kahan set honge?
**English:** In Strapi admin panel → Settings → Roles. Public role gets read-only access (guests), Authenticated role gets RSVP/review write access, admin uses the Strapi dashboard.
**Simple:** Admin panel me Roles setting me — Guest sirf dekh sakta hai, login user RSVP/review kar sakta hai, Admin sab control karta hai. Yehi document ke 3 roles hain.

## Database kaunsi hai?
**English:** SQLite for development (file-based, zero setup). For production the document allows PostgreSQL/MySQL — Strapi supports switching via config/database.
**Simple:** Abhi SQLite (file wali, setup nahi chahiye). Asal deploy par PostgreSQL laga sakte hain — Strapi me sirf config badalni hai.
