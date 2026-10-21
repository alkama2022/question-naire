import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as QUALITY_LABEL } from "./sample-data-tji98cyF.mjs";
import { D as useDemoQuery, O as useDemoStore, f as formatDateTime, k as useSessionUser, t as Button } from "./store-BQzU-IjM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as researchService } from "./router-C7WB0ZbB.mjs";
import { n as QualityBadge } from "./badge-Bb45WRuY.mjs";
import { n as ProgressBar, t as Card } from "./card-CRc-JasC.mjs";
import { t as EmptyState } from "./feedback-BNBmeAy5.mjs";
import { n as Field, o as Select, s as Textarea } from "./field-DFwMbXWQ.mjs";
import { i as weeklySeries, n as recruitmentSnapshot } from "./metrics-Djf8O_va.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruitment-panel-CfDjgzr-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecruitmentList({ ownerId }) {
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === ownerId && [
		"active",
		"paused",
		"completed",
		"approved"
	].includes(study.status)));
	const responses = useDemoStore((state) => state.responses);
	if (studies.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No recruitment to track yet",
		body: "Approved, active, paused, and completed studies appear here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: studies.map((study) => {
			const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: study.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: [
							snap.eligible,
							" recruited · ",
							snap.completed,
							" completed · ",
							snap.accepted,
							" accepted"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/researcher/recruitment/$studyId",
							params: { studyId: study.id },
							children: "Open tracking"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						value: snap.acceptedPercent,
						label: "Accepted toward target"
					})
				})]
			}, study.id);
		})
	});
}
function RecruitmentDetail({ studyId }) {
	const user = useSessionUser();
	const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
	const responses = useDemoQuery((state) => state.responses.filter((item) => item.studyId === studyId));
	if (!study || !user || user.role !== "admin" && study.ownerId !== user.id) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Recruitment record not available",
		body: "It is missing from this browser, or this session does not own it."
	});
	const snap = recruitmentSnapshot(study, responses);
	const weeks = weeklySeries(responses);
	const recent = [...responses].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Target",
						value: snap.target,
						hint: "Desired accepted responses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Recruited",
						value: snap.eligible,
						hint: "Consented and not withdrawn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Completed",
						value: snap.completed,
						hint: "Marked finished by a person"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Awaiting review",
						value: snap.awaiting,
						hint: "Finished, still pending"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Accepted",
						value: snap.accepted,
						hint: "Not the same as completed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Needs review",
						value: snap.needsReview,
						hint: "Look again before accepting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Excluded",
						value: snap.excluded,
						hint: "Kept out of the accepted count"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Remaining",
						value: snap.remaining,
						hint: "Target minus accepted"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						value: snap.acceptedPercent,
						label: "Accepted responses toward the target"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						value: snap.completedPercent,
						label: "Questionnaires marked complete, toward the same target"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-ink-soft",
						children: [
							"Deadline ",
							study.deadline || "not set",
							". Withdrawn records: ",
							snap.withdrawn,
							". People who consented but have not finished: ",
							snap.pendingIncomplete,
							". These labels are not a verification that anyone told the truth."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Recent weeks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: "Accepted counts use the week the questionnaire was marked complete."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[28rem] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-ink-soft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Week"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Recruited"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Completed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Accepted"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: weeks.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2",
										children: week.week
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 tabular-nums",
										children: week.recruited
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 tabular-nums",
										children: week.completed
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 tabular-nums",
										children: week.accepted
									})
								]
							}, week.week)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { data: weeks })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Recent activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2 text-sm",
					children: recent.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap justify-between gap-2 border-b border-line py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [record.code, record.withdrawn ? " withdrew" : record.completedAt ? " has a completion mark" : " consented"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink-soft",
							children: formatDateTime(record.createdAt)
						})]
					}, record.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Response records"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: "Names and email addresses are not shown. Completion is a manual mark because the questionnaire tool is not connected."
					}),
					responses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm",
						children: "No one has consented yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[40rem] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-ink-soft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Code"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Recruited"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Completed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Label"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Update"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: responses.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseRow, {
								record,
								actorId: user.id
							}, record.id)) })]
						})
					})
				]
			})
		]
	});
}
function Metric({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-soft",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl font-semibold tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-ink-soft",
				children: hint
			})
		]
	});
}
function ResponseRow({ record, actorId }) {
	const [quality, setQuality] = (0, import_react.useState)(record.quality);
	const [note, setNote] = (0, import_react.useState)(record.note);
	(0, import_react.useEffect)(() => {
		setQuality(record.quality);
		setNote(record.note);
	}, [record.quality, record.note]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-line align-top",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 pr-3 font-medium",
				children: record.code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 pr-3",
				children: formatDateTime(record.createdAt)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 pr-3",
				children: record.withdrawn ? "Withdrawn" : record.completedAt ? formatDateTime(record.completedAt) : "Not marked"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 pr-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QualityBadge, { quality: record.quality })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3",
				children: record.withdrawn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-ink-soft",
					children: "No further label."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						!record.completedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: async () => {
								const result = await researchService.markCompleted(actorId, record.id);
								if (result.ok) toast.success(result.message);
								else toast.error(result.error);
							},
							children: "Mark questionnaire complete"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: `Label for ${record.code}`,
							htmlFor: `q-${record.id}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								id: `q-${record.id}`,
								value: quality,
								onChange: (event) => setQuality(event.target.value),
								children: Object.keys(QUALITY_LABEL).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: item,
									children: QUALITY_LABEL[item]
								}, item))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: note,
							onChange: (event) => setNote(event.target.value),
							"aria-label": `Note for ${record.code}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: async () => {
								const result = await researchService.setQuality(actorId, record.id, quality, note);
								if (result.ok) toast.success(result.message);
								else toast.error(result.error);
							},
							children: "Save label"
						})
					]
				})
			})
		]
	});
}
function ClientChart({ data }) {
	const [Chart, setChart] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		import("./recruitment-chart-inner-CVbfr0ml.mjs").then((mod) => setChart(() => mod.RecruitmentChartInner));
	}, []);
	if (!Chart) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 rounded-lg bg-canvas",
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chart, { data });
}
//#endregion
export { RecruitmentList as n, RecruitmentDetail as t };
