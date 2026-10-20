import { createFileRoute } from "@tanstack/react-router";
import { VerifyEmailPanel } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify email · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Email verification"
          description="Shown so the state is visible. Nothing is sent, and nothing is verified with an inbox."
        />
        <VerifyEmailPanel />
      </div>
    </MarketingShell>
  );
}
