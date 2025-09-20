'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Shield, 
  Clock, 
  Target, 
  Brain, 
  Zap, 
  Users, 
  Globe,
  TrendingUp,
  Sparkles,
  Star,
  Award
} from 'lucide-react';

interface Metric {
  id: string;
  value: string;
  label: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  position: { x: number; y: number };
  size: 'small' | 'medium' | 'large';
}

const AnimatedMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const metricData: Omit<Metric, 'position' | 'size'>[] = [
    { id: 'docs', value: "2,847", label: "Documents Processed", change: "+23%", icon: Database, color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" },
    { id: 'risks', value: "127", label: "Risk Issues Found", change: "+15%", icon: Shield, color: "text-red-500", gradient: "from-red-500 to-pink-500" },
    { id: 'time', value: "89%", label: "Time Saved", change: "+12%", icon: Clock, color: "text-green-500", gradient: "from-green-500 to-emerald-500" },
    { id: 'accuracy', value: "98%", label: "Accuracy Rate", change: "+5%", icon: Target, color: "text-purple-500", gradient: "from-purple-500 to-violet-500" },
    { id: 'cases', value: "1,234", label: "Cases Analyzed", change: "+18%", icon: Brain, color: "text-indigo-500", gradient: "from-indigo-500 to-blue-500" },
    { id: 'prediction', value: "85%", label: "Prediction Accuracy", change: "+8%", icon: TrendingUp, color: "text-orange-500", gradient: "from-orange-500 to-red-500" },
    { id: 'settlement', value: "92%", label: "Settlement Success", change: "+14%", icon: Award, color: "text-emerald-500", gradient: "from-emerald-500 to-green-500" },
    { id: 'resolution', value: "67%", label: "Time to Resolution", change: "+22%", icon: Zap, color: "text-yellow-500", gradient: "from-yellow-500 to-orange-500" },
    { id: 'queries', value: "15,678", label: "Queries Handled", change: "+31%", icon: Users, color: "text-pink-500", gradient: "from-pink-500 to-rose-500" },
    { id: 'response', value: "2.3s", label: "Response Time", change: "-45%", icon: Clock, color: "text-cyan-500", gradient: "from-cyan-500 to-blue-500" },
    { id: 'satisfaction', value: "96%", label: "Client Satisfaction", change: "+12%", icon: Star, color: "text-violet-500", gradient: "from-violet-500 to-purple-500" },
    { id: 'languages', value: "90+", label: "Languages Supported", change: "+8%", icon: Globe, color: "text-teal-500", gradient: "from-teal-500 to-cyan-500" }
  ];

  useEffect(() => {
    // Generate random positions for floating metrics
    const positionedMetrics = metricData.map((metric, index) => ({
      ...metric,
      position: {
        x: Math.random() * 80 + 10, // 10% to 90% of container width
        y: Math.random() * 60 + 20  // 20% to 80% of container height
      },
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large'
    }));

    setMetrics(positionedMetrics);
    
    // Trigger visibility animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-24 h-24 text-xs';
      case 'medium':
        return 'w-32 h-32 text-sm';
      case 'large':
        return 'w-40 h-40 text-base';
      default:
        return 'w-32 h-32 text-sm';
    }
  };

  const getPulseDelay = (index: number) => {
    return `${index * 0.2}s`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
          <span className="text-white font-medium">Real-Time AI Performance Dashboard</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Watch our AI systems work in{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            real-time
          </span>
        </h1>
        
        <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
          See live metrics, performance data, and intelligent insights as they happen. 
          Experience the power of AI-driven legal technology.
        </p>
      </div>

      {/* Floating Metrics Container */}
      <div className="relative z-10 min-h-[600px]">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const isHovered = hoveredMetric === metric.id;
          const sizeClasses = getSizeClasses(metric.size);
          
          return (
            <div
              key={metric.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `${metric.position.x}%`,
                top: `${metric.position.y}%`,
                transitionDelay: `${index * 0.1}s`
              }}
              onMouseEnter={() => setHoveredMetric(metric.id)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className={`${sizeClasses} relative group cursor-pointer`}>
                {/* Main metric circle */}
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${metric.gradient} shadow-2xl flex flex-col items-center justify-center transform transition-all duration-300 ${
                  isHovered ? 'scale-110 shadow-3xl' : 'scale-100'
                }`}>
                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-full border-2 border-white/30 animate-ping ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Icon */}
                  <IconComponent className={`${metric.size === 'small' ? 'w-6 h-6' : metric.size === 'medium' ? 'w-8 h-8' : 'w-10 h-10'} text-white mb-1 transform transition-all duration-300 ${
                    isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
                  }`} />
                  
                  {/* Value */}
                  <div className="text-white font-bold text-center leading-tight">
                    <div className={`${metric.size === 'small' ? 'text-lg' : metric.size === 'medium' ? 'text-xl' : 'text-2xl'} font-black`}>
                      {metric.value}
                    </div>
                    <div className={`${metric.size === 'small' ? 'text-xs' : 'text-sm'} opacity-90`}>
                      {metric.change}
                    </div>
                  </div>
                </div>

                {/* Label tooltip */}
                <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  {metric.label}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
                </div>

                {/* Floating particles around metric */}
                {isHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                        style={{
                          left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 60}%`,
                          top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 60}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center pb-20">
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white font-semibold text-lg">Live</span>
          <span className="text-white/80">AI Legal Assistant</span>
          <Sparkles className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedMetrics;
