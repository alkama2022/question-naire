/**
 * Trust this app's own origin (server-only).
 *
 * Better Auth rejects a sign-in request whose `Origin` header is not on its
 * trusted list, and says so plainly: **"Invalid origin"**. The list is fixed
 * when the server starts, so an app served from a host or port that was not
 * known then — a preview on another port, a deployment behind a proxy that
 * rewrites the host — cannot sign in at all, even though the request comes
 * from the app's own page.
 *
 * The rule added here is the same-origin rule: **the origin the request was
 * addressed to is trusted**. It cannot be used to smuggle a cross-site
 * request in, because such a request carries its own origin in the `Origin`
 * header, which does not match the origin it was sent to. A sibling app on
 * another origin is still refused.
 */
import { auth } from "./server.ts";

/** The origin the request was addressed to, from its host headers. */
function ownOrigin(request?: Request): string | null {
  if (!request) return null;
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host");
  if (!host) {
    // No host header (HTTP/2 without one): fall back to the request URL.
    try {
      return new URL(request.url).origin;
    } catch {
      return null;
    }
  }
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  let proto = forwardedProto;
  if (!proto) {
    try {
      proto = new URL(request.url).protocol === "https:" ? "https" : "http";
    } catch {
      proto = "http";
    }
  }
  return `${proto}://${host}`;
}

/**
 * Add the app's own origin to Better Auth's trusted origins.
 *
 * Safe to call more than once, and a no-op when the trusted origins are
 * already dynamic.
 */
export function trustOwnOrigin(): void {
  const options = auth.options as { trustedOrigins?: unknown };
  if (!options || typeof options !== "object") return;
  const existing = options.trustedOrigins;
  if (typeof existing === "function") return;
  const list = Array.isArray(existing) ? existing : [];
  options.trustedOrigins = async (request?: Request) => {
    const own = ownOrigin(request);
    return own ? [...list, own] : list;
  };
}
