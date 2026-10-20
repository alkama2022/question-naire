import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as Route$30 } from "./router-Ct3W-JMu.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { a as RegisterForm } from "./panels-DrRUO7A7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-4IBAiG-e.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { role } = Route$30.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Register",
				description: "Choose a role for this browser session. Admin access is not offered here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, { initialRole: role }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-ink-soft",
				children: [
					"Already have a demo session?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "font-medium text-brand underline",
						children: "Log in"
					})
				]
			})
		]
	}) });
}
//#endregion
export { Page as component };
