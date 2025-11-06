/**
 * Navigation component scripts
 * Handles mobile menu, dropdowns, scroll effects, and active link highlighting
 * Optimized for performance, accessibility, and smooth transitions
 */

// Type definitions
interface HTMLElementWithHandler extends HTMLElement {
  __dropdownHandlerAttached?: boolean;
  __containerClickHandler?: (e: Event) => void;
  __menuButtonHandlerAttached?: boolean;
}

interface WindowWithAstro extends Window {
  astro?: {
    navigate?: (path: string) => void;
  };
}

interface NavigationState {
  openDropdown: HTMLElement | null;
  dropdownLeaveTimer: ReturnType<typeof setTimeout> | null;
  isTransitioning: boolean;
  dropdownHoverState: boolean;
  isMobileMenuOpen: boolean;
  scrollProgress: HTMLElement | null;
  isScrolling: boolean;
  lastScrollTop: number;
}

// Centralized state management
const state: NavigationState = {
  openDropdown: null,
  dropdownLeaveTimer: null,
  isTransitioning: false,
  dropdownHoverState: false,
  isMobileMenuOpen: false,
  scrollProgress: null,
  isScrolling: false,
  lastScrollTop: 0,
};

// Event listener tracking for proper cleanup
const eventListeners: Array<{
  element: EventTarget;
  event: string;
  handler: EventListener;
  options?: boolean | AddEventListenerOptions;
}> = [];

/**
 * Helper to add tracked event listeners
 */
function addTrackedListener(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): void {
  element.addEventListener(event, handler, options);
  eventListeners.push({ element, event, handler, options });
}

/**
 * Clean up all tracked event listeners
 */
function cleanupEventListeners(): void {
  eventListeners.forEach(({ element, event, handler, options }) => {
    element.removeEventListener(event, handler, options);
  });
  eventListeners.length = 0;
}

/**
 * Get DOM elements with caching
 */
