import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Import QA controller dynamically
    const { startAnalysis } = await import('../../../src/controllers/qa-controller');

    // Run QA analysis asynchronously
    startAnalysis(url).catch((error: unknown) => {
      console.error('QA Analysis failed:', error);
    });

    return NextResponse.json({
      success: true,
      message: 'QA analysis started',
      url
    });
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
