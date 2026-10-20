import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-Cj0H2pWP.mjs";
import { t as ContactForm } from "./panels-0VZc0FMN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DFlFGkhe.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Contact",
			description: "Messages stay in the demo inbox on this browser. No email is sent."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})]
	}) });
}
//#endregion
export { Page as component };
