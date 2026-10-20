import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { StudyManager } from "@/components/research/catalog";
import { Button } from "@/components/ui/button";
import { useSessionUser } from "@/lib/research/store";

export const Route = createFileRoute("/researcher/studies")({
  head: () => ({ meta: [{ title: "My studies · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  const user = useSessionUser();
  if (!user) return null;
  return (
    <>
      <PageHeader
        title="My studies"
        description="Sample studies are marked. Records you add say they were created in this browser."
        actions={
          <Button asChild>
            <Link to="/researcher/create" search={{}}>Create study</Link>
          </Button>
        }
      />
      <StudyManager ownerId={user.id} />
    </>
  );
}
