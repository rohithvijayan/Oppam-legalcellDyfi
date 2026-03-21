import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
    const testEmail = req.nextUrl.searchParams.get("email");

    if (!testEmail) {
        return NextResponse.json({
            error: "Provide an email parameter to test. Example: /api/debug/email?email=your@email.com",
            env: {
                GMAIL_USER: process.env.GMAIL_USER ? "Configured" : "Missing",
                GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? "Configured" : "Missing",
                ADMIN_EMAIL: process.env.ADMIN_EMAIL ? "Configured" : "Missing",
            }
        });
    }

    const success = await sendEmail(testEmail, "Oppam Email Test", "<h1>Test Successful</h1><p>Your email integration is working!</p>");

    if (success) {
        return NextResponse.json({ success: true, message: `Test email sent to ${testEmail}` });
    } else {
        return NextResponse.json({
            success: false,
            message: "Failed to send email. Check Vercel logs for Nodemailer Error Details.",
            hint: "Ensure GMAIL_APP_PASSWORD is a 16-character app password, not your regular Gmail password."
        }, { status: 500 });
    }
}
