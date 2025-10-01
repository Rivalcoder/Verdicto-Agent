"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Plus, Calendar, Shield, Clock, MessageCircle, Video, Star, MapPin, Award, Sparkles, Gavel, Scale, FileText, Zap } from "lucide-react";

export default function CounselPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);

  const ComingSoonAnimation = () => (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="relative">
          <Sparkles className="h-16 w-16 text-blue-500 mx-auto animate-pulse" />
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-ping"></div>
        </div>
        <h3 className="text-2xl font-bold text-foreground">Coming Soon</h3>
        <p className="text-muted-foreground">Advanced communication features are being developed</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );

  const counsel = [
    {
      id: 1,
      name: "Adv. Priya Mehta",
      email: "priya.mehta@bar.in",
      phone: "+91 98765 43210",
      company: "Independent Counsel",
      status: "Verified",
      specialty: "Contract & Corporate",
      experience: 8,
      barId: "DL/2015/23456",
      lastActive: "Online",
      location: "Delhi",
      rating: 4.8,
      casesWon: 156,
      languages: ["Hindi", "English", "Punjabi"],
      fees: "₹5,000/hour",
      availability: "Available Now"
    },
    {
      id: 2,
      name: "Adv. Rahul Verma",
      email: "rahul.verma@bar.in",
      phone: "+91 99887 76655",
      company: "Verma Chambers",
      status: "Verified",
      specialty: "IP & Technology",
      experience: 11,
      barId: "MH/2012/11223",
      lastActive: "5 min ago",
      location: "Mumbai",
      rating: 4.9,
      casesWon: 203,
      languages: ["Hindi", "English", "Marathi"],
      fees: "₹7,500/hour",
      availability: "Available in 2 hours"
    },
    {
      id: 3,
      name: "Adv. Sneha Kulkarni",
      email: "sneha.kulkarni@bar.in",
      phone: "+91 90909 80808",
      company: "Kulkarni & Co.",
      status: "Verified",
      specialty: "Civil & Arbitration",
      experience: 6,
      barId: "KA/2017/55667",
      lastActive: "Yesterday",
      location: "Bangalore",
      rating: 4.7,
      casesWon: 98,
      languages: ["Hindi", "English", "Kannada"],
      fees: "₹4,500/hour",
      availability: "Available Tomorrow"
    },
    {
      id: 4,
      name: "Adv. Rajesh Kumar",
      email: "rajesh.kumar@bar.in",
      phone: "+91 88888 77777",
      company: "Kumar & Associates",
      status: "Verified",
      specialty: "Criminal Law",
      experience: 15,
      barId: "DL/2008/12345",
      lastActive: "Online",
      location: "Delhi",
      rating: 4.9,
      casesWon: 312,
      languages: ["Hindi", "English", "Haryanvi"],
      fees: "₹8,000/hour",
      availability: "Available Now"
    },
    {
      id: 5,
      name: "Adv. Meera Patel",
      email: "meera.patel@bar.in",
      phone: "+91 77777 66666",
      company: "Patel Legal Services",
      status: "Verified",
      specialty: "Family Law",
      experience: 9,
      barId: "GJ/2014/67890",
      lastActive: "2 hours ago",
      location: "Ahmedabad",
      rating: 4.8,
      casesWon: 187,
      languages: ["Hindi", "English", "Gujarati"],
      fees: "₹5,500/hour",
      availability: "Available in 1 hour"
    },
    {
      id: 6,
      name: "Adv. Vikram Singh",
      email: "vikram.singh@bar.in",
      phone: "+91 66666 55555",
      company: "Singh & Partners",
      status: "Verified",
      specialty: "Tax Law",
      experience: 12,
      barId: "DL/2011/34567",
      lastActive: "Online",
      location: "Delhi",
      rating: 4.9,
      casesWon: 245,
      languages: ["Hindi", "English", "Punjabi"],
      fees: "₹9,000/hour",
      availability: "Available Now"
    },
    {
      id: 7,
      name: "Adv. Anjali Sharma",
      email: "anjali.sharma@bar.in",
      phone: "+91 55555 44444",
      company: "Sharma Legal",
      status: "Verified",
      specialty: "Constitutional Law",
      experience: 7,
      barId: "DL/2016/45678",
      lastActive: "30 min ago",
      location: "Delhi",
      rating: 4.7,
      casesWon: 134,
      languages: ["Hindi", "English"],
      fees: "₹6,500/hour",
      availability: "Available in 30 min"
    },
    {
      id: 8,
      name: "Adv. Suresh Reddy",
      email: "suresh.reddy@bar.in",
      phone: "+91 44444 33333",
      company: "Reddy Chambers",
      status: "Verified",
      specialty: "Labor Law",
      experience: 10,
      barId: "TS/2013/56789",
      lastActive: "1 hour ago",
      location: "Hyderabad",
      rating: 4.8,
      casesWon: 198,
      languages: ["Hindi", "English", "Telugu"],
      fees: "₹5,000/hour",
      availability: "Available in 3 hours"
    }
  ];

  const filteredCounsel = counsel.filter(counselItem =>
    counselItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counselItem.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counselItem.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counselItem.company.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(counselItem =>
    (!selectedSpecialty || selectedSpecialty === "all" || counselItem.specialty === selectedSpecialty) &&
    (!selectedLocation || selectedLocation === "all" || counselItem.location === selectedLocation)
  );

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty) {
      case 'Criminal Law': return <Gavel className="h-4 w-4" />;
      case 'Civil & Arbitration': return <Scale className="h-4 w-4" />;
      case 'Contract & Corporate': return <FileText className="h-4 w-4" />;
      case 'IP & Technology': return <Zap className="h-4 w-4" />;
      case 'Family Law': return <Users className="h-4 w-4" />;
      case 'Tax Law': return <Award className="h-4 w-4" />;
      case 'Constitutional Law': return <FileText className="h-4 w-4" />;
      case 'Labor Law': return <Users className="h-4 w-4" />;
      default: return <Scale className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Legal Counsel Network</h1>
          <p className="text-muted-foreground">Connect with verified Indian legal professionals for consultations and expert advice</p>
        </div>
        <Button className="bg-gradient-primary text-white" onClick={() => setShowComingSoon(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search counsel (name, specialty, location, bar ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="Criminal Law">Criminal Law</SelectItem>
            <SelectItem value="Civil & Arbitration">Civil & Arbitration</SelectItem>
            <SelectItem value="Contract & Corporate">Contract & Corporate</SelectItem>
            <SelectItem value="IP & Technology">IP & Technology</SelectItem>
            <SelectItem value="Family Law">Family Law</SelectItem>
            <SelectItem value="Tax Law">Tax Law</SelectItem>
            <SelectItem value="Constitutional Law">Constitutional Law</SelectItem>
            <SelectItem value="Labor Law">Labor Law</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
            <SelectItem value="Hyderabad">Hyderabad</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCounsel.map((counselItem) => (
          <Card key={counselItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {counselItem.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{counselItem.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {getSpecialtyIcon(counselItem.specialty)} {counselItem.specialty}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={counselItem.status === "Verified" ? "default" : "secondary"}>
                    {counselItem.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{counselItem.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {counselItem.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Bar ID: {counselItem.barId}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Experience: {counselItem.experience} years
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4" />
                  Cases Won: {counselItem.casesWon}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {counselItem.availability}
                </div>
                <div className="text-sm font-medium text-green-600">
                  {counselItem.fees}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Languages:</div>
                <div className="flex flex-wrap gap-1">
                  {counselItem.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowComingSoon(true)}>
                  <MessageCircle className="mr-1 h-3 w-3" />
                  Chat
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowComingSoon(true)}>
                  <Video className="mr-1 h-3 w-3" />
                  Call
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowComingSoon(true)}>
                  <Calendar className="mr-1 h-3 w-3" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Counsel Statistics</CardTitle>
          <CardDescription>Overview of available legal professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{counsel.length}</div>
              <div className="text-sm text-muted-foreground">Total Counsel</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{counsel.filter(c => c.lastActive === 'Online').length}</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{counsel.filter(c => c.experience >= 10).length}</div>
              <div className="text-sm text-muted-foreground">Senior Counsel</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{counsel.reduce((acc, c) => acc + c.casesWon, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Cases Won</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Advanced Features</DialogTitle>
            <DialogDescription>
              Coming soon with amazing communication capabilities
            </DialogDescription>
          </DialogHeader>
          <ComingSoonAnimation />
        </DialogContent>
      </Dialog>
    </div>
  );
}
