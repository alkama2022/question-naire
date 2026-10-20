import { useSyncExternalStore } from "react";
import {
  getDataMode,
  isDataModeResolved,
  subscribeToDataMode,
  type DataMode,
} from "./mode.ts";

/**
 * Which data path the app is running on.
 *
 * `browser` — the demo: records stay in this browser. `server` — the
 * production path: records live in the database and are shared between
 * devices.
 */
export function useDataMode(): DataMode {
  return useSyncExternalStore(subscribeToDataMode, getDataMode, getDataMode);
}

/**
 * True once the server has said which path is live.
 *
 * Sign-in screens wait for this before offering a method, so nobody is shown
 * a button that cannot work.
 */
export function useDataModeResolved(): boolean {
  return useSyncExternalStore(
    subscribeToDataMode,
    isDataModeResolved,
    () => true,
  );
}
