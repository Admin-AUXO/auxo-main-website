# Changelog

This document tracks significant changes, updates, and improvements to the AUXO Data Labs website.

---

## Format

Entries are organized by date (newest first) and include:
- **Date:** When the change was made
- **Type:** Type of change (Feature, Bug Fix, Documentation, Refactor, etc.)
- **Description:** Brief description of the change
- **Files Changed:** Key files affected (if applicable)
- **GitHub Commit/PR:** Link to commit or PR (if applicable)

---

## [Unreleased]

### Documentation | Developer Experience
**Date:** 2025-11-03

**Description:** Updated documentation with correct project root path and PowerShell-compatible command syntax guidelines.

**Key Changes:**
- Added explicit project root path: `A:\AUXO\Main Website` to all relevant documentation
- Documented PowerShell syntax requirements (no `&&` operator support)
- Updated `AGENT_RULES.md` with "Project Root & Command Syntax" section
- Updated `DEPLOYMENT.md` with PowerShell-compatible command examples
- Updated `QUICK_REFERENCE.md` with project root and PowerShell syntax notes
- Removed obsolete `READABILITY_IMPROVEMENTS.md` file

**Files Changed:**
- `.cursorrules` - Added project root and PowerShell command syntax section
- `docs/AGENT_RULES.md` - Added project root and PowerShell command syntax section
- `docs/DEPLOYMENT.md` - Updated local build commands with PowerShell syntax
- `docs/QUICK_REFERENCE.md` - Added project root and PowerShell syntax notes
- `docs/READABILITY_IMPROVEMENTS.md` - Removed (obsolete)

**Impact:** Prevents future AI agents from making directory navigation and command syntax mistakes when running builds or other npm commands.

---

### Feature | UI/UX | Performance | Accessibility
**Date:** 2025-11-03

**Description:** Homepage readability improvements, methodology section redesign, and comprehensive theme system enhancements.

**Key Changes:**
- **Homepage Readability Improvements:**
  - Optimized text colors for pure black/white particle backgrounds
  - Removed all shadows/glow effects, using color-based solutions instead
  - Improved contrast ratios for all text elements (WCAG AAA compliance)
  - Enhanced dark theme backgrounds (less gray, better contrast)
  - Fixed all button text colors for proper visibility in both themes
  - Added green accent borders to all boxes for importance indication
  - Implemented subtle pulsing animation for boxes

- **Methodology Section Redesign:**
  - Removed small number badges, kept only large background numbers
  - Removed icons from methodology cards
  - Right-aligned titles (Discover, Design, Deploy, Optimize)
  - Rewrote and equalized all descriptions for better clarity and consistency
  - Removed bottom Value Props section (2-4 Weeks, Agile, 100%)
  - Cleaner, more focused layout

- **Footer Improvements:**
  - Moved Legal links under Resources section
  - Removed individual service links to prevent text cutoff
  - Better organization and spacing

- **Theme System Enhancements:**
  - Comprehensive theme-aware color system
  - Automatic text color adjustment for buttons (black in light, white in dark)
  - Theme persistence via localStorage
  - Theme-aware particle background optimization
  - Improved navigation bar spacing (space-x-5)
  - Logo colors fixed to consistent green in both themes

- **Component Updates:**
  - Navigation: Increased spacing, improved button readability
  - Footer: Restructured layout, Legal links moved under Resources
  - Hero Section: Enhanced backdrop for better text readability
  - Methodology Section: Redesigned with large background numbers
  - All CTAs: Fixed text colors for both themes

**Files Changed:**
- `src/pages/index.astro` - Methodology section redesign, readability improvements
- `src/components/Navigation.astro` - Increased spacing, fixed button text colors
- `src/components/Footer.astro` - Restructured layout, Legal links moved under Resources
- `src/styles/global.css` - Theme system enhancements, improved contrast, pulsing animations
- `src/data/content/homepage.ts` - Rewritten methodology descriptions
- `docs/AGENT_RULES.md` - Added comprehensive theme system guidelines
- `docs/CHANGELOG.md` - This entry

**Details:**
- Logo colors fixed to `#A3E635` for consistency across themes
- Navigation spacing increased for better usability
- All buttons and CTAs now have proper contrast and backgrounds
- Methodology section numbers redesigned with larger size and better contrast
- Footer optimized to prevent hiding navigation bar
- All text elements use theme-aware colors for optimal readability
- Particle background opacity optimized per theme for visibility without distraction

---

