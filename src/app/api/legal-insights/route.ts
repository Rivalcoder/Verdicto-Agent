import { NextRequest, NextResponse } from 'next/server';
import { aiLawService } from '@/services/ai-law-service';

export async function POST(request: NextRequest) {
  try {
    const { eventType, caseDetails } = await request.json();

    if (!eventType) {
      return NextResponse.json({ error: 'Event type is required' }, { status: 400 });
    }

    const insights = await aiLawService.generateLegalInsights(eventType, caseDetails);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Legal insights error:', error);
    return NextResponse.json(
      { error: 'Failed to generate legal insights' },
      { status: 500 }
    );
  }
}
