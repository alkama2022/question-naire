import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { r as LoginForm } from "./panels-DR2wlgy-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CFEHS4id.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Log in",
				description: "Demo sessions only. This does not create a secure account, and no server checks the password."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-ink-soft",
				children: [
					"New here?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						search: {},
						className: "font-medium text-brand underline",
						children: "Register"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Page as component };
