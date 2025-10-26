'use client';

import React, { useState, useRef } from 'react';
import { CTASection } from './components/CTASection';

export default function Home() {
  const [auditUrl, setAuditUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl) return;
    setLoading(true);
    setShowVideo(false);

    // simulate work (replace with real ingestion + test run)
    setTimeout(async () => {
      setLoading(false);
      setShowVideo(true);

      // try to play the video (muted autoplay more likely to succeed)
      try {
        await videoRef.current?.play();
      } catch (err) {
        // autoplay may be blocked; leave video visible for user to start
        // no-op
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                🐯 Test Tiger
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Pricing
              </a>
              <a href="#process" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Process
              </a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Testimonials
              </a>
              <a href="/dashboard" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors">
                Try Demo
              </a>
            </div>
            <div>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Your Audit
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium mb-6">
            <span className="mr-2">⚡</span>
            Trusted by 500+ companies to improve their web presence
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Your Website Is Losing
            <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Customers Right Now
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Get a comprehensive website audit that reveals exactly what's costing you conversions,
            traffic, and revenue. Actionable insights delivered in 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#pricing"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Your Audit Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#demo"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg font-semibold hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
            >
              View Sample Audit
            </a>
          </div>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Get a comprehensive website audit that reveals exactly what's costing you conversions,
            traffic, and revenue. Actionable insights delivered in 48 hours.
          </p>

          {/* Large centered URL input + CTA */}
          <div className="flex flex-col items-center mb-12">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-4 justify-center px-4">
              <label htmlFor="audit-url" className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">Website URL</label>
              <input
                type="url"
                value={auditUrl}
                id="audit-url"
                name="audit-url"
                onChange={(e) => setAuditUrl(e.target.value)}
                placeholder="Enter your website URL (https://sundai.club)"
                className="w-full max-w-3xl px-6 py-4 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-500/30"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                aria-live="polite"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Running Audit...
                  </>
                ) : (
                  'Audit Website'
                )}
              </button>
            </form>

            {/* Hidden video that appears after the simulated audit */}
            <div className="w-full flex justify-center mt-6 px-4">
              {showVideo && (
                <video
                  ref={videoRef}
                  className="w-full max-w-4xl rounded-lg shadow-lg"
                  src="./sample.mp4"
                  muted
                  playsInline
                  autoPlay
                  controls
                  aria-hidden={!showVideo}
                />
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              48-Hour Delivery
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Money-Back Guarantee
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Subscription Required
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What's Included in Your Audit
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive analysis across 7 critical dimensions of web performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <FeatureCard
            icon="⚡"
            title="Performance Analysis"
            description="Core Web Vitals, load times, bundle sizes, and optimization opportunities. Includes Lighthouse scores and PageSpeed insights."
            metrics={["LCP < 2.5s", "FID < 100ms", "CLS < 0.1"]}
          />

          <FeatureCard
            icon="♿"
            title="Accessibility Audit"
            description="WCAG 2.1 compliance, screen reader compatibility, keyboard navigation, color contrast, and ARIA implementation."
            metrics={["WCAG AA/AAA", "Screen reader", "Keyboard nav"]}
          />

          <FeatureCard
            icon="🔍"
            title="SEO Review"
            description="Meta tags, structured data, sitemap, robots.txt, mobile-friendliness, and search ranking factors."
            metrics={["Schema markup", "Mobile-first", "Core ranking"]}
          />

          <FeatureCard
            icon="🎨"
            title="UX & Design Analysis"
            description="User flow, navigation clarity, visual hierarchy, mobile responsiveness, and design consistency."
            metrics={["User journey", "Mobile UX", "Visual flow"]}
          />

          <FeatureCard
            icon="🔄"
            title="Conversion Optimization"
            description="CTA placement, form optimization, checkout flow, trust signals, and friction point identification."
            metrics={["CTA analysis", "Form UX", "Trust signals"]}
          />

          <FeatureCard
            icon="🔒"
            title="Security & Best Practices"
            description="HTTPS implementation, CSP headers, XSS protection, dependency vulnerabilities, and security headers."
            metrics={["SSL/TLS", "Security headers", "Vulnerabilities"]}
          />
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Simple, transparent process from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep
              number="1"
              title="Submit Your URL"
              description="Provide your website URL and any specific areas of concern"
            />
            <ProcessStep
              number="2"
              title="We Analyze"
              description="Our experts audit your site across 7 critical dimensions using industry-leading tools"
            />
            <ProcessStep
              number="3"
              title="Receive Report"
              description="Get a comprehensive report with prioritized, actionable recommendations in 48 hours"
            />
            <ProcessStep
              number="4"
              title="Implementation Support"
              description="30-day email support to help you implement the recommendations"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            No subscriptions. No hidden fees. Just comprehensive audits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Essential"
            price="$497"
            description="Perfect for small businesses and landing pages"
            features={[
              "Up to 5 pages analyzed",
              "Performance & SEO audit",
              "Accessibility basics",
              "48-hour delivery",
              "PDF report",
              "7-day email support"
            ]}
            cta="Get Started"
            highlighted={false}
          />

          <PricingCard
            name="Professional"
            price="$997"
            description="Ideal for growing businesses and e-commerce"
            features={[
              "Up to 15 pages analyzed",
              "Full 7-dimension audit",
              "Competitor analysis (2 sites)",
              "24-hour delivery",
              "Interactive report + PDF",
              "30-day email support",
              "Priority queue"
            ]}
            cta="Most Popular"
            highlighted={true}
          />

          <PricingCard
            name="Enterprise"
            price="Custom"
            description="For large sites and ongoing monitoring"
            features={[
              "Unlimited pages",
              "Full audit + implementation roadmap",
              "Competitor analysis (5+ sites)",
              "12-hour delivery",
              "Custom presentation",
              "90-day support + consultation",
              "Quarterly re-audits available"
            ]}
            cta="Contact Sales"
            highlighted={false}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Test Tiger's audit revealed 15 critical issues we had no idea existed. After implementing their recommendations, our conversion rate increased by 34%."
              author="Sarah Chen"
              role="VP of Product, TechCorp"
              rating={5}
            />

            <TestimonialCard
              quote="The accessibility audit was eye-opening. We were excluding 15% of our potential customers. The report was detailed, actionable, and worth every penny."
              author="Michael Rodriguez"
              role="CEO, HealthStart"
              rating={5}
            />

            <TestimonialCard
              quote="Best $997 we've spent on our website. The performance optimizations alone saved us $2,000/month in server costs and improved our SEO rankings."
              author="Emily Watson"
              role="CTO, E-commerce Plus"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
                🐯 Test Tiger
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Professional website audits that drive real results.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Website Audit</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Performance Testing</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">SEO Analysis</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Accessibility Review</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">About Us</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Sample Reports</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Case Studies</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Test Tiger. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component definitions
function FeatureCard({ icon, title, description, metrics }: {
  icon: string;
  title: string;
  description: string;
  metrics: string[];
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 dark:border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{description}</p>
      <div className="space-y-2">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {metric}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-2xl font-bold flex items-center justify-center mb-4 shadow-lg">
          {number}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}

function PricingCard({ name, price, description, features, cta, highlighted }: {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}) {
  return (
    <div className={`rounded-xl p-8 ${
      highlighted
        ? 'bg-gradient-to-b from-orange-500 to-red-600 text-white shadow-2xl scale-105'
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg'
    }`}>
      {highlighted && (
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">
            MOST POPULAR
          </span>
        </div>
      )}

      <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {name}
      </h3>
      <div className={`text-4xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {price}
      </div>
      <p className={`mb-6 ${highlighted ? 'text-orange-100' : 'text-gray-600 dark:text-gray-300'}`}>
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <svg className={`w-5 h-5 mr-2 flex-shrink-0 mt-0.5 ${highlighted ? 'text-white' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className={highlighted ? 'text-white' : 'text-gray-600 dark:text-gray-300'}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
        highlighted
          ? 'bg-white text-orange-600 hover:bg-gray-100'
          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg transform hover:scale-105'
      }`}>
        {cta}
      </button>
    </div>
  );
}

function TestimonialCard({ quote, author, role, rating }: {
  quote: string;
  author: string;
  role: string;
  rating: number;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">"{quote}"</p>
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{author}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
      </div>
    </div>
  );
}

// CTA Section Component imported from ./components/CTASection.tsx
