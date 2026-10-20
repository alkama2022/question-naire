/**
 * The one place the screens talk to.
 *
 * Every screen calls `researchService`. The service decides — once, from the
 * server's own answer — whether the records live in this browser (the demo)
 * or in the database (production), and routes each call to the right place:
 *
 *   - **server mode**: the call goes to a server function. The server resolves
 *     the signed-in user from the session, checks what that person may do, and
 *     writes to the database. The browser never decides authorization, and
 *     never sends a user id it invented.
 *   - **browser mode**: the call goes to the browser store, exactly as the
 *     demo always did. Nothing is sent anywhere.
 *
 * The store stays the UI's cache in both modes: after a server call the
 * service writes the fresh snapshot into it, so every screen keeps reading
 * from one place and renders the same way in either mode.
 *
 * Never put a service-role key, a database URL, or any other secret here.
 */
import { getDataMode, setDataMode } from "./mode.ts";
import {
  addIssueRequest,
  changeStudyStatus,
  consentToStudyRequest,
  declineStudyRequest,
  loadAppSnapshot,
  markAllNoticesReadRequest,
  markNoticeReadRequest,
  markResponseCompleteRequest,
  reviewStudyRequest,
  saveStudyRequest,
  setIssueStatusRequest,
  setOwnRoleRequest,
  setResponseQualityRequest,
  submitStudyRequest,
  suspendUserRequest,
  updatePreferencesRequest,
  updateProfileRequest,
  withdrawFromStudyRequest,
} from "./server.ts";
import type { AppSnapshot, MutationResponse, SignInMethods } from "./server.ts";
import { useDemoStore } from "./store.ts";
import type {
  Application,
  AuditEvent,
  DemoAccount,
  Issue,
  IssueStatus,
  Notice,
  QualityLabel,
  ResponseRecord,
  Result,
  Study,
  StudyFormValues,
} from "./types.ts";

export type { AppSnapshot, SignInMethods };

/**
 * The sign-in methods this deployment offers.
 *
 * Empty until the server has answered — the sign-in screen waits for it
 * rather than offering a method that would fail.
 */
let liveMethods: SignInMethods = { emailPassword: false, providers: [] };

/** The sign-in methods the server reported. */
export function getSignInMethods(): SignInMethods {
  return liveMethods;
}

/** A signed-in user's own record. */
export interface Viewer {
  id: string;
  name: string;
  email: string;
  role: "researcher" | "participant" | "admin";
  institution: string;
  programme: string;
  emailVerified: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
  suspended: boolean;
}

/**
 * Write a server snapshot into the store the screens read from.
 *
 * The snapshot is already filtered by the server — it holds only what this
 * visitor may see.
 */
export function applySnapshot(snapshot: AppSnapshot | null): void {
  if (!snapshot || snapshot.mode !== "server" || !snapshot.state) return;
  const state = snapshot.state;
  useDemoStore.setState({
    users: state.users,
    studies: state.studies,
    applications: state.applications,
    responses: state.responses,
    notices: state.notices,
    audits: state.audits,
    issues: state.issues,
    sessionUserId: state.profile?.userId ?? null,
  });
}

/**
 * Call a server function and fold the answer into the result the screens
 * expect.
 *
 * A thrown `Unauthorized` means the session ended: the visitor is told to
 * sign in rather than shown a stack trace.
 */
async function call<T>(
  run: () => Promise<MutationResponse<T>>,
): Promise<Result<T>> {
  try {
    const response = await run();
    applySnapshot(response.snapshot);
    if (!response.ok) {
      return { ok: false, error: response.error ?? "That action could not be completed." };
    }
    return { ok: true, message: response.message, data: response.data };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message === "Unauthorized" || message.includes("Unauthorized")) {
      return { ok: false, error: "Sign in to continue." };
    }
    return { ok: false, error: message || "That action could not be completed." };
  }
}

/** The signed-in person, as the server describes them. */
export function currentViewer(): Viewer | null {
  const state = useDemoStore.getState();
  const user = state.users.find((item) => item.id === state.sessionUserId);
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    institution: user.institution,
    programme: user.programme,
    emailVerified: user.emailVerified,
    notifyEmail: user.notifyEmail,
    notifyInApp: user.notifyInApp,
    suspended: user.suspended,
  };
}

