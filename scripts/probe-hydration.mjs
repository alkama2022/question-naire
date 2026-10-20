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
const page = await browser.newPage();
await page.goto(`${BASE}/register`, { waitUntil: "domcontentloaded" });
for (const wait of [0, 500, 1500, 3000, 6000]) {
  await page.waitForTimeout(wait === 0 ? 0 : wait - (wait === 500 ? 0 : 0));
  const probe = await page.evaluate(() => ({
    preamble: Boolean(window.__vite_plugin_react_preamble_installed__),
    docKeys: Object.keys(document.documentElement).filter((k) => k.startsWith("__react")),
    bodyKeys: Object.keys(document.body).filter((k) => k.startsWith("__react")),
    anyReact: Object.keys(window).filter((k) => k.toLowerCase().includes("tsr") || k.toLowerCase().includes("router")),
  }));
  console.log(wait, JSON.stringify(probe));
}
await browser.close();
