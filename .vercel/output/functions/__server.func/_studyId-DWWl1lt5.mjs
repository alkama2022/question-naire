import { C as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { r as Route$2 } from "./_ssr/router-ByjMWPoT.mjs";
import { t as StudyDetail } from "./_ssr/study-detail-Dspo85UD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studyId-DWWl1lt5.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { studyId } = Route$2.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/participant/studies",
			className: "text-brand underline",
			children: "Back to studies"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyDetail, { studyId })] });
}
//#endregion
export { Page as component };
