import { z } from 'zod';

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long'),

  company: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name too long')
    .optional()
    .or(z.literal('')), // Allow empty string

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),

  // Honeypot field (should be empty)
  website: z.string().max(0).optional(),
});

/**
 * Newsletter Subscription Validation Schema
 */
export const newsletterSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long'),

  consent: z.boolean()
    .refine((val) => val === true, {
      message: 'Consent is required for newsletter subscription',
    })
    .optional()
    .default(true),

  timestamp: z.string().optional(),
});

/**
 * Type exports for use in components and API routes
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Shared email validation regex
 * @deprecated Use Zod schema instead
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Email validation function
 * @deprecated Use Zod schema instead
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
