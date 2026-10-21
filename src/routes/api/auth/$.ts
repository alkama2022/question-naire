import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";
import { trustOwnOrigin } from "@/lib/auth/trust-origin.server";

/**
 * The app's own authentication API.
 *
 * Better Auth serves sign-up, sign-in, sign-out, session and password-reset
 * requests under `/api/auth/*`. Keeping them on this app's own origin means
 * the session cookie stays here too — the app never hands the visitor's
 * session to a third party.
 *
 * `$` matches every sub-path (`/api/auth/sign-in/email`, `/api/auth/get-session`, …),
 * so every endpoint Better Auth owns is routed to its handler.
 */

// The app's own origin has to be trusted, or a sign-in request from the app's
// own page is refused with "Invalid origin" on any host or port that was not
// known when the server started. See `trust-origin.server.ts`.
trustOwnOrigin();

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
