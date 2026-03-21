import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { decrypt } from "@/lib/crypto";

export async function GET(req: NextRequest) {
  // Validate admin token/session first
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  const supabaseAdmin = getAdminClient();

  // Verify user is authentically logged in
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // RBAC: Check if user email matches authorized admin
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) {
    console.error(`Unauthorized access attempt to complaints API by ${user.email}`);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Fetch from the DB with pagination
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabaseAdmin
    .from("complaints")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !data) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  // Decrypt the sensitive data perfectly on the fly for the admin panel
  const decryptedData = data.map((c) => ({
    ...c,
    victim_name: decrypt(c.victim_name),
    address: decrypt(c.address),
    contact_phone: decrypt(c.contact_phone),
    contact_email: decrypt(c.contact_email),
    victim_social_link: decrypt(c.victim_social_link),
    accused_social_link: decrypt(c.accused_social_link),
    description: c.description ? decrypt(c.description) : null,
  }));

  return NextResponse.json({
    complaints: decryptedData,
    total: count || 0,
    hasMore: (count || 0) > offset + limit,
  });
}
