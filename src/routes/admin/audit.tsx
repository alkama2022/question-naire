import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { AuditList } from "@/components/workspace/views";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({ meta: [{ title: "Audit history · ResearchConnect Nigeria" }] }),
  component: () => {
    const server = useDataMode() === "server";
    return (
      <>
        <PageHeader
          title="Audit history"
          description={
            server
              ? "Every administrative action is written here, on the server, with who did it and when."
              : "A local log of demo actions. Resetting demo data clears it. A production log would need to be append-only on a server."
          }
        />
        <AuditList />
      </>
    );
  },
});
