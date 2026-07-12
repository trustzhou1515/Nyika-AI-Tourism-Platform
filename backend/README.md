# Nyika AI Backend

This is the lightweight backend layer for the Explore Zimbabwe MVP.

It is intentionally dependency-free so it can run anywhere Node.js runs during judging or demo preparation.

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
```

## Endpoints

```text
GET  /api/health
POST /api/privacy/consent
POST /api/plans
POST /api/memories
POST /api/operator-leads
GET  /api/admin/summary
```

## Current storage

Records are appended to JSONL files under `backend/storage/`.

This is suitable for MVP demonstration and auditability. Production should replace it with a managed database.

## Compliance notes

- Consent records are captured through `/api/privacy/consent`.
- Backend payloads are capped at 1 MB.
- Obvious email addresses and phone numbers are masked before writing logs.
- Security headers are returned on API responses.
- The MVP keeps personal memories local unless sharing or upload is enabled.

## Production hardening roadmap

- Add authenticated user accounts and role-based admin access.
- Move JSONL storage to PostgreSQL or another managed database.
- Add encryption at rest and encrypted backups.
- Add formal retention policies for consent, plan records and operator leads.
- Add rate limiting, request validation and API keys for partner integrations.
- Add payment, booking and operator-confirmation integrations.
