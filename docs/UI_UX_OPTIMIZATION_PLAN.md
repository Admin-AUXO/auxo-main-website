# UI/UX Optimization Plan for AUXO Data Labs Website

**Context:** Startup analytics consultancy - mobile-first design for UAE market with excellent desktop UX
**Framework:** Astro 5 + Tailwind CSS
**Current Status:** ✅ Well-optimized baseline | 🔄 Opportunities for enhancement

---

## Executive Summary

This plan provides **verified, implementation-ready optimizations** for the AUXO Data Labs website based on actual codebase analysis. Unlike generic recommendations, this plan:
- ✅ Identifies **real issues** found in the current codebase
- ✅ Provides Astro-specific optimizations
- ✅ Prioritizes mobile-first UAE user experience
- ✅ Maintains excellent desktop performance

---


## Critical Issues Found (Verified)

### Issue 1: Hidden Mobile Content - HIGH PRIORITY
**Files Affected:** `src/pages/index.astro`, `src/pages/services/index.astro`, `src/pages/about.astro`

#### Problem Cards Section (Lines 121-131)
```astro
<div class={`... ${index >= 2 ? 'hidden md:block' : ''}`}>
```
- **Issue:** Cards 3-6 are hidden on mobile (50% content loss)
- **Impact:** Mobile users miss critical pain points

#### Services Grid (Lines 145-154)
```astro
<div class={`... ${index >= 3 ? 'hidden md:block' : ''}`}>
```
- **Issue:** Services 4-6 are hidden on mobile (50% service visibility loss)
- **Impact:** Reduced conversion opportunities

#### Methodology Section (Line 160)
```astro
<section class="py-16 md:py-28 hidden md:block">
```
- **Issue:** Entire "How We Work" section hidden on mobile
- **Impact:** Trust-building content invisible to mobile users

#### Why Choose Section (Line 207)
```astro
<section class="py-16 md:py-28 hidden md:block">
```
- **Issue:** Value propositions hidden on mobile
- **Impact:** Competitive advantages not communicated

#### Blog Preview (Line 312)
```astro
<article class={`... ${index >= 1 ? 'hidden md:block' : ''}`}>
```
- **Issue:** Only 1 of 3 blog posts shown on mobile
- **Impact:** Reduced content discovery and engagement

#### Launch Offer Section (Line 365)
```astro
<section class="... hidden md:block">
```
- **Issue:** Special offers invisible to mobile users
- **Impact:** Lost conversion opportunities

### Issue 2: Inconsistent Touch Targets
**Files Affected:** Multiple components

✅ **Already Good:**
- Footer links have proper `min-h-[48px]` (lines 110-173)
- Mobile menu buttons are `min-h-[52px]` (line 248)
- Navigation mobile menu `min-h-[44px]` (line 206)

⚠️ **Needs Improvement:**
- Hero CTA buttons: Currently `py-2.5` (line 75) = ~42px
- Service grid "Learn more" links: No explicit touch target (line 150)
- Blog cards on mobile: Could use better spacing

### Issue 3: Color Scheme - Red vs Amber
**File:** `src/pages/index.astro` (lines 122-124)

Current problem cards use red tones:
```astro
<div class="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 rounded-lg...">
  <Icon name={challenge.icon} class="w-5 h-5 md:w-6 md:h-6 text-red-400" />
```

**Recommendation:** Consider amber/orange for less alarming, more consultative tone:
```astro
<div class="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-lg...">
  <Icon name={challenge.icon} class="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
```

---

## Homepage Optimizations

### Hero Section - `src/pages/index.astro` (lines 35-103)

**Current State:** ✅ Already well-optimized with responsive design

**Minor Enhancements:**
```astro
<!-- BEFORE (line 75) -->
<a href={`${base}${homepageContent.hero.primaryCta.href}`} 
   class="group bg-lime-400 text-black px-6 py-2.5 rounded-lg font-semibold...">

<!-- AFTER - Improved touch targets -->
<a href={`${base}${homepageContent.hero.primaryCta.href}`} 
   class="group bg-lime-400 text-black px-6 py-3.5 min-h-[48px] rounded-lg font-semibold... 
          flex items-center justify-center">
  {homepageContent.hero.primaryCta.text}
  <Icon name="mdi:arrow-right" class="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
</a>
```

