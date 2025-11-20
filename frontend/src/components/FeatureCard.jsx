// src/components/FeatureCard.jsx

import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-gray-100 p-8 rounded-xl shadow-lg border border-gray-200 text-left transform transition-all hover:scale-105">
      <div className="w-12 h-12 bg-blue-500 rounded-full mb-4"></div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;