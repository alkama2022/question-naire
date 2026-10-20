import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { k as useSessionUser, t as Button } from "./store-BQzU-IjM.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { n as StudyManager } from "./catalog-CUs40EpP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studies-CnySaizO.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const user = useSessionUser();
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "My studies",
		description: "Sample studies are marked. Records you add say they were created in this browser.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/researcher/create",
				search: {},
				children: "Create study"
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyManager, { ownerId: user.id })] });
}
//#endregion
export { Page as component };