**Rationale:** Increases tap target from ~42px to 48px+ (WCAG AAA compliance)

### Problem Statement Cards - CRITICAL FIX NEEDED

**File:** `src/pages/index.astro` (lines 119-131)

**Current Issue:**
```astro
{homepageContent.problems.challenges.map((challenge, index) => (
  <div class={`... ${index >= 2 ? 'hidden md:block' : ''}`}>
```

**Solution - Remove Hidden Classes:**
```astro
{homepageContent.problems.challenges.map((challenge, index) => (
  <div class="bg-zinc-900 border border-amber-500/20 rounded-xl p-5 md:p-6 hover:border-amber-500/40 transition-all">
    <div class="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4">
      <Icon name={challenge.icon} class="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
    </div>
    <h3 class="text-base md:text-xl font-bold mb-2 md:mb-3">{challenge.title}</h3>
    <p class="text-sm md:text-base text-gray-400 leading-relaxed">
      {challenge.description}
    </p>
  </div>
))}
```

### Services Grid - CRITICAL FIX NEEDED

**File:** `src/pages/index.astro` (lines 141-157)

**Current Issue:**
```astro
{services.slice(0, 6).map((service, index) => (
  <div class={`... ${index >= 3 ? 'hidden md:block' : ''}`}>
```

**Solution - Mobile 2-Column Grid:**
```astro
<!-- Update grid container (line 144) -->
<div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
  {services.slice(0, 6).map((service, index) => (
    <div class="bg-zinc-900 border border-gray-800 rounded-lg p-4 md:p-6 hover:border-lime-400/50 transition-all group">
      <Icon name={service.icon} class="w-10 h-10 md:w-12 md:h-12 text-lime-400 mb-3 md:mb-4" />
      <h3 class="text-base md:text-xl font-bold mb-2 md:mb-3 leading-tight">{service.title}</h3>
      <p class="text-xs md:text-base text-gray-400 mb-3 md:mb-4 leading-relaxed line-clamp-3">
        {service.description}
      </p>
      <a href={`${base}services/${service.id}/`} 
         class="text-lime-400 hover:text-lime-500 text-xs md:text-sm font-semibold inline-flex items-center gap-1 min-h-[44px] py-2 -ml-2 pl-2 -mb-2 pb-2 pr-2 rounded hover:bg-lime-400/5 transition-colors">
        Learn more 
        <span class="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </div>
  ))}
</div>
```

### Methodology Section - MOBILE VERSION NEEDED

**File:** `src/pages/index.astro` (lines 159-205)

**Current Issue:**
```astro
<section class="py-16 md:py-28 hidden md:block">
```

