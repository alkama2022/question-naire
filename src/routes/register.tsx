import { createFileRoute, Link } from "@tanstack/react-router";
import { RegisterForm } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): { role?: "researcher" | "participant" } => {
    const role = search.role;
    if (role === "researcher" || role === "participant") return { role };
    return {};
  },
  head: () => ({ meta: [{ title: "Register · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const { role } = Route.useSearch();
  const server = useDataMode() === "server";
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Register"
          description={
            server
              ? "Create an account. Choose researcher or participant — administrator access is granted by the operator, not here."
              : "Choose a role for this browser session. Admin access is not offered here."
          }
        />
        <RegisterForm initialRole={role} />
        <p className="mt-4 text-sm text-ink-soft">
          {server ? "Already have an account?" : "Already have a demo session?"}{" "}
          <Link to="/login" className="font-medium text-brand underline">
            Log in
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
