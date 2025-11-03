# Content Guidelines

This document outlines the content tone, SEO guidelines, and content management practices for the AUXO Data Labs website.

---

## Tone of Voice

### Brand Voice

- **Professional yet approachable:** Technical expertise without excessive jargon
- **Clear and concise:** Direct communication that respects the reader's time
- **Confident but not boastful:** Demonstrate expertise without overselling
- **Solution-focused:** Emphasize solving problems and delivering value

### Writing Style

- Use active voice where possible
- Break up long paragraphs (3-4 sentences max)
- Use bullet points for lists of features or benefits
- Include concrete examples and use cases
- Avoid marketing fluff and buzzwords

---

## SEO Guidelines

### Meta Tags

All pages must include proper SEO metadata:

- **Title:** Include primary keyword, brand name, and keep under 60 characters
- **Description:** Compelling, keyword-rich description under 160 characters
- **Use SEO Component:** All SEO is managed through `src/components/SEO.astro`

### Structured Data

The site uses JSON-LD structured data for:

- `Organization`
- `LocalBusiness`
- `WebSite`
- `BlogPosting`
- `BreadcrumbList`
- `FAQPage`

### On-Page SEO Best Practices

- **Headings:** Use proper heading hierarchy (H1 → H2 → H3)
- **Alt Text:** All images must have descriptive alt text
- **Internal Linking:** Link to relevant internal pages naturally
- **URLs:** Use descriptive, keyword-rich URLs
- **Meta Descriptions:** Write unique, compelling descriptions for each page

### Robots.txt

- **Location:** `public/robots.txt`
- **Configuration:** Allows all crawlers except for the `/api/` directory

---

## Content Organization

### Data-Driven Content (80% Rule)

80% of the site's content is managed in TypeScript files in `src/data/`. Always use these files instead of hardcoding content.

### Content File Structure

- **`src/data/config/`**: Site-wide configuration that rarely changes
- **`src/data/collections/`**: Structured data collections (services, FAQ, team)
- **`src/data/content/`**: Page-specific content organized by page
- **`src/data/shared/`**: Reusable common text used across multiple pages/components

### Content Management Rules

**DO:**
- Use data files in `src/data/` for all content
- Check `shared/common.ts` before adding new common text
- Maintain TypeScript interfaces for all data structures
- Export interfaces alongside data

**DON'T:**
- Hard-code strings directly into components or pages
- Mix content types (don't put page content in `collections/`)
- Create duplicate data without checking existing files first

---

## Page-Specific Content Guidelines

### Homepage

- Clear value proposition in hero section
- Problem/solution approach
- Clear CTAs throughout
- Content location: `src/data/content/homepage.ts`

### About Page

- Mission, vision, and values clearly stated
- Team information and expertise
- Content location: `src/data/content/about.ts`

### Services Pages

- Clear service descriptions
- Features and deliverables listed
- Use cases included
- Content locations:
  - `src/data/collections/services.ts` (service definitions)
  - `src/data/collections/servicesUseCases.ts` (use cases)
  - `src/data/content/services.ts` (page content)

### Blog Posts

- Follow schema defined in `src/content/config.ts`
- Required fields: `title`, `description`, `publishDate`
- Location: `src/content/blog/`

### Contact Page

- Clear contact options
- Multi-step form with clear instructions
- Content location: `src/data/content/contact.ts`

### FAQ Page

- Organized by category
- Clear, concise answers
- Content location: `src/data/collections/faq.ts`

---

## Common Text Patterns

### Buttons & CTAs

- Use `commonText.buttons` from `src/data/shared/common.ts`
- Standard buttons: "Get in Touch", "Learn More", "Contact Us"
- CTAs: "Ready to Transform Your Business?"

### Labels & Form Fields

- Use `commonText.labels` from `src/data/shared/common.ts`
- Standard labels: Email, Phone, Name, Company, etc.

### Error Messages

- Use `commonText.errors` from `src/data/shared/common.ts`
- Provide clear, helpful error messages
- Include guidance on how to resolve errors

---

## Content Workflow

### Adding New Content

1. **Identify content type:**
   - Page-specific → `src/data/content/[pageName].ts`
   - Shared/common → `src/data/shared/common.ts`
   - Structured collection → `src/data/collections/[name].ts`

2. **Check for existing content:**
   - Search existing files before creating new ones
   - Reuse common text from `shared/common.ts`

3. **Add with proper TypeScript interfaces:**
   - Define interfaces for all data structures
   - Export interfaces alongside data

4. **Update documentation if needed:**
   - Update `DATA_STRUCTURES.md` if adding new data patterns

### Modifying Existing Content

1. Locate the content file in `src/data/`
2. Make changes while maintaining structure
3. Update TypeScript interfaces if structure changes
4. Test that pages using the content still work

---

## SEO Checklist for New Pages

When creating a new page:

- [ ] Unique, keyword-rich title (under 60 characters)
- [ ] Compelling meta description (under 160 characters)
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Descriptive alt text for all images
- [ ] Internal links to relevant pages
- [ ] Structured data (if applicable)
- [ ] Unique content (no duplication)
- [ ] Mobile-friendly content structure
- [ ] Fast loading (optimized images, minimal JS)

---

## Content Quality Standards

### Readability

- Target reading level: Professional but accessible
- Paragraph length: 3-4 sentences maximum
- Use bullet points for lists
- Break up long sections with subheadings

### Accuracy

- Verify all technical information
- Include relevant examples and use cases
- Update outdated content promptly

### Consistency

- Use consistent terminology throughout
- Follow naming conventions from `common.ts`
- Maintain consistent formatting

---

## Social Media Sharing

### Blog Posts

- Include social sharing buttons (Twitter, LinkedIn, Facebook, Reddit)
- Optimize social preview images
- Write shareable descriptions

### Open Graph Tags

Managed through `SEO.astro` component. Ensure all pages have:
- OG title
- OG description
- OG image (`og-image.svg`)

---

## Legal & Compliance

### Cookie Policy

- Cookie consent banner content in `src/data/content/cookies.ts`
- GDPR/PDPL compliant

### Privacy & Legal Pages

- Content location: `src/data/content/legal.ts`
- Use `LegalLayout.astro` for legal pages

---

## Content Updates

When updating content:

1. Locate the correct data file
2. Make changes while maintaining TypeScript structure
3. Test the page renders correctly
4. Update relevant documentation if structure changes

---

## Additional Resources

- **SEO Component:** `src/components/SEO.astro`
- **Common Text:** `src/data/shared/common.ts`
- **Homepage Content:** `src/data/content/homepage.ts`
- **About Content:** `src/data/content/about.ts`
- **Contact Content:** `src/data/content/contact.ts`
- **Forms Content:** `src/data/content/forms.ts`

