import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { findInstalledChromium } from "./browser-binary.mjs";

const BASE = "http://127.0.0.1:8080";
const bundled = chromium.executablePath();
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
  ...(existsSync(bundled) ? {} : { executablePath: findInstalledChromium() }),
});
const context = await browser.newContext();
const page = await context.newPage();
page.on("console", (m) => console.log(`[${m.type()}]`, m.text().slice(0, 300)));
page.on("pageerror", (e) => console.log("[pageerror]", e.message.slice(0, 300)));
page.on("response", (r) => {
  if (r.url().includes("_serverFn") || r.url().includes("/api/")) {
    console.log("[resp]", r.status(), r.url().slice(0, 120));
  }
});

await page.goto(`${BASE}/login`, { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => Boolean(window.__TSR_ROUTER__) && Object.keys(document.documentElement).some((k) => k.startsWith("__reactFiber$")), null, { timeout: 90000 }).catch(() => {});
await page.waitForTimeout(600);
await page.fill("#login-email", "qa.admin@example.com");
await page.fill("#login-password", "qa-admin-pass-2026");
await page.getByRole("button", { name: "Log in" }).click();
await page.waitForTimeout(5000);
console.log("after login URL:", page.url());
console.log("--- body after login ---");
console.log((await page.locator("body").innerText()).slice(0, 800));
await page.goto(`${BASE}/admin/reviews`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(8000);
console.log("--- reviews page text ---");
console.log((await page.locator("body").innerText()).slice(0, 1500));
const buttons = await page.locator("button").allInnerTexts();
console.log("--- buttons ---", JSON.stringify(buttons));
await browser.close();
