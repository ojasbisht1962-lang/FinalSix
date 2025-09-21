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
      content: "Hello! I'm your CareerCompass AI Assistant. I can help you with career guidance, job search tips, resume advice, and anything related to your professional journey. What would you like to know?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    document.getElementById('ai-chatbot')?.scrollIntoView({ behavior: 'smooth' });
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
      <div id="ai-chatbot" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chat with Our AI Career Assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant, personalized career guidance powered by Google Gemini AI. Ask me anything about careers, job searching, interviews, or professional development!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 text-white">
                <div className="flex items-center gap-3">
                  <Bot className="h-8 w-8" />
                  <div>
                    <h3 className="text-xl font-bold">CareerCompass AI Assistant</h3>
                    <p className="text-blue-100 text-sm">Powered by Google Gemini - Your personal career counselor</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white ml-12'
                            : 'bg-white text-gray-800 mr-12 shadow-sm border border-gray-200'
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                        <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl mr-12 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2">
                          <Loader className="h-4 w-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about careers, job search, interviews, resumes, or any professional questions..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                   Try asking: "What career is right for me?", "How do I prepare for interviews?", or "Help me improve my resume"
                </p>
              </div>
            </div>
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
