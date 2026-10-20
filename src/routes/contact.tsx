import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/account/panels";
import { MarketingShell, PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-xl px-4 py-12">
        <PageHeader
          title="Contact"
          description="Messages stay in the demo inbox on this browser. No email is sent."
        />
        <ContactForm />
      </div>
    </MarketingShell>
  );
}
