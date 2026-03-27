import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("app_version_policies")
      .select("*")
      .eq("is_active", true)
      .order("platform", { ascending: true });

    if (error) {
      console.error("App version fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
    }

    return NextResponse.json({ policies: data ?? [] });
  } catch (error) {
    console.error("App version API error:", error);
    return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { policies } = (await req.json()) as {
      policies: {
        id?: string;
        platform: "android" | "ios";
        latest_version: string;
        minimum_supported_version: string;
        force_update: boolean;
        store_url: string | null;
      }[];
    };

    if (!Array.isArray(policies) || policies.length === 0) {
      return NextResponse.json({ error: "No policies provided" }, { status: 400 });
    }

    const versionRegex = /^\d+\.\d+\.\d+$/;

    for (const p of policies) {
      if (!["android", "ios"].includes(p.platform)) {
        return NextResponse.json({ error: `Invalid platform: ${p.platform}` }, { status: 400 });
      }
      if (!versionRegex.test(p.latest_version)) {
        return NextResponse.json({ error: `Invalid latest_version for ${p.platform}: ${p.latest_version}` }, { status: 400 });
      }
      if (!versionRegex.test(p.minimum_supported_version)) {
        return NextResponse.json({ error: `Invalid minimum_supported_version for ${p.platform}: ${p.minimum_supported_version}` }, { status: 400 });
      }
    }

    const results = [];

    for (const p of policies) {
      const payload = {
        platform: p.platform,
        latest_version: p.latest_version,
        minimum_supported_version: p.minimum_supported_version,
        force_update: p.force_update,
        store_url: p.store_url || null,
        is_active: true,
        updated_at: new Date().toISOString(),
      };

      if (p.id) {
        const { data, error } = await supabase
          .from("app_version_policies")
          .update(payload)
          .eq("id", p.id)
          .select()
          .single();

        if (error) {
          console.error(`Update error for ${p.platform}:`, error);
          return NextResponse.json({ error: `Failed to update ${p.platform} policy` }, { status: 500 });
        }
        results.push(data);
      } else {
        const { data, error } = await supabase
          .from("app_version_policies")
          .insert(payload)
          .select()
          .single();

        if (error) {
          console.error(`Insert error for ${p.platform}:`, error);
          return NextResponse.json({ error: `Failed to create ${p.platform} policy` }, { status: 500 });
        }
        results.push(data);
      }
    }

    return NextResponse.json({ success: true, policies: results });
  } catch (error) {
    console.error("App version PUT error:", error);
    return NextResponse.json({ error: "Failed to update policies" }, { status: 500 });
  }
}
