import { NextRequest, NextResponse } from 'next/server';
import { Stagehand } from '@browserbasehq/stagehand';
import { randomUUID } from 'crypto';

// In-memory storage for demo (use DB in production)
const audits = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const { url, email } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Create audit ID
    const auditId = randomUUID();

    // Initialize Stagehand with local Chromium
    console.log('🎬 Starting audit for:', url);
    const stagehand = new Stagehand({
      env: 'LOCAL', // Use local Chromium browser
      enableCaching: false,
    });

    await stagehand.init();

    console.log('📱 Navigating to URL...');
    await stagehand.page.goto(url, { waitUntil: 'networkidle' });

    // Wait for page to be fully loaded
    await stagehand.page.waitForTimeout(2000);

    console.log('🤖 Extracting insights with AI...');

    // Use Stagehand's AI to analyze the page
    const insights = await stagehand.page.extract(`Analyze this website comprehensively and return a JSON object with:
- overallScore: number from 0-100 rating the site
- firstImpression: 1-2 sentence first impression
- ctaButtons: array of main call-to-action button texts found
- ctaVisibility: string describing if CTAs are clear and prominent
- trustSignals: array of trust elements (testimonials, reviews, badges)
- uxIssues: array of any UX problems noticed
- recommendations: array of top 3-5 actionable improvements`);

    // Get basic SEO info
    const seoInfo = await stagehand.page.extract(`Extract SEO information as JSON:
- title: page title
- description: meta description or null
- h1Tags: array of all h1 headings
- hasSchema: boolean if structured data exists
- mobileOptimized: assessment of mobile optimization`);

    // Get performance perception
    const performanceInfo = await stagehand.page.extract(`Analyze page performance as JSON:
- loadSpeed: "fast", "moderate", or "slow"
- largeImages: count of large images
- externalScripts: assessment of third-party scripts
- recommendations: array of performance improvements`);

    console.log('📊 Audit complete!');

    // Store results
    const auditData = {
      id: auditId,
      url,
      email,
      timestamp: new Date().toISOString(),
      insights,
      seo: seoInfo,
      performance: performanceInfo,
    };

    audits.set(auditId, auditData);

    // Cleanup
    await stagehand.close();

    return NextResponse.json({
      success: true,
      auditId,
      message: 'Audit completed successfully'
    });

  } catch (error) {
    console.error('❌ Audit failed:', error);
    return NextResponse.json({
      error: 'Audit failed: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

// GET endpoint to retrieve audit results
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const auditId = searchParams.get('id');

  if (!auditId) {
    return NextResponse.json({ error: 'Audit ID required' }, { status: 400 });
  }

  const audit = audits.get(auditId);

  if (!audit) {
    return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
  }

  return NextResponse.json(audit);
}
