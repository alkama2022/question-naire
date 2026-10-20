import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { I as Button } from "./router-VYkCRKPL.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-Cj0H2pWP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BjSKaw9k.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "About ResearchConnect Nigeria",
				description: "Connecting Research with the Right People."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 text-sm leading-6 text-ink-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ResearchConnect Nigeria is an early product for students and small research teams who need participants for questionnaire studies. The first people it is meant to help are final-year undergraduates who currently recruit through class groups." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "It is not a university, an ethics board, or a survey builder. Universities named in sample studies are examples of where students study. They are not partners and they have not endorsed this product." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Version 1 keeps the workflow small: write a request, review it, open recruitment, and keep an honest count. Payments, automatic form syncing, and institutional sign-in are not part of this version." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "There is no invented customer list and no usage statistic on this site. The sample studies you can click through are labelled as sample records." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-8",
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					children: "Contact"
				})
			})
		]
	}) });
}
//#endregion
export { Page as component };
