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
      <p>​നിങ്ങളുടെ പരാതി 'ഒപ്പം' സംവിധാനത്തിൽ തികച്ചും സുരക്ഷിതമായി ലഭിച്ചിട്ടുണ്ട്. നിങ്ങളുടെ വിവരങ്ങൾ പൂർണമായും രഹസ്യമായി സൂക്ഷിക്കുന്നതാണ്.</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">നിങ്ങളുടെ ട്രാക്കിംഗ് നമ്പർ</p>
        <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${complaintNumber}</p>
      </div>
      <p>​അടുത്തതായി എന്ത് സംഭവിക്കും?</p>
      <p>ഞങ്ങളുടെ നിയമവിദഗ്ധർ നിങ്ങളുടെ പരാതി പരിശോധിച്ച ശേഷം, തുടർനടപടികൾക്കായി ഉടൻ തന്നെ (അല്ലെങ്കിൽ 24 മണിക്കൂറിനുള്ളിൽ) നിങ്ങളെ ബന്ധപ്പെടുന്നതാണ്. അതുവരെ പരാതിയുടെ നിലവിലുള്ള അവസ്ഥ (Status) അറിയാൻ നിങ്ങളുടെ ട്രാക്കിംഗ് നമ്പർ ഉപയോഗിച്ച് <strong>oppam.online</strong> വെബ്സൈറ്റിലെ ട്രാക്കിംഗ് ഫീച്ചർ (Track feature) ഉപയോഗിക്കാവുന്നതാണ്.</p>
      <br/><br/>
      <p style="font-size: 14px; color: #6b7280;">​ധൈര്യമായിരിക്കുക. നിങ്ങൾക്ക് ആവശ്യമായ എല്ലാ നിയമസഹായങ്ങളുമായി ഞങ്ങൾ ഒപ്പമുണ്ട്.</p>
      <p style="font-size: 14px; color: #6b7280;"><strong>സ്നേഹത്തോടെ,</strong><br/>ടീം ഒപ്പം</p>
    </div>
  `;
};

export const getAdminNotificationEmail = (complaintNumber: string, status: string, district: string, totalCount: number, pendingCount: number) => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #cf0000;">New Complaint Registered</h2>
      <p>A new complaint has been registered on the Oppam Portal.</p>
      
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">Complaint Details</p>
        <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #111827;">ID: ${complaintNumber}</p>
        <p style="margin: 5px 0; font-size: 14px; color: #374151;">District: ${district}</p>
        <p style="margin: 5px 0; font-size: 14px; color: #374151;">Status: ${status}</p>
      </div>

      <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #fee2e2;">
        <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: bold;">Dashboard Stats</p>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
          <div>
            <p style="margin: 0; font-size: 12px; color: #991b1b;">Total Received</p>
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #cf0000;">${totalCount}</p>
          </div>
          <div style="margin-left: 20px;">
            <p style="margin: 0; font-size: 12px; color: #991b1b;">Pending Review</p>
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #cf0000;">${pendingCount}</p>
          </div>
        </div>
      </div>

      <p>Please log in to the official admin dashboard to review the case details.</p>
      <a href="https://oppam.online/admin" style="display: inline-block; background-color: #cf0000; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; margin-top: 10px;">Visit admin.oppam.online</a>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #9ca3af;">
        <p>This is a secure system notification from the Oppam Portal. Confidentiality must be maintained for all accessed data.</p>
      </div>
    </div>
  `;
};
