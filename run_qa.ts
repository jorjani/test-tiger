import { runContentAgent } from "./agents/content_agent";
import { runLinkAgent } from "./agents/link_agent";
import { runLoadAgent } from "./agents/load_agent";
import { runStructureAgent } from "./agents/structure_agent";
import { runTraceAgent } from "./agents/trace_agent";
import { assignQATask, reviewQAResults } from "./agents/ceo_agent";
import { calculateScore, generateRecommendations, displayResults, checkCEOEscalation } from "./scorer";
import { generateReport } from "./reporter";
import sites from "./urls.json";

(async () => {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🤖 AUTONOMOUS COMPANY - QA DIVISION');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📅 Started at: ${new Date().toISOString()}`);

  // Check if URL is provided as command line argument
  const urlArg = process.argv[2];
  const sitesToAnalyze = urlArg
    ? [{ url: urlArg, agent_id: `Site-${Date.now()}`, purpose: 'Ad-hoc website analysis' }]
    : sites;

  console.log(`🎯 Sites to analyze: ${sitesToAnalyze.length}\n`);

  for (let i = 0; i < sitesToAnalyze.length; i++) {
    const site = sitesToAnalyze[i];
    const url = site.url;

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

    // QA Team executes
    console.log('\n📋 Starting QA analysis...');

    console.log('\n📋 Running Trace Agent...');
    const trace = runTraceAgent(site);

    console.log('\n🤖 Running Load Agent...');
    const load = await runLoadAgent(url);

    console.log('\n🔗 Running Link Agent...');
    const links = await runLinkAgent(url);

    console.log('\n🏗️ Running Structure Agent...');
    const structure = await runStructureAgent(url);

    const results = { url, trace, load, links, structure, content: null };

    // CEO reviews results
    reviewQAResults(results);

    // Autonomous scoring & recommendations
    const score = calculateScore(results);
    const recommendations = generateRecommendations(results);
    const escalation = checkCEOEscalation(score, recommendations);

    // Display intelligent analysis
    displayResults(results, score, recommendations);

    // Traditional report (for reference)
    console.log('\n' + '─'.repeat(55));
    console.log('📋 Detailed Technical Report');
    console.log('─'.repeat(55));
    generateReport(results);
  }

  console.log('\n' + '═'.repeat(55));
  console.log('✅ Autonomous QA System Complete!');
  console.log(`🏁 Finished at: ${new Date().toISOString()}`);
  console.log('═'.repeat(55) + '\n');
})();
