import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8 shrink-0", className)} aria-hidden>
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <circle cx="9.5" cy="19" r="3.1" className="fill-canvas" />
      <circle cx="22.5" cy="19" r="3.1" className="fill-accent" />
      <path
        d="M11.2 15.2C13.6 10.4 18.4 10.4 20.8 15.2"
        fill="none"
        className="stroke-accent"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ tone = "default" }: { tone?: "default" | "light" }) {
  const light = tone === "light";
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 rounded-md">
      <Mark />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-base font-semibold tracking-tight",
            light ? "text-brand-foreground" : "text-ink",
          )}
        >
          ResearchConnect
        </span>
        <span className="block text-xs font-semibold tracking-widest text-accent uppercase">
          Nigeria
        </span>
      </span>
    </Link>
  );
}
