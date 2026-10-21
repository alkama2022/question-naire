import { i as PREVIEW_ADMIN_ID, s as cloneSeed } from "./sample-data-tji98cyF.mjs";
import { d as Slot, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Sn as url, _n as object, bn as string, fn as boolean, ln as _enum, pn as email } from "../_libs/@better-auth/core+[...].mjs";
import { n as number } from "../_libs/zod.mjs";
import { f as LoaderCircle, t as X } from "../_libs/lucide-react.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as DialogContent, f as DialogDescription, h as DialogTitle, i as AlertDialogContent, l as Dialog, m as DialogPortal, n as AlertDialogAction, o as AlertDialogOverlay, p as DialogOverlay, r as AlertDialogCancel, s as AlertDialogPortal, t as AlertDialog, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuPortal, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as TooltipProvider$1 } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as create, n as createJSONStorage, r as persist, t as useShallow } from "../_libs/zustand.mjs";
import { a as format, n as startOfToday, r as parseISO, s as differenceInCalendarDays } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BQzU-IjM.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50", {
	variants: {
		variant: {
			primary: "bg-brand text-brand-foreground hover:bg-brand/90",
			accent: "bg-accent text-accent-foreground hover:bg-accent/90",
			secondary: "border border-line bg-surface text-ink hover:bg-canvas",
			ghost: "bg-transparent text-ink hover:bg-brand/5",
			danger: "bg-danger text-danger-foreground hover:bg-danger/90"
		},
		size: {
			md: "min-h-11 px-4 text-sm",
			sm: "min-h-10 px-3 text-sm",
			lg: "min-h-12 px-5 text-base"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, busy, children, disabled, ...props }) {
	const classes = cn(buttonVariants({
		variant,
		size
	}), className);
	if (asChild) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slot, {
		className: classes,
		...props,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: classes,
		disabled: disabled || busy,
		"aria-busy": busy || void 0,
		type: "button",
		...props,
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "size-4 animate-spin",
			"aria-hidden": true
		}) : null, children]
	});
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider$1, {
		delayDuration: 300,
		children
	});
}
function Modal({ open, onOpenChange, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-brand/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-surface p-5 shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-xl font-semibold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
						className: "inline-flex size-10 items-center justify-center rounded-md hover:bg-canvas",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2 text-sm text-ink-soft",
					children: description
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children
				})
			]
		})] })
	});
}
function ConfirmDialog({ open, onOpenChange, title, body, confirmLabel, destructive, busy, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, { className: "fixed inset-0 z-40 bg-brand/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: "fixed top-1/2 left-1/2 z-50 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface p-5 shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "font-display text-xl font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
					className: "mt-2 text-sm leading-6 text-ink-soft",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							children: "Cancel"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: destructive ? "danger" : "primary",
							busy,
							onClick: onConfirm,
							children: confirmLabel
						})
					})]
				})
			]
		})] })
	});
}
function Menu$1({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			size: "sm",
			children: label
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		className: "z-30 min-w-48 rounded-lg border border-line bg-surface p-1 shadow-md",
		children
	}) })] });
}
function MenuItem({ children, onSelect, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
		disabled,
		onSelect,
		className: cn("min-h-10 cursor-pointer rounded-md px-3 py-2 text-sm outline-none data-[highlighted]:bg-canvas", disabled && "opacity-50"),
		children
	});
}
var currentMode = "server";
var resolved = false;
var listeners = /* @__PURE__ */ new Set();
/** Switch the app between the demo path and the server path. */
function setDataMode(mode) {
	if (currentMode === mode && resolved) return;
	currentMode = mode;
	resolved = true;
	for (const listener of listeners) listener();
}
/** The path the app is running on. */
function getDataMode() {
	return currentMode;
}
/** True when records are held by the server. */
function isServerMode() {
	return currentMode === "server";
}
/** True once the server has answered which path is live. */
function isDataModeResolved() {
	return resolved;
}
/** Subscribe to mode changes (used by the React hook below). */
function subscribeToDataMode(listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
function formatDate(value) {
	if (!value) return "—";
	return format(parseISO(value), "d MMM yyyy");
}
function formatDateTime(value) {
	return format(parseISO(value), "d MMM yyyy, HH:mm");
}
function todayIso() {
	const date = /* @__PURE__ */ new Date();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}
function daysUntil(value) {
	if (!value) return null;
	return differenceInCalendarDays(parseISO(value), startOfToday());
}
function deadlinePhrase(value) {
	const days = daysUntil(value);
	if (days === null) return "No deadline";
	if (days > 1) return `${days} days left`;
	if (days === 1) return "1 day left";
	if (days === 0) return "Due today";
	if (days === -1) return "1 day past deadline";
	return `${Math.abs(days)} days past deadline`;
}
function roleHome(role) {
	if (role === "researcher") return "/researcher";
	if (role === "participant") return "/participant";
	return "/admin";
}
function researcherLabel(name, institution) {
	if (name && institution) return `${name} · ${institution}`;
	return name || institution || "Researcher not named";
}
var registerSchema = object({
	name: string().trim().min(2, "Enter your full name"),
	email: email("Enter a valid email address"),
	password: string().min(8, "Use at least 8 characters"),
	confirm: string().min(1, "Confirm your password"),
	role: _enum(["researcher", "participant"], { error: "Choose researcher or participant. Admin access is not self-assigned." }),
	institution: string().trim().max(160, "Keep the institution name shorter"),
	programme: string().trim().max(160, "Keep the programme name shorter"),
	acceptTerms: boolean().refine((value) => value, "Accept the terms to start a demo session")
}).refine((value) => value.password === value.confirm, {
	path: ["confirm"],
	message: "Passwords do not match"
});
var loginSchema = object({
	email: email("Enter a valid email address"),
	password: string().min(1, "Enter your password")
});
var localPasswordSchema = object({
	email: email("Enter the email on the demo account"),
	password: string().min(8, "Use at least 8 characters"),
	confirm: string().min(1, "Confirm the new password")
}).refine((value) => value.password === value.confirm, {
	path: ["confirm"],
	message: "Passwords do not match"
});
var contactSchema = object({
	name: string().trim().min(2, "Enter your name"),
	email: email("Enter a valid email address"),
	subject: string().trim().min(4, "Add a subject"),
	message: string().trim().min(20, "Write at least a short message")
});
var profileSchema = object({
	name: string().trim().min(2, "Enter your name"),
	institution: string().trim().max(160, "Keep the institution name shorter"),
	programme: string().trim().max(160, "Keep the programme name shorter")
});
var STEP_SCHEMAS = [
	object({
		title: string().trim().min(8, "Give the study a clear title (at least 8 characters)"),
		purpose: string().trim().min(20, "Explain the research purpose in a sentence or two"),
		description: string().trim().min(40, "Add a short description a participant can understand"),
		category: string().min(1, "Choose a category"),
		institution: string().trim().max(180, "Keep the institution name shorter")
	}),
	object({
		targetPopulation: string().trim().min(8, "Describe who you hope to recruit"),
		ageMin: string().trim(),
		ageMax: string().trim(),
		location: string().trim().max(180, "Keep the location shorter"),
		inclusion: string().trim().min(8, "State who can take part"),
		exclusion: string().trim().max(800, "Keep exclusion criteria shorter"),
		extraQuestions: string().trim().max(800, "Keep extra questions shorter")
	}).superRefine((value, ctx) => {
		if (!value.ageMin && !value.ageMax) return;
		const min = Number(value.ageMin);
		const max = Number(value.ageMax);
		if (!value.ageMin || !value.ageMax || !Number.isInteger(min) || !Number.isInteger(max)) {
			ctx.addIssue({
				code: "custom",
				path: ["ageMin"],
				message: "Enter both a minimum and a maximum age, or leave both blank"
			});
			return;
		}
		if (min < 16 || max > 100 || min > max) ctx.addIssue({
			code: "custom",
			path: ["ageMax"],
			message: "Use an age range from 16 to 100, with the lower age first"
		});
	}),
	object({
		targetCount: number().int("Enter a whole number of participants").min(1, "Ask for at least 1 participant").max(1e4, "Keep the target at 10,000 or below for this version"),
		deadline: string().min(1, "Choose a recruitment deadline"),
		method: string().min(1, "Choose a recruitment method"),
		completionMinutes: number().int("Enter whole minutes").min(1, "Estimate at least 1 minute").max(180, "If it takes over 3 hours, say so in the description and keep this at 180 or less"),
		questionnaireUrl: url("Enter a full questionnaire link, including https://"),
		incentive: string().trim().max(280, "Keep the incentive note shorter")
	}).superRefine((value, ctx) => {
		if (value.deadline < todayIso()) ctx.addIssue({
			code: "custom",
			path: ["deadline"],
			message: "Choose a deadline that is today or later"
		});
	}),
	object({
		informationStatement: string().trim().min(40, "Write what participants will be told before they agree"),
		privacyAck: boolean().refine((value) => value, "Acknowledge how participant information will be handled"),
		approvalAck: boolean().refine((value) => value, "Confirm you will obtain any approval your institution or supervisor requires")
	})
];
function issuesToMap(issues) {
	const errors = {};
	for (const issue of issues) {
		const key = String(issue.path[0] ?? "form");
		if (!errors[key]) errors[key] = issue.message;
	}
	return errors;
}
function validateStep(step, values) {
	const schema = STEP_SCHEMAS[step];
	if (!schema) return {};
	const parsed = schema.safeParse(values);
	if (parsed.success) return {};
	return issuesToMap(parsed.error.issues);
}
function validateFullStudy(values) {
	return STEP_SCHEMAS.reduce((errors, schema) => {
		const parsed = schema.safeParse(values);
		if (parsed.success) return errors;
		return {
			...issuesToMap(parsed.error.issues),
			...errors
		};
	}, {});
}
function emptyStudyForm() {
	return {
		title: "",
		purpose: "",
		description: "",
		category: "",
		institution: "",
		targetPopulation: "",
		ageMin: "",
		ageMax: "",
		location: "",
		inclusion: "",
		exclusion: "",
		extraQuestions: "",
		targetCount: "100",
		deadline: "",
		method: "",
		completionMinutes: "10",
		questionnaireUrl: "",
		incentive: "",
		informationStatement: "",
		privacyAck: false,
		approvalAck: false
	};
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function id(prefix) {
	return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
function studyFromForm(values, base, status) {
	const ageMin = values.ageMin.trim() ? Number(values.ageMin) : null;
	const ageMax = values.ageMax.trim() ? Number(values.ageMax) : null;
	return {
		...base,
		title: values.title.trim(),
		purpose: values.purpose.trim(),
		description: values.description.trim(),
		category: values.category,
		institution: values.institution.trim(),
		targetPopulation: values.targetPopulation.trim(),
		ageMin: Number.isInteger(ageMin) ? ageMin : null,
		ageMax: Number.isInteger(ageMax) ? ageMax : null,
		location: values.location.trim(),
		inclusion: values.inclusion.trim(),
		exclusion: values.exclusion.trim(),
		extraQuestions: values.extraQuestions.trim(),
		targetCount: Number(values.targetCount) || 0,
		deadline: values.deadline,
		method: values.method,
		completionMinutes: Number(values.completionMinutes) || 0,
		questionnaireUrl: values.questionnaireUrl.trim(),
		incentive: values.incentive.trim(),
		informationStatement: values.informationStatement.trim(),
		privacyAck: values.privacyAck,
		approvalAck: values.approvalAck,
		status,
		rejectionReason: "",
		changeRequest: "",
		pausedByAdmin: false,
		updatedAt: nowIso()
	};
}
var initialData = {
	users: [],
	studies: [],
	applications: [],
	responses: [],
	notices: [],
	audits: [],
	issues: [],
	sessionUserId: null,
	wizard: null,
	editingStudyId: null
};
/**
* Where the demo records live.
*
* In demo mode this is the browser's `localStorage`, so a reload keeps the
* records. In server mode the database holds them — and nothing is written
* here, so a shared record (another person's name, a consent record) is never
* cached in this browser's storage.
*/
var demoStorage = createJSONStorage(() => ({
	getItem: (name) => {
		if (isServerMode()) return null;
		try {
			return window.localStorage.getItem(name);
		} catch {
			return null;
		}
	},
	setItem: (name, value) => {
		if (isServerMode()) return;
		try {
			window.localStorage.setItem(name, value);
		} catch {}
	},
	removeItem: (name) => {
		if (isServerMode()) return;
		try {
			window.localStorage.removeItem(name);
		} catch {}
	}
}));
var useDemoStore = create()(persist((set, get) => ({
	...initialData,
	register: (input) => {
		const email = input.email.trim().toLowerCase();
		if (get().users.some((user) => user.email.toLowerCase() === email)) return {
			ok: false,
			error: "That email already has a demo account in this browser."
		};
		const user = {
			id: id("usr"),
			name: input.name.trim(),
			email,
			password: input.password,
			role: input.role,
			institution: input.institution.trim(),
			programme: input.programme.trim(),
			emailVerified: false,
			notifyEmail: true,
			notifyInApp: true,
			suspended: false,
			createdAt: nowIso(),
			origin: "browser"
		};
		set({
			users: [...get().users, user],
			sessionUserId: user.id
		});
		audit(user, "Started demo session", `${user.role} registration in this browser`);
		return {
			ok: true,
			data: { userId: user.id },
			message: "Demo session started in this browser. No verification email was sent."
		};
	},
	login: (email, password) => {
		const user = get().users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
		if (!user || user.password !== password || !user.password) return {
			ok: false,
			error: "No demo account in this browser matches that email and password."
		};
		if (user.suspended) return {
			ok: false,
			error: "This demo account is suspended in this browser."
		};
		if (user.role === "admin") return {
			ok: false,
			error: "Admin preview is a separate button. It is not a password login."
		};
		set({ sessionUserId: user.id });
		return {
			ok: true,
			data: { userId: user.id },
			message: "Demo session opened in this browser."
		};
	},
	openAdminPreview: () => {
		const existing = get().users.find((user) => user.id === PREVIEW_ADMIN_ID);
		if (!existing) {
			const admin = {
				id: PREVIEW_ADMIN_ID,
				name: "Preview operator",
				email: "admin-preview@local.demo",
				password: "",
				role: "admin",
				institution: "ResearchConnect demo",
				programme: "Local preview only",
				emailVerified: true,
				notifyEmail: false,
				notifyInApp: true,
				suspended: false,
				createdAt: nowIso(),
				origin: "browser"
			};
			set({
				users: [...get().users, admin],
				sessionUserId: admin.id
			});
		} else set({ sessionUserId: existing.id });
	},
	logout: () => set({ sessionUserId: null }),
	setLocalPassword: (email, password) => {
		const match = get().users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
		if (!match) return {
			ok: false,
			error: "No demo account in this browser uses that email."
		};
		if (match.role === "admin") return {
			ok: false,
			error: "The admin preview does not use a password."
		};
		set({ users: get().users.map((user) => user.id === match.id ? {
			...user,
			password
		} : user) });
		return {
			ok: true,
			message: "Password updated in this browser only. No reset email was sent."
		};
	},
	markVerifiedInDemo: (userId) => {
		if (!get().users.find((item) => item.id === userId)) return {
			ok: false,
			error: "That demo session is missing."
		};
		set({ users: get().users.map((item) => item.id === userId ? {
			...item,
			emailVerified: true
		} : item) });
		return {
			ok: true,
			message: "Marked verified inside this browser. No email was checked."
		};
	},
	updateProfile: (userId, patch) => {
		if (get().sessionUserId !== userId) return {
			ok: false,
			error: "You can only edit the demo profile that is signed in."
		};
		set({ users: get().users.map((user) => user.id === userId ? {
			...user,
			name: patch.name.trim(),
			institution: patch.institution.trim(),
			programme: patch.programme.trim()
		} : user) });
		return {
			ok: true,
			message: "Profile updated in this browser."
		};
	},
	updatePrefs: (userId, prefs) => {
		set({ users: get().users.map((user) => user.id === userId ? {
			...user,
			...prefs
		} : user) });
		return {
			ok: true,
			message: "Preferences saved in this browser. Email alerts are not sent in demo mode."
		};
	},
	suspendUser: (actorId, userId, suspended) => {
		const actor = requireAdmin(get(), actorId);
		if (!actor.ok) return actor;
		if (userId === "usr-preview-admin") return {
			ok: false,
			error: "The admin preview session cannot suspend itself."
		};
		const target = get().users.find((user) => user.id === userId);
		if (!target) return {
			ok: false,
			error: "That account is not in this browser."
		};
		set({
			users: get().users.map((user) => user.id === userId ? {
				...user,
				suspended
			} : user),
			sessionUserId: get().sessionUserId === userId ? null : get().sessionUserId
		});
		audit(actor.user, suspended ? "Suspended demo account" : "Restored demo account", target.email);
		return {
			ok: true,
			message: suspended ? "Account suspended in this browser only." : "Account restored in this browser only."
		};
	},
	saveWizard: (values, editingStudyId = null) => set({
		wizard: values,
		editingStudyId
	}),
	upsertDraft: (ownerId, values, studyId) => {
		const owner = requireResearcher(get(), ownerId);
		if (!owner.ok) return owner;
		if (values.title.trim().length < 8) return {
			ok: false,
			error: "Add a title of at least 8 characters before saving a draft."
		};
		if (studyId) {
			const existing = get().studies.find((study) => study.id === studyId);
			if (!existing || existing.ownerId !== ownerId) return {
				ok: false,
				error: "That study is not editable from this session."
			};
			if (existing.status !== "draft" && existing.status !== "rejected") return {
				ok: false,
				error: "Only drafts and rejected requests can be edited."
			};
			const next = studyFromForm(values, {
				id: existing.id,
				ownerId,
				createdAt: existing.createdAt,
				origin: existing.origin
			}, "draft");
			set({
				studies: get().studies.map((study) => study.id === studyId ? next : study),
				wizard: null,
				editingStudyId: null
			});
			audit(owner.user, "Saved draft", next.title);
			return {
				ok: true,
				data: { id: studyId },
				message: "Draft saved in this browser."
			};
		}
		const created = studyFromForm(values, {
			id: id("stu"),
			ownerId,
			createdAt: nowIso(),
			origin: "browser"
		}, "draft");
		set({
			studies: [created, ...get().studies],
			wizard: null,
			editingStudyId: null
		});
		audit(owner.user, "Saved draft", created.title);
		return {
			ok: true,
			data: { id: created.id },
			message: "Draft saved in this browser."
		};
	},
	submitForReview: (ownerId, studyId) => {
		const owner = requireResearcher(get(), ownerId);
		if (!owner.ok) return owner;
		const existing = get().studies.find((study) => study.id === studyId);
		if (!existing || existing.ownerId !== ownerId) return {
			ok: false,
			error: "That study is not in this session."
		};
		if (existing.status !== "draft" && existing.status !== "rejected") return {
			ok: false,
			error: "Only a draft or a rejected request can be submitted."
		};
		const errors = validateFullStudy(toForm(existing));
		if (Object.keys(errors).length) return {
			ok: false,
			error: "This request still has gaps. Open the draft and complete the highlighted fields."
		};
		set({
			studies: get().studies.map((study) => study.id === studyId ? {
				...study,
				status: "pending_review",
				rejectionReason: "",
				changeRequest: "",
				updatedAt: nowIso()
			} : study),
			notices: [
				notice({
					userId: "role:admin",
					title: "A study is waiting for review",
					body: `${existing.title} was submitted from a demo session. It is not public.`,
					href: `/admin/reviews/${studyId}`
				}),
				notice({
					userId: ownerId,
					title: "Submitted for review",
					body: `${existing.title} is pending. It was not emailed to a reviewer and it is not public yet.`,
					href: "/researcher/studies"
				}),
				...get().notices
			]
		});
		audit(owner.user, "Submitted study for review", existing.title);
		return {
			ok: true,
			message: "Marked pending review in this browser. It was not sent to a server."
		};
	},
	openRecruitment: (ownerId, studyId) => {
		const owner = requireResearcher(get(), ownerId);
		if (!owner.ok) return owner;
		const existing = owned(get(), ownerId, studyId);
		if (!existing) return {
			ok: false,
			error: "That study is not in this session."
		};
		if (existing.status !== "approved") return {
			ok: false,
			error: "Open recruitment only after the request is approved."
		};
		setStatus(set, get, studyId, { status: "active" });
		audit(owner.user, "Opened recruitment", existing.title);
		return {
			ok: true,
			message: "The study is active in this browser and can appear in Browse."
		};
	},
	setPaused: (actorId, studyId, paused) => {
		const actor = get().users.find((user) => user.id === actorId);
		if (!actor) return {
			ok: false,
			error: "Sign in to the demo session first."
		};
		const existing = get().studies.find((study) => study.id === studyId);
		if (!existing) return {
			ok: false,
			error: "That study is not in this browser."
		};
		const isAdmin = actor.role === "admin";
		if (!isAdmin && existing.ownerId !== actorId) return {
			ok: false,
			error: "You can only change recruitment on your own study."
		};
		if (paused) {
			if (existing.status !== "active") return {
				ok: false,
				error: "Only an active study can be paused."
			};
			setStatus(set, get, studyId, {
				status: "paused",
				pausedByAdmin: isAdmin
			});
			audit(actor, "Paused study", existing.title);
			return {
				ok: true,
				message: "Recruitment paused in this browser."
			};
		}
		if (existing.status !== "paused") return {
			ok: false,
			error: "That study is not paused."
		};
		if (existing.pausedByAdmin && !isAdmin) return {
			ok: false,
			error: "An administrator paused this study. Only the admin preview can resume it."
		};
		setStatus(set, get, studyId, {
			status: "active",
			pausedByAdmin: false
		});
		audit(actor, "Resumed study", existing.title);
		return {
			ok: true,
			message: "Recruitment resumed in this browser."
		};
	},
	completeStudy: (ownerId, studyId) => {
		const owner = requireResearcher(get(), ownerId);
		if (!owner.ok) return owner;
		const existing = owned(get(), ownerId, studyId);
		if (!existing) return {
			ok: false,
			error: "That study is not in this session."
		};
		if (existing.status !== "active" && existing.status !== "paused") return {
			ok: false,
			error: "Only an active or paused study can be marked completed."
		};
		setStatus(set, get, studyId, { status: "completed" });
		audit(owner.user, "Marked study completed", existing.title);
		return {
			ok: true,
			message: "Marked completed in this browser. New participants cannot join."
		};
	},
	reviewStudy: (actorId, studyId, action, note) => {
		const actor = requireAdmin(get(), actorId);
		if (!actor.ok) return actor;
		const existing = get().studies.find((study) => study.id === studyId);
		if (!existing) return {
			ok: false,
			error: "That study is not in this browser."
		};
		if (existing.status !== "pending_review") return {
			ok: false,
			error: "Review actions apply to studies that are pending review."
		};
		const trimmed = note.trim();
		if ((action === "reject" || action === "changes") && trimmed.length < 12) return {
			ok: false,
			error: "Write a clear reason (at least 12 characters)."
		};
		if (action === "approve") {
			setStatus(set, get, studyId, {
				status: "approved",
				rejectionReason: "",
				changeRequest: ""
			});
			notifyOwner(set, get, existing.ownerId, "Study approved", `${existing.title} can be opened for recruitment. It is not public until you open it.`, "/researcher/studies");
			audit(actor.user, "Approved study", existing.title);
			return {
				ok: true,
				message: "Approved in this browser. The researcher still has to open recruitment."
			};
		}
		if (action === "reject") {
			setStatus(set, get, studyId, {
				status: "rejected",
				rejectionReason: trimmed
			});
			notifyOwner(set, get, existing.ownerId, "Study rejected", trimmed, "/researcher/studies");
			audit(actor.user, "Rejected study", existing.title);
			return {
				ok: true,
				message: "Rejected in this browser, with the reason you wrote."
			};
		}
		set({ studies: get().studies.map((study) => study.id === studyId ? {
			...study,
			status: "draft",
			changeRequest: trimmed,
			rejectionReason: "",
			updatedAt: nowIso()
		} : study) });
		notifyOwner(set, get, existing.ownerId, "Changes requested", trimmed, `/researcher/create?studyId=${studyId}`);
		audit(actor.user, "Requested changes", existing.title);
		return {
			ok: true,
			message: "Sent back to draft in this browser."
		};
	},
	consentToStudy: (participantId, studyId) => {
		const participant = requireParticipant(get(), participantId);
		if (!participant.ok) return participant;
		const study = get().studies.find((item) => item.id === studyId);
		if (!study || study.status !== "active") return {
			ok: false,
			error: "This study is not open for new participants."
		};
		if (latestApplication(get().applications, participantId, studyId)?.status === "consented") return {
			ok: false,
			error: "You already consented to this study in the demo."
		};
		const application = {
			id: id("app"),
			studyId,
			participantId,
			status: "consented",
			createdAt: nowIso(),
			updatedAt: nowIso(),
			origin: "browser"
		};
		const code = `RC-${Math.floor(1e3 + Math.random() * 9e3)}`;
		const response = {
			id: id("rsp"),
			studyId,
			code,
			participantId,
			applicationId: application.id,
			createdAt: nowIso(),
			quality: "pending",
			withdrawn: false,
			note: "",
			origin: "browser"
		};
		set({
			applications: [application, ...get().applications],
			responses: [response, ...get().responses]
		});
		notifyOwner(set, get, study.ownerId, "A participant consented", `${code} from ${participant.user.institution || "an unnamed institution"} consented. Their email is not included.`, `/researcher/recruitment/${studyId}`);
		audit(participant.user, "Consented to a study", study.title);
		return {
			ok: true,
			message: "Consent recorded in this browser. The questionnaire link is external and was not submitted for you."
		};
	},
	declineStudy: (participantId, studyId) => {
		const participant = requireParticipant(get(), participantId);
		if (!participant.ok) return participant;
		const study = get().studies.find((item) => item.id === studyId);
		if (!study) return {
			ok: false,
			error: "That study is not in this browser."
		};
		if (latestApplication(get().applications, participantId, studyId)?.status === "consented") return {
			ok: false,
			error: "You already consented. Use withdraw if you want to stop."
		};
		set({ applications: [{
			id: id("app"),
			studyId,
			participantId,
			status: "declined",
			createdAt: nowIso(),
			updatedAt: nowIso(),
			origin: "browser"
		}, ...get().applications] });
		audit(participant.user, "Declined a study", study.title);
		return {
			ok: true,
			message: "Your decline was saved in this browser. Nothing was emailed."
		};
	},
	withdrawFromStudy: (participantId, studyId) => {
		const participant = requireParticipant(get(), participantId);
		if (!participant.ok) return participant;
		const study = get().studies.find((item) => item.id === studyId);
		if (!study) return {
			ok: false,
			error: "That study is not in this browser."
		};
		if (study.status === "completed") return {
			ok: false,
			error: "This study is already closed."
		};
		const existing = latestApplication(get().applications, participantId, studyId);
		if (!existing || existing.status !== "consented") return {
			ok: false,
			error: "There is no active consent to withdraw."
		};
		set({
			applications: get().applications.map((item) => item.id === existing.id ? {
				...item,
				status: "withdrawn",
				updatedAt: nowIso()
			} : item),
			responses: get().responses.map((item) => item.applicationId === existing.id ? {
				...item,
				withdrawn: true,
				note: item.note || "Participant withdrew."
			} : item)
		});
		notifyOwner(set, get, study.ownerId, "A participant withdrew", `A consented record on ${study.title} was marked withdrawn. No contact details were attached.`, `/researcher/recruitment/${studyId}`);
		audit(participant.user, "Withdrew from a study", study.title);
		return {
			ok: true,
			message: "Withdrawal saved in this browser."
		};
	},
	setQuality: (actorId, responseId, quality, note) => {
		const actor = get().users.find((user) => user.id === actorId);
		const response = get().responses.find((item) => item.id === responseId);
		if (!actor || !response) return {
			ok: false,
			error: "That record is not in this browser."
		};
		const study = get().studies.find((item) => item.id === response.studyId);
		if (!study) return {
			ok: false,
			error: "The study for that record is missing."
		};
		if (actor.role !== "admin" && study.ownerId !== actor.id) return {
			ok: false,
			error: "Only the researcher who owns the study can label responses."
		};
		if (response.withdrawn) return {
			ok: false,
			error: "Withdrawn records stay withdrawn. They are not labelled as accepted."
		};
		set({ responses: get().responses.map((item) => item.id === responseId ? {
			...item,
			quality,
			note: note.trim()
		} : item) });
		audit(actor, "Updated a quality label", `${response.code} → ${quality.replaceAll("_", " ")}`);
		return {
			ok: true,
			message: "Label saved in this browser. It does not verify that the response is genuine."
		};
	},
	markCompleted: (actorId, responseId) => {
		const actor = get().users.find((user) => user.id === actorId);
		const response = get().responses.find((item) => item.id === responseId);
		if (!actor || !response) return {
			ok: false,
			error: "That record is not in this browser."
		};
		const study = get().studies.find((item) => item.id === response.studyId);
		if (!study || actor.role !== "admin" && study.ownerId !== actor.id) return {
			ok: false,
			error: "You cannot update that record."
		};
		if (response.withdrawn) return {
			ok: false,
			error: "This participant withdrew."
		};
		if (response.completedAt) return {
			ok: false,
			error: "This record is already marked complete."
		};
		set({ responses: get().responses.map((item) => item.id === responseId ? {
			...item,
			completedAt: nowIso(),
			quality: "pending"
		} : item) });
		audit(actor, "Marked a questionnaire complete", response.code);
		return {
			ok: true,
			message: "Marked complete in this browser. The external questionnaire was not checked automatically."
		};
	},
	addIssue: (input) => {
		set({ issues: [{
			id: id("iss"),
			source: input.source,
			name: input.name.trim(),
			email: input.email.trim(),
			subject: input.subject.trim(),
			body: input.body.trim(),
			status: "open",
			createdAt: nowIso(),
			origin: "browser",
			studyId: input.studyId
		}, ...get().issues] });
		return {
			ok: true,
			message: "Saved to the demo inbox in this browser. No email was sent."
		};
	},
	setIssueStatus: (actorId, issueId, status) => {
		const actor = requireAdmin(get(), actorId);
		if (!actor.ok) return actor;
		const issue = get().issues.find((item) => item.id === issueId);
		if (!issue) return {
			ok: false,
			error: "That report is not in this browser."
		};
		set({ issues: get().issues.map((item) => item.id === issueId ? {
			...item,
			status
		} : item) });
		audit(actor.user, "Updated a report", `${issue.subject} → ${status}`);
		return {
			ok: true,
			message: "Report status updated in this browser."
		};
	},
	markNoticeRead: (userId, noticeId) => {
		set({ notices: get().notices.map((noticeItem) => noticeItem.id === noticeId && canSeeNotice(userId, get(), noticeItem) ? {
			...noticeItem,
			read: true
		} : noticeItem) });
	},
	markAllRead: (userId) => {
		set({ notices: get().notices.map((noticeItem) => canSeeNotice(userId, get(), noticeItem) ? {
			...noticeItem,
			read: true
		} : noticeItem) });
	},
	resetDemo: () => {
		set({
			...cloneSeed(),
			sessionUserId: null,
			wizard: null,
			editingStudyId: null
		});
	}
}), {
	name: "researchconnect-demo-v1",
	skipHydration: true,
	storage: demoStorage,
	partialize: (state) => ({
		users: state.users,
		studies: state.studies,
		applications: state.applications,
		responses: state.responses,
		notices: state.notices,
		audits: state.audits,
		issues: state.issues,
		sessionUserId: state.sessionUserId,
		wizard: state.wizard,
		editingStudyId: state.editingStudyId
	})
}));
function notice(partial) {
	return {
		...partial,
		id: id("nt"),
		read: false,
		createdAt: nowIso(),
		origin: "browser"
	};
}
function owned(state, ownerId, studyId) {
	return state.studies.find((study) => study.id === studyId && study.ownerId === ownerId);
}
function latestApplication(applications, participantId, studyId) {
	return applications.find((item) => item.participantId === participantId && item.studyId === studyId);
}
function requireResearcher(state, userId) {
	const user = state.users.find((item) => item.id === userId);
	if (!user || state.sessionUserId !== userId) return {
		ok: false,
		error: "Open a researcher demo session first."
	};
	if (user.role !== "researcher") return {
		ok: false,
		error: "This action is for researcher sessions."
	};
	if (user.suspended) return {
		ok: false,
		error: "This demo account is suspended."
	};
	return {
		ok: true,
		user
	};
}
function requireParticipant(state, userId) {
	const user = state.users.find((item) => item.id === userId);
	if (!user || state.sessionUserId !== userId) return {
		ok: false,
		error: "Open a participant demo session first."
	};
	if (user.role !== "participant") return {
		ok: false,
		error: "Join with a participant session. Researchers do not enrol themselves here."
	};
	if (user.suspended) return {
		ok: false,
		error: "This demo account is suspended."
	};
	return {
		ok: true,
		user
	};
}
function requireAdmin(state, userId) {
	const user = state.users.find((item) => item.id === userId);
	if (!user || state.sessionUserId !== userId || user.role !== "admin") return {
		ok: false,
		error: "Admin actions need the admin preview. Hiding a button is not treated as authorization, and this check is still only local."
	};
	return {
		ok: true,
		user
	};
}
function setStatus(set, get, studyId, patch) {
	set({ studies: get().studies.map((study) => study.id === studyId ? {
		...study,
		...patch,
		updatedAt: nowIso()
	} : study) });
}
function notifyOwner(set, get, userId, title, body, href) {
	set({ notices: [notice({
		userId,
		title,
		body,
		href
	}), ...get().notices] });
}
function canSeeNotice(userId, state, item) {
	const user = state.users.find((entry) => entry.id === userId);
	if (!user) return false;
	if (item.userId === userId) return true;
	return item.userId === "role:admin" && user.role === "admin";
}
function audit(actor, action, detail) {
	const event = {
		id: id("aud"),
		actorId: actor.id,
		actorName: actor.name,
		action,
		detail,
		createdAt: nowIso(),
		origin: "browser"
	};
	useDemoStore.setState({ audits: [event, ...useDemoStore.getState().audits] });
}
function toForm(study) {
	return {
		title: study.title,
		purpose: study.purpose,
		description: study.description,
		category: study.category,
		institution: study.institution,
		targetPopulation: study.targetPopulation,
		ageMin: study.ageMin?.toString() ?? "",
		ageMax: study.ageMax?.toString() ?? "",
		location: study.location,
		inclusion: study.inclusion,
		exclusion: study.exclusion,
		extraQuestions: study.extraQuestions,
		targetCount: study.targetCount ? String(study.targetCount) : "",
		deadline: study.deadline,
		method: study.method,
		completionMinutes: study.completionMinutes ? String(study.completionMinutes) : "",
		questionnaireUrl: study.questionnaireUrl,
		incentive: study.incentive,
		informationStatement: study.informationStatement,
		privacyAck: study.privacyAck,
		approvalAck: study.approvalAck
	};
}
function noticesFor(user, notices) {
	if (!user) return [];
	return notices.filter((item) => item.userId === user.id || item.userId === "role:admin" && user.role === "admin");
}
function useDemoQuery(selector) {
	return useDemoStore(useShallow(selector));
}
function useSessionUser() {
	return useDemoStore((state) => state.users.find((user) => user.id === state.sessionUserId) ?? null);
}
//#endregion
export { validateFullStudy as A, roleHome as C, useDemoQuery as D, toForm as E, useDemoStore as O, researcherLabel as S, subscribeToDataMode as T, localPasswordSchema as _, Modal as a, profileSchema as b, contactSchema as c, formatDate as d, formatDateTime as f, issuesToMap as g, isServerMode as h, MenuItem as i, validateStep as j, useSessionUser as k, deadlinePhrase as l, isDataModeResolved as m, ConfirmDialog as n, TooltipProvider as o, getDataMode as p, Menu$1 as r, cn as s, Button as t, emptyStudyForm as u, loginSchema as v, setDataMode as w, registerSchema as x, noticesFor as y };
