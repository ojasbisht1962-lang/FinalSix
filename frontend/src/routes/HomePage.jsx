import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, Zap } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-100 py-20 px-4 md:px-8 text-center flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Your Potential with{" "}
            <span className="text-blue-600">CareerCompass</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover your ideal career path with our comprehensive assessments and personalized guidance.
          </p>
          <div className="mt-8">
            <Link
              to="/quiz"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Your Path to Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-blue-600" />}
              title="Personalized Assessment"
              description="Take our comprehensive quiz to discover careers that match your skills, interests, and values."
              link="/quiz"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-green-600" />}
              title="Career Guidance"
              description="Get expert advice on career paths, skill development, and industry insights."
              link="/careers"
            />
            <FeatureCard
              icon={<MessageCircle className="h-8 w-8 text-purple-600" />}
              title="AI Assistant"
              description="Chat with our AI-powered career counselor for instant, personalized advice."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered their dream careers with CareerCompass
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                Take Career Quiz
              </Link>
              <Link
                to="/careers"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Explore Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
