/**
 * Premium Email Templates for Anand Kumar's Portfolio
 * 100% Mobile & Desktop Cross-Client Compatible (Gmail, Apple Mail, Outlook, Android, iOS)
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
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; background-color:#070b14; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#e2e8f0;">
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070b14; margin:0; padding:12px 6px;">
    <tr>
      <td align="center">
        
        <!-- Responsive Container with table-layout:fixed -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:560px; margin:0 auto; table-layout:fixed; background-color:#0f172a; border-radius:16px; overflow:hidden; border:1px solid #1e293b; box-shadow:0 20px 50px rgba(0,0,0,0.6);">
          
          <!-- Top Cyber Neon Gradient Border Line -->
          <tr>
            <td height="4" style="background:linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899); font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding:18px 16px; background:linear-gradient(180deg, #131d35 0%, #0f172a 100%); border-bottom:1px solid #1e293b;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="42" valign="middle">
                    <div style="width:40px; height:40px; line-height:40px; background:linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius:10px; color:#ffffff; font-weight:800; font-size:15px; text-align:center; box-shadow:0 4px 12px rgba(59,130,246,0.4);">
                      AK
                    </div>
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font-size:10px; font-weight:700; color:#38bdf8; text-transform:uppercase; letter-spacing:1px;">ANAND KUMAR PORTFOLIO</div>
                    <div style="font-size:16px; font-weight:800; color:#ffffff; margin-top:2px;">New Client Inquiry</div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block; background-color:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.4); border-radius:9999px; padding:3px 8px; font-size:10px; font-weight:700; color:#34d399; white-space:nowrap;">
                      ● LIVE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:18px 16px;">

              <!-- Intro Notice -->
              <div style="background:rgba(30,41,59,0.5); border:1px solid #1e293b; border-radius:10px; padding:12px 14px; margin-bottom:16px;">
                <p style="margin:0; font-size:13px; color:#cbd5e1; line-height:1.5;">
                  A new message has been submitted through your portfolio contact form. Details are summarized below:
                </p>
              </div>

              <!-- Metadata Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px; table-layout:fixed; background-color:#0b101e; border:1px solid #1e293b; border-radius:10px; overflow:hidden;">
                <tr>
                  <td style="padding:12px 14px; border-bottom:1px solid #1e293b;">
                    <div style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Sender Name</div>
                    <div style="font-size:15px; font-weight:700; color:#ffffff;">${safeName}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px; border-bottom:1px solid #1e293b;">
                    <div style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Email Address</div>
                    <div style="font-size:14px; color:#38bdf8; font-weight:600; word-break:break-all;">
                      <a href="mailto:${safeEmail}" style="color:#38bdf8; text-decoration:none;">${safeEmail}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px; border-bottom:1px solid #1e293b;">
                    <div style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Subject</div>
                    <div style="font-size:14px; color:#f1f5f9; font-weight:600;">
                      <span style="display:inline-block; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.35); color:#a5b4fc; padding:2px 8px; border-radius:6px; font-size:12px; word-break:break-word;">
                        ${safeSubject}
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;">
                    <div style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:3px;">Submitted At</div>
                    <div style="font-size:12px; color:#94a3b8; font-family:monospace;">${formattedTime}</div>
                  </td>
                </tr>
              </table>

              <!-- Message Content Area -->
              <div style="margin-bottom:20px;">
                <div style="font-size:10px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">
                  Message Content:
                </div>
                <div style="background-color:#0b101e; border:1px solid #1e293b; border-left:4px solid #6366f1; border-radius:8px; padding:14px 16px; font-size:14px; line-height:1.7; color:#f8fafc; word-break:break-word;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Action Buttons -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:8px;">
                    <a href="${replyMailto}" target="_blank" style="display:block; width:100%; box-sizing:border-box; background:linear-gradient(135deg, #3b82f6, #6366f1); color:#ffffff; text-decoration:none; font-size:13px; font-weight:700; padding:12px 16px; border-radius:10px; box-shadow:0 4px 14px rgba(59,130,246,0.3); text-align:center;">
                      ✉️ Reply Directly to ${safeName}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://portfolio-devlook.vercel.app/admin/dashboard" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#1e293b; border:1px solid #334155; color:#cbd5e1; text-decoration:none; font-size:12px; font-weight:600; padding:11px 16px; border-radius:10px; text-align:center;">
                      🛡️ Open Admin Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding:14px 16px; background-color:#070b14; border-top:1px solid #1e293b; text-align:center;">
              <p style="margin:0 0 4px; font-size:11px; color:#64748b;">
                Sent via <a href="https://portfolio-devlook.vercel.app" style="color:#94a3b8; text-decoration:none; font-weight:600;">portfolio-devlook.vercel.app</a> Gateway
              </p>
              <p style="margin:0; font-size:10px; color:#475569; font-family:monospace;">
                TLS 1.3 · Honeypot Anti-Bot · AES-256 Protected
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
  <title>Thank you for reaching out! — Anand Kumar</title>
</head>
<body style="margin:0; padding:0; background-color:#070b14; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; color:#e2e8f0;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#070b14; margin:0; padding:12px 6px;">
    <tr>
      <td align="center">

        <!-- Responsive Container with table-layout:fixed -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:560px; margin:0 auto; table-layout:fixed; background-color:#111827; border-radius:16px; overflow:hidden; border:1px solid #1f2937; box-shadow:0 25px 60px rgba(0,0,0,0.7);">
          
          <!-- Top Multi-color Glow Line -->
          <tr>
            <td height="4" style="background:linear-gradient(90deg, #38bdf8, #6366f1, #a855f7, #ec4899); font-size:0; line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding:18px 16px; background:linear-gradient(180deg, #172033 0%, #111827 100%); border-bottom:1px solid #1f2937;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="42" valign="middle">
                    <div style="width:40px; height:40px; line-height:40px; background:linear-gradient(135deg, #2563eb, #7c3aed); border-radius:10px; color:#ffffff; font-weight:800; font-size:15px; text-align:center; box-shadow:0 6px 16px rgba(37,99,235,0.4);">
                      AK
                    </div>
                  </td>
                  <td valign="middle" style="padding-left:12px;">
                    <div style="font-size:16px; font-weight:800; color:#ffffff; letter-spacing:-0.3px;">Anand Kumar</div>
                    <div style="font-size:11px; font-weight:500; color:#94a3b8; margin-top:1px;">Full Stack Developer &amp; Engineer</div>
                  </td>
                  <td align="right" valign="middle">
                    <a href="https://portfolio-devlook.vercel.app" target="_blank" style="display:inline-block; background:rgba(59,130,246,0.15); border:1px solid rgba(59,130,246,0.4); color:#60a5fa; text-decoration:none; font-size:11px; font-weight:600; padding:4px 10px; border-radius:9999px; white-space:nowrap;">
                      Portfolio &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding:20px 16px;">

              <!-- Greeting Banner -->
              <h2 style="margin:0 0 12px; font-size:19px; font-weight:800; color:#ffffff; letter-spacing:-0.3px;">
                Hi ${firstName}, thank you for reaching out! 👋
              </h2>

              <p style="margin:0 0 14px; font-size:14px; line-height:1.6; color:#cbd5e1;">
                I have successfully received your message regarding <strong style="color:#f8fafc;">"${safeSubject}"</strong>. Thank you for taking the time to connect with me!
              </p>

              <!-- Assurance Box -->
              <div style="background:linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); border:1px solid #1e293b; border-left:4px solid #10b981; border-radius:10px; padding:14px 14px; margin-bottom:18px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="24" valign="top" style="font-size:15px; line-height:1;">⚡</td>
                    <td style="padding-left:8px; font-size:13px; line-height:1.5; color:#e2e8f0;">
                      <strong style="color:#34d399;">What happens next:</strong><br>
                      I review every project inquiry and collaboration request personally. I will get back to you with my thoughts and availability within <strong style="color:#ffffff;">24 hours</strong>.
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message Copy Summary -->
              <div style="background-color:#0b101e; border:1px solid #1f2937; border-radius:10px; padding:14px; margin-bottom:18px;">
                <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">
                  Summary of your submitted message:
                </div>
                <div style="font-size:13px; font-weight:600; color:#93c5fd; margin-bottom:6px; word-break:break-word;">
                  Subject: ${safeSubject}
                </div>
                <div style="font-size:12px; line-height:1.6; color:#94a3b8; font-style:italic; border-top:1px solid #1f2937; padding-top:8px; word-break:break-word;">
                  "${safeMessage}"
                </div>
              </div>

              <!-- What you can explore section -->
              <p style="margin:0 0 10px; font-size:13px; font-weight:600; color:#cbd5e1;">
                In the meantime, feel free to explore my work or connect directly:
              </p>

              <!-- Action Links Stack -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding-bottom:8px;">
                    <a href="https://portfolio-devlook.vercel.app/#projects" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#1e293b; border:1px solid #334155; padding:11px 14px; border-radius:8px; text-decoration:none; color:#f1f5f9; font-size:13px; font-weight:600; text-align:center;">
                      💻 Explore Featured Projects
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px;">
                    <a href="https://www.linkedin.com/in/anand-kumar-270533346/" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#1e293b; border:1px solid #334155; padding:11px 14px; border-radius:8px; text-decoration:none; color:#60a5fa; font-size:13px; font-weight:600; text-align:center;">
                      💼 Connect on LinkedIn
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://wa.me/918726540277" target="_blank" style="display:block; width:100%; box-sizing:border-box; background-color:#1e293b; border:1px solid #334155; padding:11px 14px; border-radius:8px; text-decoration:none; color:#34d399; font-size:13px; font-weight:600; text-align:center;">
                      💬 Chat on WhatsApp (+91 8726540277)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off Block -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #1f2937; padding-top:14px; width:100%;">
                <tr>
                  <td>
                    <div style="font-size:12px; color:#94a3b8; margin-bottom:2px;">Warm regards,</div>
                    <div style="font-size:15px; font-weight:800; color:#ffffff;">Anand Kumar</div>
                    <div style="font-size:12px; color:#38bdf8; margin-top:2px;">Full Stack Developer &amp; Software Engineer</div>
                    <div style="font-size:11px; color:#64748b; margin-top:2px;">
                      Direct Email: <a href="mailto:solestyle41@gmail.com" style="color:#64748b; text-decoration:none;">solestyle41@gmail.com</a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Area -->
          <tr>
            <td style="padding:14px 16px; background-color:#070b14; border-top:1px solid #1f2937; text-align:center;">
              <p style="margin:0 0 3px; font-size:11px; color:#64748b;">
                © ${new Date().getFullYear()} Anand Kumar. All rights reserved.
              </p>
              <p style="margin:0; font-size:10px; color:#475569;">
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
