import { NextRequest } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/*  In-memory rate limiter (fast first-pass, not persistent across    */
/*  serverless cold starts — use as a supplement, not sole defense)   */
/* ------------------------------------------------------------------ */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  buckets.forEach((entry, key) => {
    if (now > entry.resetAt) buckets.delete(key);
  });
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: true } | { allowed: false; retryAfterSeconds: number } {
  cleanup();
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count++;
  return { allowed: true };
}

/* ------------------------------------------------------------------ */
/*  Database-backed rate limiter (persistent, works across instances) */
/* ------------------------------------------------------------------ */

/**
 * Counts rows in `verification_codes` for the given email within
 * the last `windowMinutes`. Reliable across serverless cold starts.
 */
export async function checkDbRateLimit(
  supabase: SupabaseClient,
  email: string,
  maxCodes: number,
  windowMinutes: number
): Promise<{ allowed: true } | { allowed: false; retryAfterSeconds: number }> {
  const windowStart = new Date(
    Date.now() - windowMinutes * 60 * 1000
  ).toISOString();

  const { count, error } = await supabase
    .from("verification_codes")
    .select("*", { count: "exact", head: true })
    .eq("email", email)
    .gte("created_at", windowStart);

  if (error) {
    console.error("DB rate limit check failed:", error);
    return { allowed: true };
  }

  if ((count ?? 0) >= maxCodes) {
    return { allowed: false, retryAfterSeconds: windowMinutes * 60 };
  }

  return { allowed: true };
}

/**
 * After too many failed confirm attempts, invalidate all pending
 * codes for this email so brute-force is futile.
 */
export async function invalidatePendingCodes(
  supabase: SupabaseClient,
  email: string
): Promise<void> {
  await supabase
    .from("verification_codes")
    .update({ used_at: new Date().toISOString() })
    .eq("email", email)
    .is("used_at", null);
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
