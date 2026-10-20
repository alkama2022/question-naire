import { Link } from "@tanstack/react-router";
import { LayoutGrid, List, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { StatusBadge, Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, ProgressBar } from "@/components/ui/card";
import { EmptyState, Pagination } from "@/components/ui/feedback";
import { Input, Select, Textarea, Field } from "@/components/ui/field";
import { ConfirmDialog, Menu, MenuItem, Modal } from "@/components/ui/overlay";
import { OriginNote } from "@/components/layout/shells";
import { deadlinePhrase, formatDate, researcherLabel } from "@/lib/research/format";
import { recruitmentSnapshot, researcherActions } from "@/lib/research/metrics";
import { toForm, useDemoQuery, useDemoStore, useSessionUser } from "@/lib/research/store";
import { researchService } from "@/lib/research/service";
import { useDataMode } from "@/lib/research/use-data-mode";
import type { Study, StudyStatus } from "@/lib/research/types";
import { CATEGORIES, STATUS_LABEL } from "@/lib/research/types";
import { validateFullStudy } from "@/lib/research/validators";

const PAGE_SIZE = 6;

export function StudyBrowser({
  studies,
  detailTo,
}: {
  studies: Study[];
  detailTo: "/studies/$studyId" | "/participant/studies/$studyId";
}) {
  const users = useDemoStore((state) => state.users);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    return studies.filter((study) => {
      const blob = `${study.title} ${study.purpose} ${study.location} ${study.institution}`.toLowerCase();
      const matchesQuery = blob.includes(query.trim().toLowerCase());
      const matchesCategory = category === "all" || study.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [studies, query, category]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_14rem]">
        <label className="relative block">
          <span className="sr-only">Search studies</span>
          <Search className="pointer-events-none absolute top-3 left-3 size-4 text-ink-soft" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search by title, place, or institution"
            className="pl-9"
          />
        </label>
        <Select
          aria-label="Category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setPage(1);
          }}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
      </div>
      {visible.length === 0 ? (
        <EmptyState
          title="No studies match"
          body="Try another word, or clear the category filter. Pending and draft studies are not listed publicly."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((study) => {
            const owner = users.find((user) => user.id === study.ownerId);
            return (
              <Card key={study.id} className="flex flex-col p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={study.status} />
                  <Badge>{study.category}</Badge>
                  <OriginNote origin={study.origin} />
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold">
                  <Link to={detailTo} params={{ studyId: study.id }} className="hover:text-brand">
                    {study.title}
                  </Link>
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{study.purpose}</p>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div>
                    <dt className="text-ink-soft">Researcher</dt>
                    <dd>{researcherLabel(owner?.name ?? "", study.institution)}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span>{study.completionMinutes || "—"} min</span>
                    <span>{deadlinePhrase(study.deadline)}</span>
                    <span>{study.location || "Location not set"}</span>
                  </div>
                </dl>
                <p className="mt-3 text-sm">
                  {study.incentive || "No incentive has been confirmed."}
                </p>
                <div className="mt-4">
                  <Button variant="secondary" asChild>
                    <Link to={detailTo} params={{ studyId: study.id }}>
                      View study
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <Pagination page={Math.min(page, pages)} pages={pages} onPage={setPage} />
    </div>
  );
}

export function StudyManager({ ownerId }: { ownerId: string }) {
  const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === ownerId));
  const responses = useDemoStore((state) => state.responses);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StudyStatus | "all">("all");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"card" | "list">("card");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const next = studies.filter((study) => {
      const matches = study.title.toLowerCase().includes(query.trim().toLowerCase());
      return matches && (status === "all" || study.status === status);
    });
    next.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "deadline") return (a.deadline || "9999").localeCompare(b.deadline || "9999");
      if (sort === "progress") {
        const ap = recruitmentSnapshot(a, responses.filter((item) => item.studyId === a.id)).acceptedPercent;
        const bp = recruitmentSnapshot(b, responses.filter((item) => item.studyId === b.id)).acceptedPercent;
        return bp - ap;
      }
      return b.updatedAt.localeCompare(a.updatedAt);
    });
    return next;
  }, [studies, query, status, sort, responses]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const tabs: Array<StudyStatus | "all"> = [
    "all",
    "draft",
    "pending_review",
    "approved",
    "active",
    "paused",
    "completed",
    "rejected",
  ];
  return (
    <div className="grid gap-4">
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Study status">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={status === tab}
            className={
              status === tab
                ? "min-h-11 shrink-0 rounded-full bg-brand px-4 text-sm text-brand-foreground"
                : "min-h-11 shrink-0 rounded-full border border-line bg-surface px-4 text-sm"
            }
            onClick={() => {
              setStatus(tab);
              setPage(1);
            }}
          >
            {tab === "all" ? "All" : STATUS_LABEL[tab]}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_12rem_auto]">
        <label className="relative block">
          <span className="sr-only">Search your studies</span>
          <Search className="pointer-events-none absolute top-3 left-3 size-4 text-ink-soft" />
          <Input
            className="pl-9"
            value={query}
            placeholder="Search your studies"
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </label>
        <Select aria-label="Sort studies" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="newest">Newest update</option>
          <option value="deadline">Deadline</option>
          <option value="progress">Accepted progress</option>
          <option value="title">Title</option>
        </Select>
        <div className="flex gap-2">
          <button
            type="button"
            aria-pressed={view === "card"}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface"
            onClick={() => setView("card")}
            aria-label="Card view"
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface"
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
      {visible.length === 0 ? (
        <EmptyState
          title="No studies in this view"
          body="Drafts, reviews, and live recruitment for this session will show up here."
          action={
            <Button asChild>
              <Link to="/researcher/create" search={{}}>Create a study</Link>
            </Button>
          }
        />
      ) : view === "card" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((study) => (
            <StudyAdminCard key={study.id} study={study} responses={responses} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-line text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Study</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Target</th>
                <th className="px-4 py-3 font-medium">Accepted</th>
                <th className="px-4 py-3 font-medium">Deadline</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((study) => {
                const snap = recruitmentSnapshot(
                  study,
                  responses.filter((item) => item.studyId === study.id),
                );
                return (
                  <tr key={study.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{study.title}</p>
                      <OriginNote origin={study.origin} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={study.status} />
                    </td>
                    <td className="px-4 py-3 tabular-nums">{study.targetCount || "—"}</td>
                    <td className="px-4 py-3 tabular-nums">{snap.accepted}</td>
                    <td className="px-4 py-3">{study.deadline ? formatDate(study.deadline) : "—"}</td>
                    <td className="px-4 py-3">
                      <StudyActionMenu study={study} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={Math.min(page, pages)} pages={pages} onPage={setPage} />
    </div>
  );
}

function StudyAdminCard({
  study,
  responses,
}: {
  study: Study;
  responses: ReturnType<typeof useDemoStore.getState>["responses"];
}) {
  const snap = recruitmentSnapshot(
    study,
    responses.filter((item) => item.studyId === study.id),
  );
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={study.status} />
        <OriginNote origin={study.origin} />
      </div>
      <h2 className="mt-3 font-display text-xl font-semibold">{study.title}</h2>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-ink-soft">Created</dt>
          <dd>{formatDate(study.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Deadline</dt>
          <dd>{study.deadline ? `${formatDate(study.deadline)} · ${deadlinePhrase(study.deadline)}` : "Not set"}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Target</dt>
          <dd className="tabular-nums">{study.targetCount || "—"}</dd>
        </div>
        <div>
          <dt className="text-ink-soft">Accepted</dt>
          <dd className="tabular-nums">{snap.accepted}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <ProgressBar value={snap.acceptedPercent} label="Accepted responses toward target" />
      </div>
      <div className="mt-4">
        <StudyActionMenu study={study} />
      </div>
    </Card>
  );
}

function StudyActionMenu({ study }: { study: Study }) {
  const actions = researcherActions(study.status);
  const [confirm, setConfirm] = useState<null | "submit" | "pause" | "resume" | "complete" | "open">(null);
  const [busy, setBusy] = useState(false);
  const server = useDataMode() === "server";
  const user = useSessionUser();
  async function run(kind: NonNullable<typeof confirm>) {
    if (!user) return;
    setBusy(true);
    const result =
      kind === "submit"
        ? await researchService.submitForReview(user.id, study.id)
        : kind === "pause"
          ? await researchService.setPaused(user.id, study.id, true)
          : kind === "resume"
            ? await researchService.setPaused(user.id, study.id, false)
            : kind === "complete"
              ? await researchService.completeStudy(user.id, study.id)
              : await researchService.openRecruitment(user.id, study.id);
    setBusy(false);
    setConfirm(null);
    if (result.ok) toast.success(result.message);
    else toast.error(result.error);
  }
  return (
    <>
      <Menu label="Actions">
        {actions.includes("view") ? (
          <MenuItem onSelect={() => undefined}>
            <Link to="/researcher/recruitment/$studyId" params={{ studyId: study.id }}>
              View details
            </Link>
          </MenuItem>
        ) : null}
        {actions.includes("edit") ? (
          <MenuItem onSelect={() => undefined}>
            <Link to="/researcher/create" search={{ studyId: study.id }}>
              Edit draft
            </Link>
          </MenuItem>
        ) : null}
        {actions.includes("progress") ? (
          <MenuItem onSelect={() => undefined}>
            <Link to="/researcher/recruitment/$studyId" params={{ studyId: study.id }}>
              View progress
            </Link>
          </MenuItem>
        ) : null}
        {actions.includes("submit") ? (
          <MenuItem onSelect={() => setConfirm("submit")}>Submit for review</MenuItem>
        ) : null}
        {actions.includes("open") ? (
          <MenuItem onSelect={() => setConfirm("open")}>Open recruitment</MenuItem>
        ) : null}
        {actions.includes("pause") ? (
          <MenuItem onSelect={() => setConfirm("pause")}>Pause recruitment</MenuItem>
        ) : null}
        {actions.includes("resume") ? (
          <MenuItem onSelect={() => setConfirm("resume")}>Resume recruitment</MenuItem>
        ) : null}
        {actions.includes("complete") ? (
          <MenuItem onSelect={() => setConfirm("complete")}>Mark completed</MenuItem>
        ) : null}
      </Menu>
      <ConfirmDialog
        open={confirm !== null}
        onOpenChange={(open) => {
          if (!open) setConfirm(null);
        }}
        title={
          confirm === "submit"
            ? "Submit this study for review?"
            : confirm === "open"
              ? "Open recruitment?"
              : confirm === "pause"
                ? "Pause recruitment?"
                : confirm === "resume"
                  ? "Resume recruitment?"
                  : "Mark this study completed?"
        }
        body={
          confirm === "submit"
            ? validateFullStudy(toForm(study)).title
              ? server
                ? "Some required fields are still empty. You can still try, and the form will explain what is missing."
                : "Some required fields are still empty. You can still try, and the form will explain what is missing. Nothing is sent to a server."
              : server
                ? "It will be marked Pending review on the server. It will not be public until it is approved and opened."
                : "It will be marked Pending review in this browser. It will not be public, and no email is sent."
            : server
              ? "This changes the record on the server."
              : "This updates demo data in this browser only."
        }
        confirmLabel="Confirm"
        busy={busy}
        onConfirm={() => confirm && run(confirm)}
      />
    </>
  );
}
