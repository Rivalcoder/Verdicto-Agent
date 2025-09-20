"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  Shield, 
  Clock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Lock,
  Globe,
  Cpu,
  Play,
  BarChart3,
  Star
} from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  features: string[];
  delay: number;
}

const timelineData: TimelineItem[] = [
  {
    id: 'neural-networks',
    title: 'Advanced Neural Networks',
    description: 'Cutting-edge AI powered by state-of-the-art neural networks for unparalleled legal analysis and prediction accuracy.',
    emoji: '🧠',
    icon: Brain,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Deep Learning Models', 'Natural Language Processing', 'Pattern Recognition', 'Predictive Analytics'],
    delay: 0
  },
  {
    id: 'real-time-processing',
    title: 'Real-time Data Processing',
    description: 'Lightning-fast processing capabilities that deliver instant insights and analysis for time-critical legal decisions.',
    emoji: '⚡',
    icon: Zap,
    color: 'text-yellow-600',
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Instant Analysis', 'Live Updates', 'Stream Processing', 'Real-time Collaboration'],
    delay: 200
  },
  {
    id: 'enterprise-security',
    title: 'Enterprise Security',
    description: 'Bank-grade security infrastructure ensuring your sensitive legal data remains protected with military-level encryption.',
    emoji: '🛡️',
    icon: Shield,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['End-to-End Encryption', 'SOC 2 Compliance', 'Zero Trust Architecture', 'Audit Trails'],
    delay: 400
  },
  {
    id: 'availability',
    title: '24/7 Availability',
    description: 'Round-the-clock service availability with 99.9% uptime guarantee, ensuring your legal operations never stop.',
    emoji: '🌐',
    icon: Globe,
    color: 'text-green-600',
    gradient: 'from-green-500 to-emerald-500',
    features: ['99.9% Uptime SLA', 'Global CDN', 'Auto-scaling', 'Disaster Recovery'],
    delay: 600
  }
];

export function AdvancedTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id');
            if (itemId) {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, itemId]));
              }, parseInt(entry.target.getAttribute('data-delay') || '0'));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-timeline-item]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powered by Innovation</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
            Next-Generation Legal Technology
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of legal practice with our cutting-edge platform that combines 
            artificial intelligence, real-time processing, and enterprise-grade security.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-pink-200 to-blue-200 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 transform md:-translate-x-0.5"></div>

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.has(item.id);
              const isHovered = hoveredItem === item.id;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  data-timeline-item
                  data-item-id={item.id}
                  data-delay={item.delay}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 ${
                    isVisible ? 'animate-scale-in' : 'opacity-0'
                  }`}>
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg flex items-center justify-center transform transition-all duration-300 ${
                      isHovered ? 'scale-125 shadow-xl' : 'scale-100'
                    }`}>
                      <span className="text-white text-sm">{item.emoji}</span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pr-16' : 'md:pl-16'
                  }`}>
                    <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                      isVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-8'
                    } bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800`}>
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      <CardContent className="p-8 relative">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg transform transition-all duration-300 ${
                            isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                          }`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {item.title}
                              </h3>
                              <span className="text-2xl transform transition-all duration-300 ${
                                isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                              }">
                                {item.emoji}
                              </span>
                            </div>
                            
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {item.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 transition-all duration-300 ${
                                isVisible ? 'animate-fade-in-up' : 'opacity-0'
                              }`}
                              style={{ animationDelay: `${item.delay + (featureIndex * 100)}ms` }}
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient}`}></div>
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="secondary" 
                            className={`px-4 py-2 bg-gradient-to-r ${item.gradient} text-white border-0 transform transition-all duration-300 ${
                              isHovered ? 'scale-105' : 'scale-100'
                            }`}
                          >
                            Learn More
                          </Badge>
                          
                          <ArrowRight className={`h-5 w-5 text-slate-400 transform transition-all duration-300 ${
                            isHovered ? 'translate-x-2 text-slate-600' : 'translate-x-0'
                          }`} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer ${
            visibleItems.size > 0 ? 'animate-bounce-in' : 'opacity-0'
          }`}>
            <TrendingUp className="h-5 w-5" />
            Experience the Future Today
            <Sparkles className="h-5 w-5" />
          </div>
        </div>


        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-1">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl animate-pulse opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12">
              {/* Floating particles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
              
              <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                  <Sparkles className="h-5 w-5 text-yellow-400 animate-spin" />
                  <span className="text-white font-medium">Experience the Future of Legal AI</span>
                </div>
                
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Join thousands of legal professionals who are already using{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    AI to transform
                  </span>{' '}
                  their practice
                </h3>
                
                <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                  See these metrics in your own dashboard. Experience the power of AI-driven legal technology 
                  that's revolutionizing how law firms operate worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                  <Button 
                    size="lg" 
                    className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Start Free Trial
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group relative px-10 py-5 border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <BarChart3 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    View Live Demo
                    <Star className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                </div>
                
                {/* Bottom decoration */}
                <div className="pt-6">
                  <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white/80 text-sm">Live Demo Available</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span className="text-white/80 text-sm">No Credit Card Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
