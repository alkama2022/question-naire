import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { RecruitmentList } from "@/components/research/recruitment-panel";
import { useSessionUser } from "@/lib/research/store";

export const Route = createFileRoute("/researcher/recruitment/")({
  head: () => ({ meta: [{ title: "Recruitment · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const user = useSessionUser();
  if (!user) return null;
  return (
    <>
      <PageHeader
        title="Recruitment tracking"
        description="Recruited, completed, and accepted are separate. Completion is marked by hand because external forms are not connected."
      />
      <RecruitmentList ownerId={user.id} />
    </>
  );
}
