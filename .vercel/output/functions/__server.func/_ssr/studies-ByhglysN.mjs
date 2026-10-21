import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as useDemoQuery } from "./store-BQzU-IjM.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { t as StudyBrowser } from "./catalog-DOonizdo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studies-ByhglysN.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.status === "active" || study.status === "paused"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Browse studies",
		description: "Read a study before you consent. Paused studies are listed but not taking new participants."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyBrowser, {
		studies,
		detailTo: "/participant/studies/$studyId"
	})] });
}
//#endregion
export { Page as component };
