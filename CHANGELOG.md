# Changelog

All notable changes to the AUXO Main Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Content Layer API v5.0 migration with modern `glob()` loader
- Three comprehensive blog articles:
  - Business Intelligence for Dubai businesses
  - Data Strategy guide for UAE enterprises
  - Machine Learning applications and ROI
- VS Code settings with JSON schema support for content collections
- Comprehensive Astro audit report (35+ pages)
- Optimization guide with before/after examples
- Draft field to blog schema for content management
- CHANGELOG.md file for version tracking

### Changed
- Migrated blog collection from legacy v2.0 API to Content Layer API v5.0
- Updated content schema to use `z.coerce.date()` for better date handling
- Improved Partytown configuration with development debug mode
- Enhanced compress integration with environment-aware settings
- Optimized image service with pixel limit configuration
- All blog articles use descriptive, SEO-friendly slugs

### Fixed
- Privacy policy link in Footer.astro newsletter form now uses base path
- Base path handling verified across all navigation components

### Removed
- Experimental `clientPrerender` flag (not beneficial for static GitHub Pages)

### Documentation
- Added comprehensive audit report in `docs/astro-audit.md`
- Created optimization summary in `docs/optimizations-applied.md`
- Documented Tailwind `applyBaseStyles` decision
- Added icon bundle optimization strategy comments
- Enhanced SVG viewBox preservation documentation

## [1.0.0] - 2025-01-15

### Added
- Initial project setup with Astro 5.14.6
- Static site configuration for GitHub Pages deployment
- Comprehensive integration suite:
  - @astrojs/mdx for enhanced markdown
  - @astrojs/sitemap with custom priorities
  - @astrojs/partytown for third-party scripts
  - @astrojs/tailwind for styling
  - astro-compress for asset optimization
  - astro-icon with selective MDI icons
- Sharp image optimization service
- Custom sitemap configuration with page-specific priorities
- Navigation component with dropdown menus
- Footer component with newsletter signup
- SEO component for metadata management
- Base layout with ViewTransitions support
- Services data structure with 6 core offerings
- Site data configuration
- Legal pages (Privacy Policy, Terms, Cookie Policy, DPA)
- Maturity calculator tool
- Contact form
- Case studies page
- Blog index page (placeholder)

### Configuration
- GitHub Pages deployment with base path `/auxo-main-website/`
- TypeScript strict mode enabled
- Content collections configured (blog)
- Vite optimization for Astro assets
- Security audit npm scripts

### Performance
- Comprehensive HTML/CSS/JS/Image/SVG compression
- Selective icon bundling to reduce bundle size
- Sharp image optimization with configurable limits
- Partytown for third-party script isolation

### SEO
- Custom sitemap with page priorities and change frequencies
- Structured metadata across all pages
- Open Graph and Twitter Card support
- Proper semantic HTML structure
- Accessibility features (ARIA labels, focus management)

---

## Version History

- **Unreleased** - Content Layer API migration, blog articles, optimizations
- **1.0.0** (2025-01-15) - Initial production release

---

## Planned Features

### Short-term (Next 1-2 months)
- [ ] Populate case studies with real client examples
- [ ] Add more blog articles covering all services
- [ ] Implement newsletter backend API
- [ ] Add Arabic language support (bilingual)
- [ ] Create custom 404 page

### Medium-term (3-6 months)
- [ ] Add View Transitions for smoother navigation
- [ ] Implement search functionality for blog
- [ ] Create downloadable resources section
- [ ] Add client testimonials slider
- [ ] Integrate analytics dashboard

### Long-term (6+ months)
- [ ] Full i18n support (Arabic/English)
- [ ] Interactive demos for services
- [ ] Client portal for existing customers
- [ ] Automated report generation tools
- [ ] Data maturity benchmark database

---

## Migration Notes

### Content Layer API Migration (v2.0 → v5.0)

**Before:**
```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({ ... }),
});
```

**After:**
```typescript
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({ ... }),
});
```

**Benefits:**
- Better performance with incremental builds
- Improved type inference
- Modern API alignment
- Support for multiple file formats in single pattern

---

## Security Updates

- All dependencies up to date as of 2025-01-22
- No known vulnerabilities (run `npm audit`)
- UAE PDPL compliance maintained
- Secure cookie handling
- HTTPS-only deployment

---

## Contributors

- AUXO Data Labs Team
- Claude Code (AI-assisted development)

---

For detailed technical audit and recommendations, see `docs/astro-audit.md`.
