// src/components/Layout.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  const navigation = [
    { name: 'Home Page', href: '/', current: location.pathname === '/' },
    { name: 'Quiz Section', href: '/quiz', current: location.pathname === '/quiz' },
    { name: 'Career Guidance', href: '/careers', current: location.pathname === '/careers' },
    { name: 'College Section', href: '/colleges', current: location.pathname === '/colleges' },
    { name: 'School Section', href: '/schools', current: location.pathname === '/schools' },
    { name: 'Notifications', href: '/notifications', current: location.pathname === '/notifications' },
    { name: 'Loans', href: '/loans', current: location.pathname === '/loans' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav 
        className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg border-b border-slate-600 sticky top-0 z-50"
        style={{ background: 'linear-gradient(to right, #1e293b, #374151, #1e293b)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <div className="flex items-center">
                <span className="text-orange-400 font-bold text-lg">CAREER</span>
                <span className="text-cyan-400 font-bold ml-1 text-lg">COMPASS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      item.current
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-105'
                        : 'text-slate-200 hover:text-white hover:bg-slate-600/50 hover:shadow-md'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Authentication Section */}
              {isLoading ? (
                <div className="animate-pulse bg-slate-600 rounded-lg h-10 w-24"></div>
              ) : isAuthenticated ? (
                <UserProfile />
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/95 backdrop-blur-sm border-t border-slate-600">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      item.current
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                        : 'text-slate-200 hover:text-white hover:bg-slate-600/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Authentication Section */}
                {isLoading ? (
                  <div className="animate-pulse bg-slate-600 rounded-lg h-10 w-full mt-4"></div>
                ) : isAuthenticated ? (
                  <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                    <UserProfile />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-emerald-500 to-cyan-600 text-white hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 shadow-lg mt-4 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                {/* Try to load logo, fallback to text logo if not found */}
                <img 
                  src="/PicFinal.png" 
                  alt="CareerCompass Logo" 
                  className="h-50 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-50 h-50 bg-blue-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                  <span className="text-white font-bold text-lg">CC</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Discover your ideal career path with our comprehensive assessments and personalized guidance.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
                <li><Link to="/quiz" className="text-gray-400 hover:text-white text-sm transition-colors">Take Quiz</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/colleges" className="text-gray-400 hover:text-white text-sm transition-colors">Colleges</Link></li>
                <li><Link to="/schools" className="text-gray-400 hover:text-white text-sm transition-colors">Schools</Link></li>
                <li><Link to="/suggestions" className="text-gray-400 hover:text-white text-sm transition-colors">Suggestions</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white text-sm transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@careercompass.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Location: Chandigarh, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 CareerCompass. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;