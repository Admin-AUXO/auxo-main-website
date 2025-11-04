# Components Reference

This document provides a reference for reusable components.

---

## 1. Core Components

### Navigation.astro

-   **Location:** `src/components/Navigation.astro`
-   **Purpose:** Main site navigation with responsive mobile menu and desktop dropdowns.
-   **Usage:** `<Navigation />`

### Footer.astro

-   **Location:** `src/components/Footer.astro`
-   **Purpose:** Site footer with contact info, navigation, and newsletter signup.
-   **Usage:** `<Footer />`

### ThemeToggle.astro

-   **Location:** `src/components/ThemeToggle.astro`
-   **Purpose:** Dark/light theme toggle button. Persists choice in `localStorage`.
-   **Usage:** `<ThemeToggle />`

### BackToTop.astro

-   **Location:** `src/components/BackToTop.astro`
-   **Purpose:** A button that appears on scroll to take the user to the top of the page.
-   **Usage:** `<BackToTop />`

### LoadingSpinner.astro

-   **Location:** `src/components/LoadingSpinner.astro`
-   **Purpose:** A reusable loading spinner.
-   **Props:**
    | Prop | Type | Default |
    | :--- | :--- | :--- |
    | `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
    | `text` | `string` | `undefined` |
-   **Usage:** `<LoadingSpinner size="lg" text="Loading..." />`

### SEO.astro

-   **Location:** `src/components/SEO.astro`
-   **Purpose:** Manages SEO meta tags, Open Graph data, and loads Google Fonts.
-   **Props:**
    | Prop | Type | Default |
    | :--- | :--- | :--- |
    | `title` | `string` | Site default title |
    | `description` | `string` | Site default description |
-   **Usage:** `<SEO title="Page Title" description="Page description." />`

### Breadcrumbs.astro

-   **Integration:** `astro-breadcrumbs`
-   **Purpose:** Auto-generated breadcrumb navigation with structured data.
-   **Usage:** `<Breadcrumbs />`

### FAQSchema.astro

-   **Location:** `src/components/FAQSchema.astro`
-   **Purpose:** Generates FAQ structured data (JSON-LD) for SEO.
-   **Props:**
    | Prop | Type | Required |
    | :--- | :--- | :--- |
    | `faqs` | `FAQ[]` | Yes |
-   **Usage:** `<FAQSchema faqs={faqs} />`

---

## 2. Interactive Components

### MultiStepForm.astro

-   **Location:** `src/components/MultiStepForm.astro`
-   **Purpose:** 5-step contact form with client-side validation. Submits to `/api/contact`.
-   **Content:** Form fields and labels are managed in `src/data/content/forms.ts`.
-   **Usage:** `<MultiStepForm />`

### CookieConsent.astro

-   **Location:** `src/components/CookieConsent.astro`
-   **Purpose:** GDPR/PDPL compliant cookie consent banner.
-   **Content:** Managed in `src/data/content/cookies.ts`.
-   **Usage:** `<CookieConsent />`

### ParticleBackground.astro

-   **Location:** `src/components/ParticleBackground.astro`
-   **Purpose:** Interactive, theme-aware particle background effect.
-   **Note:** Only loads `tsParticles` library when `showParticles` prop is true in `BaseLayout`.
-   **Usage:** `<ParticleBackground />`

---

## 3. Layout Components

### Layout Wrappers

-   **Location:** `src/components/layouts/`
-   **Purpose:** Provide consistent padding and containers for content.
-   **Components:**
    -   `ContentWrapper.astro`
    -   `PageContainer.astro`
    -   `SectionContainer.astro`
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

-   **Location:** `src/components/LegalLayout.astro`
-   **Purpose:** Specialized layout for legal pages with a sidebar navigation.
-   **Usage:** Wrap Markdown content for legal pages.

### BaseLayout.astro

-   **Location:** `src/layouts/BaseLayout.astro`
-   **Purpose:** Primary site layout. Includes `SEO`, `Navigation`, `Footer`, etc.
-   **Usage:** Used as the base for all pages.

---

## 4. Page Section Components

-   **Location:** `src/components/sections/`
-   **Purpose:** Larger, self-contained components that form the main sections of pages.
-   **Examples:** `HeroSection.astro`, `MethodologySection.astro`, `TeamSection.astro`.
-   **Usage:** Imported directly into page files (e.g., `src/pages/index.astro`).

---

## 5. Development Components

### DevBar.astro

-   **Location:** `src/components/DevBar.astro`
-   **Purpose:** A development-only toolbar for debugging and testing.
-   **Note:** Only renders in development mode (`import.meta.env.DEV`).
-   **Usage:** Included in `BaseLayout.astro`.

