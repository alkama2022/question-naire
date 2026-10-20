import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorNote } from "@/components/ui/feedback";
import { Checkbox, Field, Input, Textarea } from "@/components/ui/field";
import { Modal } from "@/components/ui/overlay";
import { OriginNote } from "@/components/layout/shells";
import { deadlinePhrase, formatDate, researcherLabel } from "@/lib/research/format";
import { useDemoStore, useSessionUser } from "@/lib/research/store";
import { contactSchema } from "@/lib/research/validators";

export function StudyDetail({ studyId }: { studyId: string }) {
  const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
  const owner = useDemoStore((state) => state.users.find((user) => user.id === study?.ownerId));
  const user = useSessionUser();
  const application = useDemoStore((state) =>
    state.applications.find((item) => item.studyId === studyId && item.participantId === user?.id),
  );
  const [reportOpen, setReportOpen] = useState(false);
  if (!study || (study.status !== "active" && study.status !== "paused" && study.status !== "completed" && user?.role !== "admin" && user?.id !== study.ownerId)) {
    if (!study) {
      return (
        <ErrorNote
          title="Study not in this browser"
          body="It may have been cleared when demo data was reset. Browse the studies that are still stored here."
        />
      );
    }
  }
  if (!study) return null;
  const closedToPublic =
    study.status !== "active" &&
    study.status !== "paused" &&
    study.status !== "completed" &&
    user?.id !== study.ownerId &&
    user?.role !== "admin";
  if (closedToPublic) {
    return (
      <ErrorNote
        title="This study is not public"
        body="Drafts and studies still in review stay off the public list."
      />
    );
  }
  return (
    <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={study.status} />
          <Badge>{study.category || "Uncategorised"}</Badge>
          <OriginNote origin={study.origin} />
        </div>
        <header>
          <h1 className="font-display text-3xl font-semibold">{study.title}</h1>
          <p className="mt-3 text-ink-soft">{study.purpose}</p>
        </header>
        <Card className="p-5">
          <h2 className="font-display text-xl font-semibold">What participation involves</h2>
          <p className="mt-2 text-sm leading-6">{study.description}</p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-ink-soft">Researcher or institution</dt>
              <dd>{researcherLabel(owner?.name ?? "", study.institution)}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Estimated time</dt>
              <dd>{study.completionMinutes ? `${study.completionMinutes} minutes` : "Not stated"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Deadline</dt>
              <dd>
                {study.deadline ? `${formatDate(study.deadline)} · ${deadlinePhrase(study.deadline)}` : "Not set"}
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Location</dt>
              <dd>{study.location || "Not restricted"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Who can take part</dt>
              <dd>{study.inclusion || "Not stated yet"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Who should not take part</dt>
              <dd>{study.exclusion || "None stated"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Age range</dt>
              <dd>
                {study.ageMin && study.ageMax ? `${study.ageMin}–${study.ageMax}` : "Not used as a criterion"}
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Incentive</dt>
              <dd>{study.incentive || "No incentive has been confirmed."}</dd>
            </div>
          </dl>
          {study.extraQuestions ? (
            <p className="mt-4 text-sm">
              <span className="font-medium">Extra eligibility question: </span>
              {study.extraQuestions}
            </p>
          ) : null}
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-xl font-semibold">Information statement</h2>
          <p className="mt-2 text-sm leading-6">
            {study.informationStatement || "The researcher has not written an information statement yet."}
          </p>
          <p className="mt-3 text-sm text-ink-soft">
            The questionnaire, if linked, is hosted outside ResearchConnect. This page does not submit
            answers to that form for you.
          </p>
          {study.questionnaireUrl && application?.status === "consented" ? (
            <p className="mt-3 text-sm">
              Questionnaire link:{" "}
              <a className="font-medium text-brand underline" href={study.questionnaireUrl} target="_blank" rel="noreferrer">
                {study.questionnaireUrl}
              </a>
            </p>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">
              The questionnaire link is shown after you consent, and only while the study is open.
            </p>
          )}
        </Card>
        <button type="button" className="text-left text-sm font-medium text-brand underline" onClick={() => setReportOpen(true)}>
          Report a problem with this study
        </button>
      </div>
      <ParticipationCard studyId={study.id} />
      <ReportDialog open={reportOpen} onOpenChange={setReportOpen} studyId={study.id} title={study.title} />
    </article>
  );
}

function ParticipationCard({ studyId }: { studyId: string }) {
  const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
  const user = useSessionUser();
  const application = useDemoStore((state) =>
    state.applications.find((item) => item.studyId === studyId && item.participantId === user?.id),
  );
  const [ageOk, setAgeOk] = useState(false);
  const [includeOk, setIncludeOk] = useState(false);
  const [excludeOk, setExcludeOk] = useState(false);
  const [readOk, setReadOk] = useState(false);
  const [voluntaryOk, setVoluntaryOk] = useState(false);
  const [withdrawOk, setWithdrawOk] = useState(false);
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  if (!study) return null;
  if (!user) {
    return (
      <Card className="h-fit p-5">
        <h2 className="font-display text-xl font-semibold">Want to take part?</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Use a participant demo session. Researcher accounts cannot enrol themselves, and there is no
          secure login in this demo.
        </p>
        <div className="mt-4 grid gap-2">
          <Button asChild>
            <Link to="/register" search={{ role: "participant" }}>
              Register as a participant
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </Card>
    );
  }
  if (user.role !== "participant") {
    return (
      <Card className="h-fit p-5">
        <h2 className="font-display text-xl font-semibold">Participant consent</h2>
        <p className="mt-2 text-sm text-ink-soft">
          This session is a {user.role}. Open a participant session to screen and consent. Your own
          studies are managed from the researcher workspace.
        </p>
      </Card>
    );
  }
  if (application?.status === "consented") {
    return (
      <Card className="h-fit p-5">
        <h2 className="font-display text-xl font-semibold">You consented</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Recorded in this browser on {formatDate(application.updatedAt)}. You can withdraw while the
          study is still open. Withdrawing does not delete anything already stored in an external
          questionnaire.
        </p>
        {study.status !== "completed" ? (
          <Button
            className="mt-4"
            variant="secondary"
            busy={busy}
            onClick={() => {
              setBusy(true);
              const result = useDemoStore.getState().withdrawFromStudy(user.id, study.id);
              setBusy(false);
              if (result.ok) toast.success(result.message);
              else toast.error(result.error);
            }}
          >
            Withdraw
          </Button>
        ) : (
          <p className="mt-3 text-sm">This study is closed.</p>
        )}
      </Card>
    );
  }
  if (application?.status === "withdrawn") {
    return (
      <Card className="h-fit p-5">
        <h2 className="font-display text-xl font-semibold">You withdrew</h2>
        <p className="mt-2 text-sm text-ink-soft">
          That decision is stored in this browser. You can consent again only if the study is still
          active.
        </p>
        {study.status === "active" ? (
          <p className="mt-3 text-sm">Use the screening below if you want to rejoin.</p>
        ) : null}
        {study.status !== "active" ? null : (
          <Screening
            studyHasAge={Boolean(study.ageMin && study.ageMax)}
            ageOk={ageOk}
            setAgeOk={setAgeOk}
            includeOk={includeOk}
            setIncludeOk={setIncludeOk}
            excludeOk={excludeOk}
            setExcludeOk={setExcludeOk}
            readOk={readOk}
            setReadOk={setReadOk}
            voluntaryOk={voluntaryOk}
            setVoluntaryOk={setVoluntaryOk}
            withdrawOk={withdrawOk}
            setWithdrawOk={setWithdrawOk}
            agree={agree}
            setAgree={setAgree}
            busy={busy}
            onConsent={() => {
              setBusy(true);
              const result = useDemoStore.getState().consentToStudy(user.id, study.id);
              setBusy(false);
              if (result.ok) toast.success(result.message);
              else toast.error(result.error);
            }}
            onDecline={() => {
              setBusy(true);
              const result = useDemoStore.getState().declineStudy(user.id, study.id);
              setBusy(false);
              if (result.ok) toast.success(result.message);
              else toast.error(result.error);
            }}
          />
        )}
      </Card>
    );
  }
  if (study.status !== "active") {
    return (
      <Card className="h-fit p-5">
        <h2 className="font-display text-xl font-semibold">Not open</h2>
        <p className="mt-2 text-sm text-ink-soft">
          {study.status === "paused"
            ? "Recruitment is paused. You can read the study, but new consent is not being taken."
            : "This study is closed to new participants."}
        </p>
        {application?.status === "declined" ? (
          <p className="mt-3 text-sm">You previously declined. That note stays in this browser.</p>
        ) : null}
      </Card>
    );
  }
  const eligible = includeOk && excludeOk && (!study.ageMin || ageOk);
  return (
    <Card className="h-fit p-5">
      <h2 className="font-display text-xl font-semibold">Eligibility and consent</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Answer honestly. This screen does not prove that a response is truthful.
      </p>
      {application?.status === "declined" ? (
        <p className="mt-3 text-sm">You declined earlier. You can still consent if the study fits.</p>
      ) : null}
      <Screening
        studyHasAge={Boolean(study.ageMin && study.ageMax)}
        ageOk={ageOk}
        setAgeOk={setAgeOk}
        includeOk={includeOk}
        setIncludeOk={setIncludeOk}
        excludeOk={excludeOk}
        setExcludeOk={setExcludeOk}
        readOk={readOk}
        setReadOk={setReadOk}
        voluntaryOk={voluntaryOk}
        setVoluntaryOk={setVoluntaryOk}
        withdrawOk={withdrawOk}
        setWithdrawOk={setWithdrawOk}
        agree={agree}
        setAgree={setAgree}
        busy={busy}
        blocked={!eligible}
        onConsent={() => {
          if (!eligible || !readOk || !voluntaryOk || !withdrawOk || !agree) {
            toast.error("Complete the eligibility answers and all consent statements first.");
            return;
          }
          setBusy(true);
          const result = useDemoStore.getState().consentToStudy(user.id, study.id);
          setBusy(false);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
        }}
        onDecline={() => {
          setBusy(true);
          const result = useDemoStore.getState().declineStudy(user.id, study.id);
          setBusy(false);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
        }}
      />
    </Card>
  );
}

function Screening(props: {
  studyHasAge: boolean;
  ageOk: boolean;
  setAgeOk: (value: boolean) => void;
  includeOk: boolean;
  setIncludeOk: (value: boolean) => void;
  excludeOk: boolean;
  setExcludeOk: (value: boolean) => void;
  readOk: boolean;
  setReadOk: (value: boolean) => void;
  voluntaryOk: boolean;
  setVoluntaryOk: (value: boolean) => void;
  withdrawOk: boolean;
  setWithdrawOk: (value: boolean) => void;
  agree: boolean;
  setAgree: (value: boolean) => void;
  busy: boolean;
  blocked?: boolean;
  onConsent: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="mt-4 grid gap-3">
      {props.studyHasAge ? (
        <Checkbox checked={props.ageOk} onCheckedChange={props.setAgeOk} label="I am inside the age range for this study." />
      ) : null}
      <Checkbox
        checked={props.includeOk}
        onCheckedChange={props.setIncludeOk}
        label="I meet the inclusion criteria described above."
      />
      <Checkbox
        checked={props.excludeOk}
        onCheckedChange={props.setExcludeOk}
        label="None of the exclusion criteria apply to me."
      />
      {!props.blocked ? (
        <>
          <Checkbox checked={props.readOk} onCheckedChange={props.setReadOk} label="I have read the information statement." />
          <Checkbox
            checked={props.voluntaryOk}
            onCheckedChange={props.setVoluntaryOk}
            label="I understand that participation is voluntary."
          />
          <Checkbox
            checked={props.withdrawOk}
            onCheckedChange={props.setWithdrawOk}
            label="I understand that I can withdraw while the study is open."
          />
          <Checkbox checked={props.agree} onCheckedChange={props.setAgree} label="I agree to take part." />
        </>
      ) : (
        <p className="text-sm text-ink-soft">Consent stays closed until the eligibility answers are yes.</p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <Button busy={props.busy} onClick={props.onConsent} disabled={props.blocked}>
          I agree to take part
        </Button>
        <Button variant="secondary" busy={props.busy} onClick={props.onDecline}>
          I decline
        </Button>
      </div>
    </div>
  );
}

function ReportDialog({
  open,
  onOpenChange,
  studyId,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studyId: string;
  title: string;
}) {
  const user = useSessionUser();
  const [subject, setSubject] = useState(`Problem with: ${title}`);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Report a problem" description="This stays in the demo inbox on this browser. It is not emailed.">
      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          const parsed = contactSchema.safeParse({
            name: user?.name || "Anonymous",
            email: user?.email || "not-provided@demo.local",
            subject,
            message: body,
          });
          if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? "Check the report");
            return;
          }
          const result = useDemoStore.getState().addIssue({
            source: "report",
            name: parsed.data.name,
            email: parsed.data.email,
            subject: parsed.data.subject,
            body: parsed.data.message,
            studyId,
          });
          if (result.ok) {
            toast.success(result.message);
            onOpenChange(false);
            setBody("");
          } else toast.error(result.error);
        }}
      >
        <Field label="Subject" htmlFor="report-subject" error={error}>
          <Input id="report-subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
        </Field>
        <Field label="What happened?" htmlFor="report-body">
          <Textarea id="report-body" value={body} onChange={(event) => setBody(event.target.value)} />
        </Field>
        <Button type="submit">Save report in this browser</Button>
      </form>
    </Modal>
  );
}
