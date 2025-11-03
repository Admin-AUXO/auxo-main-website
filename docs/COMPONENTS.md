# Components Reference

This document provides detailed information about all reusable components in the project.

---

## Core Components

### Navigation.astro

**Location:** `src/components/Navigation.astro`

**Purpose:** Main site navigation with responsive mobile menu, desktop dropdowns, and theme toggle.

**Key Features:**
- Mobile menu with touch-optimized targets (44px × 44px minimum)
- Desktop dropdown menus for Services and Resources with smooth animations
- **Improved spacing** - Navigation items use `space-x-3` for better usability
- Active link highlighting based on current path
- Body scroll lock when mobile menu is open
- Responsive design (mobile-first)
- **Theme-aware styling** - adapts to dark/light mode using `bg-primary/95`
- Integrated theme toggle button
- **Service dropdown** - Removed descriptions, icons and text are center-aligned
- Modern hover effects and transitions

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
- Imports `ThemeToggle` component

---

### Footer.astro

**Location:** `src/components/Footer.astro`

**Purpose:** Site footer with contact info, navigation links, newsletter signup, and legal links.

**Key Features:**
- **Restructured layout** - More compact design with reduced padding
- **Removed service links** - Individual service links removed to prevent text cutoff
- Responsive grid layout (2 columns on mobile/tablet, optimized for all devices)
- Social media links (LinkedIn, Twitter) with hover effects
- Touch-optimized interactive elements
- **Theme-aware styling** - adapts to dark/light mode
- Icon-based navigation for better visual hierarchy
- Uses `siteData` from `data/config/site.ts`
- **Optimized spacing** - Reduced gaps and padding to prevent footer from hiding navigation

**Usage:**
```astro
---
import Footer from '@/components/Footer.astro';
---

<Footer />
```

---

### ThemeToggle.astro

**Location:** `src/components/ThemeToggle.astro`

**Purpose:** Dark/light theme toggle button with smooth icon transitions.

**Key Features:**
- Toggles between dark and light themes
- Persists user preference in localStorage
- Respects system preference on first visit
- Smooth icon transitions (moon/sun)
- Theme-aware button styling
- Accessible (ARIA labels, keyboard support)

**Usage:**
```astro
---
import ThemeToggle from '@/components/ThemeToggle.astro';
---


<ThemeToggle />
```

**Implementation:**
- Applies theme class to `<html>` element (`dark` or `light`)
- Updates CSS custom properties dynamically
- Integrates with theme system in `global.css`

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
- Loads Google Fonts (Plus Jakarta Sans, Montserrat)
- Generates structured data (JSON-LD)
- Supports custom structured data via props

**Note:** Fonts updated to Plus Jakarta Sans for cleaner, modern look with excellent readability on all devices.

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
- Progress indicator with smooth animations
- Submission to `/api/contact` endpoint
- **Theme-aware styling** - all form elements adapt to dark/light mode
- Modern input fields with focus states
- Touch-optimized buttons (44px minimum height)

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
- **Theme-aware styling** - banner and modal adapt to dark/light mode
- Smooth animations for banner and modal
- Touch-optimized buttons (44px minimum height)

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

**Purpose:** Interactive particle background effect with theme-aware optimization.

**Key Features:**
- Interactive particle animation using tsParticles
- **Theme-aware colors and opacity** - particles adapt to dark/light mode
  - Dark theme: Particles 0.15-0.35, Links 0.2, Triangles 0.08
  - Light theme: Particles 0.25-0.45, Links 0.3, Triangles 0.12
- **Automatic theme detection** - reinitializes particles when theme changes
- Responsive particle count (fewer on mobile for performance)
- Mouse interaction (hover effects, cursor trails with theme-aware colors)
- Scroll-based opacity changes
- Respects `prefers-reduced-motion` for accessibility
- Performance optimized for mobile devices

**Usage:**
```astro
---
import ParticleBackground from '@/components/ParticleBackground.astro';
---

<ParticleBackground />
```

**Note:** Only loads tsParticles library when enabled via `showParticles` prop in BaseLayout for performance.

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

### Homepage Sections

**Location:** `src/pages/index.astro`

**Purpose:** Main homepage with multiple sections and optimized readability.

