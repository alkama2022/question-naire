import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { n as LocalPasswordForm } from "./panels-BTJwa7Sm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-zPGOl4X1.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Forgot password",
				description: server ? "Enter your email address and the server sends a reset link." : "No reset email is sent. You can replace a demo password that already exists in this browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalPasswordForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "text-brand underline",
					children: "Back to log in"
				})
			})
		]
	}) });
}
//#endregion
export { Page as component };
