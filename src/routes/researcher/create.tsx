import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { CreateStudyForm } from "@/components/research/create-study";

export const Route = createFileRoute("/researcher/create")({
  validateSearch: (search: Record<string, unknown>): { studyId?: string } => ({
    studyId: typeof search.studyId === "string" ? search.studyId : undefined,
  }),
  head: () => ({ meta: [{ title: "Create study · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const { studyId } = Route.useSearch();
  return (
    <>
      <PageHeader
        title={studyId ? "Edit study" : "Create study"}
        description="Save a draft or submit for review. Submitting does not publish the study."
      />
      <CreateStudyForm studyId={studyId} />
    </>
  );
}
