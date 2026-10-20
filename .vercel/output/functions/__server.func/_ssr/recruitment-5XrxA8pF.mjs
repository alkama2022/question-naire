import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as useSessionUser } from "./router-VYkCRKPL.mjs";
import { r as PageHeader } from "./shells-Cj0H2pWP.mjs";
import { n as RecruitmentList } from "./recruitment-panel-2dsGkPGr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruitment-5XrxA8pF.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const user = useSessionUser();
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Recruitment tracking",
		description: "Recruited, completed, and accepted are separate. Completion is marked by hand because external forms are not connected."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruitmentList, { ownerId: user.id })] });
}
//#endregion
export { Page as component };
