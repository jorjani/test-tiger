#!/bin/bash
echo "🐅 Starting Test Tiger Dashboard Server..."
echo "📊 Dashboard Features:"
echo "   ✅ Real-time agent monitoring"
echo "   ✅ Live progress updates"
echo "   ✅ Quality score tracking"
echo "   ✅ AI recommendations"
echo "   ✅ CEO escalation alerts"
echo "   ✅ Agent reasoning display"
echo ""
echo "🎯 Usage:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Enter a URL to analyze"
echo "   3. Watch agents work in real-time!"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

cd /Users/alex-mac/Programming/test-tiger
npx ts-node --project tsconfig.json start_dashboard.ts

