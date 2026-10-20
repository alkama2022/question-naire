import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, Field, Input, PasswordInput, RadioCards } from "@/components/ui/field";
import { ConfirmDialog } from "@/components/ui/overlay";
import { roleHome } from "@/lib/research/format";
import { noticesFor, useDemoQuery, useDemoStore, useSessionUser } from "@/lib/research/store";
import { DEMO_PASSWORD } from "@/lib/research/types";
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

export function LoginForm() {
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

export function RegisterForm({ initialRole }: { initialRole?: "researcher" | "participant" }) {
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

  return (
    <Card className="grid gap-4 p-5">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
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
          const result = useDemoStore.getState().register(parsed.data);
          setBusy(false);
          if (!result.ok) {
            toast.error(result.error);
            return;
          }
          toast.success(result.message);
          void navigate({ to: "/verify-email" });
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
              <Link to="/privacy" className="underline">privacy notes</Link> for this demo.
            </>
          }
        />
        {errors.acceptTerms ? <p className="text-sm text-danger">{errors.acceptTerms}</p> : null}
        <Button type="submit" busy={busy}>
          Create demo session
        </Button>
      </form>
    </Card>
  );
}

export function LocalPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  return (
    <Card className="grid gap-4 p-5">
      <p className="text-sm text-ink-soft">
        Password reset emails are not available. If the email already has a demo account in this
        browser, you can set a new local password here. This is not a secure recovery flow.
      </p>
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const parsed = localPasswordSchema.safeParse({ email, password, confirm });
          if (!parsed.success) {
            setErrors(issuesToMap(parsed.error.issues));
            return;
          }
          setBusy(true);
          const result = useDemoStore.getState().setLocalPassword(parsed.data.email, parsed.data.password);
          setBusy(false);
          if (result.ok) toast.success(result.message);
          else toast.error(result.error);
        }}
      >
        <Field label="Email" htmlFor="reset-email" error={errors.email}>
          <Input id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <Field label="New password" htmlFor="reset-password" error={errors.password}>
          <PasswordInput id="reset-password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </Field>
        <Field label="Confirm new password" htmlFor="reset-confirm" error={errors.confirm}>
          <PasswordInput id="reset-confirm" value={confirm} onChange={(event) => setConfirm(event.target.value)} />
        </Field>
        <Button type="submit" busy={busy}>
          Update password in this browser
        </Button>
      </form>
    </Card>
  );
}

export function VerifyEmailPanel() {
  const user = useSessionUser();
  const [busy, setBusy] = useState(false);
  if (!user) {
    return (
      <Card className="p-5">
        <h1 className="font-display text-2xl font-semibold">Email verification</h1>
        <p className="mt-2 text-sm text-ink-soft">Sign in to a demo session to see this state.</p>
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
        <strong>{user.emailVerified ? "Marked verified in this browser" : "Not verified"}</strong>
      </p>
      <p className="text-sm text-ink-soft">
        No verification email was sent. Demo mode cannot prove that {user.email} belongs to you.
      </p>
      {!user.emailVerified ? (
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
  const user = useSessionUser();
  const [name, setName] = useState(user?.name ?? "");
  const [institution, setInstitution] = useState(user?.institution ?? "");
  const [programme, setProgramme] = useState(user?.programme ?? "");
  const [notifyEmail, setNotifyEmail] = useState(user?.notifyEmail ?? true);
  const [notifyInApp, setNotifyInApp] = useState(user?.notifyInApp ?? true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resetOpen, setResetOpen] = useState(false);
  if (!user) return null;
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
            const result = useDemoStore.getState().updateProfile(user.id, parsed.data);
            if (result.ok) toast.success(result.message);
            else toast.error(result.error);
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
          <Button type="submit">Save profile in this browser</Button>
        </form>
      </Card>
      <Card className="grid gap-3 p-5">
        <h2 className="font-display text-xl font-semibold">Notification preferences</h2>
        <Checkbox checked={notifyInApp} onCheckedChange={setNotifyInApp} label="Show notices inside the workspace" />
        <Checkbox
          checked={notifyEmail}
          onCheckedChange={setNotifyEmail}
          label="Email me (preference only — demo mode does not send email)"
        />
        <Button
          variant="secondary"
          onClick={() => {
            const result = useDemoStore.getState().updatePrefs(user.id, { notifyEmail, notifyInApp });
            if (result.ok) toast.success(result.message);
            else toast.error(result.error);
          }}
        >
          Save preferences
        </Button>
      </Card>
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
    </div>
  );
}

export function NotificationsPanel() {
  const user = useSessionUser();
  const notices = useDemoQuery((state) => noticesFor(user, state.notices));
  if (!user) return null;
  if (!user.notifyInApp) {
    return <p className="text-sm text-ink-soft">In-app notices are off in your preferences.</p>;
  }
  if (notices.length === 0) {
    return <p className="text-sm text-ink-soft">No notices in this browser yet.</p>;
  }
  return (
    <div className="grid gap-3">
      <div>
        <Button
          variant="secondary"
          onClick={() => {
            useDemoStore.getState().markAllRead(user.id);
            toast.success("Marked read in this browser.");
          }}
        >
          Mark all read
        </Button>
      </div>
      {notices.map((notice) => (
        <Card key={notice.id} className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-medium">{notice.title}</h2>
            <span className="text-xs text-ink-soft">{notice.read ? "Read" : "Unread"} · {notice.origin === "sample" ? "Sample" : "This browser"}</span>
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
                onClick={() => useDemoStore.getState().markNoticeRead(user.id, notice.id)}
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

export function ContactForm() {
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
        <h2 className="font-display text-xl font-semibold">Saved in this browser</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The message is in the demo inbox. No email was sent. An admin preview can see it under
          reported issues.
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
          const result = useDemoStore.getState().addIssue({
            source: "contact",
            name: parsed.data.name,
            email: parsed.data.email,
            subject: parsed.data.subject,
            body: parsed.data.message,
          });
          if (result.ok) setDone(true);
          else toast.error(result.error);
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
        <Button type="submit">Save message in this browser</Button>
      </form>
    </Card>
  );
}
