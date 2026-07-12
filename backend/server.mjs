import http from "node:http";
import { randomUUID } from "node:crypto";
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
const MAX_BODY_BYTES = 1024 * 1024;

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
    "Access-Control-Allow-Headers": "Content-Type, X-Nyika-Client",
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
      version: "0.1.0",
      storage: DATA_DIR,
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/admin/summary") {
    await handleSummary(res);
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
