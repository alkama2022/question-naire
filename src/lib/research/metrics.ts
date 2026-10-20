import {
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfWeek,
  subWeeks,
} from "date-fns";
import type { ResponseRecord, Study, StudyActionId, StudyStatus } from "./types.ts";

export interface RecruitmentSnapshot {
  target: number;
  eligible: number;
  completed: number;
  awaiting: number;
  excluded: number;
  accepted: number;
  needsReview: number;
  pendingIncomplete: number;
  withdrawn: number;
  remaining: number;
  acceptedPercent: number;
  completedPercent: number;
}

export function recruitmentSnapshot(
  study: Pick<Study, "targetCount">,
  responses: ResponseRecord[],
): RecruitmentSnapshot {
  const active = responses.filter((record) => !record.withdrawn);
  const eligible = active.length;
  const completed = active.filter((record) => Boolean(record.completedAt)).length;
  const awaiting = active.filter(
    (record) => record.completedAt && record.quality === "pending",
  ).length;
  const excluded = active.filter((record) => record.quality === "excluded").length;
  const accepted = active.filter((record) => record.quality === "accepted").length;
  const needsReview = active.filter((record) => record.quality === "needs_review").length;
  const pendingIncomplete = active.filter(
    (record) => !record.completedAt && record.quality === "pending",
  ).length;
  const withdrawn = responses.filter((record) => record.withdrawn).length;
  const target = study.targetCount;
  const remaining = Math.max(0, target - accepted);
  const acceptedPercent = target === 0 ? 0 : Math.min(100, Math.round((accepted / target) * 100));
  const completedPercent =
    target === 0 ? 0 : Math.min(100, Math.round((completed / target) * 100));
  return {
    target,
    eligible,
    completed,
    awaiting,
    excluded,
    accepted,
    needsReview,
    pendingIncomplete,
    withdrawn,
    remaining,
    acceptedPercent,
    completedPercent,
  };
}

export interface WeekBucket {
  week: string;
  recruited: number;
  completed: number;
  accepted: number;
}

export function weeklySeries(responses: ResponseRecord[], now = new Date()): WeekBucket[] {
  const current = startOfWeek(now, { weekStartsOn: 1 });
  return Array.from({ length: 6 }, (_, index) => {
    const start = subWeeks(current, 5 - index);
    const end = endOfWeek(start, { weekStartsOn: 1 });
    const inside = (iso?: string) => {
      if (!iso) return false;
      return isWithinInterval(parseISO(iso), { start, end });
    };
    const active = responses.filter((record) => !record.withdrawn);
    return {
      week: format(start, "d MMM"),
      recruited: active.filter((record) => inside(record.createdAt)).length,
      completed: active.filter((record) => inside(record.completedAt)).length,
      accepted: active.filter(
        (record) => record.quality === "accepted" && inside(record.completedAt),
      ).length,
    };
  });
}

export function researcherActions(status: StudyStatus): StudyActionId[] {
  switch (status) {
    case "draft":
      return ["view", "edit", "submit"];
    case "pending_review":
      return ["view"];
    case "approved":
      return ["view", "open"];
    case "active":
      return ["view", "progress", "pause", "complete"];
    case "paused":
      return ["view", "progress", "resume", "complete"];
    case "completed":
      return ["view", "progress"];
    case "rejected":
      return ["view", "edit", "submit"];
  }
}

export function isPublicStudy(status: StudyStatus) {
  return status === "active" || status === "paused";
}
