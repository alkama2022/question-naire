import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/layout/shells";
import { StudyDetail } from "@/components/research/study-detail";

export const Route = createFileRoute("/studies/$studyId")({
  head: () => ({ meta: [{ title: "Study · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const { studyId } = Route.useParams();
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="mb-4 text-sm">
          <Link to="/studies" className="text-brand underline">
            All studies
          </Link>
        </p>
        <StudyDetail studyId={studyId} />
      </div>
    </MarketingShell>
  );
}
