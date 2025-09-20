// API service for case prediction and document processing

export interface CasePredictionRequest {
  case: string;
}

export interface CasePredictionResponse {
  prediction: {
    probability: number;
    timeline: string;
    feature_points: string[];
  };
}

export interface DocumentUploadResponse {
  success: boolean;
  extracted_text?: string;
  error?: string;
}

export interface ContractAnalysisRequest {
  file: File;
}

export interface ContractRisk {
  risk_id: string;
  score: number;
  description: string;
}

export interface ContractClause {
  clause_number: number;
  text: string;
  risks: ContractRisk[];
  suggestion?: string;
}

export interface ContractAnalysisResponse {
  file_name: string;
  language: string;
  contract_type: string;
  final_risk_score: number;
  clauses: ContractClause[];
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // Use Next.js API routes
    this.baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  }

  async predictCaseOutcome(caseDetails: string): Promise<CasePredictionResponse> {
    console.log('Making request to:', `${this.baseUrl}/api/predict`);
    console.log('Request payload:', { case: caseDetails });
    
    try {
      const response = await fetch(`${this.baseUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ case: caseDetails }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error predicting case outcome:', error);
      throw error;
    }
  }

  async extractTextFromDocument(file: File): Promise<DocumentUploadResponse> {
    console.log('Making request to:', `${this.baseUrl}/api/extract-text`);
    console.log('File:', file.name, file.size, file.type);
    
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch(`${this.baseUrl}/api/extract-text`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error extracting text from document:', error);
      throw error;
    }
  }

  async uploadDocumentToUrl(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch(`${this.baseUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  async analyzeContract(file: File): Promise<ContractAnalysisResponse> {
    console.log('Making request to contract analysis API');
    console.log('File:', file.name, file.size, file.type);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error analyzing contract:', error);
      throw error;
    }
  }

  async checkHealth(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
