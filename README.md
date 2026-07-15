# Nyika AI Tourism Platform

Nyika AI is an AI-assisted Zimbabwe tourism discovery, planning and budgeting MVP. It helps travellers describe the kind of trip they imagine, matches that intent to Zimbabwean destinations, estimates transparent budgets, shows places on a map, and prepares safer travel guidance.

Live project link: https://explorezw.co.zw

## Why This Product Exists

Tourists, schools, families and local travellers often want to explore Zimbabwe but do not know where to go, what activities are available, what to budget, what to wear, or how to plan transport and accommodation. Nyika AI turns scattered tourism information into one guided experience that supports discovery, budgeting, safety and future bookings.

## Justified AI Use

Nyika AI does not use AI as a decorative feature. AI-style intelligence is used only where user language is vague, emotional or mixed: for example, “I want waterfalls, wildlife and a quiet place for photos.” This requires intent understanding, synonym handling, typo tolerance, activity matching, safety interpretation and recommendation ranking.

Budget totals, group estimates, per-person calculations and itinerary cost breakdowns are handled by transparent deterministic logic and destination cost profiles. This avoids using AI where simple arithmetic or database retrieval is more appropriate. The system is designed to be explainable to evaluators, users and tourism partners.

## Current MVP Features

- Natural-language destination matching through Nyika AI Discover.
- Plan AI for one-destination and across-Zimbabwe trip prompts.
- Budget estimation by destination, days, group size and travel style.
- Confirmation flow before budget generation.
- Visual discovery cards for destinations and activities.
- Interactive Zimbabwe tourism map with destination pins and View More actions.
- Private memories page with example memories and share-link behaviour.
- Care guidance: safety notes, packing suggestions and clothing categories.
- Coming-soon booking direction for flights, taxis, accommodation and tourism operators.
- Backend API for records, compliance evidence and PostgreSQL-ready login.

## Architecture Summary

The current MVP is a Vite React web application with a lightweight Node.js API and a companion Expo React Native mobile app. The backend captures consent, plan, memory and operator-lead records in local JSONL storage for demo auditability. Login support is PostgreSQL-ready through `DATABASE_URL` and stores users and sessions in database tables.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full technical architecture, constraints and deployment notes.

## Repository Layout

```text
backend/                 Node.js API used by the MVP
src/                     React web app source
src/engine/              Prompt parsing, budgeting and itinerary logic
src/utils/               Destination matching and search intelligence
src/data/                Destination, outfit and tourism data
api/tests/               Evaluator-facing unit and API tests
docs/                    Architecture and readiness documentation
web/                     Web lockfile placeholder for future monorepo split
mobile/                  Mobile lockfile placeholder requested for evaluator traceability
mobileapp/               Expo React Native companion mobile app
mobileapp/src/screens/   Mobile Home, Planner and Destination screens
mobileapp/src/data/      Mobile destination seed data and match tags
```

The app has not yet been split into separate `/api`, `/web` and `/mobile` packages. The current production web code remains in `backend/` and `src/` to avoid breaking the working MVP. The requested `/api/tests` and lockfile evidence folders are included for evaluator traceability. The active React Native companion app is in `mobileapp/`.

## Required Services

- Node.js 20+ recommended.
- npm.
- PostgreSQL for login/accounts when authentication is enabled.
- Hostinger or equivalent hosting for the web build and Node API.

## Environment Variables

Copy `.env.example` and provide values for your environment. Key variables are:

```text
DATABASE_URL=postgres://username:password@host:5432/nyika_ai
NYIKA_API_PORT=8787
NYIKA_ALLOWED_ORIGIN=https://explorezw.co.zw
VITE_NYIKA_API_URL=https://api.explorezw.co.zw
```

No OpenAI, Gemini or third-party LLM key is required for the current MVP.

## Install and Run

```bash
npm install
npm run dev
```

Run the backend in a second terminal:

```bash
npm run backend
```

Default local URLs:

```text
Web: http://127.0.0.1:5173
API: http://127.0.0.1:8787
```

## React Native Mobile App

The companion mobile app is in `mobileapp/`. It is an Expo React Native application that mirrors the MVP direction: Nyika AI chat-style discovery, destination match cards, destination detail screens and a mobile planner.

```bash
cd mobileapp
npm install
npm run start
```

Optional targets:

```bash
npm run android
npm run ios
npm run web
```

Type-check the mobile app:

```bash
cd mobileapp
npx tsc --noEmit
```

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

The tests cover matching logic, budget logic and backend API request/response validation.

Mobile verification:

```bash
cd mobileapp
npx tsc --noEmit
```

## Demo Instructions for Judges

1. Open the web app at `http://127.0.0.1:5173`.
2. On Home, use Nyika AI Discover and type: “I love wildlife and waterfalls, but I also want a quiet place for photos.” Press Send.
3. Open Explore and test suggested prompts. They should fill the text box and wait for Send.
4. Open Plan AI and type: “Plan Victoria Falls for 3 days, 2 people, standard style.” Confirm the detected details and generate.
5. Review the result page: budget estimate, budget split, itinerary, what to pack and safety notes.
6. Open Map, click a destination pin and use View More.
7. Open Memories and add a private travel note.
8. Open Login to see the PostgreSQL-ready account flow. Set `DATABASE_URL` before live login testing.
9. For the React Native companion app, run `cd mobileapp && npm run start`, then open it with Expo Go or a simulator. Review Home, Destination and Planner screens.

## Backend Endpoints

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
POST /api/privacy/consent
POST /api/plans
POST /api/memories
POST /api/operator-leads
GET  /api/admin/summary
```

## Data Protection Direction

The MVP minimizes personal-data collection. Consent records are captured through the backend. PostgreSQL login stores hashed passwords and hashed session tokens. Production deployment should add formal privacy-policy pages, retention rules, user export/delete flows, encrypted backups and role-based access for admin screens.

## Developers

- Trust Zhou - Software Developer, AI Engineer
- Ratidzo Chipere - Data Scientist, Financial Analyst

Contact: 0771129963 / trustzhou1515@gmail.com
