import type { APIRoute } from 'astro';

/**
 * Contact Form API Endpoint
 *
 * TODO: Integrate with actual email service
 * - SendGrid: https://sendgrid.com/
 * - AWS SES: https://aws.amazon.com/ses/
 * - Postmark: https://postmarkapp.com/
 *
 * TODO: Add validation library (e.g., zod)
 * TODO: Add rate limiting
 * TODO: Add spam protection (reCAPTCHA, etc.)
 * TODO: Store submissions in database/CRM
 */

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Basic validation
    const { name, email, company, message } = data;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // TODO: Replace this with actual email service integration
    console.log('Contact form submission:', {
      name,
      email,
      company,
      message,
      timestamp: new Date().toISOString()
    });

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
