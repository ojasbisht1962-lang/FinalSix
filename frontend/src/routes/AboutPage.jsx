import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CareerCompass</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your comprehensive career guidance platform designed to help you navigate your professional journey with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To empower individuals with the tools and insights needed to make informed career decisions and achieve their professional goals.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading career guidance platform that connects talent with opportunities through personalized assessments and AI-powered insights.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Excellence, Innovation, Integrity, and Empowerment guide everything we do to help you achieve career success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
