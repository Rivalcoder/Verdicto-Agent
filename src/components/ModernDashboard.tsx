'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  BarChart3, 
  Sparkles, 
  ArrowRight,
  Play,
  Star,
  Award,
  Globe,
  Cpu,
  Database,
  Lock,
  CheckCircle
} from 'lucide-react';
import AnimatedMetrics from './AnimatedMetrics';
import AnimatedCTA from './AnimatedCTA';

const ModernDashboard = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const metrics = [
    { value: "2,847", label: "Documents Processed", change: "+23%", icon: Database, color: "from-blue-500 to-cyan-500" },
    { value: "127", label: "Risk Issues Found", change: "+15%", icon: Shield, color: "from-red-500 to-pink-500" },
    { value: "89%", label: "Time Saved", change: "+12%", icon: Clock, color: "from-green-500 to-emerald-500" },
    { value: "98%", label: "Accuracy Rate", change: "+5%", icon: Target, color: "from-purple-500 to-violet-500" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze legal documents with unprecedented accuracy",
      stats: "99.9%",
      color: "from-blue-600 to-purple-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Process complex legal documents in seconds, not hours",
      stats: "2.3s",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with all major security standards",
      stats: "SOC 2",
      color: "from-green-600 to-teal-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Supporting legal professionals in over 90 countries worldwide",
      stats: "90+",
      color: "from-indigo-600 to-blue-600"
    }
  ];

  const achievements = [
    { icon: Award, text: "Industry Leader", subtext: "Top Legal AI Platform 2024" },
    { icon: Users, text: "500+ Law Firms", subtext: "Trusted by professionals" },
    { icon: Star, text: "4.9/5 Rating", subtext: "Client satisfaction" },
    { icon: CheckCircle, text: "99.9% Uptime", subtext: "Reliable service" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentMetric((prev) => (prev + 1) % metrics.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Animated Metrics Section */}
      <AnimatedMetrics />
      
      {/* Animated CTA Section */}
      <AnimatedCTA />
    </div>
  );
};

export default ModernDashboard;
