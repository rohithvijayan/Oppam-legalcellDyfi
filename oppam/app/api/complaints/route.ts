import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";
import { z } from "zod";
import { encrypt } from "@/lib/crypto";
import { sendEmail, getComplaintConfirmationEmail, getAdminNotificationEmail } from "@/lib/email";
import { sanitize } from "@/lib/sanitizer";

const schema = z.object({
  victim_name: z.string().trim().min(2).max(200),
  victim_age: z.coerce.number().min(1).max(120),
  address: z.string().trim().min(5).max(500),
  contact_phone: z.string().trim().regex(/^\d{10}$/),
  contact_email: z.string().trim().email().max(300),
  district: z.string().trim().min(1).max(100),
  local_body: z.string().trim().min(2).max(200),
  police_station: z.string().trim().min(2).max(200),
  victim_social_link: z.string().trim().url().max(500),
  accused_social_link: z.string().trim().url().max(500),
  description: z.string().trim().max(2000).optional(),
  consent: z.string().optional(),
  hp_field: z.string().max(0).optional(), // Honeypot
}).strict();

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

const getClientIp = (req: NextRequest): string => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // The first IP in the list is the original client IP
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "unknown";
};

export async function POST(req: NextRequest) {
  // Origin validation to prevent CSRF / cross-site injection
  const origin = req.headers.get("origin") || req.headers.get("referer");
  const allowedOrigins = ["https://oppam.online", "https://www.oppam.online", "http://localhost:3000"];
  if (origin && !allowedOrigins.some(o => origin.startsWith(o))) {
    console.error("Untrusted origin attempt:", origin);
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const captchaToken = formData.get("captcha_token") as string;

    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha verification required" }, { status: 400 });
    }

    let verifyData;
    try {
      const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY || "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"}&response=${captchaToken}`,
      });
      verifyData = await verifyResponse.json();
    } catch (fetchErr: any) {
      console.error("Captcha service fetch error:", fetchErr);
      return NextResponse.json({ error: "Captcha service error" }, { status: 500 });
    }

    if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
      console.error("reCAPTCHA Verification Failed:", verifyData);
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });
    }

    // Extract and validate text fields
    const rawData = Object.fromEntries(
      [...formData.entries()].filter(([, v]) => typeof v === "string")
    );
    const parsed = schema.safeParse(rawData);
    if (!parsed.success) {
      console.error("Complaint data validation failed:", parsed.error.flatten());
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    // Honeypot check
    if (parsed.data.hp_field) {
      console.warn("Honeypot triggered from IP:", ip);
      return NextResponse.json({ error: "Bot detected" }, { status: 403 });
    }
    const {
      victim_name: raw_name, victim_age, address: raw_address, contact_phone, contact_email,
      district: raw_district, local_body: raw_local_body, police_station: raw_police_station,
      victim_social_link: raw_victim_social_link, accused_social_link: raw_accused_social_link,
      description: raw_description,
    } = parsed.data;

    const victim_name = sanitize(raw_name);
    const address = sanitize(raw_address);
    const district = sanitize(raw_district);
    const local_body = sanitize(raw_local_body);
    const police_station = sanitize(raw_police_station);
    const victim_social_link = sanitize(raw_victim_social_link);
    const accused_social_link = sanitize(raw_accused_social_link);
    const description = raw_description ? sanitize(raw_description) : "";

    // Handle evidence uploads
    const evidenceUrls: string[] = [];

    // 1. Collect pre-uploaded paths (for large files uploaded directly by client)
    const preUploadedPaths = formData.getAll("evidence_paths") as string[];
    evidenceUrls.push(...preUploadedPaths);

    // 2. Handle direct uploads (legacy/small files)
    const evidenceFiles = (formData.getAll("evidence") as unknown as (File | string)[]).filter(f => f instanceof File) as File[];

    const supabaseAdmin = getAdminClient();

    for (const file of evidenceFiles) {
      // Strict MIME and size validation
      if (!["image/jpeg", "image/png", "application/pdf", "video/mp4", "video/webm", "video/quicktime"].includes(file.type)) {
        console.warn(`Invalid file type detected: ${file.type}`);
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
      }
      if (file.size > 50 * 1024 * 1024) {
        console.warn(`File size exceeds limit: ${file.size} bytes`);
        return NextResponse.json({ error: "File exceeds 50MB limit" }, { status: 400 });
      }

      const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : file.type.startsWith("video/") ? file.type.split("/")[1] : "jpg";
      const fileName = `evidence/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("evidence")
        .upload(fileName, file, { contentType: file.type, upsert: false });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return NextResponse.json({ error: "Failed to upload evidence" }, { status: 500 });
      }

      evidenceUrls.push(fileName);
    }

    // Generate a unique human-readable complaint number: OPM-YYYY-NNNNN
    const year = new Date().getFullYear();
    // Count existing complaints this year to generate sequential number
    // Generate a unique random complaint number: OPM-XXXX-XXXX
    const randomBytes = Math.random().toString(36).slice(2, 6).toUpperCase();
    const randomBytes2 = Math.random().toString(36).slice(2, 6).toUpperCase();
    const complaint_number = `OPM-${randomBytes}-${randomBytes2}`;

    // Insert complaint with encrypted fields at rest
    const { error: insertError } = await supabaseAdmin.from("complaints").insert({
      complaint_number,
      victim_name: encrypt(victim_name),
      victim_age, // integers remain as is
      address: encrypt(address),
      contact_phone: encrypt(contact_phone),
      contact_email: encrypt(contact_email),
      location_district: district,
      location_local_body: local_body,
      police_station,
      victim_social_link: encrypt(victim_social_link),
      accused_social_link: encrypt(accused_social_link),
      evidence_urls: evidenceUrls,
      description: description ? encrypt(description) : null,
      status: "PENDING",
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Failed to save complaint" }, { status: 500 });
    }

    console.log(`Complaint ${complaint_number} successfully saved to database.`);

    const emailHtml = getComplaintConfirmationEmail(victim_name, complaint_number);
    const adminEmailHtml = getAdminNotificationEmail(complaint_number, "PENDING", district);

    // Ensure emails are sent before finishing (vital for serverless functions)
    console.log(`Attempting to send confirmation email to: ${contact_email}`);
    const victimEmailStatus = await sendEmail(contact_email, "Complaint Received - Oppam", emailHtml).catch(err => {
      console.error("Victim email transport error:", err);
      return false;
    });
    console.log(`Victim email status: ${victimEmailStatus ? "SUCCESS" : "FAILED"}`);

    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
    if (adminEmail) {
      console.log(`Attempting to send admin alert to: ${adminEmail}`);
      const adminEmailStatus = await sendEmail(adminEmail, `New Complaint Alert: ${complaint_number}`, adminEmailHtml).catch(err => {
        console.error("Admin email transport error:", err);
        return false;
      });
      console.log(`Admin email status: ${adminEmailStatus ? "SUCCESS" : "FAILED"}`);
    }

    return NextResponse.json({ success: true, complaint_number }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
