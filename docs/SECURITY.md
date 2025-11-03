# Security

This document outlines security features, best practices, and guidelines for the AUXO Data Labs website.

---

## Overview

The project implements multiple layers of security for forms, API endpoints, and overall site protection.

---

## Input Validation

### Implementation

**Location:** `src/utils/validation.ts`

**Library:** Zod (type-safe schema validation)

**Schemas:**
- `contactFormSchema`: Validates contact form submissions
- `newsletterSchema`: Validates newsletter signups

### Features

- **Type-Safe Validation:** TypeScript + Zod ensures type safety
- **Detailed Error Messages:** Clear validation error messages
- **Length Constraints:** Prevents abuse through length limits
- **Format Validation:** Email format, name patterns, etc.
- **Honeypot Field:** Spam detection for contact forms
- **Sanitization:** Special characters sanitized in validation

### Usage

```typescript
import { contactFormSchema, newsletterSchema } from '@/utils/validation';

// Validate contact form
const result = contactFormSchema.safeParse(formData);
if (!result.success) {
  // Handle validation errors
}

// Validate newsletter
const result = newsletterSchema.safeParse({ email, consent });
```

---

## Rate Limiting

### Implementation

**Location:** `src/utils/rateLimit.ts`

**Type:** In-memory sliding window rate limiter

**Features:**
- IP-based tracking
- Automatic cleanup of expired entries
- HTTP 429 responses with Retry-After headers
- Configurable presets per endpoint

### Presets

**Contact Form (`contactForm`):**
- Limit: 3 requests per 30 minutes (1800 seconds)
- Purpose: Prevent spam submissions

**Newsletter (`newsletter`):**
- Limit: 2 requests per hour (3600 seconds)
- Purpose: Prevent abuse and duplicate subscriptions

### Usage

```typescript
import { rateLimit } from '@/utils/rateLimit';

const result = await rateLimit('contactForm', request);
if (!result.allowed) {
  return new Response(
    JSON.stringify({ error: 'Too many requests' }),
    {
      status: 429,
      headers: { 'Retry-After': result.retryAfter.toString() },
    }
  );
}
```

---

## Security Headers

### Configuration

**Location:** `public/_headers`

**Deployment:**
- **Netlify:** Automatic (reads `_headers` file)
- **GitHub Pages:** Requires manual configuration

### Headers Configured

#### Content-Security-Policy (CSP)

**Purpose:** Restricts resource loading to trusted sources

**Current Configuration:**
- Uses `'unsafe-inline'` for scripts and styles due to:
  - Astro's ViewTransitions
  - Client-side interactive components
- **Future Enhancement:** Nonce-based CSP implementation planned
- **Note:** Documented in `_headers` with enhancement path

#### X-Frame-Options

**Value:** `DENY`

**Purpose:** Prevents clickjacking attacks

#### X-Content-Type-Options

**Value:** `nosniff`

**Purpose:** Prevents MIME-type sniffing

#### X-XSS-Protection

**Value:** `1; mode=block`

**Purpose:** Enables browser XSS protection

#### Strict-Transport-Security (HSTS)

**Value:** `max-age=31536000; includeSubDomains; preload`

**Purpose:** Enforces HTTPS (1 year, includes subdomains, preload)

#### Referrer-Policy

**Value:** `strict-origin-when-cross-origin`

**Purpose:** Controls referrer information sent

#### Permissions-Policy

**Purpose:** Restricts browser features

**Restrictions:**
- Geolocation: disabled
- Microphone: disabled
- Camera: disabled

---

## Environment-Based Logging

### Practices

- **Development Only:** Console.log statements only execute in development mode
- **No Sensitive Data:** Sensitive data never logged
- **Error Logging:** Errors logged for debugging in development only

### Implementation

```typescript
if (import.meta.env.DEV) {
  console.log('Debug information');
}

// Never log sensitive data
// DON'T: console.log(apiKey, userEmail);
```

---

## API Endpoint Security

### Contact Form (`/api/contact`)

