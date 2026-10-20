#!/usr/bin/env node
/**
 * Copy PGLite's WASM assets next to the bundled driver.
 *
 * The embedded database ships three binary files (`pglite.wasm`, `pglite.data`
 * and `initdb.wasm`) that the driver loads from its own directory. The
 * bundler inlines the JavaScript but leaves the binaries behind, so a built
 * output that falls back to the embedded database cannot start.
 *
 * This makes the built output runnable on a machine with a writable
 * filesystem — which is what a local preview is. It is skipped on Vercel:
 * the deployed runtime has a read-only filesystem, so the embedded database
 * could not persist anything there, and `DATABASE_URL` is the answer.
 */
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "node_modules", "@electric-sql", "pglite", "dist");
const TARGET = join(ROOT, ".vercel", "output", "functions", "__server.func", "_libs");
const ASSETS = ["pglite.wasm", "pglite.data", "initdb.wasm"];

if (process.env.VERCEL) {
  console.log("[pglite-assets] Vercel deployment — the embedded database is not used there.");
  process.exit(0);
}

if (!existsSync(TARGET)) {
  console.log("[pglite-assets] no built output to update.");
  process.exit(0);
}

mkdirSync(TARGET, { recursive: true });
let copied = 0;
for (const asset of ASSETS) {
  const from = join(SOURCE, asset);
  if (!existsSync(from)) continue;
  const to = join(TARGET, asset);
  if (existsSync(to) && statSync(to).size === statSync(from).size) continue;
  copyFileSync(from, to);
  copied += 1;
}
console.log(
  copied
    ? `[pglite-assets] copied ${copied} asset(s) into the built output.`
    : "[pglite-assets] the built output already has its assets.",
);
