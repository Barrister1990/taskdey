import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    // Try workers table first
    const { data: worker } = await supabase
      .from("workers")
      .select("*")
      .eq("id", id)
      .single();

    if (worker) {
      const userId = worker.userid ?? "";

      const [profileRes, servicesRes, scheduleRes, wpRes] = await Promise.all([
        userId
          ? supabase.from("profiles").select("name, email, avatar, phone, gender, location, description, created_at").eq("id", userId).single()
          : Promise.resolve({ data: null }),
        userId
          ? supabase.from("worker_services").select("name, price, icon, sort_order").eq("worker_id", userId).order("sort_order", { ascending: true })
          : Promise.resolve({ data: [] }),
        userId
          ? supabase.from("worker_schedule").select("day, enabled, start_time, end_time, sort_order").eq("worker_id", userId).order("sort_order", { ascending: true })
          : Promise.resolve({ data: [] }),
        userId
          ? supabase.from("worker_profiles").select("currency, schedule_mode, gallery, available_for_jobs").eq("id", userId).single()
          : Promise.resolve({ data: null }),
      ]);

      const profile = profileRes.data;

      return NextResponse.json({
        id: worker.id,
        userId,
        type: "worker",
        name: profile?.name ?? worker.fullName ?? null,
        email: profile?.email ?? worker.email ?? "",
        avatar: profile?.avatar ?? null,
        phone: profile?.phone ?? worker.phone ?? null,
        gender: profile?.gender ?? worker.gender ?? null,
        description: profile?.description ?? null,
        location: profile?.location ?? null,
        address: worker.address ?? null,
        city: worker.city ?? null,
        state: worker.state ?? null,
        country: worker.country ?? null,
        dateOfBirth: worker.dateOfBirth ?? null,
        emergencyContact: worker.emergencyContact ?? null,
        emergencyPhone: worker.emergencyPhone ?? null,
        idType: worker.idType ?? null,
        idNumber: worker.idNumber ?? null,
        idFrontImage: worker.idPhotoURL ?? null,
        idBackImage: null,
        selfieImage: worker.selfieURL ?? null,
        status: (worker.verificationStatus ?? worker.verificationstatus ?? "unverified").toLowerCase(),
        isVerified: worker.isVerified ?? false,
        submittedAt: worker.verificationSubmittedAt ?? null,
        verifiedAt: worker.verifiedAt ?? null,
        verificationLogs: Array.isArray(worker.verificationLogs) ? worker.verificationLogs : [],
        createdAt: worker.created_at ?? "",
        profileCreatedAt: profile?.created_at ?? null,
        services: servicesRes.data ?? [],
        schedule: (scheduleRes.data ?? []).filter((s: { enabled: boolean }) => s.enabled),
        workerProfile: wpRes.data
          ? {
              currency: wpRes.data.currency,
              scheduleMode: wpRes.data.schedule_mode,
              gallery: wpRes.data.gallery,
              availableForJobs: wpRes.data.available_for_jobs,
            }
          : null,
      });
    }

    // Try client_profiles (id = user id)
    const { data: cp } = await supabase
      .from("client_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (cp) {
      const [profileRes, clientEntryRes] = await Promise.all([
        supabase.from("profiles").select("name, email, avatar, phone, gender, location, description, created_at").eq("id", cp.id).single(),
        supabase.from("clients").select("*").eq("userid", cp.id).single(),
      ]);

      const profile = profileRes.data;
      const clientEntry = clientEntryRes.data;

      return NextResponse.json({
        id: cp.id,
        userId: cp.id,
        type: "client",
        name: profile?.name ?? clientEntry?.fullName ?? null,
        email: profile?.email ?? clientEntry?.email ?? "",
        avatar: profile?.avatar ?? null,
        phone: profile?.phone ?? clientEntry?.phone ?? null,
        gender: profile?.gender ?? clientEntry?.gender ?? null,
        description: profile?.description ?? null,
        location: profile?.location ?? null,
        address: clientEntry?.address ?? null,
        city: clientEntry?.city ?? null,
        state: clientEntry?.state ?? null,
        country: clientEntry?.country ?? null,
        dateOfBirth: clientEntry?.dateOfBirth ?? null,
        emergencyContact: clientEntry?.emergencyContact ?? null,
        emergencyPhone: clientEntry?.emergencyPhone ?? null,
        idType: cp.id_type ?? clientEntry?.idType ?? null,
        idNumber: cp.id_number ?? clientEntry?.idNumber ?? null,
        idFrontImage: cp.id_front_image ?? clientEntry?.idPhotoURL ?? null,
        idBackImage: cp.id_back_image ?? null,
        selfieImage: cp.selfie_image ?? clientEntry?.selfieURL ?? null,
        status: (cp.verification_status ?? "unverified").toLowerCase(),
        isVerified: cp.verification_completed ?? clientEntry?.isVerified ?? false,
        submittedAt: clientEntry?.verificationSubmittedAt ?? null,
        verifiedAt: clientEntry?.verifiedAt ?? null,
        verificationLogs: Array.isArray(clientEntry?.verificationLogs) ? clientEntry.verificationLogs : [],
        createdAt: cp.created_at ?? "",
        profileCreatedAt: profile?.created_at ?? null,
        interests: cp.interests ?? [],
        skills: cp.skills ?? [],
        services: [],
        schedule: [],
        workerProfile: null,
      });
    }

    // Try clients table directly
    const { data: client } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (client) {
      const userId = client.userid ?? "";

      const [profileRes, cpRes] = await Promise.all([
        userId
          ? supabase.from("profiles").select("name, email, avatar, phone, gender, location, description, created_at").eq("id", userId).single()
          : Promise.resolve({ data: null }),
        userId
          ? supabase.from("client_profiles").select("interests, skills").eq("id", userId).single()
          : Promise.resolve({ data: null }),
      ]);

      const profile = profileRes.data;

      return NextResponse.json({
        id: client.id,
        userId,
        type: "client",
        name: profile?.name ?? client.fullName ?? null,
        email: profile?.email ?? client.email ?? "",
        avatar: profile?.avatar ?? null,
        phone: profile?.phone ?? client.phone ?? null,
        gender: profile?.gender ?? client.gender ?? null,
        description: profile?.description ?? null,
        location: profile?.location ?? null,
        address: client.address ?? null,
        city: client.city ?? null,
        state: client.state ?? null,
        country: client.country ?? null,
        dateOfBirth: client.dateOfBirth ?? null,
        emergencyContact: client.emergencyContact ?? null,
        emergencyPhone: client.emergencyPhone ?? null,
        idType: client.idType ?? null,
        idNumber: client.idNumber ?? null,
        idFrontImage: client.idPhotoURL ?? null,
        idBackImage: null,
        selfieImage: client.selfieURL ?? null,
        status: (client.verificationStatus ?? "unverified").toLowerCase(),
        isVerified: client.isVerified ?? false,
        submittedAt: client.verificationSubmittedAt ?? null,
        verifiedAt: client.verifiedAt ?? null,
        verificationLogs: Array.isArray(client.verificationLogs) ? client.verificationLogs : [],
        createdAt: client.created_at ?? "",
        profileCreatedAt: profile?.created_at ?? null,
        interests: cpRes.data?.interests ?? [],
        skills: cpRes.data?.skills ?? [],
        services: [],
        schedule: [],
        workerProfile: null,
      });
    }

    return NextResponse.json({ error: "Verification not found" }, { status: 404 });
  } catch (error) {
    console.error("Verification GET error:", error);
    return NextResponse.json({ error: "Failed to fetch verification" }, { status: 500 });
  }
}

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

