# Security Headers Configuration

**Last Updated:** January 22, 2025

## Overview

Security headers protect against common web vulnerabilities like XSS, clickjacking, and MIME-sniffing attacks. This document explains how to configure security headers for both staging (Netlify) and production (GitHub Pages) deployments.

---

## Staging (Netlify) - Automated ✅

Security headers are **automatically applied** via `netlify.toml` configuration.

### Headers Applied

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-sniffing |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer info |
| `Permissions-Policy` | `camera=(), microphone=()...` | Restricts browser features |
| `Strict-Transport-Security` | `max-age=63072000...` | Forces HTTPS |
| `Content-Security-Policy` | See netlify.toml | Controls resource loading |

### Verification

```bash
# Check staging security headers
curl -I https://your-staging-url.netlify.app

# Or use online tool
https://securityheaders.com/?q=https://your-staging-url.netlify.app
```

---

## Production (GitHub Pages) - Manual Configuration Required

GitHub Pages doesn't support custom headers directly. Use **Cloudflare proxy** for security headers.

### Option 1: Cloudflare Proxy (Recommended)

#### Step 1: Add Site to Cloudflare
1. Sign up at https://www.cloudflare.com
2. Add your domain `auxodata.ae`
3. Update nameservers at your domain registrar

#### Step 2: Configure Transform Rules
In Cloudflare dashboard:

**Settings → Rules → Transform Rules → Modify Response Header**

Create rule: "Security Headers for AUXO"

**When incoming requests match:**
- Custom filter expression: `(http.host eq "auxodata.ae")`

**Then:**

Add headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

#### Step 3: Content Security Policy

Add CSP header separately (it's long):

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
```

#### Step 4: Verify
```bash
curl -I https://auxodata.ae
```

Expected output should show all security headers.

---

### Option 2: Meta Tags (Partial Solution)

Some headers can be set via HTML meta tags (not recommended as primary solution):

```html
<!-- src/layouts/BaseLayout.astro -->
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="...">
```

**Limitations:**
- Not all headers work via meta tags
- Less effective than HTTP headers
- Doesn't cover non-HTML resources

---

## Content Security Policy (CSP) Details

### Current CSP Directives

```
default-src 'self';
  → Only load resources from same origin by default

script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  → Scripts from self + Google Analytics
  → 'unsafe-inline' needed for inline scripts (consider moving to external files)

style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  → Styles from self + Google Fonts
  → 'unsafe-inline' needed for Tailwind/Astro scoped styles

font-src 'self' https://fonts.gstatic.com;
  → Fonts from self + Google Fonts CDN

img-src 'self' data: https:;
  → Images from self + data URIs + any HTTPS source
  → Consider tightening to specific domains

connect-src 'self' https://www.google-analytics.com;
  → API calls to self + Google Analytics
  → Add newsletter API domain when implemented

frame-ancestors 'none';
  → Prevent embedding in iframes

base-uri 'self';
  → Restrict <base> tag to same origin

form-action 'self';
  → Forms can only submit to same origin
  → Update when newsletter API is external
```

### Tightening CSP (Future)

When newsletter API is implemented:

```
connect-src 'self' https://www.google-analytics.com https://api.sendgrid.net;
```

To remove `unsafe-inline` (more secure):
1. Move all inline scripts to external files
2. Use nonces or hashes for unavoidable inline code
3. Configure Astro to extract inline styles

---

## Cache Headers

### Netlify (Automated via netlify.toml)

```
# Static assets (CSS, JS, fonts)
Cache-Control: public, max-age=31536000, immutable

# HTML files
Cache-Control: public, max-age=0, must-revalidate
```

### GitHub Pages (Automatic)

GitHub Pages automatically applies:
```
Cache-Control: max-age=600
```

Can be enhanced via Cloudflare:
1. **Page Rules** → Create rule for `auxodata.ae/assets/*`
2. **Cache Level:** Standard
3. **Edge Cache TTL:** 1 month
4. **Browser Cache TTL:** 1 month

---

## Testing & Verification

### Automated Tools

1. **Security Headers Scanner**
   - https://securityheaders.com
   - Grade: Target A+ rating

2. **Mozilla Observatory**
   - https://observatory.mozilla.org
   - Score: Target 90+

3. **SSL Labs**
   - https://www.ssllabs.com/ssltest/
   - Grade: Target A+

### Manual Testing

```bash
# Check all headers
curl -I https://auxodata.ae

# Check specific header
curl -I https://auxodata.ae | grep -i "x-frame-options"

# Test CSP
curl -I https://auxodata.ae | grep -i "content-security"
```

### Browser DevTools

1. Open site in Chrome
2. DevTools → Network tab
3. Click any request
4. Headers tab → View Response Headers

---

## Compliance Benefits

### UAE PDPL Compliance
- `Referrer-Policy`: Protects user privacy
- `Permissions-Policy`: Restricts unnecessary data collection
- CSP: Prevents data exfiltration

### Security Best Practices
- OWASP Top 10 mitigation
- PCI-DSS compliance (if handling payments)
- SOC 2 Type II alignment

---

## Troubleshooting

### Issue: CSP Blocking Resources

**Symptom:** Console errors like "Refused to load..."

**Solution:**
1. Check browser console for blocked resource URL
2. Add domain to appropriate CSP directive
3. Test on staging first

**Example:**
```
# If blocking https://cdn.example.com/script.js
script-src 'self' 'unsafe-inline' https://cdn.example.com;
```

### Issue: Analytics Not Working

**Symptom:** Google Analytics not tracking

**Solution:**
Ensure these domains are allowed:
```
script-src ... https://www.googletagmanager.com https://www.google-analytics.com;
connect-src ... https://www.google-analytics.com;
```

### Issue: Fonts Not Loading

**Symptom:** System fonts displayed instead of Google Fonts

**Solution:**
```
font-src 'self' https://fonts.gstatic.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

---

## Maintenance

### Monthly Tasks
- [ ] Check https://securityheaders.com score
- [ ] Review CSP violation reports (if configured)
- [ ] Update CSP when adding new third-party services

### Quarterly Tasks
- [ ] Audit all third-party domains in CSP
- [ ] Review Cloudflare analytics for blocked requests
- [ ] Test with latest browser versions

### When Adding New Services
1. Identify required domains
2. Update `netlify.toml` CSP
3. Document in this file
4. Update Cloudflare rules (production)
5. Test on staging
6. Deploy to production

---

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Security Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security)
- [Content Security Policy Guide](https://content-security-policy.com/)
- [Cloudflare Transform Rules](https://developers.cloudflare.com/rules/transform/)
- [Netlify Headers Documentation](https://docs.netlify.com/routing/headers/)

---

**Status:** ✅ Staging (Netlify) - Configured
**Status:** ⏳ Production (GitHub Pages) - Requires Cloudflare setup
**Next Action:** Configure Cloudflare proxy for auxodata.ae
