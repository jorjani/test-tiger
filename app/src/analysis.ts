// Core analysis logic - can be called from dashboard or CLI

import { runLinkAgent } from "./agents/link_agent";
import { runLoadAgent } from "./agents/load_agent";
import { runStructureAgent } from "./agents/structure_agent";
import { runTraceAgent } from "./agents/trace_agent";
import { assignQATask, reviewQAResults } from "./agents/ceo_agent";
import { calculateScore, generateRecommendations, checkCEOEscalation } from "./scorer";
import {
  reportAgentStart,
  reportAgentComplete,
  reportOverallProgress,
  reportScore,
  reportRecommendations,
  reportEscalation
} from "./progress_reporter";

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

  console.log('\n' + '═'.repeat(55));
  console.log('✅ Analysis Complete!');
  console.log('═'.repeat(55) + '\n');

  return { results, score, recommendations, escalation };
}
