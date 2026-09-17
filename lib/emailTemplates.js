/**
 * Premium Email Templates for Anand Kumar's Portfolio
 * 100% Cross-Client Compatible (Gmail iOS/Android Dark Mode, Apple Mail, Outlook, Webmail)
 * Solves Gmail dark-mode inverted text bugs by using symmetric contrast architecture.
 */

export const escapeHtml = (str) => {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * 1. Ultra-Premium Admin Notification Email
 * Sent to Anand Kumar when a client submits the contact form.
 */
export function getAdminNotificationEmailHtml({ name, email, subject, message, timestamp }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'Portfolio Contact Submission');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
  const formattedTime = timestamp || new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  }) + ' IST';

  const replyMailto = `mailto:${encodeURIComponent(email)}?subject=Re:%20${encodeURIComponent(subject || 'Portfolio Inquiry')}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>New Contact Form Submission</title>
  <style>
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#0f172a;">
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9; margin:0; padding:16px 8px;">
    <tr>
      <td align="center">
        
        <!-- Main Card with solid high-contrast borders -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px; width:100%; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #cbd5e1; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <!-- Top Multi-color Accent Bar -->
          <tr>
            <td height="5" style="background:linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899); font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding:22px 20px 18px; background-color:#f8fafc; border-bottom:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="44" valign="middle">
                    <div style="width:42px; height:42px; line-height:42px; background-color:#2563eb; border-radius:10px; color:#ffffff; font-weight:800; font-size:16px; text-align:center; box-shadow:0 4px 10px rgba(37,99,235,0.3);">
                      AK
                    </div>
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font-size:10px; font-weight:700; color:#2563eb; text-transform:uppercase; letter-spacing:1px;">ANAND KUMAR PORTFOLIO</div>
                    <div style="font-size:17px; font-weight:800; color:#0f172a; margin-top:2px;">New Client Inquiry</div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block; background-color:#dcfce7; border:1px solid #86efac; border-radius:9999px; padding:4px 10px; font-size:11px; font-weight:700; color:#15803d; white-space:nowrap;">
                      ● LIVE INQUIRY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:24px 20px;">

              <!-- Overview Banner -->
              <div style="background-color:#f1f5f9; border:1px solid #e2e8f0; border-radius:10px; padding:12px 16px; margin-bottom:20px;">
                <p style="margin:0; font-size:13px; color:#334155; line-height:1.5;">
                  A new message has been submitted through your portfolio contact form. Sender information is summarized below:
                </p>
              </div>

              <!-- Metadata Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px; background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden;">
                <tr>
                  <td style="padding:12px 16px; border-bottom:1px solid #e2e8f0;">
                    <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Sender Name</div>
                    <div style="font-size:15px; font-weight:700; color:#0f172a;">${safeName}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px; border-bottom:1px solid #e2e8f0;">
                    <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Email Address</div>
                    <div style="font-size:14px; color:#2563eb; font-weight:600; word-break:break-all;">
                      <a href="mailto:${safeEmail}" style="color:#2563eb; text-decoration:none;">${safeEmail}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px; border-bottom:1px solid #e2e8f0;">
                    <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Subject</div>
                    <div style="font-size:14px; color:#0f172a; font-weight:600;">
                      <span style="display:inline-block; background-color:#e0e7ff; border:1px solid #c7d2fe; color:#3730a3; padding:3px 10px; border-radius:6px; font-size:12px; font-weight:700; word-break:break-word;">
                        ${safeSubject}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;">
                    <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Submitted At</div>
                    <div style="font-size:12px; color:#64748b; font-family:monospace;">${formattedTime}</div>
                  </td>
                </tr>
              </table>

              <!-- Message Content Area -->
              <div style="margin-bottom:22px;">
                <div style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                  Message Content:
                </div>
                <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #4f46e5; border-radius:8px; padding:16px; font-size:14px; line-height:1.7; color:#1e293b; word-break:break-word;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
                <tr>
                  <td style="padding-bottom:10px;">
                    <a href="${replyMailto}" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#2563eb; color:#ffffff; text-decoration:none; font-size:14px; font-weight:700; padding:13px 20px; border-radius:10px; text-align:center; box-shadow:0 4px 12px rgba(37,99,235,0.3);">
                      ✉️ Reply Directly to ${safeName}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://portfolio-devlook.vercel.app/admin/dashboard" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#f1f5f9; border:1px solid #cbd5e1; color:#334155; text-decoration:none; font-size:13px; font-weight:700; padding:12px 20px; border-radius:10px; text-align:center;">
                      🛡️ Open Admin Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding:16px 20px; background-color:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
              <p style="margin:0 0 4px; font-size:11px; color:#64748b;">
                Sent via <a href="https://portfolio-devlook.vercel.app" style="color:#2563eb; text-decoration:none; font-weight:600;">portfolio-devlook.vercel.app</a> Gateway
              </p>
              <p style="margin:0; font-size:10px; color:#94a3b8; font-family:monospace;">
                TLS 1.3 · Honeypot Anti-Bot · Verified Submission
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * 2. Ultra-Premium Client Thank You / Confirmation Auto-Reply
 * Sent to the client who submitted the form.
 * Designed with 100% robust high-contrast compatibility across all email clients.
 */
export function getClientThankYouEmailHtml({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const firstName = safeName.split(' ')[0] || safeName;
  const safeSubject = escapeHtml(subject || 'Portfolio Inquiry');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Thank you for reaching out! — Anand Kumar</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#0f172a;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9; margin:0; padding:16px 8px;">
    <tr>
      <td align="center">

        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px; width:100%; margin:0 auto; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #cbd5e1; box-shadow:0 10px 35px rgba(0,0,0,0.08);">
          
          <!-- Top Multi-color Glow Line -->
          <tr>
            <td height="5" style="background:linear-gradient(90deg, #38bdf8, #6366f1, #a855f7, #ec4899); font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding:22px 20px 18px; background-color:#f8fafc; border-bottom:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="44" valign="middle">
                    <div style="width:42px; height:42px; line-height:42px; background-color:#2563eb; border-radius:10px; color:#ffffff; font-weight:800; font-size:16px; text-align:center; box-shadow:0 4px 10px rgba(37,99,235,0.3);">
                      AK
                    </div>
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font-size:17px; font-weight:800; color:#0f172a; letter-spacing:-0.3px; line-height:1.2;">Anand Kumar</div>
                    <div style="font-size:12px; font-weight:600; color:#64748b; margin-top:2px;">Full Stack Developer &amp; Software Engineer</div>
                  </td>
                  <td align="right" valign="middle">
                    <a href="https://portfolio-devlook.vercel.app" target="_blank" style="display:inline-block; background-color:#eff6ff; border:1px solid #bfdbfe; color:#2563eb; text-decoration:none; font-size:11px; font-weight:700; padding:5px 12px; border-radius:9999px; white-space:nowrap;">
                      Portfolio &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:24px 20px;">

              <!-- Greeting Banner -->
              <h2 style="margin:0 0 14px; font-size:20px; font-weight:800; color:#0f172a; letter-spacing:-0.3px;">
                Hi ${firstName}, thank you for reaching out! 👋
              </h2>

              <p style="margin:0 0 16px; font-size:14px; line-height:1.7; color:#334155;">
                I have successfully received your message regarding <strong style="color:#0f172a;">"${safeSubject}"</strong>. Thank you for taking the time to connect with me!
              </p>

              <!-- Assurance Box (High Contrast Emerald Alert Style - 100% visible in Dark & Light Modes) -->
              <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-left:4px solid #16a34a; border-radius:10px; padding:16px 16px; margin-bottom:22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="26" valign="top" style="font-size:18px; line-height:1;">⚡</td>
                    <td style="padding-left:10px; font-size:13px; line-height:1.6; color:#166534;">
                      <strong style="color:#15803d; font-size:14px;">What happens next:</strong><br>
                      I review every project inquiry and collaboration request personally. I will get back to you with my availability and response within <strong style="color:#14532d; text-decoration:underline;">24 hours</strong>.
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Copy Summary -->
              <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; margin-bottom:22px;">
                <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">
                  Summary of your submitted message:
                </div>
                <div style="font-size:13px; font-weight:700; color:#1e40af; margin-bottom:6px; word-break:break-word;">
                  Subject: ${safeSubject}
                </div>
                <div style="font-size:13px; line-height:1.6; color:#334155; font-style:italic; border-top:1px solid #e2e8f0; padding-top:8px; word-break:break-word;">
                  "${safeMessage}"
                </div>
              </div>

              <!-- What you can explore section -->
              <p style="margin:0 0 12px; font-size:13px; font-weight:700; color:#334155;">
                In the meantime, feel free to explore my work or connect directly:
              </p>

              <!-- Action Links Stack -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-bottom:8px;">
                    <a href="https://portfolio-devlook.vercel.app/#projects" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#f8fafc; border:1px solid #cbd5e1; padding:12px 16px; border-radius:8px; text-decoration:none; color:#0f172a; font-size:13px; font-weight:700; text-align:center;">
                      💻 Explore Featured Projects
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px;">
                    <a href="https://www.linkedin.com/in/anand-kumar-270533346/" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#eff6ff; border:1px solid #bfdbfe; padding:12px 16px; border-radius:8px; text-decoration:none; color:#1d4ed8; font-size:13px; font-weight:700; text-align:center;">
                      💼 Connect on LinkedIn
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://wa.me/918726540277" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#f0fdf4; border:1px solid #bbf7d0; padding:12px 16px; border-radius:8px; text-decoration:none; color:#15803d; font-size:13px; font-weight:700; text-align:center;">
                      💬 Chat on WhatsApp (+91 8726540277)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off Block -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e2e8f0; padding-top:16px; width:100%;">
                <tr>
                  <td>
                    <div style="font-size:13px; color:#64748b; margin-bottom:3px;">Warm regards,</div>
                    <div style="font-size:16px; font-weight:800; color:#0f172a;">Anand Kumar</div>
                    <div style="font-size:12px; font-weight:600; color:#2563eb; margin-top:2px;">Full Stack Developer &amp; Software Engineer</div>
                    <div style="font-size:11px; color:#64748b; margin-top:3px;">
                      Direct Email: <a href="mailto:solestyle41@gmail.com" style="color:#2563eb; text-decoration:none;">solestyle41@gmail.com</a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding:16px 20px; background-color:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
              <p style="margin:0 0 4px; font-size:11px; color:#64748b;">
                © ${new Date().getFullYear()} Anand Kumar. All rights reserved.
              </p>
              <p style="margin:0; font-size:10px; color:#94a3b8;">
                You received this email because you submitted an inquiry on <a href="https://portfolio-devlook.vercel.app" style="color:#64748b; text-decoration:underline;">portfolio-devlook.vercel.app</a>.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