function getNavElements() {
  return {
    nav: document.getElementById('main-navigation'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileMenuButton: document.getElementById('mobile-menu-button'),
    menuOpen: document.querySelector('.menu-open'),
    menuClose: document.querySelector('.menu-close'),
    logoLink: document.querySelector('[data-nav-home]') as HTMLAnchorElement | null,
  };
}

/**
 * Mobile menu toggle functionality
 */
function toggleMenu(): void {
  const { mobileMenu, menuOpen, menuClose, mobileMenuButton } = getNavElements();
  
  if (!mobileMenu || !menuOpen || !menuClose) return;
  
  const isOpen = mobileMenu.classList.contains('open');
  state.isMobileMenuOpen = !isOpen;
  
  if (isOpen) {
    closeMobileMenu();
  } else {
    mobileMenu.classList.add('open');
    mobileMenu.classList.remove('-translate-y-full', 'opacity-0');
    mobileMenu.classList.add('translate-y-0', 'opacity-100');
    // Enable pointer events when menu is open
    (mobileMenu as HTMLElement).style.pointerEvents = 'auto';
    menuOpen.classList.add('opacity-0');
    menuOpen.classList.remove('opacity-100');
    menuClose.classList.remove('opacity-0');
    menuClose.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }
  
  mobileMenuButton?.setAttribute('aria-expanded', String(!isOpen));
}

/**
 * Setup mobile dropdown toggles with optimized animations
 */
function setupMobileDropdowns(): void {
  const mobileDropdownButtons = document.querySelectorAll('#mobile-menu .mobile-dropdown-btn');
  
  mobileDropdownButtons.forEach(button => {
    let buttonEl = button as HTMLElementWithHandler;
    
    // Always remove old handlers first (if they exist) by cloning
    // This ensures clean state after page transitions
    if (buttonEl.__dropdownHandlerAttached) {
      const newButton = buttonEl.cloneNode(true) as HTMLElement;
      const ariaLabel = newButton.getAttribute('aria-label');
      buttonEl.parentNode?.replaceChild(newButton, buttonEl);
      // Get fresh reference after clone
      const freshButton = newButton.parentNode?.querySelector(`.mobile-dropdown-btn[aria-label="${ariaLabel}"]`) as HTMLElementWithHandler;
      if (!freshButton) return;
      buttonEl = freshButton;
    }
    
    const handler = (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
      
      const content = buttonEl.nextElementSibling as HTMLElement;
      const icon = buttonEl.querySelector('.dropdown-arrow-mobile');
      
      if (!content) return;
      
      const isHidden = content.classList.contains('hidden');
      
      if (isHidden) {
        // Open animation
        content.classList.remove('hidden');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        
        requestAnimationFrame(() => {
          const targetHeight = content.scrollHeight;
          content.style.maxHeight = `${targetHeight}px`;
          content.style.opacity = '1';
          
          // Clean up after animation
          setTimeout(() => {
            content.style.maxHeight = '';
            content.style.opacity = '';
          }, 300);
        });
        
        icon?.classList.add('open');
        buttonEl.setAttribute('aria-expanded', 'true');
      } else {
        // Close animation
        const currentHeight = content.scrollHeight;
        content.style.maxHeight = `${currentHeight}px`;
        content.style.opacity = '1';
        
        // Force reflow
        content.offsetHeight;
        
        requestAnimationFrame(() => {
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          
          setTimeout(() => {
            // Force hide by adding hidden class and resetting styles
            content.classList.add('hidden');
            content.style.display = 'none';
            content.style.maxHeight = '';
            content.style.opacity = '';
            // Remove display none after a brief moment to allow CSS to take over
            setTimeout(() => {
              content.style.display = '';
            }, 50);
          }, 350); // Slightly longer timeout to ensure hidden class is applied
        });
        
        icon?.classList.remove('open');
        buttonEl.setAttribute('aria-expanded', 'false');
      }
    };

    addTrackedListener(buttonEl, 'click', handler, { capture: true });
    addTrackedListener(buttonEl, 'touchend', handler, { capture: true, passive: false });
    
    buttonEl.__dropdownHandlerAttached = true;
  });
}

/**
 * Handle mobile menu button click
 */
function handleMenuButtonClick(e: Event): boolean {
  e.preventDefault();
  e.stopPropagation();
  toggleMenu();
  // Setup dropdowns after menu opens (with slight delay for smooth animation)
  if (state.isMobileMenuOpen) {
    requestAnimationFrame(() => {
      setupMobileDropdowns();
    });
  }
  return false;
}

/**
 * Close mobile menu
 */
function closeMobileMenu(): void {
  const { mobileMenu, menuOpen, menuClose, mobileMenuButton } = getNavElements();
  
  if (!mobileMenu || !menuOpen || !menuClose) return;
  
  state.isMobileMenuOpen = false;
  
  mobileMenu.classList.remove('open');
  mobileMenu.classList.add('-translate-y-full', 'opacity-0');
  mobileMenu.classList.remove('translate-y-0', 'opacity-100');
  // Disable pointer events when menu is closed to prevent accidental clicks
  (mobileMenu as HTMLElement).style.pointerEvents = 'none';
  menuOpen.classList.remove('opacity-0');
  menuOpen.classList.add('opacity-100');
  menuClose.classList.add('opacity-0');
  menuClose.classList.remove('opacity-100');
  mobileMenuButton?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  
  // Close all mobile dropdowns
  document.querySelectorAll('#mobile-menu .mobile-dropdown-content').forEach(content => {
    const button = (content as HTMLElement).previousElementSibling;
    if (button && button.classList.contains('mobile-dropdown-btn')) {
      const contentEl = content as HTMLElement;
      contentEl.classList.add('hidden');
      contentEl.style.maxHeight = '';
      contentEl.style.opacity = '';
      button.setAttribute('aria-expanded', 'false');
      const icon = button.querySelector('.dropdown-arrow-mobile');
      icon?.classList.remove('open');
    }
  });
}

/**
 * Handle clicks outside navigation
 */
function handleOutsideClick(e: Event): void {
  const target = e.target as HTMLElement;
  const { nav, mobileMenu } = getNavElements();
  
  if (nav && !nav.contains(target) && mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu(): void {
  const { mobileMenuButton, mobileMenu, menuOpen, menuClose } = getNavElements();
  
  if (!mobileMenuButton || !mobileMenu || !menuOpen || !menuClose) return;
  
  // Don't clone here - let attachMenuButtonHandlers handle it
  // Just get the button and attach handlers directly
  const button = document.getElementById('mobile-menu-button');
  if (button) {
    attachMenuButtonHandlers(button);
  } else {
    // If not found, try again after a brief delay
    setTimeout(() => {
      const retryBtn = document.getElementById('mobile-menu-button');
      if (retryBtn) {
        attachMenuButtonHandlers(retryBtn);
      }
    }, 50);
  }
  
  // Re-attach outside click handler
  addTrackedListener(document, 'click', handleOutsideClick);
}

/**
 * Attach handlers to menu button
 */
function attachMenuButtonHandlers(button: HTMLElement): void {
  const buttonEl = button as HTMLElementWithHandler;
  
  // If handlers were already attached, clone to remove old listeners
  // This is important for re-initialization after page transitions
  if (buttonEl.__menuButtonHandlerAttached) {
    const newButton = button.cloneNode(true) as HTMLElement;
    const parent = button.parentNode;
    if (parent) {
      parent.replaceChild(newButton, button);
      const freshButton = document.getElementById('mobile-menu-button');
      if (!freshButton) return;
      // Use the fresh button
      return attachMenuButtonHandlers(freshButton);
    }
  }
  
  // Re-attach menu button handlers with proper event handling
  const clickHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    handleMenuButtonClick(e);
    return false;
  };
  
  // Attach handlers using tracked listeners
  addTrackedListener(buttonEl, 'click', clickHandler, { capture: true });
  addTrackedListener(buttonEl, 'touchend', clickHandler, { capture: true, passive: false });
  
  // Mark as attached
  buttonEl.__menuButtonHandlerAttached = true;
  
  // Ensure menu is closed and body scroll is unlocked
  const updatedMenu = document.getElementById('mobile-menu');
  if (updatedMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
  document.body.style.overflow = '';
  buttonEl.setAttribute('aria-expanded', 'false');
  
  // Re-attach link click handlers - close menu on navigation
  const currentMobileLinks = document.querySelectorAll('#mobile-menu a');
  currentMobileLinks.forEach(link => {
    // Remove any existing listeners by cloning
    const newLink = link.cloneNode(true) as HTMLElement;
    link.parentNode?.replaceChild(newLink, link);
    
    // Add new listener
    addTrackedListener(newLink, 'click', () => {
      // Close menu when navigating
      closeMobileMenu();
    });
  });
  
  // Setup mobile dropdowns after DOM is ready
  requestAnimationFrame(() => {
    setupMobileDropdowns();
  });
}

/**
 * Desktop dropdown management
 */
function closeDropdown(dropdown: HTMLElement): void {
  // Don't close during transitions
  if (state.isTransitioning) return;
  
  const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
  const button = dropdown.querySelector('.dropdown-toggle') as HTMLElement;
  const arrow = dropdown.querySelector('.dropdown-arrow') as HTMLElement;
  
  if (menu && button && arrow) {
    menu.classList.remove('open');
    button.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    arrow.classList.remove('open');
    if (state.openDropdown === dropdown) {
      state.openDropdown = null;
    }
  }
}

function openDropdownMenu(dropdown: HTMLElement): void {
  if (state.openDropdown && state.openDropdown !== dropdown) {
    closeDropdown(state.openDropdown);
  }
  
  const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
  const button = dropdown.querySelector('.dropdown-toggle') as HTMLElement;
  const arrow = dropdown.querySelector('.dropdown-arrow') as HTMLElement;
  
  if (!menu || !button || !arrow) return;
  
  // Optimize positioning calculation
  menu.style.position = 'absolute';
  menu.style.visibility = 'hidden';
  menu.style.display = 'block';
  menu.style.opacity = '1';
  
  const buttonRect = button.getBoundingClientRect();
  const menuWidth = menu.offsetWidth;
  const viewportWidth = window.innerWidth;
  const padding = 16;
  
  menu.style.visibility = '';
  menu.style.display = '';
  menu.style.opacity = '';
  menu.style.left = '';
  menu.style.right = '';
  menu.classList.remove('dropdown-right-aligned');
  
  // Right-align if needed
  if (buttonRect.left + menuWidth > viewportWidth - padding) {
    menu.classList.add('dropdown-right-aligned');
  }
  
  menu.classList.add('open');
  button.classList.add('active');
  button.setAttribute('aria-expanded', 'true');
  arrow.classList.add('open');
  state.openDropdown = dropdown;
  state.dropdownHoverState = true;
}

/**
 * Initialize desktop dropdowns with optimized hover handling
 */
function initializeDropdowns(): void {
  // Clean up existing dropdowns first
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode?.replaceChild(newToggle, toggle);
    
    addTrackedListener(newToggle, 'click', (e) => {
      e.stopPropagation();
      const dropdown = (newToggle as HTMLElement).closest('.dropdown-container') as HTMLElement;
      if (!dropdown) return;
      
      const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
      const isOpen = menu?.classList.contains('open');
      
      if (isOpen) {
        closeDropdown(dropdown);
      } else {
        openDropdownMenu(dropdown);
      }
    });
  });

  // Enhanced hover handling with optimized state tracking
  document.querySelectorAll('.dropdown-container').forEach(container => {
    const containerEl = container as HTMLElement;
    const menu = containerEl.querySelector('.dropdown-menu') as HTMLElement;
    
    // Mouse leave from container
    addTrackedListener(containerEl, 'mouseleave', (e) => {
      if (state.openDropdown === containerEl && !state.isTransitioning) {
        const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
        if (relatedTarget && menu && menu.contains(relatedTarget)) {
          return; // Mouse is moving to menu, don't close
        }
        
        if (state.dropdownLeaveTimer) {
          clearTimeout(state.dropdownLeaveTimer);
        }
        
        state.dropdownLeaveTimer = setTimeout(() => {
          if (!state.dropdownHoverState && state.openDropdown === containerEl) {
            closeDropdown(containerEl);
          }
        }, 400);
      }
    });

    // Mouse enter container
    addTrackedListener(containerEl, 'mouseenter', () => {
      if (state.dropdownLeaveTimer) {
        clearTimeout(state.dropdownLeaveTimer);
        state.dropdownLeaveTimer = null;
      }
      state.dropdownHoverState = true;
    });

    // Mouse enter/leave dropdown menu itself
    if (menu) {
      addTrackedListener(menu, 'mouseenter', () => {
        if (state.dropdownLeaveTimer) {
          clearTimeout(state.dropdownLeaveTimer);
          state.dropdownLeaveTimer = null;
        }
        state.dropdownHoverState = true;
      });

      addTrackedListener(menu, 'mouseleave', (e) => {
        const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
        if (relatedTarget && containerEl.contains(relatedTarget)) {
          return; // Mouse is moving within container, don't close
        }
        state.dropdownHoverState = false;
        if (state.openDropdown === containerEl && !state.isTransitioning) {
          if (state.dropdownLeaveTimer) {
            clearTimeout(state.dropdownLeaveTimer);
          }
          state.dropdownLeaveTimer = setTimeout(() => {
            if (!state.dropdownHoverState && state.openDropdown === containerEl) {
              closeDropdown(containerEl);
            }
          }, 400);
        }
      });
    }
  });
}

/**
 * Setup scroll-based navigation styling with optimized throttling
 */
function setupScrollEffects(): void {
  const { nav } = getNavElements();
  if (!nav) return;
  
  // Create scroll progress indicator if it doesn't exist
  if (!state.scrollProgress) {
    state.scrollProgress = document.createElement('div');
    state.scrollProgress.className = 'nav-scroll-progress';
    nav.appendChild(state.scrollProgress);
  }
  
  // Optimized scroll handler with RAF throttling
  function handleScroll(): void {
    if (state.isScrolling) return;
    
    state.isScrolling = true;
    state.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    requestAnimationFrame(() => {
      const scrollTop = state.lastScrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      // Update scroll progress
      if (state.scrollProgress) {
        state.scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
      }
      
      // Add scrolled class after initial scroll
      if (scrollTop > 10) {
        nav?.classList.add('nav-scrolled');
      } else {
        nav?.classList.remove('nav-scrolled');
      }
      
      state.isScrolling = false;
    });
  }

  addTrackedListener(window, 'scroll', handleScroll, { passive: true });
  handleScroll(); // Initial call
}

/**
 * Update active link highlighting with optimized path matching
 */
function updateActiveLinks(): void {
  const currentPath = window.location.pathname;
  const normalizedCurrentPath = currentPath.replace(/\/$/, '');
  
  // Cache selectors
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const dropdownLinks = document.querySelectorAll('#mobile-menu a, .dropdown-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Remove active class first
    link.classList.remove('active', 'text-accent-green');
    
    const linkPath = href.replace(/\/$/, '');
    
    // Optimized path matching
    const isActive = 
      normalizedCurrentPath === linkPath || 
      (normalizedCurrentPath.startsWith(linkPath) && linkPath !== '' && linkPath !== '/') ||
      currentPath === href ||
      (normalizedCurrentPath === '' && linkPath === '');
    
    if (isActive) {
      link.classList.add('active', 'text-accent-green');
      const indicator = link.querySelector('.nav-indicator');
      if (indicator) {
        (indicator as HTMLElement).style.width = '75%';
      }
    }
  });

  // Check dropdown items for active state
  dropdownLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const linkPath = href.replace(/\/$/, '');
    const isActive = normalizedCurrentPath === linkPath || currentPath === href;
    
    if (isActive) {
      // Mark parent dropdown as active if applicable
      const parentButton = link.closest('.mobile-dropdown-content')?.previousElementSibling;
      if (parentButton && parentButton.classList.contains('mobile-dropdown-btn')) {
        parentButton.classList.add('active');
      }
    }
  });
}

