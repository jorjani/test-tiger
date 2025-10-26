'use client';

import { useState, useEffect } from 'react';

interface QAResult {
  type: string;
  message?: string;
  score?: number;
  recommendations?: string[];
  agent?: string;
  progress?: number;
}

export default function Dashboard() {
  const [results, setResults] = useState<QAResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [lastAuditId, setLastAuditId] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    const savedAuditId = localStorage.getItem('lastAuditId');
    const savedResults = localStorage.getItem('lastResults');

    if (savedAuditId && savedResults) {
      setLastAuditId(savedAuditId);
      setResults(JSON.parse(savedResults));
    }
  }, []);

  const handleAnalyze = async (url: string) => {
    if (!url) return;

    setIsAnalyzing(true);
    setCurrentUrl(url);
    setResults([]);
    setProgress(10);

    try {
      // Simulate progress while waiting
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 1500);

      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, email: 'demo@test.com' }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      console.log('📊 API Response:', data); // Debug logging

      // Results are returned directly (no polling needed)
      if (data.insights) {
        const auditResults: QAResult[] = [
          {
            type: 'score',
            agent: 'AI Analyzer',
            score: data.insights.overallScore,
            message: data.insights.firstImpression,
          },
          {
            type: 'seo',
            agent: 'SEO Agent',
            message: `Title: ${data.seo?.title || 'N/A'}`,
            recommendations: data.seo ? [
              `H1 Tags: ${data.seo.h1Tags?.join(', ') || 'None'}`,
              `Mobile Optimized: ${data.seo.mobileOptimized || 'Unknown'}`
            ] : []
          },
          {
            type: 'performance',
            agent: 'Performance Agent',
            message: `Load Speed: ${data.performance?.loadSpeed || 'Unknown'}`,
            recommendations: data.performance?.recommendations || []
          },
          {
            type: 'recommendations',
            agent: 'AI Insights',
            recommendations: data.insights?.recommendations || []
          }
        ];

        setResults(auditResults);
        localStorage.setItem('lastAuditId', data.auditId);
        localStorage.setItem('lastResults', JSON.stringify(auditResults));
        setIsAnalyzing(false);
      } else {
        setResults([{ type: 'error', message: 'No analysis data received' }]);
        setIsAnalyzing(false);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setResults([{ type: 'error', message: error instanceof Error ? error.message : 'Failed to start analysis' }]);
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  // Removed pollForResults - not needed with direct response
  // Removed connectWebSocket - not needed for MVP

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            🐯 Test Tiger QA Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Real-time website quality analysis powered by AI agents
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="url"
              placeholder="Enter website URL to analyze..."
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnalyze((e.target as HTMLInputElement).value);
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[type="url"]') as HTMLInputElement;
                handleAnalyze(input.value);
              }}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              {isAnalyzing ? '🔄 Analyzing...' : '🚀 Start Analysis'}
            </button>
          </div>
        </div>

        {/* Results Display */}
        {results.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-gray-700 rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold capitalize">{result.type}</span>
                    {result.agent && <span className="text-orange-400">({result.agent})</span>}
                  </div>
                  {result.message && <p className="text-gray-300 mb-2">{result.message}</p>}
                  {result.score !== undefined && (
                    <div className="mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-400">{result.score}/100</span>
                        <div className="flex-1 bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${result.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-400 mb-1">Recommendations:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {isAnalyzing && progress > 0 && (
          <div className="mb-4">
            <div className="bg-gray-700 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2">Progress: {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
