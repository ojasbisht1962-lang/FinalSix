// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/quiz", label: "Quiz" },
    { path: "/careers", label: "Career Guidance" },
    { path: "/colleges", label: "Colleges" },
    { path: "/schools", label: "Schools" },
    { path: "/notifications", label: "Notifications" },
    { path: "/loans", label: "Loans" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav 
      className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg fixed w-full top-0 z-50 border-b border-slate-600"
      style={{ background: 'linear-gradient(to right, #1e293b, #374151, #1e293b)' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* Try to load logo, fallback to text logo if not found */}
            <img 
              src=" /final-project/frontend/public/Logo.png" 
              alt="CareerCompass Logo" 
              className="h-5 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-50 h-50 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md" style={{display: 'none'}}>
              <span className="text-white font-bold text-lg">CC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-105"
                    : "text-slate-200 hover:text-white hover:bg-slate-600/50 hover:shadow-md"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-colors"
          >
            <span className="sr-only">Open menu</span>
            {/* Hamburger icon */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/95 backdrop-blur-sm border-t border-slate-600">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-slate-200 hover:text-white hover:bg-slate-600/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/login"
                className="block w-full text-center bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 shadow-lg mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
