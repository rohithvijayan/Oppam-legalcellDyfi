import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseClient";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid complaint number" }, { status: 400 });
  }

  // Normalise: uppercase and strip whitespace
  const complaintNumber = id.trim().toUpperCase();

  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("complaints")
    .select("complaint_number, status, admin_notes, created_at, location_district")
    .eq("complaint_number", complaintNumber)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Complaint not found" }, { status: 404 });
  }

  // Return only non-sensitive fields
  return NextResponse.json({
    complaint_number: data.complaint_number,
    status: data.status,
    admin_notes: data.admin_notes,
    created_at: data.created_at,
    location_district: data.location_district,
  });
}
