import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Gmail environment variables missing. Skipping email send.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Oppam Legal Support" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully to:", to);
    return true;
  } catch (error: any) {
    console.error("Nodemailer Error Details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack
    });
    return false;
  }
};

export const getComplaintConfirmationEmail = (victimName: string, complaintNumber: string) => {
  return `
    <div style="font-family: 'Noto Sans Malayalam', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #cf0000;">പരാതി വിജയകരമായി സമർപ്പിച്ചു</h2>
      <p>പ്രിയ <strong>${victimName}</strong>,</p>
      <p>നിങ്ങളുടെ പരാതി 'ഒപ്പം സൈബർ നീതി' സിസ്റ്റത്തിൽ തികച്ചും സുരക്ഷിതമായി രേഖപ്പെടുത്തിയിട്ടുണ്ട്.</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">നിങ്ങളുടെ ട്രാക്കിംഗ് നമ്പർ</p>
        <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${complaintNumber}</p>
      </div>
      <p>നിങ്ങളുടെ പരാതിയുടെ നിലവിലുള്ള അവസ്ഥ (Status) അറിയാൻ ഈ നമ്പർ എപ്പോൾ വേണമെങ്കിലും ഞങ്ങളുടെ പോർട്ടലിൽ ഉപയോഗിക്കാവുന്നതാണ്.</p>
      <a href="https://oppam.online/track" style="display: inline-block; background-color: #cf0000; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin-top: 10px;">പരാതി ട്രാക്ക് ചെയ്യുക</a>
      <br/><br/>
      <p style="font-size: 14px; color: #6b7280;">ധൈര്യമായിരിക്കുക. ഈ നിയമപോരാട്ടത്തിൽ ഞങ്ങൾ പൂർണ്ണമായും നിങ്ങൾക്കൊപ്പമുണ്ട്.</p>
      <p style="font-size: 14px; color: #6b7280;"><strong>- ഒപ്പം ലീഗൽ ടീം</strong></p>
    </div>
  `;
};

export const getAdminNotificationEmail = (complaintNumber: string, status: string, district: string) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #cf0000;">New Complaint Received</h2>
      <p>A new complaint has been submitted on the Oppam Portal.</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">Complaint Number</p>
        <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #111827;">${complaintNumber}</p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">District</p>
        <p style="margin: 5px 0; font-size: 16px; color: #374151;">${district}</p>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">Status</p>
        <p style="margin: 5px 0; font-size: 16px; color: #374151;">${status}</p>
      </div>
      <p>Please log in to the admin dashboard to review the case details.</p>
      <a href="https://oppam.online/admin" style="display: inline-block; background-color: #cf0000; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin-top: 10px;">Visit Admin Dashboard</a>
    </div>
  `;
};
