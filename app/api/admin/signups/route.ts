import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const dateParam = req.nextUrl.searchParams.get("date");

    const date = dateParam || new Date().toISOString().slice(0, 10);
    const startOfDay = `${date}T00:00:00.000Z`;
    const endOfDay = `${date}T23:59:59.999Z`;

    const [totalRes, workersRes, clientsRes, usersRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay),
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "worker")
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay),
      supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client")
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay),
      supabase
        .from("profiles")
        .select("id, name, email, role, avatar, created_at")
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    return NextResponse.json({
      date,
      total: totalRes.count ?? 0,
      workers: workersRes.count ?? 0,
      clients: clientsRes.count ?? 0,
      users: usersRes.data ?? [],
    });
  } catch (error) {
    console.error("Signups API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch signups" },
      { status: 500 }
    );
  }
}
