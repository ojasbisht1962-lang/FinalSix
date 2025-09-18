import React from 'react';

const AboutPage = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About CareerCompass</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-6">
            CareerCompass was founded with a simple yet powerful mission: to help individuals 
            navigate the complex world of career development and find meaningful, fulfilling work.
          </p>
          <p className="text-gray-600 mb-6">
            Our team of experienced career counselors, industry experts, and professional 
            coaches work together to provide comprehensive guidance that addresses every 
            aspect of your career journey.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
          <p className="text-gray-600 mb-6">
            We believe that career development is not a one-size-fits-all process. That's 
            why we take a personalized approach, taking into account your unique skills, 
            interests, values, and goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;