# Content Guidelines

This document outlines content tone, SEO, and management practices.

---

## 1. Tone of Voice

### Core Principles

**Startup Pride & Premium Positioning:**
-   **Celebrate Startup Status:** Frame being a startup as a strategic advantage—agility, innovation, direct access, and contemporary methodologies. Never apologize for being new; instead, highlight what larger consultancies cannot offer.
-   **Premium Sophistication:** Write for sophisticated audiences (GCC, Europe, Switzerland) who value expertise, precision, and results. Use refined language that reflects business acumen and technical competence.
-   **Confident Authority:** Demonstrate expertise through specificity and proven outcomes, not generic claims. Reference methodologies, technologies, and frameworks by name.

**Communication Style:**
-   **Precision Over Volume:** Every word must earn its place. Avoid filler, redundancy, and repetitive messaging across pages.
-   **Direct & Respectful:** Communicate clearly and efficiently. Premium audiences appreciate brevity and respect their intelligence—no overselling or excessive explanation.
-   **Technical Competence:** Use appropriate technical terminology when it adds clarity, but avoid jargon for jargon's sake. Technical precision signals expertise to sophisticated buyers.

### Audience-Specific Considerations

**For GCC, European, and Swiss Markets:**
-   **International Perspective:** Frame Dubai/UAE location as a strategic advantage—gateway to emerging markets, innovation hub, global connectivity.
-   **Regulatory Awareness:** Demonstrate understanding of UAE PDPL, GDPR, and international compliance requirements without excessive explanation.
-   **Business-First Language:** Focus on business outcomes, ROI, strategic value. Premium audiences prioritize results over process details.
-   **Cultural Sensitivity:** Avoid casual or overly informal language. Maintain professional formality appropriate for B2B enterprise engagements.

### Words & Phrases to Avoid

**❌ Avoid These Terms:**
-   "Cheap," "affordable," "budget-friendly" (undermines premium positioning)
-   "Revolutionary," "game-changing," "disruptive" (overused, lacks credibility)
-   "We promise," "guarantee" (unless legally enforceable)
-   "Best-in-class," "world-class" (unsupported superlatives)
-   "Cutting-edge," "state-of-the-art" (vague technical claims)
-   "Easy," "simple," "quick" (when referring to complex analytics work)
-   "We're different" (show, don't tell)
-   Redundant phrases like "fast and quick" or "agile and flexible"

**✅ Preferred Language:**
-   "Enterprise-grade" (specific, measurable)
-   "Proven methodologies" (with examples: "sprint-based approach," "agile frameworks")
-   "Direct access" (concrete benefit)
-   "Transparent pricing" (specific advantage)
-   "Strategic advantage," "competitive edge" (business-focused)
-   Technical specifics: "AWS/Azure/GCP," "Power BI/Tableau," "ETL/ELT pipelines"

### Repetition Guidelines

**Anti-Redundancy Rules:**
1.  **Single Message Per Page:** Each page should have a distinct narrative focus. Avoid repeating the same value proposition across multiple pages.
2.  **Unique Value Statements:** If "startup agility" appears on the homepage, use different phrasing on the About page (e.g., "bureaucracy-free execution" or "rapid iteration").
3.  **Varied CTAs:** Use different call-to-action language across pages. Don't repeat "Schedule Consultation" on every page.
4.  **Distinct Benefits:** Each section should introduce new information. If a benefit appears in one section, don't repeat it verbatim elsewhere.
5.  **Content Audit Process:** Before adding new content, scan existing files in `src/data/` to ensure no duplicate messaging.

**Example of Avoided Repetition:**
-   ❌ Homepage: "Direct founder access"
-   ❌ About: "Direct founder access"  
-   ❌ Services: "Direct founder access"
-   ✅ Homepage: "Direct founder access"
-   ✅ About: "Senior team involvement on every project"
-   ✅ Services: "No account managers, no junior consultants"

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

