import type { APIRoute } from 'astro';
import { newsletterSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { ZodError } from 'zod';

/**
 * Newsletter Subscription API Endpoint
 *
 * TODO: Integrate with email marketing platform
 * - Mailchimp: https://mailchimp.com/
 * - ConvertKit: https://convertkit.com/
 * - SendGrid Marketing Campaigns: https://sendgrid.com/
 * - Brevo (formerly Sendinblue): https://www.brevo.com/
 *
 * TODO: Implement double opt-in for GDPR/UAE PDPL compliance
 * TODO: Add spam protection
 */

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

    // TODO: Replace this with actual email marketing platform integration
    // Log only in development mode
    if (import.meta.env.DEV) {
      console.log('Newsletter subscription:', {
        email,
        consent,
        timestamp: new Date().toISOString(),
        source: 'website'
      });
    }

    // TODO: Add to email marketing platform
    // Example with Mailchimp:
    // await mailchimp.lists.addListMember(AUDIENCE_ID, {
    //   email_address: email,
    //   status: 'pending', // Double opt-in
    //   merge_fields: {
    //     SOURCE: 'Website'
    //   }
    // });

    // TODO: Send double opt-in confirmation email
    // TODO: Log subscription in database

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
