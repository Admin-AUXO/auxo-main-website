# Data Structures

This document describes the data organization patterns, schemas, and structures used throughout the project.

---

## Data Organization Overview

The project uses a well-organized data hierarchy (refactored December 2025):

- **`src/data/config/`**: Site-wide configuration that rarely changes
- **`src/data/collections/`**: Structured data collections (services, FAQ, team, use cases)
- **`src/data/content/`**: Page-specific content organized by page (homepage, about, contact, etc.)
- **`src/data/shared/`**: Reusable common text used across multiple pages/components

**Status:** 80% of components and pages now use centralized data files instead of hardcoded content.

---

## Config Data (`src/data/config/`)

### site.ts

**Purpose:** Global site information that rarely changes.

**Structure:**
```typescript
export interface SiteData {
  name: string;
  tagline: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    linkedin: string;
    twitter: string;
  };
}

export const siteData: SiteData = {
  // ... site configuration
};
```

**Usage:**
- Imported in components that need site-wide information
- Used in Footer, Navigation, and SEO components

---

## Collections (`src/data/collections/`)

### services.ts

**Purpose:** Service definitions with features and deliverables.

**Structure:**
```typescript
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // mdi:icon-name
  features: string[];
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: 'data-strategy',
    title: 'Data Strategy',
    description: '...',
    icon: 'mdi:chart-line',
    features: ['...'],
    deliverables: ['...'],
  },
  // ...
];
```

**Usage:**
- Services listing page
- Individual service pages
- Navigation menus
- Footer links

---

### servicesUseCases.ts

**Purpose:** Use cases for each service.

**Structure:**
```typescript
export interface ServiceUseCase {
  serviceId: string;
  title: string;
  description: string;
  industry?: string;
}

export const serviceUseCases: ServiceUseCase[] = [
  // ... use cases organized by service
];
```

**Usage:**
- Service detail pages
- Case studies
- Marketing content

---

### faq.ts

**Purpose:** Frequently asked questions organized by category.

**Structure:**
```typescript
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    question: '...',
    answer: '...',
    category: 'general',
  },
  // ...
];
```

**Usage:**
- FAQ page
- FAQSchema component (structured data)
- Support content

---

### team.ts

**Purpose:** Team member profiles and information.

**Structure:**
```typescript
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  // ... team members
];
```

**Usage:**
- About page
- Team section

---

## Content Data (`src/data/content/`)

### homepage.ts

**Purpose:** Homepage hero, problems, methodology, CTAs.

**Structure:**
```typescript
export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  problems: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  methodology: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  // ...
}

export const homepageContent: HomepageContent = {
  // ... content
};
```

---

### about.ts

**Purpose:** About page mission, vision, values, team sections.

**Structure:**
```typescript
export interface AboutContent {
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  // ...
}
```

---

### contact.ts

**Purpose:** Contact page hero, sidebar, additional options.

**Structure:**
```typescript
export interface ContactContent {
  hero: {
    title: string;
    description: string;
  };
  sidebar: {
    title: string;
    items: Array<{ label: string; value: string }>;
  };
  // ...
}
```

---

### services.ts

**Purpose:** Services page hero, process, CTAs.

**Structure:**
```typescript
export interface ServicesContent {
  hero: {
    title: string;
    description: string;
  };
  process: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  // ...
}
```

---

### blog.ts

**Purpose:** Blog page hero, featured badge, empty states.

**Structure:**
```typescript
export interface BlogContent {
  hero: {
    title: string;
    description: string;
  };
  featured: {
    badge: string;
    label: string;
  };
  empty: {
    title: string;
    description: string;
  };
  // ...
}
```

---

### maturityCalculator.ts

**Purpose:** Calculator hero, intro, questions, results.

**Structure:**
```typescript
export interface MaturityCalculatorContent {
  hero: {
    title: string;
    description: string;
  };
  intro: {
    title: string;
    description: string;
  };
  questions: Array<{
    id: string;
    question: string;
    options: Array<{ value: string; label: string }>;
  }>;
  results: {
    title: string;
    descriptions: Record<string, string>; // score -> description
  };
  // ...
}
```

---

### caseStudies.ts

**Purpose:** Case study data and page content.

**Structure:**
```typescript
export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  industry: string;
  results: string[];
  // ...
}

export interface CaseStudiesContent {
  hero: {
    title: string;
    description: string;
  };
  // ...
}
```

---

### forms.ts

**Purpose:** Multi-step form step definitions and validation messages.

