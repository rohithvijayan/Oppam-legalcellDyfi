import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseClient";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Invalid complaint ID" }, { status: 400 });
  }

  // Validate admin token/session
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

  try {
    const body = await req.json();
    const { status, admin_notes } = body;

    const { data, error } = await supabaseAdmin
      .from("complaints")
      .update({ status, admin_notes })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Failed to update complaint" }, { status: 500 });
    }

    return NextResponse.json({ success: true, complaint: data });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
