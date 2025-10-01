import { NextRequest, NextResponse } from 'next/server';
import { aiLawService } from '@/services/ai-law-service';

export async function POST(request: NextRequest) {
  try {
    const { type, query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    let result;
    
    if (type === 'section') {
      result = await aiLawService.lookupIndianLawSection(query);
    } else if (type === 'case') {
      result = await aiLawService.searchCaseByNumber(query);
    } else {
      return NextResponse.json({ error: 'Invalid type. Use "section" or "case"' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Law lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup law information' },
      { status: 500 }
    );
  }
}
