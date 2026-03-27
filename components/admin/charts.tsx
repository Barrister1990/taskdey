"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = {
  primary: "hsl(243, 75%, 59%)",
  secondary: "hsl(330, 81%, 60%)",
  tertiary: "hsl(43, 96%, 56%)",
  quaternary: "hsl(158, 64%, 52%)",
  muted: "hsl(215, 20%, 65%)",
};

const PIE_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.tertiary,
  COLORS.quaternary,
  COLORS.muted,
];

const STATUS_COLORS: Record<string, string> = {
  verified: COLORS.quaternary,
  pending: COLORS.tertiary,
  unverified: COLORS.muted,
  rejected: COLORS.secondary,
  completed: COLORS.quaternary,
  cancelled: COLORS.secondary,
  "in-progress": COLORS.primary,
};

function formatMonth(month: string) {
  const [, m] = month.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return months[parseInt(m, 10) - 1] || m;
}

interface UserGrowthItem {
  month: string;
  workers: number;
  clients: number;
}

export function UserGrowthChart({ data }: { data: UserGrowthItem[] }) {
  if (!data.length) return <EmptyChart />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          labelFormatter={(v) => formatMonth(v as string)}
          contentStyle={{
            borderRadius: 12,
            border: "2px solid hsl(215, 20%, 90%)",
            fontSize: 12,
          }}
        />
        <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="workers"
          name="Workers"
          stroke={COLORS.primary}
          fill={COLORS.primary}
          fillOpacity={0.15}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="clients"
          name="Clients"
          stroke={COLORS.secondary}
          fill={COLORS.secondary}
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface BookingStatusItem {
  status: string;
  count: number;
}

export function BookingStatusChart({ data }: { data: BookingStatusItem[] }) {
  if (!data.length) return <EmptyChart />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis
          dataKey="status"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "2px solid hsl(215, 20%, 90%)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="count" name="Bookings" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLORS[entry.status] ?? PIE_COLORS[i % PIE_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface VerificationItem {
  status: string;
  count: number;
}

export function VerificationPieChart({ data }: { data: VerificationItem[] }) {
  if (!data.length) return <EmptyChart />;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={85}
          paddingAngle={3}
          dataKey="count"
          nameKey="status"
          strokeWidth={2}
          stroke="hsl(var(--card))"
        >
          {data.map((entry) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLORS[entry.status] ?? COLORS.muted}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "2px solid hsl(215, 20%, 90%)",
            fontSize: 12,
          }}
        />
        <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function EmptyChart() {
  return (
    <div className="flex items-center justify-center h-[240px] text-xs text-muted-foreground">
      No data available yet
    </div>
  );
}
