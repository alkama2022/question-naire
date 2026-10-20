import { z } from "zod";
import { todayIso } from "./format.ts";
import type { StudyFormValues } from "./types.ts";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string().min(1, "Confirm your password"),
    role: z.enum(["researcher", "participant"], {
      error: "Choose researcher or participant. Admin access is not self-assigned.",
    }),
    institution: z.string().trim().max(160, "Keep the institution name shorter"),
    programme: z.string().trim().max(160, "Keep the programme name shorter"),
    acceptTerms: z.boolean().refine((value) => value, "Accept the terms to start a demo session"),
  })
  .refine((value) => value.password === value.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export const localPasswordSchema = z
  .object({
    email: z.email("Enter the email on the demo account"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string().min(1, "Confirm the new password"),
  })
  .refine((value) => value.password === value.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.email("Enter a valid email address"),
  subject: z.string().trim().min(4, "Add a subject"),
  message: z.string().trim().min(20, "Write at least a short message"),
});

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  institution: z.string().trim().max(160, "Keep the institution name shorter"),
  programme: z.string().trim().max(160, "Keep the programme name shorter"),
});

export const studyInfoSchema = z.object({
  title: z.string().trim().min(8, "Give the study a clear title (at least 8 characters)"),
  purpose: z.string().trim().min(20, "Explain the research purpose in a sentence or two"),
  description: z
    .string()
    .trim()
    .min(40, "Add a short description a participant can understand"),
  category: z.string().min(1, "Choose a category"),
  institution: z.string().trim().max(180, "Keep the institution name shorter"),
});

export const eligibilitySchema = z
  .object({
    targetPopulation: z.string().trim().min(8, "Describe who you hope to recruit"),
    ageMin: z.string().trim(),
    ageMax: z.string().trim(),
    location: z.string().trim().max(180, "Keep the location shorter"),
    inclusion: z.string().trim().min(8, "State who can take part"),
    exclusion: z.string().trim().max(800, "Keep exclusion criteria shorter"),
    extraQuestions: z.string().trim().max(800, "Keep extra questions shorter"),
  })
  .superRefine((value, ctx) => {
    if (!value.ageMin && !value.ageMax) return;
    const min = Number(value.ageMin);
    const max = Number(value.ageMax);
    if (!value.ageMin || !value.ageMax || !Number.isInteger(min) || !Number.isInteger(max)) {
      ctx.addIssue({
        code: "custom",
        path: ["ageMin"],
        message: "Enter both a minimum and a maximum age, or leave both blank",
      });
      return;
    }
    if (min < 16 || max > 100 || min > max) {
      ctx.addIssue({
        code: "custom",
        path: ["ageMax"],
        message: "Use an age range from 16 to 100, with the lower age first",
      });
    }
  });

export const recruitmentSchema = z
  .object({
    targetCount: z.coerce
      .number()
      .int("Enter a whole number of participants")
      .min(1, "Ask for at least 1 participant")
      .max(10000, "Keep the target at 10,000 or below for this version"),
    deadline: z.string().min(1, "Choose a recruitment deadline"),
    method: z.string().min(1, "Choose a recruitment method"),
    completionMinutes: z.coerce
      .number()
      .int("Enter whole minutes")
      .min(1, "Estimate at least 1 minute")
      .max(180, "If it takes over 3 hours, say so in the description and keep this at 180 or less"),
    questionnaireUrl: z.url("Enter a full questionnaire link, including https://"),
    incentive: z.string().trim().max(280, "Keep the incentive note shorter"),
  })
  .superRefine((value, ctx) => {
    if (value.deadline < todayIso()) {
      ctx.addIssue({
        code: "custom",
        path: ["deadline"],
        message: "Choose a deadline that is today or later",
      });
    }
  });

export const consentSchema = z.object({
  informationStatement: z
    .string()
    .trim()
    .min(40, "Write what participants will be told before they agree"),
  privacyAck: z
    .boolean()
    .refine((value) => value, "Acknowledge how participant information will be handled"),
  approvalAck: z
    .boolean()
    .refine(
      (value) => value,
      "Confirm you will obtain any approval your institution or supervisor requires",
    ),
});

const STEP_SCHEMAS = [studyInfoSchema, eligibilitySchema, recruitmentSchema, consentSchema];

export function issuesToMap(issues: { path: PropertyKey[]; message: string }[]) {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function validateStep(step: number, values: StudyFormValues) {
  const schema = STEP_SCHEMAS[step];
  if (!schema) return {};
  const parsed = schema.safeParse(values);
  if (parsed.success) return {};
  return issuesToMap(parsed.error.issues);
}

export function validateFullStudy(values: StudyFormValues) {
  return STEP_SCHEMAS.reduce<Record<string, string>>((errors, schema) => {
    const parsed = schema.safeParse(values);
    if (parsed.success) return errors;
    return { ...issuesToMap(parsed.error.issues), ...errors };
  }, {});
}

export function emptyStudyForm(): StudyFormValues {
  return {
    title: "",
    purpose: "",
    description: "",
    category: "",
    institution: "",
    targetPopulation: "",
    ageMin: "",
    ageMax: "",
    location: "",
    inclusion: "",
    exclusion: "",
    extraQuestions: "",
    targetCount: "100",
    deadline: "",
    method: "",
    completionMinutes: "10",
    questionnaireUrl: "",
    incentive: "",
    informationStatement: "",
    privacyAck: false,
    approvalAck: false,
  };
}
