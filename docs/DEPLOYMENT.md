# Deployment

This document covers CI/CD workflows, deployment processes, and environment configurations.

---

## Overview

The project uses GitHub Actions for CI/CD automation. Deployment is configured for production environment.

---

## Deployment Environment

### Production

- **Platform:** GitHub Pages
- **Branch:** `master`
- **Workflow:** `.github/workflows/deploy.yml`
- **URL:** Production domain (configured in repository settings)

---

## CI/CD Workflow

### Production Deployment (`deploy.yml`)

**Trigger:** Push to `master` branch

**Steps:**
1. Checkout code
2. Setup Node.js
3. Install dependencies (`npm ci`)
4. Run linting (`npm run lint`)
5. Run type checking (`npm run check`)
6. Build project (`npm run build`)
7. Deploy to GitHub Pages

**Configuration:**
- Uses GitHub Actions deployment
- Publishes `dist/` directory to GitHub Pages
- Requires repository secrets for deployment permissions

---

## Pre-Deployment Checklist

Before deploying:

- [ ] All tests pass (`npm run lint`, `npm run check`, `npm run build`)
- [ ] Environment variables configured correctly
- [ ] Brevo sender email verified
- [ ] Security headers up to date (`public/_headers`)
- [ ] No sensitive data in code or commits
- [ ] Documentation updated if needed

---

## Environment Variables

### Required for Production

See `ENVIRONMENT_VARIABLES.md` for complete list. Required variables:

- `PUBLIC_SITE_URL`: Base URL for the website
- `BREVO_API_KEY`: Brevo API key
- `BREVO_FROM_EMAIL`: Verified sender email (must be verified in Brevo)
- `BREVO_FROM_NAME`: Display name for sender
- `CONTACT_EMAIL`: Email to receive contact form submissions

### GitHub Secrets

Configure these in repository settings → Secrets:

- Environment variables (for production)

---

## Manual Deployment

### Local Build

```bash
# Install dependencies
npm ci

# Run checks
npm run lint
npm run check

# Build
npm run build

# Preview
npm run preview
```

### Deploy to Production

1. Merge changes to `master` branch
2. GitHub Actions will automatically deploy
3. Monitor deployment in Actions tab

---

## Build Configuration

### Build Output

- **Directory:** `dist/`
- **Static Assets:** Copied from `public/`
- **Generated Pages:** HTML files from Astro pages
- **API Endpoints:** Server-side endpoints in `dist/api/`

### Build Process

1. **Static Generation:** Astro generates static HTML from `.astro` pages
2. **Content Processing:** Processes content collections (blog posts)
3. **Asset Optimization:** Optimizes images and assets
4. **API Endpoints:** Includes server-side API endpoints
5. **Sitemap Generation:** Generates sitemap.xml files

---

## Deployment Platform

### GitHub Pages

**Configuration:**
- Source branch: `master`
- Build directory: `dist/`
- Custom domain: Configured in repository settings

**Limitations:**
- Static files only (API endpoints require server-side hosting)
- Build must complete successfully
- Limited server-side functionality

---

## Security Headers

### Configuration

**File:** `public/_headers`

**Deployment:**
- **GitHub Pages:** Requires manual configuration

**Headers Configured:**
- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

See `SECURITY.md` for detailed security information.

---

## Maintenance Mode

### Configuration

**Integration:** `astro-maintenance` package

**Usage:**
1. Set `MAINTENANCE_MODE=true` environment variable
2. Deploy to show maintenance page
3. Remove variable to restore normal site

**Use Cases:**
- Major updates
- Database migrations
- Scheduled maintenance

---

## Monitoring & Rollback

### Deployment Monitoring

- **GitHub Actions:** Check Actions tab for deployment status
- **Production Site:** Verify site loads correctly after deployment

### Rollback Procedure

1. Revert commit in `master` branch
2. Push revert commit
3. GitHub Actions will deploy previous version

---

## Post-Deployment Verification

After deployment, verify:

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms submit successfully
- [ ] API endpoints respond correctly
- [ ] Email delivery working (test contact form)
- [ ] No console errors
- [ ] Mobile responsiveness maintained
- [ ] SEO tags present
- [ ] Security headers applied

---

## Troubleshooting

### Build Failures

**Common Causes:**
- TypeScript errors
- Linting failures
- Missing environment variables
- Invalid configuration

**Resolution:**
1. Check build logs in GitHub Actions
2. Fix errors locally
3. Test build with `npm run build`
4. Push fixes

### Deployment Failures

**Common Causes:**
- Missing secrets/environment variables
- Permissions issues
- Platform-specific errors

**Resolution:**
1. Verify secrets configured correctly
2. Check platform-specific logs
3. Verify permissions in repository settings

### Email Issues

**Common Causes:**
- Unverified Brevo sender email
- Incorrect API key
- Rate limiting

**Resolution:**
1. Verify `BREVO_FROM_EMAIL` in Brevo dashboard
2. Check `BREVO_API_KEY` is correct
3. Review Brevo dashboard for errors

---

## Additional Resources

- **Security:** See `SECURITY.md`
- **Environment Variables:** See `ENVIRONMENT_VARIABLES.md`
- **Architecture:** See `ARCHITECTURE.md`
- **API Endpoints:** See `API_ENDPOINTS.md`

