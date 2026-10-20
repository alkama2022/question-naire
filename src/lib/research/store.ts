import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { cloneSeed } from "./sample-data";
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
  StudyStatus,
} from "./types";
import { PREVIEW_ADMIN_ID } from "./types";
import { validateFullStudy } from "./validators";

interface DataSlice {
  users: DemoAccount[];
  studies: Study[];
  applications: Application[];
  responses: ResponseRecord[];
  notices: Notice[];
  audits: AuditEvent[];
  issues: Issue[];
  sessionUserId: string | null;
  wizard: StudyFormValues | null;
  editingStudyId: string | null;
}

interface DemoStore extends DataSlice {
  register: (input: {
    name: string;
    email: string;
    password: string;
    role: "researcher" | "participant";
    institution: string;
    programme: string;
  }) => Result<{ userId: string }>;
  login: (email: string, password: string) => Result<{ userId: string }>;
  openAdminPreview: () => void;
  logout: () => void;
  setLocalPassword: (email: string, password: string) => Result;
  markVerifiedInDemo: (userId: string) => Result;
  updateProfile: (
    userId: string,
    patch: { name: string; institution: string; programme: string },
  ) => Result;
  updatePrefs: (userId: string, prefs: { notifyEmail: boolean; notifyInApp: boolean }) => Result;
  suspendUser: (actorId: string, userId: string, suspended: boolean) => Result;
  saveWizard: (values: StudyFormValues | null, editingStudyId?: string | null) => void;
  upsertDraft: (ownerId: string, values: StudyFormValues, studyId?: string) => Result<{ id: string }>;
  submitForReview: (ownerId: string, studyId: string) => Result;
  openRecruitment: (ownerId: string, studyId: string) => Result;
  setPaused: (actorId: string, studyId: string, paused: boolean) => Result;
  completeStudy: (ownerId: string, studyId: string) => Result;
  reviewStudy: (
    actorId: string,
    studyId: string,
    action: "approve" | "reject" | "changes",
    note: string,
  ) => Result;
  consentToStudy: (participantId: string, studyId: string) => Result;
  declineStudy: (participantId: string, studyId: string) => Result;
  withdrawFromStudy: (participantId: string, studyId: string) => Result;
  setQuality: (actorId: string, responseId: string, quality: QualityLabel, note: string) => Result;
  markCompleted: (actorId: string, responseId: string) => Result;
  addIssue: (input: {
    source: "report" | "contact";
    name: string;
    email: string;
    subject: string;
    body: string;
    studyId?: string;
  }) => Result;
  setIssueStatus: (actorId: string, issueId: string, status: IssueStatus) => Result;
  markNoticeRead: (userId: string, noticeId: string) => void;
  markAllRead: (userId: string) => void;
  resetDemo: () => void;
}

function nowIso() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function studyFromForm(
  values: StudyFormValues,
  base: Pick<Study, "id" | "ownerId" | "createdAt" | "origin">,
  status: StudyStatus,
): Study {
  const ageMin = values.ageMin.trim() ? Number(values.ageMin) : null;
  const ageMax = values.ageMax.trim() ? Number(values.ageMax) : null;
  return {
    ...base,
    title: values.title.trim(),
    purpose: values.purpose.trim(),
    description: values.description.trim(),
    category: values.category,
    institution: values.institution.trim(),
    targetPopulation: values.targetPopulation.trim(),
    ageMin: Number.isInteger(ageMin) ? ageMin : null,
    ageMax: Number.isInteger(ageMax) ? ageMax : null,
    location: values.location.trim(),
    inclusion: values.inclusion.trim(),
    exclusion: values.exclusion.trim(),
    extraQuestions: values.extraQuestions.trim(),
    targetCount: Number(values.targetCount) || 0,
    deadline: values.deadline,
    method: values.method,
    completionMinutes: Number(values.completionMinutes) || 0,
    questionnaireUrl: values.questionnaireUrl.trim(),
    incentive: values.incentive.trim(),
    informationStatement: values.informationStatement.trim(),
    privacyAck: values.privacyAck,
    approvalAck: values.approvalAck,
    status,
    rejectionReason: "",
    changeRequest: "",
    pausedByAdmin: false,
    updatedAt: nowIso(),
  };
}

