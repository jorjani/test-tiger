// Start script - runs dashboard server and QA analysis together

import { startServer } from './dashboard-server';
import { spawn } from 'child_process';

console.log('🚀 Starting Autonomous QA System with Live Dashboard...\n');

// Start dashboard server in this process
console.log('📊 Starting dashboard server on http://localhost:3000');
startServer();

// Give server time to start
setTimeout(() => {
  console.log('\n🤖 Starting QA analysis...\n');

  // Start QA analysis in separate process
  const qaProcess = spawn('npx', ['tsx', 'run_qa.ts'], {
    stdio: 'inherit',
    shell: true
  });

  qaProcess.on('close', (code) => {
    console.log(`\n✅ QA analysis complete with code ${code}`);
    console.log('📊 Dashboard still running at http://localhost:3000');
    console.log('Press Ctrl+C to exit\n');
  });
}, 1000);

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down...');
  process.exit(0);
});
