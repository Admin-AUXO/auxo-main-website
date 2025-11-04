# Components Reference

This document provides a reference for reusable components organized by category.

---

## Component Organization

Components are organized into logical directories for better maintainability:

```
src/components/
├── common/          # Core site-wide components (Navigation, Footer, SEO)
├── ui/              # Interactive UI elements (forms, buttons, modals)
├── layouts/         # Layout wrappers and specialized layouts
├── sections/        # Large page section components
├── effects/         # Visual effects and animations
├── schema/          # Structured data components
└── dev/             # Development-only tools
```

---

## 1. Common Components (`src/components/common/`)

Core components used across the entire site.

### Navigation.astro

-   **Location:** `src/components/common/Navigation.astro`
-   **Purpose:** Main site navigation with responsive mobile menu and desktop dropdowns.
-   **Features:** Services dropdown, mobile hamburger menu, theme toggle integration
-   **Usage:** `<Navigation />`

### Footer.astro

-   **Location:** `src/components/common/Footer.astro`
-   **Purpose:** Site footer with contact info, navigation, and newsletter signup.
-   **Props:**
    | Prop | Type | Default |
    | :--- | :--- | :--- |
    | `hideNewsletter` | `boolean` | `false` |
-   **Usage:** `<Footer hideNewsletter={true} />`

### SEO.astro

-   **Location:** `src/components/common/SEO.astro`
-   **Purpose:** Manages SEO meta tags, Open Graph data, and loads Google Fonts.
-   **Props:**
    | Prop | Type | Default |
    | :--- | :--- | :--- |
    | `title` | `string` | Site default title |
    | `description` | `string` | Site default description |
    | `image` | `string` | Site default OG image |
    | `article` | `boolean` | `false` |
-   **Usage:** `<SEO title="Page Title" description="Page description." />`

---

## 2. UI Components (`src/components/ui/`)

Interactive user interface elements.

### ThemeToggle.astro

-   **Location:** `src/components/ui/ThemeToggle.astro`
-   **Purpose:** Dark/light theme toggle button. Persists choice in `localStorage`.
-   **Features:** Smooth transitions, icon animation, system theme detection
-   **Usage:** `<ThemeToggle />`

### BackToTop.astro

-   **Location:** `src/components/ui/BackToTop.astro`
-   **Purpose:** A button that appears on scroll to take the user to the top of the page.
-   **Features:** Auto-show/hide on scroll, smooth scroll animation
-   **Usage:** `<BackToTop />`

### MultiStepForm.astro

-   **Location:** `src/components/ui/MultiStepForm.astro`
-   **Purpose:** 5-step contact form with client-side validation. Submits to `/api/contact`.
-   **Content:** Form fields and labels are managed in `src/data/content/forms.ts`.
-   **Features:** Progress indicator, validation, assisted answer fields
-   **Usage:** `<MultiStepForm />`

### CookieConsent.astro

-   **Location:** `src/components/ui/CookieConsent.astro`
-   **Purpose:** GDPR/UAE PDPL compliant cookie consent banner.
-   **Content:** Managed in `src/data/content/cookies.ts`.
-   **Features:** Accept/decline options, preference persistence, analytics integration
-   **Usage:** `<CookieConsent />`

---

## 3. Layout Components (`src/components/layouts/`)

Layout wrappers and specialized layouts.

### Layout Wrappers

-   **Location:** `src/components/layouts/`
-   **Purpose:** Provide consistent padding and containers for content.
-   **Components:**
    -   `ContentWrapper.astro` - Content width constraint with padding
    -   `PageContainer.astro` - Full-page wrapper with max-width
    -   `SectionContainer.astro` - Individual section wrapper with spacing
-   **Usage:**
    ```astro
    <PageContainer>
      <SectionContainer>
        <ContentWrapper>
          <!-- Your content here -->
        </ContentWrapper>
      </SectionContainer>
    </PageContainer>
    ```

### LegalLayout.astro

-   **Location:** `src/components/layouts/LegalLayout.astro`
-   **Purpose:** Specialized layout for legal pages with sidebar navigation.
-   **Props:**
    | Prop | Type | Required |
    | :--- | :--- | :--- |
    | `title` | `string` | Yes |
    | `lastUpdated` | `string` | Yes |
    | `effectiveDate` | `string` | No |
    | `summary` | `string` | No |
-   **Features:** Sticky sidebar, breadcrumbs, print-friendly styling
-   **Usage:** Wrap Markdown content for legal pages.

### BaseLayout.astro

-   **Location:** `src/layouts/BaseLayout.astro`
-   **Purpose:** Primary site layout. Includes `SEO`, `Navigation`, `Footer`, etc.
-   **Note:** This is in `src/layouts/` (not `src/components/layouts/`)
-   **Usage:** Used as the base for all pages.

---

## 4. Section Components (`src/components/sections/`)

