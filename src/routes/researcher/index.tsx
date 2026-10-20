import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ResearcherOverview } from "@/components/workspace/views";

export const Route = createFileRoute("/researcher/")({
  head: () => ({ meta: [{ title: "Overview · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader
        title="Overview"
        description="Counts from the demo records in this browser, including labelled sample studies."
      />
      <ResearcherOverview />
    </>
  ),
});
