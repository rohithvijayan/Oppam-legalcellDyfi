import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
    try {
        const { files } = await req.json();

        if (!Array.isArray(files) || files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }

        const supabaseAdmin = getAdminClient();
        const results = [];

        for (const file of files) {
            const { name, type } = file;

            // Basic validation
            if (!["image/jpeg", "image/png", "application/pdf", "video/mp4", "video/webm", "video/quicktime"].includes(type)) {
                return NextResponse.json({ error: `Invalid file type: ${type}` }, { status: 400 });
            }

            const ext = type === "application/pdf" ? "pdf" : type === "image/png" ? "png" : type.startsWith("video/") ? type.split("/")[1] : "jpg";
            const fileName = `evidence/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

            const { data, error } = await supabaseAdmin.storage
                .from("evidence")
                .createSignedUploadUrl(fileName);

            if (error) {
                console.error("Error generating signed URL:", error);
                return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
            }

            results.push({
                path: fileName,
                uploadUrl: data.signedUrl,
                token: data.token,
            });
        }

        return NextResponse.json({ files: results });
    } catch (err) {
        console.error("Unexpected error in upload-url route:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
