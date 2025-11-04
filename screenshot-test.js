import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser console error:', msg.text());
    }
  });
  
  page.on('pageerror', error => {
    console.log('Page error:', error.message);
  });

  // Use preview server (serves built files with base path) or dev server
  // Preview typically runs on port 4321 or 4173
  const previewUrl = 'http://localhost:4321/auxo-main-website/';
  const devUrl = 'http://localhost:4321/';
  const screenshots = [];

  try {
    // Wait for dev server to be ready
    console.log('Waiting for dev server...');
    
    // Try preview URL first (built files with base path)
    let url = previewUrl;
    try {
      console.log(`Trying preview URL: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      const title = await page.title();
      if (title.includes('404')) {
        throw new Error('Got 404');
      }
      console.log(`✓ Preview URL worked. Page title: ${title}`);
    } catch (e) {
      console.log(`Preview URL failed: ${e.message}`);
      console.log(`Trying dev URL: ${devUrl}`);
      url = devUrl;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const title = await page.title();
      console.log(`✓ Dev URL worked. Page title: ${title}`);
    }
    
    // Get page title to confirm it loaded
    const title = await page.title();
    console.log(`Page loaded: ${title}`);

    // Wait a bit for particles to initialize (dynamic imports need time)
    console.log('Waiting for particles to initialize...');
    await page.waitForTimeout(8000);
    
    // Check console for errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Check page HTML structure
    const bodyHTML = await page.evaluate(() => {
      const container = document.querySelector('#particle-background');
      return {
        containerExists: !!container,
        containerHTML: container ? container.outerHTML.substring(0, 200) : null,
        bodyChildren: Array.from(document.body.children).map(el => el.tagName + (el.id ? '#' + el.id : '')),
        scriptTags: Array.from(document.querySelectorAll('script')).length
      };
    });
    console.log('Page structure:', JSON.stringify(bodyHTML, null, 2));
    
    // Check if container exists
    const container = await page.$('#particle-background');
    if (container) {
      console.log('✓ Particle background container found');
      const containerVisible = await container.isVisible();
      console.log(`Container visible: ${containerVisible}`);
      
      const containerStyles = await page.evaluate(() => {
        const el = document.querySelector('#particle-background');
        if (el) {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            zIndex: styles.zIndex,
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            background: styles.background
          };
        }
        return null;
      });
      console.log('Container styles:', containerStyles);
    } else {
      console.log('✗ Particle background container NOT found');
    }

    // Take screenshot of homepage
    console.log('Taking screenshot of homepage...');
    await page.screenshot({ 
      path: join(__dirname, 'screenshots', 'homepage-full.png'),
      fullPage: true 
    });
    screenshots.push('homepage-full.png');

    // Wait for canvas to appear (tsParticles creates it dynamically)
    console.log('Waiting for particle canvas...');
    try {
      await page.waitForSelector('#particle-background canvas', { timeout: 10000 });
      console.log('✓ Particle background canvas found');
      
      // Check canvas dimensions
      const canvasInfo = await page.evaluate(() => {
        const canvas = document.querySelector('#particle-background canvas');
        if (canvas) {
          return {
            width: canvas.width,
            height: canvas.height,
            visible: canvas.offsetWidth > 0 && canvas.offsetHeight > 0
          };
        }
        return null;
      });
      console.log('Canvas info:', canvasInfo);
    } catch (e) {
      console.log('✗ Particle background canvas NOT found after 10s');
      console.log('Error:', e.message);
      
      // Check for JavaScript errors
      const errors = await page.evaluate(() => {
        // @ts-ignore - window.errors is set by test harness
        return (window as any).errors || [];
      });
      if (errors.length > 0) {
        console.log('JavaScript errors found:', errors);
      }
    }

    // Check navigation
    const nav = await page.$('#main-navigation');
    if (nav) {
      const navVisible = await nav.isVisible();
      console.log(`Navigation visible: ${navVisible}`);
    }

    // Check footer
    const footer = await page.$('footer');
    if (footer) {
      const footerVisible = await footer.isVisible();
      console.log(`Footer visible: ${footerVisible}`);
    }

    // Test navigation dropdown
    console.log('Testing navigation dropdown...');
    const servicesButton = await page.$('.dropdown-toggle');
    if (servicesButton) {
      await servicesButton.click();
      await page.waitForTimeout(500);
      const dropdown = await page.$('.dropdown-menu.open');
      if (dropdown) {
        console.log('✓ Dropdown opened successfully');
        await page.screenshot({ 
          path: join(__dirname, 'screenshots', 'navigation-dropdown.png'),
          fullPage: false 
        });
        screenshots.push('navigation-dropdown.png');
      } else {
        console.log('✗ Dropdown did not open');
      }
    }

    // Screenshot of hero section
    const hero = await page.$('#hero');
    if (hero) {
      await hero.screenshot({ path: join(__dirname, 'screenshots', 'hero-section.png') });
      screenshots.push('hero-section.png');
    }

    // Check services page
    console.log('Checking services page...');
    await page.goto(`${url}services/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: join(__dirname, 'screenshots', 'services-page.png'),
      fullPage: true 
    });
    screenshots.push('services-page.png');

    // Check for JavaScript errors and tsParticles initialization
    const debugInfo = await page.evaluate(() => {
      const container = document.querySelector('#particle-background');
      const canvas = container?.querySelector('canvas');
      
      // Check for any error messages in console
      const scripts = Array.from(document.querySelectorAll('script[type="module"]'));
      const hasParticleScript = scripts.some(s => s.src?.includes('ParticleBackground') || s.textContent?.includes('tsParticles'));
      
      return {
        containerExists: !!container,
        canvasExists: !!canvas,
        containerChildren: container ? Array.from(container.children).map(c => c.tagName) : [],
        hasParticleScript,
        scriptsLoaded: scripts.length,
        // @ts-ignore - window.errors is set by test harness
        windowErrors: (window as any).errors || []
      };
    });
    
    console.log('\n=== Debug Info ===');
    console.log(JSON.stringify(debugInfo, null, 2));
    
    // Check if particles are visible by checking canvas opacity
    const canvasStyle = await page.evaluate(() => {
      const canvas = document.querySelector('#particle-background canvas');
      if (canvas) {
        const computed = window.getComputedStyle(canvas.parentElement);
        return {
          opacity: computed.opacity,
          display: computed.display,
          visibility: computed.visibility,
          zIndex: computed.zIndex
        };
      }
      return null;
    });

    console.log('Particle background styles:', canvasStyle);

    console.log(`\n✓ Screenshots taken: ${screenshots.length} files`);
    console.log('Saved in:', join(__dirname, 'screenshots'));

  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Create screenshots directory if it doesn't exist
import { mkdirSync } from 'fs';
try {
  mkdirSync(join(__dirname, 'screenshots'), { recursive: true });
} catch (e) {
  // Directory already exists
}

takeScreenshots().catch(console.error);

