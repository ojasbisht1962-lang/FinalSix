// src/components/HeroSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import heroIllustration from '../assets/images/hero-illustration.png';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Unlock Your Potential with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CareerCompass
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover your ideal career path with our comprehensive assessments and personalized guidance tailored to your unique skills and interests.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/quiz"
                className="inline-block bg-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Start your career assessment quiz"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="Learn more about CareerCompass"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroIllustration}
                alt="Professional development illustration showing career growth and guidance"
                className="w-full max-w-lg mx-auto lg:max-w-full rounded-lg shadow-2xl"
                loading="eager"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
