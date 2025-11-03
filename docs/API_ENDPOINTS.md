# API Endpoints

This document describes all API endpoints, their functionality, security measures, and integration details.

---

## Overview

The project includes server-side API endpoints in `src/pages/api/` with comprehensive validation and rate limiting. All endpoints use Zod for validation and implement IP-based rate limiting.

---

## `/api/contact`

### Purpose

Handles submissions from the multi-step contact form and sends emails via Brevo.

### Request

**Method:** `POST`

**Content-Type:** `application/json`

**Body Schema:**
```typescript
{
  // Step 1: Personal Information
  firstName: string;        // Required, 1-50 characters
  lastName: string;         // Required, 1-50 characters
  email: string;            // Required, valid email format
  phone?: string;           // Optional, 10-20 characters
  
  // Step 2: Company Information
  company: string;          // Required, 1-100 characters
  jobTitle?: string;        // Optional, 1-100 characters
  companySize?: string;     // Optional, predefined options
  
  // Step 3: Project Details
  projectType: string;      // Required, predefined options
  budgetRange?: string;     // Optional, predefined options
  timeline?: string;       // Optional, predefined options
  
  // Step 4: Services Interest
  services: string[];       // Required, at least one service
  additionalServices?: string; // Optional, 0-500 characters
  
  // Step 5: Additional Information
  message?: string;         // Optional, 0-2000 characters
  source?: string;         // Optional, how they found us
  
  // Security
  honeypot?: string;        // Honeypot field for spam detection (must be empty)
}
```

### Security Measures

1. **Zod Validation:** All fields validated with detailed error messages
2. **Honeypot Field:** Spam detection (form submission rejected if honeypot field has value)
3. **Rate Limiting:** 3 requests per 30 minutes per IP address
4. **Input Sanitization:** Special characters sanitized in validation

### Flow

1. Validate input using Zod schema (`contactFormSchema`)
2. Check rate limits (IP-based)
3. Send confirmation email to user via Brevo
4. Send notification email to business (`CONTACT_EMAIL`) via Brevo
5. Return success response

### Response Codes

- **200:** Success - Form submitted and emails sent
- **400:** Validation error - Invalid input data
- **429:** Rate limited - Too many requests (includes `Retry-After` header)
- **500:** Server error - Email sending failed or other server error

### Response Format

**Success (200):**
```json
{
  "success": true,
  "message": "Thank you for your inquiry. We'll be in touch soon."
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format"
  }
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "retryAfter": 1800
}
```

### Integration

- **Backend:** `src/pages/api/contact.ts`
- **Validation:** `src/utils/validation.ts` (`contactFormSchema`)
- **Rate Limiting:** `src/utils/rateLimit.ts` (preset: `contactForm`)
- **Email Service:** Brevo API
- **Frontend:** `src/components/MultiStepForm.astro`

### Environment Variables Required

- `BREVO_API_KEY`: Brevo API key
- `BREVO_FROM_EMAIL`: Verified sender email (must be verified in Brevo dashboard)
- `BREVO_FROM_NAME`: Display name for sender
- `CONTACT_EMAIL`: Email address to receive contact form submissions

---

## `/api/newsletter`

### Purpose

Handles newsletter subscriptions with duplicate prevention and double opt-in confirmation.

### Request

**Method:** `POST`

**Content-Type:** `application/json`

**Body Schema:**
```typescript
{
  email: string;            // Required, valid email format
  consent: boolean;        // Required, must be true
}
```

### Security Measures

1. **Zod Validation:** Email format and consent validation
2. **Rate Limiting:** 2 requests per hour per IP address
3. **Duplicate Prevention:** Checks if email already exists in Brevo list
4. **Double Opt-In:** Sends confirmation email to subscriber

### Flow

1. Validate input using Zod schema (`newsletterSchema`)
2. Check rate limits (IP-based)
3. Check if email already exists in Brevo list (ID: 2)
4. If new: Add contact to Brevo list and send confirmation email
5. If existing: Return success (already subscribed)
6. Return appropriate response

### Features

- **Duplicate Check:** Prevents multiple subscriptions from same email
- **Double Opt-In:** Confirmation email sent to subscriber
- **Brevo Integration:** Contacts added to Brevo list (ID: 2)
- **Consent Required:** Explicit consent must be provided

### Response Codes

