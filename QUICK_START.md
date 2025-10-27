# Test Tiger QA Agent System

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Keys (Optional)
For content analysis with AI, you need an OpenAI API key:

```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
```

### 3. Run QA Agents

#### Option 1: Default URLs
```bash
npm run qa
```

#### Option 2: Custom URL
```bash
npm run qa:url https://example.com
```

#### Option 3: Shell Script
```bash
./run_qa.sh
```

#### Option 4: Direct TypeScript
```bash
npx ts-node --project tsconfig.json run_agents.ts
```

## Output Files

All logs and results are saved to the `logs/` directory:

- **`logs/qa-run-TIMESTAMP.log`** - Complete console output
- **`logs/results-TIMESTAMP-N.json`** - Individual site results as JSON

## Agents

The system includes 5 specialized QA agents:

1. **🤖 Load Agent** - Tests page load and HTTP status
2. **🔗 Link Agent** - Finds broken links
3. **🏗️ Structure Agent** - Validates HTML structure (SEO)
4. **🧠 Content Agent** - AI-powered content analysis (requires OpenAI API key)
5. **📋 Trace Agent** - Metadata and audit logging

## Features

- ✅ **Comprehensive Logging** - All output saved to files
- ✅ **Error Handling** - Graceful failure management
- ✅ **Video Recording** - Each agent records its testing process
- ✅ **Multiple Formats** - Console logs + JSON results
- ✅ **Command Line Support** - Test any URL
- ✅ **Progress Tracking** - Real-time console feedback

## Without OpenAI API Key

If you don't have an OpenAI API key, the system will:
- Run all other agents normally
- Skip content analysis with a clear message
- Still provide comprehensive QA reports

## Troubleshooting

### TypeScript Errors
Make sure you're using the tsconfig.json:
```bash
npx ts-node --project tsconfig.json run_agents.ts
```

### Missing Dependencies
```bash
npm install
```

### Permission Issues (macOS/Linux)
```bash
chmod +x run_qa.sh
```

