import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/shells";
import { ReviewList } from "@/components/workspace/views";

export const Route = createFileRoute("/admin/reviews/")({
  head: () => ({ meta: [{ title: "Pending requests · ResearchConnect Nigeria" }] }),
  component: () => (
    <>
      <PageHeader title="Pending study requests" description="Nothing here is public until it is approved and the researcher opens it." />
      <ReviewList />
    </>
  ),
});
