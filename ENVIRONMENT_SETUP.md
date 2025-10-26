# Environment Variables for Test Tiger

## Frontend (Next.js)
These are automatically handled by Next.js - no setup required.

## Backend (QA System)

Create a `.env` file in the root directory:

```env
# OpenAI API Key (required for AI agent recommendations)
OPENAI_API_KEY=your_openai_api_key_here

# Playwright Configuration
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0

# WebSocket Server Configuration
WEBSOCKET_PORT=3001

# Optional: Logging Level
LOG_LEVEL=info
```

### Getting OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file as `OPENAI_API_KEY`

### Playwright Browsers
The first time you run the QA system, Playwright will automatically download browsers. This may take a few minutes.

```bash
# Install Playwright browsers manually if needed
npx playwright install
```