const seed = cloneSeed();

const initialData: DataSlice = {
  ...seed,
  sessionUserId: null,
  wizard: null,
  editingStudyId: null,
};

export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      ...initialData,

      register: (input) => {
        const email = input.email.trim().toLowerCase();
        if (get().users.some((user) => user.email.toLowerCase() === email)) {
          return { ok: false, error: "That email already has a demo account in this browser." };
        }
        const user: DemoAccount = {
          id: id("usr"),
          name: input.name.trim(),
          email,
          password: input.password,
          role: input.role,
          institution: input.institution.trim(),
          programme: input.programme.trim(),
          emailVerified: false,
          notifyEmail: true,
          notifyInApp: true,
          suspended: false,
          createdAt: nowIso(),
          origin: "browser",
        };
        set({
          users: [...get().users, user],
          sessionUserId: user.id,
        });
        audit(user, "Started demo session", `${user.role} registration in this browser`);
        return {
          ok: true,
          data: { userId: user.id },
          message: "Demo session started in this browser. No verification email was sent.",
        };
      },

      login: (email, password) => {
        const user = get().users.find(
          (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
        );
        if (!user || user.password !== password || !user.password) {
          return { ok: false, error: "No demo account in this browser matches that email and password." };
        }
        if (user.suspended) {
          return { ok: false, error: "This demo account is suspended in this browser." };
        }
        if (user.role === "admin") {
          return { ok: false, error: "Admin preview is a separate button. It is not a password login." };
        }
        set({ sessionUserId: user.id });
        return { ok: true, data: { userId: user.id }, message: "Demo session opened in this browser." };
      },

      openAdminPreview: () => {
        const existing = get().users.find((user) => user.id === PREVIEW_ADMIN_ID);
        if (!existing) {
          const admin: DemoAccount = {
            id: PREVIEW_ADMIN_ID,
            name: "Preview operator",
            email: "admin-preview@local.demo",
            password: "",
            role: "admin",
            institution: "ResearchConnect demo",
            programme: "Local preview only",
            emailVerified: true,
            notifyEmail: false,
            notifyInApp: true,
            suspended: false,
            createdAt: nowIso(),
            origin: "browser",
          };
          set({ users: [...get().users, admin], sessionUserId: admin.id });
        } else {
          set({ sessionUserId: existing.id });
        }
      },

      logout: () => set({ sessionUserId: null }),

      setLocalPassword: (email, password) => {
        const match = get().users.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
        );
        if (!match) {
          return { ok: false, error: "No demo account in this browser uses that email." };
        }
        if (match.role === "admin") {
          return { ok: false, error: "The admin preview does not use a password." };
        }
        set({
          users: get().users.map((user) => (user.id === match.id ? { ...user, password } : user)),
        });
        return {
          ok: true,
          message: "Password updated in this browser only. No reset email was sent.",
        };
      },

      markVerifiedInDemo: (userId) => {
        const user = get().users.find((item) => item.id === userId);
        if (!user) return { ok: false, error: "That demo session is missing." };
        set({
          users: get().users.map((item) =>
            item.id === userId ? { ...item, emailVerified: true } : item,
          ),
        });
        return {
          ok: true,
          message: "Marked verified inside this browser. No email was checked.",
        };
      },

      updateProfile: (userId, patch) => {
        if (get().sessionUserId !== userId) {
          return { ok: false, error: "You can only edit the demo profile that is signed in." };
        }
        set({
          users: get().users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  name: patch.name.trim(),
                  institution: patch.institution.trim(),
                  programme: patch.programme.trim(),
                }
              : user,
          ),
        });
        return { ok: true, message: "Profile updated in this browser." };
      },

      updatePrefs: (userId, prefs) => {
        set({
          users: get().users.map((user) => (user.id === userId ? { ...user, ...prefs } : user)),
        });
        return {
          ok: true,
          message: "Preferences saved in this browser. Email alerts are not sent in demo mode.",
        };
      },

      suspendUser: (actorId, userId, suspended) => {
        const actor = requireAdmin(get(), actorId);
        if (!actor.ok) return actor;
        if (userId === PREVIEW_ADMIN_ID) {
          return { ok: false, error: "The admin preview session cannot suspend itself." };
        }
        const target = get().users.find((user) => user.id === userId);
        if (!target) return { ok: false, error: "That account is not in this browser." };
        set({
          users: get().users.map((user) => (user.id === userId ? { ...user, suspended } : user)),
          sessionUserId: get().sessionUserId === userId ? null : get().sessionUserId,
        });
        audit(
          actor.user,
          suspended ? "Suspended demo account" : "Restored demo account",
          target.email,
        );
        return {
          ok: true,
          message: suspended
            ? "Account suspended in this browser only."
            : "Account restored in this browser only.",
        };
      },

      saveWizard: (values, editingStudyId = null) =>
        set({ wizard: values, editingStudyId: editingStudyId }),

      upsertDraft: (ownerId, values, studyId) => {
        const owner = requireResearcher(get(), ownerId);
        if (!owner.ok) return owner;
        if (values.title.trim().length < 8) {
          return { ok: false, error: "Add a title of at least 8 characters before saving a draft." };
        }
        if (studyId) {
          const existing = get().studies.find((study) => study.id === studyId);
          if (!existing || existing.ownerId !== ownerId) {
            return { ok: false, error: "That study is not editable from this session." };
          }
          if (existing.status !== "draft" && existing.status !== "rejected") {
            return { ok: false, error: "Only drafts and rejected requests can be edited." };
          }
          const next = studyFromForm(
            values,
            {
              id: existing.id,
              ownerId,
              createdAt: existing.createdAt,
              origin: existing.origin,
            },
            "draft",
          );
          set({
            studies: get().studies.map((study) => (study.id === studyId ? next : study)),
            wizard: null,
            editingStudyId: null,
          });
          audit(owner.user, "Saved draft", next.title);
          return { ok: true, data: { id: studyId }, message: "Draft saved in this browser." };
        }
        const created = studyFromForm(
          values,
          { id: id("stu"), ownerId, createdAt: nowIso(), origin: "browser" },
          "draft",
        );
        set({
          studies: [created, ...get().studies],
          wizard: null,
          editingStudyId: null,
        });
        audit(owner.user, "Saved draft", created.title);
        return { ok: true, data: { id: created.id }, message: "Draft saved in this browser." };
      },

      submitForReview: (ownerId, studyId) => {
        const owner = requireResearcher(get(), ownerId);
        if (!owner.ok) return owner;
        const existing = get().studies.find((study) => study.id === studyId);
        if (!existing || existing.ownerId !== ownerId) {
          return { ok: false, error: "That study is not in this session." };
        }
        if (existing.status !== "draft" && existing.status !== "rejected") {
          return { ok: false, error: "Only a draft or a rejected request can be submitted." };
        }
        const errors = validateFullStudy(toForm(existing));
        if (Object.keys(errors).length) {
          return {
            ok: false,
            error: "This request still has gaps. Open the draft and complete the highlighted fields.",
          };
        }
        set({
          studies: get().studies.map((study) =>
            study.id === studyId
              ? {
                  ...study,
                  status: "pending_review",
                  rejectionReason: "",
                  changeRequest: "",
                  updatedAt: nowIso(),
                }
              : study,
          ),
          notices: [
            notice({
              userId: "role:admin",
              title: "A study is waiting for review",
              body: `${existing.title} was submitted from a demo session. It is not public.`,
              href: `/admin/reviews/${studyId}`,
            }),
            notice({
              userId: ownerId,
              title: "Submitted for review",
              body: `${existing.title} is pending. It was not emailed to a reviewer and it is not public yet.`,
              href: "/researcher/studies",
            }),
            ...get().notices,
          ],
        });
        audit(owner.user, "Submitted study for review", existing.title);
        return {
          ok: true,
          message: "Marked pending review in this browser. It was not sent to a server.",
        };
      },

      openRecruitment: (ownerId, studyId) => {
        const owner = requireResearcher(get(), ownerId);
        if (!owner.ok) return owner;
        const existing = owned(get(), ownerId, studyId);
        if (!existing) return { ok: false, error: "That study is not in this session." };
        if (existing.status !== "approved") {
          return { ok: false, error: "Open recruitment only after the request is approved." };
        }
        setStatus(set, get, studyId, { status: "active" });
        audit(owner.user, "Opened recruitment", existing.title);
        return { ok: true, message: "The study is active in this browser and can appear in Browse." };
      },

      setPaused: (actorId, studyId, paused) => {
        const actor = get().users.find((user) => user.id === actorId);
        if (!actor) return { ok: false, error: "Sign in to the demo session first." };
        const existing = get().studies.find((study) => study.id === studyId);
        if (!existing) return { ok: false, error: "That study is not in this browser." };
        const isAdmin = actor.role === "admin";
        if (!isAdmin && existing.ownerId !== actorId) {
          return { ok: false, error: "You can only change recruitment on your own study." };
        }
        if (paused) {
          if (existing.status !== "active") {
            return { ok: false, error: "Only an active study can be paused." };
          }
          setStatus(set, get, studyId, { status: "paused", pausedByAdmin: isAdmin });
          audit(actor, "Paused study", existing.title);
          return { ok: true, message: "Recruitment paused in this browser." };
        }
        if (existing.status !== "paused") {
          return { ok: false, error: "That study is not paused." };
        }
        if (existing.pausedByAdmin && !isAdmin) {
          return {
            ok: false,
            error: "An administrator paused this study. Only the admin preview can resume it.",
          };
        }
        setStatus(set, get, studyId, { status: "active", pausedByAdmin: false });
        audit(actor, "Resumed study", existing.title);
        return { ok: true, message: "Recruitment resumed in this browser." };
      },

      completeStudy: (ownerId, studyId) => {
        const owner = requireResearcher(get(), ownerId);
        if (!owner.ok) return owner;
        const existing = owned(get(), ownerId, studyId);
        if (!existing) return { ok: false, error: "That study is not in this session." };
        if (existing.status !== "active" && existing.status !== "paused") {
          return { ok: false, error: "Only an active or paused study can be marked completed." };
        }
        setStatus(set, get, studyId, { status: "completed" });
        audit(owner.user, "Marked study completed", existing.title);
        return { ok: true, message: "Marked completed in this browser. New participants cannot join." };
      },

      reviewStudy: (actorId, studyId, action, note) => {
        const actor = requireAdmin(get(), actorId);
        if (!actor.ok) return actor;
        const existing = get().studies.find((study) => study.id === studyId);
        if (!existing) return { ok: false, error: "That study is not in this browser." };
        if (existing.status !== "pending_review") {
          return { ok: false, error: "Review actions apply to studies that are pending review." };
        }
        const trimmed = note.trim();
        if ((action === "reject" || action === "changes") && trimmed.length < 12) {
          return { ok: false, error: "Write a clear reason (at least 12 characters)." };
        }
        if (action === "approve") {
          setStatus(set, get, studyId, { status: "approved", rejectionReason: "", changeRequest: "" });
          notifyOwner(set, get, existing.ownerId, "Study approved", `${existing.title} can be opened for recruitment. It is not public until you open it.`, "/researcher/studies");
          audit(actor.user, "Approved study", existing.title);
          return { ok: true, message: "Approved in this browser. The researcher still has to open recruitment." };
        }
        if (action === "reject") {
          setStatus(set, get, studyId, { status: "rejected", rejectionReason: trimmed });
          notifyOwner(set, get, existing.ownerId, "Study rejected", trimmed, "/researcher/studies");
          audit(actor.user, "Rejected study", existing.title);
          return { ok: true, message: "Rejected in this browser, with the reason you wrote." };
        }
        set({
          studies: get().studies.map((study) =>
            study.id === studyId
              ? {
                  ...study,
                  status: "draft",
                  changeRequest: trimmed,
                  rejectionReason: "",
                  updatedAt: nowIso(),
                }
              : study,
          ),
        });
        notifyOwner(
          set,
          get,
          existing.ownerId,
          "Changes requested",
          trimmed,
          `/researcher/create?studyId=${studyId}`,
        );
        audit(actor.user, "Requested changes", existing.title);
        return { ok: true, message: "Sent back to draft in this browser." };
      },

      consentToStudy: (participantId, studyId) => {
        const participant = requireParticipant(get(), participantId);
        if (!participant.ok) return participant;
        const study = get().studies.find((item) => item.id === studyId);
        if (!study || study.status !== "active") {
          return { ok: false, error: "This study is not open for new participants." };
        }
        const existing = latestApplication(get().applications, participantId, studyId);
        if (existing?.status === "consented") {
          return { ok: false, error: "You already consented to this study in the demo." };
        }
        const application: Application = {
          id: id("app"),
          studyId,
          participantId,
          status: "consented",
          createdAt: nowIso(),
          updatedAt: nowIso(),
          origin: "browser",
        };
        const code = `RC-${Math.floor(1000 + Math.random() * 9000)}`;
        const response: ResponseRecord = {
          id: id("rsp"),
          studyId,
          code,
          participantId,
          applicationId: application.id,
          createdAt: nowIso(),
          quality: "pending",
          withdrawn: false,
          note: "",
          origin: "browser",
        };
        set({
          applications: [application, ...get().applications],
          responses: [response, ...get().responses],
        });
        notifyOwner(
          set,
          get,
          study.ownerId,
          "A participant consented",
          `${code} from ${participant.user.institution || "an unnamed institution"} consented. Their email is not included.`,
          `/researcher/recruitment/${studyId}`,
        );
        audit(participant.user, "Consented to a study", study.title);
        return {
          ok: true,
          message: "Consent recorded in this browser. The questionnaire link is external and was not submitted for you.",
        };
      },

      declineStudy: (participantId, studyId) => {
        const participant = requireParticipant(get(), participantId);
        if (!participant.ok) return participant;
        const study = get().studies.find((item) => item.id === studyId);
        if (!study) return { ok: false, error: "That study is not in this browser." };
        const existing = latestApplication(get().applications, participantId, studyId);
        if (existing?.status === "consented") {
          return { ok: false, error: "You already consented. Use withdraw if you want to stop." };
        }
        const application: Application = {
          id: id("app"),
          studyId,
          participantId,
          status: "declined",
          createdAt: nowIso(),
          updatedAt: nowIso(),
          origin: "browser",
        };
        set({ applications: [application, ...get().applications] });
        audit(participant.user, "Declined a study", study.title);
        return { ok: true, message: "Your decline was saved in this browser. Nothing was emailed." };
      },

      withdrawFromStudy: (participantId, studyId) => {
        const participant = requireParticipant(get(), participantId);
        if (!participant.ok) return participant;
        const study = get().studies.find((item) => item.id === studyId);
        if (!study) return { ok: false, error: "That study is not in this browser." };
        if (study.status === "completed") {
          return { ok: false, error: "This study is already closed." };
        }
        const existing = latestApplication(get().applications, participantId, studyId);
        if (!existing || existing.status !== "consented") {
          return { ok: false, error: "There is no active consent to withdraw." };
        }
        set({
          applications: get().applications.map((item) =>
            item.id === existing.id ? { ...item, status: "withdrawn", updatedAt: nowIso() } : item,
          ),
          responses: get().responses.map((item) =>
            item.applicationId === existing.id
              ? {
                  ...item,
                  withdrawn: true,
                  note: item.note || "Participant withdrew.",
                }
              : item,
          ),
        });
        notifyOwner(
          set,
          get,
          study.ownerId,
          "A participant withdrew",
          `A consented record on ${study.title} was marked withdrawn. No contact details were attached.`,
          `/researcher/recruitment/${studyId}`,
        );
        audit(participant.user, "Withdrew from a study", study.title);
        return { ok: true, message: "Withdrawal saved in this browser." };
      },

      setQuality: (actorId, responseId, quality, note) => {
        const actor = get().users.find((user) => user.id === actorId);
        const response = get().responses.find((item) => item.id === responseId);
        if (!actor || !response) return { ok: false, error: "That record is not in this browser." };
        const study = get().studies.find((item) => item.id === response.studyId);
        if (!study) return { ok: false, error: "The study for that record is missing." };
        if (actor.role !== "admin" && study.ownerId !== actor.id) {
          return { ok: false, error: "Only the researcher who owns the study can label responses." };
        }
        if (response.withdrawn) {
          return { ok: false, error: "Withdrawn records stay withdrawn. They are not labelled as accepted." };
        }
        set({
          responses: get().responses.map((item) =>
            item.id === responseId ? { ...item, quality, note: note.trim() } : item,
          ),
        });
        audit(actor, "Updated a quality label", `${response.code} → ${quality.replaceAll("_", " ")}`);
        return {
          ok: true,
          message: "Label saved in this browser. It does not verify that the response is genuine.",
        };
      },

      markCompleted: (actorId, responseId) => {
        const actor = get().users.find((user) => user.id === actorId);
        const response = get().responses.find((item) => item.id === responseId);
        if (!actor || !response) return { ok: false, error: "That record is not in this browser." };
        const study = get().studies.find((item) => item.id === response.studyId);
        if (!study || (actor.role !== "admin" && study.ownerId !== actor.id)) {
          return { ok: false, error: "You cannot update that record." };
        }
        if (response.withdrawn) return { ok: false, error: "This participant withdrew." };
        if (response.completedAt) return { ok: false, error: "This record is already marked complete." };
        set({
          responses: get().responses.map((item) =>
            item.id === responseId ? { ...item, completedAt: nowIso(), quality: "pending" } : item,
          ),
        });
        audit(actor, "Marked a questionnaire complete", response.code);
        return {
          ok: true,
          message:
            "Marked complete in this browser. The external questionnaire was not checked automatically.",
        };
      },

      addIssue: (input) => {
        const issue: Issue = {
          id: id("iss"),
          source: input.source,
          name: input.name.trim(),
          email: input.email.trim(),
          subject: input.subject.trim(),
          body: input.body.trim(),
          status: "open",
          createdAt: nowIso(),
          origin: "browser",
          studyId: input.studyId,
        };
        set({ issues: [issue, ...get().issues] });
        return {
          ok: true,
          message: "Saved to the demo inbox in this browser. No email was sent.",
        };
      },

      setIssueStatus: (actorId, issueId, status) => {
        const actor = requireAdmin(get(), actorId);
        if (!actor.ok) return actor;
        const issue = get().issues.find((item) => item.id === issueId);
        if (!issue) return { ok: false, error: "That report is not in this browser." };
        set({
          issues: get().issues.map((item) => (item.id === issueId ? { ...item, status } : item)),
        });
        audit(actor.user, "Updated a report", `${issue.subject} → ${status}`);
        return { ok: true, message: "Report status updated in this browser." };
      },

      markNoticeRead: (userId, noticeId) => {
        set({
          notices: get().notices.map((noticeItem) =>
            noticeItem.id === noticeId && canSeeNotice(userId, get(), noticeItem)
              ? { ...noticeItem, read: true }
              : noticeItem,
          ),
        });
      },

      markAllRead: (userId) => {
        set({
          notices: get().notices.map((noticeItem) =>
            canSeeNotice(userId, get(), noticeItem) ? { ...noticeItem, read: true } : noticeItem,
          ),
        });
      },

      resetDemo: () => {
        const fresh = cloneSeed();
        set({
          ...fresh,
          sessionUserId: null,
          wizard: null,
          editingStudyId: null,
        });
      },
    }),
    {
      name: "researchconnect-demo-v1",
      skipHydration: true,
      partialize: (state) => ({
        users: state.users,
        studies: state.studies,
        applications: state.applications,
        responses: state.responses,
        notices: state.notices,
        audits: state.audits,
        issues: state.issues,
        sessionUserId: state.sessionUserId,
        wizard: state.wizard,
        editingStudyId: state.editingStudyId,
      }),
    },
  ),
);

