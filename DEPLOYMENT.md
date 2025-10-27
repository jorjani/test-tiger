# Test Tiger QA System - Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Local Development Server
```bash
# Start the dashboard server
npm run dashboard

# In another terminal, start a simple HTTP server for the test website
python3 -m http.server 8080 --directory .
# OR
npx serve -p 8080
```

### Option 2: Docker Deployment
```bash
# Build and run with Docker
docker build -t test-tiger .
docker run -p 3000:3000 -p 8080:8080 test-tiger
```

### Option 3: Production Deployment
```bash
# Build for production
npm run build
npm start
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional, for content analysis)

## 🔧 Environment Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd test-tiger
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp env.example .env
# Edit .env and add your OpenAI API key
```

4. **Start the system**
```bash
npm run dashboard
```

## 🌐 Access Points

- **Dashboard**: http://localhost:3000
- **Test Website**: http://localhost:8080/bad-website.html
- **API Endpoint**: ws://localhost:3000 (WebSocket)

## 📦 Production Build

```bash
# Compile TypeScript
npm run build

# Start production server
npm start
```

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t test-tiger .

# Run container
docker run -d \
  --name test-tiger \
  -p 3000:3000 \
  -p 8080:8080 \
  -e OPENAI_API_KEY=your_key_here \
  test-tiger
```

## ☁️ Cloud Deployment

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Railway
```bash
npm install -g @railway/cli
railway login
railway deploy
```

## 🔒 Security Considerations

- Set up proper CORS policies
- Use environment variables for API keys
- Implement rate limiting
- Add authentication if needed
- Use HTTPS in production

## 📊 Monitoring

- Check logs in `./logs/` directory
- Monitor WebSocket connections
- Track agent performance metrics
- Set up error reporting

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9

# Kill processes on port 8080  
lsof -ti:8080 | xargs kill -9
```

### Missing Dependencies
```bash
npm install
npm run build
```

### WebSocket Connection Issues
- Check firewall settings
- Verify port accessibility
- Check browser console for errors

## 📈 Scaling

- Use PM2 for process management
- Set up load balancing
- Implement Redis for session storage
- Use CDN for static assets
- Set up monitoring and alerting

## 🔄 Updates

```bash
git pull origin main
npm install
npm run build
pm2 restart test-tiger
```
