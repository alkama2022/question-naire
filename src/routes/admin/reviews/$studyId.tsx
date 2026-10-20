import { createFileRoute, Link } from "@tanstack/react-router";
import { ReviewDetail } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/reviews/$studyId")({
  head: () => ({ meta: [{ title: "Review study · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const { studyId } = Route.useParams();
  return (
    <>
      <p className="mb-4 text-sm">
        <Link to="/admin/reviews" className="text-brand underline">
          Pending requests
        </Link>
      </p>
      <ReviewDetail studyId={studyId} />
    </>
  );
}
