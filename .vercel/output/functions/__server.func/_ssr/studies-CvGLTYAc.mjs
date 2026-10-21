import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { D as useDemoQuery } from "./store-BQzU-IjM.mjs";
import { r as PageHeader, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { t as isPublicStudy } from "./metrics-Djf8O_va.mjs";
import { t as StudyBrowser } from "./catalog-DOonizdo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studies-CvGLTYAc.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const studies = useDemoQuery((state) => state.studies.filter((study) => isPublicStudy(study.status)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Browse studies",
			description: "Active studies are open. Paused studies stay visible so you can see that new participants are not being accepted. Drafts and reviews are hidden."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyBrowser, {
			studies,
			detailTo: "/studies/$studyId"
		})]
	}) });
}
//#endregion
export { Page as component };
