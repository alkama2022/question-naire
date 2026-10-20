import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPanel } from "@/components/account/panels";
import { PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/researcher/notifications")({
  head: () => ({ meta: [{ title: "Notifications · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Notifications" description="In-app notices only. No email is sent." />
      <NotificationsPanel />
    </>
  ),
});
