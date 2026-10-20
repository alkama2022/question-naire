import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { QualityLabel, StudyStatus } from "@/lib/research/types";
import { QUALITY_LABEL, STATUS_LABEL } from "@/lib/research/types";

const statusClass: Record<StudyStatus, string> = {
  draft: "bg-canvas text-ink border-line",
  pending_review: "bg-warn/15 text-ink border-warn/40",
  approved: "bg-brand/10 text-brand border-brand/20",
  active: "bg-accent/15 text-ink border-accent/40",
  paused: "bg-warn/15 text-ink border-warn/40",
  completed: "bg-success/10 text-success border-success/30",
  rejected: "bg-danger/10 text-danger border-danger/30",
};

export function StatusBadge({ status }: { status: StudyStatus }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-semibold",
        statusClass[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

const qualityClass: Record<QualityLabel, string> = {
  pending: "bg-canvas text-ink border-line",
  accepted: "bg-success/10 text-success border-success/30",
  excluded: "bg-danger/10 text-danger border-danger/30",
  needs_review: "bg-warn/15 text-ink border-warn/40",
};

export function QualityBadge({ quality }: { quality: QualityLabel }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-semibold",
        qualityClass[quality],
      )}
    >
      {QUALITY_LABEL[quality]}
    </span>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border border-line bg-canvas px-2.5 text-xs font-semibold text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
