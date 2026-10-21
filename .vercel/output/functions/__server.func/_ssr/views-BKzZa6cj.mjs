import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as STATUS_LABEL } from "./sample-data-tji98cyF.mjs";
import { D as useDemoQuery, O as useDemoStore, a as Modal, d as formatDate, f as formatDateTime, k as useSessionUser, l as deadlinePhrase, n as ConfirmDialog, t as Button } from "./store-BQzU-IjM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as researchService } from "./router-C7WB0ZbB.mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { r as StatusBadge } from "./badge-Bb45WRuY.mjs";
import { n as ProgressBar, t as Card } from "./card-CRc-JasC.mjs";
import { t as EmptyState } from "./feedback-BNBmeAy5.mjs";
import { n as Field, s as Textarea } from "./field-DFwMbXWQ.mjs";
import { n as recruitmentSnapshot } from "./metrics-Djf8O_va.mjs";
import { t as RecruitmentDetail } from "./recruitment-panel-CfDjgzr-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/views-BKzZa6cj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResearcherOverview() {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === user?.id));
	const responses = useDemoStore((state) => state.responses);
	const audits = useDemoQuery((state) => state.audits.filter((item) => item.actorId === user?.id).slice(0, 5));
	const notices = useDemoQuery((state) => state.notices.filter((item) => item.userId === user?.id).slice(0, 3));
	if (!user) return null;
	const count = (status) => studies.filter((study) => study.status === status).length;
	const active = studies.filter((study) => study.status === "active");
	const deadlines = studies.filter((study) => study.deadline && ![
		"completed",
		"rejected",
		"draft"
	].includes(study.status)).sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 4);
	const accepted = active.reduce((sum, study) => {
		return sum + recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id)).accepted;
	}, 0);
	const target = active.reduce((sum, study) => sum + study.targetCount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total studies",
						value: studies.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active",
						value: count("active")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Completed",
						value: count("completed")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pending review",
						value: count("pending_review")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Recruitment progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: "Accepted responses across your active studies, not questionnaires merely marked complete."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							value: target ? accepted / target * 100 : 0,
							label: `${accepted} accepted of ${target} targeted`
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Upcoming deadlines"
					}), deadlines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: "No open deadlines in this session."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-3",
						children: deadlines.map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: study.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-ink-soft",
								children: deadlinePhrase(study.deadline)
							})]
						}, study.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Recent notices"
					}), notices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: "Nothing new."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 grid gap-3 text-sm",
						children: notices.map((notice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: notice.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-ink-soft",
							children: notice.body
						})] }, notice.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Recent activity"
				}), audits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: server ? "Actions you take are listed here." : "Actions you take in this browser will be listed here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2 text-sm",
					children: audits.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							event.action,
							": ",
							event.detail
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink-soft",
							children: formatDateTime(event.createdAt)
						})]
					}, event.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/researcher/create",
							search: {},
							children: "Create study"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/researcher/recruitment",
							children: "Track recruitment"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/researcher/reports",
							children: "Reports"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Your studies"
				}), studies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: "No studies in this session yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-4",
					children: studies.map((study) => {
						const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-line p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-ink-soft",
										children: deadlinePhrase(study.deadline)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-medium",
									children: study.title
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: study.status === "active" || study.status === "paused" || study.status === "completed" ? "/researcher/recruitment/$studyId" : "/researcher/studies",
										params: study.status === "active" || study.status === "paused" || study.status === "completed" ? { studyId: study.id } : void 0,
										children: study.status === "draft" || study.status === "rejected" ? "Manage" : "Open"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
									value: snap.acceptedPercent,
									label: `${snap.accepted} accepted of ${snap.target} · ${snap.eligible} recruited · ${snap.completed} completed`
								})
							})]
						}, study.id);
					})
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink-soft",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl font-semibold tabular-nums",
			children: value
		})]
	});
}
function ReportsPanel() {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.ownerId === user?.id));
	const responses = useDemoStore((state) => state.responses);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ink-soft",
				children: [
					"The file contains study-level counts only. Participant names and email addresses are not included. The download is generated ",
					server ? "from the records on the server" : "in this browser",
					"."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: () => {
					const header = [
						"Title",
						"Status",
						"Origin",
						"Target",
						"Recruited",
						"Completed",
						"Awaiting review",
						"Accepted",
						"Excluded",
						"Needs review",
						"Deadline"
					];
					const lines = studies.map((study) => {
						const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
						return [
							study.title,
							STATUS_LABEL[study.status],
							study.origin,
							snap.target,
							snap.eligible,
							snap.completed,
							snap.awaiting,
							snap.accepted,
							snap.excluded,
							snap.needsReview,
							study.deadline
						].map(csvCell).join(",");
					});
					const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
					const url = URL.createObjectURL(blob);
					const anchor = document.createElement("a");
					anchor.href = url;
					anchor.download = "researchconnect-demo-report.csv";
					anchor.click();
					URL.revokeObjectURL(url);
					toast.success("Downloaded a CSV of demo records from this browser. Nothing was exported from a server.");
				},
				children: "Download CSV"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: "Recruited"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Accepted"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: studies.map((study) => {
					const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [study.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-ink-soft",
									children: STATUS_LABEL[study.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: snap.eligible
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: snap.completed
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular-nums",
								children: snap.accepted
							})
						]
					}, study.id);
				}) })]
			})
		})]
	});
}
function csvCell(value) {
	const text = String(value ?? "");
	if (/[",\n]/.test(text)) return `"${text.replaceAll("\"", "\"\"")}"`;
	return text;
}
function ParticipantOverview() {
	const user = useSessionUser();
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.status === "active"));
	const applications = useDemoQuery((state) => state.applications.filter((item) => item.participantId === user?.id));
	const allStudies = useDemoQuery((state) => state.studies);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open studies",
						value: studies.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Your applications",
						value: applications.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active consents",
						value: applications.filter((item) => item.status === "consented").length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Your participation"
				}), applications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: "You have not consented, declined, or withdrawn yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-3",
					children: applications.map((item) => {
						const study = allStudies.find((entry) => entry.id === item.studyId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line px-3 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: study?.title ?? "Study"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-ink-soft capitalize",
								children: item.status
							})] }), study ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/participant/studies/$studyId",
									params: { studyId: study.id },
									children: "Open"
								})
							}) : null]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Open studies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: "Read a study fully before you consent. Rewards are listed only when a researcher has stated them, and unconfirmed rewards are not promised."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3",
						children: studies.slice(0, 4).map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: study.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-ink-soft",
								children: [
									study.completionMinutes,
									" min · ",
									deadlinePhrase(study.deadline)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/participant/studies/$studyId",
									params: { studyId: study.id },
									children: "Read study"
								})
							})]
						}, study.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/participant/studies",
							children: "Browse open studies"
						})
					})
				]
			})
		]
	});
}
function ApplicationsList({ history = false }) {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	const applications = useDemoStore((state) => state.applications);
	const studies = useDemoStore((state) => state.studies);
	const rows = applications.filter((item) => item.participantId === user?.id).filter((item) => {
		const study = studies.find((entry) => entry.id === item.studyId);
		if (!history) return true;
		return item.status !== "consented" || study?.status === "completed";
	});
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: history ? "No history yet" : "No applications yet",
		body: server ? "When you consent, decline, or withdraw, the record is kept on the server." : "When you consent, decline, or withdraw, the record stays in this browser."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: rows.map((item) => {
			const study = studies.find((entry) => entry.id === item.studyId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study?.status ?? "draft" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold uppercase tracking-wide text-ink-soft",
							children: item.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-xl font-semibold",
						children: study?.title ?? "Removed study"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: ["Updated ", formatDate(item.updatedAt)]
					}),
					study ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/participant/studies/$studyId",
							params: { studyId: study.id },
							children: "Open study"
						})
					}) : null
				]
			}, item.id);
		})
	});
}
function AdminOverview() {
	const server = useDataMode() === "server";
	const studies = useDemoStore((state) => state.studies);
	const users = useDemoStore((state) => state.users);
	const issues = useDemoStore((state) => state.issues);
	const pending = studies.filter((study) => study.status === "pending_review");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-sm",
				children: server ? "Administrator. These controls are authorized on the server — the browser cannot grant itself this access, and every action is written to the audit log." : "Admin preview. These controls change demo data in this browser only. Production would require server-side authorization. Hiding a button is not enough."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pending requests",
						value: pending.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active studies",
						value: studies.filter((study) => study.status === "active").length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open reports",
						value: issues.filter((issue) => issue.status !== "closed").length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: server ? "Accounts" : "Demo accounts",
						value: users.filter((user) => user.role !== "admin").length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Waiting for review"
				}), pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: "Nothing is pending."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: pending.map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "font-medium text-brand underline",
						to: "/admin/reviews/$studyId",
						params: { studyId: study.id },
						children: study.title
					}) }, study.id))
				})]
			})
		]
	});
}
function ReviewList() {
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.status === "pending_review"));
	if (studies.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No pending requests",
		body: "New submissions from this browser will appear here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: studies.map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-wrap items-center justify-between gap-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: study.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ink-soft",
				children: ["Submitted ", formatDate(study.updatedAt)]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/reviews/$studyId",
					params: { studyId: study.id },
					children: "Review"
				})
			})]
		}, study.id))
	});
}
function ReviewDetail({ studyId }) {
	const server = useDataMode() === "server";
	const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
	const owner = useDemoStore((state) => state.users.find((user) => user.id === study?.ownerId));
	const actor = useSessionUser();
	const [note, setNote] = (0, import_react.useState)("");
	const [action, setAction] = (0, import_react.useState)(null);
	if (!study || !actor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Study not found",
		body: server ? "It is not on the server." : "It is not in this browser."
	});
	const fields = [
		["Purpose", study.purpose],
		["Description", study.description],
		["Category", study.category],
		["Institution", study.institution],
		["Population", study.targetPopulation],
		["Inclusion", study.inclusion],
		["Exclusion", study.exclusion],
		["Method", study.method],
		["Target", String(study.targetCount)],
		["Deadline", study.deadline || "—"],
		["Minutes", String(study.completionMinutes)],
		["Questionnaire", study.questionnaireUrl || "Missing"],
		["Incentive", study.incentive || "None confirmed"],
		["Information statement", study.informationStatement],
		["Privacy acknowledgement", study.privacyAck ? "Yes" : "No"],
		["Approval acknowledgement", study.approvalAck ? "Yes" : "No"]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-ink-soft",
					children: owner?.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold",
				children: study.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "grid gap-3 p-5",
				children: fields.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-ink-soft uppercase",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm whitespace-pre-wrap",
					children: value
				})] }, label))
			}),
			study.status === "pending_review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setAction("approve"),
						children: "Approve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => setAction("changes"),
						children: "Request changes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						onClick: () => setAction("reject"),
						children: "Reject"
					})
				]
			}) : null,
			study.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => setAction("pause"),
				children: "Pause study"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				open: action === "reject" || action === "changes",
				onOpenChange: (open) => {
					if (!open) setAction(null);
				},
				title: action === "reject" ? "Reject this request" : "Request changes",
				description: server ? "Write a reason the researcher can act on. It is stored on the server." : "Write a reason the researcher can act on. This is stored only in this browser.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Reason",
					htmlFor: "review-note",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "review-note",
						value: note,
						onChange: (event) => setNote(event.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: action === "reject" ? "danger" : "primary",
					onClick: async () => {
						if (!action || action === "approve" || action === "pause") return;
						const result = await researchService.reviewStudy(actor.id, study.id, action, note);
						if (result.ok) {
							toast.success(result.message);
							setAction(null);
							setNote("");
						} else toast.error(result.error);
					},
					children: "Confirm"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: action === "approve" || action === "pause",
				onOpenChange: (open) => {
					if (!open) setAction(null);
				},
				title: action === "approve" ? "Approve this study?" : "Pause this study?",
				body: action === "approve" ? "Approval does not publish it. The researcher must open recruitment. This decision stays in the browser." : "Pausing stops new consent. Because this is an admin pause, the researcher cannot resume it themselves in the demo.",
				confirmLabel: action === "approve" ? "Approve" : "Pause",
				onConfirm: async () => {
					const result = action === "approve" ? await researchService.reviewStudy(actor.id, study.id, "approve", "") : await researchService.setPaused(actor.id, study.id, true);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
					setAction(null);
				}
			}),
			study.status === "active" || study.status === "paused" || study.status === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruitmentDetail, { studyId: study.id }) : null
		]
	});
}
function UserAdmin() {
	const server = useDataMode() === "server";
	const actor = useSessionUser();
	const users = useDemoStore((state) => state.users);
	const [target, setTarget] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-xl border border-line bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[40rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "border-b border-line text-ink-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Role"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "State"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Action"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3",
						children: [user.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-ink-soft",
							children: user.origin === "sample" ? "Sample account" : server ? "Account on the server" : "Created in this browser"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: user.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: user.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3",
						children: [user.suspended ? "Suspended" : "Active", user.emailVerified ? "" : " · email not verified"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: user.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-ink-soft",
							children: "Preview only"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => setTarget({
								id: user.id,
								suspend: !user.suspended,
								email: user.email
							}),
							children: user.suspended ? "Restore" : "Suspend"
						})
					})
				]
			}, user.id)) })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: Boolean(target),
		onOpenChange: (open) => {
			if (!open) setTarget(null);
		},
		title: target?.suspend ? "Suspend this demo account?" : "Restore this demo account?",
		body: server ? "The account is suspended on the server and cannot sign in until it is restored." : "This only affects the copy stored in this browser. It does not change a server.",
		confirmLabel: target?.suspend ? "Suspend" : "Restore",
		destructive: target?.suspend,
		onConfirm: async () => {
			if (!actor || !target) return;
			const result = await researchService.suspendUser(actor.id, target.id, target.suspend);
			if (result.ok) toast.success(result.message);
			else toast.error(result.error);
			setTarget(null);
		}
	})] });
}
function MonitoringTable() {
	const studies = useDemoQuery((state) => state.studies.filter((study) => study.status === "active" || study.status === "paused"));
	const responses = useDemoStore((state) => state.responses);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						children: "Recruited"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Completed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Accepted"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: studies.map((study) => {
				const snap = recruitmentSnapshot(study, responses.filter((item) => item.studyId === study.id));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: study.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: snap.eligible
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: snap.completed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 tabular-nums",
							children: snap.accepted
						})
					]
				}, study.id);
			}) })]
		})
	});
}
function IssuesPanel() {
	const server = useDataMode() === "server";
	const actor = useSessionUser();
	const issues = useDemoStore((state) => state.issues);
	const [pending, setPending] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: issue.subject
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs font-semibold uppercase text-ink-soft",
						children: [
							issue.status,
							" · ",
							issue.source,
							" · ",
							issue.origin === "sample" ? "Sample" : "This browser"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: issue.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-ink-soft",
					children: [
						issue.name,
						" · ",
						issue.email,
						" · ",
						formatDateTime(issue.createdAt)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						"open",
						"reviewing",
						"closed"
					].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: issue.status === status ? "primary" : "secondary",
						onClick: () => setPending({
							id: issue.id,
							status
						}),
						children: status
					}, status))
				})
			]
		}, issue.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: Boolean(pending),
			onOpenChange: (open) => {
				if (!open) setPending(null);
			},
			title: "Update this report?",
			body: server ? "The new status is saved on the server." : "The new status is stored in this browser only.",
			confirmLabel: "Update",
			onConfirm: async () => {
				if (!actor || !pending) return;
				const result = await researchService.setIssueStatus(actor.id, pending.id, pending.status);
				if (result.ok) toast.success(result.message);
				else toast.error(result.error);
				setPending(null);
			}
		})]
	});
}
function AuditList() {
	const audits = useDemoStore((state) => state.audits);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-xl border border-line bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[36rem] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "border-b border-line text-ink-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "When"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Actor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Action"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium",
						children: "Detail"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: audits.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line last:border-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 whitespace-nowrap",
						children: formatDateTime(event.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: event.actorName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3",
						children: event.action
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3",
						children: [event.detail, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-ink-soft",
							children: event.origin === "sample" ? "Sample record" : "This browser"
						})]
					})
				]
			}, event.id)) })]
		})
	});
}
//#endregion
export { MonitoringTable as a, ResearcherOverview as c, UserAdmin as d, IssuesPanel as i, ReviewDetail as l, ApplicationsList as n, ParticipantOverview as o, AuditList as r, ReportsPanel as s, AdminOverview as t, ReviewList as u };
