import type { APIRoute } from 'astro';
import { contactFormSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { ZodError } from 'zod';
import sgMail from '@sendgrid/mail';

/**
 * Contact Form API Endpoint
 *
 * Integrations:
 * - ✅ SendGrid for email delivery
 * - ✅ Zod validation
 * - ✅ Rate limiting
 * - ✅ Honeypot spam protection
 *
 * TODO: Add reCAPTCHA for additional spam protection
 * TODO: Store submissions in database/CRM
 */

// Initialize SendGrid
const SENDGRID_API_KEY = import.meta.env.SENDGRID_API_KEY;
const FROM_EMAIL = import.meta.env.SENDGRID_FROM_EMAIL || 'noreply@auxodata.ae';
const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@auxodata.ae';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(
      clientIP,
      RateLimitPresets.CONTACT.maxRequests,
      RateLimitPresets.CONTACT.windowMs
    );

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimit.retryAfter
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimit.retryAfter || 60),
            'X-RateLimit-Limit': String(RateLimitPresets.CONTACT.maxRequests),
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(Math.floor(rateLimit.resetTime / 1000)),
          }
        }
      );
    }

    const data = await request.json();

    // Validate with Zod
    const validated = contactFormSchema.parse(data);
    const { name, email, company, message, website } = validated;

    // Honeypot check - reject if website field is filled (spam bot detection)
    if (website) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid submission'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log in development mode (intentional dev-only logging)
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('Contact form submission:', {
        name,
        email,
        company: company || 'N/A',
        messageLength: message.length,
        timestamp: new Date().toISOString()
      });
    }

    // Send email notification using SendGrid
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      // Still return success to user, log error for admin
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Thank you for your message. We will get back to you soon!'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    try {
      // Email to business (notification)
      await sgMail.send({
        to: CONTACT_EMAIL,
        from: FROM_EMAIL,
        replyTo: email,
        subject: `🔔 New Contact Form Submission from ${name}`,
        text: `You have received a new contact form submission from the AUXO Data Labs website.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Details:
• Name: ${name}
• Email: ${email}
• Company: ${company || 'Not provided'}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} (Dubai time)
IP Address: ${getClientIP(request)}

Reply to this email to respond directly to ${name}.`,
        html: `
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
        <div class="label">Name</div>
        <div class="value">${name}</div>

        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>

        <div class="label">Company</div>
        <div class="value">${company || '<em>Not provided</em>'}</div>
      </div>

      <div class="label">Message:</div>
      <div class="message-box">${message.replace(/\n/g, '<br>')}</div>

      <a href="mailto:${email}?subject=Re: Your inquiry to AUXO Data Labs" class="button">Reply to ${name}</a>

      <div class="footer">
        Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} (Dubai time)<br>
        AUXO Data Labs | Dubai, UAE
      </div>
    </div>
  </div>
</body>
</html>`
      });

      // Confirmation email to user
      await sgMail.send({
        to: email,
        from: FROM_EMAIL,
        subject: 'Thank you for contacting AUXO Data Labs',
        text: `Dear ${name},

Thank you for reaching out to AUXO Data Labs. We have received your message and will get back to you within 24-48 hours.

Your Message:
${message}

In the meantime, feel free to explore our services at https://auxodata.ae

Best regards,
The AUXO Data Labs Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUXO Data Labs
Leading Analytics Consultancy in Dubai, UAE
Website: https://auxodata.ae
Email: hello@auxodata.ae`,
        html: `
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
      <h2>Thank You for Reaching Out!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and appreciate you taking the time to contact AUXO Data Labs.</p>
      <p>Our team will review your inquiry and get back to you within <strong>24-48 hours</strong>.</p>

      <div class="message-box">
        <strong>Your Message:</strong><br><br>
        ${message.replace(/\n/g, '<br>')}
      </div>

      <p>In the meantime, feel free to explore our <a href="https://auxodata.ae/services" style="color: #A3E635;">services</a> and <a href="https://auxodata.ae/blog" style="color: #A3E635;">blog</a> for insights on data analytics.</p>

      <p>Best regards,<br><strong>The AUXO Data Labs Team</strong></p>
    </div>
    <div class="footer">
      <strong>AUXO Data Labs</strong><br>
      Leading Analytics Consultancy in Dubai, UAE<br><br>
      <a href="https://auxodata.ae">Website</a> |
      <a href="mailto:hello@auxodata.ae">Email</a>
    </div>
  </div>
</body>
</html>`
      });

    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails, log for debugging
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your message. We will get back to you soon!'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log server errors
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
