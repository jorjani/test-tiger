import dotenv from "dotenv";
import { OpenAI } from "openai";
dotenv.config();

// Only initialize OpenAI if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function runContentAgent(content: string) {
  console.log('\n🧠 [CONTENT AGENT] Starting...');
  
  if (!openai) {
    console.log('   ⚠️  OpenAI API key not found - skipping content analysis');
    console.log('   💡 To enable content analysis, set OPENAI_API_KEY in .env file');
    console.log('   🏁 Content Agent skipped\n');
    return {
      status: "skipped",
      reason: "OpenAI API key not configured",
      evaluation: "Content analysis requires OpenAI API key"
    };
  }

  try {
    console.log('   🤖 Analyzing content with OpenAI GPT-4...');
    const prompt = `Evaluate the following web content for a merchandise store:\n\n${content}\n\nPlease provide your evaluation in this exact format:\n\nClarity: [1-5]/5\nTone: [1-5]/5\nComment: [Your detailed analysis here]\n\nRate clarity (how clear and understandable the content is) and tone (how appropriate and engaging the tone is) on a 1-5 scale, then provide a brief comment about the content quality.`;

    const res = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    console.log('   ✅ Content analysis complete');
    console.log('   🏁 Content Agent complete\n');
    return {
      status: "ok",
      evaluation: res.choices[0].message.content
    };
  } catch (err) {
    console.log(`   ❌ Error: ${(err as Error).message}`);
    console.log('   🏁 Content Agent failed\n');
    return {
      status: "fail",
      error: (err as Error).message
    };
  }
}
