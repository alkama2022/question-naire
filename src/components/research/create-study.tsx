import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, ProgressBar } from "@/components/ui/card";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { researchService } from "@/lib/research/service";
import { useSessionUser, toForm, useDemoStore } from "@/lib/research/store";
import { CATEGORIES, METHODS } from "@/lib/research/types";
import type { StudyFormValues } from "@/lib/research/types";
import { emptyStudyForm, validateFullStudy, validateStep } from "@/lib/research/validators";

const STEPS = ["Study", "Eligibility", "Recruitment", "Consent"];

export function CreateStudyForm({ studyId }: { studyId?: string }) {
  const user = useSessionUser();
  const navigate = useNavigate();
  const studies = useDemoStore((state) => state.studies);
  const existing = studies.find((study) => study.id === studyId && study.ownerId === user?.id);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<"draft" | "submit" | null>(null);
  const [values, setValues] = useState<StudyFormValues>(() => {
    if (existing && (existing.status === "draft" || existing.status === "rejected")) {
      return toForm(existing);
    }
    const state = useDemoStore.getState();
    if (!studyId && state.wizard && !state.editingStudyId) return state.wizard;
    const blank = emptyStudyForm();
    if (user?.institution) blank.institution = user.institution;
    return blank;
  });

  useEffect(() => {
    if (!studyId) useDemoStore.getState().saveWizard(values, null);
  }, [values, studyId]);

  function update<K extends keyof StudyFormValues>(key: K, value: StudyFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function goNext() {
    const found = validateStep(step, values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep((current) => Math.min(3, current + 1));
  }

  if (!user || user.role !== "researcher") return null;
  if (studyId && !existing) {
    return <p className="text-sm text-danger">That draft is not in this researcher session.</p>;
  }
  if (existing && existing.status !== "draft" && existing.status !== "rejected") {
    return <p>This study can no longer be edited. Only drafts and rejected requests stay editable.</p>;
  }

  async function saveDraft() {
    setBusy("draft");
    const result = await researchService.upsertDraft(user!.id, values, existing?.id);
    setBusy(null);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    void navigate({ to: "/researcher/studies" });
  }

  async function submit() {
    const found = validateFullStudy(values);
    if (Object.keys(found).length) {
      setErrors(found);
      toast.error("Complete the highlighted fields before submitting.");
      if (found.title || found.purpose || found.description || found.category) setStep(0);
      else if (found.targetPopulation || found.inclusion || found.ageMin || found.ageMax) setStep(1);
      else if (found.targetCount || found.deadline || found.method || found.questionnaireUrl) setStep(2);
      else setStep(3);
      return;
    }
    setBusy("submit");
    const saved = await researchService.upsertDraft(user!.id, values, existing?.id);
    if (!saved.ok || !saved.data) {
      setBusy(null);
      toast.error(saved.error ?? "The draft was not saved.");
      return;
    }
    const submitted = await researchService.submitForReview(user!.id, saved.data.id);
    setBusy(null);
    if (!submitted.ok) {
      toast.error(submitted.error);
      return;
    }
    toast.success(submitted.message);
    void navigate({ to: "/researcher/studies" });
  }

  return (
    <div className="grid gap-5">
      <div>
        <p className="text-sm font-medium text-ink-soft">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>
        <div className="mt-2">
          <ProgressBar value={((step + 1) / STEPS.length) * 100} label="Create study progress" />
        </div>
        <ol className="mt-3 flex flex-wrap gap-2">
          {STEPS.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                className={
                  index === step
                    ? "min-h-10 rounded-full bg-brand px-3 text-sm text-brand-foreground"
                    : "min-h-10 rounded-full border border-line bg-surface px-3 text-sm"
                }
                onClick={() => {
                  if (index < step) setStep(index);
                }}
                disabled={index > step}
              >
                {index + 1}. {label}
              </button>
            </li>
          ))}
        </ol>
      </div>
      {existing?.changeRequest ? (
        <p className="rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-sm">
          Changes requested: {existing.changeRequest}
        </p>
      ) : null}
      {existing?.rejectionReason ? (
        <p className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm">
          Rejected: {existing.rejectionReason}
        </p>
      ) : null}
      <Card className="grid gap-4 p-5">
        {step === 0 ? (
          <>
            <Field label="Study title" htmlFor="title" error={errors.title}>
              <Input id="title" value={values.title} onChange={(event) => update("title", event.target.value)} aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "title-error" : undefined} />
            </Field>
            <Field label="Research purpose" htmlFor="purpose" error={errors.purpose}>
              <Textarea id="purpose" value={values.purpose} onChange={(event) => update("purpose", event.target.value)} />
            </Field>
            <Field label="Brief description" htmlFor="description" error={errors.description} hint="Write it for a student who has never heard of the project.">
              <Textarea id="description" value={values.description} onChange={(event) => update("description", event.target.value)} />
            </Field>
            <Field label="Research category" htmlFor="category" error={errors.category}>
              <Select id="category" value={values.category} onChange={(event) => update("category", event.target.value)}>
                <option value="">Choose a category</option>
                {CATEGORIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Research institution, if applicable" htmlFor="institution" error={errors.institution} hint="Name the department if this is a student project. Do not imply the university has endorsed the platform.">
              <Input id="institution" value={values.institution} onChange={(event) => update("institution", event.target.value)} />
            </Field>
          </>
        ) : null}
        {step === 1 ? (
          <>
            <Field label="Target population" htmlFor="population" error={errors.targetPopulation}>
              <Textarea id="population" value={values.targetPopulation} onChange={(event) => update("targetPopulation", event.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Minimum age" htmlFor="ageMin" error={errors.ageMin} hint="Leave both ages blank if age is not a criterion. Under-16 studies are not listed in this version.">
                <Input id="ageMin" inputMode="numeric" value={values.ageMin} onChange={(event) => update("ageMin", event.target.value)} />
              </Field>
              <Field label="Maximum age" htmlFor="ageMax" error={errors.ageMax}>
                <Input id="ageMax" inputMode="numeric" value={values.ageMax} onChange={(event) => update("ageMax", event.target.value)} />
              </Field>
            </div>
            <Field label="University or location" htmlFor="location" error={errors.location}>
              <Input id="location" value={values.location} onChange={(event) => update("location", event.target.value)} />
            </Field>
            <Field label="Inclusion criteria" htmlFor="inclusion" error={errors.inclusion}>
              <Textarea id="inclusion" value={values.inclusion} onChange={(event) => update("inclusion", event.target.value)} />
            </Field>
            <Field label="Exclusion criteria" htmlFor="exclusion" error={errors.exclusion}>
              <Textarea id="exclusion" value={values.exclusion} onChange={(event) => update("exclusion", event.target.value)} />
            </Field>
            <Field label="Additional eligibility questions" htmlFor="extra" error={errors.extraQuestions}>
              <Textarea id="extra" value={values.extraQuestions} onChange={(event) => update("extraQuestions", event.target.value)} />
            </Field>
          </>
        ) : null}
        {step === 2 ? (
          <>
            <Field label="Desired number of participants" htmlFor="target" error={errors.targetCount}>
              <Input id="target" inputMode="numeric" value={values.targetCount} onChange={(event) => update("targetCount", event.target.value)} />
            </Field>
            <Field label="Recruitment deadline" htmlFor="deadline" error={errors.deadline}>
              <Input id="deadline" type="date" value={values.deadline} onChange={(event) => update("deadline", event.target.value)} />
            </Field>
            <Field label="Preferred recruitment method" htmlFor="method" error={errors.method}>
              <Select id="method" value={values.method} onChange={(event) => update("method", event.target.value)}>
                <option value="">Choose a method</option>
                {METHODS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Estimated completion time (minutes)" htmlFor="minutes" error={errors.completionMinutes}>
              <Input id="minutes" inputMode="numeric" value={values.completionMinutes} onChange={(event) => update("completionMinutes", event.target.value)} />
            </Field>
            <Field label="Questionnaire URL" htmlFor="url" error={errors.questionnaireUrl} hint="Paste a link from the survey tool you already use. This platform does not host the questionnaire.">
              <Input id="url" type="url" value={values.questionnaireUrl} onChange={(event) => update("questionnaireUrl", event.target.value)} placeholder="https://" />
            </Field>
            <Field label="Incentive information" htmlFor="incentive" error={errors.incentive} hint="If nothing is confirmed, say so. Do not promise airtime, money, or marks.">
              <Textarea id="incentive" value={values.incentive} onChange={(event) => update("incentive", event.target.value)} />
            </Field>
          </>
        ) : null}
        {step === 3 ? (
          <>
            <Field label="Participant information statement" htmlFor="statement" error={errors.informationStatement}>
              <Textarea id="statement" value={values.informationStatement} onChange={(event) => update("informationStatement", event.target.value)} />
            </Field>
            <Checkbox
              checked={values.privacyAck}
              onCheckedChange={(checked) => update("privacyAck", checked)}
              label="I will collect only what the study needs, and I will not ask this platform to publish participant contact details."
            />
            {errors.privacyAck ? <p className="text-sm text-danger">{errors.privacyAck}</p> : null}
            <Checkbox
              checked={values.approvalAck}
              onCheckedChange={(checked) => update("approvalAck", checked)}
              label="I confirm I will get any supervisor or institutional approval this project requires before collecting data."
            />
            {errors.approvalAck ? <p className="text-sm text-danger">{errors.approvalAck}</p> : null}
            <div className="rounded-lg bg-canvas p-4 text-sm">
              <h2 className="font-medium">Summary</h2>
              <ul className="mt-2 grid gap-1 text-ink-soft">
                <li>{values.title || "Untitled"}</li>
                <li>{values.category || "No category"} · {values.location || "No location"}</li>
                <li>
                  Target {values.targetCount || "—"} · {values.completionMinutes || "—"} min · deadline {values.deadline || "—"}
                </li>
                <li className="break-all">{values.questionnaireUrl || "No questionnaire link yet"}</li>
              </ul>
              <p className="mt-2">Submitting marks the request pending review. It does not publish it.</p>
            </div>
          </>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {step > 0 ? (
            <Button variant="secondary" onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
          ) : null}
          {step < 3 ? (
            <Button onClick={goNext}>Continue</Button>
          ) : (
            <Button busy={busy === "submit"} onClick={() => void submit()}>
              Submit for review
            </Button>
          )}
          <Button variant="ghost" busy={busy === "draft"} onClick={() => void saveDraft()}>
            Save draft
          </Button>
        </div>
      </Card>
    </div>
  );
}
