import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseClient";
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

  // Fetch from the DB
  const { data, error } = await supabaseAdmin
    .from("complaints")
    .select("*")
    .order("created_at", { ascending: false });

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

  return NextResponse.json(decryptedData);
}
