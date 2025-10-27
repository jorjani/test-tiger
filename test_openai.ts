import dotenv from "dotenv";
import { OpenAI } from "openai";

// Load environment variables
dotenv.config();

console.log('🔑 Testing OpenAI API Key Configuration...\n');

if (!process.env.OPENAI_API_KEY) {
  console.log('❌ OPENAI_API_KEY not found in environment variables');
  console.log('💡 Make sure you have a .env file with your API key');
  process.exit(1);
}

if (process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
  console.log('❌ You still have the placeholder API key');
  console.log('💡 Replace "your_openai_api_key_here" with your actual API key');
  process.exit(1);
}

console.log('✅ API key found in environment');
console.log(`🔑 Key starts with: ${process.env.OPENAI_API_KEY.substring(0, 10)}...`);

// Test the API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testAPI() {
  try {
    console.log('\n🤖 Testing API connection...');
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say 'Hello from Test Tiger!'" }],
      max_tokens: 10
    });

    console.log('✅ API connection successful!');
    console.log(`🤖 Response: ${response.choices[0].message.content}`);
    console.log('\n🎉 OpenAI is ready for content analysis!');
    
  } catch (error) {
    console.log('❌ API test failed:');
    console.log(`   Error: ${(error as Error).message}`);
    console.log('\n💡 Check your API key and try again');
  }
}

testAPI();

