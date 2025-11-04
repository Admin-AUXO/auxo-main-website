# Environment Variables

This document outlines the environment variables required for the project.

---

## 1. Setup

1.  Copy `.env.example` to a new `.env` file for local development.
2.  Fill in the required values in your `.env` file.
3.  For production, configure these variables in your hosting provider's settings (e.g., GitHub Secrets, Netlify).
4.  **NEVER** commit the `.env` file to the repository.

---

## 2. Variables

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `PUBLIC_SITE_URL` | **Yes** | Base URL for the website, used for SEO and sitemap generation. | `https://auxodata.com` |
| `BREVO_API_KEY` | **Yes** | API key for the Brevo (Sendinblue) email service. | `xkeysib-...` |
| `BREVO_FROM_EMAIL` | **Yes** | **CRITICAL:** Verified sender email in Brevo. Emails will fail if not verified. | `noreply@auxodata.com` |
| `BREVO_FROM_NAME` | **Yes** | Display name for the sender in emails. | `AUXO Data Labs` |
| `CONTACT_EMAIL` | **Yes** | Email address that receives contact form submissions. | `contact@auxodata.com` |
| `PUBLIC_GOOGLE_ANALYTICS_ID` | No | Google Analytics measurement ID for tracking. | `G-XXXXXXXXXX` |
| `MAINTENANCE_MODE` | No | Set to `true` to enable the site-wide maintenance page. | `false` |

---

## 3. Variable Access

-   **Server-Side (`.ts`, `.astro` frontmatter):** All variables are accessible.
-   **Client-Side (`<script>` tags):** Only variables prefixed with `PUBLIC_` are accessible.

---

## 4. Troubleshooting

-   **Emails Not Sending:** The most common issue is that the `BREVO_FROM_EMAIL` has not been verified in your Brevo dashboard. Double-check this first. Also, verify your `BREVO_API_KEY`.
-   **Missing Variables:** If a variable is `undefined`, ensure it is correctly named in your `.env` file or hosting provider settings and that you have restarted the development server.

