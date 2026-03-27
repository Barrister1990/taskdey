"use client";

import { createClient } from "@/lib/supabase/client";
import { Lock, LogIn, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signInWithPassword(
        { email, password }
      );

      if (authError) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      const userId = data.user?.id;
      if (!userId) {
        setError("Authentication failed.");
        setLoading(false);
        return;
      }

      const { data: adminRow, error: adminError } = await supabase
        .from("admin")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (adminError || !adminRow) {
        await supabase.auth.signOut();
        setError("You are not authorized to access the admin dashboard.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <Image
            src="/logo.png"
            alt="Taskdey"
            width={140}
            height={42}
            className="h-10 w-auto mx-auto mb-3"
            priority
          />
          <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground">
            Admin
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Sign in to access the dashboard
          </p>
        </div>

        {/* Form card */}
        <div className="bg-card border-2 border-border rounded-2xl p-5 sm:p-6 shadow-hard">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-destructive font-medium">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-wide mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@taskdey.com"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-border rounded-xl bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-wide mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-border rounded-xl bg-background text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold text-sm py-2.5 px-6 rounded-full border-2 border-foreground shadow-hard transition-all duration-300 ease-bounce hover:-translate-y-0.5 hover:shadow-hard-hover flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" strokeWidth={2.5} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4">
          Only authorized administrators can access this area.
        </p>
      </div>
    </div>
  );
}
