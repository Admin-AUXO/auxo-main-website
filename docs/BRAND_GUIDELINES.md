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

Fonts are loaded from Google Fonts in `src/components/SEO.astro`.

| Purpose      | Font Family         | Weights         |
| ------------ | ------------------- | --------------- |
| **Brand/Logo** | `Montserrat`        | 900             |
| **Headings** | `Plus Jakarta Sans` | 600, 700, 800   |
| **Body**     | `Plus Jakarta Sans` | 400, 500, 600, 700 |

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

## 6. Key File Locations

-   **Tailwind Config:** `tailwind.config.js`
-   **Global Styles & CSS Variables:** `src/styles/global.css`
-   **Font Loading:** `src/components/SEO.astro`
-   **Theme Toggle:** `src/components/ThemeToggle.astro`

