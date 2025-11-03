# Environment Variables

This document describes all environment variables used in the project, their purpose, and configuration requirements.

---

## Overview

Environment variables are used for configuration that varies between environments (development, staging, production) and for sensitive data like API keys.

---

## Setup

### Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required values in `.env`

3. Never commit `.env` to git (already in `.gitignore`)

### Production/Staging

Configure environment variables in:
- **GitHub Pages:** Repository Settings → Secrets
- **Netlify:** Site Settings → Environment Variables

---

## Required Variables

### PUBLIC_SITE_URL

**Type:** String (URL)

**Example:** `https://auxodata.com`

**Purpose:** Base URL for the website

**Usage:**
- SEO meta tags
- Structured data (JSON-LD)
- Social sharing URLs
- Sitemap generation

**Required:** Yes (for production)

---

### BREVO_API_KEY

**Type:** String (API Key)

**Example:** `xkeysib-...`

**Purpose:** Brevo (Sendinblue) API key for email services

**Usage:**
- Contact form email delivery
- Newsletter subscription processing
- Double opt-in confirmation emails

**Required:** Yes (for contact form and newsletter)

**Security:** 
- Never commit to repository
- Store in environment variables only
- Rotate if compromised

---

### BREVO_FROM_EMAIL

**Type:** String (Email Address)

**Example:** `noreply@auxodata.com`

**Purpose:** Verified sender email address for Brevo

**Usage:**
- From address for all emails sent via Brevo
- Must be verified in Brevo dashboard

**Required:** Yes (for email delivery)

**Important:** 
- **MUST be verified in Brevo dashboard before emails can be sent**
- Verification required before deployment
- Emails will fail if address is not verified

---

### BREVO_FROM_NAME

**Type:** String

**Example:** `AUXO Data Labs`

**Purpose:** Display name for email sender

**Usage:**
- Displayed as sender name in email clients
- Appears in "From" field of emails

**Required:** Yes (for email delivery)

---

### CONTACT_EMAIL

**Type:** String (Email Address)

**Example:** `contact@auxodata.com`

**Purpose:** Email address to receive contact form submissions

**Usage:**
- Business receives contact form notifications at this address
- Separate from sender email (BREVO_FROM_EMAIL)

**Required:** Yes (for contact form)

---

## Optional Variables

### PUBLIC_GOOGLE_ANALYTICS_ID

**Type:** String (Measurement ID)

**Example:** `G-XXXXXXXXXX`

**Purpose:** Google Analytics measurement ID

**Usage:**
- Analytics tracking (if implemented)
- Website usage statistics

**Required:** No

**Note:** Currently optional. Implementation depends on analytics requirements.

---

### MAINTENANCE_MODE

**Type:** Boolean (String: "true" or "false")

**Example:** `true`

**Purpose:** Enable maintenance mode

**Usage:**
- Shows maintenance page when set to `true`
- Set during deployments or maintenance windows

**Required:** No

**Implementation:** Uses `astro-maintenance` package

---

## Environment-Specific Configuration

### Development

- Use `.env` file (local development)
- Set `PUBLIC_SITE_URL` to `http://localhost:4321` (or your local URL)
- All Brevo variables required for testing contact forms

### Staging

- Configure in Netlify dashboard
- Use staging domain for `PUBLIC_SITE_URL`
- Use same Brevo credentials (or separate staging account)

### Production

- Configure in GitHub Pages settings (secrets)
- Use production domain for `PUBLIC_SITE_URL`
- Use production Brevo account
- All variables must be set and correct

---

## Variable Access

### In Astro Components

```astro
---
// Public variables (PUBLIC_*)
const siteUrl = import.meta.env.PUBLIC_SITE_URL;

// Server-side only variables
// Note: Server-only variables are not accessible in client-side code
---
```

### In Client-Side Scripts

```javascript
// Only PUBLIC_* variables are accessible
const siteUrl = import.meta.env.PUBLIC_SITE_URL;

// Server-only variables are NOT accessible
// const apiKey = import.meta.env.BREVO_API_KEY; // ❌ Undefined
```

### In API Endpoints

```typescript
// All variables accessible (server-side)
const apiKey = import.meta.env.BREVO_API_KEY;
const fromEmail = import.meta.env.BREVO_FROM_EMAIL;
```

---

## Variable Naming Convention

- **Public Variables:** Prefix with `PUBLIC_` to expose to client-side code
- **Private Variables:** No prefix (server-side only)
- **Naming:** Use uppercase with underscores (e.g., `BREVO_API_KEY`)

---

## Security Best Practices

### DO

- **Use environment variables** for all secrets and API keys
- **Never commit** `.env` files
- **Rotate keys** if compromised
- **Use different keys** for staging and production (if possible)
- **Verify Brevo sender email** before deployment

### DON'T

- **Don't hardcode** API keys or secrets in code
- **Don't commit** environment variables with real values
- **Don't expose** private variables to client-side code
- **Don't share** `.env` files or credentials

---

## Brevo Configuration

### Verification Steps

1. **Sign up/Login:** Create account at [brevo.com](https://brevo.com)
2. **Verify Sender:** Add and verify `BREVO_FROM_EMAIL` in dashboard
3. **Get API Key:** Generate API key in account settings
4. **Configure List:** Set up newsletter list (ID: 2) for subscriptions

### Required Brevo Setup

- **Verified Sender Email:** `BREVO_FROM_EMAIL` must be verified
- **API Key:** `BREVO_API_KEY` must be valid and have permissions
- **Newsletter List:** List ID 2 configured for newsletter subscriptions

### Testing Email Delivery

1. Set up all Brevo environment variables
2. Verify sender email is verified
3. Test contact form submission
4. Check Brevo dashboard for email delivery status
5. Verify emails arrive correctly

---

## Troubleshooting

### Emails Not Sending

**Possible Causes:**
- `BREVO_FROM_EMAIL` not verified in Brevo dashboard
- Invalid `BREVO_API_KEY`
- Missing or incorrect environment variables
- Brevo API errors

**Solutions:**
1. Verify sender email in Brevo dashboard
2. Check API key is correct and has permissions
3. Review Brevo dashboard for error messages
4. Check environment variables are set correctly

### Missing Variables

**Error:** `undefined` when accessing environment variable

**Solutions:**
1. Verify variable name is correct (case-sensitive)
2. Check variable is set in environment
3. For public variables, ensure `PUBLIC_` prefix is used
4. Restart development server after adding variables

### Build Failures

**Possible Causes:**
- Missing required environment variables
- Invalid variable format
- Incorrect variable values

**Solutions:**
1. Check all required variables are set
2. Verify variable formats match examples
3. Test build locally before deploying

---

## .env.example Template

```env
# Site Configuration
PUBLIC_SITE_URL=https://auxodata.com

# Brevo Email Service
BREVO_API_KEY=your-brevo-api-key
BREVO_FROM_EMAIL=noreply@auxodata.com
BREVO_FROM_NAME=AUXO Data Labs

# Contact Configuration
CONTACT_EMAIL=contact@auxodata.com

# Analytics (Optional)
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Maintenance Mode (Optional)
MAINTENANCE_MODE=false
```

---

## Additional Resources

- **Security:** See `SECURITY.md` for security best practices
- **API Endpoints:** See `API_ENDPOINTS.md` for API configuration
- **Deployment:** See `DEPLOYMENT.md` for deployment configuration
- **Brevo Documentation:** [brevo.com/docs](https://developers.brevo.com/docs)

