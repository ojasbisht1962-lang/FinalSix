// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "🏠 Home" },
    { path: "/arabian-quiz", label: "🪔 Take Quiz" },
    { path: "/arabian-quiz/leaderboard", label: "🏆 Leaderboard" },
    { path: "/dashboard", label: "👤 Profile" },
  ];

  return (
    <nav 
      className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 shadow-2xl fixed w-full top-0 z-50 border-b-2 border-yellow-400/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
              🪔
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
                Arabian Nights
              </span>
              <span className="text-xs text-purple-300 -mt-1">Quiz Adventure</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2 rounded-full text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 shadow-lg shadow-yellow-500/50"
                    : "text-yellow-100 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-yellow-400/30"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-yellow-300 hover:text-white hover:bg-purple-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 transition-colors"
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
            <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 bg-purple-950/95 backdrop-blur-sm border-t border-yellow-400/30">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 shadow-lg"
                      : "text-yellow-100 hover:text-white hover:bg-purple-800/50 border border-yellow-400/20"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
