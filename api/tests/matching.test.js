import test from "node:test";
import assert from "node:assert/strict";
import { matchPlaces, normalizeQuery } from "../lib/matching.mjs";

test("matching expands traveller language into tourism concepts", () => {
  assert.deepEqual(normalizeQuery("animals, falls and photos"), ["wildlife", "waterfall", "and", "photography"]);
});

test("matching ranks Victoria Falls for wildlife and waterfall intent", () => {
  const matches = matchPlaces("I want wildlife, falls and photos");
  assert.equal(matches[0].name, "Victoria Falls");
  assert.ok(matches[0].score > matches[1].score);
});

test("matching finds heritage places from natural language", () => {
  const matches = matchPlaces("ancient stone history and culture");
  assert.equal(matches[0].name, "Great Zimbabwe");
});
