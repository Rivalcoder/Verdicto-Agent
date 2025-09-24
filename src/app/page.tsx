"use client"
import Navigation from "@/components/Navigation";
import React from "react";
import { AdvancedTimeline } from "@/components/AdvancedTimeline";
import AnimatedIntro from "@/components/AnimatedIntro";
import AnimatedFeatures from "@/components/AnimatedFeatures";

export default function Home() {
  // Ensure landing loads at top
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, []);

  // Deterministic pseudo-random generator to avoid SSR/CSR mismatches
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const orbPositions = React.useMemo(
    () => Array.from({ length: 8 }).map((_, i) => {
      const left = seededRandom(i * 2.13 + 0.73) * 100;
      const top = seededRandom(i * 3.57 + 1.19) * 100;
      return {
        left: `${left.toFixed(4)}%`,
        top: `${top.toFixed(4)}%`,
        delay: `${(i * 1.5).toFixed(1)}s`,
        duration: `${15 + i * 2}s`,
      };
    }),
    []
  );
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Background with Enhanced Animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Dynamic Floating Orbs */}
          {orbPositions.map((pos, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl animate-float-gentle ${
                i % 4 === 0 ? 'w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20' :
                i % 4 === 1 ? 'w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20' :
                i % 4 === 2 ? 'w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20' :
                'w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20'
              }`}
              style={{
                left: pos.left,
                top: pos.top,
                animationDelay: pos.delay,
                animationDuration: pos.duration,
              }}
            />
          ))}
          
          {/* Modern Grid Pattern */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float-gentle 25s ease-in-out infinite'
          }}></div>
        </div>
      </div>
      
      {/* Enhanced Gradient Overlay - start from navbar bg to avoid color band */}
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-900 via-background/5 to-background/40 z-[5]" />
      
      <div className="relative z-10">
        <Navigation forceSolid />
        {/* Spacing matches navbar height (h-16) */}
        <main className="pt-16">
          <AnimatedIntro />
          <AnimatedFeatures />
          <AdvancedTimeline />
        </main>
      </div>
    </div>
  );
}