export interface ResearchService {
  /** The path the app is running on. */
  readonly mode: "browser" | "server";
  /** Ask the server which path is live, and load the records for it. */
  initialize(): Promise<AppSnapshot>;
  /** Reload the records for the current visitor. */
  refresh(): Promise<AppSnapshot>;

  upsertDraft(
    ownerId: string,
    values: StudyFormValues,
    studyId?: string | null,
  ): Promise<Result<{ id: string }>>;
  submitForReview(ownerId: string, studyId: string): Promise<Result>;
  reviewStudy(
    actorId: string,
    studyId: string,
    action: "approve" | "reject" | "changes",
    note: string,
  ): Promise<Result>;
  openRecruitment(ownerId: string, studyId: string): Promise<Result>;
  setPaused(actorId: string, studyId: string, paused: boolean): Promise<Result>;
  completeStudy(ownerId: string, studyId: string): Promise<Result>;
  consentToStudy(participantId: string, studyId: string): Promise<Result>;
  declineStudy(participantId: string, studyId: string): Promise<Result>;
  withdrawFromStudy(participantId: string, studyId: string): Promise<Result>;
  setQuality(
    actorId: string,
    responseId: string,
    quality: QualityLabel,
    note: string,
  ): Promise<Result>;
  markCompleted(actorId: string, responseId: string): Promise<Result>;
  updateProfile(
    userId: string,
    patch: { name: string; institution: string; programme: string },
  ): Promise<Result>;
  updatePrefs(
    userId: string,
    prefs: { notifyEmail: boolean; notifyInApp: boolean },
  ): Promise<Result>;
  suspendUser(actorId: string, userId: string, suspended: boolean): Promise<Result>;
  addIssue(input: {
    source: "report" | "contact";
    name: string;
    email: string;
    subject: string;
    body: string;
    studyId?: string;
  }): Promise<Result>;
  setIssueStatus(actorId: string, issueId: string, status: IssueStatus): Promise<Result>;
  markNoticeRead(userId: string, noticeId: string): Promise<Result>;
  markAllRead(userId: string): Promise<Result>;
  setOwnRole(role: "researcher" | "participant"): Promise<Result>;
}

const browserService: ResearchService = {
  mode: "browser",

  async initialize() {
    return { mode: "browser", signedIn: false, state: null, methods: liveMethods };
  },

  async refresh() {
    return { mode: "browser", signedIn: false, state: null, methods: liveMethods };
  },

  async upsertDraft(ownerId, values, studyId) {
    return useDemoStore.getState().upsertDraft(ownerId, values, studyId);
  },
  async submitForReview(ownerId, studyId) {
    return useDemoStore.getState().submitForReview(ownerId, studyId);
  },
  async reviewStudy(actorId, studyId, action, note) {
    return useDemoStore.getState().reviewStudy(actorId, studyId, action, note);
  },
  async openRecruitment(ownerId, studyId) {
    const result = useDemoStore.getState().openRecruitment(ownerId, studyId);
    return result.ok ? { ok: true, message: result.message } : { ok: false, error: result.error };
  },
  async setPaused(actorId, studyId, paused) {
    return useDemoStore.getState().setPaused(actorId, studyId, paused);
  },
  async completeStudy(ownerId, studyId) {
    return useDemoStore.getState().completeStudy(ownerId, studyId);
  },
  async consentToStudy(participantId, studyId) {
    return useDemoStore.getState().consentToStudy(participantId, studyId);
  },
  async declineStudy(participantId, studyId) {
    return useDemoStore.getState().declineStudy(participantId, studyId);
  },
  async withdrawFromStudy(participantId, studyId) {
    return useDemoStore.getState().withdrawFromStudy(participantId, studyId);
  },
  async setQuality(actorId, responseId, quality, note) {
    return useDemoStore.getState().setQuality(actorId, responseId, quality, note);
  },
  async markCompleted(actorId, responseId) {
    return useDemoStore.getState().markCompleted(actorId, responseId);
  },
  async updateProfile(userId, patch) {
    return useDemoStore.getState().updateProfile(userId, patch);
  },
  async updatePrefs(userId, prefs) {
    return useDemoStore.getState().updatePrefs(userId, prefs);
  },
  async suspendUser(actorId, userId, suspended) {
    return useDemoStore.getState().suspendUser(actorId, userId, suspended);
  },
  async addIssue(input) {
    return useDemoStore.getState().addIssue(input);
  },
  async setIssueStatus(actorId, issueId, status) {
    return useDemoStore.getState().setIssueStatus(actorId, issueId, status);
  },
  async markNoticeRead(userId, noticeId) {
    useDemoStore.getState().markNoticeRead(userId, noticeId);
    return { ok: true };
  },
  async markAllRead(userId) {
    useDemoStore.getState().markAllRead(userId);
    return { ok: true };
  },
  async setOwnRole() {
    return { ok: false, error: "Roles are fixed in demo mode." };
  },
};

