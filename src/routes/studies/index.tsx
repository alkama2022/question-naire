import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { StudyBrowser } from "@/components/research/catalog";
import { isPublicStudy } from "@/lib/research/metrics";
import { useDemoQuery } from "@/lib/research/store";

export const Route = createFileRoute("/studies/")({
  head: () => ({ meta: [{ title: "Browse studies · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const studies = useDemoQuery((state) => state.studies.filter((study) => isPublicStudy(study.status)));
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <PageHeader
          title="Browse studies"
          description="Active studies are open. Paused studies stay visible so you can see that new participants are not being accepted. Drafts and reviews are hidden."
        />
        <StudyBrowser studies={studies} detailTo="/studies/$studyId" />
      </div>
    </MarketingShell>
  );
}
