import { a as AccordionTrigger, i as AccordionItem, n as AccordionContent, r as AccordionHeader, t as Accordion, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { T as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-4o2m_KAu.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	["Why is my study not public?", "It stays private until it is approved and you open recruitment. Drafts, pending requests, and rejected requests are not listed."],
	["Why are there three progress numbers?", "Someone can consent and still not finish the questionnaire. A finished questionnaire can still be excluded. Accepted means a person chose to keep it, not that it was verified."],
	["Did my submission email a reviewer?", "No. The review queue is on the platform and the researcher is notified inside the workspace. No email is sent."],
	["Can I pay participants here?", "No. Version 1 does not move money. Write only incentives that are actually confirmed, or say that none are."],
	["What is still not built?", "Email delivery, ethics-board integration, and a live connection to questionnaire tools."]
];
function Page() {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Help and support",
		description: server ? "Short answers. Use Contact if you need to leave a note for the team." : "Short answers for the demo. Use Contact if you need to leave a note in this browser."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
		type: "single",
		collapsible: true,
		className: "grid gap-2",
		children: items.map(([title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
			value: title,
			className: "rounded-xl border border-line bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger, {
				className: "flex min-h-12 w-full items-center justify-between gap-3 px-4 text-left text-sm font-medium",
				children: [title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: "size-4",
					"aria-hidden": true
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
				className: "px-4 pb-4 text-sm text-ink-soft",
				children: body
			})]
		}, title))
	})] });
}
//#endregion
export { Page as component };
