# Security Guidelines

This document outlines key security measures and best practices for the project.

---

## 1. API & Form Security

-   **Input Validation:** All API endpoints (`/api/contact`, `/api/newsletter`) use Zod schemas for strict input validation.
    -   **Location:** `src/utils/validation.ts`
-   **Rate Limiting:** IP-based rate limiting is enforced on all API endpoints to prevent abuse.
    -   **Location:** `src/utils/rateLimit.ts`
    -   **Contact Form:** 3 requests per 30 minutes.
    -   **Newsletter:** 2 requests per hour.
-   **Spam Prevention:** The contact form uses a honeypot field to trap bots.
-   **Consent:** The newsletter endpoint requires explicit user consent.

---

## 2. Security Headers

Security headers are configured in `public/_headers` to protect against common attacks.

| Header | Value | Purpose |
| :--- | :--- | :--- |
| `Content-Security-Policy` | *(see file)* | Prevents XSS by restricting resource loading. |
| `X-Frame-Options` | `DENY` | Prevents clickjacking. |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing. |
| `Strict-Transport-Security`| `max-age=...` | Enforces HTTPS. |
| `Referrer-Policy` | `strict-origin...`| Controls referrer information. |
| `Permissions-Policy` | *(see file)* | Disables sensitive browser features (e.g., geolocation). |

---

## 3. Data & Secret Management

-   **NEVER** commit sensitive data to the repository. This includes:
    -   `.env` files
    -   API keys, tokens, or other secrets
    -   `.cursor/` directory and `.cursor/mcp.json` (MCP configuration)
-   **ALWAYS** use environment variables for secrets.
-   **Brevo API Key:** Store `BREVO_API_KEY` in environment variables and ensure `BREVO_FROM_EMAIL` is verified in the Brevo dashboard.

---

## 4. Dependency Management

-   **Audit Regularly:** Run `npm audit` frequently to check for vulnerabilities in dependencies.
-   **Update Cautiously:** Keep dependencies up-to-date, testing for breaking changes.
-   **Lockfile:** Always commit the `package-lock.json` file to ensure consistent, reproducible builds.

---

## 5. Security Checklist

-   [ ] **No Hardcoded Secrets:** Verify no API keys, tokens, or other secrets are present in the code.
-   [ ] **Environment Variables:** Ensure all required secrets are defined in environment variables.
-   [ ] **Brevo Email Verification:** Confirm the `BREVO_FROM_EMAIL` is verified before deploying.
-   [ ] **Input Validation:** Ensure all form and API inputs are strictly validated.
-   [ ] **Dependency Audit:** Run `npm audit` and address any high or critical vulnerabilities.
-   [ ] **Headers:** Check that security headers in `public/_headers` are correctly configured.

