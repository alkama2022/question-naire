import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardCheck, MessagesSquare, ShieldCheck } from "lucide-react";
import { MarketingShell, OriginNote } from "@/components/layout/shells";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, ProgressBar } from "@/components/ui/card";
import { deadlinePhrase } from "@/lib/research/format";
import { isPublicStudy, recruitmentSnapshot } from "@/lib/research/metrics";
import { useDemoQuery } from "@/lib/research/store";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const server = useDataMode() === "server";
  return (
    <MarketingShell>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">
            For Nigerian student and campus research
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Recruit the right participants, and keep a record of it.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            Final-year projects often live in class WhatsApp groups: no list of who was eligible,
            no separation between people who opened a form and responses you are willing to keep.
            ResearchConnect is a simpler place to describe a study, share the questionnaire you
            already use, and watch the numbers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/register" search={{ role: "researcher" }}>
                Find Research Participants
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/studies">Explore Studies</Link>
            </Button>
          </div>
        </div>
        <SampleDashboard />
      </section>

      <OpenStudies />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="font-display text-3xl font-semibold">How it works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Describe the study", "Title, purpose, who can take part, and the survey link you already have."],
            ["02", "Wait for a basic review", "A request is not public until someone reviews it. You cannot publish it yourself."],
            ["03", "Track three different counts", "People recruited, questionnaires marked complete, and responses accepted are not the same thing."],
          ].map(([step, title, body]) => (
            <li key={step} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-display text-2xl text-accent">{step}</p>
              <h3 className="mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-2xl font-semibold">For researchers</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <Item icon={ClipboardCheck} text="Write eligibility in plain language before anyone is asked to join." />
            <Item icon={MessagesSquare} text="Keep the questionnaire in Google Forms, Microsoft Forms, or whatever you already use." />
            <Item icon={ShieldCheck} text="See drafts, reviews, pauses, and completions without mixing them into one vague total." />
          </ul>
          <Button className="mt-5" variant="secondary" asChild>
            <Link to="/for-researchers">See the researcher workflow</Link>
          </Button>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-2xl font-semibold">For participants</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <Item icon={ClipboardCheck} text="Read what the study involves before any consent box." />
            <Item icon={MessagesSquare} text="Decline, or withdraw later, without hunting through a group chat." />
            <Item icon={ShieldCheck} text="Your email is not shown on the researcher's recruitment list." />
          </ul>
          <Button className="mt-5" variant="secondary" asChild>
            <Link to="/for-participants">See what participants do</Link>
          </Button>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <Card className="p-6">
          <h2 className="font-display text-2xl font-semibold">What a quality check can and cannot do</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium">It can</h3>
              <ul className="mt-2 grid gap-2 text-sm text-ink-soft">
                <li>Show recruited, completed, and accepted counts separately.</li>
                <li>Label a record Pending, Accepted, Excluded, or Needs review.</li>
                <li>Keep drafts and unapproved requests off the public list.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">It cannot</h3>
              <ul className="mt-2 grid gap-2 text-sm text-ink-soft">
                <li>Prove that an answer is honest or that a person is who they say they are.</li>
                <li>Replace ethics approval, a supervisor, or a department.</li>
                <li>Judge whether a questionnaire is scientifically valid.</li>
                <li>Pull live results from an external form in this version.</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl bg-brand px-6 py-10 text-brand-foreground sm:px-10">
          <h2 className="font-display text-3xl font-semibold">Start with the study you already have in mind.</h2>
          <p className="mt-3 max-w-2xl text-brand-foreground/80">
            {server
              ? "Accounts and records are held on the server, so a study request, a consent, and a recruitment count are the same on every device you sign in from."
              : "This version runs as a clearly labelled demo in your browser. It is enough to walk through recruitment before any server is connected."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="accent" asChild>
              <Link to="/register" search={{ role: "researcher" }}>
                Find Research Participants
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/how-it-works">How it works</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function OpenStudies() {
  const server = useDataMode() === "server";
  const studies = useDemoQuery((state) => state.studies.filter((study) => isPublicStudy(study.status)));
  const users = useDemoQuery((state) => state.users);
  const visible = studies.slice(0, 3);
  return (
    <section className="mx-auto max-w-6xl px-4 py-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl font-semibold">Studies you can open now</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            {server
              ? "These are labelled sample records kept on the server. Drafts and studies still in review are not shown."
              : "These are labelled sample records stored in this browser. Drafts and studies still in review are not shown."}
          </p>
        </div>
        <Button variant="secondary" asChild>
          <Link to="/studies">Browse all</Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {visible.map((study) => {
          const owner = users.find((user) => user.id === study.ownerId);
          return (
            <Card key={study.id} className="flex flex-col p-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={study.status} />
                <OriginNote origin={study.origin} />
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold">{study.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{study.purpose}</p>
              <p className="mt-3 text-sm">
                {owner?.institution ?? "Student project"} · {study.completionMinutes} min · {deadlinePhrase(study.deadline)}
              </p>
              <div className="mt-4">
                <Button variant="secondary" asChild>
                  <Link to="/studies/$studyId" params={{ studyId: study.id }}>
                    View study
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Item({
  icon: Icon,
  text,
}: {
  icon: typeof ClipboardCheck;
  text: string;
}) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <span>{text}</span>
    </li>
  );
}

function SampleDashboard() {
  const study = useDemoQuery((state) => state.studies.find((item) => item.id === "stu-sleep"));
  const responses = useDemoQuery((state) => state.responses.filter((item) => item.studyId === "stu-sleep"));
  const snap = study ? recruitmentSnapshot(study, responses) : null;
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm" aria-label="Sample dashboard preview using demonstration numbers">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-brand px-4 py-2 text-xs font-semibold tracking-wide text-brand-foreground uppercase">
        Sample preview
        <span>Not live data</span>
      </figcaption>
      <div className="grid sm:grid-cols-[7.5rem_1fr]">
        <div className="hidden border-r border-line bg-canvas p-3 text-xs text-ink-soft sm:block">
          <p className="font-medium text-brand">Overview</p>
          <p className="mt-2">My studies</p>
          <p className="mt-2">Recruitment</p>
          <p className="mt-2">Reports</p>
        </div>
        <div className="p-4">
          <p className="text-sm text-ink-soft">Active study</p>
          <p className="mt-1 font-display text-lg font-semibold">
            {study?.title ?? "Social media use and sleep quality among undergraduates"}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Mini label="Recruited" value={snap?.eligible ?? 0} />
            <Mini label="Completed" value={snap?.completed ?? 0} />
            <Mini label="Accepted" value={snap?.accepted ?? 0} />
          </div>
          <div className="mt-4">
            <ProgressBar value={snap?.acceptedPercent ?? 0} label="Accepted toward target" />
          </div>
        </div>
      </div>
    </figure>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-canvas px-2 py-3">
      <p className="font-display text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-ink-soft">{label}</p>
    </div>
  );
}