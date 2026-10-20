import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { AuditList } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({ meta: [{ title: "Audit history · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader
        title="Audit history"
        description="A local log of demo actions. Resetting demo data clears it. A production log would need to be append-only on a server."
      />
      <AuditList />
    </>
  ),
});
