import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main
      className={
        "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center " +
        "bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
      }
    >
      <span className="text-red-500" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400">
        {errorMessage(error)}
      </p>
    </main>
  );
}

/**
 * The page for a URL that does not exist.
 *
 * Without this the router falls back to a bare "Not Found" paragraph; with it,
 * a mistyped or stale link lands on a page that explains itself and offers a
 * way back.
 */
export function AppNotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-display text-3xl font-semibold">That page is not here</h1>
      <p className="max-w-md text-sm text-ink-soft">
        The link may be out of date, or the study may have been closed. Start again from the
        homepage.
      </p>
      <a
        href="/"
        className="mt-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
      >
        Go to the homepage
      </a>
    </main>
  );
}
