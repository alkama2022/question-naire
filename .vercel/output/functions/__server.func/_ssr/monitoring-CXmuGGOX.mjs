import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { a as MonitoringTable } from "./views-0qPEwmwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monitoring-CXmuGGOX.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Recruitment monitoring",
		description: server ? "Active and paused studies across the workspace, without participant contact details." : "Active and paused studies across the demo, without participant contact details."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitoringTable, {})] });
};
//#endregion
export { SplitComponent as component };
