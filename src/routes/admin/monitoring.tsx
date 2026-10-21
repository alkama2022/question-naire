import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { MonitoringTable } from "@/components/workspace/views";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/admin/monitoring")({
  head: () => ({ meta: [{ title: "Monitoring · ResearchConnect Nigeria" }] }),
  component: () => {
    const server = useDataMode() === "server";
    return (
      <>
        <PageHeader
          title="Recruitment monitoring"
          description={
            server
              ? "Active and paused studies across the workspace, without participant contact details."
              : "Active and paused studies across the demo, without participant contact details."
          }
        />
        <MonitoringTable />
      </>
    );
  },
});
