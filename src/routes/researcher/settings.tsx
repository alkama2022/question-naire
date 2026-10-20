import { createFileRoute } from "@tanstack/react-router";
import { SettingsPanel } from "@/components/account/panels";
import { PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/researcher/settings")({
  head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Settings" description="Profile and preferences for this browser session." />
      <SettingsPanel />
    </>
  ),
});
