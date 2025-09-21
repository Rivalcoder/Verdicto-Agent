'use client';

import React from 'react';
import AnimatedMetrics from './AnimatedMetrics';
import AnimatedCTA from './AnimatedCTA';

const ModernDashboard = () => {



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
