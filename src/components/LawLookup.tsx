"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Search, BookOpen, Scale, AlertCircle } from "lucide-react";
import { aiLawService, IndianLawSection, CaseDetails } from "@/services/ai-law-service";

export default function LawLookup() {
  const [searchType, setSearchType] = useState<'section' | 'case'>('section');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sectionResult, setSectionResult] = useState<IndianLawSection | null>(null);
  const [caseResult, setCaseResult] = useState<CaseDetails | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setSectionResult(null);
    setCaseResult(null);

    try {
      if (searchType === 'section') {
        const result = await aiLawService.lookupIndianLawSection(searchQuery);
        setSectionResult(result);
      } else {
        const result = await aiLawService.searchCaseByNumber(searchQuery);
        setCaseResult(result);
      }
    } catch {
      setError('Failed to fetch information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Indian Law Lookup
          </CardTitle>
          <CardDescription>
            Search for Indian legal sections, acts, and case details with AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={searchType} onValueChange={(value) => setSearchType(value as 'section' | 'case')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="section">Legal Section</TabsTrigger>
              <TabsTrigger value="case">Case Number</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Input
                placeholder={searchType === 'section' ? 'Enter section number (e.g., 420 IPC)' : 'Enter case number'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </Tabs>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {sectionResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Section {sectionResult.sectionNumber} - {sectionResult.actName}
            </CardTitle>
            <CardDescription>{sectionResult.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{sectionResult.description}</p>
            </div>

            {sectionResult.punishment && (
              <div>
                <h4 className="font-semibold mb-2">Punishment</h4>
                <p className="text-muted-foreground">{sectionResult.punishment}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Related Sections</h4>
              <div className="flex flex-wrap gap-2">
                {sectionResult.relatedSections.map((section, index) => (
                  <Badge key={index} variant="outline">{section}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {sectionResult.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">{keyword}</Badge>
                ))}
              </div>
            </div>

            {sectionResult.casePrecedents.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Important Case Precedents</h4>
                <div className="space-y-3">
                  {sectionResult.casePrecedents.map((precedent, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium">{precedent.caseName}</h5>
                        <div className="text-sm text-muted-foreground">
                          {precedent.court} ({precedent.year})
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{precedent.summary}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {caseResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              {caseResult.caseName}
            </CardTitle>
            <CardDescription>
              {caseResult.court} • {caseResult.year} • {caseResult.status}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Case Number</h4>
                <p className="text-muted-foreground">{caseResult.caseNumber}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge variant={caseResult.status === 'Active' ? 'default' : 'secondary'}>
                  {caseResult.status}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Presiding Judges</h4>
              <div className="flex flex-wrap gap-2">
                {caseResult.judges.map((judge, index) => (
                  <Badge key={index} variant="outline">{judge}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Case Summary</h4>
              <p className="text-muted-foreground">{caseResult.summary}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Legal Issues</h4>
              <div className="flex flex-wrap gap-2">
                {caseResult.legalIssues.map((issue, index) => (
                  <Badge key={index} variant="secondary">{issue}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Judgment</h4>
              <p className="text-muted-foreground">{caseResult.judgment}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Related Legal Sections</h4>
              <div className="flex flex-wrap gap-2">
                {caseResult.relatedSections.map((section, index) => (
                  <Badge key={index} variant="outline">{section}</Badge>
                ))}
              </div>
            </div>

            {caseResult.citations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Important Citations</h4>
                <div className="space-y-1">
                  {caseResult.citations.map((citation, index) => (
                    <p key={index} className="text-sm text-muted-foreground">{citation}</p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
