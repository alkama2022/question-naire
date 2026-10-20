import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { C as ClipboardCheck, a as ShieldCheck, l as MessagesSquare } from "../_libs/lucide-react.mjs";
import { D as useDemoQuery, l as deadlinePhrase, t as Button } from "./store-BQzU-IjM.mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { n as OriginNote, t as MarketingShell } from "./shells-DTkoj-6x.mjs";
import { r as StatusBadge } from "./badge-Bb45WRuY.mjs";
import { n as ProgressBar, t as Card } from "./card-CRc-JasC.mjs";
import { n as recruitmentSnapshot, t as isPublicStudy } from "./metrics-Djf8O_va.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bqf-l_W8.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-wide text-accent uppercase",
					children: "For Nigerian student and campus research"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
					children: "Recruit the right participants, and keep a record of it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-lg text-ink-soft",
					children: "Final-year projects often live in class WhatsApp groups: no list of who was eligible, no separation between people who opened a form and responses you are willing to keep. ResearchConnect is a simpler place to describe a study, share the questionnaire you already use, and watch the numbers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							search: { role: "researcher" },
							children: "Find Research Participants"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/studies",
							children: "Explore Studies"
						})
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleDashboard, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpenStudies, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold",
				children: "How it works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 grid gap-4 md:grid-cols-3",
				children: [
					[
						"01",
						"Describe the study",
						"Title, purpose, who can take part, and the survey link you already have."
					],
					[
						"02",
						"Wait for a basic review",
						"A request is not public until someone reviews it. You cannot publish it yourself."
					],
					[
						"03",
						"Track three different counts",
						"People recruited, questionnaires marked complete, and responses accepted are not the same thing."
					]
				].map(([step, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-line bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl text-accent",
							children: step
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-xl font-semibold",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-soft",
							children: body
						})
					]
				}, step))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 py-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "For researchers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 grid gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								icon: ClipboardCheck,
								text: "Write eligibility in plain language before anyone is asked to join."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								icon: MessagesSquare,
								text: "Keep the questionnaire in Google Forms, Microsoft Forms, or whatever you already use."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								icon: ShieldCheck,
								text: "See drafts, reviews, pauses, and completions without mixing them into one vague total."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5",
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/for-researchers",
							children: "See the researcher workflow"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "For participants"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 grid gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								icon: ClipboardCheck,
								text: "Read what the study involves before any consent box."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								icon: MessagesSquare,
								text: "Decline, or withdraw later, without hunting through a group chat."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								icon: ShieldCheck,
								text: "Your email is not shown on the researcher's recruitment list."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5",
						variant: "secondary",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/for-participants",
							children: "See what participants do"
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold",
					children: "What a quality check can and cannot do"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium",
						children: "It can"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 grid gap-2 text-sm text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Show recruited, completed, and accepted counts separately." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Label a record Pending, Accepted, Excluded, or Needs review." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Keep drafts and unapproved requests off the public list." })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium",
						children: "It cannot"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 grid gap-2 text-sm text-ink-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Prove that an answer is honest or that a person is who they say they are." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Replace ethics approval, a supervisor, or a department." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Judge whether a questionnaire is scientifically valid." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pull live results from an external form in this version." })
						]
					})] })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-brand px-6 py-10 text-brand-foreground sm:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "Start with the study you already have in mind."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-brand-foreground/80",
						children: "This version runs as a clearly labelled demo in your browser. It is enough to walk through recruitment before any server is connected."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "accent",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								search: { role: "researcher" },
								children: "Find Research Participants"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/how-it-works",
								children: "How it works"
							})
						})]
					})
				]
			})
		})
	] });
}
function OpenStudies() {
	const server = useDataMode() === "server";
	const studies = useDemoQuery((state) => state.studies.filter((study) => isPublicStudy(study.status)));
	const users = useDemoQuery((state) => state.users);
	const visible = studies.slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl font-semibold",
				children: "Studies you can open now"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-ink-soft",
				children: server ? "These are labelled sample records kept on the server. Drafts and studies still in review are not shown." : "These are labelled sample records stored in this browser. Drafts and studies still in review are not shown."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studies",
					children: "Browse all"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 md:grid-cols-3",
			children: visible.map((study) => {
				const owner = users.find((user) => user.id === study.ownerId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginNote, { origin: study.origin })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-lg font-semibold",
							children: study.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 line-clamp-3 text-sm text-ink-soft",
							children: study.purpose
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								owner?.institution ?? "Student project",
								" · ",
								study.completionMinutes,
								" min · ",
								deadlinePhrase(study.deadline)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/studies/$studyId",
									params: { studyId: study.id },
									children: "View study"
								})
							})
						})
					]
				}, study.id);
			})
		})]
	});
}
function Item({ icon: Icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "mt-0.5 size-4 shrink-0 text-accent",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
function SampleDashboard() {
	const study = useDemoQuery((state) => state.studies.find((item) => item.id === "stu-sleep"));
	const responses = useDemoQuery((state) => state.responses.filter((item) => item.studyId === "stu-sleep"));
	const snap = study ? recruitmentSnapshot(study, responses) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-2xl border border-line bg-surface shadow-sm",
		"aria-label": "Sample dashboard preview using demonstration numbers",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "flex items-center justify-between gap-3 border-b border-line bg-brand px-4 py-2 text-xs font-semibold tracking-wide text-brand-foreground uppercase",
			children: ["Sample preview", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Not live data" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid sm:grid-cols-[7.5rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden border-r border-line bg-canvas p-3 text-xs text-ink-soft sm:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-brand",
						children: "Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "My studies"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "Recruitment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: "Reports"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-soft",
						children: "Active study"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg font-semibold",
						children: study?.title ?? "Social media use and sleep quality among undergraduates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-3 gap-2 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "Recruited",
								value: snap?.eligible ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "Completed",
								value: snap?.completed ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
								label: "Accepted",
								value: snap?.accepted ?? 0
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
							value: snap?.acceptedPercent ?? 0,
							label: "Accepted toward target"
						})
					})
				]
			})]
		})]
	});
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-canvas px-2 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-semibold tabular-nums",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-ink-soft",
			children: label
		})]
	});
}
//#endregion
export { Home as component };
