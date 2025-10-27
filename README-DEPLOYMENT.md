# Test Tiger QA System - Production Deployment

## 🚀 Quick Start

### Option 1: Simple Deployment
```bash
# Make deployment script executable
chmod +x deploy.sh

# Deploy locally
./deploy.sh

# Deploy with Docker
./deploy.sh --docker
```

### Option 2: Manual Deployment
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the server
npm start
```

### Option 3: Docker Compose
```bash
# Start with Docker Compose
docker-compose up -d

# Stop services
docker-compose down
```

## 🌐 Access Points

- **Dashboard**: http://localhost:3000
- **Test Website**: http://localhost:8080/bad-website.html
- **WebSocket**: ws://localhost:3000

## 🔧 Production Setup

### Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Stop
pm2 stop test-tiger
```

### Using Docker
```bash
# Build image
docker build -t test-tiger .

# Run container
docker run -d \
  --name test-tiger \
  -p 3000:3000 \
  -p 8080:8080 \
  -e OPENAI_API_KEY=your_key_here \
  test-tiger
```

## 📊 Monitoring

- **Logs**: Check `./logs/` directory
- **PM2**: `pm2 logs test-tiger`
- **Docker**: `docker logs test-tiger`

## 🔒 Security

- Set up HTTPS with SSL certificates
- Configure firewall rules
- Use environment variables for secrets
- Implement rate limiting
- Add authentication if needed

## 📈 Scaling

- Use load balancer for multiple instances
- Set up Redis for session storage
- Use CDN for static assets
- Implement health checks
- Set up monitoring and alerting

## 🛠️ Troubleshooting

### Port Issues
```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

### Permission Issues
```bash
# Fix permissions
chmod +x deploy.sh
chmod +x run_qa.sh
```

### Docker Issues
```bash
# Clean up Docker
docker system prune -a
docker volume prune
```

## 🔄 Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
npm run build
pm2 restart test-tiger
```

## 📞 Support

- Check logs in `./logs/` directory
- Monitor WebSocket connections
- Verify environment variables
- Check firewall and port accessibility
