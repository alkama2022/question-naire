import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ApplicationsList } from "@/components/workspace/views";

export const Route = createFileRoute("/participant/applications")({
  head: () => ({ meta: [{ title: "My applications · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="My applications" description="Consent, decline, and withdrawal records from this browser." />
      <ApplicationsList />
    </>
  ),
});
