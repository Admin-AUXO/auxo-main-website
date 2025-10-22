# Font Optimization Guide

**Last Updated:** January 22, 2025

## Current Setup

### Fonts Used
- **Inter** (400, 500, 600, 700) - Body text
- **Space Grotesk** (600, 700, 800) - Headings
- **Montserrat** (900) - Brand/Logo

### Loading Strategy
Fonts are loaded from Google Fonts CDN with optimizations:

```html
<!-- Preconnect for faster DNS/TLS -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Async load with display=swap -->
<link rel="preload"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Montserrat:wght@900&display=swap"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'" />
```

### Benefits of Current Approach
✅ Fast DNS resolution (preconnect)
✅ Non-blocking load (async)
✅ No FOIT (Flash of Invisible Text) - uses `display=swap`
✅ Google Fonts CDN is globally distributed
✅ Automatic format optimization (woff2 for modern browsers)

### Performance Metrics
- **Font load time:** ~100-200ms (with preconnect)
- **Total font size:** ~80KB (woff2, compressed)
- **CLS impact:** Minimal (font-display: swap)

---

## Future Enhancement: Self-Hosted Fonts

### Why Self-Host?

**Privacy/Compliance:**
- No third-party requests (GDPR-friendly)
- No Google Fonts tracking
- Full UAE PDPL compliance

**Performance:**
- Reduce DNS lookups (1 domain vs. 2)
- Full cache control
- Faster for repeat visitors

