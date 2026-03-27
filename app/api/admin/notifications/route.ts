import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  sound?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { title, body, audience } = (await req.json()) as {
      title: string;
      body: string;
      audience: "all" | "workers" | "clients";
    };

    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    let query = supabase
      .from("profiles")
      .select("push_token, role")
      .not("push_token", "is", null)
      .neq("push_token", "");

    if (audience === "workers") {
      query = query.eq("role", "worker");
    } else if (audience === "clients") {
      query = query.eq("role", "client");
    }

    const { data: users, error: fetchError } = await query;

    if (fetchError) {
      console.error("Failed to fetch push tokens:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    const tokens = (users ?? [])
      .map((u) => u.push_token)
      .filter(
        (t): t is string =>
          typeof t === "string" && t.startsWith("ExponentPushToken[")
      );

    if (tokens.length === 0) {
      return NextResponse.json({
        success: true,
        sent: 0,
        message: "No valid push tokens found for the selected audience",
      });
    }

    // Expo accepts batches of up to 100
    const chunks: ExpoPushMessage[][] = [];
    for (let i = 0; i < tokens.length; i += 100) {
      chunks.push(
        tokens.slice(i, i + 100).map((to) => ({
          to,
          title: title.trim(),
          body: body.trim(),
          sound: "default",
          data: { type: "admin_broadcast" },
        }))
      );
    }

    let totalSent = 0;
    const errors: string[] = [];

    for (const chunk of chunks) {
      const res = await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chunk),
      });

      if (!res.ok) {
        errors.push(`Expo API returned ${res.status}`);
        continue;
      }

      const result = await res.json();
      totalSent += (result.data ?? []).filter(
        (r: { status: string }) => r.status === "ok"
      ).length;
    }

    return NextResponse.json({
      success: true,
      sent: totalSent,
      totalTokens: tokens.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Push notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
