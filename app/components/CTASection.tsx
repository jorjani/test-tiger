'use client';
import { useState } from 'react';

export function CTASection() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to start audit' });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-8 py-12 md:px-16 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Fix What's Broken?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Every day you wait is revenue lost. Get your comprehensive audit in 48 hours
            and start seeing results this week.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your website URL"
              className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Running Audit...' : 'Get My Free Audit'}
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              {result.error ? (
                <p className="text-red-200">{result.error}</p>
              ) : (
                <div>
                  <p className="text-green-200 mb-2">Audit completed!</p>
                  {result.auditId && (
                    <a href={`/audits/${result.auditId}`} className="text-white underline font-bold">
                      View Results →
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          <p className="text-orange-100 text-sm mt-6">
            💯 100% Money-Back Guarantee • 🔒 Your data is secure • ⚡ 48-hour turnaround
          </p>
        </div>
      </div>
    </section>
  );
}
