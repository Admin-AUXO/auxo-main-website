/**
 * Email Templates
 * Reusable HTML and plain text email templates
 */

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Contact Form Notification Email (to business)
 */
export function getContactNotificationEmail(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  role?: string;
  industry?: string;
  companySize?: string;
  services?: string[];
  timeline?: string;
  budget?: string;
  message: string;
  hearAbout?: string;
  newsletter: boolean;
  clientIP: string;
}): { html: string; plain: string } {
  const {
    name,
    email,
    company,
    phone,
    role,
    industry,
    companySize,
    services,
    timeline,
    budget,
    message,
    hearAbout,
    newsletter,
    clientIP,
  } = data;

  const plain = `You have received a new contact form submission from the AUXO Data Labs website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Details:
• Name: ${name}
• Email: ${email}
• Company: ${company || 'Not provided'}
• Phone: ${phone || 'Not provided'}
• Role: ${role || 'Not provided'}

Company Information:
• Industry: ${industry || 'Not provided'}
• Company Size: ${companySize || 'Not provided'}

Project Details:
• Services Interested In: ${services && services.length > 0 ? services.join(', ') : 'Not specified'}
• Timeline: ${timeline || 'Not specified'}
• Budget Range: ${budget || 'Not specified'}

Message:
${message}

Additional Information:
• Lead Source: ${hearAbout || 'Not specified'}
• Newsletter Subscription: ${newsletter ? 'Yes' : 'No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} (Dubai time)
IP Address: ${clientIP}

Reply to this email to respond directly to ${name}.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: #A3E635; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .info-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #A3E635; }
    .label { font-weight: 600; color: #666; margin-bottom: 5px; }
    .value { color: #000; margin-bottom: 15px; }
    .message-box { background: #fff; padding: 20px; border-radius: 6px; margin: 20px 0; white-space: pre-wrap; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; padding: 12px 30px; background: #A3E635; color: #000; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 New Contact Form Submission</h1>
    </div>
    <div class="content">
      <p>You have received a new inquiry from the AUXO Data Labs website.</p>

      <div class="info-box">
        <h3 style="margin-top: 0; color: #000;">Contact Details</h3>
        <div class="label">Name</div>
        <div class="value">${escapeHtml(name)}</div>

        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>

        <div class="label">Company</div>
        <div class="value">${company ? escapeHtml(company) : '<em>Not provided</em>'}</div>

        <div class="label">Phone</div>
        <div class="value">${phone ? escapeHtml(phone) : '<em>Not provided</em>'}</div>

        <div class="label">Role</div>
        <div class="value">${role ? escapeHtml(role) : '<em>Not provided</em>'}</div>
      </div>

      <div class="info-box">
        <h3 style="margin-top: 0; color: #000;">Company Information</h3>
        <div class="label">Industry</div>
        <div class="value">${industry ? escapeHtml(industry) : '<em>Not provided</em>'}</div>

        <div class="label">Company Size</div>
        <div class="value">${companySize ? escapeHtml(companySize) : '<em>Not provided</em>'}</div>
      </div>

      <div class="info-box">
        <h3 style="margin-top: 0; color: #000;">Project Details</h3>
        <div class="label">Services Interested In</div>
        <div class="value">${services && services.length > 0 ? escapeHtml(services.join(', ')) : '<em>Not specified</em>'}</div>

        <div class="label">Timeline</div>
        <div class="value">${timeline ? escapeHtml(timeline) : '<em>Not specified</em>'}</div>

        <div class="label">Budget Range</div>
        <div class="value">${budget ? escapeHtml(budget) : '<em>Not specified</em>'}</div>
      </div>

      <div class="label">Message:</div>
      <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>

      <div class="info-box" style="border-left-color: #666;">
        <div class="label">Lead Source</div>
        <div class="value">${hearAbout ? escapeHtml(hearAbout) : '<em>Not specified</em>'}</div>

        <div class="label">Newsletter Subscription</div>
        <div class="value">${newsletter ? '✓ Yes' : '✗ No'}</div>
      </div>

      <a href="mailto:${escapeHtml(email)}?subject=Re: Your inquiry to AUXO Data Labs" class="button">Reply to ${escapeHtml(name)}</a>

      <div class="footer">
        Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} (Dubai time)<br>
        AUXO Data Labs | Dubai, UAE
      </div>
    </div>
  </div>
</body>
</html>`;

  return { html, plain };
}

/**
 * Contact Form Confirmation Email (to user)
 */
