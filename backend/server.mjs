import http from "node:http";
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { Pool } from "pg";
import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? process.env.NYIKA_API_PORT ?? 8787);
const HOST = process.env.NYIKA_API_HOST ?? "127.0.0.1";
const DATA_DIR = process.env.NYIKA_DATA_DIR
  ? path.resolve(process.env.NYIKA_DATA_DIR)
  : path.join(__dirname, "storage");
const ALLOWED_ORIGIN = process.env.NYIKA_ALLOWED_ORIGIN ?? "*";
const DATABASE_URL = process.env.DATABASE_URL ?? process.env.NYIKA_DATABASE_URL ?? "";
const SESSION_DAYS = Number(process.env.NYIKA_SESSION_DAYS ?? 7);
const MAX_BODY_BYTES = 1024 * 1024;

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined
    })
  : null;

let authSchemaReady = false;

const collections = {
  audit: "audit.jsonl",
  consent: "consent.jsonl",
  memories: "memories.jsonl",
  operatorLeads: "operator-leads.jsonl",
  plans: "plans.jsonl"
};

function jsonResponse(res, status, payload) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Nyika-Client, Authorization",
    "Content-Type": "application/json; charset=utf-8",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(JSON.stringify(payload, null, 2));
}

function notFound(res) {
  jsonResponse(res, 404, { error: "Route not found" });
}

function stripSensitiveText(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/(?:\+?\d[\s-]?){8,14}\d/g, "[phone]")
    .slice(0, 2000);
}

function sanitizePayload(value) {
  if (Array.isArray(value)) return value.slice(0, 80).map(sanitizePayload);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .slice(0, 120)
        .map(([key, item]) => [key, sanitizePayload(item)])
    );
  }
  return stripSensitiveText(value);
}

async function ensureStorage() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readBody(req) {
  const chunks = [];
  let total = 0;

  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_BODY_BYTES) {
      throw Object.assign(new Error("Request body is too large"), { status: 413 });
    }
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw Object.assign(new Error("Invalid JSON body"), { status: 400 });
  }
}

async function appendRecord(collection, payload, req) {
  await ensureStorage();

  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    source: req.headers["x-nyika-client"] ?? "web-mvp",
    payload: sanitizePayload(payload)
  };

  await appendFile(path.join(DATA_DIR, collections[collection]), `${JSON.stringify(record)}\n`, "utf8");
  return record;
}

