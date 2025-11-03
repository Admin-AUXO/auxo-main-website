# Brand Guidelines

This document outlines the visual identity of the AUXO Data Labs website, including logo, colors, typography, sizing, and iconography.

---

## Logo

- **Design:** The logo is a distinctive 2x2 grid featuring the letters A-U-X-O.
- **Location:** `public/logo.svg` (static logo) and animated tiles in `src/pages/index.astro`
- **Usage:** Use the logo consistently across all pages and components.
- **Colors:** 
  - Logo tiles use a fixed green gradient (`#A3E635` to `#86D12F`) for consistency across dark and light themes
  - Logo tiles have **no rounded edges** (border-radius: 0)
  - The animated logo tiles in the hero section maintain consistent colors regardless of theme
- **Animated Logo:** The homepage hero features an animated logo with tile reveal animation

---

## Color Palette

The color scheme is defined as CSS variables in `src/styles/global.css`. The palette is designed for high contrast and readability (WCAG AA/AAA compliant) and supports both dark and light themes.

### Theme System

The site supports a comprehensive dark/light theme system with:
- **Automatic detection** of system preferences
- **Manual toggle** via theme toggle button in navigation
- **Persistent storage** of user preference in localStorage
- **Smooth transitions** between themes (0.3s cubic-bezier)

### Color Variables

#### Dark Theme (Default)
| Role                 | Variable Name        | Hex Code  | Usage                               |
|----------------------|----------------------|-----------|-------------------------------------|
| **Primary Accent**   | `--accent-green`     | `#A3E635` | CTAs, links, highlights, icons      |
| **Background**       | `--bg-primary`       | `#000000` | Main page background                |
| **Primary Text**     | `--text-primary`     | `#FFFFFF` | Main body text                      |
| **Secondary Text**   | `--text-secondary`   | `#A0A0A0` | Subheadings, less important text    |

#### Light Theme
| Role                 | Variable Name        | Hex Code  | Usage                               |
|----------------------|----------------------|-----------|-------------------------------------|
| **Primary Accent**   | `--accent-green`     | `#15803D` | Darker green for better contrast     |
| **Background**       | `--bg-primary`       | `#FFFFFF` | Main page background                |
| **Primary Text**     | `--text-primary`     | `#111827` | Main body text                      |
| **Secondary Text**   | `--text-secondary`   | `#4B5563` | Subheadings, less important text    |

### Theme-Aware Classes

Use these utility classes for theme-aware styling:

- **Backgrounds:** `bg-card`, `bg-surface`, `bg-primary`, `bg-secondary`
- **Text:** `text-primary`, `text-secondary`, `text-tertiary`
- **Borders:** `border-theme`, `border-theme-light`
- **Accent:** `accent-green` (automatically adjusts for theme)
- **Transitions:** Always add `transition-colors` for smooth theme changes

### Particle Background Colors

The particle background uses theme-aware opacity values:
- **Dark Theme:** Particles 0.15-0.35, Links 0.2, Triangles 0.08
- **Light Theme:** Particles 0.25-0.45, Links 0.3, Triangles 0.12

### Usage Guidelines

- Always use CSS variables (`var(--accent-green)`) instead of hex codes
- Use theme-aware utility classes instead of hardcoded colors
- Ensure sufficient contrast ratios for accessibility
- Test color combinations for WCAG AA/AAA compliance in both themes
- Add `transition-colors` to elements that change color with themes
- Use backdrop filters (`backdrop-blur-md`) for readability over particle backgrounds

---

## Typography

Fonts are defined in `src/styles/global.css` and loaded from Google Fonts in `src/components/SEO.astro`.

### Font Families

| Purpose          | Font Family      | Weights Available        |
|------------------|------------------|--------------------------|
| **Brand/Logo**   | Montserrat       | 900                      |
| **Headings**     | Plus Jakarta Sans| 600, 700, 800            |
| **Body**         | Plus Jakarta Sans| 400, 500, 600, 700       |

