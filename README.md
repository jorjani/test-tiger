# 🐯 Test Tiger - Website Testing & QA Platform

**Transform your website quality with AI-powered autonomous testing**

A comprehensive platform combining a professional landing page with an advanced QA automation system powered by AI agents. Experience the future of website testing where intelligent agents work together to analyze, score, and improve your web presence.

## 🚀 What is Test Tiger?

Test Tiger is a **dual-platform solution**:

### 🎨 **Landing Page** (Frontend)
- Professional marketing website showcasing QA services
- Lead capture and conversion optimization
- Mobile-responsive design with dark mode
- Built with Next.js 16, TypeScript, and Tailwind CSS

### 🤖 **QA Automation System** (Backend)
- **AI Agent Team**: CEO, Trace, Load, Link, Structure, and Content agents
- **Autonomous Analysis**: Intelligent website quality assessment
- **Real-time Dashboard**: Live progress monitoring via WebSocket
- **Scoring Engine**: Comprehensive quality metrics (0-100 scale)
- **CEO Escalation Logic**: Human oversight when needed

## 🏗️ Architecture

```
test-tiger/
├── app/                      # Next.js frontend (landing page)
│   ├── dashboard/           # QA dashboard UI (React)
│   └── api/agents/          # QA API routes
├── src/                     # QA automation backend
│   ├── agents/              # AI agent implementations
│   ├── controllers/         # API controllers
│   ├── scorer.ts           # Quality scoring engine
│   └── dashboard-server.ts # WebSocket server
└── package.json            # Unified dependencies
```

## ✨ Key Features

### Landing Page
- **Conversion-Focused Design**: Strategic CTAs and social proof
- **SEO Optimized**: Comprehensive metadata and semantic HTML
- **Performance**: Built with Next.js 16 and Turbopack
- **Accessibility**: WCAG-compliant with proper ARIA labels

### QA System
- **Multi-Agent Architecture**: Specialized agents for different aspects
- **Real-Time Monitoring**: WebSocket-powered live updates
- **AI Recommendations**: OpenAI-powered improvement suggestions
- **Video Recording**: All agent activities captured
- **Business Logic**: CEO agent makes strategic decisions

## 🚀 Features

- **Modern Design**: Clean, professional UI with gradient accents and smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Dark Mode**: Built-in dark mode support with automatic theme switching
- **SEO Optimized**: Comprehensive metadata and semantic HTML structure
- **Performance**: Built with Next.js 16 and Turbopack for lightning-fast builds
- **Accessibility**: WCAG-compliant with proper ARIA labels and keyboard navigation

## 📋 Page Sections

1. **Navigation** - Sticky header with smooth scroll to sections
2. **Hero Section** - Compelling value proposition with clear CTAs
3. **Features** - 6 comprehensive audit dimensions:
   - ⚡ Performance Analysis
   - ♿ Accessibility Audit
   - 🔍 SEO Review
   - 🎨 UX & Design Analysis
   - 🔄 Conversion Optimization
   - 🔒 Security & Best Practices
4. **Process** - 4-step transparent workflow
5. **Pricing** - 3 tiers (Essential, Professional, Enterprise)
6. **Testimonials** - Social proof with ratings
7. **CTA Section** - Lead capture form
8. **Footer** - Links and company information

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Geist Sans & Geist Mono
- **Build Tool**: Turbopack

## 📋 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or bun
- OpenAI API key (for QA system)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp ENVIRONMENT_SETUP.md .env
# Edit .env with your OpenAI API key
```

## 🎯 Usage

### Option 1: Landing Page Only
Perfect for showcasing your QA services to potential customers.

```bash
# Start the marketing website
npm run dev

# Open http://localhost:3000
```

### Option 2: QA Dashboard
Experience the full AI-powered QA system with real-time monitoring.

```bash
# Start both frontend and QA backend
npm run qa:start

# Or start components separately:
npm run dev              # Frontend (Next.js)
npm run qa:dashboard     # WebSocket dashboard server
```

### Option 3: QA Analysis Only
Run automated website analysis programmatically.

```bash
# Analyze a specific website
npm run qa:run -- https://example.com

# Or analyze sites from urls.json
npm run qa:run
```

## 🎨 Customization

### Colors

The landing page uses an orange-to-red gradient theme. To customize colors, update the Tailwind classes:

```tsx
// Current gradient: from-orange-500 to-red-600
// Change to your brand colors:
bg-gradient-to-r from-blue-500 to-purple-600
```

### Content

All content is in `/app/page.tsx`. Update the following sections:

- **Hero**: Lines 47-98
- **Features**: Lines 102-156
- **Process**: Lines 159-193
- **Pricing**: Lines 196-257
- **Testimonials**: Lines 260-291
- **CTA Form**: Lines 294-331

### Metadata

SEO metadata is in `/app/layout.tsx` (lines 15-25):

```tsx
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your Description",
  // ... update as needed
}
```

## 📊 Conversion Optimization Best Practices

This landing page implements recommendations from professional website audits:

✅ **Clear Value Proposition** - "Your Website Is Losing Customers Right Now"
✅ **Multiple CTAs** - Strategically placed throughout the page
✅ **Trust Signals** - Money-back guarantee, 48-hour delivery, no subscription
✅ **Social Proof** - 500+ companies, testimonials with ratings
✅ **Specific Pricing** - Transparent tiers with clear feature lists
✅ **Process Clarity** - 4-step workflow showing exactly what to expect
✅ **Urgency** - "Every day you wait is revenue lost"
✅ **Low Friction** - Simple 2-field form for quotes

## 🔍 SEO Features

- Semantic HTML structure
- Optimized meta tags and Open Graph
- Proper heading hierarchy (H1-H3)
- Alt text for icons (via SVG)
- Structured content with clear sections
- Mobile-friendly design
- Fast load times with Next.js optimization

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Focus indicators on all interactive elements
- Semantic HTML for screen readers
- Responsive text sizing

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: 1024px+ (lg, xl)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

```bash
# Build the project
npm run build

# The output will be in the .next folder
# Deploy the .next folder to your hosting provider
```

## 📝 TODO: Next Steps

- [ ] Connect form to backend/email service (currently client-side only)
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Create sample audit report page
- [ ] Add blog/resources section
- [ ] Implement case studies page
- [ ] Add live chat widget
- [ ] Set up A/B testing for CTAs
- [ ] Create video demo/explainer
- [ ] Add customer logo carousel
- [ ] Implement newsletter signup

## 🔧 Form Integration

The contact form (line 305-324) needs to be connected to your backend. Options:

1. **Email Service**: Resend, SendGrid, Postmark
2. **Form Service**: Formspree, Basin, Web3Forms
3. **CRM**: HubSpot, Salesforce, Pipedrive
4. **Custom API**: Next.js API route

Example with Next.js API route:

```tsx
// app/api/submit/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Send email or save to database
  return Response.json({ success: true });
}
```

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a landing page template. Feel free to customize for your needs!

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

**Last Updated**: October 26, 2025
