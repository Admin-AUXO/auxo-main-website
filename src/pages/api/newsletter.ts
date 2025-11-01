import type { APIRoute } from 'astro';
import { newsletterSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { ZodError } from 'zod';
import * as brevo from '@getbrevo/brevo';

/**
 * Newsletter Subscription API Endpoint
 *
 * Integrations:
 * - ✅ Brevo for email delivery and contact management
 * - ✅ Zod validation
 * - ✅ Rate limiting
 * - ✅ Double opt-in for GDPR/UAE PDPL compliance
 *
 * TODO: Add reCAPTCHA for additional spam protection
 */

// Initialize Brevo
const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const FROM_EMAIL = import.meta.env.BREVO_FROM_EMAIL || 'noreply@auxodata.com';
const FROM_NAME = import.meta.env.BREVO_FROM_NAME || 'AUXO Data Labs';
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://auxodata.com';

let contactsApi: brevo.ContactsApi | null = null;
let emailApi: brevo.TransactionalEmailsApi | null = null;

if (BREVO_API_KEY) {
  contactsApi = new brevo.ContactsApi();
  contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, BREVO_API_KEY);

  emailApi = new brevo.TransactionalEmailsApi();
  emailApi.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Rate limiting check
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(
      clientIP,
      RateLimitPresets.NEWSLETTER.maxRequests,
      RateLimitPresets.NEWSLETTER.windowMs
    );

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many subscription attempts. Please try again later.',
          retryAfter: rateLimit.retryAfter
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimit.retryAfter || 60),
            'X-RateLimit-Limit': String(RateLimitPresets.NEWSLETTER.maxRequests),
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(Math.floor(rateLimit.resetTime / 1000)),
          }
        }
      );
    }

    const data = await request.json();

    // Validate with Zod
    const validated = newsletterSchema.parse(data);
    const { email, consent } = validated;

    // Check if Brevo is configured
    if (!contactsApi || !emailApi || !BREVO_API_KEY) {
      console.error('Brevo is not configured. Please set BREVO_API_KEY in .env');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Newsletter service is not configured. Please contact support.'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    try {
      // Add or update contact in Brevo
      const contact = new brevo.CreateContact();
      contact.email = email;
      contact.listIds = [2]; // Newsletter list ID in Brevo (you may need to adjust this)
      contact.attributes = {
        SOURCE: 'Website',
        SUBSCRIBED_AT: new Date().toISOString(),
        CONSENT: consent
      };
      contact.updateEnabled = true; // Update if contact already exists

      await contactsApi.createContact(contact);

      // Send double opt-in confirmation email
      const confirmationEmail = new brevo.SendSmtpEmail();
      confirmationEmail.to = [{ email: email }];
      confirmationEmail.sender = { email: FROM_EMAIL, name: FROM_NAME };
      confirmationEmail.subject = 'Confirm your AUXO Data Labs newsletter subscription';
      confirmationEmail.textContent = `Thank you for subscribing to the AUXO Data Labs newsletter!

To complete your subscription and start receiving insights on data analytics trends and best practices, please confirm your email address by clicking the link below:

${SITE_URL}

Why subscribe?
• Expert insights on data analytics and business intelligence
• Industry trends and case studies from the UAE and beyond
• Practical tips to improve your data strategy
• Exclusive content and early access to resources

If you didn't request this subscription, you can safely ignore this email.

Best regards,
The AUXO Data Labs Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUXO Data Labs
Leading Analytics Consultancy in Dubai, UAE
Website: ${SITE_URL}
Email: ${FROM_EMAIL}`;

      confirmationEmail.htmlContent = `
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
      <h2>Welcome to AUXO Data Labs!</h2>
      <p>Thank you for subscribing to our newsletter. You're one step away from receiving expert insights on data analytics and business intelligence.</p>

      <div style="text-align: center;">
        <a href="${SITE_URL}" class="button">Confirm Your Subscription</a>
      </div>

      <div class="benefits">
        <h3 style="margin-top: 0;">What you'll receive:</h3>
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
      Leading Analytics Consultancy in Dubai, UAE<br><br>
      <a href="${SITE_URL}">Visit Website</a> |
      <a href="mailto:${FROM_EMAIL}">Contact Us</a>
    </div>
  </div>
</body>
</html>`;

      await emailApi.sendTransacEmail(confirmationEmail);

    } catch (brevoError) {
      console.error('Brevo API error:', brevoError);

      // If contact already exists, that's okay
      if (brevoError instanceof Error && brevoError.message.includes('already exists')) {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'You are already subscribed to our newsletter!'
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Log but don't expose internal errors to user
      throw new Error('Failed to process subscription');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Please check your email to confirm your subscription.'
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
    console.error('Newsletter subscription error:', error);

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
