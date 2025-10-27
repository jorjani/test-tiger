#!/bin/bash

# Test Tiger QA Agent Runner
# This script runs the QA agents and saves all output to log files

echo "🤖 Starting Test Tiger QA Agent System..."
echo "📅 $(date)"
echo ""

# Create logs directory
mkdir -p logs

# Run the TypeScript agent system
echo "🚀 Executing QA agents..."
npx ts-node --project tsconfig.json run_agents.ts "$@"

# Check if the script completed successfully
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ QA Agent execution completed successfully!"
    echo "📁 Check the 'logs/' directory for detailed output files"
    echo ""
    echo "📋 Log files created:"
    ls -la logs/ | grep -E "\.(log|json)$" | tail -5
else
    echo ""
    echo "❌ QA Agent execution failed!"
    echo "📁 Check the 'logs/' directory for error details"
fi

echo ""
echo "🏁 Script finished at $(date)"
