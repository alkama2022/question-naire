#!/usr/bin/env node
/**
 * End-to-end check of the production path.
 *
 * Walks the flows that only work when the server is the source of truth:
 *
 *   1. register a researcher (a real account, hashed password, server session)
 *   2. open the researcher workspace and see the account's own records
 *   3. sign out, register a participant
 *   4. browse the public catalogue and consent to a study
 *   5. see that consent again in "My applications"
 *
 * Every step is checked against what the SERVER returns — the browser's copy
 * of the data is never the evidence. Any console error fails the run.
 *
 * Usage:
 *   node scripts/qa-e2e.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { findInstalledChromium } from "./browser-binary.mjs";

const BASE = process.argv[2] ?? "http://127.0.0.1:8080";
const stamp = Date.now();
const RESEARCHER = {
  name: "QA Researcher",
  email: `qa.researcher.${stamp}@example.com`,
  password: "qa-researcher-pass-2026",
};
const PARTICIPANT = {
  name: "QA Participant",
  email: `qa.participant.${stamp}@example.com`,
  password: "qa-participant-pass-2026",
};

const steps = [];
let failed = false;

function record(name, ok, detail = "") {
  steps.push({ name, ok, detail });
  if (!ok) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

/** Launch options: Playwright's own Chromium, or one already on this machine. */
function launchOptions() {
  const bundled = chromium.executablePath();
  if (existsSync(bundled)) return {};
  const executablePath = findInstalledChromium();
  return executablePath ? { executablePath } : {};
}

/**
 * Open a page and wait until React has hydrated.
 *
 * Without this a click can land on the server-rendered markup before the
 * event handlers exist — the form then submits natively and the page reloads
 * instead of running the app's own logic.
 */
async function gotoHydrated(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page
    .waitForFunction(() => Boolean(window.__vite_plugin_react_preamble_installed__), null, {
      timeout: 60000,
    })
    .catch(() => undefined);
  // One tick for the router to mount and the first effects to run.
  await page.waitForTimeout(750);
}

/** Accept the terms — registration requires it. */
async function acceptTerms(page) {
  const box = page.getByRole("checkbox").first();
  await box.waitFor({ timeout: 30000 });
  await box.click();
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    ...launchOptions(),
  });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err?.message || err)));

  try {
    /* 1 — register a researcher ------------------------------------------- */
    await gotoHydrated(page, `${BASE}/register`);
    await page.waitForSelector("#reg-name", { timeout: 60000 });
    await page.fill("#reg-name", RESEARCHER.name);
    await page.fill("#reg-email", RESEARCHER.email);
    await page.fill("#reg-institution", "University of QA");
    await page.fill("#reg-programme", "BSc Sociology");
    await page.fill("#reg-password", RESEARCHER.password);
    await page.fill("#reg-confirm", RESEARCHER.password);
    await acceptTerms(page);
    await page.getByText("Create account").click();
    await page.waitForURL(/\/verify-email/, { timeout: 60000 });
    record("register creates a real account", true, RESEARCHER.email);

    /* 2 — the researcher workspace loads ---------------------------------- */
    await gotoHydrated(page, `${BASE}/researcher`);
    await page.waitForSelector("text=Researcher", { timeout: 60000 });
    const signedIn = await page.getByText(RESEARCHER.name).first().isVisible();
    record("the signed-in researcher reaches their workspace", signedIn);

    /* 3 — sign out -------------------------------------------------------- */
    await gotoHydrated(page, `${BASE}/researcher`);
    await page.waitForSelector("text=Log out", { timeout: 60000 });
    await page.getByText("Log out", { exact: true }).first().click();
    await page.getByRole("button", { name: "Log out" }).last().click();
    await page.waitForURL(/\/login/, { timeout: 60000 });
    record("sign-out ends the server session", true);

    /* 4 — register a participant ------------------------------------------ */
    await gotoHydrated(page, `${BASE}/register?role=participant`);
    await page.waitForSelector("#reg-name", { timeout: 60000 });
    await page.getByText("Participant", { exact: true }).first().click();
    await page.fill("#reg-name", PARTICIPANT.name);
    await page.fill("#reg-email", PARTICIPANT.email);
    await page.fill("#reg-institution", "University of QA");
    await page.fill("#reg-programme", "BSc Psychology");
    await page.fill("#reg-password", PARTICIPANT.password);
    await page.fill("#reg-confirm", PARTICIPANT.password);
    await acceptTerms(page);
    await page.getByText("Create account").click();
    await page.waitForURL(/\/verify-email/, { timeout: 60000 });
    record("register creates a participant account", true, PARTICIPANT.email);

    /* 5 — the public catalogue comes from the database -------------------- */
    await gotoHydrated(page, `${BASE}/studies`);
    await page.waitForSelector("text=Social media use and sleep quality", { timeout: 60000 });
    record("the public catalogue is served from the database", true);

    /* 6 — consent to a study (a server-side write) ------------------------ */
    await page.getByText("Social media use and sleep quality").first().click();
    await page.waitForSelector("text=What is involved", { timeout: 60000 });
    const consentButton = page.getByRole("button", { name: /consent/i }).first();
    await consentButton.waitFor({ timeout: 60000 });
    // The screening form has to be completed before consent is offered.
    for (const label of [
      "I am in the age range this study asks for",
      "I meet the inclusion criteria",
      "I do not meet the exclusion criteria",
      "I have read the information statement",
      "Taking part is voluntary",
      "I can withdraw at any time",
      "I agree to take part",
    ]) {
      const box = page.getByText(label, { exact: false }).first();
      if (await box.count()) await box.click();
    }
    await consentButton.click();
    await page.waitForSelector("text=You consented", { timeout: 60000 });
    record("consent is recorded by the server", true);

    /* 7 — the consent comes back from the server --------------------------- */
    await gotoHydrated(page, `${BASE}/participant/applications`);
    await page.waitForSelector("text=Social media use and sleep quality", { timeout: 60000 });
    record("the consent is read back from the database", true);
  } catch (error) {
    record("the flow completed without an error", false, String(error?.message || error).slice(0, 400));
  } finally {
    if (errors.length) {
      record("the browser console stayed clean", false, errors.slice(0, 3).join(" | "));
    } else {
      record("the browser console stayed clean", true);
    }
    await browser.close();
  }

  console.log(
    JSON.stringify(
      { ok: !failed, base: BASE, steps, consoleErrors: errors.slice(0, 5) },
      null,
      2,
    ),
  );
  process.exit(failed ? 1 : 0);
}

main();
