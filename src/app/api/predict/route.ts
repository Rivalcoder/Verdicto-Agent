import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { case: caseDetails } = await request.json();

    if (!caseDetails) {
      return NextResponse.json(
        { error: 'Case details are required' },
        { status: 400 }
      );
    }

    // Mock response for now - replace with actual AI service integration
    const mockResponse = {
      prediction: {
        probability: Math.random() * 0.4 + 0.6, // 60-100% probability
        timeline: "3-6 months",
        feature_points: [
          "Strong precedent support",
          "Favorable jurisdiction",
          "Clear evidence trail",
          "Experienced legal team"
        ]
      }
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error in predict API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
