# Data Structures

This document outlines the TypeScript data structures used in `src/data/`.

---

## 1. Data Organization

-   **`config/`**: Site-wide configuration.
-   **`collections/`**: Structured data sets (e.g., services, FAQs).
-   **`content/`**: Page-specific content.
-   **`shared/`**: Reusable text snippets.

---

## 2. Core Interfaces

### `src/data/config/site.ts`

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
```

### `src/data/shared/common.ts`

```typescript
export interface CommonText {
  buttons: { [key: string]: string };
  labels: { [key: string]: string };
  cta: { [key: string]: string };
  errors: { [key: string]: string };
}
```

---

## 3. Collection Interfaces

### `src/data/collections/services.ts`

```typescript
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // mdi:icon-name
  features: string[];
  deliverables: string[];
}
```

### `src/data/collections/faq.ts`

```typescript
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
```

### `src/data/collections/team.ts`

```typescript
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}
```

---

## 4. Content Interfaces

The following files in `src/data/content/` contain page-specific content structures. Interfaces are defined within each file.

-   **`homepage.ts`**: Defines content for the homepage sections (Hero, Methodology, etc.).
-   **`about.ts`**: Defines content for the About page (Mission, Vision, Values).
-   **`contact.ts`**: Defines content for the Contact page hero and sidebar.
-   **`services.ts`**: Defines content for the main services page.
-   **`blog.ts`**: Defines content for the blog listing page.
-   **`maturityCalculator.ts`**: Defines questions and results for the maturity calculator.
-   **`forms.ts`**: Defines fields, steps, and validation messages for the multi-step form.
-   **`cookies.ts`**: Defines content for the cookie consent banner and modal.
-   **`legal.ts`**: Defines navigation and sidebar content for legal pages.

---

## 5. Content Collections (Astro)

### Blog Post Schema

-   **Location:** `src/content/blog/`
-   **Schema:** Defined in `src/content/config.ts`
-   **Frontmatter:**
    ```typescript
    {
      title: string;
      description: string;
      publishDate: Date;
      author?: string;
      tags?: string[];
    }
    ```

---

## 6. Data Management Rules

-   **Use Interfaces:** Always define and export a TypeScript interface for any new data structure.
-   **Organize Logically:** Place new data in the correct directory (`config`, `collections`, `content`, or `shared`).
-   **Check for Reuse:** Before adding new text, check `src/data/shared/common.ts` to avoid duplication.
-   **Don't Hard-code:** Fetch content from the `src/data/` directory instead of hard-coding it in components.

