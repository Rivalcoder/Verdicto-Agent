"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye, Brain, Scale, BookOpen, TrendingUp, FileText, Gavel, Database, Sparkles } from "lucide-react";

interface LegalResearch {
  id: string;
  title: string;
  type: 'Case Law' | 'Statute' | 'Precedent' | 'Legal Opinion' | 'Research Note';
  query: string;
  result: string;
  relatedSections: string[];
  precedents: string[];
  court: string;
  year: string;
  relevance: 'High' | 'Medium' | 'Low';
  aiInsights: string;
  createdAt: string;
}

// Sample research results (static)
const sampleResearch: LegalResearch[] = [
  {
    id: "1",
    title: "Fraud under Section 420 IPC - Recent Precedents",
    type: "Case Law",
    query: "Section 420 IPC fraud cases 2023",
    result: "Found 15 relevant cases from Supreme Court and High Courts dealing with fraud under Section 420 IPC in 2023. Key precedents include State vs. XYZ (2023) SC and ABC vs. State (2023) Delhi HC.",
    relatedSections: ["Section 420 IPC", "Section 406 IPC", "Section 120B IPC"],
    precedents: ["State vs. XYZ (2023) SC", "ABC vs. State (2023) Delhi HC", "DEF vs. GHI (2023) Bombay HC"],
    court: "Supreme Court & High Courts",
    year: "2023",
    relevance: "High",
    aiInsights: "Recent trend shows stricter interpretation of fraud elements. Courts are emphasizing mens rea and actual deception. Consider State vs. XYZ (2023) for bail considerations.",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Property Disputes - Transfer of Property Act",
    type: "Statute",
    query: "Section 53A TPA part performance",
    result: "Comprehensive analysis of Section 53A Transfer of Property Act regarding part performance. Includes recent amendments and judicial interpretations.",
    relatedSections: ["Section 53A TPA", "Section 100 TPA", "Section 16 SRA"],
    precedents: ["XYZ vs. ABC (2022) SC", "DEF vs. GHI (2021) Delhi HC"],
    court: "Supreme Court",
    year: "2022-2023",
    relevance: "High",
    aiInsights: "Section 53A provides strong protection for buyers in possession. Recent SC judgment clarifies the requirements for invoking this section. Essential for property dispute cases.",
    createdAt: "2024-01-14"
  },
  {
    id: "3",
    title: "Bail Applications - Criminal Procedure Code",
    type: "Precedent",
    query: "Section 437 CrPC bail considerations",
    result: "Analysis of bail considerations under Section 437 CrPC with focus on economic offenses and fraud cases. Includes recent Supreme Court guidelines.",
    relatedSections: ["Section 437 CrPC", "Section 439 CrPC", "Section 420 IPC"],
    precedents: ["State vs. ABC (2023) SC", "XYZ vs. State (2022) Delhi HC"],
    court: "Supreme Court",
    year: "2023",
    relevance: "Medium",
    aiInsights: "Recent SC guidelines emphasize nature of offense, likelihood of conviction, and possibility of tampering with evidence. Economic offenses require special consideration.",
    createdAt: "2024-01-13"
  }
];