Large, self-contained components that form the main sections of pages. Organized by page for better maintainability.

-   **Location:** `src/components/sections/`
-   **Organization:** Section components are organized into page-specific subdirectories:
    -   `sections/home/` - Homepage sections
    -   `sections/about/` - About page sections
    -   `sections/services/` - Services page sections
    -   `sections/blog/` - Blog page sections
    -   `sections/shared/` - Sections used across multiple pages

### Homepage Sections (`sections/home/`)

-   **HeroSection.astro** - Homepage hero with CTA
-   **MaturityCalculatorSection.astro** - Interactive maturity calculator preview
-   **MethodologySection.astro** - Methodology showcase
-   **LaunchOfferSection.astro** - Launch offer promotion
-   **FinalCtaSection.astro** - Final call-to-action
-   **BlogPreview.astro** - Blog post preview section
-   **WhyChooseSection.astro** - Why choose us section

### About Page Sections (`sections/about/`)

-   **AboutHero.astro** - About page hero
-   **MissionVision.astro** - Mission and vision cards
-   **TeamSection.astro** - Team member cards
-   **CredentialsSection.astro** - Credentials and certifications
-   **WhyDifferentSection.astro** - Comparison table
-   **EnhancedValuesSection.astro** - Company values showcase

### Services Sections (`sections/services/`)

-   **ServicesHero.astro** - Services page hero
-   **ServiceGrid.astro** - Grid of service cards
-   **BusinessImpact.astro** - Business impact showcase
-   **ServiceSummary.astro** - Service detail summary box
-   **ServiceBusinessImpact.astro** - Service-specific business impact
-   **ServiceStartupAdvantage.astro** - Startup advantage highlight
-   **ServiceTimeline.astro** - Service timeline display
-   **ExecutiveTimeCommitment.astro** - Executive time commitment info
-   **ServicesSection.astro** - Services showcase section

### Blog Sections (`sections/blog/`)

-   **BlogPostCard.astro** - Blog post card component (used in listings and related posts)
    -   `ServiceGrid.astro` - Services overview grid
    -   `BusinessImpact.astro` - Business value proposition
-   **Usage:** Imported directly into page files (e.g., `src/pages/index.astro`).
-   **Pattern:** Each section is fully self-contained with its own styling and data imports.

---

## 5. Effects Components (`src/components/effects/`)

Visual effects and animations.

### ParticleBackground.astro

-   **Location:** `src/components/effects/ParticleBackground.astro`
-   **Purpose:** Interactive, theme-aware particle background effect.
-   **Note:** Only loads `tsParticles` library when `showParticles` prop is true in `BaseLayout`.
-   **Features:** Theme-aware colors, performance optimized, responsive
-   **Usage:** `<ParticleBackground />`

---

## 6. Schema Components (`src/components/schema/`)

Structured data components for SEO.

### FAQSchema.astro

-   **Location:** `src/components/schema/FAQSchema.astro`
-   **Purpose:** Generates FAQ structured data (JSON-LD) for SEO.
-   **Props:**
    | Prop | Type | Required |
    | :--- | :--- | :--- |
    | `faqs` | `FAQ[]` | Yes |
-   **Usage:** `<FAQSchema faqs={faqs} />`

---

## 7. Development Components (`src/components/dev/`)

Development-only tools and utilities.

### DevBar.astro

-   **Location:** `src/components/dev/DevBar.astro`
-   **Purpose:** A development-only toolbar for debugging and testing.
-   **Note:** Only renders in development mode (`import.meta.env.DEV`).
-   **Features:** Environment info, route display, quick links
-   **Usage:** Included in `BaseLayout.astro`.

---

## Import Path Examples

With the new organization, import paths follow this pattern:

```astro
// From pages (src/pages/)
import Navigation from "../components/common/Navigation.astro";
import MultiStepForm from "../components/ui/MultiStepForm.astro";
import LegalLayout from "../components/layouts/LegalLayout.astro";
import FAQSchema from "../components/schema/FAQSchema.astro";

// From layouts (src/layouts/)
import SEO from "../components/common/SEO.astro";
import Footer from "../components/common/Footer.astro";
import BackToTop from "../components/ui/BackToTop.astro";
import ParticleBackground from "../components/effects/ParticleBackground.astro";
import DevBar from "../components/dev/DevBar.astro";

// From other components (src/components/common/)
import ThemeToggle from "../ui/ThemeToggle.astro";
```

---

## Component Development Guidelines

When creating or modifying components:

1. **Place in appropriate directory** based on component purpose
2. **Use TypeScript interfaces** for all props
3. **Import data from `src/data/`** rather than hardcoding
4. **Follow naming conventions:** PascalCase for component files
5. **Document props** with comments in the component file
6. **Keep components focused** - one responsibility per component
7. **Update this doc** when adding new components
