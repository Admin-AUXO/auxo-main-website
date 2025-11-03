# Site Architecture

This document provides a comprehensive overview of the project's file structure, sitemap, and organization.

---

## Project Structure

### Root Directory

```
/
├── astro.config.mjs       # Main Astro configuration (integrations, Tailwind, MDX, sitemaps)
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint v9 flat configuration
├── package.json           # Dependencies and scripts
├── package-lock.json      # Locked dependencies
├── README.md              # Project overview
└── .env.example           # Environment variables template
```

### Source Directory (`src/`)

#### Components (`src/components/`)

Reusable Astro components:

- **`Navigation.astro`**: Main site navigation with responsive mobile menu and desktop dropdowns
- **`Footer.astro`**: Site footer with contact info, navigation links, newsletter signup
- **`MultiStepForm.astro`**: Multi-step contact form with client-side interactivity
- **`SEO.astro`**: Manages all SEO-related meta tags and structured data
- **`Breadcrumbs.astro`**: Breadcrumb navigation (uses `astro-breadcrumbs`)
- **`FAQSchema.astro`**: FAQ structured data schema
- **`CookieConsent.astro`**: GDPR/PDPL compliant cookie banner
- **`LegalLayout.astro`**: Specialized layout for legal pages
- **`DevBar.astro`**: Development-only toolbar for debugging
- **`ParticleBackground.astro`**: Particle background effect
- **Layout Components (`layouts/`):**
  - **`ContentWrapper.astro`**: Content container wrapper
  - **`PageContainer.astro`**: Page-level container
  - **`SectionContainer.astro`**: Section-level container

#### Content Collections (`src/content/`)

Content managed via Astro's content collections API:

- **`config.ts`**: Defines schema for all content collections (currently only `blog`)
- **`blog/`**: Individual blog post files in MDX format

#### Data Directory (`src/data/`)

Organized TypeScript files for all site content:

**`config/`** - Site-wide configuration:
- **`site.ts`**: Global site information (name, contact details, social links)

**`collections/`** - Structured data collections:
- **`services.ts`**: Service definitions with features and deliverables
- **`servicesUseCases.ts`**: Use cases for each service
- **`team.ts`**: Team member profiles and information
- **`faq.ts`**: Frequently asked questions organized by category

**`content/`** - Page-specific content (80% of pages use these files):
- **`homepage.ts`**: Homepage hero, problems, methodology, CTAs
- **`about.ts`**: About page mission, vision, values, team sections
- **`contact.ts`**: Contact page hero, sidebar, additional options
- **`services.ts`**: Services page hero, process, CTAs
- **`blog.ts`**: Blog page hero, featured badge, empty states
- **`maturityCalculator.ts`**: Calculator hero, intro, questions, results
- **`caseStudies.ts`**: Case study data and page content
- **`forms.ts`**: Multi-step form step definitions and validation messages
- **`cookies.ts`**: Cookie consent banner and modal content
- **`legal.ts`**: Legal pages navigation and sidebar content

**`shared/`** - Reusable common text:
- **`common.ts`**: Buttons, labels, CTAs, error messages, meta text

#### Layouts (`src/layouts/`)

Page structure definitions:

- **`BaseLayout.astro`**: Primary layout including `<head>`, `<body>`, and slots for page content. Imports `Navigation`, `Footer`, and `SEO` components
- **`LegalLayout.astro`**: Specific layout for legal pages (privacy policy, terms, etc.)

#### Pages (`src/pages/`)

Site routes (file-based routing):

**Static Pages:**
- **`index.astro`**: Homepage
- **`about.astro`**: About page
- **`contact.astro`**: Contact page
- **`faq.astro`**: FAQ page
- **`case-studies.astro`**: Case studies listing page
- **`404.astro`**: 404 error page

**Dynamic Pages:**
- **`blog/index.astro`**: Blog listing page
- **`blog/[slug].astro`**: Dynamic template for individual blog posts
- **`services/index.astro`**: Services listing page
- **`services/[id].astro`**: Dynamic template for individual service pages
- **`tools/maturity-calculator.astro`**: Interactive maturity calculator tool

**Legal Pages (`legal/`):**
- **`cookie-policy.astro`**: Cookie policy page
- **`dpa.astro`**: Data Processing Agreement
- **`privacy-policy.astro`**: Privacy policy page
- **`terms.astro`**: Terms of service page

**API Endpoints (`api/`):**
- **`contact.ts`**: Server-side API endpoint for contact form submissions
- **`newsletter.ts`**: Server-side API endpoint for newsletter subscriptions
- **`rss.xml.ts`**: RSS feed generator

#### Styles (`src/styles/`)

- **`global.css`**: Global styles, CSS variables for color palette, custom animations
- **`transitions.css`**: Page transition styles

#### Utils (`src/utils/`)

Utility functions and shared code:

- **`validation.ts`**: Zod validation schemas for forms (contact and newsletter)
- **`rateLimit.ts`**: Rate limiting utility for API endpoints with configurable presets

### Public Directory (`public/`)

Static assets copied directly to build output:

- **`robots.txt`**: Search engine crawler instructions
- **`favicon.svg`**: Site favicon
- **`logo.svg`**: Site logo
- **`og-image.svg`**: Default Open Graph image
- **`apple-touch-icon.svg`**: iOS home screen icon
- **`brochure.pdf`**: Company brochure
- **`_headers`**: Security headers configuration for Netlify deployment