export function getContactConfirmationEmail(data: {
  name: string;
  message: string;
}): { html: string; plain: string } {
  const { name, message } = data;

  const plain = `Hi ${name},

Thanks for reaching out. We've received your message and will respond within 24-48 hours.

Your message:
${message}

Explore our services and insights while you wait: https://auxodata.com

Best,
The AUXO Data Labs Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUXO Data Labs
Data Analytics Consultancy | Dubai, UAE
https://auxodata.com | hello@auxodata.com`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: #A3E635; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { font-size: 32px; font-weight: 900; margin-bottom: 10px; }
    .content { background: #f8f9fa; padding: 30px; }
    .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #A3E635; }
    .footer { background: #000; color: #A3E635; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; }
    .footer a { color: #A3E635; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">AUXO</div>
      <div>Data Labs</div>
    </div>
    <div class="content">
      <h2>Thanks for Reaching Out</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>We've received your message and will respond within <strong>24-48 hours</strong>.</p>

      <div class="message-box">
        <strong>Your message:</strong><br><br>
        ${escapeHtml(message).replace(/\n/g, '<br>')}
      </div>

      <p>Explore our <a href="https://auxodata.com/services" style="color: #A3E635;">services</a> and <a href="https://auxodata.com/blog" style="color: #A3E635;">insights</a> while you wait.</p>

      <p>Best,<br><strong>The AUXO Data Labs Team</strong></p>
    </div>
    <div class="footer">
      <strong>AUXO Data Labs</strong><br>
      Data Analytics Consultancy | Dubai, UAE<br><br>
      <a href="https://auxodata.com">Website</a> |
      <a href="mailto:hello@auxodata.com">Email</a>
    </div>
  </div>
</body>
</html>`;

  return { html, plain };
}

/**
 * Newsletter Confirmation Email
 */
export function getNewsletterConfirmationEmail(data: {
  siteUrl: string;
  fromEmail: string;
  hasDoubleOptIn?: boolean;
}): { html: string; plain: string } {
  const { siteUrl, fromEmail, hasDoubleOptIn = false } = data;

  const plain = `Thanks for subscribing to the AUXO Data Labs newsletter!

Your subscription request has been received.${hasDoubleOptIn ? ' If double opt-in is enabled in Maileroo, you will receive a confirmation email to complete your subscription.' : ' Welcome!'}

What to expect:
• Expert insights on data analytics and business intelligence
• Industry trends and case studies from the UAE and beyond
• Practical tips to improve your data strategy
• Exclusive content and early access to resources

If you didn't request this subscription, you can safely ignore this email.

Best,
The AUXO Data Labs Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUXO Data Labs
Data Analytics Consultancy | Dubai, UAE
${siteUrl} | ${fromEmail}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #000 0%, #1a1a1a 100%); color: #A3E635; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { font-size: 32px; font-weight: 900; margin-bottom: 10px; }
    .content { background: #f8f9fa; padding: 30px; }
    .button { display: inline-block; padding: 15px 40px; background: #A3E635; color: #000; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
    .benefits { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .benefit-item { margin: 10px 0; padding-left: 25px; position: relative; }
    .benefit-item:before { content: "✓"; position: absolute; left: 0; color: #A3E635; font-weight: bold; }
    .footer { background: #000; color: #A3E635; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
    .footer a { color: #A3E635; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">AUXO</div>
      <div>Data Labs</div>
    </div>
    <div class="content">
      <h2>Welcome to AUXO Data Labs</h2>
      <p>Thanks for subscribing. You're one step away from receiving expert insights on data analytics and business intelligence.</p>

      ${hasDoubleOptIn ? '<p style="color: #666; font-size: 14px;">If you receive a confirmation email from Maileroo, click the link to complete your subscription.</p>' : ''}

      <div class="benefits">
        <h3 style="margin-top: 0;">What you'll receive</h3>
        <div class="benefit-item">Expert insights on data analytics and business intelligence</div>
        <div class="benefit-item">Industry trends and case studies from the UAE and beyond</div>
        <div class="benefit-item">Practical tips to improve your data strategy</div>
        <div class="benefit-item">Exclusive content and early access to resources</div>
      </div>

      <p style="color: #666; font-size: 14px; margin-top: 30px;">
        If you didn't request this subscription, you can safely ignore this email.
      </p>
    </div>
    <div class="footer">
      <strong>AUXO Data Labs</strong><br>
      Data Analytics Consultancy | Dubai, UAE<br><br>
      <a href="${siteUrl}">Visit Website</a> |
      <a href="mailto:${fromEmail}">Contact Us</a>
    </div>
  </div>
</body>
</html>`;

  return { html, plain };
}

