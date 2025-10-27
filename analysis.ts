// Core analysis logic - can be called from dashboard or CLI

import { chromium } from "playwright";
import { runAnalyticsAgent } from "./agents/analytics_agent";
import { assignQATask, reviewQAResults } from "./agents/ceo_agent";
import { runContentAgent } from "./agents/content_agent";
import { runLinkAgent } from "./agents/link_agent";
import { runLoadAgent } from "./agents/load_agent";
import { runPreviewAgent } from "./agents/preview_agent";
import { runStructureAgent } from "./agents/structure_agent";
import { runTraceAgent } from "./agents/trace_agent";
import {
    reportAgentComplete,
    reportAgentStart,
    reportEscalation,
    reportOverallProgress,
    reportRecommendations,
    reportScore
} from "./progress_reporter";
import { calculateScore, checkHumanEscalation, generateRecommendations } from "./scorer";

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

export async function runAnalysis(url: string) {
  const site = {
    url,
    agent_id: `Site-${Date.now()}`,
    purpose: 'Ad-hoc website analysis'
  };

  // CEO Agent assigns the task
  const task = assignQATask({
    website_url: url,
    business_goal: site.purpose,
    priority: 'high',
    success_criteria: [
      'Technical quality score > 80%',
      'No critical broken links',
      'SEO elements present',
      'Fast page load (HTTP 200)'
    ]
  });

  console.log(`\n${'='.repeat(55)}`);
  console.log(`🤖 QA TEAM: Executing Task ${task.task_id}`);
  console.log('='.repeat(55));

  // QA Team executes with progress reporting
  reportOverallProgress(10, 'Starting QA analysis...');

  reportAgentStart('Trace Agent', '📋');
  const trace = runTraceAgent(site);
  reportAgentComplete('Trace Agent', trace);
  reportOverallProgress(20, 'Metadata collected');

  reportAgentStart('Load Agent', '🤖');
  const load = await runLoadAgent(url);
  reportAgentComplete('Load Agent', load);
  reportOverallProgress(40, 'Page load tested');

  reportAgentStart('Link Agent', '🔗');
  const links = await runLinkAgent(url);
  reportAgentComplete('Link Agent', links);
  reportOverallProgress(70, 'Links validated');

  reportAgentStart('Structure Agent', '🏗️');
  const structure = await runStructureAgent(url);
  reportAgentComplete('Structure Agent', structure);
  reportOverallProgress(80, 'Structure analyzed');

  reportAgentStart('Content Agent', '🧠');
  
  // Extract actual web content for analysis
  const webContent = await extractWebContent(url);
  const content = await runContentAgent(webContent);
  reportAgentComplete('Content Agent', content);
  reportOverallProgress(85, 'Content analyzed');

  reportAgentStart('Analytics Agent', '📊');
  const analytics = await runAnalyticsAgent(url);
  reportAgentComplete('Analytics Agent', analytics);
  reportOverallProgress(90, 'Analytics processed');

  reportAgentStart('Preview Agent', '🖼️');
  const preview = await runPreviewAgent(url, { trace, load, links, structure, content, analytics });
  reportAgentComplete('Preview Agent', preview);
  reportOverallProgress(95, 'Preview generated');

  const results = { url, trace, load, links, structure, content, analytics, preview };

  // CEO reviews results
  reviewQAResults(results);

  // Autonomous scoring & recommendations
  const score = calculateScore(results);
  const recommendations = generateRecommendations(results);
  const escalation = checkHumanEscalation(score, recommendations);

  // Send to dashboard
  reportScore(score);
  reportRecommendations(recommendations);
  reportEscalation(escalation);
  reportOverallProgress(100, 'Analysis complete!');

  console.log('\n' + '═'.repeat(55));
  console.log('✅ Analysis Complete!');
  console.log('═'.repeat(55) + '\n');

  return { results, score, recommendations, escalation };
}