async function sendPushNotification(token: string, title: string, body: string, data?: Record<string, unknown>) {
  if (!token.startsWith("ExponentPushToken[")) return;
  try {
    await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: token, title, body, sound: "default", data }),
    });
  } catch (err) {
    console.error("Push notification failed:", err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { action, type, note } = (await req.json()) as {
      action: "approve" | "reject";
      type: "worker" | "client";
      note?: string;
    };

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (!["worker", "client"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const newStatus = action === "approve" ? "verified" : "rejected";
    const now = new Date().toISOString();

    const logEntry: Record<string, unknown> = {
      action,
      status: newStatus,
      timestamp: now,
      by: "admin",
    };

    if (action === "reject" && note?.trim()) {
      logEntry.note = note.trim();
    }

    let userId: string | null = null;

    if (type === "worker") {
      const { data: existing } = await supabase
        .from("workers")
        .select("verificationLogs, userid")
        .eq("id", id)
        .single();

      userId = existing?.userid ?? null;

      const logs = Array.isArray(existing?.verificationLogs)
        ? existing.verificationLogs
        : [];
      logs.push(logEntry);

      const { error: updateError } = await supabase
        .from("workers")
        .update({
          verificationStatus: newStatus,
          verificationstatus: newStatus,
          isVerified: action === "approve",
          verifiedAt: action === "approve" ? now.slice(0, 10) : null,
          verificationLogs: logs,
        })
        .eq("id", id);

      if (updateError) {
        console.error("Worker verification update error:", updateError);
        return NextResponse.json({ error: "Failed to update worker verification" }, { status: 500 });
      }

      if (userId) {
        await supabase
          .from("worker_verifications")
          .update({ status: newStatus, updated_at: now })
          .eq("worker_id", userId);
      }
    } else {
      userId = id;

      const { error: cpError } = await supabase
        .from("client_profiles")
        .update({
          verification_status: newStatus,
          verification_completed: action === "approve",
          updated_at: now,
        })
        .eq("id", id);

      if (cpError) {
        console.error("Client profile verification update error:", cpError);
        return NextResponse.json({ error: "Failed to update client verification" }, { status: 500 });
      }

      const { data: clientRow } = await supabase
        .from("clients")
        .select("id, verificationLogs")
        .eq("userid", id)
        .single();

      if (clientRow) {
        const logs = Array.isArray(clientRow.verificationLogs)
          ? clientRow.verificationLogs
          : [];
        logs.push(logEntry);

        await supabase
          .from("clients")
          .update({
            verificationStatus: newStatus,
            isVerified: action === "approve",
            verifiedAt: action === "approve" ? now.slice(0, 10) : null,
            verificationLogs: logs,
          })
          .eq("id", clientRow.id);
      }
    }

    // Send push notification to the user
    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("push_token, name")
        .eq("id", userId)
        .single();

      if (profile?.push_token) {
        const userName = profile.name?.split(" ")[0] || "there";

        if (action === "approve") {
          await sendPushNotification(
            profile.push_token,
            "Verification Approved ✅",
            `Hi ${userName}, your identity verification has been approved! You now have full access to all features.`,
            { type: "verification_approved", status: "verified" }
          );
        } else {
          const reason = note?.trim()
            ? ` Reason: ${note.trim()}`
            : " Please review your documents and try again.";
          await sendPushNotification(
            profile.push_token,
            "Verification Update",
            `Hi ${userName}, your identity verification was not approved.${reason}`,
            { type: "verification_rejected", status: "rejected" }
          );
        }
      }
    }

    return NextResponse.json({ success: true, status: newStatus });
  } catch (error) {
    console.error("Verification PATCH error:", error);
    return NextResponse.json({ error: "Failed to update verification" }, { status: 500 });
  }
}
