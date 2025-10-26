import { chromium } from "playwright";

export async function runLinkAgent(url: string) {
  console.log('\n🔗 [LINK AGENT] Starting...');
  console.log(`   Target: ${url}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1080 }
    }
  });
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

    await page.waitForTimeout(1500);

    // Get all links on the page
    console.log('   🔍 Extracting links...');
    const links = await page.$$eval('a[href]', (elements) =>
      elements.map(el => (el as HTMLAnchorElement).href)
    );

    console.log(`   📊 Found ${links.length} links`);

    await page.evaluate(({ count }) => {
      const overlay = document.getElementById('link-agent-overlay');
      if (overlay) {
        overlay.innerHTML = `🔗 LINK AGENT<br><small style="font-size: 14px; font-weight: normal;">Testing ${count} links...</small>`;
      }
    }, { count: links.length });

    const brokenLinks: string[] = [];

    // Check each link
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      console.log(`   ⏳ Testing link ${i + 1}/${links.length}: ${link}`);

      try {
        const response = await page.goto(link, { waitUntil: 'networkidle', timeout: 5000 });
        if (!response || response.status() >= 400) {
          console.log(`   ❌ Broken: ${link} (status: ${response?.status()})`);
          brokenLinks.push(link);
        } else {
          console.log(`   ✅ OK: ${link}`);
        }
      } catch (error) {
        console.log(`   ❌ Broken: ${link} (error)`);
        brokenLinks.push(link);
      }

      // Update overlay
      await page.evaluate(({ current, total, broken }) => {
        const overlay = document.getElementById('link-agent-overlay');
        if (overlay) {
          overlay.innerHTML = `🔗 LINK AGENT<br><small style="font-size: 14px; font-weight: normal;">Tested ${current}/${total} | Broken: ${broken}</small>`;
        }
      }, { current: i + 1, total: links.length, broken: brokenLinks.length });
    }

    console.log(`   📋 Summary: ${brokenLinks.length} broken links found`);
    await page.waitForTimeout(2000);

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
