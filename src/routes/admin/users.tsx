import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { UserAdmin } from "@/components/workspace/views";
import { useDataMode } from "@/lib/research/use-data-mode";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users · ResearchConnect Nigeria" }] }),
  component: () => {
    const server = useDataMode() === "server";
    return (
      <>
        <PageHeader
          title="User management"
          description={
            server
              ? "You can suspend an account. The account then cannot sign in. You cannot promote anyone to administrator from this screen."
              : "You can suspend a demo account. You cannot promote anyone to administrator from this screen."
          }
        />
        <UserAdmin />
      </>
    );
  },
});
