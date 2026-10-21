import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { c as ResearcherOverview } from "./views-0qPEwmwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/researcher-OtXfs2Ir.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Overview",
		description: server ? "Counts from your records on the server, including labelled sample studies." : "Counts from the demo records in this browser, including labelled sample studies."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearcherOverview, {})] });
};
//#endregion
export { SplitComponent as component };
