# API Endpoints

This document outlines the site's API endpoints.

---

## 1. `/api/contact`

-   **Purpose:** Handles multi-step contact form submissions.
-   **Method:** `POST`
-   **Rate Limit:** 3 requests per 30 minutes per IP.
-   **Security:**
    -   Zod validation (`contactFormSchema`).
    -   Honeypot field for spam detection.
    -   Input sanitization.
-   **Success Response:** `200 OK` with `{ "success": true, "message": "..." }`
-   **Error Responses:**
    -   `400 Bad Request`: Validation failed.
    -   `429 Too Many Requests`: Rate limit exceeded.
    -   `500 Internal Server Error`: Email sending failed.

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `firstName` | `string` | Yes | 1-50 characters |
| `lastName` | `string` | Yes | 1-50 characters |
| `email` | `string` | Yes | Valid email format |
| `company` | `string` | Yes | 1-100 characters |
| `projectType` | `string` | Yes | Predefined options |
| `services` | `string[]` | Yes | At least one service |
| `honeypot` | `string` | No | Must be empty for spam check |
| `...` | `...` | No | Other optional fields |

---

## 2. `/api/newsletter`

-   **Purpose:** Handles newsletter subscriptions.
-   **Method:** `POST`
-   **Rate Limit:** 2 requests per hour per IP.
-   **Security:**
    -   Zod validation (`newsletterSchema`).
    -   Checks for duplicate email addresses.
    -   Requires explicit consent.
-   **Success Response:** `200 OK` with `{ "success": true, "message": "..." }`
-   **Error Responses:**
    -   `400 Bad Request`: Validation failed.
    -   `429 Too Many Requests`: Rate limit exceeded.
    -   `500 Internal Server Error`: Brevo API error.

### Request Body

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | Yes | Valid email format |
| `consent` | `boolean` | Yes | Must be `true` |

---

## 3. Key File Locations

-   **API Endpoints:** `src/pages/api/`
-   **Validation Schemas:** `src/utils/validation.ts`
-   **Rate Limiting:** `src/utils/rateLimit.ts`
-   **Brevo Configuration:** Requires `BREVO_API_KEY` and `BREVO_FROM_EMAIL` environment variables. **Note:** `BREVO_FROM_EMAIL` must be verified in the Brevo dashboard.

