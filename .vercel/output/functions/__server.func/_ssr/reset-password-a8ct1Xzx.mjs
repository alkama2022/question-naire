import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { n as LocalPasswordForm } from "./panels-Bg3G_zK6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-a8ct1Xzx.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Reset password",
				description: "Email links are not issued in demo mode. Use the local form if the account exists in this browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalPasswordForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/forgot-password",
					className: "text-brand underline",
					children: "Forgot password"
				})
			})
		]
	}) });
}
//#endregion
export { Page as component };