function notice(partial: Omit<Notice, "id" | "read" | "createdAt" | "origin">): Notice {
  return {
    ...partial,
    id: id("nt"),
    read: false,
    createdAt: nowIso(),
    origin: "browser",
  };
}

function owned(state: DataSlice, ownerId: string, studyId: string) {
  return state.studies.find((study) => study.id === studyId && study.ownerId === ownerId);
}

function latestApplication(applications: Application[], participantId: string, studyId: string) {
  return applications.find(
    (item) => item.participantId === participantId && item.studyId === studyId,
  );
}

function requireResearcher(
  state: DataSlice,
  userId: string,
): { ok: true; user: DemoAccount } | { ok: false; error: string } {
  const user = state.users.find((item) => item.id === userId);
  if (!user || state.sessionUserId !== userId) {
    return { ok: false, error: "Open a researcher demo session first." };
  }
  if (user.role !== "researcher") return { ok: false, error: "This action is for researcher sessions." };
  if (user.suspended) return { ok: false, error: "This demo account is suspended." };
  return { ok: true, user };
}

function requireParticipant(
  state: DataSlice,
  userId: string,
): { ok: true; user: DemoAccount } | { ok: false; error: string } {
  const user = state.users.find((item) => item.id === userId);
  if (!user || state.sessionUserId !== userId) {
    return { ok: false, error: "Open a participant demo session first." };
  }
  if (user.role !== "participant") {
    return { ok: false, error: "Join with a participant session. Researchers do not enrol themselves here." };
  }
  if (user.suspended) return { ok: false, error: "This demo account is suspended." };
  return { ok: true, user };
}

