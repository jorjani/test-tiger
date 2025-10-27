import { runContentAgent } from "./agents/content_agent";
import { runLinkAgent } from "./agents/link_agent";
import { runLoadAgent } from "./agents/load_agent";
import { runStructureAgent } from "./agents/structure_agent";
import { runTraceAgent } from "./agents/trace_agent";
import { assignQATask, reviewQAResults } from "./agents/ceo_agent";
import { calculateScore, generateRecommendations, displayResults, checkCEOEscalation } from "./scorer";
import { generateReport } from "./reporter";
import sites from "./urls.json";
import { broadcastProgress } from "./dashboard-server";
import {
  setBroadcastFunction,
  reportAgentStart,
  reportAgentComplete,
  reportOverallProgress,
  reportScore,
  reportRecommendations,
  reportEscalation,
  reportAgentReasoning
} from "./progress_reporter";

// Set up progress reporting
setBroadcastFunction(broadcastProgress);

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

  // Give dashboard time to connect
  await new Promise(resolve => setTimeout(resolve, 1000));

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
    reportOverallProgress(90, 'Structure analyzed');

    const results = { url, trace, load, links, structure, content: null };

    // CEO reviews results
    reviewQAResults(results);

    // Autonomous scoring & recommendations
    const score = calculateScore(results);
    const recommendations = generateRecommendations(results);
    const escalation = checkCEOEscalation(score, recommendations);

    // Send to dashboard
    reportScore(score);
    reportRecommendations(recommendations);
    reportEscalation(escalation);
    reportOverallProgress(100, 'Analysis complete!');

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

  // Keep server running for dashboard viewing
  console.log('\n📊 Dashboard server still running at http://localhost:3000');
  console.log('Press Ctrl+C to exit\n');
})();
