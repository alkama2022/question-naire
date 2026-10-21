import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { r as AuditList } from "./views-0qPEwmwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-u3FlYSdW.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Audit history",
		description: server ? "Every administrative action is written here, on the server, with who did it and when." : "A local log of demo actions. Resetting demo data clears it. A production log would need to be append-only on a server."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditList, {})] });
};
//#endregion
export { SplitComponent as component };
