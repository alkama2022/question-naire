import { createFileRoute } from "@tanstack/react-router";
import { SettingsPanel } from "@/components/account/panels";
import { PageHeader } from "@/components/layout/shells";

export const Route = createFileRoute("/participant/settings")({
  head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Account settings" description="Profile, notice preferences, and demo reset." />
      <SettingsPanel />
    </>
  ),
});
