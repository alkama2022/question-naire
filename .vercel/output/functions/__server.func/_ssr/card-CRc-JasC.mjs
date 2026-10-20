import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { s as cn } from "./store-BQzU-IjM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-CRc-JasC.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-line bg-surface shadow-sm", className),
		...props
	});
}
function ProgressBar({ value, label }) {
	const safe = Math.max(0, Math.min(100, Math.round(value)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1.5 flex items-baseline justify-between gap-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "tabular-nums text-ink-soft",
			children: [safe, "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 overflow-hidden rounded-full bg-line",
		role: "progressbar",
		"aria-valuenow": safe,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": label,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-accent",
			style: { width: `${safe}%` }
		})
	})] });
}
//#endregion
export { ProgressBar as n, Card as t };
