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

// Constants
const DROPDOWN_ANIMATION_DURATION = 300;
const DROPDOWN_CLOSE_DELAY = 350;
const THEME_TRANSITION_DURATION = 300;
const DROPDOWN_LEAVE_DELAY = 400;
const SCROLL_THRESHOLD = 10;

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
 * Reset handler flags for mobile menu elements
 */
function resetMobileMenuHandlerFlags(): void {
  const menuButton = document.getElementById('mobile-menu-button');
  if (menuButton) {
    (menuButton as HTMLElementWithHandler).__menuButtonHandlerAttached = false;
  }
  
  document.querySelectorAll('#mobile-menu .mobile-dropdown-btn').forEach(button => {
    (button as HTMLElementWithHandler).__dropdownHandlerAttached = false;
  });
}

/**
 * Reset dropdown content styles
 */
function resetDropdownStyles(content: HTMLElement): void {
  content.style.maxHeight = '';
  content.style.opacity = '';
  content.style.overflow = '';
  content.style.display = '';
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
    (mobileMenu as HTMLElement).style.pointerEvents = 'auto';
    
    // Enable pointer events on dropdown buttons
    mobileMenu.querySelectorAll('.mobile-dropdown-btn').forEach(btn => {
      (btn as HTMLElement).style.pointerEvents = 'auto';
    });
    
    menuOpen.classList.add('opacity-0');
    menuOpen.classList.remove('opacity-100');
    menuClose.classList.remove('opacity-0');
    menuClose.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }
  
  mobileMenuButton?.setAttribute('aria-expanded', String(!isOpen));
}

/**
 * Find dropdown content element
 */
function findDropdownContent(buttonEl: HTMLElement): HTMLElement | null {
  let content = buttonEl.nextElementSibling as HTMLElement;
  
  if (!content || !content.classList.contains('mobile-dropdown-content')) {
    const parent = buttonEl.parentElement;
    content = parent?.querySelector('.mobile-dropdown-content') as HTMLElement || null;
  }
  
  return content?.classList.contains('mobile-dropdown-content') ? content : null;
}

/**
 * Animate dropdown open
 */
function animateDropdownOpen(content: HTMLElement, icon: Element | null, buttonEl: HTMLElement): void {
  content.classList.remove('hidden');
  content.style.display = 'block';
  content.style.maxHeight = '0';
  content.style.opacity = '0';
  content.style.overflow = 'hidden';
  
  content.offsetHeight; // Force reflow
  
  requestAnimationFrame(() => {
    const targetHeight = content.scrollHeight;
    content.style.maxHeight = `${targetHeight}px`;
    content.style.opacity = '1';
    
    setTimeout(() => {
      resetDropdownStyles(content);
    }, DROPDOWN_ANIMATION_DURATION);
  });
  
  icon?.classList.add('open');
  buttonEl.setAttribute('aria-expanded', 'true');
}

/**
 * Animate dropdown close
 */
function animateDropdownClose(content: HTMLElement, icon: Element | null, buttonEl: HTMLElement): void {
  const currentHeight = content.scrollHeight;
  content.style.maxHeight = `${currentHeight}px`;
  content.style.opacity = '1';
  content.style.overflow = 'hidden';
  
  content.offsetHeight; // Force reflow
  
  requestAnimationFrame(() => {
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    
    setTimeout(() => {
      content.classList.add('hidden');
      resetDropdownStyles(content);
    }, DROPDOWN_CLOSE_DELAY);
  });
  
  icon?.classList.remove('open');
  buttonEl.setAttribute('aria-expanded', 'false');
}

/**
 * Toggle mobile dropdown - shared function for both direct handlers and event delegation
 */
function toggleMobileDropdown(buttonEl: HTMLElement): void {
  const content = findDropdownContent(buttonEl);
  if (!content) return;
  
  const icon = buttonEl.querySelector('.dropdown-arrow-mobile');
  const isHidden = content.classList.contains('hidden');
  
  if (isHidden) {
    animateDropdownOpen(content, icon, buttonEl);
  } else {
    animateDropdownClose(content, icon, buttonEl);
  }
}

