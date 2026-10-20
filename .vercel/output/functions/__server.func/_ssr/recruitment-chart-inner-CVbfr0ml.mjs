import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Bar, c as Legend, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruitment-chart-inner-CVbfr0ml.js
var import_jsx_runtime = require_jsx_runtime();
function RecruitmentChartInner({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "week",
						tick: {
							fill: "var(--color-ink-soft)",
							fontSize: 12
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						allowDecimals: false,
						tick: {
							fill: "var(--color-ink-soft)",
							fontSize: 12
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "recruited",
						name: "Recruited",
						fill: "var(--color-brand)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "completed",
						name: "Completed",
						fill: "var(--color-accent)",
						radius: [
							4,
							4,
							0,
							0
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "accepted",
						name: "Accepted",
						fill: "var(--color-success)",
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			})
		})
	});
}
//#endregion
export { RecruitmentChartInner };
