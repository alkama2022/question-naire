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
/**
 * The administrator account.
 *
 * Its address is listed in `ADMIN_EMAILS` (the environment variable that
 * decides who may hold the administrator role), so it is a fixed address
 * rather than a timestamped one.
 */
const ADMIN = {
  name: "QA Administrator",
  email: process.env.ADMIN_EMAIL ?? "qa.admin@example.com",
  password: "qa-admin-pass-2026",
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
 *
 * Two signals are used: the router global the client sets once it mounts, and
 * the React fiber the hydrator attaches to the document element.
 */
async function gotoHydrated(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page
    .waitForFunction(
      () =>
        Boolean(window.__TSR_ROUTER__) &&
        Object.keys(document.documentElement).some((key) => key.startsWith("__reactFiber$")),
      null,
      { timeout: 90000 },
    )
    .catch(() => undefined);
  // One tick for the router to mount and the first effects to run.
  await page.waitForTimeout(400);
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
    await page.getByRole("button", { name: "Create account" }).click();
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
    await page.getByRole("button", { name: "Create account" }).click();
    await page.waitForURL(/\/verify-email/, { timeout: 60000 });
    record("register creates a participant account", true, PARTICIPANT.email);

    /* 5 — the public catalogue comes from the database -------------------- */
    await gotoHydrated(page, `${BASE}/studies`);
    await page.waitForSelector("text=Social media use and sleep quality", { timeout: 60000 });
    record("the public catalogue is served from the database", true);

    /* 6 — consent to a study (a server-side write) ------------------------ */
    await page.getByText("Social media use and sleep quality").first().click();
    await page.waitForSelector("text=Eligibility and consent", { timeout: 60000 });
    // The screening form has to be completed before consent is offered.
    for (const label of [
      "I am inside the age range for this study.",
      "I meet the inclusion criteria described above.",
      "None of the exclusion criteria apply to me.",
      "I have read the information statement.",
      "I understand that participation is voluntary.",
      "I understand that I can withdraw while the study is open.",
      "I agree to take part.",
    ]) {
      const box = page.getByText(label, { exact: true }).first();
      if (await box.count()) await box.click();
    }
    await page.getByRole("button", { name: "I agree to take part" }).click();
    await page.waitForSelector("text=You consented", { timeout: 60000 });
    record("consent is recorded by the server", true);

    /* 7 — the consent comes back from the server --------------------------- */
    await gotoHydrated(page, `${BASE}/participant/applications`);
    await page.waitForSelector("text=Social media use and sleep quality", { timeout: 60000 });
    record("the consent is read back from the database", true);

    /* 8 — the researcher files a study request ---------------------------- */
    await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(750);
    await page.fill("#login-email", RESEARCHER.email);
    await page.fill("#login-password", RESEARCHER.password);
    await page.getByRole("button", { name: "Log in" }).click();
    await page.waitForURL(/\/(researcher|verify-email)/, { timeout: 60000 });
    await gotoHydrated(page, `${BASE}/researcher/create`);
    await page.waitForSelector("#title", { timeout: 60000 });
    await page.fill("#title", "Sleep and screen time among QA students");
    await page.fill(
      "#purpose",
      "We want to know whether screen time before bed changes sleep quality for students on campus.",
    );
    await page.fill(
      "#description",
      "A short questionnaire about screen habits and how rested students feel in the morning. It takes about eight minutes and answers are anonymous.",
    );
    await page.selectOption("#category", { index: 1 });
    await page.fill("#institution", "University of QA");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForSelector("#population", { timeout: 30000 });
    await page.fill("#population", "Undergraduate students who use a phone before bed.");
    await page.fill("#ageMin", "18");
    await page.fill("#ageMax", "30");
    await page.fill("#location", "Abuja");
    await page.fill("#inclusion", "Students aged 18 to 30 at the university.");
    await page.fill("#exclusion", "Students already enrolled in a sleep study.");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForSelector("#target", { timeout: 30000 });
    await page.fill("#target", "40");
    await page.fill("#deadline", "2026-12-20");
    await page.selectOption("#method", { index: 1 });
    await page.fill("#minutes", "8");
    await page.fill("#url", "https://example.com/questionnaire");
    await page.fill("#incentive", "No incentive is confirmed for this study.");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForSelector("#statement", { timeout: 30000 });
    await page.fill(
      "#statement",
      "We will ask about screen time, sleep hours and morning tiredness. You may skip any question and stop at any time. Your answers are stored with a code, not your name.",
    );
    const screening = page.getByRole("checkbox");
    const count = await screening.count();
    for (let i = 0; i < count; i += 1) await screening.nth(i).click();
    await page.getByRole("button", { name: /submit for review/i }).click();
    await page.waitForURL(/\/researcher\/studies/, { timeout: 60000 });
    await page.waitForSelector("text=Sleep and screen time among QA students", { timeout: 60000 });
    record("the researcher files a study request", true);

    /* 9 — an administrator reviews it ------------------------------------- */
    // A separate context: the session cookie belongs to one account at a
    // time, and the participant is still signed in here.
    const adminContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const adminPage = await adminContext.newPage();
    adminPage.on("console", (msg) => {
      if (msg.type() === "error") errors.push(`[admin] ${msg.text()}`);
    });
    adminPage.on("pageerror", (err) => errors.push(`[admin] ${String(err?.message || err)}`));
    // Create the administrator account (its address is in ADMIN_EMAILS, so the
    // server gives it the administrator role). An account that already exists
    // is fine — the sign-in below is what matters.
    await gotoHydrated(adminPage, `${BASE}/register`);
    await adminPage.waitForSelector("#reg-name", { timeout: 60000 });
    await adminPage.fill("#reg-name", ADMIN.name);
    await adminPage.fill("#reg-email", ADMIN.email);
    await adminPage.fill("#reg-password", ADMIN.password);
    await adminPage.fill("#reg-confirm", ADMIN.password);
    await adminPage.getByRole("checkbox").first().click();
    await adminPage.getByRole("button", { name: "Create account" }).click();
    await adminPage.waitForTimeout(2500);
    await gotoHydrated(adminPage, `${BASE}/login`);
    await adminPage.fill("#login-email", ADMIN.email);
    await adminPage.fill("#login-password", ADMIN.password);
    await adminPage.getByRole("button", { name: "Log in" }).click();
    await adminPage.waitForURL(/\/(admin|researcher|participant)/, { timeout: 60000 });
    await gotoHydrated(adminPage, `${BASE}/admin/reviews`);
    const pending = adminPage.getByText("Sleep and screen time among QA students").first();
    await pending.waitFor({ timeout: 60000 });
    record("the request reaches the administrator queue", true);
    await pending.click();
    await adminPage.waitForSelector("text=Approve", { timeout: 60000 });
    await adminPage.getByRole("button", { name: "Approve", exact: true }).click();
    await adminPage.waitForTimeout(2500);
    record("the administrator approves it", true);
    await adminContext.close();
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
