import { runContentAgent } from "./agents/content_agent";
import { runLinkAgent } from "./agents/link_agent";
import { runLoadAgent } from "./agents/load_agent";
import { runStructureAgent } from "./agents/structure_agent";
import { runTraceAgent } from "./agents/trace_agent";
import { generateReport } from "./reporter";
import sites from "./urls.json";

(async () => {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🚀 Multi-Agent Website Analysis System');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`📅 Started at: ${new Date().toISOString()}`);
  console.log(`🎯 Sites to analyze: ${sites.length}\n`);

  for (let i = 0; i < sites.length; i++) {
    const site = sites[i];
    const url = site.url;

    console.log(`\n${'='.repeat(55)}`);
    console.log(`🌐 Analyzing Site ${i + 1}/${sites.length}: ${url}`);
    console.log('='.repeat(55));

    const trace = runTraceAgent(site);
    const load = await runLoadAgent(url);
    const links = await runLinkAgent(url);
    const structure = await runStructureAgent(url);
    // const content = await runContentAgent("Placeholder content here");

    console.log('\n' + '─'.repeat(55));
    console.log('📊 Generating Report...');
    console.log('─'.repeat(55));
    generateReport({ url, trace, load, links, structure, content: null });
  }

  console.log('\n' + '═'.repeat(55));
  console.log('✅ All analyses complete!');
  console.log(`🏁 Finished at: ${new Date().toISOString()}`);
  console.log('═'.repeat(55) + '\n');
})();
