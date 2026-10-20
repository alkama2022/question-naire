import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageHeader } from "@/components/layout/shells";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <PageHeader
          title="About ResearchConnect Nigeria"
          description="Connecting Research with the Right People."
        />
        <div className="grid gap-4 text-sm leading-6 text-ink-soft">
          <p>
            ResearchConnect Nigeria is an early product for students and small research teams who
            need participants for questionnaire studies. The first people it is meant to help are
            final-year undergraduates who currently recruit through class groups.
          </p>
          <p>
            It is not a university, an ethics board, or a survey builder. Universities named in
            sample studies are examples of where students study. They are not partners and they have
            not endorsed this product.
          </p>
          <p>
            Version 1 keeps the workflow small: write a request, review it, open recruitment, and
            keep an honest count. Payments, automatic form syncing, and institutional sign-in are
            not part of this version.
          </p>
          <p>
            There is no invented customer list and no usage statistic on this site. The sample
            studies you can click through are labelled as sample records.
          </p>
        </div>
        <Button className="mt-8" variant="secondary" asChild>
          <Link to="/contact">Contact</Link>
        </Button>
      </div>
    </MarketingShell>
  );
}
