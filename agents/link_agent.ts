import { chromium } from "playwright";
import { reportAgentReasoning } from "../progress_reporter";

export async function runLinkAgent(url: string) {
  console.log('\n🔗 [LINK AGENT] Starting...');
  console.log(`   Target: ${url}`);
  reportAgentReasoning('Link Agent', `Starting link analysis for: ${url}`, 'info');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);

  try {
    // Add visual indicator overlay
    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.id = 'link-agent-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        font-family: Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      overlay.innerHTML = '🔗 LINK AGENT<br><small style="font-size: 14px; font-weight: normal;">Scanning for links...</small>';
      document.body.appendChild(overlay);
    });

    await page.waitForTimeout(300);

    // Get all links on the page
    console.log('   🔍 Extracting links...');
    reportAgentReasoning('Link Agent', 'Extracting all links from page...', 'info');

    const links = await page.$$eval('a[href]', (elements) =>
      elements.map(el => (el as HTMLAnchorElement).href)
    );

    console.log(`   📊 Found ${links.length} links`);
    reportAgentReasoning('Link Agent', `Found ${links.length} links to validate`, 'success');

    const brokenLinks: string[] = [];

    // Check each link (optimized for speed)
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      // Only log every 10th link or broken links to reduce verbosity
      const shouldLog = (i % 10 === 0) || (i === links.length - 1);

      try {
        const response = await page.goto(link, { waitUntil: 'domcontentloaded', timeout: 3000 });
        if (!response || response.status() >= 400) {
          console.log(`   ❌ Broken: ${link} (status: ${response?.status()})`);
          brokenLinks.push(link);
          reportAgentReasoning('Link Agent', `✗ Broken link found: ${link} (HTTP ${response?.status()})`, 'error');
        } else if (shouldLog) {
          console.log(`   ⏳ Progress: ${i + 1}/${links.length} tested, ${brokenLinks.length} broken`);
          reportAgentReasoning('Link Agent', `Progress: ${i + 1}/${links.length} links tested`, 'info');
        }
      } catch (error) {
        console.log(`   ❌ Broken: ${link}`);
        brokenLinks.push(link);
        reportAgentReasoning('Link Agent', `✗ Link failed to load: ${link}`, 'error');
      }
    }

    console.log(`   📋 Summary: ${brokenLinks.length} broken links found`);

    if (brokenLinks.length === 0) {
      reportAgentReasoning('Link Agent', `✓ All ${links.length} links are working!`, 'success');
    } else {
      reportAgentReasoning('Link Agent', `Found ${brokenLinks.length} broken link(s) out of ${links.length} total`, 'warning');
    }

    await context.close();
    await browser.close();
    console.log('   🏁 Link Agent complete\n');
    return { status: "ok", brokenLinks };
  } catch (err) {
    console.log(`   ❌ Error: ${(err as Error).message}\n`);
    await context.close();
    await browser.close();
    return { status: "fail", error: (err as Error).message };
  }
}
