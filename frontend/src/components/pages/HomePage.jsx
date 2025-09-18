// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-100 py-20 px-4 md:px-8 text-center flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Your Potential with <span className="text-blue-600">CareerCompass</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover your ideal career path with our comprehensive assessments and personalized guidance.
          </p>
          <div className="mt-8">
            <Link
              to="/quiz"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
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
    </div>
  );
};

export default HomePage;