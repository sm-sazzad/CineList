import nodemailer from "nodemailer";

interface SendVerificationEmailParams {
  to: string;
  name?: string;
  verificationUrl: string;
  token?: string;
}

const getTransporter = () => {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: user && pass ? { user, pass } : undefined,
    });
  }

  // Default to Gmail service
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user || "",
      pass: pass || "",
    },
  });
};

export const sendVerificationEmailUtil = async ({
  to,
  name,
  verificationUrl,
}: SendVerificationEmailParams) => {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || "noreply@cinelist.com";
  const transporter = getTransporter();

  const displayName = name ? name : "Movie Fan";

  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your CineList account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0f19; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background: #111827; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; text-align: center; background: linear-gradient(180deg, rgba(238, 22, 47, 0.15) 0%, rgba(17, 24, 39, 0) 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                <span style="color: #ffffff;">Cine</span><span style="background: linear-gradient(135deg, #ee162f 0%, #fc6743 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: #ee162f;">List</span>
              </h1>
              <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 14px;">Your Ultimate Cinema & Watchlist Companion</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 32px 32px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                Verify your email address
              </h2>
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #d1d5db;">
                Hello <strong>${displayName}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #9ca3af;">
                Welcome to CineList! To activate your account, start saving your favorite films, and access all features, please verify your email address by clicking the button below.
              </p>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #ee162f 0%, #fd3148 50%, #fc6743 100%); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(238, 22, 47, 0.3);">
                      Verify My Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 8px 0; font-size: 13px; line-height: 1.5; color: #6b7280;">
                If the button above does not work, copy and paste this link into your browser:
              </p>
              <p style="margin: 0 0 24px 0; font-size: 12px; line-height: 1.4; word-break: break-all;">
                <a href="${verificationUrl}" style="color: #fd3148; text-decoration: underline;">${verificationUrl}</a>
              </p>

              <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: 24px 0;" />

              <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.5;">
                This link will expire in 1 hour. If you didn't create an account with CineList, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #0d131f; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                &copy; ${new Date().getFullYear()} CineList. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const emailText = `Hello ${displayName},

Welcome to CineList! Please verify your email address to activate your account.

Click the link below or paste it in your browser:
${verificationUrl}

This verification link will expire in 1 hour.
If you didn't create an account with CineList, you can safely ignore this email.

Best regards,
The CineList Team`;

  try {
    const info = await transporter.sendMail({
      from: `"CineList" <${user}>`,
      to,
      subject: "Verify your email address - CineList",
      text: emailText,
      html: emailHtml,
    });
    console.log("[EMAIL] Verification email sent to:", to, "MessageId:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[EMAIL] Failed to send verification email:", error);
    throw error;
  }
};

