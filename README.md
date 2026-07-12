# Explore Zimbabwe - Nyika AI

Nyika AI is an AI-guided tourism discovery and budgeting MVP for Zimbabwe. It helps travellers describe the kind of trip they imagine, find matching Zimbabwean destinations, estimate trip budgets, explore places on a map, and prepare safer travel plans.

Live project link: `https://explorezw.co.zw`

## What the MVP does

- Matches natural-language travel ideas to Zimbabwean places.
- Detects destinations, activities, days, group size and travel style from user prompts.
- Generates one-destination and across-Zimbabwe trip plans.
- Estimates budgets by destination, duration, traveller count and style.
- Shows Zimbabwe tourism places on an interactive map.
- Gives care guidance, safety notes and packing recommendations.
- Supports future booking flows for accommodation, taxis, guides and activities.
- Includes a simple backend layer for consent records, generated plans, operator leads and admin summaries.

## Why it matters

Many travellers want to visit Zimbabwe but do not know where to go, what they can do, how much to budget, or how to plan safely. Nyika AI turns scattered tourism information into a simple guided experience that can support local tourism, international visitors, schools, families and tour operators.

## Run locally

```bash
npm install
npm run dev
```

Run the backend in a second terminal:

```bash
npm run backend
```

The local API starts on `http://127.0.0.1:8787`.

## Build

```bash
npm run build
```

## Structure

- `src/App.tsx` — routes
- `src/pages/` — page-level screens
- `src/components/` — reusable UI and layout components
- `src/data/` — destination and map data
- `src/engine/` — AI-style itinerary, budget and booking request engine
- `src/services/` — frontend API client
- `backend/` — Node.js API layer for consent, trip-plan records, operator leads, memories and admin summary
- `src/types/` — TypeScript types
- `src/styles/` — global CSS

## Backend and compliance layer

The MVP includes a simple Node.js backend with no external dependencies. It provides:

- `GET /api/health` for service status.
- `POST /api/privacy/consent` for Data Protection Act consent records.
- `POST /api/plans` for generated trip-plan records and budgeting analytics.
- `POST /api/memories` for future private memory uploads.
- `POST /api/operator-leads` for accommodation, taxi, guide and activity requests.
- `GET /api/admin/summary` for basic stakeholder reporting.

Development records are stored as JSONL files in `backend/storage/`. In production, this storage should move to a managed database with authentication, encryption at rest, role-based access and retention controls.

## AI product logic

Nyika AI currently works as a local MVP intelligence layer, without paid Chat API costs:

- Prompt parsing for places, activities, days, people, budget and travel style.
- Fuzzy matching for Zimbabwe destinations and common spelling errors.
- Visual destination matching from natural-language descriptions.
- Budget estimation by destination, style, group size and duration.
- Safety and compliance notices, including regulated hunting and poaching detection.
- Itinerary generation with care tips, packing guidance and operator-ready booking options.

This baseline is designed to be validated first, then upgraded with a hosted model, retrieval layer, official tourism datasets and partner availability APIs.

## Data protection direction

The MVP is designed to avoid unnecessary personal data collection. Consent is recorded before storing optional planning or memory data. Future production deployment should add:

- secure authentication for admin endpoints,
- database encryption at rest,
- role-based access controls,
- data retention policies,
- privacy policy and user data export/delete flows,
- secure payment and booking integrations through verified partners.

## Developers

- Trust Zhou - Software Developer, AI Engineer
- Ratidzo Chipere - Data Scientist, Financial Analyst

Contact: `0771129963` / `trustzhou1515@gmail.com`
