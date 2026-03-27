"use client";

import {
  Bell,
  CheckCircle,
  Loader2,
  Send,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

type Audience = "all" | "workers" | "clients";

const audienceOptions: { value: Audience; label: string; icon: typeof Users; color: string }[] = [
  { value: "all", label: "All Users", icon: Users, color: "bg-primary" },
  { value: "workers", label: "Workers Only", icon: Wrench, color: "bg-secondary" },
  { value: "clients", label: "Clients Only", icon: UserCheck, color: "bg-quaternary" },
];

interface SendResult {
  success: boolean;
  sent: number;
  totalTokens: number;
  message?: string;
  errors?: string[];
}

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Audience>("all");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<
    { title: string; body: string; audience: string; sent: number; time: string }[]
  >([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSending(true);

    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), audience }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send notification");
        setSending(false);
        return;
      }

      setResult(data);
      setHistory((prev) => [
        {
          title: title.trim(),
          body: body.trim(),
          audience,
          sent: data.sent,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
      setTitle("");
      setBody("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">
          Push Notifications
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Send Expo push notifications to your app users
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
        {/* Compose form */}
        <div className="lg:col-span-3">
          <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-hard">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-foreground shadow-hard-sm">
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="font-heading text-sm sm:text-base font-bold text-foreground">
                Compose Notification
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Audience selector */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-wide mb-2">
                  Audience
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {audienceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const selected = audience === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAudience(opt.value)}
                        className={`flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-200 ${
                          selected
                            ? `${opt.color} text-white border-foreground shadow-hard-sm`
                            : "bg-muted/50 text-muted-foreground border-border hover:border-foreground/30"
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-[10px] sm:text-xs font-bold">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="notif-title"
                  className="block text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-wide mb-1.5"
                >
                  Title *
                </label>
                <input
                  id="notif-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={100}
                  placeholder="e.g. New Feature Available!"
                  className="w-full px-3 sm:px-4 py-2.5 border-2 border-border rounded-xl bg-background text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all"
                />
                <p className="text-[9px] text-muted-foreground mt-1 text-right">
                  {title.length}/100
                </p>
              </div>

              {/* Body */}
              <div>
                <label
                  htmlFor="notif-body"
                  className="block text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-wide mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="notif-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  maxLength={500}
                  rows={4}
                  placeholder="Write your notification message..."
                  className="w-full px-3 sm:px-4 py-2.5 border-2 border-border rounded-xl bg-background text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all resize-none"
                />
                <p className="text-[9px] text-muted-foreground mt-1 text-right">
                  {body.length}/500
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl px-3 py-2.5 text-xs text-destructive font-medium">
                  {error}
                </div>
              )}

              {/* Success */}
              {result && (
                <div className="bg-quaternary/10 border-2 border-quaternary/20 rounded-xl px-3 py-2.5 text-xs text-quaternary font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Sent to {result.sent} of {result.totalTokens} devices
                    {result.message && ` — ${result.message}`}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={sending || !title.trim() || !body.trim()}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-6 rounded-full border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" strokeWidth={2.5} />
                    Send Notification
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview + History sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Live preview */}
          <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
            <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-3">
              Preview
            </h3>
            <div className="bg-muted rounded-xl p-3 border border-border">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image src="/logo.png" alt="Taskdey" width={32} height={32} className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-bold text-foreground truncate">
                      {title || "Notification Title"}
                    </p>
                    <span className="text-[9px] text-muted-foreground flex-shrink-0">
                      now
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                    {body || "Your notification message will appear here..."}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-muted-foreground mt-2 text-center">
              Sending to:{" "}
              <span className="font-bold text-foreground">
                {audienceOptions.find((o) => o.value === audience)?.label}
              </span>
            </p>
          </div>

          {/* Session history */}
          <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-hard-sm">
            <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground mb-3">
              Sent This Session
            </h3>
            {history.length === 0 ? (
              <p className="text-[10px] sm:text-xs text-muted-foreground text-center py-4">
                No notifications sent yet
              </p>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {history.map((item, i) => (
                  <div
                    key={i}
                    className="px-2.5 py-2 rounded-lg bg-muted/40 border border-border/50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] sm:text-[11px] font-bold text-foreground truncate">
                        {item.title}
                      </p>
                      <span className="text-[9px] text-muted-foreground flex-shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[9px] text-muted-foreground truncate mt-0.5">
                      {item.body}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-semibold text-primary">
                        {item.audience}
                      </span>
                      <span className="text-[9px] text-quaternary font-semibold">
                        {item.sent} sent
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
