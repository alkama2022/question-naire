//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DcrvULnY.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/admin",
			"/participant",
			"/researcher",
			"/about",
			"/contact",
			"/for-participants",
			"/for-researchers",
			"/forgot-password",
			"/how-it-works",
			"/login",
			"/privacy",
			"/register",
			"/reset-password",
			"/terms",
			"/verify-email",
			"/studies/$studyId",
			"/studies/"
		],
		preloads: [
			"/assets/index-OzcbfwP1.js",
			"/assets/clsx-BbohabLV.js",
			"/assets/store-BTpfV7OX.js",
			"/assets/lazyRouteComponent-Bunbq2ny.js",
			"/assets/root-DLTE-HSj.js",
			"/assets/preload-helper-BLdHbfdN.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-OzcbfwP1.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DXDJUbtA.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/metrics-CR4QY6hj.js",
			"/assets/badge-36_ROeac.js",
			"/assets/card-D5jGBJLg.js"
		]
	},
	"/admin": {
		filePath: "/workspace/src/routes/admin/route.tsx",
		children: [
			"/admin/audit",
			"/admin/issues",
			"/admin/monitoring",
			"/admin/users",
			"/admin/",
			"/admin/reviews/$studyId",
			"/admin/reviews/"
		],
		preloads: ["/assets/route-3i6kTTrm.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/participant": {
		filePath: "/workspace/src/routes/participant/route.tsx",
		children: [
			"/participant/applications",
			"/participant/history",
			"/participant/notifications",
			"/participant/settings",
			"/participant/",
			"/participant/studies/$studyId",
			"/participant/studies/"
		],
		preloads: ["/assets/route-Cy3ryT1g.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/researcher": {
		filePath: "/workspace/src/routes/researcher/route.tsx",
		children: [
			"/researcher/create",
			"/researcher/help",
			"/researcher/notifications",
			"/researcher/reports",
			"/researcher/settings",
			"/researcher/studies",
			"/researcher/",
			"/researcher/recruitment/$studyId",
			"/researcher/recruitment/"
		],
		preloads: ["/assets/route-C8QPV_1w.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/about": {
		filePath: "/workspace/src/routes/about.tsx",
		children: void 0,
		preloads: ["/assets/about-CzoSu_ZB.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/contact": {
		filePath: "/workspace/src/routes/contact.tsx",
		children: void 0,
		preloads: [
			"/assets/contact-DNg7a8T7.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/panels-DIQlEFYZ.js"
		]
	},
	"/for-participants": {
		filePath: "/workspace/src/routes/for-participants.tsx",
		children: void 0,
		preloads: ["/assets/for-participants-Cekirj6Q.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/for-researchers": {
		filePath: "/workspace/src/routes/for-researchers.tsx",
		children: void 0,
		preloads: ["/assets/for-researchers-0_OsVXYg.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/forgot-password": {
		filePath: "/workspace/src/routes/forgot-password.tsx",
		children: void 0,
		preloads: [
			"/assets/forgot-password-CnrvLnBu.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/panels-DIQlEFYZ.js"
		]
	},
	"/how-it-works": {
		filePath: "/workspace/src/routes/how-it-works.tsx",
		children: void 0,
		preloads: ["/assets/how-it-works-DxAd6UVJ.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/login": {
		filePath: "/workspace/src/routes/login.tsx",
		children: void 0,
		preloads: [
			"/assets/login-CT1fKaI3.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/panels-DIQlEFYZ.js"
		]
	},
	"/privacy": {
		filePath: "/workspace/src/routes/privacy.tsx",
		children: void 0,
		preloads: ["/assets/privacy-DipQBwyg.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/register": {
		filePath: "/workspace/src/routes/register.tsx",
		children: void 0,
		preloads: [
			"/assets/register-CGeZCZQ2.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/panels-DIQlEFYZ.js"
		]
	},
	"/reset-password": {
		filePath: "/workspace/src/routes/reset-password.tsx",
		children: void 0,
		preloads: [
			"/assets/reset-password-CZrG_kdR.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/panels-DIQlEFYZ.js"
		]
	},
	"/terms": {
		filePath: "/workspace/src/routes/terms.tsx",
		children: void 0,
		preloads: ["/assets/terms-DsqcWDNF.js", "/assets/shells-IB5-QuUW.js"]
	},
	"/verify-email": {
		filePath: "/workspace/src/routes/verify-email.tsx",
		children: void 0,
		preloads: [
			"/assets/verify-email-CeS-_vnB.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/panels-DIQlEFYZ.js"
		]
	},
	"/admin/audit": {
		filePath: "/workspace/src/routes/admin/audit.tsx",
		children: void 0,
		preloads: ["/assets/audit-CU2ZbISI.js", "/assets/views-B-i8HRW4.js"]
	},
	"/admin/issues": {
		filePath: "/workspace/src/routes/admin/issues.tsx",
		children: void 0,
		preloads: ["/assets/issues-5a2-kpn_.js", "/assets/views-B-i8HRW4.js"]
	},
	"/admin/monitoring": {
		filePath: "/workspace/src/routes/admin/monitoring.tsx",
		children: void 0,
		preloads: ["/assets/monitoring-frxzIWhD.js", "/assets/views-B-i8HRW4.js"]
	},
	"/admin/users": {
		filePath: "/workspace/src/routes/admin/users.tsx",
		children: void 0,
		preloads: ["/assets/users-DmDAFS1_.js", "/assets/views-B-i8HRW4.js"]
	},
	"/participant/applications": {
		filePath: "/workspace/src/routes/participant/applications.tsx",
		children: void 0,
		preloads: ["/assets/applications-B1_a05eT.js", "/assets/views-B-i8HRW4.js"]
	},
	"/participant/history": {
		filePath: "/workspace/src/routes/participant/history.tsx",
		children: void 0,
		preloads: ["/assets/history-B3qKxRbc.js", "/assets/views-B-i8HRW4.js"]
	},
	"/participant/notifications": {
		filePath: "/workspace/src/routes/participant/notifications.tsx",
		children: void 0,
		preloads: ["/assets/notifications-DEX38VHz.js", "/assets/panels-DIQlEFYZ.js"]
	},
	"/participant/settings": {
		filePath: "/workspace/src/routes/participant/settings.tsx",
		children: void 0,
		preloads: ["/assets/settings-dWb-WQVz.js", "/assets/panels-DIQlEFYZ.js"]
	},
	"/researcher/create": {
		filePath: "/workspace/src/routes/researcher/create.tsx",
		children: void 0,
		preloads: [
			"/assets/create-CrN7Suir.js",
			"/assets/useNavigate-CVRlDLaA.js",
			"/assets/field-COfMQ_4e.js",
			"/assets/card-D5jGBJLg.js"
		]
	},
	"/researcher/help": {
		filePath: "/workspace/src/routes/researcher/help.tsx",
		children: void 0,
		preloads: ["/assets/help-C_3xU9u-.js"]
	},
	"/researcher/notifications": {
		filePath: "/workspace/src/routes/researcher/notifications.tsx",
		children: void 0,
		preloads: ["/assets/notifications-9EDr6TVE.js", "/assets/panels-DIQlEFYZ.js"]
	},
	"/researcher/reports": {
		filePath: "/workspace/src/routes/researcher/reports.tsx",
		children: void 0,
		preloads: ["/assets/reports-1IdLlGhp.js", "/assets/views-B-i8HRW4.js"]
	},
	"/researcher/settings": {
		filePath: "/workspace/src/routes/researcher/settings.tsx",
		children: void 0,
		preloads: ["/assets/settings-7ZossRQQ.js", "/assets/panels-DIQlEFYZ.js"]
	},
	"/researcher/studies": {
		filePath: "/workspace/src/routes/researcher/studies.tsx",
		children: void 0,
		preloads: ["/assets/studies-rDmg9DnI.js", "/assets/catalog-7ycNW9D3.js"]
	},
	"/studies/$studyId": {
		filePath: "/workspace/src/routes/studies/$studyId.tsx",
		children: void 0,
		preloads: [
			"/assets/_studyId-Cz-mLhnF.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/study-detail-ci_VTnJ9.js"
		]
	},
	"/admin/": {
		filePath: "/workspace/src/routes/admin/index.tsx",
		children: void 0,
		preloads: ["/assets/admin-HzyP6cA6.js", "/assets/views-B-i8HRW4.js"]
	},
	"/participant/": {
		filePath: "/workspace/src/routes/participant/index.tsx",
		children: void 0,
		preloads: ["/assets/participant-IqtBQpxz.js", "/assets/views-B-i8HRW4.js"]
	},
	"/researcher/": {
		filePath: "/workspace/src/routes/researcher/index.tsx",
		children: void 0,
		preloads: ["/assets/researcher-B-cchmrq.js", "/assets/views-B-i8HRW4.js"]
	},
	"/studies/": {
		filePath: "/workspace/src/routes/studies/index.tsx",
		children: void 0,
		preloads: [
			"/assets/studies-Cn6UbN_e.js",
			"/assets/shells-IB5-QuUW.js",
			"/assets/catalog-7ycNW9D3.js",
			"/assets/metrics-CR4QY6hj.js"
		]
	},
	"/admin/reviews/$studyId": {
		filePath: "/workspace/src/routes/admin/reviews/$studyId.tsx",
		children: void 0,
		preloads: ["/assets/_studyId-Bfw9fLVo.js", "/assets/views-B-i8HRW4.js"]
	},
	"/participant/studies/$studyId": {
		filePath: "/workspace/src/routes/participant/studies/$studyId.tsx",
		children: void 0,
		preloads: ["/assets/_studyId-CVHjDJ1_.js", "/assets/study-detail-ci_VTnJ9.js"]
	},
	"/researcher/recruitment/$studyId": {
		filePath: "/workspace/src/routes/researcher/recruitment/$studyId.tsx",
		children: void 0,
		preloads: ["/assets/_studyId-DpEld6CD.js", "/assets/recruitment-panel-CAeCxpUh.js"]
	},
	"/admin/reviews/": {
		filePath: "/workspace/src/routes/admin/reviews/index.tsx",
		children: void 0,
		preloads: ["/assets/reviews-y8cRkzuj.js", "/assets/views-B-i8HRW4.js"]
	},
	"/participant/studies/": {
		filePath: "/workspace/src/routes/participant/studies/index.tsx",
		children: void 0,
		preloads: ["/assets/studies-Ce8iE-vy.js", "/assets/catalog-7ycNW9D3.js"]
	},
	"/researcher/recruitment/": {
		filePath: "/workspace/src/routes/researcher/recruitment/index.tsx",
		children: void 0,
		preloads: ["/assets/recruitment-D_-R7Qix.js", "/assets/recruitment-panel-CAeCxpUh.js"]
	}
} });
//#endregion
export { tsrStartManifest };
