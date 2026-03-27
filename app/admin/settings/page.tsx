"use client";

import {
  AlertTriangle,
  Check,
  ExternalLink,
  Loader2,
  Save,
  Settings,
  Smartphone,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface VersionPolicy {
  id?: string;
  platform: "android" | "ios";
  latest_version: string;
  minimum_supported_version: string;
  force_update: boolean;
  store_url: string | null;
  is_active: boolean;
  updated_at?: string;
}

const EMPTY_POLICY = (platform: "android" | "ios"): VersionPolicy => ({
  platform,
  latest_version: "1.0.0",
  minimum_supported_version: "1.0.0",
  force_update: false,
  store_url: null,
  is_active: true,
});

function formatDate(d: string | null | undefined) {
  if (!d) return "Never";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SettingsPage() {
  const [policies, setPolicies] = useState<VersionPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchPolicies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings/app-version");
      const data = await res.json();
      const fetched: VersionPolicy[] = data.policies ?? [];

      const android = fetched.find((p) => p.platform === "android") ?? EMPTY_POLICY("android");
      const ios = fetched.find((p) => p.platform === "ios") ?? EMPTY_POLICY("ios");
      setPolicies([android, ios]);
    } catch {
      setPolicies([EMPTY_POLICY("android"), EMPTY_POLICY("ios")]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const updatePolicy = (platform: string, field: string, value: string | boolean | null) => {
    setPolicies((prev) =>
      prev.map((p) => (p.platform === platform ? { ...p, [field]: value } : p))
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/settings/app-version", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policies }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ type: "error", msg: data.error || "Failed to save" });
      } else {
        setResult({ type: "success", msg: "App version policies saved successfully" });
        setHasChanges(false);
        if (data.policies) {
          const android = data.policies.find((p: VersionPolicy) => p.platform === "android") ?? EMPTY_POLICY("android");
          const ios = data.policies.find((p: VersionPolicy) => p.platform === "ios") ?? EMPTY_POLICY("ios");
          setPolicies([android, ios]);
        }
      }
    } catch {
      setResult({ type: "error", msg: "Network error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage app version policies and configurations
          </p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold border-2 border-foreground shadow-hard-sm hover:-translate-y-0.5 hover:shadow-hard transition-all duration-300 ease-bounce disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" strokeWidth={2.5} />
            )}
            Save Changes
          </button>
        )}
      </div>

      {/* Result banner */}
      {result && (
        <div
          className={`px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border-2 ${
            result.type === "success"
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {result.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {result.msg}
          <button onClick={() => setResult(null)} className="ml-auto">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* App Version Policies */}
      <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard-sm">
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
            <Settings className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading text-sm sm:text-base font-bold text-foreground">
              App Version Policy
            </h2>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground">
              Control optional and forced update prompts for mobile users
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <PlatformCard
              key={policy.platform}
              policy={policy}
              onChange={(field, value) => updatePolicy(policy.platform, field, value)}
            />
          ))}
        </div>
      </div>

      {/* Sticky save bar for mobile */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-sm border-t-2 border-border p-3 z-30">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold border-2 border-foreground shadow-hard-sm disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" strokeWidth={2.5} />}
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

function PlatformCard({
  policy,
  onChange,
}: {
  policy: VersionPolicy;
  onChange: (field: string, value: string | boolean | null) => void;
}) {
  const isAndroid = policy.platform === "android";

  return (
    <div className="bg-muted/30 border-2 border-border rounded-xl p-4 space-y-3.5">
      {/* Platform header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-foreground shadow-hard-sm ${
              isAndroid ? "bg-tertiary" : "bg-secondary"
            }`}
          >
            <Smartphone className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground capitalize">
              {policy.platform}
            </h3>
            {policy.updated_at && (
              <p className="text-[9px] text-muted-foreground">
                Updated: {formatDate(policy.updated_at)}
              </p>
            )}
          </div>
        </div>

        {/* Force update toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Force</span>
          <button
            type="button"
            onClick={() => onChange("force_update", !policy.force_update)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 border-2 ${
              policy.force_update
                ? "bg-destructive border-destructive"
                : "bg-muted border-border"
            }`}
          >
            <span
              className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200 shadow-sm ${
                policy.force_update ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {policy.force_update && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
          <p className="text-[10px] font-medium text-destructive">
            Users will be forced to update before using the app
          </p>
        </div>
      )}

      {/* Version fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-foreground uppercase tracking-wide mb-1">
            Latest Version
          </label>
          <input
            type="text"
            value={policy.latest_version}
            onChange={(e) => onChange("latest_version", e.target.value)}
            placeholder="1.0.0"
            className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all font-mono"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-foreground uppercase tracking-wide mb-1">
            Min Supported
          </label>
          <input
            type="text"
            value={policy.minimum_supported_version}
            onChange={(e) => onChange("minimum_supported_version", e.target.value)}
            placeholder="1.0.0"
            className="w-full px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all font-mono"
          />
        </div>
      </div>

      {/* Store URL */}
      <div>
        <label className="block text-[10px] font-bold text-foreground uppercase tracking-wide mb-1">
          Store URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={policy.store_url ?? ""}
            onChange={(e) => onChange("store_url", e.target.value || null)}
            placeholder={isAndroid ? "https://play.google.com/store/apps/..." : "https://apps.apple.com/app/..."}
            className="flex-1 px-3 py-2 border-2 border-border rounded-lg bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all truncate"
          />
          {policy.store_url && (
            <a
              href={policy.store_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-muted border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all flex-shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
