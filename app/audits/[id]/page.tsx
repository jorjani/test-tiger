import { notFound } from 'next/navigation';

async function getAudit(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/audit?id=${id}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch audit:', error);
    return null;
  }
}

export default async function AuditResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) {
    notFound();
  }

  // Parse the extraction results (they come as strings from Stagehand)
  const insights = typeof audit.insights === 'string'
    ? JSON.parse(audit.insights.extraction || '{}')
    : audit.insights;

  const seo = typeof audit.seo === 'string'
    ? JSON.parse(audit.seo.extraction || '{}')
    : audit.seo;

  const performance = typeof audit.performance === 'string'
    ? JSON.parse(audit.performance.extraction || '{}')
    : audit.performance;

  const overallScore = insights.overallScore || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            🐯 Website Audit Results
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {audit.url}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Audited on {new Date(audit.timestamp).toLocaleString()}
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-5xl font-bold mb-4">
              {overallScore}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Overall Score
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {insights.firstImpression || 'Analysis complete'}
            </p>
          </div>
        </div>

        {/* Video Recording */}
        {audit.videoUrl && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🎬 Audit Recording
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Watch the full audit session showing how we analyzed your website:
            </p>
            <a
              href={audit.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Watch Recording →
            </a>
          </div>
        )}

        {/* Key Findings Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* UX Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🎨</span> UX & Design
            </h3>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Call-to-Action Analysis
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {insights.ctaVisibility || 'Analyzing CTAs...'}
              </p>
              {insights.ctaButtons && insights.ctaButtons.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-500">
                  {insights.ctaButtons.map((cta: string, i: number) => (
                    <li key={i}>{cta}</li>
                  ))}
                </ul>
              )}
            </div>

            {insights.uxIssues && insights.uxIssues.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Issues Found
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  {insights.uxIssues.map((issue: string, i: number) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {insights.trustSignals && insights.trustSignals.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Trust Signals
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  {insights.trustSignals.map((signal: string, i: number) => (
                    <li key={i}>{signal}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* SEO Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-2">🔍</span> SEO Analysis
            </h3>

            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Title:</span>
                <p className="text-gray-600 dark:text-gray-400">{seo.title || 'Not found'}</p>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Description:</span>
                <p className="text-gray-600 dark:text-gray-400">{seo.description || 'Not found'}</p>
              </div>

              {seo.h1Tags && seo.h1Tags.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">H1 Tags:</span>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                    {seo.h1Tags.map((h1: string, i: number) => (
                      <li key={i}>{h1}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Structured Data:</span>
                <p className="text-gray-600 dark:text-gray-400">
                  {seo.hasSchema ? '✓ Found' : '✗ Not found'}
                </p>
              </div>

              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Mobile Optimization:</span>
                <p className="text-gray-600 dark:text-gray-400">{seo.mobileOptimized || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="mr-2">⚡</span> Performance
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Load Speed</span>
              <p className="text-2xl font-bold text-orange-600 capitalize">
                {performance.loadSpeed || 'Unknown'}
              </p>
            </div>

            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">Large Images</span>
              <p className="text-2xl font-bold text-orange-600">
                {performance.largeImages || 0}
              </p>
            </div>

            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">External Scripts</span>
              <p className="text-gray-600 dark:text-gray-400">
                {performance.externalScripts || 'Unknown'}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-2">💡</span> Top Recommendations
          </h3>

          <div className="space-y-4">
            {insights.recommendations && insights.recommendations.length > 0 ? (
              insights.recommendations.map((rec: string, i: number) => (
                <div key={i} className="bg-white/10 rounded-lg p-4">
                  <p className="font-semibold mb-1">#{i + 1}</p>
                  <p>{rec}</p>
                </div>
              ))
            ) : (
              <p>No specific recommendations at this time.</p>
            )}

            {performance.recommendations && performance.recommendations.length > 0 && (
              <>
                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="font-semibold mb-3">Performance Improvements:</p>
                </div>
                {performance.recommendations.map((rec: string, i: number) => (
                  <div key={`perf-${i}`} className="bg-white/10 rounded-lg p-4">
                    <p>{rec}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Get Full Professional Audit →
          </a>
        </div>
      </div>
    </div>
  );
}
