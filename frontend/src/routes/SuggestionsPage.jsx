// src/routes/SuggestionsPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import API_CONFIG from '../config/api';

const SuggestionsPage = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchSuggestions = async () => {
      const userId = new URLSearchParams(location.search).get('user_id');
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(API_CONFIG.getUrlWithParams(API_CONFIG.ENDPOINTS.SUGGESTIONS, { user_id: userId }));
        setSuggestions(response.data);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        alert("Could not fetch suggestions. Please try the quiz again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [location]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <Loader />
        <p className="mt-4 text-gray-700">Generating your personalized career suggestions...</p>
      </div>
    );
  }

  if (!suggestions) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-64px)] text-gray-600">No suggestions found.</div>;
  }

  const { suggested_stream, nearby_schools, suggested_degree, nearby_colleges, possible_careers } = suggestions;

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto p-8">
      <h2 className="text-5xl font-extrabold text-center text-blue-600 my-8">Your Personalized Guide</h2>
      
      {/* Suggestions for Below 10th */}
      {suggested_stream && (
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-10 border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Recommended Stream</h3>
          <p className="text-lg text-gray-600 mb-6">Based on your interests, we recommend the **<span className="text-blue-600 font-semibold">{suggested_stream.toUpperCase()}</span>** stream.</p>
          <h4 className="text-2xl font-semibold mb-4 text-blue-500">Nearby Schools</h4>
          <ul className="list-none space-y-3">
            {nearby_schools.map((school) => (
              <li key={school._id} className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <span className="font-medium text-gray-700">{school.name}</span>
                <p className="text-sm text-gray-500">{school.location}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions for 10th Pass */}
      {suggested_degree && (
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-10 border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Suggested Degree & Careers</h3>
          <p className="text-lg text-gray-600 mb-6">Your perfect fit is the **<span className="text-blue-600 font-semibold">{suggested_degree}</span>** degree.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-blue-500">Possible Careers</h4>
              <ul className="list-none space-y-3">
                {possible_careers.map((career, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
                    <span className="font-medium text-gray-700">{career}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-4 text-blue-500">Nearby Colleges</h4>
              <ul className="list-none space-y-3">
                {nearby_colleges.map((college) => (
                  <li key={college._id} className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all">
                    <span className="font-medium text-gray-700">{college.name}</span>
                    <p className="text-sm text-gray-500">{college.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default SuggestionsPage;

