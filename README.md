# AUXO Data Labs

> **Transform Data Into Competitive Advantage**

A Dubai-based data analytics consultancy specializing in Business Intelligence, Data Strategy, and Advanced Analytics for enterprises across the UAE and MENA region.

![AUXO Data Labs](https://auxodata.com/og-image.jpg)

**Status**: 🟢 Production Ready | **Live**: [auxodata.com](https://auxodata.com)

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [About](#-about)
- [Key Features](#-key-features)
- [Website Structure](#-website-structure)
- [Technology Stack](#-technology-stack)
- [Development](#-development)
- [Documentation](#-documentation)
- [Performance](#-performance)
- [Brand Guidelines](#-brand-guidelines)
- [Contact](#-contact)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Admin-AUXO/auxo-main-website.git
cd auxo-main-website

# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run check` | TypeScript type checking |

---

## 📖 About

This is the official corporate website for AUXO Data Labs, built as a modern, high-performance static site using Astro. The platform showcases our analytics consulting services, thought leadership content, and interactive tools for engaging with prospective clients.

### Purpose

- **Lead Generation**: Multi-step contact form and data maturity assessment calculator
- **Service Showcase**: Detailed pages for 6 specialized analytics services
- **Thought Leadership**: Comprehensive blog articles (29,500+ words) on data analytics
- **Client Engagement**: Case studies, team profiles, and interactive tools

---

## ✨ Key Features

### User Experience

- ✅ **Professional Design**: Modern interface with distinctive AUXO branding and lime-green (#A3E635) accents
- ✅ **Mobile-First**: Fully responsive design optimized for all devices
- ✅ **Fast Performance**: Sub-second page loads with static site generation
- ✅ **Interactive Tools**: Data maturity calculator and intelligent contact forms
- ✅ **SEO Optimized**: Comprehensive meta tags, structured data, and content optimization
- ✅ **Accessible**: WCAG compliant with semantic HTML and ARIA attributes

### Business Features

- ✅ **Lead Capture**: Sophisticated multi-step form with validation and industry-specific fields
- ✅ **Email Integration**: Brevo API integration for contact forms and newsletter subscriptions
- ✅ **Analytics Ready**: Google Analytics and marketing tracking prepared
- ✅ **Social Sharing**: Open Graph tags and Twitter Cards
- ✅ **Legal Compliance**: UAE PDPL compliant privacy policy and legal documentation

---

## 🗂️ Website Structure

### Core Pages

| Page | Description |
|------|-------------|
| **Home** | Landing page with value proposition and service overview |
| **Services** | 6 specialized offerings (BI, Analytics, Strategy, ML/AI, Engineering, Transformation) |
| **About** | Company mission, values, and team expertise |
| **Case Studies** | Portfolio of successful client engagements |
| **Blog** | 6 comprehensive articles on analytics topics (29,500+ words) |
| **Maturity Calculator** | 20-question interactive assessment tool |
| **Contact** | Multi-step form with intelligent lead capture |
| **Legal** | Privacy Policy, Terms, Cookie Policy, DPA (UAE PDPL compliant) |

### Content Management

All content is managed through TypeScript data files organized in a structured hierarchy:

| Directory/File | Purpose |
|---------------|---------|
| `src/data/config/` | Site-wide configuration (contact, social links, site metadata) |
| `src/data/collections/` | Structured collections (services, FAQ, team, service use cases) |
| `src/data/content/` | Page-specific content (homepage, about, contact, blog, services, calculator, case studies, forms, cookies, legal) |
| `src/data/shared/` | Reusable common text (buttons, labels, CTAs, error messages) |
| `src/content/blog/` | MDX-based blog articles |

**Data Structure Organization:**
- ✅ **80% of components/pages** now use centralized data files
- ✅ **Content separation**: Page content, shared text, and configuration are clearly separated
- ✅ **Type-safe**: All data structures use TypeScript interfaces for type safety

---

## 🛠️ Technology Stack

### Core Framework

- **Astro 5.14** - Static site framework with minimal JavaScript
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling framework

### Integrations

- **MDX** - Markdown-based blog content with component support
- **Astro Icon** - Material Design Icons integration
- **Sharp** - High-performance image optimization
- **Brevo API** - Email services for contact forms and newsletters
- **Astro Compress** - Asset compression for optimal performance

---

## 👨‍💻 Development

### Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Navigation.astro
│   ├── Footer.astro
│   ├── MultiStepForm.astro
│   ├── CookieConsent.astro
│   ├── LegalLayout.astro
│   └── SEO.astro
├── data/               # Organized TypeScript content files
│   ├── config/         # Site-wide configuration
│   │   └── site.ts
│   ├── collections/    # Structured data collections
│   │   ├── services.ts
│   │   ├── servicesUseCases.ts
│   │   ├── team.ts
│   │   └── faq.ts
│   ├── content/        # Page-specific content
│   │   ├── homepage.ts
│   │   ├── about.ts
│   │   ├── contact.ts
│   │   ├── services.ts
│   │   ├── blog.ts
│   │   ├── maturityCalculator.ts
│   │   ├── caseStudies.ts
│   │   ├── forms.ts
│   │   ├── cookies.ts
│   │   └── legal.ts
│   └── shared/          # Reusable common text
│       └── common.ts
├── layouts/            # Page layouts
│   ├── BaseLayout.astro
│   └── LegalLayout.astro
├── pages/              # Route pages
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── services/[id].astro
│   ├── blog/[slug].astro
│   ├── tools/maturity-calculator.astro
│   └── api/            # API endpoints
│       ├── contact.ts
│       └── newsletter.ts
├── content/            # MDX content collections
│   └── blog/
├── styles/             # Global styles
│   └── global.css
└── utils/              # Utility functions
    ├── validation.ts
    └── rateLimit.ts
```

### Environment Variables

Required environment variables (see `.env.example`):

- `BREVO_API_KEY` - Brevo API key for email services
- `BREVO_FROM_EMAIL` - Verified sender email address
- `BREVO_FROM_NAME` - Display name for sender
- `CONTACT_EMAIL` - Email address for contact form submissions
- `PUBLIC_SITE_URL` - Base URL for the website
- `PUBLIC_GOOGLE_ANALYTICS_ID` - Google Analytics ID (optional)

---

## 📚 Documentation

Comprehensive documentation available:

- **[Technical Documentation](./docs/TECHNICAL_DOCUMENTATION.md)** - Architecture, components, workflows, and coding standards
- **[Data Audit Report](./docs/DATA_AUDIT_REPORT.md)** - Content management refactoring status and data structure
- **[Audit Findings](./docs/AUDIT_FINDINGS.md)** - Security, TypeScript, and code quality audit items

---

## ⚡ Performance

### Build Metrics

- ⚡ Build time: ~2-3 seconds
- 📄 20+ static pages generated
- 🗜️ Compressed assets (HTML, CSS, JS, SVG)
- 🗺️ Auto-generated sitemap and RSS feed
- 🖼️ Optimized images with modern formats

### Best Practices

- ✅ Mobile-first responsive design
- ✅ WCAG accessibility guidelines
- ✅ UAE PDPL privacy compliance
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ Clean, semantic HTML
- ✅ Optimized Core Web Vitals

---

## 🎨 Brand Guidelines

### Colors

```css
Primary Accent:   #A3E635 (Lime Green)
Background:       #000000 (Black)
Primary Text:     #FFFFFF (White)
Secondary Text:   #A0A0A0 (Gray)
Accents:          #0A0A0A, #111111 (Dark Grays)
```

### Typography

- **Brand/Logo**: Montserrat (Weight: 900)
- **Headings**: Space Grotesk (Weights: 600, 700, 800)
- **Body**: Inter (Weights: 400, 500, 600, 700)
- **Monospace**: Space Mono

### Logo

Distinctive 2x2 grid design with A-U-X-O tiles, used in favicon and navigation.

---

## 🚀 Deployment

### Production

- **URL**: [https://auxodata.com](https://auxodata.com)
- **Hosting**: GitHub Pages
- **Deploy**: Automated on push to `master` branch
- **CI/CD**: GitHub Actions workflow
- **SSL**: Automatic HTTPS certificates

### Staging

- **Hosting**: Netlify
- **Branches**: `develop`, `staging`
- **Deploy**: Automated on push

---

## 📞 Contact

**AUXO Data Labs**

- 📧 Email: [hello@auxodata.com](mailto:hello@auxodata.com)
- 🌐 Website: [auxodata.com](https://auxodata.com)
- 📍 Location: Dubai, United Arab Emirates

**Social Media**

- LinkedIn: [@auxo-data](https://www.linkedin.com/company/auxo-data/)
- X (Twitter): [@AuxoData](https://x.com/AuxoData)

**Privacy Inquiries**

- 📧 Email: [privacy@auxodata.com](mailto:privacy@auxodata.com)

---

## 📄 License

© 2025 AUXO Data Labs. All rights reserved.

This website and its source code are proprietary to AUXO Data Labs. Unauthorized copying, distribution, or use is prohibited.

---

---

## ✅ Best Practices & Guidelines

### Dos ✅

- **DO** use data files in `src/data/` for all text content - never hardcode strings in components
- **DO** follow the data structure organization: `config/` for site config, `collections/` for structured data, `content/` for page content, `shared/` for common text
- **DO** maintain TypeScript types for all data structures
- **DO** use existing components from `src/components/` before creating new ones
- **DO** ensure mobile-first responsive design with 44px × 44px minimum touch targets
- **DO** run `npm run lint` and `npm run check` before committing changes
- **DO** test API endpoints with proper validation and rate limiting
- **DO** use the `base` variable (`import.meta.env.BASE_URL`) for all internal links and API calls
- **DO** verify Brevo sender email is verified before deploying contact forms
- **DO** keep security headers up to date in `public/_headers`

### Don'ts ❌

- **DON'T** hardcode text content directly in components or pages
- **DON'T** commit `.cursor/mcp.json` or any MCP configuration files (contains secrets)
- **DON'T** add new dependencies without explicit approval
- **DON'T** bypass validation or rate limiting in API endpoints
- **DON'T** use client-side JavaScript libraries unnecessarily (this is a static-first site)
- **DON'T** duplicate code - create reusable components instead
- **DON'T** use `<a>` tags for internal navigation without the `base` variable
- **DON'T** expose API keys, tokens, or sensitive data in code, commits, or documentation
- **DON'T** modify security headers without understanding the implications
- **DON'T** commit `.env` files or environment variables with real values

---

**Built with ❤️ in Dubai** 🇦🇪

**Status**: 🟢 Production Ready  
