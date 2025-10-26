// Autonomous Scoring & Recommendation System
// Aggregates QA results into actionable business intelligence

interface QAResults {
  url: string;
  trace: any;
  load: any;
  links: any;
  structure: any;
  content: any;
}

interface Score {
  overall: number;
  technical: number;
  seo: number;
  reliability: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

interface Recommendation {
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  issue: string;
  action: string;
  business_impact: string;
}

export function calculateScore(results: QAResults): Score {
  let technical = 100;
  let seo = 100;
  let reliability = 100;

  // Technical scoring
  if (results.load.status !== 'ok') {
    technical -= 50;
  }
  if (results.load.http_status !== 200) {
    technical -= 30;
  }

  // Reliability scoring (links)
  if (results.links.status === 'ok' && results.links.brokenLinks) {
    const brokenCount = results.links.brokenLinks.length;
    reliability -= Math.min(brokenCount * 10, 80);
  }

  // SEO scoring (structure)
  if (results.structure.status === 'ok') {
    if (!results.structure.hasTitle) seo -= 30;
    if (!results.structure.hasH1) seo -= 25;
    if (!results.structure.hasMetaDescription) seo -= 20;
  }

  const overall = Math.round((technical + seo + reliability) / 3);

  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (overall >= 90) grade = 'A';
  else if (overall >= 80) grade = 'B';
  else if (overall >= 70) grade = 'C';
  else if (overall >= 60) grade = 'D';
  else grade = 'F';

  return {
    overall,
    technical,
    seo,
    reliability,
    grade
  };
}

export function generateRecommendations(results: QAResults): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Check broken links
  if (results.links.status === 'ok' && results.links.brokenLinks && results.links.brokenLinks.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'Technical Quality',
      issue: `Found ${results.links.brokenLinks.length} broken link(s)`,
      action: `Fix broken links: ${results.links.brokenLinks.slice(0, 3).join(', ')}${results.links.brokenLinks.length > 3 ? '...' : ''}`,
      business_impact: 'Broken links damage user trust and SEO rankings'
    });
  }

  // Check page load
  if (results.load.http_status !== 200) {
    recommendations.push({
      priority: 'critical',
      category: 'Technical Quality',
      issue: `HTTP status ${results.load.http_status} detected`,
      action: 'Investigate and fix server response issues',
      business_impact: 'Site may be inaccessible to customers, causing lost revenue'
    });
  }

  // Check SEO elements
  if (results.structure.status === 'ok') {
    if (!results.structure.hasTitle) {
      recommendations.push({
        priority: 'high',
        category: 'SEO',
        issue: 'Missing page title',
        action: 'Add descriptive <title> tag to improve SEO',
        business_impact: 'Missing titles hurt search engine rankings'
      });
    }

    if (!results.structure.hasH1) {
      recommendations.push({
        priority: 'medium',
        category: 'SEO',
        issue: 'Missing H1 heading',
        action: 'Add H1 heading with primary keywords',
        business_impact: 'Reduced visibility in search results'
      });
    }

    if (!results.structure.hasMetaDescription) {
      recommendations.push({
        priority: 'medium',
        category: 'SEO',
        issue: 'Missing meta description',
        action: 'Add compelling meta description for search results',
        business_impact: 'Lower click-through rate from search engines'
      });
    }
  }

  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations;
}

export function checkCEOEscalation(score: Score, recommendations: Recommendation[]): {
  escalate: boolean;
  reason: string;
  severity: 'critical' | 'warning' | 'info';
} {
  // CEO escalation logic based on business impact

  // Critical: Score below 70 or critical issues found
  if (score.overall < 70) {
    return {
      escalate: true,
      reason: `Quality score critically low (${score.overall}/100). Immediate executive attention required.`,
      severity: 'critical'
    };
  }

  const criticalIssues = recommendations.filter(r => r.priority === 'critical');
  if (criticalIssues.length > 0) {
    return {
      escalate: true,
      reason: `${criticalIssues.length} critical issue(s) detected. Business operations may be impacted.`,
      severity: 'critical'
    };
  }

  // Warning: Score below 85 or multiple high-priority issues
  const highPriorityIssues = recommendations.filter(r => r.priority === 'high');
  if (score.overall < 85 && highPriorityIssues.length > 2) {
    return {
      escalate: true,
      reason: `Quality score below target (${score.overall}/100) with ${highPriorityIssues.length} high-priority issues. CEO review recommended.`,
      severity: 'warning'
    };
  }

  // All good - no escalation needed
  return {
    escalate: false,
    reason: `Quality standards met (${score.overall}/100). QA team can handle autonomously.`,
    severity: 'info'
  };
}

export function displayResults(results: QAResults, score: Score, recommendations: Recommendation[]) {
  console.log('\n' + '═'.repeat(55));
  console.log('📊 [AUTONOMOUS QA SYSTEM] Final Report');
  console.log('═'.repeat(55));

  // Overall Score
  console.log(`\n🎯 Overall Quality Score: ${score.overall}/100 (Grade: ${score.grade})`);
  console.log(`\n📈 Breakdown:`);
  console.log(`   Technical Health:  ${score.technical}/100`);
  console.log(`   SEO Optimization:  ${score.seo}/100`);
  console.log(`   Reliability:       ${score.reliability}/100`);

  // CEO Escalation Check
  const escalation = checkCEOEscalation(score, recommendations);
  console.log(`\n🎯 CEO Escalation: ${escalation.escalate ? 'YES' : 'NO'}`);
  console.log(`   Reason: ${escalation.reason}`);

  if (escalation.escalate) {
    const emoji = escalation.severity === 'critical' ? '🚨' : '⚠️';
    console.log(`\n${emoji} ESCALATING TO CEO - Human review required`);
  } else {
    console.log(`\n✅ NO ESCALATION NEEDED - Agents proceeding autonomously`);
  }

  // Recommendations
  console.log(`\n💡 AI-Generated Recommendations (${recommendations.length} total):\n`);

  if (recommendations.length === 0) {
    console.log('   ✅ No issues found - website meets all quality standards!');
  } else {
    recommendations.slice(0, 5).forEach((rec, i) => {  // Only show top 5
      const priorityEmoji = {
        critical: '🔴',
        high: '🟠',
        medium: '🟡',
        low: '🟢'
      }[rec.priority];

      console.log(`   ${priorityEmoji} [${rec.priority.toUpperCase()}] ${rec.category}`);
      console.log(`      Issue: ${rec.issue}`);
      console.log(`      Action: ${rec.action}`);
      console.log(`      Impact: ${rec.business_impact}`);
      if (i < Math.min(recommendations.length - 1, 4)) console.log('');
    });

    if (recommendations.length > 5) {
      console.log(`\n   ... and ${recommendations.length - 5} more recommendations`);
    }
  }

  console.log('\n' + '═'.repeat(55));
  console.log('🤖 Autonomous QA Complete - Ready for CEO Review');
  console.log('═'.repeat(55) + '\n');
}
