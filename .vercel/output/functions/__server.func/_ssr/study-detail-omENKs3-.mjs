import { o as __toESM } from "../_runtime.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { O as useDemoStore, S as researcherLabel, a as Modal, c as contactSchema, d as formatDate, k as useSessionUser, l as deadlinePhrase, t as Button } from "./store-BQzU-IjM.mjs";
import { C as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as researchService } from "./router-CMq6LOtj.mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { n as OriginNote } from "./shells-DTkoj-6x.mjs";
import { r as StatusBadge, t as Badge } from "./badge-Bb45WRuY.mjs";
import { t as Card } from "./card-CRc-JasC.mjs";
import { n as ErrorNote } from "./feedback-BNBmeAy5.mjs";
import { n as Field, r as Input, s as Textarea, t as Checkbox } from "./field-DFwMbXWQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-detail-omENKs3-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudyDetail({ studyId }) {
	const server = useDataMode() === "server";
	const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
	const owner = useDemoStore((state) => state.users.find((user) => user.id === study?.ownerId));
	const user = useSessionUser();
	const application = useDemoStore((state) => state.applications.find((item) => item.studyId === studyId && item.participantId === user?.id));
	const [reportOpen, setReportOpen] = (0, import_react.useState)(false);
	if (!study || study.status !== "active" && study.status !== "paused" && study.status !== "completed" && user?.role !== "admin" && user?.id !== study.ownerId) {
		if (!study) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNote, {
			title: server ? "Study not found" : "Study not in this browser",
			body: server ? "It may have been removed, or the link may be wrong. Browse the studies that are open." : "It may have been cleared when demo data was reset. Browse the studies that are still stored here."
		});
	}
	if (!study) return null;
	if (study.status !== "active" && study.status !== "paused" && study.status !== "completed" && user?.id !== study.ownerId && user?.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorNote, {
		title: "This study is not public",
		body: "Drafts and studies still in review stay off the public list."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: study.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: study.category || "Uncategorised" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginNote, { origin: study.origin })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-semibold",
						children: study.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-ink-soft",
						children: study.purpose
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: "What participation involves"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6",
								children: study.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid gap-3 text-sm sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Researcher or institution"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: researcherLabel(owner?.name ?? "", study.institution) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Estimated time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.completionMinutes ? `${study.completionMinutes} minutes` : "Not stated" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Deadline"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.deadline ? `${formatDate(study.deadline)} · ${deadlinePhrase(study.deadline)}` : "Not set" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.location || "Not restricted" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Who can take part"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.inclusion || "Not stated yet" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Who should not take part"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.exclusion || "None stated" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Age range"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.ageMin && study.ageMax ? `${study.ageMin}–${study.ageMax}` : "Not used as a criterion" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-ink-soft",
										children: "Incentive"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: study.incentive || "No incentive has been confirmed." })] })
								]
							}),
							study.extraQuestions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: "Extra eligibility question: "
								}), study.extraQuestions]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold",
								children: "Information statement"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6",
								children: study.informationStatement || "The researcher has not written an information statement yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-ink-soft",
								children: "The questionnaire, if linked, is hosted outside ResearchConnect. This page does not submit answers to that form for you."
							}),
							study.questionnaireUrl && application?.status === "consented" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm",
								children: [
									"Questionnaire link:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "font-medium text-brand underline",
										href: study.questionnaireUrl,
										target: "_blank",
										rel: "noreferrer",
										children: study.questionnaireUrl
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-ink-soft",
								children: "The questionnaire link is shown after you consent, and only while the study is open."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-left text-sm font-medium text-brand underline",
						onClick: () => setReportOpen(true),
						children: "Report a problem with this study"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticipationCard, { studyId: study.id }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportDialog, {
				open: reportOpen,
				onOpenChange: setReportOpen,
				studyId: study.id,
				title: study.title
			})
		]
	});
}
function ParticipationCard({ studyId }) {
	const server = useDataMode() === "server";
	const study = useDemoStore((state) => state.studies.find((item) => item.id === studyId));
	const user = useSessionUser();
	const application = useDemoStore((state) => state.applications.find((item) => item.studyId === studyId && item.participantId === user?.id));
	const [ageOk, setAgeOk] = (0, import_react.useState)(false);
	const [includeOk, setIncludeOk] = (0, import_react.useState)(false);
	const [excludeOk, setExcludeOk] = (0, import_react.useState)(false);
	const [readOk, setReadOk] = (0, import_react.useState)(false);
	const [voluntaryOk, setVoluntaryOk] = (0, import_react.useState)(false);
	const [withdrawOk, setWithdrawOk] = (0, import_react.useState)(false);
	const [agree, setAgree] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!study) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Want to take part?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: server ? "Sign in with a participant account. Researcher accounts cannot enrol themselves." : "Use a participant demo session. Researcher accounts cannot enrol themselves, and there is no secure login in this demo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						search: { role: "participant" },
						children: "Register as a participant"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Log in"
					})
				})]
			})
		]
	});
	if (user.role !== "participant") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold",
			children: "Participant consent"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-ink-soft",
			children: [
				"This session is a ",
				user.role,
				". Open a participant session to screen and consent. Your own studies are managed from the researcher workspace."
			]
		})]
	});
	if (application?.status === "consented") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "You consented"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: [
					"Recorded ",
					server ? "on the server" : "in this browser",
					" on",
					" ",
					formatDate(application.updatedAt),
					". You can withdraw while the study is still open. Withdrawing does not delete anything already stored in an external questionnaire."
				]
			}),
			study.status !== "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				variant: "secondary",
				busy,
				onClick: async () => {
					setBusy(true);
					const result = await researchService.withdrawFromStudy(user.id, study.id);
					setBusy(false);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
				},
				children: "Withdraw"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: "This study is closed."
			})
		]
	});
	if (application?.status === "withdrawn") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "You withdrew"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: [
					"That decision is stored ",
					server ? "on the server" : "in this browser",
					". You can consent again only if the study is still active."
				]
			}),
			study.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: "Use the screening below if you want to rejoin."
			}) : null,
			study.status !== "active" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screening, {
				studyHasAge: Boolean(study.ageMin && study.ageMax),
				ageOk,
				setAgeOk,
				includeOk,
				setIncludeOk,
				excludeOk,
				setExcludeOk,
				readOk,
				setReadOk,
				voluntaryOk,
				setVoluntaryOk,
				withdrawOk,
				setWithdrawOk,
				agree,
				setAgree,
				busy,
				onConsent: async () => {
					setBusy(true);
					const result = await researchService.consentToStudy(user.id, study.id);
					setBusy(false);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
				},
				onDecline: async () => {
					setBusy(true);
					const result = await researchService.declineStudy(user.id, study.id);
					setBusy(false);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
				}
			})
		]
	});
	if (study.status !== "active") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Not open"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: study.status === "paused" ? "Recruitment is paused. You can read the study, but new consent is not being taken." : "This study is closed to new participants."
			}),
			application?.status === "declined" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm",
				children: [
					"You previously declined. That note stays ",
					server ? "on the server" : "in this browser",
					"."
				]
			}) : null
		]
	});
	const eligible = includeOk && excludeOk && (!study.ageMin || ageOk);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "h-fit p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Eligibility and consent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: "Answer honestly. This screen does not prove that a response is truthful."
			}),
			application?.status === "declined" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: "You declined earlier. You can still consent if the study fits."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screening, {
				studyHasAge: Boolean(study.ageMin && study.ageMax),
				ageOk,
				setAgeOk,
				includeOk,
				setIncludeOk,
				excludeOk,
				setExcludeOk,
				readOk,
				setReadOk,
				voluntaryOk,
				setVoluntaryOk,
				withdrawOk,
				setWithdrawOk,
				agree,
				setAgree,
				busy,
				blocked: !eligible,
				onConsent: async () => {
					if (!eligible || !readOk || !voluntaryOk || !withdrawOk || !agree) {
						toast.error("Complete the eligibility answers and all consent statements first.");
						return;
					}
					setBusy(true);
					const result = await researchService.consentToStudy(user.id, study.id);
					setBusy(false);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
				},
				onDecline: async () => {
					setBusy(true);
					const result = await researchService.declineStudy(user.id, study.id);
					setBusy(false);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
				}
			})
		]
	});
}
function Screening(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-3",
		children: [
			props.studyHasAge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: props.ageOk,
				onCheckedChange: props.setAgeOk,
				label: "I am inside the age range for this study."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: props.includeOk,
				onCheckedChange: props.setIncludeOk,
				label: "I meet the inclusion criteria described above."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: props.excludeOk,
				onCheckedChange: props.setExcludeOk,
				label: "None of the exclusion criteria apply to me."
			}),
			!props.blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: props.readOk,
					onCheckedChange: props.setReadOk,
					label: "I have read the information statement."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: props.voluntaryOk,
					onCheckedChange: props.setVoluntaryOk,
					label: "I understand that participation is voluntary."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: props.withdrawOk,
					onCheckedChange: props.setWithdrawOk,
					label: "I understand that I can withdraw while the study is open."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: props.agree,
					onCheckedChange: props.setAgree,
					label: "I agree to take part."
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-soft",
				children: "Consent stays closed until the eligibility answers are yes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					busy: props.busy,
					onClick: props.onConsent,
					disabled: props.blocked,
					children: "I agree to take part"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					busy: props.busy,
					onClick: props.onDecline,
					children: "I decline"
				})]
			})
		]
	});
}
function ReportDialog({ open, onOpenChange, studyId, title }) {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	const [subject, setSubject] = (0, import_react.useState)(`Problem with: ${title}`);
	const [body, setBody] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open,
		onOpenChange,
		title: "Report a problem",
		description: server ? "This goes to the administrator inbox on the server. It is not emailed." : "This stays in the demo inbox on this browser. It is not emailed.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3",
			onSubmit: async (event) => {
				event.preventDefault();
				const parsed = contactSchema.safeParse({
					name: user?.name || "Anonymous",
					email: user?.email || "not-provided@demo.local",
					subject,
					message: body
				});
				if (!parsed.success) {
					setError(parsed.error.issues[0]?.message ?? "Check the report");
					return;
				}
				const result = await researchService.addIssue({
					source: "report",
					name: parsed.data.name,
					email: parsed.data.email,
					subject: parsed.data.subject,
					body: parsed.data.message,
					studyId
				});
				if (result.ok) {
					toast.success(result.message);
					onOpenChange(false);
					setBody("");
				} else toast.error(result.error);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Subject",
					htmlFor: "report-subject",
					error,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "report-subject",
						value: subject,
						onChange: (event) => setSubject(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "What happened?",
					htmlFor: "report-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "report-body",
						value: body,
						onChange: (event) => setBody(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: server ? "Send report" : "Save report in this browser"
				})
			]
		})
	});
}
//#endregion
export { StudyDetail as t };