- **200:** Success - Subscribed or already subscribed
- **400:** Validation error - Invalid email or missing consent
- **429:** Rate limited - Too many requests (includes `Retry-After` header)
- **500:** Server error - Brevo API error or other server error

### Response Format

**Success (200):**
```json
{
  "success": true,
  "message": "Thank you for subscribing! Please check your email to confirm."
}
```

**Already Subscribed (200):**
```json
{
  "success": true,
  "message": "You're already subscribed to our newsletter."
}
```

**Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "consent": "Consent is required"
  }
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "retryAfter": 3600
}
```

### Integration

- **Backend:** `src/pages/api/newsletter.ts`
- **Validation:** `src/utils/validation.ts` (`newsletterSchema`)
- **Rate Limiting:** `src/utils/rateLimit.ts` (preset: `newsletter`)
- **Email Service:** Brevo API
- **Frontend:** `src/components/Footer.astro` (newsletter signup form)

### Environment Variables Required

- `BREVO_API_KEY`: Brevo API key
- `BREVO_FROM_EMAIL`: Verified sender email (must be verified in Brevo dashboard)
- `BREVO_FROM_NAME`: Display name for sender

### Brevo List Configuration

- **List ID:** 2
- **Purpose:** Newsletter subscribers
- **Double Opt-In:** Enabled

---

## Rate Limiting

### Implementation

- **Location:** `src/utils/rateLimit.ts`
- **Type:** In-memory sliding window rate limiter
- **Tracking:** IP-based
- **Cleanup:** Automatic cleanup of expired entries

### Presets

**Contact Form (`contactForm`):**
- Limit: 3 requests
- Window: 30 minutes (1800 seconds)

**Newsletter (`newsletter`):**
- Limit: 2 requests
- Window: 1 hour (3600 seconds)

### Response Headers

Rate-limited responses include:
- `Retry-After`: Number of seconds to wait before retrying

---

## Validation

### Implementation

- **Location:** `src/utils/validation.ts`
- **Library:** Zod
- **Schemas:** `contactFormSchema`, `newsletterSchema`

### Features

- Type-safe validation
- Detailed error messages
- Length constraints
- Format validation (email, name patterns)
- Honeypot field support (contact form)
- Sanitization of special characters

---

## Error Handling

### Standard Error Responses

All endpoints follow consistent error response format:
```json
{
  "success": false,
  "error": "Error message",
  "details": {}  // Optional, field-specific errors
}
```

### Logging

- Console.log statements only execute in development mode
- Sensitive data never logged
- Errors logged for debugging in development

---

## Security Considerations

### Input Validation

- All inputs validated with Zod schemas
- Type checking prevents injection attacks
- Length constraints prevent DoS attacks

### Rate Limiting

- Prevents abuse and spam
- IP-based tracking
- Configurable limits per endpoint

### Honeypot

- Contact form includes hidden honeypot field
- Spam bots often fill all fields
- Valid submissions must leave honeypot empty

### Email Verification

- Brevo requires verified sender emails
- `BREVO_FROM_EMAIL` must be verified in Brevo dashboard
- Emails will not send with unverified addresses

---

## Testing

### Local Testing

1. Set up environment variables (see `ENVIRONMENT_VARIABLES.md`)
2. Verify Brevo sender email is verified
3. Test with valid data
4. Test rate limiting (submit multiple requests quickly)
5. Test validation (submit invalid data)
6. Check email delivery in Brevo dashboard

### API Testing

Use tools like:
- Postman
- curl
- Browser developer tools (Network tab)

---

## Troubleshooting

### Common Issues

**Emails Not Sending:**
- Verify `BREVO_FROM_EMAIL` is verified in Brevo dashboard
- Check `BREVO_API_KEY` is correct
- Verify environment variables are set

**Rate Limiting Too Restrictive:**
- Adjust rate limits in `src/utils/rateLimit.ts`
- Use different rate limit presets if needed

**Validation Errors:**
- Check Zod schema in `src/utils/validation.ts`
- Verify request body matches schema
- Check error response for specific field issues

---

## Additional Resources

- **Validation Schemas:** `src/utils/validation.ts`
- **Rate Limiting:** `src/utils/rateLimit.ts`
- **Contact Form:** `src/components/MultiStepForm.astro`
- **Newsletter Form:** `src/components/Footer.astro`
- **Security:** See `SECURITY.md`
- **Environment Variables:** See `ENVIRONMENT_VARIABLES.md`

