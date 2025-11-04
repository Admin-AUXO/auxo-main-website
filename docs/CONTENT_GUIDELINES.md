# Content Guidelines

This document outlines content tone, SEO, and management practices.

---

## 1. Tone of Voice

-   **Authentic Startup:** Be honest about being new, but emphasize agility, direct access, and fresh perspectives.
-   **Professional & Approachable:** Use technical expertise without excessive jargon.
-   **Clear & Concise:** Communicate directly and respect the reader's time.
-   **Confident, Not Boastful:** Show expertise without overselling.
-   **Solution-Focused:** Emphasize solving problems and delivering value.

---

## 2. SEO Guidelines

-   **Meta Tags:** Use the `src/components/common/SEO.astro` component for all pages.
    -   **Title:** < 60 characters, include primary keyword and brand name.
    -   **Description:** < 160 characters, compelling and keyword-rich.
-   **Structured Data:** The `SEO` component and `FAQSchema` component automatically handle JSON-LD structured data for `Organization`, `WebSite`, `BlogPosting`, `BreadcrumbList`, and `FAQPage`.
-   **On-Page SEO:**
    -   Use proper heading hierarchy (H1 → H2 → H3).
    -   All `<img>` tags must have descriptive `alt` text.
    -   Link to relevant internal pages.
-   **Robots.txt:** Located at `public/robots.txt`, disallows crawling of `/api/`.

---

## 3. Content Management

### Data-Driven Content

-   **Rule:** 80% of site content is managed in TypeScript files in `src/data/`. **Do not hard-code content in components.**
-   **Structure:**
    -   `src/data/config/`: Site-wide settings.
    -   `src/data/collections/`: Structured data (e.g., services, FAQs).
    -   `src/data/content/`: Page-specific content.
    -   `src/data/shared/`: Reusable text (buttons, labels).

### Content Workflow

1.  **Identify Content Type:** Determine if content is page-specific, shared, or a structured collection.
2.  **Locate File:** Find the appropriate file in the `src/data/` directory.
3.  **Check for Reuse:** Before adding new text, check `src/data/shared/common.ts`.
4.  **Add Content:** Add new content with the correct TypeScript interface.

---

## 4. Blog Posts

-   **Location:** `src/content/blog/`
-   **Format:** Markdown (`.md`).
-   **Schema:** Defined in `src/content/config.ts`.
-   **Required Frontmatter:**
    -   `title: string`
    -   `description: string`
    -   `publishDate: YYYY-MM-DD`

---

## 5. Page-Specific Content Locations

-   **Homepage:** `src/data/content/homepage.ts`
-   **About:** `src/data/content/about.ts`
-   **Services:** `src/data/collections/services.ts`
-   **Contact:** `src/data/content/contact.ts`
-   **FAQs:** `src/data/collections/faq.ts`
-   **Legal:** `src/data/content/legal.ts`
-   **Forms:** `src/data/content/forms.ts`