**Note:** Plus Jakarta Sans is used for both headings and body text for a cleaner, more cohesive look. This modern font provides excellent readability on both mobile and desktop devices.

### Typography Scale

Follow the Tailwind typography scale for consistent sizing across breakpoints.

---

## Sizing & Responsive Design

The site uses a **mobile-first** responsive design approach.

### Breakpoints

The project uses Tailwind's default breakpoints:
- **Mobile (default):** < 640px
- **Tablet (sm):** ≥ 640px
- **Desktop (lg):** ≥ 1024px
- **Large Desktop (xl):** ≥ 1280px

### Touch Targets

All interactive elements must meet minimum touch target sizes:

- **Minimum Size:** 44px × 44px
- **Spacing:** Adequate spacing between touch targets (minimum 8px)
- **Implementation:** Use `min-h-[44px]` or `min-w-[44px]` classes

### Mobile Optimization Guidelines

- Use responsive spacing patterns:
  - Mobile: `px-4 py-3`
  - Desktop: `sm:px-6 sm:py-2`
- Add `active:` states alongside `hover:` for better touch feedback
- Use `touch-manipulation` CSS for better mobile performance
- Test all interactive elements on mobile devices

### Responsive Patterns

```astro
<!-- Example: Responsive spacing -->
<div class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">

<!-- Example: Responsive text sizing -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl">

<!-- Example: Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

---

## Iconography

### Primary Library

The project uses [Material Design Icons](https://materialdesignicons.com/) via the `astro-icon` integration for UI icons throughout the site.

### Configuration

- **Location:** Icons are configured in `astro.config.mjs`
- **Optimization:** Only icons actually used in the codebase are included (audited and optimized January 2025)
- **Sorting:** Icons are alphabetically sorted for easier maintenance
- **Bundle Size:** Unused icons have been removed to reduce bundle size

### Usage

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="mdi:icon-name" class="w-6 h-6" />
```

### Icon Sizing Guidelines

- **Small icons:** `w-4 h-4` or `w-5 h-5`
- **Standard icons:** `w-6 h-6`
- **Large icons:** `w-8 h-8` or `w-10 h-10`
- Maintain consistent sizing within the same context

---

## Layout & Spacing

### Container Patterns

- Use semantic spacing classes from Tailwind
- Follow the 8px base spacing unit
- Maintain consistent padding/margins across similar components

### Grid Systems

- Use Tailwind's grid utilities for layouts
- Follow responsive grid patterns (1 column mobile → multiple columns desktop)

---

## Social Sharing Assets

### Integration

- **Library:** `astro-social-share` - Used on blog posts for social media sharing
- **Location:** Imported in `src/pages/blog/[slug].astro`
- **Platforms:** Twitter, LinkedIn, Facebook, Reddit

### Usage Example

```astro
import { SocialShare } from 'astro-social-share';

<SocialShare
  description={post.data.description}
  title={post.data.title}
  url={fullUrl}
  platforms={['twitter', 'linkedin', 'facebook', 'reddit']}
/>
```

---

## Maintenance Mode

### Integration

- **Library:** `astro-maintenance` - Environment-based maintenance page
- **Configuration:** Enabled via `MAINTENANCE_MODE=true` environment variable
- **Usage:** Set `MAINTENANCE_MODE=true` during deployments to show maintenance page

---

## Design Consistency Checklist

When creating or modifying components:

- [ ] Use CSS variables for colors (never hardcode hex values)
- [ ] Follow typography scale and font families
- [ ] Ensure 44px × 44px minimum touch targets for interactive elements
- [ ] Add responsive spacing (`px-4 sm:px-6 lg:px-8`)
- [ ] Include `active:` states alongside `hover:` states
- [ ] Use Material Design Icons consistently
- [ ] Test on mobile, tablet, and desktop viewports
- [ ] Verify color contrast meets WCAG AA standards

---

## Additional Resources

- **Tailwind Config:** `tailwind.config.js`
- **Global Styles:** `src/styles/global.css`
- **SEO Component:** `src/components/SEO.astro` (font loading)

