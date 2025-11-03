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

  phone: z.string()
    .max(50, 'Phone number too long')
    .optional()
    .or(z.literal('')),

  industry: z.string()
    .max(100, 'Industry name too long')
    .optional()
    .or(z.literal('')),

  companySize: z.string()
    .max(50, 'Company size value too long')
    .optional()
    .or(z.literal('')),

  role: z.string()
    .max(100, 'Role name too long')
    .optional()
    .or(z.literal('')),

  services: z.array(z.string())
    .optional()
    .default([]),

  timeline: z.string()
    .max(50, 'Timeline value too long')
    .optional()
    .or(z.literal('')),

  budget: z.string()
    .max(50, 'Budget value too long')
    .optional()
    .or(z.literal('')),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),

  hearAbout: z.string()
    .max(100, 'Source value too long')
    .optional()
    .or(z.literal('')),

  newsletter: z.boolean()
    .optional()
    .default(false),

  timestamp: z.string().optional(),

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
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function isValidEmail(email: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return EMAIL_REGEX.test(email);
}
