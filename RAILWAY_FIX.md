# Railway Deployment Guide

**Branch:** `railway-deployment`

This branch contains fixes for deploying Test Tiger to Railway (or any containerized environment).

---

## 🐛 The Problem

**Error:** `The browser context is undefined. This means the CDP connection to the browser failed`

**Why:** Railway's Docker containers don't have Chromium browser installed by default.

---

## ✅ The Solution (2 Options)

### **Option 1: Browserbase (Recommended - 5 minutes)**

Use Browserbase's cloud browser service - no Docker setup needed!

#### Steps:

1. **Sign up for Browserbase** (free tier available)
   - Visit: https://www.browserbase.com
   - Create account

2. **Get your credentials:**
   - API Key (starts with `bb_live_`)
   - Project ID (UUID format)

3. **Add to Railway environment variables:**
   ```
   BROWSERBASE_API_KEY=bb_live_xxxxxxxxxxxxx
   BROWSERBASE_PROJECT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

4. **Deploy!**
   - Railway will auto-deploy
   - Code automatically detects Browserbase and uses it

**Benefits:**
- ✅ Works immediately
- ✅ No Dockerfile needed
- ✅ Faster builds (~30s)
- ✅ Built-in video recording
- ✅ Better for production

---

### **Option 2: Use Dockerfile (Self-Hosted Chromium)**

The Dockerfile installs Chromium in the Railway container.

#### What it does:
- Installs Chromium + all dependencies
- Configures Puppeteer environment
- Builds Next.js with Tailwind properly (`npm ci` not `npm ci --only=production`)

#### Railway will auto-detect and use it!

**Downsides:**
- Slower build times (~2-3 min)
- Larger container size
- May still have display/graphics issues in some environments

---

## 🔧 Code Changes in This Branch

### 1. **Dockerfile**
- Installs Chromium and system dependencies
- Fixed `npm ci` (not `--only=production`) to include Tailwind CSS
- Prunes devDependencies after build

### 2. **app/api/audit/route.ts**
```typescript
const useBrowserbase = !!process.env.BROWSERBASE_API_KEY;

const stagehand = new Stagehand({
  env: useBrowserbase ? 'BROWSERBASE' : 'LOCAL',
  // ... Browserbase credentials only used if env var present
});
```
- Auto-detects Browserbase vs LOCAL
- Logs which mode is being used

---

## 🧪 Testing Locally

**Without Browserbase (uses LOCAL Chromium):**
```bash
npm run dev
# Uses your local Chromium
```

**With Browserbase (for testing cloud mode):**
```bash
# Add to .env.local:
BROWSERBASE_API_KEY=bb_live_xxxxx
BROWSERBASE_PROJECT_ID=xxxxx

npm run dev
# Now uses Browserbase cloud browser
```

---

## 🚀 Deploying to Railway

### Using Browserbase (Recommended):

1. **Push this branch:**
   ```bash
   git push origin railway-deployment
   ```

2. **In Railway dashboard:**
   - Go to Variables tab
   - Add:
     ```
     BROWSERBASE_API_KEY=bb_live_xxxxx
     BROWSERBASE_PROJECT_ID=xxxxx
     ```

3. **Redeploy**
   - Railway auto-deploys on env var changes
   - Or manually trigger redeploy

4. **Check logs:**
   ```
   🎬 Starting audit for: https://example.com
   🌐 Using BROWSERBASE (cloud) mode
   🔗 Initializing browser connection...
   📱 Navigating to URL...
   ✅ Should work!
   ```

### Using Dockerfile (Self-Hosted):

1. **Just push this branch:**
   ```bash
   git push origin railway-deployment
   ```

2. **Railway auto-detects Dockerfile**
   - Builds with Docker automatically
   - Takes ~2-3 min first time

3. **Check logs for:**
   ```
   🌐 Using LOCAL (Chromium) mode
   ```

---

## 📊 Comparison Table

| Feature | Browserbase | Dockerfile + Chromium |
|---------|-------------|----------------------|
| Setup Time | 5 min | 0 min (auto) |
| Build Time | ~30s | ~3 min |
| Reliability | Very High | Medium |
| Video Recording | Built-in | Complex to add |
| Cost | Free tier available | Uses Railway resources |
| **Recommended** | ✅ **YES** | Only if self-hosting required |

---

## 🐛 Troubleshooting

### "Browser context is undefined" still appears:

**If using Browserbase:**
- ✅ Check env var names are exact: `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID`
- ✅ Verify API key starts with `bb_live_`
- ✅ Check Railway redeployed after adding env vars
- ✅ Look at Railway logs for "Using BROWSERBASE mode"

**If using Dockerfile:**
- ✅ Verify Railway detected the Dockerfile (check build logs)
- ✅ Look for Chromium installation in build output
- ✅ Check for display/graphics errors in logs

### Build fails with "Cannot find module 'tailwindcss'":

**This is fixed in the Dockerfile!**
- Old: `npm ci --only=production` (skipped Tailwind)
- New: `npm ci` then `npm prune --production`
- Installs devDeps for build, removes them after

### Deployment times out:

- Railway has deployment timeout limits
- Browserbase usually faster than Dockerfile
- Check Railway plan limits

---

## 📝 Next Steps

1. **Choose your deployment method** (Browserbase recommended)
2. **Test an audit** on your deployed site
3. **Check Railway logs** to verify browser connection
4. **Merge to main** once working

---

## 🔗 Helpful Links

- Browserbase Docs: https://docs.browserbase.com
- Railway Docs: https://docs.railway.app
- Stagehand Docs: https://docs.stagehand.dev

---

**Questions?** Check Railway logs first - they'll show exactly which mode is running and any errors.
