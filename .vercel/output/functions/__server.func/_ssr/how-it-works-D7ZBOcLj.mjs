import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { I as Button } from "./router-VYkCRKPL.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-Cj0H2pWP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-D7ZBOcLj.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "How ResearchConnect works",
				description: "Four plain steps. The questionnaire stays in the tool you already use."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-4",
				children: [
					["Write the request", "A researcher enters the title, purpose, who can take part, a deadline, and the questionnaire link."],
					["Submit for review", "The study stays off the public list. A reviewer can approve it, reject it with a reason, or send it back."],
					["Open recruitment", "After approval, the researcher chooses when it becomes visible. Participants read the study, answer eligibility questions, and consent or decline."],
					["Track the record", "Recruited people, completed questionnaires, and accepted responses are counted separately. A label such as Accepted is a decision, not proof the answer is genuine."]
				].map(([title, body], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold text-accent",
							children: ["Step ", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-xl font-semibold",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-soft",
							children: body
						})
					]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						search: {},
						children: "Create a demo session"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studies",
						children: "Browse open studies"
					})
				})]
			})
		]
	}) });
}
//#endregion
export { Page as component };
