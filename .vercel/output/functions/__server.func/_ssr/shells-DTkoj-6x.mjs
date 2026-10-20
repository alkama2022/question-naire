import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { C as Link, g as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as signOut } from "./client-IWHfIGH2.mjs";
import { D as ChartLine, O as Bell, S as ClipboardList, _ as History, c as PanelLeft, d as LogOut, g as LayoutDashboard, i as Shield, m as LifeBuoy, n as Users, o as Settings, r as TriangleAlert, t as X, u as Menu, v as FolderOpen, w as CirclePlus, y as FileDown } from "../_libs/lucide-react.mjs";
import { d as DialogContent, g as DialogTrigger, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as useDemoStore, k as useSessionUser, n as ConfirmDialog, s as cn, t as Button, y as noticesFor } from "./store-BQzU-IjM.mjs";
import { t as useDataMode } from "./use-data-mode-Dv-JVxm1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shells-DTkoj-6x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8 shrink-0", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				className: "fill-brand"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9.5",
				cy: "19",
				r: "3.1",
				className: "fill-canvas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22.5",
				cy: "19",
				r: "3.1",
				className: "fill-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11.2 15.2C13.6 10.4 18.4 10.4 20.8 15.2",
				fill: "none",
				className: "stroke-accent",
				strokeWidth: "2.2",
				strokeLinecap: "round"
			})
		]
	});
}
function Logo({ tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "inline-flex items-center gap-2.5 rounded-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block font-display text-base font-semibold tracking-tight", tone === "light" ? "text-brand-foreground" : "text-ink"),
				children: "ResearchConnect"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs font-semibold tracking-widest text-accent uppercase",
				children: "Nigeria"
			})]
		})]
	});
}
var publicLinks = [
	{
		to: "/how-it-works",
		label: "How it works"
	},
	{
		to: "/for-researchers",
		label: "Researchers"
	},
	{
		to: "/for-participants",
		label: "Participants"
	},
	{
		to: "/studies",
		label: "Browse studies"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
/**
* The banner across the top.
*
* It says exactly where the records live — this browser (the demo) or the
* server (the production path) — so nobody is left guessing whether a study
* request was really saved.
*/
function DemoBanner() {
	if (useDataMode() === "server") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "bg-brand px-4 py-2 text-center text-sm text-brand-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold",
			children: "Live workspace."
		}), " Accounts and study records are stored on the server, so they are the same on every device you sign in from."]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "bg-brand px-4 py-2 text-center text-sm text-brand-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold",
			children: "Demo mode."
		}), " Accounts and study records stay in this browser. Sign-in is not secure, and nothing is saved on a server."]
	});
}
function MarketingShell({ children }) {
	const user = useSessionUser();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							"aria-label": "Primary",
							children: publicLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: link.to,
								className: "rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink",
								activeProps: { className: "rounded-md px-3 py-2 text-sm font-medium text-brand bg-brand/5" },
								children: link.label
							}, link.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden items-center gap-2 lg:flex",
							children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: homeFor(user.role),
									children: "Open workspace"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Log in"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/register",
									search: {},
									children: "Register"
								})
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex size-11 items-center justify-center rounded-lg border border-line lg:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-brand/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
								className: "fixed top-0 right-0 z-50 flex h-full w-[min(20rem,100%)] flex-col bg-surface p-4 shadow-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
											className: "font-display text-lg font-semibold",
											children: "Menu"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
											className: "inline-flex size-11 items-center justify-center rounded-md",
											"aria-label": "Close menu",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
										className: "mt-4 grid gap-1",
										"aria-label": "Mobile",
										children: [
											publicLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: link.to,
												onClick: () => setOpen(false),
												className: "min-h-11 rounded-lg px-3 py-2 text-base hover:bg-canvas",
												children: link.label
											}, link.to)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/privacy",
												onClick: () => setOpen(false),
												className: "min-h-11 rounded-lg px-3 py-2",
												children: "Privacy"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/terms",
												onClick: () => setOpen(false),
												className: "min-h-11 rounded-lg px-3 py-2",
												children: "Terms"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-auto grid gap-2 pt-4",
										children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: homeFor(user.role),
												onClick: () => setOpen(false),
												children: "Open workspace"
											})
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "secondary",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/login",
												onClick: () => setOpen(false),
												children: "Log in"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/register",
												search: {},
												onClick: () => setOpen(false),
												children: "Register"
											})
										})] })
									})
								]
							})] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-16 border-t border-line bg-brand text-brand-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { tone: "light" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xs text-sm text-brand-foreground/80",
							children: "Connecting Research with the Right People."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterColumn, {
							title: "Product",
							links: publicLinks.map((link) => ({ ...link }))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Legal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 grid gap-2 text-sm text-brand-foreground/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-brand-foreground",
								children: "Privacy policy"
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-brand-foreground",
								children: "Terms of service"
							}) })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Contact"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-brand-foreground/80",
							children: "Use the contact form. This demo does not send email."
						})] })
					]
				})
			})
		]
	});
}
function FooterColumn({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm font-semibold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-3 grid gap-2 text-sm text-brand-foreground/80",
		children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: link.to,
			className: "hover:text-brand-foreground",
			children: link.label
		}) }, link.to))
	})] });
}
function homeFor(role) {
	if (role === "researcher") return "/researcher";
	if (role === "participant") return "/participant";
	return "/admin";
}
var researcherNav = [
	{
		to: "/researcher",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/researcher/studies",
		label: "My Studies",
		icon: FolderOpen
	},
	{
		to: "/researcher/create",
		label: "Create Study",
		icon: CirclePlus
	},
	{
		to: "/researcher/recruitment",
		label: "Recruitment Tracking",
		icon: ChartLine
	},
	{
		to: "/researcher/reports",
		label: "Reports and Exports",
		icon: FileDown
	},
	{
		to: "/researcher/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/researcher/settings",
		label: "Settings",
		icon: Settings
	},
	{
		to: "/researcher/help",
		label: "Help and Support",
		icon: LifeBuoy
	}
];
var participantNav = [
	{
		to: "/participant",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/participant/studies",
		label: "Browse Studies",
		icon: ClipboardList
	},
	{
		to: "/participant/applications",
		label: "My Applications",
		icon: FolderOpen
	},
	{
		to: "/participant/history",
		label: "Participation history",
		icon: History
	},
	{
		to: "/participant/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/participant/settings",
		label: "Settings",
		icon: Settings
	}
];
var adminNav = [
	{
		to: "/admin",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/admin/reviews",
		label: "Pending requests",
		icon: ClipboardList
	},
	{
		to: "/admin/users",
		label: "User management",
		icon: Users
	},
	{
		to: "/admin/monitoring",
		label: "Recruitment monitoring",
		icon: ChartLine
	},
	{
		to: "/admin/issues",
		label: "Reported issues",
		icon: TriangleAlert
	},
	{
		to: "/admin/audit",
		label: "Audit history",
		icon: History
	}
];
function DashboardShell({ role, children }) {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	const notices = useDemoStore((state) => state.notices);
	const unread = noticesFor(user, notices).filter((item) => !item.read).length;
	const items = role === "researcher" ? researcherNav : role === "participant" ? participantNav : adminNav;
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [logoutOpen, setLogoutOpen] = (0, import_react.useState)(false);
	const path = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		setMenu(false);
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:grid lg:grid-cols-[auto_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: cn("sticky top-0 hidden h-screen flex-col border-r border-line bg-surface lg:flex", collapsed ? "w-20" : "w-72"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-3 py-4",
							children: [collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMarkOnly, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-10 items-center justify-center rounded-md hover:bg-canvas",
								onClick: () => setCollapsed((value) => !value),
								"aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "grid gap-1 px-2",
							"aria-label": "Workspace",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item,
								collapsed,
								unread
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-auto p-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setLogoutOpen(true),
								className: "flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-canvas",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "Log out"
								}) : "Log out"]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 lg:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-lg border border-line",
								onClick: () => setMenu(true),
								"aria-label": "Open workspace menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
							open: menu,
							onOpenChange: setMenu,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-brand/40 lg:hidden" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
								className: "fixed top-0 left-0 z-50 flex h-full w-[min(20rem,100%)] flex-col bg-surface p-4 lg:hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
											className: "font-display text-lg",
											children: "Workspace"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
											className: "inline-flex size-11 items-center justify-center",
											"aria-label": "Close menu",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
										className: "mt-4 grid gap-1",
										"aria-label": "Workspace mobile",
										children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
											item,
											collapsed: false,
											unread
										}, item.to))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "mt-auto flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm",
										onClick: () => {
											setMenu(false);
											setLogoutOpen(true);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Log out"]
									})
								]
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 lg:px-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-ink-soft",
								children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-ink",
										children: user.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", roleLabel(user.role, server)] }),
									server ? user.origin === "sample" ? " · Sample account" : " · Account on the server" : user.origin === "sample" ? " · Sample account" : " · Created in this browser"
								] }) : server ? "Signed out" : "No demo session"
							}), role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-xs font-semibold text-warn",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
										className: "size-3.5",
										"aria-hidden": true
									}),
									" ",
									server ? "Administrator" : "Admin preview"
								]
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							id: "main",
							className: "mx-auto w-full max-w-6xl px-4 py-6 lg:px-8",
							children
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: logoutOpen,
				onOpenChange: setLogoutOpen,
				title: server ? "Log out of your account?" : "Log out of this demo session?",
				body: server ? "Your session on this device ends. Your account and its records stay where they are." : "This only clears the session in this browser. Sample records stay on this device until you reset them.",
				confirmLabel: "Log out",
				onConfirm: () => {
					setLogoutOpen(false);
					if (server) {
						signOut("/login").catch(() => void 0);
						return;
					}
					useDemoStore.getState().logout();
				}
			})
		]
	});
}
function LogoMarkOnly() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		"aria-label": "ResearchConnect Nigeria home",
		className: "inline-flex p-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "ResearchConnect Nigeria"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "size-8",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "32",
					height: "32",
					rx: "8",
					className: "fill-brand"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "9.5",
					cy: "19",
					r: "3.1",
					className: "fill-canvas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "22.5",
					cy: "19",
					r: "3.1",
					className: "fill-accent"
				})
			]
		})]
	});
}
function NavLink({ item, collapsed, unread }) {
	const Icon = item.icon;
	const showBadge = item.label === "Notifications" && unread > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		activeOptions: { exact: Boolean(item.exact) },
		className: "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-ink-soft hover:bg-canvas hover:text-ink",
		activeProps: { className: "flex min-h-11 items-center gap-3 rounded-lg bg-brand/10 px-3 text-sm font-medium text-brand" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-4 shrink-0",
				"aria-hidden": true
			}),
			collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: item.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: item.label
			}),
			showBadge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-full bg-accent px-2 text-xs font-semibold text-accent-foreground tabular-nums",
				children: unread
			}) : null
		]
	});
}
function roleLabel(role, server = false) {
	if (role === "researcher") return "Researcher";
	if (role === "participant") return "Participant";
	return server ? "Administrator" : "Administrator preview";
}
function RoleGate({ role, children }) {
	const server = useDataMode() === "server";
	const user = useSessionUser();
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateCard, {
		title: server ? "Sign in to use this workspace" : "This workspace needs a demo session",
		body: server ? `Sign in with a ${role} account to use this area.` : `Open a ${role} session to use this area. Registration does not create a secure account.`
	});
	if (user.suspended) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateCard, {
		title: server ? "This account is suspended" : "This demo account is suspended",
		body: server ? "An administrator suspended it. Ask them to restore the account." : "A local admin preview suspended it. Restore it from the admin preview, or reset demo data in a sample session."
	});
	if (user.role !== role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateCard, {
		title: "This area is for a different role",
		body: `You are in a ${roleLabel(user.role, server).toLowerCase()} session. Switch session to open the ${role} workspace. Administrative access cannot be chosen during registration.`
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		role,
		children
	});
}
function GateCard({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-canvas",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoBanner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "main",
			className: "mx-auto max-w-lg px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-8 font-display text-3xl font-semibold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-ink-soft",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Log in"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								search: {},
								children: "Register"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								children: "Home"
							})
						})
					]
				})
			]
		})]
	});
}
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-ink-soft",
				children: description
			}) : null]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
function OriginNote({ origin }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs font-medium text-ink-soft",
		children: origin === "sample" ? "Sample record" : origin === "server" ? "Saved on the server" : "Created in this browser"
	});
}
//#endregion
export { RoleGate as i, OriginNote as n, PageHeader as r, MarketingShell as t };
