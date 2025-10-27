'use client';

import React from 'react';
import { CTASection } from './components/CTASection';

export default function Home() {
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
            <span className="mr-2">🤖</span>
            AI-Powered Autonomous Website Analysis
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Your Website, Reviewed by
            <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              AI Autonomous Agents
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Experience the future of website auditing. Our AI agents autonomously analyze your site from multiple expert perspectives:
            design, marketing, copy, technical quality, SEO, UX, and business strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Try AI Analysis Demo
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg font-semibold hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
            >
              Meet the AI Agents
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Results in Minutes, Not Days
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AI-Powered Accuracy
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              7 Expert Perspectives
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent Capabilities Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Autonomous Agent Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Specialized AI agents, each an expert in their domain, working together autonomously
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Agent Cards */}
          <AIAgentCard
            icon="🎯"
            name="CEO Agent"
            title="Strategic Business Oversight"
            description="Assigns tasks with business goals, reviews results, and makes escalation decisions. Ensures analysis aligns with business objectives."
            capabilities={["Task assignment", "Results review", "Escalation logic", "Business strategy"]}
            color="from-purple-500 to-purple-600"
          />

          <AIAgentCard
            icon="📝"
            name="Content Agent"
            title="Copy & Messaging Analysis"
            description="AI-powered evaluation of content clarity, tone, messaging effectiveness, and communication quality."
            capabilities={["Clarity assessment", "Tone analysis", "Message testing", "Content optimization"]}
            color="from-blue-500 to-blue-600"
          />

          <AIAgentCard
            icon="🎨"
            name="UX Agent"
            title="Design & User Experience"
            description="Analyzes visual hierarchy, user flows, mobile responsiveness, and overall design effectiveness."
            capabilities={["Visual flow", "Mobile UX", "User journey", "Design consistency"]}
            color="from-pink-500 to-pink-600"
          />

          <AIAgentCard
            icon="🔍"
            name="SEO Agent"
            title="Search Engine Optimization"
            description="Comprehensive SEO analysis including meta tags, structured data, mobile optimization, and ranking factors."
            capabilities={["Meta tags", "Schema markup", "Mobile-first", "Core ranking factors"]}
            color="from-green-500 to-green-600"
          />

          <AIAgentCard
            icon="⚡"
            name="Performance Agent"
            title="Technical Performance"
            description="Evaluates load speeds, Core Web Vitals, bundle optimization, and technical performance metrics."
            capabilities={["LCP/FID/CLS", "Load optimization", "Bundle analysis", "Performance scoring"]}
            color="from-orange-500 to-orange-600"
          />

          <AIAgentCard
            icon="🎯"
            name="Conversion Agent"
            title="Trust & Conversion Analysis"
            description="Identifies trust signals, analyzes CTAs, evaluates conversion funnels, and assesses persuasion effectiveness."
            capabilities={["CTA analysis", "Trust signals", "Conversion flow", "Persuasion testing"]}
            color="from-red-500 to-red-600"
          />
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Autonomous Agent Workflow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              AI agents work together autonomously to provide comprehensive analysis in minutes, not days
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep
              number="🤖"
              title="CEO Agent Assigns Task"
              description="Strategic AI agent analyzes your business goals and delegates specialized analysis tasks to the QA team"
            />
            <ProcessStep
              number="🔍"
              title="Multi-Agent Analysis"
              description="6 specialized AI agents simultaneously analyze your site from different expert perspectives"
            />
            <ProcessStep
              number="📊"
              title="Autonomous Scoring"
              description="Agents collaborate to provide comprehensive quality scores and identify critical issues"
            />
            <ProcessStep
              number="🚀"
              title="Instant Results"
              description="Receive detailed analysis, prioritized recommendations, and actionable insights in real-time"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Analysis Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Instant autonomous website analysis with AI agents. Results in minutes, not days.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Starter"
            price="$197"
            description="Perfect for small businesses and personal websites"
            features={[
              "Single page deep analysis",
              "AI agent team assessment",
              "Instant results (5 minutes)",
              "Quality score & recommendations",
              "Email delivery",
              "Basic support"
            ]}
            cta="Get Started"
            highlighted={false}
          />

          <PricingCard
            name="Professional"
            price="$497"
            description="Ideal for growing businesses and e-commerce"
            features={[
              "Up to 5 pages analyzed",
              "Full AI agent team assessment",
              "Instant results (10 minutes)",
              "Comprehensive quality scoring",
              "Detailed recommendations report",
              "Priority email support",
              "Business impact estimates"
            ]}
            cta="Most Popular"
            highlighted={true}
          />

          <PricingCard
            name="Enterprise"
            price="$997"
            description="For large sites and agencies"
            features={[
              "Unlimited pages analyzed",
              "Complete AI agent assessment",
              "Instant results (15 minutes)",
              "Executive summary report",
              "Competitor analysis included",
              "Priority support & consultation",
              "Custom recommendations"
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
              quote="The AI agents caught 23 issues our team missed completely. From UX problems to SEO opportunities, the autonomous analysis was incredibly thorough and delivered in minutes instead of weeks."
              author="Sarah Chen"
              role="VP of Product, TechCorp"
              rating={5}
            />

            <TestimonialCard
              quote="I was skeptical about AI doing our website audit, but the agents provided specific, actionable recommendations with business impact estimates. The CEO agent even suggested strategic improvements we hadn't considered."
              author="Michael Rodriguez"
              role="CEO, HealthStart"
              rating={5}
            />

            <TestimonialCard
              quote="The multi-perspective analysis is brilliant. Each AI agent brought a different expert viewpoint - from copy quality to technical performance. It's like having a full audit team working simultaneously."
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
function AIAgentCard({ icon, name, title, description, capabilities, color }: {
  icon: string;
  name: string;
  title: string;
  description: string;
  capabilities: string[];
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800">
      <div className="flex items-center mb-4">
        <div className={`text-4xl mr-3 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {icon}
        </div>
        <div>
          <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
            {name}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {description}
      </p>
      <div className="space-y-2">
        {capabilities.map((capability, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {capability}
          </div>
        ))}
      </div>
    </div>
  );
}

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
