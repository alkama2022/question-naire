import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-6">
        <PageHeader
          title="Terms of service"
          description="Draft terms for version 1. Not legal advice."
        />
        <div className="grid gap-4 text-ink-soft">
          <p>
            ResearchConnect Nigeria helps people describe a study and track recruitment. It does not
            guarantee that a sample is valid, that responses are truthful, or that a project has
            ethics approval.
          </p>
          <p>
            Researchers are responsible for the claims they make, the questionnaire they link, and
            any incentive they mention. Do not promise a reward that has not been confirmed.
          </p>
          <p>
            Participants take part only if they choose to. Declining or withdrawing must not be
            described on this platform as affecting a grade.
          </p>
          <p>
            The demo stores data locally and can be cleared by the browser or by the reset control.
            Do not treat it as a permanent archive of a real project.
          </p>
          <p>Administrative controls in the preview are not a production authorization system.</p>
        </div>
      </article>
    </MarketingShell>
  );
}
