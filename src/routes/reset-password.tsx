import { createFileRoute, Link } from "@tanstack/react-router";
import { LocalPasswordForm } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Reset password"
          description="Email links are not issued in demo mode. Use the local form if the account exists in this browser."
        />
        <LocalPasswordForm />
        <p className="mt-4 text-sm">
          <Link to="/forgot-password" className="text-brand underline">
            Forgot password
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
