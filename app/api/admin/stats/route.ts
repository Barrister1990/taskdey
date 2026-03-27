import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const [
      profilesRes,
      workersFromProfiles,
      clientsFromProfiles,
      bookingsRes,
      completedBookingsCount,
      pendingWorkerVerifications,
      pendingClientVerifications,
      recentUsersRes,
      profileGrowthRes,
      bookingsByStatusRes,
      workerVerStatusRes,
      clientVerStatusRes,
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "worker"),
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client"),
      supabase.from("bookings").select("*", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed"),
      supabase
        .from("workers")
        .select("*", { count: "exact", head: true })
        .or("verificationStatus.eq.pending,verificationstatus.eq.pending"),
      supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .eq("verificationStatus", "pending"),
      supabase
        .from("profiles")
        .select("id, name, email, role, avatar, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("profiles")
        .select("role, created_at")
        .order("created_at", { ascending: true }),
      supabase.from("bookings").select("status"),
      supabase
        .from("workers")
        .select("verificationStatus, verificationstatus, isVerified"),
      supabase
        .from("clients")
        .select("verificationStatus, isVerified"),
    ]);

    const pendingVerifications =
      (pendingWorkerVerifications.count ?? 0) +
      (pendingClientVerifications.count ?? 0);

    // Build monthly growth from profiles (workers vs clients by role)
    const growthMap = new Map<string, { workers: number; clients: number }>();
    for (const p of profileGrowthRes.data ?? []) {
      const month = p.created_at?.slice(0, 7);
      if (!month) continue;
      const entry = growthMap.get(month) ?? { workers: 0, clients: 0 };
      if (p.role === "worker") entry.workers++;
      else if (p.role === "client") entry.clients++;
      growthMap.set(month, entry);
    }
    const userGrowth = Array.from(growthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([month, data]) => ({ month, ...data }));

    // Booking status breakdown
    const bookingStatusMap: Record<string, number> = {};
    for (const b of bookingsByStatusRes.data ?? []) {
      bookingStatusMap[b.status] = (bookingStatusMap[b.status] ?? 0) + 1;
    }
    const bookingsByStatus = Object.entries(bookingStatusMap).map(
      ([status, count]) => ({ status, count })
    );

    // Verification status breakdown (combine workers + clients)
    const verStatusMap: Record<string, number> = {
      verified: 0,
      pending: 0,
      unverified: 0,
      rejected: 0,
    };
    for (const w of workerVerStatusRes.data ?? []) {
      const status = (
        w.verificationStatus ??
        w.verificationstatus ??
        "unverified"
      ).toLowerCase();
      if (status in verStatusMap) verStatusMap[status]++;
      else verStatusMap["unverified"]++;
    }
    for (const c of clientVerStatusRes.data ?? []) {
      const status = (c.verificationStatus ?? "unverified").toLowerCase();
      if (status in verStatusMap) verStatusMap[status]++;
      else verStatusMap["unverified"]++;
    }
    const verificationBreakdown = Object.entries(verStatusMap)
      .filter(([, count]) => count > 0)
      .map(([status, count]) => ({ status, count }));

    return NextResponse.json({
      counts: {
        totalUsers: profilesRes.count ?? 0,
        workers: workersFromProfiles.count ?? 0,
        clients: clientsFromProfiles.count ?? 0,
        bookings: bookingsRes.count ?? 0,
        completedBookings: completedBookingsCount.count ?? 0,
        pendingVerifications,
      },
      userGrowth,
      bookingsByStatus,
      verificationBreakdown,
      recentUsers: recentUsersRes.data ?? [],
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
