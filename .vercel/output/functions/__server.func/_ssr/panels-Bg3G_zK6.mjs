import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link, w as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as signIn, t as authClient } from "./client-IWHfIGH2.mjs";
import { n as DEMO_PASSWORD } from "./sample-data-tji98cyF.mjs";
import { C as roleHome, D as useDemoQuery, O as useDemoStore, _ as localPasswordSchema, b as profileSchema, c as contactSchema, g as issuesToMap, k as useSessionUser, n as ConfirmDialog, t as Button, v as loginSchema, x as registerSchema, y as noticesFor } from "./store-BQzU-IjM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as getSignInMethods, l as researchService } from "./router-C7WB0ZbB.mjs";
import { n as useDataModeResolved, t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
import { t as Card } from "./card-CRc-JasC.mjs";
import { a as RadioCards, i as PasswordInput, n as Field, r as Input, t as Checkbox } from "./field-DFwMbXWQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panels-Bg3G_zK6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var samples = [
	[
		"Ada Okafor",
		"ada@demo.researchconnect.ng",
		"Researcher"
	],
	[
		"Chinedu Bello",
		"chinedu@demo.researchconnect.ng",
		"Participant"
	],
	[
		"Ibrahim Musa",
		"ibrahim@demo.researchconnect.ng",
		"Researcher"
	],
	[
		"Ngozi Eze",
		"ngozi@demo.researchconnect.ng",
		"Researcher"
	],
	[
		"Fatima Abdullahi",
		"fatima@demo.researchconnect.ng",
		"Participant"
	]
];
/**
* Sign in.
*
* With real sign-in (the production path) this is a real account: the
* password is checked by the server, the session is a server-held cookie, and
* the records behind it are shared between devices. In demo mode it stays the
* browser-only session the demo always had.
*/
function LoginForm() {
	if (useDataMode() === "server") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLoginForm, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoLoginForm, {});
}
function AccountLoginForm() {
	const navigate = useNavigate();
	const methods = getSignInMethods();
	const resolved = useDataModeResolved();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function enter() {
		const parsed = loginSchema.safeParse({
			email,
			password
		});
		if (!parsed.success) {
			setErrors(issuesToMap(parsed.error.issues));
			return;
		}
		setErrors({});
		setBusy(true);
		try {
			const { error } = await authClient.signIn.email({
				email: parsed.data.email,
				password: parsed.data.password
			});
			if (error) {
				toast.error(error.message ?? "That email and password did not match.");
				return;
			}
			await researchService.refresh();
			const viewer = researchService.mode === "server" ? currentRole() : null;
			toast.success("Signed in.");
			navigate({ to: viewer ? roleHome(viewer) : "/" });
		} catch {
			toast.error("Sign-in could not be completed. Try again.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (event) => {
					event.preventDefault();
					enter();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						htmlFor: "login-email",
						error: errors.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "login-email",
							type: "email",
							autoComplete: "username",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							"aria-invalid": Boolean(errors.email)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						htmlFor: "login-password",
						error: errors.password,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
							id: "login-password",
							autoComplete: "current-password",
							value: password,
							onChange: (event) => setPassword(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						busy,
						children: "Log in"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/forgot-password",
					className: "font-medium text-brand underline",
					children: "Forgot password"
				})
			})]
		}), resolved && methods.providers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-3 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold",
				children: "Or continue with"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: methods.providers.map((providerId) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					onClick: () => {
						signIn(providerId, { callbackURL: "/" }).catch(() => toast.error("Sign-in could not be started."));
					},
					children: ["Continue with ", providerLabel(providerId)]
				}, providerId))
			})]
		}) : null]
	});
}
/** The role of the person who just signed in, as the server holds it. */
function currentRole() {
	const state = useDemoStore.getState();
	const user = state.users.find((item) => item.id === state.sessionUserId);
	return user ? user.role : null;
}
function providerLabel(providerId) {
	if (providerId.includes("google")) return "Google";
	if (providerId.includes("twitter") || providerId.includes("x")) return "X";
	return "another provider";
}
function DemoLoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	function enter(nextEmail, nextPassword) {
		setBusy(true);
		const result = useDemoStore.getState().login(nextEmail, nextPassword);
		setBusy(false);
		if (!result.ok || !result.data) {
			toast.error(result.error);
			return;
		}
		const user = useDemoStore.getState().users.find((item) => item.id === result.data?.userId);
		toast.success(result.message);
		if (user) navigate({ to: roleHome(user.role) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4",
				onSubmit: (event) => {
					event.preventDefault();
					const parsed = loginSchema.safeParse({
						email,
						password
					});
					if (!parsed.success) {
						setErrors(issuesToMap(parsed.error.issues));
						return;
					}
					setErrors({});
					enter(parsed.data.email, parsed.data.password);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						htmlFor: "login-email",
						error: errors.email,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "login-email",
							type: "email",
							autoComplete: "username",
							value: email,
							onChange: (event) => setEmail(event.target.value),
							"aria-invalid": Boolean(errors.email)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Password",
						htmlFor: "login-password",
						error: errors.password,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
							id: "login-password",
							autoComplete: "current-password",
							value: password,
							onChange: (event) => setPassword(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						busy,
						children: "Log in to demo"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/forgot-password",
					className: "font-medium text-brand underline",
					children: "Forgot password"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Sample sessions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: [
						"Password for every sample account: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-ink",
							children: DEMO_PASSWORD
						}),
						". These are demonstration records, not real people."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2",
					children: samples.map(([name, sampleEmail, role]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-ink-soft",
								children: [
									role,
									" · ",
									sampleEmail
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							busy,
							onClick: () => enter(sampleEmail, DEMO_PASSWORD),
							children: "Use session"
						})]
					}, sampleEmail))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 border-t border-line pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-medium",
							children: "Administrator preview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink-soft",
							children: "Registration cannot grant admin. This button opens a local preview. Actions change demo data in this browser only and are not server authorization."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							variant: "secondary",
							onClick: () => {
								useDemoStore.getState().openAdminPreview();
								toast.success("Admin preview opened in this browser. It is not a privileged production account.");
								navigate({ to: "/admin" });
							},
							children: "Open admin preview"
						})
					]
				})
			]
		})]
	});
}
/**
* Create an account.
*
* With real sign-in this creates a server-held account: the password is
* hashed by the server, the session is a server cookie, and the profile
* (role, institution, programme) is written to the database. The role is
* chosen here, but only between researcher and participant — administrator
* access is granted by the server, never by the browser.
*/
function RegisterForm({ initialRole }) {
	const mode = useDataMode();
	const navigate = useNavigate();
	const [role, setRole] = (0, import_react.useState)(initialRole ?? "researcher");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [institution, setInstitution] = (0, import_react.useState)("");
	const [programme, setProgramme] = (0, import_react.useState)("");
	const [acceptTerms, setAcceptTerms] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit() {
		const parsed = registerSchema.safeParse({
			name,
			email,
			password,
			confirm,
			role,
			institution,
			programme,
			acceptTerms
		});
		if (!parsed.success) {
			setErrors(issuesToMap(parsed.error.issues));
			return;
		}
		setErrors({});
		setBusy(true);
		try {
			if (mode === "server") {
				const { error } = await authClient.signUp.email({
					email: parsed.data.email,
					password: parsed.data.password,
					name: parsed.data.name
				});
				if (error) {
					toast.error(error.message ?? "That account could not be created.");
					return;
				}
				await researchService.refresh();
				if (parsed.data.role === "researcher") {
					const roleResult = await researchService.setOwnRole(parsed.data.role);
					if (!roleResult.ok) toast.error(roleResult.error);
				}
				await researchService.updateProfile("", {
					name: parsed.data.name,
					institution: parsed.data.institution,
					programme: parsed.data.programme
				});
				toast.success("Account created.");
				navigate({ to: "/verify-email" });
				return;
			}
			const result = useDemoStore.getState().register(parsed.data);
			if (!result.ok) {
				toast.error(result.error);
				return;
			}
			toast.success(result.message);
			navigate({ to: "/verify-email" });
		} catch {
			toast.error("The account could not be created. Try again.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "grid gap-4 p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => {
				event.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioCards, {
					name: "role",
					value: role,
					onValueChange: (value) => setRole(value),
					options: [{
						value: "researcher",
						title: "Researcher",
						body: "Create study requests, track recruitment, and export demo records."
					}, {
						value: "participant",
						title: "Participant",
						body: "Read studies, answer eligibility questions, and consent or decline."
					}]
				}),
				errors.role ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: errors.role
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-ink-soft",
					children: "You cannot assign yourself administrative access."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Full name",
					htmlFor: "reg-name",
					error: errors.name,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reg-name",
						value: name,
						onChange: (event) => setName(event.target.value),
						autoComplete: "name"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					htmlFor: "reg-email",
					error: errors.email,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reg-email",
						type: "email",
						value: email,
						onChange: (event) => setEmail(event.target.value),
						autoComplete: "email"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Institution",
					htmlFor: "reg-institution",
					error: errors.institution,
					hint: "Optional. For example, your university.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reg-institution",
						value: institution,
						onChange: (event) => setInstitution(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Programme",
					htmlFor: "reg-programme",
					error: errors.programme,
					hint: "Optional. For example, BSc Sociology, final year.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reg-programme",
						value: programme,
						onChange: (event) => setProgramme(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Password",
					htmlFor: "reg-password",
					error: errors.password,
					hint: "Do not reuse a real password. Demo mode stores it in this browser without encryption.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
						id: "reg-password",
						value: password,
						onChange: (event) => setPassword(event.target.value),
						autoComplete: "new-password"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Confirm password",
					htmlFor: "reg-confirm",
					error: errors.confirm,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
						id: "reg-confirm",
						value: confirm,
						onChange: (event) => setConfirm(event.target.value),
						autoComplete: "new-password"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: acceptTerms,
					onCheckedChange: setAcceptTerms,
					label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"I agree to the ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "underline",
							children: "terms"
						}),
						" and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "underline",
							children: "privacy notes"
						}),
						mode === "server" ? " for this service." : " for this demo."
					] })
				}),
				errors.acceptTerms ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: errors.acceptTerms
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					busy,
					children: mode === "server" ? "Create account" : "Create demo session"
				})
			]
		})
	});
}
/**
* Reset a password.
*
* With real sign-in the server owns the recovery flow and the deployment's
* mail service sends the link — so the browser asks the server and reports
* what it says. In demo mode the password only ever changes in this browser.
*/
function LocalPasswordForm() {
	const mode = useDataMode();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit() {
		const parsed = localPasswordSchema.safeParse({
			email,
			password,
			confirm
		});
		if (!parsed.success) {
			setErrors(issuesToMap(parsed.error.issues));
			return;
		}
		setBusy(true);
		try {
			if (mode === "server") {
				const { error } = await authClient.requestPasswordReset({
					email: parsed.data.email,
					redirectTo: "/reset-password"
				});
				if (error) {
					toast.error(error.message ?? "A reset link could not be requested.");
					return;
				}
				toast.success("If that address has an account, a reset link is on its way.");
				return;
			}
			const result = useDemoStore.getState().setLocalPassword(parsed.data.email, parsed.data.password);
			if (result.ok) toast.success(result.message);
			else toast.error(result.error);
		} catch {
			toast.error("The password could not be reset. Try again.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "grid gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-ink-soft",
			children: mode === "server" ? "Enter your email and the server sends a reset link. The link opens a page where you choose a new password." : "Password reset emails are not available. If the email already has a demo account in this browser, you can set a new local password here. This is not a secure recovery flow."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => {
				event.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					htmlFor: "reset-email",
					error: errors.email,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "reset-email",
						type: "email",
						value: email,
						onChange: (event) => setEmail(event.target.value)
					})
				}),
				mode === "server" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "New password",
					htmlFor: "reset-password",
					error: errors.password,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
						id: "reset-password",
						value: password,
						onChange: (event) => setPassword(event.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Confirm new password",
					htmlFor: "reset-confirm",
					error: errors.confirm,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
						id: "reset-confirm",
						value: confirm,
						onChange: (event) => setConfirm(event.target.value)
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					busy,
					children: mode === "server" ? "Send reset link" : "Update password in this browser"
				})
			]
		})]
	});
}
function VerifyEmailPanel() {
	const mode = useDataMode();
	const user = useSessionUser();
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Email verification"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: mode === "server" ? "Sign in to see this state." : "Sign in to a demo session to see this state."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Log in"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "grid gap-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Email verification"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					"Status:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.emailVerified ? mode === "server" ? "Verified" : "Marked verified in this browser" : "Not verified" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-soft",
				children: mode === "server" ? "Verification depends on the mail service this deployment is configured with. Until then, the account works and the address stays unverified." : `No verification email was sent. Demo mode cannot prove that ${user.email} belongs to you.`
			}),
			!user.emailVerified && mode !== "server" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				busy,
				onClick: () => {
					setBusy(true);
					const result = useDemoStore.getState().markVerifiedInDemo(user.id);
					setBusy(false);
					if (result.ok) toast.success(result.message);
					else toast.error(result.error);
				},
				children: "Mark as verified (demo only)"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: roleHome(user.role),
					children: "Continue to workspace"
				})
			})
		]
	});
}
function SettingsPanel() {
	const mode = useDataMode();
	const user = useSessionUser();
	const [name, setName] = (0, import_react.useState)(user?.name ?? "");
	const [institution, setInstitution] = (0, import_react.useState)(user?.institution ?? "");
	const [programme, setProgramme] = (0, import_react.useState)(user?.programme ?? "");
	const [notifyEmail, setNotifyEmail] = (0, import_react.useState)(user?.notifyEmail ?? true);
	const [notifyInApp, setNotifyInApp] = (0, import_react.useState)(user?.notifyInApp ?? true);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [resetOpen, setResetOpen] = (0, import_react.useState)(false);
	if (!user) return null;
	const server = mode === "server";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold",
					children: "Profile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: (event) => {
						event.preventDefault();
						const parsed = profileSchema.safeParse({
							name,
							institution,
							programme
						});
						if (!parsed.success) {
							setErrors(issuesToMap(parsed.error.issues));
							return;
						}
						(async () => {
							const result = server ? await researchService.updateProfile(user.id, parsed.data) : useDemoStore.getState().updateProfile(user.id, parsed.data);
							if (result.ok) toast.success(result.message);
							else toast.error(result.error);
						})();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							htmlFor: "set-name",
							error: errors.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "set-name",
								value: name,
								onChange: (event) => setName(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Institution",
							htmlFor: "set-inst",
							error: errors.institution,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "set-inst",
								value: institution,
								onChange: (event) => setInstitution(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Programme",
							htmlFor: "set-prog",
							error: errors.programme,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "set-prog",
								value: programme,
								onChange: (event) => setProgramme(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-ink-soft",
							children: [
								"Email stays ",
								user.email,
								". Role stays ",
								user.role,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: server ? "Save profile" : "Save profile in this browser"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid gap-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Notification preferences"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: notifyInApp,
						onCheckedChange: setNotifyInApp,
						label: "Show notices inside the workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: notifyEmail,
						onCheckedChange: setNotifyEmail,
						label: server ? "Email me" : "Email me (preference only — demo mode does not send email)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => {
							(async () => {
								const result = server ? await researchService.updatePrefs(user.id, {
									notifyEmail,
									notifyInApp
								}) : useDemoStore.getState().updatePrefs(user.id, {
									notifyEmail,
									notifyInApp
								});
								if (result.ok) toast.success(result.message);
								else toast.error(result.error);
							})();
						},
						children: "Save preferences"
					})
				]
			}),
			server ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Reset demo data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink-soft",
						children: "Restores the original sample studies and signs out. Accounts you created in this browser are removed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "danger",
						onClick: () => setResetOpen(true),
						children: "Reset demo data"
					})
				]
			}),
			server ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: resetOpen,
				onOpenChange: setResetOpen,
				title: "Reset all demo data?",
				body: "Sample records return, your browser-only accounts and edits are removed, and this session ends.",
				confirmLabel: "Reset",
				destructive: true,
				onConfirm: () => {
					useDemoStore.getState().resetDemo();
					setResetOpen(false);
					toast.success("Demo data restored in this browser.");
				}
			})
		]
	});
}
function NotificationsPanel() {
	const mode = useDataMode();
	const user = useSessionUser();
	const notices = useDemoQuery((state) => noticesFor(user, state.notices));
	const server = mode === "server";
	if (!user) return null;
	if (!user.notifyInApp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-ink-soft",
		children: "In-app notices are off in your preferences."
	});
	if (notices.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-ink-soft",
		children: server ? "No notices yet." : "No notices in this browser yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: () => {
				(async () => {
					if ((server ? await researchService.markAllRead(user.id) : (useDemoStore.getState().markAllRead(user.id), { ok: true })).ok) toast.success(server ? "Marked read." : "Marked read in this browser.");
				})();
			},
			children: "Mark all read"
		}) }), notices.map((notice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: notice.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-ink-soft",
						children: [
							notice.read ? "Read" : "Unread",
							" · ",
							originLabel(notice.origin)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-ink-soft",
					children: notice.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [notice.href.startsWith("/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: notice.href,
						className: "text-sm font-medium text-brand underline",
						children: "Open"
					}) : null, !notice.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm underline",
						onClick: () => {
							(async () => {
								if (server) await researchService.markNoticeRead(user.id, notice.id);
								else useDemoStore.getState().markNoticeRead(user.id, notice.id);
							})();
						},
						children: "Mark read"
					}) : null]
				})
			]
		}, notice.id))]
	});
}
/** Where a record was created — the label the screens show next to it. */
function originLabel(origin) {
	if (origin === "sample") return "Sample";
	if (origin === "server") return "Saved on the server";
	return "This browser";
}
function ContactForm() {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	const [name, setName] = (0, import_react.useState)(user?.name ?? "");
	const [email, setEmail] = (0, import_react.useState)(user?.email ?? "");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [done, setDone] = (0, import_react.useState)(false);
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold",
			children: server ? "Message sent to the team" : "Saved in this browser"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-ink-soft",
			children: server ? "An administrator can see it under reported issues. No email was sent — the message stays in the workspace." : "The message is in the demo inbox. No email was sent. An admin preview can see it under reported issues."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (event) => {
				event.preventDefault();
				const parsed = contactSchema.safeParse({
					name,
					email,
					subject,
					message
				});
				if (!parsed.success) {
					setErrors(issuesToMap(parsed.error.issues));
					return;
				}
				(async () => {
					const input = {
						source: "contact",
						name: parsed.data.name,
						email: parsed.data.email,
						subject: parsed.data.subject,
						body: parsed.data.message
					};
					const result = server ? await researchService.addIssue(input) : useDemoStore.getState().addIssue(input);
					if (result.ok) setDone(true);
					else toast.error(result.error);
				})();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					htmlFor: "contact-name",
					error: errors.name,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "contact-name",
						value: name,
						onChange: (event) => setName(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Email",
					htmlFor: "contact-email",
					error: errors.email,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "contact-email",
						type: "email",
						value: email,
						onChange: (event) => setEmail(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Subject",
					htmlFor: "contact-subject",
					error: errors.subject,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "contact-subject",
						value: subject,
						onChange: (event) => setSubject(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Message",
					htmlFor: "contact-message",
					error: errors.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "contact-message",
						className: "min-h-32 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm",
						value: message,
						onChange: (event) => setMessage(event.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: server ? "Send message" : "Save message in this browser"
				})
			]
		})
	});
}
//#endregion
export { RegisterForm as a, NotificationsPanel as i, LocalPasswordForm as n, SettingsPanel as o, LoginForm as r, VerifyEmailPanel as s, ContactForm as t };
