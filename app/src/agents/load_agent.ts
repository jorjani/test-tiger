import { chromium } from "playwright";
import { reportAgentReasoning } from "../progress_reporter";

export async function runLoadAgent(url: string) {
  console.log('\n🤖 [LOAD AGENT] Starting...');
  console.log(`   Target: ${url}`);
  reportAgentReasoning('Load Agent', `Targeting: ${url}`, 'info');

  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--disable-gpu']
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('   ⏳ Navigating to page...');
    reportAgentReasoning('Load Agent', 'Navigating to page...', 'info');

    const response = await page.goto(url);
    const status = response?.status();

    if (status === 200) {
      reportAgentReasoning('Load Agent', `✓ Page loaded successfully (HTTP ${status})`, 'success');
    } else if (status && status >= 400) {
      reportAgentReasoning('Load Agent', `⚠ HTTP ${status} - Page may have issues`, 'warning');
    } else {
      reportAgentReasoning('Load Agent', `Page loaded with HTTP ${status}`, 'info');
    }

    const loadTime = await page.evaluate(() => {
      const perfData = window.performance.timing;
      return perfData.loadEventEnd - perfData.navigationStart;
    });

    reportAgentReasoning('Load Agent', `Page load time: ${loadTime}ms`, loadTime < 3000 ? 'success' : 'warning');

    console.log(`   ✅ HTTP Status: ${status}`);
    console.log(`   ⏱️  Load time: ${loadTime}ms`);

    await context.close();
    await browser.close();
    console.log('   🏁 Load Agent complete\n');
    return { status: "ok", http_status: status, load_time: loadTime };
  } catch (err) {
    console.log(`   ❌ Error: ${(err as Error).message}\n`);
    reportAgentReasoning('Load Agent', `✗ Error: ${(err as Error).message}`, 'error');
    await context.close();
    await browser.close();
    return { status: "fail", error: (err as Error).message };
  }
}
