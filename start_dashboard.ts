#!/usr/bin/env node

// Test Tiger - WebSocket Dashboard Server
// Starts the dashboard server and connects progress reporting

import { broadcastProgress, startServer } from './dashboard_server';
import { setBroadcastFunction } from './progress_reporter';

console.log('🐅 Starting Test Tiger Dashboard Server...\n');

// Connect progress reporter to WebSocket broadcast BEFORE starting server
setBroadcastFunction(broadcastProgress);

// Start the WebSocket server
startServer();

console.log('\n📊 Dashboard Features:');
console.log('   ✅ Real-time agent monitoring');
console.log('   ✅ Live progress updates');
console.log('   ✅ Quality score tracking');
console.log('   ✅ AI recommendations');
console.log('   ✅ Human-in-the-loop escalation alerts');
console.log('   ✅ Agent reasoning display');

console.log('\n🎯 Usage:');
console.log('   1. Open http://localhost:8080 in your browser');
console.log('   2. Enter a URL to analyze');
console.log('   3. Watch agents work in real-time!');
console.log('   4. Access bad-website.html at http://localhost:8080/bad-website.html');

console.log('\n🛑 Press Ctrl+C to stop the server\n');
