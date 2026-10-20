import { r as getSql } from "./db-DViECd3O.mjs";
import { s as cloneSeed } from "./sample-data-tji98cyF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db.server-Dtkv841Z.js
/**
* Server-side persistence for the ResearchConnect domain.
*
* The browser demo kept everything in `localStorage` (see `store.ts`). This
* module is the production path: every read and write goes through the
* database (`@/lib/db` — Neon in production, the embedded PGLite fallback in a
* local preview), and every rule about WHO may see or change a record lives
* here, on the server. The browser never decides authorization.
*
* Rules that hold for every function in this file:
*   * The acting user is the verified session user — never a client-supplied
*     id. `server.ts` resolves it with `authMiddleware` and passes the profile.
*   * Every query is scoped by that user id. A researcher sees their own
*     studies; a participant sees their own applications and responses; an
*     administrator sees the workspace.
*   * Passwords are never read, stored or returned here. The demo store kept
*     plaintext passwords in the browser; that does not happen on this path.
*
* SERVER ONLY — never import this from client code.
*/
/**
* Timestamps are stored as `timestamptz` and read back as ISO strings.
*
* `pg` and PGLite disagree on the native JS type for `timestamptz` (Date vs
* string), so the value is formatted in SQL instead — one representation on
* both backends, and the client keeps parsing plain ISO strings.
*/
var TS = `to_char(%s at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`;
var STUDY_COLUMNS = `
  id,
  owner_id as "ownerId",
  title, purpose, description, category, institution,
  target_population as "targetPopulation",
  age_min as "ageMin",
  age_max as "ageMax",
  location, inclusion, exclusion, extra_questions as "extraQuestions",
  target_count as "targetCount",
  deadline, method,
  completion_minutes as "completionMinutes",
  questionnaire_url as "questionnaireUrl",
  incentive, information_statement as "informationStatement",
  privacy_ack as "privacyAck",
  approval_ack as "approvalAck",
  status, rejection_reason as "rejectionReason", change_request as "changeRequest",
  paused_by_admin as "pausedByAdmin",
  origin,
  ${TS.replace("%s", "created_at")} as "createdAt",
  ${TS.replace("%s", "updated_at")} as "updatedAt"
`;
var APPLICATION_COLUMNS = `
  id,
  study_id as "studyId",
  participant_id as "participantId",
  status, origin,
  ${TS.replace("%s", "created_at")} as "createdAt",
  ${TS.replace("%s", "updated_at")} as "updatedAt"
`;
var RESPONSE_COLUMNS = `
  id,
  study_id as "studyId",
  code,
  participant_id as "participantId",
  application_id as "applicationId",
  ${TS.replace("%s", "created_at")} as "createdAt",
  ${TS.replace("%s", "completed_at")} as "completedAt",
  quality, withdrawn, note, origin
`;
var NOTICE_COLUMNS = `
  id,
  user_id as "userId",
  title, body, href, read, origin,
  ${TS.replace("%s", "created_at")} as "createdAt"
`;
var AUDIT_COLUMNS = `
  id,
  actor_id as "actorId",
  actor_name as "actorName",
  action, detail, origin,
  ${TS.replace("%s", "created_at")} as "createdAt"
`;
var ISSUE_COLUMNS = `
  id,
  source, name, email, subject, body, status, study_id as "studyId", origin,
  ${TS.replace("%s", "created_at")} as "createdAt"
`;
/**
* Emails that may hold the administrator role.
*
* Registration can never grant admin — the server decides. An operator puts
* real addresses in `ADMIN_EMAILS` (comma separated) and that account is an
* administrator the first time it signs in.
*/
function adminEmails() {
	const raw = process.env.ADMIN_EMAILS?.trim();
	if (!raw) return /* @__PURE__ */ new Set();
	return new Set(raw.split(",").map((entry) => entry.trim().toLowerCase()).filter(Boolean));
}
var PROFILE_COLUMNS = `
  user_id as "userId",
  email, name, role, institution, programme,
  email_verified as "emailVerified",
  notify_email as "notifyEmail",
  notify_in_app as "notifyInApp",
  suspended, origin,
  ${TS.replace("%s", "created_at")} as "createdAt",
  ${TS.replace("%s", "updated_at")} as "updatedAt"
`;
function toActor(row) {
	return {
		userId: row.userId,
		email: row.email,
		name: row.name,
		role: row.role,
		institution: row.institution,
		programme: row.programme,
		emailVerified: row.emailVerified,
		notifyEmail: row.notifyEmail,
		notifyInApp: row.notifyInApp,
		suspended: row.suspended
	};
}
/**
* The profile for a signed-in user, created on first sight.
*
* A person who signs in with a different provider but the same email keeps the
* role and records they already had: the existing profile is adopted rather
* than duplicated.
*/
async function ensureProfile(userId, email, name) {
	const sql = await getSql();
	const byId = await sql`select ${sql.raw(PROFILE_COLUMNS)} from rc_profiles where user_id = ${userId}`;
	if (byId.length) return toActor(byId[0]);
	const normalizedEmail = (email ?? "").trim().toLowerCase();
	if (normalizedEmail) {
		const byEmail = await sql`select ${sql.raw(PROFILE_COLUMNS)} from rc_profiles where lower(email) = ${normalizedEmail}`;
		if (byEmail.length) {
			const adopted = await sql`
        update rc_profiles
        set user_id = ${userId},
            name = coalesce(nullif(${name ?? ""}, ''), name),
            updated_at = now()
        where user_id = ${byEmail[0].userId}
        returning ${sql.raw(PROFILE_COLUMNS)}
      `;
			if (adopted.length) return toActor(adopted[0]);
		}
	}
	const role = adminEmails().has(normalizedEmail) ? "admin" : "participant";
	return toActor((await sql`
    insert into rc_profiles (user_id, email, name, role, email_verified, origin)
    values (${userId}, ${normalizedEmail}, ${(name ?? "").trim()}, ${role}, ${false}, 'server')
    on conflict (user_id) do update set updated_at = now()
    returning ${sql.raw(PROFILE_COLUMNS)}
  `)[0]);
}
/** Update the signed-in user's own profile fields. */
async function updateProfile(actor, patch) {
	const sql = await getSql();
	const rows = await sql`
    update rc_profiles
    set name = ${patch.name.trim()},
        institution = ${patch.institution.trim()},
        programme = ${patch.programme.trim()},
        updated_at = now()
    where user_id = ${actor.userId}
    returning ${sql.raw(PROFILE_COLUMNS)}
  `;
	if (!rows.length) return {
		ok: false,
		error: "Your profile could not be updated."
	};
	return {
		ok: true,
		data: toActor(rows[0]),
		message: "Profile saved."
	};
}
/** Update the signed-in user's own notification preferences. */
async function updatePreferences(actor, prefs) {
	await (await getSql())`
    update rc_profiles
    set notify_email = ${prefs.notifyEmail},
        notify_in_app = ${prefs.notifyInApp},
        updated_at = now()
    where user_id = ${actor.userId}
  `;
	return {
		ok: true,
		message: "Preferences saved."
	};
}
/**
* Set the role of the signed-in user.
*
* `researcher` and `participant` are self-service. `admin` is not — it comes
* from `ADMIN_EMAILS` only, so nobody can promote themselves from the browser.
* An administrator's role is left alone: registration must not demote an
* account that the operator provisioned.
*/
async function setOwnRole(actor, role) {
	if (actor.role === "admin") return {
		ok: false,
		error: "An administrator's role is set by the operator."
	};
	const sql = await getSql();
	const rows = await sql`
    update rc_profiles
    set role = ${role}, updated_at = now()
    where user_id = ${actor.userId}
    returning ${sql.raw(PROFILE_COLUMNS)}
  `;
	if (!rows.length) return {
		ok: false,
		error: "Your role could not be changed."
	};
	return {
		ok: true,
		data: toActor(rows[0]),
		message: "Role saved."
	};
}
/** Suspend or restore an account. Administrators only. */
async function suspendUser(actor, targetUserId, suspended) {
	if (actor.role !== "admin") return {
		ok: false,
		error: "Only an administrator can suspend an account."
	};
	if (targetUserId === actor.userId) return {
		ok: false,
		error: "You cannot suspend your own account."
	};
	const sql = await getSql();
	await sql`
    update rc_profiles
    set suspended = ${suspended}, updated_at = now()
    where user_id = ${targetUserId}
  `;
	await writeAudit(sql, actor, suspended ? "Suspended account" : "Restored account", targetUserId);
	return {
		ok: true,
		message: suspended ? "Account suspended." : "Account restored."
	};
}
function studyFromRow(row) {
	return {
		id: String(row.id),
		ownerId: String(row.ownerId),
		title: String(row.title ?? ""),
		purpose: String(row.purpose ?? ""),
		description: String(row.description ?? ""),
		category: String(row.category ?? "Other"),
		institution: String(row.institution ?? ""),
		targetPopulation: String(row.targetPopulation ?? ""),
		ageMin: row.ageMin === null || row.ageMin === void 0 ? null : Number(row.ageMin),
		ageMax: row.ageMax === null || row.ageMax === void 0 ? null : Number(row.ageMax),
		location: String(row.location ?? ""),
		inclusion: String(row.inclusion ?? ""),
		exclusion: String(row.exclusion ?? ""),
		extraQuestions: String(row.extraQuestions ?? ""),
		targetCount: Number(row.targetCount ?? 0),
		deadline: String(row.deadline ?? ""),
		method: String(row.method ?? ""),
		completionMinutes: Number(row.completionMinutes ?? 0),
		questionnaireUrl: String(row.questionnaireUrl ?? ""),
		incentive: String(row.incentive ?? ""),
		informationStatement: String(row.informationStatement ?? ""),
		privacyAck: Boolean(row.privacyAck),
		approvalAck: Boolean(row.approvalAck),
		status: row.status,
		rejectionReason: String(row.rejectionReason ?? ""),
		changeRequest: String(row.changeRequest ?? ""),
		pausedByAdmin: Boolean(row.pausedByAdmin),
		createdAt: String(row.createdAt ?? ""),
		updatedAt: String(row.updatedAt ?? ""),
		origin: row.origin ?? "server"
	};
}
/** Studies a signed-out visitor may see: the ones open to participants. */
var PUBLIC_STATUSES = ["active", "paused"];
async function listStudiesFor(actor) {
	const sql = await getSql();
	if (!actor) return (await sql`select ${sql.raw(STUDY_COLUMNS)} from rc_studies where status in (${sql.join(PUBLIC_STATUSES)}) order by updated_at desc`).map(studyFromRow);
	if (actor.role === "admin") return (await sql`select ${sql.raw(STUDY_COLUMNS)} from rc_studies order by updated_at desc`).map(studyFromRow);
	if (actor.role === "researcher") return (await sql`
      select ${sql.raw(STUDY_COLUMNS)} from rc_studies
      where owner_id = ${actor.userId} or status in (${sql.join(PUBLIC_STATUSES)})
      order by updated_at desc
    `).map(studyFromRow);
	return (await sql`select ${sql.raw(STUDY_COLUMNS)} from rc_studies where status in (${sql.join(PUBLIC_STATUSES)}) order by updated_at desc`).map(studyFromRow);
}
async function listApplicationsFor(actor) {
	const sql = await getSql();
	if (!actor) return [];
	if (actor.role === "admin") return (await sql`select ${sql.raw(APPLICATION_COLUMNS)} from rc_applications order by created_at desc`).map((row) => row);
	if (actor.role === "participant") return (await sql`
      select ${sql.raw(APPLICATION_COLUMNS)} from rc_applications
      where participant_id = ${actor.userId}
      order by created_at desc
    `).map((row) => row);
	return (await sql`
    select ${sql.raw(APPLICATION_COLUMNS)} from rc_applications
    where study_id in (select id from rc_studies where owner_id = ${actor.userId})
    order by created_at desc
  `).map((row) => row);
}
async function listResponsesFor(actor) {
	const sql = await getSql();
	if (!actor) return [];
	if (actor.role === "admin") return (await sql`select ${sql.raw(RESPONSE_COLUMNS)} from rc_responses order by created_at desc`).map((row) => row);
	if (actor.role === "participant") return (await sql`
      select ${sql.raw(RESPONSE_COLUMNS)} from rc_responses
      where participant_id = ${actor.userId}
      order by created_at desc
    `).map((row) => row);
	return (await sql`
    select ${sql.raw(RESPONSE_COLUMNS)} from rc_responses
    where study_id in (select id from rc_studies where owner_id = ${actor.userId})
    order by created_at desc
  `).map((row) => row);
}
async function listNoticesFor(actor) {
	const sql = await getSql();
	if (!actor) return [];
	if (actor.role === "admin") return (await sql`
      select ${sql.raw(NOTICE_COLUMNS)} from rc_notices
      where user_id = ${actor.userId} or user_id = 'role:admin'
      order by created_at desc
    `).map((row) => row);
	return (await sql`
    select ${sql.raw(NOTICE_COLUMNS)} from rc_notices
    where user_id = ${actor.userId}
    order by created_at desc
  `).map((row) => row);
}
async function listAuditsFor(actor) {
	const sql = await getSql();
	if (!actor) return [];
	if (actor.role === "admin") return (await sql`select ${sql.raw(AUDIT_COLUMNS)} from rc_audit_events order by created_at desc limit 200`).map((row) => row);
	return (await sql`
    select ${sql.raw(AUDIT_COLUMNS)} from rc_audit_events
    where actor_id = ${actor.userId}
    order by created_at desc limit 50
  `).map((row) => row);
}
async function listIssuesFor(actor) {
	const sql = await getSql();
	if (!actor || actor.role !== "admin") return [];
	return (await sql`select ${sql.raw(ISSUE_COLUMNS)} from rc_issues order by created_at desc`).map((row) => row);
}
/**
* The people the signed-in user is allowed to see.
*
* Administrators see every account. Everyone else sees themselves, the owners
* of the studies they can see, and the participants on their own studies.
* Emails of other people are withheld — the demo store showed them, the
* server does not.
*/
async function listUsersFor(actor, studies) {
	const sql = await getSql();
	if (!actor) {
		const ownerIds = [...new Set(studies.map((study) => study.ownerId))];
		if (!ownerIds.length) return [];
		return (await sql`
      select ${sql.raw(PROFILE_COLUMNS)} from rc_profiles where user_id in (${sql.join(ownerIds)})
    `).map((row) => toPublicAccount(toActor(row), false));
	}
	if (actor.role === "admin") return (await sql`select ${sql.raw(PROFILE_COLUMNS)} from rc_profiles order by created_at desc`).map((row) => toPublicAccount(toActor(row), true));
	const visibleIds = /* @__PURE__ */ new Set([actor.userId]);
	for (const study of studies) visibleIds.add(study.ownerId);
	if (actor.role === "researcher") {
		const participants = await sql`
      select distinct participant_id as "participantId" from rc_applications
      where study_id in (select id from rc_studies where owner_id = ${actor.userId})
    `;
		for (const row of participants) visibleIds.add(row.participantId);
	}
	const ids = [...visibleIds];
	if (!ids.length) return [];
	return (await sql`
    select ${sql.raw(PROFILE_COLUMNS)} from rc_profiles where user_id in (${sql.join(ids)})
  `).map((row) => toPublicAccount(toActor(row), row.userId === actor.userId));
}
/**
* A profile as the browser sees it.
*
* `password` is always empty — no password ever travels to the client from the
* server. `email` is only filled in for the signed-in user and for
* administrators.
*/
function toPublicAccount(actor, withEmail) {
	return {
		id: actor.userId,
		name: actor.name,
		email: withEmail ? actor.email : "",
		password: "",
		role: actor.role,
		institution: actor.institution,
		programme: actor.programme,
		emailVerified: actor.emailVerified,
		notifyEmail: actor.notifyEmail,
		notifyInApp: actor.notifyInApp,
		suspended: actor.suspended,
		createdAt: "",
		origin: "server"
	};
}
/** The full snapshot the browser hydrates from. */
async function buildState(actor) {
	await seedIfEmpty();
	const studies = await listStudiesFor(actor);
	const [applications, responses, notices, audits, issues, users] = await Promise.all([
		listApplicationsFor(actor),
		listResponsesFor(actor),
		listNoticesFor(actor),
		listAuditsFor(actor),
		listIssuesFor(actor),
		listUsersFor(actor, studies)
	]);
	return {
		profile: actor,
		studies,
		applications,
		responses,
		notices,
		audits,
		issues,
		users
	};
}
async function writeAudit(sql, actor, action, detail) {
	await sql`
    insert into rc_audit_events (id, actor_id, actor_name, action, detail, origin)
    values (${`aud-${crypto.randomUUID().slice(0, 8)}`}, ${actor.userId}, ${actor.name}, ${action}, ${detail}, 'server')
  `;
}
async function writeNotice(sql, userId, title, body, href) {
	await sql`
    insert into rc_notices (id, user_id, title, body, href, read, origin)
    values (${`nt-${crypto.randomUUID().slice(0, 8)}`}, ${userId}, ${title}, ${body}, ${href}, ${false}, 'server')
  `;
}
/** Create or update a study the signed-in researcher owns. */
async function saveStudy(actor, values, studyId) {
	if (actor.role !== "researcher" && actor.role !== "admin") return {
		ok: false,
		error: "Only a researcher can save a study request."
	};
	const sql = await getSql();
	const ageMin = values.ageMin.trim() ? Number(values.ageMin) : null;
	const ageMax = values.ageMax.trim() ? Number(values.ageMax) : null;
	if (studyId) {
		const existing = await sql`
      select id, owner_id as "ownerId", status from rc_studies where id = ${studyId}
    `;
		if (!existing.length) return {
			ok: false,
			error: "That study no longer exists."
		};
		if (actor.role !== "admin" && existing[0].ownerId !== actor.userId) return {
			ok: false,
			error: "You can only edit your own study."
		};
		await sql`
      update rc_studies
      set title = ${values.title.trim()},
          purpose = ${values.purpose.trim()},
          description = ${values.description.trim()},
          category = ${values.category},
          institution = ${values.institution.trim()},
          target_population = ${values.targetPopulation.trim()},
          age_min = ${ageMin},
          age_max = ${ageMax},
          location = ${values.location.trim()},
          inclusion = ${values.inclusion.trim()},
          exclusion = ${values.exclusion.trim()},
          extra_questions = ${values.extraQuestions.trim()},
          target_count = ${Number(values.targetCount) || 0},
          deadline = ${values.deadline},
          method = ${values.method},
          completion_minutes = ${Number(values.completionMinutes) || 0},
          questionnaire_url = ${values.questionnaireUrl.trim()},
          incentive = ${values.incentive.trim()},
          information_statement = ${values.informationStatement.trim()},
          privacy_ack = ${values.privacyAck},
          approval_ack = ${values.approvalAck},
          status = 'draft',
          rejection_reason = '',
          change_request = '',
          updated_at = now()
      where id = ${studyId}
    `;
		await writeAudit(sql, actor, "Saved draft", values.title.trim());
		return {
			ok: true,
			data: { id: studyId },
			message: "Draft saved."
		};
	}
	const id = `stu-${crypto.randomUUID().slice(0, 8)}`;
	await sql`
    insert into rc_studies (
      id, owner_id, title, purpose, description, category, institution,
      target_population, age_min, age_max, location, inclusion, exclusion,
      extra_questions, target_count, deadline, method, completion_minutes,
      questionnaire_url, incentive, information_statement, privacy_ack,
      approval_ack, status, origin
    ) values (
      ${id}, ${actor.userId}, ${values.title.trim()}, ${values.purpose.trim()},
      ${values.description.trim()}, ${values.category}, ${values.institution.trim()},
      ${values.targetPopulation.trim()}, ${ageMin}, ${ageMax}, ${values.location.trim()},
      ${values.inclusion.trim()}, ${values.exclusion.trim()},
      ${values.extraQuestions.trim()}, ${Number(values.targetCount) || 0},
      ${values.deadline}, ${values.method}, ${Number(values.completionMinutes) || 0},
      ${values.questionnaireUrl.trim()}, ${values.incentive.trim()},
      ${values.informationStatement.trim()}, ${values.privacyAck}, ${values.approvalAck},
      'draft', 'server'
    )
  `;
	await writeAudit(sql, actor, "Saved draft", values.title.trim());
	return {
		ok: true,
		data: { id },
		message: "Draft saved."
	};
}
async function ownerOf(sql, studyId) {
	return (await sql`
    select owner_id as "ownerId" from rc_studies where id = ${studyId}
  `)[0]?.ownerId ?? "";
}
/** Send a study request for review. The researcher owns it. */
async function submitStudy(actor, studyId) {
	if (actor.role !== "researcher" && actor.role !== "admin") return {
		ok: false,
		error: "Only a researcher can submit a study request."
	};
	const sql = await getSql();
	const rows = await sql`
    select id, owner_id as "ownerId", title, status from rc_studies where id = ${studyId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That study no longer exists."
	};
	const study = rows[0];
	if (actor.role !== "admin" && study.ownerId !== actor.userId) return {
		ok: false,
		error: "You can only submit your own study."
	};
	if (study.status !== "draft" && study.status !== "rejected") return {
		ok: false,
		error: "Only a draft or a rejected request can be submitted."
	};
	await sql`
    update rc_studies
    set status = 'pending_review', rejection_reason = '', change_request = '', updated_at = now()
    where id = ${studyId}
  `;
	await writeNotice(sql, "role:admin", "A study is waiting for review", `${study.title} was submitted and is not public yet.`, `/admin/reviews/${studyId}`);
	await writeNotice(sql, study.ownerId, "Submitted for review", `${study.title} is pending. It is not public yet.`, "/researcher/studies");
	await writeAudit(sql, actor, "Submitted study for review", study.title);
	return {
		ok: true,
		message: "Sent for review. It is not public until it is approved and opened."
	};
}
/** Approve, reject, or send a study back for changes. Administrators only. */
async function reviewStudy(actor, studyId, action, note) {
	if (actor.role !== "admin") return {
		ok: false,
		error: "Only an administrator can review a study request."
	};
	const sql = await getSql();
	const rows = await sql`
    select id, owner_id as "ownerId", title, status from rc_studies where id = ${studyId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That study no longer exists."
	};
	const study = rows[0];
	if (study.status !== "pending_review") return {
		ok: false,
		error: "Review actions apply to studies that are pending review."
	};
	const trimmed = note.trim();
	if ((action === "reject" || action === "changes") && trimmed.length < 12) return {
		ok: false,
		error: "Write a clear reason (at least 12 characters)."
	};
	if (action === "approve") {
		await sql`
      update rc_studies set status = 'approved', rejection_reason = '', change_request = '', updated_at = now()
      where id = ${studyId}
    `;
		await writeNotice(sql, study.ownerId, "Study approved", `${study.title} can be opened for recruitment. It is not public until you open it.`, "/researcher/studies");
		await writeAudit(sql, actor, "Approved study", study.title);
		return {
			ok: true,
			message: "Approved. The researcher still has to open recruitment."
		};
	}
	if (action === "reject") {
		await sql`
      update rc_studies set status = 'rejected', rejection_reason = ${trimmed}, updated_at = now()
      where id = ${studyId}
    `;
		await writeNotice(sql, study.ownerId, "Study rejected", trimmed, "/researcher/studies");
		await writeAudit(sql, actor, "Rejected study", study.title);
		return {
			ok: true,
			message: "Rejected, with the reason you wrote."
		};
	}
	await sql`
    update rc_studies set status = 'draft', change_request = ${trimmed}, rejection_reason = '', updated_at = now()
    where id = ${studyId}
  `;
	await writeNotice(sql, study.ownerId, "Changes requested", trimmed, `/researcher/create?studyId=${studyId}`);
	await writeAudit(sql, actor, "Requested changes", study.title);
	return {
		ok: true,
		message: "Sent back to draft."
	};
}
/** Open recruitment, pause it, resume it, or close the study. */
async function setStudyStatus(actor, studyId, action) {
	const sql = await getSql();
	const rows = await sql`
    select id, owner_id as "ownerId", title, status from rc_studies where id = ${studyId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That study no longer exists."
	};
	const study = rows[0];
	const isOwner = study.ownerId === actor.userId;
	const isAdmin = actor.role === "admin";
	if (!isOwner && !isAdmin) return {
		ok: false,
		error: "You can only change recruitment on your own study."
	};
	if (action === "open") {
		if (study.status !== "approved") return {
			ok: false,
			error: "Open recruitment only after the request is approved."
		};
		await sql`update rc_studies set status = 'active', updated_at = now() where id = ${studyId}`;
		await writeAudit(sql, actor, "Opened recruitment", study.title);
		return {
			ok: true,
			message: "Recruitment is open and the study can appear in Browse."
		};
	}
	if (action === "pause") {
		if (study.status !== "active") return {
			ok: false,
			error: "Only an active study can be paused."
		};
		await sql`update rc_studies set status = 'paused', paused_by_admin = ${isAdmin}, updated_at = now() where id = ${studyId}`;
		await writeAudit(sql, actor, "Paused study", study.title);
		return {
			ok: true,
			message: "Recruitment paused."
		};
	}
	if (action === "resume") {
		if (study.status !== "paused") return {
			ok: false,
			error: "That study is not paused."
		};
		if (study.status === "paused" && await pausedByAdmin(sql, studyId) && !isAdmin) return {
			ok: false,
			error: "An administrator paused this study. Only an administrator can resume it."
		};
		await sql`update rc_studies set status = 'active', paused_by_admin = false, updated_at = now() where id = ${studyId}`;
		await writeAudit(sql, actor, "Resumed study", study.title);
		return {
			ok: true,
			message: "Recruitment resumed."
		};
	}
	if (study.status !== "active" && study.status !== "paused") return {
		ok: false,
		error: "Only an active or paused study can be marked completed."
	};
	await sql`update rc_studies set status = 'completed', updated_at = now() where id = ${studyId}`;
	await writeAudit(sql, actor, "Marked study completed", study.title);
	return {
		ok: true,
		message: "Marked completed. New participants cannot join."
	};
}
async function pausedByAdmin(sql, studyId) {
	const rows = await sql`
    select paused_by_admin as "pausedByAdmin" from rc_studies where id = ${studyId}
  `;
	return Boolean(rows[0]?.pausedByAdmin);
}
/** Consent to a study that is open for participants. */
async function consentToStudy(actor, studyId) {
	if (actor.role !== "participant") return {
		ok: false,
		error: "Join with a participant account. Researchers do not enrol themselves."
	};
	const sql = await getSql();
	const rows = await sql`
    select id, title, status from rc_studies where id = ${studyId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That study no longer exists."
	};
	if (rows[0].status !== "active") return {
		ok: false,
		error: "This study is not open for new participants."
	};
	const existing = await sql`
    select id, status from rc_applications
    where study_id = ${studyId} and participant_id = ${actor.userId}
    order by created_at desc limit 1
  `;
	if (existing.length && existing[0].status === "consented") return {
		ok: false,
		error: "You already consented to this study."
	};
	const applicationId = `app-${crypto.randomUUID().slice(0, 8)}`;
	const responseId = `rsp-${crypto.randomUUID().slice(0, 8)}`;
	const code = `RC-${Math.floor(1e3 + Math.random() * 9e3)}`;
	if (existing.length) await sql`
      update rc_applications set status = 'consented', updated_at = now() where id = ${existing[0].id}
    `;
	else await sql`
      insert into rc_applications (id, study_id, participant_id, status, origin)
      values (${applicationId}, ${studyId}, ${actor.userId}, 'consented', 'server')
    `;
	await sql`
    insert into rc_responses (id, study_id, code, participant_id, application_id, quality, withdrawn, note, origin)
    values (${responseId}, ${studyId}, ${code}, ${actor.userId}, ${applicationId}, 'pending', ${false}, '', 'server')
  `;
	await writeAudit(sql, actor, "Consented to a study", rows[0].title);
	return {
		ok: true,
		message: "Consent recorded. The questionnaire link is external and was not submitted for you."
	};
}
/** Decline a study. */
async function declineStudy(actor, studyId) {
	if (actor.role !== "participant") return {
		ok: false,
		error: "Join with a participant account. Researchers do not enrol themselves."
	};
	const sql = await getSql();
	const rows = await sql`
    select id, title from rc_studies where id = ${studyId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That study no longer exists."
	};
	const existing = await sql`
    select id, status from rc_applications
    where study_id = ${studyId} and participant_id = ${actor.userId}
    order by created_at desc limit 1
  `;
	if (existing.length && existing[0].status === "consented") return {
		ok: false,
		error: "You already consented. Use withdraw if you want to stop."
	};
	if (existing.length) await sql`
      update rc_applications set status = 'declined', updated_at = now() where id = ${existing[0].id}
    `;
	else await sql`
      insert into rc_applications (id, study_id, participant_id, status, origin)
      values (${`app-${crypto.randomUUID().slice(0, 8)}`}, ${studyId}, ${actor.userId}, 'declined', 'server')
    `;
	await writeAudit(sql, actor, "Declined a study", rows[0].title);
	return {
		ok: true,
		message: "Your decline was saved."
	};
}
/** Withdraw from a study the participant consented to. */
async function withdrawFromStudy(actor, studyId) {
	if (actor.role !== "participant") return {
		ok: false,
		error: "Join with a participant account. Researchers do not enrol themselves."
	};
	const sql = await getSql();
	const rows = await sql`
    select id, title, status from rc_studies where id = ${studyId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That study no longer exists."
	};
	if (rows[0].status === "completed") return {
		ok: false,
		error: "This study is already closed."
	};
	const existing = await sql`
    select id, status from rc_applications
    where study_id = ${studyId} and participant_id = ${actor.userId}
    order by created_at desc limit 1
  `;
	if (!existing.length || existing[0].status !== "consented") return {
		ok: false,
		error: "There is no active consent to withdraw."
	};
	await sql`
    update rc_applications set status = 'withdrawn', updated_at = now() where id = ${existing[0].id}
  `;
	await sql`
    update rc_responses
    set withdrawn = true, note = case when note = '' then 'Participant withdrew.' else note end
    where application_id = ${existing[0].id}
  `;
	await writeAudit(sql, actor, "Withdrew from a study", rows[0].title);
	return {
		ok: true,
		message: "Withdrawal saved."
	};
}
/** Label a response. The researcher who owns the study, or an administrator. */
async function setResponseQuality(actor, responseId, quality, note) {
	const sql = await getSql();
	const rows = await sql`
    select id, study_id as "studyId", code, withdrawn from rc_responses where id = ${responseId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That record no longer exists."
	};
	const record = rows[0];
	const owner = await ownerOf(sql, record.studyId);
	if (actor.role !== "admin" && owner !== actor.userId) return {
		ok: false,
		error: "Only the researcher who owns the study can label responses."
	};
	if (record.withdrawn) return {
		ok: false,
		error: "Withdrawn records stay withdrawn. They are not labelled as accepted."
	};
	await sql`
    update rc_responses set quality = ${quality}, note = ${note.trim()} where id = ${responseId}
  `;
	await writeAudit(sql, actor, "Updated a quality label", `${record.code} → ${quality.replaceAll("_", " ")}`);
	return {
		ok: true,
		message: "Label saved. It does not verify that the response is genuine."
	};
}
/** Mark a questionnaire complete. */
async function markResponseComplete(actor, responseId) {
	const sql = await getSql();
	const rows = await sql`
    select id, study_id as "studyId", code, withdrawn,
      ${TS.replace("%s", "completed_at")} as "completedAt"
    from rc_responses where id = ${responseId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That record no longer exists."
	};
	const record = rows[0];
	const owner = await ownerOf(sql, record.studyId);
	if (actor.role !== "admin" && owner !== actor.userId) return {
		ok: false,
		error: "You cannot update that record."
	};
	if (record.withdrawn) return {
		ok: false,
		error: "This participant withdrew."
	};
	if (record.completedAt) return {
		ok: false,
		error: "That record is already marked complete."
	};
	await sql`
    update rc_responses set completed_at = now(), quality = 'pending' where id = ${responseId}
  `;
	await writeAudit(sql, actor, "Marked a questionnaire complete", record.code);
	return {
		ok: true,
		message: "Marked complete. The external questionnaire was not checked automatically."
	};
}
/** Mark one notice read. Only the owner of the notice. */
async function markNoticeRead(actor, noticeId) {
	await (await getSql())`
    update rc_notices set read = true
    where id = ${noticeId} and (user_id = ${actor.userId} or user_id = 'role:admin')
  `;
	return { ok: true };
}
/** Mark every notice of the signed-in user read. */
async function markAllNoticesRead(actor) {
	await (await getSql())`update rc_notices set read = true where user_id = ${actor.userId}`;
	return { ok: true };
}
/** A report or a contact message. Anyone may send one, signed in or not. */
async function addIssue(input) {
	await (await getSql())`
    insert into rc_issues (id, source, name, email, subject, body, status, study_id, origin)
    values (
      ${`iss-${crypto.randomUUID().slice(0, 8)}`}, ${input.source}, ${input.name.trim()}, ${input.email.trim()},
      ${input.subject.trim()}, ${input.body.trim()}, 'open', ${input.studyId ?? null}, 'server'
    )
  `;
	return {
		ok: true,
		message: "Saved. An administrator can see it under reported issues."
	};
}
/** Move a report along. Administrators only. */
async function setIssueStatus(actor, issueId, status) {
	if (actor.role !== "admin") return {
		ok: false,
		error: "Only an administrator can change a report."
	};
	const sql = await getSql();
	const rows = await sql`
    select id, subject from rc_issues where id = ${issueId}
  `;
	if (!rows.length) return {
		ok: false,
		error: "That report no longer exists."
	};
	await sql`update rc_issues set status = ${status} where id = ${issueId}`;
	await writeAudit(sql, actor, "Updated a report", rows[0].subject);
	return {
		ok: true,
		message: "Report status updated."
	};
}
/**
* Insert the sample records the first time the database is used.
*
* The demo shipped sample studies so a new workspace had something to look at.
* They are marked `origin = 'sample'` and are visible to everyone, exactly
* like the browser seed they replace.
*/
async function seedIfEmpty() {
	const sql = await getSql();
	const existing = await sql`select count(*)::int as count from rc_studies`;
	if (Number(existing[0]?.count ?? 0) > 0) return;
	const seed = cloneSeed();
	for (const user of seed.users) await sql`
      insert into rc_profiles (user_id, email, name, role, institution, programme, email_verified, notify_email, notify_in_app, suspended, origin)
      values (${user.id}, ${user.email}, ${user.name}, ${user.role}, ${user.institution}, ${user.programme}, ${user.emailVerified}, ${user.notifyEmail}, ${user.notifyInApp}, ${user.suspended}, 'sample')
      on conflict (user_id) do nothing
    `;
	for (const study of seed.studies) await sql`
      insert into rc_studies (
        id, owner_id, title, purpose, description, category, institution,
        target_population, age_min, age_max, location, inclusion, exclusion,
        extra_questions, target_count, deadline, method, completion_minutes,
        questionnaire_url, incentive, information_statement, privacy_ack,
        approval_ack, status, rejection_reason, change_request, paused_by_admin,
        origin, created_at, updated_at
      ) values (
        ${study.id}, ${study.ownerId}, ${study.title}, ${study.purpose},
        ${study.description}, ${study.category}, ${study.institution},
        ${study.targetPopulation}, ${study.ageMin}, ${study.ageMax}, ${study.location},
        ${study.inclusion}, ${study.exclusion}, ${study.extraQuestions},
        ${study.targetCount}, ${study.deadline}, ${study.method},
        ${study.completionMinutes}, ${study.questionnaireUrl}, ${study.incentive},
        ${study.informationStatement}, ${study.privacyAck}, ${study.approvalAck},
        ${study.status}, ${study.rejectionReason}, ${study.changeRequest},
        ${study.pausedByAdmin}, 'sample', ${study.createdAt}, ${study.updatedAt}
      )
      on conflict (id) do nothing
    `;
	for (const application of seed.applications) await sql`
      insert into rc_applications (id, study_id, participant_id, status, origin, created_at, updated_at)
      values (${application.id}, ${application.studyId}, ${application.participantId}, ${application.status}, 'sample', ${application.createdAt}, ${application.updatedAt})
      on conflict (id) do nothing
    `;
	for (const response of seed.responses) await sql`
      insert into rc_responses (id, study_id, code, participant_id, application_id, created_at, completed_at, quality, withdrawn, note, origin)
      values (${response.id}, ${response.studyId}, ${response.code}, ${response.participantId ?? null}, ${response.applicationId ?? null}, ${response.createdAt}, ${response.completedAt ?? null}, ${response.quality}, ${response.withdrawn}, ${response.note}, 'sample')
      on conflict (id) do nothing
    `;
	for (const notice of seed.notices) await sql`
      insert into rc_notices (id, user_id, title, body, href, read, origin, created_at)
      values (${notice.id}, ${notice.userId}, ${notice.title}, ${notice.body}, ${notice.href}, ${notice.read}, 'sample', ${notice.createdAt})
      on conflict (id) do nothing
    `;
	for (const event of seed.audits) await sql`
      insert into rc_audit_events (id, actor_id, actor_name, action, detail, origin, created_at)
      values (${event.id}, ${event.actorId}, ${event.actorName}, ${event.action}, ${event.detail}, 'sample', ${event.createdAt})
      on conflict (id) do nothing
    `;
	for (const issue of seed.issues) await sql`
      insert into rc_issues (id, source, name, email, subject, body, status, study_id, origin, created_at)
      values (${issue.id}, ${issue.source}, ${issue.name}, ${issue.email}, ${issue.subject}, ${issue.body}, ${issue.status}, ${issue.studyId ?? null}, 'sample', ${issue.createdAt})
      on conflict (id) do nothing
    `;
}
//#endregion
export { addIssue, buildState, consentToStudy, declineStudy, ensureProfile, markAllNoticesRead, markNoticeRead, markResponseComplete, reviewStudy, saveStudy, seedIfEmpty, setIssueStatus, setOwnRole, setResponseQuality, setStudyStatus, submitStudy, suspendUser, updatePreferences, updateProfile, withdrawFromStudy };
