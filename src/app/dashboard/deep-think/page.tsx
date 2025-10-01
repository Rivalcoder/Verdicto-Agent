"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Brain, Zap, Target, TrendingUp } from "lucide-react";

export default function DeepThinkPage() {
  const ComingSoonAnimation = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-full">
            <Brain className="h-24 w-24 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-8 w-8 text-yellow-400 animate-spin" />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Zap className="h-6 w-6 text-orange-400 animate-bounce" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Deep Think
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered legal analysis and strategic thinking platform
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Strategic Analysis</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Deep legal strategy analysis with AI-powered insights
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Case Prediction</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Predict case outcomes with advanced AI algorithms
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 border-pink-200 dark:border-pink-800">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-pink-900 dark:text-pink-100">Legal Trends</h3>
              <p className="text-sm text-pink-700 dark:text-pink-300">
                Analyze legal trends and market insights
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="text-lg font-medium text-muted-foreground">
            Coming Soon with Revolutionary Features
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Real-time Insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Advanced Predictions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <ComingSoonAnimation />
    </div>
  );
}
