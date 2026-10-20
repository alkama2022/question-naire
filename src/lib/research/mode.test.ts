import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getDataMode,
  isDataModeResolved,
  isServerMode,
  setDataMode,
  subscribeToDataMode,
} from "./mode.ts";

test("the mode starts on the path the build was made with", () => {
  // The build flag decides it: `VITE_AUTH_ENABLED` unset means real sign-in.
  assert.equal(getDataMode(), process.env.VITE_AUTH_ENABLED === "false" ? "browser" : "server");
});

test("switching the mode notifies the subscribers", () => {
  let calls = 0;
  const unsubscribe = subscribeToDataMode(() => {
    calls += 1;
  });
  setDataMode("browser");
  assert.equal(getDataMode(), "browser");
  assert.equal(isServerMode(), false);
  assert.equal(isDataModeResolved(), true);
  assert.ok(calls >= 1);
  unsubscribe();
});

test("an unsubscribed listener stops hearing about changes", () => {
  let calls = 0;
  const unsubscribe = subscribeToDataMode(() => {
    calls += 1;
  });
  unsubscribe();
  setDataMode("server");
  assert.equal(calls, 0);
  assert.equal(getDataMode(), "server");
  assert.equal(isServerMode(), true);
});
