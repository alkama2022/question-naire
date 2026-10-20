import { createFileRoute } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/layout/shells";

const items = [
  ["Why is my study not public?", "It stays private until it is approved and you open recruitment. Drafts, pending requests, and rejected requests are not listed."],
  ["Why are there three progress numbers?", "Someone can consent and still not finish the questionnaire. A finished questionnaire can still be excluded. Accepted means a person chose to keep it, not that it was verified."],
  ["Did my submission email a reviewer?", "No. Demo mode does not send email. The pending state is stored in this browser."],
  ["Can I pay participants here?", "No. Version 1 does not move money. Write only incentives that are actually confirmed, or say that none are."],
  ["What is still not built?", "Secure accounts, a hosted database, email, ethics-board integration, and a live connection to questionnaire tools."],
];

export const Route = createFileRoute("/researcher/help")({
  head: () => ({ meta: [{ title: "Help · ResearchConnect Nigeria" }] }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Help and support" description="Short answers for the demo. Use Contact if you need to leave a note in this browser." />
      <Accordion.Root type="single" collapsible className="grid gap-2">
        {items.map(([title, body]) => (
          <Accordion.Item key={title} value={title} className="rounded-xl border border-line bg-surface">
            <Accordion.Header>
              <Accordion.Trigger className="flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-medium">
                {title}
                <ChevronDown className="size-4" aria-hidden />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 pb-4 text-sm text-ink-soft">{body}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
}
