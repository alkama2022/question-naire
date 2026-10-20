/**
 * The server API for the ResearchConnect workspace.
 *
 * These are TanStack Start server functions — the browser calls them over the
 * network and the handler runs on the server. Every handler resolves the
 * acting user from the SESSION (never from the request body), then applies the
 * authorization rules in `db.server.ts`.
 *
 * Two modes exist:
 *   - `server` — real accounts, real database. Sign-in is real, records are
 *     shared between devices, and the server decides who may read or change
 *     what. This is the production path.
 *   - `browser` — the original demo: everything stays in this browser's
 *     `localStorage` and no server state is touched. Used when sign-in is
 *     switched off (`VITE_AUTH_ENABLED=false`), where every visitor would
 *     otherwise share one server-side identity.
 *
 * The mode is decided by the SERVER and reported to the browser, so the two
 * can never disagree about which path is live.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import type { ServerState } from "./db.server.ts";

/** What the browser hydrates its store from. */
export interface AppSnapshot {
  mode: "browser" | "server";
  signedIn: boolean;
  state: ServerState | null;
  /**
   * The sign-in methods the server actually has live.
   *
   * The browser never guesses: email/password and the upstream providers are
   * only offered when the server is configured for them.
   */
  methods: SignInMethods;
}

/** The sign-in methods this deployment offers. */
export interface SignInMethods {
  emailPassword: boolean;
  /** Upstream provider ids (`grok-google`, `grok-x`) the broker can broker. */
  providers: string[];
}

const NO_METHODS: SignInMethods = { emailPassword: false, providers: [] };

/** The sign-in methods the server has configured. */
async function liveMethods(): Promise<SignInMethods> {
  const [{ authConfigured }, { emailAndPasswordEnabled }, { GROK_PROVIDERS }] = await Promise.all([
    import("@/lib/auth/server.ts"),
    import("@/lib/auth/email-password.ts"),
    import("@/lib/auth/providers.ts"),
  ]);
  return {
    emailPassword: emailAndPasswordEnabled,
    providers: authConfigured ? GROK_PROVIDERS.map((provider) => provider.providerId) : [],
  };
}

/** The result of a mutation, plus the refreshed snapshot. */
export interface MutationResponse<T = undefined> {
  ok: boolean;
  error?: string;
  message?: string;
  data?: T;
  snapshot: AppSnapshot | null;
}

const studyValuesSchema = z.object({
  title: z.string(),
  purpose: z.string(),
  description: z.string(),
  category: z.string(),
  institution: z.string(),
  targetPopulation: z.string(),
  ageMin: z.string(),
  ageMax: z.string(),
  location: z.string(),
  inclusion: z.string(),
  exclusion: z.string(),
  extraQuestions: z.string(),
  targetCount: z.string(),
  deadline: z.string(),
  method: z.string(),
  completionMinutes: z.string(),
  questionnaireUrl: z.string(),
  incentive: z.string(),
  informationStatement: z.string(),
  privacyAck: z.boolean(),
  approvalAck: z.boolean(),
});

/* -------------------------------------------------------------------------- */
/* Session helpers                                                            */
/* -------------------------------------------------------------------------- */

/** True when the app runs with real sign-in (the production path). */
function serverModeEnabled(): boolean {
  return process.env.VITE_AUTH_ENABLED !== "false";
}

/**
 * The signed-in user for this request.
 *
 * Reads the session cookie, or the bearer token the live preview forwards.
 * Returns `null` for a visitor who is not signed in.
 */
async function currentSession(): Promise<{ id: string; email: string; name: string } | null> {
  const [{ getRequest }, { getSessionUser }] = await Promise.all([
    import("@tanstack/react-start/server"),
    import("@/lib/auth/verify.server.ts"),
  ]);
  const request = getRequest();
  const header = request?.headers.get("authorization") ?? undefined;
  const bearer = header?.toLowerCase().startsWith("bearer ")
    ? header.slice("bearer ".length).trim()
    : undefined;
  const user = await getSessionUser(bearer);
  if (!user) return null;
  return { id: user.id, email: user.email ?? "", name: user.name ?? "" };
}

/**
 * The acting user plus a fresh snapshot of everything they may see.
 *
 * `null` when nobody is signed in — the snapshot then holds only the public
 * catalogue.
 */
async function snapshotFor(session: { id: string; email: string; name: string } | null) {
  const { buildState, ensureProfile } = await import("./db.server.ts");
  const methods = await liveMethods();
  if (!session) {
    const state = await buildState(null);
    return { mode: "server" as const, signedIn: false, state, methods };
  }
  const profile = await ensureProfile(session.id, session.email, session.name);
  const state = await buildState(profile);
  return { mode: "server" as const, signedIn: true, state, methods };
}

/**
 * Run a mutation as the signed-in user, then return the result together with
 * the refreshed snapshot so the browser never has to guess what changed.
 */
