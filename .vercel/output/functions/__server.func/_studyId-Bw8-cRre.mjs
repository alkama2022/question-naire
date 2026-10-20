import { C as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Route$7 } from "./_ssr/router-ByjMWPoT.mjs";
import { t as MarketingShell } from "./_ssr/shells-DTkoj-6x.mjs";
import { t as StudyDetail } from "./_ssr/study-detail-Dspo85UD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studyId-Bw8-cRre.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { studyId } = Route$7.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/studies",
				className: "text-brand underline",
				children: "All studies"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyDetail, { studyId })]
	}) });
}
//#endregion
export { Page as component };
