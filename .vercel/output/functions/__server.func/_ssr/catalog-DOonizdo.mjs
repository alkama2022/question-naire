import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as STATUS_LABEL, t as CATEGORIES } from "./sample-data-tji98cyF.mjs";
import { h as LayoutGrid, p as List, s as Search } from "../_libs/lucide-react.mjs";
import { A as validateFullStudy, D as useDemoQuery, E as toForm, O as useDemoStore, S as researcherLabel, d as formatDate, i as MenuItem, k as useSessionUser, l as deadlinePhrase, n as ConfirmDialog, r as Menu$1, t as Button } from "./store-BQzU-IjM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as researchService } from "./router-C7WB0ZbB.mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { n as OriginNote } from "./shells-DTkoj-6x.mjs";
import { r as StatusBadge, t as Badge } from "./badge-Bb45WRuY.mjs";
import { n as ProgressBar, t as Card } from "./card-CRc-JasC.mjs";
import { r as Pagination, t as EmptyState } from "./feedback-BNBmeAy5.mjs";
import { o as Select, r as Input } from "./field-DFwMbXWQ.mjs";
import { n as recruitmentSnapshot, r as researcherActions } from "./metrics-Djf8O_va.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DOonizdo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 6;
function StudyBrowser({ studies, detailTo }) {
	const users = useDemoStore((state) => state.users);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => {
		return studies.filter((study) => {
			const matchesQuery = `${study.title} ${study.purpose} ${study.location} ${study.institution}`.toLowerCase().includes(query.trim().toLowerCase());
			const matchesCategory = category === "all" || study.category === category;
			return matchesQuery && matchesCategory;
		});
	}, [
		studies,
		query,
		category
	]);
	const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_14rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Search studies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-3 left-3 size-4 text-ink-soft" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => {
								setQuery(event.target.value);
								setPage(1);
							},
							placeholder: "Search by title, place, or institution",
							className: "pl-9"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					"aria-label": "Category",
					value: category,
					onChange: (event) => {
						setCategory(event.target.value);
						setPage(1);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All categories"
					}), CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
				})]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No studies match",
				body: "Try another word, or clear the category filter. Pending and draft studies are not listed publicly."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: visible.map((study) => {
					const owner = users.find((user) => user.id === study.ownerId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-col p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: study.category }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginNote, { origin: study.origin })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-xl font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: detailTo,
									params: { studyId: study.id },
									className: "hover:text-brand",
									children: study.title
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-3 text-sm text-ink-soft",
								children: study.purpose
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-ink-soft",
									children: "Researcher"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: researcherLabel(owner?.name ?? "", study.institution) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-x-4 gap-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [study.completionMinutes || "—", " min"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: deadlinePhrase(study.deadline) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: study.location || "Location not set" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: study.incentive || "No incentive has been confirmed."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: detailTo,
										params: { studyId: study.id },
										children: "View study"
									})
								})
							})
						]
					}, study.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				page: Math.min(page, pages),
				pages,
				onPage: setPage
			})
		]
	});
}
function StudyManager({ ownerId }) {
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === ownerId));
	const responses = useDemoStore((state) => state.responses);
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("newest");
	const [view, setView] = (0, import_react.useState)("card");
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => {
		const next = studies.filter((study) => {
			return study.title.toLowerCase().includes(query.trim().toLowerCase()) && (status === "all" || study.status === status);
		});
		next.sort((a, b) => {
			if (sort === "title") return a.title.localeCompare(b.title);
			if (sort === "deadline") return (a.deadline || "9999").localeCompare(b.deadline || "9999");
			if (sort === "progress") {
				const ap = recruitmentSnapshot(a, responses.filter((item) => item.studyId === a.id)).acceptedPercent;
				return recruitmentSnapshot(b, responses.filter((item) => item.studyId === b.id)).acceptedPercent - ap;
			}
			return b.updatedAt.localeCompare(a.updatedAt);
		});
		return next;
	}, [
		studies,
		query,
		status,
		sort,
		responses
	]);
	const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				role: "tablist",
				"aria-label": "Study status",
				children: [
					"all",
					"draft",
					"pending_review",
					"approved",
					"active",
					"paused",
					"completed",
					"rejected"
				].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": status === tab,
					className: status === tab ? "min-h-11 shrink-0 rounded-full bg-brand px-4 text-sm text-brand-foreground" : "min-h-11 shrink-0 rounded-full border border-line bg-surface px-4 text-sm",
					onClick: () => {
						setStatus(tab);
						setPage(1);
					},
					children: tab === "all" ? "All" : STATUS_LABEL[tab]
				}, tab))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-[1fr_12rem_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Search your studies"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-3 left-3 size-4 text-ink-soft" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "pl-9",
								value: query,
								placeholder: "Search your studies",
								onChange: (event) => {
									setQuery(event.target.value);
									setPage(1);
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						"aria-label": "Sort studies",
						value: sort,
						onChange: (event) => setSort(event.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest update"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "deadline",
								children: "Deadline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "progress",
								children: "Accepted progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "title",
								children: "Title"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": view === "card",
							className: "inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface",
							onClick: () => setView("card"),
							"aria-label": "Card view",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": view === "list",
							className: "inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface",
							onClick: () => setView("list"),
							"aria-label": "List view",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "size-4" })
						})]
					})
				]
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No studies in this view",
				body: "Drafts, reviews, and live recruitment for this session will show up here.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/researcher/create",
						search: {},
						children: "Create a study"
					})
				})
			}) : view === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: visible.map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyAdminCard, {
					study,
					responses
				}, study.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-line bg-surface",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[40rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-line text-ink-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Study"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Target"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Accepted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Deadline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visible.map((study) => {
						const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: study.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginNote, { origin: study.origin })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular-nums",
									children: study.targetCount || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular-nums",
									children: snap.accepted
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: study.deadline ? formatDate(study.deadline) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyActionMenu, { study })
								})
							]
						}, study.id);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
				page: Math.min(page, pages),
				pages,
				onPage: setPage
			})
		]
	});
}
function StudyAdminCard({ study, responses }) {
	const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginNote, { origin: study.origin })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-xl font-semibold",
				children: study.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-ink-soft",
						children: "Created"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(study.createdAt) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-ink-soft",
						children: "Deadline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.deadline ? `${formatDate(study.deadline)} · ${deadlinePhrase(study.deadline)}` : "Not set" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-ink-soft",
						children: "Target"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "tabular-nums",
						children: study.targetCount || "—"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-ink-soft",
						children: "Accepted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "tabular-nums",
						children: snap.accepted
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
					value: snap.acceptedPercent,
					label: "Accepted responses toward target"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudyActionMenu, { study })
			})
		]
	});
}
function StudyActionMenu({ study }) {
	const actions = researcherActions(study.status);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const server = useDataMode() === "server";
	const user = useSessionUser();
	async function run(kind) {
		if (!user) return;
		setBusy(true);
		const result = kind === "submit" ? await researchService.submitForReview(user.id, study.id) : kind === "pause" ? await researchService.setPaused(user.id, study.id, true) : kind === "resume" ? await researchService.setPaused(user.id, study.id, false) : kind === "complete" ? await researchService.completeStudy(user.id, study.id) : await researchService.openRecruitment(user.id, study.id);
		setBusy(false);
		setConfirm(null);
		if (result.ok) toast.success(result.message);
		else toast.error(result.error);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu$1, {
		label: "Actions",
		children: [
			actions.includes("view") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/researcher/recruitment/$studyId",
					params: { studyId: study.id },
					children: "View details"
				})
			}) : null,
			actions.includes("edit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/researcher/create",
					search: { studyId: study.id },
					children: "Edit draft"
				})
			}) : null,
			actions.includes("progress") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => void 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/researcher/recruitment/$studyId",
					params: { studyId: study.id },
					children: "View progress"
				})
			}) : null,
			actions.includes("submit") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => setConfirm("submit"),
				children: "Submit for review"
			}) : null,
			actions.includes("open") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => setConfirm("open"),
				children: "Open recruitment"
			}) : null,
			actions.includes("pause") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => setConfirm("pause"),
				children: "Pause recruitment"
			}) : null,
			actions.includes("resume") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => setConfirm("resume"),
				children: "Resume recruitment"
			}) : null,
			actions.includes("complete") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
				onSelect: () => setConfirm("complete"),
				children: "Mark completed"
			}) : null
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: confirm !== null,
		onOpenChange: (open) => {
			if (!open) setConfirm(null);
		},
		title: confirm === "submit" ? "Submit this study for review?" : confirm === "open" ? "Open recruitment?" : confirm === "pause" ? "Pause recruitment?" : confirm === "resume" ? "Resume recruitment?" : "Mark this study completed?",
		body: confirm === "submit" ? validateFullStudy(toForm(study)).title ? server ? "Some required fields are still empty. You can still try, and the form will explain what is missing." : "Some required fields are still empty. You can still try, and the form will explain what is missing. Nothing is sent to a server." : server ? "It will be marked Pending review on the server. It will not be public until it is approved and opened." : "It will be marked Pending review in this browser. It will not be public, and no email is sent." : server ? "This changes the record on the server." : "This updates demo data in this browser only.",
		confirmLabel: "Confirm",
		busy,
		onConfirm: () => confirm && run(confirm)
	})] });
}
//#endregion
export { StudyManager as n, StudyBrowser as t };