**Solution - Accordion for Mobile, Timeline for Desktop:**
```astro
<!-- Mobile Accordion Version (show on mobile only) -->
<section class="py-12 md:hidden" id="methodology-mobile">
  <div class="container mx-auto px-4">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold mb-4">
        {homepageContent.methodology.title} <span class="text-lime-400">{homepageContent.methodology.titleHighlight}</span>
      </h2>
      <p class="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
        {homepageContent.methodology.subtitle}
      </p>
    </div>

    <div class="space-y-3">
      {homepageContent.methodology.steps.map((step, index) => (
        <div class="methodology-accordion bg-zinc-900 border border-lime-400/20 rounded-xl overflow-hidden">
          <button 
            class="methodology-btn w-full flex items-center justify-between p-5 text-left min-h-[56px]"
            aria-expanded="false"
            aria-controls={`method-content-${index}`}
          >
            <div class="flex items-center gap-3 flex-1">
              <div class="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center font-bold text-black text-lg flex-shrink-0">
                {step.number}
              </div>
              <span class="font-semibold text-base">{step.title}</span>
            </div>
            <svg class="w-5 h-5 text-lime-400 transition-transform methodology-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div id={`method-content-${index}`} class="methodology-content max-h-0 overflow-hidden transition-all duration-300">
            <div class="p-5 pt-0">
              <div class="flex items-start gap-3 mb-4">
                <div class="w-12 h-12 bg-lime-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={step.icon} class="w-6 h-6 text-lime-400" />
                </div>
              </div>
              <p class="text-sm text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <!-- Value Props for Mobile -->
    <div class="mt-8 space-y-4">
      {homepageContent.methodology.valueProps.map((prop) => (
        <div class="text-center p-5 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <div class="text-2xl font-bold text-lime-400 mb-2">{prop.label}</div>
          <p class="text-gray-400 text-sm">{prop.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<!-- Desktop Timeline Version (existing, just remove hidden) -->
<section class="py-16 md:py-28 hidden md:block">
  <!-- Keep existing desktop layout as-is -->
</section>

<script>
// Mobile methodology accordion
document.querySelectorAll('.methodology-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const chevron = btn.querySelector('.methodology-chevron');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      content.style.maxHeight = '0';
      btn.setAttribute('aria-expanded', 'false');
      chevron.style.transform = 'rotate(0deg)';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
      chevron.style.transform = 'rotate(180deg)';
    }
  });
});
</script>
```

**Rationale:**
- Mobile users get condensed, interactive accordion
- Desktop users keep beautiful timeline layout
- Better mobile UX without compromising desktop

### Why Choose Section - SIMPLIFIED MOBILE

**File:** `src/pages/index.astro` (lines 207-225)

