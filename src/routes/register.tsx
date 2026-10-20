import { createFileRoute, Link } from "@tanstack/react-router";
import { RegisterForm } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";

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
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Register"
          description="Choose a role for this browser session. Admin access is not offered here."
        />
        <RegisterForm initialRole={role} />
        <p className="mt-4 text-sm text-ink-soft">
          Already have a demo session?{" "}
          <Link to="/login" className="font-medium text-brand underline">
            Log in
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
