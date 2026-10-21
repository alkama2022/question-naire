import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const server = useDataMode() === "server";
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Log in"
          description={
            server
              ? "Sign in to your account. Your studies, applications and notices are the same on every device you sign in from."
              : "Demo sessions only. This does not create a secure account, and no server checks the password."
          }
        />
        <LoginForm />
        <p className="mt-4 text-sm text-ink-soft">
          New here?{" "}
          <Link to="/register" search={{}} className="font-medium text-brand underline">
            Register
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
