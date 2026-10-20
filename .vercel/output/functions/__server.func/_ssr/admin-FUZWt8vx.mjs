import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { t as AdminOverview } from "./views-B3A-Mzsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-FUZWt8vx.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Admin overview",
		description: server ? "Review and monitoring for this workspace. Every action here is authorized on the server and written to the audit log." : "A local preview of review and monitoring. Not a production admin account."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOverview, {})] });
};
//#endregion
export { SplitComponent as component };
