import { chromium } from "playwright";

export async function runStructureAgent(url: string) {
  console.log('\n🏗️  [STRUCTURE AGENT] Starting...');
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
      overlay.id = 'structure-agent-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        font-family: Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      `;
      overlay.innerHTML = '🏗️ STRUCTURE AGENT<br><small style="font-size: 14px; font-weight: normal;">Analyzing HTML structure...</small>';
      document.body.appendChild(overlay);
    });

    await page.waitForTimeout(1500);

    console.log('   🔍 Checking HTML structure...');
    const structure = await page.evaluate(() => {
      const hasTitle = document.querySelector('title') !== null;
      const hasH1 = document.querySelector('h1') !== null;
      const hasMetaDescription = document.querySelector('meta[name="description"]') !== null;

      // Highlight elements for visual feedback
      if (hasTitle) {
        const title = document.querySelector('title');
        console.log('✅ Found <title>:', title?.textContent);
      }
      if (hasH1) {
        const h1 = document.querySelector('h1');
        if (h1) {
          h1.style.outline = '3px solid #4facfe';
          h1.style.outlineOffset = '5px';
        }
        console.log('✅ Found <h1>:', h1?.textContent);
      }
      if (hasMetaDescription) {
        const meta = document.querySelector('meta[name="description"]');
        console.log('✅ Found meta description:', meta?.getAttribute('content'));
      }

      return {
        hasTitle,
        hasH1,
        hasMetaDescription
      };
    });

    console.log('   📊 Structure Analysis:');
    console.log(`      - Title tag: ${structure.hasTitle ? '✅' : '❌'}`);
    console.log(`      - H1 heading: ${structure.hasH1 ? '✅' : '❌'}`);
    console.log(`      - Meta description: ${structure.hasMetaDescription ? '✅' : '❌'}`);

    // Update overlay with results
    await page.evaluate(({ struct }) => {
      const overlay = document.getElementById('structure-agent-overlay');
      if (overlay) {
        overlay.innerHTML = `
          🏗️ STRUCTURE AGENT<br>
          <small style="font-size: 14px; font-weight: normal;">
            Title: ${struct.hasTitle ? '✅' : '❌'} |
            H1: ${struct.hasH1 ? '✅' : '❌'} |
            Meta: ${struct.hasMetaDescription ? '✅' : '❌'}
          </small>
        `;
      }
    }, { struct: structure });

    await page.waitForTimeout(2000);

    await context.close();
    await browser.close();
    console.log('   🏁 Structure Agent complete\n');
    return { status: "ok", ...structure };
  } catch (err) {
    console.log(`   ❌ Error: ${(err as Error).message}\n`);
    await context.close();
    await browser.close();
    return { status: "fail", error: (err as Error).message };
  }
}
