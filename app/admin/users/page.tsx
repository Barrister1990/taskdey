"use client";

import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  MapPin,
  Phone,
  Search,
  UserCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  avatar: string | null;
  phone: string | null;
  gender: string | null;
  location: Record<string, string> | null;
  description: string | null;
  onboarding_completed: boolean;
  push_token: string | null;
  created_at: string;
  updated_at: string;
  verificationStatus: string;
  isVerified: boolean;
}

type RoleFilter = "all" | "worker" | "client";

const ROLE_PILLS: { value: RoleFilter; label: string; icon: typeof Users }[] = [
  { value: "all", label: "All", icon: Users },
  { value: "worker", label: "Workers", icon: Wrench },
  { value: "client", label: "Clients", icon: UserCheck },
];

const STATUS_COLORS: Record<string, string> = {
  verified: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  unverified: "bg-muted text-muted-foreground border-border",
  rejected: "bg-destructive/15 text-destructive border-destructive/30",
};

function statusLabel(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatJoined(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function locationString(loc: Record<string, string> | null) {
  if (!loc) return null;
  const parts = [loc.city, loc.region, loc.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState<RoleFilter>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 400);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        role,
      });
      if (debouncedSearch) params.set("search", debouncedSearch);

      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.users ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, role, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = (r: RoleFilter) => {
    setRole(r);
    setPage(1);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">
          Users
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Manage all workers and clients on your platform
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-8 py-2.5 bg-card border-2 border-border rounded-xl text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setDebouncedSearch("");
                setPage(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Role pills */}
        <div className="flex items-center gap-1.5 bg-card border-2 border-border rounded-xl p-1">
          {ROLE_PILLS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleRoleChange(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                role === value
                  ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                  : "text-muted-foreground hover:text-foreground border-2 border-transparent"
              }`}
            >
              <Icon className="w-3 h-3" strokeWidth={2.5} />
              {label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold border border-primary/20 self-center sm:self-auto">
          <Users className="w-3 h-3" />
          {total.toLocaleString()}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      )}

      {/* Empty state */}
      {!loading && users.length === 0 && (
        <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-8 text-center shadow-hard-sm">
          <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">No users found</p>
          <p className="text-xs text-muted-foreground mt-1">
            {debouncedSearch
              ? "Try a different search term"
              : "No users match the current filter"}
          </p>
        </div>
      )}

      {/* Table (desktop) */}
      {!loading && users.length > 0 && (
        <>
          <div className="hidden md:block bg-card border-2 border-border rounded-xl sm:rounded-2xl shadow-hard-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    expanded={expandedId === user.id}
                    onToggle={() =>
                      setExpandedId(expandedId === user.id ? null : user.id)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="md:hidden space-y-2.5">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                expanded={expandedId === user.id}
                onToggle={() =>
                  setExpandedId(expandedId === user.id ? null : user.id)
                }
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-1">
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="w-8 h-8 rounded-lg bg-card border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {generatePageNumbers(page, totalPages).map((p, i) =>
                  p === "..." ? (
                    <span key={`dots-${i}`} className="px-1 text-xs text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        page === p
                          ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                          : "bg-card border-2 border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="w-8 h-8 rounded-lg bg-card border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all disabled:opacity-40 disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── Desktop table row ─── */
function UserRow({
  user,
  expanded,
  onToggle,
}: {
  user: User;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/30 ${
          expanded ? "bg-muted/40" : ""
        }`}
      >
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-primary uppercase">
                {user.name?.charAt(0) || user.email.charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">
                {user.name || "Unnamed"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
              user.role === "worker"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-quaternary/10 text-quaternary border border-quaternary/20"
            }`}
          >
            {user.role || "—"}
          </span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              STATUS_COLORS[user.verificationStatus] ?? STATUS_COLORS.unverified
            }`}
          >
            {statusLabel(user.verificationStatus)}
          </span>
        </td>
        <td className="px-4 py-3 text-[11px] text-muted-foreground">
          {user.phone || "—"}
        </td>
        <td className="px-4 py-3 text-[11px] text-muted-foreground">
          {formatJoined(user.created_at)}
        </td>
      </tr>

      {/* Expanded detail row */}
      {expanded && (
        <tr>
          <td colSpan={5} className="px-4 py-4 bg-muted/20 border-b-2 border-border">
            <UserDetail user={user} />
          </td>
        </tr>
      )}
    </>
  );
}

/* ─── Mobile card ─── */
function UserCard({
  user,
  expanded,
  onToggle,
}: {
  user: User;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-card border-2 border-border rounded-xl shadow-hard-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-3 py-2.5 flex items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-primary uppercase">
            {user.name?.charAt(0) || user.email.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-foreground truncate">
            {user.name || "Unnamed"}
          </p>
          <p className="text-[9px] text-muted-foreground truncate">{user.email}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
              user.role === "worker"
                ? "bg-primary/10 text-primary"
                : "bg-quaternary/10 text-quaternary"
            }`}
          >
            {user.role || "—"}
          </span>
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
              STATUS_COLORS[user.verificationStatus] ?? STATUS_COLORS.unverified
            }`}
          >
            {statusLabel(user.verificationStatus)}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-border/50">
          <UserDetail user={user} />
        </div>
      )}
    </div>
  );
}

/* ─── Shared detail panel ─── */
function UserDetail({ user }: { user: User }) {
  const loc = locationString(user.location);
  const fields = [
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone, icon: Phone },
    { label: "Gender", value: user.gender },
    { label: "Location", value: loc, icon: MapPin },
    { label: "Onboarding", value: user.onboarding_completed ? "Completed" : "Incomplete" },
    { label: "Push Token", value: user.push_token ? "Registered" : "Not set" },
    { label: "Joined", value: formatJoined(user.created_at) },
    { label: "Updated", value: formatJoined(user.updated_at) },
  ];

  return (
    <div className="space-y-3">
      {user.description && (
        <p className="text-[11px] text-muted-foreground italic leading-relaxed">
          &quot;{user.description}&quot;
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            <p className="text-[11px] font-medium text-foreground mt-0.5 truncate">
              {value || "—"}
            </p>
          </div>
        ))}
      </div>
      <Link
        href={`/admin/verifications?search=${encodeURIComponent(user.email)}`}
        className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-primary hover:underline"
      >
        <ExternalLink className="w-3 h-3" />
        View verification documents
      </Link>
    </div>
  );
}

/* ─── Pagination helper ─── */
function generatePageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
