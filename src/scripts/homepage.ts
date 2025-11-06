/**
 * Homepage animation and interaction scripts
 * Optimized for performance and accessibility
 */

/**
 * Setup homepage animations
 */
export function setupHomepageAnimations(): void {
  // Run hero animation on page load
  runHeroAnimation();

  // Setup intersection observer for fade-in animations
  setupIntersectionObserver();
}

/**
 * Run hero animation on initial page load
 */
function runHeroAnimation(): void {
  const heroSection = document.getElementById("hero");
  if (!heroSection) return;

  heroSection.classList.remove("hero-animate");
  heroSection.classList.add("hero-animation-reset");
  void heroSection.offsetWidth; // Force reflow
  heroSection.classList.remove("hero-animation-reset");
  heroSection.classList.add("hero-animate");
}

/**
 * Setup intersection observer for fade-in animations
 * Optimized single observer for all elements
 */
function setupIntersectionObserver(): void {
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, show all elements immediately
    document.querySelectorAll(".animate-fade-in").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
    });
    return;
  }

  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        element.style.opacity = "1";

        // Apply animation delay from data attribute if present
        const delay = element.getAttribute("data-animation-delay");
        if (delay) {
          element.style.animationDelay = `${delay}ms`;
        }

        // Unobserve once animated
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeInElements = document.querySelectorAll(".animate-fade-in");
  fadeInElements.forEach((el) => observer.observe(el));
}

// Note: Initialization is handled by the page that imports this module
// This allows pages to control when animations are set up
