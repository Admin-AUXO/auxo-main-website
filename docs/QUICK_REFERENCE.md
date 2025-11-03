# Quick Reference

A quick lookup guide for common tasks, file locations, and commands.

---

## File Locations

| Purpose                | Location                                  |
|------------------------|-------------------------------------------|
| Homepage               | `src/pages/index.astro`                   |
| Navigation             | `src/components/Navigation.astro`         |
| Footer                 | `src/components/Footer.astro`             |
| Theme Toggle           | `src/components/ThemeToggle.astro`        |
| Particle Background    | `src/components/ParticleBackground.astro` |
| SEO Component          | `src/components/SEO.astro`                |
| Base Layout            | `src/layouts/BaseLayout.astro`            |
| Site Configuration     | `src/data/config/site.ts`                 |
| Services Data          | `src/data/collections/services.ts`         |
| Common Text            | `src/data/shared/common.ts`               |
| Homepage Content       | `src/data/content/homepage.ts`            |
| About Content          | `src/data/content/about.ts`               |
| Contact Content        | `src/data/content/contact.ts`             |
| Forms Content          | `src/data/content/forms.ts`                |
| Maturity Calculator    | `src/data/content/maturityCalculator.ts`   |
| Global Styles          | `src/styles/global.css`                   |
| Validation Schemas     | `src/utils/validation.ts`                 |
| Rate Limiting          | `src/utils/rateLimit.ts`                  |
| Security Headers       | `public/_headers`                         |
| Astro Config           | `astro.config.mjs`                        |
| Tailwind Config        | `tailwind.config.js`                      |
| TypeScript Config      | `tsconfig.json`                          |
| ESLint Config          | `eslint.config.js`                        |

---

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint v9 with flat config
npm run lint:fix     # Auto-fix linting issues
npm run check        # Type check with Astro and TypeScript

# Dependency Management
npm install          # Install dependencies
npm ci               # Clean install (CI/CD)
npm audit            # Check for vulnerabilities
npm audit fix        # Fix vulnerabilities (if possible)
```

---

## Base URL Usage

```astro
---
const base = import.meta.env.BASE_URL;
---

<!-- Links -->
<a href={`${base}about`}>About</a>

<!-- Images -->
<img src={`${base}logo.svg`} alt="Logo" />

