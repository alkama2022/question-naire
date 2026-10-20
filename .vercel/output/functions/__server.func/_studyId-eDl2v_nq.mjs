import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { i as Route$4 } from "./_ssr/router-VYkCRKPL.mjs";
import { l as ReviewDetail } from "./_ssr/views-BvhbWLlu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_studyId-eDl2v_nq.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { studyId } = Route$4.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin/reviews",
			className: "text-brand underline",
			children: "Pending requests"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewDetail, { studyId })] });
}
//#endregion
export { Page as component };