### Content
- **Startup Narrative Enhancement:** Comprehensive review and update of all website content to reflect authentic startup positioning
  - Updated homepage to emphasize startup advantages (agility, direct access, fresh perspective)
  - Revised About page with stronger startup story and founding narrative
  - Enhanced services page with startup-friendly messaging
  - Updated contact page to highlight startup advantages (quick response, personal touch)
  - Added FAQ entry addressing startup transparency
  - Adjusted site stats to reflect startup reality
  - Updated case studies narrative to acknowledge startup stage
  - Refined launch offer messaging for founding clients

**Files Changed:**
- `src/data/config/site.ts` - Updated stats to reflect startup reality
- `src/data/content/homepage.ts` - Enhanced startup narrative and advantages
- `src/data/content/about.ts` - Strengthened startup story and founding team narrative
- `src/data/content/services.ts` - Added startup-friendly messaging
- `src/data/content/contact.ts` - Emphasized startup advantages
- `src/data/collections/faq.ts` - Added startup transparency questions
- `src/data/content/caseStudies.ts` - Updated narrative to acknowledge startup stage
- `src/data/collections/team.ts` - Updated team description with startup positioning
- `src/components/SEO.astro` - Updated default meta description and structured data
- `src/pages/about.astro` - Updated page meta description
- `src/pages/contact.astro` - Updated page meta description with startup messaging
- `src/pages/services/index.astro` - Updated page meta description
- `src/pages/case-studies.astro` - Updated page meta description
- `src/pages/faq.astro` - Updated page meta description
- `src/pages/tools/maturity-calculator.astro` - Updated recommendation text and meta description
- `src/pages/api/contact.ts` - Updated email template branding
- `src/pages/api/newsletter.ts` - Updated email template branding
- `docs/CONTENT_GUIDELINES.md` - Added startup narrative guidance
- `docs/CHANGELOG.md` - This entry

### Documentation
- **Refactored Documentation:** Split `TECHNICAL_DOCUMENTATION.md` into multiple focused files for better organization and maintainability
  - Created `AGENT_RULES.md` - Core rules and guidelines for AI agents
  - Created `BRAND_GUIDELINES.md` - Visual identity and design guidelines
  - Created `CONTENT_GUIDELINES.md` - Content tone and SEO guidelines
  - Created `ARCHITECTURE.md` - File structure and sitemap
  - Created `API_ENDPOINTS.md` - API endpoint documentation
  - Created `COMPONENTS.md` - Component reference
  - Created `DATA_STRUCTURES.md` - Data organization patterns
  - Created `DEPLOYMENT.md` - CI/CD and deployment workflows
  - Created `SECURITY.md` - Security features and best practices
  - Created `ENVIRONMENT_VARIABLES.md` - Environment variable configuration
  - Created `CHANGELOG.md` - This file for tracking changes
  - Created `QUICK_REFERENCE.md` - Quick lookup guide
  - Created `README.md` - Documentation index

---

## Template for Future Entries

### YYYY-MM-DD

#### Feature | Bug Fix | Documentation | Refactor | Security | Performance

**Description:** Brief description of what changed.

**Files Changed:**
- `path/to/file1.ts` - What changed
- `path/to/file2.astro` - What changed

**Details:**
- More detailed information if needed
- Breaking changes documented
- Migration instructions if applicable

**GitHub:** [Commit/PR Link](#)

---

## Change Types

- **Feature:** New functionality added
- **Bug Fix:** Bug fixes and error corrections
- **Documentation:** Documentation updates and improvements
- **Refactor:** Code refactoring without changing functionality
- **Security:** Security improvements and fixes
- **Performance:** Performance optimizations
- **Style:** Code style changes (formatting, etc.)
- **Test:** Test additions or changes
- **Chore:** Maintenance tasks, dependency updates

---

## How to Update This File

When making changes:

1. **Add entry** under `[Unreleased]` section
2. **Use appropriate type** (Feature, Bug Fix, etc.)
3. **Include date** (YYYY-MM-DD)
4. **Describe changes** clearly
5. **List key files** affected
6. **Link to commit/PR** if applicable
7. **Move to dated section** when released

---

## Release Notes

When creating a release:

1. Move `[Unreleased]` entries to a new `[Version] - YYYY-MM-DD` section
2. Group entries by type
3. Add release notes highlighting major changes
4. Tag release in git repository

---

## Notes

- This changelog follows [Keep a Changelog](https://keepachangelog.com/) format
- Entries should be clear and concise
- Focus on user-visible changes and significant technical changes
- Link to commits/PRs when possible for detailed information