**Control:**
- Version locking (fonts won't change)
- Custom subsetting (reduce file size)
- Offline support

### When to Self-Host

Consider self-hosting when:
- [ ] Privacy regulations require it
- [ ] Site has high repeat visitor rate (>60%)
- [ ] Targeting markets with slow Google Fonts access
- [ ] Need offline/PWA support

### Implementation Steps

#### Step 1: Download Fonts

Use Google Webfonts Helper:
https://gwfh.mranftl.com/fonts

1. Select **Inter** → Charsets: latin, latin-ext → Styles: 400, 500, 600, 700
2. Select **Space Grotesk** → Charsets: latin, latin-ext → Styles: 600, 700, 800
3. Select **Montserrat** → Charsets: latin → Styles: 900
4. Download as woff2 files

#### Step 2: Add to Project

```
public/
└── fonts/
    ├── inter-v12-latin-regular.woff2
    ├── inter-v12-latin-500.woff2
    ├── inter-v12-latin-600.woff2
    ├── inter-v12-latin-700.woff2
    ├── space-grotesk-v15-latin-600.woff2
    ├── space-grotesk-v15-latin-700.woff2
    ├── space-grotesk-v15-latin-800.woff2
    └── montserrat-v25-latin-900.woff2
```

#### Step 3: Update CSS

Replace Google Fonts link in `SEO.astro` with:

```css
/* src/styles/fonts.css */

/* Inter - Body Font */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-regular.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-500.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Space Grotesk - Display Font */
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/space-grotesk-v15-latin-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/space-grotesk-v15-latin-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/space-grotesk-v15-latin-800.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Montserrat - Brand Font */
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/montserrat-v25-latin-900.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

Then import in `global.css`:
```css
@import './fonts.css';
```

#### Step 4: Preload Critical Fonts

In `SEO.astro`, replace Google Fonts links with:

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-v12-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/space-grotesk-v15-latin-700.woff2" as="font" type="font/woff2" crossorigin>
```

#### Step 5: Update Fallback Stack

Ensure system font fallbacks in `global.css`:

```css
--font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-brand: 'Montserrat', 'Inter', system-ui, sans-serif;
```

---

## Current Optimizations Applied ✅

### 1. Font-Display Swap
Already using `display=swap` in Google Fonts URL:
```
?family=Inter:wght@400;500;600;700&display=swap
```

**Benefit:** Prevents invisible text during font load (FOIT)

### 2. Preconnect Headers
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Benefit:** Speeds up DNS/TLS handshake by ~100ms

### 3. Async Loading
```html
<link rel="preload" ... as="style" onload="this.onload=null;this.rel='stylesheet'" />
```

**Benefit:** Non-blocking CSS load

### 4. System Font Fallbacks
```css
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
```

**Benefit:** Fast initial render with system fonts

### 5. Font Feature Settings
```css
body {
  font-feature-settings: 'kern' 1, 'liga' 1;
}
```

**Benefit:** Better typography (kerning, ligatures)

---

## Advanced Optimizations (Future)

### Subsetting for Arabic Support

When adding Arabic i18n, create subsets:

```bash
# Using pyftsubset (fonttools)
pip install fonttools brotli

# Subset Inter for Latin
pyftsubset inter-regular.woff2 \
  --unicodes="U+0020-007F,U+00A0-00FF" \
  --output-file="inter-latin.woff2" \
  --flavor=woff2

# Subset Inter for Arabic
pyftsubset inter-regular.woff2 \
  --unicodes="U+0600-06FF,U+FE70-FEFF" \
  --output-file="inter-arabic.woff2" \
  --flavor=woff2
```

Then use separate @font-face with unicode-range:

```css
/* Latin subset */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-latin.woff2') format('woff2');
  unicode-range: U+0020-007F, U+00A0-00FF;
}

/* Arabic subset */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-arabic.woff2') format('woff2');
  unicode-range: U+0600-06FF, U+FE70-FEFF;
}
```

**Benefit:** Load only characters needed for page language

### Variable Fonts

Replace multiple weight files with single variable font:

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

**Benefits:**
- Single file vs. 4 files (smaller total size)
- Smooth weight transitions
- More design flexibility

**Considerations:**
- Larger file size if only using 2-3 weights
- Browser support (98%+ as of 2025)

---

## Font Loading Performance Checklist

- [x] Using `font-display: swap` to prevent FOIT
- [x] Preconnecting to font CDN
- [x] Async loading font CSS
- [x] System font fallbacks defined
- [x] Font feature settings enabled
- [ ] Self-hosting fonts (optional, for privacy)
- [ ] Preloading critical fonts
- [ ] Subsetting fonts (when i18n added)
- [ ] Using variable fonts (future optimization)

---

## Monitoring Font Performance

### Lighthouse Metrics to Track

```
npm run build
npm run preview
# Then run Lighthouse in Chrome DevTools
```

**Target Scores:**
- **FCP (First Contentful Paint):** <1.8s
- **LCP (Largest Contentful Paint):** <2.5s
- **CLS (Cumulative Layout Shift):** <0.1

### Font-Specific Metrics

In Chrome DevTools → Network → Filter: Font

Check:
- **Load time:** Should be <200ms with preconnect
- **File size:** woff2 should be ~20-30KB per weight
- **Timing:** Fonts should load before DOMContentLoaded

### WebPageTest

Use https://www.webpagetest.org/ to test:
- Global CDN performance
- FOIT/FOUT duration
- Render blocking analysis

---

## Decision: Google Fonts vs. Self-Hosted

**Stick with Google Fonts if:**
- ✅ Privacy isn't primary concern
- ✅ Want automatic updates
- ✅ Benefit from global CDN
- ✅ Simplicity is priority

**Switch to Self-Hosted if:**
- ⚠️ GDPR/PDPL privacy critical
- ⚠️ China/restricted markets access needed
- ⚠️ Offline/PWA support required
- ⚠️ Full cache control needed

**Current Recommendation:** Stick with Google Fonts (optimized)

The current setup is already optimized with preconnect, async loading, and swap. Self-hosting would only provide marginal gains (~20-50ms) but adds maintenance burden.

**Reconsider self-hosting if:**
- UAE government mandates no third-party font requests
- Building PWA with offline support
- Targeting users in markets where Google is blocked

---

## Testing Changes

### Before/After Metrics

```bash
# Current (Google Fonts)
npm run build
npm run preview
# Test with Lighthouse

# After self-hosting
# 1. Implement steps above
# 2. Rebuild and retest
# 3. Compare FCP, LCP, CLS scores
```

### A/B Test Setup

For production validation:
1. Deploy self-hosted fonts to staging
2. Compare analytics (bounce rate, time on page)
3. Monitor Core Web Vitals in Google Search Console
4. Decide based on real user metrics

---

## References

- [Google Fonts Best Practices](https://developers.google.com/fonts/docs/getting_started)
- [Web Font Optimization](https://web.dev/font-best-practices/)
- [Font-Display Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [Google Webfonts Helper](https://gwfh.mranftl.com/fonts)
- [Variable Fonts Guide](https://web.dev/variable-fonts/)

---

**Status:** ✅ Optimized (Google Fonts with preconnect + swap)
**Next Action:** Monitor Core Web Vitals, reconsider self-hosting if privacy regulations tighten
