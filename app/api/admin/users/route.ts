import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const params = req.nextUrl.searchParams;

    const search = params.get("search")?.trim() || "";
    const role = params.get("role") || "all";
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(params.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;

    let query = supabase
      .from("profiles")
      .select("id, name, email, role, avatar, phone, gender, location, description, onboarding_completed, push_token, created_at, updated_at", { count: "exact" });

    if (role === "worker" || role === "client") {
      query = query.eq("role", role);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

    const { data: users, count, error: fetchError } = await query;

    if (fetchError) {
      console.error("Users fetch error:", fetchError);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }

    const total = count ?? 0;

    // Batch-fetch verification status for each user
    const userIds = (users ?? []).map((u) => u.id);

    const [workersRes, clientsRes] = await Promise.all([
      userIds.length > 0
        ? supabase
            .from("workers")
            .select("userid, verificationStatus, verificationstatus, isVerified")
            .in("userid", userIds)
        : Promise.resolve({ data: [] }),
      userIds.length > 0
        ? supabase
            .from("clients")
            .select("userid, verificationStatus, isVerified")
            .in("userid", userIds)
        : Promise.resolve({ data: [] }),
    ]);

    const workerMap = new Map(
      (workersRes.data ?? []).map((w) => [
        w.userid,
        {
          verificationStatus: (w.verificationStatus ?? w.verificationstatus ?? "unverified").toLowerCase(),
          isVerified: w.isVerified ?? false,
        },
      ])
    );

    const clientMap = new Map(
      (clientsRes.data ?? []).map((c) => [
        c.userid,
        {
          verificationStatus: (c.verificationStatus ?? "unverified").toLowerCase(),
          isVerified: c.isVerified ?? false,
        },
      ])
    );

    const enriched = (users ?? []).map((u) => {
      const verification =
        u.role === "worker"
          ? workerMap.get(u.id)
          : u.role === "client"
            ? clientMap.get(u.id)
            : undefined;

      return {
        ...u,
        verificationStatus: verification?.verificationStatus ?? "unverified",
        isVerified: verification?.isVerified ?? false,
      };
    });

    return NextResponse.json({
      users: enriched,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Users API error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
