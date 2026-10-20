import { a as format, c as startOfWeek, i as isWithinInterval, o as endOfWeek, r as parseISO, t as subWeeks } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/metrics-Djf8O_va.js
function recruitmentSnapshot(study, responses) {
	const active = responses.filter((record) => !record.withdrawn);
	const eligible = active.length;
	const completed = active.filter((record) => Boolean(record.completedAt)).length;
	const awaiting = active.filter((record) => record.completedAt && record.quality === "pending").length;
	const excluded = active.filter((record) => record.quality === "excluded").length;
	const accepted = active.filter((record) => record.quality === "accepted").length;
	const needsReview = active.filter((record) => record.quality === "needs_review").length;
	const pendingIncomplete = active.filter((record) => !record.completedAt && record.quality === "pending").length;
	const withdrawn = responses.filter((record) => record.withdrawn).length;
	const target = study.targetCount;
	return {
		target,
		eligible,
		completed,
		awaiting,
		excluded,
		accepted,
		needsReview,
		pendingIncomplete,
		withdrawn,
		remaining: Math.max(0, target - accepted),
		acceptedPercent: target === 0 ? 0 : Math.min(100, Math.round(accepted / target * 100)),
		completedPercent: target === 0 ? 0 : Math.min(100, Math.round(completed / target * 100))
	};
}
function weeklySeries(responses, now = /* @__PURE__ */ new Date()) {
	const current = startOfWeek(now, { weekStartsOn: 1 });
	return Array.from({ length: 6 }, (_, index) => {
		const start = subWeeks(current, 5 - index);
		const end = endOfWeek(start, { weekStartsOn: 1 });
		const inside = (iso) => {
			if (!iso) return false;
			return isWithinInterval(parseISO(iso), {
				start,
				end
			});
		};
		const active = responses.filter((record) => !record.withdrawn);
		return {
			week: format(start, "d MMM"),
			recruited: active.filter((record) => inside(record.createdAt)).length,
			completed: active.filter((record) => inside(record.completedAt)).length,
			accepted: active.filter((record) => record.quality === "accepted" && inside(record.completedAt)).length
		};
	});
}
function researcherActions(status) {
	switch (status) {
		case "draft": return [
			"view",
			"edit",
			"submit"
		];
		case "pending_review": return ["view"];
		case "approved": return ["view", "open"];
		case "active": return [
			"view",
			"progress",
			"pause",
			"complete"
		];
		case "paused": return [
			"view",
			"progress",
			"resume",
			"complete"
		];
		case "completed": return ["view", "progress"];
		case "rejected": return [
			"view",
			"edit",
			"submit"
		];
	}
}
function isPublicStudy(status) {
	return status === "active" || status === "paused";
}
//#endregion
export { weeklySeries as i, recruitmentSnapshot as n, researcherActions as r, isPublicStudy as t };
