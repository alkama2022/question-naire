import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { I as Button } from "./router-VYkCRKPL.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-Cj0H2pWP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/for-researchers-BrhjxtPM.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "For researchers",
				description: "Built first for a final-year student running a questionnaire, and usable later by a postgraduate or a small team."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 text-sm leading-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-line bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "What you do here"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-ink-soft",
							children: "Describe the study, state who should and should not take part, paste the link to your existing questionnaire, and submit the request. After approval you open recruitment, pause it if needed, and label responses that need another look."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-line bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "What you still do outside"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-ink-soft",
							children: "Host the questionnaire. Ask your supervisor or ethics committee when your institution requires it. This platform does not grant that approval, and it does not pay incentives."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-line bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "What you will not see"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-ink-soft",
							children: "Participant email addresses are not listed on the recruitment page. Follow-up that needs a contact detail belongs in the questionnaire tool, under whatever consent you collected there."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					search: { role: "researcher" },
					children: "Find Research Participants"
				})
			})
		]
	}) });
}
//#endregion
export { Page as component };
