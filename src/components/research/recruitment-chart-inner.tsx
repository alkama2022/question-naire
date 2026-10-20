import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeekBucket } from "@/lib/research/metrics";

export function RecruitmentChartInner({ data }: { data: WeekBucket[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis dataKey="week" tick={{ fill: "var(--color-ink-soft)", fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: "var(--color-ink-soft)", fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="recruited" name="Recruited" fill="var(--color-brand)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" name="Completed" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="accepted" name="Accepted" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
