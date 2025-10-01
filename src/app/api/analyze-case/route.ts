import { NextRequest, NextResponse } from 'next/server';
import { aiLawService } from '@/services/ai-law-service';

export async function POST(request: NextRequest) {
  try {
    const { caseContent } = await request.json();

    if (!caseContent) {
      return NextResponse.json({ error: 'Case content is required' }, { status: 400 });
    }

    const analysis = await aiLawService.analyzeArchivedCase(caseContent);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Case analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze case' },
      { status: 500 }
    );
  }
}
