import { z } from 'zod';

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Please enter at least 2 characters for your name')
    .max(100, 'Name is too long (max 100 characters)')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z.string()
    .email('Please enter a valid email address (e.g., name@company.com)')
    .max(255, 'Email address is too long'),

  company: z.string()
    .min(2, 'Please enter your company name (at least 2 characters)')
    .max(200, 'Company name is too long (max 200 characters)')
    .optional()
    .or(z.literal('')), // Allow empty string

  phone: z.string()
    .max(50, 'Phone number is too long')
    .optional()
    .or(z.literal('')),

  industry: z.string()
    .max(100, 'Industry name is too long')
    .optional()
    .or(z.literal('')),

  companySize: z.string()
    .max(50, 'Company size value is too long')
    .optional()
    .or(z.literal('')),

  role: z.string()
    .max(100, 'Role name is too long')
    .optional()
    .or(z.literal('')),

  services: z.array(z.string())
    .optional()
    .default([]),

  timeline: z.string()
    .max(50, 'Timeline value is too long')
    .optional()
    .or(z.literal('')),

  budget: z.string()
    .max(50, 'Budget value is too long')
    .optional()
    .or(z.literal('')),

  message: z.string()
    .min(10, 'Please provide more details (at least 10 characters)')
    .max(5000, 'Message is too long (max 5000 characters)'),

  hearAbout: z.string()
    .max(100, 'Source value is too long')
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
    .email('Please enter a valid email address (e.g., name@company.com)')
    .max(255, 'Email address is too long'),

  consent: z.boolean()
    .refine((val) => val === true, {
      message: 'Please consent to receive our newsletter',
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
