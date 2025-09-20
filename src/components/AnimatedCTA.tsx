'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Star, 
  Zap, 
  Brain,
  Shield,
  Globe,
  TrendingUp,
  Award,
  Users,
  BarChart3
} from 'lucide-react';

const AnimatedCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<'trial' | 'demo' | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingIcons = [
    { icon: Brain, delay: 0, position: { x: 10, y: 20 } },
    { icon: Zap, delay: 0.5, position: { x: 85, y: 15 } },
    { icon: Shield, delay: 1, position: { x: 15, y: 80 } },
    { icon: Globe, delay: 1.5, position: { x: 80, y: 75 } },
    { icon: TrendingUp, delay: 2, position: { x: 50, y: 10 } },
    { icon: Award, delay: 2.5, position: { x: 5, y: 50 } },
    { icon: Users, delay: 3, position: { x: 90, y: 45 } },
    { icon: BarChart3, delay: 3.5, position: { x: 45, y: 90 } }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        {/* Floating particles */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Floating icons */}
        {floatingIcons.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transitionDelay: `${item.delay}s`
              }}
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-all duration-300 hover:scale-110">
                <IconComponent className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          );
        })}

        {/* Animated lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl mx-auto">
          {/* Header */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-medium">Experience the Future of Legal AI</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Join thousands of legal professionals who are already using{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI to transform
              </span>{' '}
              their practice
            </h1>
            
            <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
              See these metrics in your own dashboard. Experience the power of AI-driven legal technology 
              that's revolutionizing how law firms operate worldwide.
            </p>
          </div>

          {/* Animated Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {[
              { label: 'Law Firms', value: '500+', icon: Users },
              { label: 'Countries', value: '90+', icon: Globe },
              { label: 'Success Rate', value: '99.9%', icon: Award },
              { label: 'Uptime', value: '24/7', icon: Shield }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="w-10 h-10 text-white/70 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button
              size="lg"
              className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 overflow-hidden"
              onMouseEnter={() => setHoveredButton('trial')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Start Free Trial
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Floating particles on hover */}
              {hoveredButton === 'trial' && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </>
              )}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="group relative px-12 py-6 border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10 rounded-full font-bold text-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 overflow-hidden"
              onMouseEnter={() => setHoveredButton('demo')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <BarChart3 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              View Live Demo
              <Star className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Floating particles on hover */}
              {hoveredButton === 'demo' && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                      style={{
                        left: `${25 + Math.random() * 50}%`,
                        top: `${25 + Math.random() * 50}%`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    />
                  ))}
                </>
              )}
            </Button>
          </div>

          {/* Bottom decoration */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
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
  );
};

export default AnimatedCTA;
