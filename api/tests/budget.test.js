import test from "node:test";
import assert from "node:assert/strict";
import { estimateBudget } from "../lib/budget.mjs";

test("budget estimates increase with group size", () => {
  const solo = estimateBudget("Lake Kariba", 3, 1);
  const group = estimateBudget("Lake Kariba", 3, 40);
  assert.ok(group.total > solo.total);
  assert.equal(group.people, 40);
});

test("budget keeps one-day trips from adding accommodation nights", () => {
  const oneDay = estimateBudget("Great Zimbabwe", 1, 1);
  const twoDay = estimateBudget("Great Zimbabwe", 2, 1);
  assert.ok(twoDay.perPerson > oneDay.perPerson);
});

test("budget falls back to Great Zimbabwe profile for unknown places", () => {
  const known = estimateBudget("Great Zimbabwe", 2, 2);
  const fallback = estimateBudget("Unknown Place", 2, 2);
  assert.equal(fallback.total, known.total);
});
