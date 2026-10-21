import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { o as SettingsPanel } from "./panels-BTJwa7Sm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DTuBLo0C.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Account settings",
		description: server ? "Your profile and notice preferences. They are the same on every device you sign in from." : "Profile, notice preferences, and demo reset."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {})] });
};
//#endregion
export { SplitComponent as component };
