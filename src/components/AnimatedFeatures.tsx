'use client';

import { 
  Brain, 
  Shield, 
  Zap, 
  Scale, 
  FileSearch, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AnimatedFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze legal documents with 99.9% accuracy",
      color: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level encryption ensures your sensitive legal data remains completely secure",
      color: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process complex legal documents in seconds, not hours with our optimized AI engine",
      color: "from-yellow-500 to-orange-500",
      delay: 0.3
    },
    {
      icon: Scale,
      title: "Legal Expertise",
      description: "Built by legal professionals and trained on millions of legal precedents",
      color: "from-purple-500 to-pink-500",
      delay: 0.4
    },
    {
      icon: FileSearch,
      title: "Smart Search",
      description: "Find relevant cases and precedents instantly with our intelligent search system",
      color: "from-indigo-500 to-blue-500",
      delay: 0.5
    },
    {
      icon: MessageSquare,
      title: "24/7 Assistant",
      description: "Get instant answers to legal questions with our AI-powered legal assistant",
      color: "from-teal-500 to-cyan-500",
      delay: 0.6
    }
  ];

  const stats = [
    { number: "10M+", label: "Documents Processed", icon: FileSearch },
    { number: "99.9%", label: "Accuracy Rate", icon: CheckCircle },
    { number: "2.5s", label: "Average Response", icon: Clock },
    { number: "500+", label: "Law Firms", icon: Scale }
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Experience the future of legal technology with our cutting-edge AI-powered platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${feature.delay}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`relative w-16 h-16 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default AnimatedFeatures;