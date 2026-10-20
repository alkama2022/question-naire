import { differenceInCalendarDays, format, parseISO, startOfToday } from "date-fns";

export function formatDate(value: string) {
  if (!value) return "—";
  return format(parseISO(value), "d MMM yyyy");
}

export function formatDateTime(value: string) {
  return format(parseISO(value), "d MMM yyyy, HH:mm");
}

export function todayIso() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function daysUntil(value: string) {
  if (!value) return null;
  return differenceInCalendarDays(parseISO(value), startOfToday());
}

export function deadlinePhrase(value: string) {
  const days = daysUntil(value);
  if (days === null) return "No deadline";
  if (days > 1) return `${days} days left`;
  if (days === 1) return "1 day left";
  if (days === 0) return "Due today";
  if (days === -1) return "1 day past deadline";
  return `${Math.abs(days)} days past deadline`;
}

export function roleHome(role: "researcher" | "participant" | "admin") {
  if (role === "researcher") return "/researcher" as const;
  if (role === "participant") return "/participant" as const;
  return "/admin" as const;
}

export function researcherLabel(name: string, institution: string) {
  if (name && institution) return `${name} · ${institution}`;
  return name || institution || "Researcher not named";
}
