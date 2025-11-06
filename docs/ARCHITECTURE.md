# Site Architecture

This document outlines the project's file structure and sitemap.

- **Project Root:** `A:\AUXO\Main Website`

---

## 1. Project Root

```
/
├── astro.config.mjs        # Astro configuration (integrations, base URL)
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint v9 flat configuration
├── package.json            # Dependencies and scripts
├── public/                 # Static assets (images, fonts, robots.txt)
├── src/                    # Source code
├── docs/                   # Project documentation
├── screenshots/            # Marketing & documentation screenshots
└── .env.example            # Environment variables template
```

---

## 2. Source Directory (`src/`)

```
src/
├── components/             # Reusable Astro components
│   ├── common/             # Core site-wide components
│   ├── ui/                 # Interactive UI elements
│   ├── layouts/            # Layout wrapper components
│   ├── sections/           # Large page-section components
│   │   ├── home/           # Homepage sections
│   │   ├── about/          # About page sections
│   │   ├── services/       # Services page sections
│   │   ├── blog/           # Blog page sections
│   │   └── shared/         # Shared sections
│   ├── effects/            # Visual effects and animations
│   ├── schema/             # Structured data components
│   └── dev/                # Development tools
├── content/                # Astro content collections (blog posts)
├── data/                   # TypeScript data files for site content
│   ├── collections/        # Structured data (services, FAQs)
│   ├── config/             # Site-wide configuration
│   ├── content/            # Page-specific content
│   └── shared/             # Reusable text snippets
├── layouts/                # Base page layouts
├── pages/                  # Site pages and API endpoints (file-based routing)
│   ├── api/                # Server-side API endpoints
│   └── legal/              # Legal pages (privacy, terms)
├── scripts/                # Client-side JavaScript modules
├── styles/                 # Global CSS and styles
└── utils/                  # Utility functions (validation, rate limiting)
```

---

## 3. Key File Locations

| Purpose                | Location                                  |
| ---------------------- | ----------------------------------------- |
| **Configuration**      |                                           |
| Astro Config           | `astro.config.mjs`                        |
| Site Data              | `src/data/config/site.ts`                 |
| **Pages & Layouts**    |                                           |
| Homepage               | `src/pages/index.astro`                   |
| Base Layout            | `src/layouts/BaseLayout.astro`            |
| **Components**         |                                           |
| Navigation             | `src/components/common/Navigation.astro`  |
| Footer                 | `src/components/common/Footer.astro`      |
| SEO Component          | `src/components/common/SEO.astro`         |
| **Content**            |                                           |
| Blog Posts (Markdown)  | `src/content/blog/`                       |
| Services Data          | `src/data/collections/services.ts`        |
| Common Text            | `src/data/shared/common.ts`               |
| Homepage Content       | `src/data/content/homepage.ts`            |
| **Styling**            |                                           |
| Global Styles          | `src/styles/global.css`                   |
| **Backend & Utils**    |                                           |
| Contact Form API       | `src/pages/api/contact.ts`                |
| Validation Schemas     | `src/utils/validation.ts`                 |
| Rate Limiting          | `src/utils/rateLimit.ts`                  |
| URL Utilities          | `src/utils/url.ts`                        |
| Error Handler         | `src/utils/errorHandler.ts`                |
| Email Templates        | `src/utils/emailTemplates.ts`              |
| **Static Assets**      |                                           |
| Logo                   | `public/logo.svg`                         |
| Security Headers       | `public/_headers`                         |

---

## 4. Sitemap

-   `/` (Homepage)
-   `/about`
-   `/contact`
-   `/services`
-   `/services/[id]` (Dynamic service pages)
-   `/blog`
-   `/blog/[slug]` (Dynamic blog posts)
-   `/case-studies`
-   `/faq`
-   `/tools/maturity-calculator`
-   `/legal/privacy-policy`
-   `/legal/terms`
-   `/api/contact` (POST)
-   `/api/newsletter` (POST)
-   `/rss.xml`

---

## 5. Data Flow

1.  **Content:** Stored in `src/data/` (TypeScript files) and `src/content/` (Markdown).
2.  **Components:** Astro components in `src/components/` import data to render UI.
3.  **Pages:** Pages in `src/pages/` assemble components and layouts.
4.  **Build:** Astro generates static HTML from pages, components, and data.
5.  **API:** Client-side forms submit to API endpoints in `src/pages/api/`, which use Maileroo for email delivery.