**Structure:**
```typescript
export interface MultiStepFormContent {
  steps: Array<{
    title: string;
    description: string;
    fields: Array<{
      name: string;
      label: string;
      placeholder?: string;
      type: string;
      required: boolean;
      options?: string[];
    }>;
  }>;
  validation: {
    required: string;
    email: string;
    // ... validation messages
  };
  navigation: {
    previous: string;
    next: string;
    submit: string;
  };
  // ...
}
```

---

### cookies.ts

**Purpose:** Cookie consent banner and modal content.

**Structure:**
```typescript
export interface CookieConsentContent {
  banner: {
    title: string;
    description: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
  };
  modal: {
    title: string;
    categories: Array<{
      id: string;
      name: string;
      description: string;
      required: boolean;
    }>;
    save: string;
  };
  // ...
}
```

---

### legal.ts

**Purpose:** Legal pages navigation and sidebar content.

**Structure:**
```typescript
export interface LegalContent {
  navigation: Array<{
    title: string;
    href: string;
  }>;
  sidebar: {
    title: string;
    links: Array<{
      title: string;
      href: string;
    }>;
  };
  // ...
}
```

---

## Shared Data (`src/data/shared/`)

### common.ts

**Purpose:** Centralized reusable text for buttons, labels, CTAs, error messages.

**Structure:**
```typescript
export interface CommonText {
  buttons: {
    contact: string;
    learnMore: string;
    submit: string;
    // ...
  };
  labels: {
    email: string;
    phone: string;
    name: string;
    // ...
  };
  cta: {
    readyToTransform: string;
    getStarted: string;
    // ...
  };
  errors: {
    pageNotFound: string;
    formError: string;
    // ...
  };
  meta: {
    // ... meta text
  };
}

export const commonText: CommonText = {
  // ... common text
};
```

**Usage:**
- Import `commonText` in components/pages to avoid duplicating common strings
- Use for buttons, labels, error messages, CTAs
- Check this file before adding new common text

---

## Content Collections (Astro)

### Blog Collection

**Location:** `src/content/blog/`

**Schema:** Defined in `src/content/config.ts`

**Structure:**
```typescript
{
  title: string;        // Required
  description: string;   // Required
  publishDate: Date;     // Required
  author?: string;       // Optional
  tags?: string[];       // Optional
}
```

**Usage:**
- Use Astro's `getCollection` API to query blog posts
- Example: `const posts = await getCollection('blog');`

---

## Data Management Best Practices

### DO

- **Use TypeScript interfaces:** Always define interfaces for data structures
- **Export interfaces:** Export interfaces alongside data for type safety
- **Organize logically:** 
  - Site config → `config/`
  - Structured collections → `collections/`
  - Page content → `content/`
  - Shared text → `shared/`
- **Check for existing data:** Before adding new data, check if it exists in `shared/common.ts`
- **Maintain consistency:** Use consistent naming and structure patterns

### DON'T

- **Hard-code strings:** Don't hard-code content in components or pages
- **Mix content types:** Don't put page content in `collections/` or shared text in page-specific files
- **Create duplicates:** Check existing files before creating new data
- **Skip TypeScript:** Always define interfaces for new data structures

---

## Adding New Data

### Steps

1. **Identify category:**
   - Site-wide config → `config/`
   - Structured collection → `collections/`
   - Page-specific → `content/[pageName].ts`
   - Shared/common → `shared/common.ts`

2. **Create TypeScript interface:**
   ```typescript
   export interface MyData {
     // ... structure
   }
   ```

3. **Create data with type:**
   ```typescript
   export const myData: MyData = {
     // ... data
   };
   ```

4. **Update documentation:** Update this file if adding new patterns

---

## Type Safety

### Import Pattern

```typescript
// Import both data and interface
import { services, type Service } from '@/data/collections/services';
import { commonText, type CommonText } from '@/data/shared/common';
```

### Usage in Components

```astro
---
import { services, type Service } from '@/data/collections/services';
import { commonText } from '@/data/shared/common';

// TypeScript ensures type safety
const firstService: Service = services[0];
---

<div>
  <h2>{firstService.title}</h2>
  <button>{commonText.buttons.learnMore}</button>
</div>
```

---

## Migration Status

- **80% Complete:** Most pages and components now use centralized data files
- **Remaining:** Some legacy hardcoded content may still exist
- **Goal:** 100% data-driven content

---

## Additional Resources

- **Architecture:** See `ARCHITECTURE.md` for file locations
- **Content Guidelines:** See `CONTENT_GUIDELINES.md` for content patterns
- **Components:** See `COMPONENTS.md` for component usage

