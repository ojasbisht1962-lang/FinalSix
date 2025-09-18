// src/routes/LoginPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
      // For now, just simulate a successful login without actual backend call
      const user_id = 'guest_' + Date.now(); // Generate a temporary ID
      localStorage.setItem('user_id', user_id);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to log in as guest. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl text-center border border-gray-700">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-4">Career Compass</h1>
        <p className="text-gray-400 mb-6 text-lg">Your journey to the right career starts here.</p>
        <button
          onClick={handleGuestLogin}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Login as Guest
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
