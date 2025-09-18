// src/components/ServicesSection.jsx

import React from 'react';
import FeatureCard from './FeatureCard';

const ServicesSection = () => {
  return (
    <div className="bg-white py-20 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Comprehensive Career Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <FeatureCard
          title="Career Assessments"
          description="Our scientifically-backed assessments help you understand your strengths, interests, and values."
        />
        <FeatureCard
          title="Personalized Guidance"
          description="Receive tailored advice from experienced career counselors who will help you navigate your options."
        />
        <FeatureCard
          title="Job Market Insights"
          description="Stay ahead with up-to-date information on industry trends, in-demand skills, and emerging career opportunities."
        />
      </div>
    </div>
  );
};

export default ServicesSection;