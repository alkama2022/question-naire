import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">{body}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ErrorNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3" role="alert">
      <p className="font-medium text-danger">{title}</p>
      <p className="mt-1 text-sm text-ink">{body}</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-line/80", className)} />;
}

export function Pagination({
  page,
  pages,
  onPage,
}: {
  page: number;
  pages: number;
  onPage: (page: number) => void;
}) {
  if (pages <= 1) return null;
  return (
    <nav className="flex items-center justify-between gap-3" aria-label="Pagination">
      <button
        type="button"
        className="min-h-11 rounded-lg border border-line bg-surface px-3 text-sm disabled:opacity-40"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <p className="text-sm tabular-nums text-ink-soft">
        Page {page} of {pages}
      </p>
      <button
        type="button"
        className="min-h-11 rounded-lg border border-line bg-surface px-3 text-sm disabled:opacity-40"
        onClick={() => onPage(page + 1)}
        disabled={page >= pages}
      >
        Next
      </button>
    </nav>
  );
}
