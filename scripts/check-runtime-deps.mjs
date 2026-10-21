#!/usr/bin/env node
/**
 * List the runtime packages the built server function imports.
 *
 * The Vercel function bundle keeps node_modules packages as external imports.
 * Every one of them has to be present in the deployed function, or the
 * request fails with ERR_MODULE_NOT_FOUND — the kind of failure that only
 * shows up in production.
 *
 * Usage:
 *   node scripts/check-runtime-deps.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FUNCTION = join(ROOT, ".vercel", "output", "functions", "__server.func");

/** Every .mjs file in the function bundle. */
function bundleFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...bundleFiles(full));
    else if (entry.name.endsWith(".mjs")) files.push(full);
  }
  return files;
}

/** The package name a bare specifier refers to. */
function packageOf(specifier) {
  if (specifier.startsWith("node:")) return null;
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null;
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function main() {
  let files = [];
  try {
    files = bundleFiles(FUNCTION);
  } catch {
    console.error("[runtime-deps] no built function to check — run `npm run build` first.");
    process.exit(1);
  }

  const imported = new Map();
  // Static import (`from "x"`), dynamic import (`import("x")`) and
  // `require("x")`. The specifier may not span a line, and it must start
  // like a package name — otherwise minified code trips the pattern.
  const pattern =
    /\bfrom\s*["']([a-z@][^"'\n]*)["']|\bimport\s*\(\s*["']([a-z@][^"'\n]*)["']|\brequire\s*\(\s*["']([a-z@][^"'\n]*)["']/g;
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(pattern)) {
      const specifier = match[1] ?? match[2] ?? match[3];
      const name = packageOf(specifier);
      if (!name) continue;
      if (!imported.has(name)) imported.set(name, new Set());
      imported.get(name).add(file.slice(FUNCTION.length + 1));
    }
  }

  let traced = {};
  try {
    traced = JSON.parse(readFileSync(join(FUNCTION, "package.json"), "utf8")).dependencies ?? {};
  } catch {
    // No traced dependency manifest — nothing to compare against.
  }

  console.log(`[runtime-deps] ${imported.size} package(s) imported by the built function:`);
  const missing = [];
  for (const [name, files_] of [...imported].sort()) {
    const tracedVersion = traced[name];
    const ok = Boolean(tracedVersion);
    if (!ok) missing.push(name);
    console.log(`  ${ok ? "ok     " : "MISSING"} ${name}${tracedVersion ? ` (traced ${tracedVersion})` : ""}`);
  }
  if (missing.length) {
    console.error(
      `\n[runtime-deps] ${missing.join(", ")} must be bundled or installed with the function. ` +
        "Add them to `dependencies` in package.json, or inline them with nitro's `noExternals`.",
    );
    process.exit(1);
  }
  console.log("[runtime-deps] every imported package is accounted for.");
}

main();
