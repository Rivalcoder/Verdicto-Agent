import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Mock response for now - replace with actual contract analysis service
    const mockResponse = {
      file_name: file.name,
      language: "English",
      contract_type: "Service Agreement",
      final_risk_score: Math.floor(Math.random() * 30) + 20, // 20-50 risk score
      clauses: [
        {
          clause_number: 1,
          text: "Payment terms and conditions",
          risks: [
            {
              risk_id: "payment_terms",
              score: 25,
              description: "Payment terms may be ambiguous"
            }
          ],
          suggestion: "Clarify payment terms and add late payment penalties"
        },
        {
          clause_number: 2,
          text: "Termination conditions",
          risks: [
            {
              risk_id: "termination",
              score: 15,
              description: "Termination clause lacks specificity"
            }
          ],
          suggestion: "Define clear termination conditions and notice periods"
        }
      ]
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
