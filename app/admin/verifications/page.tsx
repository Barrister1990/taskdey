"use client";

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Loader2,
  Search,
  ShieldCheck,
  UserCheck,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Verification {
  id: string;
  userId: string;
  type: "worker" | "client";
  name: string | null;
  email: string;
  avatar: string | null;
  idType: string | null;
  idNumber: string | null;
  idFrontImage: string | null;
  idBackImage: string | null;
  selfieImage: string | null;
  status: string;
  isVerified: boolean;
  submittedAt: string | null;
  verifiedAt: string | null;
  createdAt: string;
}

type StatusFilter = "all" | "pending" | "verified" | "rejected" | "unverified";

const STATUS_PILLS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
  { value: "unverified", label: "Unverified" },
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

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function VerificationsPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 400);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        status: statusFilter,
      });
      if (debouncedSearch) params.set("search", debouncedSearch);

      const res = await fetch(`/api/admin/verifications?${params}`);
      const data = await res.json();
      setVerifications(data.verifications ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
      setStatusCounts(data.statusCounts ?? {});
    } catch {
      setVerifications([]);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = (s: StatusFilter) => {
    setStatusFilter(s);
    setPage(1);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">
          Verifications
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Review and process user verification requests
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2.5">
        {/* Status pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {STATUS_PILLS.map(({ value, label }) => {
            const count = value === "all" ? total : (statusCounts[value] ?? 0);
            return (
              <button
                key={value}
                onClick={() => handleStatusChange(value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                  statusFilter === value
                    ? "bg-primary text-primary-foreground border-2 border-foreground shadow-hard-sm"
                    : "bg-card text-muted-foreground hover:text-foreground border-2 border-border hover:border-foreground/30"
                }`}
              >
                {label}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    statusFilter === value
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
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
              onClick={() => { setSearch(""); setDebouncedSearch(""); setPage(1); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      )}

      {/* Empty */}
      {!loading && verifications.length === 0 && (
        <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-8 text-center shadow-hard-sm">
          <ShieldCheck className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-semibold text-foreground">No verifications found</p>
          <p className="text-xs text-muted-foreground mt-1">
            {debouncedSearch
              ? "Try a different search term"
              : "No verification requests match the current filter"}
          </p>
        </div>
      )}

      {/* Cards grid */}
      {!loading && verifications.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
            {verifications.map((v) => (
              <VerificationCard key={`${v.type}-${v.id}`} v={v} />
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
                    <span key={`dots-${i}`} className="px-1 text-xs text-muted-foreground">...</span>
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

/* ─── Verification card ─── */
function VerificationCard({ v }: { v: Verification }) {
  const hasDocuments = v.idFrontImage || v.idBackImage || v.selfieImage;

  return (
    <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-hard-sm hover:shadow-hard hover:-translate-y-0.5 transition-all duration-300 ease-bounce">
      {/* User info */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary uppercase">
            {v.name?.charAt(0) || v.email.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] sm:text-xs font-bold text-foreground truncate">
            {v.name || "Unnamed"}
          </p>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground truncate">
            {v.email}
          </p>
        </div>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
            v.type === "worker"
              ? "bg-primary/10 text-primary"
              : "bg-quaternary/10 text-quaternary"
          }`}
        >
          {v.type === "worker" ? (
            <span className="flex items-center gap-1"><Wrench className="w-2.5 h-2.5" /> Worker</span>
          ) : (
            <span className="flex items-center gap-1"><UserCheck className="w-2.5 h-2.5" /> Client</span>
          )}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1.5 mb-3">
        {v.idType && (
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <CreditCard className="w-3 h-3" />
            <span className="font-semibold text-foreground">{v.idType}</span>
            {v.idNumber && <span>#{v.idNumber}</span>}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground">
            Submitted: {formatDate(v.submittedAt || v.createdAt)}
          </span>
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
              STATUS_COLORS[v.status] ?? STATUS_COLORS.unverified
            }`}
          >
            {statusLabel(v.status)}
          </span>
        </div>
      </div>

      {/* Review link */}
      {hasDocuments ? (
        <Link
          href={`/admin/verifications/${v.id}`}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 text-primary text-[10px] sm:text-[11px] font-bold hover:bg-primary hover:text-primary-foreground border-2 border-primary/20 hover:border-foreground transition-all duration-200"
        >
          <Eye className="w-3.5 h-3.5" strokeWidth={2.5} />
          Review Documents
        </Link>
      ) : (
        <p className="text-[9px] text-muted-foreground text-center py-1.5">
          No documents submitted
        </p>
      )}
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
