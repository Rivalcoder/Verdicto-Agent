import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:7860';

export async function POST(request: NextRequest) {
  try {
    const { case: caseDetails } = await request.json();

    if (!caseDetails) {
      return NextResponse.json(
        { error: 'Case details are required' },
        { status: 400 }
      );
    }

    const upstreamResponse = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ case: caseDetails }),
    });

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text();
      return NextResponse.json(
        { error: `Upstream error: ${upstreamResponse.status} ${errorText}` },
        { status: upstreamResponse.status }
      );
    }

    const data = await upstreamResponse.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const isConnErr = message.includes('fetch') || message.includes('ECONNREFUSED');
    const friendly = isConnErr
      ? 'Connection failed: Unable to reach AI backend. Please check if the server is running on http://127.0.0.1:7860'
      : 'Internal server error';
    console.error('Error in predict API:', error);
    return NextResponse.json(
      { error: friendly },
      { status: 500 }
    );
  }
}
