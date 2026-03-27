"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  Calendar,
  Check,
  Clock,
  CreditCard,
  Eye,
  Heart,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Wrench,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Service {
  name: string;
  price: string | null;
  icon: string | null;
  sort_order: number;
}

interface ScheduleDay {
  day: string;
  enabled: boolean;
  start_time: string | null;
  end_time: string | null;
}

interface WorkerProfile {
  currency: string | null;
  scheduleMode: string | null;
  gallery: string[] | null;
  availableForJobs: boolean;
}

interface Verification {
  id: string;
  userId: string;
  type: "worker" | "client";
  name: string | null;
  email: string;
  avatar: string | null;
  phone: string | null;
  gender: string | null;
  description: string | null;
  location: Record<string, string> | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  dateOfBirth: string | null;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  idType: string | null;
  idNumber: string | null;
  idFrontImage: string | null;
  idBackImage: string | null;
  selfieImage: string | null;
  status: string;
  isVerified: boolean;
  submittedAt: string | null;
  verifiedAt: string | null;
  verificationLogs: { action: string; status: string; timestamp: string; by?: string; note?: string }[];
  createdAt: string;
  profileCreatedAt: string | null;
  services: Service[];
  schedule: ScheduleDay[];
  workerProfile: WorkerProfile | null;
  interests?: string[];
  skills?: string[];
}

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

