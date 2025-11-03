# Components Reference

This document provides detailed information about all reusable components in the project.

---

## Core Components

### Navigation.astro

**Location:** `src/components/Navigation.astro`

**Purpose:** Main site navigation with responsive mobile menu and desktop dropdowns.

**Key Features:**
- Mobile menu with touch-optimized targets (44px × 44px minimum)
- Desktop dropdown menus for Services and Resources
- Active link highlighting based on current path
- Body scroll lock when mobile menu is open
- Responsive design (mobile-first)

**Usage:**
```astro
---
import Navigation from '@/components/Navigation.astro';
---

<Navigation />
```

**Dependencies:**
- Uses site data from `src/data/config/site.ts`
- Uses services from `src/data/collections/services.ts`

---

### Footer.astro

**Location:** `src/components/Footer.astro`

**Purpose:** Site footer with contact info, navigation links, newsletter signup, and legal links.

**Key Features:**
- Newsletter subscription with Brevo integration
- Responsive grid layout (1 column mobile → 5 columns desktop)
- Social media links (LinkedIn, Twitter)
- Touch-optimized interactive elements
- Uses `siteData` from `data/config/site.ts`
- Uses `services` from `data/collections/services.ts`

**Usage:**
```astro
---
import Footer from '@/components/Footer.astro';
---

<Footer />
```

---

### SEO.astro

**Location:** `src/components/SEO.astro`

**Purpose:** Manages all SEO-related meta tags and structured data for a given page.

**Props:**

| Prop           | Type         | Default                                                                    |
|----------------|--------------|----------------------------------------------------------------------------|
| `title`        | `string`     | `AUXO Data Labs | Dubai Analytics Consultancy`                                |
| `description`  | `string`     | `Leading analytics consultancy in Dubai, UAE...`                           |
| `type`         | `string`     | `website`                                                                  |
| `image`        | `string`     | Default OG image                                                           |
| `canonical`    | `string`     | Current page URL                                                           |
| `noindex`      | `boolean`    | `false`                                                                    |
| `structuredData` | `object`  | `undefined`                                                                |

**Usage:**
```astro
---
import SEO from '@/components/SEO.astro';

const seoData = {
  title: 'Page Title',
  description: 'Page description',
};
---

<SEO {...seoData} />
```

**Features:**
- Generates meta tags (title, description, OG tags, Twitter cards)
- Loads Google Fonts (Montserrat, Space Grotesk, Inter)
- Generates structured data (JSON-LD)
- Supports custom structured data via props

---

### Breadcrumbs.astro

**Integration:** `astro-breadcrumbs` package

**Purpose:** Auto-generated breadcrumb navigation with structured data support.

**Usage:**
```astro
---
import { Breadcrumbs } from 'astro-breadcrumbs';
---

<Breadcrumbs 
  class="text-sm"
  separator="chevron"
/>
```

**Features:**
- Automatic breadcrumb generation from route structure
- Built-in Schema.org JSON-LD structured data
- Customizable styling and separators
- Zero configuration mode

---

### FAQSchema.astro

**Location:** `src/components/FAQSchema.astro`

**Purpose:** Generates FAQ structured data (JSON-LD) for SEO.

**Props:**
- `faqs`: Array of FAQ objects with question and answer

**Usage:**
```astro
---
import FAQSchema from '@/components/FAQSchema.astro';
import { faqs } from '@/data/collections/faq';
---

<FAQSchema faqs={faqs} />
```

---

## Interactive Components

### MultiStepForm.astro

**Location:** `src/components/MultiStepForm.astro`

**Purpose:** Multi-step contact form with comprehensive data collection.

**Key Features:**
- Client-side interactivity (uses `<script>` tag)
- 5-step form process:
  1. Personal Information
  2. Company Information
  3. Project Details
  4. Services Interest
  5. Additional Information
- Real-time validation
- Progress indicator
- Submission to `/api/contact` endpoint

**Content:**
- Uses `multiStepFormContent` from `data/content/forms.ts` for:
  - Step titles
  - Validation messages
  - Navigation buttons
  - Form field labels

**Backend:**
- Submits to `/api/contact` endpoint
- Full Zod validation
- Rate limiting (3 requests per 30 minutes)
- Brevo email integration

**Usage:**
```astro
---
import MultiStepForm from '@/components/MultiStepForm.astro';
---

<MultiStepForm />
```

---

### CookieConsent.astro

**Location:** `src/components/CookieConsent.astro`

**Purpose:** GDPR/PDPL compliant cookie banner.

**Key Features:**
- Cookie categorization (Essential, Analytics, Marketing)
- User consent management
- LocalStorage for consent preferences
- Modal for detailed cookie preferences
- GDPR/PDPL compliance

**Content:**
- Uses `cookieConsentContent` from `data/content/cookies.ts`

**Usage:**
```astro
---
import CookieConsent from '@/components/CookieConsent.astro';
---

<CookieConsent />
```

---

### ParticleBackground.astro

