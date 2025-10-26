// Real-time Dashboard WebSocket Server
// Connects agents to live dashboard for progress tracking

import { WebSocketServer } from 'ws';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT = 3000;

// Create HTTP server to serve dashboard
const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/dashboard') {
    const dashboardPath = path.join(__dirname, 'dashboard.html');
    const html = fs.readFileSync(dashboardPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

let clients: Set<any> = new Set();

wss.on('connection', (ws) => {
  console.log('✅ Dashboard client connected');
  clients.add(ws);

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'analyze') {
        console.log(`📊 Received analysis request for: ${data.url}`);

        // Run analysis in same process to share WebSocket
        const { runAnalysis } = require('./analysis');
        try {
          await runAnalysis(data.url);
          console.log(`✅ Analysis completed successfully`);

          // Broadcast completion to all clients
          broadcastProgress({
            type: 'analysis_complete',
            code: 0
          });
        } catch (error) {
          console.error(`❌ Analysis error:`, error);
          broadcastProgress({
            type: 'analysis_complete',
            code: 1
          });
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('❌ Dashboard client disconnected');
  });
});

// Broadcast function for agents to call
export function broadcastProgress(data: any) {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === 1) { // OPEN
      client.send(message);
    }
  });
}

// Start server function (only called when this file is run directly)
export function startServer() {
  server.listen(PORT, () => {
    console.log('═'.repeat(55));
    console.log(`📊 Dashboard server running at http://localhost:${PORT}`);
    console.log('═'.repeat(55));
  });
}

// Only start server if this file is run directly (not imported)
if (require.main === module) {
  startServer();
}

// Export server reference
export { server };
