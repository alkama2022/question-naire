import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, ProgressBar } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/feedback";
import { Field, Textarea } from "@/components/ui/field";
import { ConfirmDialog, Modal } from "@/components/ui/overlay";
import { RecruitmentDetail } from "@/components/research/recruitment-panel";
import { deadlinePhrase, formatDate, formatDateTime } from "@/lib/research/format";
import { recruitmentSnapshot } from "@/lib/research/metrics";
import { researchService } from "@/lib/research/service";
import { useDemoQuery, useDemoStore, useSessionUser } from "@/lib/research/store";
import type { IssueStatus, Study } from "@/lib/research/types";
import { STATUS_LABEL } from "@/lib/research/types";

export function ResearcherOverview() {
  const user = useSessionUser();
  const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === user?.id));
  const responses = useDemoStore((state) => state.responses);
  const audits = useDemoQuery((state) => state.audits.filter((item) => item.actorId === user?.id).slice(0, 5));
  const notices = useDemoQuery((state) =>
    state.notices.filter((item) => item.userId === user?.id).slice(0, 3),
  );
  if (!user) return null;
  const count = (status: Study["status"]) => studies.filter((study) => study.status === status).length;
  const active = studies.filter((study) => study.status === "active");
  const deadlines = studies
    .filter((study) => study.deadline && !["completed", "rejected", "draft"].includes(study.status))
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 4);
  const accepted = active.reduce((sum, study) => {
    return (
      sum +
      recruitmentSnapshot(
        study,
        responses.filter((item) => item.studyId === study.id),
      ).accepted
    );
  }, 0);
  const target = active.reduce((sum, study) => sum + study.targetCount, 0);
  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total studies" value={studies.length} />
        <Stat label="Active" value={count("active")} />
        <Stat label="Completed" value={count("completed")} />
        <Stat label="Pending review" value={count("pending_review")} />
      </div>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Recruitment progress</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Accepted responses across your active studies, not questionnaires merely marked complete.
        </p>
        <div className="mt-4">
          <ProgressBar
            value={target ? (accepted / target) * 100 : 0}
            label={`${accepted} accepted of ${target} targeted`}
          />
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-display text-xl font-semibold">Upcoming deadlines</h2>
          {deadlines.length === 0 ? (
            <p className="mt-2 text-sm text-ink-soft">No open deadlines in this session.</p>
          ) : (
            <ul className="mt-3 grid gap-3">
              {deadlines.map((study) => (
                <li key={study.id} className="flex items-start justify-between gap-3 text-sm">
                  <span>{study.title}</span>
                  <span className="shrink-0 text-ink-soft">{deadlinePhrase(study.deadline)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-xl font-semibold">Recent notices</h2>
          {notices.length === 0 ? (
            <p className="mt-2 text-sm text-ink-soft">Nothing new.</p>
          ) : (
            <ul className="mt-3 grid gap-3 text-sm">
              {notices.map((notice) => (
                <li key={notice.id}>
                  <p className="font-medium">{notice.title}</p>
                  <p className="text-ink-soft">{notice.body}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Recent activity</h2>
        {audits.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">Actions you take in this browser will be listed here.</p>
        ) : (
          <ul className="mt-3 grid gap-2 text-sm">
            {audits.map((event) => (
              <li key={event.id} className="flex flex-wrap justify-between gap-2">
                <span>
                  {event.action}: {event.detail}
                </span>
                <span className="text-ink-soft">{formatDateTime(event.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/researcher/create" search={{}}>Create study</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/researcher/recruitment">Track recruitment</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/researcher/reports">Reports</Link>
        </Button>
      </div>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Your studies</h2>
        {studies.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">No studies in this session yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4">
            {studies.map((study) => {
              const snap = recruitmentSnapshot(
                study,
                responses.filter((item) => item.studyId === study.id),
              );
              return (
                <li key={study.id} className="rounded-lg border border-line p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={study.status} />
                        <span className="text-xs text-ink-soft">{deadlinePhrase(study.deadline)}</span>
                      </div>
                      <p className="mt-2 font-medium">{study.title}</p>
                    </div>
                    <Button size="sm" variant="secondary" asChild>
                      <Link
                        to={
                          study.status === "active" || study.status === "paused" || study.status === "completed"
                            ? "/researcher/recruitment/$studyId"
                            : "/researcher/studies"
                        }
                        params={
                          study.status === "active" || study.status === "paused" || study.status === "completed"
                            ? { studyId: study.id }
                            : undefined
                        }
                      >
                        {study.status === "draft" || study.status === "rejected" ? "Manage" : "Open"}
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3">
                    <ProgressBar
                      value={snap.acceptedPercent}
                      label={`${snap.accepted} accepted of ${snap.target} · ${snap.eligible} recruited · ${snap.completed} completed`}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{value}</p>
    </Card>
  );
}

export function ReportsPanel() {
  const user = useSessionUser();
  const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === user?.id));
  const responses = useDemoStore((state) => state.responses);
  return (
    <div className="grid gap-4">
      <Card className="p-5">
        <p className="text-sm text-ink-soft">
          The file contains study-level counts only. Participant names and email addresses are not
          included. The download is generated in this browser.
        </p>
        <Button
          className="mt-4"
          onClick={() => {
            const header = [
              "Title",
              "Status",
              "Origin",
              "Target",
              "Recruited",
              "Completed",
              "Awaiting review",
              "Accepted",
              "Excluded",
              "Needs review",
              "Deadline",
            ];
            const lines = studies.map((study) => {
              const snap = recruitmentSnapshot(
                study,
                responses.filter((item) => item.studyId === study.id),
              );
              return [
                study.title,
                STATUS_LABEL[study.status],
                study.origin,
                snap.target,
                snap.eligible,
                snap.completed,
                snap.awaiting,
                snap.accepted,
                snap.excluded,
                snap.needsReview,
                study.deadline,
              ]
                .map(csvCell)
                .join(",");
            });
            const blob = new Blob([[header.join(","), ...lines].join("\n")], {
              type: "text/csv;charset=utf-8",
            });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "researchconnect-demo-report.csv";
            anchor.click();
            URL.revokeObjectURL(url);
            toast.success("Downloaded a CSV of demo records from this browser. Nothing was exported from a server.");
          }}
        >
          Download CSV
        </Button>
      </Card>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Study</th>
              <th className="px-4 py-3 font-medium">Recruited</th>
              <th className="px-4 py-3 font-medium">Completed</th>
              <th className="px-4 py-3 font-medium">Accepted</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((study) => {
              const snap = recruitmentSnapshot(
                study,
                responses.filter((item) => item.studyId === study.id),
              );
              return (
                <tr key={study.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    {study.title}
                    <span className="mt-1 block text-ink-soft">{STATUS_LABEL[study.status]}</span>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{snap.eligible}</td>
                  <td className="px-4 py-3 tabular-nums">{snap.completed}</td>
                  <td className="px-4 py-3 tabular-nums">{snap.accepted}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function csvCell(value: string | number) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

export function ParticipantOverview() {
  const user = useSessionUser();
  const studies = useDemoQuery((state) => state.studies.filter((study) => study.status === "active"));
  const applications = useDemoQuery((state) =>
    state.applications.filter((item) => item.participantId === user?.id),
  );
  const allStudies = useDemoQuery((state) => state.studies);
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Open studies" value={studies.length} />
        <Stat label="Your applications" value={applications.length} />
        <Stat
          label="Active consents"
          value={applications.filter((item) => item.status === "consented").length}
        />
      </div>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Your participation</h2>
        {applications.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">You have not consented, declined, or withdrawn yet.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {applications.map((item) => {
              const study = allStudies.find((entry) => entry.id === item.studyId);
              return (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-sm">
                  <span>
                    <span className="font-medium">{study?.title ?? "Study"}</span>
                    <span className="mt-1 block text-ink-soft capitalize">{item.status}</span>
                  </span>
                  {study ? (
                    <Button size="sm" variant="secondary" asChild>
                      <Link to="/participant/studies/$studyId" params={{ studyId: study.id }}>
                        Open
                      </Link>
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Open studies</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Read a study fully before you consent. Rewards are listed only when a researcher has
          stated them, and unconfirmed rewards are not promised.
        </p>
        <ul className="mt-4 grid gap-3">
          {studies.slice(0, 4).map((study) => (
            <li key={study.id} className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span>
                <span className="font-medium">{study.title}</span>
                <span className="mt-1 block text-ink-soft">
                  {study.completionMinutes} min · {deadlinePhrase(study.deadline)}
                </span>
              </span>
              <Button size="sm" variant="secondary" asChild>
                <Link to="/participant/studies/$studyId" params={{ studyId: study.id }}>
                  Read study
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button className="mt-4" asChild>
          <Link to="/participant/studies">Browse open studies</Link>
        </Button>
      </Card>
    </div>
  );
}

export function ApplicationsList({ history = false }: { history?: boolean }) {
  const user = useSessionUser();
  const applications = useDemoStore((state) => state.applications);
  const studies = useDemoStore((state) => state.studies);
  const mine = applications.filter((item) => item.participantId === user?.id);
  const rows = mine.filter((item) => {
    const study = studies.find((entry) => entry.id === item.studyId);
    if (!history) return true;
    return item.status !== "consented" || study?.status === "completed";
  });
  if (rows.length === 0) {
    return (
      <EmptyState
        title={history ? "No history yet" : "No applications yet"}
        body="When you consent, decline, or withdraw, the record stays in this browser."
      />
    );
  }
  return (
    <div className="grid gap-3">
      {rows.map((item) => {
        const study = studies.find((entry) => entry.id === item.studyId);
        return (
          <Card key={item.id} className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={study?.status ?? "draft"} />
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {item.status}
              </span>
            </div>
            <h2 className="mt-2 font-display text-xl font-semibold">{study?.title ?? "Removed study"}</h2>
            <p className="mt-1 text-sm text-ink-soft">Updated {formatDate(item.updatedAt)}</p>
            {study ? (
              <Button className="mt-3" variant="secondary" asChild>
                <Link to="/participant/studies/$studyId" params={{ studyId: study.id }}>
                  Open study
                </Link>
              </Button>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

export function AdminOverview() {
  const studies = useDemoStore((state) => state.studies);
  const users = useDemoStore((state) => state.users);
  const issues = useDemoStore((state) => state.issues);
  const pending = studies.filter((study) => study.status === "pending_review");
  return (
    <div className="grid gap-4">
      <p className="rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-sm">
        Admin preview. These controls change demo data in this browser only. Production would
        require server-side authorization. Hiding a button is not enough.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Pending requests" value={pending.length} />
        <Stat label="Active studies" value={studies.filter((study) => study.status === "active").length} />
        <Stat label="Open reports" value={issues.filter((issue) => issue.status !== "closed").length} />
        <Stat label="Demo accounts" value={users.filter((user) => user.role !== "admin").length} />
      </div>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Waiting for review</h2>
        {pending.length === 0 ? (
          <p className="mt-2 text-sm text-ink-soft">Nothing is pending.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {pending.map((study) => (
              <li key={study.id}>
                <Link className="font-medium text-brand underline" to="/admin/reviews/$studyId" params={{ studyId: study.id }}>
                  {study.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

export function ReviewList() {
  const studies = useDemoQuery((state) =>
    state.studies.filter((study) => study.status === "pending_review"),
  );
  if (studies.length === 0) {
    return <EmptyState title="No pending requests" body="New submissions from this browser will appear here." />;
  }
  return (
    <div className="grid gap-3">
      {studies.map((study) => (
        <Card key={study.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <h2 className="font-medium">{study.title}</h2>
            <p className="text-sm text-ink-soft">Submitted {formatDate(study.updatedAt)}</p>
          </div>
          <Button variant="secondary" asChild>
            <Link to="/admin/reviews/$studyId" params={{ studyId: study.id }}>
              Review
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}

export function ReviewDetail({ studyId }: { studyId: string }) {
  const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
  const owner = useDemoStore((state) => state.users.find((user) => user.id === study?.ownerId));
  const actor = useSessionUser();
  const [note, setNote] = useState("");
  const [action, setAction] = useState<null | "approve" | "reject" | "changes" | "pause">(null);
  if (!study || !actor) {
    return <EmptyState title="Study not found" body="It is not in this browser." />;
  }
  const fields: Array<[string, string]> = [
    ["Purpose", study.purpose],
    ["Description", study.description],
    ["Category", study.category],
    ["Institution", study.institution],
    ["Population", study.targetPopulation],
    ["Inclusion", study.inclusion],
    ["Exclusion", study.exclusion],
    ["Method", study.method],
    ["Target", String(study.targetCount)],
    ["Deadline", study.deadline || "—"],
    ["Minutes", String(study.completionMinutes)],
    ["Questionnaire", study.questionnaireUrl || "Missing"],
    ["Incentive", study.incentive || "None confirmed"],
    ["Information statement", study.informationStatement],
    ["Privacy acknowledgement", study.privacyAck ? "Yes" : "No"],
    ["Approval acknowledgement", study.approvalAck ? "Yes" : "No"],
  ];
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={study.status} />
        <span className="text-sm text-ink-soft">{owner?.name}</span>
      </div>
      <h2 className="font-display text-2xl font-semibold">{study.title}</h2>
      <Card className="grid gap-3 p-5">
        {fields.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs font-semibold tracking-wide text-ink-soft uppercase">{label}</p>
            <p className="text-sm whitespace-pre-wrap">{value}</p>
          </div>
        ))}
      </Card>
      {study.status === "pending_review" ? (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setAction("approve")}>Approve</Button>
          <Button variant="secondary" onClick={() => setAction("changes")}>
            Request changes
          </Button>
          <Button variant="danger" onClick={() => setAction("reject")}>
            Reject
          </Button>
        </div>
      ) : null}
      {study.status === "active" ? (
        <Button variant="secondary" onClick={() => setAction("pause")}>
          Pause study
        </Button>
      ) : null}
      <Modal
        open={action === "reject" || action === "changes"}
        onOpenChange={(open) => {
          if (!open) setAction(null);
        }}
        title={action === "reject" ? "Reject this request" : "Request changes"}
        description="Write a reason the researcher can act on. This is stored only in this browser."
      >
        <Field label="Reason" htmlFor="review-note">
          <Textarea id="review-note" value={note} onChange={(event) => setNote(event.target.value)} />
        </Field>
        <Button
          className="mt-3"
          variant={action === "reject" ? "danger" : "primary"}
          onClick={async () => {
            if (!action || action === "approve" || action === "pause") return;
            const result = await researchService.reviewStudy(actor.id, study.id, action, note);
            if (result.ok) {
              toast.success(result.message);
              setAction(null);
              setNote("");
            } else toast.error(result.error);
          }}
        >
          Confirm
        </Button>
      </Modal>
      <ConfirmDialog
        open={action === "approve" || action === "pause"}
        onOpenChange={(open) => {
          if (!open) setAction(null);
        }}
        title={action === "approve" ? "Approve this study?" : "Pause this study?"}
        body={
          action === "approve"
            ? "Approval does not publish it. The researcher must open recruitment. This decision stays in the browser."
            : "Pausing stops new consent. Because this is an admin pause, the researcher cannot resume it themselves in the demo."
        }
        confirmLabel={action === "approve" ? "Approve" : "Pause"}
        onConfirm={async () => {
          const result =
            action === "approve"
              ? await researchService.reviewStudy(actor.id, study.id, "approve", "")
              : await researchService.setPaused(actor.id, study.id, true);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
          setAction(null);
        }}
      />
      {study.status === "active" || study.status === "paused" || study.status === "completed" ? (
        <RecruitmentDetail studyId={study.id} />
      ) : null}
    </div>
  );
}

export function UserAdmin() {
  const actor = useSessionUser();
  const users = useDemoStore((state) => state.users);
  const [target, setTarget] = useState<null | { id: string; suspend: boolean; email: string }>(null);
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <thead className="border-b border-line text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">State</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  {user.name}
                  <span className="block text-xs text-ink-soft">
                    {user.origin === "sample" ? "Sample account" : "Created in this browser"}
                  </span>
                </td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  {user.suspended ? "Suspended" : "Active"}
                  {user.emailVerified ? "" : " · email not verified"}
                </td>
                <td className="px-4 py-3">
                  {user.role === "admin" ? (
                    <span className="text-ink-soft">Preview only</span>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        setTarget({ id: user.id, suspend: !user.suspended, email: user.email })
                      }
                    >
                      {user.suspended ? "Restore" : "Suspend"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={Boolean(target)}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        title={target?.suspend ? "Suspend this demo account?" : "Restore this demo account?"}
        body="This only affects the copy stored in this browser. It does not change a server."
        confirmLabel={target?.suspend ? "Suspend" : "Restore"}
        destructive={target?.suspend}
        onConfirm={() => {
          if (!actor || !target) return;
          const result = useDemoStore.getState().suspendUser(actor.id, target.id, target.suspend);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
          setTarget(null);
        }}
      />
    </>
  );
}

export function MonitoringTable() {
  const studies = useDemoQuery((state) =>
    state.studies.filter((study) => study.status === "active" || study.status === "paused"),
  );
  const responses = useDemoStore((state) => state.responses);
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[40rem] text-left text-sm">
        <thead className="border-b border-line text-ink-soft">
          <tr>
            <th className="px-4 py-3 font-medium">Study</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Recruited</th>
            <th className="px-4 py-3 font-medium">Completed</th>
            <th className="px-4 py-3 font-medium">Accepted</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => {
            const snap = recruitmentSnapshot(
              study,
              responses.filter((item) => item.studyId === study.id),
            );
            return (
              <tr key={study.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">{study.title}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={study.status} />
                </td>
                <td className="px-4 py-3 tabular-nums">{snap.eligible}</td>
                <td className="px-4 py-3 tabular-nums">{snap.completed}</td>
                <td className="px-4 py-3 tabular-nums">{snap.accepted}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function IssuesPanel() {
  const actor = useSessionUser();
  const issues = useDemoStore((state) => state.issues);
  const [pending, setPending] = useState<null | { id: string; status: IssueStatus }>(null);
  return (
    <div className="grid gap-3">
      {issues.map((issue) => (
        <Card key={issue.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-medium">{issue.subject}</h2>
            <span className="text-xs font-semibold uppercase text-ink-soft">
              {issue.status} · {issue.source} · {issue.origin === "sample" ? "Sample" : "This browser"}
            </span>
          </div>
          <p className="mt-2 text-sm">{issue.body}</p>
          <p className="mt-2 text-xs text-ink-soft">
            {issue.name} · {issue.email} · {formatDateTime(issue.createdAt)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["open", "reviewing", "closed"] as IssueStatus[]).map((status) => (
              <Button
                key={status}
                size="sm"
                variant={issue.status === status ? "primary" : "secondary"}
                onClick={() => setPending({ id: issue.id, status })}
              >
                {status}
              </Button>
            ))}
          </div>
        </Card>
      ))}
      <ConfirmDialog
        open={Boolean(pending)}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        title="Update this report?"
        body="The new status is stored in this browser only."
        confirmLabel="Update"
        onConfirm={async () => {
          if (!actor || !pending) return;
          const result = await researchService.setIssueStatus(actor.id, pending.id, pending.status);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
          setPending(null);
        }}
      />
    </div>
  );
}

export function AuditList() {
  const audits = useDemoStore((state) => state.audits);
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="border-b border-line text-ink-soft">
          <tr>
            <th className="px-4 py-3 font-medium">When</th>
            <th className="px-4 py-3 font-medium">Actor</th>
            <th className="px-4 py-3 font-medium">Action</th>
            <th className="px-4 py-3 font-medium">Detail</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((event) => (
            <tr key={event.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(event.createdAt)}</td>
              <td className="px-4 py-3">{event.actorName}</td>
              <td className="px-4 py-3">{event.action}</td>
              <td className="px-4 py-3">
                {event.detail}
                <span className="block text-xs text-ink-soft">
                  {event.origin === "sample" ? "Sample record" : "This browser"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
