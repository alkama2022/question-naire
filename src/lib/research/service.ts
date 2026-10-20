/**
 * Data-access contract for ResearchConnect.
 *
 * The running app uses `demoService`, which reads and writes the browser store.
 * A future Supabase (or other) module should implement the same operations
 * behind server-side authorization and Row Level Security.
 *
 * Never put a service-role key, database URL, or other secret in this file.
 * Demo methods do not contact a server. Callers must not describe their
 * results as saved, emailed, or paid.
 */
import { isPublicStudy, recruitmentSnapshot } from "./metrics";
import { useDemoStore } from "./store";
import type { IssueStatus, QualityLabel, StudyFormValues } from "./types";

type Snapshot = ReturnType<typeof recruitmentSnapshot>;

export interface ResearchService {
  loadStudies(): Promise<ReturnType<typeof useDemoStore.getState>["studies"]>;
  loadPublicStudies(): Promise<ReturnType<typeof useDemoStore.getState>["studies"]>;
  recruitmentProgress(studyId: string): Promise<Snapshot | null>;
  submitStudyRequest(ownerId: string, studyId: string): Promise<{ ok: boolean; error?: string; message?: string }>;
  updateReviewStatus(
    actorId: string,
    studyId: string,
    action: "approve" | "reject" | "changes",
    note: string,
  ): Promise<{ ok: boolean; error?: string; message?: string }>;
}

export const demoService: ResearchService = {
  async loadStudies() {
    return useDemoStore.getState().studies;
  },
  async loadPublicStudies() {
    return useDemoStore.getState().studies.filter((study) => isPublicStudy(study.status));
  },
  async recruitmentProgress(studyId) {
    const state = useDemoStore.getState();
    const study = state.studies.find((item) => item.id === studyId);
    if (!study) return null;
    return recruitmentSnapshot(
      study,
      state.responses.filter((item) => item.studyId === studyId),
    );
  },
  submitStudyRequest(ownerId, studyId) {
    return Promise.resolve(useDemoStore.getState().submitForReview(ownerId, studyId));
  },
  updateReviewStatus(actorId, studyId, action, note) {
    return Promise.resolve(useDemoStore.getState().reviewStudy(actorId, studyId, action, note));
  },
};

export type { IssueStatus, QualityLabel, StudyFormValues, Snapshot as RecruitmentSnapshot };
