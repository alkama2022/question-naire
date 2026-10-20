import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-6">
        <PageHeader
          title="Privacy policy"
          description="A draft for this product. It is not legal advice."
        />
        <div className="grid gap-4 text-ink-soft">
          <p>
            In this demo, the information you type — name, email, password, study text, consent, and
            messages — stays in this browser. Passwords are not encrypted. Do not use a password you
            use anywhere else.
          </p>
          <p>
            Participant email addresses are not shown on public pages or on a researcher's
            recruitment table. Reports you submit are visible in the admin preview on the same
            browser, including the email you typed.
          </p>
          <p>
            A future hosted version would need a real privacy notice: what is stored on a server,
            who can see it, how long it is kept, and how a person asks for it to be deleted. That
            server, and that process, are not running here.
          </p>
          <p>
            Sample studies use fictional project descriptions. They are not records of real
            participants.
          </p>
        </div>
      </article>
    </MarketingShell>
  );
}
