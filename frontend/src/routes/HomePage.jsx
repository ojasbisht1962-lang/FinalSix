// src/routes/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, Sparkles, MessageCircle, ArrowRight, Zap, X, Send } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const HomePage = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I\'m your CareerCompass AI Assistant. I can help you with career guidance, job opportunities, interview preparation, and more. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newUserMessage = {
      sender: 'user',
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    setIsTyping(true);

    // Simulate AI response (you can integrate with actual AI service later)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      const newBotMessage = {
        sender: 'bot',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return "Great question about careers! I'd be happy to help you explore different career paths. Consider factors like your interests, skills, values, and the job market. Would you like guidance on a specific field or career assessment?";
    } else if (lowerMessage.includes('interview')) {
      return "Interview preparation is crucial! Here are key tips: Research the company, practice common questions, prepare specific examples of your achievements, and don't forget to ask thoughtful questions. Would you like help with specific interview scenarios?";
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return "A strong resume is your first impression! Focus on quantifiable achievements, use action verbs, tailor it to each job, and keep it concise. Would you like help with a specific section of your resume?";
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
      return "Salary negotiations are important! Research market rates, know your value, and be prepared to discuss your contributions. Consider the full compensation package, not just base salary. Would you like tips for specific industries?";
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
      return "Continuous learning is key to career growth! Identify in-demand skills in your field, consider online courses, certifications, or hands-on projects. What area would you like to develop skills in?";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help with all your career-related questions. Whether you need guidance on job searching, interview prep, career transitions, or skill development, I'm ready to assist!";
    } else {
      return "That's an interesting question! I'm here to help with career guidance, job search strategies, interview preparation, resume building, and professional development. Could you tell me more about what specific career aspect you'd like to explore?";
    }
  };
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
            Discover your ideal career path with our comprehensive assessments
            and personalized guidance.
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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Comprehensive Career Support
        </h2>
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

      {/* AI Chatbot Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-8 right-8 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-2xl mb-8 transform hover:scale-110 transition-transform duration-300">
            <Bot className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Your AI Career Assistant
            <Sparkles className="inline-block ml-3 h-8 w-8 text-yellow-400 animate-pulse" />
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant answers to your career questions, explore opportunities, and receive personalized advice from our AI-powered assistant
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <MessageCircle className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Availability</h3>
              <p className="text-gray-300 text-sm">Get instant responses to your career queries anytime, anywhere</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Smart Insights</h3>
              <p className="text-gray-300 text-sm">Receive intelligent career suggestions based on current market trends</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <Sparkles className="h-8 w-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Personalized Help</h3>
              <p className="text-gray-300 text-sm">Get tailored advice for your unique career situation and goals</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowChatbot(!showChatbot)}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full shadow-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/25"
            >
              <Bot className="h-6 w-6 mr-3" />
              {showChatbot ? 'Close AI Assistant' : 'Chat with AI Assistant'}
              <ArrowRight className={`h-5 w-5 ml-3 transition-transform duration-300 ${showChatbot ? 'rotate-180' : 'animate-bounce'}`} />
            </button>
            <p className="text-gray-300 text-sm">
              AI-Powered Career Guidance • Available 24/7 • Integrated Experience
            </p>
          </div>

          {/* Embedded Chatbot Interface */}
          {showChatbot && (
            <div className="mt-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 max-w-4xl mx-auto overflow-hidden animate-fadeIn">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="h-6 w-6 mr-3" />
                    <h3 className="text-lg font-semibold">CareerCompass AI Assistant</h3>
                  </div>
                  <button
                    onClick={() => setShowChatbot(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        {message.sender === 'bot' && (
                          <div className="flex items-center mb-1">
                            <Bot className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-xs font-semibold text-blue-500">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 border border-gray-200 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Bot className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="text-xs font-semibold text-blue-500">AI Assistant</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask me about career guidance, job opportunities, or any career-related questions..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !userMessage.trim()}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gray-50 py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Ready to Transform Your Career?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals who have discovered their perfect career path with CareerCompass
        </p>
        <Link
          to="/quiz"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Start Your Journey Today
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
