import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ReportsPanel } from "@/components/workspace/views";

export const Route = createFileRoute("/researcher/reports")({
  head: () => ({ meta: [{ title: "Reports · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader
        title="Reports and exports"
        description="Export permitted study counts. Participant contact details are not in the file."
      />
      <ReportsPanel />
    </>
  ),
});