async function readJsonLines(collection) {
  try {
    const text = await readFile(path.join(DATA_DIR, collections[collection]), "utf8");
    return text
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

function requireDatabase() {
  if (!pool) {
    throw Object.assign(new Error("PostgreSQL is not configured. Set DATABASE_URL before using login."), { status: 503 });
  }
  return pool;
}

async function ensureAuthSchema() {
  const db = requireDatabase();
  if (authSchemaReady) return;

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY,
      email text NOT NULL UNIQUE,
      full_name text NOT NULL DEFAULT '',
      role text NOT NULL DEFAULT 'traveller' CHECK (role IN ('traveller', 'operator', 'admin')),
      password_hash text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id uuid PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash text NOT NULL UNIQUE,
      expires_at timestamptz NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      last_seen_at timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
  `);

  authSchemaReady = true;
}

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    createdAt: row.created_at
  };
}

function validateAuthInput(body, mode) {
  const email = normalizeEmail(body.email);
  const password = String(body.password ?? "");
  const fullName = String(body.fullName ?? body.name ?? "").trim().slice(0, 120);
  const role = ["traveller", "operator", "admin"].includes(body.role) ? body.role : "traveller";

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw Object.assign(new Error("Please enter a valid email address."), { status: 400 });
  }

  if (password.length < 8) {
    throw Object.assign(new Error("Password must be at least 8 characters."), { status: 400 });
  }

  if (mode === "register" && !fullName) {
    throw Object.assign(new Error("Please enter your name."), { status: 400 });
  }

  return { email, password, fullName, role };
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${key}`;
}

function verifyPassword(password, storedHash) {
  const [method, salt, expectedHex] = String(storedHash ?? "").split("$");
  if (method !== "scrypt" || !salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

async function createSession(userId, req) {
  const db = requireDatabase();
  const token = randomBytes(32).toString("base64url");
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  await db.query(
    "INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES ($1, $2, $3, $4)",
    [sessionId, userId, hashToken(token), expiresAt]
  );

  await appendRecord("audit", { action: "auth.session.created", userId, sessionId }, req);
  return { token, expiresAt };
}

function getBearerToken(req) {
  const header = String(req.headers.authorization ?? "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

async function requireUser(req) {
  await ensureAuthSchema();
  const db = requireDatabase();
  const token = getBearerToken(req);
  if (!token) {
    throw Object.assign(new Error("Login required."), { status: 401 });
  }

  const result = await db.query(
    `SELECT users.*,
            sessions.id AS session_id,
            sessions.expires_at
       FROM sessions
       JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = $1
        AND sessions.expires_at > now()
      LIMIT 1`,
    [hashToken(token)]
  );

  if (result.rowCount === 0) {
    throw Object.assign(new Error("Session expired. Please log in again."), { status: 401 });
  }

  await db.query("UPDATE sessions SET last_seen_at = now() WHERE id = $1", [result.rows[0].session_id]);
  return result.rows[0];
}

async function handleRegister(req, res) {
  await ensureAuthSchema();
  const db = requireDatabase();
  const body = await readBody(req);
  const { email, password, fullName, role } = validateAuthInput(body, "register");
  const userId = randomUUID();

  try {
    const result = await db.query(
      `INSERT INTO users (id, email, full_name, role, password_hash)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, full_name, role, created_at`,
      [userId, email, fullName, role, hashPassword(password)]
    );

    const session = await createSession(userId, req);
    await appendRecord("audit", { action: "auth.register", userId, role }, req);

    jsonResponse(res, 201, { ok: true, user: publicUser(result.rows[0]), ...session });
  } catch (error) {
    if (error.code === "23505") {
      throw Object.assign(new Error("An account with this email already exists."), { status: 409 });
    }
    throw error;
  }
}

async function handleLogin(req, res) {
  await ensureAuthSchema();
  const db = requireDatabase();
  const body = await readBody(req);
  const { email, password } = validateAuthInput(body, "login");

  const result = await db.query(
    "SELECT id, email, full_name, role, password_hash, created_at FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (result.rowCount === 0 || !verifyPassword(password, result.rows[0].password_hash)) {
    throw Object.assign(new Error("Email or password is incorrect."), { status: 401 });
  }

  const session = await createSession(result.rows[0].id, req);
  await appendRecord("audit", { action: "auth.login", userId: result.rows[0].id }, req);

  jsonResponse(res, 200, { ok: true, user: publicUser(result.rows[0]), ...session });
}

async function handleMe(req, res) {
  const user = await requireUser(req);
  jsonResponse(res, 200, { ok: true, user: publicUser(user) });
}

async function handleLogout(req, res) {
  await ensureAuthSchema();
  const db = requireDatabase();
  const token = getBearerToken(req);
  if (token) {
    await db.query("DELETE FROM sessions WHERE token_hash = $1", [hashToken(token)]);
  }
  jsonResponse(res, 200, { ok: true, message: "Logged out" });
}


async function handlePost(req, res, collection, responseLabel) {
  const body = await readBody(req);
  const record = await appendRecord(collection, body, req);
  await appendRecord("audit", { action: responseLabel, recordId: record.id }, req);
  jsonResponse(res, 201, {
    ok: true,
    id: record.id,
    message: `${responseLabel} captured`
  });
}

async function handleSummary(res) {
  await ensureStorage();
  const [plans, memories, consent, operatorLeads] = await Promise.all([
    readJsonLines("plans"),
    readJsonLines("memories"),
    readJsonLines("consent"),
    readJsonLines("operatorLeads")
  ]);

  const destinationCounts = plans.reduce((acc, record) => {
    const destination = record.payload?.destination ?? record.payload?.plan?.destination ?? "Unknown";
    acc[destination] = (acc[destination] ?? 0) + 1;
    return acc;
  }, {});

  jsonResponse(res, 200, {
    ok: true,
    generatedAt: new Date().toISOString(),
    storage: DATA_DIR,
    counts: {
      consent: consent.length,
      plans: plans.length,
      memories: memories.length,
      operatorLeads: operatorLeads.length
    },
    topDestinations: Object.entries(destinationCounts)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 8)
      .map(([destination, count]) => ({ destination, count }))
  });
}

async function route(req, res) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS") {
    jsonResponse(res, 204, {});
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/health") {
    jsonResponse(res, 200, {
      ok: true,
      service: "Nyika AI backend",
      version: "0.2.0",
      storage: DATA_DIR,
      postgres: Boolean(pool),
      auth: pool ? "postgres" : "not configured",
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/admin/summary") {
    await handleSummary(res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    await handleRegister(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    await handleLogin(req, res);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/me") {
    await handleMe(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/logout") {
    await handleLogout(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/privacy/consent") {
    await handlePost(req, res, "consent", "Privacy consent");
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/plans") {
    await handlePost(req, res, "plans", "Trip plan");
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/memories") {
    await handlePost(req, res, "memories", "Travel memory");
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/operator-leads") {
    await handlePost(req, res, "operatorLeads", "Operator lead");
    return;
  }

  notFound(res);
}

const server = http.createServer(async (req, res) => {
  try {
    await route(req, res);
  } catch (error) {
    jsonResponse(res, error.status ?? 500, {
      ok: false,
      error: error.message ?? "Internal server error"
    });
  }
});

await ensureStorage();
await writeFile(
  path.join(DATA_DIR, "README.txt"),
  "Nyika AI local MVP storage. JSONL files here are development records and should be replaced with a managed database in production.\n",
  "utf8"
);

server.listen(PORT, HOST, () => {
  console.log(`Nyika AI backend running on http://${HOST}:${PORT}`);
  console.log(`Storage: ${DATA_DIR}`);
});