function formatDateTime(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function locationString(loc: Record<string, string> | null) {
  if (!loc) return null;
  const parts = [loc.city, loc.region, loc.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

function fullAddress(v: Verification) {
  const parts = [v.address, v.city, v.state, v.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : null;
}

export default function VerificationReviewPage() {
  const { id } = useParams<{ id: string }>();

  const [v, setV] = useState<Verification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject" | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResult, setActionResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/verifications/${id}`);
      if (!res.ok) throw new Error("Not found");
      setV(await res.json());
    } catch {
      setError("Verification not found");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async (action: "approve" | "reject") => {
    if (!v) return;
    setActionLoading(true);
    setActionResult(null);
    try {
      const res = await fetch(`/api/admin/verifications/${v.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          type: v.type,
          ...(action === "reject" && rejectNote.trim() ? { note: rejectNote.trim() } : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionResult({ type: "error", msg: data.error || "Failed" });
      } else {
        setActionResult({
          type: "success",
          msg: `User ${action === "approve" ? "verified" : "rejected"} successfully`,
        });
        setConfirmAction(null);
        setRejectNote("");
        fetchData();
      }
    } catch {
      setActionResult({ type: "error", msg: "Network error" });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !v) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/verifications"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Verifications
        </Link>
        <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-6 text-center">
          <p className="text-sm font-semibold text-destructive">
            {error || "Verification not found"}
          </p>
        </div>
      </div>
    );
  }

  const images = [
    { label: "ID Front", url: v.idFrontImage },
    { label: "ID Back", url: v.idBackImage },
    { label: "Selfie", url: v.selfieImage },
  ].filter((img) => img.url);

  const loc = locationString(v.location);
  const addr = fullAddress(v);

  return (
    <div className="space-y-4 sm:space-y-5 max-w-5xl">
      {/* Back link */}
      <Link
        href="/admin/verifications"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Verifications
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-heading text-lg sm:text-xl font-extrabold text-foreground">
            Verification Review
          </h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Review submitted documents and take action
          </p>
        </div>
      </div>

      {/* Action result banner */}
      {actionResult && (
        <div
          className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border-2 ${
            actionResult.type === "success"
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {actionResult.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {actionResult.msg}
          <button onClick={() => setActionResult(null)} className="ml-auto">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* User info card */}
          <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center">
                <span className="text-base sm:text-lg font-bold text-primary uppercase">
                  {v.name?.charAt(0) || v.email.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-foreground truncate">
                  {v.name || "Unnamed"}
                </p>
                <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{v.email}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    v.type === "worker" ? "bg-primary/10 text-primary" : "bg-quaternary/10 text-quaternary"
                  }`}
                >
                  {v.type === "worker" ? <><Wrench className="w-3 h-3" /> Worker</> : <><UserCheck className="w-3 h-3" /> Client</>}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[v.status] ?? STATUS_COLORS.unverified}`}>
                  {statusLabel(v.status)}
                </span>
              </div>
            </div>

            {v.description && (
              <p className="text-[11px] text-muted-foreground italic leading-relaxed mb-3 bg-muted/30 rounded-lg px-3 py-2 border border-border/50">
                &quot;{v.description}&quot;
              </p>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoField label="Phone" value={v.phone} icon={<Phone className="w-3 h-3" />} />
              <InfoField label="Gender" value={v.gender} />
              <InfoField label="Date of Birth" value={v.dateOfBirth} icon={<Calendar className="w-3 h-3" />} />
              <InfoField label="Joined" value={formatDate(v.profileCreatedAt || v.createdAt)} />
              {loc && <InfoField label="Location" value={loc} icon={<MapPin className="w-3 h-3" />} />}
              {addr && <InfoField label="Address" value={addr} icon={<MapPin className="w-3 h-3" />} />}
              {v.emergencyContact && <InfoField label="Emergency Contact" value={v.emergencyContact} />}
              {v.emergencyPhone && <InfoField label="Emergency Phone" value={v.emergencyPhone} icon={<Phone className="w-3 h-3" />} />}
              <InfoField label="ID Type" value={v.idType} icon={<CreditCard className="w-3 h-3" />} />
              <InfoField label="ID Number" value={v.idNumber} />
              <InfoField label="Submitted" value={formatDate(v.submittedAt || v.createdAt)} />
              <InfoField label="Verified At" value={formatDate(v.verifiedAt)} />
            </div>

            {/* Worker availability */}
            {v.type === "worker" && v.workerProfile && (
              <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${v.workerProfile.availableForJobs ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"}`}>
                  <Briefcase className="w-3 h-3" />
                  {v.workerProfile.availableForJobs ? "Available for Jobs" : "Not Available"}
                </span>
                {v.workerProfile.currency && (
                  <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border">
                    Currency: {v.workerProfile.currency}
                  </span>
                )}
                {v.workerProfile.scheduleMode && (
                  <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border">
                    Schedule: {v.workerProfile.scheduleMode}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Services (workers) */}
          {v.type === "worker" && v.services.length > 0 && (
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
                  <Briefcase className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                  Services ({v.services.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {v.services.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-muted/40 border border-border/50">
                    {s.icon && <span className="text-base">{s.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-foreground truncate">{s.name}</p>
                    </div>
                    {s.price && (
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        {v.workerProfile?.currency ?? "GHS"} {s.price}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule (workers) */}
          {v.type === "worker" && v.schedule.length > 0 && (
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-tertiary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
                  <Clock className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                  Schedule
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {v.schedule.map((d, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 border border-border/50">
                    <span className="text-[11px] font-bold text-foreground">{d.day}</span>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {d.start_time} — {d.end_time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests & Skills (clients) */}
          {v.type === "client" && ((v.interests && v.interests.length > 0) || (v.skills && v.skills.length > 0)) && (
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-quaternary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
                  <Heart className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                  Interests & Skills
                </h2>
              </div>
              {v.interests && v.interests.length > 0 && (
                <div className="mb-3">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Interests</p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.interests.map((item, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                        {typeof item === "string" ? item : JSON.stringify(item)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {v.skills && v.skills.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mb-1.5">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.skills.map((item, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full border border-secondary/20">
                        {typeof item === "string" ? item : JSON.stringify(item)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gallery (workers) */}
          {v.type === "worker" && v.workerProfile?.gallery && v.workerProfile.gallery.length > 0 && (
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-quaternary rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground">
                  Gallery ({v.workerProfile.gallery.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {v.workerProfile.gallery.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxImage(url)}
                    className="relative aspect-square rounded-xl border-2 border-border overflow-hidden bg-muted hover:border-primary transition-colors group cursor-pointer"
                  >
                    <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" sizes="25vw" unoptimized />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 flex items-center justify-center transition-colors">
                      <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
            <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-3 sm:mb-4">
              Verification Documents
            </h2>

            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {images.map(({ label, url }) => (
                  <div key={label} className="space-y-1.5">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{label}</p>
                    <button
                      onClick={() => setLightboxImage(url!)}
                      className="block w-full relative aspect-[4/3] rounded-xl border-2 border-border overflow-hidden bg-muted hover:border-primary transition-colors group cursor-pointer"
                    >
                      <Image src={url!} alt={label} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" unoptimized />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 flex items-center justify-center transition-colors">
                        <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShieldCheck className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">No documents submitted yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions card */}
          {v.status !== "verified" && (
            <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
              <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-3">Actions</h2>

              {!confirmAction ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setConfirmAction("approve")}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-bold border-2 border-foreground shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard transition-all duration-300 ease-bounce"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    Approve Verification
                  </button>
                  <button
                    onClick={() => setConfirmAction("reject")}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold border-2 border-foreground shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard transition-all duration-300 ease-bounce"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                    Reject Verification
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <p className="text-[11px] font-semibold text-foreground">
                      {confirmAction === "approve" ? "Approve this user?" : "Reject this user?"}
                    </p>
                  </div>

                  {confirmAction === "reject" && (
                    <div>
                      <label htmlFor="reject-note" className="block text-[10px] font-bold text-foreground uppercase tracking-wide mb-1.5">
                        Reason for rejection *
                      </label>
                      <textarea
                        id="reject-note"
                        value={rejectNote}
                        onChange={(e) => setRejectNote(e.target.value)}
                        rows={3}
                        placeholder="Explain why the verification is being rejected..."
                        className="w-full px-3 py-2 border-2 border-border rounded-xl bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all resize-none"
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(confirmAction)}
                      disabled={actionLoading || (confirmAction === "reject" && !rejectNote.trim())}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white border-2 border-foreground shadow-hard-sm transition-all disabled:opacity-50 ${
                        confirmAction === "approve" ? "bg-emerald-600" : "bg-destructive"
                      }`}
                    >
                      {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Check className="w-3.5 h-3.5" /> Confirm</>}
                    </button>
                    <button
                      onClick={() => { setConfirmAction(null); setRejectNote(""); }}
                      disabled={actionLoading}
                      className="flex-1 py-2 rounded-lg text-xs font-bold text-muted-foreground bg-card border-2 border-border hover:text-foreground transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {v.status === "verified" && v.verifiedAt && (
            <div className="bg-emerald-500/10 border-2 border-emerald-500/20 rounded-xl sm:rounded-2xl p-4 shadow-hard-sm">
              <div className="flex items-center gap-2 mb-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <p className="text-xs font-bold text-emerald-600">Verified</p>
              </div>
              <p className="text-[10px] text-emerald-600/70">Verified on {formatDate(v.verifiedAt)}</p>
            </div>
          )}

          {/* History */}
          <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
            <h2 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-3">History</h2>

            {v.verificationLogs.length > 0 ? (
              <div className="space-y-2">
                {v.verificationLogs.map((log, i) => (
                  <div key={i} className="relative pl-5 pb-3 border-l-2 border-border last:pb-0">
                    <div
                      className={`absolute left-[-5px] top-0.5 w-2 h-2 rounded-full ${
                        log.status === "verified" ? "bg-emerald-500" : log.status === "rejected" ? "bg-destructive" : "bg-amber-500"
                      }`}
                    />
                    <p className="text-[11px] font-bold text-foreground">{statusLabel(log.action)}</p>
                    {log.by && <p className="text-[9px] text-muted-foreground">by {log.by}</p>}
                    {log.note && (
                      <p className="text-[10px] text-muted-foreground mt-1 bg-muted/50 rounded-lg px-2 py-1.5 border border-border/50 italic">
                        &quot;{log.note}&quot;
                      </p>
                    )}
                    <p className="text-[9px] text-muted-foreground mt-0.5">{formatDateTime(log.timestamp)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground text-center py-3">No history yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full">
            <Image src={lightboxImage} alt="Document" fill className="object-contain" sizes="100vw" unoptimized />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value, icon }: { label: string; value: string | null; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p className="text-[11px] font-semibold text-foreground mt-0.5 truncate">{value || "—"}</p>
    </div>
  );
}
