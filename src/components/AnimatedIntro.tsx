'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Brain, Scale } from 'lucide-react';

const AnimatedIntro = () => {
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    "AI-Powered Legal Solutions",
    "Intelligent Case Analysis", 
    "Smart Document Review",
    "Automated Legal Research",
    "Predictive Legal Insights"
  ];

  const features = [
    { icon: Brain, text: "AI Intelligence", delay: 0 },
    { icon: Shield, text: "Secure & Private", delay: 0.2 },
    { icon: Zap, text: "Lightning Fast", delay: 0.4 },
    { icon: Scale, text: "Legal Expertise", delay: 0.6 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-600/30 dark:to-purple-600/30 blur-xl animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}

        {/* Animated Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl">
            <Scale className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Old Style Text with Animation */}
        <div className="mb-8 animate-fade-in">
          <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-2 tracking-widest uppercase font-medium animate-slide-in-left vintage-text">
            <span className="inline-block animate-typewriter">Est. 2024</span>
            <span className="mx-2">•</span>
            <span className="inline-block animate-typewriter" style={{ animationDelay: '1s' }}>Legal Technology</span>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6 animate-slide-in-left" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in relative">
          <span className="relative inline-block">
            Verdicto
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          </span>
        </h1>

        {/* Decorative Line */}
        <div className="flex items-center justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
          <div className="mx-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>

        {/* Vintage Decorative Elements */}
        <div className="absolute top-20 left-10 text-4xl opacity-20 dark:opacity-40 animate-rotate-slow">⚖️</div>
        <div className="absolute top-32 right-16 text-3xl opacity-20 dark:opacity-40 animate-float">📜</div>
        <div className="absolute bottom-40 left-20 text-2xl opacity-20 dark:opacity-40 animate-bounce-subtle">⚡</div>
        <div className="absolute bottom-60 right-12 text-3xl opacity-20 dark:opacity-40 animate-pulse">🏛️</div>

        {/* Animated Subtitle */}
        <div className="h-20 flex items-center justify-center mb-8">
          <div className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 transition-all duration-500 relative">
            <span className="inline-block animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>
              {texts[currentText]}
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-pulse"></div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature) => (
            <div
              key={feature.text}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${0.8 + feature.delay}s` }}
            >
              <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold text-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Learn More
            </span>
          </button>
        </div>

        {/* Old Style Decorative Section */}
        <div className="mt-12 mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <div className="mx-4 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-widest uppercase">
              Trusted By
            </div>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10M+", label: "Cases Analyzed", icon: "⚖️" },
            { number: "99.9%", label: "Accuracy", icon: "🎯" },
            { number: "24/7", label: "Available", icon: "🕐" },
            { number: "500+", label: "Law Firms", icon: "🏢" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 hover:-translate-y-2 transition-all duration-300 relative group"
              style={{ animationDelay: `${1.4 + index * 0.1}s` }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-indigo-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-pink-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedIntro;