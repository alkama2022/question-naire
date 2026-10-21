import { createFileRoute } from "@tanstack/react-router";
import { SettingsPanel } from "@/components/account/panels";
import { PageHeader } from "@/components/layout/shells";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/participant/settings")({
  head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
  component: () => {
    const server = useDataMode() === "server";
    return (
      <>
        <PageHeader
          title="Account settings"
          description={
            server
              ? "Your profile and notice preferences. They are the same on every device you sign in from."
              : "Profile, notice preferences, and demo reset."
          }
        />
        <SettingsPanel />
      </>
    );
  },
});