function requireAdmin(state: DataSlice, userId: string): { ok: true; user: DemoAccount } | { ok: false; error: string } {
  const user = state.users.find((item) => item.id === userId);
  if (!user || state.sessionUserId !== userId || user.role !== "admin") {
    return {
      ok: false,
      error: "Admin actions need the admin preview. Hiding a button is not treated as authorization, and this check is still only local.",
    };
  }
  return { ok: true, user };
}

function setStatus(
  set: (partial: Partial<DemoStore>) => void,
  get: () => DemoStore,
  studyId: string,
  patch: Partial<Study>,
) {
  set({
    studies: get().studies.map((study) =>
      study.id === studyId ? { ...study, ...patch, updatedAt: nowIso() } : study,
    ),
  });
}

function notifyOwner(
  set: (partial: Partial<DemoStore>) => void,
  get: () => DemoStore,
  userId: string,
  title: string,
  body: string,
  href: string,
) {
  set({
    notices: [notice({ userId, title, body, href }), ...get().notices],
  });
}

function canSeeNotice(userId: string, state: DataSlice, item: Notice) {
  const user = state.users.find((entry) => entry.id === userId);
  if (!user) return false;
  if (item.userId === userId) return true;
  return item.userId === "role:admin" && user.role === "admin";
}

function audit(actor: DemoAccount, action: string, detail: string) {
  const event: AuditEvent = {
    id: id("aud"),
    actorId: actor.id,
    actorName: actor.name,
    action,
    detail,
    createdAt: nowIso(),
    origin: "browser",
  };
  useDemoStore.setState({ audits: [event, ...useDemoStore.getState().audits] });
}

