# Brand Guidelines

This document outlines the visual identity for the AUXO Data Labs website.

---

## 1. Logo

-   **Design:** 2x2 grid with "A-U-X-O" letters.
-   **Location:** `public/logo.svg`
-   **Colors:** Fixed green gradient (`#A3E635` to `#86D12F`) for all themes.
-   **Style:** No rounded edges.

---

## 2. Color Palette

Colors are defined as CSS variables in `src/styles/global.css` and support dark/light themes.

| Theme | Role             | Variable Name      | Hex Code  |
| ----- | ---------------- | ------------------ | --------- |
| Dark  | **Primary Accent** | `--accent-green`   | `#A3E635` |
| Dark  | **Background**   | `--bg-primary`     | `#000000` |
| Dark  | **Primary Text** | `--text-primary`   | `#FFFFFF` |
| Dark  | **Secondary Text** | `--text-secondary` | `#A0A0A0` |
| Light | **Primary Accent** | `--accent-green`   | `#15803D` |
| Light | **Background**   | `--bg-primary`     | `#FFFFFF` |
| Light | **Primary Text** | `--text-primary`   | `#111827` |
| Light | **Secondary Text** | `--text-secondary` | `#4B5563` |

### Theme-Aware Classes

Use these utility classes for theme-aware styling. Add `transition-colors` for smooth theme changes.

-   **Backgrounds:** `bg-card`, `bg-surface`, `bg-primary`, `bg-secondary`
-   **Text:** `text-primary`, `text-secondary`, `text-tertiary`
-   **Borders:** `border-theme`, `border-theme-light`

---

## 3. Typography

Fonts are loaded from Google Fonts in `src/components/common/SEO.astro`. Optimized for visual hierarchy and readability.

| Purpose      | Font Family         | Weights         | Usage |
| ------------ | ------------------- | --------------- | ----- |
| **Brand/Logo** | `Montserrat`        | 900             | Logo and brand elements |
| **Headings** | `Plus Jakarta Sans` | 600, 700, 800   | H1-H6 headings, section titles |
| **Body**     | `Inter`             | 400, 500, 600   | Body text, paragraphs, UI elements |

### Font Selection Rationale

- **Montserrat (Logo):** Bold, distinctive, maintains brand identity
- **Plus Jakarta Sans (Headings):** Modern geometric style, creates strong visual hierarchy, excellent for large text
- **Inter (Body):** Highly optimized for readability, clean and professional, excellent letter spacing and character shapes

This combination creates a clear visual hierarchy: bold logo → distinctive headings → clean, readable body text.

---

## 4. Sizing & Responsive Design

-   **Approach:** Mobile-first.
-   **Breakpoints:** Standard Tailwind CSS breakpoints (`sm`, `lg`, `xl`).
-   **Touch Targets:** Minimum **44px x 44px** for all interactive elements (`min-h-[44px]`, `min-w-[44px]`).
-   **Responsive Spacing:** Use responsive prefixes (e.g., `px-4 sm:px-6 lg:px-8`).
-   **Touch Feedback:** Use `active:` states alongside `hover:`.

---

## 5. Iconography

-   **Library:** Material Design Icons via `astro-icon`.
-   **Configuration:** Icons are configured and optimized in `astro.config.mjs`.
-   **Usage:**
    ```astro
    ---
    import { Icon } from 'astro-icon/components';
    ---
    <Icon name="mdi:icon-name" class="w-6 h-6" />
    ```
-   **Sizing:** Use consistent sizing (`w-4 h-4`, `w-6 h-6`, `w-8 h-8`).

---

## 6. Design Tokens

Design tokens are defined as CSS variables in `src/styles/global.css` and support both light and dark themes.

### Spacing Tokens

| Token | Value | Usage |
| ----- | ----- | ----- |
| `--spacing-xs` | 0.25rem (4px) | Tight spacing |
| `--spacing-sm` | 0.5rem (8px) | Small spacing |
| `--spacing-md` | 1rem (16px) | Default spacing |
| `--spacing-lg` | 1.5rem (24px) | Large spacing |
| `--spacing-xl` | 2rem (32px) | Extra large spacing |
| `--spacing-2xl` | 3rem (48px) | 2x large spacing |
| `--spacing-3xl` | 4rem (64px) | 3x large spacing |

### Border Radius Tokens

| Token | Value | Usage |
| ----- | ----- | ----- |
| `--radius-sm` | 0.375rem (6px) | Small radius |
| `--radius-md` | 0.5rem (8px) | Default radius |
| `--radius-lg` | 0.75rem (12px) | Large radius |
| `--radius-xl` | 1rem (16px) | Extra large radius |
| `--radius-2xl` | 1.5rem (24px) | 2x large radius |
| `--radius-full` | 9999px | Full circle |

### Button State Tokens

