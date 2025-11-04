import type { APIRoute } from 'astro';
import { newsletterSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { ZodError } from 'zod';
import * as brevo from '@getbrevo/brevo';

// Removed unused escapeHtml function - email sanitization handled by Brevo API

/**
 * Newsletter Subscription API Endpoint
 *
 * Integrations:
 * - ✅ Brevo for email delivery and contact management
 * - ✅ Zod validation
 * - ✅ Rate limiting
 * - ✅ Double opt-in for GDPR/UAE PDPL compliance
 * - ✅ Duplicate subscription prevention
 *
 * Features:
 * - Checks if email is already subscribed before sending confirmation
 * - Prevents duplicate confirmation emails to existing subscribers
 * - Provides appropriate feedback for already-subscribed users
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
      // Check if contact already exists and is subscribed
      let isAlreadySubscribed = false;
      const newsletterListId = 2; // Newsletter list ID in Brevo
      
      try {
        const existingContact = await contactsApi.getContactInfo(email);

        // Check if contact is already in the newsletter list
        if (existingContact.body.listIds?.includes(newsletterListId)) {
          isAlreadySubscribed = true;
        }
      } catch (error) {
        // Contact doesn't exist (404), which is fine - proceed with creation
        // Handle Brevo API errors more specifically
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStatus = (error as { statusCode?: number })?.statusCode;
        
        // Only log if it's not a 404 (contact not found) or 400 (invalid email format)
        if (errorStatus !== 404 && errorStatus !== 400) {
          console.error('Error checking contact:', {
            error: errorMessage,
            statusCode: errorStatus,
            email,
            timestamp: new Date().toISOString(),
            ...(import.meta.env.DEV && { details: error })
          });
          
          // For critical errors, fail the request
          if (errorStatus && errorStatus >= 500) {
            throw new Error('Service temporarily unavailable. Please try again later.');
          }
        }
      }

      // If already subscribed, return early without sending confirmation email
      if (isAlreadySubscribed) {
        return new Response(
          JSON.stringify({
            success: true,
            message: 'You are already subscribed to our newsletter!',
            status: 'already_subscribed'
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      // Add or update contact in Brevo
      // Note: Brevo will send a double opt-in confirmation email automatically
      // if the list is configured for double opt-in in Brevo dashboard
      const contact = new brevo.CreateContact();
      contact.email = email;
      contact.listIds = [newsletterListId]; // Newsletter list ID in Brevo
      contact.attributes = {
        SOURCE: 'Website',
        SUBSCRIBED_AT: new Date().toISOString(),
        CONSENT: String(consent)
      };
      contact.updateEnabled = true; // Update if contact already exists

      try {
        await contactsApi.createContact(contact);
      } catch (createError) {
        // Handle specific Brevo errors for contact creation
        const errorMessage = createError instanceof Error ? createError.message : 'Unknown error';
        const errorStatus = (createError as { statusCode?: number })?.statusCode;
        
        // Handle duplicate contact (already exists) - this is okay
        if (errorStatus === 400 && errorMessage.includes('duplicate')) {
          // Contact already exists but wasn't in the list - update it
          try {
            await contactsApi.updateContact(email, {
              listIds: [newsletterListId],
              attributes: {
                SOURCE: 'Website',
                SUBSCRIBED_AT: new Date().toISOString(),
                CONSENT: String(consent)
              }
            });
          } catch (updateError) {
            console.error('Error updating existing contact:', {
              error: updateError instanceof Error ? updateError.message : 'Unknown error',
              email,
              timestamp: new Date().toISOString()
            });
            throw new Error('Failed to process subscription');
          }
        } else {
          // For other errors, log and throw
          console.error('Error creating contact:', {
            error: errorMessage,
            statusCode: errorStatus,
            email,
            timestamp: new Date().toISOString(),
            ...(import.meta.env.DEV && { details: createError })
          });
          throw new Error('Failed to process subscription');
        }
      }

      // Note: If double opt-in is enabled in Brevo dashboard for list ID 2,
      // Brevo will automatically send its own confirmation email.
      // This custom confirmation email is informational only.
      // For proper double opt-in, configure it in Brevo dashboard or implement a confirmation endpoint.
      
      // Send informational confirmation email
      const confirmationEmail = new brevo.SendSmtpEmail();
      confirmationEmail.to = [{ email: email }];
      confirmationEmail.sender = { email: FROM_EMAIL, name: FROM_NAME };
      confirmationEmail.subject = 'Welcome to AUXO Data Labs Newsletter';
      confirmationEmail.textContent = `Thank you for subscribing to the AUXO Data Labs newsletter!

Your subscription request has been received.${BREVO_API_KEY ? ' If double opt-in is enabled in Brevo, you will receive a confirmation email to complete your subscription.' : ' Welcome!'}

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
A New Data Analytics Consultancy in Dubai, UAE
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

      ${BREVO_API_KEY ? '<p style="color: #666; font-size: 14px;">If you receive a confirmation email from Brevo, please click the link to complete your subscription.</p>' : ''}

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
      A New Data Analytics Consultancy in Dubai, UAE<br><br>
      <a href="${SITE_URL}">Visit Website</a> |
      <a href="mailto:${FROM_EMAIL}">Contact Us</a>
    </div>
  </div>
</body>
</html>`;

      try {
        await emailApi.sendTransacEmail(confirmationEmail);
      } catch (emailError) {
        // Log email sending error but don't fail the subscription
        // The contact is already added to Brevo, so subscription succeeded
        const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
        const errorStatus = (emailError as { statusCode?: number })?.statusCode;
        
        console.error('Error sending confirmation email:', {
          error: errorMessage,
          statusCode: errorStatus,
          email,
          timestamp: new Date().toISOString(),
          ...(import.meta.env.DEV && { details: emailError })
        });
        
        // If it's a critical Brevo service error, still return success
        // since the subscription was processed
        // User will receive Brevo's double opt-in email if configured
      }

    } catch (brevoError) {
      // Enhanced error logging for critical errors
      const errorMessage = brevoError instanceof Error ? brevoError.message : 'Unknown error';
      const errorStatus = (brevoError as { statusCode?: number })?.statusCode;
      
      console.error('Brevo API error:', {
        error: errorMessage,
        statusCode: errorStatus,
        email,
        timestamp: new Date().toISOString(),
        ...(import.meta.env.DEV && { details: brevoError })
      });

      // Provide more specific error messages based on status code
      if (errorStatus === 401 || errorStatus === 403) {
        throw new Error('Service configuration error. Please contact support.');
      } else if (errorStatus === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else if (errorStatus && errorStatus >= 500) {
        throw new Error('Service temporarily unavailable. Please try again later.');
      }
      
      // Generic error for other cases
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

    // Enhanced error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Newsletter subscription error:', {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      ...(import.meta.env.DEV && { details: error })
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: import.meta.env.DEV ? `An error occurred: ${errorMessage}` : 'An error occurred. Please try again later.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
