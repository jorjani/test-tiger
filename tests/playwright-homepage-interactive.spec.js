// playwright-homepage-interactive.spec.js
import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

// Configuration for dynamic checks
const homepageConfig = {
  url: 'https://www.sundai.foundation/',
  heroSelector: 'h1',
  heroTextRegex: /Sundai/i,
  logoSelector: "header img",
  statsSelectors: [
    "text='$20M+'",
    "text='1,500+'",
    "text='AI MVPs Built'"
  ],
  navLinks: ["About", "Initiatives", "Connect", "Get Involved"],
  ctaSelectors: ["text='Get Involved'", "text='Join the Community'"]
};

test('Homepage Load & Interactive Test with Video', async ({ }) => {
  const browser = await chromium.launch({ headless: true }); // Force headless mode

  // Create a new context with video recording enabled
  const context = await browser.newContext({
    javaScriptEnabled: false,
    recordVideo: {
      dir: './videos',
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();

  try {
    // Navigate to homepage
    await page.goto(homepageConfig.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'debug.png' });
    await page.locator('header img').waitFor({ state: 'visible', timeout: 10000 });

    await expect(page).toHaveURL(homepageConfig.url);

    // Verify logo and hero text
    await expect(page.locator(homepageConfig.logoSelector)).toBeVisible();
    await expect(page.locator(homepageConfig.heroSelector)).toHaveText(homepageConfig.heroTextRegex);

    // Scroll to stats section and verify
    for (const selector of homepageConfig.statsSelectors) {
      const element = page.locator(selector);
      await element.scrollIntoViewIfNeeded();
      await expect(element).toBeVisible();
    }

    // Hover over navigation links
    for (const text of homepageConfig.navLinks) {
      const link = page.locator(`nav >> text='${text}'`);
      await link.hover();
      await expect(link).toHaveAttribute('href', /.+/);
    }

    // Click each CTA and verify navigation works
    for (const selector of homepageConfig.ctaSelectors) {
      const cta = page.locator(selector);
      await cta.scrollIntoViewIfNeeded();
      await expect(cta).toBeVisible();
      await cta.click();
      await page.waitForTimeout(1500); // wait for navigation
      await page.goBack();
    }

    // Verify all images loaded
    const images = await page.locator('img').elementHandles();
    for (const img of images) {
      const loaded = await img.evaluate(el => el.complete && el.naturalWidth > 0);
      expect(loaded).toBe(true);
    }

    // Scroll to bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
  } finally {
    // Save video recording
    const videoPath = await page.video().path();
    console.log(`Interactive test video saved at: ${videoPath}`);
    await context.close();
  }
});