**Location:** `src/components/ParticleBackground.astro`

**Purpose:** Particle background effect for visual enhancement.

**Usage:**
```astro
---
import ParticleBackground from '@/components/ParticleBackground.astro';
---

<ParticleBackground />
```

---

## Layout Components

### ContentWrapper.astro

**Location:** `src/components/layouts/ContentWrapper.astro`

**Purpose:** Content container wrapper with consistent styling.

**Usage:**
```astro
---
import ContentWrapper from '@/components/layouts/ContentWrapper.astro';
---

<ContentWrapper>
  <!-- Content -->
</ContentWrapper>
```

---

### PageContainer.astro

**Location:** `src/components/layouts/PageContainer.astro`

**Purpose:** Page-level container with proper spacing and max-width.

**Usage:**
```astro
---
import PageContainer from '@/components/layouts/PageContainer.astro';
---

<PageContainer>
  <!-- Page content -->
</PageContainer>
```

---

### SectionContainer.astro

**Location:** `src/components/layouts/SectionContainer.astro`

**Purpose:** Section-level container for consistent section spacing.

**Usage:**
```astro
---
import SectionContainer from '@/components/layouts/SectionContainer.astro';
---

<SectionContainer>
  <!-- Section content -->
</SectionContainer>
```

---

## Specialized Layouts

### LegalLayout.astro

**Location:** `src/components/LegalLayout.astro`

**Purpose:** Specialized layout for legal pages (privacy policy, terms, etc.).

**Key Features:**
- Legal page navigation sidebar
- Consistent legal page structure
- Uses legal content from `data/content/legal.ts`

**Usage:**
```astro
---
import LegalLayout from '@/components/LegalLayout.astro';
---

<LegalLayout>
  <!-- Legal page content -->
</LegalLayout>
```

---

### BaseLayout.astro

**Location:** `src/layouts/BaseLayout.astro`

**Purpose:** Primary layout including `<head>`, `<body>`, and slots for page content.

**Key Features:**
- Imports `Navigation`, `Footer`, and `SEO` components
- Manages global page structure
- Handles base URL configuration

**Usage:**
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout>
  <!-- Page content -->
</BaseLayout>
```

---

## Development Components

### DevBar.astro

**Location:** `src/components/DevBar.astro`

**Purpose:** Development-only toolbar for debugging and testing.

**Key Features:**
- Only renders in development mode (`import.meta.env.DEV`)
- Tools for debugging
- Accessibility testing helpers
- Cache clearing utilities

**Note:** A build warning about empty script chunks is expected and harmless - it occurs because the component is conditionally rendered based on `import.meta.env.DEV`.

**Usage:**
```astro
---
import DevBar from '@/components/DevBar.astro';
---

<DevBar />
```

---

## Interactive Pages

### Maturity Calculator

**Location:** `src/pages/tools/maturity-calculator.astro`

**Purpose:** Interactive assessment tool for data maturity.

**Implementation:**
- Client-side script manages state (`currentQuestion`, `answers` array)
- Renders questions/results dynamically
- Calculates maturity score based on answers

**Content:**
- Uses `maturityCalculatorContent` from `data/content/maturityCalculator.ts` for:
  - Hero section
  - Introduction
  - Questions
  - Results

**Usage:** Accessible at `/tools/maturity-calculator`

---

## Component Development Guidelines

### Creating New Components

When creating new components:

1. **Location:** Place in `src/components/` for reusable components
2. **Naming:** Use PascalCase (e.g., `MyComponent.astro`)
3. **Props:** Define TypeScript interfaces for props
4. **Documentation:** Update this file when adding new components
5. **Data:** Use data files from `src/data/` instead of hardcoding content
6. **Accessibility:** Ensure semantic HTML and ARIA attributes where needed
7. **Mobile-First:** Design for mobile, then enhance for desktop
8. **Touch Targets:** Minimum 44px × 44px for interactive elements

### Component Patterns

**Simple Component:**
```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

**Component with Client-Side Interactivity:**
```astro
---
// Server-side code
---

<div id="interactive-element">
  <!-- HTML content -->
</div>

<script>
  // Client-side code
  const element = document.getElementById('interactive-element');
  // Add interactivity
</script>
```

---

## Component Dependencies

### Data Sources

Components use data from:
- `src/data/config/site.ts` - Site configuration
- `src/data/collections/` - Structured data (services, FAQ, team)
- `src/data/content/` - Page-specific content
- `src/data/shared/common.ts` - Common text

### External Libraries

- `astro-icon` - Material Design Icons
- `astro-breadcrumbs` - Breadcrumb navigation
- `astro-social-share` - Social sharing (blog posts)

---

## Additional Resources

- **Architecture:** See `ARCHITECTURE.md` for file structure
- **Data Structures:** See `DATA_STRUCTURES.md` for data patterns
- **Brand Guidelines:** See `BRAND_GUIDELINES.md` for styling
- **Agent Rules:** See `AGENT_RULES.md` for development guidelines