<!-- Client-Side Scripts -->
<script>
  fetch(`${import.meta.env.BASE_URL}api/contact`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
</script>
```

---

## Component Usage Patterns

### Simple Component

```astro
---
import MyComponent from '@/components/MyComponent.astro';
---

<MyComponent title="Example" />
```

### Component with Data

```astro
---
import { services } from '@/data/collections/services';
import { commonText } from '@/data/shared/common';
---

{services.map(service => (
  <div>
    <h2>{service.title}</h2>
    <button>{commonText.buttons.learnMore}</button>
  </div>
))}
```

### Component with Client-Side Script

```astro
<div id="interactive">
  <!-- Content -->
</div>

<script>
  const element = document.getElementById('interactive');
  // Add interactivity
</script>
```

---

## Data Import Patterns

### Site Configuration

```typescript
import { siteData } from '@/data/config/site';
```

### Collections

```typescript
import { services } from '@/data/collections/services';
import { faqs } from '@/data/collections/faq';
import { team } from '@/data/collections/team';
```

### Page Content

```typescript
import { homepageContent } from '@/data/content/homepage';
import { aboutContent } from '@/data/content/about';
import { contactContent } from '@/data/content/contact';
```

### Common Text

```typescript
import { commonText } from '@/data/shared/common';
// Usage: commonText.buttons.contact
```

---

## Environment Variables

### Required

```env
PUBLIC_SITE_URL=https://auxodata.com
BREVO_API_KEY=your-api-key
BREVO_FROM_EMAIL=noreply@auxodata.com
BREVO_FROM_NAME=AUXO Data Labs
CONTACT_EMAIL=contact@auxodata.com
```

### Optional

```env
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
MAINTENANCE_MODE=false
```

See `ENVIRONMENT_VARIABLES.md` for details.

---

## API Endpoints

### Contact Form

**Endpoint:** `POST /api/contact`

**Rate Limit:** 3 requests per 30 minutes

**Required Fields:**
- `firstName`, `lastName`, `email`
- `company`, `projectType`
- `services` (array)

### Newsletter

**Endpoint:** `POST /api/newsletter`

**Rate Limit:** 2 requests per hour

**Required Fields:**
- `email`
- `consent` (boolean, must be true)

See `API_ENDPOINTS.md` for details.

---

## Color Palette & Theme System

### Theme-Aware Classes
- **Backgrounds:** `bg-card`, `bg-surface`, `bg-primary`, `bg-secondary`
- **Text:** `text-primary`, `text-secondary`, `text-tertiary`
- **Borders:** `border-theme`, `border-theme-light`
- **Transitions:** Always add `transition-colors` for smooth theme changes

### Dark Theme (Default)
| Variable Name      | Hex Code  | Usage                      |
|--------------------|-----------|----------------------------|
| `--accent-green`   | `#A3E635` | CTAs, links, highlights    |
| `--bg-primary`     | `#000000` | Main background            |
| `--text-primary`   | `#FFFFFF` | Main text                  |
| `--text-secondary` | `#A0A0A0` | Secondary text             |

### Light Theme
| Variable Name      | Hex Code  | Usage                      |
|--------------------|-----------|----------------------------|
| `--accent-green`   | `#16A34A` | Darker green for contrast  |
| `--bg-primary`     | `#FFFFFF` | Main background            |
| `--text-primary`   | `#111827` | Main text                  |
| `--text-secondary` | `#4B5563` | Secondary text             |

**Usage:** Always use CSS variables or theme-aware utility classes: `var(--accent-green)` or `bg-card`

---

## Typography

- **Brand/Logo:** Montserrat (900) - Fixed green color `#A3E635` for consistency
- **Headings:** Plus Jakarta Sans (600, 700, 800)
- **Body:** Plus Jakarta Sans (400, 500, 600, 700)

**Note:** Plus Jakarta Sans provides excellent readability on both mobile and desktop devices.

---

## Breakpoints

- **Mobile (default):** < 640px
- **Tablet (sm):** ≥ 640px
- **Desktop (lg):** ≥ 1024px
- **Large Desktop (xl):** ≥ 1280px

---

## Touch Targets

- **Minimum Size:** 44px × 44px
- **Implementation:** `min-h-[44px]` or `min-w-[44px]`
- **Spacing:** Minimum 8px between targets

---

## Common Patterns

### Responsive Spacing

```astro
<div class="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
```

### Responsive Text

```astro
<h1 class="text-2xl sm:text-3xl lg:text-4xl">
```

### Responsive Grid

```astro
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

### Touch-Friendly Button

```astro
<button class="min-h-[44px] min-w-[44px] active:opacity-75">
```

### Readable Text Over Particles

```astro
<p class="text-primary font-medium">Text with better contrast</p>
<div class="bg-card/95 backdrop-blur-md border border-theme/50">Card with backdrop</div>
```

---

## Theme-Aware Styling

### Theme Toggle Usage

```astro
---
import ThemeToggle from '@/components/ThemeToggle.astro';
---

<ThemeToggle />
```

### Theme-Aware Component

```astro
<div class="bg-card border border-theme text-primary transition-colors">
  <p class="text-secondary">Theme-aware text</p>
</div>
```

### Button with Backdrop (for particle background)

```astro
<a class="bg-card/95 backdrop-blur-md border-2 border-accent-green text-accent-green">
  Button Text
</a>
```

---

## SEO Component Usage

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

---

## Icon Usage

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="mdi:icon-name" class="w-6 h-6" />
```

---

## Blog Post Creation

1. Create file: `src/content/blog/[slug].md`
2. Add frontmatter:
   ```markdown
   ---
   title: Post Title
   description: Post description
   publishDate: YYYY-MM-DD
   ---
   ```
3. Write content in Markdown

---

## Service Addition

1. Edit `src/data/collections/services.ts`
2. Add service object with:
   - `id`, `title`, `description`
   - `icon` (mdi:icon-name)
   - `features[]`, `deliverables[]`

---

## Common Issues & Solutions

### Base URL Not Working

**Problem:** Links/assets not loading correctly

**Solution:** Always use `import.meta.env.BASE_URL` prefix

### Emails Not Sending

**Problem:** Contact form/newsletter not sending emails

**Solution:** 
- Verify `BREVO_FROM_EMAIL` is verified in Brevo dashboard
- Check `BREVO_API_KEY` is correct
- Review Brevo dashboard for errors

### Build Failures

**Problem:** Build errors

**Solution:**
- Run `npm run lint` to check for linting errors
- Run `npm run check` to check for TypeScript errors
- Review error messages in build output

---

## Documentation Index

- **AGENT_RULES.md** - Core rules and guidelines
- **BRAND_GUIDELINES.md** - Visual identity
- **CONTENT_GUIDELINES.md** - Content and SEO
- **ARCHITECTURE.md** - File structure
- **API_ENDPOINTS.md** - API documentation
- **COMPONENTS.md** - Component reference
- **DATA_STRUCTURES.md** - Data patterns
- **DEPLOYMENT.md** - CI/CD workflows
- **SECURITY.md** - Security features
- **ENVIRONMENT_VARIABLES.md** - Configuration
- **CHANGELOG.md** - Change tracking
- **QUICK_REFERENCE.md** - This file

---

## Additional Resources

- **Project README:** See root `README.md`
- **Astro Docs:** [astro.build/docs](https://docs.astro.build)
- **Tailwind Docs:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Material Design Icons:** [materialdesignicons.com](https://materialdesignicons.com)

