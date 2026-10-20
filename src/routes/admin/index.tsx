import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { AdminOverview } from "@/components/workspace/views";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin workspace · ResearchConnect Nigeria" }] }),
  component: () => {
    const server = useDataMode() === "server";
    return (
      <>
        <PageHeader
          title="Admin overview"
          description={
            server
              ? "Review and monitoring for this workspace. Every action here is authorized on the server and written to the audit log."
              : "A local preview of review and monitoring. Not a production admin account."
          }
        />
        <AdminOverview />
      </>
    );
  },
});
