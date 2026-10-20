import { createFileRoute, Link } from "@tanstack/react-router";
import { StudyDetail } from "@/components/research/study-detail";

export const Route = createFileRoute("/participant/studies/$studyId")({
  head: () => ({ meta: [{ title: "Study · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const { studyId } = Route.useParams();
  return (
    <>
      <p className="mb-4 text-sm">
        <Link to="/participant/studies" className="text-brand underline">
          Back to studies
        </Link>
      </p>
      <StudyDetail studyId={studyId} />
    </>
  );
}
