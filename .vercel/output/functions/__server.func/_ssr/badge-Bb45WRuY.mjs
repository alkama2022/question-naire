import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as QUALITY_LABEL, o as STATUS_LABEL } from "./sample-data-tji98cyF.mjs";
import { s as cn } from "./store-BQzU-IjM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Bb45WRuY.js
var import_jsx_runtime = require_jsx_runtime();
var statusClass = {
	draft: "bg-canvas text-ink border-line",
	pending_review: "bg-warn/15 text-ink border-warn/40",
	approved: "bg-brand/10 text-brand border-brand/20",
	active: "bg-accent/15 text-ink border-accent/40",
	paused: "bg-warn/15 text-ink border-warn/40",
	completed: "bg-success/10 text-success border-success/30",
	rejected: "bg-danger/10 text-danger border-danger/30"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-semibold", statusClass[status]),
		children: STATUS_LABEL[status]
	});
}
var qualityClass = {
	pending: "bg-canvas text-ink border-line",
	accepted: "bg-success/10 text-success border-success/30",
	excluded: "bg-danger/10 text-danger border-danger/30",
	needs_review: "bg-warn/15 text-ink border-warn/40"
};
function QualityBadge({ quality }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-semibold", qualityClass[quality]),
		children: QUALITY_LABEL[quality]
	});
}
function Badge({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex min-h-7 items-center rounded-full border border-line bg-canvas px-2.5 text-xs font-semibold text-ink-soft", className),
		children
	});
}
//#endregion
export { QualityBadge as n, StatusBadge as r, Badge as t };
