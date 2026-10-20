/**
 * Find a Chromium this machine can actually launch.
 *
 * Playwright ships with the browser build that matches its own version. When
 * the package is upgraded (or the download failed on a flaky network) the
 * bundled build can be missing while another Chromium is already installed —
 * `~/.cache/ms-playwright` on Linux, `%LOCALAPPDATA%\ms-playwright` on
 * Windows. Using it keeps the QA scripts working instead of failing with
 * "Executable doesn't exist".
 *
 * Returns `undefined` when nothing usable is found, so the caller falls back
 * to Playwright's own resolution.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/** Where Playwright keeps its browser builds on this platform. */
function browserRoots() {
  if (process.platform === "win32") {
    const local = process.env.LOCALAPPDATA;
    return local ? [join(local, "ms-playwright")] : [];
  }
  return [join(homedir(), ".cache", "ms-playwright"), "/ms-playwright"];
}

/** The executable inside a Chromium build directory. */
function executableIn(buildDir) {
  const candidates =
    process.platform === "win32"
      ? [
          join(buildDir, "chrome-win", "chrome.exe"),
          join(buildDir, "chrome-win64", "chrome.exe"),
          join(buildDir, "chrome-headless-shell-win64", "chrome-headless-shell.exe"),
        ]
      : [
          join(buildDir, "chrome-linux", "chrome"),
          join(buildDir, "chrome-linux64", "chrome"),
          join(buildDir, "chrome-headless-shell-linux64", "chrome-headless-shell"),
        ];
  return candidates.find((candidate) => existsSync(candidate));
}

/**
 * The newest installed Chromium, or `undefined`.
 *
 * "Newest" is the highest build number in the directory name, which is how
 * Playwright names them (`chromium-1243`, `chromium-1248`, …).
 */
export function findInstalledChromium() {
  const found = [];
  for (const root of browserRoots()) {
    if (!existsSync(root)) continue;
    let entries = [];
    try {
      entries = readdirSync(root);
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.startsWith("chromium")) continue;
      const buildDir = join(root, entry);
      try {
        if (!statSync(buildDir).isDirectory()) continue;
      } catch {
        continue;
      }
      const executable = executableIn(buildDir);
      if (!executable) continue;
      const build = Number(entry.replace(/\D+/g, "")) || 0;
      found.push({ build, executable });
    }
  }
  found.sort((a, b) => b.build - a.build);
  return found[0]?.executable;
}
