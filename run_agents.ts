import * as fs from 'fs';
import * as path from 'path';
import { chromium } from "playwright";
import { runAnalyticsAgent } from "./agents/analytics_agent";
import { runContentAgent } from "./agents/content_agent";
import { runLinkAgent } from "./agents/link_agent";
import { runLoadAgent } from "./agents/load_agent";
import { runPreviewAgent } from "./agents/preview_agent";
import { runStructureAgent } from "./agents/structure_agent";
import { runTraceAgent } from "./agents/trace_agent";
import { generateReport } from "./reporter";

// Extract web content for AI analysis
async function extractWebContent(url: string): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Extract main content (title, headings, paragraphs, etc.)
    const content = await page.evaluate(() => {
      const elements = [];
      
      // Get page title
      const title = document.querySelector('title')?.textContent;
      if (title) elements.push(`Title: ${title}`);
      
      // Get meta description
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      if (metaDesc) elements.push(`Description: ${metaDesc}`);
      
      // Get main headings
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach((h, i) => {
        if (i < 5) elements.push(`Heading ${h.tagName}: ${h.textContent?.trim()}`);
      });
      
      // Get main paragraphs (first 10)
      const paragraphs = document.querySelectorAll('p');
      paragraphs.forEach((p, i) => {
        if (i < 10 && p.textContent?.trim()) {
          elements.push(`Paragraph: ${p.textContent.trim()}`);
        }
      });
      
      // Get navigation links
      const navLinks = document.querySelectorAll('nav a, .nav a, .menu a');
      const linkTexts = Array.from(navLinks).slice(0, 10).map(a => a.textContent?.trim()).filter(Boolean);
      if (linkTexts.length > 0) {
        elements.push(`Navigation: ${linkTexts.join(', ')}`);
      }
      
      return elements.join('\n\n');
    });
    
    await browser.close();
    return content || 'No content extracted';
  } catch (error) {
    await browser.close();
    return `Error extracting content: ${error}`;
  }
}

// Load sites from JSON file
const sites = JSON.parse(fs.readFileSync('./urls.json', 'utf8'));

// Create logs directory if it doesn't exist
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Generate timestamp for log file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFile = path.join(logsDir, `qa-run-${timestamp}.log`);

// Override console.log to write to both console and file
const originalLog = console.log;
console.log = (...args: any[]) => {
  const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
  originalLog(...args);
  fs.appendFileSync(logFile, message + '\n');
};

(async () => {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🤖 TEST TIGER - QA AGENT SYSTEM');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`📝 Logging to: ${logFile}`);

  // Check if URL is provided as command line argument
  const urlArg = process.argv[2];
  const sitesToAnalyze = urlArg
    ? [{ url: urlArg, agent_id: `Site-${Date.now()}`, purpose: 'Ad-hoc website analysis' }]
    : sites;

  console.log(`🎯 Sites to analyze: ${sitesToAnalyze.length}\n`);

  for (let i = 0; i < sitesToAnalyze.length; i++) {
    const site = sitesToAnalyze[i];
    const url = site.url;

    console.log(`\n${'='.repeat(55)}`);
    console.log(`🌐 ANALYZING SITE ${i + 1}/${sitesToAnalyze.length}: ${url}`);
    console.log('='.repeat(55));

    try {
      // Run all agents
      console.log('\n📋 Running Trace Agent...');
      const trace = runTraceAgent(site);

      console.log('\n🤖 Running Load Agent...');
      const load = await runLoadAgent(url);

      console.log('\n🔗 Running Link Agent...');
      const links = await runLinkAgent(url);

      console.log('\n🏗️ Running Structure Agent...');
      const structure = await runStructureAgent(url);

      console.log('\n🧠 Running Content Agent...');
      const webContent = await extractWebContent(url);
      const content = await runContentAgent(webContent);

      console.log('\n📊 Running Analytics Agent...');
      const analytics = await runAnalyticsAgent(url);

      console.log('\n🖼️ Running Preview Agent...');
      const preview = await runPreviewAgent(url, { trace, load, links, structure, content, analytics });

      const results = { url, trace, load, links, structure, content, analytics, preview };

      // Generate comprehensive report
      console.log('\n' + '─'.repeat(55));
      console.log('📋 DETAILED QA REPORT');
      console.log('─'.repeat(55));
      generateReport(results);

      // Save individual results to JSON
      const resultsFile = path.join(logsDir, `results-${timestamp}-${i + 1}.json`);
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
      console.log(`\n💾 Results saved to: ${resultsFile}`);

    } catch (error) {
      console.log(`\n❌ ERROR analyzing ${url}:`);
      console.log(`   ${(error as Error).message}`);
      console.log(`   Stack: ${(error as Error).stack}`);
    }
  }

  console.log('\n' + '═'.repeat(55));
  console.log('✅ QA Agent System Complete!');
  console.log(`🏁 Finished at: ${new Date().toISOString()}`);
  console.log(`📝 Full log saved to: ${logFile}`);
  console.log('═'.repeat(55) + '\n');

  // Restore original console.log
  console.log = originalLog;
})();
