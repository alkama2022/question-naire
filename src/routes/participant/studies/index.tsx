import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { StudyBrowser } from "@/components/research/catalog";
import { useDemoQuery } from "@/lib/research/store";

export const Route = createFileRoute("/participant/studies/")({
  head: () => ({ meta: [{ title: "Browse studies · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const studies = useDemoQuery((state) =>
    state.studies.filter((study) => study.status === "active" || study.status === "paused"),
  );
  return (
    <>
      <PageHeader
        title="Browse studies"
        description="Read a study before you consent. Paused studies are listed but not taking new participants."
      />
      <StudyBrowser studies={studies} detailTo="/participant/studies/$studyId" />
    </>
  );
}
