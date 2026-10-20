import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/for-participants")({
  head: () => ({ meta: [{ title: "For participants · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PageHeader
          title="For participants"
          description="See what a study is asking before you agree, and leave if you change your mind."
        />
        <ul className="grid gap-3 text-sm leading-6">
          {[
            "Each public study shows the purpose, who can take part, how long it takes, the deadline, and whether any incentive is actually confirmed.",
            "You answer a short eligibility check. If it is not a fit, you are not pushed into consent.",
            "Consent is separate from browsing. You can decline.",
            "If you have consented and the study is still open, you can withdraw. That does not delete answers already stored in an external form.",
            "Nothing here is a promise of payment, airtime, or extra marks.",
          ].map((item) => (
            <li key={item} className="rounded-xl border border-line bg-surface p-4">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/studies">Explore Studies</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/register" search={{ role: "participant" }}>
              Register as a participant
            </Link>
          </Button>
        </div>
      </div>
    </MarketingShell>
  );
}