/**
 * Setup mobile dropdown toggles with optimized animations
 */
function setupMobileDropdowns(): void {
  document.querySelectorAll('#mobile-menu .mobile-dropdown-btn').forEach(button => {
    const buttonEl = button as HTMLElementWithHandler;
    
    if (buttonEl.__dropdownHandlerAttached) {
      buttonEl.__dropdownHandlerAttached = false;
    }
    
    const handler = (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileDropdown(buttonEl);
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
  
  if (state.isMobileMenuOpen) {
    requestAnimationFrame(setupMobileDropdowns);
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
  (mobileMenu as HTMLElement).style.pointerEvents = 'none';
  
  menuOpen.classList.remove('opacity-0');
  menuOpen.classList.add('opacity-100');
  menuClose.classList.add('opacity-0');
  menuClose.classList.remove('opacity-100');
  mobileMenuButton?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  
  // Close all mobile dropdowns and reset their state
  document.querySelectorAll('#mobile-menu .mobile-dropdown-content').forEach(content => {
    const button = (content as HTMLElement).previousElementSibling;
    if (button?.classList.contains('mobile-dropdown-btn')) {
      resetDropdownStyles(content as HTMLElement);
      (content as HTMLElement).classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('.dropdown-arrow-mobile')?.classList.remove('open');
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
 * Attach handlers to menu button
 */
function attachMenuButtonHandlers(button: HTMLElement): void {
  const buttonEl = button as HTMLElementWithHandler;
  
  if (buttonEl.__menuButtonHandlerAttached) {
    const newButton = button.cloneNode(true) as HTMLElement;
    const parent = button.parentNode;
    if (parent) {
      parent.replaceChild(newButton, button);
      const freshButton = document.getElementById('mobile-menu-button');
      if (freshButton) {
        return attachMenuButtonHandlers(freshButton);
      }
    }
    return;
  }
  
  const clickHandler = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    handleMenuButtonClick(e);
    return false;
  };
  
  addTrackedListener(buttonEl, 'click', clickHandler, { capture: true });
  addTrackedListener(buttonEl, 'touchend', clickHandler, { capture: true, passive: false });
  buttonEl.__menuButtonHandlerAttached = true;
  
  // Ensure menu is closed and body scroll is unlocked
  const updatedMenu = document.getElementById('mobile-menu');
  if (updatedMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
  document.body.style.overflow = '';
  buttonEl.setAttribute('aria-expanded', 'false');
  
  // Re-attach link click handlers - close menu on navigation
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    const newLink = link.cloneNode(true) as HTMLElement;
    link.parentNode?.replaceChild(newLink, link);
    addTrackedListener(newLink, 'click', closeMobileMenu);
  });
  
  requestAnimationFrame(setupMobileDropdowns);
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu(): void {
  const { mobileMenuButton } = getNavElements();
  
  if (!mobileMenuButton) {
    setTimeout(() => {
      const retryBtn = document.getElementById('mobile-menu-button');
      if (retryBtn) attachMenuButtonHandlers(retryBtn);
    }, 50);
    return;
  }
  
  attachMenuButtonHandlers(mobileMenuButton);
  addTrackedListener(document, 'click', handleOutsideClick);
}

/**
 * Desktop dropdown management
 */
function closeDropdown(dropdown: HTMLElement): void {
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
  
  // Calculate positioning
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
 * Clear dropdown leave timer
 */
function clearDropdownTimer(): void {
  if (state.dropdownLeaveTimer) {
    clearTimeout(state.dropdownLeaveTimer);
    state.dropdownLeaveTimer = null;
  }
}

/**
 * Schedule dropdown close
 */
function scheduleDropdownClose(dropdown: HTMLElement): void {
  clearDropdownTimer();
  state.dropdownLeaveTimer = setTimeout(() => {
    if (!state.dropdownHoverState && state.openDropdown === dropdown) {
      closeDropdown(dropdown);
    }
  }, DROPDOWN_LEAVE_DELAY);
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
    
    addTrackedListener(containerEl, 'mouseleave', (e) => {
      if (state.openDropdown === containerEl && !state.isTransitioning) {
        const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
        if (relatedTarget && menu?.contains(relatedTarget)) return;
        scheduleDropdownClose(containerEl);
      }
    });

    addTrackedListener(containerEl, 'mouseenter', () => {
      clearDropdownTimer();
      state.dropdownHoverState = true;
    });

    if (menu) {
      addTrackedListener(menu, 'mouseenter', () => {
        clearDropdownTimer();
        state.dropdownHoverState = true;
      });

      addTrackedListener(menu, 'mouseleave', (e) => {
        const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement;
        if (relatedTarget && containerEl.contains(relatedTarget)) return;
        
        state.dropdownHoverState = false;
        if (state.openDropdown === containerEl && !state.isTransitioning) {
          scheduleDropdownClose(containerEl);
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
  
  if (!state.scrollProgress) {
    state.scrollProgress = document.createElement('div');
    state.scrollProgress.className = 'nav-scroll-progress';
    nav.appendChild(state.scrollProgress);
  }
  
  function handleScroll(): void {
    if (state.isScrolling) return;
    
    state.isScrolling = true;
    state.lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    requestAnimationFrame(() => {
      const scrollTop = state.lastScrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      if (state.scrollProgress) {
        state.scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
      }
      
      if (scrollTop > SCROLL_THRESHOLD) {
        nav?.classList.add('nav-scrolled');
      } else {
        nav?.classList.remove('nav-scrolled');
      }
      
      state.isScrolling = false;
    });
  }

  addTrackedListener(window, 'scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Check if path matches link
 */
function isPathMatch(currentPath: string, normalizedPath: string, linkPath: string, href: string): boolean {
  return (
    normalizedPath === linkPath ||
    (normalizedPath.startsWith(linkPath) && linkPath !== '' && linkPath !== '/') ||
    currentPath === href ||
    (normalizedPath === '' && linkPath === '')
  );
}

/**
 * Update active link highlighting with optimized path matching
 */
function updateActiveLinks(): void {
  const currentPath = window.location.pathname;
  const normalizedCurrentPath = currentPath.replace(/\/$/, '');
  
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    link.classList.remove('active', 'text-accent-green');
    
    const linkPath = href.replace(/\/$/, '');
    if (isPathMatch(currentPath, normalizedCurrentPath, linkPath, href)) {
      link.classList.add('active', 'text-accent-green');
      const indicator = link.querySelector('.nav-indicator');
      if (indicator) {
        (indicator as HTMLElement).style.width = '75%';
      }
    }
  });

  // Check dropdown items for active state
  document.querySelectorAll('#mobile-menu a, .dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const linkPath = href.replace(/\/$/, '');
    const isActive = normalizedCurrentPath === linkPath || currentPath === href;
    
    if (isActive) {
      const parentButton = link.closest('.mobile-dropdown-content')?.previousElementSibling;
      if (parentButton?.classList.contains('mobile-dropdown-btn')) {
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
  
  const currentHref = logoLink.getAttribute('href') || '';
  if (currentHref.includes('contact') || !currentHref || currentHref === '#' || currentHref === '') {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(p => p);
    if (pathParts.length > 0 && pathParts[pathParts.length - 1] === 'contact') {
      pathParts.pop();
    }
    logoLink.href = pathParts.length > 0 ? '/' + pathParts.join('/') + '/' : '/';
  }
  
  const newLogoLink = logoLink.cloneNode(true) as HTMLAnchorElement;
  logoLink.parentNode?.replaceChild(newLogoLink, logoLink);
  
  addTrackedListener(newLogoLink, 'click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const { mobileMenu } = getNavElements();
    if (mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
    
    const href = newLogoLink.getAttribute('href') || '/';
    const finalHref = href.includes('contact') ? '/' : href;
    
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
  if (window.innerWidth >= 1024) return;
  
  const navContainer = document.querySelector('#main-navigation > div > div');
  if (!navContainer) return;
  
  const containerEl = navContainer as HTMLElementWithHandler;
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenu && !mobileMenu.classList.contains('open')) {
    mobileMenu.style.pointerEvents = 'none';
  }
  
  containerEl.style.pointerEvents = 'none';
  
  // Enable pointer events on interactive elements
  navContainer.querySelectorAll('a, button, [data-nav-home], #theme-toggle, #mobile-menu-button').forEach(el => {
    (el as HTMLElement).style.pointerEvents = 'auto';
  });
  
  document.querySelectorAll('#mobile-menu .mobile-dropdown-btn').forEach(el => {
    (el as HTMLElement).style.pointerEvents = 'auto';
  });
  
  const handleContainerClick = (e: Event): boolean => {
    const target = e.target as HTMLElement;
    
    // Allow theme toggle, mobile menu button, and dropdown buttons
    const themeToggle = navContainer.querySelector('#theme-toggle');
    if (themeToggle && (target === themeToggle || themeToggle.contains(target))) {
      return true;
    }
    
    const mobileMenuButton = target.closest('#mobile-menu-button');
    const mobileDropdownButton = target.closest('.mobile-dropdown-btn');
    if (mobileMenuButton || mobileDropdownButton) {
      return true;
    }
    
    // Prevent clicks on hidden mobile menu elements
    if (mobileMenu && !mobileMenu.classList.contains('open') && mobileMenu.contains(target)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    
    if (target === navContainer) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    
    const isInteractive = target.closest('a, button, [data-nav-home], #theme-toggle, #mobile-menu-button, .mobile-dropdown-btn');
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
        
        if (clickX > rightmostInteractive && clickX < menuBtnRect.left &&
            clickY >= logoRect.top && clickY <= Math.max(logoRect.bottom, menuBtnRect.bottom)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      }
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
    
    // Prevent accidental contact redirects
    if (target.closest('a') && !target.closest('.nav-cta-mobile, .nav-cta')) {
      const link = target.closest('a') as HTMLAnchorElement;
      const href = link?.getAttribute('href') || '';
      if (href.includes('/contact') && !link.classList.contains('nav-cta-mobile') && !link.classList.contains('nav-cta')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    }
    
    return true;
  };
  
  if (containerEl.__containerClickHandler) {
    containerEl.removeEventListener('click', containerEl.__containerClickHandler, true);
  }
  
  addTrackedListener(containerEl, 'click', handleContainerClick, { passive: false, capture: true });
  containerEl.__containerClickHandler = handleContainerClick;
}

/**
 * Handle page transitions efficiently
 */
function handlePageTransition(): void {
  state.isTransitioning = true;
  
  const { mobileMenu } = getNavElements();
  if (mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
  
  document.body.style.overflow = '';
  
  if (state.dropdownLeaveTimer) {
    clearTimeout(state.dropdownLeaveTimer);
    state.dropdownLeaveTimer = null;
  }
  
  resetMobileMenuHandlerFlags();
}

/**
 * Handle page load after transition
 */
function handlePageLoad(): void {
  requestAnimationFrame(() => {
    setTimeout(() => {
      state.isTransitioning = false;
      state.dropdownHoverState = false;
    }, 50);
  });
  
  requestAnimationFrame(() => {
    const { mobileMenu } = getNavElements();
    if (mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
    document.body.style.overflow = '';
    
    setTimeout(() => {
      initializeMobileMenu();
      initializeDropdowns();
      updateActiveLinks();
      
      requestAnimationFrame(() => {
        setupMobileDropdowns();
        setupLogoNavigation();
        setupMobileNavContainer();
        
        requestAnimationFrame(() => {
          setupMobileDropdowns();
          
          const attachHandlers = () => {
            const menuBtn = document.getElementById('mobile-menu-button');
            if (menuBtn) {
              menuBtn.setAttribute('aria-expanded', 'false');
              (menuBtn as HTMLElementWithHandler).__menuButtonHandlerAttached = false;
              attachMenuButtonHandlers(menuBtn);
              return true;
            }
            return false;
          };
          
          if (!attachHandlers()) {
            setTimeout(() => {
              if (!attachHandlers()) {
                setTimeout(attachHandlers, 100);
              }
            }, 100);
          }
        });
      });
    }, 150);
  });
}

/**
 * Handle theme toggle transitions efficiently
 */
function handleThemeChange(e: CustomEvent): void {
  const transitionDuration = e.detail?.duration || THEME_TRANSITION_DURATION;
  
  state.isTransitioning = true;
  clearDropdownTimer();
  
  setTimeout(() => {
    state.isTransitioning = false;
    requestAnimationFrame(setupMobileDropdowns);
  }, transitionDuration);
}

/**
 * Event delegation handler for mobile menu
 */
function createDelegationHandler() {
  return (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    
    if (target.closest('#theme-toggle')) {
      return;
    }
    
    const menuButton = target.closest('#mobile-menu-button');
    if (menuButton) {
      e.preventDefault();
      e.stopPropagation();
      handleMenuButtonClick(e);
      return;
    }
    
    const dropdownButton = target.closest('.mobile-dropdown-btn');
    if (dropdownButton) {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && mobileMenu.contains(dropdownButton)) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileDropdown(dropdownButton as HTMLElement);
      }
    }
  };
}

/**
 * Initialize all navigation functionality
 */
export function initializeNavigation(): void {
  const { mobileMenuButton, mobileMenu, menuOpen, menuClose } = getNavElements();

  if (mobileMenuButton && mobileMenu && menuOpen && menuClose) {
    const clickHandler = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      handleMenuButtonClick(e);
      return false;
    };
    
    addTrackedListener(mobileMenuButton, 'click', clickHandler, { capture: true });
    addTrackedListener(mobileMenuButton, 'touchend', clickHandler, { capture: true, passive: false });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      addTrackedListener(link, 'click', closeMobileMenu);
    });
    
    addTrackedListener(document, 'click', handleOutsideClick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileDropdowns);
  } else {
    setupMobileDropdowns();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDropdowns);
  } else {
    initializeDropdowns();
  }

  addTrackedListener(document, 'click', (e) => {
    const target = e.target as HTMLElement;
    if (state.openDropdown && !state.openDropdown.contains(target)) {
      closeDropdown(state.openDropdown);
    }
  });

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

  setupScrollEffects();
  updateActiveLinks();
  addTrackedListener(document, 'astro:page-load', updateActiveLinks);

  addTrackedListener(document, 'astro:before-swap', handlePageTransition);
  addTrackedListener(document, 'astro:after-swap', () => {
    const { mobileMenu } = getNavElements();
    if (mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
    
    requestAnimationFrame(() => {
      resetMobileMenuHandlerFlags();
      initializeMobileMenu();
      setupMobileDropdowns();
    });
  });

  addTrackedListener(document, 'astro:page-load', handlePageLoad);
  addTrackedListener(document, 'click', createDelegationHandler(), { capture: true });
  
  if (document.readyState === 'loading') {
    addTrackedListener(document, 'DOMContentLoaded', () => {
      setTimeout(handlePageLoad, 100);
    });
  }
  
  addTrackedListener(document, 'themechange', handleThemeChange as EventListener);
}

// Auto-initialize
if (typeof document !== 'undefined') {
  initializeNavigation();
}
