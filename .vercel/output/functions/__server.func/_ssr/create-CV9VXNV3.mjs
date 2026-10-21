import { o as __toESM } from "../_runtime.mjs";
import { r as METHODS, t as CATEGORIES } from "./sample-data-tji98cyF.mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as validateFullStudy, E as toForm, O as useDemoStore, j as validateStep, k as useSessionUser, t as Button, u as emptyStudyForm } from "./store-BQzU-IjM.mjs";
import { w as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as researchService, o as Route$14 } from "./router-CMq6LOtj.mjs";
import { r as PageHeader } from "./shells-DTkoj-6x.mjs";
import { n as ProgressBar, t as Card } from "./card-CRc-JasC.mjs";
import { n as Field, o as Select, r as Input, s as Textarea, t as Checkbox } from "./field-DFwMbXWQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/create-CV9VXNV3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Study",
	"Eligibility",
	"Recruitment",
	"Consent"
];
function CreateStudyForm({ studyId }) {
	const user = useSessionUser();
	const navigate = useNavigate();
	const existing = useDemoStore((state) => state.studies).find((study) => study.id === studyId && study.ownerId === user?.id);
	const [step, setStep] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [values, setValues] = (0, import_react.useState)(() => {
		if (existing && (existing.status === "draft" || existing.status === "rejected")) return toForm(existing);
		const state = useDemoStore.getState();
		if (!studyId && state.wizard && !state.editingStudyId) return state.wizard;
		const blank = emptyStudyForm();
		if (user?.institution) blank.institution = user.institution;
		return blank;
	});
	(0, import_react.useEffect)(() => {
		if (!studyId) useDemoStore.getState().saveWizard(values, null);
	}, [values, studyId]);
	function update(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
		setErrors((current) => {
			const next = { ...current };
			delete next[key];
			return next;
		});
	}
	function goNext() {
		const found = validateStep(step, values);
		setErrors(found);
		if (Object.keys(found).length) return;
		setStep((current) => Math.min(3, current + 1));
	}
	if (!user || user.role !== "researcher") return null;
	if (studyId && !existing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-danger",
		children: "That draft is not in this researcher session."
	});
	if (existing && existing.status !== "draft" && existing.status !== "rejected") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This study can no longer be edited. Only drafts and rejected requests stay editable." });
	async function saveDraft() {
		setBusy("draft");
		const result = await researchService.upsertDraft(user.id, values, existing?.id);
		setBusy(null);
		if (!result.ok) {
			toast.error(result.error);
			return;
		}
		toast.success(result.message);
		navigate({ to: "/researcher/studies" });
	}
	async function submit() {
		const found = validateFullStudy(values);
		if (Object.keys(found).length) {
			setErrors(found);
			toast.error("Complete the highlighted fields before submitting.");
			if (found.title || found.purpose || found.description || found.category) setStep(0);
			else if (found.targetPopulation || found.inclusion || found.ageMin || found.ageMax) setStep(1);
			else if (found.targetCount || found.deadline || found.method || found.questionnaireUrl) setStep(2);
			else setStep(3);
			return;
		}
		setBusy("submit");
		const saved = await researchService.upsertDraft(user.id, values, existing?.id);
		if (!saved.ok || !saved.data) {
			setBusy(null);
			toast.error(saved.error ?? "The draft was not saved.");
			return;
		}
		const submitted = await researchService.submitForReview(user.id, saved.data.id);
		setBusy(null);
		if (!submitted.ok) {
			toast.error(submitted.error);
			return;
		}
		toast.success(submitted.message);
		navigate({ to: "/researcher/studies" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium text-ink-soft",
					children: [
						"Step ",
						step + 1,
						" of ",
						STEPS.length,
						": ",
						STEPS[step]
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
						value: (step + 1) / STEPS.length * 100,
						label: "Create study progress"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 flex flex-wrap gap-2",
					children: STEPS.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: index === step ? "min-h-10 rounded-full bg-brand px-3 text-sm text-brand-foreground" : "min-h-10 rounded-full border border-line bg-surface px-3 text-sm",
						onClick: () => {
							if (index < step) setStep(index);
						},
						disabled: index > step,
						children: [
							index + 1,
							". ",
							label
						]
					}) }, label))
				})
			] }),
			existing?.changeRequest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-sm",
				children: ["Changes requested: ", existing.changeRequest]
			}) : null,
			existing?.rejectionReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm",
				children: ["Rejected: ", existing.rejectionReason]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-4 p-5",
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Study title",
							htmlFor: "title",
							error: errors.title,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "title",
								value: values.title,
								onChange: (event) => update("title", event.target.value),
								"aria-invalid": Boolean(errors.title),
								"aria-describedby": errors.title ? "title-error" : void 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Research purpose",
							htmlFor: "purpose",
							error: errors.purpose,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "purpose",
								value: values.purpose,
								onChange: (event) => update("purpose", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Brief description",
							htmlFor: "description",
							error: errors.description,
							hint: "Write it for a student who has never heard of the project.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "description",
								value: values.description,
								onChange: (event) => update("description", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Research category",
							htmlFor: "category",
							error: errors.category,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								id: "category",
								value: values.category,
								onChange: (event) => update("category", event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Choose a category"
								}), CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Research institution, if applicable",
							htmlFor: "institution",
							error: errors.institution,
							hint: "Name the department if this is a student project. Do not imply the university has endorsed the platform.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "institution",
								value: values.institution,
								onChange: (event) => update("institution", event.target.value)
							})
						})
					] }) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Target population",
							htmlFor: "population",
							error: errors.targetPopulation,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "population",
								value: values.targetPopulation,
								onChange: (event) => update("targetPopulation", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Minimum age",
								htmlFor: "ageMin",
								error: errors.ageMin,
								hint: "Leave both ages blank if age is not a criterion. Under-16 studies are not listed in this version.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ageMin",
									inputMode: "numeric",
									value: values.ageMin,
									onChange: (event) => update("ageMin", event.target.value)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Maximum age",
								htmlFor: "ageMax",
								error: errors.ageMax,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ageMax",
									inputMode: "numeric",
									value: values.ageMax,
									onChange: (event) => update("ageMax", event.target.value)
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "University or location",
							htmlFor: "location",
							error: errors.location,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "location",
								value: values.location,
								onChange: (event) => update("location", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Inclusion criteria",
							htmlFor: "inclusion",
							error: errors.inclusion,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "inclusion",
								value: values.inclusion,
								onChange: (event) => update("inclusion", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Exclusion criteria",
							htmlFor: "exclusion",
							error: errors.exclusion,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "exclusion",
								value: values.exclusion,
								onChange: (event) => update("exclusion", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Additional eligibility questions",
							htmlFor: "extra",
							error: errors.extraQuestions,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "extra",
								value: values.extraQuestions,
								onChange: (event) => update("extraQuestions", event.target.value)
							})
						})
					] }) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Desired number of participants",
							htmlFor: "target",
							error: errors.targetCount,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "target",
								inputMode: "numeric",
								value: values.targetCount,
								onChange: (event) => update("targetCount", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Recruitment deadline",
							htmlFor: "deadline",
							error: errors.deadline,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "deadline",
								type: "date",
								value: values.deadline,
								onChange: (event) => update("deadline", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Preferred recruitment method",
							htmlFor: "method",
							error: errors.method,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								id: "method",
								value: values.method,
								onChange: (event) => update("method", event.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Choose a method"
								}), METHODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estimated completion time (minutes)",
							htmlFor: "minutes",
							error: errors.completionMinutes,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "minutes",
								inputMode: "numeric",
								value: values.completionMinutes,
								onChange: (event) => update("completionMinutes", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Questionnaire URL",
							htmlFor: "url",
							error: errors.questionnaireUrl,
							hint: "Paste a link from the survey tool you already use. This platform does not host the questionnaire.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "url",
								type: "url",
								value: values.questionnaireUrl,
								onChange: (event) => update("questionnaireUrl", event.target.value),
								placeholder: "https://"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Incentive information",
							htmlFor: "incentive",
							error: errors.incentive,
							hint: "If nothing is confirmed, say so. Do not promise airtime, money, or marks.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "incentive",
								value: values.incentive,
								onChange: (event) => update("incentive", event.target.value)
							})
						})
					] }) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Participant information statement",
							htmlFor: "statement",
							error: errors.informationStatement,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "statement",
								value: values.informationStatement,
								onChange: (event) => update("informationStatement", event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: values.privacyAck,
							onCheckedChange: (checked) => update("privacyAck", checked),
							label: "I will collect only what the study needs, and I will not ask this platform to publish participant contact details."
						}),
						errors.privacyAck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: errors.privacyAck
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: values.approvalAck,
							onCheckedChange: (checked) => update("approvalAck", checked),
							label: "I confirm I will get any supervisor or institutional approval this project requires before collecting data."
						}),
						errors.approvalAck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: errors.approvalAck
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-canvas p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-medium",
									children: "Summary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 grid gap-1 text-ink-soft",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: values.title || "Untitled" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											values.category || "No category",
											" · ",
											values.location || "No location"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
											"Target ",
											values.targetCount || "—",
											" · ",
											values.completionMinutes || "—",
											" min · deadline ",
											values.deadline || "—"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: "break-all",
											children: values.questionnaireUrl || "No questionnaire link yet"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2",
									children: "Submitting marks the request pending review. It does not publish it."
								})
							]
						})
					] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								onClick: () => setStep((current) => current - 1),
								children: "Back"
							}) : null,
							step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: goNext,
								children: "Continue"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								busy: busy === "submit",
								onClick: () => void submit(),
								children: "Submit for review"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								busy: busy === "draft",
								onClick: () => void saveDraft(),
								children: "Save draft"
							})
						]
					})
				]
			})
		]
	});
}
function Page() {
	const { studyId } = Route$14.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: studyId ? "Edit study" : "Create study",
		description: "Save a draft or submit for review. Submitting does not publish the study."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateStudyForm, { studyId })] });
}
//#endregion
export { Page as component };
