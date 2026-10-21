import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const server = useDataMode() === "server";
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-6">
        <PageHeader
          title="Privacy policy"
          description="A draft for this product. It is not legal advice."
        />
        <div className="grid gap-4 text-ink-soft">
          {server ? (
            <>
              <p>
                Your account — name, email, hashed password, study text, consent, and messages — is
                stored on the server. It is the same on every device you sign in from, and it is
                visible to you and to the people whose workspace it belongs to.
              </p>
              <p>
                Participant email addresses are not shown on public pages or on a researcher&apos;s
                recruitment table. Reports you submit are visible to an administrator, including
                the email you typed.
              </p>
              <p>
                Withdrawing from a study records the withdrawal and marks the response as
                withdrawn. It does not delete anything already sent to an external questionnaire
                tool, and it does not delete the audit log.
              </p>
              <p>
                A real privacy notice still needs to say what is kept, who can see it, how long it
                is kept, and how a person asks for it to be deleted. That process is not automated
                here.
              </p>
            </>
          ) : (
            <>
              <p>
                In this demo, the information you type — name, email, password, study text, consent,
                and messages — stays in this browser. Passwords are not encrypted. Do not use a
                password you use anywhere else.
              </p>
              <p>
                Participant email addresses are not shown on public pages or on a researcher&apos;s
                recruitment table. Reports you submit are visible in the admin preview on the same
                browser, including the email you typed.
              </p>
              <p>
                A future hosted version would need a real privacy notice: what is stored on a
                server, who can see it, how long it is kept, and how a person asks for it to be
                deleted. That server, and that process, are not running here.
              </p>
            </>
          )}
          <p>
            Sample studies use fictional project descriptions. They are not records of real
            participants.
          </p>
        </div>
      </article>
    </MarketingShell>
  );
}
