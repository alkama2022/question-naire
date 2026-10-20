import { useEffect, useRef } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { isServerMode } from "@/lib/research/mode.ts";
import { researchService } from "@/lib/research/service.ts";
import { useDemoStore } from "@/lib/research/store.ts";

/**
 * Keeps the workspace in step with the server.
 *
 * On start-up it asks the server which path is live:
 *   - **server mode** — the records come from the database and the store is
 *     filled with exactly what this visitor may see.
 *   - **browser mode** — the demo records are restored from this browser's
 *     own storage, and nothing is sent anywhere.
 *
 * It reloads when the signed-in person changes (sign-in, sign-out) and when
 * the tab regains focus, so a record changed on another device shows up.
 */
export function WorkspaceSync() {
  const { user, isPending } = useCurrentUserState();
  const sessionKey = user?.id ?? "signed-out";
  const booted = useRef(false);

  useEffect(() => {
    if (isPending) return;
    let cancelled = false;

    async function boot() {
      try {
        const snapshot = await researchService.initialize();
        if (cancelled) return;
        if (snapshot.mode === "browser") {
          // Demo mode: restore the records this browser created earlier.
          void useDemoStore.persist.rehydrate();
        }
      } catch {
        // The server could not be reached — keep whatever the browser holds.
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [sessionKey, isPending]);

  // A record changed elsewhere shows up when the visitor comes back to the tab.
  useEffect(() => {
    function onFocus() {
      if (isServerMode()) void researchService.refresh();
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return null;
}
