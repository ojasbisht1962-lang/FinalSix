import React from 'react';

const ResultsPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Results</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your personalized career recommendations based on your quiz responses.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 text-center">
            Results will be displayed here after completing the career assessment quiz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