**Solution - Show on Mobile with Better Layout:**
```astro
<!-- Replace hidden class with responsive design -->
<section class="py-12 md:py-28">
  <div class="container mx-auto px-4">
    <div class="text-center mb-8 md:mb-16">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
        {homepageContent.whyChoose.title} <span class="text-lime-400">{homepageContent.whyChoose.titleHighlight}</span>
      </h2>
      <p class="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
        <em>{homepageContent.whyChoose.subtitle}</em>
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
      {homepageContent.whyChoose.items.map((item) => (
        <div class="text-center bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 hover:border-lime-400/30 transition-all">
          <div class="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-lime-400/10 rounded-full mb-4">
            <Icon name={item.icon} class="w-7 h-7 md:w-8 md:h-8 text-lime-400" />
          </div>
          <h3 class="text-lg md:text-xl font-bold mb-3">{item.title}</h3>
          <p class="text-sm md:text-base text-gray-400 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Blog Preview - SHOW 2 ON MOBILE

**File:** `src/pages/index.astro` (lines 310-361)

**Solution:**
```astro
<!-- Update grid (line 310) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
  {latestPosts.map((post, index) => (
    <article class={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-lime-400/30 transition-all group ${index >= 2 ? 'hidden lg:block' : ''}`}>
      <!-- Keep rest of article content the same -->
    </article>
  ))}
</div>
```

**Changes:**
- Show 2 blog posts on mobile/tablet (`md:grid-cols-2`)
- Show all 3 on large screens (`lg:grid-cols-3`)
- Only hide 3rd post on mobile (`hidden lg:block` instead of `hidden md:block`)


---

## Navigation & Footer Improvements

### Navigation - `src/components/Navigation.astro`

**Enhancement - Simplify Mobile Dropdown Labels:**
```astro
<!-- Line 248 - Make services dropdown more descriptive on mobile -->
<button class="mobile-dropdown-btn w-full flex items-center justify-between px-5 py-4 min-h-[52px] text-gray-300 hover:text-white...">
  <div class="flex flex-col items-start">
    <span class="text-base font-semibold">{item.name}</span>
    <span class="text-xs text-gray-500 mt-0.5">View all options</span>
  </div>
  <svg class="w-5 h-5 transition-transform duration-300 flex-shrink-0 text-lime-400"...>
    <!-- Keep icon -->
  </svg>
</button>
```

**Rationale:** Provides context about what dropdown contains

### Footer - `src/components/Footer.astro`

**Enhancement - Collapsible Sections on Mobile:**

For very small screens, consider making footer sections collapsible to reduce scroll distance:

```astro
<!-- Add mobile collapsible sections -->
<div class="sm:col-span-2 lg:col-span-2">
  <!-- Brand section stays visible -->
</div>

<!-- Quick Links - Make collapsible on mobile only -->
<div class="footer-section">
  <button class="footer-toggle sm:hidden w-full flex items-center justify-between mb-3 py-2 text-left">
    <h4 class="font-bold text-white text-xs uppercase tracking-wider">Quick Links</h4>
    <svg class="w-4 h-4 text-lime-400 transition-transform footer-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <h4 class="hidden sm:block font-bold text-white mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Quick Links</h4>
  <ul class="footer-content space-y-2.5 sm:space-y-3 text-sm font-medium">
    <!-- Keep existing links -->
  </ul>
</div>

<script>
// Footer collapse functionality (mobile only)
if (window.innerWidth < 640) {
  document.querySelectorAll('.footer-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const chevron = btn.querySelector('.footer-chevron');
      const isOpen = content.classList.contains('hidden');
      
      if (isOpen) {
        content.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
      } else {
        content.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
      }
    });
  });
}
</script>
```


---

## Service Pages Enhancement

### Services Index - `src/pages/services/index.astro`

**Enhancement - Add Service Category Badges:**
```astro
<!-- Add category system to service cards -->
{services.map((service) => (
  <a href={`${base}services/${service.id}/`}
     class="group bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-5 md:p-8 hover:border-lime-400 transition-all duration-300 hover:transform hover:-translate-y-1">
    
    <!-- Add category badge at top -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold px-2 py-1 bg-lime-400/10 text-lime-400 rounded-full border border-lime-400/20">
        {getCategoryForService(service.id)}
      </span>
    </div>
    
    <div class="w-12 h-12 md:w-14 md:h-14 bg-lime-400/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:bg-lime-400/20 transition-colors">
      <Icon name={service.icon} class="w-6 h-6 md:w-7 md:h-7 text-lime-400" />
    </div>

    <!-- Keep rest as-is -->
  </a>
))}
```

Add this helper function at the top:
```typescript
function getCategoryForService(serviceId: string): string {
  const categories = {
    'data-strategy': 'Strategy',
    'business-intelligence': 'Analytics',
    'data-analytics': 'Analytics',
    'data-engineering': 'Implementation',
    'ml-ai': 'Advanced',
    'data-governance': 'Governance'
  };
  return categories[serviceId] || 'Service';
}
```
---

## Content Pages (About, Contact, Blog)

### About Page - `src/pages/about.astro`

**Issue Found - "Why Choose" Section Hidden on Mobile (line 102):**
```astro
<div class="max-w-5xl mx-auto mb-12 md:mb-20 hidden md:block">
```

**Solution - Show on Mobile:**
```astro
<div class="max-w-5xl mx-auto mb-12 md:mb-20">
  <div class="text-center mb-8 md:mb-12">
    <h2 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
      {aboutContent.whyChoose.title}
    </h2>
    <p class="text-sm md:text-base text-gray-400">{aboutContent.whyChoose.subtitle}</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
    {aboutContent.whyChoose.stats.map((stat) => (
      <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-lime-400/30 transition-colors">
        <div class="text-3xl md:text-4xl font-black text-lime-400 mb-2">
          {stat.value}
        </div>
        <h3 class="font-bold mb-2 text-base md:text-lg">{stat.title}</h3>
        <p class="text-sm text-gray-400">{stat.description}</p>
      </div>
    ))}
  </div>
</div>
```

### Contact Page - `src/pages/contact.astro`

**Enhancement - Add Quick Action Buttons for Mobile:**
```astro
<!-- Add before two-column layout (line 32) -->
<div class="lg:hidden mb-8">
  <div class="grid grid-cols-2 gap-4">
    <a href={`tel:${siteData.phone}`}
       class="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-lime-400/30 transition-all min-h-[100px] justify-center active:scale-95">
      <Icon name="mdi:phone" class="w-8 h-8 text-lime-400" />
      <span class="text-sm font-semibold text-center">Call Us</span>
    </a>
    <a href={`mailto:${siteData.email}`}
       class="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-lime-400/30 transition-all min-h-[100px] justify-center active:scale-95">
      <Icon name="mdi:email" class="w-8 h-8 text-lime-400" />
      <span class="text-sm font-semibold text-center">Email Us</span>
    </a>
  </div>
</div>
```

### Blog Pages - `src/pages/blog/index.astro` & `[slug].astro`

**Enhancement - Add Reading Progress Bar:**

Add to `src/pages/blog/[slug].astro`:
```astro
<!-- Add after BaseLayout opening tag -->
<div id="reading-progress" class="fixed top-0 left-0 h-1 bg-lime-400 z-50 transition-all" style="width: 0%"></div>

<script>
// Reading progress indicator
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });
}
</script>
```

---

## Interactive Elements

### Maturity Calculator - `src/pages/tools/maturity-calculator.astro`

**Enhancement - Add Save Progress Feature:**
```typescript
// Add to script section (after line 336)
// Save progress to localStorage
function saveProgress() {
  const progress = {
    currentQuestion,
    isClassificationPhase,
    classificationAnswers,
    assessmentAnswers,
    currentPathway,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('maturityAssessmentProgress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem('maturityAssessmentProgress');
  if (saved) {
    try {
      const progress = JSON.parse(saved);
      // Only load if less than 24 hours old
      const savedTime = new Date(progress.timestamp);
      const now = new Date();
      const hoursDiff = (now - savedTime) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        return progress;
      }
    } catch (e) {
      console.error('Failed to load progress', e);
    }
  }
  return null;
}

// Auto-save on each answer
function setCurrentAnswer(index, score) {
  if (isClassificationPhase) {
    classificationAnswers[index] = score;
  } else {
    assessmentAnswers[index] = score;
  }
  saveProgress(); // Auto-save
}

// Add "Resume" button if progress exists
document.addEventListener('DOMContentLoaded', () => {
  const savedProgress = loadProgress();
  if (savedProgress && introScreen) {
    const resumeBtn = document.createElement('button');
    resumeBtn.className = 'w-full py-4 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-all mt-4';
    resumeBtn.textContent = 'Resume Previous Assessment';
    resumeBtn.addEventListener('click', () => {
      // Restore progress
      currentQuestion = savedProgress.currentQuestion;
      isClassificationPhase = savedProgress.isClassificationPhase;
      classificationAnswers = savedProgress.classificationAnswers;
      assessmentAnswers = savedProgress.assessmentAnswers;
      currentPathway = savedProgress.currentPathway;
      
      introScreen.classList.add('hidden');
      questionScreen.classList.remove('hidden');
      showQuestion(currentQuestion);
    });
    
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.insertAdjacentElement('afterend', resumeBtn);
    }
  }
});
```

---

## Astro-Specific Optimizations

### 1. View Transitions Enhancement

**Current:** Basic Astro view transitions enabled
**Enhancement:** Add custom transition animations for better UX

Create `src/styles/transitions.css`:
```css
/* Custom Astro View Transitions */
@layer utilities {
  /* Smooth page transitions */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
  }
  
  /* Fade transition */
  ::view-transition-old(root) {
    animation-name: fade-out;
  }
  
  ::view-transition-new(root) {
    animation-name: fade-in;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  /* Reduce motion for users who prefer it */
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation-duration: 0.01ms !important;
    }
  }
}
```

Import in `src/styles/global.css`:
```css
@import './transitions.css';
```

### 2. Component-Level Code Splitting

**Current:** All JavaScript bundled together
**Enhancement:** Split large interactive components

For components like `MultiStepForm.astro` and maturity calculator, use dynamic imports:

```astro
---
// In BaseLayout.astro - defer non-critical scripts
---

<script>
  // Load analytics only after page is interactive
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('./analytics.js');
    });
  } else {
    setTimeout(() => {
      import('./analytics.js');
    }, 1000);
  }
</script>
```

### 3. Image Optimization with Astro Image

**Current:** Using `<img>` tags
**Enhancement:** Use Astro's Image component for automatic optimization

```astro
---
import { Image } from 'astro:assets';
import logoImage from '../assets/logo.png'; // If you move images to src/assets
---

<!-- BEFORE -->
<img src={`${base}logo.svg`} alt="AUXO Data Labs Logo" class="h-11 w-11" />

<!-- AFTER - For raster images -->
<Image 
  src={logoImage} 
  alt="AUXO Data Labs Logo" 
  width={44}
  height={44}
  loading="eager"
  class="h-11 w-11"
/>

<!-- For SVG, keep as-is or use inline SVG -->
```

### 4. Astro Content Collections Enhancement

**Current:** Good use of content collections
**Enhancement:** Add content caching for better performance

In `astro.config.mjs`, enable experimental content layer:
```javascript
export default defineConfig({
  // ... existing config
  experimental: {
    contentCollectionCache: true, // Cache content collections between builds
  },
});
```

### 5. Prefetch Strategy for Internal Links

Add to `src/layouts/BaseLayout.astro`:
```astro
---
// In head section
---
<link rel="prefetch-intent" href={`${base}services/`} />
<link rel="prefetch-intent" href={`${base}contact/`} />

<script>
  // Prefetch links on hover (for better perceived performance)
  document.addEventListener('astro:page-load', () => {
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !link.dataset.prefetched) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
          link.dataset.prefetched = 'true';
        }
      }, { once: true });
    });
  });
</script>
```

---

## Performance & Accessibility

### Performance Optimizations

#### 1. Lazy Load Below-the-Fold Content
```astro
<!-- In src/pages/index.astro - Add loading="lazy" to images -->
<img 
  src={post.data.image} 
  alt={post.data.title} 
  loading="lazy"
  decoding="async"
  class="w-full h-full object-cover"
/>
```

#### 2. Reduce JavaScript Bundle Size

Current ParticleBackground.astro is performance-intensive. Consider:
- Reduce particle count on mobile: `const particleCount = window.innerWidth < 768 ? 20 : 50;`
- Throttle animation frame rate: Use `requestAnimationFrame` with timestamp checking
- Disable particles on low-end devices

```javascript
// In ParticleBackground.astro script
const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                       /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (isLowEndDevice) {
  // Reduce particle count or disable
  particleCount = 15;
  // Or disable entirely with a static gradient background
}
```

#### 3. Font Loading Optimization

In `src/layouts/BaseLayout.astro`, add font preloading:
```astro
<head>
  <!-- Preload critical fonts -->
  <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/Inter-Bold.woff2" as="font" type="font/woff2" crossorigin />
  
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/Inter-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/Inter-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
  </style>
</head>
```

### Accessibility Improvements

#### 1. Skip to Content Link
Add to `BaseLayout.astro` before Navigation:
```astro
<a href="#main-content" 
   class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-lime-400 focus:text-black focus:font-bold focus:rounded-lg focus:shadow-lg">
  Skip to main content
</a>

<Navigation />

<main id="main-content">
  <slot />
</main>
```

#### 2. ARIA Live Regions for Dynamic Content
```astro
<!-- In MultiStepForm.astro - Add announcement region -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="form-announcements"></div>

<script>
  function announceStepChange(stepNumber) {
    const announcements = document.getElementById('form-announcements');
    if (announcements) {
      announcements.textContent = `Step ${stepNumber} of 4`;
    }
  }
  
  // Call when changing steps
  function showStep(step) {
    // ... existing code
    announceStepChange(step);
  }
</script>
```

#### 3. Focus Management for Modals and Accordions
```javascript
// For mobile menu and modals
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  firstElement.focus();
}

// Apply to mobile menu when opened
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu && mobileMenu.classList.contains('open')) {
  trapFocus(mobileMenu);
}
```