/**
 * Setup logo navigation - ensures it always goes to home
 */
function setupLogoNavigation(): void {
  const { logoLink } = getNavElements();
  if (!logoLink) return;
  
  // Ensure href points to home (base URL), never contact
  const currentHref = logoLink.getAttribute('href') || '';
  if (currentHref.includes('contact') || !currentHref || currentHref === '#' || currentHref === '') {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(p => p);
    if (pathParts.length > 0 && pathParts[pathParts.length - 1] === 'contact') {
      pathParts.pop();
    }
    logoLink.href = pathParts.length > 0 ? '/' + pathParts.join('/') + '/' : '/';
  }
  
  // Clone and replace to remove old listeners
  const newLogoLink = logoLink.cloneNode(true) as HTMLAnchorElement;
  logoLink.parentNode?.replaceChild(newLogoLink, logoLink);
  
  // Add click handler
  addTrackedListener(newLogoLink, 'click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Close mobile menu if open
    const { mobileMenu } = getNavElements();
    if (mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
    
    // Navigate to home
    const href = newLogoLink.getAttribute('href') || '/';
    const finalHref = href.includes('contact') ? '/' : href;
    
    // Use Astro navigation if available
    const windowWithAstro = window as WindowWithAstro;
    if (windowWithAstro.astro?.navigate) {
      windowWithAstro.astro.navigate(finalHref);
    } else {
      window.location.href = finalHref;
    }
    
    return false;
  }, { passive: false });
}

