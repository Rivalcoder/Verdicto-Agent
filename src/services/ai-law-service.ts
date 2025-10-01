import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export interface IndianLawSection {
  sectionNumber: string;
  actName: string;
  title: string;
  description: string;
  punishment?: string;
  relatedSections: string[];
  casePrecedents: {
    caseName: string;
    court: string;
    year: string;
    summary: string;
  }[];
  keywords: string[];
}

export interface CaseDetails {
  caseNumber: string;
  caseName: string;
  court: string;
  year: string;
  judges: string[];
  summary: string;
  legalIssues: string[];
  judgment: string;
  relatedSections: string[];
  citations: string[];
  status: 'Active' | 'Disposed' | 'Appeal' | 'Review';
}

export interface LegalEvent {
  id: string;
  title: string;
  type: 'Court Hearing' | 'Filing Deadline' | 'Client Meeting' | 'Document Review' | 'Legal Research';
  date: string;
  time: string;
  location: string;
  priority: 'High' | 'Medium' | 'Low';
  relatedCase?: string;
  relatedSections?: string[];
  description: string;
  reminders: string[];
  aiInsights?: string;
}

class AILawService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY || '';
  }

  async lookupIndianLawSection(sectionNumber: string, actName?: string): Promise<IndianLawSection> {
    try {
      const prompt = `You are an expert in Indian law. Provide detailed information about section ${sectionNumber}${actName ? ` of ${actName}` : ''}. Include:
      1. Full section text and interpretation
      2. Punishment/penalty if applicable
      3. Related sections
      4. Important case precedents with case names, courts, and years
      5. Keywords for search
      6. Practical implications for lawyers

      Format the response as a structured JSON object with the following fields:
      - sectionNumber: string
      - actName: string
      - title: string
      - description: string
      - punishment: string (if applicable)
      - relatedSections: string[]
      - casePrecedents: array of objects with caseName, court, year, summary
      - keywords: string[]`;

      const { text } = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt,
        temperature: 0.3,
      });

      return JSON.parse(text);
    } catch (error) {
      console.error('Error looking up Indian law section:', error);
      throw new Error('Failed to lookup law section');
    }
  }

  async searchCaseByNumber(caseNumber: string): Promise<CaseDetails> {
    try {
      const prompt = `You are an expert in Indian legal case research. Find detailed information about case number: ${caseNumber}. Include:
      1. Full case name and parties
      2. Court and year
      3. Presiding judges
      4. Case summary and legal issues
      5. Judgment and reasoning
      6. Related legal sections
      7. Important citations
      8. Current status

      Format as JSON with fields: caseNumber, caseName, court, year, judges, summary, legalIssues, judgment, relatedSections, citations, status`;

      const { text } = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt,
        temperature: 0.3,
      });

      return JSON.parse(text);
    } catch (error) {
      console.error('Error searching case:', error);
      throw new Error('Failed to search case');
    }
  }

  async generateLegalInsights(eventType: string, caseDetails?: string): Promise<string> {
    try {
      const prompt = `As an AI legal assistant specializing in Indian law, provide practical insights for a ${eventType}${caseDetails ? ` related to: ${caseDetails}` : ''}. Include:
      1. Key legal considerations
      2. Important precedents to reference
      3. Potential challenges and solutions
      4. Preparation checklist
      5. Relevant Indian legal sections to review

      Keep the response concise but comprehensive, focusing on actionable advice for Indian lawyers.`;

      const { text } = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt,
        temperature: 0.4,
      });

      return text;
    } catch (error) {
      console.error('Error generating legal insights:', error);
      return 'Unable to generate insights at this time.';
    }
  }

  async analyzeArchivedCase(caseContent: string): Promise<{
    summary: string;
    keyPoints: string[];
    legalSections: string[];
    precedents: string[];
    recommendations: string[];
  }> {
    try {
      const prompt = `Analyze this archived legal case content and provide:
      1. Executive summary
      2. Key legal points
      3. Relevant Indian legal sections
      4. Important precedents mentioned
      5. Recommendations for future reference

      Case content: ${caseContent}

      Format as JSON with fields: summary, keyPoints, legalSections, precedents, recommendations`;

      const { text } = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt,
        temperature: 0.3,
      });

      return JSON.parse(text);
    } catch (error) {
      console.error('Error analyzing archived case:', error);
      throw new Error('Failed to analyze case');
    }
  }

  async suggestRelatedCases(searchQuery: string): Promise<CaseDetails[]> {
    try {
      const prompt = `Find 3-5 relevant Indian legal cases related to: ${searchQuery}. For each case, provide:
      1. Case number and name
      2. Court and year
      3. Brief summary
      4. Key legal issues
      5. Relevance to the search query

      Format as JSON array of case objects with fields: caseNumber, caseName, court, year, summary, legalIssues, judgment, relatedSections, citations, status`;

      const { text } = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt,
        temperature: 0.4,
      });

      return JSON.parse(text);
    } catch (error) {
      console.error('Error suggesting related cases:', error);
      return [];
    }
  }
}

export const aiLawService = new AILawService();
