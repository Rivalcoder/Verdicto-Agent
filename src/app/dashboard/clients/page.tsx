"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, Phone, Mail, Calendar, Shield, Briefcase, Clock } from "lucide-react";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
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
      lastActive: "Online"
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
      lastActive: "5 min ago"
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
      lastActive: "Yesterday"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Counsel</h1>
          <p className="text-muted-foreground">Connect with verified legal professionals for quick doubts and consultations</p>
        </div>
        <Button className="bg-gradient-primary text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search counsel (name, specialty, bar ID)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          All Counsel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5" /> {client.specialty}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={client.status === "Verified" ? "default" : "secondary"}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {client.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Bar ID: {client.barId}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Experience: {client.experience} years
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Last active: {client.lastActive}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" variant="outline">
                  Chat
                </Button>
                <Button size="sm" variant="outline">
                  Call
                </Button>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
