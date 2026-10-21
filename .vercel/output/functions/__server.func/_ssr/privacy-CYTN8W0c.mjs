import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-CYTN8W0c.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-12 text-sm leading-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Privacy policy",
			description: "A draft for this product. It is not legal advice."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 text-ink-soft",
			children: [server ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your account — name, email, hashed password, study text, consent, and messages — is stored on the server. It is the same on every device you sign in from, and it is visible to you and to the people whose workspace it belongs to." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Participant email addresses are not shown on public pages or on a researcher's recruitment table. Reports you submit are visible to an administrator, including the email you typed." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Withdrawing from a study records the withdrawal and marks the response as withdrawn. It does not delete anything already sent to an external questionnaire tool, and it does not delete the audit log." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A real privacy notice still needs to say what is kept, who can see it, how long it is kept, and how a person asks for it to be deleted. That process is not automated here." })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "In this demo, the information you type — name, email, password, study text, consent, and messages — stays in this browser. Passwords are not encrypted. Do not use a password you use anywhere else." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Participant email addresses are not shown on public pages or on a researcher's recruitment table. Reports you submit are visible in the admin preview on the same browser, including the email you typed." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A future hosted version would need a real privacy notice: what is stored on a server, who can see it, how long it is kept, and how a person asks for it to be deleted. That server, and that process, are not running here." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sample studies use fictional project descriptions. They are not records of real participants." })]
		})]
	}) });
}
//#endregion
export { Page as component };
