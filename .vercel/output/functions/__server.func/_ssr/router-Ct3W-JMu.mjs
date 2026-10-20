import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as createRootRoute, T as useRouter, b as lazyRouteComponent, h as HeadContent, m as Scripts, v as createRouter, x as createFileRoute, y as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { B as union, F as number, I as object, N as literal, O as _enum, j as boolean, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authClient } from "./client-IWHfIGH2.mjs";
import { t as auth } from "./server-Djlq2tVP.mjs";
import { t as authMiddleware } from "./middleware-CjZM7E2d.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { O as useDemoStore, h as isServerMode, o as TooltipProvider, p as getDataMode, w as setDataMode } from "./store-BQzU-IjM.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Ct3W-JMu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
* The page for a URL that does not exist.
*
* Without this the router falls back to a bare "Not Found" paragraph; with it,
* a mistyped or stale link lands on a page that explains itself and offers a
* way back.
*/
function AppNotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "That page is not here"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm text-ink-soft",
				children: "The link may be out of date, or the study may have been closed. Start again from the homepage."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground",
				children: "Go to the homepage"
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
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* The server API for the ResearchConnect workspace.
*
* These are TanStack Start server functions — the browser calls them over the
* network and the handler runs on the server. Every handler resolves the
* acting user from the SESSION (never from the request body), then applies the
* authorization rules in `db.server.ts`.
*
* Two modes exist:
*   - `server` — real accounts, real database. Sign-in is real, records are
*     shared between devices, and the server decides who may read or change
*     what. This is the production path.
*   - `browser` — the original demo: everything stays in this browser's
*     `localStorage` and no server state is touched. Used when sign-in is
*     switched off (`VITE_AUTH_ENABLED=false`), where every visitor would
*     otherwise share one server-side identity.
*
* The mode is decided by the SERVER and reported to the browser, so the two
* can never disagree about which path is live.
*/
/** The sign-in methods the server has configured. */
/** The result of a mutation, plus the refreshed snapshot. */
var studyValuesSchema = object({
	title: string(),
	purpose: string(),
	description: string(),
	category: string(),
	institution: string(),
	targetPopulation: string(),
	ageMin: string(),
	ageMax: string(),
	location: string(),
	inclusion: string(),
	exclusion: string(),
	extraQuestions: string(),
	targetCount: string(),
	deadline: string(),
	method: string(),
	completionMinutes: string(),
	questionnaireUrl: string(),
	incentive: string(),
	informationStatement: string(),
	privacyAck: boolean(),
	approvalAck: boolean(),
	/** The study being edited — omitted when creating a new one. */
	studyId: string().optional()
});
/** True when the app runs with real sign-in (the production path). */
/**
* The signed-in user for this request.
*
* Reads the session cookie, or the bearer token the live preview forwards.
* Returns `null` for a visitor who is not signed in.
*/
/**
* The acting user plus a fresh snapshot of everything they may see.
*
* `null` when nobody is signed in — the snapshot then holds only the public
* catalogue.
*/
/**
* Run a mutation as the signed-in user, then return the result together with
* the refreshed snapshot so the browser never has to guess what changed.
*/
/**
* The snapshot the browser hydrates from.
*
* Public: a signed-out visitor still gets the open studies, which is what the
* browse pages show.
*/
var loadAppSnapshot = createServerFn({ method: "POST" }).handler(createSsrRpc("dab092d7f3ef07684970bb15d9510010d0de3c0c0f9ea88a26c07db705677464"));
var saveStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(studyValuesSchema).handler(createSsrRpc("68ee486544852ed167e4a2e1e425af39c9c6ed073f66c83b017e99ba3686e016"));
var submitStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(createSsrRpc("2e12d765ef5e3de6b6197f5fabe4d57c8bb8cdd27387220a83dad3635c84ed21"));
var reviewStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	studyId: string().min(1),
	action: _enum([
		"approve",
		"reject",
		"changes"
	]),
	note: string()
})).handler(createSsrRpc("1fcfa3b1a144e03efc2e013c73fcac8af26f0051e181fc78330e6e71ac2e11e9"));
var changeStudyStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	studyId: string().min(1),
	action: _enum([
		"open",
		"pause",
		"resume",
		"complete"
	])
})).handler(createSsrRpc("8e86c7fe0dfaae06552024656212369279b3dc0594eee0f0c0f127ea1118fc77"));
var consentToStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(createSsrRpc("fd37e3a9806899dd717fa2fb898a95c5bb0acc03e1d418ef01379c65a1c33d42"));
var declineStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(createSsrRpc("9b32d458af3d149828564d00cf01d56e09933fdb952671e5d94a7791dee06730"));
var withdrawFromStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(createSsrRpc("9e7a87359373e22b7676f6cbd47efab22b250dd9260fb60f8d6fb7513f0a8f14"));
var setResponseQualityRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	responseId: string().min(1),
	quality: _enum([
		"pending",
		"accepted",
		"excluded",
		"needs_review"
	]),
	note: string()
})).handler(createSsrRpc("6d6b1343f720480cde55877d50018be70b8d9d80cd0fee48aea271c879732847"));
var markResponseCompleteRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ responseId: string().min(1) })).handler(createSsrRpc("984c35103e668dff460c9df7317091d0dd37422863424212e2b33cdd07f2033b"));
var updateProfileRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().trim().min(2, "Enter your name"),
	institution: string().trim().max(160),
	programme: string().trim().max(160)
})).handler(createSsrRpc("92a9721e072dcdf5e757f04da723f12f437c8d67c18e5ba416fad65de8e2cfd1"));
var updatePreferencesRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	notifyEmail: boolean(),
	notifyInApp: boolean()
})).handler(createSsrRpc("aaef1711f463ac9d7e301820ca977bdd3483dff82f780670377b1a0ca0502c22"));
var setOwnRoleRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ role: _enum(["researcher", "participant"]) })).handler(createSsrRpc("c94263dcd122d6acf0626ae0455e5038326509e43bd84667145c8e4c995ffad2"));
var suspendUserRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string().min(1),
	suspended: boolean()
})).handler(createSsrRpc("de61f75d8de712e59c2c3fe7b093f3e6d933c42032287cd9a54c77c61da5b73e"));
var addIssueRequest = createServerFn({ method: "POST" }).validator(object({
	source: _enum(["report", "contact"]),
	name: string().trim().min(2, "Enter your name"),
	email: string().trim().min(3, "Enter an email address"),
	subject: string().trim().min(4, "Add a subject"),
	body: string().trim().min(20, "Write at least a short message"),
	studyId: string().optional()
})).handler(createSsrRpc("28bad7c65df0379c2e151c9080b2bd7d62769ae666032b7795a018964a1bb1e9"));
var setIssueStatusRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	issueId: string().min(1),
	status: _enum([
		"open",
		"reviewing",
		"closed"
	])
})).handler(createSsrRpc("8cf5b87ecc41789bbecc6f9544a0bc02bd9844895ff580e78170f82ab6e8f2cb"));
var markNoticeReadRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ noticeId: string().min(1) })).handler(createSsrRpc("6077c23a468c328bbcae9564ee63b74ed0f9e4293fb98f825eebb9dc05d13026"));
var markAllNoticesReadRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("74195336819b6fb7d0ca30e6829da8c187787c9d726d0df07e932d027221a061"));
/**
* The one place the screens talk to.
*
* Every screen calls `researchService`. The service decides — once, from the
* server's own answer — whether the records live in this browser (the demo)
* or in the database (production), and routes each call to the right place:
*
*   - **server mode**: the call goes to a server function. The server resolves
*     the signed-in user from the session, checks what that person may do, and
*     writes to the database. The browser never decides authorization, and
*     never sends a user id it invented.
*   - **browser mode**: the call goes to the browser store, exactly as the
*     demo always did. Nothing is sent anywhere.
*
* The store stays the UI's cache in both modes: after a server call the
* service writes the fresh snapshot into it, so every screen keeps reading
* from one place and renders the same way in either mode.
*
* Never put a service-role key, a database URL, or any other secret here.
*/
/**
* The sign-in methods this deployment offers.
*
* Empty until the server has answered — the sign-in screen waits for it
* rather than offering a method that would fail.
*/
var liveMethods = {
	emailPassword: false,
	providers: []
};
/** The sign-in methods the server reported. */
function getSignInMethods() {
	return liveMethods;
}
/**
* Write a server snapshot into the store the screens read from.
*
* The snapshot is already filtered by the server — it holds only what this
* visitor may see.
*/
function applySnapshot(snapshot) {
	if (!snapshot || snapshot.mode !== "server" || !snapshot.state) return;
	const state = snapshot.state;
	useDemoStore.setState({
		users: state.users,
		studies: state.studies,
		applications: state.applications,
		responses: state.responses,
		notices: state.notices,
		audits: state.audits,
		issues: state.issues,
		sessionUserId: state.profile?.userId ?? null
	});
}
/**
* Call a server function and fold the answer into the result the screens
* expect.
*
* A thrown `Unauthorized` means the session ended: the visitor is told to
* sign in rather than shown a stack trace.
*/
async function call(run) {
	try {
		const response = await run();
		applySnapshot(response.snapshot);
		if (!response.ok) return {
			ok: false,
			error: response.error ?? "That action could not be completed."
		};
		return {
			ok: true,
			message: response.message,
			data: response.data
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (message === "Unauthorized" || message.includes("Unauthorized")) return {
			ok: false,
			error: "Sign in to continue."
		};
		return {
			ok: false,
			error: message || "That action could not be completed."
		};
	}
}
var browserService = {
	mode: "browser",
	async initialize() {
		return {
			mode: "browser",
			signedIn: false,
			state: null,
			methods: liveMethods
		};
	},
	async refresh() {
		return {
			mode: "browser",
			signedIn: false,
			state: null,
			methods: liveMethods
		};
	},
	async upsertDraft(ownerId, values, studyId) {
		return useDemoStore.getState().upsertDraft(ownerId, values, studyId ?? void 0);
	},
	async submitForReview(ownerId, studyId) {
		return useDemoStore.getState().submitForReview(ownerId, studyId);
	},
	async reviewStudy(actorId, studyId, action, note) {
		return useDemoStore.getState().reviewStudy(actorId, studyId, action, note);
	},
	async openRecruitment(ownerId, studyId) {
		const result = useDemoStore.getState().openRecruitment(ownerId, studyId);
		return result.ok ? {
			ok: true,
			message: result.message
		} : {
			ok: false,
			error: result.error
		};
	},
	async setPaused(actorId, studyId, paused) {
		return useDemoStore.getState().setPaused(actorId, studyId, paused);
	},
	async completeStudy(ownerId, studyId) {
		return useDemoStore.getState().completeStudy(ownerId, studyId);
	},
	async consentToStudy(participantId, studyId) {
		return useDemoStore.getState().consentToStudy(participantId, studyId);
	},
	async declineStudy(participantId, studyId) {
		return useDemoStore.getState().declineStudy(participantId, studyId);
	},
	async withdrawFromStudy(participantId, studyId) {
		return useDemoStore.getState().withdrawFromStudy(participantId, studyId);
	},
	async setQuality(actorId, responseId, quality, note) {
		return useDemoStore.getState().setQuality(actorId, responseId, quality, note);
	},
	async markCompleted(actorId, responseId) {
		return useDemoStore.getState().markCompleted(actorId, responseId);
	},
	async updateProfile(userId, patch) {
		const result = useDemoStore.getState().updateProfile(userId, patch);
		return result.ok ? {
			ok: true,
			message: result.message
		} : {
			ok: false,
			error: result.error
		};
	},
	async updatePrefs(userId, prefs) {
		return useDemoStore.getState().updatePrefs(userId, prefs);
	},
	async suspendUser(actorId, userId, suspended) {
		return useDemoStore.getState().suspendUser(actorId, userId, suspended);
	},
	async addIssue(input) {
		return useDemoStore.getState().addIssue(input);
	},
	async setIssueStatus(actorId, issueId, status) {
		return useDemoStore.getState().setIssueStatus(actorId, issueId, status);
	},
	async markNoticeRead(userId, noticeId) {
		useDemoStore.getState().markNoticeRead(userId, noticeId);
		return { ok: true };
	},
	async markAllRead(userId) {
		useDemoStore.getState().markAllRead(userId);
		return { ok: true };
	},
	async setOwnRole() {
		return {
			ok: false,
			error: "Roles are fixed in demo mode."
		};
	}
};
var serverService = {
	mode: "server",
	async initialize() {
		const snapshot = await loadAppSnapshot();
		setDataMode("server");
		applySnapshot(snapshot);
		return snapshot;
	},
	async refresh() {
		const snapshot = await loadAppSnapshot();
		applySnapshot(snapshot);
		return snapshot;
	},
	upsertDraft(_ownerId, values, studyId) {
		return call(() => saveStudyRequest({ data: {
			...values,
			studyId: studyId ?? void 0
		} }));
	},
	submitForReview(_ownerId, studyId) {
		return call(() => submitStudyRequest({ data: { studyId } }));
	},
	reviewStudy(_actorId, studyId, action, note) {
		return call(() => reviewStudyRequest({ data: {
			studyId,
			action,
			note
		} }));
	},
	openRecruitment(_ownerId, studyId) {
		return call(() => changeStudyStatus({ data: {
			studyId,
			action: "open"
		} }));
	},
	setPaused(_actorId, studyId, paused) {
		return call(() => changeStudyStatus({ data: {
			studyId,
			action: paused ? "pause" : "resume"
		} }));
	},
	completeStudy(_ownerId, studyId) {
		return call(() => changeStudyStatus({ data: {
			studyId,
			action: "complete"
		} }));
	},
	consentToStudy(_participantId, studyId) {
		return call(() => consentToStudyRequest({ data: { studyId } }));
	},
	declineStudy(_participantId, studyId) {
		return call(() => declineStudyRequest({ data: { studyId } }));
	},
	withdrawFromStudy(_participantId, studyId) {
		return call(() => withdrawFromStudyRequest({ data: { studyId } }));
	},
	setQuality(_actorId, responseId, quality, note) {
		return call(() => setResponseQualityRequest({ data: {
			responseId,
			quality,
			note
		} }));
	},
	markCompleted(_actorId, responseId) {
		return call(() => markResponseCompleteRequest({ data: { responseId } }));
	},
	updateProfile(_userId, patch) {
		return call(() => updateProfileRequest({ data: patch }));
	},
	updatePrefs(_userId, prefs) {
		return call(() => updatePreferencesRequest({ data: prefs }));
	},
	suspendUser(_actorId, userId, suspended) {
		return call(() => suspendUserRequest({ data: {
			userId,
			suspended
		} }));
	},
	addIssue(input) {
		return call(() => addIssueRequest({ data: input }));
	},
	setIssueStatus(_actorId, issueId, status) {
		return call(() => setIssueStatusRequest({ data: {
			issueId,
			status
		} }));
	},
	markNoticeRead(_userId, noticeId) {
		return call(() => markNoticeReadRequest({ data: { noticeId } }));
	},
	markAllRead() {
		return call(() => markAllNoticesReadRequest());
	},
	setOwnRole(role) {
		return call(() => setOwnRoleRequest({ data: { role } }));
	}
};
/**
* The service the screens use.
*
* It starts on the browser path and switches to the server path the first
* time `initialize()` hears back from the server.
*/
var researchService = {
	get mode() {
		return getDataMode();
	},
	initialize: async () => {
		const snapshot = await loadAppSnapshot();
		liveMethods = snapshot.methods ?? liveMethods;
		if (snapshot.mode === "server") {
			setDataMode("server");
			applySnapshot(snapshot);
			return snapshot;
		}
		setDataMode("browser");
		return snapshot;
	},
	refresh: async () => {
		if (getDataMode() !== "server") return {
			mode: "browser",
			signedIn: false,
			state: null,
			methods: liveMethods
		};
		const snapshot = await loadAppSnapshot();
		applySnapshot(snapshot);
		return snapshot;
	},
	upsertDraft: (ownerId, values, studyId) => getDataMode() === "server" ? serverService.upsertDraft(ownerId, values, studyId) : browserService.upsertDraft(ownerId, values, studyId),
	submitForReview: (ownerId, studyId) => getDataMode() === "server" ? serverService.submitForReview(ownerId, studyId) : browserService.submitForReview(ownerId, studyId),
	reviewStudy: (actorId, studyId, action, note) => getDataMode() === "server" ? serverService.reviewStudy(actorId, studyId, action, note) : browserService.reviewStudy(actorId, studyId, action, note),
	openRecruitment: (ownerId, studyId) => getDataMode() === "server" ? serverService.openRecruitment(ownerId, studyId) : browserService.openRecruitment(ownerId, studyId),
	setPaused: (actorId, studyId, paused) => getDataMode() === "server" ? serverService.setPaused(actorId, studyId, paused) : browserService.setPaused(actorId, studyId, paused),
	completeStudy: (ownerId, studyId) => getDataMode() === "server" ? serverService.completeStudy(ownerId, studyId) : browserService.completeStudy(ownerId, studyId),
	consentToStudy: (participantId, studyId) => getDataMode() === "server" ? serverService.consentToStudy(participantId, studyId) : browserService.consentToStudy(participantId, studyId),
	declineStudy: (participantId, studyId) => getDataMode() === "server" ? serverService.declineStudy(participantId, studyId) : browserService.declineStudy(participantId, studyId),
	withdrawFromStudy: (participantId, studyId) => getDataMode() === "server" ? serverService.withdrawFromStudy(participantId, studyId) : browserService.withdrawFromStudy(participantId, studyId),
	setQuality: (actorId, responseId, quality, note) => getDataMode() === "server" ? serverService.setQuality(actorId, responseId, quality, note) : browserService.setQuality(actorId, responseId, quality, note),
	markCompleted: (actorId, responseId) => getDataMode() === "server" ? serverService.markCompleted(actorId, responseId) : browserService.markCompleted(actorId, responseId),
	updateProfile: (userId, patch) => getDataMode() === "server" ? serverService.updateProfile(userId, patch) : browserService.updateProfile(userId, patch),
	updatePrefs: (userId, prefs) => getDataMode() === "server" ? serverService.updatePrefs(userId, prefs) : browserService.updatePrefs(userId, prefs),
	suspendUser: (actorId, userId, suspended) => getDataMode() === "server" ? serverService.suspendUser(actorId, userId, suspended) : browserService.suspendUser(actorId, userId, suspended),
	addIssue: (input) => getDataMode() === "server" ? serverService.addIssue(input) : browserService.addIssue(input),
	setIssueStatus: (actorId, issueId, status) => getDataMode() === "server" ? serverService.setIssueStatus(actorId, issueId, status) : browserService.setIssueStatus(actorId, issueId, status),
	markNoticeRead: (userId, noticeId) => getDataMode() === "server" ? serverService.markNoticeRead(userId, noticeId) : browserService.markNoticeRead(userId, noticeId),
	markAllRead: (userId) => getDataMode() === "server" ? serverService.markAllRead(userId) : browserService.markAllRead(userId),
	setOwnRole: (role) => getDataMode() === "server" ? serverService.setOwnRole(role) : browserService.setOwnRole(role)
};
/**
* Keeps the workspace in step with the server.
*
* On start-up it asks the server which path is live:
*   - **server mode** — the records come from the database and the store is
*     filled with exactly what this visitor may see.
*   - **browser mode** — the demo records are restored from this browser's
*     own storage, and nothing is sent anywhere.
*
* It reloads when the signed-in person changes (sign-in, sign-out) and when
* the tab regains focus, so a record changed on another device shows up.
*/
function WorkspaceSync() {
	const { user, isPending } = useCurrentUserState();
	const sessionKey = user?.id ?? "signed-out";
	(0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		let cancelled = false;
		async function boot() {
			try {
				const snapshot = await researchService.initialize();
				if (cancelled) return;
				if (snapshot.mode === "browser") useDemoStore.persist.rehydrate();
			} catch {}
		}
		boot();
		return () => {
			cancelled = true;
		};
	}, [sessionKey, isPending]);
	(0, import_react.useEffect)(() => {
		function onFocus() {
			if (isServerMode()) researchService.refresh();
		}
		window.addEventListener("focus", onFocus);
		return () => window.removeEventListener("focus", onFocus);
	}, []);
	return null;
}
var styles_default = "/assets/styles-DH-v9z4b.css";
var Route$42 = createRootRoute({
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkspaceSync, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, { position: "top-center" })
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$40 = () => import("./routes-Bqf-l_W8.mjs");
var Route$41 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
var $$splitComponentImporter$39 = () => import("./about-D5hs2d-u.mjs");
var Route$40 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component")
});
var $$splitComponentImporter$38 = () => import("./route-DKy4Fmk-.mjs");
var Route$39 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$38, "component") });
var $$splitComponentImporter$37 = () => import("./contact-mGjRXpqz.mjs");
var Route$38 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./for-participants-BV5jaQZV.mjs");
var Route$37 = createFileRoute("/for-participants")({
	head: () => ({ meta: [{ title: "For participants · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./for-researchers-iKE3kVOm.mjs");
var Route$36 = createFileRoute("/for-researchers")({
	head: () => ({ meta: [{ title: "For researchers · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./forgot-password-Bttso2Ab.mjs");
var Route$35 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Forgot password · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./how-it-works-CVdvLjfH.mjs");
var Route$34 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [{ title: "How it works · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./login-lPDw6bL1.mjs");
var Route$33 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Log in · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./route-BvOwvO5u.mjs");
var Route$32 = createFileRoute("/participant")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./privacy-DK5ANEpx.mjs");
var Route$31 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./register-4IBAiG-e.mjs");
var Route$30 = createFileRoute("/register")({
	validateSearch: (search) => {
		const role = search.role;
		if (role === "researcher" || role === "participant") return { role };
		return {};
	},
	head: () => ({ meta: [{ title: "Register · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./route-BC45i5Ed.mjs");
var Route$29 = createFileRoute("/researcher")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./reset-password-ZWkNqX9V.mjs");
var Route$28 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Reset password · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./terms-DU-ugPOQ.mjs");
var Route$27 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./verify-email-DEQTCms4.mjs");
var Route$26 = createFileRoute("/verify-email")({
	head: () => ({ meta: [{ title: "Verify email · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./admin-FUZWt8vx.mjs");
var Route$25 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin workspace · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./audit-Ylj_aV-N.mjs");
var Route$24 = createFileRoute("/admin/audit")({
	head: () => ({ meta: [{ title: "Audit history · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./issues-CRuxS9tP.mjs");
var Route$23 = createFileRoute("/admin/issues")({
	head: () => ({ meta: [{ title: "Reported issues · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./monitoring-CYp8DiDi.mjs");
var Route$22 = createFileRoute("/admin/monitoring")({
	head: () => ({ meta: [{ title: "Monitoring · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./users-CiSdq7nf.mjs");
var Route$21 = createFileRoute("/admin/users")({
	head: () => ({ meta: [{ title: "Users · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./participant-DLnBY2R7.mjs");
var Route$20 = createFileRoute("/participant/")({
	head: () => ({ meta: [{ title: "Participant · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./applications-DCh-1z6a.mjs");
var Route$19 = createFileRoute("/participant/applications")({
	head: () => ({ meta: [{ title: "My applications · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./history-_gXeLdQ_.mjs");
var Route$18 = createFileRoute("/participant/history")({
	head: () => ({ meta: [{ title: "History · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./notifications-DOA9iFJz.mjs");
var Route$17 = createFileRoute("/participant/notifications")({
	head: () => ({ meta: [{ title: "Notifications · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./settings-B9a82awS.mjs");
var Route$16 = createFileRoute("/participant/settings")({
	head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./researcher-RyrAKllB.mjs");
var Route$15 = createFileRoute("/researcher/")({
	head: () => ({ meta: [{ title: "Overview · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./create-DLtrHY-j.mjs");
var Route$14 = createFileRoute("/researcher/create")({
	validateSearch: (search) => ({ studyId: typeof search.studyId === "string" ? search.studyId : void 0 }),
	head: () => ({ meta: [{ title: "Create study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./help-B_nWQjrb.mjs");
var Route$13 = createFileRoute("/researcher/help")({
	head: () => ({ meta: [{ title: "Help · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./notifications-B56dsnaz.mjs");
var Route$12 = createFileRoute("/researcher/notifications")({
	head: () => ({ meta: [{ title: "Notifications · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./reports-xsvPytBd.mjs");
var Route$11 = createFileRoute("/researcher/reports")({
	head: () => ({ meta: [{ title: "Reports · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./settings-DiuB2Kyf.mjs");
var Route$10 = createFileRoute("/researcher/settings")({
	head: () => ({ meta: [{ title: "Settings · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./studies-CnySaizO.mjs");
var Route$9 = createFileRoute("/researcher/studies")({
	head: () => ({ meta: [{ title: "My studies · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./studies-CLYAoqKr.mjs");
var Route$8 = createFileRoute("/studies/")({
	head: () => ({ meta: [{ title: "Browse studies · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_studyId-BCZ8puR5.mjs");
var Route$7 = createFileRoute("/studies/$studyId")({
	head: () => ({ meta: [{ title: "Study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./reviews-C2WooweF.mjs");
var Route$6 = createFileRoute("/admin/reviews/")({
	head: () => ({ meta: [{ title: "Pending requests · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_studyId-CV8Jfkx3.mjs");
var Route$5 = createFileRoute("/admin/reviews/$studyId")({
	head: () => ({ meta: [{ title: "Review study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
/**
* The app's own authentication API.
*
* Better Auth serves sign-up, sign-in, sign-out, session and password-reset
* requests under `/api/auth/*`. Keeping them on this app's own origin means
* the session cookie stays here too — the app never hands the visitor's
* session to a third party.
*
* `$` matches every sub-path (`/api/auth/sign-in/email`, `/api/auth/get-session`, …),
* so every endpoint Better Auth owns is routed to its handler.
*/
var Route$4 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter$3 = () => import("./studies-Byy1-rP4.mjs");
var Route$3 = createFileRoute("/participant/studies/")({
	head: () => ({ meta: [{ title: "Browse studies · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_studyId-85vB3Trj.mjs");
var Route$2 = createFileRoute("/participant/studies/$studyId")({
	head: () => ({ meta: [{ title: "Study · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./recruitment-C6iPUDQ-.mjs");
var Route$1 = createFileRoute("/researcher/recruitment/")({
	head: () => ({ meta: [{ title: "Recruitment · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_studyId-lTVQxW7u.mjs");
var Route = createFileRoute("/researcher/recruitment/$studyId")({
	head: () => ({ meta: [{ title: "Recruitment detail · ResearchConnect Nigeria" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$41.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$42
});
var AboutRoute = Route$40.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$42
});
var AdminRouteRoute = Route$39.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$42
});
var ContactRoute = Route$38.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$42
});
var ForParticipantsRoute = Route$37.update({
	id: "/for-participants",
	path: "/for-participants",
	getParentRoute: () => Route$42
});
var ForResearchersRoute = Route$36.update({
	id: "/for-researchers",
	path: "/for-researchers",
	getParentRoute: () => Route$42
});
var ForgotPasswordRoute = Route$35.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$42
});
var HowItWorksRoute = Route$34.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$42
});
var LoginRoute = Route$33.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$42
});
var ParticipantRouteRoute = Route$32.update({
	id: "/participant",
	path: "/participant",
	getParentRoute: () => Route$42
});
var PrivacyRoute = Route$31.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$42
});
var RegisterRoute = Route$30.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$42
});
var ResearcherRouteRoute = Route$29.update({
	id: "/researcher",
	path: "/researcher",
	getParentRoute: () => Route$42
});
var ResetPasswordRoute = Route$28.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$42
});
var TermsRoute = Route$27.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$42
});
var VerifyEmailRoute = Route$26.update({
	id: "/verify-email",
	path: "/verify-email",
	getParentRoute: () => Route$42
});
var AdminIndexRoute = Route$25.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRouteRoute
});
var AdminAuditRoute = Route$24.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AdminRouteRoute
});
var AdminIssuesRoute = Route$23.update({
	id: "/issues",
	path: "/issues",
	getParentRoute: () => AdminRouteRoute
});
var AdminMonitoringRoute = Route$22.update({
	id: "/monitoring",
	path: "/monitoring",
	getParentRoute: () => AdminRouteRoute
});
var AdminUsersRoute = Route$21.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AdminRouteRoute
});
var ParticipantIndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantApplicationsRoute = Route$19.update({
	id: "/applications",
	path: "/applications",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantHistoryRoute = Route$18.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantNotificationsRoute = Route$17.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => ParticipantRouteRoute
});
var ParticipantSettingsRoute = Route$16.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => ParticipantRouteRoute
});
var ResearcherIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherCreateRoute = Route$14.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherHelpRoute = Route$13.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherNotificationsRoute = Route$12.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherReportsRoute = Route$11.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherSettingsRoute = Route$10.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => ResearcherRouteRoute
});
var ResearcherStudiesRoute = Route$9.update({
	id: "/studies",
	path: "/studies",
	getParentRoute: () => ResearcherRouteRoute
});
var StudiesIndexRoute = Route$8.update({
	id: "/studies/",
	path: "/studies/",
	getParentRoute: () => Route$42
});
var StudiesStudyIdRoute = Route$7.update({
	id: "/studies/$studyId",
	path: "/studies/$studyId",
	getParentRoute: () => Route$42
});
var AdminReviewsIndexRoute = Route$6.update({
	id: "/reviews/",
	path: "/reviews/",
	getParentRoute: () => AdminRouteRoute
});
var AdminReviewsStudyIdRoute = Route$5.update({
	id: "/reviews/$studyId",
	path: "/reviews/$studyId",
	getParentRoute: () => AdminRouteRoute
});
var ApiAuthSplatRoute = Route$4.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$42
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
	StudiesIndexRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$42._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: AppNotFoundComponent,
		scrollRestoration: true
	});
}
//#endregion
export { Route$7 as a, getSignInMethods as c, Route$5 as i, researchService as l, Route as n, Route$14 as o, Route$2 as r, Route$30 as s, router_exports as t };
