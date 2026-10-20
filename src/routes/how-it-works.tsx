import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [{ title: "How it works · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PageHeader
          title="How ResearchConnect works"
          description="Four plain steps. The questionnaire stays in the tool you already use."
        />
        <ol className="grid gap-4">
          {[
            ["Write the request", "A researcher enters the title, purpose, who can take part, a deadline, and the questionnaire link."],
            ["Submit for review", "The study stays off the public list. A reviewer can approve it, reject it with a reason, or send it back."],
            ["Open recruitment", "After approval, the researcher chooses when it becomes visible. Participants read the study, answer eligibility questions, and consent or decline."],
            ["Track the record", "Recruited people, completed questionnaires, and accepted responses are counted separately. A label such as Accepted is a decision, not proof the answer is genuine."],
          ].map(([title, body], index) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-accent">Step {index + 1}</p>
              <h2 className="mt-1 font-display text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/register" search={{}}>Create a demo session</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/studies">Browse open studies</Link>
          </Button>
        </div>
      </div>
    </MarketingShell>
  );
}
