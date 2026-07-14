# Nyika AI Backend

This is the lightweight backend layer for the Explore Zimbabwe MVP.

It now supports PostgreSQL-backed login while keeping the existing JSONL MVP records for plans, memories and operator leads.

## Run

```bash
npm run backend
```

Default URL:

```text
http://127.0.0.1:8787
```

Optional environment variables:

```text
NYIKA_API_PORT=8787
NYIKA_API_HOST=127.0.0.1
NYIKA_ALLOWED_ORIGIN=http://127.0.0.1:5173
NYIKA_DATA_DIR=./backend/storage
DATABASE_URL=postgres://username:password@localhost:5432/nyika_ai
PGSSLMODE=require # optional for managed cloud Postgres
NYIKA_SESSION_DAYS=7
```

## Endpoints

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

## Current storage

Login accounts and sessions use PostgreSQL when `DATABASE_URL` is set. The schema is in `backend/schema.sql` and is also created automatically by the backend.

Plans, memories, consent and operator leads are still appended to JSONL files under `backend/storage/` for MVP auditability.

This is suitable for MVP demonstration and auditability. Production should replace it with a managed database.

## Compliance notes

- Consent records are captured through `/api/privacy/consent`.
- Backend payloads are capped at 1 MB.
- Obvious email addresses and phone numbers are masked before writing logs.
- Security headers are returned on API responses.
- The MVP keeps personal memories local unless sharing or upload is enabled.

## Production hardening roadmap

- Connect role-based screens to the authenticated user session.
- Move JSONL plans, memories and operator records to PostgreSQL.
- Add encryption at rest and encrypted backups.
- Add formal retention policies for consent, plan records and operator leads.
- Add rate limiting, request validation and API keys for partner integrations.
- Add payment, booking and operator-confirmation integrations.
