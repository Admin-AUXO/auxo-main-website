import type { APIRoute } from 'astro';
import { contactFormSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { ZodError } from 'zod';
import * as brevo from '@getbrevo/brevo';

/**
 * Escape HTML to prevent XSS in email templates
 */
function escapeHtml(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Contact Form API Endpoint
 *
 * Integrations:
 * - ✅ Brevo (Sendinblue) for email delivery
 * - ✅ Zod validation
 * - ✅ Rate limiting
 * - ✅ Honeypot spam protection
 *
 * TODO: Add reCAPTCHA for additional spam protection
 * TODO: Store submissions in database/CRM
 */

// Initialize Brevo
const BREVO_API_KEY = import.meta.env.BREVO_API_KEY;
const FROM_EMAIL = import.meta.env.BREVO_FROM_EMAIL || 'noreply@auxodata.com';
const FROM_NAME = import.meta.env.BREVO_FROM_NAME || 'AUXO Data Labs';
const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@auxodata.com';

let apiInstance: brevo.TransactionalEmailsApi | null = null;

if (BREVO_API_KEY) {
  apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);
}

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      error: 'Method Not Allowed',
      message: 'This endpoint only accepts POST requests.'
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      }
    }
  );
};

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
          error: 'Oops! You\'ve submitted too many requests. Please wait a few minutes and try again.',
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
    const {
      name,
      email,
      company,
      phone,
      industry,
      companySize,
      role,
      services,
      timeline,
      budget,
      message,
      hearAbout,
      newsletter,
      website
    } = validated;

    // Honeypot check - reject if website field is filled (spam bot detection)
    if (website) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'We couldn\'t process your submission. Please try again.'
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

    // Send email notification using Brevo
    if (!BREVO_API_KEY || !apiInstance) {
      console.error('Brevo API key not configured');
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

    let emailsSent = { notification: false, confirmation: false };
    
    try {
      // Email to business (notification)
      const notificationEmail = new brevo.SendSmtpEmail();
      notificationEmail.to = [{ email: CONTACT_EMAIL }];
      notificationEmail.sender = { email: FROM_EMAIL, name: FROM_NAME };
      notificationEmail.replyTo = { email: email, name: name };
      notificationEmail.subject = `🔔 New Contact Form Submission from ${escapeHtml(name)}`;
      notificationEmail.textContent = `You have received a new contact form submission from the AUXO Data Labs website.

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
IP Address: ${getClientIP(request)}

Reply to this email to respond directly to ${name}.`;
      notificationEmail.htmlContent = `
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

      // Send notification email to business
      try {
        await apiInstance.sendTransacEmail(notificationEmail);
        emailsSent.notification = true;
      } catch (notificationError) {
        const errorMessage = notificationError instanceof Error ? notificationError.message : 'Unknown error';
        const errorStatus = (notificationError as { statusCode?: number })?.statusCode;
        
        console.error('Error sending notification email:', {
          error: errorMessage,
          statusCode: errorStatus,
          email,
          timestamp: new Date().toISOString(),
          ...(import.meta.env.DEV && { details: notificationError })
        });
        // Continue processing - we still want to send confirmation and process newsletter
      }

      // Confirmation email to user
      const confirmationEmail = new brevo.SendSmtpEmail();
      confirmationEmail.to = [{ email: email, name: name }];
      confirmationEmail.sender = { email: FROM_EMAIL, name: FROM_NAME };
      confirmationEmail.subject = 'Thank you for contacting AUXO Data Labs';
      confirmationEmail.textContent = `Dear ${name},

Thank you for reaching out to AUXO Data Labs. We have received your message and will get back to you within 24-48 hours.

Your Message:
${message}

In the meantime, feel free to explore our services at https://auxodata.com

Best regards,
The AUXO Data Labs Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUXO Data Labs
A New Data Analytics Consultancy in Dubai, UAE
Website: https://auxodata.com
Email: hello@auxodata.com`;
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
      <p>Dear ${escapeHtml(name)},</p>
      <p>We have received your message and appreciate you taking the time to contact AUXO Data Labs.</p>
      <p>Our team will review your inquiry and get back to you within <strong>24-48 hours</strong>.</p>

      <div class="message-box">
        <strong>Your Message:</strong><br><br>
        ${escapeHtml(message).replace(/\n/g, '<br>')}
      </div>

      <p>In the meantime, feel free to explore our <a href="https://auxodata.com/services" style="color: #A3E635;">services</a> and <a href="https://auxodata.com/blog" style="color: #A3E635;">blog</a> for insights on data analytics.</p>

      <p>Best regards,<br><strong>The AUXO Data Labs Team</strong></p>
    </div>
    <div class="footer">
      <strong>AUXO Data Labs</strong><br>
      A New Data Analytics Consultancy in Dubai, UAE<br><br>
      <a href="https://auxodata.com">Website</a> |
      <a href="mailto:hello@auxodata.com">Email</a>
    </div>
  </div>
</body>
</html>`;

      // Send confirmation email to user
      try {
        await apiInstance.sendTransacEmail(confirmationEmail);
        emailsSent.confirmation = true;
      } catch (confirmationError) {
        const errorMessage = confirmationError instanceof Error ? confirmationError.message : 'Unknown error';
        const errorStatus = (confirmationError as { statusCode?: number })?.statusCode;
        
        console.error('Error sending confirmation email:', {
          error: errorMessage,
          statusCode: errorStatus,
          email,
          timestamp: new Date().toISOString(),
          ...(import.meta.env.DEV && { details: confirmationError })
        });
        // Continue processing - form submission was received
      }

      // If user opted in for newsletter, subscribe them
      if (newsletter && email) {
        try {
          const contactsApi = new brevo.ContactsApi();
          contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, BREVO_API_KEY!);

          const contact = new brevo.CreateContact();
          contact.email = email;
          contact.listIds = [2]; // Newsletter list ID
          contact.attributes = {
            SOURCE: 'Contact Form',
            SUBSCRIBED_AT: new Date().toISOString(),
            NAME: name,
            COMPANY: company || '',
          };
          contact.updateEnabled = true;

          await contactsApi.createContact(contact);
        } catch (newsletterError) {
          // Log but don't fail - newsletter subscription is optional
          const errorMessage = newsletterError instanceof Error ? newsletterError.message : 'Unknown error';
          const errorStatus = (newsletterError as { statusCode?: number })?.statusCode;
          
          console.error('Failed to subscribe user to newsletter:', {
            error: errorMessage,
            statusCode: errorStatus,
            email,
            timestamp: new Date().toISOString(),
            ...(import.meta.env.DEV && { details: newsletterError })
          });
        }
      }

    } catch (emailError) {
      // Enhanced error logging for unexpected errors
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
      const errorStatus = (emailError as { statusCode?: number })?.statusCode;
      
      console.error('Unexpected email error:', {
        error: errorMessage,
        statusCode: errorStatus,
        email,
        timestamp: new Date().toISOString(),
        ...(import.meta.env.DEV && { details: emailError })
      });
      
      // Log the error but don't fail the request - form submission was valid
      // In production, you might want to store submissions in a database
      // as a backup if email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! We\'ve received your message and will get back to you within 24 hours.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      // Get the first validation error message (user-friendly)
      const firstError = error.errors[0];
      const friendlyMessage = firstError?.message || 'Please check your form and try again.';
      
      return new Response(
        JSON.stringify({
          success: false,
          error: friendlyMessage,
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

    // Enhanced error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contact form error:', {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      ...(import.meta.env.DEV && { details: error })
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Oops! Something went wrong on our end. Please try again in a moment, or contact us directly at hello@auxodata.com.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
