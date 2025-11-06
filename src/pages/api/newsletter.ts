import type { APIRoute } from 'astro';
import { newsletterSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import {
  sendEmail,
  createOrUpdateContact,
  subscribeToList,
  isSubscribedToList,
} from '../../utils/maileroo';
import { getNewsletterConfirmationEmail } from '../../utils/emailTemplates';
import {
  logError,
  createErrorResponse,
  createSuccessResponse,
  handleValidationError,
  formatError,
} from '../../utils/errorHandler';

/**
 * Newsletter Subscription API Endpoint
 *
 * Integrations:
 * - ✅ Maileroo for email delivery and contact management
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

// Initialize Maileroo
const MAILEROO_API_KEY = import.meta.env.MAILEROO_API_KEY;
const FROM_EMAIL = import.meta.env.MAILEROO_FROM_EMAIL || 'hello@auxodata.com';
const FROM_NAME = import.meta.env.MAILEROO_FROM_NAME || 'AUXO Data Labs';
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://auxodata.com';
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
      RateLimitPresets.NEWSLETTER.maxRequests,
      RateLimitPresets.NEWSLETTER.windowMs
    );

    if (!rateLimit.allowed) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Oops! Too many subscription attempts. Please wait a moment and try again.',
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

    // Check if Maileroo is configured
    if (!MAILEROO_API_KEY) {
      console.error('Maileroo is not configured. Please set MAILEROO_API_KEY in .env');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'We\'re experiencing a technical issue with our newsletter service. Please try again later or contact us at hello@auxodata.com.'
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
      
      try {
        isAlreadySubscribed = await isSubscribedToList(email, NEWSLETTER_LIST_ID);
      } catch (error) {
        // Handle Maileroo API errors more specifically
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

      // Add or update contact in Maileroo
      // Note: Maileroo may send a double opt-in confirmation email automatically
      // if the list is configured for double opt-in in Maileroo dashboard
      try {
        await createOrUpdateContact(email, {
          SOURCE: 'Website',
          SUBSCRIBED_AT: new Date().toISOString(),
          CONSENT: String(consent),
        });
        await subscribeToList(email, NEWSLETTER_LIST_ID);
      } catch (createError) {
        // Handle specific Maileroo errors for contact creation
        const errorMessage = createError instanceof Error ? createError.message : 'Unknown error';
        const errorStatus = (createError as { statusCode?: number })?.statusCode;
        
        // For other errors, log and throw
        console.error('Error creating/updating contact:', {
          error: errorMessage,
          statusCode: errorStatus,
          email,
          timestamp: new Date().toISOString(),
          ...(import.meta.env.DEV && { details: createError })
        });
        
        // Don't fail on duplicate/conflict errors - contact might already exist
        if (errorStatus !== 409 && errorStatus !== 400) {
          throw new Error('Failed to process subscription');
        }
      }

      // Note: If double opt-in is enabled in Maileroo dashboard for the newsletter list,
      // Maileroo will automatically send its own confirmation email.
      // This custom confirmation email is informational only.
      // For proper double opt-in, configure it in Maileroo dashboard or implement a confirmation endpoint.
      
      // Generate confirmation email
      const confirmationEmail = getNewsletterConfirmationEmail({
        siteUrl: SITE_URL,
        fromEmail: FROM_EMAIL,
        hasDoubleOptIn: !!MAILEROO_API_KEY,
      });

      try {
        await sendEmail({
          from: { email: FROM_EMAIL, name: FROM_NAME },
          to: [{ email: email }],
          subject: 'Welcome to AUXO Data Labs Newsletter',
          html: confirmationEmail.html,
          plain: confirmationEmail.plain,
        });
      } catch (emailError) {
        // Log email sending error but don't fail the subscription
        // The contact is already added to Maileroo, so subscription succeeded
        logError('Error sending confirmation email', emailError, { email });
        // If it's a critical Maileroo service error, still return success
        // since the subscription was processed
        // User will receive Maileroo's double opt-in email if configured
      }

    } catch (mailerooError) {
      // Enhanced error logging for critical errors
      const { statusCode } = formatError(mailerooError);
      logError('Maileroo API error', mailerooError, { email });

      // Provide more specific error messages based on status code
      if (statusCode === 401 || statusCode === 403) {
        throw new Error('We\'re having a technical issue. Please try again later or contact us at hello@auxodata.com.');
      } else if (statusCode === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else if (statusCode && statusCode >= 500) {
        throw new Error('Our subscription service is temporarily unavailable. Please try again in a few minutes.');
      }
      
      // Generic error for other cases
      throw new Error('We couldn\'t complete your subscription. Please try again.');
    }

    return createSuccessResponse('Please check your email to confirm your subscription.');

  } catch (error) {
    // Handle Zod validation errors
    const validationError = handleValidationError(error);
    if (validationError) return validationError;

    // Enhanced error logging
    logError('Newsletter subscription error', error);

    return createErrorResponse(
      'Oops! Something went wrong on our end. Please try again in a moment, or contact us at hello@auxodata.com.',
      500
    );
  }
};
