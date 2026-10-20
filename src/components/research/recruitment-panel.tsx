import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QualityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, ProgressBar } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/feedback";
import { Field, Select, Textarea } from "@/components/ui/field";
import { formatDateTime } from "@/lib/research/format";
import { recruitmentSnapshot, weeklySeries } from "@/lib/research/metrics";
import { researchService } from "@/lib/research/service";
import { useDemoQuery, useDemoStore, useSessionUser } from "@/lib/research/store";
import type { QualityLabel, ResponseRecord } from "@/lib/research/types";
import { QUALITY_LABEL } from "@/lib/research/types";

export function RecruitmentList({ ownerId }: { ownerId: string }) {
  const studies = useDemoQuery((state) =>
    state.studies.filter(
      (study) =>
        study.ownerId === ownerId &&
        ["active", "paused", "completed", "approved"].includes(study.status),
    ),
  );
  const responses = useDemoStore((state) => state.responses);
  if (studies.length === 0) {
    return (
      <EmptyState
        title="No recruitment to track yet"
        body="Approved, active, paused, and completed studies appear here."
      />
    );
  }
  return (
    <div className="grid gap-3">
      {studies.map((study) => {
        const snap = recruitmentSnapshot(
          study,
          responses.filter((item) => item.studyId === study.id),
        );
        return (
          <Card key={study.id} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold">{study.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {snap.eligible} recruited · {snap.completed} completed · {snap.accepted} accepted
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link to="/researcher/recruitment/$studyId" params={{ studyId: study.id }}>
                  Open tracking
                </Link>
              </Button>
            </div>
            <div className="mt-3">
              <ProgressBar value={snap.acceptedPercent} label="Accepted toward target" />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function RecruitmentDetail({ studyId }: { studyId: string }) {
  const user = useSessionUser();
  const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
  const responses = useDemoQuery((state) =>
    state.responses.filter((item) => item.studyId === studyId),
  );
  if (!study || !user || (user.role !== "admin" && study.ownerId !== user.id)) {
    return (
      <EmptyState
        title="Recruitment record not available"
        body="It is missing from this browser, or this session does not own it."
      />
    );
  }
  const snap = recruitmentSnapshot(study, responses);
  const weeks = weeklySeries(responses);
  const recent = [...responses].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Target" value={snap.target} hint="Desired accepted responses" />
        <Metric label="Recruited" value={snap.eligible} hint="Consented and not withdrawn" />
        <Metric label="Completed" value={snap.completed} hint="Marked finished by a person" />
        <Metric label="Awaiting review" value={snap.awaiting} hint="Finished, still pending" />
        <Metric label="Accepted" value={snap.accepted} hint="Not the same as completed" />
        <Metric label="Needs review" value={snap.needsReview} hint="Look again before accepting" />
        <Metric label="Excluded" value={snap.excluded} hint="Kept out of the accepted count" />
        <Metric label="Remaining" value={snap.remaining} hint="Target minus accepted" />
      </div>
      <Card className="grid gap-4 p-5">
        <ProgressBar value={snap.acceptedPercent} label="Accepted responses toward the target" />
        <ProgressBar value={snap.completedPercent} label="Questionnaires marked complete, toward the same target" />
        <p className="text-sm text-ink-soft">
          Deadline {study.deadline || "not set"}. Withdrawn records: {snap.withdrawn}. People who
          consented but have not finished: {snap.pendingIncomplete}. These labels are not a
          verification that anyone told the truth.
        </p>
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Recent weeks</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Accepted counts use the week the questionnaire was marked complete.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="text-ink-soft">
              <tr>
                <th className="py-2 font-medium">Week</th>
                <th className="py-2 font-medium">Recruited</th>
                <th className="py-2 font-medium">Completed</th>
                <th className="py-2 font-medium">Accepted</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week.week} className="border-t border-line">
                  <td className="py-2">{week.week}</td>
                  <td className="py-2 tabular-nums">{week.recruited}</td>
                  <td className="py-2 tabular-nums">{week.completed}</td>
                  <td className="py-2 tabular-nums">{week.accepted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <ClientChart data={weeks} />
        </div>
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Recent activity</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          {recent.map((record) => (
            <li key={record.id} className="flex flex-wrap justify-between gap-2 border-b border-line py-2">
              <span>
                {record.code}
                {record.withdrawn ? " withdrew" : record.completedAt ? " has a completion mark" : " consented"}
              </span>
              <span className="text-ink-soft">{formatDateTime(record.createdAt)}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Response records</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Names and email addresses are not shown. Completion is a manual mark because the
          questionnaire tool is not connected.
        </p>
        {responses.length === 0 ? (
          <p className="mt-4 text-sm">No one has consented yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="text-ink-soft">
                <tr>
                  <th className="py-2 font-medium">Code</th>
                  <th className="py-2 font-medium">Recruited</th>
                  <th className="py-2 font-medium">Completed</th>
                  <th className="py-2 font-medium">Label</th>
                  <th className="py-2 font-medium">Update</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((record) => (
                  <ResponseRow key={record.id} record={record} actorId={user.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{hint}</p>
    </Card>
  );
}

function ResponseRow({ record, actorId }: { record: ResponseRecord; actorId: string }) {
  const [quality, setQuality] = useState<QualityLabel>(record.quality);
  const [note, setNote] = useState(record.note);
  useEffect(() => {
    setQuality(record.quality);
    setNote(record.note);
  }, [record.quality, record.note]);
  return (
    <tr className="border-t border-line align-top">
      <td className="py-3 pr-3 font-medium">{record.code}</td>
      <td className="py-3 pr-3">{formatDateTime(record.createdAt)}</td>
      <td className="py-3 pr-3">
        {record.withdrawn ? "Withdrawn" : record.completedAt ? formatDateTime(record.completedAt) : "Not marked"}
      </td>
      <td className="py-3 pr-3">
        <QualityBadge quality={record.quality} />
      </td>
      <td className="py-3">
        {record.withdrawn ? (
          <p className="text-ink-soft">No further label.</p>
        ) : (
          <div className="grid gap-2">
            {!record.completedAt ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={async () => {
                  const result = await researchService.markCompleted(actorId, record.id);
                  if (result.ok) toast.success(result.message);
                  else toast.error(result.error);
                }}
              >
                Mark questionnaire complete
              </Button>
            ) : null}
            <Field label={`Label for ${record.code}`} htmlFor={`q-${record.id}`}>
              <Select
                id={`q-${record.id}`}
                value={quality}
                onChange={(event) => setQuality(event.target.value as QualityLabel)}
              >
                {(Object.keys(QUALITY_LABEL) as QualityLabel[]).map((item) => (
                  <option key={item} value={item}>
                    {QUALITY_LABEL[item]}
                  </option>
                ))}
              </Select>
            </Field>
            <Textarea value={note} onChange={(event) => setNote(event.target.value)} aria-label={`Note for ${record.code}`} />
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                const result = await researchService.setQuality(actorId, record.id, quality, note);
                if (result.ok) toast.success(result.message);
                else toast.error(result.error);
              }}
            >
              Save label
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}

function ClientChart({ data }: { data: ReturnType<typeof weeklySeries> }) {
  const [Chart, setChart] = useState<
    null | typeof import("./recruitment-chart-inner").RecruitmentChartInner
  >(null);
  useEffect(() => {
    void import("./recruitment-chart-inner").then((mod) => setChart(() => mod.RecruitmentChartInner));
  }, []);
  if (!Chart) return <div className="h-64 rounded-lg bg-canvas" aria-hidden />;
  return <Chart data={data} />;
}