async function runAsUser<T>(
  fn: (db: typeof import("./db.server.ts"), actor: import("./db.server.ts").Actor) => Promise<{
    ok: boolean;
    error?: string;
    message?: string;
    data?: T;
  }>,
): Promise<MutationResponse<T>> {
  const session = await currentSession();
  if (!session) {
    return { ok: false, error: "Sign in to continue.", snapshot: null };
  }
  const db = await import("./db.server.ts");
  const actor = await db.ensureProfile(session.id, session.email, session.name);
  if (actor.suspended) {
    return { ok: false, error: "This account is suspended.", snapshot: null };
  }
  const result = await fn(db, actor);
  const snapshot = await snapshotFor(session);
  return { ...result, snapshot };
}

/* -------------------------------------------------------------------------- */
/* Reads                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The snapshot the browser hydrates from.
 *
 * Public: a signed-out visitor still gets the open studies, which is what the
 * browse pages show.
 */
export const loadAppSnapshot = createServerFn({ method: "POST" }).handler(
  async (): Promise<AppSnapshot> => {
    if (!serverModeEnabled()) {
      return { mode: "browser", signedIn: false, state: null, methods: NO_METHODS };
    }
    const session = await currentSession();
    return snapshotFor(session);
  },
);

/* -------------------------------------------------------------------------- */
/* Mutations                                                                  */
/* -------------------------------------------------------------------------- */

export const saveStudyRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(studyValuesSchema)
  .handler(async ({ data }): Promise<MutationResponse<{ id: string }>> =>
    runAsUser(async (db, actor) => {
      const studyId = (data as { studyId?: string }).studyId ?? null;
      return db.saveStudy(actor, data, studyId);
    }),
  );

export const submitStudyRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ studyId: z.string().min(1) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.submitStudy(actor, data.studyId)),
  );

export const reviewStudyRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(
    z.object({
      studyId: z.string().min(1),
      action: z.enum(["approve", "reject", "changes"]),
      note: z.string(),
    }),
  )
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.reviewStudy(actor, data.studyId, data.action, data.note)),
  );

export const changeStudyStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(
    z.object({
      studyId: z.string().min(1),
      action: z.enum(["open", "pause", "resume", "complete"]),
    }),
  )
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.setStudyStatus(actor, data.studyId, data.action)),
  );

export const consentToStudyRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ studyId: z.string().min(1) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.consentToStudy(actor, data.studyId)),
  );

export const declineStudyRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ studyId: z.string().min(1) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.declineStudy(actor, data.studyId)),
  );

export const withdrawFromStudyRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ studyId: z.string().min(1) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.withdrawFromStudy(actor, data.studyId)),
  );

export const setResponseQualityRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(
    z.object({
      responseId: z.string().min(1),
      quality: z.enum(["pending", "accepted", "excluded", "needs_review"]),
      note: z.string(),
    }),
  )
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) =>
      db.setResponseQuality(actor, data.responseId, data.quality, data.note),
    ),
  );

export const markResponseCompleteRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ responseId: z.string().min(1) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.markResponseComplete(actor, data.responseId)),
  );

export const updateProfileRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(
    z.object({
      name: z.string().trim().min(2, "Enter your name"),
      institution: z.string().trim().max(160),
      programme: z.string().trim().max(160),
    }),
  )
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.updateProfile(actor, data)),
  );

export const updatePreferencesRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ notifyEmail: z.boolean(), notifyInApp: z.boolean() }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.updatePreferences(actor, data)),
  );

export const setOwnRoleRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ role: z.enum(["researcher", "participant"]) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.setOwnRole(actor, data.role)),
  );

export const suspendUserRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ userId: z.string().min(1), suspended: z.boolean() }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.suspendUser(actor, data.userId, data.suspended)),
  );

export const addIssueRequest = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      source: z.enum(["report", "contact"]),
      name: z.string().trim().min(2, "Enter your name"),
      email: z.string().trim().min(3, "Enter an email address"),
      subject: z.string().trim().min(4, "Add a subject"),
      body: z.string().trim().min(20, "Write at least a short message"),
      studyId: z.string().optional(),
    }),
  )
  .handler(async ({ data }): Promise<MutationResponse> => {
    const db = await import("./db.server.ts");
    const result = await db.addIssue(data);
    const session = await currentSession();
    return { ...result, snapshot: await snapshotFor(session) };
  });

export const setIssueStatusRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ issueId: z.string().min(1), status: z.enum(["open", "reviewing", "closed"]) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.setIssueStatus(actor, data.issueId, data.status)),
  );

export const markNoticeReadRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(z.object({ noticeId: z.string().min(1) }))
  .handler(async ({ data }): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.markNoticeRead(actor, data.noticeId)),
  );

export const markAllNoticesReadRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async (): Promise<MutationResponse> =>
    runAsUser(async (db, actor) => db.markAllNoticesRead(actor)),
  );
