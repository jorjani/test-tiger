import { chromium } from "playwright";

export async function runLoadAgent(url: string) {
  console.log('\n🤖 [LOAD AGENT] Starting...');
  console.log(`   Target: ${url}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1080 }
    }
  });
  const page = await context.newPage();

  try {
    console.log('   ⏳ Navigating to page...');
    const response = await page.goto(url);
    const status = response?.status();

    // Add visual indicator overlay
    await page.evaluate(() => {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        font-family: Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      overlay.innerHTML = '🤖 LOAD AGENT<br><small style="font-size: 14px; font-weight: normal;">Checking page load & HTTP status</small>';
      document.body.appendChild(overlay);
    });

    console.log(`   ✅ HTTP Status: ${status}`);

    // Wait to capture the overlay in video
    await page.waitForTimeout(2000);

    await context.close();
    await browser.close();
    console.log('   🏁 Load Agent complete\n');
    return { status: "ok", http_status: status };
  } catch (err) {
    console.log(`   ❌ Error: ${(err as Error).message}\n`);
    await context.close();
    await browser.close();
    return { status: "fail", error: (err as Error).message };
  }
}
