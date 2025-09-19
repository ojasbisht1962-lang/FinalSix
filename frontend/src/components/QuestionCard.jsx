import React from 'react';

const QuestionCard = ({ question, selectedAnswer, onAnswerChange }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 max-w-5xl mx-auto">
      {/* Question Text */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-xl mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-relaxed">
          {question?.text || "Question text not available"}
        </h3>
        <p className="text-lg text-gray-600 font-medium">Select the option that best applies to you.</p>
      </div>
      
      {/* Options */}
      <div className="space-y-4">
        {question?.options?.map((option, index) => (
          <label 
            key={index} 
            className={`
              group relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] block
              ${selectedAnswer === option 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-lg shadow-blue-500/25' 
                : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerChange(question.id, option)}
              className="hidden"
            />
            <div className="flex items-center justify-between">
              <span className={`text-lg font-semibold transition-colors duration-200 ${
                selectedAnswer === option ? 'text-blue-900' : 'text-gray-700 group-hover:text-blue-800'
              }`}>
                {option}
              </span>
              <div className={`
                relative w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                ${selectedAnswer === option 
                  ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg' 
                  : 'border-gray-400 group-hover:border-blue-400 group-hover:shadow-md'
                }
              `}>
                {selectedAnswer === option && (
                  <div className="w-3 h-3 bg-white rounded-full shadow-sm animate-pulse"></div>
                )}
              </div>
            </div>
            
            {/* Selection Indicator */}
            {selectedAnswer === option && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </label>
        ))}
      </div>
      
      {/* Bottom info */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Your responses help us understand your preferences and suggest the best career matches
        </p>
      </div>
    </div>
  );
};

export default QuestionCard;