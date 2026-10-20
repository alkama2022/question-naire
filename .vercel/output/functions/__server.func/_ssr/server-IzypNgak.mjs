import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { I as object, O as _enum, j as boolean, z as string } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-CMJdHDK9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-IzypNgak.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
var NO_METHODS = {
	emailPassword: false,
	providers: []
};
/** The sign-in methods the server has configured. */
async function liveMethods() {
	const [{ authConfigured }, { emailAndPasswordEnabled }, { GROK_PROVIDERS }] = await Promise.all([
		import("./server-D5R0KWEC.mjs").then((n) => n.r),
		import("./email-password-D-5-u3-i.mjs").then((n) => n.t).then((n) => n.n),
		import("./providers-qGq1CiRE.mjs").then((n) => n.n).then((n) => n.n)
	]);
	return {
		emailPassword: emailAndPasswordEnabled,
		providers: authConfigured ? GROK_PROVIDERS.map((provider) => provider.providerId) : []
	};
}
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
function serverModeEnabled() {
	return process.env.VITE_AUTH_ENABLED !== "false";
}
/**
* The signed-in user for this request.
*
* Reads the session cookie, or the bearer token the live preview forwards.
* Returns `null` for a visitor who is not signed in.
*/
async function currentSession() {
	const [{ getRequest }, { getSessionUser }] = await Promise.all([import("./ssr.mjs").then((n) => n.c).then((n) => n.t), import("./verify.server-PiiBXP7-.mjs")]);
	const header = getRequest()?.headers.get("authorization") ?? void 0;
	const user = await getSessionUser(header?.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : void 0);
	if (!user) return null;
	return {
		id: user.id,
		email: user.email ?? "",
		name: user.name ?? ""
	};
}
/**
* The acting user plus a fresh snapshot of everything they may see.
*
* `null` when nobody is signed in — the snapshot then holds only the public
* catalogue.
*/
async function snapshotFor(session) {
	const { buildState, ensureProfile } = await import("./db.server-Dtkv841Z.mjs");
	const methods = await liveMethods();
	if (!session) return {
		mode: "server",
		signedIn: false,
		state: await buildState(null),
		methods
	};
	return {
		mode: "server",
		signedIn: true,
		state: await buildState(await ensureProfile(session.id, session.email, session.name)),
		methods
	};
}
/**
* Run a mutation as the signed-in user, then return the result together with
* the refreshed snapshot so the browser never has to guess what changed.
*/
async function runAsUser(fn) {
	const session = await currentSession();
	if (!session) return {
		ok: false,
		error: "Sign in to continue.",
		snapshot: null
	};
	const db = await import("./db.server-Dtkv841Z.mjs");
	const actor = await db.ensureProfile(session.id, session.email, session.name);
	if (actor.suspended) return {
		ok: false,
		error: "This account is suspended.",
		snapshot: null
	};
	const result = await fn(db, actor);
	const snapshot = await snapshotFor(session);
	return {
		...result,
		snapshot
	};
}
/**
* The snapshot the browser hydrates from.
*
* Public: a signed-out visitor still gets the open studies, which is what the
* browse pages show.
*/
var loadAppSnapshot_createServerFn_handler = createServerRpc({
	id: "dab092d7f3ef07684970bb15d9510010d0de3c0c0f9ea88a26c07db705677464",
	name: "loadAppSnapshot",
	filename: "src/lib/research/server.ts"
}, (opts) => loadAppSnapshot.__executeServer(opts));
var loadAppSnapshot = createServerFn({ method: "POST" }).handler(loadAppSnapshot_createServerFn_handler, async () => {
	if (!serverModeEnabled()) return {
		mode: "browser",
		signedIn: false,
		state: null,
		methods: NO_METHODS
	};
	return snapshotFor(await currentSession());
});
var saveStudyRequest_createServerFn_handler = createServerRpc({
	id: "68ee486544852ed167e4a2e1e425af39c9c6ed073f66c83b017e99ba3686e016",
	name: "saveStudyRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => saveStudyRequest.__executeServer(opts));
var saveStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(studyValuesSchema).handler(saveStudyRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => {
	const { studyId, ...values } = data;
	return db.saveStudy(actor, values, studyId ?? null);
}));
var submitStudyRequest_createServerFn_handler = createServerRpc({
	id: "2e12d765ef5e3de6b6197f5fabe4d57c8bb8cdd27387220a83dad3635c84ed21",
	name: "submitStudyRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => submitStudyRequest.__executeServer(opts));
var submitStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(submitStudyRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.submitStudy(actor, data.studyId)));
var reviewStudyRequest_createServerFn_handler = createServerRpc({
	id: "1fcfa3b1a144e03efc2e013c73fcac8af26f0051e181fc78330e6e71ac2e11e9",
	name: "reviewStudyRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => reviewStudyRequest.__executeServer(opts));
var reviewStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	studyId: string().min(1),
	action: _enum([
		"approve",
		"reject",
		"changes"
	]),
	note: string()
})).handler(reviewStudyRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.reviewStudy(actor, data.studyId, data.action, data.note)));
var changeStudyStatus_createServerFn_handler = createServerRpc({
	id: "8e86c7fe0dfaae06552024656212369279b3dc0594eee0f0c0f127ea1118fc77",
	name: "changeStudyStatus",
	filename: "src/lib/research/server.ts"
}, (opts) => changeStudyStatus.__executeServer(opts));
var changeStudyStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	studyId: string().min(1),
	action: _enum([
		"open",
		"pause",
		"resume",
		"complete"
	])
})).handler(changeStudyStatus_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.setStudyStatus(actor, data.studyId, data.action)));
var consentToStudyRequest_createServerFn_handler = createServerRpc({
	id: "fd37e3a9806899dd717fa2fb898a95c5bb0acc03e1d418ef01379c65a1c33d42",
	name: "consentToStudyRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => consentToStudyRequest.__executeServer(opts));
var consentToStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(consentToStudyRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.consentToStudy(actor, data.studyId)));
var declineStudyRequest_createServerFn_handler = createServerRpc({
	id: "9b32d458af3d149828564d00cf01d56e09933fdb952671e5d94a7791dee06730",
	name: "declineStudyRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => declineStudyRequest.__executeServer(opts));
var declineStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(declineStudyRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.declineStudy(actor, data.studyId)));
var withdrawFromStudyRequest_createServerFn_handler = createServerRpc({
	id: "9e7a87359373e22b7676f6cbd47efab22b250dd9260fb60f8d6fb7513f0a8f14",
	name: "withdrawFromStudyRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => withdrawFromStudyRequest.__executeServer(opts));
var withdrawFromStudyRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ studyId: string().min(1) })).handler(withdrawFromStudyRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.withdrawFromStudy(actor, data.studyId)));
var setResponseQualityRequest_createServerFn_handler = createServerRpc({
	id: "6d6b1343f720480cde55877d50018be70b8d9d80cd0fee48aea271c879732847",
	name: "setResponseQualityRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => setResponseQualityRequest.__executeServer(opts));
var setResponseQualityRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	responseId: string().min(1),
	quality: _enum([
		"pending",
		"accepted",
		"excluded",
		"needs_review"
	]),
	note: string()
})).handler(setResponseQualityRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.setResponseQuality(actor, data.responseId, data.quality, data.note)));
var markResponseCompleteRequest_createServerFn_handler = createServerRpc({
	id: "984c35103e668dff460c9df7317091d0dd37422863424212e2b33cdd07f2033b",
	name: "markResponseCompleteRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => markResponseCompleteRequest.__executeServer(opts));
var markResponseCompleteRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ responseId: string().min(1) })).handler(markResponseCompleteRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.markResponseComplete(actor, data.responseId)));
var updateProfileRequest_createServerFn_handler = createServerRpc({
	id: "92a9721e072dcdf5e757f04da723f12f437c8d67c18e5ba416fad65de8e2cfd1",
	name: "updateProfileRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => updateProfileRequest.__executeServer(opts));
var updateProfileRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().trim().min(2, "Enter your name"),
	institution: string().trim().max(160),
	programme: string().trim().max(160)
})).handler(updateProfileRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.updateProfile(actor, data)));
var updatePreferencesRequest_createServerFn_handler = createServerRpc({
	id: "aaef1711f463ac9d7e301820ca977bdd3483dff82f780670377b1a0ca0502c22",
	name: "updatePreferencesRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => updatePreferencesRequest.__executeServer(opts));
var updatePreferencesRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	notifyEmail: boolean(),
	notifyInApp: boolean()
})).handler(updatePreferencesRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.updatePreferences(actor, data)));
var setOwnRoleRequest_createServerFn_handler = createServerRpc({
	id: "c94263dcd122d6acf0626ae0455e5038326509e43bd84667145c8e4c995ffad2",
	name: "setOwnRoleRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => setOwnRoleRequest.__executeServer(opts));
var setOwnRoleRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ role: _enum(["researcher", "participant"]) })).handler(setOwnRoleRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.setOwnRole(actor, data.role)));
var suspendUserRequest_createServerFn_handler = createServerRpc({
	id: "de61f75d8de712e59c2c3fe7b093f3e6d933c42032287cd9a54c77c61da5b73e",
	name: "suspendUserRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => suspendUserRequest.__executeServer(opts));
var suspendUserRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string().min(1),
	suspended: boolean()
})).handler(suspendUserRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.suspendUser(actor, data.userId, data.suspended)));
var addIssueRequest_createServerFn_handler = createServerRpc({
	id: "28bad7c65df0379c2e151c9080b2bd7d62769ae666032b7795a018964a1bb1e9",
	name: "addIssueRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => addIssueRequest.__executeServer(opts));
var addIssueRequest = createServerFn({ method: "POST" }).validator(object({
	source: _enum(["report", "contact"]),
	name: string().trim().min(2, "Enter your name"),
	email: string().trim().min(3, "Enter an email address"),
	subject: string().trim().min(4, "Add a subject"),
	body: string().trim().min(20, "Write at least a short message"),
	studyId: string().optional()
})).handler(addIssueRequest_createServerFn_handler, async ({ data }) => {
	const result = await (await import("./db.server-Dtkv841Z.mjs")).addIssue(data);
	const session = await currentSession();
	return {
		...result,
		snapshot: await snapshotFor(session)
	};
});
var setIssueStatusRequest_createServerFn_handler = createServerRpc({
	id: "8cf5b87ecc41789bbecc6f9544a0bc02bd9844895ff580e78170f82ab6e8f2cb",
	name: "setIssueStatusRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => setIssueStatusRequest.__executeServer(opts));
var setIssueStatusRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	issueId: string().min(1),
	status: _enum([
		"open",
		"reviewing",
		"closed"
	])
})).handler(setIssueStatusRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.setIssueStatus(actor, data.issueId, data.status)));
var markNoticeReadRequest_createServerFn_handler = createServerRpc({
	id: "6077c23a468c328bbcae9564ee63b74ed0f9e4293fb98f825eebb9dc05d13026",
	name: "markNoticeReadRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => markNoticeReadRequest.__executeServer(opts));
var markNoticeReadRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ noticeId: string().min(1) })).handler(markNoticeReadRequest_createServerFn_handler, async ({ data }) => runAsUser(async (db, actor) => db.markNoticeRead(actor, data.noticeId)));
var markAllNoticesReadRequest_createServerFn_handler = createServerRpc({
	id: "74195336819b6fb7d0ca30e6829da8c187787c9d726d0df07e932d027221a061",
	name: "markAllNoticesReadRequest",
	filename: "src/lib/research/server.ts"
}, (opts) => markAllNoticesReadRequest.__executeServer(opts));
var markAllNoticesReadRequest = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(markAllNoticesReadRequest_createServerFn_handler, async () => runAsUser(async (db, actor) => db.markAllNoticesRead(actor)));
//#endregion
export { addIssueRequest_createServerFn_handler, changeStudyStatus_createServerFn_handler, consentToStudyRequest_createServerFn_handler, declineStudyRequest_createServerFn_handler, loadAppSnapshot_createServerFn_handler, markAllNoticesReadRequest_createServerFn_handler, markNoticeReadRequest_createServerFn_handler, markResponseCompleteRequest_createServerFn_handler, reviewStudyRequest_createServerFn_handler, saveStudyRequest_createServerFn_handler, setIssueStatusRequest_createServerFn_handler, setOwnRoleRequest_createServerFn_handler, setResponseQualityRequest_createServerFn_handler, submitStudyRequest_createServerFn_handler, suspendUserRequest_createServerFn_handler, updatePreferencesRequest_createServerFn_handler, updateProfileRequest_createServerFn_handler, withdrawFromStudyRequest_createServerFn_handler };