export function toForm(study: Study): StudyFormValues {
  return {
    title: study.title,
    purpose: study.purpose,
    description: study.description,
    category: study.category,
    institution: study.institution,
    targetPopulation: study.targetPopulation,
    ageMin: study.ageMin?.toString() ?? "",
    ageMax: study.ageMax?.toString() ?? "",
    location: study.location,
    inclusion: study.inclusion,
    exclusion: study.exclusion,
    extraQuestions: study.extraQuestions,
    targetCount: study.targetCount ? String(study.targetCount) : "",
    deadline: study.deadline,
    method: study.method,
    completionMinutes: study.completionMinutes ? String(study.completionMinutes) : "",
    questionnaireUrl: study.questionnaireUrl,
    incentive: study.incentive,
    informationStatement: study.informationStatement,
    privacyAck: study.privacyAck,
    approvalAck: study.approvalAck,
  };
}

export function noticesFor(user: DemoAccount | null, notices: Notice[]) {
  if (!user) return [];
  return notices.filter(
    (item) => item.userId === user.id || (item.userId === "role:admin" && user.role === "admin"),
  );
}

export function useDemoQuery<T>(selector: (state: DemoStore) => T): T {
  return useDemoStore(useShallow(selector));
}

export function useSessionUser() {
  return useDemoStore((state) =>
    state.users.find((user) => user.id === state.sessionUserId) ?? null,
  );
}
