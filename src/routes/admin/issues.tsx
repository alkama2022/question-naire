import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { IssuesPanel } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/issues")({
  head: () => ({ meta: [{ title: "Reported issues · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Reported issues" description="Contact messages and study reports saved in this browser." />
      <IssuesPanel />
    </>
  ),
});