export default function LegalResearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [researchType, setResearchType] = useState<'Case Law' | 'Statute' | 'Precedent' | 'Legal Opinion' | 'Research Note'>('Research Note');
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [researchResults, setResearchResults] = useState<LegalResearch[]>(sampleResearch);
  const [loading, setLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  

  const performResearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // Simulate AI research
      const mockResult: LegalResearch = {
        id: Date.now().toString(),
        title: `Research: ${searchQuery}`,
        type: researchType,
        query: searchQuery,
        result: `AI-powered research results for "${searchQuery}". Found relevant cases, statutes, and precedents from Indian legal system.`,
        relatedSections: ["Section 420 IPC", "Section 406 IPC"],
        precedents: ["Sample Case 1 (2023)", "Sample Case 2 (2022)"],
        court: selectedCourt || "Various Courts",
        year: selectedYear || "2023-2024",
        relevance: "High",
        aiInsights: "AI analysis suggests strong legal grounds based on recent precedents and statutory provisions.",
        createdAt: new Date().toISOString().split('T')[0]
      };

      setResearchResults([mockResult, ...researchResults]);
      setSearchQuery("");
    } catch (error) {
      console.error('Research error:', error);
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
        <p className="text-muted-foreground">Advanced AI research features are being developed</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Case Law': return <Gavel className="h-4 w-4" />;
      case 'Statute': return <BookOpen className="h-4 w-4" />;
      case 'Precedent': return <Scale className="h-4 w-4" />;
      case 'Legal Opinion': return <Brain className="h-4 w-4" />;
      case 'Research Note': return <FileText className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Legal Research Assistant</h1>
          <p className="text-muted-foreground">Intelligent legal research powered by AI for Indian law practice</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
          <Filter className="mr-2 h-4 w-4" />
            Advanced Search
          </Button>
          <Button className="bg-gradient-primary text-white" onClick={() => setShowComingSoon(true)}>
            <Brain className="mr-2 h-4 w-4" />
            AI Analysis
        </Button>
        </div>
      </div>

      <Tabs defaultValue="research" className="space-y-4">
        <TabsList>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="precedents">Precedents</TabsTrigger>
          <TabsTrigger value="statutes">Statutes</TabsTrigger>
        </TabsList>

        <TabsContent value="research" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Legal Research Query
              </CardTitle>
              <CardDescription>
                Ask AI to research Indian legal cases, statutes, and precedents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
                    placeholder="Search for cases, statutes, or legal concepts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && performResearch()}
            className="pl-10"
          />
        </div>
                <Select value={researchType} onValueChange={(value: 'Case Law' | 'Statute' | 'Precedent' | 'Legal Opinion' | 'Research Note') => setResearchType(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Research Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Research Note">General Research</SelectItem>
                    <SelectItem value="Case Law">Case Law</SelectItem>
                    <SelectItem value="Statute">Statute</SelectItem>
                    <SelectItem value="Precedent">Precedent</SelectItem>
                    <SelectItem value="Legal Opinion">Legal Opinion</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={performResearch} disabled={loading || !searchQuery.trim()}>
                  {loading ? (
                    <Brain className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
        </Button>
      </div>

              {showAdvancedSearch && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Court</label>
                    <Select value={selectedCourt} onValueChange={setSelectedCourt}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Court" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courts</SelectItem>
                        <SelectItem value="Supreme Court">Supreme Court</SelectItem>
                        <SelectItem value="Delhi High Court">Delhi High Court</SelectItem>
                        <SelectItem value="Bombay High Court">Bombay High Court</SelectItem>
                        <SelectItem value="Madras High Court">Madras High Court</SelectItem>
                        <SelectItem value="Calcutta High Court">Calcutta High Court</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Legal Sections</label>
                    <Input placeholder="e.g., Section 420 IPC" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Research Results</h2>
              <Badge variant="outline">{researchResults.length} results</Badge>
            </div>

            {researchResults.map((research) => (
              <Card key={research.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(research.type)}
                      <CardTitle className="text-lg">{research.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getRelevanceColor(research.relevance)}>
                        {research.relevance}
                      </Badge>
                      <Badge variant="outline">
                        {research.type}
                </Badge>
              </div>
                  </div>
              <CardDescription>
                    {research.court} • {research.year} • {research.createdAt}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Research Summary</h4>
                    <p className="text-sm text-muted-foreground">{research.result}</p>
                  </div>

                  {research.relatedSections.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Related Legal Sections</h4>
                      <div className="flex flex-wrap gap-1">
                        {research.relatedSections.map((section, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {research.precedents.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Precedents</h4>
                      <div className="space-y-1">
                        {research.precedents.map((precedent, index) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            • {precedent}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm">AI Insights</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{research.aiInsights}</p>
              </div>

              <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setShowComingSoon(true)}>
                  <Eye className="mr-1 h-3 w-3" />
                      View Details
                </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowComingSoon(true)}>
                  <Download className="mr-1 h-3 w-3" />
                      Export
                </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowComingSoon(true)}>
                      <Brain className="mr-1 h-3 w-3" />
                      Deep Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        </TabsContent>

        <TabsContent value="precedents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Legal Precedents Database
              </CardTitle>
              <CardDescription>
                Search through Indian legal precedents and case laws
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Supreme Court</span>
                  </div>
                  <p className="text-sm text-muted-foreground">15,000+ SC judgments</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gavel className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">High Courts</span>
                  </div>
                  <p className="text-sm text-muted-foreground">50,000+ HC judgments</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <span className="font-medium">Recent Cases</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Updated daily</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statutes" className="space-y-6">
      <Card>
        <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Indian Legal Statutes
              </CardTitle>
              <CardDescription>
                Access comprehensive database of Indian legal statutes and acts
              </CardDescription>
        </CardHeader>
        <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Indian Penal Code</h4>
                  <p className="text-sm text-muted-foreground">Complete IPC with amendments</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Criminal Procedure Code</h4>
                  <p className="text-sm text-muted-foreground">CrPC with latest updates</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Indian Contract Act</h4>
                  <p className="text-sm text-muted-foreground">Contract law provisions</p>
            </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Transfer of Property Act</h4>
                  <p className="text-sm text-muted-foreground">Property law statutes</p>
            </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Constitution of India</h4>
                  <p className="text-sm text-muted-foreground">Constitutional provisions</p>
            </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-semibold mb-2">Evidence Act</h4>
                  <p className="text-sm text-muted-foreground">Evidence law provisions</p>
            </div>
          </div>
        </CardContent>
      </Card>
        </TabsContent>
      </Tabs>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
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
  );
}