const serverService: ResearchService = {
  mode: "server",

  async initialize() {
    const snapshot = await loadAppSnapshot({ data: {} });
    setDataMode("server");
    applySnapshot(snapshot);
    return snapshot;
  },

  async refresh() {
    const snapshot = await loadAppSnapshot({ data: {} });
    applySnapshot(snapshot);
    return snapshot;
  },

  upsertDraft(_ownerId, values, studyId) {
    return call(() =>
      saveStudyRequest({ data: { ...values, studyId: studyId ?? undefined } }),
    );
  },
  submitForReview(_ownerId, studyId) {
    return call(() => submitStudyRequest({ data: { studyId } }));
  },
  reviewStudy(_actorId, studyId, action, note) {
    return call(() => reviewStudyRequest({ data: { studyId, action, note } }));
  },
  openRecruitment(_ownerId, studyId) {
    return call(() => changeStudyStatus({ data: { studyId, action: "open" } }));
  },
  setPaused(_actorId, studyId, paused) {
    return call(() =>
      changeStudyStatus({ data: { studyId, action: paused ? "pause" : "resume" } }),
    );
  },
  completeStudy(_ownerId, studyId) {
    return call(() => changeStudyStatus({ data: { studyId, action: "complete" } }));
  },
  consentToStudy(_participantId, studyId) {
    return call(() => consentToStudyRequest({ data: { studyId } }));
  },
  declineStudy(_participantId, studyId) {
    return call(() => declineStudyRequest({ data: { studyId } }));
  },
  withdrawFromStudy(_participantId, studyId) {
    return call(() => withdrawFromStudyRequest({ data: { studyId } }));
  },
  setQuality(_actorId, responseId, quality, note) {
    return call(() => setResponseQualityRequest({ data: { responseId, quality, note } }));
  },
  markCompleted(_actorId, responseId) {
    return call(() => markResponseCompleteRequest({ data: { responseId } }));
  },
  updateProfile(_userId, patch) {
    return call(() => updateProfileRequest({ data: patch }));
  },
  updatePrefs(_userId, prefs) {
    return call(() => updatePreferencesRequest({ data: prefs }));
  },
  suspendUser(_actorId, userId, suspended) {
    return call(() => suspendUserRequest({ data: { userId, suspended } }));
  },
  addIssue(input) {
    return call(() => addIssueRequest({ data: input }));
  },
  setIssueStatus(_actorId, issueId, status) {
    return call(() => setIssueStatusRequest({ data: { issueId, status } }));
  },
  markNoticeRead(_userId, noticeId) {
    return call(() => markNoticeReadRequest({ data: { noticeId } }));
  },
  markAllRead() {
    return call(() => markAllNoticesReadRequest({ data: {} }));
  },
  setOwnRole(role) {
    return call(() => setOwnRoleRequest({ data: { role } }));
  },
};

/**
 * The service the screens use.
 *
 * It starts on the browser path and switches to the server path the first
 * time `initialize()` hears back from the server.
 */
