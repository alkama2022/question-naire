import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-BNBmeAy5.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm text-ink-soft",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex justify-center",
				children: action
			}) : null
		]
	});
}
function ErrorNote({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-danger/30 bg-danger/5 px-4 py-3",
		role: "alert",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-danger",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-ink",
			children: body
		})]
	});
}
function Pagination({ page, pages, onPage }) {
	if (pages <= 1) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex items-center justify-between gap-3",
		"aria-label": "Pagination",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 rounded-lg border border-line bg-surface px-3 text-sm disabled:opacity-40",
				onClick: () => onPage(page - 1),
				disabled: page <= 1,
				children: "Previous"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm tabular-nums text-ink-soft",
				children: [
					"Page ",
					page,
					" of ",
					pages
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "min-h-11 rounded-lg border border-line bg-surface px-3 text-sm disabled:opacity-40",
				onClick: () => onPage(page + 1),
				disabled: page >= pages,
				children: "Next"
			})
		]
	});
}
//#endregion
export { ErrorNote as n, Pagination as r, EmptyState as t };
