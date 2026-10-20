import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { I as Button } from "./router-VYkCRKPL.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-Cj0H2pWP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/for-participants-C0wmXqda.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "For participants",
				description: "See what a study is asking before you agree, and leave if you change your mind."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 text-sm leading-6",
				children: [
					"Each public study shows the purpose, who can take part, how long it takes, the deadline, and whether any incentive is actually confirmed.",
					"You answer a short eligibility check. If it is not a fit, you are not pushed into consent.",
					"Consent is separate from browsing. You can decline.",
					"If you have consented and the study is still open, you can withdraw. That does not delete answers already stored in an external form.",
					"Nothing here is a promise of payment, airtime, or extra marks."
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-line bg-surface p-4",
					children: item
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studies",
						children: "Explore Studies"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						search: { role: "participant" },
						children: "Register as a participant"
					})
				})]
			})
		]
	}) });
}
//#endregion
export { Page as component };
