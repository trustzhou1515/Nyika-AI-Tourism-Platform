import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

async function waitForHealth(port) {
  const url = `http://127.0.0.1:${port}/api/health`;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Backend did not start");
}

test("backend API validates core MVP endpoints", async (t) => {
  const port = 8899;
  const storage = await mkdtemp(path.join(tmpdir(), "nyika-api-test-"));
  const child = spawn(process.execPath, ["backend/server.mjs"], {
    cwd: process.cwd(),
    env: { ...process.env, NYIKA_API_PORT: String(port), NYIKA_API_HOST: "127.0.0.1", NYIKA_DATA_DIR: storage },
    stdio: "ignore"
  });

  t.after(() => child.kill());

  const health = await waitForHealth(port);
  assert.equal(health.ok, true);
  assert.equal(health.service, "Nyika AI backend");

  const planResponse = await fetch(`http://127.0.0.1:${port}/api/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ destination: "Victoria Falls", days: 3, people: 2 })
  });
  assert.equal(planResponse.status, 201);
  assert.equal((await planResponse.json()).ok, true);

  const memoryResponse = await fetch(`http://127.0.0.1:${port}/api/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ place: "Nyanga", note: "Beautiful mountain memory" })
  });
  assert.equal(memoryResponse.status, 201);

  const missingResponse = await fetch(`http://127.0.0.1:${port}/api/not-found`);
  assert.equal(missingResponse.status, 404);
});