**Key Sections:**
1. **Hero Section:**
   - Animated logo tiles (no rounded edges, fixed green color `#A3E635`)
   - Hero content with backdrop filter for readability
   - Optimized spacing to reduce gap between nav and hero
   - Two CTAs with proper contrast and backgrounds

2. **Our Proven Methodology:**
   - Redesigned number badges (larger, better contrast, visible borders)
   - 4-step process cards with hover effects
   - Value proposition cards

3. **Free Assessment Tool:**
   - CTA button with enhanced shadows for readability
   - Assessment dimensions preview

4. **Founding Client Offer:**
   - Badge with shadow for visibility
   - Enhanced subtitle readability (text-primary font-medium)
   - CTA button with improved contrast

5. **Final CTA:**
   - Wrapped in card container with backdrop filter
   - Enhanced subtitle readability
   - Prominent CTA button

**Readability Optimizations:**
- All text over particle background uses `text-primary` with `font-medium` for better contrast
- Buttons use `bg-card/95 backdrop-blur-md` for visibility
- Enhanced shadows on all CTAs
- Methodology numbers use `font-black text-2xl` with borders

**Usage:** Main homepage at `/`

---

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
9. **Theme Support:** Use theme-aware CSS variables:
   - `bg-card`, `bg-surface` for backgrounds
   - `text-primary`, `text-secondary` for text
   - `border-theme` for borders
   - `accent-green` for accent colors
   - Add `transition-colors` for smooth theme changes

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

## Theme System

### Theme Toggle

The site supports dark and light themes with smooth transitions. The theme system uses:

- **CSS Custom Properties:** Defined in `src/styles/global.css`
- **Theme Classes:** Applied to `<html>` element (`dark` or `light`)
- **Theme Toggle Component:** `ThemeToggle.astro` for user control (located in navigation bar)
- **Automatic Initialization:** Theme preference loaded before page render to prevent flash
- **Theme Persistence:** Theme preference stored in `localStorage` and persists across sessions
- **System Preference Detection:** Automatically detects system theme preference on first visit

### Theme-Aware Classes

When building components, use these theme-aware classes:

- **Backgrounds:** `bg-card`, `bg-surface`, `bg-primary`, `bg-secondary`
- **Text:** `text-primary`, `text-secondary`, `text-tertiary`
- **Borders:** `border-theme`, `border-theme-light`
- **Accents:** `accent-green` (automatically adjusts for theme)

### Theme Rules for Components

**CRITICAL:** When creating or modifying components:

1. **NEVER use hardcoded colors:**
   - ❌ Don't: `text-white`, `text-black`, `bg-black`, `bg-white`
   - ✅ Do: `text-primary`, `text-secondary`, `bg-card`, `bg-surface`

2. **Button Text Colors:**
   - Green buttons (`bg-accent-green`): Use `text-black dark:text-white`
   - Dark theme: White text on green buttons
   - Light theme: Black text on green buttons

3. **Always Test Both Themes:**
   - Verify all text is readable in both dark and light themes
   - Check contrast ratios meet WCAG AA standards
   - Ensure no black text in dark theme (except on green buttons)
   - Ensure no white text in light theme

4. **Particle Background Considerations:**
   - Particles use pure black/white based on theme
   - Use solid backgrounds for text containers
   - Ensure sufficient contrast for readability

5. **Logo Colors:**
   - Logo uses fixed green color `#A3E635` in both themes
   - Do not change logo colors based on theme

6. **Transitions:**
   - Always add `transition-colors` for smooth theme changes
   - Use `transition-all duration-300` for comprehensive theme transitions

### Component Theme Support

All major components now support theme switching:
- ✅ Navigation
- ✅ Footer
- ✅ CookieConsent
- ✅ MultiStepForm
- ✅ LegalLayout
- ✅ ParticleBackground
- ✅ ThemeToggle

---

## Additional Resources

- **Architecture:** See `ARCHITECTURE.md` for file structure
- **Data Structures:** See `DATA_STRUCTURES.md` for data patterns
- **Brand Guidelines:** See `BRAND_GUIDELINES.md` for styling
- **Agent Rules:** See `AGENT_RULES.md` for development guidelines

