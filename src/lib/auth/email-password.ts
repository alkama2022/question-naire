/**
 * Local email/password sign-in (this app's Better Auth DB — not the broker).
 *
 * ON: researchers and participants sign up with their own address and
 * password, and the server hashes it and holds the session. The upstream
 * providers (Google, X) stay available as an alternative — the broker holds
 * those secrets, this app holds neither.
 *
 * To turn it off, set `emailAndPasswordEnabled` to `false` below. Do NOT edit
 * `server.ts` for this — that file is frozen pre-wired config.
 */
export const emailAndPasswordEnabled = true;