All buttons use theme-aware state tokens for consistent styling across light/dark themes:

-   **Primary Button:** `--btn-primary-bg`, `--btn-primary-bg-hover`, `--btn-primary-bg-active`, `--btn-primary-bg-disabled`
-   **Secondary Button:** `--btn-secondary-bg`, `--btn-secondary-bg-hover`, `--btn-secondary-bg-active`, `--btn-secondary-bg-disabled`
-   **Ghost Button:** `--btn-ghost-bg`, `--btn-ghost-bg-hover`, `--btn-ghost-bg-active`
-   **Outline Button:** `--btn-outline-bg`, `--btn-outline-bg-hover`, `--btn-outline-bg-active`, `--btn-outline-border`

### Box State Tokens

Boxes and cards use theme-aware state tokens:

-   **Default:** `--box-bg-default`, `--box-border-default`, `--box-shadow-default`
-   **Hover:** `--box-bg-hover`, `--box-border-hover`, `--box-shadow-hover`

All state tokens ensure WCAG AA contrast compliance (≥4.5:1 for text, ≥3:1 for non-text).

---

## 7. UI Components

### Button Component

**Location:** `src/components/ui/Button.astro`

**Variants:**
-   `primary` - Green accent button (default)
-   `secondary` - Surface background button
-   `tertiary` / `ghost` - Transparent button
-   `outline` - Bordered button

**Sizes:** `sm`, `md` (default), `lg`

**Features:**
-   Theme-aware styling with WCAG AA compliant states
-   Accessible focus indicators (2px outline + shadow)
-   Hover, active, and disabled states
-   Can be used as button or link (via `href` prop)
-   Minimum 44px touch target

**Example:**
```astro
<Button variant="primary">Get Started</Button>
<Button variant="outline" href="/contact">Contact Us</Button>
<Button variant="secondary" disabled>Disabled</Button>
```

### Card Component

**Location:** `src/components/ui/Card.astro`

**Props:**
-   `interactive` - Adds cursor pointer
-   `hoverEffect` - Enables hover transform and shadow
-   `accentBorder` - Adds green accent border
-   `padding` - `sm`, `md` (default), `lg`, `xl`

**Example:**
```astro
<Card>Standard card</Card>
<Card interactive hoverEffect>Interactive card</Card>
<Card accentBorder>Accent bordered card</Card>
```

### Panel Component

**Location:** `src/components/ui/Panel.astro`

**Props:**
-   `elevated` - Uses elevated background with shadow
-   `padding` - `sm`, `md` (default), `lg`, `xl`

**Example:**
```astro
<Panel>Standard panel</Panel>
<Panel elevated>Elevated panel</Panel>
```

### Callout Component

**Location:** `src/components/ui/Callout.astro`

**Variants:** `default`, `info`, `warning`, `success`, `error`

**Example:**
```astro
<Callout variant="info">Information message</Callout>
<Callout variant="warning">Warning message</Callout>
```

---

## 8. CSS Organization

### Main CSS Files

-   **Global Styles:** `src/styles/global.css` (optimized, ~1100 lines)
    -   Base layer: CSS variables, design tokens, theme colors, typography
    -   Utilities layer: Animations, interactive elements, button/box utilities, layouts
    -   Well-organized with clear section comments
-   **Homepage Styles:** `src/styles/homepage.css` (~125 lines)
    -   Homepage-specific animations and hero effects
    -   Logo tile animations

### Performance Optimizations

The CSS has been optimized for:
-   **Reduced file size:** Consolidated redundant rules
-   **Better organization:** Clear section comments for easy navigation
-   **Improved maintainability:** Simplified selectors, removed excessive !important
-   **Performance:** CSS containment, will-change properties where appropriate
-   **Design tokens:** Centralized spacing, radius, shadows for consistency

### Accessibility

All interactive elements include:
-   **Focus indicators:** 2px solid outline + 3px shadow (WCAG AA compliant)
-   **Touch targets:** Minimum 44px × 44px
-   **Contrast ratios:** All text meets WCAG AA (≥4.5:1), non-text meets ≥3:1
-   **State visibility:** Hover, active, focus, disabled states are clearly distinguishable

---

## 9. Key File Locations

-   **Tailwind Config:** `tailwind.config.js`
-   **Global Styles & CSS Variables:** `src/styles/global.css`
-   **Homepage Styles:** `src/styles/homepage.css`
-   **Button Component:** `src/components/ui/Button.astro`
-   **Card Component:** `src/components/ui/Card.astro`
-   **Panel Component:** `src/components/ui/Panel.astro`
-   **Callout Component:** `src/components/ui/Callout.astro`
-   **Font Loading:** `src/components/common/SEO.astro`
-   **Theme Toggle:** `src/components/ui/ThemeToggle.astro`

