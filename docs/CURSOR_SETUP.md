# Cursor AI Guidelines Setup Guide

This guide explains how Cursor AI uses project guidelines and best practices for maintaining them.

---

## How Cursor Uses Guidelines

Cursor automatically reads the `.cursorrules` file in your project root to understand:
- Project conventions and coding standards
- File organization patterns
- Development workflow
- Common patterns and gotchas
- Communication preferences

The AI assistant will reference these guidelines when:
- Making code changes
- Suggesting improvements
- Answering questions about the codebase
- Following project conventions

---

## Current Setup

### `.cursorrules` File

**Location:** `.cursorrules` (project root)

**Status:** ✅ Created and configured

**Contents:**
- Core principles and development workflow
- Code conventions (naming, imports, styling)
- Content management rules
- Security guidelines
- Mobile optimization requirements
- Communication protocol
- Documentation update requirements

---

## How to Update Guidelines

### When to Update

Update `.cursorrules` when:
- Project conventions change
- New patterns are established
- Workflow processes evolve
- Common issues need to be documented

### How to Update

1. **Edit `.cursorrules` file** directly in the project root
2. **Keep it concise** - Focus on actionable guidelines, not full documentation
3. **Reference detailed docs** - Link to specific files in `docs/` for details
4. **Test changes** - Verify AI follows new guidelines correctly
5. **Commit changes** - `.cursorrules` should be tracked in git

### Best Practices

**DO:**
- Keep guidelines concise and actionable
- Focus on rules that AI should follow automatically
- Reference detailed documentation files for specifics
- Update when project conventions change
- Keep guidelines organized by category

**DON'T:**
- Duplicate full documentation content
- Make guidelines too verbose
- Include sensitive information (use `.gitignore` if needed)
- Forget to commit `.cursorrules` changes

---

## Guidelines Structure

The `.cursorrules` file is organized into sections:

1. **Documentation First** - Links to detailed documentation
2. **Core Principles** - Fundamental project principles
3. **Development Workflow** - Step-by-step process
4. **Code Conventions** - Naming, imports, comments
5. **Content Management** - Data organization rules
6. **Navigation & URLs** - Base URL usage
7. **Security & Configuration** - Security best practices
8. **Mobile Optimization** - Touch targets and responsive design
9. **File Locations** - Quick reference
10. **Communication Protocol** - How to interact with users
11. **Documentation Updates** - When to update docs
12. **Important Gotchas** - Common pitfalls

---

## Integration with Documentation

The `.cursorrules` file serves as a **quick reference**, while detailed documentation lives in:

- `docs/AGENT_RULES.md` - Full rules and guidelines
- `docs/BRAND_GUIDELINES.md` - Design system
- `docs/ARCHITECTURE.md` - File structure
- `docs/QUICK_REFERENCE.md` - Common patterns
- And other files in `docs/`

**Strategy:**
- `.cursorrules` = Quick reference for AI (what to do)
- `docs/` = Detailed documentation (why and how)

---

## Verifying Guidelines Work

### Test Commands

After updating `.cursorrules`, test with:

1. Ask AI to make a small change
2. Verify it follows the guidelines:
   - Uses base URL for links
   - Follows naming conventions
   - Uses data files instead of hardcoding
   - Asks for confirmation on small changes
   - Updates relevant documentation

### Common Tests

- **"Add a new button to the homepage"**
  - Should use `commonText` from `src/data/shared/common.ts`
  - Should use base URL for links
  - Should follow mobile-first design

- **"Update the contact form"**
  - Should check `docs/API_ENDPOINTS.md` for API structure
  - Should maintain validation patterns
  - Should ask before pushing changes

---

## Example: Updating Guidelines

### Scenario: New Pattern Established

**Old Pattern:**
```
Use inline styles for colors
```

**New Pattern:**
```
Always use CSS variables from global.css
```

**Update `.cursorrules`:**
```
## Styling

- Always use CSS variables from `src/styles/global.css`
- Use `var(--accent-green)` instead of hex codes
- Never use inline styles for colors
```

---

## Troubleshooting

### AI Not Following Guidelines

**Possible Causes:**
1. `.cursorrules` file not in project root
2. File not committed to git
3. Guidelines too vague or conflicting
4. Context window limitations

**Solutions:**
1. Verify file location: `project-root/.cursorrules`
2. Commit file: `git add .cursorrules && git commit`
3. Make guidelines more specific and actionable
4. Reference detailed docs instead of repeating content

### Guidelines Too Long

If `.cursorrules` becomes too long:
1. **Summarize** - Keep only essential rules
2. **Reference docs** - Link to detailed documentation
3. **Organize** - Group related rules together
4. **Remove redundancy** - Don't repeat what's in docs/

---

## Version Control

### Should `.cursorrules` Be Committed?

**YES** - `.cursorrules` should be committed to git because:
- Guidelines are project-specific, not personal
- Team members benefit from shared guidelines
- CI/CD can reference guidelines if needed
- Ensures consistency across environments

### What Should NOT Be Committed?

These are already in `.gitignore`:
- `.cursor/` - MCP configuration (contains secrets)
- `.mcp.json` - MCP server config
- `.env` - Environment variables

---

## Additional Resources

- **Cursor Documentation:** [cursor.sh/docs](https://cursor.sh/docs)
- **Project Documentation:** See `docs/README.md`
- **Quick Reference:** See `docs/QUICK_REFERENCE.md`

---

## Maintenance

### Regular Review

Review and update `.cursorrules`:
- After major project changes
- When patterns evolve
- Quarterly maintenance review
- When AI repeatedly makes the same mistakes

### Keeping It Current

- Sync with `docs/AGENT_RULES.md` periodically
- Remove outdated guidelines
- Add new patterns as they emerge
- Ensure consistency with documentation

---

**Last Updated:** Guidelines setup completed with `.cursorrules` file creation.

