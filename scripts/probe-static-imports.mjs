#!/usr/bin/env node
/**
 * The STATIC imports of the built function — the ones that must exist at
 * runtime or the request fails on the first line.
 *
 * Dynamic imports are listed separately: a missing dynamic dependency only
 * fails when that code path runs.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FUNCTION = join(ROOT, ".vercel", "output", "functions", "__server.func");

function bundleFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...bundleFiles(full));
    else if (entry.name.endsWith(".mjs")) files.push(full);
  }
  return files;
}

function packageOf(specifier) {
  if (specifier.startsWith("node:")) return null;
  if (specifier.startsWith(".") || specifier.startsWith("/")) return null;
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

const staticImports = new Map();
const dynamicImports = new Map();
const staticPattern = /\bfrom\s*["']([a-z@][^"'\n]*)["']/g;
const dynamicPattern = /\bimport\s*\(\s*["']([a-z@][^"'\n]*)["']/g;

for (const file of bundleFiles(FUNCTION)) {
  const text = readFileSync(file, "utf8");
  const where = file.slice(FUNCTION.length + 1);
  for (const match of text.matchAll(staticPattern)) {
    const name = packageOf(match[1]);
    if (!name) continue;
    if (!staticImports.has(name)) staticImports.set(name, new Set());
    staticImports.get(name).add(where);
  }
  for (const match of text.matchAll(dynamicPattern)) {
    const name = packageOf(match[1]);
    if (!name) continue;
    if (!dynamicImports.has(name)) dynamicImports.set(name, new Set());
    dynamicImports.get(name).add(where);
  }
}

console.log("STATIC imports (must exist at runtime):");
for (const [name, where] of [...staticImports].sort()) {
  console.log(`  ${name}  ←  ${[...where].slice(0, 2).join(", ")}`);
}
console.log("\nDYNAMIC imports (optional, loaded on demand):");
for (const [name, where] of [...dynamicImports].sort()) {
  console.log(`  ${name}  ←  ${[...where].slice(0, 1).join(", ")}`);
}
