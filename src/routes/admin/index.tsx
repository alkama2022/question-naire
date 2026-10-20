import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { AdminOverview } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin preview · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Admin overview" description="A local preview of review and monitoring. Not a production admin account." />
      <AdminOverview />
    </>
  ),
});
