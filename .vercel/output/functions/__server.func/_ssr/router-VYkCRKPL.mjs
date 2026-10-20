import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Slot, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as LoaderCircle, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as literal, c as string, i as email, l as union, n as _enum, o as number, r as boolean, s as object, t as number$1, u as url } from "../_libs/zod.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, d as DialogContent, f as DialogDescription, h as DialogTitle, i as AlertDialogContent, l as Dialog, m as DialogPortal, n as AlertDialogAction, o as AlertDialogOverlay, p as DialogOverlay, r as AlertDialogCancel, s as AlertDialogPortal, t as AlertDialog, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuPortal, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as TooltipProvider$1 } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as useShallow } from "../_libs/zustand.mjs";
import { a as format, n as startOfToday, r as parseISO, s as differenceInCalendarDays } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-VYkCRKPL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
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
var CATEGORIES = [
	"Health and behaviour",
	"Education",
	"Business and livelihoods",
	"Media and communication",
	"Agriculture",
	"Public policy",
	"Other"
];
var METHODS = [
	"Open listing on ResearchConnect",
	"Campus notice plus open listing",
	"Class or department group, screened here"
];
var STATUS_LABEL = {
	draft: "Draft",
	pending_review: "Pending review",
	approved: "Approved",
	active: "Active",
	paused: "Paused",
	completed: "Completed",
	rejected: "Rejected"
};
var QUALITY_LABEL = {
	pending: "Pending",
	accepted: "Accepted",
	excluded: "Excluded",
	needs_review: "Needs review"
};
var PREVIEW_ADMIN_ID = "usr-preview-admin";
var DEMO_PASSWORD = "study-demo";
var statement = (text) => text;
function account(partial) {
	return {
		password: DEMO_PASSWORD,
		emailVerified: true,
		notifyEmail: true,
		notifyInApp: true,
		suspended: false,
		origin: "sample",
		...partial
	};
}
var sampleUsers = [
	account({
		id: "usr-ada",
		name: "Ada Okafor",
		email: "ada@demo.researchconnect.ng",
		role: "researcher",
		institution: "University of Abuja",
		programme: "BSc Psychology, final year",
		createdAt: "2026-09-02T09:00:00.000Z"
	}),
	account({
		id: "usr-ibrahim",
		name: "Ibrahim Musa",
		email: "ibrahim@demo.researchconnect.ng",
		role: "researcher",
		institution: "Bayero University, Kano",
		programme: "MSc Sociology",
		createdAt: "2026-09-04T09:00:00.000Z"
	}),
	account({
		id: "usr-ngozi",
		name: "Ngozi Eze",
		email: "ngozi@demo.researchconnect.ng",
		role: "researcher",
		institution: "University of Nigeria, Nsukka",
		programme: "BSc Nursing, final year",
		createdAt: "2026-09-06T09:00:00.000Z"
	}),
	account({
		id: "usr-chinedu",
		name: "Chinedu Bello",
		email: "chinedu@demo.researchconnect.ng",
		role: "participant",
		institution: "University of Abuja",
		programme: "BSc Sociology",
		createdAt: "2026-09-12T09:00:00.000Z"
	}),
	account({
		id: "usr-fatima",
		name: "Fatima Abdullahi",
		email: "fatima@demo.researchconnect.ng",
		role: "participant",
		institution: "Ahmadu Bello University",
		programme: "BSc Nursing",
		createdAt: "2026-09-18T09:00:00.000Z"
	})
];
function study(partial) {
	return partial;
}
var baseAck = {
	privacyAck: true,
	approvalAck: true,
	rejectionReason: "",
	changeRequest: "",
	pausedByAdmin: false,
	origin: "sample"
};
var sampleStudies = [
	study({
		...baseAck,
		id: "stu-sleep",
		ownerId: "usr-ada",
		title: "Social media use and sleep quality among undergraduates",
		purpose: "Describe how often undergraduate students use social media at night, and how that lines up with self-reported sleep over the past two weeks.",
		description: "A final-year psychology questionnaire. It asks about evening phone use, class schedules, and sleep. It does not diagnose a sleep disorder, and it is not a clinical service.",
		category: "Health and behaviour",
		institution: "University of Abuja, Department of Psychology (student project)",
		targetPopulation: "Undergraduates aged 18 to 30 studying in the Federal Capital Territory",
		ageMin: 18,
		ageMax: 30,
		location: "Federal Capital Territory",
		inclusion: "Currently enrolled as an undergraduate student",
		exclusion: "Not currently enrolled, or under 18",
		extraQuestions: "Which institution are you enrolled in?",
		targetCount: 80,
		deadline: "2026-11-20",
		method: "Open listing on ResearchConnect",
		completionMinutes: 8,
		questionnaireUrl: "https://example.com/questionnaires/sleep-abuja",
		incentive: "No payment or gift. If the project is finished, the researcher hopes to share a short summary of group results. That summary is not guaranteed.",
		informationStatement: statement("You are invited to a student questionnaire about night-time social media use and sleep. It takes about 8 minutes. You can stop at any time. Your name and email are not shown to the researcher on this platform. The questionnaire itself is hosted outside ResearchConnect. Participation is voluntary and is not a course requirement."),
		status: "active",
		createdAt: "2026-09-14T10:00:00.000Z",
		updatedAt: "2026-09-18T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-library",
		ownerId: "usr-ada",
		title: "Library confidence among first-year students",
		purpose: "Learn whether first-year students feel able to find a book or journal for a coursework assignment.",
		description: "Draft only. The questionnaire link and consent wording are not finished.",
		category: "Education",
		institution: "University of Abuja (student project)",
		targetPopulation: "First-year undergraduates",
		ageMin: null,
		ageMax: null,
		location: "Abuja",
		inclusion: "",
		exclusion: "",
		extraQuestions: "",
		targetCount: 60,
		deadline: "",
		method: "",
		completionMinutes: 10,
		questionnaireUrl: "",
		incentive: "",
		informationStatement: "",
		privacyAck: false,
		approvalAck: false,
		status: "draft",
		createdAt: "2026-10-10T10:00:00.000Z",
		updatedAt: "2026-10-12T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-attendance",
		ownerId: "usr-ada",
		title: "Lecture attendance and continuous assessment scores",
		purpose: "Look at how students describe their lecture attendance and whether they see a link with continuous assessment scores.",
		description: "A completed education questionnaire from the previous session. It is closed to new participants and kept here so the recruitment record can still be reviewed.",
		category: "Education",
		institution: "University of Abuja (student project)",
		targetPopulation: "200-level undergraduates in the Faculty of Social Science",
		ageMin: 18,
		ageMax: 40,
		location: "Abuja",
		inclusion: "Registered for at least two faculty courses this session",
		exclusion: "Visiting students who are not registered for the session",
		extraQuestions: "",
		targetCount: 40,
		deadline: "2026-08-30",
		method: "Class or department group, screened here",
		completionMinutes: 12,
		questionnaireUrl: "https://example.com/questionnaires/attendance-abuja",
		incentive: "No payment or gift was offered.",
		informationStatement: statement("This questionnaire asks about your lecture attendance and continuous assessment. It is voluntary. Course marks are not changed because you take part or decline. The researcher sees counts on this platform, not your email address."),
		status: "completed",
		createdAt: "2026-07-02T10:00:00.000Z",
		updatedAt: "2026-08-31T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-politics",
		ownerId: "usr-ada",
		title: "Income and political preference on campus",
		purpose: "Explore whether students connect family income with political preference.",
		description: "A draft that was sent for review. The reviewer sent it back because the consent wording and questionnaire link were not in place.",
		category: "Public policy",
		institution: "University of Abuja (student project)",
		targetPopulation: "Undergraduates on the main campus",
		ageMin: 18,
		ageMax: 35,
		location: "Abuja",
		inclusion: "Currently enrolled undergraduate",
		exclusion: "Staff and postgraduate students",
		extraQuestions: "",
		targetCount: 150,
		deadline: "2026-12-01",
		method: "Open listing on ResearchConnect",
		completionMinutes: 6,
		questionnaireUrl: "",
		incentive: "No incentive has been confirmed.",
		informationStatement: "Students would answer questions about income and voting.",
		privacyAck: false,
		approvalAck: false,
		status: "rejected",
		rejectionReason: "The request does not explain that participation is voluntary, and the questionnaire link is missing. Add both, then resubmit. This is not a judgment of the research topic.",
		createdAt: "2026-10-01T10:00:00.000Z",
		updatedAt: "2026-10-08T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-careers",
		ownerId: "usr-ada",
		title: "Career intentions of final-year education students",
		purpose: "Describe whether final-year education students plan to teach, study further, or look for work outside schools.",
		description: "Approved and ready to open. Recruitment has not started, so participants cannot join yet.",
		category: "Education",
		institution: "University of Abuja, Faculty of Education (student project)",
		targetPopulation: "Final-year education undergraduates in Abuja",
		ageMin: 20,
		ageMax: 40,
		location: "Abuja",
		inclusion: "Final-year student in an education programme",
		exclusion: "Students who are not in their final year",
		extraQuestions: "Which education programme are you in?",
		targetCount: 70,
		deadline: "2026-12-15",
		method: "Campus notice plus open listing",
		completionMinutes: 9,
		questionnaireUrl: "https://example.com/questionnaires/education-careers",
		incentive: "No payment or gift has been confirmed.",
		informationStatement: statement("This questionnaire asks about your plans after the final year. It takes about 9 minutes. You do not have to take part, and declining has no effect on your degree. Results, if shared, will be grouped."),
		status: "approved",
		createdAt: "2026-10-05T10:00:00.000Z",
		updatedAt: "2026-10-14T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-traders",
		ownerId: "usr-ibrahim",
		title: "Record-keeping by undergraduate student traders in Kano",
		purpose: "Find out how student traders keep sales records, and which tools they actually use during a week of trading.",
		description: "A sociology questionnaire for undergraduates who sell goods or services while studying in Kano. It does not ask for account passwords or business bank details.",
		category: "Business and livelihoods",
		institution: "Bayero University, Kano (postgraduate project)",
		targetPopulation: "Undergraduates in Kano who traded at least once in the past month",
		ageMin: 18,
		ageMax: 35,
		location: "Kano",
		inclusion: "You sold a product or service at least once in the past 30 days",
		exclusion: "People who have not traded in the past 30 days",
		extraQuestions: "Was your last sale on campus or off campus?",
		targetCount: 60,
		deadline: "2026-11-30",
		method: "Open listing on ResearchConnect",
		completionMinutes: 11,
		questionnaireUrl: "https://example.com/questionnaires/kano-traders",
		incentive: "No payment has been confirmed. A group summary may be shared later, but it is not promised.",
		informationStatement: statement("You are invited to a questionnaire about how student traders keep records. It takes about 11 minutes. Do not include customer names or bank details. You can decline or withdraw. The researcher does not see your email on this platform."),
		status: "active",
		createdAt: "2026-09-20T10:00:00.000Z",
		updatedAt: "2026-09-28T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-oer",
		ownerId: "usr-ibrahim",
		title: "Use of free online course materials",
		purpose: "Describe when students use free online notes and videos alongside assigned readings.",
		description: "Recruitment is paused. The public page stays visible so people can see why new participants are not being accepted.",
		category: "Education",
		institution: "Bayero University, Kano (postgraduate project)",
		targetPopulation: "Undergraduates using online course materials",
		ageMin: 18,
		ageMax: 40,
		location: "Kano",
		inclusion: "Currently enrolled undergraduate",
		exclusion: "Students who have not used online course materials this semester",
		extraQuestions: "",
		targetCount: 40,
		deadline: "2026-11-10",
		method: "Campus notice plus open listing",
		completionMinutes: 7,
		questionnaireUrl: "https://example.com/questionnaires/open-materials",
		incentive: "No incentive has been confirmed.",
		informationStatement: statement("This short questionnaire asks about free online notes and videos. Participation is voluntary. Recruitment is currently paused, so new consent cannot be recorded until it reopens."),
		status: "paused",
		createdAt: "2026-09-22T10:00:00.000Z",
		updatedAt: "2026-10-09T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-market",
		ownerId: "usr-ibrahim",
		title: "Mobile-money fees and student market sellers in Kano",
		purpose: "Describe how student sellers think about mobile-money transfer fees when they are paid by customers.",
		description: "Submitted for review. It is not public. Reviewers can read the full request before it is approved.",
		category: "Business and livelihoods",
		institution: "Bayero University, Kano (postgraduate project)",
		targetPopulation: "Student sellers in Kano who received a mobile-money payment in the past month",
		ageMin: 18,
		ageMax: 35,
		location: "Kano",
		inclusion: "Received at least one mobile-money payment from a customer in the past 30 days",
		exclusion: "Students who only use mobile money for personal transfers",
		extraQuestions: "Which mobile-money service do you use most often?",
		targetCount: 90,
		deadline: "2026-12-20",
		method: "Open listing on ResearchConnect",
		completionMinutes: 10,
		questionnaireUrl: "https://example.com/questionnaires/kano-mobile-money",
		incentive: "No payment or airtime has been confirmed. Do not expect a reward.",
		informationStatement: statement("This questionnaire asks about transfer fees on customer payments. It takes about 10 minutes. You can skip it. Do not enter wallet PINs, full account numbers, or customer phone numbers. Participation is voluntary."),
		status: "pending_review",
		createdAt: "2026-10-15T10:00:00.000Z",
		updatedAt: "2026-10-15T10:00:00.000Z"
	}),
	study({
		...baseAck,
		id: "stu-nursing",
		ownerId: "usr-ngozi",
		title: "Stress and academic performance among nursing students",
		purpose: "Describe self-reported stress during clinical postings and how nursing students feel it affects their reading and scores.",
		description: "A final-year nursing questionnaire. It is not a counselling service. If the questions feel difficult, you can stop and use your campus health service.",
		category: "Health and behaviour",
		institution: "University of Nigeria, Nsukka (student project)",
		targetPopulation: "Nursing students in clinical years",
		ageMin: 18,
		ageMax: 35,
		location: "Enugu State",
		inclusion: "Currently enrolled nursing student who has started clinical postings",
		exclusion: "Students who have not started clinical postings",
		extraQuestions: "Which clinical year are you in?",
		targetCount: 100,
		deadline: "2026-12-05",
		method: "Class or department group, screened here",
		completionMinutes: 12,
		questionnaireUrl: "https://example.com/questionnaires/nursing-stress",
		incentive: "No payment or gift has been confirmed.",
		informationStatement: statement("You are invited to a questionnaire about stress during clinical postings and academic work. It takes about 12 minutes. You can decline or stop. This is not counselling, and your answers are not sent to your department as an individual report. The researcher does not see your email here."),
		status: "active",
		createdAt: "2026-09-25T10:00:00.000Z",
		updatedAt: "2026-10-01T10:00:00.000Z"
	})
];
function expand(studyId, startCode, rows) {
	return rows.map(([day, kind], index) => ({
		id: `rsp-${studyId}-${index + 1}`,
		studyId,
		code: `RC-${startCode + index}`,
		createdAt: `${day}T08:30:00.000Z`,
		completedAt: kind === "incomplete" ? void 0 : `${day}T10:15:00.000Z`,
		quality: kind === "incomplete" ? "pending" : kind,
		withdrawn: false,
		note: "",
		origin: "sample"
	}));
}
var sampleResponses = [
	...expand("stu-sleep", 2401, [
		["2026-09-16", "accepted"],
		["2026-09-16", "accepted"],
		["2026-09-18", "accepted"],
		["2026-09-19", "excluded"],
		["2026-09-22", "accepted"],
		["2026-09-23", "accepted"],
		["2026-09-24", "needs_review"],
		["2026-09-25", "accepted"],
		["2026-09-29", "accepted"],
		["2026-09-30", "incomplete"],
		["2026-10-01", "accepted"],
		["2026-10-02", "pending"],
		["2026-10-03", "accepted"],
		["2026-10-06", "accepted"],
		["2026-10-07", "excluded"],
		["2026-10-08", "accepted"],
		["2026-10-09", "incomplete"],
		["2026-10-13", "accepted"],
		["2026-10-14", "accepted"],
		["2026-10-15", "needs_review"],
		["2026-10-16", "pending"],
		["2026-10-16", "incomplete"]
	]),
	{
		id: "rsp-chinedu-sleep",
		studyId: "stu-sleep",
		code: "RC-3188",
		participantId: "usr-chinedu",
		applicationId: "app-chinedu-sleep",
		createdAt: "2026-10-02T12:00:00.000Z",
		completedAt: "2026-10-02T12:20:00.000Z",
		quality: "accepted",
		withdrawn: false,
		note: "",
		origin: "sample"
	},
	{
		id: "rsp-fatima-sleep",
		studyId: "stu-sleep",
		code: "RC-3189",
		participantId: "usr-fatima",
		applicationId: "app-fatima-sleep",
		createdAt: "2026-10-12T15:00:00.000Z",
		quality: "pending",
		withdrawn: false,
		note: "",
		origin: "sample"
	},
	...expand("stu-traders", 4101, [
		["2026-09-29", "accepted"],
		["2026-09-30", "accepted"],
		["2026-10-02", "accepted"],
		["2026-10-06", "needs_review"],
		["2026-10-08", "accepted"],
		["2026-10-10", "incomplete"],
		["2026-10-14", "pending"],
		["2026-10-15", "excluded"]
	]),
	{
		id: "rsp-chinedu-traders",
		studyId: "stu-traders",
		code: "RC-4199",
		participantId: "usr-chinedu",
		applicationId: "app-chinedu-traders",
		createdAt: "2026-10-04T09:00:00.000Z",
		quality: "pending",
		withdrawn: true,
		note: "Participant withdrew before completing the questionnaire.",
		origin: "sample"
	},
	...expand("stu-nursing", 5101, [
		["2026-10-01", "accepted"],
		["2026-10-03", "accepted"],
		["2026-10-06", "accepted"],
		["2026-10-08", "pending"],
		["2026-10-10", "needs_review"],
		["2026-10-13", "incomplete"],
		["2026-10-15", "accepted"]
	]),
	...expand("stu-oer", 6101, [
		["2026-09-24", "accepted"],
		["2026-09-28", "accepted"],
		["2026-10-02", "excluded"],
		["2026-10-07", "pending"]
	]),
	...expand("stu-attendance", 1101, Array.from({ length: 12 }, (_, index) => [index < 6 ? "2026-08-12" : "2026-08-20", "accepted"]))
];
var sampleApplications = [
	{
		id: "app-chinedu-sleep",
		studyId: "stu-sleep",
		participantId: "usr-chinedu",
		status: "consented",
		createdAt: "2026-10-02T12:00:00.000Z",
		updatedAt: "2026-10-02T12:05:00.000Z",
		origin: "sample"
	},
	{
		id: "app-fatima-sleep",
		studyId: "stu-sleep",
		participantId: "usr-fatima",
		status: "consented",
		createdAt: "2026-10-12T15:00:00.000Z",
		updatedAt: "2026-10-12T15:04:00.000Z",
		origin: "sample"
	},
	{
		id: "app-chinedu-traders",
		studyId: "stu-traders",
		participantId: "usr-chinedu",
		status: "withdrawn",
		createdAt: "2026-10-04T09:00:00.000Z",
		updatedAt: "2026-10-05T09:00:00.000Z",
		origin: "sample"
	},
	{
		id: "app-fatima-nursing",
		studyId: "stu-nursing",
		participantId: "usr-fatima",
		status: "declined",
		createdAt: "2026-10-09T11:00:00.000Z",
		updatedAt: "2026-10-09T11:02:00.000Z",
		origin: "sample"
	}
];
var sampleNotices = [
	{
		id: "nt-ada-1",
		userId: "usr-ada",
		title: "Sleep study responses need a label",
		body: "Some completed questionnaires are still marked Pending or Needs review. Labels are a researcher decision, not proof that an answer is genuine.",
		href: "/researcher/recruitment/stu-sleep",
		read: false,
		createdAt: "2026-10-16T08:00:00.000Z",
		origin: "sample"
	},
	{
		id: "nt-ada-2",
		userId: "usr-ada",
		title: "Career intentions study was approved",
		body: "You can open recruitment when you are ready. It is not public until you do.",
		href: "/researcher/studies",
		read: false,
		createdAt: "2026-10-14T16:00:00.000Z",
		origin: "sample"
	},
	{
		id: "nt-ibrahim-1",
		userId: "usr-ibrahim",
		title: "Mobile-money study is pending review",
		body: "It stays off the public list until a reviewer approves it. No email was sent.",
		href: "/researcher/studies",
		read: false,
		createdAt: "2026-10-15T11:00:00.000Z",
		origin: "sample"
	},
	{
		id: "nt-chinedu-1",
		userId: "usr-chinedu",
		title: "Questionnaire link for the sleep study",
		body: "You consented on 2 Oct. Open the study page for the external questionnaire link. ResearchConnect does not host the form.",
		href: "/studies/stu-sleep",
		read: false,
		createdAt: "2026-10-02T12:06:00.000Z",
		origin: "sample"
	},
	{
		id: "nt-admin-1",
		userId: "role:admin",
		title: "A study is waiting for review",
		body: "Mobile-money fees and student market sellers in Kano is pending. This notice is sample data.",
		href: "/admin/reviews/stu-market",
		read: false,
		createdAt: "2026-10-15T11:05:00.000Z",
		origin: "sample"
	}
];
var sampleAudits = [
	{
		id: "aud-1",
		actorId: "usr-preview-admin",
		actorName: "Sample reviewer",
		action: "Approved study",
		detail: "Social media use and sleep quality among undergraduates",
		createdAt: "2026-09-16T09:00:00.000Z",
		origin: "sample"
	},
	{
		id: "aud-2",
		actorId: "usr-ada",
		actorName: "Ada Okafor",
		action: "Opened recruitment",
		detail: "Social media use and sleep quality among undergraduates",
		createdAt: "2026-09-18T10:00:00.000Z",
		origin: "sample"
	},
	{
		id: "aud-3",
		actorId: "usr-preview-admin",
		actorName: "Sample reviewer",
		action: "Rejected study",
		detail: "Income and political preference on campus",
		createdAt: "2026-10-08T15:00:00.000Z",
		origin: "sample"
	},
	{
		id: "aud-4",
		actorId: "usr-ibrahim",
		actorName: "Ibrahim Musa",
		action: "Paused study",
		detail: "Use of free online course materials",
		createdAt: "2026-10-09T12:00:00.000Z",
		origin: "sample"
	}
];
var sampleIssues = [{
	id: "iss-1",
	source: "report",
	name: "Chinedu Bello",
	email: "chinedu@demo.researchconnect.ng",
	subject: "Questionnaire link shows a placeholder",
	body: "The link on the free online course materials study opens an example page, not a real form. I am reporting it so the researcher can replace the link.",
	status: "open",
	createdAt: "2026-10-11T14:00:00.000Z",
	origin: "sample",
	studyId: "stu-oer"
}];
function cloneSeed() {
	return {
		users: structuredClone(sampleUsers),
		studies: structuredClone(sampleStudies),
		applications: structuredClone(sampleApplications),
		responses: structuredClone(sampleResponses),
		notices: structuredClone(sampleNotices),
		audits: structuredClone(sampleAudits),
		issues: structuredClone(sampleIssues)
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
		targetCount: number$1().int("Enter a whole number of participants").min(1, "Ask for at least 1 participant").max(1e4, "Keep the target at 10,000 or below for this version"),
		deadline: string().min(1, "Choose a recruitment deadline"),
		method: string().min(1, "Choose a recruitment method"),
		completionMinutes: number$1().int("Enter whole minutes").min(1, "Estimate at least 1 minute").max(180, "If it takes over 3 hours, say so in the description and keep this at 180 or less"),
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
	...cloneSeed(),
	sessionUserId: null,
	wizard: null,
	editingStudyId: null
};
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
var styles_default = "/assets/styles-5h-mWtIW.css";
var Route$41 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ResearchConnect Nigeria" },
			{
				name: "description",
				content: "ResearchConnect Nigeria helps students and research teams recruit questionnaire participants and keep a clear recruitment record."
			},
			{
				name: "theme-color",
				content: "#163B65"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoHydrate, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "top-center" })
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function DemoHydrate() {
	(0, import_react.useEffect)(() => {
		useDemoStore.persist.rehydrate();
	}, []);
	return null;
}
var $$splitComponentImporter$40 = () => import("./routes-DcbF6uh3.mjs");
var Route$40 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
var $$splitComponentImporter$39 = () => import("./about-BjSKaw9k.mjs");
var Route$39 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./route-DyVh9WDR.mjs");
var Route$38 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$38, "component") });
var $$splitComponentImporter$37 = () => import("./contact-DFlFGkhe.mjs");
var Route$37 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./for-participants-C0wmXqda.mjs");
var Route$36 = createFileRoute("/for-participants")({
	head: () => ({ meta: [{ title: "For participants · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./for-researchers-BrhjxtPM.mjs");
var Route$35 = createFileRoute("/for-researchers")({
	head: () => ({ meta: [{ title: "For researchers · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./forgot-password-BVFraNlG.mjs");
var Route$34 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot password · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./how-it-works-D7ZBOcLj.mjs");
var Route$33 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [{ title: "How it works · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./login-1ojKup9g.mjs");
var Route$32 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Log in · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./route-Dw-RnsmA.mjs");
var Route$31 = createFileRoute("/participant")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./privacy-BJ6FsqpQ.mjs");
var Route$30 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./register-DdaPWx21.mjs");
var Route$29 = createFileRoute("/register")({
	validateSearch: (search) => {
		const role = search.role;
		if (role === "researcher" || role === "participant") return { role };
		return {};
	},
	head: () => ({ meta: [{ title: "Register · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./route-D-Bv6bIO.mjs");
var Route$28 = createFileRoute("/researcher")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./reset-password-CMcE6ioY.mjs");
var Route$27 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset password · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./terms-t5-npxLZ.mjs");
var Route$26 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./verify-email-BYUNTc1_.mjs");
var Route$25 = createFileRoute("/verify-email")({
	head: () => ({ meta: [{ title: "Verify email · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin-brGKmJ1y.mjs");
var Route$24 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin preview · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./audit-CjNLQ01n.mjs");
var Route$23 = createFileRoute("/admin/audit")({
	head: () => ({ meta: [{ title: "Audit history · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./issues-D39EA_3X.mjs");
var Route$22 = createFileRoute("/admin/issues")({
	head: () => ({ meta: [{ title: "Reported issues · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./monitoring-DnVUPbAA.mjs");
var Route$21 = createFileRoute("/admin/monitoring")({
	head: () => ({ meta: [{ title: "Monitoring · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./users-wbbhilg7.mjs");
var Route$20 = createFileRoute("/admin/users")({
	head: () => ({ meta: [{ title: "Users · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./participant-DZO1tKXL.mjs");
var Route$19 = createFileRoute("/participant/")({
	head: () => ({ meta: [{ title: "Participant · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./applications-iAts-VAq.mjs");
var Route$18 = createFileRoute("/participant/applications")({
	head: () => ({ meta: [{ title: "My applications · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./history-DPjZTMja.mjs");
var Route$17 = createFileRoute("/participant/history")({
	head: () => ({ meta: [{ title: "History · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./notifications-jJIBYcER.mjs");
var Route$16 = createFileRoute("/participant/notifications")({
	head: () => ({ meta: [{ title: "Notifications · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./settings-B20ZlOhK.mjs");
var Route$15 = createFileRoute("/participant/settings")({
	head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./researcher-Dhv3Dqge.mjs");
var Route$14 = createFileRoute("/researcher/")({
	head: () => ({ meta: [{ title: "Overview · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./create-BvL-ToP8.mjs");
var Route$13 = createFileRoute("/researcher/create")({
	validateSearch: (search) => ({ studyId: typeof search.studyId === "string" ? search.studyId : void 0 }),
	head: () => ({ meta: [{ title: "Create study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./help-ha_jIvGm.mjs");
var Route$12 = createFileRoute("/researcher/help")({
	head: () => ({ meta: [{ title: "Help · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./notifications-C-hOfgW5.mjs");
var Route$11 = createFileRoute("/researcher/notifications")({
	head: () => ({ meta: [{ title: "Notifications · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./reports-i5mbrhGV.mjs");
var Route$10 = createFileRoute("/researcher/reports")({
	head: () => ({ meta: [{ title: "Reports · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./settings-DysWVk0B.mjs");
var Route$9 = createFileRoute("/researcher/settings")({
	head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./studies-BtqGTZ46.mjs");
var Route$8 = createFileRoute("/researcher/studies")({
	head: () => ({ meta: [{ title: "My studies · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./studies-w6Thffk8.mjs");
var Route$7 = createFileRoute("/studies/")({
	head: () => ({ meta: [{ title: "Browse studies · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_studyId-CkShBfoG.mjs");
var Route$6 = createFileRoute("/studies/$studyId")({
	head: () => ({ meta: [{ title: "Study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./reviews-CYu-HBoZ.mjs");
var Route$5 = createFileRoute("/admin/reviews/")({
	head: () => ({ meta: [{ title: "Pending requests · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_studyId-eDl2v_nq.mjs");
var Route$4 = createFileRoute("/admin/reviews/$studyId")({
	head: () => ({ meta: [{ title: "Review study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./studies-CU_CDzj5.mjs");
var Route$3 = createFileRoute("/participant/studies/")({
	head: () => ({ meta: [{ title: "Browse studies · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_studyId-DtvAn9hh.mjs");
var Route$2 = createFileRoute("/participant/studies/$studyId")({
	head: () => ({ meta: [{ title: "Study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./recruitment-5XrxA8pF.mjs");
var Route$1 = createFileRoute("/researcher/recruitment/")({
	head: () => ({ meta: [{ title: "Recruitment · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_studyId-7sHrJbSm.mjs");
var Route = createFileRoute("/researcher/recruitment/$studyId")({
	head: () => ({ meta: [{ title: "Recruitment detail · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$40.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$41
});
var AboutRoute = Route$39.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$41
});
var AdminRouteRoute = Route$38.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$41
});
var ContactRoute = Route$37.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$41
});
var ForParticipantsRoute = Route$36.update({
	id: "/for-participants",
	path: "/for-participants",
	getParentRoute: () => Route$41
});
var ForResearchersRoute = Route$35.update({
	id: "/for-researchers",
	path: "/for-researchers",
	getParentRoute: () => Route$41
});
var ForgotPasswordRoute = Route$34.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$41
});
var HowItWorksRoute = Route$33.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$41
});
var LoginRoute = Route$32.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$41
});
var ParticipantRouteRoute = Route$31.update({
	id: "/participant",
	path: "/participant",
	getParentRoute: () => Route$41
});
var PrivacyRoute = Route$30.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$41
});
var RegisterRoute = Route$29.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$41
});
var ResearcherRouteRoute = Route$28.update({
	id: "/researcher",
	path: "/researcher",
	getParentRoute: () => Route$41
});
var ResetPasswordRoute = Route$27.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$41
});
var TermsRoute = Route$26.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$41
});
var VerifyEmailRoute = Route$25.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$41
});
var AdminIndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRouteRoute
});
var AdminAuditRoute = Route$23.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AdminRouteRoute
});
var AdminIssuesRoute = Route$22.update({
	id: "/issues",
	path: "/issues",
	getParentRoute: () => AdminRouteRoute
});
var AdminMonitoringRoute = Route$21.update({
	id: "/monitoring",
	path: "/monitoring",
	getParentRoute: () => AdminRouteRoute
});
var AdminUsersRoute = Route$20.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AdminRouteRoute
});
var ParticipantIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantApplicationsRoute = Route$18.update({
	id: "/applications",
	path: "/applications",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantHistoryRoute = Route$17.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantNotificationsRoute = Route$16.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantSettingsRoute = Route$15.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => ParticipantRouteRoute
});
var ResearcherIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherCreateRoute = Route$13.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherHelpRoute = Route$12.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherNotificationsRoute = Route$11.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherReportsRoute = Route$10.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherStudiesRoute = Route$8.update({
	id: "/studies",
	path: "/studies",
	getParentRoute: () => ResearcherRouteRoute
});
var StudiesIndexRoute = Route$7.update({
	id: "/studies/",
	path: "/studies/",
	getParentRoute: () => Route$41
});
var StudiesStudyIdRoute = Route$6.update({
	id: "/studies/$studyId",
	path: "/studies/$studyId",
	getParentRoute: () => Route$41
});
var AdminReviewsIndexRoute = Route$5.update({
	id: "/reviews/",
	path: "/reviews/",
	getParentRoute: () => AdminRouteRoute
});
var AdminReviewsStudyIdRoute = Route$4.update({
	id: "/reviews/$studyId",
	path: "/reviews/$studyId",
	getParentRoute: () => AdminRouteRoute
});
var ParticipantStudiesIndexRoute = Route$3.update({
	id: "/studies/",
	path: "/studies/",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantStudiesStudyIdRoute = Route$2.update({
	id: "/studies/$studyId",
	path: "/studies/$studyId",
	getParentRoute: () => ParticipantRouteRoute
});
var ResearcherRecruitmentIndexRoute = Route$1.update({
	id: "/recruitment/",
	path: "/recruitment/",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherRecruitmentStudyIdRoute = Route.update({
	id: "/recruitment/$studyId",
	path: "/recruitment/$studyId",
	getParentRoute: () => ResearcherRouteRoute
});
var AdminRouteRouteChildren = {
	AdminAuditRoute,
	AdminIssuesRoute,
	AdminMonitoringRoute,
	AdminUsersRoute,
	AdminIndexRoute,
	AdminReviewsStudyIdRoute,
	AdminReviewsIndexRoute
};
var AdminRouteRouteWithChildren = AdminRouteRoute._addFileChildren(AdminRouteRouteChildren);
var ParticipantRouteRouteChildren = {
	ParticipantApplicationsRoute,
	ParticipantHistoryRoute,
	ParticipantNotificationsRoute,
	ParticipantSettingsRoute,
	ParticipantIndexRoute,
	ParticipantStudiesStudyIdRoute,
	ParticipantStudiesIndexRoute
};
var ParticipantRouteRouteWithChildren = ParticipantRouteRoute._addFileChildren(ParticipantRouteRouteChildren);
var ResearcherRouteRouteChildren = {
	ResearcherCreateRoute,
	ResearcherHelpRoute,
	ResearcherNotificationsRoute,
	ResearcherReportsRoute,
	ResearcherSettingsRoute,
	ResearcherStudiesRoute,
	ResearcherIndexRoute,
	ResearcherRecruitmentStudyIdRoute,
	ResearcherRecruitmentIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRouteRoute: AdminRouteRouteWithChildren,
	ParticipantRouteRoute: ParticipantRouteRouteWithChildren,
	ResearcherRouteRoute: ResearcherRouteRoute._addFileChildren(ResearcherRouteRouteChildren),
	AboutRoute,
	ContactRoute,
	ForParticipantsRoute,
	ForResearchersRoute,
	ForgotPasswordRoute,
	HowItWorksRoute,
	LoginRoute,
	PrivacyRoute,
	RegisterRoute,
	ResetPasswordRoute,
	TermsRoute,
	VerifyEmailRoute,
	StudiesStudyIdRoute,
	StudiesIndexRoute
};
var routeTree = Route$41._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { QUALITY_LABEL as A, formatDate as C, CATEGORIES as D, roleHome as E, Modal as F, Button as I, cn as L, ConfirmDialog as M, Menu$1 as N, DEMO_PASSWORD as O, MenuItem as P, deadlinePhrase as S, researcherLabel as T, loginSchema as _, Route$6 as a, validateFullStudy as b, noticesFor as c, useDemoStore as d, useSessionUser as f, localPasswordSchema as g, issuesToMap as h, Route$4 as i, STATUS_LABEL as j, METHODS as k, toForm as l, emptyStudyForm as m, Route as n, Route$13 as o, contactSchema as p, Route$2 as r, Route$29 as s, router_exports as t, useDemoQuery as u, profileSchema as v, formatDateTime as w, validateStep as x, registerSchema as y };
