"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Scale, Brain, Search, Loader2, FileText, Gavel, Sparkles, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

interface LegalSection {
  section: string;
  act: string;
  description: string;
  punishment?: string;
  application?: string;
}

interface CaseAnalysis {
  caseDescription: string;
  applicableSections: LegalSection[];
  legalStrategy: string;
  precedents: string[];
  riskAssessment: string;
  aiInsights: string;
}

interface LegalSearch {
  query: string;
  relevantSections: LegalSection[];
  precedents: string[];
  practicalApplication: string;
  recentChanges: string;
  commonIssues: string[];
  aiInsights: string;
}

export default function CaseAnalysisPage() {
  const [caseDetails, setCaseDetails] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [analysisResult, setAnalysisResult] = useState<CaseAnalysis | null>(null);
  const [searchResult, setSearchResult] = useState<LegalSearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("case-analysis");
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  const toggleExpanded = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const SimpleText = ({ text, sectionId, maxLength = 150 }: { text: string, sectionId: string, maxLength?: number }) => {
    const isExpanded = expandedSections[sectionId];
    
    // Calculate approximate lines (assuming ~50 characters per line)
    const estimatedLines = text.length / 50;
    const shouldTruncate = estimatedLines > 5; // Only truncate if more than 5 lines
    const displayText = shouldTruncate && !isExpanded ? text.substring(0, maxLength) + "..." : text;

    return (
      <div>
        <p className="text-sm text-foreground leading-relaxed">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => toggleExpanded(sectionId)}
            className="flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                Show More
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  const analyzeCase = async () => {
    if (!caseDetails.trim()) return;

    setLoading(true);
    setError("");
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-case-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseDetails }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze case');
      }

      if (data.success) {
        // Handle both structured JSON and raw text responses
        if (data.data.rawResponse) {
          // If AI returned raw text, create a structured response
          setAnalysisResult({
            caseDescription: data.data.rawResponse,
            applicableSections: [],
            legalStrategy: "Please review the AI response above for detailed analysis.",
            precedents: [],
            riskAssessment: "Please review the AI response above for risk assessment.",
            aiInsights: data.data.rawResponse
          });
        } else {
          setAnalysisResult(data.data);
        }
        setActiveTab("results");
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze case');
    } finally {
      setLoading(false);
    }
  };

  const searchLegal = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setSearchResult(null);

    try {
      const response = await fetch('/api/analyze-case-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search legal information');
      }

      if (data.success) {
        // Handle both structured JSON and raw text responses
        if (data.data.rawResponse) {
          // If AI returned raw text, create a structured response
          setSearchResult({
            query: searchQuery,
            relevantSections: [],
            precedents: [],
            practicalApplication: data.data.rawResponse,
            recentChanges: "Please review the AI response above for recent changes.",
            commonIssues: [],
            aiInsights: data.data.rawResponse
          });
        } else {
          setSearchResult(data.data);
        }
        setActiveTab("search-results");
      } else {
        throw new Error(data.error || 'Search failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search legal information');
    } finally {
      setLoading(false);
    }
  };

  const ComingSoonAnimation = () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="relative">
          <Sparkles className="h-16 w-16 text-blue-500 mx-auto animate-pulse" />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-ping"></div>
        </div>
        <h3 className="text-2xl font-bold text-foreground">Coming Soon</h3>
        <p className="text-muted-foreground">Advanced AI features are being developed</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Case Analysis Tool</h1>
          <p className="text-muted-foreground">AI-powered legal case analysis with Indian law insights and section recommendations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
          <Button variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              Deep Analysis
          </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Advanced Features</DialogTitle>
              <DialogDescription>
                Coming soon with amazing AI capabilities
              </DialogDescription>
            </DialogHeader>
            <ComingSoonAnimation />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="case-analysis">Case Analysis</TabsTrigger>
          <TabsTrigger value="legal-search">Legal Search</TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResult}>Analysis Results</TabsTrigger>
          <TabsTrigger value="search-results" disabled={!searchResult}>Search Results</TabsTrigger>
        </TabsList>

        <TabsContent value="case-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Case Analysis
              </CardTitle>
              <CardDescription>
                Describe your case details and get AI-powered analysis with applicable legal sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                      <div>
                <label className="text-sm font-medium mb-2 block">Case Details</label>
                <Textarea
                  placeholder="Describe your case in detail. Include facts, parties involved, legal issues, and any specific questions you have..."
                  value={caseDetails}
                  onChange={(e) => setCaseDetails(e.target.value)}
                  className="min-h-[200px]"
                />
        </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={analyzeCase} 
                disabled={loading || !caseDetails.trim()}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Case...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze Case with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal-search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Legal Section Search
              </CardTitle>
              <CardDescription>
                Search for specific legal sections, rules, or legal concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Query</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Section 420 IPC, bail conditions, property disputes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchLegal()}
                  />
                  <Button 
                    onClick={searchLegal} 
                    disabled={loading || !searchQuery.trim()}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {analysisResult && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Case Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">📋 Case Summary</h4>
                    <SimpleText text={analysisResult.caseDescription} sectionId="case-description" maxLength={200} />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-lg">⚖️ Relevant Laws</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResult.applicableSections && analysisResult.applicableSections.length > 0 ? (
                        analysisResult.applicableSections.map((section, index) => (
                          <Card key={index} className="p-4 hover:bg-muted/50 transition-colors border-l-4 border-l-blue-500">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Gavel className="h-4 w-4 text-blue-600" />
                                <span className="font-semibold text-blue-800 dark:text-blue-300">{section.section} - {section.act}</span>
                              </div>
                              <SimpleText text={section.description} sectionId={`section-desc-${index}`} maxLength={120} />
                              {section.punishment && (
                                <div className="bg-red-50 dark:bg-red-950 p-2 rounded">
                                  <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                                    ⚠️ Punishment: {section.punishment}
                                  </p>
                                </div>
                              )}
                              {section.application && (
                                <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded">
                                  <p className="text-sm text-blue-700 dark:text-blue-300">
                                    💡 How it applies: {section.application}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8 text-muted-foreground dark:text-muted-foreground">
                          No specific legal sections identified. Check the AI insights below for more information.
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">🎯 Legal Strategy</h4>
                    <SimpleText text={analysisResult.legalStrategy} sectionId="legal-strategy" maxLength={200} />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">📚 Important Cases</h4>
                    {analysisResult.precedents && analysisResult.precedents.length > 0 ? (
                      <div className="space-y-2">
                        {analysisResult.precedents.map((precedent, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{precedent}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">No specific cases identified.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">⚠️ Challenges</h4>
                    <SimpleText text={analysisResult.riskAssessment} sectionId="risk-assessment" maxLength={200} />
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg border-l-4 border-l-green-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-lg">🤖 AI Advice</span>
                    </div>
                    <SimpleText text={analysisResult.aiInsights} sectionId="ai-insights" maxLength={250} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="search-results" className="space-y-6">
          {searchResult && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Legal Search Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-lg">🔍 Search: {searchResult.query}</h4>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-lg">⚖️ Legal Sections</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResult.relevantSections && searchResult.relevantSections.length > 0 ? (
                        searchResult.relevantSections.map((section, index) => (
                          <Card key={index} className="p-4 hover:bg-muted/50 transition-colors border-l-4 border-l-green-500">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Gavel className="h-4 w-4 text-green-600" />
                                <span className="font-semibold text-green-800 dark:text-green-300">{section.section} - {section.act}</span>
                              </div>
                              <SimpleText text={section.description} sectionId={`search-section-desc-${index}`} maxLength={120} />
                              {section.application && (
                                <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
                                  <p className="text-sm text-green-700 dark:text-green-300">
                                    💡 How it works: {section.application}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8 text-muted-foreground dark:text-muted-foreground">
                          No specific legal sections found. Check the AI insights below for more information.
                        </div>
                      )}
        </div>
      </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">💼 How It Works</h4>
                    <SimpleText text={searchResult.practicalApplication} sectionId="practical-application" maxLength={200} />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">🔄 Recent Updates</h4>
                    <SimpleText text={searchResult.recentChanges} sectionId="recent-changes" maxLength={150} />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">⚠️ Common Problems</h4>
                    {searchResult.commonIssues && searchResult.commonIssues.length > 0 ? (
                      <div className="space-y-2">
                        {searchResult.commonIssues.map((issue, index) => (
                          <div key={index} className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg border-l-4 border-l-yellow-400 dark:border-l-yellow-500">
                            <p className="text-sm text-yellow-800 dark:text-yellow-300">{issue}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">No specific problems identified.</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-lg">📚 Important Cases</h4>
                    {searchResult.precedents && searchResult.precedents.length > 0 ? (
                      <div className="space-y-2">
                        {searchResult.precedents.map((precedent, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300">{precedent}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">No specific cases found.</p>
                    )}
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-lg">🤖 AI Tips</span>
                    </div>
                    <SimpleText text={searchResult.aiInsights} sectionId="search-ai-insights" maxLength={250} />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}