// src/routes/DashboardPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FAQs from '../components/FAQs';
import QuizHistory from '../components/QuizHistory';

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto p-8">
      <div className="text-center my-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Welcome{user ? `, ${user.name}` : ''}!
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          {user?.type === 'google' 
            ? "Your personalized career dashboard with quiz history and recommendations."
            : "Welcome! Explore various career paths, take our personalized quiz, and find colleges and schools that fit your goals."
          }
        </p>
      </div>

      {/* Quiz History Section - Only for Google Users */}
      {user?.type === 'google' && (
        <div className="mb-12">
          <QuizHistory />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center transform transition-all hover:scale-105">
          <h3 className="text-xl font-bold mb-2">Career Compass</h3>
          <p className="text-gray-600 mb-4">Discover your ideal career path with our detailed quiz.</p>
          <Link to="/quiz" className="text-blue-600 font-semibold hover:underline">Start Quiz</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center transform transition-all hover:scale-105">
          <h3 className="text-xl font-bold mb-2">Colleges</h3>
          <p className="text-gray-600 mb-4">Find colleges and universities based on your chosen degree.</p>
          <Link to="/colleges" className="text-blue-600 font-semibold hover:underline">Explore</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center transform transition-all hover:scale-105">
          <h3 className="text-xl font-bold mb-2">Careers</h3>
          <p className="text-gray-600 mb-4">Learn about different careers and what it takes to succeed.</p>
          <Link to="/careers" className="text-blue-600 font-semibold hover:underline">Explore</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center transform transition-all hover:scale-105">
          <h3 className="text-xl font-bold mb-2">Schools</h3>
          <p className="text-gray-600 mb-4">Discover schools that offer the streams you're interested in.</p>
          <Link to="/schools" className="text-blue-600 font-semibold hover:underline">Explore</Link>
        </div>
      </div>
      
      <div className="my-10">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h3>
        <FAQs />
      </div>
      </div>
    </div>
  );
};

export default DashboardPage;