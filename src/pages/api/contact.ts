import type { APIRoute } from 'astro';
import { contactFormSchema } from '../../utils/validation';
import { checkRateLimit, getClientIP, RateLimitPresets } from '../../utils/rateLimit';
import { ZodError } from 'zod';

/**
 * Contact Form API Endpoint
 *
 * TODO: Integrate with actual email service
 * - SendGrid: https://sendgrid.com/
 * - AWS SES: https://aws.amazon.com/ses/
 * - Postmark: https://postmarkapp.com/
 *
 * TODO: Add spam protection (reCAPTCHA, etc.)
 * TODO: Store submissions in database/CRM
 */

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

    // TODO: Replace this with actual email service integration
    // Log only in development mode (intentional dev-only logging)
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

    // TODO: Send email using service of choice
    // Example with SendGrid:
    // await sendgrid.send({
    //   to: 'hello@auxodata.ae',
    //   from: 'noreply@auxodata.ae',
    //   subject: `New Contact Form Submission from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`
    // });

    // TODO: Send confirmation email to user
    // TODO: Add to CRM/database

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
