import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, Field, Input, PasswordInput, RadioCards } from "@/components/ui/field";
import { ConfirmDialog } from "@/components/ui/overlay";
import { authClient, authEnabled, signIn as signInWithProvider } from "@/lib/auth/client";
import { roleHome } from "@/lib/research/format";
import { getSignInMethods, researchService } from "@/lib/research/service";
import { noticesFor, useDemoQuery, useDemoStore, useSessionUser } from "@/lib/research/store";
import { DEMO_PASSWORD } from "@/lib/research/types";
import { useDataMode } from "@/lib/research/use-data-mode";
import {
  contactSchema,
  localPasswordSchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "@/lib/research/validators";
import { issuesToMap } from "@/lib/research/validators";

const samples = [
  ["Ada Okafor", "ada@demo.researchconnect.ng", "Researcher"],
  ["Chinedu Bello", "chinedu@demo.researchconnect.ng", "Participant"],
  ["Ibrahim Musa", "ibrahim@demo.researchconnect.ng", "Researcher"],
  ["Ngozi Eze", "ngozi@demo.researchconnect.ng", "Researcher"],
  ["Fatima Abdullahi", "fatima@demo.researchconnect.ng", "Participant"],
] as const;

/**
 * Sign in.
 *
 * With real sign-in (the production path) this is a real account: the
 * password is checked by the server, the session is a server-held cookie, and
 * the records behind it are shared between devices. In demo mode it stays the
 * browser-only session the demo always had.
 */
export function LoginForm() {
  const mode = useDataMode();
  if (mode === "server") return <AccountLoginForm />;
  return <DemoLoginForm />;
}

function AccountLoginForm() {
  const navigate = useNavigate();
  const methods = getSignInMethods();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function enter() {
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrors(issuesToMap(parsed.error.issues));
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const { error } = await authClient.signIn.email({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (error) {
        toast.error(error.message ?? "That email and password did not match.");
        return;
      }
      await researchService.refresh();
      const viewer = researchService.mode === "server" ? currentRole() : null;
      toast.success("Signed in.");
      void navigate({ to: viewer ? roleHome(viewer) : "/" });
    } catch {
      toast.error("Sign-in could not be completed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6">
      <Card className="grid gap-4 p-5">
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            void enter();
          }}
        >
          <Field label="Email" htmlFor="login-email" error={errors.email}>
            <Input
              id="login-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
          <Field label="Password" htmlFor="login-password" error={errors.password}>
            <PasswordInput
              id="login-password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field>
          <Button type="submit" busy={busy}>
            Log in
          </Button>
        </form>
        <p className="text-sm">
          <Link to="/forgot-password" className="font-medium text-brand underline">
            Forgot password
          </Link>
        </p>
      </Card>
      {methods.providers.length ? (
        <Card className="grid gap-3 p-5">
          <h2 className="font-display text-xl font-semibold">Or continue with</h2>
          <div className="grid gap-2">
            {methods.providers.map((providerId) => (
              <Button
                key={providerId}
                variant="secondary"
                onClick={() => {
                  void signInWithProvider(providerId, { callbackURL: "/" }).catch(() =>
                    toast.error("Sign-in could not be started."),
                  );
                }}
              >
                Continue with {providerLabel(providerId)}
              </Button>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}

/** The role of the person who just signed in, as the server holds it. */
function currentRole(): "researcher" | "participant" | "admin" | null {
  const state = useDemoStore.getState();
  const user = state.users.find((item) => item.id === state.sessionUserId);
  return user ? user.role : null;
}

function providerLabel(providerId: string) {
  if (providerId.includes("google")) return "Google";
  if (providerId.includes("twitter") || providerId.includes("x")) return "X";
  return "another provider";
}

function DemoLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  function enter(nextEmail: string, nextPassword: string) {
    setBusy(true);
    const result = useDemoStore.getState().login(nextEmail, nextPassword);
    setBusy(false);
    if (!result.ok || !result.data) {
      toast.error(result.error);
      return;
    }
    const user = useDemoStore.getState().users.find((item) => item.id === result.data?.userId);
    toast.success(result.message);
    if (user) void navigate({ to: roleHome(user.role) });
  }

  return (
    <div className="grid gap-6">
      <Card className="grid gap-4 p-5">
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const parsed = loginSchema.safeParse({ email, password });
            if (!parsed.success) {
              setErrors(issuesToMap(parsed.error.issues));
              return;
            }
            setErrors({});
            enter(parsed.data.email, parsed.data.password);
          }}
        >
          <Field label="Email" htmlFor="login-email" error={errors.email}>
            <Input
              id="login-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
            />
          </Field>
          <Field label="Password" htmlFor="login-password" error={errors.password}>
            <PasswordInput
              id="login-password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Field>
          <Button type="submit" busy={busy}>
            Log in to demo
          </Button>
        </form>
        <p className="text-sm">
          <Link to="/forgot-password" className="font-medium text-brand underline">
            Forgot password
          </Link>
        </p>
      </Card>
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">Sample sessions</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Password for every sample account: <span className="font-medium text-ink">{DEMO_PASSWORD}</span>.
          These are demonstration records, not real people.
        </p>
        <ul className="mt-4 grid gap-2">
          {samples.map(([name, sampleEmail, role]) => (
            <li key={sampleEmail} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line px-3 py-2">
              <span className="text-sm">
                <span className="font-medium">{name}</span>
                <span className="block text-ink-soft">{role} · {sampleEmail}</span>
              </span>
              <Button size="sm" variant="secondary" busy={busy} onClick={() => enter(sampleEmail, DEMO_PASSWORD)}>
                Use session
              </Button>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-line pt-4">
          <h3 className="font-medium">Administrator preview</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Registration cannot grant admin. This button opens a local preview. Actions change demo
            data in this browser only and are not server authorization.
          </p>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => {
              useDemoStore.getState().openAdminPreview();
              toast.success("Admin preview opened in this browser. It is not a privileged production account.");
              void navigate({ to: "/admin" });
            }}
          >
            Open admin preview
          </Button>
        </div>
      </Card>
    </div>
  );
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
export function RegisterForm({ initialRole }: { initialRole?: "researcher" | "participant" }) {
  const mode = useDataMode();
  const navigate = useNavigate();
  const [role, setRole] = useState<"researcher" | "participant">(initialRole ?? "researcher");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [institution, setInstitution] = useState("");
  const [programme, setProgramme] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function submit() {
    const parsed = registerSchema.safeParse({
      name,
      email,
      password,
      confirm,
      role,
      institution,
      programme,
      acceptTerms,
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
          name: parsed.data.name,
        });
        if (error) {
          toast.error(error.message ?? "That account could not be created.");
          return;
        }
        await researchService.refresh();
        const roleResult = await researchService.setOwnRole(parsed.data.role);
        if (!roleResult.ok) toast.error(roleResult.error);
        await researchService.updateProfile("", {
          name: parsed.data.name,
          institution: parsed.data.institution,
          programme: parsed.data.programme,
        });
        toast.success("Account created.");
        void navigate({ to: "/verify-email" });
        return;
      }

      const result = useDemoStore.getState().register(parsed.data);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      void navigate({ to: "/verify-email" });
    } catch {
      toast.error("The account could not be created. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="grid gap-4 p-5">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <RadioCards
          name="role"
          value={role}
          onValueChange={(value) => setRole(value as "researcher" | "participant")}
          options={[
            {
              value: "researcher",
              title: "Researcher",
              body: "Create study requests, track recruitment, and export demo records.",
            },
            {
              value: "participant",
              title: "Participant",
              body: "Read studies, answer eligibility questions, and consent or decline.",
            },
          ]}
        />
        {errors.role ? <p className="text-sm text-danger">{errors.role}</p> : null}
        <p className="text-sm text-ink-soft">You cannot assign yourself administrative access.</p>
        <Field label="Full name" htmlFor="reg-name" error={errors.name}>
          <Input id="reg-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </Field>
        <Field label="Email" htmlFor="reg-email" error={errors.email}>
          <Input id="reg-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
        </Field>
        <Field label="Institution" htmlFor="reg-institution" error={errors.institution} hint="Optional. For example, your university.">
          <Input id="reg-institution" value={institution} onChange={(event) => setInstitution(event.target.value)} />
        </Field>
        <Field label="Programme" htmlFor="reg-programme" error={errors.programme} hint="Optional. For example, BSc Sociology, final year.">
          <Input id="reg-programme" value={programme} onChange={(event) => setProgramme(event.target.value)} />
        </Field>
        <Field label="Password" htmlFor="reg-password" error={errors.password} hint="Do not reuse a real password. Demo mode stores it in this browser without encryption.">
          <PasswordInput id="reg-password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" />
        </Field>
        <Field label="Confirm password" htmlFor="reg-confirm" error={errors.confirm}>
          <PasswordInput id="reg-confirm" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" />
        </Field>
        <Checkbox
          checked={acceptTerms}
          onCheckedChange={setAcceptTerms}
          label={
            <>
              I agree to the <Link to="/terms" className="underline">terms</Link> and{" "}
              <Link to="/privacy" className="underline">privacy notes</Link>
              {mode === "server" ? " for this service." : " for this demo."}
            </>
          }
        />
        {errors.acceptTerms ? <p className="text-sm text-danger">{errors.acceptTerms}</p> : null}
        <Button type="submit" busy={busy}>
          {mode === "server" ? "Create account" : "Create demo session"}
        </Button>
      </form>
    </Card>
  );
}

/**
 * Reset a password.
 *
 * With real sign-in the server owns the recovery flow and the deployment's
 * mail service sends the link — so the browser asks the server and reports
 * what it says. In demo mode the password only ever changes in this browser.
 */
export function LocalPasswordForm() {
  const mode = useDataMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function submit() {
    const parsed = localPasswordSchema.safeParse({ email, password, confirm });
    if (!parsed.success) {
      setErrors(issuesToMap(parsed.error.issues));
      return;
    }
    setBusy(true);
    try {
      if (mode === "server") {
        const { error } = await authClient.requestPasswordReset({
          email: parsed.data.email,
          redirectTo: "/reset-password",
        });
        if (error) {
          toast.error(error.message ?? "A reset link could not be requested.");
          return;
        }
        toast.success("If that address has an account, a reset link is on its way.");
        return;
      }
      const result = useDemoStore
        .getState()
        .setLocalPassword(parsed.data.email, parsed.data.password);
      if (result.ok) toast.success(result.message);
      else toast.error(result.error);
    } catch {
      toast.error("The password could not be reset. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="grid gap-4 p-5">
      <p className="text-sm text-ink-soft">
        {mode === "server"
          ? "Enter your email and the server sends a reset link. The link opens a page where you choose a new password."
          : "Password reset emails are not available. If the email already has a demo account in this browser, you can set a new local password here. This is not a secure recovery flow."}
      </p>
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <Field label="Email" htmlFor="reset-email" error={errors.email}>
          <Input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        {mode === "server" ? null : (
          <>
            <Field label="New password" htmlFor="reset-password" error={errors.password}>
              <PasswordInput id="reset-password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </Field>
            <Field label="Confirm new password" htmlFor="reset-confirm" error={errors.confirm}>
              <PasswordInput id="reset-confirm" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
            </Field>
          </>
        )}
        <Button type="submit" busy={busy}>
          {mode === "server" ? "Send reset link" : "Update password in this browser"}
        </Button>
      </form>
    </Card>
  );
}

export function VerifyEmailPanel() {
  const mode = useDataMode();
  const user = useSessionUser();
  const [busy, setBusy] = useState(false);
  if (!user) {
    return (
      <Card className="p-5">
        <h1 className="font-display text-2xl font-semibold">Email verification</h1>
        <p className="mt-2 text-sm text-ink-soft">
          {mode === "server" ? "Sign in to see this state." : "Sign in to a demo session to see this state."}
        </p>
        <Button className="mt-4" asChild>
          <Link to="/login">Log in</Link>
        </Button>
      </Card>
    );
  }
  return (
    <Card className="grid gap-3 p-5">
      <h1 className="font-display text-2xl font-semibold">Email verification</h1>
      <p className="text-sm">
        Status:{" "}
        <strong>
          {user.emailVerified
            ? mode === "server"
              ? "Verified"
              : "Marked verified in this browser"
            : "Not verified"}
        </strong>
      </p>
      <p className="text-sm text-ink-soft">
        {mode === "server"
          ? "Verification depends on the mail service this deployment is configured with. Until then, the account works and the address stays unverified."
          : `No verification email was sent. Demo mode cannot prove that ${user.email} belongs to you.`}
      </p>
      {!user.emailVerified && mode !== "server" ? (
        <Button
          variant="secondary"
          busy={busy}
          onClick={() => {
            setBusy(true);
            const result = useDemoStore.getState().markVerifiedInDemo(user.id);
            setBusy(false);
            if (result.ok) toast.success(result.message);
            else toast.error(result.error);
          }}
        >
          Mark as verified (demo only)
        </Button>
      ) : null}
      <Button asChild>
        <Link to={roleHome(user.role)}>Continue to workspace</Link>
      </Button>
    </Card>
  );
}

export function SettingsPanel() {
  const mode = useDataMode();
  const user = useSessionUser();
  const [name, setName] = useState(user?.name ?? "");
  const [institution, setInstitution] = useState(user?.institution ?? "");
  const [programme, setProgramme] = useState(user?.programme ?? "");
  const [notifyEmail, setNotifyEmail] = useState(user?.notifyEmail ?? true);
  const [notifyInApp, setNotifyInApp] = useState(user?.notifyInApp ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetOpen, setResetOpen] = useState(false);
  if (!user) return null;
  const server = mode === "server";
  return (
    <div className="grid gap-4">
      <Card className="grid gap-4 p-5">
        <h2 className="font-display text-xl font-semibold">Profile</h2>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const parsed = profileSchema.safeParse({ name, institution, programme });
            if (!parsed.success) {
              setErrors(issuesToMap(parsed.error.issues));
              return;
            }
            void (async () => {
              const result = server
                ? await researchService.updateProfile(user.id, parsed.data)
                : useDemoStore.getState().updateProfile(user.id, parsed.data);
              if (result.ok) toast.success(result.message);
              else toast.error(result.error);
            })();
          }}
        >
          <Field label="Name" htmlFor="set-name" error={errors.name}>
            <Input id="set-name" value={name} onChange={(event) => setName(event.target.value)} />
          </Field>
          <Field label="Institution" htmlFor="set-inst" error={errors.institution}>
            <Input id="set-inst" value={institution} onChange={(event) => setInstitution(event.target.value)} />
          </Field>
          <Field label="Programme" htmlFor="set-prog" error={errors.programme}>
            <Input id="set-prog" value={programme} onChange={(event) => setProgramme(event.target.value)} />
          </Field>
          <p className="text-sm text-ink-soft">Email stays {user.email}. Role stays {user.role}.</p>
          <Button type="submit">{server ? "Save profile" : "Save profile in this browser"}</Button>
        </form>
      </Card>
      <Card className="grid gap-3 p-5">
        <h2 className="font-display text-xl font-semibold">Notification preferences</h2>
        <Checkbox checked={notifyInApp} onCheckedChange={setNotifyInApp} label="Show notices inside the workspace" />
        <Checkbox
          checked={notifyEmail}
          onCheckedChange={setNotifyEmail}
          label={server ? "Email me" : "Email me (preference only — demo mode does not send email)"}
        />
        <Button
          variant="secondary"
          onClick={() => {
            void (async () => {
              const result = server
                ? await researchService.updatePrefs(user.id, { notifyEmail, notifyInApp })
                : useDemoStore.getState().updatePrefs(user.id, { notifyEmail, notifyInApp });
              if (result.ok) toast.success(result.message);
              else toast.error(result.error);
            })();
          }}
        >
          Save preferences
        </Button>
      </Card>
      {server ? null : (
        <Card className="p-5">
          <h2 className="font-display text-xl font-semibold">Reset demo data</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Restores the original sample studies and signs out. Accounts you created in this browser
            are removed.
          </p>
          <Button className="mt-3" variant="danger" onClick={() => setResetOpen(true)}>
            Reset demo data
          </Button>
        </Card>
      )}
      {server ? null : (
        <ConfirmDialog
          open={resetOpen}
          onOpenChange={setResetOpen}
          title="Reset all demo data?"
          body="Sample records return, your browser-only accounts and edits are removed, and this session ends."
          confirmLabel="Reset"
          destructive
          onConfirm={() => {
            useDemoStore.getState().resetDemo();
            setResetOpen(false);
            toast.success("Demo data restored in this browser.");
          }}
        />
      )}
    </div>
  );
}

export function NotificationsPanel() {
  const mode = useDataMode();
  const user = useSessionUser();
  const notices = useDemoQuery((state) => noticesFor(user, state.notices));
  const server = mode === "server";
  if (!user) return null;
  if (!user.notifyInApp) {
    return <p className="text-sm text-ink-soft">In-app notices are off in your preferences.</p>;
  }
  if (notices.length === 0) {
    return (
      <p className="text-sm text-ink-soft">
        {server ? "No notices yet." : "No notices in this browser yet."}
      </p>
    );
  }
  return (
    <div className="grid gap-3">
      <div>
        <Button
          variant="secondary"
          onClick={() => {
            void (async () => {
              const result = server
                ? await researchService.markAllRead(user.id)
                : (useDemoStore.getState().markAllRead(user.id), { ok: true });
              if (result.ok) toast.success(server ? "Marked read." : "Marked read in this browser.");
            })();
          }}
        >
          Mark all read
        </Button>
      </div>
      {notices.map((notice) => (
        <Card key={notice.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-medium">{notice.title}</h2>
            <span className="text-xs text-ink-soft">{notice.read ? "Read" : "Unread"} · {originLabel(notice.origin)}</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">{notice.body}</p>
          <div className="mt-3 flex gap-2">
            {notice.href.startsWith("/") ? (
              <a href={notice.href} className="text-sm font-medium text-brand underline">
                Open
              </a>
            ) : null}
            {!notice.read ? (
              <button
                type="button"
                className="text-sm underline"
                onClick={() => {
                  void (async () => {
                    if (server) await researchService.markNoticeRead(user.id, notice.id);
                    else useDemoStore.getState().markNoticeRead(user.id, notice.id);
                  })();
                }}
              >
                Mark read
              </button>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
}

/** Where a record was created — the label the screens show next to it. */
function originLabel(origin: string) {
  if (origin === "sample") return "Sample";
  if (origin === "server") return "Saved on the server";
  return "This browser";
}

export function ContactForm() {
  const mode = useDataMode();
  const server = mode === "server";
  const user = useSessionUser();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <Card className="p-5">
        <h2 className="font-display text-xl font-semibold">
          {server ? "Message sent to the team" : "Saved in this browser"}
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          {server
            ? "An administrator can see it under reported issues. No email was sent — the message stays in the workspace."
            : "The message is in the demo inbox. No email was sent. An admin preview can see it under reported issues."}
        </p>
      </Card>
    );
  }
  return (
    <Card className="p-5">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const parsed = contactSchema.safeParse({ name, email, subject, message });
          if (!parsed.success) {
            setErrors(issuesToMap(parsed.error.issues));
            return;
          }
          void (async () => {
            const input = {
              source: "contact" as const,
              name: parsed.data.name,
              email: parsed.data.email,
              subject: parsed.data.subject,
              body: parsed.data.message,
            };
            const result = server
              ? await researchService.addIssue(input)
              : useDemoStore.getState().addIssue(input);
            if (result.ok) setDone(true);
            else toast.error(result.error);
          })();
        }}
      >
        <Field label="Name" htmlFor="contact-name" error={errors.name}>
          <Input id="contact-name" value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
        <Field label="Email" htmlFor="contact-email" error={errors.email}>
          <Input id="contact-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label="Subject" htmlFor="contact-subject" error={errors.subject}>
          <Input id="contact-subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
        </Field>
        <Field label="Message" htmlFor="contact-message" error={errors.message}>
          <textarea
            id="contact-message"
            className="min-h-32 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Field>
        <Button type="submit">{server ? "Send message" : "Save message in this browser"}</Button>
      </form>
    </Card>
  );
}
