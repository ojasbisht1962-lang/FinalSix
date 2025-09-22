import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, Zap, Send, Bot, Loader } from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import API_CONFIG from '../config/api';
import axios from 'axios';

const HomePage = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hello! I'm your CareerCompass AI Assistant. I can help you with career guidance, job opportunities, interview preparation, and more. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/ai/chat`, {
        message: inputMessage
      });

      const aiMessage = {
        type: 'ai',
        content: response.data.response,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        type: 'ai',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to explore our career quiz and resources in the meantime!",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToChat = () => {
    setShowChat(true);
    setTimeout(() => {
      document.getElementById('ai-chatbot')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
              onClick={scrollToChat}
            />
          </div>
        </div>
      </div>

      {/* AI Chatbot Section */}
      <div id="ai-chatbot" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-400 rounded-full mb-8 mx-auto">
              <Bot className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Your AI Career Assistant ✨
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Get instant answers to your career questions, explore opportunities, and 
              receive personalized advice from our AI-powered assistant
            </p>
          </div>

          {!showChat ? (
            // Feature Cards Section
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full mb-6">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">24/7 Availability</h3>
                  <p className="text-blue-100">
                    Get instant responses to your career queries anytime, anywhere
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Smart Insights</h3>
                  <p className="text-blue-100">
                    Receive intelligent career suggestions based on current market trends
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-full mb-6">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Personalized Help</h3>
                  <p className="text-blue-100">
                    Get tailored advice for your unique career situation and goals
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={scrollToChat}
                  className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto text-lg"
                >
                  <Bot className="h-6 w-6" />
                  Chat with AI Assistant
                  <span className="ml-2">→</span>
                </button>
                <p className="text-cyan-100 mt-6 text-sm">
                  AI-Powered Career Guidance • Available 24/7 • Integrated Experience
                </p>
              </div>
            </div>
          ) : (
  // Chat Interface - Matching the exact design from your image
  <div className="max-w-5xl mx-auto">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{minHeight: '600px'}}>
      {/* Chat Header - Exactly like your image */}
      <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">CareerCompass AI Assistant</h3>
          </div>
          <button
            onClick={() => setShowChat(false)}
            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors text-2xl font-light"
          >
            ×
          </button>
        </div>
      </div>

      {/* Chat Messages Area - Matching your image layout */}
      <div className="flex-1 p-6 bg-gray-50" style={{minHeight: '420px'}}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === 'ai' && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-cyan-600 text-sm">AI Assistant</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 max-w-2xl">
                      <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <div className="text-xs text-gray-400 mt-3">{message.timestamp}</div>
                    </div>
                  </div>
                </div>
              )}
              {message.type === 'user' && (
                <div className="flex justify-end">
                  <div className="bg-cyan-500 text-white rounded-2xl p-4 shadow-sm max-w-2xl">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs text-cyan-100 mt-3 text-right">{message.timestamp}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-cyan-600 text-sm">AI Assistant</span>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin text-cyan-500" />
                    <span className="text-gray-600 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input - Matching your image design */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about career guidance, job opportunities, or any career-related questions..."
            className="flex-1 px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-gray-50 text-gray-800 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
)}
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
