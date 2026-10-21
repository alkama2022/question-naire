import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { d as UserAdmin } from "./views-0qPEwmwi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-BaoNoDIm.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => {
	const server = useDataMode() === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "User management",
		description: server ? "You can suspend an account. The account then cannot sign in. You cannot promote anyone to administrator from this screen." : "You can suspend a demo account. You cannot promote anyone to administrator from this screen."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAdmin, {})] });
};
//#endregion
export { SplitComponent as component };
