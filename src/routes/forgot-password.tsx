import { createFileRoute, Link } from "@tanstack/react-router";
import { LocalPasswordForm } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const server = useDataMode() === "server";
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Forgot password"
          description={
            server
              ? "Enter your email address and the server sends a reset link."
              : "No reset email is sent. You can replace a demo password that already exists in this browser."
          }
        />
        <LocalPasswordForm />
        <p className="mt-4 text-sm">
          <Link to="/login" className="text-brand underline">
            Back to log in
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
