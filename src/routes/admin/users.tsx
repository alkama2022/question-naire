import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { UserAdmin } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader
        title="User management"
        description="You can suspend a demo account. You cannot promote anyone to administrator from this screen."
      />
      <UserAdmin />
    </>
  ),
});
