import type { APIRoute } from 'astro';
import { contactFormSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { sendEmail, createOrUpdateContact, subscribeToList } from '../../utils/maileroo';
import {
  getContactNotificationEmail,
  getContactConfirmationEmail,
} from '../../utils/emailTemplates';
import {
  logError,
  createErrorResponse,
  createSuccessResponse,
  handleValidationError,
} from '../../utils/errorHandler';

/**
 * Contact Form API Endpoint
 *
 * Integrations:
 * - ✅ Maileroo for email delivery
 * - ✅ Zod validation
 * - ✅ Rate limiting
 * - ✅ Honeypot spam protection
 *
 * TODO: Add reCAPTCHA for additional spam protection
 * TODO: Store submissions in database/CRM
 */

// Initialize Maileroo
const MAILEROO_API_KEY = import.meta.env.MAILEROO_API_KEY;
const FROM_EMAIL = import.meta.env.MAILEROO_FROM_EMAIL || 'hello@auxodata.com';
const FROM_NAME = import.meta.env.MAILEROO_FROM_NAME || 'AUXO Data Labs';
const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@auxodata.com';
const NEWSLETTER_LIST_ID = Number(import.meta.env.MAILEROO_NEWSLETTER_LIST_ID) || 1995;

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

    // Send email notification using Maileroo
    if (!MAILEROO_API_KEY) {
      console.error('Maileroo API key not configured');
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
      // Generate email templates
      const notificationEmail = getContactNotificationEmail({
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
        clientIP: getClientIP(request),
      });

      // Send notification email to business
      try {
        await sendEmail({
          from: { email: FROM_EMAIL, name: FROM_NAME },
          to: [{ email: CONTACT_EMAIL }],
          subject: `🔔 New Contact Form Submission from ${name}`,
          html: notificationEmail.html,
          plain: notificationEmail.plain,
          replyTo: { email: email, name: name },
        });
        emailsSent.notification = true;
      } catch (notificationError) {
        logError('Error sending notification email', notificationError, { email });
        // Continue processing - we still want to send confirmation and process newsletter
      }

      // Generate confirmation email
      const confirmationEmail = getContactConfirmationEmail({ name, message });

      // Send confirmation email to user
      try {
        await sendEmail({
          from: { email: FROM_EMAIL, name: FROM_NAME },
          to: [{ email: email, name: name }],
          subject: 'Thanks for contacting AUXO Data Labs',
          html: confirmationEmail.html,
          plain: confirmationEmail.plain,
        });
        emailsSent.confirmation = true;
      } catch (confirmationError) {
        logError('Error sending confirmation email', confirmationError, { email });
        // Continue processing - form submission was received
      }

      // If user opted in for newsletter, subscribe them
      if (newsletter && email) {
        try {
          await createOrUpdateContact(email, {
            SOURCE: 'Contact Form',
            SUBSCRIBED_AT: new Date().toISOString(),
            NAME: name,
            COMPANY: company || '',
          });
          await subscribeToList(email, NEWSLETTER_LIST_ID);
        } catch (newsletterError) {
          // Log but don't fail - newsletter subscription is optional
          logError('Failed to subscribe user to newsletter', newsletterError, { email });
        }
      }

    } catch (emailError) {
      // Log the error but don't fail the request - form submission was valid
      logError('Unexpected email error', emailError, { email });
      // In production, you might want to store submissions in a database
      // as a backup if email fails
    }

    return createSuccessResponse(
      'Thank you! We\'ve received your message and will get back to you within 24 hours.'
    );

  } catch (error) {
    // Handle Zod validation errors
    const validationError = handleValidationError(error);
    if (validationError) return validationError;

    // Enhanced error logging
    logError('Contact form error', error);

    return createErrorResponse(
      'Oops! Something went wrong on our end. Please try again in a moment, or contact us directly at hello@auxodata.com.',
      500
    );
  }
};
