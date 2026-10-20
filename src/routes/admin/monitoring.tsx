import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { MonitoringTable } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/monitoring")({
  head: () => ({ meta: [{ title: "Monitoring · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Recruitment monitoring" description="Active and paused studies across the demo, without participant contact details." />
      <MonitoringTable />
    </>
  ),
});