/**
 * Setup mobile navigation container click prevention
 */
function setupMobileNavContainer(): void {
  // Only on mobile viewport
  if (window.innerWidth >= 1024) return;
  
  const navContainer = document.querySelector('#main-navigation > div > div');
  if (!navContainer) return;
  
  const containerEl = navContainer as HTMLElementWithHandler;
  
  // Ensure mobile menu has pointer-events: none when closed
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('open')) {
    mobileMenu.style.pointerEvents = 'none';
  }
  
  // Set pointer-events to none on container, then enable on children
  containerEl.style.pointerEvents = 'none';
  
  // Enable pointer events on all interactive children
  const interactiveElements = navContainer.querySelectorAll('a, button, [data-nav-home], #theme-toggle');
  interactiveElements.forEach(el => {
    (el as HTMLElement).style.pointerEvents = 'auto';
  });
  
  // Add comprehensive click handler
  const handleContainerClick = (e: Event): boolean => {
    const target = e.target as HTMLElement;
    
    // Prevent clicks on hidden mobile menu elements
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('open')) {
      // If click target is inside closed mobile menu, prevent it
      if (mobileMenu.contains(target)) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    }
    
    // If clicking directly on container (empty space), prevent everything
    if (target === navContainer) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    
    // Always allow theme toggle to work - check first before any other logic
    const themeToggle = navContainer.querySelector('#theme-toggle');
    if (themeToggle && (target === themeToggle || themeToggle.contains(target))) {
      // Theme toggle should work normally - don't interfere
      return true;
    }
    
    // Check if click is on empty space (not on any interactive element)
    const isInteractive = target.closest('a, button, [data-nav-home], #theme-toggle');
    if (!isInteractive) {
      const { logoLink } = getNavElements();
      const menuBtn = navContainer.querySelector('#mobile-menu-button') as HTMLElement;
      
      if (logoLink && menuBtn) {
        const logoRect = logoLink.getBoundingClientRect();
        const menuBtnRect = menuBtn.getBoundingClientRect();
        const themeToggleRect = themeToggle?.getBoundingClientRect();
        const clickX = (e as MouseEvent).clientX;
        const clickY = (e as MouseEvent).clientY;
        
        const rightmostInteractive = themeToggleRect 
          ? Math.max(logoRect.right, themeToggleRect.right)
          : logoRect.right;
        
        // If click is between interactive elements and menu button
        if (clickX > rightmostInteractive && clickX < menuBtnRect.left &&
            clickY >= logoRect.top && clickY <= Math.max(logoRect.bottom, menuBtnRect.bottom)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      }
      
      // For any other non-interactive click, prevent
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    
    // Ensure only "Let's Talk" button redirects to contact
    // Prevent any accidental contact redirects from other elements
    if (target.closest('a') && !target.closest('.nav-cta-mobile, .nav-cta')) {
      const link = target.closest('a') as HTMLAnchorElement;
      const href = link?.getAttribute('href') || '';
      // If somehow a non-CTA link points to contact, prevent it
      if (href.includes('/contact') && !link.classList.contains('nav-cta-mobile') && !link.classList.contains('nav-cta')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    }
    
    return true;
  };
  
  // Remove old handler if exists
  if (containerEl.__containerClickHandler) {
    containerEl.removeEventListener('click', containerEl.__containerClickHandler, true);
  }
  
  // Use capture phase to catch clicks before they bubble
  addTrackedListener(containerEl, 'click', handleContainerClick, { passive: false, capture: true });
  containerEl.__containerClickHandler = handleContainerClick;
}

/**
 * Handle page transitions efficiently
 */
function handlePageTransition(): void {
  // Mark transition state
  state.isTransitioning = true;
  
  // Close mobile menu if open
  const { mobileMenu } = getNavElements();
  if (mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
  
  // Ensure body scroll is unlocked
  document.body.style.overflow = '';
  
  // Clean up timers
  if (state.dropdownLeaveTimer) {
    clearTimeout(state.dropdownLeaveTimer);
    state.dropdownLeaveTimer = null;
  }
  
  // Don't clean up document-level event listeners (event delegation)
  // They persist across page transitions and will work with new DOM
  // Only clean up element-specific listeners that will be recreated
  // cleanupEventListeners(); // Commented out to preserve handlers during transition
  
  // Reset handler flags so they can be reattached (for direct handlers)
  const menuButton = document.getElementById('mobile-menu-button');
  if (menuButton) {
    (menuButton as HTMLElementWithHandler).__menuButtonHandlerAttached = false;
  }
  
  // Keep dropdown state during transition (will be re-initialized on page-load)
  // Event delegation handlers on document persist and will work with new DOM
}

/**
 * Handle page load after transition
 */
function handlePageLoad(): void {
  // Reset transition state after DOM settles
  requestAnimationFrame(() => {
    setTimeout(() => {
      state.isTransitioning = false;
      state.dropdownHoverState = false;
    }, 50); // Reduced from 100ms for faster response
  });
  
  // Reinitialize components - ensure mobile dropdowns are set up
  // Use multiple requestAnimationFrame calls to ensure DOM is fully ready
  requestAnimationFrame(() => {
    // First, ensure menu is closed
    const { mobileMenu } = getNavElements();
    if (mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
    document.body.style.overflow = '';
    
    // Small delay to ensure Astro view transition is complete
    setTimeout(() => {
      // Initialize components
      initializeMobileMenu();
      initializeDropdowns();
      updateActiveLinks();
      
      // Setup mobile dropdowns after menu is initialized
      requestAnimationFrame(() => {
        setupMobileDropdowns();
        
        // Setup logo navigation and mobile container
        setupLogoNavigation();
        setupMobileNavContainer();
        
        // Final setup of mobile dropdowns to ensure they work after all initialization
        requestAnimationFrame(() => {
          setupMobileDropdowns();
          
          // Final verification - ensure menu button handlers are attached
          // Use multiple attempts to ensure it works
          const attachHandlers = () => {
            const menuBtn = document.getElementById('mobile-menu-button');
            if (menuBtn) {
              menuBtn.setAttribute('aria-expanded', 'false');
              // Reset flag to force re-attachment
              (menuBtn as HTMLElementWithHandler).__menuButtonHandlerAttached = false;
              // Always re-attach handlers to ensure they work after page transition
              attachMenuButtonHandlers(menuBtn);
              return true;
            }
            return false;
          };
          
          // Try immediately
          if (!attachHandlers()) {
            // Retry after a brief delay
            setTimeout(() => {
              if (!attachHandlers()) {
                // One more retry
                setTimeout(() => {
                  attachHandlers();
                }, 100);
              }
            }, 100);
          }
        });
      });
    }, 150); // Increased delay to ensure DOM is fully ready
  });
}

/**
 * Handle theme toggle transitions efficiently
 */
function handleThemeChange(e: CustomEvent): void {
  // Get theme transition duration from event or use default
  const transitionDuration = e.detail?.duration || 300;
  
  // Mark transition state to prevent dropdown closing
  state.isTransitioning = true;
  
  // Clear any pending dropdown timers
  if (state.dropdownLeaveTimer) {
    clearTimeout(state.dropdownLeaveTimer);
    state.dropdownLeaveTimer = null;
  }
  
  // Reset transition state after theme transition completes
  setTimeout(() => {
    state.isTransitioning = false;
  }, transitionDuration);
}

/**
 * Initialize all navigation functionality
 */
export function initializeNavigation(): void {
  const { mobileMenuButton, mobileMenu, menuOpen, menuClose } = getNavElements();

  // Initial setup - use direct handlers for initial load
  if (mobileMenuButton && mobileMenu && menuOpen && menuClose) {
    const clickHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      handleMenuButtonClick(e);
      return false;
    };
    
    addTrackedListener(mobileMenuButton, 'click', clickHandler, { capture: true });
    addTrackedListener(mobileMenuButton, 'touchend', clickHandler, { capture: true, passive: false });
    
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
      addTrackedListener(link, 'click', closeMobileMenu);
    });
    
    addTrackedListener(document, 'click', handleOutsideClick);
  }

  // Setup mobile dropdowns
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileDropdowns);
  } else {
    setupMobileDropdowns();
  }

  // Initialize desktop dropdowns
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDropdowns);
  } else {
    initializeDropdowns();
  }

  // Close dropdown on outside click
  addTrackedListener(document, 'click', (e) => {
    const target = e.target as HTMLElement;
    if (state.openDropdown && !state.openDropdown.contains(target)) {
      closeDropdown(state.openDropdown);
    }
  });

  // Close dropdown and mobile menu on Escape key
  addTrackedListener(document, 'keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Escape') {
      if (state.openDropdown) {
        closeDropdown(state.openDropdown);
      }
      const { mobileMenu } = getNavElements();
      if (mobileMenu?.classList.contains('open')) {
        closeMobileMenu();
      }
    }
  });

  // Setup scroll effects
  setupScrollEffects();

  // Update active links
  updateActiveLinks();
  addTrackedListener(document, 'astro:page-load', updateActiveLinks);

  // Handle page transitions - close mobile menu before navigation
  addTrackedListener(document, 'astro:before-swap', handlePageTransition);
  addTrackedListener(document, 'astro:after-swap', () => {
    // Ensure mobile menu is closed after swap
    const { mobileMenu } = getNavElements();
    if (mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
    
    // Immediately start reinitializing after DOM swap
    // This ensures handlers are attached as soon as new DOM is available
    requestAnimationFrame(() => {
      initializeMobileMenu();
      setupMobileDropdowns();
    });
  });

  // Reinitialize everything after page transition
  // Use both astro:page-load and DOMContentLoaded for reliability
  addTrackedListener(document, 'astro:page-load', handlePageLoad);
  
  // Use event delegation for menu button and dropdowns to ensure they always work
  // This approach works even if handlers aren't reattached immediately after page transitions
  // Event delegation on document persists across Astro view transitions
  const delegationHandler = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    
    // Handle menu button clicks
    const menuButton = target.closest('#mobile-menu-button');
    if (menuButton) {
      e.preventDefault();
      e.stopPropagation();
      handleMenuButtonClick(e);
      return;
    }
    
    // Handle mobile dropdown buttons via event delegation
    // Only handle if menu is open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu?.classList.contains('open')) {
      const dropdownButton = target.closest('.mobile-dropdown-btn');
      if (dropdownButton) {
        e.preventDefault();
        e.stopPropagation();
        const buttonEl = dropdownButton as HTMLElementWithHandler;
        const content = buttonEl.nextElementSibling as HTMLElement;
        const icon = buttonEl.querySelector('.dropdown-arrow-mobile');
        
        if (!content) return;
        
        const isHidden = content.classList.contains('hidden');
        
        if (isHidden) {
          // Open animation
          content.classList.remove('hidden');
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          
          requestAnimationFrame(() => {
            const targetHeight = content.scrollHeight;
            content.style.maxHeight = `${targetHeight}px`;
            content.style.opacity = '1';
            
            setTimeout(() => {
              content.style.maxHeight = '';
              content.style.opacity = '';
            }, 300);
          });
          
          icon?.classList.add('open');
          buttonEl.setAttribute('aria-expanded', 'true');
        } else {
          // Close animation
          const currentHeight = content.scrollHeight;
          content.style.maxHeight = `${currentHeight}px`;
          content.style.opacity = '1';
          content.offsetHeight; // Force reflow
          
          requestAnimationFrame(() => {
            content.style.maxHeight = '0';
            content.style.opacity = '0';
            
            setTimeout(() => {
              content.classList.add('hidden');
              content.style.display = 'none';
              content.style.maxHeight = '';
              content.style.opacity = '';
              setTimeout(() => {
                content.style.display = '';
              }, 50);
            }, 350);
          });
          
          icon?.classList.remove('open');
          buttonEl.setAttribute('aria-expanded', 'false');
        }
      }
    }
  };
  
  // Add event delegation handler - this persists across page transitions
  addTrackedListener(document, 'click', delegationHandler, { capture: true });
  
  // Also listen for DOMContentLoaded as fallback
  if (document.readyState === 'loading') {
    addTrackedListener(document, 'DOMContentLoaded', () => {
      // Small delay to ensure Astro has finished its initialization
      setTimeout(() => {
        handlePageLoad();
      }, 100);
    });
  }
  
  // Handle theme toggle events efficiently
  addTrackedListener(document, 'themechange', handleThemeChange as EventListener);
}

// Auto-initialize
if (typeof document !== 'undefined') {
  initializeNavigation();
}
