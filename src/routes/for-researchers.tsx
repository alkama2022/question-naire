import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-researchers")({
  head: () => ({ meta: [{ title: "For researchers · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PageHeader
          title="For researchers"
          description="Built first for a final-year student running a questionnaire, and usable later by a postgraduate or a small team."
        />
        <div className="grid gap-4 text-sm leading-6">
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl font-semibold">What you do here</h2>
            <p className="mt-2 text-ink-soft">
              Describe the study, state who should and should not take part, paste the link to your
              existing questionnaire, and submit the request. After approval you open recruitment,
              pause it if needed, and label responses that need another look.
            </p>
          </section>
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl font-semibold">What you still do outside</h2>
            <p className="mt-2 text-ink-soft">
              Host the questionnaire. Ask your supervisor or ethics committee when your institution
              requires it. This platform does not grant that approval, and it does not pay incentives.
            </p>
          </section>
          <section className="rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-xl font-semibold">What you will not see</h2>
            <p className="mt-2 text-ink-soft">
              Participant email addresses are not listed on the recruitment page. Follow-up that
              needs a contact detail belongs in the questionnaire tool, under whatever consent you
              collected there.
            </p>
          </section>
        </div>
        <Button className="mt-8" asChild>
          <Link to="/register" search={{ role: "researcher" }}>
            Find Research Participants
          </Link>
        </Button>
      </div>
    </MarketingShell>
  );
}
