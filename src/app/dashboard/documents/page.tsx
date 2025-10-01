"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, Search, Filter, Download, Eye, Trash2, Sparkles, BookOpen, Scale, FileCheck2 } from "lucide-react";

interface DocumentItem {
  id: string;
  name: string;
  type: "Contract" | "Pleading" | "Petition" | "Notice" | "Deed" | "Case Law" | "Research" | "FIR/Complaint" | "Order/Judgment";
  size: string;
  date: string;
  status: "Active" | "Draft" | "Archived";
  jurisdiction?: string;
  tags: string[];
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const documents: DocumentItem[] = useMemo(() => [
    { id: "1", name: "Service Agreement - IT Services (India)", type: "Contract", size: "2.4 MB", date: "2024-01-15", status: "Active", jurisdiction: "India", tags: ["Contract Act 1872", "IT Services", "Service Agreement"] },
    { id: "2", name: "Writ Petition - Article 226 Draft", type: "Petition", size: "1.1 MB", date: "2024-01-12", status: "Draft", jurisdiction: "Delhi High Court", tags: ["Article 226", "Constitution"] },
    { id: "3", name: "Bail Application - Section 437 CrPC", type: "Pleading", size: "0.9 MB", date: "2024-01-10", status: "Active", jurisdiction: "Sessions Court, Mumbai", tags: ["CrPC 437", "IPC 420"] },
    { id: "4", name: "Legal Notice - Section 138 NI Act", type: "Notice", size: "0.6 MB", date: "2024-01-05", status: "Active", jurisdiction: "India", tags: ["NI Act 138", "Cheque Bounce"] },
    { id: "5", name: "Sale Deed - Residential Property (Gurgaon)", type: "Deed", size: "3.1 MB", date: "2024-01-03", status: "Archived", jurisdiction: "Haryana", tags: ["TPA", "Registration", "Stamp Duty"] },
    { id: "6", name: "Case Law - V.Y. Jose v. State of Gujarat (2009)", type: "Case Law", size: "1.7 MB", date: "2023-12-28", status: "Active", jurisdiction: "Supreme Court", tags: ["IPC 420", "Cheating", "Dishonest Intention"] },
    { id: "7", name: "RTI Application - Municipal Records", type: "Research", size: "0.4 MB", date: "2023-12-20", status: "Active", jurisdiction: "India", tags: ["RTI", "Civic Records"] },
    { id: "8", name: "FIR Draft - Cyber Fraud Complaint", type: "FIR/Complaint", size: "0.3 MB", date: "2023-12-16", status: "Draft", jurisdiction: "Cyber Cell", tags: ["IT Act", "IPC 420", "Cyber Crime"] },
    { id: "9", name: "Judgment - Cheque Bounce Appeal (2022)", type: "Order/Judgment", size: "2.0 MB", date: "2023-12-10", status: "Archived", jurisdiction: "Bombay High Court", tags: ["NI Act 138", "Appeal"] },
    { id: "10", name: "NDA Template (Mutual)", type: "Contract", size: "0.8 MB", date: "2023-12-03", status: "Active", jurisdiction: "India", tags: ["Confidentiality", "Contract Act 1872"] },
    { id: "11", name: "Specific Performance Suit - Plaint", type: "Pleading", size: "1.3 MB", date: "2023-11-28", status: "Active", jurisdiction: "District Court, Gurgaon", tags: ["Specific Relief Act", "TPA 53A"] },
    { id: "12", name: "GDPR Addendum with Indian DPA mapping", type: "Research", size: "1.0 MB", date: "2023-11-20", status: "Active", jurisdiction: "India/EU", tags: ["DPDP Act", "GDPR", "Privacy"] },
  ], []);

  const filteredDocs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return documents.filter((d) => {
      const matchesSearch =
        !term ||
        d.name.toLowerCase().includes(term) ||
        d.type.toLowerCase().includes(term) ||
        (d.jurisdiction || "").toLowerCase().includes(term) ||
        d.tags.join(" ").toLowerCase().includes(term);

      const matchesType = typeFilter === "all" || d.type === typeFilter;
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [documents, searchTerm, typeFilter, statusFilter]);

  const ComingSoon = () => (
    <div className="flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="relative">
          <Sparkles className="h-14 w-14 text-blue-500 mx-auto animate-pulse" />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-ping"></div>
        </div>
        <h3 className="text-xl font-bold text-foreground">Deep View Coming Soon</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          You&apos;ll soon be able to open documents, extract sections, auto-tag with Indian laws, and send to Legal Research for precedent mapping.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <FileCheck2 className="h-4 w-4" /> Auto-tagging
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
              <Scale className="h-4 w-4" /> Section extraction
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <BookOpen className="h-4 w-4" /> Send to Legal Research
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Library</h1>
          <p className="text-muted-foreground">Manage and organize your legal documents</p>
        </div>
        <Button className="bg-gradient-primary text-white">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, act, section, jurisdiction, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-56">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Pleading">Pleading</SelectItem>
            <SelectItem value="Petition">Petition</SelectItem>
            <SelectItem value="Notice">Notice</SelectItem>
            <SelectItem value="Deed">Deed</SelectItem>
            <SelectItem value="Case Law">Case Law</SelectItem>
            <SelectItem value="Research">Research</SelectItem>
            <SelectItem value="FIR/Complaint">FIR/Complaint</SelectItem>
            <SelectItem value="Order/Judgment">Order/Judgment</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary/60">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={doc.status === "Active" ? "default" : doc.status === "Draft" ? "secondary" : "outline"}>
                  {doc.status}
                </Badge>
                  {doc.jurisdiction && (
                    <Badge variant="outline" className="text-xs">
                      {doc.jurisdiction}
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg text-foreground">{doc.name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {doc.type} • {doc.size} • {doc.date}
              </CardDescription>
              {doc.tags && doc.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {doc.tags.slice(0, 4).map((t, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                  {doc.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">+{doc.tags.length - 4} more</Badge>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                <Dialog onOpenChange={(o) => !o && setSelectedDoc(null)}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedDoc(doc)}>
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>{selectedDoc?.name || "Document"}</DialogTitle>
                      <DialogDescription>Preview and deep features</DialogDescription>
                    </DialogHeader>
                    <ComingSoon />
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What&apos;s next for Document Library?</CardTitle>
          <CardDescription>Legal Research integration and smart automation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <div className="text-sm text-foreground font-medium mb-1">Send to Legal Research</div>
              <div className="text-xs text-muted-foreground">One-click send to map sections, cases, and precedents.</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="text-sm text-foreground font-medium mb-1">Auto-section Detection</div>
              <div className="text-xs text-muted-foreground">AI detects IPC/CrPC/TPA/NI Act sections automatically.</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
              <div className="text-sm text-foreground font-medium mb-1">Smart Templates</div>
              <div className="text-xs text-muted-foreground">Quick-generate petitions, notices, and contracts for India.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
