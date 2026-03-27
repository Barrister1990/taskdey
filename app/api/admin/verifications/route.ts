import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export interface VerificationRecord {
  id: string;
  userId: string;
  type: "worker" | "client";
  name: string | null;
  email: string;
  avatar: string | null;
  idType: string | null;
  idNumber: string | null;
  idFrontImage: string | null;
  idBackImage: string | null;
  selfieImage: string | null;
  status: string;
  isVerified: boolean;
  submittedAt: string | null;
  verifiedAt: string | null;
  verificationLogs: unknown[];
  createdAt: string;
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const params = req.nextUrl.searchParams;

    const status = params.get("status") || "all";
    const search = params.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(params.get("limit") || "20", 10)));

    // Fetch workers with verification data
    const { data: workers } = await supabase
      .from("workers")
      .select("id, userid, fullName, email, idType, idNumber, idPhotoURL, selfieURL, verificationStatus, verificationstatus, isVerified, verificationSubmittedAt, verifiedAt, verificationLogs, created_at");

    // Fetch client_profiles with verification data
    const { data: clientProfiles } = await supabase
      .from("client_profiles")
      .select("id, verification_status, verification_completed, id_type, id_number, id_front_image, id_back_image, selfie_image, created_at, updated_at");

    // Fetch clients table for additional fields
    const { data: clientsTable } = await supabase
      .from("clients")
      .select("id, userid, fullName, email, idType, idNumber, idPhotoURL, selfieURL, verificationStatus, isVerified, verificationSubmittedAt, verifiedAt, verificationLogs, created_at");

    // Fetch all profiles for joining user info
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, name, email, avatar, role");

    const profileMap = new Map(
      (profiles ?? []).map((p) => [p.id, p])
    );

    const records: VerificationRecord[] = [];

    // Process workers
    for (const w of workers ?? []) {
      const verStatus = (w.verificationStatus ?? w.verificationstatus ?? "unverified").toLowerCase();
      const profile = w.userid ? profileMap.get(w.userid) : null;

      records.push({
        id: w.id,
        userId: w.userid ?? "",
        type: "worker",
        name: profile?.name ?? w.fullName ?? null,
        email: profile?.email ?? w.email ?? "",
        avatar: profile?.avatar ?? null,
        idType: w.idType ?? null,
        idNumber: w.idNumber ?? null,
        idFrontImage: w.idPhotoURL ?? null,
        idBackImage: null,
        selfieImage: w.selfieURL ?? null,
        status: verStatus,
        isVerified: w.isVerified ?? false,
        submittedAt: w.verificationSubmittedAt ?? null,
        verifiedAt: w.verifiedAt ?? null,
        verificationLogs: Array.isArray(w.verificationLogs) ? w.verificationLogs : [],
        createdAt: w.created_at ?? "",
      });
    }

    // Process clients: prefer client_profiles if available, fall back to clients table
    const processedClientUserIds = new Set<string>();

    for (const cp of clientProfiles ?? []) {
      const profile = profileMap.get(cp.id);
      if (!profile) continue;

      const verStatus = (cp.verification_status ?? "unverified").toLowerCase();

      // Find matching clients table entry
      const clientEntry = (clientsTable ?? []).find((c) => c.userid === cp.id);

      processedClientUserIds.add(cp.id);

      records.push({
        id: cp.id,
        userId: cp.id,
        type: "client",
        name: profile.name ?? clientEntry?.fullName ?? null,
        email: profile.email ?? clientEntry?.email ?? "",
        avatar: profile.avatar ?? null,
        idType: cp.id_type ?? clientEntry?.idType ?? null,
        idNumber: cp.id_number ?? clientEntry?.idNumber ?? null,
        idFrontImage: cp.id_front_image ?? clientEntry?.idPhotoURL ?? null,
        idBackImage: cp.id_back_image ?? null,
        selfieImage: cp.selfie_image ?? clientEntry?.selfieURL ?? null,
        status: verStatus,
        isVerified: cp.verification_completed ?? clientEntry?.isVerified ?? false,
        submittedAt: clientEntry?.verificationSubmittedAt ?? null,
        verifiedAt: clientEntry?.verifiedAt ?? null,
        verificationLogs: Array.isArray(clientEntry?.verificationLogs) ? clientEntry.verificationLogs : [],
        createdAt: cp.created_at ?? "",
      });
    }

    // Process clients from clients table that don't have client_profiles entries
    for (const c of clientsTable ?? []) {
      if (!c.userid || processedClientUserIds.has(c.userid)) continue;

      const profile = profileMap.get(c.userid);
      const verStatus = (c.verificationStatus ?? "unverified").toLowerCase();

      records.push({
        id: c.id,
        userId: c.userid,
        type: "client",
        name: profile?.name ?? c.fullName ?? null,
        email: profile?.email ?? c.email ?? "",
        avatar: profile?.avatar ?? null,
        idType: c.idType ?? null,
        idNumber: c.idNumber ?? null,
        idFrontImage: c.idPhotoURL ?? null,
        idBackImage: null,
        selfieImage: c.selfieURL ?? null,
        status: verStatus,
        isVerified: c.isVerified ?? false,
        submittedAt: c.verificationSubmittedAt ?? null,
        verifiedAt: c.verifiedAt ?? null,
        verificationLogs: Array.isArray(c.verificationLogs) ? c.verificationLogs : [],
        createdAt: c.created_at ?? "",
      });
    }

    // Filter by status
    let filtered = records;
    if (status !== "all") {
      filtered = records.filter((r) => r.status === status);
    }

    // Filter by search
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          (r.name?.toLowerCase().includes(q)) ||
          r.email.toLowerCase().includes(q)
      );
    }

    // Sort: pending first, then by createdAt desc
    filtered.sort((a, b) => {
      const statusOrder: Record<string, number> = { pending: 0, unverified: 1, rejected: 2, verified: 3 };
      const sa = statusOrder[a.status] ?? 1;
      const sb = statusOrder[b.status] ?? 1;
      if (sa !== sb) return sa - sb;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paged = filtered.slice(offset, offset + limit);

    // Count by status
    const statusCounts: Record<string, number> = { pending: 0, verified: 0, rejected: 0, unverified: 0 };
    for (const r of records) {
      statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1;
    }

    return NextResponse.json({
      verifications: paged,
      total,
      page,
      totalPages,
      statusCounts,
    });
  } catch (error) {
    console.error("Verifications API error:", error);
    return NextResponse.json({ error: "Failed to fetch verifications" }, { status: 500 });
  }
}
