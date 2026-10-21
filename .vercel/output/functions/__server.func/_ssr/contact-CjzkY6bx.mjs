import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { t as ContactForm } from "./panels-BTJwa7Sm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CjzkY6bx.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Contact",
			description: server ? "Your message goes to the administrator inbox on the server. No email is sent." : "Messages stay in the demo inbox on this browser. No email is sent."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})]
	}) });
}
//#endregion
export { Page as component };
