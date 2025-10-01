import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
  try {
    const { caseDetails, searchQuery } = await request.json();

    if (!caseDetails && !searchQuery) {
      return NextResponse.json({ error: 'Case details or search query is required' }, { status: 400 });
    }

    let prompt = '';
    let responseType = '';

    if (caseDetails) {
      // Analyze case details and suggest applicable sections
      prompt = `You are a helpful Indian legal AI assistant. Analyze the case details in simple, easy-to-understand language for beginners.

Case Details: ${caseDetails}

Provide a simple analysis with:
1. Case Description: Explain the case in simple terms
2. Legal Sections: List 2-3 most relevant Indian law sections with simple explanations
3. Legal Strategy: Basic legal approach in simple terms
4. Key Precedents: 2-3 important case examples with simple explanations
5. Risk Assessment: Main challenges explained simply
6. AI Insights: Practical advice in simple language

IMPORTANT: Use simple words, avoid complex legal jargon. Make it beginner-friendly. Return ONLY valid JSON.

Format as JSON with these fields:
- caseDescription: string (simple explanation)
- applicableSections: array of objects with section, act, description (simple), punishment (simple), application (simple)
- legalStrategy: string (simple advice)
- precedents: array of strings (simple case names with brief explanations)
- riskAssessment: string (simple challenges)
- aiInsights: string (simple practical advice)`;

      responseType = 'case_analysis';
    } else if (searchQuery) {
      // Search for specific legal sections or rules
      prompt = `You are a helpful Indian legal AI assistant. Explain the legal query in simple, beginner-friendly language.

Query: ${searchQuery}

Provide simple explanations:
1. Legal Sections: 2-3 most relevant sections with simple descriptions
2. How it works: Basic explanation in simple terms
3. Recent changes: Any updates explained simply
4. Important cases: 2-3 key cases with simple explanations
5. Practical use: How it applies in real situations
6. Common problems: Main issues explained simply
7. AI advice: Practical tips in simple language

IMPORTANT: Use simple words, avoid complex legal terms. Make it easy for beginners to understand. Return ONLY valid JSON.

Format as JSON with these fields:
- query: string
- relevantSections: array of objects with section, act, description (simple), application (simple)
- precedents: array of strings (simple case names with brief explanations)
- practicalApplication: string (simple explanation)
- recentChanges: string (simple updates)
- commonIssues: array of strings (simple problems)
- aiInsights: string (simple practical advice)`;

      responseType = 'legal_search';
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt,
      temperature: 0.3,
    });

    let parsedResponse;
    try {
      // Try to extract JSON from markdown code blocks if present
      let jsonText = text;
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      } else {
        // Try to find JSON object in the text
        const jsonObjectMatch = text.match(/\{[\s\S]*\}/);
        if (jsonObjectMatch) {
          jsonText = jsonObjectMatch[0];
        }
      }
      
      parsedResponse = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw AI response:', text);
      // If JSON parsing fails, return the raw text
      parsedResponse = {
        rawResponse: text,
        type: responseType
      };
    }

    return NextResponse.json({
      success: true,
      data: parsedResponse,
      type: responseType
    });

  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze case',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