**Security Measures:**
- Zod validation for all fields
- Honeypot field for spam detection
- Rate limiting: 3 requests per 30 minutes
- Input sanitization

**Flow:**
1. Validate input
2. Check rate limits
3. Send emails via Brevo
4. Return response

### Newsletter (`/api/newsletter`)

**Security Measures:**
- Zod validation for email and consent
- Rate limiting: 2 requests per hour
- Duplicate subscription prevention

**Flow:**
1. Validate input
2. Check rate limits
3. Check for existing subscription
4. Add to Brevo list or return existing status

---

## Data Protection

### Sensitive Data Handling

**Never:**
- Commit API keys or tokens
- Log sensitive information
- Expose credentials in code
- Store secrets in client-side code

**Always:**
- Use environment variables for secrets
- Keep `.env` files in `.gitignore`
- Never commit `.cursor/mcp.json` (MCP configuration)
- Use server-side validation for all inputs

---

## MCP Server Security

### Configuration Files

**Location:** `.cursor/mcp.json`

**Git Status:** Must NEVER be committed (in `.gitignore`)

**Contains:**
- GitHub Personal Access Tokens
- API keys
- Other sensitive tokens

### Security Rules

- **NEVER commit:** `.cursor/mcp.json` or `.cursor/` directory
- **Local Only:** All MCP configuration is local-only
- **Token Protection:** Never expose MCP tokens in code, commits, or documentation
- **Rate Limits:** Be mindful of GitHub MCP server rate limits

---

## Brevo Email Security

### Requirements

**Verified Sender Email:**
- `BREVO_FROM_EMAIL` must be verified in Brevo dashboard
- Emails will not send with unverified addresses
- Verification required before deployment

**API Key:**
- Store `BREVO_API_KEY` in environment variables
- Never commit API key to repository
- Rotate keys if compromised

---

## Content Security

### XSS Prevention

- Input validation and sanitization
- Output encoding in templates
- CSP headers (current implementation with future nonce enhancement)

### CSRF Protection

- API endpoints use POST requests
- State tokens for forms (where applicable)
- Same-origin policy enforced

---

## File Upload Security

### Current Status

No file upload functionality currently implemented.

**If Added in Future:**
- Validate file types and sizes
- Sanitize file names
- Store uploaded files outside web root
- Scan for malware
- Use secure file storage

---

## Dependency Security

### Best Practices

- **Regular Updates:** Keep dependencies up to date
- **Security Audits:** Run `npm audit` regularly
- **Lock File:** Commit `package-lock.json` for reproducible builds
- **Vulnerability Monitoring:** Monitor security advisories

### Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities (if possible)
npm audit fix

# Review security advisories
npm audit --json
```

---

## Security Checklist

Before deployment:

- [ ] All environment variables configured correctly
- [ ] Brevo sender email verified
- [ ] Security headers up to date in `public/_headers`
- [ ] No sensitive data in code or commits
- [ ] API endpoints have validation and rate limiting
- [ ] Input validation implemented for all forms
- [ ] Error messages don't expose sensitive information
- [ ] Dependencies are up to date
- [ ] No vulnerabilities in `npm audit`
- [ ] `.env` files not committed
- [ ] `.cursor/mcp.json` not committed

---

## Security Incident Response

### If Security Issue Found

1. **Assess:** Determine severity and scope
2. **Contain:** Limit impact (disable affected features if needed)
3. **Fix:** Resolve the issue
4. **Verify:** Test the fix
5. **Document:** Update security documentation if needed
6. **Monitor:** Watch for similar issues

### Reporting Security Issues

- Report privately to maintainers
- Do not create public issues for security vulnerabilities
- Provide detailed information about the issue

---

## Additional Resources

- **API Endpoints:** See `API_ENDPOINTS.md` for endpoint security
- **Environment Variables:** See `ENVIRONMENT_VARIABLES.md` for configuration
- **Deployment:** See `DEPLOYMENT.md` for deployment security
- **Agent Rules:** See `AGENT_RULES.md` for security guidelines

