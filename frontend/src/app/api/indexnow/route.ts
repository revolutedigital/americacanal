import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'ccafe3cc-5370-4247-8792-1726f0a9d32f';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://americacannabisbr.com';

// IndexNow API endpoint
// Spec: https://www.indexnow.org/documentation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      );
    }

    // Limit to 10,000 URLs per request (IndexNow limit)
    const urlsToSubmit = urls.slice(0, 10000);

    // Submit to IndexNow (Bing endpoint)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: SITE_URL.replace('https://', '').replace('http://', ''),
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urlsToSubmit,
      }),
    });

    // IndexNow returns 200 for success, 202 for accepted
    if (response.status === 200 || response.status === 202) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urlsToSubmit.length} URLs to IndexNow`,
        submitted: urlsToSubmit.length,
      });
    }

    const errorText = await response.text();
    console.error('[IndexNow] Error:', response.status, errorText);

    return NextResponse.json(
      {
        success: false,
        error: `IndexNow returned ${response.status}`,
        details: errorText,
      },
      { status: response.status }
    );
  } catch (error) {
    console.error('[IndexNow] Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

// GET request to check if IndexNow is configured
export async function GET() {
  return NextResponse.json({
    configured: true,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    host: SITE_URL.replace('https://', '').replace('http://', ''),
    info: 'Use POST with { urls: [...] } to submit URLs to IndexNow',
  });
}
