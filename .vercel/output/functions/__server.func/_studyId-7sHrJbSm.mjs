import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { d as useDemoStore, n as Route } from "./_ssr/router-VYkCRKPL.mjs";
import { r as PageHeader } from "./_ssr/shells-Cj0H2pWP.mjs";
import { t as RecruitmentDetail } from "./_ssr/recruitment-panel-2dsGkPGr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studyId-7sHrJbSm.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { studyId } = Route.useParams();
	const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/researcher/recruitment",
				className: "text-brand underline",
				children: "All recruitment"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: study?.title ?? "Recruitment",
			description: "Demo records for this study."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruitmentDetail, { studyId })
	] });
}
//#endregion
export { Page as component };
