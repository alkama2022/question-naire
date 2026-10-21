import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-COWBhT1R.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-12 text-sm leading-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Terms of service",
			description: "Draft terms for version 1. Not legal advice."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 text-ink-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ResearchConnect Nigeria helps people describe a study and track recruitment. It does not guarantee that a sample is valid, that responses are truthful, or that a project has ethics approval." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Researchers are responsible for the claims they make, the questionnaire they link, and any incentive they mention. Do not promise a reward that has not been confirmed." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Participants take part only if they choose to. Declining or withdrawing must not be described on this platform as affecting a grade." }),
				server ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Records are kept on the server so that a study and its recruitment record survive a device change. You can withdraw from a study while it is open; the record of that withdrawal stays, because the researcher has to be able to account for it." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Administrator actions are authorized on the server and written to an audit log. Administrator access is granted by the operator, never from the browser." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The demo stores data locally and can be cleared by the browser or by the reset control. Do not treat it as a permanent archive of a real project." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Administrative controls in the preview are not a production authorization system." })] })
			]
		})]
	}) });
}
//#endregion
export { Page as component };
