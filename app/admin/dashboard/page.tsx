"use client";

import {
  BookingStatusChart,
  UserGrowthChart,
  VerificationPieChart,
} from "@/components/admin/charts";
import {
  Activity,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface StatsData {
  counts: {
    totalUsers: number;
    workers: number;
    clients: number;
    bookings: number;
    completedBookings: number;
    pendingVerifications: number;
  };
  userGrowth: { month: string; workers: number; clients: number }[];
  bookingsByStatus: { status: string; count: number }[];
  verificationBreakdown: { status: string; count: number }[];
  recentUsers: {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
    avatar: string | null;
    created_at: string;
  }[];
}

interface DailySignups {
  date: string;
  total: number;
  workers: number;
  clients: number;
  users: {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
    avatar: string | null;
    created_at: string;
  }[];
}

const statCards = [
  { key: "totalUsers", label: "Total Users", icon: Users, color: "bg-primary" },
  { key: "workers", label: "Workers", icon: Wrench, color: "bg-secondary" },
  { key: "clients", label: "Clients", icon: UserCheck, color: "bg-quaternary" },
  { key: "bookings", label: "Bookings", icon: CalendarCheck, color: "bg-tertiary" },
  { key: "completedBookings", label: "Completed", icon: CheckCircle, color: "bg-quaternary" },
  { key: "pendingVerifications", label: "Pending Verif.", icon: ShieldCheck, color: "bg-secondary" },
] as const;

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = today.getTime() - d.getTime();
  const days = Math.round(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function shiftDate(dateStr: string, days: number) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [daily, setDaily] = useState<DailySignups | null>(null);
  const [dailyDate, setDailyDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then(setStats)
      .catch(() => setError("Failed to load dashboard data"))
      .finally(() => setLoading(false));
  }, []);

  const fetchDaily = useCallback((date: string) => {
    fetch(`/api/admin/signups?date=${date}`)
      .then((r) => r.json())
      .then(setDaily)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchDaily(dailyDate);
  }, [dailyDate, fetchDaily]);

  const isToday = dailyDate === new Date().toISOString().slice(0, 10);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-4 text-sm text-destructive">
        {error || "Failed to load data"}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">
          Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Overview of your platform metrics
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-3">
        {statCards.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm hover:shadow-hard hover:-translate-y-0.5 transition-all duration-300 ease-bounce"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 ${color} rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <p className="font-heading text-lg sm:text-xl font-extrabold text-foreground leading-tight">
              {(stats.counts[key as keyof typeof stats.counts] ?? 0).toLocaleString()}
            </p>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Daily signups card */}
      <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-tertiary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <CalendarDays className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                Daily Signups
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                Users enrolled on a specific day
              </p>
            </div>
          </div>

          {/* Date picker */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDailyDate(shiftDate(dailyDate, -1))}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-muted border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <input
              type="date"
              value={dailyDate}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDailyDate(e.target.value)}
              className="bg-muted border-2 border-border rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() =>
                !isToday && setDailyDate(shiftDate(dailyDate, 1))
              }
              disabled={isToday}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-muted border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-muted disabled:hover:text-foreground disabled:hover:border-border"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            {!isToday && (
              <button
                onClick={() =>
                  setDailyDate(new Date().toISOString().slice(0, 10))
                }
                className="text-[10px] sm:text-xs font-bold text-primary hover:underline ml-1"
              >
                Today
              </button>
            )}
          </div>
        </div>

        {daily ? (
          <>
            {/* Summary pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-primary/20">
                <Users className="w-3 h-3" /> {daily.total} total
              </span>
              <span className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-secondary/20">
                <Wrench className="w-3 h-3" /> {daily.workers} workers
              </span>
              <span className="inline-flex items-center gap-1.5 bg-quaternary/10 text-quaternary px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-quaternary/20">
                <UserCheck className="w-3 h-3" /> {daily.clients} clients
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground self-center ml-1">
                {formatDate(daily.date)}
              </span>
            </div>

            {/* User list */}
            {daily.users.length > 0 ? (
              <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                {daily.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-muted/40 hover:bg-muted transition-colors"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-primary uppercase">
                        {user.name?.charAt(0) || user.email.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-[11px] font-semibold text-foreground truncate">
                        {user.name || "Unnamed"}
                      </p>
                      <p className="text-[9px] text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                        user.role === "worker"
                          ? "bg-primary/10 text-primary"
                          : "bg-quaternary/10 text-quaternary"
                      }`}
                    >
                      {user.role || "—"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">
                No signups on {formatDate(daily.date)}
              </p>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <TrendingUp className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                User Growth
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                Monthly registrations (last 12 months)
              </p>
            </div>
          </div>
          <UserGrowthChart data={stats.userGrowth} />
        </div>

        <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 bg-tertiary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <BarChart3 className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                Bookings by Status
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                Distribution across all bookings
              </p>
            </div>
          </div>
          <BookingStatusChart data={stats.bookingsByStatus} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="lg:col-span-2 bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 bg-quaternary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                Verification Status
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                Workers + clients combined
              </p>
            </div>
          </div>
          <VerificationPieChart data={stats.verificationBreakdown} />
        </div>

        <div className="lg:col-span-3 bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-hard-sm">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
              <Activity className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                Recent Signups
              </h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                Latest users to join the platform
              </p>
            </div>
          </div>

          {stats.recentUsers.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-8">
              No users yet
            </p>
          ) : (
            <div className="space-y-1.5 sm:space-y-2 max-h-[280px] overflow-y-auto">
              {stats.recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-muted/40 hover:bg-muted transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] sm:text-xs font-bold text-primary uppercase">
                      {user.name?.charAt(0) || user.email.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-xs font-semibold text-foreground truncate">
                      {user.name || "Unnamed"}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`inline-block text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        user.role === "worker"
                          ? "bg-primary/10 text-primary"
                          : "bg-quaternary/10 text-quaternary"
                      }`}
                    >
                      {user.role || "—"}
                    </span>
                    <p className="text-[9px] text-muted-foreground mt-0.5">
                      {timeAgo(user.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
