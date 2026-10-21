import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const server = useDataMode() === "server";
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
          {server ? (
            <>
              <p>
                Records are kept on the server so that a study and its recruitment record survive a
                device change. You can withdraw from a study while it is open; the record of that
                withdrawal stays, because the researcher has to be able to account for it.
              </p>
              <p>
                Administrator actions are authorized on the server and written to an audit log.
                Administrator access is granted by the operator, never from the browser.
              </p>
            </>
          ) : (
            <>
              <p>
                The demo stores data locally and can be cleared by the browser or by the reset
                control. Do not treat it as a permanent archive of a real project.
              </p>
              <p>Administrative controls in the preview are not a production authorization system.</p>
            </>
          )}
        </div>
      </article>
    </MarketingShell>
  );
}
