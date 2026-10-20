import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ParticipantOverview } from "@/components/workspace/views";

export const Route = createFileRoute("/participant/")({
  head: () => ({ meta: [{ title: "Participant · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader
        title="Your participant workspace"
        description="Open studies and your own consent history, stored in this browser."
      />
      <ParticipantOverview />
    </>
  ),
});
