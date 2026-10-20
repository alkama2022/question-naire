#!/usr/bin/env node
/**
 * List the tarballs in package-lock.json that are NOT in the local npm cache.
 *
 * `npm ci --offline` fails with ENOTCACHED on the first missing tarball, which
 * is slow to diagnose on a 1000-package lockfile. This walks the lockfile and
 * asks the cache directly, so the missing set is known up front.
 *
 * Usage:
 *   node scripts/cache-audit.mjs            # list missing tarballs
 *   node scripts/cache-audit.mjs --add      # fetch the missing ones into the cache
 */
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const cacheDir =
  process.env.npm_config_cache ??
  join(process.env.LOCALAPPDATA ?? process.env.APPDATA ?? "", "npm-cache");
const indexDir = join(cacheDir, "_cacache", "index-v5");

/** Every cache key the index knows about (one file per entry, hashed path). */
function cacheKeys() {
  const keys = new Set();
  if (!existsSync(indexDir)) return keys;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else {
        for (const line of readFileSync(full, "utf8").split("\n")) {
          const tab = line.indexOf("\t");
          if (tab === -1) continue;
          try {
            const parsed = JSON.parse(line.slice(tab + 1));
            if (parsed?.key) keys.add(parsed.key);
          } catch {
            // A partially written index line — ignore it.
          }
        }
      }
    }
  };
  walk(indexDir);
  return keys;
}

/** make-fetch-happen's cache key for a tarball URL. */
function tarballKey(url) {
  return `make-fetch-happen:request-cache:${url}`;
}

function main() {
  const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
  const keys = cacheKeys();
  const missing = [];
  for (const [path, entry] of Object.entries(lock.packages ?? {})) {
    if (!path || !entry.resolved) continue;
    if (!entry.resolved.endsWith(".tgz")) continue;
    const key = tarballKey(entry.resolved);
    if (!keys.has(key)) missing.push({ path, url: entry.resolved, version: entry.version });
  }
  console.log(JSON.stringify({ cacheDir, cached: keys.size, missing: missing.length }, null, 2));
  for (const item of missing) console.log(`${item.version}\t${item.url}`);

  if (process.argv.includes("--add")) {
    console.log(`\nFetching ${missing.length} missing tarball(s)…`);
    let failed = 0;
    for (const item of missing) {
      try {
        execFileSync(process.execPath, [process.argv[1], "--fetch", item.url], { stdio: "inherit" });
      } catch {
        failed += 1;
      }
    }
    console.log(failed ? `\n${failed} tarball(s) still missing.` : "\nAll tarballs cached.");
  }
}

/** `npm cache add <tarball-url>` — the only supported way to seed a tarball. */
if (process.argv[2] === "--fetch") {
  const url = process.argv[3];
  execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["cache", "add", url], {
    stdio: "inherit",
  });
} else {
  main();
}
