import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ResearcherOverview } from "@/components/workspace/views";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/researcher/")({
  head: () => ({ meta: [{ title: "Overview · ResearchConnect Nigeria" }] }),
  component: () => {
    const server = useDataMode() === "server";
    return (
      <>
        <PageHeader
          title="Overview"
          description={
            server
              ? "Counts from your records on the server, including labelled sample studies."
              : "Counts from the demo records in this browser, including labelled sample studies."
          }
        />
        <ResearcherOverview />
      </>
    );
  },
});