### GitHub Workflows (`.github/workflows/`)

CI/CD workflows:

- **`deploy.yml`**: Deploys `master` branch to GitHub Pages (Production)
- **`deploy-staging.yml`**: Deploys `develop` and `staging` branches to Netlify (Staging)

---

## Sitemap

### Public Pages

```
/                           # Homepage
/about                      # About page
/contact                    # Contact page
/services                   # Services listing
/services/[id]              # Individual service pages
  - /services/data-strategy
  - /services/data-analytics
  - /services/business-intelligence
  - /services/data-engineering
  - /services/data-governance
  - /services/ml-ai
/blog                       # Blog listing
/blog/[slug]                # Individual blog posts
/case-studies               # Case studies listing
/faq                        # FAQ page
/tools/maturity-calculator  # Maturity calculator tool
```

### Legal Pages

```
/legal/privacy-policy       # Privacy policy
/legal/terms                # Terms of service
/legal/cookie-policy        # Cookie policy
/legal/dpa                  # Data Processing Agreement
```

### API Endpoints

```
/api/contact                # Contact form submission
/api/newsletter             # Newsletter subscription
/rss.xml                    # RSS feed
```

---

## File Organization Patterns

### Components

- **Location:** `src/components/`
- **Naming:** PascalCase (e.g., `MyComponent.astro`)
- **Structure:** Reusable, self-contained components

### Pages

- **Location:** `src/pages/`
- **Routing:** File-based routing (Astro standard)
- **Dynamic Routes:** Use `[param]` syntax

### Data Files

- **Config:** Site-wide settings → `src/data/config/`
- **Collections:** Structured data → `src/data/collections/`
- **Content:** Page-specific content → `src/data/content/`
- **Shared:** Common text → `src/data/shared/`

### Utilities

- **Location:** `src/utils/`
- **Purpose:** Reusable functions (validation, rate limiting, etc.)

---

## Key Configuration Files

### Astro Configuration (`astro.config.mjs`)

- Integrations: Tailwind, MDX, sitemap
- Icon configuration (Material Design Icons)
- Build settings
- Base URL configuration

### Tailwind Configuration (`tailwind.config.js`)

- Design tokens
- Custom utilities
- Responsive breakpoints

### TypeScript Configuration (`tsconfig.json`)

- Compiler options
- Path aliases
- Type definitions

### ESLint Configuration (`eslint.config.js`)

- ESLint v9 flat config format
- Astro-specific rules
- Accessibility rules (jsx-a11y)

---

## Build Output

### Distribution Directory (`dist/`)

Generated during build process:

- Static HTML files
- Optimized assets
- API endpoints
- Generated sitemaps

---

## Development Workflow

1. **Development:** Work in `src/` directory
2. **Build:** Run `npm run build` to generate `dist/`
3. **Preview:** Run `npm run preview` to test production build
4. **Deploy:** Automated via GitHub Actions

---

## Important File Locations Quick Reference

| Purpose                | Location                                  |
|------------------------|-------------------------------------------|
| Homepage               | `src/pages/index.astro`                   |
| Navigation             | `src/components/Navigation.astro`         |
| Footer                 | `src/components/Footer.astro`              |
| SEO Component         | `src/components/SEO.astro`                |
| Base Layout            | `src/layouts/BaseLayout.astro`            |
| Site Configuration     | `src/data/config/site.ts`                 |
| Services Data          | `src/data/collections/services.ts`         |
| Common Text            | `src/data/shared/common.ts`               |
| Homepage Content       | `src/data/content/homepage.ts`             |
| Global Styles          | `src/styles/global.css`                   |
| Validation Schemas     | `src/utils/validation.ts`                 |
| Rate Limiting          | `src/utils/rateLimit.ts`                  |
| Security Headers       | `public/_headers`                         |
| Astro Config           | `astro.config.mjs`                        |
| Tailwind Config        | `tailwind.config.js`                      |

---

## Data Flow

### Content Flow

1. **Content Creation:** Content added to `src/data/` or `src/content/`
2. **Type Safety:** TypeScript interfaces ensure type safety
3. **Component Usage:** Components/pages import and use data
4. **Build:** Astro generates static pages from data and components

### API Flow

1. **Form Submission:** User submits form
2. **Client-Side:** Form data validated and sent to API endpoint
3. **Server-Side:** API endpoint validates, rate limits, and processes
4. **Integration:** Brevo API sends emails (contact form/newsletter)

---

## Architecture Principles

1. **Static First:** Prioritize static generation
2. **Component-Based:** Reusable components over duplication
3. **Data-Driven:** Content in data files, not hardcoded
4. **Type-Safe:** TypeScript everywhere
5. **Mobile-First:** Responsive design starting from mobile
6. **Performance:** Minimal client-side JavaScript
7. **Accessibility:** Semantic HTML and ARIA attributes

---

## Additional Resources

- **Component Reference:** See `COMPONENTS.md`
- **Data Structures:** See `DATA_STRUCTURES.md`
- **API Endpoints:** See `API_ENDPOINTS.md`
- **Deployment:** See `DEPLOYMENT.md`

