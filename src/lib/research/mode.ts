/**
 * Which data path the app is running on.
 *
 * `browser` — the original demo. Every record stays in this browser's
 *   `localStorage`; no server state is read or written.
 * `server` — the production path. Records live in the database, are shared
 *   between devices, and the server decides who may read or change what.
 *
 * The mode is decided by the SERVER (it knows whether sign-in is real and
 * whether a database is configured) and reported once at start-up, so the
 * browser and the server can never disagree about which path is live.
 *
 * Kept in its own module so both the store and the service can read it
 * without importing each other.
 */
export type DataMode = "browser" | "server";

let currentMode: DataMode = "browser";
let resolved = false;

const listeners = new Set<() => void>();

/** Switch the app between the demo path and the server path. */
export function setDataMode(mode: DataMode): void {
  if (currentMode === mode && resolved) return;
  currentMode = mode;
  resolved = true;
  for (const listener of listeners) listener();
}

/** The path the app is running on. */
export function getDataMode(): DataMode {
  return currentMode;
}

/** True when records are held by the server. */
export function isServerMode(): boolean {
  return currentMode === "server";
}

/** True once the server has answered which path is live. */
export function isDataModeResolved(): boolean {
  return resolved;
}

/** Subscribe to mode changes (used by the React hook below). */
export function subscribeToDataMode(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