export const researchService: ResearchService = {
  get mode() {
    return getDataMode();
  },
  initialize: async () => {
    const snapshot = await loadAppSnapshot({ data: {} });
    liveMethods = snapshot.methods ?? liveMethods;
    if (snapshot.mode === "server") {
      setDataMode("server");
      applySnapshot(snapshot);
      return snapshot;
    }
    setDataMode("browser");
    return snapshot;
  },
  refresh: async () => {
    if (getDataMode() !== "server") {
      return { mode: "browser", signedIn: false, state: null, methods: liveMethods };
    }
    const snapshot = await loadAppSnapshot({ data: {} });
    applySnapshot(snapshot);
    return snapshot;
  },
  upsertDraft: (ownerId, values, studyId) =>
    getDataMode() === "server"
      ? serverService.upsertDraft(ownerId, values, studyId)
      : browserService.upsertDraft(ownerId, values, studyId),
  submitForReview: (ownerId, studyId) =>
    getDataMode() === "server"
      ? serverService.submitForReview(ownerId, studyId)
      : browserService.submitForReview(ownerId, studyId),
  reviewStudy: (actorId, studyId, action, note) =>
    getDataMode() === "server"
      ? serverService.reviewStudy(actorId, studyId, action, note)
      : browserService.reviewStudy(actorId, studyId, action, note),
  openRecruitment: (ownerId, studyId) =>
    getDataMode() === "server"
      ? serverService.openRecruitment(ownerId, studyId)
      : browserService.openRecruitment(ownerId, studyId),
  setPaused: (actorId, studyId, paused) =>
    getDataMode() === "server"
      ? serverService.setPaused(actorId, studyId, paused)
      : browserService.setPaused(actorId, studyId, paused),
  completeStudy: (ownerId, studyId) =>
    getDataMode() === "server"
      ? serverService.completeStudy(ownerId, studyId)
      : browserService.completeStudy(ownerId, studyId),
  consentToStudy: (participantId, studyId) =>
    getDataMode() === "server"
      ? serverService.consentToStudy(participantId, studyId)
      : browserService.consentToStudy(participantId, studyId),
  declineStudy: (participantId, studyId) =>
    getDataMode() === "server"
      ? serverService.declineStudy(participantId, studyId)
      : browserService.declineStudy(participantId, studyId),
  withdrawFromStudy: (participantId, studyId) =>
    getDataMode() === "server"
      ? serverService.withdrawFromStudy(participantId, studyId)
      : browserService.withdrawFromStudy(participantId, studyId),
  setQuality: (actorId, responseId, quality, note) =>
    getDataMode() === "server"
      ? serverService.setQuality(actorId, responseId, quality, note)
      : browserService.setQuality(actorId, responseId, quality, note),
  markCompleted: (actorId, responseId) =>
    getDataMode() === "server"
      ? serverService.markCompleted(actorId, responseId)
      : browserService.markCompleted(actorId, responseId),
  updateProfile: (userId, patch) =>
    getDataMode() === "server"
      ? serverService.updateProfile(userId, patch)
      : browserService.updateProfile(userId, patch),
  updatePrefs: (userId, prefs) =>
    getDataMode() === "server"
      ? serverService.updatePrefs(userId, prefs)
      : browserService.updatePrefs(userId, prefs),
  suspendUser: (actorId, userId, suspended) =>
    getDataMode() === "server"
      ? serverService.suspendUser(actorId, userId, suspended)
      : browserService.suspendUser(actorId, userId, suspended),
  addIssue: (input) =>
    getDataMode() === "server" ? serverService.addIssue(input) : browserService.addIssue(input),
  setIssueStatus: (actorId, issueId, status) =>
    getDataMode() === "server"
      ? serverService.setIssueStatus(actorId, issueId, status)
      : browserService.setIssueStatus(actorId, issueId, status),
  markNoticeRead: (userId, noticeId) =>
    getDataMode() === "server"
      ? serverService.markNoticeRead(userId, noticeId)
      : browserService.markNoticeRead(userId, noticeId),
  markAllRead: (userId) =>
    getDataMode() === "server"
      ? serverService.markAllRead(userId)
      : browserService.markAllRead(userId),
  setOwnRole: (role) =>
    getDataMode() === "server"
      ? serverService.setOwnRole(role)
      : browserService.setOwnRole(role),
};

/** Type re-exports so screens can import from one module. */
export type {
  Application,
  AuditEvent,
  DemoAccount,
  Issue,
  Notice,
  ResponseRecord,
  Study,
  StudyFormValues,
};
