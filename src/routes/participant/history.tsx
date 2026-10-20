import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ApplicationsList } from "@/components/workspace/views";

export const Route = createFileRoute("/participant/history")({
  head: () => ({ meta: [{ title: "History · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader
        title="Participation history"
        description="Declines, withdrawals, and consents on studies that are already closed."
      />
      <ApplicationsList history />
    </>
  ),
});
