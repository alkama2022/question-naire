import { Link, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Bell,
  ClipboardList,
  FileDown,
  FolderOpen,
  LifeBuoy,
  LayoutDashboard,
  Menu,
  PlusCircle,
  Settings,
  Shield,
  Users,
  X,
  LineChart,
  AlertTriangle,
  History,
  LogOut,
  PanelLeft,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/overlay";
import { signOut as signOutOfAccount } from "@/lib/auth/client";
import { noticesFor, useDemoStore, useSessionUser } from "@/lib/research/store";
import type { Origin, Role } from "@/lib/research/types";
import { useDataMode } from "@/lib/research/use-data-mode";
import { cn } from "@/lib/utils";

const publicLinks = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/for-researchers", label: "Researchers" },
  { to: "/for-participants", label: "Participants" },
  { to: "/studies", label: "Browse studies" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * The banner across the top.
 *
 * It says exactly where the records live — this browser (the demo) or the
 * server (the production path) — so nobody is left guessing whether a study
 * request was really saved.
 */
export function DemoBanner() {
  const mode = useDataMode();
  if (mode === "server") {
    return (
      <p className="bg-brand px-4 py-2 text-center text-sm text-brand-foreground">
        <span className="font-semibold">Live workspace.</span> Accounts and study records are stored
        on the server, so they are the same on every device you sign in from.
      </p>
    );
  }
  return (
    <p className="bg-brand px-4 py-2 text-center text-sm text-brand-foreground">
      <span className="font-semibold">Demo mode.</span> Accounts and study records stay in this
      browser. Sign-in is not secure, and nothing is saved on a server.
    </p>
  );
}

export function MarketingShell({ children }: { children: ReactNode }) {
  const user = useSessionUser();
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <DemoBanner />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-brand bg-brand/5" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <Button asChild>
                <Link to={homeFor(user.role)}>Open workspace</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register" search={{}}>Register</Link>
                </Button>
              </>
            )}
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-lg border border-line lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-brand/40" />
              <Dialog.Content className="fixed top-0 right-0 z-50 flex h-full w-[min(20rem,100%)] flex-col bg-surface p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-lg font-semibold">Menu</Dialog.Title>
                  <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-md" aria-label="Close menu">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <nav className="mt-4 grid gap-1" aria-label="Mobile">
                  {publicLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className="min-h-11 rounded-lg px-3 py-2 text-base hover:bg-canvas"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link to="/privacy" onClick={() => setOpen(false)} className="min-h-11 rounded-lg px-3 py-2">
                    Privacy
                  </Link>
                  <Link to="/terms" onClick={() => setOpen(false)} className="min-h-11 rounded-lg px-3 py-2">
                    Terms
                  </Link>
                </nav>
                <div className="mt-auto grid gap-2 pt-4">
                  {user ? (
                    <Button asChild>
                      <Link to={homeFor(user.role)} onClick={() => setOpen(false)}>
                        Open workspace
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant="secondary" asChild>
                        <Link to="/login" onClick={() => setOpen(false)}>
                          Log in
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link to="/register" search={{}} onClick={() => setOpen(false)}>
                          Register
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="mt-16 border-t border-line bg-brand text-brand-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo tone="light" />
            <p className="mt-3 max-w-xs text-sm text-brand-foreground/80">
              Connecting Research with the Right People.
            </p>
          </div>
          <FooterColumn title="Product" links={publicLinks.map((link) => ({ ...link }))} />
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-3 grid gap-2 text-sm text-brand-foreground/80">
              <li>
                <Link to="/privacy" className="hover:text-brand-foreground">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-foreground">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Contact</p>
            <p className="mt-3 text-sm text-brand-foreground/80">
              Use the contact form. This demo does not send email.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ to: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 grid gap-2 text-sm text-brand-foreground/80">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="hover:text-brand-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function homeFor(role: Role) {
  if (role === "researcher") return "/researcher" as const;
  if (role === "participant") return "/participant" as const;
  return "/admin" as const;
}

const researcherNav = [
  { to: "/researcher", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/researcher/studies", label: "My Studies", icon: FolderOpen },
  { to: "/researcher/create", label: "Create Study", icon: PlusCircle },
  { to: "/researcher/recruitment", label: "Recruitment Tracking", icon: LineChart },
  { to: "/researcher/reports", label: "Reports and Exports", icon: FileDown },
  { to: "/researcher/notifications", label: "Notifications", icon: Bell },
  { to: "/researcher/settings", label: "Settings", icon: Settings },
  { to: "/researcher/help", label: "Help and Support", icon: LifeBuoy },
] as const;

const participantNav = [
  { to: "/participant", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/participant/studies", label: "Browse Studies", icon: ClipboardList },
  { to: "/participant/applications", label: "My Applications", icon: FolderOpen },
  { to: "/participant/history", label: "Participation history", icon: History },
  { to: "/participant/notifications", label: "Notifications", icon: Bell },
  { to: "/participant/settings", label: "Settings", icon: Settings },
] as const;

const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/reviews", label: "Pending requests", icon: ClipboardList },
  { to: "/admin/users", label: "User management", icon: Users },
  { to: "/admin/monitoring", label: "Recruitment monitoring", icon: LineChart },
  { to: "/admin/issues", label: "Reported issues", icon: AlertTriangle },
  { to: "/admin/audit", label: "Audit history", icon: History },
] as const;

export function DashboardShell({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const mode = useDataMode();
  const server = mode === "server";
  const user = useSessionUser();
  const notices = useDemoStore((state) => state.notices);
  const unread = noticesFor(user, notices).filter((item) => !item.read).length;
  const items = role === "researcher" ? researcherNav : role === "participant" ? participantNav : adminNav;
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    setMenu(false);
  }, [path]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <DemoBanner />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="lg:grid lg:grid-cols-[auto_1fr]">
        <aside
          className={cn(
            "sticky top-0 hidden h-screen flex-col border-r border-line bg-surface lg:flex",
            collapsed ? "w-20" : "w-72",
          )}
        >
          <div className="flex items-center justify-between px-3 py-4">
            {collapsed ? <LogoMarkOnly /> : <Logo />}
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md hover:bg-canvas"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft className="size-4" />
            </button>
          </div>
          <nav className="grid gap-1 px-2" aria-label="Workspace">
            {items.map((item) => (
              <NavLink key={item.to} item={item} collapsed={collapsed} unread={unread} />
            ))}
          </nav>
          <div className="mt-auto p-3">
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-canvas"
            >
              <LogOut className="size-4" />
              {collapsed ? <span className="sr-only">Log out</span> : "Log out"}
            </button>
          </div>
        </aside>
        <div className="min-w-0">
          <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 lg:hidden">
            <Logo />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line"
              onClick={() => setMenu(true)}
              aria-label="Open workspace menu"
            >
              <Menu className="size-5" />
            </button>
          </header>
          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-brand/40 lg:hidden" />
              <Dialog.Content className="fixed top-0 left-0 z-50 flex h-full w-[min(20rem,100%)] flex-col bg-surface p-4 lg:hidden">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-lg">Workspace</Dialog.Title>
                  <Dialog.Close className="inline-flex size-11 items-center justify-center" aria-label="Close menu">
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <nav className="mt-4 grid gap-1" aria-label="Workspace mobile">
                  {items.map((item) => (
                    <NavLink key={item.to} item={item} collapsed={false} unread={unread} />
                  ))}
                </nav>
                <button
                  type="button"
                  className="mt-auto flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm"
                  onClick={() => {
                    setMenu(false);
                    setLogoutOpen(true);
                  }}
                >
                  <LogOut className="size-4" /> Log out
                </button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 lg:px-8">
            <p className="truncate text-sm text-ink-soft">
              {user ? (
                <>
                  <span className="font-medium text-ink">{user.name}</span>
                  <span> · {roleLabel(user.role, server)}</span>
                  {server
                    ? user.origin === "sample"
                      ? " · Sample account"
                      : " · Account on the server"
                    : user.origin === "sample"
                      ? " · Sample account"
                      : " · Created in this browser"}
                </>
              ) : server ? (
                "Signed out"
              ) : (
                "No demo session"
              )}
            </p>
            {role === "admin" ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-warn">
                <Shield className="size-3.5" aria-hidden /> {server ? "Administrator" : "Admin preview"}
              </span>
            ) : null}
          </div>
          <main id="main" className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
      <ConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        title={server ? "Log out of your account?" : "Log out of this demo session?"}
        body={
          server
            ? "Your session on this device ends. Your account and its records stay where they are."
            : "This only clears the session in this browser. Sample records stay on this device until you reset them."
        }
        confirmLabel="Log out"
        onConfirm={() => {
          setLogoutOpen(false);
          if (server) {
            // The server holds the session — it has to end it, not the browser.
            void signOutOfAccount("/login").catch(() => undefined);
            return;
          }
          useDemoStore.getState().logout();
        }}
      />
    </div>
  );
}

function LogoMarkOnly() {
  return (
    <Link to="/" aria-label="ResearchConnect Nigeria home" className="inline-flex p-1">
      <span className="sr-only">ResearchConnect Nigeria</span>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect width="32" height="32" rx="8" className="fill-brand" />
        <circle cx="9.5" cy="19" r="3.1" className="fill-canvas" />
        <circle cx="22.5" cy="19" r="3.1" className="fill-accent" />
      </svg>
    </Link>
  );
}

function NavLink({
  item,
  collapsed,
  unread,
}: {
  item: { to: string; label: string; icon: typeof Bell; exact?: boolean };
  collapsed: boolean;
  unread: number;
}) {
  const Icon = item.icon;
  const showBadge = item.label === "Notifications" && unread > 0;
  return (
    <Link
      to={item.to}
      activeOptions={{ exact: Boolean(item.exact) }}
      className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
      activeProps={{
        className:
          "flex min-h-11 items-center gap-3 rounded-lg bg-brand/10 px-3 text-sm font-medium text-brand",
      }}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {collapsed ? (
        <span className="sr-only">{item.label}</span>
      ) : (
        <span className="flex-1">{item.label}</span>
      )}
      {showBadge ? (
        <span className="rounded-full bg-accent px-2 text-xs font-semibold text-accent-foreground tabular-nums">
          {unread}
        </span>
      ) : null}
    </Link>
  );
}

function roleLabel(role: Role, server = false) {
  if (role === "researcher") return "Researcher";
  if (role === "participant") return "Participant";
  return server ? "Administrator" : "Administrator preview";
}

export function RoleGate({ role, children }: { role: Role; children: ReactNode }) {
  const mode = useDataMode();
  const server = mode === "server";
  const user = useSessionUser();
  if (!user) {
    return (
      <GateCard
        title={server ? "Sign in to use this workspace" : "This workspace needs a demo session"}
        body={
          server
            ? `Sign in with a ${role} account to use this area.`
            : `Open a ${role} session to use this area. Registration does not create a secure account.`
        }
      />
    );
  }
  if (user.suspended) {
    return (
      <GateCard
        title={server ? "This account is suspended" : "This demo account is suspended"}
        body={
          server
            ? "An administrator suspended it. Ask them to restore the account."
            : "A local admin preview suspended it. Restore it from the admin preview, or reset demo data in a sample session."
        }
      />
    );
  }
  if (user.role !== role) {
    return (
      <GateCard
        title="This area is for a different role"
        body={`You are in a ${roleLabel(user.role, server).toLowerCase()} session. Switch session to open the ${role} workspace. Administrative access cannot be chosen during registration.`}
      />
    );
  }
  return <DashboardShell role={role}>{children}</DashboardShell>;
}

function GateCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-screen bg-canvas">
      <DemoBanner />
      <main id="main" className="mx-auto max-w-lg px-4 py-16">
        <Logo />
        <h1 className="mt-8 font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-ink-soft">{body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/register" search={{}}>Register</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="mt-2 text-ink-soft">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function OriginNote({ origin }: { origin: Origin }) {
  const label =
    origin === "sample"
      ? "Sample record"
      : origin === "server"
        ? "Saved on the server"
        : "Created in this browser";
  return <span className="text-xs font-medium text-ink-soft">{label}</span>;
}
