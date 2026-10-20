export type Role = "researcher" | "participant" | "admin";

export type StudyStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "active"
  | "paused"
  | "completed"
  | "rejected";

export type QualityLabel = "pending" | "accepted" | "excluded" | "needs_review";

export type ApplicationStatus = "consented" | "declined" | "withdrawn";

/**
 * Where a record came from.
 *
 * `sample` — seeded example record. `browser` — created in this browser and
 * never sent to a server (the demo path). `server` — created through the app
 * and stored in the database, shared between devices.
 */
export type Origin = "sample" | "browser" | "server";

export type IssueStatus = "open" | "reviewing" | "closed";

export interface DemoAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  institution: string;
  programme: string;
  emailVerified: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
  suspended: boolean;
  createdAt: string;
  origin: Origin;
}

export interface Study {
  id: string;
  ownerId: string;
  title: string;
  purpose: string;
  description: string;
  category: string;
  institution: string;
  targetPopulation: string;
  ageMin: number | null;
  ageMax: number | null;
  location: string;
  inclusion: string;
  exclusion: string;
  extraQuestions: string;
  targetCount: number;
  deadline: string;
  method: string;
  completionMinutes: number;
  questionnaireUrl: string;
  incentive: string;
  informationStatement: string;
  privacyAck: boolean;
  approvalAck: boolean;
  status: StudyStatus;
  rejectionReason: string;
  changeRequest: string;
  pausedByAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  origin: Origin;
}

export interface StudyFormValues {
  title: string;
  purpose: string;
  description: string;
  category: string;
  institution: string;
  targetPopulation: string;
  ageMin: string;
  ageMax: string;
  location: string;
  inclusion: string;
  exclusion: string;
  extraQuestions: string;
  targetCount: string;
  deadline: string;
  method: string;
  completionMinutes: string;
  questionnaireUrl: string;
  incentive: string;
  informationStatement: string;
  privacyAck: boolean;
  approvalAck: boolean;
}

export interface Application {
  id: string;
  studyId: string;
  participantId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  origin: Origin;
}

export interface ResponseRecord {
  id: string;
  studyId: string;
  code: string;
  participantId?: string;
  applicationId?: string;
  createdAt: string;
  completedAt?: string;
  quality: QualityLabel;
  withdrawn: boolean;
  note: string;
  origin: Origin;
}

export interface Notice {
  id: string;
  userId: string;
  title: string;
  body: string;
  href: string;
  read: boolean;
  createdAt: string;
  origin: Origin;
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  action: string;
  detail: string;
  createdAt: string;
  origin: Origin;
}

export interface Issue {
  id: string;
  source: "report" | "contact";
  name: string;
  email: string;
  subject: string;
  body: string;
  status: IssueStatus;
  createdAt: string;
  origin: Origin;
  studyId?: string;
}

export interface Result<T = undefined> {
  ok: boolean;
  error?: string;
  message?: string;
  data?: T;
}

/**
 * The signed-in person's own record, as the server holds it.
 *
 * `userId` is the verified session user id — the browser never sends one.
 */
export interface SnapshotProfile {
  userId: string;
  email: string;
  name: string;
  role: Role;
  institution: string;
  programme: string;
  emailVerified: boolean;
  notifyEmail: boolean;
  notifyInApp: boolean;
  suspended: boolean;
}

/**
 * Everything the browser is allowed to see, as the server hands it over.
 *
 * The shape matches the demo store's slices, so the screens that read from
 * the store keep working whether the records live in this browser or in the
 * database.
 */
export interface SnapshotState {
  profile: SnapshotProfile | null;
  studies: Study[];
  applications: Application[];
  responses: ResponseRecord[];
  notices: Notice[];
  audits: AuditEvent[];
  issues: Issue[];
  users: DemoAccount[];
}

export const CATEGORIES = [
  "Health and behaviour",
  "Education",
  "Business and livelihoods",
  "Media and communication",
  "Agriculture",
  "Public policy",
  "Other",
] as const;

export const METHODS = [
  "Open listing on ResearchConnect",
  "Campus notice plus open listing",
  "Class or department group, screened here",
] as const;

export const STATUS_LABEL: Record<StudyStatus, string> = {
  draft: "Draft",
  pending_review: "Pending review",
  approved: "Approved",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  rejected: "Rejected",
};

export const QUALITY_LABEL: Record<QualityLabel, string> = {
  pending: "Pending",
  accepted: "Accepted",
  excluded: "Excluded",
  needs_review: "Needs review",
};

export const PREVIEW_ADMIN_ID = "usr-preview-admin";
export const DEMO_PASSWORD = "study-demo";

export type StudyActionId =
  | "view"
  | "edit"
  | "submit"
  | "progress"
  | "open"
  | "pause"
  | "resume"
  | "complete";
