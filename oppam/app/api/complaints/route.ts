import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { z } from "zod";

const schema = z.object({
  victim_name: z.string().min(2).max(200),
  victim_age: z.coerce.number().min(1).max(120),
  address: z.string().min(5).max(500),
  contact_phone: z.string().regex(/^\d{10}$/),
  contact_email: z.string().email().max(300),
  district: z.string().min(1).max(100),
  local_body: z.string().min(2).max(200),
  police_station: z.string().min(2).max(200),
  victim_social_link: z.string().url().max(500),
  accused_social_link: z.string().url().max(500),
  description: z.string().max(2000).optional(),
  consent: z.string().optional(),
});

// Simple in-memory rate limiter (IP → timestamps)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < 60 * 60 * 1000);
  if (timestamps.length >= 5) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  try {
    const formData = await req.formData();

    // Extract and validate text fields
    const rawData = Object.fromEntries(
      [...formData.entries()].filter(([, v]) => typeof v === "string")
    );
    const parsed = schema.safeParse(rawData);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }
    const {
      victim_name, victim_age, address, contact_phone, contact_email,
      district, local_body, police_station, victim_social_link,
      accused_social_link, description,
    } = parsed.data;

    // Handle evidence uploads
    const evidenceFiles = formData.getAll("evidence") as File[];
    const evidenceUrls: string[] = [];

    for (const file of evidenceFiles) {
      // Strict MIME and size validation
      if (!["image/jpeg", "image/png", "application/pdf", "video/mp4", "video/webm", "video/quicktime"].includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
      }
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json({ error: "File exceeds 50MB limit" }, { status: 400 });
      }

      const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : file.type.startsWith("video/") ? file.type.split("/")[1] : "jpg";
      const fileName = `evidence/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("evidence")
        .upload(fileName, file, { contentType: file.type, upsert: false });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return NextResponse.json({ error: "Failed to upload evidence" }, { status: 500 });
      }

      evidenceUrls.push(fileName);
    }

    // Insert complaint
    const { error: insertError } = await supabase.from("complaints").insert({
      victim_name,
      victim_age,
      address,
      contact_phone,
      contact_email,
      location_district: district,
      location_local_body: local_body,
      police_station,
      victim_social_link,
      accused_social_link,
      evidence_urls: evidenceUrls,
      description: description || null,
      status: "PENDING",
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Failed to save complaint" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
