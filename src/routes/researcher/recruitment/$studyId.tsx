import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { RecruitmentDetail } from "@/components/research/recruitment-panel";
import { useDemoStore } from "@/lib/research/store";

export const Route = createFileRoute("/researcher/recruitment/$studyId")({
  head: () => ({ meta: [{ title: "Recruitment detail · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const { studyId } = Route.useParams();
  const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
  return (
    <>
      <p className="mb-3 text-sm">
        <Link to="/researcher/recruitment" className="text-brand underline">
          All recruitment
        </Link>
      </p>
      <PageHeader title={study?.title ?? "Recruitment"} description="Demo records for this study." />
      <RecruitmentDetail studyId={studyId} />
    </>
  );
}
