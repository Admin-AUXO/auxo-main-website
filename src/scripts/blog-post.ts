// Reading progress bar
function updateReadingProgress() {
  const article = document.getElementById('article-content');
  const progressBar = document.getElementById('reading-progress-bar');
  
  if (!article || !progressBar) return;

  const articleTop = article.offsetTop;
  const articleHeight = article.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const articleBottom = articleTop + articleHeight;
  const windowBottom = scrollTop + windowHeight;
  
  if (scrollTop < articleTop) {
    progressBar.style.width = '0%';
  } else if (windowBottom > articleBottom) {
    progressBar.style.width = '100%';
  } else {
    const scrolled = scrollTop - articleTop;
    const progress = (scrolled / (articleHeight - windowHeight)) * 100;
    progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }
}

// Copy link functionality
function initCopyLink() {
  const copyButton = document.getElementById('copy-link-button');
  if (!copyButton) return;

  copyButton.addEventListener('click', async () => {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      const originalText = copyButton.querySelector('span')?.textContent || 'Copy Link';
      copyButton.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-sm font-medium hidden sm:inline">Copied!</span>
      `;
      copyButton.classList.add('bg-accent-green', 'text-primary');
      
      setTimeout(() => {
        copyButton.innerHTML = `
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <span class="text-sm font-medium hidden sm:inline">${originalText}</span>
        `;
        copyButton.classList.remove('bg-accent-green', 'text-primary');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  });
}

// Print functionality
function initPrint() {
  const printButton = document.getElementById('print-button');
  if (!printButton) return;

  printButton.addEventListener('click', () => {
    window.print();
  });
}

// Enhanced code blocks with improved implementation based on Astro best practices
function enhanceCodeBlocks() {
  // Check if clipboard API is available
  const hasClipboard = navigator.clipboard && navigator.clipboard.writeText;
  
  if (!hasClipboard) {
    // Fallback: hide copy buttons if clipboard API not available
    return;
  }

  // Target Shiki code blocks (.astro-code) and regular pre elements
  const codeBlocks = document.querySelectorAll('.prose pre:not([data-enhanced])');
  
  codeBlocks.forEach((pre, index) => {
    const code = pre.querySelector('code');
    if (!code) return;

    // Mark as enhanced to prevent double processing
    pre.setAttribute('data-enhanced', 'true');

    // Multiple language detection methods following Astro/Shiki best practices
    // Shiki outputs code blocks with .astro-code class and language info
    let language = 'text';
    
    // Method 1: Check Shiki's data-lang attribute (primary method)
    if (code.hasAttribute('data-lang')) {
      language = code.getAttribute('data-lang') || 'text';
    }
    // Method 2: Check pre element for language class (Shiki pattern)
    else if (pre.className) {
      const preLangMatch = pre.className.match(/language-(\w+)/);
      if (preLangMatch) {
        language = preLangMatch[1];
      }
    }
    // Method 3: Check code element for language-* pattern (fallback)
    else if (code.className) {
      const languageMatch = code.className.match(/language-(\w+)/);
      if (languageMatch) {
        language = languageMatch[1];
      }
    }
    // Method 4: Check for Shiki's class pattern (astro-code-*)
    else if (pre.className) {
      const shikiMatch = pre.className.match(/astro-code-(\w+)/);
      if (shikiMatch) {
        language = shikiMatch[1];
      }
    }

    // Normalize language names for display
    const languageNames: Record<string, string> = {
      'js': 'JavaScript',
      'ts': 'TypeScript',
      'py': 'Python',
      'rb': 'Ruby',
      'go': 'Go',
      'rs': 'Rust',
      'sh': 'Shell',
      'bash': 'Bash',
      'zsh': 'Zsh',
      'yml': 'YAML',
      'yaml': 'YAML',
      'json': 'JSON',
      'xml': 'XML',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'sass': 'Sass',
      'md': 'Markdown',
      'mdx': 'MDX',
      'sql': 'SQL',
      'graphql': 'GraphQL',
      'dockerfile': 'Dockerfile',
    };

    const displayLanguage = languageNames[language.toLowerCase()] || language.charAt(0).toUpperCase() + language.slice(1);

    // Create wrapper with unique ID
    const wrapperId = `code-block-${index}`;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', `Code block: ${displayLanguage}`);

    // Create header with language and copy button
    const header = document.createElement('div');
    header.className = 'code-block-header';
    header.setAttribute('role', 'toolbar');
    header.setAttribute('aria-label', 'Code block toolbar');

    const languageLabel = document.createElement('span');
    languageLabel.className = 'code-block-language';
    languageLabel.setAttribute('aria-label', `Programming language: ${displayLanguage}`);
    languageLabel.textContent = displayLanguage;

    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    copyButton.setAttribute('title', 'Copy code');
    copyButton.setAttribute('type', 'button');
    copyButton.setAttribute('data-code-block-id', wrapperId);
    
    // Store original HTML for reset - enhanced with better visibility
    const originalHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
      </svg>
      <span class="sr-only">Copy code</span>
      <span aria-hidden="true" class="copy-text">Copy</span>
    `;
    
    copyButton.innerHTML = originalHTML;

    // Improved copy functionality with better error handling
    copyButton.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Get code text - handle both textContent and innerText
      let codeText = '';
      if (code.textContent) {
        codeText = code.textContent;
      } else if ((code as HTMLElement).innerText) {
        codeText = (code as HTMLElement).innerText;
      }

      if (!codeText.trim()) {
        console.warn('No code content to copy');
        return;
      }

      try {
        // Use Clipboard API
        await navigator.clipboard.writeText(codeText);
        
        // Visual feedback
        copyButton.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="sr-only">Code copied to clipboard</span>
          <span aria-hidden="true" class="copy-text">Copied!</span>
        `;
        copyButton.classList.add('copied');
        copyButton.setAttribute('aria-label', 'Code copied to clipboard');
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
          copyButton.classList.remove('copied');
          copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        console.warn('Clipboard API failed, using fallback', err);
      }
    });

    header.appendChild(languageLabel);
    header.appendChild(copyButton);

    // Wrap pre element
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.id = wrapperId;
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });

  // Add IDs to headings for TOC navigation
  const headings = document.querySelectorAll('.prose h2:not([id]), .prose h3:not([id])');
  headings.forEach((heading) => {
    const text = heading.textContent || '';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    if (id) {
      heading.id = id;
    }
  });
}

// Initialize collapsible TOC
function initCollapsibleTOC() {
  const tocSections = document.querySelectorAll('.toc-section');
  
  tocSections.forEach((section) => {
    const header = section.querySelector('a');
    const chevron = section.querySelector('.toc-chevron');
    const subsection = section.querySelector('.toc-subsection');
    
    if (!header || !subsection || !chevron) return;

    // Make chevron clickable to toggle
    chevron.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      section.classList.toggle('active');
    });

    // Allow clicking on the link text to navigate, but clicking on chevron area toggles
    header.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // If clicking on chevron or its parent span, toggle instead of navigating
      if (target === chevron || target.closest('.toc-chevron') || target.closest('svg')) {
        e.preventDefault();
        e.stopPropagation();
        section.classList.toggle('active');
      }
      // Otherwise, let the link navigate normally
    });
  });
}

// Add inline CTA after first H2
function addInlineCTA(baseUrl: string) {
  const firstH2 = document.querySelector('.prose h2');
  if (!firstH2) return;

  // Check if CTA already exists
  if (document.getElementById('inline-cta')) return;

  const contactUrl = baseUrl + 'contact/';
  const inlineCTA = document.createElement('div');
  inlineCTA.id = 'inline-cta';
  inlineCTA.className = 'my-8 sm:my-10 p-6 sm:p-8 bg-gradient-to-r from-accent-green/10 to-accent-green/5 border-2 border-accent-green/20 rounded-xl';
  inlineCTA.innerHTML = `
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex-1">
        <h3 class="text-lg sm:text-xl font-bold mb-2 text-primary">Want to learn more?</h3>
        <p class="text-sm sm:text-base text-secondary">Get personalized insights for your business.</p>
      </div>
      <a
        href="${contactUrl}"
        class="px-6 py-3 bg-accent-green text-primary font-bold rounded-lg hover:bg-accent-green/90 transition-all inline-flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px] touch-manipulation whitespace-nowrap"
      >
        Contact Us
      </a>
    </div>
  `;

  firstH2.parentNode?.insertBefore(inlineCTA, firstH2.nextSibling);
}

// Initialize all features
export function initializeBlogPostScripts(baseUrl: string) {
    updateReadingProgress();
    initCopyLink();
    initPrint();
    enhanceCodeBlocks();
    
    
    initCollapsibleTOC();
    addInlineCTA(baseUrl);

    // Update reading progress on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateReadingProgress();
          ticking = false;
        });
        ticking = true;
      }
    });
}
